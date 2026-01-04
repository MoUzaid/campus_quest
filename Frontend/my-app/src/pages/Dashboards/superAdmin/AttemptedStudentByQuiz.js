






import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  ZAxis,
  RadialBarChart,
  RadialBar,
  ComposedChart
} from "recharts";
import {
  Filter,
  Download,
  RefreshCw,
  Users,
  TrendingUp,
  Clock,
  Target,
  Award,
  BarChart3,
  PieChart as PieChartIcon,
  FilterX,
  Calendar,
  ChevronDown,
  ChevronUp,
  UserCheck,
  Trophy,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Settings,
  Printer,
  Share2,
  Maximize2,
  Minimize2,
  Search,
  Bell,
  HelpCircle,
  Info,
  Activity,
  Brain,
  Target as TargetIcon,
  Zap,
  BarChart2,
  LineChart as LineChartIcon,
  Layers,
  Cpu,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Hash,
  Percent,
  Clock as ClockIcon,
  BookOpen,
  GraduationCap,
  Users as UsersIcon,
  Heart,
  Star,
  Shield,
  Flag,
  Globe,
  Map,
  Grid,
  List,
  DownloadCloud,
  Upload,
  Save,
  Edit,
  Trash2,
  Plus,
  Minus,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  MoreHorizontal,
  MoreVertical,
  CornerDownRight,
  CornerDownLeft,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Home,
  Compass,
  Navigation
} from "lucide-react";
import "./AttemptedStudentByQuiz.css";

