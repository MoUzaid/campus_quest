



// const mongoose = require("mongoose");
// const Quiz = require("../models/quizModel");
// const QuizAttempt = require("../models/QuizAttemptModel");
// const Leaderboard = require("../models/leaderboardModel");
// const Student = require("../models/studentModel");

// // Helper functions
// const calculateAverage = (array) => {
//   if (!array || array.length === 0) return 0;
//   const sum = array.reduce((a, b) => a + b, 0);
//   return sum / array.length;
// };

// const calculateMedian = (array) => {
//   if (!array || array.length === 0) return 0;
//   const sorted = [...array].sort((a, b) => a - b);
//   const mid = Math.floor(sorted.length / 2);
//   return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
// };

// const calculateStandardDeviation = (array) => {
//   if (!array || array.length < 2) return 0;
//   const mean = calculateAverage(array);
//   const squareDiffs = array.map(value => Math.pow(value - mean, 2));
//   const avgSquareDiff = calculateAverage(squareDiffs);
//   return Math.sqrt(avgSquareDiff);
// };

// const getTimeframeDates = (timeframe) => {
//   const now = new Date();
//   let startDate = new Date(0);
//   let endDate = new Date();

//   switch (timeframe) {
//     case "today":
//       startDate = new Date(now.setHours(0, 0, 0, 0));
//       break;
//     case "week":
//       startDate = new Date(now.setDate(now.getDate() - 7));
//       break;
//     case "month":
//       startDate = new Date(now.setMonth(now.getMonth() - 1));
//       break;
//     case "quarter":
//       startDate = new Date(now.setMonth(now.getMonth() - 3));
//       break;
//     case "year":
//       startDate = new Date(now.setFullYear(now.getFullYear() - 1));
//       break;
//     case "all":
//     default:
//       startDate = new Date(0);
//   }

//   return { startDate, endDate };
// };

// const getDifficultyLevel = (score) => {
//   if (score >= 70) return "Easy";
//   if (score >= 40) return "Medium";
//   return "Hard";
// };

// const getEngagementLevel = (score) => {
//   if (score >= 80) return "Excellent";
//   if (score >= 60) return "Good";
//   if (score >= 40) return "Average";
//   return "Poor";
// };

// const calculateQuizDifficulty = (scores, totalMarks) => {
//   if (!scores || scores.length === 0) return 50;
//   const avgPercentage = (calculateAverage(scores) / totalMarks) * 100;
//   return 100 - avgPercentage;
// };

// // Main analytics calculation functions
// const calculateCoreMetrics = (quizzes, quizAttempts) => {
//   const quizIds = quizzes.map(q => q._id.toString());
  
//   // Filter attempts for these quizzes
//   const relevantAttempts = quizAttempts.filter(attempt => 
//     quizIds.includes(attempt.quizId.toString())
//   );

//   const allScores = relevantAttempts.map(attempt => attempt.scoredMarks);
//   const allPercentages = relevantAttempts.map(attempt => {
//     const quiz = quizzes.find(q => q._id.toString() === attempt.quizId.toString());
//     return quiz ? (attempt.scoredMarks / quiz.totalMarks) * 100 : 0;
//   });

//   // Total registered students across all quizzes
//   const totalRegisteredStudents = quizzes.reduce((sum, quiz) => 
//     sum + (quiz.registeredStudents?.length || 0), 0
//   );

//   // Unique students who attempted
//   const uniqueAttemptingStudents = new Set(
//     relevantAttempts.map(attempt => attempt.student.toString())
//   ).size;

//   // Calculate pass/fail statistics
//   const passFailStats = relevantAttempts.reduce((stats, attempt) => {
//     const quiz = quizzes.find(q => q._id.toString() === attempt.quizId.toString());
//     const passed = quiz && attempt.scoredMarks >= quiz.passingMarks;
//     return {
//       passed: stats.passed + (passed ? 1 : 0),
//       failed: stats.failed + (passed ? 0 : 1)
//     };
//   }, { passed: 0, failed: 0 });

//   return {
//     // Quiz Statistics
//     totalQuizzes: quizzes.length,
//     activeQuizzes: quizzes.filter(q => new Date(q.endTime) > new Date()).length,
//     completedQuizzes: quizzes.filter(q => new Date(q.endTime) <= new Date()).length,
    
//     // Student Statistics
//     totalRegisteredStudents,
//     totalAttempts: relevantAttempts.length,
//     uniqueAttemptingStudents,
//     participationRate: totalRegisteredStudents > 0 
//       ? (uniqueAttemptingStudents / totalRegisteredStudents) * 100 
//       : 0,
//     attendanceRate: totalRegisteredStudents > 0
//       ? (relevantAttempts.length / totalRegisteredStudents) * 100
//       : 0,
    
//     // Score Statistics
//     averageScore: calculateAverage(allScores),
//     averagePercentage: calculateAverage(allPercentages),
//     medianScore: calculateMedian(allScores),
//     bestScore: allScores.length > 0 ? Math.max(...allScores) : 0,
//     lowestScore: allScores.length > 0 ? Math.min(...allScores) : Infinity,
//     standardDeviation: calculateStandardDeviation(allScores),
    
//     // Pass/Fail Statistics
//     passRate: relevantAttempts.length > 0 
//       ? (passFailStats.passed / relevantAttempts.length) * 100 
//       : 0,
//     failRate: relevantAttempts.length > 0 
//       ? (passFailStats.failed / relevantAttempts.length) * 100 
//       : 0,
//     totalPassed: passFailStats.passed,
//     totalFailed: passFailStats.failed,
    
//     // Faculty Marking Style
//     averagePassingMarks: calculateAverage(quizzes.map(q => q.passingMarks)),
//     averageTotalMarks: calculateAverage(quizzes.map(q => q.totalMarks)),
//     passingPercentage: calculateAverage(
//       quizzes.map(q => (q.passingMarks / q.totalMarks) * 100)
//     ),
    
//     // Time Statistics
//     averageQuizDuration: calculateAverage(quizzes.map(q => q.durationMinutes || 0)),
//     averageTimePerAttempt: relevantAttempts.length > 0
//       ? calculateAverage(relevantAttempts.map(attempt => attempt.timeTaken || 0))
//       : 0,
    
//     // Additional Metrics
//     averageCorrectCount: relevantAttempts.length > 0
//       ? calculateAverage(relevantAttempts.map(attempt => attempt.correctCount || 0))
//       : 0,
//     averageWrongCount: relevantAttempts.length > 0
//       ? calculateAverage(relevantAttempts.map(attempt => attempt.wrongCount || 0))
//       : 0
//   };
// };

// const calculateCourseAnalytics = (quizzes, quizAttempts) => {
//   const courseMap = {};
  
//   // Initialize course structure
//   quizzes.forEach(quiz => {
//     if (!quiz.course || !Array.isArray(quiz.course)) return;
    
//     quiz.course.forEach(courseName => {
//       if (!courseMap[courseName]) {
//         courseMap[courseName] = {
//           course: courseName,
//           quizzes: [],
//           students: new Set(),
//           attempts: [],
//           scores: [],
//           quizAttempts: []
//         };
//       }
      
//       courseMap[courseName].quizzes.push(quiz._id);
      
//       // Add registered students
//       if (quiz.registeredStudents && Array.isArray(quiz.registeredStudents)) {
//         quiz.registeredStudents.forEach(studentId => {
//           courseMap[courseName].students.add(studentId.toString());
//         });
//       }
//     });
//   });

//   // Add quiz attempt data
//   quizAttempts.forEach(attempt => {
//     const quiz = quizzes.find(q => q._id.toString() === attempt.quizId.toString());
//     if (!quiz || !quiz.course) return;
    
//     quiz.course.forEach(courseName => {
//       if (courseMap[courseName]) {
//         courseMap[courseName].attempts.push(attempt);
//         courseMap[courseName].scores.push(attempt.scoredMarks);
//         courseMap[courseName].quizAttempts.push(attempt);
//       }
//     });
//   });

//   // Calculate metrics for each course
//   return Object.values(courseMap).map(course => {
//     const scores = course.scores;
//     const attempts = course.attempts;
//     const quizzesInCourse = quizzes.filter(q => 
//       q.course && q.course.includes(course.course)
//     );

//     // Find top performer in this course
//     let topPerformer = null;
//     if (attempts.length > 0) {
//       const highestScore = Math.max(...scores);
//       const topAttempt = attempts.find(a => a.scoredMarks === highestScore);
//       if (topAttempt) {
//         const quiz = quizzes.find(q => q._id.toString() === topAttempt.quizId.toString());
//         topPerformer = {
//           studentId: topAttempt.student,
//           score: topAttempt.scoredMarks,
//           quizTitle: quiz?.title || "Unknown Quiz",
//           timeTaken: topAttempt.timeTaken,
//           percentage: quiz ? (topAttempt.scoredMarks / quiz.totalMarks) * 100 : 0,
//           correctCount: topAttempt.correctCount,
//           wrongCount: topAttempt.wrongCount
//         };
//       }
//     }

//     const difficultyScore = calculateQuizDifficulty(scores, 
//       quizzesInCourse.length > 0 ? quizzesInCourse[0].totalMarks : 100
//     );

//     // Calculate course-specific pass rate
//     const coursePassRate = attempts.reduce((stats, attempt) => {
//       const quiz = quizzes.find(q => q._id.toString() === attempt.quizId.toString());
//       const passed = quiz && attempt.scoredMarks >= quiz.passingMarks;
//       return {
//         passed: stats.passed + (passed ? 1 : 0),
//         total: stats.total + 1
//       };
//     }, { passed: 0, total: 0 });

//     return {
//       course: course.course,
      
//       // Quiz Statistics
//       totalQuizzes: course.quizzes.length,
//       quizIds: course.quizzes,
      
//       // Student Statistics
//       totalRegisteredStudents: course.students.size,
//       totalAttempts: attempts.length,
//       participationRate: course.students.size > 0 
//         ? (attempts.length / course.students.size) * 100 
//         : 0,
//       uniqueAttemptingStudents: new Set(attempts.map(a => a.student.toString())).size,
      
//       // Performance Statistics
//       averageScore: calculateAverage(scores),
//       medianScore: calculateMedian(scores),
//       bestScore: scores.length > 0 ? Math.max(...scores) : 0,
//       lowestScore: scores.length > 0 ? Math.min(...scores) : Infinity,
//       standardDeviation: calculateStandardDeviation(scores),
      
//       // Pass/Fail Statistics
//       passRate: coursePassRate.total > 0 
//         ? (coursePassRate.passed / coursePassRate.total) * 100 
//         : 0,
//       totalPassed: coursePassRate.passed,
//       totalFailed: coursePassRate.total - coursePassRate.passed,
      
//       // Question Accuracy
//       averageCorrectCount: attempts.length > 0 
//         ? calculateAverage(attempts.map(a => a.correctCount || 0)) 
//         : 0,
//       averageWrongCount: attempts.length > 0 
//         ? calculateAverage(attempts.map(a => a.wrongCount || 0)) 
//         : 0,
      
//       // Time Statistics
//       averageTimeTaken: attempts.length > 0 
//         ? calculateAverage(attempts.map(a => a.timeTaken || 0)) 
//         : 0,
      
//       // Course-specific Metrics
//       difficultyLevel: getDifficultyLevel(difficultyScore),
//       difficultyScore: difficultyScore,
      
//       // Top Performer
//       topPerformer: topPerformer,
      
//       // Performance Insights
//       averageAccuracy: attempts.length > 0 
//         ? calculateAverage(attempts.map(a => {
//             const totalQuestions = (a.correctCount || 0) + (a.wrongCount || 0);
//             return totalQuestions > 0 ? ((a.correctCount || 0) / totalQuestions) * 100 : 0;
//           }))
//         : 0
//     };
//   }).sort((a, b) => b.averageScore - a.averageScore);
// };

// const calculateStudentAnalytics = (quizAttempts, allStudents, quizzes) => {
//   const studentMap = new Map();
  
//   // Process all quiz attempts
//   quizAttempts.forEach(attempt => {
//     const studentId = attempt.student.toString();
    
//     if (!studentMap.has(studentId)) {
//       const student = allStudents.find(s => s._id.toString() === studentId);
//       studentMap.set(studentId, {
//         student: student || { _id: studentId, name: "Unknown Student" },
//         attempts: [],
//         scores: [],
//         totalScore: 0,
//         quizzesAttempted: new Set(),
//         courses: new Set(),
//         totalCorrect: 0,
//         totalWrong: 0
//       });
//     }
    
//     const studentData = studentMap.get(studentId);
//     studentData.attempts.push(attempt);
//     studentData.scores.push(attempt.scoredMarks);
//     studentData.totalScore += attempt.scoredMarks;
//     studentData.quizzesAttempted.add(attempt.quizId.toString());
    
//     // Add course information from the quiz
//     const quiz = quizzes.find(q => q._id.toString() === attempt.quizId.toString());
//     if (quiz && quiz.course) {
//       quiz.course.forEach(course => {
//         studentData.courses.add(course);
//       });
//     }
    
//     // Track correct/wrong counts
//     studentData.totalCorrect += attempt.correctCount || 0;
//     studentData.totalWrong += attempt.wrongCount || 0;
//   });

//   // Convert to array and calculate metrics
//   const studentAnalytics = Array.from(studentMap.values()).map(data => {
//     const attempts = data.attempts;
//     const scores = data.scores;
    
//     // Calculate consistency (lower std dev = more consistent)
//     const consistencyScore = scores.length > 1 
//       ? 100 - Math.min(calculateStandardDeviation(scores) * 10, 100)
//       : 0;

//     // Calculate accuracy
//     const totalQuestions = data.totalCorrect + data.totalWrong;
//     const accuracyRate = totalQuestions > 0 ? (data.totalCorrect / totalQuestions) * 100 : 0;

//     // Find best performance
//     const bestAttempt = attempts.reduce((best, current) => 
//       current.scoredMarks > best.scoredMarks ? current : best
//     , { scoredMarks: -Infinity });

//     return {
//       student: {
//         name: data.student.name,
//         studentId: data.student.studentId,
//         course: data.student.course,
//         department: data.student.department,
//         semester: data.student.semester
//       },
//       performance: {
//         totalAttempts: attempts.length,
//         totalQuizzesAttempted: data.quizzesAttempted.size,
//         averageScore: calculateAverage(scores),
//         bestScore: Math.max(...scores),
//         bestQuizId: bestAttempt.quizId,
//         lowestScore: Math.min(...scores),
//         totalScore: data.totalScore,
//         consistencyScore: Math.round(consistencyScore),
//         accuracyRate: Math.round(accuracyRate),
//         totalCorrect: data.totalCorrect,
//         totalWrong: data.totalWrong,
//         coursesAttempted: Array.from(data.courses)
//       },
//       engagement: {
//         attendanceRate: data.quizzesAttempted.size > 0
//           ? (attempts.length / data.quizzesAttempted.size) * 100
//           : 0,
//         averageTimePerAttempt: calculateAverage(attempts.map(a => a.timeTaken || 0)),
//         lastActive: attempts.length > 0 
//           ? new Date(Math.max(...attempts.map(a => new Date(a.attemptedAt)))) 
//           : null
//       },
//       rank: 0 // Will be calculated separately
//     };
//   });

//   // Calculate ranks based on average score
//   studentAnalytics.sort((a, b) => b.performance.averageScore - a.performance.averageScore);
//   studentAnalytics.forEach((student, index) => {
//     student.performance.rank = index + 1;
//   });

//   // Calculate overall statistics
//   const allAverageScores = studentAnalytics.map(s => s.performance.averageScore);
  
//   return {
//     totalStudents: studentAnalytics.length,
//     averageStudentScore: calculateAverage(allAverageScores),
//     averageAccuracy: calculateAverage(studentAnalytics.map(s => s.performance.accuracyRate)),
//     topRankers: studentAnalytics.slice(0, 10).map(s => ({
//       ...s,
//       // Include more details for top rankers
//       bestScoreDetails: {
//         score: s.performance.bestScore,
//         quizId: s.performance.bestQuizId
//       }
//     })),
//     bottomRankers: studentAnalytics.slice(-5).reverse(),
//     mostConsistentStudents: studentAnalytics
//       .filter(s => s.performance.totalAttempts >= 3)
//       .sort((a, b) => b.performance.consistencyScore - a.performance.consistencyScore)
//       .slice(0, 5),
//     mostAccurateStudents: studentAnalytics
//       .filter(s => s.performance.totalAttempts >= 2)
//       .sort((a, b) => b.performance.accuracyRate - a.performance.accuracyRate)
//       .slice(0, 5),
//     atRiskStudents: studentAnalytics
//       .filter(s => s.performance.averageScore < 40 && s.performance.totalAttempts >= 2)
//       .slice(0, 10),
//     distribution: {
//       excellent: studentAnalytics.filter(s => s.performance.averageScore >= 80).length,
//       good: studentAnalytics.filter(s => s.performance.averageScore >= 60 && s.performance.averageScore < 80).length,
//       average: studentAnalytics.filter(s => s.performance.averageScore >= 40 && s.performance.averageScore < 60).length,
//       poor: studentAnalytics.filter(s => s.performance.averageScore >= 20 && s.performance.averageScore < 40).length,
//       fail: studentAnalytics.filter(s => s.performance.averageScore < 20).length
//     }
//   };
// };

// const calculateQuizAnalytics = (quizzes, quizAttempts) => {
//   return quizzes.map(quiz => {
//     const quizAttemptsList = quizAttempts.filter(attempt => 
//       attempt.quizId.toString() === quiz._id.toString()
//     );
    
//     const scores = quizAttemptsList.map(attempt => attempt.scoredMarks);
//     const percentages = quizAttemptsList.map(attempt => 
//       (attempt.scoredMarks / quiz.totalMarks) * 100
//     );

//     // Calculate detailed statistics
//     const totalCorrect = quizAttemptsList.reduce((sum, attempt) => sum + (attempt.correctCount || 0), 0);
//     const totalWrong = quizAttemptsList.reduce((sum, attempt) => sum + (attempt.wrongCount || 0), 0);
//     const totalQuestions = totalCorrect + totalWrong;
//     const averageAccuracy = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;

//     // Time statistics
//     const timeTakenList = quizAttemptsList.map(a => a.timeTaken || 0);
//     const averageTimeTaken = calculateAverage(timeTakenList);

//     return {
//       quizId: quiz._id,
//       title: quiz.title,
//       course: quiz.course,
//       subject: quiz.subject,
//       department: quiz.department,
//       createdAt: quiz.createdAt,
//       startTime: quiz.startTime,
//       endTime: quiz.endTime,
//       durationMinutes: quiz.durationMinutes,
      
//       // Registration & Attendance
//       registeredStudents: quiz.registeredStudents?.length || 0,
//       attemptedStudents: quizAttemptsList.length,
//       attendanceRate: quiz.registeredStudents?.length > 0 
//         ? (quizAttemptsList.length / quiz.registeredStudents.length) * 100 
//         : 0,
      
//       // Performance Metrics
//       passingMarks: quiz.passingMarks,
//       totalMarks: quiz.totalMarks,
//       averageScore: calculateAverage(scores),
//       averagePercentage: calculateAverage(percentages),
//       bestScore: scores.length > 0 ? Math.max(...scores) : 0,
//       lowestScore: scores.length > 0 ? Math.min(...scores) : Infinity,
//       medianScore: calculateMedian(scores),
//       standardDeviation: calculateStandardDeviation(scores),
      
//       // Pass/Fail Analysis
//       passRate: quizAttemptsList.length > 0 
//         ? (quizAttemptsList.filter(attempt => attempt.scoredMarks >= quiz.passingMarks).length / quizAttemptsList.length) * 100 
//         : 0,
//       totalPassed: quizAttemptsList.filter(attempt => attempt.scoredMarks >= quiz.passingMarks).length,
//       totalFailed: quizAttemptsList.filter(attempt => attempt.scoredMarks < quiz.passingMarks).length,
      
//       // Question Analysis
//       averageCorrectCount: calculateAverage(quizAttemptsList.map(a => a.correctCount || 0)),
//       averageWrongCount: calculateAverage(quizAttemptsList.map(a => a.wrongCount || 0)),
//       totalQuestionsAnswered: totalQuestions,
//       averageAccuracy: averageAccuracy,
      
//       // Time Analysis
//       averageTimeTaken: averageTimeTaken,
//       fastestCompletion: timeTakenList.length > 0 ? Math.min(...timeTakenList) : 0,
//       slowestCompletion: timeTakenList.length > 0 ? Math.max(...timeTakenList) : 0,
      
//       // Difficulty Analysis
//       difficultyScore: calculateQuizDifficulty(scores, quiz.totalMarks),
//       difficultyLevel: getDifficultyLevel(calculateQuizDifficulty(scores, quiz.totalMarks)),
      
