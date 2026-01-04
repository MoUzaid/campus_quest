




import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
  Avatar,
  Divider,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  Snackbar,
  Pagination,
  Tooltip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CardHeader,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
  useMediaQuery,
  InputAdornment,
  Fab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Menu,
  ListItemAvatar,
  Rating,
  Badge
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  TrendingFlat,
  Person,
  School,
  Quiz,
  AccessTime,
  Assessment,
  Insights,
  ShowChart,
  BarChart,
  PieChart,
  Timeline,
  Visibility,
  Download,
  Print,
  Share,
  CalendarToday,
  EmojiEvents,
  Psychology,
  Speed,
  Warning,
  CheckCircle,
  Error as ErrorIcon,
  Refresh,
  Search,
  FilterList,
  MoreVert,
  KeyboardArrowUp,
  KeyboardArrowDown,
  Analytics,
  CompareArrows,
  Dashboard,
  TableChart,
  GridView,
  ExpandMore,
  Star,
  Lightbulb,
  Timer,
  Score,
  ArrowBack,
  Fullscreen,
  FullscreenExit,
  Clear,
  Sort,
  SwapVert,
  Close,
  ArrowForward,
  ArrowBack as ArrowBackIcon,
  FirstPage,
  LastPage,
  ChevronLeft,
  ChevronRight,
  Percent,
  Numbers,
  Leaderboard,
  AutoGraph,
  Security,
  Bolt,
  WorkspacePremium,
  Diversity3,
  Groups,
  Balance,
  Calculate,
  Science,
  HistoryEdu,
  AccountTree,
  DataUsage,
  SignalCellularAlt,
  Speed as SpeedIcon,
  Timelapse,
  VerticalAlignTop,
  VerticalAlignBottom,
  AttachMoney,
  PsychologyAlt,
  AutoAwesome,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Equalizer,
  StackedLineChart,
  ScatterPlot,
  MultilineChart,
  ShowChart as ShowChartIcon,
  Timeline as TimelineIcon,
  DonutLarge,
  BubbleChart,
  Radar,
  Info,
  Description,
  Category,
  Schedule,
  Group,
  AutoStories,
  QuestionAnswer,
  Psychology as PsychologyIcon,
  AccountTree as AccountTreeIcon
} from '@mui/icons-material';
import { Line, Bar, Pie, Doughnut, Radar as RadarChart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
  RadialLinearScale
} from 'chart.js';
import { format, parseISO, differenceInDays, startOfWeek, endOfWeek } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  ChartTooltip,
  Legend,
  Filler,
  RadialLinearScale
);

const FacultyAttemptedStudents = () => {
  const { studentId } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // State management
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizDialogOpen, setQuizDialogOpen] = useState(false);
  const [quizPage, setQuizPage] = useState(1);
  const [quizRowsPerPage, setQuizRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    course: 'all',
    subject: 'all',
    status: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'attemptedAt', direction: 'desc' });
  const [printMode, setPrintMode] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [quizDetails, setQuizDetails] = useState(null);

  // API base URL
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Fetch data function
  const fetchStudentAnalytics = useCallback(async () => {
    if (!studentId) {
      setError({ type: 'invalid_input', message: 'Student ID is required' });
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/faculty/student/${studentId}/quiz-attempts`,
        { 
          withCredentials: true
        }
      );
      
      setData(res.data);
      
      // Also fetch quiz details for each attempt
      // if (res.data?.attempts?.length > 0) {
      //   const quizIds = res.data.attempts.map(attempt => attempt.quizId);
      //   const quizDetailsRes = await axios.post(
      //     `${API_BASE_URL}/api/faculty/quizzes/details`,
      //     { quizIds },
      //     { withCredentials: true }
      //   );
        
      //   setQuizDetails(quizDetailsRes.data);
      // }
      
      setSnackbar({
        open: true,
        message: 'Analytics data loaded successfully',
        severity: 'success'
      });
    } catch (err) {
      console.error('Error fetching student analytics:', err);
      
      const errorMessage = err.response?.data?.message || 
                         err.message || 
                         'Failed to load student analytics';
      
      if (err.response?.status === 404) {
        setError({
          type: 'not_found',
          message: 'Student data not found',
          details: errorMessage
        });
      } else if (err.response?.status === 401 || err.response?.status === 403) {
        setError({
          type: 'auth',
          message: 'Authentication required',
          details: 'Please log in again'
        });
      } else if (err.message.includes('Network Error')) {
        setError({
          type: 'network',
          message: 'Network error',
          details: 'Please check your connection and try again'
        });
      } else {
        setError({
          type: 'unknown',
          message: 'Failed to load student analytics',
          details: errorMessage
        });
      }
      
      setSnackbar({
        open: true,
        message: 'Error loading analytics data',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  }, [studentId, API_BASE_URL]);

  // Initial data fetch
  useEffect(() => {
    fetchStudentAnalytics();
  }, [fetchStudentAnalytics]);

  // Tab change handler
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Quiz dialog handlers - Updated with more details
  const handleOpenQuizDialog = async (quiz) => {
    setSelectedQuiz(quiz);
    
    // Fetch detailed quiz info if not already available
    if (!quiz.detailedInfo && quiz.quizId) {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/faculty/quizzes/${quiz.quizId}`,
          { withCredentials: true }
        );
        setSelectedQuiz(prev => ({ ...prev, detailedInfo: res.data }));
      } catch (err) {
        console.error('Error fetching quiz details:', err);
      }
    }
    
    setQuizDialogOpen(true);
  };

  const handleCloseQuizDialog = () => {
    setQuizDialogOpen(false);
    setSelectedQuiz(null);
  };

  // Export handlers
  const handleExport = (format) => {
    setSnackbar({
      open: true,
      message: `${format.toUpperCase()} export started...`,
      severity: 'info'
    });
    setExportMenuOpen(false);
  };

  const handlePrint = () => {
    setPrintMode(true);
    setTimeout(() => {
      window.print();
      setPrintMode(false);
    }, 100);
  };

  // Retry handler
  const handleRetry = () => {
    fetchStudentAnalytics();
  };

  // Sort handler
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Filter handlers
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setQuizPage(1);
  };

  // Calculate filtered and sorted quizzes
  const filteredQuizzes = useMemo(() => {
    if (!data?.enhancedAnalytics?.timeAnalysis?.detailedTimeEfficiency) return [];
    
    let quizzes = [...data.enhancedAnalytics.timeAnalysis.detailedTimeEfficiency];
    
    // Add quiz data from attempts
    const enhancedQuizzes = quizzes.map((timeEfficiency, index) => {
      const attempt = data?.attempts?.[index] || {};
      const quiz = data?.quizData?.[attempt.quizId] || {};
      const detailedInfo = quizDetails?.[attempt.quizId] || {};
      
      return {
        ...timeEfficiency,
        quizId: attempt.quizId,
        quizTitle: quiz.title || timeEfficiency.quizTitle || detailedInfo.title || 'Untitled Quiz',
        subject: quiz.subject || detailedInfo.subject || 'General',
        course: quiz.course?.[0] || detailedInfo.course?.[0] || 'General',
        attemptedAt: attempt.attemptedAt || new Date(),
        score: attempt.scoredMarks || 0,
        totalMarks: quiz.totalMarks || detailedInfo.totalMarks || 100,
        passingMarks: quiz.passingMarks || detailedInfo.passingMarks || 40,
        timeTaken: attempt.timeTaken || 0,
        status: attempt.scoredMarks >= (quiz.passingMarks || detailedInfo.passingMarks || 40) ? 'passed' : 'failed',
        maxTime: quiz.durationSeconds || (detailedInfo.durationMinutes * 60) || 3600,
        correctCount: attempt.correctCount || 0,
        wrongCount: attempt.wrongCount || 0,
        answers: attempt.answers || [],
        detailedInfo: detailedInfo
      };
    });
    
    // Apply filters
    let filtered = enhancedQuizzes;
    
    if (filters.course !== 'all') {
      filtered = filtered.filter(q => q.course === filters.course);
    }
    
    if (filters.subject !== 'all') {
      filtered = filtered.filter(q => q.subject === filters.subject);
    }
    
    if (filters.status !== 'all') {
      filtered = filtered.filter(q => q.status === filters.status);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(q => 
        q.quizTitle?.toLowerCase().includes(query) ||
        q.subject?.toLowerCase().includes(query) ||
        q.course?.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      
      // Handle date sorting
      if (sortConfig.key === 'attemptedAt') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }
      
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    
    return filtered;
  }, [data, quizDetails, filters, searchQuery, sortConfig]);

  // Pagination
  const paginatedQuizzes = useMemo(() => {
    const startIndex = (quizPage - 1) * quizRowsPerPage;
    return filteredQuizzes.slice(startIndex, startIndex + quizRowsPerPage);
  }, [filteredQuizzes, quizPage, quizRowsPerPage]);

  const totalPages = Math.ceil(filteredQuizzes.length / quizRowsPerPage);

  // Check if we have multiple quizzes
  const hasMultipleQuizzes = useMemo(() => {
    return filteredQuizzes.length > 1;
  }, [filteredQuizzes]);

  // Calculate additional metrics - FIXED for single quiz
  const calculatedMetrics = useMemo(() => {
    if (!data) return {};
    
    const attempts = filteredQuizzes;
    const weeklyTrend = data?.enhancedAnalytics?.weeklyPerformanceTrend || [];
    
    // Calculate learning velocity - FIXED for insufficient data
    let learningVelocity = "N/A";
    let learningVelocityTrend = "stable";
    
    if (weeklyTrend.length >= 2) {
      const firstWeek = parseFloat(weeklyTrend[0]?.avgPercentage || 0);
      const lastWeek = parseFloat(weeklyTrend[weeklyTrend.length - 1]?.avgPercentage || 0);
      const weeksDiff = weeklyTrend.length - 1;
      const velocity = weeksDiff > 0 ? ((lastWeek - firstWeek) / weeksDiff).toFixed(1) : 0;
      learningVelocity = velocity;
      learningVelocityTrend = velocity > 0 ? "improving" : velocity < 0 ? "declining" : "stable";
    } else if (attempts.length > 0) {
      // For single quiz, show current performance
      const currentScore = attempts[0].score / attempts[0].totalMarks * 100;
      learningVelocity = currentScore.toFixed(1);
      learningVelocityTrend = currentScore >= 80 ? "excellent" : currentScore >= 60 ? "good" : "needs_improvement";
    }
    
    // Calculate consistency score - FIXED for single quiz
    let consistencyScore = "N/A";
    if (attempts.length > 1) {
      const scores = attempts.map(q => (q.score / q.totalMarks) * 100);
      const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      const variance = scores.reduce((a, b) => a + Math.pow(b - avgScore, 2), 0) / scores.length;
      const stdDev = Math.sqrt(variance);
      consistencyScore = (100 - stdDev).toFixed(1);
    } else if (attempts.length === 1) {
      consistencyScore = "100.0"; // Single quiz = perfect consistency
    }
    
    // Calculate risk level - FIXED for single quiz
    let riskLevel = "Low";
    let riskReason = "";
    
    if (!hasMultipleQuizzes) {
      riskLevel = "Insufficient Data";
      riskReason = "Only one quiz attempt available";
    } else if (weeklyTrend.length >= 3) {
      const recentScores = weeklyTrend.slice(-3).map(w => parseFloat(w.avgPercentage));
      const isDeclining = recentScores[0] > recentScores[1] && recentScores[1] > recentScores[2];
      const avgRecentScore = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
      
      if (isDeclining && avgRecentScore < 60) {
        riskLevel = "High";
        riskReason = "Recent declining trend with low scores";
      } else if (isDeclining || avgRecentScore < 70) {
        riskLevel = "Medium";
        riskReason = isDeclining ? "Declining trend observed" : "Average score below 70%";
      } else {
        riskLevel = "Low";
        riskReason = "Consistent good performance";
      }
    } else if (attempts.length > 0) {
      // For few quizzes, base on current performance
      const currentScore = attempts[attempts.length - 1].score / attempts[attempts.length - 1].totalMarks * 100;
      if (currentScore < 60) {
        riskLevel = "Medium";
        riskReason = "Current score below 60%";
      } else {
        riskLevel = "Low";
        riskReason = "Good current performance";
      }
    }
    
    // Calculate time efficiency grade
    let timeEfficiencyGrade = "N/A";
    let timeEfficiencyScore = 0;
    
    if (data?.overview?.efficiencyScore) {
      const efficiency = parseFloat(data.overview.efficiencyScore);
      timeEfficiencyScore = efficiency;
      if (efficiency > 2.0) timeEfficiencyGrade = "Excellent";
      else if (efficiency > 1.5) timeEfficiencyGrade = "Good";
      else if (efficiency > 1.0) timeEfficiencyGrade = "Average";
      else timeEfficiencyGrade = "Needs Improvement";
    }
    
    // Calculate estimated grade based on current performance
    let estimatedGrade = "N/A";
    if (attempts.length > 0) {
      const avgPercentage = attempts.reduce((sum, q) => sum + (q.score / q.totalMarks * 100), 0) / attempts.length;
      if (avgPercentage >= 90) estimatedGrade = "A+";
      else if (avgPercentage >= 80) estimatedGrade = "A";
      else if (avgPercentage >= 70) estimatedGrade = "B+";
      else if (avgPercentage >= 60) estimatedGrade = "B";
      else if (avgPercentage >= 50) estimatedGrade = "C";
      else estimatedGrade = "D";
    }
    
    // Predicted next score
    let predictedNextScore = "N/A";
    if (attempts.length > 1) {
      const lastTwoScores = attempts.slice(-2).map(q => q.score / q.totalMarks * 100);
      const trend = lastTwoScores[1] - lastTwoScores[0];
      predictedNextScore = Math.min(100, Math.max(0, lastTwoScores[1] + trend)).toFixed(1);
    } else if (attempts.length === 1) {
      predictedNextScore = attempts[0].score / attempts[0].totalMarks * 100;
      predictedNextScore = predictedNextScore.toFixed(1);
    }
    
    return {
      learningVelocity,
      learningVelocityTrend,
      consistencyScore,
      riskLevel,
      riskReason,
      timeEfficiencyGrade,
      timeEfficiencyScore,
      estimatedGrade,
      predictedNextScore,
      hasMultipleQuizzes
    };
  }, [data, filteredQuizzes, hasMultipleQuizzes]);

  // Comparison data - FIXED for single quiz
  const comparisonData = useMemo(() => {
    if (!data || !filteredQuizzes.length) return null;
    
    const quizzes = filteredQuizzes;
    
    // For single quiz, handle differently
    if (!hasMultipleQuizzes) {
      const quiz = quizzes[0];
      return {
        highestScore: quiz.score,
        lowestScore: quiz.score,
        avgScore: quiz.score.toFixed(1),
        avgPercentage: ((quiz.score / quiz.totalMarks) * 100).toFixed(1),
        bestQuiz: quiz,
        worstQuiz: null, // Don't show worst quiz for single attempt
        subjectComparison: [],
        totalComparedQuizzes: 1,
        isSingleQuiz: true
      };
    }
    
    // Multiple quizzes logic
    const highestScore = Math.max(...quizzes.map(q => q.score));
    const lowestScore = Math.min(...quizzes.map(q => q.score));
    const avgScore = quizzes.reduce((sum, q) => sum + q.score, 0) / quizzes.length;
    const avgPercentage = quizzes.reduce((sum, q) => sum + (q.score / q.totalMarks * 100), 0) / quizzes.length;
    
    // Find best and worst performing quizzes
    const bestQuiz = quizzes.find(q => q.score === highestScore);
    const worstQuiz = quizzes.find(q => q.score === lowestScore && q !== bestQuiz) || quizzes.find(q => q.score === lowestScore);
    
    // Calculate subject comparison
    const subjectGroups = {};
    quizzes.forEach(quiz => {
      const subject = quiz.subject;
      if (!subjectGroups[subject]) {
        subjectGroups[subject] = {
          totalScore: 0,
          totalMarks: 0,
          count: 0,
          quizzes: []
        };
      }
      subjectGroups[subject].totalScore += quiz.score;
      subjectGroups[subject].totalMarks += quiz.totalMarks;
      subjectGroups[subject].count++;
      subjectGroups[subject].quizzes.push(quiz);
    });
    
    const subjectComparison = Object.entries(subjectGroups).map(([subject, data]) => ({
      subject,
      avgScore: (data.totalScore / data.count).toFixed(1),
      avgPercentage: ((data.totalScore / data.totalMarks) * 100).toFixed(1),
      totalQuizzes: data.count,
      bestScore: Math.max(...data.quizzes.map(q => q.score)),
      worstScore: Math.min(...data.quizzes.map(q => q.score))
    })).sort((a, b) => b.avgPercentage - a.avgPercentage);
    
    return {
      highestScore,
      lowestScore,
      avgScore: avgScore.toFixed(1),
      avgPercentage: avgPercentage.toFixed(1),
      bestQuiz,
      worstQuiz: bestQuiz !== worstQuiz ? worstQuiz : null,
      subjectComparison,
      totalComparedQuizzes: quizzes.length,
      isSingleQuiz: false
    };
  }, [filteredQuizzes, hasMultipleQuizzes]);

  // Chart data preparation - FIXED for insufficient data
  const performanceTrendData = useMemo(() => ({
    labels: data?.enhancedAnalytics?.weeklyPerformanceTrend?.map(w => `Week ${w.week.split('-W')[1]}`) || 
           filteredQuizzes.map((q, i) => `Quiz ${i + 1}`),
    datasets: [{
      label: 'Performance (%)',
      data: data?.enhancedAnalytics?.weeklyPerformanceTrend?.map(w => parseFloat(w.avgPercentage)) || 
            filteredQuizzes.map(q => (q.score / q.totalMarks) * 100),
      borderColor: theme.palette.primary.main,
      backgroundColor: `${theme.palette.primary.main}20`,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: theme.palette.primary.main,
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 8
    }]
  }), [data, filteredQuizzes, theme]);

  const subjectPerformanceData = useMemo(() => {
    const subjects = data?.enhancedAnalytics?.subjectWisePerformance || [];
    if (subjects.length === 0 && filteredQuizzes.length > 0) {
      // Create subject data from quizzes
      const subjectMap = {};
      filteredQuizzes.forEach(quiz => {
        const subject = quiz.subject;
        if (!subjectMap[subject]) {
          subjectMap[subject] = {
            totalScore: 0,
            count: 0,
            totalMarks: 0
          };
        }
        subjectMap[subject].totalScore += quiz.score;
        subjectMap[subject].totalMarks += quiz.totalMarks;
        subjectMap[subject].count++;
      });
      
      return {
        labels: Object.keys(subjectMap),
        datasets: [{
          label: 'Average Score',
          data: Object.values(subjectMap).map(s => (s.totalScore / s.count)),
          backgroundColor: [
            theme.palette.primary.main,
            theme.palette.secondary.main,
            theme.palette.success.main,
            theme.palette.warning.main,
            theme.palette.error.main,
            theme.palette.info.main
          ],
          borderWidth: 1,
          borderRadius: 8,
          borderSkipped: false
        }]
      };
    }
    
    return {
      labels: subjects.map(s => s.subject),
      datasets: [{
        label: 'Average Score',
        data: subjects.map(s => parseFloat(s.avgScore)),
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.success.main,
          theme.palette.warning.main,
          theme.palette.error.main,
          theme.palette.info.main
        ],
        borderWidth: 1,
        borderRadius: 8,
        borderSkipped: false
      }]
    };
  }, [data, filteredQuizzes, theme]);

  const topicAccuracyData = useMemo(() => {
    const topics = data?.enhancedAnalytics?.topicWisePerformance || [];
    if (topics.length === 0) {
      // Create basic topic data from quizzes
      return {
        labels: ['Overall Performance'],
        datasets: [{
          label: 'Accuracy (%)',
          data: filteredQuizzes.length > 0 ? 
                [filteredQuizzes.reduce((sum, q) => sum + (q.score / q.totalMarks * 100), 0) / filteredQuizzes.length] : 
                [0],
          backgroundColor: [theme.palette.primary.main],
          borderColor: '#ffffff',
          borderWidth: 2,
          hoverOffset: 20
        }]
      };
    }
    
    return {
      labels: topics.map(t => t.topic),
      datasets: [{
        label: 'Topic Accuracy (%)',
        data: topics.map(t => parseFloat(t.accuracy)),
        backgroundColor: topics.map((t, i) => {
          const colors = [
            theme.palette.primary.main,
            theme.palette.secondary.main,
            theme.palette.success.main,
            theme.palette.warning.main,
            theme.palette.error.main,
            theme.palette.info.main
          ];
          return colors[i % colors.length];
        }),
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverOffset: 20
      }]
    };
  }, [data, filteredQuizzes, theme]);

  const comparisonChartData = useMemo(() => {
    if (!comparisonData || comparisonData.isSingleQuiz) return null;
    
    return {
      labels: comparisonData.subjectComparison.map(s => s.subject),
      datasets: [
        {
          label: 'Average Score',
          data: comparisonData.subjectComparison.map(s => parseFloat(s.avgScore)),
          backgroundColor: `${theme.palette.primary.main}40`,
          borderColor: theme.palette.primary.main,
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 6,
          pointHoverRadius: 10
        },
        {
          label: 'Best Score',
          data: comparisonData.subjectComparison.map(s => s.bestScore),
          backgroundColor: `${theme.palette.success.main}40`,
          borderColor: theme.palette.success.main,
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          pointRadius: 6,
          pointHoverRadius: 10,
          borderDash: [5, 5]
        }
      ]
    };
  }, [comparisonData, theme]);

  // Radar chart for skills assessment
  const skillsRadarData = useMemo(() => {
    if (!data || filteredQuizzes.length === 0) return null;
    
    const topics = data?.enhancedAnalytics?.topicWisePerformance || [];
    const subjects = data?.enhancedAnalytics?.subjectWisePerformance || [];
    
    const labels = [
      'Accuracy',
      'Time Efficiency',
      'Consistency',
      'Subject Mastery',
      'Topic Coverage',
      'Learning Speed'
    ];
    
    let dataPoints = [
      parseFloat(data?.overview?.accuracy || 0),
      parseFloat(data?.overview?.efficiencyScore || 0) * 20,
      parseFloat(calculatedMetrics.consistencyScore || 70),
      50, // Default subject mastery
      50, // Default topic coverage
      50  // Default learning speed
    ];
    
    // Adjust based on available data
    if (subjects.length > 0) {
      dataPoints[3] = subjects.reduce((sum, s) => sum + parseFloat(s.avgPercentage), 0) / subjects.length;
    }
    
    if (topics.length > 0) {
      dataPoints[4] = topics.reduce((sum, t) => sum + parseFloat(t.accuracy), 0) / topics.length;
    }
    
    if (calculatedMetrics.learningVelocity !== "N/A") {
      const velocity = parseFloat(calculatedMetrics.learningVelocity);
      dataPoints[5] = Math.min(100, Math.max(0, velocity * 10 + 50));
    }
    
    return {
      labels,
      datasets: [{
        label: 'Skill Assessment',
        data: dataPoints,
        backgroundColor: `${theme.palette.primary.main}20`,
        borderColor: theme.palette.primary.main,
        pointBackgroundColor: theme.palette.primary.main,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: theme.palette.primary.main,
        pointRadius: 4,
        pointHoverRadius: 8
      }]
    };
  }, [data, filteredQuizzes, calculatedMetrics, theme]);

  // Enhanced chart options with better visuals
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { 
            family: theme.typography.fontFamily, 
            size: 12,
            weight: 600 
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        displayColors: true,
        boxPadding: 6,
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw.toFixed(1)}${context.dataset.label.includes('%') ? '' : '%'}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: { 
          color: `${theme.palette.divider}80`,
          drawBorder: false,
          lineWidth: 1
        },
        ticks: {
          callback: (value) => `${value}%`,
          font: { size: 11, weight: 500 },
          padding: 8,
          color: theme.palette.text.secondary
        },
        border: { display: false }
      },
      x: {
        grid: { 
          color: `${theme.palette.divider}80`,
          drawBorder: false,
          lineWidth: 1
        },
        ticks: { 
          font: { size: 11, weight: 500 },
          padding: 8,
          color: theme.palette.text.secondary
        },
        border: { display: false }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart'
    }
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { 
            family: theme.typography.fontFamily, 
            size: 12,
            weight: 600 
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw.toFixed(1)}`
        }
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          backdropColor: 'transparent',
          font: { size: 10, weight: 500 },
          color: theme.palette.text.secondary
        },
        grid: {
          color: `${theme.palette.divider}80`,
          circular: true
        },
        pointLabels: {
          font: {
            size: 11,
            weight: 600,
            family: theme.typography.fontFamily
          },
          color: theme.palette.text.primary
        },
        angleLines: {
          color: `${theme.palette.divider}80`
        }
    }
  }
  };

  // Loading component
  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '70vh',
          gap: 3
        }}>
          <CircularProgress size={80} thickness={4} />
          <Box textAlign="center">
            <Typography variant="h5" gutterBottom color="text.secondary">
              Loading Student Analytics
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fetching comprehensive performance data...
            </Typography>
            <LinearProgress 
              sx={{ mt: 2, width: 300, height: 6, borderRadius: 3 }} 
              variant="indeterminate" 
            />
          </Box>
        </Box>
      </Container>
    );
  }

  // Error component
  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card sx={{ 
            p: 4, 
            textAlign: 'center',
            background: `linear-gradient(135deg, ${theme.palette.error.light}15 0%, ${theme.palette.background.paper} 100%)`,
            border: `1px solid ${theme.palette.error.light}30`
          }}>
            <Box sx={{ 
              width: 100, 
              height: 100, 
              borderRadius: '50%',
              bgcolor: `${theme.palette.error.main}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3
            }}>
              <ErrorIcon sx={{ fontSize: 50, color: 'error.main' }} />
            </Box>
            
            <Typography variant="h5" gutterBottom color="error">
              {error.type === 'network' ? 'Connection Error' :
               error.type === 'not_found' ? 'Student Not Found' :
               error.type === 'auth' ? 'Authentication Required' :
               'Error Loading Data'}
            </Typography>
            
            <Typography variant="body1" color="text.secondary" paragraph>
              {error.message}
            </Typography>
            
            {error.details && (
              <Alert severity="info" sx={{ mb: 3, textAlign: 'left' }}>
                <Typography variant="caption">{error.details}</Typography>
              </Alert>
            )}
            
            <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
              <Button
                variant="contained"
                startIcon={<Refresh />}
                onClick={handleRetry}
                sx={{ px: 4 }}
              >
                Retry
              </Button>
              <Button
                variant="outlined"
                onClick={() => window.history.back()}
                sx={{ px: 4 }}
              >
                Go Back
              </Button>
            </Stack>
          </Card>
        </motion.div>
      </Container>
    );
  }

  // No attempts component
  if (data?.overview?.attemptedCount === 0) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card sx={{ 
            p: 6, 
            textAlign: 'center',
            background: `linear-gradient(135deg, ${theme.palette.info.light}15 0%, ${theme.palette.background.paper} 100%)`
          }}>
            <Box sx={{ 
              width: 120, 
              height: 120, 
              borderRadius: '50%',
              bgcolor: `${theme.palette.info.main}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 4
            }}>
              <Quiz sx={{ fontSize: 60, color: 'info.main', opacity: 0.8 }} />
            </Box>
            
            <Typography variant="h4" gutterBottom fontWeight="medium">
              No Quiz Attempts Found
            </Typography>
            
            <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
              {data.overview.message || 'This student has not attempted any quizzes created by you yet. '}
              They have access to {data.overview.totalFacultyQuizzes || 0} of your quizzes.
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 2, 
              justifyContent: 'center',
              maxWidth: 500,
              mx: 'auto'
            }}>
              <Card variant="outlined" sx={{ p: 3, flex: 1, minWidth: 200 }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Available Quizzes
                </Typography>
                <Typography variant="h3" color="primary.main">
                  {data.overview.totalFacultyQuizzes || 0}
                </Typography>
              </Card>
            </Box>
            
            <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => window.history.back()}
              >
                Back to List
              </Button>
              <Button
                variant="contained"
                startIcon={<Refresh />}
                onClick={handleRetry}
              >
                Check Again
              </Button>
            </Stack>
          </Card>
        </motion.div>
      </Container>
    );
  }

  // Main render
  return (
    <>
      <Container 
        maxWidth={fullscreen ? false : "xl"} 
        sx={{ 
          py: printMode ? 0 : 4,
          px: fullscreen ? 4 : 0,
          ...(fullscreen && { 
            width: '100vw',
            height: '100vh',
            overflow: 'auto',
            bgcolor: 'background.default'
          })
        }}
      >
        {/* Floating Action Buttons */}
        {!printMode && (
          <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000 }}>
            <Stack direction="column" spacing={2}>
              <Tooltip title={fullscreen ? "Exit Fullscreen" : "Fullscreen"}>
                <Fab
                  color="primary"
                  size="medium"
                  onClick={() => setFullscreen(!fullscreen)}
                  sx={{ 
                    boxShadow: 3,
                    bgcolor: theme.palette.primary.main,
                    '&:hover': {
                      bgcolor: theme.palette.primary.dark,
                      transform: 'scale(1.1)'
                    },
                    transition: 'all 0.2s'
                  }}
                >
                  {fullscreen ? <FullscreenExit /> : <Fullscreen />}
                </Fab>
              </Tooltip>
              
              <Tooltip title="Print Report">
                <Fab
                  color="secondary"
                  size="medium"
                  onClick={handlePrint}
                  sx={{ 
                    boxShadow: 3,
                    bgcolor: theme.palette.secondary.main,
                    '&:hover': {
                      bgcolor: theme.palette.secondary.dark,
                      transform: 'scale(1.1)'
                    },
                    transition: 'all 0.2s'
                  }}
                >
                  <Print />
                </Fab>
              </Tooltip>
              
              <Tooltip title="Refresh Data">
                <Fab
                  color="info"
                  size="medium"
                  onClick={handleRetry}
                  sx={{ 
                    boxShadow: 3,
                    bgcolor: theme.palette.info.main,
                    '&:hover': {
                      bgcolor: theme.palette.info.dark,
                      transform: 'scale(1.1)'
                    },
                    transition: 'all 0.2s'
                  }}
                >
                  <Refresh />
                </Fab>
              </Tooltip>
            </Stack>
          </Box>
        )}

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card sx={{ 
            mb: 4, 
            borderRadius: 3, 
            overflow: 'hidden',
            background: `linear-gradient(135deg, ${theme.palette.primary.light}10 0%, ${theme.palette.background.paper} 100%)`,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
          }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Grid container spacing={3} alignItems="center">
                {/* Student Info */}
                <Grid item xs={12} md={8}>
                  <Box display="flex" alignItems="center" flexWrap="wrap" gap={3}>
                    <Avatar
                      sx={{
                        width: 100,
                        height: 100,
                        border: `4px solid ${theme.palette.primary.main}20`,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        bgcolor: theme.palette.primary.main,
                        fontSize: '2.5rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {data?.student?.name?.charAt(0) || 'S'}
                    </Avatar>
                    
                    <Box flex={1}>
                      <Box display="flex" alignItems="center" flexWrap="wrap" gap={2} mb={2}>
                        <Typography variant="h4" fontWeight="bold">
                          {data?.student?.name || 'Student'}
                        </Typography>
                        <Chip 
                          label={`ID: ${data?.student?.enrollmentNumber || 'N/A'}`} 
                          size="small" 
                          color="primary" 
                          variant="outlined"
                          icon={<Person />}
                        />
                        {data?.summary?.grade && (
                          <Chip 
                            label={data.summary.grade} 
                            size="small" 
                            color="success"
                            sx={{ fontWeight: 600 }}
                          />
                        )}
                      </Box>
                      
                      <Box display="flex" flexWrap="wrap" gap={2} alignItems="center">
                        <Chip
                          icon={<School />}
                          label={data?.student?.course || 'N/A'}
                          size="small"
                          variant="outlined"
                          sx={{ 
                            bgcolor: `${theme.palette.primary.main}10`,
                            fontWeight: 500
                          }}
                        />
                        {data?.student?.group && (
                          <Chip
                            icon={<GridView />}
                            label={`Group: ${data.student.group}`}
                            size="small"
                            variant="outlined"
                          />
                        )}
                        <Chip
                          icon={<CalendarToday />}
                          label={`Last Active: ${format(new Date(), 'dd MMM')}`}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                      
                      <Box mt={2}>
                        <Typography variant="body2" color="text.secondary">
                          {data?.student?.gender ? `${data.student.gender} • ` : ''}
                          {data?.overview?.attemptedCount || 0} quizzes attempted • 
                          {data?.overview?.attemptRate ? ` ${data.overview.attemptRate}` : ''}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>

                {/* Action Buttons */}
                <Grid item xs={12} md={4}>
                  <Box display="flex" flexDirection="column" gap={2} alignItems={{ xs: 'stretch', md: 'flex-end' }}>
                    <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="flex-end">
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Download />}
                        onClick={(e) => setExportMenuOpen(true)}
                        sx={{ minWidth: 'auto' }}
                      >
                        Export
                      </Button>
                      <Menu
                        anchorEl={anchorEl}
                        open={exportMenuOpen}
                        onClose={() => setExportMenuOpen(false)}
                      >
                        <MenuItem onClick={() => handleExport('pdf')}>
                          <ListItemIcon>
                            <Download fontSize="small" />
                          </ListItemIcon>
                          <ListItemText>PDF Report</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => handleExport('excel')}>
                          <ListItemIcon>
                            <Download fontSize="small" />
                          </ListItemIcon>
                          <ListItemText>Excel Data</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => handleExport('csv')}>
                          <ListItemIcon>
                            <Download fontSize="small" />
                          </ListItemIcon>
                          <ListItemText>CSV Export</ListItemText>
                        </MenuItem>
                      </Menu>
                      <Tooltip title="Share Report">
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<Share />}
                          sx={{ minWidth: 'auto' }}
                        >
                          Share
                        </Button>
                      </Tooltip>
                      <Tooltip title="Print Report">
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<Print />}
                          onClick={handlePrint}
                          sx={{ minWidth: 'auto' }}
                        >
                          Print
                        </Button>
                      </Tooltip>
                    </Stack>
                    
                    {/* Quick Stats */}
                    <Box display="flex" gap={3} mt={2} flexWrap="wrap" justifyContent="flex-end">
                      {data?.summary?.rank && (
                        <Box textAlign="center">
                          <Typography variant="caption" color="text.secondary" display="block">
                            Rank
                          </Typography>
                          <Typography variant="h6" fontWeight="bold">
                            #{data.summary.rank}
                          </Typography>
                        </Box>
                      )}
                      {data?.summary?.percentile && (
                        <Box textAlign="center">
                          <Typography variant="caption" color="text.secondary" display="block">
                            Percentile
                          </Typography>
                          <Typography variant="h6" fontWeight="bold" color="primary.main">
                            {data.summary.percentile}
                          </Typography>
                        </Box>
                      )}
                      <Box textAlign="center">
                        <Typography variant="caption" color="text.secondary" display="block">
                          Performance Trend
                        </Typography>
                        <Box display="flex" alignItems="center" justifyContent="center">
                          {data?.overview?.performanceTrend === 'Improving' && 
                            <TrendingUp sx={{ color: 'success.main', fontSize: 20 }} />}
                          {data?.overview?.performanceTrend === 'Declining' && 
                            <TrendingDown sx={{ color: 'error.main', fontSize: 20 }} />}
                          {data?.overview?.performanceTrend === 'Stable' && 
                            <TrendingFlat sx={{ color: 'warning.main', fontSize: 20 }} />}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {[
              {
                label: 'Overall Performance',
                value: data?.overview?.overallPercentage || '0%',
                icon: <Score />,
                color: 'primary.main',
                trend: data?.overview?.performanceTrend,
                subtitle: `${data?.overview?.avgScore || '0'} avg score`,
                badge: hasMultipleQuizzes ? null : 'Single Quiz'
              },
              {
                label: 'Accuracy Rate',
                value: data?.overview?.accuracy || '0%',
                icon: <CheckCircle />,
                color: 'success.main',
                subtitle: `${data?.enhancedAnalytics?.accuracyAnalysis?.totalCorrect || 0} correct answers`,
                progress: data?.overview?.accuracy ? parseFloat(data.overview.accuracy) : 0
              },
              {
                label: 'Quiz Attempts',
                value: data?.overview?.attemptedCount || 0,
                total: data?.overview?.totalFacultyQuizzes || 0,
                icon: <Quiz />,
                color: 'info.main',
                subtitle: `of ${data?.overview?.totalFacultyQuizzes || 0} available`,
                progress: data?.overview?.attemptedCount && data?.overview?.totalFacultyQuizzes ? 
                  (data.overview.attemptedCount / data.overview.totalFacultyQuizzes) * 100 : 0,
                badge: !hasMultipleQuizzes ? 'Only 1' : null
              },
              {
                label: 'Time Efficiency',
                value: data?.overview?.efficiencyScore || '0',
                icon: <Speed />,
                color: 'secondary.main',
                subtitle: calculatedMetrics.timeEfficiencyGrade,
                progress: data?.overview?.efficiencyScore ? 
                  Math.min(parseFloat(data.overview.efficiencyScore) * 20, 100) : 0
              },
              {
                label: 'Pass Rate',
                value: data?.overview?.passRate || '0%',
                icon: <EmojiEvents />,
                color: 'success.main',
                subtitle: `${data?.enhancedAnalytics?.accuracyAnalysis?.passFailRatio?.split('/')[0] || '0'} passed`,
                progress: data?.overview?.passRate ? parseFloat(data.overview.passRate) : 0
              },
              {
                label: 'Avg Time per Quiz',
                value: data?.overview?.avgTimeTaken ? 
                  `${Math.floor(data.overview.avgTimeTaken / 60)}m ${data.overview.avgTimeTaken % 60}s` : '0m',
                icon: <Timer />,
                color: 'warning.main',
                subtitle: 'Time management',
                progress: data?.overview?.avgTimeTaken ? 
                  Math.min((data.overview.avgTimeTaken / 3600) * 100, 100) : 0
              }
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                <Card sx={{ 
                  height: '100%', 
                  borderRadius: 2, 
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 12px 24px ${stat.color}20`
                  },
                  position: 'relative'
                }}>
                  {stat.badge && (
                    <Badge
                      badgeContent={stat.badge}
                      color="warning"
                      sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        zIndex: 1,
                        '& .MuiBadge-badge': {
                          fontSize: '0.6rem',
                          height: 20
                        }
                      }}
                    />
                  )}
                  
                  <CardContent sx={{ p: 3, position: 'relative' }}>
                    {/* Icon Background */}
                    <Box sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      opacity: 0.1,
                      '& svg': {
                        fontSize: 60,
                        color: stat.color
                      }
                    }}>
                      {stat.icon}
                    </Box>
                    
                    <Box display="flex" alignItems="flex-start" mb={2}>
                      <Box
                        sx={{
                          bgcolor: stat.color,
                          borderRadius: '12px',
                          p: 1.5,
                          mr: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {React.cloneElement(stat.icon, { 
                          sx: { color: 'white', fontSize: 20 } 
                        })}
                      </Box>
                      <Box flex={1}>
                        <Typography variant="body2" color="text.secondary" noWrap fontWeight={500}>
                          {stat.label}
                        </Typography>
                        <Box display="flex" alignItems="baseline" gap={1}>
                          <Typography variant="h4" fontWeight="bold">
                            {stat.value}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    
                    {stat.subtitle && (
                      <Typography variant="caption" color="text.secondary" display="block">
                        {stat.subtitle}
                      </Typography>
                    )}
                    
                    {stat.progress !== undefined && (
                      <Box mt={2}>
                        <LinearProgress
                          variant="determinate"
                          value={stat.progress}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: `${stat.color}20`,
                            '& .MuiLinearProgress-bar': {
                              bgcolor: stat.color,
                              borderRadius: 3
                            }
                          }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                          {stat.progress.toFixed(1)}%
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Main Content with Tabs */}
        <Card sx={{ 
          borderRadius: 3, 
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          border: `1px solid ${theme.palette.divider}`
        }}>
          {/* Tabs Header */}
          <Box sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            background: `linear-gradient(90deg, ${theme.palette.primary.light}05 0%, ${theme.palette.background.paper} 100%)`
          }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant={isMobile ? "scrollable" : "fullWidth"}
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  py: 3,
                  px: 4,
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  minHeight: 64,
                  '&.Mui-selected': {
                    color: theme.palette.primary.main,
                    '& .MuiTab-iconWrapper': {
                      color: theme.palette.primary.main
                    }
                  }
                },
                '& .MuiTabs-indicator': {
                  height: 3,
                  borderRadius: '3px 3px 0 0',
                  backgroundColor: theme.palette.primary.main
                }
              }}
            >
              <Tab 
                icon={<Dashboard sx={{ mr: 1 }} />} 
                iconPosition="start" 
                label="Overview" 
              />
              <Tab 
                icon={<Analytics sx={{ mr: 1 }} />} 
                iconPosition="start" 
                label="Analytics" 
              />
              <Tab 
                icon={<TableChart sx={{ mr: 1 }} />} 
                iconPosition="start" 
                label="Quizzes" 
              />
              <Tab 
                icon={<Insights sx={{ mr: 1 }} />} 
                iconPosition="start" 
                label="Performance" 
              />
              <Tab 
                icon={<Psychology sx={{ mr: 1 }} />} 
                iconPosition="start" 
                label="Insights" 
              />
              <Tab 
                icon={<CompareArrows sx={{ mr: 1 }} />} 
                iconPosition="start" 
                label="Comparison" 
              />
            </Tabs>
          </Box>

          <CardContent sx={{ p: { xs: 2, md: 4 }, minHeight: 600 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Tab 1: Overview - FIXED for single quiz */}
                {activeTab === 0 && (
                  <Grid container spacing={3}>
                    {/* Performance Charts */}
                    <Grid item xs={12} lg={hasMultipleQuizzes ? 8 : 12}>
                      <Card sx={{ 
                        height: '100%',
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.divider}`
                      }}>
                        <CardHeader
                          title={
                            <Box display="flex" alignItems="center" gap={1}>
                              <ShowChartIcon sx={{ color: 'primary.main' }} />
                              <Typography variant="h6">
                                {hasMultipleQuizzes ? 'Performance Trend Analysis' : 'Current Performance'}
                              </Typography>
                            </Box>
                          }
                          subheader={hasMultipleQuizzes ? 
                            "Weekly progression and improvement trajectory" : 
                            "Single quiz performance analysis"}
                          action={
                            !hasMultipleQuizzes && (
                              <Chip 
                                label="Single Attempt" 
                                color="warning"
                                size="small"
                                variant="outlined"
                                icon={<Info />}
                              />
                            )
                          }
                        />
                        <CardContent sx={{ height: 400, p: 3 }}>
                          <Line 
                            data={performanceTrendData} 
                            options={{
                              ...chartOptions,
                              plugins: {
                                ...chartOptions.plugins,
                                title: {
                                  display: !hasMultipleQuizzes,
                                  text: 'Only one quiz attempt available',
                                  color: theme.palette.text.secondary,
                                  font: { size: 14 }
                                }
                              }
                            }}
                          />
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* Subject Performance - Only show if multiple subjects */}
                    {hasMultipleQuizzes && subjectPerformanceData.labels.length > 1 && (
                      <Grid item xs={12} lg={4}>
                        <Card sx={{ 
                          height: '100%',
                          borderRadius: 2,
                          border: `1px solid ${theme.palette.divider}`
                        }}>
                          <CardHeader
                            title={
                              <Box display="flex" alignItems="center" gap={1}>
                                <BarChart sx={{ color: 'secondary.main' }} />
                                <Typography variant="h6">Subject Performance</Typography>
                              </Box>
                            }
                            subheader="Average scores across subjects"
                          />
                          <CardContent sx={{ height: 400, p: 3 }}>
                            <Bar 
                              data={subjectPerformanceData} 
                              options={{
                                ...chartOptions,
                                indexAxis: 'y',
                                plugins: {
                                  ...chartOptions.plugins,
                                  legend: { display: false }
                                }
                              }}
                            />
                          </CardContent>
                        </Card>
                      </Grid>
                    )}

                    {/* Best & Worst Performance - FIXED for single quiz */}
                    <Grid item xs={12} md={hasMultipleQuizzes ? 6 : 12}>
                      <Card sx={{ 
                        height: '100%',
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.divider}`
                      }}>
                        <CardHeader
                          title="Performance Highlights"
                          subheader={hasMultipleQuizzes ? 
                            "Best and lowest scoring attempts" : 
                            "Current quiz performance"}
                        />
                        <CardContent>
                          <Grid container spacing={3}>
                            {/* Highest Score - Always show */}
                            <Grid item xs={12}>
                              <Card 
                                variant="outlined" 
                                sx={{ 
                                  p: 3, 
                                  borderLeft: '4px solid',
                                  borderLeftColor: 'success.main',
                                  bgcolor: `${theme.palette.success.main}08`,
                                  borderRadius: 2
                                }}
                              >
                                <Box display="flex" alignItems="center" mb={2}>
                                  <EmojiEvents sx={{ color: 'success.main', mr: 2 }} />
                                  <Typography variant="subtitle1" fontWeight="bold">
                                    {hasMultipleQuizzes ? 'Highest Score' : 'Current Score'}
                                  </Typography>
                                </Box>
                                
                                <Box display="flex" alignItems="baseline" mb={1}>
                                  <Typography variant="h3" fontWeight="bold">
                                    {comparisonData?.highestScore || 0}
                                  </Typography>
                                  <Typography 
                                    component="span" 
                                    variant="h6" 
                                    color="text.secondary"
                                    sx={{ ml: 1 }}
                                  >
                                    / {comparisonData?.bestQuiz?.totalMarks || 100}
                                  </Typography>
                                  <Typography 
                                    component="span" 
                                    variant="h6" 
                                    color="success.main"
                                    sx={{ ml: 2 }}
                                  >
                                    {comparisonData?.bestQuiz?.totalMarks ? 
                                      `${((comparisonData.bestQuiz.score / comparisonData.bestQuiz.totalMarks) * 100).toFixed(1)}%` : ''}
                                  </Typography>
                                </Box>
                                
                                <Typography variant="body1" fontWeight="medium" gutterBottom>
                                  {comparisonData?.bestQuiz?.quizTitle || 'N/A'}
                                </Typography>
                                
                                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                                  <Box display="flex" gap={1}>
                                    <Chip 
                                      label={comparisonData?.bestQuiz?.subject || 'General'} 
                                      size="small" 
                                      color="success"
                                      variant="outlined"
                                    />
                                    <Chip 
                                      label={comparisonData?.bestQuiz?.course || 'General'} 
                                      size="small" 
                                      variant="outlined"
                                    />
                                  </Box>
                                  <Typography variant="caption" color="text.secondary">
                                    {comparisonData?.bestQuiz?.attemptedAt ? 
                                      format(new Date(comparisonData.bestQuiz.attemptedAt), 'MMM d, yyyy') : ''}
                                  </Typography>
                                </Box>
                              </Card>
                            </Grid>

                            {/* Needs Improvement - Only show if multiple quizzes AND worstQuiz exists */}
                            {hasMultipleQuizzes && comparisonData?.worstQuiz && (
                              <Grid item xs={12}>
                                <Card 
                                  variant="outlined" 
                                  sx={{ 
                                    p: 3, 
                                    borderLeft: '4px solid',
                                    borderLeftColor: 'error.main',
                                    bgcolor: `${theme.palette.error.main}08`,
                                    borderRadius: 2
                                  }}
                                >
                                  <Box display="flex" alignItems="center" mb={2}>
                                    <Warning sx={{ color: 'error.main', mr: 2 }} />
                                    <Typography variant="subtitle1" fontWeight="bold">
                                      Needs Improvement
                                    </Typography>
                                  </Box>
                                  
                                  <Box display="flex" alignItems="baseline" mb={1}>
                                    <Typography variant="h3" fontWeight="bold">
                                      {comparisonData.worstQuiz.score}
                                    </Typography>
                                    <Typography 
                                      component="span" 
                                      variant="h6" 
                                      color="text.secondary"
                                      sx={{ ml: 1 }}
                                    >
                                      / {comparisonData.worstQuiz.totalMarks}
                                    </Typography>
                                    <Typography 
                                      component="span" 
                                      variant="h6" 
                                      color="error.main"
                                      sx={{ ml: 2 }}
                                    >
                                      {comparisonData.worstQuiz.totalMarks ? 
                                        `${((comparisonData.worstQuiz.score / comparisonData.worstQuiz.totalMarks) * 100).toFixed(1)}%` : ''}
                                    </Typography>
                                  </Box>
                                  
                                  <Typography variant="body1" fontWeight="medium" gutterBottom>
                                    {comparisonData.worstQuiz.quizTitle}
                                  </Typography>
                                  
                                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                                    <Box display="flex" gap={1}>
                                      <Chip 
                                        label={comparisonData.worstQuiz.subject} 
                                        size="small" 
                                        color="error"
                                        variant="outlined"
                                      />
                                      <Chip 
                                        label={comparisonData.worstQuiz.course} 
                                        size="small" 
                                        variant="outlined"
                                      />
                                    </Box>
                                    <Typography variant="caption" color="text.secondary">
                                      {comparisonData.worstQuiz.attemptedAt ? 
                                        format(new Date(comparisonData.worstQuiz.attemptedAt), 'MMM d, yyyy') : ''}
                                    </Typography>
                                  </Box>
                                </Card>
                              </Grid>
                            )}

                            {/* Single quiz message */}
                            {!hasMultipleQuizzes && (
                              <Grid item xs={12}>
                                <Alert severity="info" sx={{ mt: 2 }}>
                                  <Typography variant="body2">
                                    Only one quiz attempt available. Multiple attempts required for comparison.
                                  </Typography>
                                </Alert>
                              </Grid>
                            )}
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* Course Performance - Only show if multiple courses */}
                    {hasMultipleQuizzes && data?.courseWisePerformance?.length > 0 && (
                      <Grid item xs={12} md={6}>
                        <Card sx={{ 
                          height: '100%',
                          borderRadius: 2,
                          border: `1px solid ${theme.palette.divider}`
                        }}>
                          <CardHeader
                            title="Course-wise Performance"
                            subheader="Performance across different courses"
                          />
                          <CardContent>
                            <TableContainer>
                              <Table size="small">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>
                                      <Typography variant="subtitle2" fontWeight="bold">Course</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                      <Typography variant="subtitle2" fontWeight="bold">Attempts</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                      <Typography variant="subtitle2" fontWeight="bold">Avg Score</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                      <Typography variant="subtitle2" fontWeight="bold">Performance</Typography>
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {data.courseWisePerformance.map((course, index) => (
                                    <TableRow 
                                      key={course.course}
                                      hover
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell>
                                        <Box display="flex" alignItems="center">
                                          <School sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                                          <Typography variant="body2" fontWeight="medium">
                                            {course.course}
                                          </Typography>
                                        </Box>
                                      </TableCell>
                                      <TableCell align="right">
                                        <Chip 
                                          label={course.attempts} 
                                          size="small" 
                                          variant="outlined" 
                                          color="info"
                                        />
                                      </TableCell>
                                      <TableCell align="right">
                                        <Typography variant="body2" fontWeight="bold">
                                          {course.avgScore}
                                        </Typography>
                                      </TableCell>
                                      <TableCell align="center">
                                        <Box display="flex" alignItems="center" justifyContent="center">
                                          <LinearProgress
                                            variant="determinate"
                                            value={parseFloat(course.avgScore)}
                                            sx={{
                                              width: 80,
                                              height: 8,
                                              borderRadius: 4,
                                              bgcolor: `${theme.palette.primary.main}20`,
                                              '& .MuiLinearProgress-bar': {
                                                bgcolor: parseFloat(course.avgScore) >= 80 ? theme.palette.success.main :
                                                         parseFloat(course.avgScore) >= 60 ? theme.palette.warning.main : 
                                                         theme.palette.error.main,
                                                borderRadius: 4
                                              }
                                            }}
                                          />
                                          {index === 0 && (
                                            <Star sx={{ fontSize: 16, color: 'warning.main', ml: 1 }} />
                                          )}
                                        </Box>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </CardContent>
                        </Card>
                      </Grid>
                    )}
                  </Grid>
                )}

                {/* Tab 2: Analytics - FIXED for single quiz */}
                {activeTab === 1 && (
                  <Grid container spacing={3}>
                    {/* Topic Accuracy - Enhanced */}
                    <Grid item xs={12} lg={6}>
                      <Card sx={{ 
                        height: '100%',
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.divider}`
                      }}>
                        <CardHeader
                          title={
                            <Box display="flex" alignItems="center" gap={1}>
                              <PieChart sx={{ color: 'info.main' }} />
                              <Typography variant="h6">
                                {hasMultipleQuizzes ? 'Topic-wise Accuracy Distribution' : 'Performance Analysis'}
                              </Typography>
                            </Box>
                          }
                          subheader={hasMultipleQuizzes ? "Performance breakdown by topics" : "Current quiz performance breakdown"}
                        />
                        <CardContent sx={{ height: 400, p: 3 }}>
                          <Doughnut 
                            data={topicAccuracyData} 
                            options={{
                              ...chartOptions,
                              plugins: {
                                ...chartOptions.plugins,
                                legend: { 
                                  position: 'right',
                                  labels: { 
                                    padding: 20,
                                    usePointStyle: true,
                                    font: { size: 11 }
                                  }
                                },
                                title: !hasMultipleQuizzes ? {
                                  display: true,
                                  text: 'Single Quiz Analysis',
                                  color: theme.palette.text.secondary,
                                  font: { size: 14 }
                                } : undefined
                              }
                            }}
                          />
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* Accuracy Analysis - Enhanced */}
                    <Grid item xs={12} md={6}>
                      <Card sx={{ 
                        height: '100%',
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.divider}`
                      }}>
                        <CardHeader
                          title="Accuracy Breakdown"
                          subheader="Correct vs Wrong answers analysis"
                        />
                        <CardContent>
                          <Box textAlign="center" mb={3}>
                            <Typography variant="h2" color="primary.main" fontWeight="bold">
                              {data?.overview?.accuracy || '0%'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Overall Accuracy Rate
                            </Typography>
                          </Box>

                          <Grid container spacing={2} mb={3}>
                            <Grid item xs={6}>
                              <Card variant="outlined" sx={{ 
                                p: 2, 
                                textAlign: 'center', 
                                borderRadius: 2,
                                bgcolor: `${theme.palette.success.main}08`,
                                borderColor: `${theme.palette.success.main}30`
                              }}>
                                <Box sx={{
                                  width: 50,
                                  height: 50,
                                  borderRadius: '50%',
                                  bgcolor: 'success.main',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  mx: 'auto',
                                  mb: 1
                                }}>
                                  <CheckCircle sx={{ color: 'white', fontSize: 24 }} />
                                </Box>
                                <Typography variant="h4" color="success.main" fontWeight="bold">
                                  {data?.enhancedAnalytics?.accuracyAnalysis?.totalCorrect || 0}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Correct Answers
                                </Typography>
                              </Card>
                            </Grid>
                            <Grid item xs={6}>
                              <Card variant="outlined" sx={{ 
                                p: 2, 
                                textAlign: 'center', 
                                borderRadius: 2,
                                bgcolor: `${theme.palette.error.main}08`,
                                borderColor: `${theme.palette.error.main}30`
                              }}>
                                <Box sx={{
                                  width: 50,
                                  height: 50,
                                  borderRadius: '50%',
                                  bgcolor: 'error.main',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  mx: 'auto',
                                  mb: 1
                                }}>
                                  <Warning sx={{ color: 'white', fontSize: 24 }} />
                                </Box>
                                <Typography variant="h4" color="error.main" fontWeight="bold">
                                  {data?.enhancedAnalytics?.accuracyAnalysis?.totalWrong || 0}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Wrong Answers
                                </Typography>
                              </Card>
                            </Grid>
                          </Grid>

                          <Box mt={3}>
                            <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                              Performance Distribution
                            </Typography>
                            {data?.enhancedAnalytics?.accuracyAnalysis && (
                              <>
                                <Box display="flex" alignItems="center" gap={2} mb={1}>
                                  <Box flex={1}>
                                    <LinearProgress
                                      variant="determinate"
                                      value={data.enhancedAnalytics.accuracyAnalysis.totalQuestionsAttempted > 0 ? 
                                        (data.enhancedAnalytics.accuracyAnalysis.totalCorrect / data.enhancedAnalytics.accuracyAnalysis.totalQuestionsAttempted) * 100 : 0}
                                      sx={{
                                        height: 10,
                                        borderRadius: 5,
                                        bgcolor: `${theme.palette.success.main}20`,
                                        '& .MuiLinearProgress-bar': {
                                          bgcolor: theme.palette.success.main,
                                          borderRadius: 5
                                        }
                                      }}
                                    />
                                  </Box>
                                  <Typography variant="caption" fontWeight="bold">
                                    {data.overview?.accuracy || '0%'}
                                  </Typography>
                                </Box>
                                <Typography variant="caption" color="text.secondary">
                                  {data.enhancedAnalytics.accuracyAnalysis.totalQuestionsAttempted || 0} total questions attempted
                                </Typography>
                              </>
                            )}
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* Time Efficiency - Enhanced */}
                    <Grid item xs={12} md={6}>
                      <Card sx={{ 
                        height: '100%',
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.divider}`
                      }}>
                        <CardHeader
                          title="Time Efficiency Analysis"
                          subheader="Performance vs Time Management"
                          action={
                            <Chip 
                              label={calculatedMetrics.timeEfficiencyGrade} 
                              color={
                                calculatedMetrics.timeEfficiencyGrade === 'Excellent' ? 'success' :
                                calculatedMetrics.timeEfficiencyGrade === 'Good' ? 'info' :
                                calculatedMetrics.timeEfficiencyGrade === 'Average' ? 'warning' : 'error'
                              }
                              size="small"
                            />
                          }
                        />
                        <CardContent>
                          <Box textAlign="center" mb={3}>
                            <Box sx={{
                              width: 100,
                              height: 100,
                              borderRadius: '50%',
                              bgcolor: `${theme.palette.secondary.main}15`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mx: 'auto',
                              mb: 2,
                              border: `3px solid ${theme.palette.secondary.main}30`
                            }}>
                              <Typography variant="h3" color="secondary.main" fontWeight="bold">
                                {data?.overview?.efficiencyScore || '0'}
                              </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              Efficiency Score (Points per minute)
                            </Typography>
                          </Box>

                          <List>
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                  <Timer />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText 
                                primary="Average Time per Quiz" 
                                secondary={data?.overview?.avgTimeTaken ? 
                                  `${Math.floor(data.overview.avgTimeTaken / 60)} minutes ${data.overview.avgTimeTaken % 60} seconds` : 'N/A'}
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar sx={{ bgcolor: 'success.main' }}>
                                  <Speed />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText 
                                primary="Time Management Grade" 
                                secondary={calculatedMetrics.timeEfficiencyGrade}
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar sx={{ bgcolor: 'warning.main' }}>
                                  <AccessTime />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText 
                                primary="Total Time Invested" 
                                secondary={data?.enhancedAnalytics?.activityPatterns?.totalQuizTimeSpent || 'N/A'}
                              />
                            </ListItem>
                          </List>

                          <Box mt={3}>
                            <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                              Improvement Suggestions
                            </Typography>
                            <Alert severity="info" sx={{ mb: 1, borderRadius: 1 }}>
                              <Typography variant="caption" fontWeight="medium">
                                Consider time-bound practice sessions to improve speed
                              </Typography>
                            </Alert>
                            <Alert severity="success" sx={{ borderRadius: 1 }}>
                              <Typography variant="caption" fontWeight="medium">
                                {calculatedMetrics.timeEfficiencyGrade === 'Excellent' || calculatedMetrics.timeEfficiencyGrade === 'Good' ?
                                  'Excellent time management skills!' :
                                  'Focus on balancing speed with accuracy'}
                              </Typography>
                            </Alert>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                )}

                {/* Tab 3: Quizzes - ENHANCED with better view */}
                {activeTab === 2 && (
                  <Grid container spacing={3}>
                    {/* Filters */}
                    <Grid item xs={12}>
                      <Card sx={{ borderRadius: 2 }}>
                        <CardContent>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={3}>
                              <TextField
                                fullWidth
                                size="small"
                                placeholder="Search quizzes by title, subject..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <Search />
                                    </InputAdornment>
                                  ),
                                  endAdornment: searchQuery && (
                                    <InputAdornment position="end">
                                      <IconButton size="small" onClick={() => setSearchQuery('')}>
                                        <Clear />
                                      </IconButton>
                                    </InputAdornment>
                                  )
                                }}
                              />
                            </Grid>
                            
                            <Grid item xs={6} md={2}>
                              <FormControl fullWidth size="small">
                                <InputLabel>Course</InputLabel>
                                <Select
                                  value={filters.course}
                                  label="Course"
                                  onChange={(e) => handleFilterChange('course', e.target.value)}
                                >
                                  <MenuItem value="all">All Courses</MenuItem>
                                  {data?.courseWisePerformance?.map((course) => (
                                    <MenuItem key={course.course} value={course.course}>
                                      {course.course}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            
                            <Grid item xs={6} md={2}>
                              <FormControl fullWidth size="small">
                                <InputLabel>Subject</InputLabel>
                                <Select
                                  value={filters.subject}
                                  label="Subject"
                                  onChange={(e) => handleFilterChange('subject', e.target.value)}
                                >
                                  <MenuItem value="all">All Subjects</MenuItem>
                                  {data?.enhancedAnalytics?.subjectWisePerformance?.map((subject) => (
                                    <MenuItem key={subject.subject} value={subject.subject}>
                                      {subject.subject}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            
                            <Grid item xs={6} md={2}>
                              <FormControl fullWidth size="small">
                                <InputLabel>Status</InputLabel>
                                <Select
                                  value={filters.status}
                                  label="Status"
                                  onChange={(e) => handleFilterChange('status', e.target.value)}
                                >
                                  <MenuItem value="all">All Status</MenuItem>
                                  <MenuItem value="passed">Passed</MenuItem>
                                  <MenuItem value="failed">Failed</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            
                            <Grid item xs={6} md={1}>
                              <Button
                                fullWidth
                                variant="outlined"
                                size="small"
                                onClick={() => {
                                  setFilters({
                                    course: 'all',
                                    subject: 'all',
                                    status: 'all'
                                  });
                                  setSearchQuery('');
                                }}
                              >
                                Reset
                              </Button>
                            </Grid>
                            
                            <Grid item xs={12} md={2}>
                              <Typography variant="caption" color="text.secondary" fontWeight="medium">
                                Showing {filteredQuizzes.length} of {data?.overview?.attemptedCount || 0} quizzes
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* Quizzes Table */}
                    <Grid item xs={12}>
                      <Card sx={{ borderRadius: 2 }}>
                        <CardHeader
                          title="Quiz Attempts History"
                          subheader={`Total ${data?.overview?.attemptedCount || 0} quizzes attempted with ${data?.overview?.passRate || '0%'} pass rate`}
                          action={
                            <Box display="flex" alignItems="center" gap={1}>
                              <Tooltip title="Sort by Date">
                                <IconButton 
                                  size="small" 
                                  onClick={() => handleSort('attemptedAt')}
                                  color={sortConfig.key === 'attemptedAt' ? 'primary' : 'default'}
                                >
                                  <CalendarToday fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Sort by Score">
                                <IconButton 
                                  size="small" 
                                  onClick={() => handleSort('score')}
                                  color={sortConfig.key === 'score' ? 'primary' : 'default'}
                                >
                                  <TrendingUp fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Export Data">
                                <IconButton size="small" onClick={() => handleExport('csv')}>
                                  <Download fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          }
                        />
                        <CardContent sx={{ p: 0 }}>
                          {filteredQuizzes.length > 0 ? (
                            <>
                              <TableContainer>
                                <Table>
                                  <TableHead>
                                    <TableRow sx={{ bgcolor: theme.palette.action.hover }}>
                                      <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>Quiz Title</TableCell>
                                      <TableCell sx={{ fontWeight: 'bold' }}>Subject</TableCell>
                                      <TableCell sx={{ fontWeight: 'bold' }} align="center">Date & Time</TableCell>
                                      <TableCell sx={{ fontWeight: 'bold' }} align="center">Score</TableCell>
                                      <TableCell sx={{ fontWeight: 'bold' }} align="center">Time Taken</TableCell>
                                      <TableCell sx={{ fontWeight: 'bold' }} align="center">Status</TableCell>
                                      <TableCell sx={{ fontWeight: 'bold' }} align="center">Actions</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {paginatedQuizzes.map((quiz, index) => (
                                      <TableRow 
                                        key={index}
                                        hover
                                        sx={{ 
                                          '&:hover': { 
                                            bgcolor: theme.palette.action.hover 
                                          } 
                                        }}
                                      >
                                        <TableCell>
                                          <Box>
                                            <Typography variant="body2" fontWeight="medium">
                                              {quiz.quizTitle || 'Untitled Quiz'}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                              {quiz.course || 'General'} • {quiz.totalMarks || 100} marks
                                            </Typography>
                                          </Box>
                                        </TableCell>
                                        <TableCell>
                                          <Chip
                                            label={quiz.subject || 'General'}
                                            size="small"
                                            variant="outlined"
                                            sx={{ 
                                              bgcolor: `${theme.palette.primary.main}08`,
                                              borderColor: `${theme.palette.primary.main}30`,
                                              fontWeight: 500
                                            }}
                                          />
                                        </TableCell>
                                        <TableCell align="center">
                                          <Typography variant="body2" fontWeight="medium">
                                            {quiz.attemptedAt ? format(new Date(quiz.attemptedAt), 'dd MMM') : 'N/A'}
                                          </Typography>
                                          <Typography variant="caption" color="text.secondary">
                                            {quiz.attemptedAt ? format(new Date(quiz.attemptedAt), 'hh:mm a') : ''}
                                          </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                          <Box display="flex" flexDirection="column" alignItems="center">
                                            <Box 
                                              sx={{
                                                width: 48,
                                                height: 48,
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                bgcolor: quiz.score >= (quiz.passingMarks || 40) ? 
                                                         `${theme.palette.success.main}15` :
                                                         `${theme.palette.error.main}15`,
                                                border: `2px solid ${quiz.score >= (quiz.passingMarks || 40) ? 
                                                          theme.palette.success.main : theme.palette.error.main}30`,
                                                mb: 0.5
                                              }}
                                            >
                                              <Typography 
                                                variant="body2" 
                                                fontWeight="bold"
                                                color={quiz.score >= (quiz.passingMarks || 40) ? 'success.main' : 'error.main'}
                                              >
                                                {quiz.score || 0}
                                              </Typography>
                                            </Box>
                                            <Typography variant="caption" color="text.secondary">
                                              / {quiz.totalMarks || 100}
                                            </Typography>
                                          </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                          <Typography variant="body2" fontWeight="medium">
                                            {quiz.timeTaken ? 
                                              `${Math.floor(quiz.timeTaken / 60)}m ${quiz.timeTaken % 60}s` : 'N/A'}
                                          </Typography>
                                          <Typography variant="caption" color="text.secondary">
                                            of {quiz.maxTime ? `${Math.floor(quiz.maxTime / 60)}m` : 'N/A'}
                                          </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                          <Chip
                                            label={quiz.score >= (quiz.passingMarks || 40) ? 'Passed' : 'Failed'}
                                            size="small"
                                            color={quiz.score >= (quiz.passingMarks || 40) ? 'success' : 'error'}
                                            sx={{ 
                                              fontWeight: 'bold',
                                              textTransform: 'uppercase',
                                              fontSize: '0.7rem',
                                              minWidth: 70
                                            }}
                                          />
                                        </TableCell>
                                        <TableCell align="center">
                                          <Tooltip title="View Detailed Analysis">
                                            <IconButton
                                              size="small"
                                              onClick={() => handleOpenQuizDialog(quiz)}
                                              sx={{ 
                                                bgcolor: `${theme.palette.primary.main}10`,
                                                '&:hover': {
                                                  bgcolor: `${theme.palette.primary.main}20`,
                                                  transform: 'scale(1.1)'
                                                },
                                                transition: 'all 0.2s'
                                              }}
                                            >
                                              <Visibility fontSize="small" />
                                            </IconButton>
                                          </Tooltip>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>

                              {/* Pagination */}
                              {totalPages > 1 && (
                                <Box display="flex" justifyContent="space-between" alignItems="center" p={3} borderTop={1} borderColor="divider">
                                  <Typography variant="body2" color="text.secondary">
                                    Showing {((quizPage - 1) * quizRowsPerPage) + 1} to {Math.min(quizPage * quizRowsPerPage, filteredQuizzes.length)} of {filteredQuizzes.length} quizzes
                                  </Typography>
                                  
                                  <Pagination
                                    count={totalPages}
                                    page={quizPage}
                                    onChange={(e, value) => setQuizPage(value)}
                                    color="primary"
                                    size="medium"
                                    showFirstButton
                                    showLastButton
                                    shape="rounded"
                                  />
                                  
                                  <FormControl size="small" sx={{ width: 120 }}>
                                    <Select
                                      value={quizRowsPerPage}
                                      onChange={(e) => {
                                        setQuizRowsPerPage(e.target.value);
                                        setQuizPage(1);
                                      }}
                                      sx={{ borderRadius: 1 }}
                                    >
                                      <MenuItem value={5}>5 per page</MenuItem>
                                      <MenuItem value={10}>10 per page</MenuItem>
                                      <MenuItem value={25}>25 per page</MenuItem>
                                      <MenuItem value={50}>50 per page</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Box>
                              )}
                            </>
                          ) : (
                            <Box p={6} textAlign="center">
                              <Quiz sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.3, mb: 2 }} />
                              <Typography variant="h6" color="text.secondary" gutterBottom>
                                No quizzes found
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Try adjusting your filters or search criteria
                              </Typography>
                            </Box>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                )}

                {/* Tab 4: Performance - ENHANCED VERSION */}
                {activeTab === 3 && (
                  <Grid container spacing={3}>
                    {/* Performance Metrics - FIXED for single quiz */}
                    <Grid item xs={12} lg={8}>
                      <Card sx={{ 
                        height: '100%',
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.divider}`
                      }}>
                        <CardHeader
                          title="Comprehensive Performance Metrics"
                          subheader={hasMultipleQuizzes ? 
                            "Advanced analytics and performance indicators" : 
                            "Current performance analysis (Single Quiz)"}
                        />
                        <CardContent>
                          {!hasMultipleQuizzes && (
                            <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
                              <Typography variant="body2">
                                Only one quiz attempt available. Multiple attempts required for comprehensive analysis.
                              </Typography>
                            </Alert>
                          )}
                          
                          <Grid container spacing={3}>
                            {[
                              {
                                title: "Learning Velocity",
                                value: calculatedMetrics.learningVelocity,
                                unit: calculatedMetrics.learningVelocity === "N/A" ? "" : "pts/week",
                                icon: <TrendingUpIcon sx={{ color: 'white' }} />,
                                color: calculatedMetrics.learningVelocityTrend === "improving" ? "success.main" :
                                       calculatedMetrics.learningVelocityTrend === "declining" ? "error.main" : "info.main",
                                description: hasMultipleQuizzes ? "Weekly improvement rate" : "Current Performance",
                                showTrend: hasMultipleQuizzes && calculatedMetrics.learningVelocity !== "N/A",
                                trendValue: parseFloat(calculatedMetrics.learningVelocity) || 0
                              },
                              {
                                title: "Consistency Score",
                                value: calculatedMetrics.consistencyScore,
                                unit: "/100",
                                icon: <Timeline sx={{ color: 'white' }} />,
                                color: "info.main",
                                description: hasMultipleQuizzes ? "Performance stability index" : "Single Attempt",
                                showProgress: true,
                                progressValue: parseFloat(calculatedMetrics.consistencyScore) || 100
                              },
                              {
                                title: "Risk Assessment",
                                value: calculatedMetrics.riskLevel,
                                unit: "",
                                icon: <Security sx={{ color: 'white' }} />,
                                color: calculatedMetrics.riskLevel === 'High' ? "error.main" : 
                                       calculatedMetrics.riskLevel === 'Medium' ? "warning.main" :
                                       calculatedMetrics.riskLevel === 'Insufficient Data' ? "info.main" : "success.main",
                                description: calculatedMetrics.riskReason || "Performance risk level",
                                showStatus: true,
                                status: calculatedMetrics.riskLevel
                              },
                              {
                                title: "Engagement Index",
                                value: data?.overview?.attemptRate ? parseFloat(data.overview.attemptRate) : 0,
                                unit: "%",
                                icon: <Person sx={{ color: 'white' }} />,
                                color: "primary.main",
                                description: "Active participation level",
                                showProgress: true,
                                progressValue: data?.overview?.attemptRate ? parseFloat(data.overview.attemptRate) : 0
                              },
                              {
                                title: "Time Efficiency",
                                value: data?.overview?.efficiencyScore || '0',
                                unit: "ppm",
                                icon: <Bolt sx={{ color: 'white' }} />,
                                color: "secondary.main",
                                description: "Points per minute",
                                showGrade: true,
                                grade: calculatedMetrics.timeEfficiencyGrade
                              },
                              {
                                title: "Accuracy Rating",
                                value: data?.overview?.accuracy ? parseFloat(data.overview.accuracy) : 0,
                                unit: "%",
                                icon: <CheckCircle sx={{ color: 'white' }} />,
                                color: "success.main",
                                description: "Overall answer accuracy",
                                showProgress: true,
                                progressValue: data?.overview?.accuracy ? parseFloat(data.overview.accuracy) : 0
                              }
                            ].map((metric, index) => (
                              <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card variant="outlined" sx={{ 
                                  p: 2.5, 
                                  height: '100%', 
                                  borderRadius: 2,
                                  transition: 'all 0.2s',
                                  '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: 2
                                  }
                                }}>
                                  <Box display="flex" alignItems="flex-start" mb={2}>
                                    <Box
                                      sx={{
                                        bgcolor: metric.color,
                                        borderRadius: '10px',
                                        p: 1.5,
                                        mr: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                      }}
                                    >
                                      {metric.icon}
                                    </Box>
                                    <Box flex={1}>
                                      <Typography variant="subtitle2" fontWeight="bold" noWrap>
                                        {metric.title}
                                      </Typography>
                                      <Typography variant="caption" color="text.secondary" noWrap>
                                        {metric.description}
                                      </Typography>
                                    </Box>
                                  </Box>
                                  
                                  <Box display="flex" alignItems="baseline" gap={0.5} mb={1}>
                                    <Typography variant="h5" fontWeight="bold">
                                      {metric.value}
                                    </Typography>
                                    {metric.unit && (
                                      <Typography variant="body2" color="text.secondary">
                                        {metric.unit}
                                      </Typography>
                                    )}
                                  </Box>
                                  
                                  {metric.showTrend && metric.trendValue > 0 && (
                                    <Box display="flex" alignItems="center" gap={0.5}>
                                      <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />
                                      <Typography variant="caption" color="success.main">
                                        +{metric.trendValue} this week
                                      </Typography>
                                    </Box>
                                  )}
                                  
                                  {metric.showProgress && (
                                    <Box mt={1}>
                                      <LinearProgress
                                        variant="determinate"
                                        value={metric.progressValue}
                                        sx={{
                                          height: 6,
                                          borderRadius: 3,
                                          bgcolor: `${metric.color}20`,
                                          '& .MuiLinearProgress-bar': {
                                            bgcolor: metric.color,
                                            borderRadius: 3
                                          }
                                        }}
                                      />
                                    </Box>
                                  )}
                                  
                                  {metric.showStatus && (
                                    <Chip
                                      label={metric.status}
                                      size="small"
                                      color={metric.status === 'High' ? 'error' : 
                                             metric.status === 'Medium' ? 'warning' :
                                             metric.status === 'Insufficient Data' ? 'info' : 'success'}
                                      sx={{ mt: 1 }}
                                    />
                                  )}
                                  
                                  {metric.showGrade && (
                                    <Chip
                                      label={metric.grade}
                                      size="small"
                                      variant="outlined"
                                      color={
                                        metric.grade === 'Excellent' ? 'success' :
                                        metric.grade === 'Good' ? 'info' :
                                        metric.grade === 'Average' ? 'warning' : 'error'
                                      }
                                      sx={{ mt: 1 }}
                                    />
                                  )}
                                </Card>
                              </Grid>
                            ))}
                          </Grid>
                          
                          {hasMultipleQuizzes && data?.enhancedAnalytics?.topicWisePerformance?.length > 0 && (
                            <>
                              <Divider sx={{ my: 4 }} />
                              
                              {/* Topic Performance Table */}
                              <Typography variant="h6" gutterBottom fontWeight="bold">
                                Detailed Topic Performance Analysis
                              </Typography>
                              <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
                                <Table size="small">
                                  <TableHead>
                                    <TableRow sx={{ bgcolor: theme.palette.action.hover }}>
                                      <TableCell>
                                        <Typography variant="subtitle2" fontWeight="bold">Topic</Typography>
                                      </TableCell>
                                      <TableCell align="right">
                                        <Typography variant="subtitle2" fontWeight="bold">Accuracy</Typography>
                                      </TableCell>
                                      <TableCell align="right">
                                        <Typography variant="subtitle2" fontWeight="bold">Marks Efficiency</Typography>
                                      </TableCell>
                                      <TableCell align="center">
                                        <Typography variant="subtitle2" fontWeight="bold">Performance Level</Typography>
                                      </TableCell>
                                      <TableCell align="center">
                                        <Typography variant="subtitle2" fontWeight="bold">Priority</Typography>
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {data.enhancedAnalytics.topicWisePerformance.map((topic, index) => (
                                      <TableRow key={index} hover>
                                        <TableCell>
                                          <Typography variant="body2">
                                            {topic.topic}
                                          </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                          <Box display="flex" alignItems="center" justifyContent="flex-end">
                                            <Typography 
                                              variant="body2"
                                              fontWeight="bold"
                                              color={parseFloat(topic.accuracy) >= 80 ? 'success.main' :
                                                     parseFloat(topic.accuracy) >= 60 ? 'warning.main' : 'error.main'}
                                              sx={{ minWidth: 45 }}
                                            >
                                              {topic.accuracy}%
                                            </Typography>
                                            <LinearProgress
                                              variant="determinate"
                                              value={parseFloat(topic.accuracy)}
                                              sx={{
                                                ml: 2,
                                                width: 60,
                                                height: 6,
                                                borderRadius: 3,
                                                bgcolor: `${theme.palette.primary.main}20`,
                                                '& .MuiLinearProgress-bar': {
                                                  bgcolor: parseFloat(topic.accuracy) >= 80 ? theme.palette.success.main :
                                                           parseFloat(topic.accuracy) >= 60 ? theme.palette.warning.main : 
                                                           theme.palette.error.main,
                                                  borderRadius: 3
                                                }
                                              }}
                                            />
                                          </Box>
                                        </TableCell>
                                        <TableCell align="right">
                                          <Typography variant="body2" fontWeight="bold">
                                            {topic.marksEfficiency}%
                                          </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                          {parseFloat(topic.accuracy) >= 80 ? (
                                            <Chip label="Strong" size="small" color="success" />
                                          ) : parseFloat(topic.accuracy) >= 60 ? (
                                            <Chip label="Average" size="small" color="warning" />
                                          ) : (
                                            <Chip label="Weak" size="small" color="error" />
                                          )}
                                        </TableCell>
                                        <TableCell align="center">
                                          {index < 3 ? (
                                            <Chip label="High" size="small" color="error" variant="outlined" />
                                          ) : index < 6 ? (
                                            <Chip label="Medium" size="small" color="warning" variant="outlined" />
                                          ) : (
                                            <Chip label="Low" size="small" color="success" variant="outlined" />
                                          )}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* Skills Radar Chart */}
                    <Grid item xs={12} lg={4}>
                      <Card sx={{ 
                        height: '100%',
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.divider}`
                      }}>
                        <CardHeader
                          title="Skills Assessment"
                          subheader="Multi-dimensional skill analysis"
                        />
                        <CardContent sx={{ height: 400, p: 3 }}>
                          {skillsRadarData ? (
                            <RadarChart 
                              data={skillsRadarData} 
                              options={{
                                ...radarOptions,
                                plugins: {
                                  ...radarOptions.plugins,
                                  title: !hasMultipleQuizzes ? {
                                    display: true,
                                    text: 'Limited Data Available',
                                    color: theme.palette.text.secondary,
                                    font: { size: 14 }
                                  } : undefined
                                }
                              }}
                            />
                          ) : (
                            <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                              <Typography color="text.secondary">
                                Insufficient data for skills assessment
                              </Typography>
                            </Box>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                )}

                {/* Tab 5: Insights - FIXED for single quiz */}
                {activeTab === 4 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Card sx={{ 
                        height: '100%',
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.divider}`
                      }}>
                        <CardHeader
                          title={
                            <Box display="flex" alignItems="center" gap={1}>
                              <Psychology sx={{ color: 'primary.main' }} />
                              <Typography variant="h6">Learning Insights & Recommendations</Typography>
                            </Box>
                          }
                          subheader="Personalized learning recommendations based on performance analysis"
                        />
                        <CardContent>
                          {!hasMultipleQuizzes && (
                            <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
                              <Typography variant="body2">
                                Only one quiz attempt available. More data needed for comprehensive insights.
                              </Typography>
                            </Alert>
                          )}
                          
                          <Grid container spacing={3}>
                            {/* Performance Insights */}
                            <Grid item xs={12} md={6}>
                              <Card variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                                <Typography variant="h6" gutterBottom fontWeight="bold">
                                  Key Insights
                                </Typography>
                                <List>
                                  <ListItem>
                                    <ListItemAvatar>
                                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                                        <Lightbulb />
                                      </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText 
                                      primary="Learning Pattern" 
                                      secondary={hasMultipleQuizzes ? 
                                        "Consistent improvement observed across multiple attempts" :
                                        "Single attempt - monitor future performance for patterns"}
                                    />
                                  </ListItem>
                                  <ListItem>
                                    <ListItemAvatar>
                                      <Avatar sx={{ bgcolor: 'success.main' }}>
                                        <TrendingUp />
                                      </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText 
                                      primary="Strengths" 
                                      secondary={data?.overview?.accuracy >= 70 ? 
                                        "Strong accuracy in answering questions" :
                                        "Good time management skills demonstrated"}
                                    />
                                  </ListItem>
                                  <ListItem>
                                    <ListItemAvatar>
                                      <Avatar sx={{ bgcolor: 'warning.main' }}>
                                        <Warning />
                                      </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText 
                                      primary="Areas for Improvement" 
                                      secondary={!hasMultipleQuizzes ? 
                                        "Need more attempts for accurate assessment" :
                                        calculatedMetrics.riskLevel === 'Medium' || calculatedMetrics.riskLevel === 'High' ?
                                        "Focus on improving consistency in scores" :
                                        "Consider enhancing time efficiency for better results"}
                                    />
                                  </ListItem>
                                </List>
                              </Card>
                            </Grid>

                            {/* Recommendations */}
                            <Grid item xs={12} md={6}>
                              <Card variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                                <Typography variant="h6" gutterBottom fontWeight="bold">
                                  Recommendations
                                </Typography>
                                <List>
                                  <ListItem>
                                    <ListItemIcon>
                                      <CheckCircle color="success" />
                                    </ListItemIcon>
                                    <ListItemText 
                                      primary="Practice Sessions"
                                      secondary="Schedule regular practice quizzes to improve consistency"
                                    />
                                  </ListItem>
                                  <ListItem>
                                    <ListItemIcon>
                                      <CheckCircle color="success" />
                                    </ListItemIcon>
                                    <ListItemText 
                                      primary="Time Management"
                                      secondary="Practice with time constraints to improve efficiency"
                                    />
                                  </ListItem>
                                  <ListItem>
                                    <ListItemIcon>
                                      <CheckCircle color="success" />
                                    </ListItemIcon>
                                    <ListItemText 
                                      primary="Topic Focus"
                                      secondary={hasMultipleQuizzes && data?.enhancedAnalytics?.topicWisePerformance?.length > 0 ?
                                        `Focus on ${data.enhancedAnalytics.topicWisePerformance[0]?.topic} for maximum improvement` :
                                        "Review quiz topics thoroughly"}
                                    />
                                  </ListItem>
                                </List>
                              </Card>
                            </Grid>

                            {/* Study Plan */}
                            <Grid item xs={12}>
                              <Card variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                                <Typography variant="h6" gutterBottom fontWeight="bold">
                                  Suggested Study Plan
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                  <Typography variant="body2" paragraph>
                                    Based on the current performance analysis, consider the following study approach:
                                  </Typography>
                                  <Box display="flex" flexWrap="wrap" gap={2}>
                                    <Chip label="Weekly Review" color="primary" variant="outlined" />
                                    <Chip label="Practice Tests" color="secondary" variant="outlined" />
                                    <Chip label="Topic Revision" color="info" variant="outlined" />
                                    <Chip label="Time-bound Practice" color="warning" variant="outlined" />
                                    {!hasMultipleQuizzes && (
                                      <Chip label="More Attempts Needed" color="error" variant="outlined" />
                                    )}
                                  </Box>
                                </Box>
                              </Card>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                )}

                {/* Tab 6: Comparison - FIXED for single quiz */}
                {activeTab === 5 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Card sx={{ 
                        height: '100%',
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.divider}`
                      }}>
                        <CardHeader
                          title={
                            <Box display="flex" alignItems="center" gap={1}>
                              <Balance sx={{ color: 'primary.main' }} />
                              <Typography variant="h6">
                                {hasMultipleQuizzes ? 'Comparative Analysis Dashboard' : 'Performance Summary'}
                              </Typography>
                            </Box>
                          }
                          subheader={hasMultipleQuizzes ? 
                            "Score comparison and performance benchmarking" : 
                            "Single quiz performance summary"}
                        />
                        <CardContent>
                          {comparisonData ? (
                            <>
                              {/* Single Quiz Message */}
                              {!hasMultipleQuizzes && (
                                <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
                                  <Typography variant="body2">
                                    Only one quiz attempt available. Multiple attempts required for comparison analysis.
                                  </Typography>
                                </Alert>
                              )}

                              {/* Overall Comparison */}
                              <Grid container spacing={3} mb={4}>
                                <Grid item xs={12} md={3}>
                                  <Card variant="outlined" sx={{ 
                                    p: 3, 
                                    textAlign: 'center', 
                                    borderRadius: 2,
                                    bgcolor: `${theme.palette.success.main}08`,
                                    borderColor: `${theme.palette.success.main}30`
                                  }}>
                                    <VerticalAlignTop sx={{ fontSize: 40, color: 'success.main', mb: 2 }} />
                                    <Typography variant="h5" fontWeight="bold" color="success.main">
                                      {comparisonData.highestScore}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      {hasMultipleQuizzes ? 'Highest Score' : 'Score'}
                                    </Typography>
                                  </Card>
                                </Grid>
                                
                                {hasMultipleQuizzes && comparisonData.lowestScore !== comparisonData.highestScore && (
                                  <Grid item xs={12} md={3}>
                                    <Card variant="outlined" sx={{ 
                                      p: 3, 
                                      textAlign: 'center', 
                                      borderRadius: 2,
                                      bgcolor: `${theme.palette.error.main}08`,
                                      borderColor: `${theme.palette.error.main}30`
                                    }}>
                                      <VerticalAlignBottom sx={{ fontSize: 40, color: 'error.main', mb: 2 }} />
                                      <Typography variant="h5" fontWeight="bold" color="error.main">
                                        {comparisonData.lowestScore}
                                      </Typography>
                                      <Typography variant="caption" color="text.secondary">
                                        Lowest Score
                                      </Typography>
                                    </Card>
                                  </Grid>
                                )}
                                
                                <Grid item xs={12} md={hasMultipleQuizzes && comparisonData.lowestScore !== comparisonData.highestScore ? 3 : 4}>
                                  <Card variant="outlined" sx={{ 
                                    p: 3, 
                                    textAlign: 'center', 
                                    borderRadius: 2,
                                    bgcolor: `${theme.palette.primary.main}08`,
                                    borderColor: `${theme.palette.primary.main}30`
                                  }}>
                                    <Equalizer sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                                    <Typography variant="h5" fontWeight="bold" color="primary.main">
                                      {comparisonData.avgScore}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      Average Score
                                    </Typography>
                                  </Card>
                                </Grid>
                                
                                <Grid item xs={12} md={hasMultipleQuizzes && comparisonData.lowestScore !== comparisonData.highestScore ? 3 : 4}>
                                  <Card variant="outlined" sx={{ 
                                    p: 3, 
                                    textAlign: 'center', 
                                    borderRadius: 2,
                                    bgcolor: `${theme.palette.secondary.main}08`,
                                    borderColor: `${theme.palette.secondary.main}30`
                                  }}>
                                    <Percent sx={{ fontSize: 40, color: 'secondary.main', mb: 2 }} />
                                    <Typography variant="h5" fontWeight="bold" color="secondary.main">
                                      {comparisonData.avgPercentage}%
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      Average Percentage
                                    </Typography>
                                  </Card>
                                </Grid>
                              </Grid>

                              {/* Best vs Worst Quiz - Only show if multiple quizzes */}
                              {hasMultipleQuizzes && comparisonData.bestQuiz && comparisonData.worstQuiz && (
                                <Box mb={4}>
                                  <Typography variant="h6" gutterBottom fontWeight="bold">
                                    Best vs Worst Performance Comparison
                                  </Typography>
                                  <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                      <Card variant="outlined" sx={{ 
                                        p: 3, 
                                        borderRadius: 2,
                                        bgcolor: `${theme.palette.success.main}08`,
                                        borderColor: `${theme.palette.success.main}30`
                                      }}>
                                        <Box display="flex" alignItems="center" mb={2}>
                                          <EmojiEvents sx={{ color: 'success.main', mr: 2 }} />
                                          <Typography variant="subtitle1" fontWeight="bold">
                                            Best Performance
                                          </Typography>
                                        </Box>
                                        {comparisonData.bestQuiz && (
                                          <>
                                            <Typography variant="body1" fontWeight="medium" gutterBottom>
                                              {comparisonData.bestQuiz.quizTitle}
                                            </Typography>
                                            <Box display="flex" alignItems="baseline" mb={2}>
                                              <Typography variant="h4" fontWeight="bold" color="success.main">
                                                {comparisonData.bestQuiz.score}
                                              </Typography>
                                              <Typography variant="h6" color="text.secondary" sx={{ ml: 1 }}>
                                                / {comparisonData.bestQuiz.totalMarks}
                                              </Typography>
                                              <Typography variant="h6" color="success.main" sx={{ ml: 2 }}>
                                                {((comparisonData.bestQuiz.score / comparisonData.bestQuiz.totalMarks) * 100).toFixed(1)}%
                                              </Typography>
                                            </Box>
                                            <Box display="flex" gap={1} mb={2}>
                                              <Chip 
                                                label={comparisonData.bestQuiz.subject} 
                                                size="small" 
                                                color="success"
                                                variant="outlined"
                                              />
                                              <Chip 
                                                label={comparisonData.bestQuiz.course} 
                                                size="small" 
                                                variant="outlined"
                                              />
                                            </Box>
                                          </>
                                        )}
                                      </Card>
                                    </Grid>
                                    
                                    <Grid item xs={12} md={6}>
                                      <Card variant="outlined" sx={{ 
                                        p: 3, 
                                        borderRadius: 2,
                                        bgcolor: `${theme.palette.error.main}08`,
                                        borderColor: `${theme.palette.error.main}30`
                                      }}>
                                        <Box display="flex" alignItems="center" mb={2}>
                                          <Warning sx={{ color: 'error.main', mr: 2 }} />
                                          <Typography variant="subtitle1" fontWeight="bold">
                                            Needs Improvement
                                          </Typography>
                                        </Box>
                                        {comparisonData.worstQuiz && (
                                          <>
                                            <Typography variant="body1" fontWeight="medium" gutterBottom>
                                              {comparisonData.worstQuiz.quizTitle}
                                            </Typography>
                                            <Box display="flex" alignItems="baseline" mb={2}>
                                              <Typography variant="h4" fontWeight="bold" color="error.main">
                                                {comparisonData.worstQuiz.score}
                                              </Typography>
                                              <Typography variant="h6" color="text.secondary" sx={{ ml: 1 }}>
                                                / {comparisonData.worstQuiz.totalMarks}
                                              </Typography>
                                              <Typography variant="h6" color="error.main" sx={{ ml: 2 }}>
                                                {((comparisonData.worstQuiz.score / comparisonData.worstQuiz.totalMarks) * 100).toFixed(1)}%
                                              </Typography>
                                            </Box>
                                            <Box display="flex" gap={1} mb={2}>
                                              <Chip 
                                                label={comparisonData.worstQuiz.subject} 
                                                size="small" 
                                                color="error"
                                                variant="outlined"
                                              />
                                              <Chip 
                                                label={comparisonData.worstQuiz.course} 
                                                size="small" 
                                                variant="outlined"
                                              />
                                            </Box>
                                          </>
                                        )}
                                      </Card>
                                    </Grid>
                                  </Grid>
                                </Box>
                              )}

                              {/* Subject-wise Comparison Chart - Only show if multiple subjects */}
                              {hasMultipleQuizzes && comparisonChartData && comparisonData.subjectComparison.length > 1 && (
                                <Box mb={4}>
                                  <Typography variant="h6" gutterBottom fontWeight="bold">
                                    Subject-wise Score Comparison
                                  </Typography>
                                  <Card variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                                    <Box sx={{ height: 300 }}>
                                      <Line 
                                        data={comparisonChartData} 
                                        options={chartOptions}
                                      />
                                    </Box>
                                  </Card>
                                </Box>
                              )}

                              {/* Subject Comparison Table - Only show if multiple subjects */}
                              {hasMultipleQuizzes && comparisonData.subjectComparison.length > 0 && (
                                <Box>
                                  <Typography variant="h6" gutterBottom fontWeight="bold">
                                    Detailed Subject Analysis
                                  </Typography>
                                  <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
                                    <Table>
                                      <TableHead>
                                        <TableRow sx={{ bgcolor: theme.palette.action.hover }}>
                                          <TableCell>
                                            <Typography variant="subtitle2" fontWeight="bold">Subject</Typography>
                                          </TableCell>
                                          <TableCell align="right">
                                            <Typography variant="subtitle2" fontWeight="bold">Avg Score</Typography>
                                          </TableCell>
                                          <TableCell align="right">
                                            <Typography variant="subtitle2" fontWeight="bold">Best Score</Typography>
                                          </TableCell>
                                          <TableCell align="right">
                                            <Typography variant="subtitle2" fontWeight="bold">Worst Score</Typography>
                                          </TableCell>
                                          <TableCell align="center">
                                            <Typography variant="subtitle2" fontWeight="bold">Quizzes</Typography>
                                          </TableCell>
                                          <TableCell align="center">
                                            <Typography variant="subtitle2" fontWeight="bold">Performance</Typography>
                                          </TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {comparisonData.subjectComparison.map((subject, index) => (
                                          <TableRow key={index} hover>
                                            <TableCell>
                                              <Typography variant="body2" fontWeight="medium">
                                                {subject.subject}
                                              </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                              <Typography variant="body2" fontWeight="bold">
                                                {subject.avgScore}
                                              </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                              <Typography variant="body2" color="success.main" fontWeight="bold">
                                                {subject.bestScore}
                                              </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                              <Typography variant="body2" color="error.main" fontWeight="bold">
                                                {subject.worstScore}
                                              </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                              <Chip 
                                                label={subject.totalQuizzes} 
                                                size="small" 
                                                color="info"
                                                variant="outlined"
                                              />
                                            </TableCell>
                                            <TableCell align="center">
                                              <Chip
                                                label={parseFloat(subject.avgPercentage) >= 80 ? 'Excellent' : parseFloat(subject.avgPercentage) >= 70 ? 'Good' : parseFloat(subject.avgPercentage) >= 60 ? 'Average' : 'Needs Work'}
                                                size="small"
                                                color={parseFloat(subject.avgPercentage) >= 80 ? 'success' : parseFloat(subject.avgPercentage) >= 70 ? 'info' : parseFloat(subject.avgPercentage) >= 60 ? 'warning' : 'error'}
                                              />
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </Box>
                              )}
                            </>
                          ) : (
                            <Box textAlign="center" py={6}>
                              <CompareArrows sx={{ 
                                fontSize: 80, 
                                color: 'text.secondary', 
                                mb: 2, 
                                opacity: 0.3 
                              }} />
                              <Typography variant="h5" color="text.secondary" gutterBottom>
                                Comparison Dashboard
                              </Typography>
                              <Typography variant="body2" color="text.secondary" paragraph sx={{ maxWidth: 600, mx: 'auto' }}>
                                Enable comprehensive comparison features to analyze performance against benchmarks and class averages.
                              </Typography>
                            </Box>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Footer */}
        {!printMode && (
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Report generated on {format(new Date(), 'PPpp')} • 
              <Button size="small" sx={{ ml: 1 }} onClick={handleRetry}>
                Refresh Data
              </Button>
            </Typography>
          </Box>
        )}
      </Container>

      {/* Quiz Details Dialog - ENHANCED with more details */}
      <Dialog
        open={quizDialogOpen}
        onClose={handleCloseQuizDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { 
            borderRadius: 3,
            maxHeight: '90vh'
          }
        }}
      >
        {selectedQuiz && (
          <>
            <DialogTitle sx={{ 
              bgcolor: 'primary.main', 
              color: 'white',
              py: 3
            }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" fontWeight="bold">
                  Quiz Performance Analysis
                </Typography>
                <IconButton onClick={handleCloseQuizDialog} sx={{ color: 'white' }}>
                  <Close />
                </IconButton>
              </Box>
              <Typography variant="subtitle2" sx={{ opacity: 0.9, mt: 1 }}>
                {selectedQuiz.quizTitle || 'Untitled Quiz'}
              </Typography>
            </DialogTitle>
            
            <DialogContent dividers sx={{ p: 4, overflowY: 'auto' }}>
              <Grid container spacing={4}>
                {/* Performance Metrics */}
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="primary">
                    Performance Metrics
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <Score />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Score" 
                        secondary={
                          <Box>
                            <Typography variant="h6" color="primary.main" fontWeight="bold">
                              {selectedQuiz.score || 0} / {selectedQuiz.totalMarks || 100} 
                              <Typography component="span" variant="body1" color="text.secondary" sx={{ ml: 1 }}>
                                ({selectedQuiz.totalMarks ? ((selectedQuiz.score / selectedQuiz.totalMarks) * 100).toFixed(1) : 0}%)
                              </Typography>
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Passing Marks: {selectedQuiz.passingMarks || 40}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'secondary.main' }}>
                          <Timer />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Time Management" 
                        secondary={
                          <Box>
                            <Typography variant="body2">
                              Taken: {selectedQuiz.timeTaken ? 
                                `${Math.floor(selectedQuiz.timeTaken / 60)}m ${selectedQuiz.timeTaken % 60}s` : 'N/A'}
                            </Typography>
                            <Typography variant="body2">
                              Allowed: {selectedQuiz.maxTime ? `${Math.floor(selectedQuiz.maxTime / 60)}m` : 'N/A'}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Efficiency: {selectedQuiz.timeEfficiency || '0'}%
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'success.main' }}>
                          <QuestionAnswer />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Answers" 
                        secondary={
                          <Box>
                            <Typography variant="body2">
                              Correct: {selectedQuiz.correctCount || 0}
                            </Typography>
                            <Typography variant="body2">
                              Wrong: {selectedQuiz.wrongCount || 0}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Total Questions: {(selectedQuiz.correctCount || 0) + (selectedQuiz.wrongCount || 0)}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  </List>
                </Grid>
                
                {/* Quiz Information - ENHANCED */}
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="primary">
                    Quiz Information
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'info.main' }}>
                          <Info />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Quiz Details" 
                        secondary={
                          <Box>
                            {selectedQuiz.detailedInfo?.description && (
                              <Typography variant="body2" gutterBottom>
                                {selectedQuiz.detailedInfo.description}
                              </Typography>
                            )}
                            <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                              {selectedQuiz.detailedInfo?._id && (
                                <Chip 
                                  label={`ID: ${selectedQuiz.detailedInfo._id}`} 
                                  size="small" 
                                  variant="outlined"
                                />
                              )}
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'warning.main' }}>
                          <School />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Subject & Course" 
                        secondary={
                          <Box>
                            <Chip 
                              label={selectedQuiz.subject || 'General'} 
                              size="small" 
                              sx={{ mr: 1, mb: 0.5 }} 
                              color="primary"
                            />
                            <Chip 
                              label={selectedQuiz.course || 'General'} 
                              size="small" 
                              variant="outlined" 
                            />
                            {selectedQuiz.detailedInfo?.department && (
                              <Chip 
                                label={selectedQuiz.detailedInfo.department} 
                                size="small" 
                                variant="outlined"
                                sx={{ mt: 0.5 }}
                                color="secondary"
                              />
                            )}
                          </Box>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'action.main' }}>
                          <CalendarToday />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Timing Information" 
                        secondary={
                          <Box>
                            <Typography variant="body2">
                              Attempted: {selectedQuiz.attemptedAt ? format(new Date(selectedQuiz.attemptedAt), 'PPpp') : 'N/A'}
                            </Typography>
                            {selectedQuiz.detailedInfo?.startTime && (
                              <Typography variant="body2">
                                Quiz Start: {format(new Date(selectedQuiz.detailedInfo.startTime), 'PPp')}
                              </Typography>
                            )}
                            {selectedQuiz.detailedInfo?.endTime && (
                              <Typography variant="body2">
                                Quiz End: {format(new Date(selectedQuiz.detailedInfo.endTime), 'PPp')}
                              </Typography>
                            )}
                            {selectedQuiz.detailedInfo?.durationMinutes && (
                              <Typography variant="body2">
                                Duration: {selectedQuiz.detailedInfo.durationMinutes} minutes
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                    </ListItem>
                  </List>
                </Grid>
                
                {/* Additional Details */}
                {selectedQuiz.detailedInfo && (
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="primary">
                      Additional Quiz Details
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={3}>
                        <Card variant="outlined" sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
                          <QuestionAnswer sx={{ color: 'primary.main', mb: 1 }} />
                          <Typography variant="h6" color="primary.main">
                            {selectedQuiz.detailedInfo.questions?.length || 0}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Questions
                          </Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Card variant="outlined" sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
                          <AccessTime sx={{ color: 'secondary.main', mb: 1 }} />
                          <Typography variant="h6" color="secondary.main">
                            {selectedQuiz.detailedInfo.durationMinutes || 0}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Minutes
                          </Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Card variant="outlined" sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
                          <Group sx={{ color: 'info.main', mb: 1 }} />
                          <Typography variant="h6" color="info.main">
                            {selectedQuiz.detailedInfo.allowedAttempts || 1}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Allowed Attempts
                          </Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Card variant="outlined" sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
                          <AccountTreeIcon sx={{ color: 'warning.main', mb: 1 }} />
                          <Typography variant="h6" color="warning.main">
                            {selectedQuiz.detailedInfo.registeredStudents?.length || 0}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Registered
                          </Typography>
                        </Card>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
                
                {/* Performance Analysis */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="primary">
                    Performance Analysis
                  </Typography>
                  <Alert 
                    severity={selectedQuiz.score >= 80 ? 'success' : 
                             selectedQuiz.score >= 60 ? 'warning' : 'error'}
                    sx={{ mt: 2, borderRadius: 2 }}
                  >
                    <Typography variant="body2" fontWeight="medium">
                      {selectedQuiz.score >= (selectedQuiz.passingMarks || 40) ? 
                        (selectedQuiz.score >= 80 ? 
                          'Excellent performance! Student has demonstrated strong understanding of the subject.' :
                          selectedQuiz.score >= 60 ?
                          'Satisfactory performance. Some concepts may need reinforcement.' :
                          'Passing performance. Consider additional practice for improvement.'
                        ) :
                        'Needs significant improvement. Consider remedial classes or additional practice for this topic.'
                      }
                    </Typography>
                  </Alert>
                  
                  {/* Suggestions */}
                  <Box mt={3}>
                    <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                      Recommendations:
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircle color="success" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Review incorrect answers to identify knowledge gaps"
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircle color="success" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Practice similar questions to improve accuracy"
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircle color="success" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={selectedQuiz.timeTaken && selectedQuiz.maxTime && 
                            (selectedQuiz.timeTaken < selectedQuiz.maxTime * 0.5 ?
                             "Good time management. Maintain current pace." :
                             "Improve time management skills for better efficiency"
                            )}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    </List>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            
            <DialogActions sx={{ p: 3, bgcolor: 'background.default' }}>
              <Button onClick={handleCloseQuizDialog}>
                Close
              </Button>
              <Button 
                variant="contained" 
                onClick={() => {
                  handleCloseQuizDialog();
                  handleExport('quiz-report');
                }}
              >
                Download Detailed Report
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%', boxShadow: 3 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default FacultyAttemptedStudents;