const AttemptedStudentByQuiz = () => {
  const { quizId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    gender: "",
    department: "",
    course: "",
    group: "",
    scoreRange: [0, 100],
    dateRange: { start: null, end: null }
  });
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [activeView, setActiveView] = useState("overview");
  const [sortConfig, setSortConfig] = useState({ key: "scoredMarks", direction: "desc" });
  const [expandedRows, setExpandedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFiltersVisible, setIsFiltersVisible] = useState(true);
  const [chartType, setChartType] = useState("bar");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [timeframe, setTimeframe] = useState("all");
  const [pageSize, setPageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedChart, setSelectedChart] = useState("performanceDistribution");

  // Debug data structure
  useEffect(() => {
    if (data?.attempts) {
      console.log('DEBUG - Data Structure:');
      console.log('Total attempts:', data.attempts.length);
      
      const attemptsWithGender = data.attempts.filter(a => a.student?.gender);
      console.log('Attempts with gender field:', attemptsWithGender.length);
      
      if (data.attempts.length > 0) {
        console.log('Sample student:', data.attempts[0].student);
        console.log('Unique genders:', [...new Set(data.attempts.map(a => a.student?.gender).filter(Boolean))]);
      }
    }
  }, [data]);

  // Fetch data
  useEffect(() => {
    if (!quizId) return;

    const fetchAttempts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/superadmin/quiz/${quizId}/attempts`,
          { withCredentials: true }
        );
        setData(res.data);
        
        const courses = [...new Set(res.data.attempts.map(a => a.student?.course).filter(Boolean))];
        setSelectedCourses(courses);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load quiz attempts data");
      } finally {
        setLoading(false);
      }
    };

    fetchAttempts();
  }, [quizId]);

  // Calculate comprehensive statistics with enhanced analytics
  const statistics = useMemo(() => {
    if (!data?.attempts) return null;

    const attempts = data.attempts;
    const totalAttempts = attempts.length;
    const uniqueStudents = new Set(attempts.map(a => a.student?.studentId).filter(Boolean));
    const totalStudents = uniqueStudents.size;
    
    // Enhanced Gender statistics with course-wise breakdown
    const genderStats = attempts.reduce((acc, attempt) => {
      let gender = (attempt.student?.gender || '').toLowerCase().trim();
      
      // Normalize gender values
      if (gender === 'm' || gender === 'male') gender = 'male';
      else if (gender === 'f' || gender === 'female') gender = 'female';
      else if (gender && gender !== 'other') gender = 'other';
      else gender = 'unknown';
      
      const course = attempt.student?.course || 'unknown';
      
      if (!acc[gender]) {
        acc[gender] = {
          total: 0,
          totalScore: 0,
          courses: {},
          departments: new Set(),
          avgTime: 0,
          totalTime: 0
        };
      }
      
      acc[gender].total++;
      acc[gender].totalScore += attempt.scoredMarks;
      acc[gender].totalTime += attempt.timeTaken;
      
      if (attempt.student?.department) {
        acc[gender].departments.add(attempt.student.department);
      }
      
      // Course-wise gender stats
      if (!acc[gender].courses[course]) {
        acc[gender].courses[course] = {
          count: 0,
          totalScore: 0,
          avgScore: 0
        };
      }
      acc[gender].courses[course].count++;
      acc[gender].courses[course].totalScore += attempt.scoredMarks;
      
      return acc;
    }, {});

    // Initialize all gender categories to ensure they exist
    const allGenders = ['male', 'female', 'other', 'unknown'];
    allGenders.forEach(gender => {
      if (!genderStats[gender]) {
        genderStats[gender] = {
          total: 0,
          totalScore: 0,
          courses: {},
          departments: new Set(),
          avgTime: 0,
          totalTime: 0,
          avgScore: 0
        };
      } else {
        // Calculate averages
        genderStats[gender].avgScore = genderStats[gender].total > 0 
          ? genderStats[gender].totalScore / genderStats[gender].total 
          : 0;
        genderStats[gender].avgTime = genderStats[gender].total > 0 
          ? genderStats[gender].totalTime / genderStats[gender].total 
          : 0;
      }
    });

    // Score statistics
    const scores = attempts.map(a => a.scoredMarks);
    const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    const maxScore = Math.max(...scores);
    const minScore = Math.min(...scores);
    const medianScore = scores.length > 0 ? 
      [...scores].sort((a, b) => a - b)[Math.floor(scores.length / 2)] : 0;
    
    // Calculate standard deviation
    const scoreStdDev = scores.length > 0 ? 
      Math.sqrt(scores.reduce((sq, n) => sq + Math.pow(n - avgScore, 2), 0) / scores.length) : 0;
    
    // Time statistics
    const times = attempts.map(a => a.timeTaken);
    const avgTime = times.length > 0 ? times.reduce((a, b) => a + b, 0) / times.length : 0;
    const maxTime = Math.max(...times);
    const minTime = Math.min(...times);
    
    // Correct/Wrong stats
    const totalCorrect = attempts.reduce((sum, a) => sum + a.correctCount, 0);
    const totalWrong = attempts.reduce((sum, a) => sum + a.wrongCount, 0);
    const totalQuestions = totalCorrect + totalWrong;
    const accuracyRate = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;

    // Enhanced Performance distribution with quartiles
    const performanceGroups = {
      excellent: attempts.filter(a => a.scoredMarks >= 90).length,
      good: attempts.filter(a => a.scoredMarks >= 75 && a.scoredMarks < 90).length,
      average: attempts.filter(a => a.scoredMarks >= 50 && a.scoredMarks < 75).length,
      poor: attempts.filter(a => a.scoredMarks < 50).length
    };

    // Calculate quartiles
    const sortedScores = [...scores].sort((a, b) => a - b);
    const q1 = sortedScores[Math.floor(sortedScores.length * 0.25)];
    const q3 = sortedScores[Math.floor(sortedScores.length * 0.75)];
    const iqr = q3 - q1;

    // Enhanced Time-based analysis
    const hourlyDistribution = Array.from({ length: 24 }, (_, i) => {
      const hourAttempts = attempts.filter(a => {
        try {
          return new Date(a.attemptedAt).getHours() === i;
        } catch {
          return false;
        }
      });
      const hourScores = hourAttempts.map(a => a.scoredMarks);
      const avgScore = hourScores.length > 0 ? hourScores.reduce((a, b) => a + b, 0) / hourScores.length : 0;
      
      return {
        hour: `${i.toString().padStart(2, '0')}:00`,
        hourNumber: i,
        attempts: hourAttempts.length,
        avgScore: parseFloat(avgScore.toFixed(2)),
        maxScore: hourScores.length > 0 ? Math.max(...hourScores) : 0,
        minScore: hourScores.length > 0 ? Math.min(...hourScores) : 0,
        efficiency: hourAttempts.length > 0 ? 
          parseFloat((hourScores.reduce((a, b) => a + b, 0) / hourAttempts.reduce((a, b) => a + b.timeTaken, 0) * 100).toFixed(2)) : 0
      };
    });

    // Day-wise analysis
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dailyDistribution = Array.from({ length: 7 }, (_, i) => {
      const dayAttempts = attempts.filter(a => {
        try {
          return new Date(a.attemptedAt).getDay() === i;
        } catch {
          return false;
        }
      });
      const dayScores = dayAttempts.map(a => a.scoredMarks);
      const avgScore = dayScores.length > 0 ? dayScores.reduce((a, b) => a + b, 0) / dayScores.length : 0;
      
      return {
        day: dayNames[i],
        dayNumber: i,
        attempts: dayAttempts.length,
        avgScore: parseFloat(avgScore.toFixed(2)),
        totalStudents: new Set(dayAttempts.map(a => a.student?.studentId)).size
      };
    });

    // Enhanced Course-wise statistics with FIXED gender breakdown
    const courseStats = attempts.reduce((acc, attempt) => {
      const course = attempt.student?.course || "Unknown";
      const rawGender = attempt.student?.gender || "";
      
      if (!acc[course]) {
        acc[course] = {
          total: 0,
          totalScore: 0,
          students: new Set(),
          groups: new Set(),
          avgTime: 0,
          totalTime: 0,
          genderBreakdown: { male: 0, female: 0, other: 0, unknown: 0 },
          scoreDistribution: { excellent: 0, good: 0, average: 0, poor: 0 }
        };
      }
      
      acc[course].total++;
      acc[course].totalScore += attempt.scoredMarks;
      acc[course].totalTime += attempt.timeTaken;
      
      if (attempt.student?.studentId) acc[course].students.add(attempt.student.studentId);
      if (attempt.student?.group) acc[course].groups.add(attempt.student.group);
      
      // Gender breakdown - FIXED with proper normalization
      const gender = (rawGender || '').toLowerCase().trim();
      if (gender === 'm' || gender === 'male') {
        acc[course].genderBreakdown.male++;
      } else if (gender === 'f' || gender === 'female') {
        acc[course].genderBreakdown.female++;
      } else if (gender) {
        acc[course].genderBreakdown.other++;
      } else {
        acc[course].genderBreakdown.unknown++;
      }
      
      // Score distribution
      if (attempt.scoredMarks >= 90) acc[course].scoreDistribution.excellent++;
      else if (attempt.scoredMarks >= 75) acc[course].scoreDistribution.good++;
      else if (attempt.scoredMarks >= 50) acc[course].scoreDistribution.average++;
      else acc[course].scoreDistribution.poor++;
      
      return acc;
    }, {});

    // Calculate course averages
    Object.keys(courseStats).forEach(course => {
      courseStats[course].avgScore = courseStats[course].totalScore / courseStats[course].total;
      courseStats[course].avgTime = courseStats[course].totalTime / courseStats[course].total;
    });

    // Enhanced Department statistics with FIXED gender breakdown
    const departmentStats = attempts.reduce((acc, attempt) => {
      const dept = attempt.student?.department || "Unknown";
      const rawGender = attempt.student?.gender || "";
      
      if (!acc[dept]) {
        acc[dept] = {
          total: 0,
          totalScore: 0,
          students: new Set(),
          avgScore: 0,
          courses: new Set(),
          genderBreakdown: { male: 0, female: 0, other: 0, unknown: 0 },
          performanceTrend: []
        };
      }
      
      acc[dept].total++;
      acc[dept].totalScore += attempt.scoredMarks;
      if (attempt.student?.studentId) acc[dept].students.add(attempt.student.studentId);
      if (attempt.student?.course) acc[dept].courses.add(attempt.student.course);
      
      // Gender breakdown - FIXED with proper normalization
      const gender = (rawGender || '').toLowerCase().trim();
      if (gender === 'm' || gender === 'male') {
        acc[dept].genderBreakdown.male++;
      } else if (gender === 'f' || gender === 'female') {
        acc[dept].genderBreakdown.female++;
      } else if (gender) {
        acc[dept].genderBreakdown.other++;
      } else {
        acc[dept].genderBreakdown.unknown++;
      }
      
      return acc;
    }, {});

    // Calculate department averages
    Object.keys(departmentStats).forEach(dept => {
      departmentStats[dept].avgScore = departmentStats[dept].totalScore / departmentStats[dept].total;
    });

    // Enhanced Group statistics
    const groupStats = attempts.reduce((acc, attempt) => {
      const group = attempt.student?.group || "Unknown";
      
      if (!acc[group]) {
        acc[group] = {
          total: 0,
          totalScore: 0,
          students: new Set(),
          avgScore: 0,
          avgTime: 0,
          totalTime: 0
        };
      }
      
      acc[group].total++;
      acc[group].totalScore += attempt.scoredMarks;
      acc[group].totalTime += attempt.timeTaken;
      if (attempt.student?.studentId) acc[group].students.add(attempt.student.studentId);
      
      return acc;
    }, {});

    // Calculate group averages
    Object.keys(groupStats).forEach(group => {
      groupStats[group].avgScore = groupStats[group].totalScore / groupStats[group].total;
      groupStats[group].avgTime = groupStats[group].totalTime / groupStats[group].total;
    });

    // Score vs Time correlation with efficiency metric
    const scoreTimeCorrelation = attempts.map(attempt => {
      const efficiency = attempt.timeTaken > 0 ? (attempt.scoredMarks / attempt.timeTaken) * 100 : 0;
      return {
        score: attempt.scoredMarks,
        time: attempt.timeTaken,
        correct: attempt.correctCount,
        wrong: attempt.wrongCount,
        efficiency: parseFloat(efficiency.toFixed(2)),
        accuracy: attempt.correctCount + attempt.wrongCount > 0 ?
          (attempt.correctCount / (attempt.correctCount + attempt.wrongCount)) * 100 : 0
      };
    });

    // Enhanced Top performers with efficiency ranking
    const topPerformers = [...attempts]
      .map(attempt => ({
        ...attempt,
        efficiency: attempt.timeTaken > 0 ? (attempt.scoredMarks / attempt.timeTaken) * 100 : 0
      }))
      .sort((a, b) => b.efficiency - a.efficiency)
      .slice(0, 10)
      .map((attempt, index) => ({
        rank: index + 1,
        name: attempt.student?.name,
        score: attempt.scoredMarks,
        time: attempt.timeTaken,
        efficiency: parseFloat(attempt.efficiency.toFixed(2)),
        studentId: attempt.student?.studentId,
        course: attempt.student?.course,
        department: attempt.student?.department
      }));

    // Course vs Gender matrix
    const courseGenderMatrix = Object.keys(courseStats).map(course => {
      const stats = courseStats[course];
      return {
        course,
        maleCount: stats.genderBreakdown.male,
        femaleCount: stats.genderBreakdown.female,
        otherCount: stats.genderBreakdown.other + stats.genderBreakdown.unknown,
        totalStudents: stats.students.size,
        avgScore: parseFloat(stats.avgScore.toFixed(2)),
        maleAvgScore: stats.genderBreakdown.male > 0 ? 
          parseFloat((attempts
            .filter(a => a.student?.course === course && a.student?.gender?.toLowerCase().trim() === 'male')
            .reduce((sum, a) => sum + a.scoredMarks, 0) / stats.genderBreakdown.male).toFixed(2)) : 0,
        femaleAvgScore: stats.genderBreakdown.female > 0 ? 
          parseFloat((attempts
            .filter(a => a.student?.course === course && a.student?.gender?.toLowerCase().trim() === 'female')
            .reduce((sum, a) => sum + a.scoredMarks, 0) / stats.genderBreakdown.female).toFixed(2)) : 0
      };
    });

    // Performance trend over time (last 7 days) with safety checks
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    const performanceTrend = last7Days.map(date => {
      const dayAttempts = attempts.filter(a => {
        try {
          return a.attemptedAt && a.attemptedAt.startsWith(date);
        } catch {
          return false;
        }
      });
      const dayScores = dayAttempts.map(a => a.scoredMarks);
      const avgScore = dayScores.length > 0 ? dayScores.reduce((a, b) => a + b, 0) / dayScores.length : 0;
      
      return {
        date: date.split('-').slice(1).join('/'),
        attempts: dayAttempts.length,
        avgScore: parseFloat(avgScore.toFixed(2)),
        uniqueStudents: new Set(dayAttempts.map(a => a.student?.studentId)).size
      };
    });

    // Difficulty analysis based on wrong answers
    const difficultyAnalysis = attempts.reduce((acc, attempt) => {
      const totalQuestions = attempt.correctCount + attempt.wrongCount;
      const difficultyLevel = totalQuestions > 0 ? attempt.wrongCount / totalQuestions : 0;
      let level;
      
      if (difficultyLevel < 0.2) level = 'Easy';
      else if (difficultyLevel < 0.4) level = 'Medium';
      else if (difficultyLevel < 0.6) level = 'Challenging';
      else level = 'Difficult';
      
      if (!acc[level]) acc[level] = 0;
      acc[level]++;
      
      return acc;
    }, { Easy: 0, Medium: 0, Challenging: 0, Difficult: 0 });

    return {
      totalAttempts,
      totalStudents,
      genderStats,
      avgScore: parseFloat(avgScore.toFixed(2)),
      maxScore,
      minScore,
      medianScore: parseFloat(medianScore.toFixed(2)),
      scoreStdDev: parseFloat(scoreStdDev.toFixed(2)),
      q1,
      q3,
      iqr: parseFloat(iqr.toFixed(2)),
      avgTime: parseFloat(avgTime.toFixed(2)),
      maxTime,
      minTime,
      totalCorrect,
      totalWrong,
      accuracyRate: parseFloat(accuracyRate.toFixed(2)),
      performanceGroups,
      hourlyDistribution,
      dailyDistribution,
      courseStats,
      departmentStats,
      groupStats,
      scoreTimeCorrelation,
      topPerformers,
      courseGenderMatrix,
      performanceTrend,
      difficultyAnalysis,
      passRate: parseFloat(((performanceGroups.excellent + performanceGroups.good) / totalAttempts * 100).toFixed(2)),
      efficiency: parseFloat((avgScore / (avgTime || 1) * 100).toFixed(2))
    };
  }, [data]);

  // Apply filters
  const filteredAttempts = useMemo(() => {
    if (!data?.attempts) return [];

    return data.attempts.filter(attempt => {
      const student = attempt.student || {};
      
      // Gender filter
      if (filters.gender) {
        const studentGender = (student.gender || '').toLowerCase().trim();
        const filterGender = filters.gender.toLowerCase().trim();
        
        let normalizedStudentGender = studentGender;
        if (studentGender === 'm' || studentGender === 'male') normalizedStudentGender = 'male';
        else if (studentGender === 'f' || studentGender === 'female') normalizedStudentGender = 'female';
        else if (studentGender) normalizedStudentGender = 'other';
        
        if (normalizedStudentGender !== filterGender) return false;
      }
      
      // Department filter
      if (filters.department && student.department !== filters.department) return false;
      
      // Course filter
      if (filters.course && student.course !== filters.course) return false;
      
      // Group filter
      if (filters.group && student.group !== filters.group) return false;
      
      // Score range filter
      if (attempt.scoredMarks < filters.scoreRange[0] || attempt.scoredMarks > filters.scoreRange[1]) return false;
      
      // Date range filter
      if (filters.dateRange.start || filters.dateRange.end) {
        try {
          const attemptDate = new Date(attempt.attemptedAt);
          if (filters.dateRange.start && attemptDate < new Date(filters.dateRange.start)) return false;
          if (filters.dateRange.end && attemptDate > new Date(filters.dateRange.end)) return false;
        } catch {
          // If date parsing fails, include the attempt
        }
      }
      
      // Selected courses filter
      if (selectedCourses.length > 0 && !selectedCourses.includes(student.course)) return false;
      
      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const searchFields = [
          student.name,
          student.studentId,
          student.department,
          student.course,
          student.group
        ].filter(Boolean).map(field => field.toLowerCase());
        
        if (!searchFields.some(field => field.includes(searchLower))) return false;
      }
      
      // Timeframe filter
      if (timeframe !== "all") {
        try {
          const attemptDate = new Date(attempt.attemptedAt);
          const now = new Date();
          const diffDays = Math.floor((now - attemptDate) / (1000 * 60 * 60 * 24));
          
          switch (timeframe) {
            case "today": if (diffDays > 0) return false; break;
            case "week": if (diffDays > 7) return false; break;
            case "month": if (diffDays > 30) return false; break;
            case "quarter": if (diffDays > 90) return false; break;
            default: break;
          }
        } catch {
          // If date parsing fails, include the attempt
        }
      }
      
      return true;
    });
  }, [data, filters, selectedCourses, searchTerm, timeframe]);

  // Sort and paginate
  const sortedAttempts = useMemo(() => {
    const sorted = [...filteredAttempts];
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];
        
        if (sortConfig.key.includes('.')) {
          const keys = sortConfig.key.split('.');
          aVal = keys.reduce((obj, key) => obj?.[key], a);
          bVal = keys.reduce((obj, key) => obj?.[key], b);
        }
        
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sorted;
  }, [filteredAttempts, sortConfig]);

  const paginatedAttempts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedAttempts.slice(startIndex, startIndex + pageSize);
  }, [sortedAttempts, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedAttempts.length / pageSize);

  // Enhanced Chart data with more visualizations
  const chartData = useMemo(() => {
    if (!statistics) return {
      performanceData: [],
      coursePerformanceData: [],
      hourlyData: [],
      scoreTimeData: [],
      genderDistribution: [],
      courseGenderComparison: [],
      performanceTrend: [],
      difficultyAnalysis: [],
      dailyDistribution: [],
      departmentGenderComparison: [],
      radialPerformance: [],
      efficiencyDistribution: [],
      departmentData: [],
      topPerformers: []
    };

    // Performance Distribution
    const performanceData = [
      { 
        name: 'Excellent (90-100%)', 
        value: statistics.performanceGroups?.excellent || 0, 
        color: '#10b981',
        description: 'Exceptional understanding of the material'
      },
      { 
        name: 'Good (75-89%)', 
        value: statistics.performanceGroups?.good || 0, 
        color: '#3b82f6',
        description: 'Solid grasp of concepts'
      },
      { 
        name: 'Average (50-74%)', 
        value: statistics.performanceGroups?.average || 0, 
        color: '#f59e0b',
        description: 'Basic understanding'
      },
      { 
        name: 'Needs Improvement (0-49%)', 
        value: statistics.performanceGroups?.poor || 0, 
        color: '#ef4444',
        description: 'Requires additional support'
      }
    ];

    // Course Performance with gender breakdown
    const coursePerformanceData = Object.entries(statistics.courseStats || {}).map(([course, stats]) => ({
      course,
      averageScore: parseFloat((stats.avgScore || 0).toFixed(2)),
      maleStudents: stats.genderBreakdown?.male || 0,
      femaleStudents: stats.genderBreakdown?.female || 0,
      otherStudents: (stats.genderBreakdown?.other || 0) + (stats.genderBreakdown?.unknown || 0),
      totalStudents: stats.students?.size || 0,
      attempts: stats.total || 0,
      avgTime: parseFloat((stats.avgTime || 0).toFixed(2)),
      excellentPercentage: stats.total > 0 ? parseFloat(((stats.scoreDistribution?.excellent || 0) / stats.total * 100).toFixed(1)) : 0
    })).sort((a, b) => b.averageScore - a.averageScore).slice(0, 10);

    // Gender Distribution Pie Chart - Filter out zero values for better display
    const genderDistribution = [
      { 
        name: 'Male', 
        value: statistics.genderStats?.male?.total || 0, 
        color: '#3b82f6',
        avgScore: statistics.genderStats?.male?.avgScore || 0
      },
      { 
        name: 'Female', 
        value: statistics.genderStats?.female?.total || 0, 
        color: '#ec4899',
        avgScore: statistics.genderStats?.female?.avgScore || 0
      },
      { 
        name: 'Other', 
        value: (statistics.genderStats?.other?.total || 0) + (statistics.genderStats?.unknown?.total || 0), 
        color: '#8b5cf6',
        avgScore: statistics.genderStats?.other?.total > 0 
          ? statistics.genderStats?.other?.avgScore || 0
          : 0
      }
    ].filter(item => item.value > 0);

    // Course vs Gender Comparison
    const courseGenderComparison = (statistics.courseGenderMatrix || []).map(course => ({
      course: course.course?.length > 15 ? course.course.substring(0, 12) + '...' : course.course,
      male: course.maleCount || 0,
      female: course.femaleCount || 0,
      other: course.otherCount || 0,
      maleAvgScore: course.maleAvgScore || 0,
      femaleAvgScore: course.femaleAvgScore || 0
    })).slice(0, 8);

    // Performance Trend
    const performanceTrend = statistics.performanceTrend || [];

    // Difficulty Analysis
    const difficultyAnalysis = [
      { name: 'Easy', value: statistics.difficultyAnalysis?.Easy || 0, color: '#10b981' },
      { name: 'Medium', value: statistics.difficultyAnalysis?.Medium || 0, color: '#3b82f6' },
      { name: 'Challenging', value: statistics.difficultyAnalysis?.Challenging || 0, color: '#f59e0b' },
      { name: 'Difficult', value: statistics.difficultyAnalysis?.Difficult || 0, color: '#ef4444' }
    ];

    // Daily Distribution
    const dailyDistribution = statistics.dailyDistribution || [];

    // Department Gender Comparison
    const departmentGenderComparison = Object.entries(statistics.departmentStats || {})
      .slice(0, 6)
      .map(([dept, stats]) => ({
        department: dept,
        male: stats.genderBreakdown?.male || 0,
        female: stats.genderBreakdown?.female || 0,
        other: (stats.genderBreakdown?.other || 0) + (stats.genderBreakdown?.unknown || 0),
        avgScore: parseFloat((stats.avgScore || 0).toFixed(2))
      }));

    // Radial Performance
    const radialPerformance = [
      { subject: 'Avg Score', A: statistics.avgScore || 0, fullMark: 100 },
      { subject: 'Time (sec)', A: statistics.avgTime || 0, fullMark: statistics.maxTime || 100 },
      { subject: 'Efficiency', A: statistics.efficiency || 0, fullMark: Math.max((statistics.efficiency || 0) * 1.5, 100) },
      { subject: 'Accuracy', A: statistics.accuracyRate || 0, fullMark: 100 },
      { subject: 'Pass Rate', A: statistics.passRate || 0, fullMark: 100 }
    ];

    // Efficiency Distribution
    const efficiencyDistribution = (statistics.scoreTimeCorrelation || []).map(point => ({
      score: point.score || 0,
      time: point.time || 0,
      efficiency: point.efficiency || 0,
      size: (point.correct || 0) + (point.wrong || 0),
      accuracy: point.accuracy || 0
    }));

    return { 
      performanceData, 
      coursePerformanceData, 
      hourlyData: statistics.hourlyDistribution || [], 
      scoreTimeData: efficiencyDistribution,
      genderDistribution,
      courseGenderComparison,
      performanceTrend,
      difficultyAnalysis,
      dailyDistribution,
      departmentGenderComparison,
      radialPerformance,
      efficiencyDistribution,
      departmentData: Object.entries(statistics.departmentStats || {}).map(([dept, stats]) => ({
        department: dept,
        averageScore: parseFloat((stats.avgScore || 0).toFixed(2)),
        students: stats.students?.size || 0,
        attempts: stats.total || 0,
        courses: stats.courses?.size || 0
      })).slice(0, 8),
      topPerformers: statistics.topPerformers || []
    };
  }, [statistics]);

  // Chart component rendering based on selection
  const renderSelectedChart = () => {
    switch(selectedChart) {
      case 'performanceDistribution':
        return (
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={chartData.performanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                >
                  {chartData.performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => [
                    `${value} students (${((value/(statistics?.totalAttempts || 1))*100).toFixed(1)}%)`,
                    props.payload.description || name
                  ]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );

      case 'genderDistribution':
        return (
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={chartData.genderDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.genderDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => [
                    `${value} students`,
                    `Avg Score: ${(props.payload.avgScore || 0).toFixed(1)}%`
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );

      case 'courseGenderComparison':
        return (
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData.courseGenderComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="course" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="male" name="Male Students" fill="#3b82f6" />
                <Bar yAxisId="left" dataKey="female" name="Female Students" fill="#ec4899" />
                <Bar yAxisId="left" dataKey="other" name="Other Students" fill="#8b5cf6" />
                <Line yAxisId="right" type="monotone" dataKey="maleAvgScore" name="Male Avg Score" stroke="#1d4ed8" strokeWidth={2} dot={{ r: 4 }} />
                <Line yAxisId="right" type="monotone" dataKey="femaleAvgScore" name="Female Avg Score" stroke="#be185d" strokeWidth={2} dot={{ r: 4 }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      case 'performanceTrend':
        return (
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={chartData.performanceTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Area yAxisId="left" type="monotone" dataKey="attempts" name="Daily Attempts" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                <Line yAxisId="right" type="monotone" dataKey="avgScore" name="Avg Score (%)" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                <Line yAxisId="left" type="monotone" dataKey="uniqueStudents" name="Unique Students" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        );

      case 'radialPerformance':
        return (
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={350}>
              <RadialBarChart innerRadius="10%" outerRadius="80%" data={chartData.radialPerformance} startAngle={180} endAngle={0}>
                <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise dataKey="A" />
                <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" align="right" />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        );

      case 'efficiencyDistribution':
        return (
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={350}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="score" name="Score" unit="%" />
                <YAxis type="number" dataKey="time" name="Time" unit="s" />
                <ZAxis type="number" dataKey="efficiency" range={[60, 400]} name="Efficiency" />
                <Tooltip formatter={(value, name) => {
                  if (name === 'efficiency') return [value.toFixed(2), 'Efficiency Score'];
                  if (name === 'accuracy') return [value.toFixed(1) + '%', 'Accuracy'];
                  return [value, name];
                }} />
                <Scatter name="Student Attempts" data={chartData.efficiencyDistribution} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        );

      case 'departmentGenderComparison':
        return (
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={chartData.departmentGenderComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="male" name="Male" fill="#3b82f6" />
                <Bar yAxisId="left" dataKey="female" name="Female" fill="#ec4899" />
                <Bar yAxisId="left" dataKey="other" name="Other" fill="#8b5cf6" />
                <Line yAxisId="right" type="monotone" dataKey="avgScore" name="Avg Score" stroke="#10b981" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        );

      default:
        return (
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData.coursePerformanceData.slice(0, 5)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="course" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="averageScore" name="Avg Score (%)" fill="#3b82f6" />
                <Bar dataKey="excellentPercentage" name="Excellent %" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
    }
  };

  // Handlers
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      gender: "",
      department: "",
      course: "",
      group: "",
      scoreRange: [0, 100],
      dateRange: { start: null, end: null }
    });
    const courses = [...new Set(data?.attempts?.map(a => a.student?.course).filter(Boolean) || [])];
    setSelectedCourses(courses);
    setSearchTerm("");
    setTimeframe("all");
    setCurrentPage(1);
  };

  const toggleRow = (id) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const exportToCSV = () => {
    const headers = [
      'Student Name', 'Student ID', 'Gender', 'Department', 
      'Course', 'Group', 'Correct Answers', 'Wrong Answers', 'Score (%)', 
      'Time (sec)', 'Accuracy Rate', 'Efficiency Score', 'Attempted At', 'Performance Level'
    ];
    
    const csvContent = [
      headers.join(','),
      ...sortedAttempts.map(attempt => {
        const performance = 
          attempt.scoredMarks >= 90 ? 'Excellent' :
          attempt.scoredMarks >= 75 ? 'Good' :
          attempt.scoredMarks >= 50 ? 'Average' : 'Needs Improvement';
        const accuracy = attempt.correctCount + attempt.wrongCount > 0 ? 
          ((attempt.correctCount / (attempt.correctCount + attempt.wrongCount)) * 100).toFixed(2) : 0;
        const efficiency = attempt.timeTaken > 0 ? (attempt.scoredMarks / attempt.timeTaken) * 100 : 0;
        
        return [
          `"${attempt.student?.name || 'N/A'}"`,
          attempt.student?.studentId || 'N/A',
          attempt.student?.gender || 'N/A',
          attempt.student?.department || 'N/A',
          attempt.student?.course || 'N/A',
          attempt.student?.group || 'N/A',
          attempt.correctCount,
          attempt.wrongCount,
          attempt.scoredMarks,
          attempt.timeTaken,
          accuracy,
          efficiency.toFixed(2),
          `"${new Date(attempt.attemptedAt).toISOString()}"`,
          performance
        ].join(',');
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `quiz_${quizId}_analytics_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    alert('PDF export would be implemented with a library like jsPDF or html2pdf');
  };

  const printReport = () => {
    window.print();
  };

  const getPerformanceColor = (score) => {
    if (score >= 90) return '#10b981';
    if (score >= 75) return '#3b82f6';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const getPerformanceLabel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 50) return 'Average';
    return 'Needs Improvement';
  };

  // Loading state
  if (loading) return (
    <div className="quiz-analytics-loading">
      <div className="loading-spinner">
        <RefreshCw className="spinner-icon" />
      </div>
      <div className="loading-content">
        <h2>Loading Quiz Analytics</h2>
        <p>Crunching numbers and preparing insights...</p>
        <div className="loading-progress">
          <div className="progress-bar"></div>
        </div>
      </div>
    </div>
  );

  // Error state
  if (error) return (
    <div className="quiz-analytics-error">
      <AlertCircle className="error-icon" />
      <h2>Unable to Load Data</h2>
      <p>{error}</p>
      <div className="error-actions">
        <button onClick={() => window.location.reload()} className="btn btn-primary">
          <RefreshCw size={16} /> Try Again
        </button>
        <button onClick={() => window.history.back()} className="btn btn-outline">
          Go Back
        </button>
      </div>
    </div>
  );

  if (!data) return (
    <div className="quiz-analytics-empty">
      <Users className="empty-icon" />
      <h2>No Quiz Data Available</h2>
      <p>No attempts have been recorded for this quiz yet.</p>
    </div>
  );

  return (
    <div className="quiz-analytics-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-title">
            <h1>
              <Trophy className="header-icon" />
              Quiz Performance Analytics Dashboard
            </h1>
            <p className="subtitle">
              Comprehensive insights for Quiz ID: <span className="quiz-id">{quizId}</span>
            </p>
          </div>
          <div className="header-actions">
            <button onClick={() => setIsFiltersVisible(!isFiltersVisible)} className="btn btn-icon" title="Toggle Filters">
              {isFiltersVisible ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            <button onClick={printReport} className="btn btn-icon" title="Print Report">
              <Printer size={18} />
            </button>
            <button onClick={exportToPDF} className="btn btn-icon" title="Export PDF">
              <Download size={18} />
            </button>
            <button onClick={exportToCSV} className="btn btn-primary">
              <Download size={18} /> Export Data
            </button>
            <button className="btn btn-icon" title="Settings">
              <Settings size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Enhanced Quick Stats Bar */}
      <div className="quick-stats-bar">
        <div className="stat-card">
          <div className="stat-icon total-attempts">
            <Users size={20} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{statistics?.totalAttempts || 0}</div>
            <div className="stat-label">Total Attempts</div>
            <div className="stat-change positive">
              <TrendingUpIcon size={12} /> +12%
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon avg-score">
            <Target size={20} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{statistics?.avgScore?.toFixed(1) || 0}%</div>
            <div className="stat-label">Avg Score</div>
            <div className="stat-change positive">
              <TrendingUpIcon size={12} /> +5.2%
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon pass-rate">
            <CheckCircle size={20} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{statistics?.passRate?.toFixed(1) || 0}%</div>
            <div className="stat-label">Pass Rate</div>
            <div className="stat-change positive">
              <TrendingUpIcon size={12} /> +8.1%
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon avg-time">
            <Clock size={20} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{statistics?.avgTime?.toFixed(1) || 0}s</div>
            <div className="stat-label">Avg Time</div>
            <div className="stat-change negative">
              <TrendingDownIcon size={12} /> -12.3%
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon accuracy">
            <Award size={20} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{statistics?.accuracyRate?.toFixed(1) || 0}%</div>
            <div className="stat-label">Accuracy</div>
            <div className="stat-change positive">
              <TrendingUpIcon size={12} /> +3.7%
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon unique-students">
            <UserCheck size={20} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{statistics?.totalStudents || 0}</div>
            <div className="stat-label">Unique Students</div>
            <div className="stat-change positive">
              <TrendingUpIcon size={12} /> +15%
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Search and Timeframe Bar */}
      <div className="search-timeframe-bar">
        <div className="search-container">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search students, departments, courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="search-clear">
              <XCircle size={16} />
            </button>
          )}
        </div>
        <div className="timeframe-selector">
          <Calendar size={16} />
          <select 
            value={timeframe} 
            onChange={(e) => setTimeframe(e.target.value)}
            className="timeframe-select"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Past Week</option>
            <option value="month">Past Month</option>
            <option value="quarter">Past Quarter</option>
            <option value="year">Past Year</option>
          </select>
        </div>
        <div className="quick-actions">
          <button onClick={resetFilters} className="btn btn-sm btn-outline">
            <FilterX size={14} /> Clear Filters
          </button>
          <button onClick={() => window.location.reload()} className="btn btn-sm btn-outline">
            <RefreshCw size={14} /> Refresh
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {isFiltersVisible && (
        <div className="filters-panel">
          <div className="filters-header">
            <h3><Filter size={18} /> Advanced Filters</h3>
            <div className="filters-actions">
              <button onClick={resetFilters} className="btn btn-sm btn-outline">
                <FilterX size={16} /> Reset All
              </button>
              <button onClick={() => setIsFiltersVisible(false)} className="btn btn-sm btn-icon">
                <ChevronUp size={16} />
              </button>
            </div>
          </div>
          
          <div className="filters-grid">
            <div className="filter-group">
              <label><Users size={14} /> Gender</label>
              <select value={filters.gender} onChange={(e) => handleFilterChange("gender", e.target.value)}>
                <option value="">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="filter-group">
              <label><GraduationCap size={14} /> Department</label>
              <select value={filters.department} onChange={(e) => handleFilterChange("department", e.target.value)}>
                <option value="">All Departments</option>
                {[...new Set(data.attempts?.map(a => a.student?.department).filter(Boolean) || [])].map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label><BookOpen size={14} /> Course</label>
              <select value={filters.course} onChange={(e) => handleFilterChange("course", e.target.value)}>
                <option value="">All Courses</option>
                {[...new Set(data.attempts?.map(a => a.student?.course).filter(Boolean) || [])].map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label><Target size={14} /> Score Range: {filters.scoreRange[0]} - {filters.scoreRange[1]}</label>
              <div className="range-slider-container">
                <div className="range-values">
                  <span>{filters.scoreRange[0]}</span>
                  <span>{filters.scoreRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.scoreRange[0]}
                  onChange={(e) => handleFilterChange("scoreRange", [parseInt(e.target.value), filters.scoreRange[1]])}
                  className="range-slider"
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.scoreRange[1]}
                  onChange={(e) => handleFilterChange("scoreRange", [filters.scoreRange[0], parseInt(e.target.value)])}
                  className="range-slider"
                />
              </div>
            </div>
          </div>

          <div className="courses-filter">
            <label><BookOpen size={14} /> Courses to Include</label>
            <div className="courses-pills">
              {[...new Set(data.attempts?.map(a => a.student?.course).filter(Boolean) || [])].map(course => (
                <button
                  key={course}
                  onClick={() => {
                    setSelectedCourses(prev =>
                      prev.includes(course)
                        ? prev.filter(c => c !== course)
                        : [...prev, course]
                    );
                  }}
                  className={`course-pill ${selectedCourses.includes(course) ? 'active' : ''}`}
                >
                  {course}
                  {selectedCourses.includes(course) && <CheckCircle size={12} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Enhanced View Toggle */}
        <div className="view-toggle-container">
          <div className="view-toggle">
            <button 
              className={`view-toggle-btn ${activeView === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveView('overview')}
            >
              <BarChart3 size={18} /> Overview
            </button>
            <button 
              className={`view-toggle-btn ${activeView === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveView('analytics')}
            >
              <TrendingUp size={18} /> Analytics
            </button>
            <button 
              className={`view-toggle-btn ${activeView === 'details' ? 'active' : ''}`}
              onClick={() => setActiveView('details')}
            >
              <Users size={18} /> Student Details
            </button>
            <button 
              className={`view-toggle-btn ${activeView === 'insights' ? 'active' : ''}`}
              onClick={() => setActiveView('insights')}
            >
              <Brain size={18} /> AI Insights
            </button>
          </div>
          
          <div className="view-controls">
            <div className="chart-palette">
              <select 
                value={selectedChart}
                onChange={(e) => setSelectedChart(e.target.value)}
                className="chart-select"
              >
                <option value="performanceDistribution">Performance Distribution</option>
                <option value="genderDistribution">Gender Distribution</option>
                <option value="courseGenderComparison">Course Gender Comparison</option>
                <option value="performanceTrend">Performance Trend</option>
                <option value="radialPerformance">Radial Performance</option>
                <option value="efficiencyDistribution">Efficiency Distribution</option>
                <option value="departmentGenderComparison">Department Gender Comparison</option>
              </select>
            </div>
            
            <select 
              value={pageSize} 
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="page-size-select"
            >
              <option value="10">10 per page</option>
              <option value="25">25 per page</option>
              <option value="50">50 per page</option>
              <option value="100">100 per page</option>
            </select>
            
            <div className="chart-type-toggle">
              <button 
                className={`chart-type-btn ${chartType === 'bar' ? 'active' : ''}`}
                onClick={() => setChartType('bar')}
                title="Bar Chart"
              >
                <BarChart3 size={16} />
              </button>
              <button 
                className={`chart-type-btn ${chartType === 'line' ? 'active' : ''}`}
                onClick={() => setChartType('line')}
                title="Line Chart"
              >
                <LineChartIcon size={16} />
              </button>
              <button 
                className={`chart-type-btn ${chartType === 'pie' ? 'active' : ''}`}
                onClick={() => setChartType('pie')}
                title="Pie Chart"
              >
                <PieChartIcon size={16} />
              </button>
              <button 
                className={`chart-type-btn ${chartType === 'area' ? 'active' : ''}`}
                onClick={() => setChartType('area')}
                title="Area Chart"
              >
                <TrendingUp size={16} />
              </button>
            </div>
          </div>
        </div>
{/* Enhanced Overview Dashboard */}
{activeView === 'overview' && (
  <div className="overview-dashboard">
    {/* Main Header with Quiz Info */}
    <div className="overview-header">
      <div className="header-left">
        {/* <h1 className="page-title">Quiz Performance Dashboard</h1> */}
        {/* <p className="page-subtitle">
          Comprehensive analysis of quiz attempts and student performance
        </p> */}
      </div>
      <div className="header-right">
        <div className="quiz-meta">
          {/* <span className="meta-item">
            <Calendar size={14} />
            Quiz ID: <strong>{quizId}</strong>
          </span> */}
          <span className="meta-item">
            <Clock size={14} />
            Last Updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>

    {/* Main Content Area */}
    <div className="overview-content">
      {/* Left Column - Performance Charts */}
      <div className="left-column">
        {/* Performance Distribution Card */}
        <div className="chart-card">
          <div className="card-header">
            <div className="card-title">
              <BarChart3 size={20} />
              <h3>Performance Distribution</h3>
            </div>
            <select 
              value={selectedChart}
              onChange={(e) => setSelectedChart(e.target.value)}
              className="chart-selector"
            >
              <option value="performanceDistribution">Score Distribution</option>
              <option value="genderDistribution">Gender Distribution</option>
              <option value="performanceTrend">Trend Analysis</option>
              <option value="radialPerformance">Radial View</option>
            </select>
          </div>
          <div className="card-body">
            {renderSelectedChart()}
          </div>
          <div className="card-footer">
            <div className="insight-bubble">
              <Info size={14} />
              <span>
                {statistics?.performanceGroups?.poor > 0 
                  ? `${statistics.performanceGroups.poor} students need additional support`
                  : 'All students performed well above average'}
              </span>
            </div>
          </div>
        </div>

        {/* Course Performance Card */}
        <div className="chart-card">
          <div className="card-header">
            <div className="card-title">
              <GraduationCap size={20} />
              <h3>Course Performance</h3>
            </div>
            <div className="card-actions">
              <button className="btn-icon" title="Expand view">
                <Maximize2 size={16} />
              </button>
            </div>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData.coursePerformanceData?.slice(0, 5) || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis 
                  dataKey="course" 
                  angle={-30}
                  textAnchor="end"
                  height={50}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'averageScore') return [`${value}%`, 'Average Score'];
                    if (name === 'excellentPercentage') return [`${value}%`, 'Excellent %'];
                    return [value, name];
                  }}
                  contentStyle={{ 
                    borderRadius: '8px',
                    padding: '12px',
                    border: '1px solid #e5e7eb'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="averageScore" 
                  name="Avg Score" 
                  fill="#4f46e5" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="excellentPercentage" 
                  name="Excellent %" 
                  fill="#10b981" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="card-footer">
            <div className="top-course">
              <Trophy size={14} />
              <span>
                {chartData.coursePerformanceData && chartData.coursePerformanceData.length > 0
                  ? `Top Course: ${chartData.coursePerformanceData[0].course}`
                  : 'No course data available'}
              </span>
              <span className="top-score">
                {chartData.coursePerformanceData && chartData.coursePerformanceData.length > 0
                  ? `${chartData.coursePerformanceData[0].averageScore?.toFixed(1) || 0}%`
                  : '0%'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Insights & Top Performers */}
      <div className="right-column">
        {/* Performance Insights Card */}
        <div className="insights-card">
          <div className="card-header">
            <div className="card-title">
              <Brain size={20} />
              <h3>Performance Insights</h3>
            </div>
          </div>
          <div className="card-body">
            <div className="insights-list">
              <div className="insight-item positive">
                <div className="insight-icon">
                  <TrendingUp size={16} />
                </div>
                <div className="insight-content">
                  <h4>Strong Performance Trend</h4>
                  <p>
                    {statistics?.avgScore 
                      ? `Average score of ${statistics.avgScore.toFixed(1)}% indicates ${statistics.avgScore >= 70 ? 'excellent' : statistics.avgScore >= 50 ? 'good' : 'needs improvement'} overall understanding`
                      : 'Performance data not available'}
                  </p>
                </div>
              </div>
              
              <div className="insight-item info">
                <div className="insight-icon">
                  <Users size={16} />
                </div>
                <div className="insight-content">
                  <h4>Gender Performance</h4>
                  <p>
                    {statistics?.genderStats?.male?.total > 0 && statistics?.genderStats?.female?.total > 0
                      ? (statistics.genderStats.male.avgScore > statistics.genderStats.female.avgScore
                          ? `Male students lead by ${(statistics.genderStats.male.avgScore - statistics.genderStats.female.avgScore).toFixed(1)}%`
                          : `Female students lead by ${(statistics.genderStats.female.avgScore - statistics.genderStats.male.avgScore).toFixed(1)}%`)
                      : 'Insufficient gender data for comparison'}
                  </p>
                </div>
              </div>
              
              <div className="insight-item warning">
                <div className="insight-icon">
                  <Clock size={16} />
                </div>
                <div className="insight-content">
                  <h4>Time Management</h4>
                  <p>
                    {statistics?.avgTime 
                      ? `Average completion time of ${statistics.avgTime.toFixed(1)}s shows ${statistics.avgTime < 300 ? 'excellent' : 'adequate'} time management`
                      : 'Time data not available'}
                  </p>
                </div>
              </div>
              
              <div className="insight-item success">
                <div className="insight-icon">
                  <CheckCircle size={16} />
                </div>
                <div className="insight-content">
                  <h4>Accuracy Rate</h4>
                  <p>
                    {statistics?.accuracyRate 
                      ? `${statistics.accuracyRate.toFixed(1)}% accuracy indicates ${statistics.accuracyRate >= 80 ? 'excellent' : statistics.accuracyRate >= 60 ? 'good' : 'needs improvement'} comprehension`
                      : 'Accuracy data not available'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performers Card */}
        <div className="performers-card">
          <div className="card-header">
            <div className="card-title">
              <Trophy size={20} />
              <h3>Top Performers</h3>
            </div>
            <button className="btn-text">View All</button>
          </div>
          <div className="card-body">
            <div className="performers-list">
              {chartData.topPerformers && chartData.topPerformers.length > 0 
                ? chartData.topPerformers.slice(0, 5).map((performer, index) => (
                    <div key={index} className="performer-item">
                      <div className="performer-rank">
                        <span className={`rank-badge ${index < 3 ? 'top-three' : ''}`}>
                          #{performer.rank}
                        </span>
                      </div>
                      <div className="performer-avatar">
                        {performer.name?.charAt(0) || 'A'}
                      </div>
                      <div className="performer-details">
                        <div className="performer-name">{performer.name || 'Anonymous'}</div>
                        <div className="performer-meta">
                          <span>{performer.course || 'Unknown'}</span>
                          <span>•</span>
                          <span>ID: {performer.studentId || 'N/A'}</span>
                        </div>
                      </div>
                      <div className="performer-score">
                        <div className="score-value">{performer.score?.toFixed(1) || 0}%</div>
                        <div className="score-time">{performer.time?.toFixed(1) || 0}s</div>
                      </div>
                    </div>
                  ))
                : (
                    <div className="no-performers">
                      <span>No top performers data available</span>
                    </div>
                  )
              }
            </div>
          </div>
        </div>

        {/* Quick Stats Card */}
        <div className="stats-card">
          <div className="card-header">
            <div className="card-title">
              <Activity size={20} />
              <h3>Quick Statistics</h3>
            </div>
          </div>
          <div className="card-body">
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-label">Total Attempts</div>
                <div className="stat-value">{statistics?.totalAttempts || 0}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Accuracy Rate</div>
                <div className="stat-value">{statistics?.accuracyRate?.toFixed(1) || 0}%</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Median Score</div>
                <div className="stat-value">{statistics?.medianScore?.toFixed(1) || 0}%</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Score Range</div>
                <div className="stat-value">
                  {statistics?.minScore?.toFixed(1) || 0}% - {statistics?.maxScore?.toFixed(1) || 0}%
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Time Efficiency</div>
                <div className="stat-value">{statistics?.efficiency?.toFixed(1) || 0}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Completion Rate</div>
                <div className="stat-value">
                  {statistics?.totalAttempts && statistics?.totalStudents
                    ? ((statistics.totalAttempts / statistics.totalStudents) * 100).toFixed(0)
                    : 0}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Additional Insights Row */}
    <div className="additional-insights">
      <div className="insight-card detailed">
        <div className="insight-header">
          <h4>Time Analysis</h4>
          <Clock size={18} />
        </div>
        <div className="insight-content">
          <div className="time-metrics">
            <div className="time-metric">
              <span className="metric-label">Peak Hour</span>
              <span className="metric-value">
                {chartData.hourlyData && chartData.hourlyData.length > 0 
                  ? chartData.hourlyData.reduce((max, hour) => 
                      hour.attempts > max.attempts ? hour : max
                    ).hour
                  : 'No data'}
              </span>
            </div>
            <div className="time-metric">
              <span className="metric-label">Best Time</span>
              <span className="metric-value">
                {chartData.hourlyData && chartData.hourlyData.length > 0 
                  ? chartData.hourlyData.reduce((max, hour) => 
                      hour.avgScore > max.avgScore ? hour : max
                    ).hour
                  : 'No data'}
              </span>
            </div>
            <div className="time-metric">
              <span className="metric-label">Efficiency Peak</span>
              <span className="metric-value">
                {chartData.hourlyData && chartData.hourlyData.length > 0 
                  ? chartData.hourlyData.reduce((max, hour) => 
                      hour.efficiency > max.efficiency ? hour : max
                    ).hour
                  : 'No data'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="insight-card detailed">
        <div className="insight-header">
          <h4>Quiz Difficulty</h4>
          <Target size={18} />
        </div>
        <div className="insight-content">
          <div className="difficulty-analysis">
            <div className="difficulty-level">
              <div className="level-indicator">
                <div 
                  className="level-fill"
                  style={{ width: `${statistics?.avgScore || 0}%` }}
                ></div>
              </div>
              <div className="level-labels">
                <span>Easy</span>
                <span className="level-value">{statistics?.avgScore?.toFixed(1) || 0}%</span>
                <span>Hard</span>
              </div>
            </div>
            <div className="difficulty-stats">
              <span>Based on average score of {statistics?.avgScore?.toFixed(1) || 0}%</span>
              <span className={`difficulty-label ${(statistics?.avgScore || 0) >= 70 ? 'moderate' : 'challenging'}`}>
                {(statistics?.avgScore || 0) >= 70 ? 'Moderate' : 'Challenging'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="insight-card detailed">
        <div className="insight-header">
          <h4>Gender Distribution</h4>
          <Users size={18} />
        </div>
        <div className="insight-content">
          <div className="gender-stats">
            {(() => {
              const total = statistics?.totalAttempts || 1;
              const maleCount = statistics?.genderStats?.male?.total || 0;
              const femaleCount = statistics?.genderStats?.female?.total || 0;
              const otherCount = (statistics?.genderStats?.other?.total || 0) + (statistics?.genderStats?.unknown?.total || 0);
              
              return (
                <>
                  {maleCount > 0 && (
                    <div className="gender-item male">
                      <div className="gender-label">Male</div>
                      <div className="gender-value">
                        {maleCount}
                        <span className="gender-percentage">
                          ({((maleCount / total) * 100).toFixed(0)}%)
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {femaleCount > 0 && (
                    <div className="gender-item female">
                      <div className="gender-label">Female</div>
                      <div className="gender-value">
                        {femaleCount}
                        <span className="gender-percentage">
                          ({((femaleCount / total) * 100).toFixed(0)}%)
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {otherCount > 0 && (
                    <div className="gender-item other">
                      <div className="gender-label">Other</div>
                      <div className="gender-value">
                        {otherCount}
                        <span className="gender-percentage">
                          ({((otherCount / total) * 100).toFixed(0)}%)
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {maleCount === 0 && femaleCount === 0 && otherCount === 0 && (
                    <div className="no-gender-data">
                      <span>Gender data not available</span>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  </div>
)}
        {/* Enhanced Analytics View */}
        {activeView === 'analytics' && (
          <div className="analytics-dashboard">
            <div className="analytics-header">
              <h2>Deep Analytics & Trends</h2>
              <div className="analytics-filters">
                <select className="analytics-select">
                  <option>All Metrics</option>
                  <option>Score Analysis</option>
                  <option>Time Analysis</option>
                  <option>Gender Analysis</option>
                  <option>Course Analysis</option>
                </select>
              </div>
            </div>

            <div className="analytics-grid">
              <div className="analytics-card score-time-analysis">
                <h3>Score vs Time Correlation</h3>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={300}>
                    <ScatterChart>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" dataKey="score" name="Score" unit="%" />
                      <YAxis type="number" dataKey="time" name="Time" unit="s" />
                      <ZAxis type="number" dataKey="efficiency" range={[60, 400]} name="Efficiency" />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Legend />
                      <Scatter name="Attempts" data={chartData.scoreTimeData} fill="#8884d8" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="analytics-card department-performance">
                <h3>Department Performance Matrix</h3>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData.departmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="averageScore" name="Avg Score (%)" fill="#10b981" />
                      <Bar dataKey="students" name="Students" fill="#3b82f6" />
                      <Bar dataKey="courses" name="Courses" fill="#f59e0b" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="detailed-stats">
              <div className="stats-card comprehensive">
                <h4>Comprehensive Performance Metrics</h4>
                <div className="metrics-grid detailed">
                  <div className="metric-item detailed">
                    <div className="metric-header">
                      <span className="metric-label">Score Distribution</span>
                      <Percent size={14} />
                    </div>
                    <div className="metric-values">
                      <div className="metric-row">
                        <span className="metric-sub-label">Mean Score</span>
                        <span className="metric-value primary">{statistics?.avgScore?.toFixed(1) || 0}%</span>
                      </div>
                      <div className="metric-row">
                        <span className="metric-sub-label">Score Std Dev</span>
                        <span className="metric-value">{statistics?.scoreStdDev?.toFixed(2) || 0}</span>
                      </div>
                      <div className="metric-row">
                        <span className="metric-sub-label">Score IQR</span>
                        <span className="metric-value">{statistics?.iqr?.toFixed(2) || 0}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="metric-item detailed">
                    <div className="metric-header">
                      <span className="metric-label">Time Analysis</span>
                      <ClockIcon size={14} />
                    </div>
                    <div className="metric-values">
                      <div className="metric-row">
                        <span className="metric-sub-label">Avg Completion Time</span>
                        <span className="metric-value primary">{statistics?.avgTime?.toFixed(1) || 0}s</span>
                      </div>
                      <div className="metric-row">
                        <span className="metric-sub-label">Time Range</span>
                        <span className="metric-value">{statistics?.minTime?.toFixed(1) || 0}s - {statistics?.maxTime?.toFixed(1) || 0}s</span>
                      </div>
                      <div className="metric-row">
                        <span className="metric-sub-label">Efficiency Score</span>
                        <span className="metric-value success">{statistics?.efficiency?.toFixed(2) || 0}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="metric-item detailed">
                    <div className="metric-header">
                      <span className="metric-label">Accuracy Metrics</span>
                      <TargetIcon size={14} />
                    </div>
                    <div className="metric-values">
                      <div className="metric-row">
                        <span className="metric-sub-label">Overall Accuracy</span>
                        <span className="metric-value primary">{statistics?.accuracyRate?.toFixed(1) || 0}%</span>
                      </div>
                      <div className="metric-row">
                        <span className="metric-sub-label">Correct Answers</span>
                        <span className="metric-value success">{statistics?.totalCorrect || 0}</span>
                      </div>
                      <div className="metric-row">
                        <span className="metric-sub-label">Wrong Answers</span>
                        <span className="metric-value warning">{statistics?.totalWrong || 0}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="metric-item detailed">
                    <div className="metric-header">
                      <span className="metric-label">Demographics</span>
                      <UsersIcon size={14} />
                    </div>
                    <div className="metric-values">
                      <div className="metric-row">
                        <span className="metric-sub-label">Unique Students</span>
                        <span className="metric-value primary">{statistics?.totalStudents || 0}</span>
                      </div>
                      <div className="metric-row">
                        <span className="metric-sub-label">Attempts per Student</span>
                        <span className="metric-value">
                          {((statistics?.totalAttempts || 0) / (statistics?.totalStudents || 1)).toFixed(2)}
                        </span>
                      </div>
                      <div className="metric-row">
                        <span className="metric-sub-label">Gender Ratio</span>
                        <span className="metric-value">
                          {statistics?.genderStats?.male?.total || 0}M : {statistics?.genderStats?.female?.total || 0}F
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Course-Gender Analysis Section */}
            <div className="analysis-section">
              <h3>Course-wise Gender Performance Analysis</h3>
              <div className="analysis-grid">
                {chartData.coursePerformanceData.slice(0, 4).map((course, index) => (
                  <div key={index} className="course-analysis-card">
                    <div className="course-header">
                      <h4>{course.course}</h4>
                      <span className="course-score">{course.averageScore?.toFixed(1) || 0}%</span>
                    </div>
                    <div className="gender-breakdown">
                      <div className="gender-stat">
                        <span className="gender-label male">Male</span>
                        <div className="gender-bar">
                          <div 
                            className="gender-fill male"
                            style={{ width: `${course.totalStudents > 0 ? (course.maleStudents / course.totalStudents) * 100 : 0}%` }}
                          ></div>
                        </div>
                        <span className="gender-count">{course.maleStudents}</span>
                      </div>
                      <div className="gender-stat">
                        <span className="gender-label female">Female</span>
                        <div className="gender-bar">
                          <div 
                            className="gender-fill female"
                            style={{ width: `${course.totalStudents > 0 ? (course.femaleStudents / course.totalStudents) * 100 : 0}%` }}
                          ></div>
                        </div>
                        <span className="gender-count">{course.femaleStudents}</span>
                      </div>
                    </div>
                    <div className="course-stats">
                      <div className="stat-item">
                        <span className="stat-label">Total Students</span>
                        <span className="stat-value">{course.totalStudents}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Avg Time</span>
                        <span className="stat-value">{course.avgTime?.toFixed(1) || 0}s</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Excellent %</span>
                        <span className="stat-value excellent">{course.excellentPercentage?.toFixed(1) || 0}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AI Insights View */}
        {activeView === 'insights' && (
          <div className="insights-dashboard">
            <div className="insights-header">
              <h2><Brain size={24} /> AI-Powered Insights</h2>
              <p className="insights-subtitle">Intelligent analysis of quiz performance patterns</p>
            </div>

            <div className="insights-grid">
              <div className="insight-card large">
                <div className="insight-header">
                  <Brain size={20} />
                  <h3>Key Performance Indicators</h3>
                </div>
                <div className="insight-content">
                  <div className="kpi-grid">
                    <div className="kpi-item positive">
                      <div className="kpi-label">Strong Performance</div>
                      <div className="kpi-value">{(statistics?.performanceGroups?.excellent || 0) + (statistics?.performanceGroups?.good || 0)} students</div>
                      <div className="kpi-desc">
                        {((((statistics?.performanceGroups?.excellent || 0) + (statistics?.performanceGroups?.good || 0)) / (statistics?.totalAttempts || 1) * 100).toFixed(1))}% of students scored above 75%
                      </div>
                    </div>
                    
                    <div className="kpi-item warning">
                      <div className="kpi-label">Attention Required</div>
                      <div className="kpi-value">{statistics?.performanceGroups?.poor || 0} students</div>
                      <div className="kpi-desc">
                        {(((statistics?.performanceGroups?.poor || 0) / (statistics?.totalAttempts || 1) * 100).toFixed(1))}% of students need additional support
                      </div>
                    </div>
                    
                    <div className="kpi-item info">
                      <div className="kpi-label">Gender Balance</div>
                      <div className="kpi-value">
                        {statistics?.genderStats?.male?.total || 0}M : {statistics?.genderStats?.female?.total || 0}F
                      </div>
                      <div className="kpi-desc">
                        {Math.abs((statistics?.genderStats?.male?.avgScore || 0) - (statistics?.genderStats?.female?.avgScore || 0)).toFixed(1)}% score difference
                      </div>
                    </div>
                    
                    <div className="kpi-item success">
                      <div className="kpi-label">Time Efficiency</div>
                      <div className="kpi-value">{statistics?.efficiency?.toFixed(1) || 0}</div>
                      <div className="kpi-desc">
                        Higher efficiency indicates better time management per score point
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="insight-card">
                <div className="insight-header">
                  <TrendingUp size={20} />
                  <h3>Performance Trends</h3>
                </div>
                <div className="insight-content">
                  <div className="trend-analysis">
                    <p>
                      {statistics?.performanceTrend && statistics.performanceTrend.length > 1 
                        ? (statistics.performanceTrend[statistics.performanceTrend.length - 1]?.avgScore || 0) >
                          (statistics.performanceTrend[0]?.avgScore || 0)
                          ? '📈 Positive trend observed with average scores increasing over the last week'
                          : '📊 Consistent performance maintained with stable average scores'
                        : '📊 Not enough data to determine trend'}
                    </p>
                    
                    <div className="trend-metrics">
                      <div className="trend-metric">
                        <span className="metric-label">Peak Activity</span>
                        <span className="metric-value">
                          {chartData.hourlyData && chartData.hourlyData.length > 0 
                            ? chartData.hourlyData.reduce((max, hour) => hour.attempts > max.attempts ? hour : max).hour
                            : 'No data'}
                        </span>
                      </div>
                      <div className="trend-metric">
                        <span className="metric-label">Best Day</span>
                        <span className="metric-value">
                          {chartData.dailyDistribution && chartData.dailyDistribution.length > 0 
                            ? chartData.dailyDistribution.reduce((max, day) => day.avgScore > max.avgScore ? day : max).day
                            : 'No data'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="insight-card">
                <div className="insight-header">
                  <Target size={20} />
                  <h3>Recommendations</h3>
                </div>
                <div className="insight-content">
                  <ul className="recommendations-list">
                    <li>
                      <CheckCircle size={16} />
                      <span>Focus on improving performance for students scoring below 50%</span>
                    </li>
                    <li>
                      <CheckCircle size={16} />
                      <span>Consider additional support for courses with lower excellent percentages</span>
                    </li>
                    <li>
                      <CheckCircle size={16} />
                      <span>Schedule review sessions during peak performance hours</span>
                    </li>
                    <li>
                      <CheckCircle size={16} />
                      <span>Implement targeted interventions for specific departments</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Student Details View */}
        {activeView === 'details' && (
          <div className="student-details-view">
            <div className="table-controls">
              <div className="results-info">
                <Users size={16} />
                Showing {paginatedAttempts.length} of {sortedAttempts.length} results
              </div>
              <div className="pagination-controls">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="pagination-btn"
                >
                  <ChevronLeft size={16} /> Previous
                </button>
                <span className="pagination-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="table-container">
              <table className="student-table">
                <thead>
                  <tr>
                    <th></th>
                    <th onClick={() => handleSort('student.name')} className="sortable">
                      Student Name {sortConfig.key === 'student.name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('student.studentId')} className="sortable">
                      ID {sortConfig.key === 'student.studentId' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('student.gender')} className="sortable">
                      Gender {sortConfig.key === 'student.gender' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('student.department')} className="sortable">
                      Department {sortConfig.key === 'student.department' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('scoredMarks')} className="sortable">
                      Score {sortConfig.key === 'scoredMarks' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('timeTaken')} className="sortable">
                      Time {sortConfig.key === 'timeTaken' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th>Efficiency</th>
                    <th>Performance</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedAttempts.map((attempt) => {
                    const efficiency = attempt.timeTaken > 0 ? (attempt.scoredMarks / attempt.timeTaken) * 100 : 0;
                    
                    return (
                      <React.Fragment key={attempt._id}>
                        <tr className="student-row">
                          <td>
                            <button 
                              onClick={() => toggleRow(attempt._id)}
                              className="expand-btn"
                            >
                              {expandedRows.includes(attempt._id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                          </td>
                          <td className="student-name">
                            <div className="avatar">
                              {attempt.student?.name?.charAt(0) || '?'}
                            </div>
                            <div className="student-info">
                              <div className="student-name-text">{attempt.student?.name || 'Anonymous'}</div>
                              <div className="student-course">{attempt.student?.course || 'N/A'}</div>
                            </div>
                          </td>
                          <td className="student-id">{attempt.student?.studentId || 'N/A'}</td>
                          <td>
                            <span className={`gender-badge gender-${attempt.student?.gender || 'unknown'}`}>
                              {attempt.student?.gender || 'Unknown'}
                            </span>
                          </td>
                          <td>{attempt.student?.department || 'N/A'}</td>
                          <td>
                            <div className="score-container">
                              <div className="score-value">{attempt.scoredMarks?.toFixed(1) || 0}%</div>
                              <div className="score-bar">
                                <div 
                                  className="score-fill"
                                  style={{ 
                                    width: `${attempt.scoredMarks || 0}%`,
                                    backgroundColor: getPerformanceColor(attempt.scoredMarks)
                                  }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="time-container">
                              <Clock size={14} />
                              <span>{attempt.timeTaken?.toFixed(1) || 0}s</span>
                            </div>
                          </td>
                          <td>
                            <div className="efficiency-container">
                              <span className={`efficiency-badge ${efficiency > 2 ? 'high' : efficiency > 1 ? 'medium' : 'low'}`}>
                                {efficiency.toFixed(1)}
                              </span>
                            </div>
                          </td>
                          <td>
                            <span 
                              className="performance-badge"
                              style={{ backgroundColor: getPerformanceColor(attempt.scoredMarks) }}
                            >
                              {getPerformanceLabel(attempt.scoredMarks)}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button 
                                onClick={() => setSelectedStudent(attempt)}
                                className="btn btn-sm btn-outline"
                                title="View Details"
                              >
                                <Info size={14} />
                              </button>
                              <button 
                                className="btn btn-sm btn-icon"
                                title="View History"
                              >
                                <ChevronRight size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                        
                        {expandedRows.includes(attempt._id) && (
                          <tr className="expanded-row">
                            <td colSpan="10">
                              <div className="expanded-content">
                                <div className="expanded-section">
                                  <h4>Performance Details</h4>
                                  <div className="details-grid">
                                    <div className="detail-item">
                                      <span className="detail-label">Correct Answers:</span>
                                      <span className="detail-value success">{attempt.correctCount || 0}</span>
                                    </div>
                                    <div className="detail-item">
                                      <span className="detail-label">Wrong Answers:</span>
                                      <span className="detail-value danger">{attempt.wrongCount || 0}</span>
                                    </div>
                                    <div className="detail-item">
                                      <span className="detail-label">Accuracy:</span>
                                      <span className="detail-value">
                                        {attempt.correctCount + attempt.wrongCount > 0 
                                          ? ((attempt.correctCount / (attempt.correctCount + attempt.wrongCount)) * 100).toFixed(2)
                                          : 0}%
                                      </span>
                                    </div>
                                    <div className="detail-item">
                                      <span className="detail-label">Efficiency Score:</span>
                                      <span className="detail-value">
                                        {efficiency.toFixed(2)}
                                      </span>
                                    </div>
                                    <div className="detail-item">
                                      <span className="detail-label">Course:</span>
                                      <span className="detail-value">{attempt.student?.course || 'N/A'}</span>
                                    </div>
                                    <div className="detail-item">
                                      <span className="detail-label">Group:</span>
                                      <span className="detail-value">{attempt.student?.group || 'N/A'}</span>
                                    </div>
                                    <div className="detail-item">
                                      <span className="detail-label">Attempted At:</span>
                                      <span className="detail-value">
                                        {attempt.attemptedAt ? new Date(attempt.attemptedAt).toLocaleString() : 'N/A'}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="expanded-section">
                                  <h4>Performance Comparison</h4>
                                  <div className="comparison-stats">
                                    <div className="comparison-item">
                                      <span className="comparison-label">Class Average:</span>
                                      <span className="comparison-value">{statistics?.avgScore?.toFixed(1) || 0}%</span>
                                    </div>
                                    <div className="comparison-item">
                                      <span className="comparison-label">Difference:</span>
                                      <span className={`comparison-value ${(attempt.scoredMarks || 0) >= (statistics?.avgScore || 0) ? 'success' : 'danger'}`}>
                                        {((attempt.scoredMarks || 0) - (statistics?.avgScore || 0)).toFixed(1)}%
                                      </span>
                                    </div>
                                    <div className="comparison-item">
                                      <span className="comparison-label">Percentile:</span>
                                      <span className="comparison-value">
                                        {sortedAttempts.length > 0 
                                          ? ((sortedAttempts.filter(a => (a.scoredMarks || 0) <= (attempt.scoredMarks || 0)).length / sortedAttempts.length) * 100).toFixed(1)
                                          : 0}%
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
              
              {paginatedAttempts.length === 0 && (
                <div className="empty-table">
                  <Users size={48} />
                  <h3>No results found</h3>
                  <p>Try adjusting your filters or search terms</p>
                  <button onClick={resetFilters} className="btn btn-primary">
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="footer-content">
          <div className="footer-info">
            <span><Clock size={12} /> Data updated: {new Date().toLocaleString()}</span>
            <span>•</span>
            <span>Quiz ID: {quizId}</span>
            <span>•</span>
            <span>Total students: {statistics?.totalStudents || 0}</span>
            <span>•</span>
            <span>Analysis generated by AI</span>
          </div>
          <div className="footer-actions">
            <button className="btn btn-sm btn-outline">
              <Share2 size={14} /> Share Report
            </button>
            <button className="btn btn-sm btn-outline">
              <HelpCircle size={14} /> Help & Support
            </button>
            <button className="btn btn-sm btn-primary">
              <DownloadCloud size={14} /> Export All Data
            </button>
          </div>
        </div>
      </footer>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="student-modal-overlay" onClick={() => setSelectedStudent(null)}>
          <div className="student-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Student Performance Details</h2>
              <button onClick={() => setSelectedStudent(null)} className="modal-close">
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="student-profile">
                <div className="profile-avatar">
                  {selectedStudent.student?.name?.charAt(0) || '?'}
                </div>
                <div className="profile-info">
                  <h3>{selectedStudent.student?.name || 'Anonymous'}</h3>
                  <p className="profile-id">{selectedStudent.student?.studentId || 'N/A'}</p>
                  <p className="profile-meta">
                    {selectedStudent.student?.department || 'N/A'} • {selectedStudent.student?.course || 'N/A'}
                  </p>
                </div>
              </div>
              
              <div className="performance-metrics">
                <div className="metric-card main">
                  <div className="metric-title">Overall Score</div>
                  <div className="metric-value large">{selectedStudent.scoredMarks?.toFixed(1) || 0}%</div>
                  <div className="metric-progress">
                    <div 
                      className="progress-bar"
                      style={{ width: `${selectedStudent.scoredMarks || 0}%` }}
                    ></div>
                  </div>
                  <div className="metric-comparison">
                    <span className="comparison-label">vs Class Average:</span>
                    <span className={`comparison-value ${(selectedStudent.scoredMarks || 0) >= (statistics?.avgScore || 0) ? 'positive' : 'negative'}`}>
                      {((selectedStudent.scoredMarks || 0) - (statistics?.avgScore || 0)).toFixed(1)}%
                    </span>
                  </div>
                </div>
                
                <div className="metric-card">
                  <div className="metric-title">Time Taken</div>
                  <div className="metric-value">{selectedStudent.timeTaken?.toFixed(1) || 0}s</div>
                  <div className="metric-subtitle">
                    {(selectedStudent.timeTaken || 0) < (statistics?.avgTime || 0) ? 'Faster than average' : 'Slower than average'}
                  </div>
                </div>
                
                <div className="metric-card">
                  <div className="metric-title">Accuracy</div>
                  <div className="metric-value">
                    {selectedStudent.correctCount + selectedStudent.wrongCount > 0 
                      ? ((selectedStudent.correctCount / (selectedStudent.correctCount + selectedStudent.wrongCount)) * 100).toFixed(2)
                      : 0}%
                  </div>
                  <div className="metric-subtitle">
                    {selectedStudent.correctCount || 0} correct, {selectedStudent.wrongCount || 0} wrong
                  </div>
                </div>
                
                <div className="metric-card">
                  <div className="metric-title">Efficiency</div>
                  <div className="metric-value">
                    {selectedStudent.timeTaken > 0 ? ((selectedStudent.scoredMarks / selectedStudent.timeTaken) * 100).toFixed(2) : 0}
                  </div>
                  <div className="metric-subtitle">Score per second</div>
                </div>
              </div>
              
              <div className="detailed-info">
                <h4>Student Information</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Department:</span>
                    <span className="info-value">{selectedStudent.student?.department || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Course:</span>
                    <span className="info-value">{selectedStudent.student?.course || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Group:</span>
                    <span className="info-value">{selectedStudent.student?.group || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Gender:</span>
                    <span className="info-value">{selectedStudent.student?.gender || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Performance Level:</span>
                    <span className="info-value performance">
                      {getPerformanceLabel(selectedStudent.scoredMarks)}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Attempted At:</span>
                    <span className="info-value">
                      {selectedStudent.attemptedAt ? new Date(selectedStudent.attemptedAt).toLocaleString() : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="action-buttons">
                <button className="btn btn-outline">
                  <ChevronRight size={16} /> View History
                </button>
                <button className="btn btn-primary">
                  <Download size={16} /> Export Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttemptedStudentByQuiz;