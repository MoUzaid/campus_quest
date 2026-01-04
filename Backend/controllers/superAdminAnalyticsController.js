


const Faculty = require("../models/FacultyModel");
const Student = require("../models/studentModel");
const Course = require("../models/courseModel");
const Quiz = require("../models/quizModel");
const QuizAttempt = require("../models/QuizAttemptModel");
const moment = require("moment");
const { performance } = require("perf_hooks");

/* ================= CACHE ================= */
const analyticsCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/* ================= SERVICE ================= */
class AnalyticsService {
  constructor(department) {
    this.department = department;
  }

  /* ================= TIME FILTER HELPER ================= */
  getTimeFilter(timeRange, field = "createdAt") {
    if (timeRange === "all") return {};

    const now = new Date();
    let startDate;

    switch (timeRange) {
      case "today":
        startDate = moment().startOf("day").toDate();
        break;
      case "week":
        startDate = moment().subtract(7, "days").toDate();
        break;
      case "month":
        startDate = moment().subtract(30, "days").toDate();
        break;
      case "quarter":
        startDate = moment().subtract(90, "days").toDate();
        break;
      case "year":
        startDate = moment().subtract(365, "days").toDate();
        break;
      default:
        return {};
    }

    return { [field]: { $gte: startDate } };
  }

  /* ================= MAIN ANALYTICS ================= */
  async getDepartmentAnalytics(timeRange = "all", forceRefresh = false) {
    const cacheKey = `${this.department}_${timeRange}`;

    // Check cache
    if (!forceRefresh && analyticsCache.has(cacheKey)) {
      const cached = analyticsCache.get(cacheKey);
      if (Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.data;
      }
    }

    const start = performance.now();

    try {
      const [
        overview,
        faculty,
        students,
        quizzes,
        performanceMetrics,
        trends,
        courseDistribution,
        facultyDesignations
      ] = await Promise.all([
        this.getBasicDepartmentStats(timeRange),
        this.getFacultyAnalytics(timeRange),
        this.getStudentAnalytics(timeRange),
        this.getQuizAnalytics(timeRange),
        this.getPerformanceMetrics(timeRange),
        this.getTemporalTrends(timeRange),
        this.getCourseDistribution(),
        this.getFacultyDesignationDistribution()
      ]);

      const result = {
        metadata: {
          department: this.department,
          timeRange,
          generatedAt: new Date().toISOString(),
          processingTime: `${(performance.now() - start).toFixed(2)}ms`
        },
        overview,
        faculty: {
          ...faculty,
          distributionByDesignation: facultyDesignations
        },
        students: {
          ...students,
          courseDistribution
        },
        quizzes,
        performance: performanceMetrics,
        trends,
        kpis: this.calculateKPIs(overview, performanceMetrics, students),
        insights: await this.generateInsights(overview, performanceMetrics)
      };

      // Cache the result
      analyticsCache.set(cacheKey, {
        timestamp: Date.now(),
        data: result
      });

      return result;
    } catch (error) {
      console.error("Analytics generation error:", error);
      throw error;
    }
  }

  /* ================= OVERVIEW STATS ================= */
  async getBasicDepartmentStats(timeRange) {
    const timeFilter = this.getTimeFilter(timeRange, "createdAt");

    // Count only students who are registered in at least one quiz
    const registeredStudentsAgg = await Quiz.aggregate([
      { $match: { department: this.department } },
      { $unwind: "$registeredStudents" },
      { $group: { _id: "$registeredStudents" } },
      { $count: "totalRegisteredStudents" }
    ]);

    const totalStudents = registeredStudentsAgg[0]?.totalRegisteredStudents || 0;

    const [totalFaculties, totalCourses, totalQuizzes, activeQuizzes] =
      await Promise.all([
        Faculty.countDocuments({
          department: this.department,
          ...timeFilter
        }),
        Course.countDocuments({ department: this.department }),
        Quiz.countDocuments({
          department: this.department,
          ...timeFilter
        }),
        Quiz.countDocuments({
          department: this.department,
          isStarted: true,
          endTime: { $gte: new Date() }
        })
      ]);

    // Get previous period for growth calculation
    const previousPeriodFilter = this.getPreviousPeriodFilter(timeRange, "createdAt");
    const previousQuizzes = await Quiz.countDocuments({
      department: this.department,
      ...previousPeriodFilter
    });

    const quizGrowthRate = previousQuizzes > 0
      ? ((totalQuizzes - previousQuizzes) / previousQuizzes * 100).toFixed(2)
      : totalQuizzes > 0 ? 100 : 0;

    return {
      totalFaculties,
      totalStudents, // ✅ now only students registered in at least one quiz
      totalCourses,
      totalQuizzes,
      activeQuizzes,
      studentToFacultyRatio: totalFaculties > 0 ? (totalStudents / totalFaculties).toFixed(2) : 0,
      quizGrowthRate: parseFloat(quizGrowthRate)
    };
  }

  /* ================= FACULTY ANALYTICS ================= */
  async getFacultyAnalytics(timeRange) {
    const timeFilter = this.getTimeFilter(timeRange, "createdAt");

    const facultyData = await Faculty.aggregate([
      { $match: { department: this.department } },
      {
        $lookup: {
          from: "quizzes",
          let: { facultyId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$createdBy", "$$facultyId"] },
                ...timeFilter
              }
            }
          ],
          as: "createdQuizzes"
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          facultyId: 1,
          designation: 1,
          email: 1,
          quizCount: { $size: "$createdQuizzes" },
          totalStudents: {
            $sum: {
              $map: {
                input: "$createdQuizzes",
                as: "quiz",
                in: { $size: { $ifNull: ["$$quiz.registeredStudents", []] } }
              }
            }
          }
        }
      },
      { $sort: { quizCount: -1 } }
    ]);

    const topPerformers = facultyData
      .filter(f => f.quizCount > 0)
      .slice(0, 5)
      .map(f => ({
        name: f.name,
        designation: f.designation,
        quizCount: f.quizCount,
        totalStudents: f.totalStudents,
        engagementScore: Math.round((f.quizCount * f.totalStudents) / 10)
      }));

    return {
      total: facultyData.length,
      inactiveFaculties: facultyData.filter(f => f.quizCount === 0).length,
      averageQuizzesPerFaculty: facultyData.length > 0
        ? (facultyData.reduce((sum, f) => sum + f.quizCount, 0) / facultyData.length).toFixed(2)
        : 0,
      topPerformers
    };
  }

  /* ================= STUDENT ANALYTICS ================= */
  async getStudentAnalytics(timeRange) {
    const timeFilter = this.getTimeFilter(timeRange, "attemptedAt");

    const studentStats = await Student.aggregate([
      { $match: { department: this.department } },
      {
        $lookup: {
          from: "quizattempts",
          let: { studentId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$student", "$$studentId"] },
                ...timeFilter
              }
            },
            {
              $lookup: {
                from: "quizzes",
                localField: "quizId",
                foreignField: "_id",
                as: "quiz"
              }
            },
            { $unwind: "$quiz" },
            { $match: { "quiz.department": this.department } }
          ],
          as: "attempts"
        }
      },
      {
        $project: {
          name: 1,
          studentId: "$enrollmentNumber", // Use enrollmentNumber as studentId
          enrollmentNumber: 1,
          email: 1,
          course: 1,
          semester: 1,
          attemptCount: { $size: "$attempts" },
          avgScore: {
            $cond: [
              { $gt: [{ $size: "$attempts" }, 0] },
              { $avg: "$attempts.scoredMarks" },
              0
            ]
          }
        }
      }
    ]);

    const activeStudents = studentStats.filter(s => s.attemptCount > 0);
    const topPerformers = activeStudents
      .sort((a, b) => b.avgScore - a.avgScore)
      .slice(0, 10)
      .map(s => ({
        name: s.name,
        studentId: s.enrollmentNumber || 'N/A', // Always use enrollmentNumber
        email: s.email,
        course: s.course,
        attemptCount: s.attemptCount,
        avgScore: s.avgScore || 0
      }));

    return {
      total: studentStats.length,
      activeStudents: activeStudents.length,
      participationRate: studentStats.length > 0
        ? ((activeStudents.length / studentStats.length) * 100).toFixed(2)
        : 0,
      topPerformers,
      avgAttemptsPerStudent: activeStudents.length > 0
        ? (activeStudents.reduce((sum, s) => sum + s.attemptCount, 0) / activeStudents.length).toFixed(2)
        : 0
    };
  }

  /* ================= QUIZ ANALYTICS ================= */
  async getQuizAnalytics(timeRange) {
    const timeFilter = this.getTimeFilter(timeRange, "createdAt");

    const quizzes = await Quiz.aggregate([
      {
        $match: {
          department: this.department,
          ...timeFilter
        }
      },
      {
        $lookup: {
          from: "quizattempts",
          localField: "_id",
          foreignField: "quizId",
          as: "attempts"
        }
      },
      {
        $lookup: {
          from: "faculties",
          localField: "createdBy",
          foreignField: "_id",
          as: "faculty"
        }
      },
      { $unwind: { path: "$faculty", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          title: 1,
          subject: 1,
          facultyName: "$faculty.name",
          totalMarks: 1,
          passingMarks: 1,
          questionCount: { $size: { $ifNull: ["$questions", []] } },
          registeredCount: { $size: { $ifNull: ["$registeredStudents", []] } },
          attemptCount: { $size: "$attempts" },
          avgScore: {
            $cond: [
              { $gt: [{ $size: "$attempts" }, 0] },
              { $avg: "$attempts.scoredMarks" },
              0
            ]
          },
          completionRate: {
            $cond: [
              { $gt: [{ $size: { $ifNull: ["$registeredStudents", []] } }, 0] },
              {
                $divide: [
                  { $size: "$attempts" },
                  { $size: "$registeredStudents" }
                ]
              },
              0
            ]
          },
          difficultyIndex: {
            $cond: [
              { $gt: [{ $size: "$attempts" }, 0] },
              {
                $divide: [
                  { $avg: "$attempts.scoredMarks" },
                  "$totalMarks"
                ]
              },
              0
            ]
          }
        }
      },
      { $sort: { attemptCount: -1 } }
    ]);

    const activeQuizzes = quizzes.filter(q => q.attemptCount > 0);

    return {
      totalQuizzes: quizzes.length,
      activeQuizzes: activeQuizzes.length,
      avgCompletionRate: activeQuizzes.length > 0
        ? (activeQuizzes.reduce((sum, q) => sum + q.completionRate, 0) / activeQuizzes.length * 100).toFixed(2)
        : 0,
      avgDifficultyIndex: activeQuizzes.length > 0
        ? parseFloat((activeQuizzes.reduce((sum, q) => sum + q.difficultyIndex, 0) / activeQuizzes.length).toFixed(3))
        : 0,
      topQuizzesByParticipation: activeQuizzes.slice(0, 5)
    };
  }

  /* ================= PERFORMANCE METRICS ================= */
  async getPerformanceMetrics(timeRange) {
    const timeFilter = this.getTimeFilter(timeRange, "attemptedAt");

    const result = await QuizAttempt.aggregate([
      {
        $match: timeFilter
      },
      {
        $lookup: {
          from: "quizzes",
          localField: "quizId",
          foreignField: "_id",
          as: "quiz"
        }
      },
      { $unwind: "$quiz" },
      { $match: { "quiz.department": this.department } },
      {
        $group: {
          _id: null,
          avgScore: { $avg: "$scoredMarks" },
          avgTime: { $avg: "$timeTaken" },
          passRate: {
            $avg: {
              $cond: [
                { $gte: ["$scoredMarks", "$quiz.passingMarks"] },
                1,
                0
              ]
            }
          },
          totalAttempts: { $sum: 1 },
          uniqueStudents: { $addToSet: "$student" }
        }
      }
    ]);

    const data = result[0] || {};

    // Calculate score distribution
    const scoreDistribution = await this.getScoreDistribution(timeFilter);

    return {
      overallAvgScore: data.avgScore ? parseFloat(data.avgScore.toFixed(2)) : 0,
      avgTimePerQuestion: data.avgTime ? parseFloat((data.avgTime / 60).toFixed(2)) : 0, // Convert to minutes
      overallPassRate: data.passRate ? parseFloat((data.passRate * 100).toFixed(2)) : 0,
      totalAttempts: data.totalAttempts || 0,
      uniqueParticipants: data.uniqueStudents ? data.uniqueStudents.length : 0,
      scoreDistribution,
      efficiencyIndex: this.calculateEfficiencyIndex(data)
    };
  }

  /* ================= TRENDS ================= */
  async getTemporalTrends(timeRange) {
    const timeFilter = this.getTimeFilter(timeRange, "attemptedAt");

    const trends = await QuizAttempt.aggregate([
      {
        $match: timeFilter
      },
      {
        $lookup: {
          from: "quizzes",
          localField: "quizId",
          foreignField: "_id",
          as: "quiz"
        }
      },
      { $unwind: "$quiz" },
      { $match: { "quiz.department": this.department } },
      {
        $group: {
          _id: {
            year: { $year: "$attemptedAt" },
            month: { $month: "$attemptedAt" },
            week: { $week: "$attemptedAt" }
          },
          attempts: { $sum: 1 },
          avgScore: { $avg: "$scoredMarks" },
          uniqueStudents: { $addToSet: "$student" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.week": 1 } }
    ]);

    // Daily trends for recent 30 days
    const dailyTrends = await this.getDailyTrends(timeFilter);

    // Peak hours
    const peakHours = await this.getPeakActivityHours(timeFilter);

    return {
      monthly: trends.map(t => ({
        period: `${t._id.year}-${t._id.month}`,
        attempts: t.attempts,
        avgScore: t.avgScore || 0,
        uniqueStudents: t.uniqueStudents.length
      })),
      weekly: trends.map(t => ({
        period: `${t._id.year}-W${t._id.week}`,
        attempts: t.attempts,
        avgScore: t.avgScore || 0
      })),
      daily: dailyTrends,
      peakHours
    };
  }

  /* ================= HELPER METHODS ================= */
  async getCourseDistribution() {
    return Student.aggregate([
      { $match: { department: this.department } },
      { $group: { _id: "$course", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
  }

  async getFacultyDesignationDistribution() {
    return Faculty.aggregate([
      { $match: { department: this.department } },
      { $group: { _id: "$designation", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
  }

  async getScoreDistribution(timeFilter) {
    const distribution = await QuizAttempt.aggregate([
      {
        $match: timeFilter
      },
      {
        $lookup: {
          from: "quizzes",
          localField: "quizId",
          foreignField: "_id",
          as: "quiz"
        }
      },
      { $unwind: "$quiz" },
      { $match: { "quiz.department": this.department } },
      {
        $project: {
          percentage: {
            $multiply: [
              { $divide: ["$scoredMarks", "$quiz.totalMarks"] },
              100
            ]
          }
        }
      },
      {
        $bucket: {
          groupBy: "$percentage",
          boundaries: [0, 40, 60, 75, 90, 101],
          default: "Other",
          output: {
            count: { $sum: 1 },
            minScore: { $min: "$percentage" },
            maxScore: { $max: "$percentage" }
          }
        }
      }
    ]);

    return {
      poor: distribution.find(d => d._id === 0)?.count || 0,
      belowAverage: distribution.find(d => d._id === 40)?.count || 0,
      average: distribution.find(d => d._id === 60)?.count || 0,
      good: distribution.find(d => d._id === 75)?.count || 0,
      excellent: distribution.find(d => d._id === 90)?.count || 0
    };
  }

  async getDailyTrends(timeFilter) {
    return QuizAttempt.aggregate([
      {
        $match: timeFilter
      },
      {
        $lookup: {
          from: "quizzes",
          localField: "quizId",
          foreignField: "_id",
          as: "quiz"
        }
      },
      { $unwind: "$quiz" },
      { $match: { "quiz.department": this.department } },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$attemptedAt" } }
          },
          attempts: { $sum: 1 },
          uniqueStudents: { $addToSet: "$student" }
        }
      },
      { $sort: { "_id.date": -1 } },
      { $limit: 30 }
    ]);
  }

  async getPeakActivityHours(timeFilter) {
    return QuizAttempt.aggregate([
      {
        $match: timeFilter
      },
      {
        $lookup: {
          from: "quizzes",
          localField: "quizId",
          foreignField: "_id",
          as: "quiz"
        }
      },
      { $unwind: "$quiz" },
      { $match: { "quiz.department": this.department } },
      {
        $group: {
          _id: { $hour: "$attemptedAt" },
          attempts: { $sum: 1 }
        }
      },
      { $sort: { attempts: -1 } }
    ]);
  }

  getPreviousPeriodFilter(timeRange, field) {
    let startDate, endDate;

    switch (timeRange) {
      case "today":
        startDate = moment().subtract(1, 'day').startOf('day').toDate();
        endDate = moment().subtract(1, 'day').endOf('day').toDate();
        break;
      case "week":
        startDate = moment().subtract(14, 'days').toDate();
        endDate = moment().subtract(7, 'days').toDate();
        break;
      case "month":
        startDate = moment().subtract(60, 'days').toDate();
        endDate = moment().subtract(30, 'days').toDate();
        break;
      default:
        return {};
    }

    return {
      [field]: { $gte: startDate, $lte: endDate }
    };
  }

  calculateEfficiencyIndex(data) {
    if (!data.avgScore || !data.avgTime) return 0;
    
    // Higher score in less time = higher efficiency
    const timeEfficiency = 1 / (data.avgTime / 60 || 1); // Convert to minutes
    const scoreEfficiency = data.avgScore / 100;
    
    return parseFloat((timeEfficiency * scoreEfficiency).toFixed(3));
  }

  calculateKPIs(overview, performance, students) {
    return {
      studentEngagementRate: parseFloat(performance.uniqueParticipants > 0 && overview.totalStudents > 0
        ? ((performance.uniqueParticipants / overview.totalStudents) * 100).toFixed(2)
        : 0),
      facultyProductivity: parseFloat(overview.totalFaculties > 0
        ? (overview.totalQuizzes / overview.totalFaculties).toFixed(2)
        : 0),
      quizEffectiveness: parseFloat(performance.overallPassRate),
      resourceUtilization: parseFloat(overview.studentToFacultyRatio),
      learningOutcomeIndex: this.calculateLearningOutcomeIndex(performance)
    };
  }

  calculateLearningOutcomeIndex(performance) {
    // Composite index based on multiple factors
    const factors = {
      passRate: parseFloat(performance.overallPassRate) || 0,
      avgScore: (performance.overallAvgScore / 100) * 100 || 0,
      participation: parseFloat(performance.uniqueParticipants > 0 ? 80 : 0) // Simplified
    };

    const weights = { passRate: 0.4, avgScore: 0.4, participation: 0.2 };
    let index = 0;
    
    for (const [key, value] of Object.entries(factors)) {
      index += value * weights[key];
    }

    return parseFloat(index.toFixed(2));
  }

  async generateInsights(overview, performance) {
    const insights = {
      suggestedImprovements: [],
      atRiskStudents: await this.identifyAtRiskStudents(),
      potentialTopPerformers: await this.identifyPotentialTopPerformers()
    };

    // Generate suggestions based on data
    if (performance.overallPassRate < 60) {
      insights.suggestedImprovements.push("Low pass rate detected. Consider reviewing quiz difficulty levels.");
    }

    if (overview.quizGrowthRate < 0) {
      insights.suggestedImprovements.push("Quiz creation is declining. Encourage faculty participation.");
    }

    if (overview.studentToFacultyRatio > 50) {
      insights.suggestedImprovements.push("High student-to-faculty ratio. Consider adding more faculties.");
    }

    return insights;
  }

  async identifyAtRiskStudents() {
    const atRisk = await Student.aggregate([
      { $match: { department: this.department } },
      {
        $lookup: {
          from: "quizattempts",
          let: { studentId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$student", "$$studentId"] } } },
            { $sort: { attemptedAt: -1 } },
            { $limit: 5 }
          ],
          as: "recentAttempts"
        }
      },
      {
        $match: {
          $expr: {
            $and: [
              { $gte: [{ $size: "$recentAttempts" }, 3] },
              {
                $lte: [
                  { $avg: "$recentAttempts.scoredMarks" },
                  40
                ]
              }
            ]
          }
        }
      },
      {
        $project: {
          name: 1,
          studentId: "$enrollmentNumber", // Use enrollmentNumber
          course: 1,
          avgRecentScore: { $avg: "$recentAttempts.scoredMarks" }
        }
      },
      { $limit: 10 }
    ]);

    return atRisk;
  }

  async identifyPotentialTopPerformers() {
    const potentials = await Student.aggregate([
      { $match: { department: this.department } },
      {
        $lookup: {
          from: "quizattempts",
          let: { studentId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$student", "$$studentId"] } } },
            { $sort: { attemptedAt: -1 } },
            { $limit: 3 }
          ],
          as: "recentAttempts"
        }
      },
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $size: "$recentAttempts" }, 3] },
              {
                $gte: [
                  { $avg: "$recentAttempts.scoredMarks" },
                  80
                ]
              }
            ]
          }
        }
      },
      {
        $project: {
          name: 1,
          studentId: "$enrollmentNumber", // Use enrollmentNumber
          course: 1,
          avgRecentScore: { $avg: "$recentAttempts.scoredMarks" }
        }
      },
      { $limit: 10 }
    ]);

    return potentials;
  }
}

/* ================= CONTROLLERS ================= */
exports.getSuperAdminAnalytics = async (req, res) => {
  try {
    const { department } = req.user;
    const { timeRange = "all", refresh = "false" } = req.query;

    // Validate timeRange
    const validTimeRanges = ["today", "week", "month", "quarter", "year", "all"];
    if (!validTimeRanges.includes(timeRange)) {
      return res.status(400).json({
        success: false,
        message: "Invalid time range",
        validRanges: validTimeRanges
      });
    }

    const service = new AnalyticsService(department);
    const data = await service.getDepartmentAnalytics(
      timeRange,
      refresh === "true"
    );

    res.json({
      success: true,
      ...data,
      cacheInfo: {
        cached: refresh !== "true",
        timestamp: new Date().toISOString()
      }
    });
  } catch (err) {
    console.error("SuperAdmin Analytics Error:", err);
    res.status(500).json({
      success: false,
      message: "Analytics generation failed",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

exports.getAnalyticsByType = async (req, res) => {
  try {
    const { department } = req.user;
    const { type } = req.params;
    const { timeRange = "all" } = req.query;

    // Validate type
    const validTypes = ["faculty", "students", "quizzes", "performance", "trends"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid analytics type",
        validTypes: validTypes
      });
    }

    const service = new AnalyticsService(department);
    let data;

    switch (type) {
      case "faculty":
        data = await service.getFacultyAnalytics(timeRange);
        break;
      case "students":
        data = await service.getStudentAnalytics(timeRange);
        break;
      case "quizzes":
        data = await service.getQuizAnalytics(timeRange);
        break;
      case "performance":
        data = await service.getPerformanceMetrics(timeRange);
        break;
      case "trends":
        data = await service.getTemporalTrends(timeRange);
        break;
    }

    res.json({
      success: true,
      department,
      type,
      timeRange,
      data,
      generatedAt: new Date().toISOString()
    });
  } catch (err) {
    console.error(`Analytics by type error (${req.params.type}):`, err);
    res.status(500).json({
      success: false,
      message: `Failed to get ${req.params.type} analytics`,
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

exports.clearAnalyticsCache = (req, res) => {
  analyticsCache.clear();
  res.json({
    success: true,
    message: "Analytics cache cleared",
    clearedAt: new Date().toISOString()
  });
};

// Export for testing
exports.AnalyticsService = AnalyticsService;
exports.analyticsCache = analyticsCache;