//       // Top 5 Performers from quiz attempts
//       topPerformers: quizAttemptsList
//         .sort((a, b) => b.scoredMarks - a.scoredMarks)
//         .slice(0, 5)
//         .map((attempt, index) => ({
//           rank: index + 1,
//           studentId: attempt.student,
//           score: attempt.scoredMarks,
//           percentage: (attempt.scoredMarks / quiz.totalMarks) * 100,
//           timeTaken: attempt.timeTaken,
//           correctCount: attempt.correctCount,
//           wrongCount: attempt.wrongCount,
//           accuracy: (attempt.correctCount || 0) + (attempt.wrongCount || 0) > 0 
//             ? ((attempt.correctCount || 0) / ((attempt.correctCount || 0) + (attempt.wrongCount || 0))) * 100 
//             : 0,
//           attemptedAt: attempt.attemptedAt
//         }))
//     };
//   }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
// };

// const generatePerformanceInsights = (coreMetrics, courseAnalytics, quizAnalytics) => {
//   const insights = {
//     strengths: [],
//     areasForImprovement: [],
//     opportunities: [],
//     keyFindings: [],
//     alerts: []
//   };

//   // Analyze strengths
//   if (coreMetrics.passRate > 70) {
//     insights.strengths.push({
//       title: "High Pass Rate",
//       description: `Your quizzes have a ${coreMetrics.passRate.toFixed(1)}% pass rate, indicating well-designed assessment criteria.`,
//       metric: "passRate",
//       value: coreMetrics.passRate
//     });
//   }

//   if (coreMetrics.participationRate > 60) {
//     insights.strengths.push({
//       title: "Good Student Engagement",
//       description: `${coreMetrics.participationRate.toFixed(1)}% of registered students attempt your quizzes.`,
//       metric: "participationRate",
//       value: coreMetrics.participationRate
//     });
//   }

//   if (coreMetrics.averageAccuracy > 70) {
//     insights.strengths.push({
//       title: "High Question Accuracy",
//       description: `Students are answering ${coreMetrics.averageAccuracy.toFixed(1)}% of questions correctly on average.`,
//       metric: "accuracy",
//       value: coreMetrics.averageAccuracy
//     });
//   }

//   // Analyze areas for improvement
//   if (coreMetrics.standardDeviation > 20) {
//     insights.areasForImprovement.push({
//       title: "High Score Variability",
//       description: "Large variation in student scores suggests inconsistent question difficulty.",
//       metric: "scoreVariability",
//       value: coreMetrics.standardDeviation,
//       recommendation: "Consider adding more medium-difficulty questions"
//     });
//   }

//   if (coreMetrics.participationRate < 40) {
//     insights.areasForImprovement.push({
//       title: "Low Participation Rate",
//       description: "Only a small percentage of registered students are attempting quizzes.",
//       metric: "participationRate",
//       value: coreMetrics.participationRate,
//       recommendation: "Consider sending reminder notifications"
//     });
//   }

//   // Find best performing course
//   if (courseAnalytics.length > 0) {
//     const bestCourse = courseAnalytics.reduce((prev, current) => 
//       (prev.averageScore > current.averageScore) ? prev : current
//     );
    
//     insights.keyFindings.push({
//       title: "Top Performing Course",
//       description: `${bestCourse.course} has the highest average score of ${bestCourse.averageScore.toFixed(1)}`,
//       course: bestCourse.course,
//       score: bestCourse.averageScore
//     });

//     // Find course with highest accuracy
//     const mostAccurateCourse = courseAnalytics.reduce((prev, current) => 
//       (prev.averageAccuracy > current.averageAccuracy) ? prev : current
//     );
    
//     insights.keyFindings.push({
//       title: "Most Accurate Course",
//       description: `${mostAccurateCourse.course} has ${mostAccurateCourse.averageAccuracy.toFixed(1)}% question accuracy`,
//       course: mostAccurateCourse.course,
//       accuracy: mostAccurateCourse.averageAccuracy
//     });
//   }

//   // Check for difficult quizzes
//   const difficultQuizzes = quizAnalytics.filter(q => q.difficultyLevel === "Hard");
//   if (difficultQuizzes.length > 0) {
//     insights.alerts.push({
//       type: "warning",
//       title: "Difficult Quizzes Detected",
//       description: `${difficultQuizzes.length} quizzes are classified as difficult (average score < 40%)`,
//       count: difficultQuizzes.length,
//       quizzes: difficultQuizzes.map(q => q.title)
//     });
//   }

//   return insights;
// };

// const generateRecommendations = (coreMetrics, courseAnalytics, studentAnalytics, quizAnalytics) => {
//   const recommendations = [];

//   // Based on participation rate
//   if (coreMetrics.participationRate < 50) {
//     recommendations.push({
//       category: "Student Engagement",
//       priority: "high",
//       title: "Increase Quiz Participation",
//       description: `Only ${coreMetrics.participationRate.toFixed(1)}% of registered students are attempting quizzes.`,
//       actionItems: [
//         "Send email reminders 24 hours before quiz starts",
//         "Offer bonus marks for early participation",
//         "Make quiz timing more flexible"
//       ],
//       expectedImpact: "Increase participation by 20-30%"
//     });
//   }

//   // Based on pass rate
//   if (coreMetrics.passRate < 60) {
//     recommendations.push({
//       category: "Assessment Design",
//       priority: "medium",
//       title: "Improve Quiz Pass Rates",
//       description: `Current pass rate is ${coreMetrics.passRate.toFixed(1)}%. Consider adjusting difficulty.`,
//       actionItems: [
//         "Review and adjust passing marks criteria",
//         "Add more practice questions before the quiz",
//         "Provide topic-wise study materials"
//       ],
//       expectedImpact: "Increase pass rate by 10-15%"
//     });
//   }

//   // Based on student analytics
//   if (studentAnalytics.atRiskStudents.length > 5) {
//     recommendations.push({
//       category: "Student Support",
//       priority: "high",
//       title: "Support At-Risk Students",
//       description: `${studentAnalytics.atRiskStudents.length} students are consistently scoring below 40%.`,
//       actionItems: [
//         "Schedule one-on-one consultation sessions",
//         "Provide additional practice materials",
//         "Create peer mentoring groups"
//       ],
//       expectedImpact: "Improve scores for at-risk students by 20%"
//     });
//   }

//   // Based on accuracy rate
//   if (coreMetrics.averageAccuracy < 60) {
//     recommendations.push({
//       category: "Question Quality",
//       priority: "medium",
//       title: "Improve Question Clarity",
//       description: `Average question accuracy is ${coreMetrics.averageAccuracy.toFixed(1)}%.`,
//       actionItems: [
//         "Review questions with low accuracy rates",
//         "Add more detailed explanations",
//         "Conduct question validation with sample students"
//       ],
//       expectedImpact: "Improve accuracy by 15-20%"
//     });
//   }

//   return recommendations;
// };

// const calculateTimeTrends = (quizzes, quizAttempts) => {
//   const monthlyData = {};
  
//   // Group by month
//   quizzes.forEach(quiz => {
//     const date = new Date(quiz.createdAt);
//     const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
//     if (!monthlyData[month]) {
//       monthlyData[month] = {
//         month: month,
//         quizzesCreated: 0,
//         totalStudents: 0,
//         totalAttempts: 0,
//         totalScore: 0,
//         scores: []
//       };
//     }
    
//     monthlyData[month].quizzesCreated++;
//     monthlyData[month].totalStudents += quiz.registeredStudents?.length || 0;
    
//     // Add attempts for this quiz
//     const quizAttemptsList = quizAttempts.filter(attempt => 
//       attempt.quizId.toString() === quiz._id.toString()
//     );
    
//     monthlyData[month].totalAttempts += quizAttemptsList.length;
//     quizAttemptsList.forEach(attempt => {
//       monthlyData[month].totalScore += attempt.scoredMarks;
//       monthlyData[month].scores.push(attempt.scoredMarks);
//     });
//   });

//   // Calculate monthly metrics
//   const monthlyTrends = Object.values(monthlyData).map(data => ({
//     month: data.month,
//     quizzesCreated: data.quizzesCreated,
//     averageStudentsPerQuiz: data.quizzesCreated > 0 ? data.totalStudents / data.quizzesCreated : 0,
//     averageAttemptsPerQuiz: data.quizzesCreated > 0 ? data.totalAttempts / data.quizzesCreated : 0,
//     averageScore: data.scores.length > 0 ? calculateAverage(data.scores) : 0,
//     totalScore: data.totalScore
//   })).sort((a, b) => a.month.localeCompare(b.month));

//   return {
//     monthly: monthlyTrends,
//     bestMonth: monthlyTrends.reduce((prev, current) => 
//       (prev.averageScore > current.averageScore) ? prev : current,
//       { averageScore: -Infinity }
//     ),
//     mostActiveMonth: monthlyTrends.reduce((prev, current) => 
//       (prev.quizzesCreated > current.quizzesCreated) ? prev : current,
//       { quizzesCreated: -Infinity }
//     )
//   };
// };

// const calculateEngagementMetrics = (quizzes, quizAttempts) => {
//   const totalRegistered = quizzes.reduce((sum, q) => sum + (q.registeredStudents?.length || 0), 0);
//   const totalAttempts = quizAttempts.length;
//   const completionRate = totalRegistered > 0 ? (totalAttempts / totalRegistered) * 100 : 0;
  
//   // Calculate dropout rate
//   const dropoutRate = totalRegistered > 0 
//     ? ((totalRegistered - quizAttempts.length) / totalRegistered) * 100 
//     : 0;
  
//   const uniqueStudents = new Set(quizAttempts.map(attempt => attempt.student.toString())).size;
//   const avgAttemptsPerStudent = uniqueStudents > 0 ? totalAttempts / uniqueStudents : 0;
  
//   const engagementScore = Math.min(
//     (completionRate * 0.4) + 
//     ((100 - dropoutRate) * 0.3) + 
//     (Math.min(avgAttemptsPerStudent * 20, 100) * 0.3),
//     100
//   );

//   return {
//     completionRate: completionRate,
//     dropoutRate: dropoutRate,
//     avgAttemptsPerStudent: avgAttemptsPerStudent,
//     engagementScore: engagementScore,
//     engagementLevel: getEngagementLevel(engagementScore),
//     activeStudents: uniqueStudents,
//     inactiveStudents: totalRegistered - uniqueStudents,
//     reengagementOpportunity: Math.max(0, totalRegistered - uniqueStudents)
//   };
// };

// const calculatePredictiveAnalytics = (quizzes, quizAttempts) => {
//   if (quizzes.length < 3 || quizAttempts.length < 10) {
//     return {
//       available: false,
//       message: "Insufficient data for predictive analytics"
//     };
//   }

//   // Group scores by month
//   const scoresByDate = quizAttempts
//     .map(attempt => ({
//       date: new Date(attempt.attemptedAt),
//       score: attempt.scoredMarks
//     }))
//     .sort((a, b) => a.date - b.date);

//   if (scoresByDate.length < 5) {
//     return {
//       available: false,
//       message: "Need more data points for prediction"
//     };
//   }

//   // Simple trend analysis
//   const scores = scoresByDate.map(s => s.score);
//   const recentScores = scores.slice(-5); // Last 5 attempts
//   const olderScores = scores.slice(0, -5); // All but last 5
  
//   const recentAvg = calculateAverage(recentScores);
//   const olderAvg = calculateAverage(olderScores);
//   const trend = recentAvg > olderAvg ? "improving" : "declining";
  
//   const changePercentage = olderAvg > 0 
//     ? ((recentAvg - olderAvg) / olderAvg) * 100 
//     : 0;

//   // Predict next quiz performance
//   const nextQuizPrediction = {
//     predictedAverageScore: trend === "improving" 
//       ? recentAvg * 1.05
//       : recentAvg * 0.95,
//     confidence: Math.min(Math.abs(changePercentage) * 2, 90), // Higher confidence for larger trends
//     trend: trend,
//     changePercentage: changePercentage.toFixed(1),
//     recommendation: trend === "improving" 
//       ? "Continue current teaching methods"
//       : "Consider reviewing assessment strategy"
//   };

//   return {
//     available: true,
//     nextQuizPrediction: nextQuizPrediction,
//     performanceTrend: trend,
//     recentPerformance: recentAvg,
//     historicalPerformance: olderAvg
//   };
// };

// const getEmptyAnalyticsStructure = (facultyName) => {
//   return {
//     success: true,
//     timestamp: new Date().toISOString(),
//     data: {
//       summary: {
//         facultyName: facultyName,
//         message: "No quizzes created yet. Start by creating your first quiz!",
//         lastUpdated: new Date()
//       },
//       overview: {
//         totalQuizzes: 0,
//         totalRegisteredStudents: 0,
//         totalAttempts: 0,
//         participationRate: 0,
//         averageScore: 0,
//         passRate: 0,
//         averageAccuracy: 0
//       },
//       courses: [],
//       students: {
//         totalStudents: 0,
//         topRankers: []
//       },
//       quizzes: [],
//       trends: {
//         monthly: []
//       },
//       insights: {
//         strengths: [],
//         areasForImprovement: [],
//         recommendations: [
//           {
//             category: "Getting Started",
//             priority: "high",
//             title: "Create Your First Quiz",
//             description: "Begin by creating a quiz to start collecting analytics data.",
//             actionItems: [
//               "Click on 'Create New Quiz' in your dashboard",
//               "Add questions with varying difficulty levels",
//               "Set appropriate passing criteria",
//               "Schedule the quiz for optimal participation"
//             ]
//           }
//         ]
//       }
//     }
//   };
// };

// // Main exported function
// exports.getFacultyAnalytics = async (req, res) => {
//   const startTime = Date.now();
  
//   try {
//     const facultyId = req.user._id;
//     const { timeframe = "all", forceRefresh = false } = req.query;
    
//     console.time("Analytics Computation");

//     // Fetch all required data in parallel
//     const [quizzes, quizAttempts, allStudents] = await Promise.all([
//       // Get faculty's quizzes
//       Quiz.find({ createdBy: facultyId })
//         .select("_id title course subject department passingMarks totalMarks registeredStudents startTime endTime createdAt durationMinutes")
//         .lean(),
      
//       // Get ALL quiz attempts (we'll filter by faculty's quizzes later)
//       QuizAttempt.find({})
//         .select("quizId student scoredMarks correctCount wrongCount timeTaken attemptedAt")
//         .lean(),
      
//       // Get all students for reference
//       Student.find({})
//         .select("name studentId course department semester")
//         .lean()
//     ]);
    
//     if (!quizzes.length) {
//       console.timeEnd("Analytics Computation");
//       return res.status(200).json(getEmptyAnalyticsStructure(req.user.name));
//     }

//     // Apply timeframe filter if specified
//     let filteredQuizzes = quizzes;
//     let filteredAttempts = quizAttempts;

//     if (timeframe !== "all") {
//       const { startDate, endDate } = getTimeframeDates(timeframe);
      
//       filteredQuizzes = quizzes.filter(q => 
//         new Date(q.createdAt) >= startDate && 
//         new Date(q.createdAt) <= endDate
//       );
      
//       // Filter attempts based on filtered quizzes
//       const filteredQuizIds = filteredQuizzes.map(q => q._id.toString());
//       filteredAttempts = quizAttempts.filter(attempt => 
//         filteredQuizIds.includes(attempt.quizId.toString())
//       );
//     } else {
//       // For 'all' timeframe, filter attempts to only faculty's quizzes
//       const facultyQuizIds = quizzes.map(q => q._id.toString());
//       filteredAttempts = quizAttempts.filter(attempt => 
//         facultyQuizIds.includes(attempt.quizId.toString())
//       );
//     }

//     // Calculate all analytics using QuizAttempt data
//     const coreMetrics = calculateCoreMetrics(filteredQuizzes, filteredAttempts);
    
//     // Add accuracy metric to core metrics
//     const totalCorrect = filteredAttempts.reduce((sum, attempt) => sum + (attempt.correctCount || 0), 0);
//     const totalWrong = filteredAttempts.reduce((sum, attempt) => sum + (attempt.wrongCount || 0), 0);
//     const totalQuestions = totalCorrect + totalWrong;
//     coreMetrics.averageAccuracy = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;

//     const courseAnalytics = calculateCourseAnalytics(filteredQuizzes, filteredAttempts);
//     const studentAnalytics = calculateStudentAnalytics(filteredAttempts, allStudents, filteredQuizzes);
//     const quizAnalytics = calculateQuizAnalytics(filteredQuizzes, filteredAttempts);
//     const timeTrends = calculateTimeTrends(filteredQuizzes, filteredAttempts);
//     const performanceInsights = generatePerformanceInsights(coreMetrics, courseAnalytics, quizAnalytics);
//     const recommendations = generateRecommendations(coreMetrics, courseAnalytics, studentAnalytics, quizAnalytics);
//     const engagementMetrics = calculateEngagementMetrics(filteredQuizzes, filteredAttempts);
//     const predictiveAnalytics = calculatePredictiveAnalytics(filteredQuizzes, filteredAttempts);

//     console.timeEnd("Analytics Computation");

//     // Build comprehensive response
//     const response = {
//       success: true,
//       timestamp: new Date().toISOString(),
//       timeframe: timeframe,
//       data: {
//         summary: {
//           facultyName: req.user.name,
//           facultyId: req.user.facultyId,
//           department: req.user.department,
//           lastUpdated: new Date(),
//           totalComputationTime: `${Date.now() - startTime}ms`,
//           dataPoints: {
//             quizzes: filteredQuizzes.length,
//             quizAttempts: filteredAttempts.length,
//             uniqueStudents: studentAnalytics.totalStudents,
//             totalQuestionsAnswered: totalQuestions
//           }
//         },

//         // Core Metrics
//         overview: coreMetrics,

//         // Deep Analytics
//         courses: courseAnalytics,
//         students: studentAnalytics,
//         quizzes: quizAnalytics,

//         // Trends & Patterns
//         trends: {
//           timeBased: timeTrends,
//           engagement: engagementMetrics
//         },

//         // Predictive Analytics
//         predictive: predictiveAnalytics,

//         // Actionable Insights
//         insights: performanceInsights,
//         recommendations: recommendations,

//         // Data Source Info
//         metadata: {
//           dataSource: "QuizAttempt Model",
//           scoreCalculation: "Based on scoredMarks from QuizAttempt records",
//           accuracyCalculation: "Based on correctCount/wrongCount from QuizAttempt records",
//           lastDataSync: new Date().toISOString()
//         }
//       }
//     };

//     res.status(200).json(response);

//   } catch (error) {
//     console.error("Faculty Analytics Error:", {
//       error: error.message,
//       stack: error.stack,
//       facultyId: req.user?._id,
//       timestamp: new Date().toISOString()
//     });

//     res.status(500).json({
//       success: false,
//       message: "Analytics generation failed",
//       error: process.env.NODE_ENV === 'development' ? error.message : "Internal server error",
//       referenceId: `ERR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
//       supportContact: "analytics-support@university.edu"
//     });
//   }
// };











// controllers/facultyAnalyticsController.js
const mongoose = require("mongoose");
const Quiz = require("../models/quizModel");
const QuizAttempt = require("../models/QuizAttemptModel");
const Student = require("../models/studentModel");

// Helper functions
const calculateAverage = (array) => {
  if (!array || array.length === 0) return 0;
  const sum = array.reduce((a, b) => a + b, 0);
  return sum / array.length;
};

const calculateMedian = (array) => {
  if (!array || array.length === 0) return 0;
  const sorted = [...array].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

const calculateStandardDeviation = (array) => {
  if (!array || array.length < 2) return 0;
  const mean = calculateAverage(array);
  const squareDiffs = array.map(value => Math.pow(value - mean, 2));
  const avgSquareDiff = calculateAverage(squareDiffs);
  return Math.sqrt(avgSquareDiff);
};

const getTimeframeDates = (timeframe) => {
  const now = new Date();
  let startDate = new Date(0);
  let endDate = new Date();

  switch (timeframe) {
    case "today":
      startDate = new Date(now.setHours(0, 0, 0, 0));
      break;
    case "week":
      startDate = new Date(now.setDate(now.getDate() - 7));
      break;
    case "month":
      startDate = new Date(now.setMonth(now.getMonth() - 1));
      break;
    case "quarter":
      startDate = new Date(now.setMonth(now.getMonth() - 3));
      break;
    case "year":
      startDate = new Date(now.setFullYear(now.getFullYear() - 1));
      break;
    case "all":
    default:
      startDate = new Date(0);
  }

  return { startDate, endDate };
};

const getDifficultyLevel = (score) => {
  if (score >= 70) return "Easy";
  if (score >= 40) return "Medium";
  return "Hard";
};

const getEngagementLevel = (score) => {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Average";
  return "Poor";
};

const calculateQuizDifficulty = (scores, totalMarks) => {
  if (!scores || scores.length === 0) return 50;
  const avgPercentage = (calculateAverage(scores) / totalMarks) * 100;
  return 100 - avgPercentage;
};

const calculatePercentage = (score, totalMarks) => {
  return totalMarks > 0 ? (score / totalMarks) * 100 : 0;
};

const getPerformanceCategory = (percentage) => {
  if (percentage >= 80) return "excellent";
  if (percentage >= 60) return "good";
  if (percentage >= 40) return "average";
  if (percentage >= 20) return "poor";
  return "fail";
};

// Main analytics calculation functions
const calculateCoreMetrics = (quizzes, quizAttempts) => {
  const quizIds = quizzes.map(q => q._id.toString());
  
  // Filter attempts for these quizzes
  const relevantAttempts = quizAttempts.filter(attempt => 
    quizIds.includes(attempt.quizId.toString())
  );

  const allScores = relevantAttempts.map(attempt => attempt.scoredMarks);
  const allPercentages = relevantAttempts.map(attempt => {
    const quiz = quizzes.find(q => q._id.toString() === attempt.quizId.toString());
    return quiz ? calculatePercentage(attempt.scoredMarks, quiz.totalMarks) : 0;
  });

  // Total registered students across all quizzes
  const totalRegisteredStudents = quizzes.reduce((sum, quiz) => 
    sum + (quiz.registeredStudents?.length || 0), 0
  );

  // Unique students who attempted
  const uniqueAttemptingStudents = new Set(
    relevantAttempts.map(attempt => attempt.student.toString())
  ).size;

  // Calculate pass/fail statistics
  const passFailStats = relevantAttempts.reduce((stats, attempt) => {
    const quiz = quizzes.find(q => q._id.toString() === attempt.quizId.toString());
    const passed = quiz && attempt.scoredMarks >= quiz.passingMarks;
    return {
      passed: stats.passed + (passed ? 1 : 0),
      failed: stats.failed + (passed ? 0 : 1)
    };
  }, { passed: 0, failed: 0 });

  // Calculate accuracy
  const totalCorrect = relevantAttempts.reduce((sum, attempt) => sum + (attempt.correctCount || 0), 0);
  const totalWrong = relevantAttempts.reduce((sum, attempt) => sum + (attempt.wrongCount || 0), 0);
  const totalQuestions = totalCorrect + totalWrong;
  const averageAccuracy = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;

  return {
    // Quiz Statistics
    totalQuizzes: quizzes.length,
    activeQuizzes: quizzes.filter(q => new Date(q.endTime) > new Date()).length,
    completedQuizzes: quizzes.filter(q => new Date(q.endTime) <= new Date()).length,
    
    // Student Statistics
    totalRegisteredStudents,
    totalAttempts: relevantAttempts.length,
    uniqueAttemptingStudents,
    participationRate: totalRegisteredStudents > 0 
      ? (uniqueAttemptingStudents / totalRegisteredStudents) * 100 
      : 0,
    attendanceRate: totalRegisteredStudents > 0
      ? (relevantAttempts.length / totalRegisteredStudents) * 100
      : 0,
    
    // Score Statistics
    averageScore: calculateAverage(allScores),
    averagePercentage: calculateAverage(allPercentages),
    medianScore: calculateMedian(allScores),
    bestScore: allScores.length > 0 ? Math.max(...allScores) : 0,
    lowestScore: allScores.length > 0 ? Math.min(...allScores) : Infinity,
    standardDeviation: calculateStandardDeviation(allScores),
    
    // Pass/Fail Statistics
    passRate: relevantAttempts.length > 0 
      ? (passFailStats.passed / relevantAttempts.length) * 100 
      : 0,
    failRate: relevantAttempts.length > 0 
      ? (passFailStats.failed / relevantAttempts.length) * 100 
      : 0,
    totalPassed: passFailStats.passed,
    totalFailed: passFailStats.failed,
    
    // Faculty Marking Style
    averagePassingMarks: calculateAverage(quizzes.map(q => q.passingMarks)),
    averageTotalMarks: calculateAverage(quizzes.map(q => q.totalMarks)),
    passingPercentage: calculateAverage(
      quizzes.map(q => calculatePercentage(q.passingMarks, q.totalMarks))
    ),
    
    // Time Statistics
    averageQuizDuration: calculateAverage(quizzes.map(q => q.durationMinutes || 0)),
    averageTimePerAttempt: relevantAttempts.length > 0
      ? calculateAverage(relevantAttempts.map(attempt => attempt.timeTaken || 0))
      : 0,
    
    // Additional Metrics
    averageCorrectCount: relevantAttempts.length > 0
      ? calculateAverage(relevantAttempts.map(attempt => attempt.correctCount || 0))
      : 0,
    averageWrongCount: relevantAttempts.length > 0
      ? calculateAverage(relevantAttempts.map(attempt => attempt.wrongCount || 0))
      : 0,
    averageAccuracy: averageAccuracy,
    totalQuestionsAnswered: totalQuestions,
    averageQuestionsPerAttempt: relevantAttempts.length > 0
      ? calculateAverage(relevantAttempts.map(attempt => 
          (attempt.correctCount || 0) + (attempt.wrongCount || 0)
        ))
      : 0
  };
};

const calculateCourseAnalytics = (quizzes, quizAttempts) => {
  const courseMap = {};
  
  // Initialize course structure
  quizzes.forEach(quiz => {
    if (!quiz.course || !Array.isArray(quiz.course)) return;
    
    quiz.course.forEach(courseName => {
      if (!courseMap[courseName]) {
        courseMap[courseName] = {
          course: courseName,
          quizzes: [],
          students: new Set(),
          attempts: [],
          scores: [],
          percentages: [],
          quizAttempts: []
        };
      }
      
      courseMap[courseName].quizzes.push(quiz._id);
      
      // Add registered students
      if (quiz.registeredStudents && Array.isArray(quiz.registeredStudents)) {
        quiz.registeredStudents.forEach(studentId => {
          courseMap[courseName].students.add(studentId.toString());
        });
      }
    });
  });

  // Add quiz attempt data
  quizAttempts.forEach(attempt => {
    const quiz = quizzes.find(q => q._id.toString() === attempt.quizId.toString());
    if (!quiz || !quiz.course) return;
    
    quiz.course.forEach(courseName => {
      if (courseMap[courseName]) {
        courseMap[courseName].attempts.push(attempt);
        courseMap[courseName].scores.push(attempt.scoredMarks);
        courseMap[courseName].percentages.push(calculatePercentage(attempt.scoredMarks, quiz.totalMarks));
        courseMap[courseName].quizAttempts.push(attempt);
      }
    });
  });

  // Calculate metrics for each course
  return Object.values(courseMap).map(course => {
    const scores = course.scores;
    const percentages = course.percentages;
    const attempts = course.attempts;
    const quizzesInCourse = quizzes.filter(q => 
      q.course && q.course.includes(course.course)
    );

    // Find top performer in this course
    let topPerformer = null;
    if (attempts.length > 0) {
      const highestScore = Math.max(...scores);
      const topAttempt = attempts.find(a => a.scoredMarks === highestScore);
      if (topAttempt) {
        const quiz = quizzes.find(q => q._id.toString() === topAttempt.quizId.toString());
        topPerformer = {
          studentId: topAttempt.student,
          score: topAttempt.scoredMarks,
          percentage: calculatePercentage(topAttempt.scoredMarks, quiz?.totalMarks || 1),
          quizTitle: quiz?.title || "Unknown Quiz",
          timeTaken: topAttempt.timeTaken,
          correctCount: topAttempt.correctCount,
          wrongCount: topAttempt.wrongCount
        };
      }
    }

    // Calculate course-specific pass rate
    const coursePassRate = attempts.reduce((stats, attempt) => {
      const quiz = quizzes.find(q => q._id.toString() === attempt.quizId.toString());
      const passed = quiz && attempt.scoredMarks >= quiz.passingMarks;
      return {
        passed: stats.passed + (passed ? 1 : 0),
        total: stats.total + 1
      };
    }, { passed: 0, total: 0 });

    // Calculate accuracy for this course
    const totalCorrect = attempts.reduce((sum, attempt) => sum + (attempt.correctCount || 0), 0);
    const totalWrong = attempts.reduce((sum, attempt) => sum + (attempt.wrongCount || 0), 0);
    const totalQuestions = totalCorrect + totalWrong;
    const averageAccuracy = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;

    // Calculate difficulty score
    const difficultyScore = calculateQuizDifficulty(scores, 
      quizzesInCourse.length > 0 ? quizzesInCourse[0].totalMarks : 100
    );

    return {
      course: course.course,
      
      // Quiz Statistics
      totalQuizzes: course.quizzes.length,
      quizIds: course.quizzes,
      
      // Student Statistics
      totalRegisteredStudents: course.students.size,
      totalAttempts: attempts.length,
      participationRate: course.students.size > 0 
        ? (attempts.length / course.students.size) * 100 
        : 0,
      uniqueAttemptingStudents: new Set(attempts.map(a => a.student.toString())).size,
      
      // Performance Statistics
      averageScore: calculateAverage(scores),
      averagePercentage: calculateAverage(percentages),
      medianScore: calculateMedian(scores),
      bestScore: scores.length > 0 ? Math.max(...scores) : null,
      lowestScore: scores.length > 0 ? Math.min(...scores) : null,
      standardDeviation: calculateStandardDeviation(scores),
      
      // Pass/Fail Statistics
      passRate: coursePassRate.total > 0 
        ? (coursePassRate.passed / coursePassRate.total) * 100 
        : 0,
      totalPassed: coursePassRate.passed,
      totalFailed: coursePassRate.total - coursePassRate.passed,
      
      // Question Accuracy
      averageCorrectCount: attempts.length > 0 
        ? calculateAverage(attempts.map(a => a.correctCount || 0)) 
        : 0,
      averageWrongCount: attempts.length > 0 
        ? calculateAverage(attempts.map(a => a.wrongCount || 0)) 
        : 0,
      totalQuestionsAnswered: totalQuestions,
      averageAccuracy: averageAccuracy,
      
      // Time Statistics
      averageTimeTaken: attempts.length > 0 
        ? calculateAverage(attempts.map(a => a.timeTaken || 0)) 
        : 0,
      
      // Course-specific Metrics
      difficultyLevel: getDifficultyLevel(difficultyScore),
      difficultyScore: difficultyScore,
      
      // Top Performer
      topPerformer: topPerformer,
      
      // Performance Distribution
      performanceDistribution: {
        excellent: percentages.filter(p => p >= 80).length,
        good: percentages.filter(p => p >= 60 && p < 80).length,
        average: percentages.filter(p => p >= 40 && p < 60).length,
        poor: percentages.filter(p => p >= 20 && p < 40).length,
        fail: percentages.filter(p => p < 20).length
      }
    };
  }).sort((a, b) => {
    // Sort by average percentage, handle courses with no attempts
    const aAvg = a.averagePercentage || 0;
    const bAvg = b.averagePercentage || 0;
    return bAvg - aAvg;
  });
};

const calculateStudentAnalytics = (quizAttempts, allStudents, quizzes) => {
  const studentMap = new Map();
  
  // Process all quiz attempts
  quizAttempts.forEach(attempt => {
    const studentId = attempt.student.toString();
    const quiz = quizzes.find(q => q._id.toString() === attempt.quizId.toString());
    
    if (!studentMap.has(studentId)) {
      const student = allStudents.find(s => s._id.toString() === studentId);
      studentMap.set(studentId, {
        student: student || { _id: studentId, name: "Unknown Student" },
        attempts: [],
        scores: [],
        percentages: [],
        totalScore: 0,
        quizzesAttempted: new Set(),
        courses: new Set(),
        totalCorrect: 0,
        totalWrong: 0
      });
    }
    
    const studentData = studentMap.get(studentId);
    studentData.attempts.push(attempt);
    studentData.scores.push(attempt.scoredMarks);
    
    // Calculate percentage for this attempt
    const percentage = quiz ? calculatePercentage(attempt.scoredMarks, quiz.totalMarks) : 0;
    studentData.percentages.push(percentage);
    
    studentData.totalScore += attempt.scoredMarks;
    studentData.quizzesAttempted.add(attempt.quizId.toString());
    
    if (quiz && quiz.course) {
      quiz.course.forEach(course => {
        studentData.courses.add(course);
      });
    }
    
    studentData.totalCorrect += attempt.correctCount || 0;
    studentData.totalWrong += attempt.wrongCount || 0;
  });

  // Convert to array and calculate metrics
  const studentAnalytics = Array.from(studentMap.values()).map(data => {
    const attempts = data.attempts;
    const scores = data.scores;
    const percentages = data.percentages;
    
    const consistencyScore = scores.length > 1 
      ? 100 - Math.min(calculateStandardDeviation(scores) * 10, 100)
      : 0;

    const totalQuestions = data.totalCorrect + data.totalWrong;
    const accuracyRate = totalQuestions > 0 ? (data.totalCorrect / totalQuestions) * 100 : 0;

    const bestAttempt = attempts.reduce((best, current) => 
      current.scoredMarks > best.scoredMarks ? current : best
    , { scoredMarks: -Infinity });

    const averagePercentage = calculateAverage(percentages);
    const performanceCategory = getPerformanceCategory(averagePercentage);

    return {
      student: {
        name: data.student.name,
        studentId: data.student.studentId,
        course: data.student.course,
        department: data.student.department,
        semester: data.student.semester
      },
      performance: {
        totalAttempts: attempts.length,
        totalQuizzesAttempted: data.quizzesAttempted.size,
        averageScore: calculateAverage(scores),
        averagePercentage: averagePercentage,
        performanceCategory: performanceCategory,
        bestScore: Math.max(...scores),
        bestQuizId: bestAttempt.quizId,
        lowestScore: Math.min(...scores),
        totalScore: data.totalScore,
        consistencyScore: Math.round(consistencyScore),
        accuracyRate: Math.round(accuracyRate),
        totalCorrect: data.totalCorrect,
        totalWrong: data.totalWrong,
        coursesAttempted: Array.from(data.courses)
      },
      engagement: {
        attendanceRate: data.quizzesAttempted.size > 0
          ? (attempts.length / data.quizzesAttempted.size) * 100
          : 0,
        averageTimePerAttempt: calculateAverage(attempts.map(a => a.timeTaken || 0)),
        lastActive: attempts.length > 0 
          ? new Date(Math.max(...attempts.map(a => new Date(a.attemptedAt)))) 
          : null
      },
      rank: 0
    };
  });

  // Calculate ranks based on average percentage
  studentAnalytics.sort((a, b) => b.performance.averagePercentage - a.performance.averagePercentage);
  studentAnalytics.forEach((student, index) => {
    student.performance.rank = index + 1;
  });

  // Calculate overall statistics
  const allAveragePercentages = studentAnalytics.map(s => s.performance.averagePercentage);
  
  // Fix distribution calculation - use percentages
  const distribution = {
    excellent: studentAnalytics.filter(s => s.performance.averagePercentage >= 80).length,
    good: studentAnalytics.filter(s => s.performance.averagePercentage >= 60 && s.performance.averagePercentage < 80).length,
    average: studentAnalytics.filter(s => s.performance.averagePercentage >= 40 && s.performance.averagePercentage < 60).length,
    poor: studentAnalytics.filter(s => s.performance.averagePercentage >= 20 && s.performance.averagePercentage < 40).length,
    fail: studentAnalytics.filter(s => s.performance.averagePercentage < 20).length
  };

  // Fix: Only include in bottomRankers if there are enough students
  const bottomRankers = studentAnalytics.length > 5 ? studentAnalytics.slice(-5).reverse() : [];

  return {
    totalStudents: studentAnalytics.length,
    averageStudentScore: calculateAverage(studentAnalytics.map(s => s.performance.averageScore)),
    averageStudentPercentage: calculateAverage(allAveragePercentages),
    averageAccuracy: calculateAverage(studentAnalytics.map(s => s.performance.accuracyRate)),
    topRankers: studentAnalytics.slice(0, Math.min(10, studentAnalytics.length)),
    bottomRankers: bottomRankers,
    mostConsistentStudents: studentAnalytics
      .filter(s => s.performance.totalAttempts >= 3)
      .sort((a, b) => b.performance.consistencyScore - a.performance.consistencyScore)
      .slice(0, 5),
    mostAccurateStudents: studentAnalytics
      .filter(s => s.performance.totalAttempts >= 2)
      .sort((a, b) => b.performance.accuracyRate - a.performance.accuracyRate)
      .slice(0, 5),
    atRiskStudents: studentAnalytics
      .filter(s => s.performance.averagePercentage < 40 && s.performance.totalAttempts >= 2)
      .slice(0, 10),
    distribution: distribution,
    performanceBreakdown: {
      excellent: studentAnalytics.filter(s => s.performance.performanceCategory === "excellent").length,
      good: studentAnalytics.filter(s => s.performance.performanceCategory === "good").length,
      average: studentAnalytics.filter(s => s.performance.performanceCategory === "average").length,
      poor: studentAnalytics.filter(s => s.performance.performanceCategory === "poor").length,
      fail: studentAnalytics.filter(s => s.performance.performanceCategory === "fail").length
    }
  };
};

const calculateQuizAnalytics = (quizzes, quizAttempts) => {
  return quizzes.map(quiz => {
    const quizAttemptsList = quizAttempts.filter(attempt => 
      attempt.quizId.toString() === quiz._id.toString()
    );
    
    const scores = quizAttemptsList.map(attempt => attempt.scoredMarks);
    const percentages = quizAttemptsList.map(attempt => 
      calculatePercentage(attempt.scoredMarks, quiz.totalMarks)
    );

    // Calculate detailed statistics
    const totalCorrect = quizAttemptsList.reduce((sum, attempt) => sum + (attempt.correctCount || 0), 0);
    const totalWrong = quizAttemptsList.reduce((sum, attempt) => sum + (attempt.wrongCount || 0), 0);
    const totalQuestions = totalCorrect + totalWrong;
    const averageAccuracy = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;

    // Time statistics
    const timeTakenList = quizAttemptsList.map(a => a.timeTaken || 0);
    const averageTimeTaken = calculateAverage(timeTakenList);

    // Difficulty analysis
    const difficultyScore = calculateQuizDifficulty(scores, quiz.totalMarks);

    return {
      quizId: quiz._id,
      title: quiz.title,
      course: quiz.course,
      subject: quiz.subject,
      department: quiz.department,
      createdAt: quiz.createdAt,
      startTime: quiz.startTime,
      endTime: quiz.endTime,
      durationMinutes: quiz.durationMinutes,
      
      // Registration & Attendance
      registeredStudents: quiz.registeredStudents?.length || 0,
      attemptedStudents: quizAttemptsList.length,
      attendanceRate: quiz.registeredStudents?.length > 0 
        ? (quizAttemptsList.length / quiz.registeredStudents.length) * 100 
        : 0,
      
      // Performance Metrics
      passingMarks: quiz.passingMarks,
      totalMarks: quiz.totalMarks,
      averageScore: calculateAverage(scores),
      averagePercentage: calculateAverage(percentages),
      bestScore: scores.length > 0 ? Math.max(...scores) : null,
      lowestScore: scores.length > 0 ? Math.min(...scores) : null,
      medianScore: calculateMedian(scores),
      standardDeviation: calculateStandardDeviation(scores),
      
      // Pass/Fail Analysis
      passRate: quizAttemptsList.length > 0 
        ? (quizAttemptsList.filter(attempt => attempt.scoredMarks >= quiz.passingMarks).length / quizAttemptsList.length) * 100 
        : 0,
      totalPassed: quizAttemptsList.filter(attempt => attempt.scoredMarks >= quiz.passingMarks).length,
      totalFailed: quizAttemptsList.filter(attempt => attempt.scoredMarks < quiz.passingMarks).length,
      
      // Question Analysis
      averageCorrectCount: calculateAverage(quizAttemptsList.map(a => a.correctCount || 0)),
      averageWrongCount: calculateAverage(quizAttemptsList.map(a => a.wrongCount || 0)),
      totalQuestionsAnswered: totalQuestions,
      averageAccuracy: averageAccuracy,
      
      // Time Analysis
      averageTimeTaken: averageTimeTaken,
      fastestCompletion: timeTakenList.length > 0 ? Math.min(...timeTakenList) : null,
      slowestCompletion: timeTakenList.length > 0 ? Math.max(...timeTakenList) : null,
      
      // Difficulty Analysis
      difficultyScore: difficultyScore,
      difficultyLevel: getDifficultyLevel(difficultyScore),
      performanceCategory: quizAttemptsList.length > 0 ? getPerformanceCategory(calculateAverage(percentages)) : "no-data",
      
      // Top Performers
      topPerformers: quizAttemptsList
        .sort((a, b) => b.scoredMarks - a.scoredMarks)
        .slice(0, 5)
        .map((attempt, index) => ({
          rank: index + 1,
          studentId: attempt.student,
          score: attempt.scoredMarks,
          percentage: calculatePercentage(attempt.scoredMarks, quiz.totalMarks),
          timeTaken: attempt.timeTaken,
          correctCount: attempt.correctCount,
          wrongCount: attempt.wrongCount,
          accuracy: (attempt.correctCount || 0) + (attempt.wrongCount || 0) > 0 
            ? ((attempt.correctCount || 0) / ((attempt.correctCount || 0) + (attempt.wrongCount || 0))) * 100 
            : 0,
          attemptedAt: attempt.attemptedAt,
          performanceCategory: getPerformanceCategory(calculatePercentage(attempt.scoredMarks, quiz.totalMarks))
        }))
    };
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

const generatePerformanceInsights = (coreMetrics, courseAnalytics, quizAnalytics) => {
  const insights = {
    strengths: [],
    areasForImprovement: [],
    opportunities: [],
    keyFindings: [],
    alerts: []
  };

  // Analyze strengths
  if (coreMetrics.passRate > 70) {
    insights.strengths.push({
      title: "High Pass Rate",
      description: `Your quizzes have a ${coreMetrics.passRate.toFixed(1)}% pass rate, indicating well-designed assessment criteria.`,
      metric: "passRate",
      value: coreMetrics.passRate
    });
  }

  if (coreMetrics.participationRate > 60) {
    insights.strengths.push({
      title: "Good Student Engagement",
      description: `${coreMetrics.participationRate.toFixed(1)}% of registered students attempt your quizzes.`,
      metric: "participationRate",
      value: coreMetrics.participationRate
    });
  }

  if (coreMetrics.averageAccuracy > 70) {
    insights.strengths.push({
      title: "High Question Accuracy",
      description: `Students are answering ${coreMetrics.averageAccuracy.toFixed(1)}% of questions correctly on average.`,
      metric: "accuracy",
      value: coreMetrics.averageAccuracy
    });
  }

  // Analyze areas for improvement
  if (coreMetrics.standardDeviation > 20) {
    insights.areasForImprovement.push({
      title: "High Score Variability",
      description: "Large variation in student scores suggests inconsistent question difficulty.",
      metric: "scoreVariability",
      value: coreMetrics.standardDeviation,
      recommendation: "Consider adding more medium-difficulty questions"
    });
  }

  if (coreMetrics.participationRate < 40) {
    insights.areasForImprovement.push({
      title: "Low Participation Rate",
      description: "Only a small percentage of registered students are attempting quizzes.",
      metric: "participationRate",
      value: coreMetrics.participationRate,
      recommendation: "Consider sending reminder notifications"
    });
  }

  if (coreMetrics.averageAccuracy < 60) {
    insights.areasForImprovement.push({
      title: "Low Question Accuracy",
      description: "Students are struggling with questions (accuracy below 60%).",
      metric: "accuracy",
      value: coreMetrics.averageAccuracy,
      recommendation: "Review question clarity and difficulty"
    });
  }

  // Find best performing course
  if (courseAnalytics.length > 0) {
    const bestCourse = courseAnalytics.reduce((prev, current) => 
      (prev.averagePercentage > current.averagePercentage) ? prev : current
    );
    
    if (bestCourse.averagePercentage > 0) {
      insights.keyFindings.push({
        title: "Top Performing Course",
        description: `${bestCourse.course} has the highest average score of ${bestCourse.averagePercentage.toFixed(1)}%`,
        course: bestCourse.course,
        score: bestCourse.averagePercentage
      });
    }

    // Find course with highest accuracy
    const mostAccurateCourse = courseAnalytics.reduce((prev, current) => 
      (prev.averageAccuracy > current.averageAccuracy) ? prev : current
    );
    
    if (mostAccurateCourse.averageAccuracy > 0) {
      insights.keyFindings.push({
        title: "Most Accurate Course",
        description: `${mostAccurateCourse.course} has ${mostAccurateCourse.averageAccuracy.toFixed(1)}% question accuracy`,
        course: mostAccurateCourse.course,
        accuracy: mostAccurateCourse.averageAccuracy
      });
    }
  }

  // Check for difficult quizzes
  const difficultQuizzes = quizAnalytics.filter(q => q.difficultyLevel === "Hard" && q.attemptedStudents > 0);
  if (difficultQuizzes.length > 0) {
    insights.alerts.push({
      type: "warning",
      title: "Difficult Quizzes Detected",
      description: `${difficultQuizzes.length} quizzes are classified as difficult (average score < 40%)`,
      count: difficultQuizzes.length,
      quizzes: difficultQuizzes.map(q => q.title)
    });
  }

  // Check for quizzes with low participation
  const lowParticipationQuizzes = quizAnalytics.filter(q => 
    q.registeredStudents > 0 && q.attendanceRate < 30 && q.attemptedStudents > 0
  );
  if (lowParticipationQuizzes.length > 0) {
    insights.alerts.push({
      type: "info",
      title: "Low Participation Quizzes",
      description: `${lowParticipationQuizzes.length} quizzes have attendance below 30%`,
      count: lowParticipationQuizzes.length,
      quizzes: lowParticipationQuizzes.map(q => q.title)
    });
  }

  return insights;
};

const generateRecommendations = (coreMetrics, courseAnalytics, studentAnalytics, quizAnalytics) => {
  const recommendations = [];

  // Based on participation rate
  if (coreMetrics.participationRate < 50) {
    recommendations.push({
      category: "Student Engagement",
      priority: "high",
      title: "Increase Quiz Participation",
      description: `Only ${coreMetrics.participationRate.toFixed(1)}% of registered students are attempting quizzes.`,
      actionItems: [
        "Send email reminders 24 hours before quiz starts",
        "Offer bonus marks for early participation",
        "Make quiz timing more flexible",
        "Create shorter, more frequent quizzes"
      ],
      expectedImpact: "Increase participation by 20-30%"
    });
  }

  // Based on pass rate
  if (coreMetrics.passRate < 60) {
    recommendations.push({
      category: "Assessment Design",
      priority: "medium",
      title: "Improve Quiz Pass Rates",
      description: `Current pass rate is ${coreMetrics.passRate.toFixed(1)}%. Consider adjusting difficulty.`,
      actionItems: [
        "Review and adjust passing marks criteria",
        "Add more practice questions before the quiz",
        "Provide topic-wise study materials",
        "Consider implementing adaptive difficulty"
      ],
      expectedImpact: "Increase pass rate by 10-15%"
    });
  }

  // Based on accuracy rate
  if (coreMetrics.averageAccuracy < 60) {
    recommendations.push({
      category: "Question Quality",
      priority: "medium",
      title: "Improve Question Clarity",
      description: `Average question accuracy is ${coreMetrics.averageAccuracy.toFixed(1)}%.`,
      actionItems: [
        "Review questions with low accuracy rates",
        "Add more detailed explanations",
        "Conduct question validation with sample students",
        "Provide answer explanations after quiz completion"
      ],
      expectedImpact: "Improve accuracy by 15-20%"
    });
  }

  // Based on student analytics
  if (studentAnalytics.atRiskStudents.length > 0) {
    recommendations.push({
      category: "Student Support",
      priority: studentAnalytics.atRiskStudents.length > 5 ? "high" : "medium",
      title: "Support At-Risk Students",
      description: `${studentAnalytics.atRiskStudents.length} students are consistently scoring below 40%.`,
      actionItems: [
        "Schedule one-on-one consultation sessions",
        "Provide additional practice materials",
        "Create peer mentoring groups",
        "Offer quiz retake opportunities"
      ],
      expectedImpact: "Improve scores for at-risk students by 20%"
    });
  }

  // Based on quiz difficulty
  const difficultQuizzes = quizAnalytics.filter(q => q.difficultyLevel === "Hard" && q.attemptedStudents > 0);
  if (difficultQuizzes.length > 2) {
    recommendations.push({
      category: "Quiz Design",
      priority: "medium",
      title: "Balance Quiz Difficulty",
      description: `${difficultQuizzes.length} quizzes are classified as difficult.`,
      actionItems: [
        "Add more medium-difficulty questions",
        "Provide partial credit for steps",
        "Include hints for difficult questions",
        "Balance easy/medium/hard questions"
      ],
      expectedImpact: "Improve student confidence and performance"
    });
  }

  return recommendations;
};

const calculateTimeTrends = (quizzes, quizAttempts) => {
  const monthlyData = {};
  
  // Group by month
  quizzes.forEach(quiz => {
    const date = new Date(quiz.createdAt);
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!monthlyData[month]) {
      monthlyData[month] = {
        month: month,
        quizzesCreated: 0,
        totalStudents: 0,
        totalAttempts: 0,
        totalScore: 0,
        scores: [],
        percentages: []
      };
    }
    
    monthlyData[month].quizzesCreated++;
    monthlyData[month].totalStudents += quiz.registeredStudents?.length || 0;
    
    // Add attempts for this quiz
    const quizAttemptsList = quizAttempts.filter(attempt => 
      attempt.quizId.toString() === quiz._id.toString()
    );
    
    monthlyData[month].totalAttempts += quizAttemptsList.length;
    quizAttemptsList.forEach(attempt => {
      monthlyData[month].totalScore += attempt.scoredMarks;
      monthlyData[month].scores.push(attempt.scoredMarks);
      monthlyData[month].percentages.push(calculatePercentage(attempt.scoredMarks, quiz.totalMarks));
    });
  });

  // Calculate monthly metrics
  const monthlyTrends = Object.values(monthlyData).map(data => ({
    month: data.month,
    quizzesCreated: data.quizzesCreated,
    averageStudentsPerQuiz: data.quizzesCreated > 0 ? data.totalStudents / data.quizzesCreated : 0,
    averageAttemptsPerQuiz: data.quizzesCreated > 0 ? data.totalAttempts / data.quizzesCreated : 0,
    averageScore: data.scores.length > 0 ? calculateAverage(data.scores) : 0,
    averagePercentage: data.percentages.length > 0 ? calculateAverage(data.percentages) : 0,
    totalScore: data.totalScore,
    participationRate: data.totalStudents > 0 ? (data.totalAttempts / data.totalStudents) * 100 : 0
  })).sort((a, b) => a.month.localeCompare(b.month));

  // Find best and most active months (only if there's data)
  const monthsWithData = monthlyTrends.filter(m => m.averagePercentage > 0);
  const bestMonth = monthsWithData.length > 0 
    ? monthsWithData.reduce((prev, current) => 
        (prev.averagePercentage > current.averagePercentage) ? prev : current
      )
    : null;

  const mostActiveMonth = monthlyTrends.length > 0 
    ? monthlyTrends.reduce((prev, current) => 
        (prev.quizzesCreated > current.quizzesCreated) ? prev : current
      )
    : null;

  return {
    monthly: monthlyTrends,
    bestMonth: bestMonth,
    mostActiveMonth: mostActiveMonth,
    totalMonths: monthlyTrends.length,
    growthRate: monthlyTrends.length > 1 
      ? ((monthlyTrends[monthlyTrends.length - 1].quizzesCreated - monthlyTrends[0].quizzesCreated) / monthlyTrends[0].quizzesCreated) * 100 
      : 0
  };
};

const calculateEngagementMetrics = (quizzes, quizAttempts) => {
  const totalRegistered = quizzes.reduce((sum, q) => sum + (q.registeredStudents?.length || 0), 0);
  const totalAttempts = quizAttempts.length;
  const completionRate = totalRegistered > 0 ? (totalAttempts / totalRegistered) * 100 : 0;
  
  // Calculate dropout rate
  const dropoutRate = totalRegistered > 0 
    ? ((totalRegistered - quizAttempts.length) / totalRegistered) * 100 
    : 0;
  
  const uniqueStudents = new Set(quizAttempts.map(attempt => attempt.student.toString())).size;
  const avgAttemptsPerStudent = uniqueStudents > 0 ? totalAttempts / uniqueStudents : 0;
  
  const engagementScore = Math.min(
    (completionRate * 0.4) + 
    ((100 - dropoutRate) * 0.3) + 
    (Math.min(avgAttemptsPerStudent * 20, 100) * 0.3),
    100
  );

  return {
    completionRate: completionRate,
    dropoutRate: dropoutRate,
    avgAttemptsPerStudent: avgAttemptsPerStudent,
    engagementScore: engagementScore,
    engagementLevel: getEngagementLevel(engagementScore),
    activeStudents: uniqueStudents,
    inactiveStudents: Math.max(0, totalRegistered - uniqueStudents),
    reengagementOpportunity: Math.max(0, totalRegistered - uniqueStudents),
    averageCompletionTime: quizAttempts.length > 0 
      ? calculateAverage(quizAttempts.map(a => a.timeTaken || 0))
      : 0
  };
};

const calculatePredictiveAnalytics = (quizzes, quizAttempts) => {
  if (quizzes.length < 3 || quizAttempts.length < 10) {
    return {
      available: false,
      message: "Insufficient data for predictive analytics. Need at least 3 quizzes and 10 attempts.",
      minimumRequirements: {
        requiredQuizzes: 3,
        requiredAttempts: 10,
        currentQuizzes: quizzes.length,
        currentAttempts: quizAttempts.length
      }
    };
  }

  // Group scores by month
  const scoresByDate = quizAttempts
    .map(attempt => ({
      date: new Date(attempt.attemptedAt),
      score: attempt.scoredMarks
    }))
    .sort((a, b) => a.date - b.date);

  if (scoresByDate.length < 5) {
    return {
      available: false,
      message: "Need more data points for prediction",
      currentDataPoints: scoresByDate.length,
      requiredDataPoints: 5
    };
  }

  // Simple trend analysis
  const scores = scoresByDate.map(s => s.score);
  const recentScores = scores.slice(-5);
  const olderScores = scores.slice(0, -5);
  
  const recentAvg = calculateAverage(recentScores);
  const olderAvg = calculateAverage(olderScores);
  const trend = recentAvg > olderAvg ? "improving" : "declining";
  
  const changePercentage = olderAvg > 0 
    ? ((recentAvg - olderAvg) / olderAvg) * 100 
    : 0;

  // Predict next quiz performance
  const nextQuizPrediction = {
    predictedAverageScore: trend === "improving" 
      ? recentAvg * 1.05
      : recentAvg * 0.95,
    confidence: Math.min(Math.abs(changePercentage) * 2, 90),
    trend: trend,
    changePercentage: changePercentage.toFixed(1),
    recommendation: trend === "improving" 
      ? "Continue current teaching methods"
      : "Consider reviewing assessment strategy",
    basedOn: {
      recentAttempts: recentScores.length,
      historicalAttempts: olderScores.length,
      timePeriod: "last 5 attempts vs previous attempts"
    }
  };

  return {
    available: true,
    nextQuizPrediction: nextQuizPrediction,
    performanceTrend: trend,
    recentPerformance: recentAvg,
    historicalPerformance: olderAvg,
    improvementRate: changePercentage,
    dataQuality: {
      totalDataPoints: scoresByDate.length,
      timeSpanDays: Math.ceil((scoresByDate[scoresByDate.length - 1].date - scoresByDate[0].date) / (1000 * 60 * 60 * 24)),
      averageAttemptsPerDay: (scoresByDate.length / Math.max(1, Math.ceil((scoresByDate[scoresByDate.length - 1].date - scoresByDate[0].date) / (1000 * 60 * 60 * 24))))
    }
  };
};

const getEmptyAnalyticsStructure = (facultyName) => {
  return {
    success: true,
    timestamp: new Date().toISOString(),
    data: {
      summary: {
        facultyName: facultyName,
        message: "No quizzes created yet. Start by creating your first quiz!",
        lastUpdated: new Date(),
        dataPoints: {
          quizzes: 0,
          quizAttempts: 0,
          uniqueStudents: 0,
          totalQuestionsAnswered: 0
        }
      },
      overview: {
        totalQuizzes: 0,
        totalRegisteredStudents: 0,
        totalAttempts: 0,
        participationRate: 0,
        averageScore: 0,
        passRate: 0,
        averageAccuracy: 0
      },
      courses: [],
      students: {
        totalStudents: 0,
        topRankers: []
      },
      quizzes: [],
      trends: {
        monthly: []
      },
      insights: {
        strengths: [],
        areasForImprovement: [],
        recommendations: [
          {
            category: "Getting Started",
            priority: "high",
            title: "Create Your First Quiz",
            description: "Begin by creating a quiz to start collecting analytics data.",
            actionItems: [
              "Click on 'Create New Quiz' in your dashboard",
              "Add questions with varying difficulty levels",
              "Set appropriate passing criteria",
              "Schedule the quiz for optimal participation"
            ]
          }
        ]
      }
    }
  };
};

// Main exported function
exports.getFacultyAnalytics = async (req, res) => {
  const startTime = Date.now();
  
  try {
    const facultyId = req.user._id;
    const { timeframe = "all", forceRefresh = false } = req.query;
    
    console.time("Analytics Computation");

    // Fetch all required data in parallel
    const [quizzes, quizAttempts, allStudents] = await Promise.all([
      Quiz.find({ createdBy: facultyId })
        .select("_id title course subject department passingMarks totalMarks registeredStudents startTime endTime createdAt durationMinutes")
        .lean(),
      
      QuizAttempt.find({})
        .select("quizId student scoredMarks correctCount wrongCount timeTaken attemptedAt")
        .lean(),
      
      Student.find({})
        .select("name studentId course department semester")
        .lean()
    ]);
    
    if (!quizzes.length) {
      console.timeEnd("Analytics Computation");
      return res.status(200).json(getEmptyAnalyticsStructure(req.user.name));
    }

    // Apply timeframe filter if specified
    let filteredQuizzes = quizzes;
    let filteredAttempts = quizAttempts;

    if (timeframe !== "all") {
      const { startDate, endDate } = getTimeframeDates(timeframe);
      
      filteredQuizzes = quizzes.filter(q => 
        new Date(q.createdAt) >= startDate && 
        new Date(q.createdAt) <= endDate
      );
      
      // Filter attempts based on filtered quizzes
      const filteredQuizIds = filteredQuizzes.map(q => q._id.toString());
      filteredAttempts = quizAttempts.filter(attempt => 
        filteredQuizIds.includes(attempt.quizId.toString())
      );
    } else {
      // For 'all' timeframe, filter attempts to only faculty's quizzes
      const facultyQuizIds = quizzes.map(q => q._id.toString());
      filteredAttempts = quizAttempts.filter(attempt => 
        facultyQuizIds.includes(attempt.quizId.toString())
      );
    }

    // Calculate all analytics using QuizAttempt data
    const coreMetrics = calculateCoreMetrics(filteredQuizzes, filteredAttempts);
    const courseAnalytics = calculateCourseAnalytics(filteredQuizzes, filteredAttempts);
    const studentAnalytics = calculateStudentAnalytics(filteredAttempts, allStudents, filteredQuizzes);
    const quizAnalytics = calculateQuizAnalytics(filteredQuizzes, filteredAttempts);
    const timeTrends = calculateTimeTrends(filteredQuizzes, filteredAttempts);
    const performanceInsights = generatePerformanceInsights(coreMetrics, courseAnalytics, quizAnalytics);
    const recommendations = generateRecommendations(coreMetrics, courseAnalytics, studentAnalytics, quizAnalytics);
    const engagementMetrics = calculateEngagementMetrics(filteredQuizzes, filteredAttempts);
    const predictiveAnalytics = calculatePredictiveAnalytics(filteredQuizzes, filteredAttempts);

    console.timeEnd("Analytics Computation");

    // Build comprehensive response
    const response = {
      success: true,
      timestamp: new Date().toISOString(),
      timeframe: timeframe,
      computationTime: Date.now() - startTime,
      data: {
        summary: {
          facultyName: req.user.name,
          facultyId: req.user.facultyId,
          department: req.user.department,
          lastUpdated: new Date(),
          totalComputationTime: `${Date.now() - startTime}ms`,
          dataPoints: {
            quizzes: filteredQuizzes.length,
            quizAttempts: filteredAttempts.length,
            uniqueStudents: studentAnalytics.totalStudents,
            totalQuestionsAnswered: coreMetrics.totalQuestionsAnswered || 0
          }
        },

        // Core Metrics
        overview: coreMetrics,

        // Deep Analytics
        courses: courseAnalytics,
        students: studentAnalytics,
        quizzes: quizAnalytics,

        // Trends & Patterns
        trends: {
          timeBased: timeTrends,
          engagement: engagementMetrics
        },

        // Predictive Analytics
        predictive: predictiveAnalytics,

        // Actionable Insights
        insights: performanceInsights,
        recommendations: recommendations,

        // Data Quality Indicators
        dataQuality: {
          completeness: {
            quizzesWithAttempts: quizAnalytics.filter(q => q.attemptedStudents > 0).length,
            totalQuizzes: filteredQuizzes.length,
            percentage: filteredQuizzes.length > 0 ? 
              (quizAnalytics.filter(q => q.attemptedStudents > 0).length / filteredQuizzes.length) * 100 : 0
          },
          reliability: {
            averageAttemptsPerQuiz: filteredQuizzes.length > 0 ? 
              filteredAttempts.length / filteredQuizzes.length : 0,
            dataSource: "QuizAttempt Model (Primary Source)",
            lastDataSync: new Date().toISOString()
          }
        }
      }
    };

    res.status(200).json(response);

  } catch (error) {
    console.error("Faculty Analytics Error:", {
      error: error.message,
      stack: error.stack,
      facultyId: req.user?._id,
      timestamp: new Date().toISOString()
    });

    res.status(500).json({
      success: false,
      message: "Analytics generation failed",
      error: process.env.NODE_ENV === 'development' ? error.message : "Internal server error",
      referenceId: `ERR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      supportContact: "analytics-support@university.edu",
      timestamp: new Date().toISOString()
    });
  }
};