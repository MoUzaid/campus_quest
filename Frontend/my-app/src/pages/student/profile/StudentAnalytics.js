

// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Card,
//   Grid,
//   Typography,
//   Box,
//   CircularProgress,
//   Alert,
//   Chip,
//   LinearProgress,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Tabs,
//   Tab,
//   Avatar,
//   Divider,
//   IconButton,
//   Tooltip,
//   Pagination,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   TextField,
//   Button,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   CardContent,
//   CardHeader,
//   Stack,
//   Badge,
//   alpha,
//   useTheme,
//   styled
// } from '@mui/material';
// import {
//   TrendingUp,
//   TrendingDown,
//   CheckCircle,
//   Cancel,
//   AccessTime,
//   EmojiEvents,
//   Subject as SubjectIcon,
//   School,
//   CalendarToday,
//   BarChart,
//   Timeline,
//   ExpandMore,
//   FilterList,
//   Sort,
//   Download,
//   Refresh,
//   ErrorOutline,
//   Info,
//   Warning,
//   ArrowBack,
//   Visibility,
//   GridView,
//   TableRows,
//   PieChart,
//   Analytics,
//   Score,
//   Timer,
//   Numbers,
//   Assessment,
//   Psychology,
//   Insights,
//   Speed,
//   VerticalAlignBottom,
//   VerticalAlignTop,
//   Equalizer,
//   ShowChart,
//   TableChart,
//   DonutLarge,
//   CompareArrows,
//   Timeline as TimelineIcon,
//   History,
//   Lightbulb,
//   RocketLaunch,
//   TrendingFlat
// } from '@mui/icons-material';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import {
//   LineChart,
//   Line,
//   BarChart as RechartsBarChart,
//   Bar,
//   PieChart as RechartsPieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip as RechartsTooltip,
//   Legend,
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   RadarChart,
//   Radar,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
//   ScatterChart,
//   Scatter,
//   ZAxis
// } from 'recharts';

// // Constants for configuration
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/student-analytics';
// const ITEMS_PER_PAGE_OPTIONS = [5, 10, 25, 50, 100];
// const DEFAULT_PAGE_SIZE = 10;
// const MAX_RETRIES = 3;
// const RETRY_DELAY = 1000;
// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// // Styled Components
// const StyledCard = styled(Card)(({ theme }) => ({
//   borderRadius: 12,
//   boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
//   transition: 'transform 0.2s, box-shadow 0.2s',
//   '&:hover': {
//     transform: 'translateY(-2px)',
//     boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
//   }
// }));

// const MetricCard = styled(Card)(({ theme, color }) => ({
//   padding: theme.spacing(2.5),
//   height: '100%',
//   display: 'flex',
//   flexDirection: 'column',
//   background: color ? alpha(color, 0.05) : 'transparent',
//   borderLeft: color ? `4px solid ${color}` : 'none',
//   borderRadius: 12
// }));

// const ProgressBar = styled(LinearProgress)(({ theme, value, customcolor }) => ({
//   height: 8,
//   borderRadius: 4,
//   backgroundColor: alpha(customcolor || theme.palette.primary.main, 0.1),
//   '& .MuiLinearProgress-bar': {
//     backgroundColor: customcolor || theme.palette.primary.main,
//     borderRadius: 4
//   }
// }));

// // Utility Functions
// const safeParseFloat = (value, defaultValue = 0) => {
//   if (value === null || value === undefined || value === '') return defaultValue;
//   const num = parseFloat(value);
//   return isNaN(num) ? defaultValue : num;
// };

// const safeParseInt = (value, defaultValue = 0) => {
//   if (value === null || value === undefined || value === '') return defaultValue;
//   const num = parseInt(value, 10);
//   return isNaN(num) ? defaultValue : num;
// };

// const clampPercentage = (value) => {
//   const num = safeParseFloat(value, 0);
//   return Math.min(Math.max(num, 0), 100);
// };

// const formatTime = (seconds) => {
//   const secs = safeParseInt(seconds, 0);
//   if (secs === 0) return '0s';
//   const hours = Math.floor(secs / 3600);
//   const minutes = Math.floor((secs % 3600) / 60);
//   const remainingSecs = Math.floor(secs % 60);
  
//   if (hours > 0) {
//     return `${hours}h ${minutes}m`;
//   } else if (minutes > 0) {
//     return `${minutes}m ${remainingSecs}s`;
//   } else {
//     return `${remainingSecs}s`;
//   }
// };

// const formatPercentage = (value) => {
//   const percentage = clampPercentage(value);
//   return `${percentage.toFixed(1)}%`;
// };

// const formatDate = (dateString) => {
//   try {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return 'Invalid Date';
//     return date.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   } catch {
//     return 'Invalid Date';
//   }
// };

// // Custom hooks
// const useFetchData = (url, options = {}, retries = 0) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let isMounted = true;
//     let retryCount = 0;
//     let abortController = new AbortController();

//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(url, {
//           credentials: 'include',
//           signal: abortController.signal,
//           headers: {
//             'Content-Type': 'application/json',
//             ...options.headers
//           },
//           ...options
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const result = await response.json();
        
//         if (!isMounted) return;

//         if (result.success) {
//           // Validate and sanitize data
//           const sanitizedData = sanitizeAnalyticsData(result.data);
//           setData(sanitizedData);
//           setError(null);
//         } else {
//           throw new Error(result.message || 'Failed to fetch data');
//         }
//       } catch (err) {
//         if (!isMounted) return;
        
//         if (err.name !== 'AbortError' && retryCount < retries) {
//           retryCount++;
//           setTimeout(fetchData, RETRY_DELAY * retryCount);
//         } else if (err.name !== 'AbortError') {
//           setError(err.message);
//           setData(null);
//         }
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchData();

//     return () => {
//       isMounted = false;
//       abortController.abort();
//     };
//   }, [url, retries]);

//   return { data, loading, error };
// };

// // Data sanitization function
// const sanitizeAnalyticsData = (data) => {
//   if (!data) return null;
  
//   const sanitized = { ...data };
  
//   // Sanitize summary
//   if (sanitized.summary) {
//     const summary = sanitized.summary;
    
//     // Ensure all summary values are valid numbers
//     summary.overallPercentage = clampPercentage(summary.overallPercentage);
//     summary.averageScore = safeParseFloat(summary.averageScore);
//     summary.passPercentage = clampPercentage(summary.passPercentage);
//     summary.participationRate = clampPercentage(summary.participationRate || 0);
//     summary.highestScore = safeParseFloat(summary.highestScore);
//     summary.lowestScore = safeParseFloat(summary.lowestScore);
//     summary.averageQuizAttempts = safeParseFloat(summary.averageQuizAttempts, 1);
//     summary.totalAttemptedQuizzes = safeParseInt(summary.totalAttemptedQuizzes);
//     summary.totalRegisteredQuizzes = Math.max(
//       safeParseInt(summary.totalRegisteredQuizzes),
//       summary.totalAttemptedQuizzes
//     );
//     summary.passedQuizzes = safeParseInt(summary.passedQuizzes);
//     summary.failedQuizzes = safeParseInt(summary.failedQuizzes);
    
//     // Calculate attempted ratio if not provided
//     if (!summary.attemptedRatio) {
//       const total = summary.totalRegisteredQuizzes || 1;
//       const attempted = summary.totalAttemptedQuizzes || 0;
//       summary.attemptedRatio = `${Math.round((attempted / total) * 100)}%`;
//     }
//   }
  
//   // Sanitize performance trend
//   if (sanitized.performanceTrend?.recentPerformance) {
//     sanitized.performanceTrend.recentPerformance = sanitized.performanceTrend.recentPerformance.map(item => ({
//       ...item,
//       percentage: clampPercentage(item.percentage),
//       score: safeParseFloat(item.score),
//       totalMarks: safeParseFloat(item.totalMarks),
//       date: item.date || new Date().toISOString()
//     }));
//   }
  
//   if (sanitized.performanceTrend?.monthlyPerformance) {
//     sanitized.performanceTrend.monthlyPerformance = sanitized.performanceTrend.monthlyPerformance.map(item => ({
//       ...item,
//       averagePercentage: clampPercentage(item.averagePercentage),
//       averageScore: safeParseFloat(item.averageScore),
//       totalAttempts: safeParseInt(item.totalAttempts)
//     }));
//   }
  
//   // Sanitize subject analysis
//   if (sanitized.subjectWiseAnalysis) {
//     sanitized.subjectWiseAnalysis = sanitized.subjectWiseAnalysis.map(item => ({
//       ...item,
//       subjectPercentage: clampPercentage(item.subjectPercentage),
//       averageScore: safeParseFloat(item.averageScore),
//       totalAttempts: safeParseInt(item.totalAttempts)
//     }));
//   }
  
//   // Sanitize department analysis
//   if (sanitized.departmentWiseAnalysis) {
//     sanitized.departmentWiseAnalysis = sanitized.departmentWiseAnalysis.map(item => ({
//       ...item,
//       departmentPercentage: clampPercentage(item.departmentPercentage),
//       averageScore: safeParseFloat(item.averageScore),
//       totalAttempts: safeParseInt(item.totalAttempts)
//     }));
//   }
  
//   // Sanitize quiz details
//   if (sanitized.quizWiseDetails) {
//     sanitized.quizWiseDetails = sanitized.quizWiseDetails.map(item => ({
//       ...item,
//       percentage: clampPercentage(item.percentage),
//       bestScore: safeParseFloat(item.bestScore),
//       latestScore: safeParseFloat(item.latestScore),
//       totalMarks: safeParseFloat(item.totalMarks),
//       attempts: safeParseInt(item.attempts)
//     }));
//   }
  
//   // Ensure student info has default values
//   if (sanitized.studentInfo) {
//     sanitized.studentInfo = {
//       name: sanitized.studentInfo.name || 'Student',
//       enrollmentNumber: sanitized.studentInfo.enrollmentNumber || 'N/A',
//       department: sanitized.studentInfo.department || 'N/A',
//       course: sanitized.studentInfo.course || 'N/A',
//       semester: sanitized.studentInfo.semester || 'N/A',
//       ...sanitized.studentInfo
//     };
//   }
  
//   return sanitized;
// };

// // Loading and Error Components
// const LoadingSkeleton = () => (
//   <Box sx={{ p: 3 }}>
//     <Grid container spacing={3}>
//       {[...Array(8)].map((_, index) => (
//         <Grid item xs={12} sm={6} md={3} key={index}>
//           <StyledCard sx={{ p: 3, height: 140 }}>
//             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
//               <CircularProgress size={30} />
//             </Box>
//           </StyledCard>
//         </Grid>
//       ))}
//     </Grid>
//   </Box>
// );

// const ErrorDisplay = ({ error, onRetry }) => (
//   <Box sx={{ p: 6, textAlign: 'center' }}>
//     <ErrorOutline sx={{ fontSize: 80, color: 'error.main', mb: 3, opacity: 0.7 }} />
//     <Typography variant="h5" color="error" gutterBottom sx={{ fontWeight: 600 }}>
//       Unable to Load Analytics
//     </Typography>
//     <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
//       {error || 'There was an error loading your analytics data. Please try again.'}
//     </Typography>
//     {onRetry && (
//       <Button
//         variant="contained"
//         size="large"
//         startIcon={<Refresh />}
//         onClick={onRetry}
//         sx={{ borderRadius: 2, px: 4 }}
//       >
//         Retry Loading
//       </Button>
//     )}
//   </Box>
// );

// const EmptyState = ({ message, icon: Icon = Info, action }) => (
//   <Box sx={{ p: 8, textAlign: 'center' }}>
//     <Icon sx={{ fontSize: 80, color: 'text.secondary', mb: 3, opacity: 0.5 }} />
//     <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontWeight: 500 }}>
//       {message}
//     </Typography>
//     <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
//       No analytics data available at the moment.
//     </Typography>
//     {action}
//   </Box>
// );

// // Main Component
// const StudentAnalytics = () => {
//   const { studentId } = useParams();
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.down('md'));

//   // State management
//   const [activeTab, setActiveTab] = useState(0);
//   const [quizHistoryPage, setQuizHistoryPage] = useState(1);
//   const [quizHistoryPageSize, setQuizHistoryPageSize] = useState(DEFAULT_PAGE_SIZE);
//   const [quizHistoryFilters, setQuizHistoryFilters] = useState({
//     subject: '',
//     sortBy: 'date',
//     order: 'desc'
//   });

//   // Data fetching
//   const {
//     data: analyticsData,
//     loading: analyticsLoading,
//     error: analyticsError,
//     refetch: refetchAnalytics
//   } = useFetchData(
//     `${API_BASE_URL}/${studentId}`,
//     {},
//     MAX_RETRIES
//   );

//   const {
//     data: quizHistoryData,
//     loading: quizHistoryLoading,
//     error: quizHistoryError,
//     refetch: refetchQuizHistory
//   } = useFetchData(
//     `${API_BASE_URL}/${studentId}/quiz-history?page=${quizHistoryPage}&limit=${quizHistoryPageSize}&subject=${quizHistoryFilters.subject}&sortBy=${quizHistoryFilters.sortBy}&order=${quizHistoryFilters.order}`
//   );

//   // Memoized calculations with proper validation
//   const summaryMetrics = useMemo(() => {
//     if (!analyticsData?.summary) return [];
    
//     const { summary, studentInfo } = analyticsData;
//     const overallPercentage = clampPercentage(summary.overallPercentage);
//     const passPercentage = clampPercentage(summary.passPercentage);
//     const participationRate = clampPercentage(summary.participationRate);
    
//     return [
//       {
//         label: 'Overall Performance',
//         value: formatPercentage(overallPercentage),
//         icon: <Score sx={{ fontSize: 28 }} />,
//         color: theme.palette.primary.main,
//         description: 'Your overall score across all quizzes',
//         trend: overallPercentage > 70 ? 'up' : overallPercentage > 50 ? 'stable' : 'down',
//         subValue: `Avg: ${safeParseFloat(summary.averageScore).toFixed(1)}`
//       },
//       {
//         label: 'Quiz Participation',
//         value: `${summary.totalAttemptedQuizzes || 0}/${summary.totalRegisteredQuizzes || 0}`,
//         icon: <Analytics sx={{ fontSize: 28 }} />,
//         color: theme.palette.success.main,
//         description: 'Quizzes attempted vs registered',
//         subValue: `${summary.attemptedRatio || '0%'} participation`,
//         progress: participationRate
//       },
//       {
//         label: 'Success Rate',
//         value: formatPercentage(passPercentage),
//         icon: <CheckCircle sx={{ fontSize: 28 }} />,
//         color: theme.palette.success.main,
//         description: 'Quizzes passed successfully',
//         subValue: `${summary.passedQuizzes || 0} passed, ${summary.failedQuizzes || 0} failed`,
//         progress: passPercentage
//       },
//       {
//         label: 'Time Efficiency',
//         value: formatTime(summary.averageTimePerQuiz),
//         icon: <Timer sx={{ fontSize: 28 }} />,
//         color: theme.palette.info.main,
//         description: 'Average time per quiz',
//         subValue: `Total: ${summary.totalTimeSpent || 'N/A'}`
//       },
//       {
//         label: 'Highest Score',
//         value: safeParseFloat(summary.highestScore).toFixed(1),
//         icon: <VerticalAlignTop sx={{ fontSize: 28 }} />,
//         color: theme.palette.warning.main,
//         description: 'Your highest score in any quiz',
//         subValue: `Lowest: ${safeParseFloat(summary.lowestScore).toFixed(1)}`
//       },
//       {
//         label: 'Course Average',
//         value: safeParseFloat(summary.averageScore).toFixed(1),
//         icon: <Equalizer sx={{ fontSize: 28 }} />,
//         color: theme.palette.secondary.main,
//         description: 'Average score per quiz',
//         subValue: `${studentInfo?.course || 'N/A'} • Sem ${studentInfo?.semester || 'N/A'}`
//       },
//       {
//         label: 'Attempts per Quiz',
//         value: safeParseFloat(summary.averageQuizAttempts, 1).toFixed(1),
//         icon: <Numbers sx={{ fontSize: 28 }} />,
//         color: theme.palette.error.main,
//         description: 'Average attempts per registered quiz',
//         subValue: 'Multiple attempts show dedication!'
//       },
//       {
//         label: 'Performance Trend',
//         value: (() => {
//           const latest = analyticsData?.performanceTrend?.recentPerformance?.[0];
//           if (!latest) return 'N/A';
//           return formatPercentage(latest.percentage);
//         })(),
//         icon: (() => {
//           const latest = analyticsData?.performanceTrend?.recentPerformance?.[0];
//           const percentage = clampPercentage(latest?.percentage);
//           if (percentage >= 70) return <TrendingUp sx={{ fontSize: 28 }} />;
//           if (percentage >= 50) return <TrendingFlat sx={{ fontSize: 28 }} />;
//           return <TrendingDown sx={{ fontSize: 28 }} />;
//         })(),
//         color: (() => {
//           const latest = analyticsData?.performanceTrend?.recentPerformance?.[0];
//           const percentage = clampPercentage(latest?.percentage);
//           if (percentage >= 70) return theme.palette.success.main;
//           if (percentage >= 50) return theme.palette.warning.main;
//           return theme.palette.error.main;
//         })(),
//         description: 'Latest quiz performance',
//         subValue: (() => {
//           const latest = analyticsData?.performanceTrend?.recentPerformance?.[0];
//           if (!latest) return 'Recent attempt score';
//           const percentage = clampPercentage(latest.percentage);
//           const status = percentage >= 70 ? 'Excellent' : 
//                         percentage >= 50 ? 'Good' : 'Needs Improvement';
//           return `${status} • ${latest.quizTitle || 'Recent Quiz'}`;
//         })()
//       }
//     ];
//   }, [analyticsData, theme]);

//   const performanceChartData = useMemo(() => {
//     if (!analyticsData?.performanceTrend?.recentPerformance?.length) return [];
//     return analyticsData.performanceTrend.recentPerformance.slice(0, 5).map((item, index) => ({
//       name: `Quiz ${index + 1}`,
//       score: safeParseFloat(item.score),
//       percentage: clampPercentage(item.percentage),
//       total: safeParseFloat(item.totalMarks),
//       date: formatDate(item.date),
//       quizTitle: item.quizTitle || `Quiz ${index + 1}`
//     }));
//   }, [analyticsData]);

//   const monthlyPerformanceData = useMemo(() => {
//     if (!analyticsData?.performanceTrend?.monthlyPerformance) return [];
//     return analyticsData.performanceTrend.monthlyPerformance.map(item => ({
//       month: item.month?.split('-')[1] || 'MM',
//       percentage: clampPercentage(item.averagePercentage),
//       attempts: safeParseInt(item.totalAttempts),
//       score: safeParseFloat(item.averageScore)
//     }));
//   }, [analyticsData]);

//   const subjectChartData = useMemo(() => {
//     if (!analyticsData?.subjectWiseAnalysis) return [];
//     return analyticsData.subjectWiseAnalysis.map((subject, index) => ({
//       name: subject.subject || `Subject ${index + 1}`,
//       value: clampPercentage(subject.subjectPercentage),
//       attempts: safeParseInt(subject.totalAttempts),
//       color: COLORS[index % COLORS.length]
//     }));
//   }, [analyticsData]);

//   const departmentChartData = useMemo(() => {
//     if (!analyticsData?.departmentWiseAnalysis) return [];
//     return analyticsData.departmentWiseAnalysis.map((dept, index) => ({
//       name: dept.department || `Department ${index + 1}`,
//       percentage: clampPercentage(dept.departmentPercentage),
//       attempts: safeParseInt(dept.totalAttempts),
//       score: safeParseFloat(dept.averageScore)
//     }));
//   }, [analyticsData]);

//   const quizPerformanceData = useMemo(() => {
//     if (!analyticsData?.quizWiseDetails) return [];
//     return analyticsData.quizWiseDetails.slice(0, 10).map(quiz => ({
//       name: (quiz.title || 'Quiz').substring(0, 15) + (quiz.title?.length > 15 ? '...' : ''),
//       best: safeParseFloat(quiz.bestScore),
//       latest: safeParseFloat(quiz.latestScore),
//       total: safeParseFloat(quiz.totalMarks),
//       attempts: safeParseInt(quiz.attempts),
//       percentage: clampPercentage(quiz.percentage),
//       passed: Boolean(quiz.isPassed)
//     }));
//   }, [analyticsData]);

//   // Score Distribution Data with validation
//  // Update the scoreDistributionData useMemo to include better information:
// const scoreDistributionData = useMemo(() => {
//   try {
//     if (!analyticsData?.quizWiseDetails?.length) return [];
    
//     const ranges = [
//       { 
//         range: '0-20', 
//         min: 0, 
//         max: 20, 
//         count: 0, 
//         color: '#ff4444',
//         label: 'Need Help',
//         description: 'Urgent improvement needed'
//       },
//       { 
//         range: '21-40', 
//         min: 21, 
//         max: 40, 
//         count: 0, 
//         color: '#ffbb33',
//         label: 'Needs Practice',
//         description: 'More practice required'
//       },
//       { 
//         range: '41-60', 
//         min: 41, 
//         max: 60, 
//         count: 0, 
//         color: '#00C851',
//         label: 'Average',
//         description: 'Good, can improve more'
//       },
//       { 
//         range: '61-80', 
//         min: 61, 
//         max: 80, 
//         count: 0, 
//         color: '#33b5e5',
//         label: 'Good',
//         description: 'Solid performance'
//       },
//       { 
//         range: '81-100', 
//         min: 81, 
//         max: 100, 
//         count: 0, 
//         color: '#4285F4',
//         label: 'Excellent',
//         description: 'Outstanding work!'
//       }
//     ];
    
//     analyticsData.quizWiseDetails.forEach(quiz => {
//       try {
//         const percentage = clampPercentage(quiz.percentage);
//         const range = ranges.find(r => percentage >= r.min && percentage <= r.max);
//         if (range) {
//           range.count++;
//         }
//       } catch (err) {
//         console.warn('Error processing quiz:', quiz, err);
//       }
//     });
    
//     return ranges;
//   } catch (error) {
//     console.error('Error creating score distribution data:', error);
//     return [];
//   }
// }, [analyticsData]);
//   // Event handlers
//   const handleTabChange = useCallback((event, newValue) => {
//     setActiveTab(newValue);
//   }, []);

//   const handleQuizHistoryPageChange = useCallback((event, page) => {
//     setQuizHistoryPage(page);
//   }, []);

//   const handleQuizHistoryPageSizeChange = useCallback((event) => {
//     setQuizHistoryPageSize(event.target.value);
//     setQuizHistoryPage(1);
//   }, []);

//   const handleFilterChange = useCallback((filter, value) => {
//     setQuizHistoryFilters(prev => ({ ...prev, [filter]: value }));
//     setQuizHistoryPage(1);
//   }, []);

//   const handleViewQuizDetails = useCallback((quizId) => {
//     if (!quizId) return;
//     navigate(`/quiz/${quizId}/details`);
//   }, [navigate]);

//   const handleViewAttemptDetails = useCallback((attemptId) => {
//     if (!attemptId) return;
//     navigate(`/attempt/${attemptId}/review`);
//   }, [navigate]);

//   const handleRefresh = useCallback(() => {
//     refetchAnalytics();
//     refetchQuizHistory();
//   }, [refetchAnalytics, refetchQuizHistory]);

//   const handleExportData = useCallback(() => {
//     if (!analyticsData) return;
    
//     try {
//       const exportData = {
//         ...analyticsData,
//         exportedAt: new Date().toISOString(),
//         studentId,
//         summary: {
//           ...analyticsData.summary,
//           overallPercentage: formatPercentage(analyticsData.summary.overallPercentage),
//           passPercentage: formatPercentage(analyticsData.summary.passPercentage)
//         }
//       };
      
//       const dataStr = JSON.stringify(exportData, null, 2);
//       const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
//       const exportFileDefaultName = `student-analytics-${studentId}-${new Date().toISOString().split('T')[0]}.json`;
      
//       const linkElement = document.createElement('a');
//       linkElement.setAttribute('href', dataUri);
//       linkElement.setAttribute('download', exportFileDefaultName);
//       document.body.appendChild(linkElement);
//       linkElement.click();
//       document.body.removeChild(linkElement);
//     } catch (error) {
//       console.error('Export failed:', error);
//       alert('Failed to export data. Please try again.');
//     }
//   }, [analyticsData, studentId]);

//   // Render components
//   const renderMetricCard = useCallback((metric, index) => (
//     <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
//       <MetricCard color={metric.color}>
//         <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
//           <Box sx={{ 
//             color: metric.color, 
//             mr: 1.5,
//             p: 1,
//             borderRadius: 2,
//             bgcolor: alpha(metric.color, 0.1)
//           }}>
//             {metric.icon}
//           </Box>
//           <Box sx={{ flexGrow: 1 }}>
//             <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
//               {metric.label}
//             </Typography>
//             <Typography variant="h5" component="div" sx={{ fontWeight: 700, mt: 0.5 }}>
//               {metric.value}
//             </Typography>
//           </Box>
//         </Box>
        
//         {metric.description && (
//           <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
//             {metric.description}
//           </Typography>
//         )}

//         {metric.subValue && (
//           <Typography variant="caption" sx={{ 
//             color: metric.color, 
//             fontWeight: 500,
//             display: 'block',
//             mt: 0.5
//           }}>
//             {metric.subValue}
//           </Typography>
//         )}
        
//         {metric.progress !== undefined && (
//           <Box sx={{ mt: 1.5 }}>
//             <ProgressBar 
//               variant="determinate" 
//               value={metric.progress} 
//               customcolor={metric.color}
//             />
//             <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
//               {metric.progress.toFixed(1)}%
//             </Typography>
//           </Box>
//         )}
        
//         {metric.trend && (
//           <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
//             {metric.trend === 'up' ? (
//               <TrendingUp sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
//             ) : metric.trend === 'stable' ? (
//               <TrendingFlat sx={{ color: 'warning.main', fontSize: 16, mr: 0.5 }} />
//             ) : (
//               <TrendingDown sx={{ color: 'error.main', fontSize: 16, mr: 0.5 }} />
//             )}
//             <Typography variant="caption" sx={{ 
//               color: metric.trend === 'up' ? 'success.main' : 
//                      metric.trend === 'stable' ? 'warning.main' : 'error.main',
//               fontWeight: 500
//             }}>
//               {metric.trend === 'up' ? 'Improving' : 
//                metric.trend === 'stable' ? 'Stable' : 'Needs Focus'}
//             </Typography>
//           </Box>
//         )}
//       </MetricCard>
//     </Grid>
//   ), [theme]);

//   const renderPerformanceChart = useCallback(() => (
//     <StyledCard sx={{ p: 3, height: '100%' }}>
//       <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//         <ShowChart sx={{ mr: 1.5, color: 'primary.main' }} />
//         <Typography variant="h6" sx={{ fontWeight: 600 }}>
//           Performance Trend (Last 5 Quizzes)
//         </Typography>
//       </Box>
      
//       {performanceChartData.length > 0 ? (
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={performanceChartData}>
//             <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.text.secondary, 0.1)} />
//             <XAxis 
//               dataKey="name" 
//               stroke={theme.palette.text.secondary}
//               fontSize={12}
//             />
//             <YAxis 
//               stroke={theme.palette.text.secondary}
//               fontSize={12}
//               domain={[0, 100]}
//               label={{ 
//                 value: 'Score (%)', 
//                 angle: -90, 
//                 position: 'insideLeft',
//                 offset: -10,
//                 style: { fill: theme.palette.text.secondary }
//               }}
//             />
//             <RechartsTooltip 
//               formatter={(value, name) => {
//                 if (name === 'percentage') return [`${value}%`, 'Score %'];
//                 if (name === 'score') return [value.toFixed(1), 'Raw Score'];
//                 return [value, name];
//               }}
//               labelFormatter={(label) => {
//                 const data = performanceChartData.find(d => d.name === label);
//                 return data ? `${data.quizTitle}\n${data.date}` : label;
//               }}
//               contentStyle={{
//                 borderRadius: 8,
//                 border: `1px solid ${theme.palette.divider}`,
//                 boxShadow: theme.shadows[3],
//                 backgroundColor: theme.palette.background.paper
//               }}
//             />
//             <Legend />
//             <Line 
//               type="monotone" 
//               dataKey="percentage" 
//               stroke={theme.palette.primary.main} 
//               strokeWidth={3}
//               dot={{ r: 6 }}
//               activeDot={{ r: 8 }}
//               name="Score %"
//             />
//             <Line 
//               type="monotone" 
//               dataKey="score" 
//               stroke={theme.palette.secondary.main} 
//               strokeWidth={2}
//               strokeDasharray="5 5"
//               name="Raw Score"
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       ) : (
//         <EmptyState message="No recent quiz performance data" />
//       )}
//     </StyledCard>
//   ), [performanceChartData, theme]);

//   const renderSubjectAnalysis = useCallback(() => (
//     <StyledCard sx={{ p: 3, height: '100%' }}>
//       <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//         <DonutLarge sx={{ mr: 1.5, color: 'secondary.main' }} />
//         <Typography variant="h6" sx={{ fontWeight: 600 }}>
//           Subject-wise Performance
//         </Typography>
//       </Box>
      
//       {subjectChartData.length > 0 ? (
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6}>
//             <ResponsiveContainer width="100%" height={300}>
//               <RechartsPieChart>
//                 <Pie
//                   data={subjectChartData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={true}
//                   label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
//                   outerRadius={100}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {subjectChartData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//                 <RechartsTooltip 
//                   formatter={(value) => [`${value}%`, 'Score']}
//                   contentStyle={{
//                     borderRadius: 8,
//                     border: `1px solid ${theme.palette.divider}`,
//                     boxShadow: theme.shadows[3],
//                     backgroundColor: theme.palette.background.paper
//                   }}
//                 />
//                 <Legend />
//               </RechartsPieChart>
//             </ResponsiveContainer>
//           </Grid>
          
//           <Grid item xs={12} md={6}>
//             <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
//               {analyticsData?.subjectWiseAnalysis?.map((subject, index) => {
//                 const percentage = clampPercentage(subject.subjectPercentage);
//                 return (
//                   <Box key={index} sx={{ mb: 2, p: 2, bgcolor: alpha(COLORS[index % COLORS.length], 0.05), borderRadius: 2 }}>
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//                       <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
//                         {subject.subject || `Subject ${index + 1}`}
//                       </Typography>
//                       <Chip 
//                         label={formatPercentage(percentage)} 
//                         size="small" 
//                         color={percentage > 70 ? 'success' : percentage > 50 ? 'warning' : 'error'}
//                       />
//                     </Box>
                    
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                       <Typography variant="caption" color="text.secondary">
//                         {subject.totalAttempts || 0} attempt{subject.totalAttempts !== 1 ? 's' : ''}
//                       </Typography>
//                       <Typography variant="caption" sx={{ fontWeight: 500 }}>
//                         Avg: {safeParseFloat(subject.averageScore).toFixed(1)}
//                       </Typography>
//                     </Box>
                    
//                     <ProgressBar 
//                       variant="determinate" 
//                       value={percentage} 
//                       customcolor={percentage > 70 ? theme.palette.success.main : 
//                                  percentage > 50 ? theme.palette.warning.main : 
//                                  theme.palette.error.main}
//                       sx={{ mt: 1 }}
//                     />
//                   </Box>
//                 );
//               })}
//             </Box>
//           </Grid>
//         </Grid>
//       ) : (
//         <EmptyState message="No subject-wise analysis available" />
//       )}
//     </StyledCard>
//   ), [analyticsData, subjectChartData, theme]);

//   const renderMonthlyTrend = useCallback(() => (
//     <StyledCard sx={{ p: 3 }}>
//       <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//         <TimelineIcon sx={{ mr: 1.5, color: 'info.main' }} />
//         <Typography variant="h6" sx={{ fontWeight: 600 }}>
//           Monthly Performance Trend
//         </Typography>
//       </Box>
      
//       {monthlyPerformanceData.length > 0 ? (
//         <ResponsiveContainer width="100%" height={300}>
//           <AreaChart data={monthlyPerformanceData}>
//             <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.text.secondary, 0.1)} />
//             <XAxis 
//               dataKey="month" 
//               stroke={theme.palette.text.secondary}
//               fontSize={12}
//             />
//             <YAxis 
//               stroke={theme.palette.text.secondary}
//               fontSize={12}
//               domain={[0, 100]}
//               label={{ 
//                 value: 'Score (%)', 
//                 angle: -90, 
//                 position: 'insideLeft',
//                 offset: -10,
//                 style: { fill: theme.palette.text.secondary }
//               }}
//             />
//             <RechartsTooltip 
//               formatter={(value) => [`${value.toFixed(1)}%`, 'Score']}
//               contentStyle={{
//                 borderRadius: 8,
//                 border: `1px solid ${theme.palette.divider}`,
//                 boxShadow: theme.shadows[3],
//                 backgroundColor: theme.palette.background.paper
//               }}
//             />
//             <Area 
//               type="monotone" 
//               dataKey="percentage" 
//               stroke={theme.palette.info.main} 
//               fill={alpha(theme.palette.info.main, 0.3)}
//               strokeWidth={2}
//               name="Average Score %"
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       ) : (
//         <EmptyState message="No monthly performance data available" />
//       )}
//     </StyledCard>
//   ), [monthlyPerformanceData, theme]);

//   const renderQuizComparison = useCallback(() => (
//     <StyledCard sx={{ p: 3 }}>
//       <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//         <CompareArrows sx={{ mr: 1.5, color: 'warning.main' }} />
//         <Typography variant="h6" sx={{ fontWeight: 600 }}>
//           Quiz Performance Comparison
//         </Typography>
//       </Box>
      
//       {quizPerformanceData.length > 0 ? (
//         <ResponsiveContainer width="100%" height={350}>
//           <RechartsBarChart data={quizPerformanceData}>
//             <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.text.secondary, 0.1)} />
//             <XAxis 
//               dataKey="name" 
//               stroke={theme.palette.text.secondary}
//               fontSize={11}
//               angle={-45}
//               textAnchor="end"
//               height={80}
//             />
//             <YAxis 
//               stroke={theme.palette.text.secondary}
//               fontSize={12}
//             />
//             <RechartsTooltip 
//               formatter={(value, name) => {
//                 if (name === 'best') return [value.toFixed(1), 'Best Score'];
//                 if (name === 'latest') return [value.toFixed(1), 'Latest Score'];
//                 if (name === 'percentage') return [`${value.toFixed(1)}%`, 'Latest %'];
//                 return [value, name];
//               }}
//               contentStyle={{
//                 borderRadius: 8,
//                 border: `1px solid ${theme.palette.divider}`,
//                 boxShadow: theme.shadows[3],
//                 backgroundColor: theme.palette.background.paper
//               }}
//             />
//             <Legend />
//             <Bar 
//               dataKey="best" 
//               fill={theme.palette.success.main} 
//               name="Best Score" 
//               radius={[4, 4, 0, 0]}
//             />
//             <Bar 
//               dataKey="latest" 
//               fill={theme.palette.primary.main} 
//               name="Latest Score" 
//               radius={[4, 4, 0, 0]}
//             />
//             <Bar 
//               dataKey="attempts" 
//               fill={theme.palette.info.main} 
//               name="Attempts" 
//               radius={[4, 4, 0, 0]}
//             />
//           </RechartsBarChart>
//         </ResponsiveContainer>
//       ) : (
//         <EmptyState message="No quiz performance data available" />
//       )}
//     </StyledCard>
//   ), [quizPerformanceData, theme]);

// const renderScoreDistribution = useCallback(() => (
//   <StyledCard sx={{ p: 3, height: '100%' }}>
//     <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//       <BarChart sx={{ mr: 1.5, color: 'primary.main' }} />
//       <Typography variant="h6" sx={{ fontWeight: 600 }}>
//         Your Score Distribution
//       </Typography>
//     </Box>
    
//     {scoreDistributionData.length > 0 && scoreDistributionData.some(d => d.count > 0) ? (
//       <Box>
//         {/* Main Visualization */}
//         <ResponsiveContainer width="100%" height={250}>
//           <RechartsBarChart data={scoreDistributionData}>
//             <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.text.secondary, 0.1)} />
//             <XAxis 
//               dataKey="range" 
//               stroke={theme.palette.text.secondary}
//               fontSize={12}
//               label={{ 
//                 value: 'Score Ranges', 
//                 position: 'insideBottom',
//                 offset: -5,
//                 style: { fill: theme.palette.text.secondary }
//               }}
//             />
//             <YAxis 
//               stroke={theme.palette.text.secondary}
//               fontSize={12}
//               label={{ 
//                 value: 'Number of Quizzes', 
//                 angle: -90, 
//                 position: 'insideLeft',
//                 offset: -10,
//                 style: { fill: theme.palette.text.secondary }
//               }}
//             />
//             <RechartsTooltip 
//               formatter={(value, name, props) => {
//                 // FIXED: Add null checks for props
//                 if (!props || typeof props.dataIndex !== 'number') {
//                   return [`${value} quizzes`, 'Number of Quizzes'];
//                 }
                
//                 const dataIndex = props.dataIndex;
//                 if (dataIndex < 0 || dataIndex >= scoreDistributionData.length) {
//                   return [`${value} quizzes`, 'Number of Quizzes'];
//                 }
                
//                 const range = scoreDistributionData[dataIndex];
//                 if (!range) {
//                   return [`${value} quizzes`, 'Number of Quizzes'];
//                 }
                
//                 const totalQuizzes = scoreDistributionData.reduce((sum, d) => sum + d.count, 0);
//                 const percentage = totalQuizzes > 0 ? Math.round((range.count / totalQuizzes) * 100) : 0;
//                 return [`${value} quizzes (${percentage}%)`, 'Number of Quizzes'];
//               }}
//               labelFormatter={(label) => {
//                 if (!label) return 'Score Range';
                
//                 const range = scoreDistributionData.find(d => d.range === label);
//                 if (!range) return `${label}%`;
                
//                 const performanceLevels = {
//                   '0-20': 'Needs Urgent Improvement',
//                   '21-40': 'Needs Practice',
//                   '41-60': 'Average Performance',
//                   '61-80': 'Good Performance',
//                   '81-100': 'Excellent Performance'
//                 };
                
//                 return `${label}% - ${performanceLevels[label] || 'Performance Range'}`;
//               }}
//               contentStyle={{
//                 borderRadius: 8,
//                 border: `1px solid ${theme.palette.divider}`,
//                 boxShadow: theme.shadows[3],
//                 backgroundColor: theme.palette.background.paper
//               }}
//             />
//             <Bar 
//               dataKey="count" 
//               name="Number of Quizzes"
//               radius={[4, 4, 0, 0]}
//             >
//               {scoreDistributionData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={entry.color} />
//               ))}
//             </Bar>
//           </RechartsBarChart>
//         </ResponsiveContainer>
        
//         {/* Improved Analysis Section */}
//         <Box sx={{ mt: 4 }}>
//           <Typography variant="subtitle1" gutterBottom sx={{ 
//             fontWeight: 600, 
//             color: 'primary.main',
//             display: 'flex',
//             alignItems: 'center',
//             gap: 1
//           }}>
//             <Insights fontSize="small" />
//             Your Performance Analysis
//           </Typography>
          
//           {/* Performance Summary Cards - FIXED: Added null checks */}
//           <Grid container spacing={2} sx={{ mb: 3 }}>
//             {(() => {
//               const totalQuizzes = scoreDistributionData.reduce((sum, d) => sum + (d?.count || 0), 0);
//               const weakQuizzes = (scoreDistributionData[0]?.count || 0) + (scoreDistributionData[1]?.count || 0);
//               const strongQuizzes = (scoreDistributionData[3]?.count || 0) + (scoreDistributionData[4]?.count || 0);
              
//               return [
//                 {
//                   label: 'Total Quizzes',
//                   value: totalQuizzes,
//                   color: theme.palette.primary.main,
//                   icon: <Numbers />
//                 },
//                 {
//                   label: 'Quizzes Below 40%',
//                   value: weakQuizzes,
//                   color: theme.palette.error.main,
//                   icon: <Warning />,
//                   description: weakQuizzes > 0 ? 'Need more practice' : 'Great! None in this range'
//                 },
//                 {
//                   label: 'Quizzes Above 60%',
//                   value: strongQuizzes,
//                   color: theme.palette.success.main,
//                   icon: <TrendingUp />,
//                   description: strongQuizzes > 0 ? 'Great work!' : 'Aim for higher scores'
//                 }
//               ];
//             })().map((stat, index) => (
//               <Grid item xs={4} key={index}>
//                 <Box sx={{ 
//                   p: 2, 
//                   bgcolor: alpha(stat.color, 0.1),
//                   borderRadius: 2,
//                   textAlign: 'center',
//                   border: `1px solid ${alpha(stat.color, 0.2)}`,
//                   height: '100%'
//                 }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
//                     {React.cloneElement(stat.icon, { 
//                       sx: { color: stat.color, fontSize: 20, mr: 1 } 
//                     })}
//                     <Typography variant="h6" sx={{ 
//                       fontWeight: 700, 
//                       color: stat.color 
//                     }}>
//                       {stat.value}
//                     </Typography>
//                   </Box>
//                   <Typography variant="caption" sx={{ fontWeight: 500, display: 'block' }}>
//                     {stat.label}
//                   </Typography>
//                   {stat.description && (
//                     <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 0.5 }}>
//                       {stat.description}
//                     </Typography>
//                   )}
//                 </Box>
//               </Grid>
//             ))}
//           </Grid>
          
//           {/* Performance Breakdown with Visual Indicators - FIXED: Added null checks */}
//           <Box>
//             <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
//               Performance Breakdown
//             </Typography>
            
//             <Grid container spacing={1}>
//               {scoreDistributionData.map((range, index) => {
//                 // FIXED: Check if range exists
//                 if (!range) return null;
                
//                 const totalQuizzes = scoreDistributionData.reduce((sum, d) => sum + (d?.count || 0), 0);
//                 const percentage = totalQuizzes > 0 ? Math.round((range.count / totalQuizzes) * 100) : 0;
                
//                 const performanceLabels = {
//                   '0-20': { 
//                     label: 'Need Help', 
//                     icon: <ErrorOutline fontSize="small" />,
//                     advice: 'Focus on basics, seek help from teacher'
//                   },
//                   '21-40': { 
//                     label: 'Needs Practice', 
//                     icon: <Warning fontSize="small" />,
//                     advice: 'Practice more, review concepts'
//                   },
//                   '41-60': { 
//                     label: 'Average', 
//                     icon: <Equalizer fontSize="small" />,
//                     advice: 'Good, aim for consistent improvement'
//                   },
//                   '61-80': { 
//                     label: 'Good', 
//                     icon: <CheckCircle fontSize="small" />,
//                     advice: 'Excellent! Maintain this level'
//                   },
//                   '81-100': { 
//                     label: 'Excellent', 
//                     icon: <EmojiEvents fontSize="small" />,
//                     advice: 'Outstanding! Help others learn'
//                   }
//                 };
                
//                 const performance = performanceLabels[range.range] || { 
//                   label: 'Performance', 
//                   icon: null, 
//                   advice: 'Keep working hard!' 
//                 };
                
//                 return (
//                   <Grid item xs={12} key={index}>
//                     <Box sx={{ 
//                       mb: 2, 
//                       p: 2, 
//                       borderRadius: 2,
//                       bgcolor: alpha(range.color, 0.1),
//                       borderLeft: `4px solid ${range.color}`,
//                       opacity: range.count > 0 ? 1 : 0.7
//                     }}>
//                       <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                           <Box sx={{ 
//                             width: 12, 
//                             height: 12, 
//                             borderRadius: '50%', 
//                             bgcolor: range.color 
//                           }} />
//                           <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
//                             {range.range}% - {performance.label}
//                           </Typography>
//                           {performance.icon && React.cloneElement(performance.icon, { 
//                             sx: { fontSize: 16, color: range.color } 
//                           })}
//                         </Box>
//                         <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
//                           {range.count} {range.count === 1 ? 'quiz' : 'quizzes'} ({percentage}%)
//                         </Typography>
//                       </Box>
                      
//                       {/* Progress Bar with Percentage */}
//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
//                         <Box sx={{ flexGrow: 1 }}>
//                           <LinearProgress 
//                             variant="determinate" 
//                             value={percentage} 
//                             sx={{ 
//                               height: 8, 
//                               borderRadius: 4,
//                               backgroundColor: alpha(range.color, 0.2),
//                               '& .MuiLinearProgress-bar': {
//                                 backgroundColor: range.color,
//                                 borderRadius: 4
//                               }
//                             }}
//                           />
//                         </Box>
//                         <Typography variant="caption" color="text.secondary">
//                           {percentage}% of your quizzes
//                         </Typography>
//                       </Box>
                      
//                       {/* Advice for this range */}
//                       <Box sx={{ 
//                         mt: 1.5, 
//                         p: 1.5, 
//                         bgcolor: alpha(theme.palette.primary.main, 0.05),
//                         borderRadius: 1
//                       }}>
//                         <Typography variant="caption" sx={{ 
//                           display: 'flex', 
//                           alignItems: 'flex-start',
//                           gap: 1,
//                           color: 'text.secondary'
//                         }}>
//                           <Lightbulb fontSize="small" sx={{ color: 'warning.main', mt: 0.2 }} />
//                           <span>
//                             <strong>Advice:</strong> {performance.advice}
//                           </span>
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </Grid>
//                 );
//               })}
//             </Grid>
//           </Box>
          
//           {/* Overall Performance Insight - FIXED: Added null checks */}
//           {(() => {
//             const totalQuizzes = scoreDistributionData.reduce((sum, d) => sum + (d?.count || 0), 0);
//             if (totalQuizzes === 0) return null;
            
//             const weakCount = (scoreDistributionData[0]?.count || 0) + (scoreDistributionData[1]?.count || 0);
//             const strongCount = (scoreDistributionData[3]?.count || 0) + (scoreDistributionData[4]?.count || 0);
//             const weakPercentage = (weakCount / totalQuizzes) * 100;
//             const strongPercentage = (strongCount / totalQuizzes) * 100;
            
//             let insight = '';
//             let icon = <Info color="info" />;
//             let colorName = 'info';
            
//             if (strongPercentage > 50) {
//               insight = 'Excellent! Most of your quizzes are above 60%. Keep up the great work!';
//               icon = <EmojiEvents color="success" />;
//               colorName = 'success';
//             } else if (weakPercentage > 40) {
//               insight = 'You need to focus on improving. Try to move more quizzes to the 61-100% range.';
//               icon = <Warning color="warning" />;
//               colorName = 'warning';
//             } else {
//               insight = 'Your performance is balanced. Focus on moving more quizzes to higher score ranges.';
//             }
            
//             return (
//               <Box sx={{ 
//                 mt: 3, 
//                 p: 2, 
//                 bgcolor: alpha(theme.palette[colorName].main, 0.1),
//                 borderRadius: 2,
//                 border: `1px solid ${alpha(theme.palette[colorName].main, 0.2)}`
//               }}>
//                 <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
//                   {icon}
//                   <Box sx={{ flexGrow: 1 }}>
//                     <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5, color: `${colorName}.main` }}>
//                       Your Performance Insight
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       {insight}
//                     </Typography>
//                   </Box>
//                 </Box>
//               </Box>
//             );
//           })()}
//         </Box>
//       </Box>
//     ) : (
//       <EmptyState 
//         message="No score distribution data available"
//         icon={Assessment}
//         action={
//           <Button 
//             variant="outlined" 
//             size="small"
//             startIcon={<Refresh />}
//             onClick={handleRefresh}
//           >
//             Refresh Data
//           </Button>
//         }
//       />
//     )}
//   </StyledCard>
// ), [scoreDistributionData, theme, handleRefresh]);


//   const renderImprovementAreas = useCallback(() => {
//     if (!analyticsData?.improvementAreas?.length) {
//       return (
//         <StyledCard sx={{ p: 3, textAlign: 'center' }}>
//           <CheckCircle sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
//           <Typography variant="h6" color="success.main" gutterBottom sx={{ fontWeight: 600 }}>
//             Excellent Progress!
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             No major improvement areas identified. Keep up the excellent work!
//           </Typography>
//         </StyledCard>
//       );
//     }

//     return (
//       <StyledCard sx={{ p: 3 }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//           <RocketLaunch sx={{ mr: 1.5, color: 'warning.main' }} />
//           <Typography variant="h6" sx={{ fontWeight: 600 }}>
//             Areas for Improvement
//           </Typography>
//         </Box>
        
//         <Grid container spacing={2}>
//           {analyticsData.improvementAreas.map((area, index) => (
//             <Grid item xs={12} md={6} key={index}>
//               <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
//                 <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
//                   <Warning color="warning" sx={{ mr: 1.5, mt: 0.5 }} />
//                   <Box sx={{ flexGrow: 1 }}>
//                     <Typography variant="subtitle1" color="warning.main" gutterBottom sx={{ fontWeight: 600 }}>
//                       {area.area || 'Improvement Area'}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" paragraph>
//                       <strong>Current Status:</strong> {area.currentPercentage || area.currentAverage || 'N/A'}
//                     </Typography>
//                     <Typography variant="body2" sx={{ color: 'primary.main', fontStyle: 'italic' }}>
//                       💡 {area.recommendation || 'Focus on improving this area'}
//                     </Typography>
//                   </Box>
//                 </Box>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </StyledCard>
//     );
//   }, [analyticsData]);

//   const renderRecommendations = useCallback(() => {
//     if (!analyticsData?.recommendations?.length) {
//       return (
//         <StyledCard sx={{ p: 3 }}>
//           <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
//             Personalized Recommendations
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             No recommendations available at the moment.
//           </Typography>
//         </StyledCard>
//       );
//     }

//     return (
//       <StyledCard sx={{ p: 3 }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//           <Lightbulb sx={{ mr: 1.5, color: 'primary.main' }} />
//           <Typography variant="h6" sx={{ fontWeight: 600 }}>
//             Personalized Recommendations
//           </Typography>
//         </Box>
        
//         <Stack spacing={2}>
//           {analyticsData.recommendations.map((rec, index) => (
//             <Card key={index} variant="outlined" sx={{ p: 2 }}>
//               <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
//                 <ListItemIcon sx={{ minWidth: 40 }}>
//                   {rec.priority === 'High' ? (
//                     <Warning color="error" />
//                   ) : rec.priority === 'Medium' ? (
//                     <Info color="warning" />
//                   ) : (
//                     <CheckCircle color="success" />
//                   )}
//                 </ListItemIcon>
//                 <ListItemText
//                   primary={
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                       <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
//                         {rec.type || 'Recommendation'}
//                       </Typography>
//                       <Chip 
//                         label={rec.priority || 'Medium'} 
//                         size="small" 
//                         color={
//                           rec.priority === 'High' ? 'error' : 
//                           rec.priority === 'Medium' ? 'warning' : 'success'
//                         }
//                       />
//                     </Box>
//                   }
//                   secondary={
//                     <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                       {rec.message || 'No specific message provided.'}
//                     </Typography>
//                   }
//                 />
//               </Box>
//             </Card>
//           ))}
//         </Stack>
//       </StyledCard>
//     );
//   }, [analyticsData]);

//   const renderQuizHistory = useCallback(() => {
//     if (!quizHistoryData?.attempts?.length && !quizHistoryLoading) {
//       return <EmptyState message="No quiz history available" />;
//     }

//     return (
//       <Box>
//         {/* Filters */}
//         <StyledCard sx={{ p: 2, mb: 3 }}>
//           <Grid container spacing={2} alignItems="center">
//             <Grid item xs={12} md={3}>
//               <TextField
//                 select
//                 fullWidth
//                 size="small"
//                 label="Subject"
//                 value={quizHistoryFilters.subject}
//                 onChange={(e) => handleFilterChange('subject', e.target.value)}
//               >
//                 <MenuItem value="">All Subjects</MenuItem>
//                 {[...new Set(quizHistoryData?.attempts?.map(a => a.subject) || [])]
//                   .filter(Boolean)
//                   .map(subject => (
//                     <MenuItem key={subject} value={subject}>
//                       {subject}
//                     </MenuItem>
//                   ))}
//               </TextField>
//             </Grid>
//             <Grid item xs={12} md={3}>
//               <TextField
//                 select
//                 fullWidth
//                 size="small"
//                 label="Sort By"
//                 value={quizHistoryFilters.sortBy}
//                 onChange={(e) => handleFilterChange('sortBy', e.target.value)}
//               >
//                 <MenuItem value="date">Date (Recent First)</MenuItem>
//                 <MenuItem value="score">Score (High to Low)</MenuItem>
//                 <MenuItem value="time">Time Taken</MenuItem>
//               </TextField>
//             </Grid>
//             <Grid item xs={12} md={3}>
//               <TextField
//                 select
//                 fullWidth
//                 size="small"
//                 label="Order"
//                 value={quizHistoryFilters.order}
//                 onChange={(e) => handleFilterChange('order', e.target.value)}
//               >
//                 <MenuItem value="desc">Descending</MenuItem>
//                 <MenuItem value="asc">Ascending</MenuItem>
//               </TextField>
//             </Grid>
//             <Grid item xs={12} md={3}>
//               <FormControl fullWidth size="small">
//                 <InputLabel>Per Page</InputLabel>
//                 <Select
//                   value={quizHistoryPageSize}
//                   label="Per Page"
//                   onChange={handleQuizHistoryPageSizeChange}
//                 >
//                   {ITEMS_PER_PAGE_OPTIONS.map(option => (
//                     <MenuItem key={option} value={option}>
//                       {option} items
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//           </Grid>
//         </StyledCard>

//         {/* Table */}
//         {quizHistoryLoading ? (
//           <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           <>
//             <TableContainer component={StyledCard}>
//               <Table size={isMobile ? "small" : "medium"}>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell sx={{ fontWeight: 600 }}>Quiz Title</TableCell>
//                     <TableCell sx={{ fontWeight: 600 }}>Subject</TableCell>
//                     <TableCell align="right" sx={{ fontWeight: 600 }}>Score</TableCell>
//                     <TableCell align="right" sx={{ fontWeight: 600 }}>Percentage</TableCell>
//                     <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
//                     <TableCell sx={{ fontWeight: 600 }}>Time Taken</TableCell>
//                     <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
//                     <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {quizHistoryData.attempts.map((attempt, index) => {
//                     const score = safeParseFloat(attempt.score);
//                     const totalMarks = safeParseFloat(attempt.totalMarks);
//                     const percentage = totalMarks > 0 ? (score / totalMarks) * 100 : 0;
//                     const isPassed = percentage >= 50;
                    
//                     return (
//                       <TableRow 
//                         key={attempt.attemptId || index}
//                         sx={{ 
//                           '&:hover': { 
//                             backgroundColor: alpha(theme.palette.primary.main, 0.04) 
//                           } 
//                         }}
//                       >
//                         <TableCell>
//                           <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                             {attempt.quizTitle || 'Untitled Quiz'}
//                           </Typography>
//                         </TableCell>
//                         <TableCell>
//                           <Chip 
//                             label={attempt.subject || 'N/A'} 
//                             size="small" 
//                             icon={<SubjectIcon />}
//                             variant="outlined"
//                           />
//                         </TableCell>
//                         <TableCell align="right">
//                           <Typography variant="body2" sx={{ fontWeight: 600 }}>
//                             {score.toFixed(1)}/{totalMarks.toFixed(1)}
//                           </Typography>
//                         </TableCell>
//                         <TableCell align="right">
//                           <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
//                             <ProgressBar 
//                               variant="determinate" 
//                               value={Math.min(percentage, 100)} 
//                               customcolor={isPassed ? theme.palette.success.main : theme.palette.error.main}
//                               sx={{ width: 60, mr: 1 }}
//                             />
//                             <Typography 
//                               variant="body2" 
//                               sx={{ 
//                                 fontWeight: 600,
//                                 color: isPassed ? 'success.main' : 'error.main'
//                               }}
//                             >
//                               {formatPercentage(percentage)}
//                             </Typography>
//                           </Box>
//                         </TableCell>
//                         <TableCell>
//                           <Chip
//                             label={isPassed ? 'Passed' : 'Failed'}
//                             color={isPassed ? 'success' : 'error'}
//                             size="small"
//                             icon={isPassed ? <CheckCircle /> : <Cancel />}
//                             sx={{ fontWeight: 500 }}
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                             <AccessTime sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
//                             <Typography variant="body2">
//                               {attempt.timeTaken || 'N/A'}
//                             </Typography>
//                           </Box>
//                         </TableCell>
//                         <TableCell>
//                           <Typography variant="body2">
//                             {formatDate(attempt.attemptedAt)}
//                           </Typography>
//                         </TableCell>
//                         <TableCell>
//                           <Tooltip title="View Detailed Analysis">
//                             <IconButton 
//                               size="small" 
//                               onClick={() => handleViewAttemptDetails(attempt.attemptId)}
//                               disabled={!attempt.attemptId}
//                               sx={{ 
//                                 color: 'primary.main',
//                                 '&:hover': { 
//                                   backgroundColor: alpha(theme.palette.primary.main, 0.1) 
//                                 }
//                               }}
//                             >
//                               <Visibility fontSize="small" />
//                             </IconButton>
//                           </Tooltip>
//                         </TableCell>
//                       </TableRow>
//                     );
//                   })}
//                 </TableBody>
//               </Table>
//             </TableContainer>

//             {/* Pagination */}
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
//               <Typography variant="body2" color="text.secondary">
//                 Showing {((quizHistoryPage - 1) * quizHistoryPageSize) + 1} to{' '}
//                 {Math.min(quizHistoryPage * quizHistoryPageSize, quizHistoryData?.pagination?.totalAttempts || 0)} of{' '}
//                 {quizHistoryData?.pagination?.totalAttempts || 0} attempts
//               </Typography>
//               <Pagination
//                 count={quizHistoryData?.pagination?.totalPages || 1}
//                 page={quizHistoryPage}
//                 onChange={handleQuizHistoryPageChange}
//                 color="primary"
//                 size={isMobile ? "small" : "medium"}
//                 showFirstButton
//                 showLastButton
//               />
//             </Box>
//           </>
//         )}
//       </Box>
//     );
//   }, [quizHistoryData, quizHistoryLoading, quizHistoryFilters, quizHistoryPage, quizHistoryPageSize, theme, handleFilterChange, handleQuizHistoryPageSizeChange, handleQuizHistoryPageChange, handleViewAttemptDetails]);

//   const renderCoursePerformance = useCallback(() => {
//     if (!analyticsData?.departmentWiseAnalysis?.length) {
//       return <EmptyState message="No department-wise data available" />;
//     }

//     // Sort departments by percentage (descending)
//     const sortedDepartments = [...analyticsData.departmentWiseAnalysis]
//       .map(dept => ({
//         ...dept,
//         percentage: clampPercentage(dept.departmentPercentage)
//       }))
//       .sort((a, b) => b.percentage - a.percentage);

//     return (
//       <StyledCard sx={{ p: 3 }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//           <School sx={{ mr: 1.5, color: 'secondary.main' }} />
//           <Typography variant="h6" sx={{ fontWeight: 600 }}>
//             Department/Course Performance
//           </Typography>
//         </Box>
        
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6}>
//             <ResponsiveContainer width="100%" height={300}>
//               <RechartsBarChart data={sortedDepartments.map(dept => ({
//                 name: dept.department || 'Unknown',
//                 percentage: dept.percentage,
//                 attempts: safeParseInt(dept.totalAttempts),
//                 score: safeParseFloat(dept.averageScore)
//               }))}>
//                 <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.text.secondary, 0.1)} />
//                 <XAxis 
//                   dataKey="name" 
//                   stroke={theme.palette.text.secondary}
//                   fontSize={12}
//                 />
//                 <YAxis 
//                   stroke={theme.palette.text.secondary}
//                   fontSize={12}
//                   domain={[0, 100]}
//                 />
//                 <RechartsTooltip 
//                   formatter={(value) => [`${value}%`, 'Score']}
//                   contentStyle={{
//                     borderRadius: 8,
//                     border: `1px solid ${theme.palette.divider}`,
//                     boxShadow: theme.shadows[3],
//                     backgroundColor: theme.palette.background.paper
//                   }}
//                 />
//                 <Bar 
//                   dataKey="percentage" 
//                   fill={theme.palette.secondary.main} 
//                   name="Department Score %"
//                   radius={[4, 4, 0, 0]}
//                 />
//               </RechartsBarChart>
//             </ResponsiveContainer>
//           </Grid>
          
//           <Grid item xs={12} md={6}>
//             <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
//               {sortedDepartments.map((dept, index) => {
//                 const percentage = dept.percentage;
//                 return (
//                   <Box key={dept.department || index} sx={{ 
//                     mb: 2, 
//                     p: 2, 
//                     bgcolor: alpha(theme.palette.secondary.main, 0.05), 
//                     borderRadius: 2,
//                     borderLeft: `4px solid ${
//                       index === 0 ? theme.palette.success.main :
//                       index === 1 ? theme.palette.warning.main :
//                       index === 2 ? theme.palette.info.main :
//                       theme.palette.secondary.main
//                     }`
//                   }}>
//                     <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
//                       {dept.department || 'Unknown Department'}
//                     </Typography>
                    
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//                       <Typography variant="caption" color="text.secondary">
//                         Score: {formatPercentage(percentage)}
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary">
//                         Attempts: {dept.totalAttempts || 0}
//                       </Typography>
//                     </Box>
                    
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                       <Typography variant="caption" sx={{ fontWeight: 500 }}>
//                         Average: {safeParseFloat(dept.averageScore).toFixed(1)}
//                       </Typography>
//                       <Chip 
//                         label={`Rank: ${index + 1}`} 
//                         size="small" 
//                         color={
//                           index === 0 ? 'success' : 
//                           index === 1 ? 'warning' : 
//                           index === 2 ? 'info' :
//                           'default'
//                         }
//                         sx={{ fontWeight: 600 }}
//                       />
//                     </Box>
                    
//                     <ProgressBar 
//                       variant="determinate" 
//                       value={percentage} 
//                       customcolor={
//                         percentage >= 80 ? theme.palette.success.main :
//                         percentage >= 60 ? theme.palette.warning.main :
//                         theme.palette.error.main
//                       }
//                       sx={{ mt: 1 }}
//                     />
//                   </Box>
//                 );
//               })}
//             </Box>
//           </Grid>
//         </Grid>
//       </StyledCard>
//     );
//   }, [analyticsData, theme]);

//   // Loading state
//   if (analyticsLoading) {
//     return <LoadingSkeleton />;
//   }

//   // Error state
//   if (analyticsError) {
//     return <ErrorDisplay error={analyticsError} onRetry={handleRefresh} />;
//   }

//   // Empty state
//   if (!analyticsData) {
//     return <EmptyState message="No analytics data found" />;
//   }

//   return (
//     <Box sx={{ p: isMobile ? 1 : 3, bgcolor: theme.palette.background.default, minHeight: '100vh'}}>
//       {/* Header */}
//       <StyledCard sx={{ mb: 3, p: 3 }}>
//         <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center' }}>
//           <Box sx={{ flexGrow: 1, mb: isMobile ? 2 : 0 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 1}}>
//               <Avatar 
//                 sx={{ 
//                   bgcolor: theme.palette.primary.main, 
//                   mr: 2,
//                   width: 56,
//                   height: 56,
//                   fontSize: 24,
//                   fontWeight: 600
//                 }}
//               >
//                 {analyticsData.studentInfo?.name?.charAt(0) || 'S'}
//               </Avatar>
//               <div className='c1'></div>
//               <Box>
//                 <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700}}>
//                   Analytics Dashboard
//                 </Typography>
//                 <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
//                   {analyticsData.studentInfo?.name || 'Student'} • {analyticsData.studentInfo?.enrollmentNumber || 'N/A'}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {analyticsData.studentInfo?.department || 'N/A'} • {analyticsData.studentInfo?.course || 'N/A'} • Semester {analyticsData.studentInfo?.semester || 'N/A'}
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>
          
//           <Stack direction="row" spacing={1}>
//             <Tooltip title="Go Back">
//               <IconButton 
//                 onClick={() => navigate(-1)}
//                 sx={{ 
//                   bgcolor: alpha(theme.palette.primary.main, 0.1),
//                   '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) }
//                 }}
//               >
//                 <ArrowBack />
//               </IconButton>
//             </Tooltip>
//             <Tooltip title="Refresh Data">
//               <IconButton 
//                 onClick={handleRefresh}
//                 sx={{ 
//                   bgcolor: alpha(theme.palette.info.main, 0.1),
//                   '&:hover': { bgcolor: alpha(theme.palette.info.main, 0.2) }
//                 }}
//               >
//                 <Refresh />
//               </IconButton>
//             </Tooltip>
//             <Tooltip title="Export Analytics">
//               <Button
//                 variant="contained"
//                 startIcon={<Download />}
//                 onClick={handleExportData}
//                 sx={{ borderRadius: 2 }}
//               >
//                 Export
//               </Button>
//             </Tooltip>
//           </Stack>
//         </Box>
        
//         <Divider sx={{ my: 3 }} />
        
//         {/* Quick Stats */}
//         <Grid container spacing={2}>
//           <Grid item xs={6} md={3}>
//             <Box sx={{ textAlign: 'center' }}>
//               <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
//                 {analyticsData.summary?.totalRegisteredQuizzes || 0}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Total Registered Quizzes
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={6} md={3}>
//             <Box sx={{ textAlign: 'center' }}>
//               <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main' }}>
//                 {analyticsData.summary?.totalAttemptedQuizzes || 0}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Quizzes Attempted
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={6} md={3}>
//             <Box sx={{ textAlign: 'center' }}>
//               <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main' }}>
//                 {safeParseFloat(analyticsData.summary?.averageScore).toFixed(1)}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Average Score
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={6} md={3}>
//             <Box sx={{ textAlign: 'center' }}>
//               <Typography variant="h3" sx={{ fontWeight: 700, color: 'error.main' }}>
//                 {formatPercentage(analyticsData.summary?.passPercentage)}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Overall Pass Rate
//               </Typography>
//             </Box>
//           </Grid>
//         </Grid>
//       </StyledCard>


//       {/* Metrics Grid */}
//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         {summaryMetrics.map(renderMetricCard)}
//       </Grid>

//       {/* Main Content */}
//       <StyledCard sx={{ mb: 3 }}>
//         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//           <Tabs 
//             value={activeTab} 
//             onChange={handleTabChange} 
//             variant={isMobile ? "scrollable" : "standard"}
//             scrollButtons={isMobile ? "auto" : false}
//             sx={{
//               '& .MuiTab-root': {
//                 fontWeight: 600,
//                 textTransform: 'none',
//                 fontSize: isMobile ? '0.875rem' : '1rem',
//                 minHeight: 60
//               }
//             }}
//           >
//             <Tab icon={<Assessment />} label="Overview" />
//             <Tab icon={<Timeline />} label="Performance Analytics" />
//             <Tab icon={<SubjectIcon />} label="Subject Analysis" />
//             <Tab icon={<School />} label="Course Performance" />
//             <Tab icon={<History />} label="Quiz History" />
//             <Tab icon={<Insights />} label="Recommendations" />
//           </Tabs>
//         </Box>

//         <Box sx={{ p: 3 }}>
//           {/* Tab 1: Overview */}
//           {activeTab === 0 && (
//             <Grid container spacing={3}>
//               <Grid item xs={12} lg={8}>
//                 {renderPerformanceChart()}
//               </Grid>
//               <Grid item xs={12} lg={4}>
//                 {renderSubjectAnalysis()}
//               </Grid>
//               <Grid item xs={12}>
//                 {renderMonthlyTrend()}
//               </Grid>
//               <Grid item xs={12} lg={6}>
//                 {renderImprovementAreas()}
//               </Grid>
//               <Grid item xs={12} lg={6}>
//                 {renderRecommendations()}
//               </Grid>
//             </Grid>
//           )}

//           {/* Tab 2: Performance Analytics */}
//           {activeTab === 1 && (
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 {renderQuizComparison()}
//               </Grid>
//               <Grid item xs={12}>
//                 {renderMonthlyTrend()}
//               </Grid>
//               <Grid item xs={12} lg={6}>
//                 {renderScoreDistribution()}
//               </Grid>
//               <Grid item xs={12} lg={6}>
//                 <StyledCard sx={{ p: 3, height: '100%' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//                     <Timer sx={{ mr: 1.5, color: 'info.main' }} />
//                     <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                       Time Analysis
//                     </Typography>
//                   </Box>
                  
//                   {analyticsData.summary && (
//                     <Box>
//                       <Box sx={{ mb: 3, p: 2, bgcolor: alpha(theme.palette.info.main, 0.05), borderRadius: 2 }}>
//                         <Typography variant="body2" color="text.secondary" gutterBottom>
//                           Average Time per Quiz
//                         </Typography>
//                         <Typography variant="h4" sx={{ fontWeight: 700, color: 'info.main' }}>
//                           {formatTime(analyticsData.summary.averageTimePerQuiz)}
//                         </Typography>
//                       </Box>
//                       <Box sx={{ p: 2, bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: 2 }}>
//                         <Typography variant="body2" color="text.secondary" gutterBottom>
//                           Total Time Spent on Quizzes
//                         </Typography>
//                         <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
//                           {analyticsData.summary.totalTimeSpent || 'N/A'}
//                         </Typography>
//                       </Box>
//                     </Box>
//                   )}
//                 </StyledCard>
//               </Grid>
//             </Grid>
//           )}

//           {/* Tab 3: Subject Analysis */}
//           {activeTab === 2 && (
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 {renderSubjectAnalysis()}
//               </Grid>
//               <Grid item xs={12} lg={6}>
//                 <StyledCard sx={{ p: 3, height: '100%' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//                     <CompareArrows sx={{ mr: 1.5, color: 'secondary.main' }} />
//                     <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                       Subject Comparison
//                     </Typography>
//                   </Box>
                  
//                   {subjectChartData.length > 0 ? (
//                     <ResponsiveContainer width="100%" height={300}>
//                       <RechartsBarChart data={subjectChartData}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="name" />
//                         <YAxis domain={[0, 100]} />
//                         <RechartsTooltip 
//                           formatter={(value) => [`${value}%`, 'Score']}
//                           contentStyle={{
//                             borderRadius: 8,
//                             border: `1px solid ${theme.palette.divider}`,
//                             boxShadow: theme.shadows[3],
//                             backgroundColor: theme.palette.background.paper
//                           }}
//                         />
//                         <Bar dataKey="value" fill={theme.palette.secondary.main} radius={[4, 4, 0, 0]} />
//                       </RechartsBarChart>
//                     </ResponsiveContainer>
//                   ) : (
//                     <EmptyState message="No subject comparison data" />
//                   )}
//                 </StyledCard>
//               </Grid>
//               <Grid item xs={12} lg={6}>
//                 <StyledCard sx={{ p: 3, height: '100%' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//                     <Numbers sx={{ mr: 1.5, color: 'primary.main' }} />
//                     <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                       Subject-wise Attempts
//                     </Typography>
//                   </Box>
                  
//                   {analyticsData.subjectWiseAnalysis?.length > 0 ? (
//                     <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
//                       {analyticsData.subjectWiseAnalysis.map((subject, index) => (
//                         <Box key={index} sx={{ mb: 2, p: 2, bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: 2 }}>
//                           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
//                             <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
//                               {subject.subject || `Subject ${index + 1}`}
//                             </Typography>
//                             <Chip 
//                               label={`${subject.totalAttempts || 0} attempts`} 
//                               size="small" 
//                               color="primary"
//                               variant="outlined"
//                             />
//                           </Box>
//                           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                             <Typography variant="caption" color="text.secondary">
//                               Score: {formatPercentage(subject.subjectPercentage)}
//                             </Typography>
//                             <Typography variant="caption" sx={{ fontWeight: 500 }}>
//                               Avg: {safeParseFloat(subject.averageScore).toFixed(1)}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       ))}
//                     </Box>
//                   ) : (
//                     <EmptyState message="No subject attempt data" />
//                   )}
//                 </StyledCard>
//               </Grid>
//             </Grid>
//           )}

//           {/* Tab 4: Course Performance */}
//           {activeTab === 3 && (
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 {renderCoursePerformance()}
//               </Grid>
//             </Grid>
//           )}

//           {/* Tab 5: Quiz History */}
//           {activeTab === 4 && (
//             <Box>
//               {renderQuizHistory()}
//             </Box>
//           )}

//           {/* Tab 6: Recommendations */}
//           {activeTab === 5 && (
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 {renderRecommendations()}
//               </Grid>
//               <Grid item xs={12}>
//                 {renderImprovementAreas()}
//               </Grid>
//             </Grid>
//           )}
//         </Box>
//       </StyledCard>

//       {/* Footer Info */}
//       <Box sx={{ mt: 4, textAlign: 'center' }}>
//         <Typography variant="caption" color="text.secondary">
//           Last updated: {new Date().toLocaleDateString()} • Data refreshes automatically
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default StudentAnalytics;


import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Avatar,
  Divider,
  IconButton,
  Tooltip,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CardContent,
  CardHeader,
  Stack,
  Badge,
  alpha,
  useTheme,
  styled
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Cancel,
  AccessTime,
  EmojiEvents,
  Subject as SubjectIcon,
  School,
  CalendarToday,
  BarChart,
  Timeline,
  ExpandMore,
  FilterList,
  Sort,
  Download,
  Refresh,
  ErrorOutline,
  Info,
  Warning,
  ArrowBack,
  Visibility,
  GridView,
  TableRows,
  PieChart,
  Analytics,
  Score,
  Timer,
  Numbers,
  Assessment,
  Psychology,
  Insights,
  Speed,
  VerticalAlignBottom,
  VerticalAlignTop,
  Equalizer,
  ShowChart,
  TableChart,
  DonutLarge,
  CompareArrows,
  Timeline as TimelineIcon,
  History,
  Lightbulb,
  RocketLaunch,
  TrendingFlat,
  Leaderboard
} from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  LineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';


const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/student-analytics';
const ITEMS_PER_PAGE_OPTIONS = [5, 10, 25, 50, 100];
const DEFAULT_PAGE_SIZE = 10;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
  }
}));

const MetricCard = styled(Card)(({ theme, color }) => ({
  padding: theme.spacing(2.5),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: color ? alpha(color, 0.05) : 'transparent',
  borderLeft: color ? `4px solid ${color}` : 'none',
  borderRadius: 12
}));

const ProgressBar = styled(LinearProgress)(({ theme, value, customcolor }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: alpha(customcolor || theme.palette.primary.main, 0.1),
  '& .MuiLinearProgress-bar': {
    backgroundColor: customcolor || theme.palette.primary.main,
    borderRadius: 4
  }
}));
// PERFECT PERCENTILE CALCULATION FUNCTION
const calculatePercentile = (rank, totalParticipants) => {
  
  if (!rank || !totalParticipants || totalParticipants <= 0 || rank < 1 || rank > totalParticipants) {
    return null; // Invalid data
  }
  
  // Special cases
  if (totalParticipants === 1) {
    // Only one participant - they are the best
    return 100.0;
  }
  
  if (rank === 1) {
    // Rank 1 - Use formula: 100 * (N-1) / (N-1) = 100
    return 100.0;
  }
  
  if (rank === totalParticipants) {
    // Last rank - Use formula: 100 * 0 / (N-1) = 0
    return 0.0;
  }
  
  // Standard percentile formula used in Indian competitive exams (JEE, NEET, etc.)
  // Percentile = 100 × (Total Participants - Your Rank) / (Total Participants - 1)
  const percentile = 100 * (totalParticipants - rank) / (totalParticipants - 1);
  
  // Round to 2 decimal places and ensure it's between 0 and 100
  return Math.max(0, Math.min(100, Math.round(percentile * 100) / 100));
};

// Format percentile for display
const formatPercentile = (percentile) => {
  if (percentile === null || percentile === undefined) return 'N/A';
  return `${percentile.toFixed(1)}%`;
};

// Utility Functions
const safeParseFloat = (value, defaultValue = 0) => {
  if (value === null || value === undefined || value === '') return defaultValue;
  const num = parseFloat(value);
  return isNaN(num) ? defaultValue : num;
};

const safeParseInt = (value, defaultValue = 0) => {
  if (value === null || value === undefined || value === '') return defaultValue;
  const num = parseInt(value, 10);
  return isNaN(num) ? defaultValue : num;
};

const clampPercentage = (value) => {
  const num = safeParseFloat(value, 0);
  return Math.min(Math.max(num, 0), 100);
};

const formatTime = (seconds) => {
  const secs = safeParseInt(seconds, 0);
  if (secs === 0) return '0s';
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs % 3600) / 60);
  const remainingSecs = Math.floor(secs % 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${remainingSecs}s`;
  } else {
    return `${remainingSecs}s`;
  }
};

const formatPercentage = (value) => {
  const percentage = clampPercentage(value);
  return `${percentage.toFixed(1)}%`;
};

const formatDate = (dateString) => {
  try {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return 'Invalid Date';
  }
};

// Custom hooks
const useFetchData = (url, options = {}, retries = 0) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    let retryCount = 0;
    let abortController = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, {
          credentials: 'include',
          signal: abortController.signal,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers
          },
          ...options
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (!isMounted) return;

        if (result.success) {
          // Validate and sanitize data
          const sanitizedData = sanitizeAnalyticsData(result.data);
          setData(sanitizedData);
          setError(null);
        } else {
          throw new Error(result.message || 'Failed to fetch data');
        }
      } catch (err) {
        if (!isMounted) return;
        
        if (err.name !== 'AbortError' && retryCount < retries) {
          retryCount++;
          setTimeout(fetchData, RETRY_DELAY * retryCount);
        } else if (err.name !== 'AbortError') {
          setError(err.message);
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [url, retries]);

  return { data, loading, error };
};

// Data sanitization function
const sanitizeAnalyticsData = (data) => {
  if (!data) return null;
  
  const sanitized = { ...data };
  
  // Sanitize summary
  if (sanitized.summary) {
    const summary = sanitized.summary;
    
    
    summary.overallPercentage = clampPercentage(summary.overallPercentage);
    summary.averageScore = safeParseFloat(summary.averageScore);
    summary.passPercentage = clampPercentage(summary.passPercentage);
    summary.participationRate = clampPercentage(summary.participationRate || 0);
    summary.highestScore = safeParseFloat(summary.highestScore);
    summary.lowestScore = safeParseFloat(summary.lowestScore);
    summary.averageQuizAttempts = safeParseFloat(summary.averageQuizAttempts, 1);
    summary.totalAttemptedQuizzes = safeParseInt(summary.totalAttemptedQuizzes);
    summary.totalRegisteredQuizzes = Math.max(
      safeParseInt(summary.totalRegisteredQuizzes),
      summary.totalAttemptedQuizzes
    );
    summary.passedQuizzes = safeParseInt(summary.passedQuizzes);
    summary.failedQuizzes = safeParseInt(summary.failedQuizzes);
    
    // Calculate attempted ratio if not provided
    if (!summary.attemptedRatio) {
      const total = summary.totalRegisteredQuizzes || 1;
      const attempted = summary.totalAttemptedQuizzes || 0;
      summary.attemptedRatio = `${Math.round((attempted / total) * 100)}%`;
    }
  }
  
  // Sanitize performance trend
  if (sanitized.performanceTrend?.recentPerformance) {
    sanitized.performanceTrend.recentPerformance = sanitized.performanceTrend.recentPerformance.map(item => ({
      ...item,
      percentage: clampPercentage(item.percentage),
      score: safeParseFloat(item.score),
      totalMarks: safeParseFloat(item.totalMarks),
      date: item.date || new Date().toISOString()
    }));
  }
  
  if (sanitized.performanceTrend?.monthlyPerformance) {
    sanitized.performanceTrend.monthlyPerformance = sanitized.performanceTrend.monthlyPerformance.map(item => ({
      ...item,
      averagePercentage: clampPercentage(item.averagePercentage),
      averageScore: safeParseFloat(item.averageScore),
      totalAttempts: safeParseInt(item.totalAttempts)
    }));
  }
  
  // Sanitize subject analysis
  if (sanitized.subjectWiseAnalysis) {
    sanitized.subjectWiseAnalysis = sanitized.subjectWiseAnalysis.map(item => ({
      ...item,
      subjectPercentage: clampPercentage(item.subjectPercentage),
      averageScore: safeParseFloat(item.averageScore),
      totalAttempts: safeParseInt(item.totalAttempts)
    }));
  }
  
  // Sanitize department analysis
  if (sanitized.departmentWiseAnalysis) {
    sanitized.departmentWiseAnalysis = sanitized.departmentWiseAnalysis.map(item => ({
      ...item,
      departmentPercentage: clampPercentage(item.departmentPercentage),
      averageScore: safeParseFloat(item.averageScore),
      totalAttempts: safeParseInt(item.totalAttempts)
    }));
  }
  
  // Sanitize quiz details
  if (sanitized.quizWiseDetails) {
    sanitized.quizWiseDetails = sanitized.quizWiseDetails.map(item => ({
      ...item,
      percentage: clampPercentage(item.percentage),
      bestScore: safeParseFloat(item.bestScore),
      latestScore: safeParseFloat(item.latestScore),
      totalMarks: safeParseFloat(item.totalMarks),
      attempts: safeParseInt(item.attempts),
      // Sanitize rank if it exists
      rank: item.rank ? {
        ...item.rank,
        position: safeParseInt(item.rank.position),
        totalParticipants: safeParseInt(item.rank.totalParticipants),
       
percentile: item.rank.percentile !== undefined ? 
  safeParseFloat(item.rank.percentile) : 
  calculatePercentile(item.rank.position, item.rank.totalParticipants)
      } : null
    }));
  }
  
  // Ensure student info has default values
  if (sanitized.studentInfo) {
    sanitized.studentInfo = {
      name: sanitized.studentInfo.name || 'Student',
      enrollmentNumber: sanitized.studentInfo.enrollmentNumber || 'N/A',
      department: sanitized.studentInfo.department || 'N/A',
      course: sanitized.studentInfo.course || 'N/A',
      semester: sanitized.studentInfo.semester || 'N/A',
      ...sanitized.studentInfo
    };
  }
  
  return sanitized;
};

// Loading and Error Components
const LoadingSkeleton = () => (
  <Box sx={{ p: 3 }}>
    <Grid container spacing={3}>
      {[...Array(8)].map((_, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <StyledCard sx={{ p: 3, height: 140 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress size={30} />
            </Box>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const ErrorDisplay = ({ error, onRetry }) => (
  <Box sx={{ p: 6, textAlign: 'center' }}>
    <ErrorOutline sx={{ fontSize: 80, color: 'error.main', mb: 3, opacity: 0.7 }} />
    <Typography variant="h5" color="error" gutterBottom sx={{ fontWeight: 600 }}>
      Unable to Load Analytics
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
      {error || 'There was an error loading your analytics data. Please try again.'}
    </Typography>
    {onRetry && (
      <Button
        variant="contained"
        size="large"
        startIcon={<Refresh />}
        onClick={onRetry}
        sx={{ borderRadius: 2, px: 4 }}
      >
        Retry Loading
      </Button>
    )}
  </Box>
);

const EmptyState = ({ message, icon: Icon = Info, action }) => (
  <Box sx={{ p: 8, textAlign: 'center' }}>
    <Icon sx={{ fontSize: 80, color: 'text.secondary', mb: 3, opacity: 0.5 }} />
    <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontWeight: 500 }}>
      {message}
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
      No analytics data available at the moment.
    </Typography>
    {action}
  </Box>
);

// Main Component
const StudentAnalytics = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // State management
  const [activeTab, setActiveTab] = useState(0);
  const [quizHistoryPage, setQuizHistoryPage] = useState(1);
  const [quizHistoryPageSize, setQuizHistoryPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [quizHistoryFilters, setQuizHistoryFilters] = useState({
    subject: '',
    sortBy: 'date',
    order: 'desc'
  });

  // Data fetching
  const {
    data: analyticsData,
    loading: analyticsLoading,
    error: analyticsError,
    refetch: refetchAnalytics
  } = useFetchData(
    `${API_BASE_URL}/${studentId}`,
    {},
    MAX_RETRIES
  );

  const {
    data: quizHistoryData,
    loading: quizHistoryLoading,
    error: quizHistoryError,
    refetch: refetchQuizHistory
  } = useFetchData(
    `${API_BASE_URL}/${studentId}/quiz-history?page=${quizHistoryPage}&limit=${quizHistoryPageSize}&subject=${quizHistoryFilters.subject}&sortBy=${quizHistoryFilters.sortBy}&order=${quizHistoryFilters.order}`
  );

  // Memoized calculations with proper validation
  const summaryMetrics = useMemo(() => {
    if (!analyticsData?.summary) return [];
    
    const { summary, studentInfo } = analyticsData;
    const overallPercentage = clampPercentage(summary.overallPercentage);
    const passPercentage = clampPercentage(summary.passPercentage);
    const participationRate = clampPercentage(summary.participationRate);
    
    // Calculate rank-related metrics
    const rankData = analyticsData?.quizWiseDetails?.filter(q => q.rank?.position) || [];
    const averageRank = rankData.length > 0 
      ? rankData.reduce((sum, q) => sum + q.rank.position, 0) / rankData.length 
      : null;
    const topRanks = rankData.filter(q => q.rank.position <= 3).length;
    
    return [
      {
        label: 'Overall Performance',
        value: formatPercentage(overallPercentage),
        icon: <Score sx={{ fontSize: 28 }} />,
        color: theme.palette.primary.main,
        description: 'Your overall score across all quizzes',
        trend: overallPercentage > 70 ? 'up' : overallPercentage > 50 ? 'stable' : 'down',
        subValue: `Avg: ${safeParseFloat(summary.averageScore).toFixed(1)}`
      },
      {
        label: 'Quiz Participation',
        value: `${summary.totalAttemptedQuizzes || 0}/${summary.totalRegisteredQuizzes || 0}`,
        icon: <Analytics sx={{ fontSize: 28 }} />,
        color: theme.palette.success.main,
        description: 'Quizzes attempted vs registered',
        subValue: `${summary.attemptedRatio || '0%'} participation`,
        progress: participationRate
      },
      {
        label: 'Success Rate',
        value: formatPercentage(passPercentage),
        icon: <CheckCircle sx={{ fontSize: 28 }} />,
        color: theme.palette.success.main,
        description: 'Quizzes passed successfully',
        subValue: `${summary.passedQuizzes || 0} passed, ${summary.failedQuizzes || 0} failed`,
        progress: passPercentage
      },
      {
        label: 'Average Rank',
        value: averageRank ? `#${averageRank.toFixed(1)}` : 'N/A',
        icon: <Leaderboard sx={{ fontSize: 28 }} />,
        color: averageRank && averageRank <= 10 ? '#FFD700' : 
               averageRank && averageRank <= 25 ? '#C0C0C0' : theme.palette.info.main,
        description: 'Average rank in attempted quizzes',
        subValue: topRanks > 0 ? `${topRanks} top 3 finishes` : 'No top ranks yet',
        trend: averageRank && averageRank <= 10 ? 'up' : 
               averageRank && averageRank <= 25 ? 'stable' : 'down'
      },
      {
        label: 'Highest Score',
        value: safeParseFloat(summary.highestScore).toFixed(1),
        icon: <VerticalAlignTop sx={{ fontSize: 28 }} />,
        color: theme.palette.warning.main,
        description: 'Your highest score in any quiz',
        subValue: `Lowest: ${safeParseFloat(summary.lowestScore).toFixed(1)}`
      },
      {
        label: 'Course Average',
        value: safeParseFloat(summary.averageScore).toFixed(1),
        icon: <Equalizer sx={{ fontSize: 28 }} />,
        color: theme.palette.secondary.main,
        description: 'Average score per quiz',
        subValue: `${studentInfo?.course || 'N/A'} • Sem ${studentInfo?.semester || 'N/A'}`
      },
      {
        label: 'Attempts per Quiz',
        value: safeParseFloat(summary.averageQuizAttempts, 1).toFixed(1),
        icon: <Numbers sx={{ fontSize: 28 }} />,
        color: theme.palette.error.main,
        description: 'Average attempts per registered quiz',
        subValue: 'Multiple attempts show dedication!'
      },
      {
        label: 'Performance Trend',
        value: (() => {
          const latest = analyticsData?.performanceTrend?.recentPerformance?.[0];
          if (!latest) return 'N/A';
          return formatPercentage(latest.percentage);
        })(),
        icon: (() => {
          const latest = analyticsData?.performanceTrend?.recentPerformance?.[0];
          const percentage = clampPercentage(latest?.percentage);
          if (percentage >= 70) return <TrendingUp sx={{ fontSize: 28 }} />;
          if (percentage >= 50) return <TrendingFlat sx={{ fontSize: 28 }} />;
          return <TrendingDown sx={{ fontSize: 28 }} />;
        })(),
        color: (() => {
          const latest = analyticsData?.performanceTrend?.recentPerformance?.[0];
          const percentage = clampPercentage(latest?.percentage);
          if (percentage >= 70) return theme.palette.success.main;
          if (percentage >= 50) return theme.palette.warning.main;
          return theme.palette.error.main;
        })(),
        description: 'Latest quiz performance',
        subValue: (() => {
          const latest = analyticsData?.performanceTrend?.recentPerformance?.[0];
          if (!latest) return 'Recent attempt score';
          const percentage = clampPercentage(latest.percentage);
          const status = percentage >= 70 ? 'Excellent' : 
                        percentage >= 50 ? 'Good' : 'Needs Improvement';
          return `${status} • ${latest.quizTitle || 'Recent Quiz'}`;
        })()
      }
    ];
  }, [analyticsData, theme]);

  const performanceChartData = useMemo(() => {
    if (!analyticsData?.performanceTrend?.recentPerformance?.length) return [];
    return analyticsData.performanceTrend.recentPerformance.slice(0, 5).map((item, index) => ({
      name: `Quiz ${index + 1}`,
      score: safeParseFloat(item.score),
      percentage: clampPercentage(item.percentage),
      total: safeParseFloat(item.totalMarks),
      date: formatDate(item.date),
      quizTitle: item.quizTitle || `Quiz ${index + 1}`
    }));
  }, [analyticsData]);

  const monthlyPerformanceData = useMemo(() => {
    if (!analyticsData?.performanceTrend?.monthlyPerformance) return [];
    return analyticsData.performanceTrend.monthlyPerformance.map(item => ({
      month: item.month?.split('-')[1] || 'MM',
      percentage: clampPercentage(item.averagePercentage),
      attempts: safeParseInt(item.totalAttempts),
      score: safeParseFloat(item.averageScore)
    }));
  }, [analyticsData]);

  const subjectChartData = useMemo(() => {
    if (!analyticsData?.subjectWiseAnalysis) return [];
    return analyticsData.subjectWiseAnalysis.map((subject, index) => ({
      name: subject.subject || `Subject ${index + 1}`,
      value: clampPercentage(subject.subjectPercentage),
      attempts: safeParseInt(subject.totalAttempts),
      color: COLORS[index % COLORS.length]
    }));
  }, [analyticsData]);

  const departmentChartData = useMemo(() => {
    if (!analyticsData?.departmentWiseAnalysis) return [];
    return analyticsData.departmentWiseAnalysis.map((dept, index) => ({
      name: dept.department || `Department ${index + 1}`,
      percentage: clampPercentage(dept.departmentPercentage),
      attempts: safeParseInt(dept.totalAttempts),
      score: safeParseFloat(dept.averageScore)
    }));
  }, [analyticsData]);

  const quizPerformanceData = useMemo(() => {
    if (!analyticsData?.quizWiseDetails) return [];
    return analyticsData.quizWiseDetails.slice(0, 10).map(quiz => ({
      name: (quiz.title || 'Quiz').substring(0, 15) + (quiz.title?.length > 15 ? '...' : ''),
      best: safeParseFloat(quiz.bestScore),
      latest: safeParseFloat(quiz.latestScore),
      total: safeParseFloat(quiz.totalMarks),
      attempts: safeParseInt(quiz.attempts),
      percentage: clampPercentage(quiz.percentage),
      passed: Boolean(quiz.isPassed),
      rank: quiz.rank?.position || null
    }));
  }, [analyticsData]);

  // Score Distribution Data
  const scoreDistributionData = useMemo(() => {
    try {
      if (!analyticsData?.quizWiseDetails?.length) return [];
      
      const ranges = [
        { 
          range: '0-20', 
          min: 0, 
          max: 20, 
          count: 0, 
          color: '#ff4444',
          label: 'Need Help',
          description: 'Urgent improvement needed'
        },
        { 
          range: '21-40', 
          min: 21, 
          max: 40, 
          count: 0, 
          color: '#ffbb33',
          label: 'Needs Practice',
          description: 'More practice required'
        },
        { 
          range: '41-60', 
          min: 41, 
          max: 60, 
          count: 0, 
          color: '#00C851',
          label: 'Average',
          description: 'Good, can improve more'
        },
        { 
          range: '61-80', 
          min: 61, 
          max: 80, 
          count: 0, 
          color: '#33b5e5',
          label: 'Good',
          description: 'Solid performance'
        },
        { 
          range: '81-100', 
          min: 81, 
          max: 100, 
          count: 0, 
          color: '#4285F4',
          label: 'Excellent',
          description: 'Outstanding work!'
        }
      ];
      
      analyticsData.quizWiseDetails.forEach(quiz => {
        try {
          const percentage = clampPercentage(quiz.percentage);
          const range = ranges.find(r => percentage >= r.min && percentage <= r.max);
          if (range) {
            range.count++;
          }
        } catch (err) {
          console.warn('Error processing quiz:', quiz, err);
        }
      });
      
      return ranges;
    } catch (error) {
      console.error('Error creating score distribution data:', error);
      return [];
    }
  }, [analyticsData]);

  // Event handlers
  const handleTabChange = useCallback((event, newValue) => {
    setActiveTab(newValue);
  }, []);

  const handleQuizHistoryPageChange = useCallback((event, page) => {
    setQuizHistoryPage(page);
  }, []);

  const handleQuizHistoryPageSizeChange = useCallback((event) => {
    setQuizHistoryPageSize(event.target.value);
    setQuizHistoryPage(1);
  }, []);

  const handleFilterChange = useCallback((filter, value) => {
    setQuizHistoryFilters(prev => ({ ...prev, [filter]: value }));
    setQuizHistoryPage(1);
  }, []);

  const handleViewQuizDetails = useCallback((quizId) => {
    if (!quizId) return;
    navigate(`/quiz/${quizId}/details`);
  }, [navigate]);

  const handleViewAttemptDetails = useCallback((attemptId) => {
    if (!attemptId) return;
    navigate(`/attempt/${attemptId}/review`);
  }, [navigate]);

  const handleRefresh = useCallback(() => {
    refetchAnalytics();
    refetchQuizHistory();
  }, [refetchAnalytics, refetchQuizHistory]);

  const handleExportData = useCallback(() => {
    if (!analyticsData) return;
    
    try {
      const exportData = {
        ...analyticsData,
        exportedAt: new Date().toISOString(),
        studentId,
        summary: {
          ...analyticsData.summary,
          overallPercentage: formatPercentage(analyticsData.summary.overallPercentage),
          passPercentage: formatPercentage(analyticsData.summary.passPercentage)
        }
      };
      
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      const exportFileDefaultName = `student-analytics-${studentId}-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      document.body.appendChild(linkElement);
      linkElement.click();
      document.body.removeChild(linkElement);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export data. Please try again.');
    }
  }, [analyticsData, studentId]);

  // Render components
  const renderMetricCard = useCallback((metric, index) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
      <MetricCard color={metric.color}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
          <Box sx={{ 
            color: metric.color, 
            mr: 1.5,
            p: 1,
            borderRadius: 2,
            bgcolor: alpha(metric.color, 0.1)
          }}>
            {metric.icon}
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              {metric.label}
            </Typography>
            <Typography variant="h5" component="div" sx={{ fontWeight: 700, mt: 0.5 }}>
              {metric.value}
            </Typography>
          </Box>
        </Box>
        
        {metric.description && (
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
            {metric.description}
          </Typography>
        )}

        {metric.subValue && (
          <Typography variant="caption" sx={{ 
            color: metric.color, 
            fontWeight: 500,
            display: 'block',
            mt: 0.5
          }}>
            {metric.subValue}
          </Typography>
        )}
        
        {metric.progress !== undefined && (
          <Box sx={{ mt: 1.5 }}>
            <ProgressBar 
              variant="determinate" 
              value={metric.progress} 
              customcolor={metric.color}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              {metric.progress.toFixed(1)}%
            </Typography>
          </Box>
        )}
        
        {metric.trend && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            {metric.trend === 'up' ? (
              <TrendingUp sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
            ) : metric.trend === 'stable' ? (
              <TrendingFlat sx={{ color: 'warning.main', fontSize: 16, mr: 0.5 }} />
            ) : (
              <TrendingDown sx={{ color: 'error.main', fontSize: 16, mr: 0.5 }} />
            )}
            <Typography variant="caption" sx={{ 
              color: metric.trend === 'up' ? 'success.main' : 
                     metric.trend === 'stable' ? 'warning.main' : 'error.main',
              fontWeight: 500
            }}>
              {metric.trend === 'up' ? 'Improving' : 
               metric.trend === 'stable' ? 'Stable' : 'Needs Focus'}
            </Typography>
          </Box>
        )}
      </MetricCard>
    </Grid>
  ), [theme]);

  const renderPerformanceChart = useCallback(() => (
    <StyledCard sx={{ p: 3, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <ShowChart sx={{ mr: 1.5, color: 'primary.main' }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Performance Trend (Last 5 Quizzes)
        </Typography>
      </Box>
      
      {performanceChartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.text.secondary, 0.1)} />
            <XAxis 
              dataKey="name" 
              stroke={theme.palette.text.secondary}
              fontSize={12}
            />
            <YAxis 
              stroke={theme.palette.text.secondary}
              fontSize={12}
              domain={[0, 100]}
              label={{ 
                value: 'Score (%)', 
                angle: -90, 
                position: 'insideLeft',
                offset: -10,
                style: { fill: theme.palette.text.secondary }
              }}
            />
            <RechartsTooltip 
              formatter={(value, name) => {
                if (name === 'percentage') return [`${value}%`, 'Score %'];
                if (name === 'score') return [value.toFixed(1), 'Raw Score'];
                return [value, name];
              }}
              labelFormatter={(label) => {
                const data = performanceChartData.find(d => d.name === label);
                return data ? `${data.quizTitle}\n${data.date}` : label;
              }}
              contentStyle={{
                borderRadius: 8,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: theme.shadows[3],
                backgroundColor: theme.palette.background.paper
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="percentage" 
              stroke={theme.palette.primary.main} 
              strokeWidth={3}
              dot={{ r: 6 }}
              activeDot={{ r: 8 }}
              name="Score %"
            />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke={theme.palette.secondary.main} 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Raw Score"
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <EmptyState message="No recent quiz performance data" />
      )}
    </StyledCard>
  ), [performanceChartData, theme]);

  const renderSubjectAnalysis = useCallback(() => (
    <StyledCard sx={{ p: 3, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <DonutLarge sx={{ mr: 1.5, color: 'secondary.main' }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Subject-wise Performance
        </Typography>
      </Box>
      
      {subjectChartData.length > 0 ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={subjectChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {subjectChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  formatter={(value) => [`${value}%`, 'Score']}
                  contentStyle={{
                    borderRadius: 8,
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: theme.shadows[3],
                    backgroundColor: theme.palette.background.paper
                  }}
                />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
              {analyticsData?.subjectWiseAnalysis?.map((subject, index) => {
                const percentage = clampPercentage(subject.subjectPercentage);
                return (
                  <Box key={index} sx={{ mb: 2, p: 2, bgcolor: alpha(COLORS[index % COLORS.length], 0.05), borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {subject.subject || `Subject ${index + 1}`}
                      </Typography>
                      <Chip 
                        label={formatPercentage(percentage)} 
                        size="small" 
                        color={percentage > 70 ? 'success' : percentage > 50 ? 'warning' : 'error'}
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        {subject.totalAttempts || 0} attempt{subject.totalAttempts !== 1 ? 's' : ''}
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>
                        Avg: {safeParseFloat(subject.averageScore).toFixed(1)}
                      </Typography>
                    </Box>
                    
                    <ProgressBar 
                      variant="determinate" 
                      value={percentage} 
                      customcolor={percentage > 70 ? theme.palette.success.main : 
                                 percentage > 50 ? theme.palette.warning.main : 
                                 theme.palette.error.main}
                      sx={{ mt: 1 }}
                    />
                  </Box>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      ) : (
        <EmptyState message="No subject-wise analysis available" />
      )}
    </StyledCard>
  ), [analyticsData, subjectChartData, theme]);

  const renderMonthlyTrend = useCallback(() => (
    <StyledCard sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <TimelineIcon sx={{ mr: 1.5, color: 'info.main' }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Monthly Performance Trend
        </Typography>
      </Box>
      
      {monthlyPerformanceData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={monthlyPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.text.secondary, 0.1)} />
            <XAxis 
              dataKey="month" 
              stroke={theme.palette.text.secondary}
              fontSize={12}
            />
            <YAxis 
              stroke={theme.palette.text.secondary}
              fontSize={12}
              domain={[0, 100]}
              label={{ 
                value: 'Score (%)', 
                angle: -90, 
                position: 'insideLeft',
                offset: -10,
                style: { fill: theme.palette.text.secondary }
              }}
            />
            <RechartsTooltip 
              formatter={(value) => [`${value.toFixed(1)}%`, 'Score']}
              contentStyle={{
                borderRadius: 8,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: theme.shadows[3],
                backgroundColor: theme.palette.background.paper
              }}
            />
            <Area 
              type="monotone" 
              dataKey="percentage" 
              stroke={theme.palette.info.main} 
              fill={alpha(theme.palette.info.main, 0.3)}
              strokeWidth={2}
              name="Average Score %"
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <EmptyState message="No monthly performance data available" />
      )}
    </StyledCard>
  ), [monthlyPerformanceData, theme]);

  const renderQuizComparison = useCallback(() => (
    <StyledCard sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <CompareArrows sx={{ mr: 1.5, color: 'warning.main' }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Quiz Performance Comparison
        </Typography>
      </Box>
      
      {quizPerformanceData.length > 0 ? (
        <ResponsiveContainer width="100%" height={350}>
          <RechartsBarChart data={quizPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.text.secondary, 0.1)} />
            <XAxis 
              dataKey="name" 
              stroke={theme.palette.text.secondary}
              fontSize={11}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke={theme.palette.text.secondary}
              fontSize={12}
            />
            <RechartsTooltip 
              formatter={(value, name) => {
                if (name === 'best') return [value.toFixed(1), 'Best Score'];
                if (name === 'latest') return [value.toFixed(1), 'Latest Score'];
                if (name === 'percentage') return [`${value.toFixed(1)}%`, 'Latest %'];
                if (name === 'rank') return [`#${value}`, 'Rank'];
                return [value, name];
              }}
              contentStyle={{
                borderRadius: 8,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: theme.shadows[3],
                backgroundColor: theme.palette.background.paper
              }}
            />
            <Legend />
            <Bar 
              dataKey="best" 
              fill={theme.palette.success.main} 
              name="Best Score" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="latest" 
              fill={theme.palette.primary.main} 
              name="Latest Score" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="attempts" 
              fill={theme.palette.info.main} 
              name="Attempts" 
              radius={[4, 4, 0, 0]}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      ) : (
        <EmptyState message="No quiz performance data available" />
      )}
    </StyledCard>
  ), [quizPerformanceData, theme]);

  const renderScoreDistribution = useCallback(() => (
    <StyledCard sx={{ p: 3, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <BarChart sx={{ mr: 1.5, color: 'primary.main' }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Your Score Distribution
        </Typography>
      </Box>
      
      {scoreDistributionData.length > 0 && scoreDistributionData.some(d => d.count > 0) ? (
        <Box>
          {/* Main Visualization */}
          <ResponsiveContainer width="100%" height={250}>
            <RechartsBarChart data={scoreDistributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.text.secondary, 0.1)} />
              <XAxis 
                dataKey="range" 
                stroke={theme.palette.text.secondary}
                fontSize={12}
                label={{ 
                  value: 'Score Ranges', 
                  position: 'insideBottom',
                  offset: -5,
                  style: { fill: theme.palette.text.secondary }
                }}
              />
              <YAxis 
                stroke={theme.palette.text.secondary}
                fontSize={12}
                label={{ 
                  value: 'Number of Quizzes', 
                  angle: -90, 
                  position: 'insideLeft',
                  offset: -10,
                  style: { fill: theme.palette.text.secondary }
                }}
              />
              <RechartsTooltip 
                formatter={(value, name, props) => {
                  if (!props || typeof props.dataIndex !== 'number') {
                    return [`${value} quizzes`, 'Number of Quizzes'];
                  }
                  
                  const dataIndex = props.dataIndex;
                  if (dataIndex < 0 || dataIndex >= scoreDistributionData.length) {
                    return [`${value} quizzes`, 'Number of Quizzes'];
                  }
                  
                  const range = scoreDistributionData[dataIndex];
                  if (!range) {
                    return [`${value} quizzes`, 'Number of Quizzes'];
                  }
                  
                  const totalQuizzes = scoreDistributionData.reduce((sum, d) => sum + d.count, 0);
                  const percentage = totalQuizzes > 0 ? Math.round((range.count / totalQuizzes) * 100) : 0;
                  return [`${value} quizzes (${percentage}%)`, 'Number of Quizzes'];
                }}
                labelFormatter={(label) => {
                  if (!label) return 'Score Range';
                  
                  const range = scoreDistributionData.find(d => d.range === label);
                  if (!range) return `${label}%`;
                  
                  const performanceLevels = {
                    '0-20': 'Needs Urgent Improvement',
                    '21-40': 'Needs Practice',
                    '41-60': 'Average Performance',
                    '61-80': 'Good Performance',
                    '81-100': 'Excellent Performance'
                  };
                  
                  return `${label}% - ${performanceLevels[label] || 'Performance Range'}`;
                }}
                contentStyle={{
                  borderRadius: 8,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: theme.shadows[3],
                  backgroundColor: theme.palette.background.paper
                }}
              />
              <Bar 
                dataKey="count" 
                name="Number of Quizzes"
                radius={[4, 4, 0, 0]}
              >
                {scoreDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </RechartsBarChart>
          </ResponsiveContainer>
          
          {/* Improved Analysis Section */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ 
              fontWeight: 600, 
              color: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <Insights fontSize="small" />
              Your Performance Analysis
            </Typography>
            
            {/* Performance Summary Cards */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {(() => {
                const totalQuizzes = scoreDistributionData.reduce((sum, d) => sum + (d?.count || 0), 0);
                const weakQuizzes = (scoreDistributionData[0]?.count || 0) + (scoreDistributionData[1]?.count || 0);
                const strongQuizzes = (scoreDistributionData[3]?.count || 0) + (scoreDistributionData[4]?.count || 0);
                
                return [
                  {
                    label: 'Total Quizzes',
                    value: totalQuizzes,
                    color: theme.palette.primary.main,
                    icon: <Numbers />
                  },
                  {
                    label: 'Quizzes Below 40%',
                    value: weakQuizzes,
                    color: theme.palette.error.main,
                    icon: <Warning />,
                    description: weakQuizzes > 0 ? 'Need more practice' : 'Great! None in this range'
                  },
                  {
                    label: 'Quizzes Above 60%',
                    value: strongQuizzes,
                    color: theme.palette.success.main,
                    icon: <TrendingUp />,
                    description: strongQuizzes > 0 ? 'Great work!' : 'Aim for higher scores'
                  }
                ];
              })().map((stat, index) => (
                <Grid item xs={4} key={index}>
                  <Box sx={{ 
                    p: 2, 
                    bgcolor: alpha(stat.color, 0.1),
                    borderRadius: 2,
                    textAlign: 'center',
                    border: `1px solid ${alpha(stat.color, 0.2)}`,
                    height: '100%'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                      {React.cloneElement(stat.icon, { 
                        sx: { color: stat.color, fontSize: 20, mr: 1 } 
                      })}
                      <Typography variant="h6" sx={{ 
                        fontWeight: 700, 
                        color: stat.color 
                      }}>
                        {stat.value}
                      </Typography>
                    </Box>
                    <Typography variant="caption" sx={{ fontWeight: 500, display: 'block' }}>
                      {stat.label}
                    </Typography>
                    {stat.description && (
                      <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 0.5 }}>
                        {stat.description}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
            
            {/* Performance Breakdown with Visual Indicators */}
            <Box>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                Performance Breakdown
              </Typography>
              
              <Grid container spacing={1}>
                {scoreDistributionData.map((range, index) => {
                  if (!range) return null;
                  
                  const totalQuizzes = scoreDistributionData.reduce((sum, d) => sum + (d?.count || 0), 0);
                  const percentage = totalQuizzes > 0 ? Math.round((range.count / totalQuizzes) * 100) : 0;
                  
                  const performanceLabels = {
                    '0-20': { 
                      label: 'Need Help', 
                      icon: <ErrorOutline fontSize="small" />,
                      advice: 'Focus on basics, seek help from teacher'
                    },
                    '21-40': { 
                      label: 'Needs Practice', 
                      icon: <Warning fontSize="small" />,
                      advice: 'Practice more, review concepts'
                    },
                    '41-60': { 
                      label: 'Average', 
                      icon: <Equalizer fontSize="small" />,
                      advice: 'Good, aim for consistent improvement'
                    },
                    '61-80': { 
                      label: 'Good', 
                      icon: <CheckCircle fontSize="small" />,
                      advice: 'Excellent! Maintain this level'
                    },
                    '81-100': { 
                      label: 'Excellent', 
                      icon: <EmojiEvents fontSize="small" />,
                      advice: 'Outstanding! Help others learn'
                    }
                  };
                  
                  const performance = performanceLabels[range.range] || { 
                    label: 'Performance', 
                    icon: null, 
                    advice: 'Keep working hard!' 
                  };
                  
                  return (
                    <Grid item xs={12} key={index}>
                      <Box sx={{ 
                        mb: 2, 
                        p: 2, 
                        borderRadius: 2,
                        bgcolor: alpha(range.color, 0.1),
                        borderLeft: `4px solid ${range.color}`,
                        opacity: range.count > 0 ? 1 : 0.7
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ 
                              width: 12, 
                              height: 12, 
                              borderRadius: '50%', 
                              bgcolor: range.color 
                            }} />
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {range.range}% - {performance.label}
                            </Typography>
                            {performance.icon && React.cloneElement(performance.icon, { 
                              sx: { fontSize: 16, color: range.color } 
                            })}
                          </Box>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                            {range.count} {range.count === 1 ? 'quiz' : 'quizzes'} ({percentage}%)
                          </Typography>
                        </Box>
                        
                        {/* Progress Bar with Percentage */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                          <Box sx={{ flexGrow: 1 }}>
                            <LinearProgress 
                              variant="determinate" 
                              value={percentage} 
                              sx={{ 
                                height: 8, 
                                borderRadius: 4,
                                backgroundColor: alpha(range.color, 0.2),
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: range.color,
                                  borderRadius: 4
                                }
                              }}
                            />
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            {percentage}% of your quizzes
                          </Typography>
                        </Box>
                        
                        {/* Advice for this range */}
                        <Box sx={{ 
                          mt: 1.5, 
                          p: 1.5, 
                          bgcolor: alpha(theme.palette.primary.main, 0.05),
                          borderRadius: 1
                        }}>
                          <Typography variant="caption" sx={{ 
                            display: 'flex', 
                            alignItems: 'flex-start',
                            gap: 1,
                            color: 'text.secondary'
                          }}>
                            <Lightbulb fontSize="small" sx={{ color: 'warning.main', mt: 0.2 }} />
                            <span>
                              <strong>Advice:</strong> {performance.advice}
                            </span>
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
            
            {/* Overall Performance Insight */}
            {(() => {
              const totalQuizzes = scoreDistributionData.reduce((sum, d) => sum + (d?.count || 0), 0);
              if (totalQuizzes === 0) return null;
              
              const weakCount = (scoreDistributionData[0]?.count || 0) + (scoreDistributionData[1]?.count || 0);
              const strongCount = (scoreDistributionData[3]?.count || 0) + (scoreDistributionData[4]?.count || 0);
              const weakPercentage = (weakCount / totalQuizzes) * 100;
              const strongPercentage = (strongCount / totalQuizzes) * 100;
              
              let insight = '';
              let icon = <Info color="info" />;
              let colorName = 'info';
              
              if (strongPercentage > 50) {
                insight = 'Excellent! Most of your quizzes are above 60%. Keep up the great work!';
                icon = <EmojiEvents color="success" />;
                colorName = 'success';
              } else if (weakPercentage > 40) {
                insight = 'You need to focus on improving. Try to move more quizzes to the 61-100% range.';
                icon = <Warning color="warning" />;
                colorName = 'warning';
              } else {
                insight = 'Your performance is balanced. Focus on moving more quizzes to higher score ranges.';
              }
              
              return (
                <Box sx={{ 
                  mt: 3, 
                  p: 2, 
                  bgcolor: alpha(theme.palette[colorName].main, 0.1),
                  borderRadius: 2,
                  border: `1px solid ${alpha(theme.palette[colorName].main, 0.2)}`
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    {icon}
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5, color: `${colorName}.main` }}>
                        Your Performance Insight
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {insight}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })()}
          </Box>
        </Box>
      ) : (
        <EmptyState 
          message="No score distribution data available"
          icon={Assessment}
          action={
            <Button 
              variant="outlined" 
              size="small"
              startIcon={<Refresh />}
              onClick={handleRefresh}
            >
              Refresh Data
            </Button>
          }
        />
      )}
    </StyledCard>
  ), [scoreDistributionData, theme, handleRefresh]);

  const renderImprovementAreas = useCallback(() => {
    if (!analyticsData?.improvementAreas?.length) {
      return (
        <StyledCard sx={{ p: 3, textAlign: 'center' }}>
          <CheckCircle sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
          <Typography variant="h6" color="success.main" gutterBottom sx={{ fontWeight: 600 }}>
            Excellent Progress!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            No major improvement areas identified. Keep up the excellent work!
          </Typography>
        </StyledCard>
      );
    }

    return (
      <StyledCard sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <RocketLaunch sx={{ mr: 1.5, color: 'warning.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Areas for Improvement
          </Typography>
        </Box>
        
        <Grid container spacing={2}>
          {analyticsData.improvementAreas.map((area, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Warning color="warning" sx={{ mr: 1.5, mt: 0.5 }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" color="warning.main" gutterBottom sx={{ fontWeight: 600 }}>
                      {area.area || 'Improvement Area'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      <strong>Current Status:</strong> {area.currentPercentage || area.currentAverage || 'N/A'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'primary.main', fontStyle: 'italic' }}>
                      💡 {area.recommendation || 'Focus on improving this area'}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </StyledCard>
    );
  }, [analyticsData]);

  const renderRecommendations = useCallback(() => {
    if (!analyticsData?.recommendations?.length) {
      return (
        <StyledCard sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Personalized Recommendations
          </Typography>
          <Typography variant="body2" color="text.secondary">
            No recommendations available at the moment.
          </Typography>
        </StyledCard>
      );
    }

    return (
      <StyledCard sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Lightbulb sx={{ mr: 1.5, color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Personalized Recommendations
          </Typography>
        </Box>
        
        <Stack spacing={2}>
          {analyticsData.recommendations.map((rec, index) => (
            <Card key={index} variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {rec.priority === 'High' ? (
                    <Warning color="error" />
                  ) : rec.priority === 'Medium' ? (
                    <Info color="warning" />
                  ) : (
                    <CheckCircle color="success" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {rec.type || 'Recommendation'}
                      </Typography>
                      <Chip 
                        label={rec.priority || 'Medium'} 
                        size="small" 
                        color={
                          rec.priority === 'High' ? 'error' : 
                          rec.priority === 'Medium' ? 'warning' : 'success'
                        }
                      />
                    </Box>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {rec.message || 'No specific message provided.'}
                    </Typography>
                  }
                />
              </Box>
            </Card>
          ))}
        </Stack>
      </StyledCard>
    );
  }, [analyticsData]);

  const renderRankSummary = useCallback(() => {
    if (!quizHistoryData?.attempts?.length) return null;
    
    // Calculate rank statistics
    const ranks = quizHistoryData.attempts
      .filter(attempt => attempt.rank?.position)
      .map(attempt => ({
        position: attempt.rank.position,
        total: attempt.rank.totalParticipants,
        quizTitle: attempt.quizTitle
      }));
    
    if (ranks.length === 0) return null;
    
    const averageRank = ranks.reduce((sum, rank) => sum + rank.position, 0) / ranks.length;
    const bestRank = Math.min(...ranks.map(r => r.position));
    const worstRank = Math.max(...ranks.map(r => r.position));
    
    // Count ranks by category
    const rankCategories = {
      top1: ranks.filter(r => r.position === 1).length,
      top3: ranks.filter(r => r.position <= 3).length,
      top10: ranks.filter(r => r.position <= 10).length,
      top25: ranks.filter(r => r.position <= 25).length
    };
    
    return (
      <StyledCard sx={{ p: 3, height: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <EmojiEvents sx={{ mr: 1.5, color: 'warning.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Rank Performance Summary
          </Typography>
        </Box>
        
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: alpha('#FFD700', 0.1), borderRadius: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#B8860B' }}>
                {rankCategories.top1 || 0}
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                1st Positions
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: alpha('#C0C0C0', 0.1), borderRadius: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#808080' }}>
                {rankCategories.top3 || 0}
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                Top 3 Ranks
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: alpha('#CD7F32', 0.1), borderRadius: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#8B4513' }}>
                {rankCategories.top10 || 0}
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                Top 10 Ranks
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: alpha('#4285F4', 0.1), borderRadius: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                {ranks.length || 0}
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                Total Ranked
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            Rank Distribution
          </Typography>
          <Box sx={{ p: 2, bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ 
                    width: 12, 
                    height: 12, 
                    borderRadius: '50%', 
                    bgcolor: '#FFD700',
                    mr: 1
                  }} />
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>
                    Best Rank
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#FFD700', pl: 3 }}>
                  #{bestRank || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ 
                    width: 12, 
                    height: 12, 
                    borderRadius: '50%', 
                    bgcolor: '#4285F4',
                    mr: 1
                  }} />
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>
                    Average Rank
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', pl: 3 }}>
                  #{averageRank.toFixed(1) || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ 
                    width: 12, 
                    height: 12, 
                    borderRadius: '50%', 
                    bgcolor: '#FF6B6B',
                    mr: 1
                  }} />
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>
                    Worst Rank
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#FF6B6B', pl: 3 }}>
                  #{worstRank || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ 
                    width: 12, 
                    height: 12, 
                    borderRadius: '50%', 
                    bgcolor: '#00C851',
                    mr: 1
                  }} />
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>
                    Ranked Quizzes
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'success.main', pl: 3 }}>
                  {ranks.length}/{quizHistoryData.attempts.length}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
        {ranks.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              📊 You consistently rank in the top {Math.round((ranks.filter(r => r.position <= 10).length / ranks.length) * 100)}% of participants
            </Typography>
          </Box>
        )}
      </StyledCard>
    );
  }, [quizHistoryData, theme]);

  const renderQuizHistory = useCallback(() => {
    if (!quizHistoryData?.attempts?.length && !quizHistoryLoading) {
      return <EmptyState message="No quiz history available" />;
    }

    return (
      <Box>
        {/* Filters */}
        <StyledCard sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <TextField
                select
                fullWidth
                size="small"
                label="Subject"
                value={quizHistoryFilters.subject}
                onChange={(e) => handleFilterChange('subject', e.target.value)}
              >
                <MenuItem value="">All Subjects</MenuItem>
                {[...new Set(quizHistoryData?.attempts?.map(a => a.subject) || [])]
                  .filter(Boolean)
                  .map(subject => (
                    <MenuItem key={subject} value={subject}>
                      {subject}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                select
                fullWidth
                size="small"
                label="Sort By"
                value={quizHistoryFilters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              >
                <MenuItem value="date">Date (Recent First)</MenuItem>
                <MenuItem value="score">Score (High to Low)</MenuItem>
                <MenuItem value="time">Time Taken</MenuItem>
                <MenuItem value="rank">Rank (Best First)</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                select
                fullWidth
                size="small"
                label="Order"
                value={quizHistoryFilters.order}
                onChange={(e) => handleFilterChange('order', e.target.value)}
              >
                <MenuItem value="desc">Descending</MenuItem>
                <MenuItem value="asc">Ascending</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Per Page</InputLabel>
                <Select
                  value={quizHistoryPageSize}
                  label="Per Page"
                  onChange={handleQuizHistoryPageSizeChange}
                >
                  {ITEMS_PER_PAGE_OPTIONS.map(option => (
                    <MenuItem key={option} value={option}>
                      {option} items
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </StyledCard>

        {/* Table */}
        {quizHistoryLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer component={StyledCard}>
              <Table size={isMobile ? "small" : "medium"}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Quiz Title</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Subject</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>Score</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>Percentage</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Rank</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Time Taken</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {quizHistoryData.attempts.map((attempt, index) => {
                    const score = safeParseFloat(attempt.score);
                    const totalMarks = safeParseFloat(attempt.totalMarks);
                    const percentage = totalMarks > 0 ? (score / totalMarks) * 100 : 0;
                    const isPassed = percentage >= 50;
                    const rank = attempt.rank?.position || 0;
                    const totalParticipants = attempt.rank?.totalParticipants || 0;
                    
                    // Rank visualization logic
                    const getRankBadge = (rank, totalParticipants) => {
                      if (!rank || !totalParticipants || totalParticipants === 0) {
                        return <Chip label="N/A" size="small" variant="outlined" />;
                      }
                      
                      const rankText = `${rank}/${totalParticipants}`;
                      let chipProps = {};
                      
                      if (rank === 1) {
                        chipProps = {
                          icon: <EmojiEvents />,
                          color: 'warning',
                          label: `🥇 ${rankText}`,
                          sx: { 
                           
                              bgcolor: '#350fb0ff', // Brighter gold background
                              color: '#ffffffff',
                            fontWeight: 700
                          }
                        };
                      } else if (rank === 2) {
                        chipProps = {
                          icon: <EmojiEvents />,
                          color: 'secondary',
                          label: `🥈 ${rankText}`,
                          sx: { 
                            bgcolor:'#4417d7ff',
                            color: '#deeae3ff',
                            fontWeight: 600
                          }
                        };
                      } else if (rank === 3) {
                        chipProps = {
                          icon: <EmojiEvents />,
                          color: 'primary',
                          color:'success',
                          label: `🥉 ${rankText}`,
                          sx: { 
                            bgcolor:'#491be0ff',
                            color: '#deeae3ff',
                            fontWeight: 600
                          }
                        };
                      } else if (rank <= 10) {
                        chipProps = {
                          label: `🏅 ${rankText}`,
                          color: 'success',
                          sx: { 
                            
                             bgcolor:'#4217ceff',
                            color: '#deeae3ff',
                            fontWeight: 600 
                          
                          }
                        };
                      } else if (rank <= 25) {
                        chipProps = {
                          label: `⭐ ${rankText}`,
                          color: 'info',
                          sx: {
                             bgcolor:'#3f15c8ff',
                            color: '#deeae3ff',
                             fontWeight: 500 
                            }
                        };
                      } else {
                        chipProps = {
                          label: rankText,
                          variant: 'outlined'
                        };
                      }
                      
                      return <Chip size="small" {...chipProps} />;
                    };

                    return (
                      <TableRow 
                        key={attempt.attemptId || index}
                        sx={{ 
                          '&:hover': { 
                            backgroundColor: alpha(theme.palette.primary.main, 0.04) 
                          }
                        }}
                      >
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {attempt.quizTitle || 'Untitled Quiz'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={attempt.subject || 'N/A'} 
                            size="small" 
                            icon={<SubjectIcon />}
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {score.toFixed(1)}/{totalMarks.toFixed(1)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <ProgressBar 
                              variant="determinate" 
                              value={Math.min(percentage, 100)} 
                              customcolor={isPassed ? theme.palette.success.main : theme.palette.error.main}
                              sx={{ width: 60, mr: 1 }}
                            />
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                fontWeight: 600,
                                color: isPassed ? 'success.main' : 'error.main'
                              }}
                            >
                              {formatPercentage(percentage)}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {getRankBadge(rank, totalParticipants)}
                            

                            {rank && totalParticipants && (
  <Tooltip title={`Ranked #${rank} of ${totalParticipants} participants`}>
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center',
      color: 'text.secondary',
      fontSize: '0.85rem'
    }}>
      {rank === 1 ? (
        <>
          <EmojiEvents fontSize="inherit" sx={{ color: '#44c814ff', mr: 0.25 ,fontSize: '0.90rem'}} />
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#FFD700' ,fontSize: '0.90rem' }}>
            #1
          </Typography>
        </>
      ) : (
        <>
          <Leaderboard fontSize="inherit" />
          <Typography variant="caption" sx={{ ml: 0.25,fontSize: '0.90rem' }}>
            #{rank}
          </Typography>
        </>
      )}
    </Box>
  </Tooltip>
)}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={isPassed ? 'Passed' : 'Failed'}
                            color={isPassed ? 'success' : 'error'}
                            size="small"
                            icon={isPassed ? <CheckCircle /> : <Cancel />}
                            sx={{ fontWeight: 500 }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AccessTime sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                            <Typography variant="body2">
                              {attempt.timeTaken || 'N/A'}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {formatDate(attempt.attemptedAt)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Tooltip title="View Detailed Analysis">
                            <IconButton 
                              size="small" 
                              onClick={() => handleViewAttemptDetails(attempt.attemptId)}
                              disabled={!attempt.attemptId}
                              sx={{ 
                                color: 'primary.main',
                                '&:hover': { 
                                  backgroundColor: alpha(theme.palette.primary.main, 0.1) 
                                }
                              }}
                            >
                              <Visibility fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Showing {((quizHistoryPage - 1) * quizHistoryPageSize) + 1} to{' '}
                {Math.min(quizHistoryPage * quizHistoryPageSize, quizHistoryData?.pagination?.totalAttempts || 0)} of{' '}
                {quizHistoryData?.pagination?.totalAttempts || 0} attempts
              </Typography>
              <Pagination
                count={quizHistoryData?.pagination?.totalPages || 1}
                page={quizHistoryPage}
                onChange={handleQuizHistoryPageChange}
                color="primary"
                size={isMobile ? "small" : "medium"}
                showFirstButton
                showLastButton
              />
            </Box>
          </>
        )}
      </Box>
    );
  }, [quizHistoryData, quizHistoryLoading, quizHistoryFilters, quizHistoryPage, quizHistoryPageSize, theme, handleFilterChange, handleQuizHistoryPageSizeChange, handleQuizHistoryPageChange, handleViewAttemptDetails]);

  const renderCoursePerformance = useCallback(() => {
    if (!analyticsData?.departmentWiseAnalysis?.length) {
      return <EmptyState message="No department-wise data available" />;
    }

    // Sort departments by percentage (descending)
    const sortedDepartments = [...analyticsData.departmentWiseAnalysis]
      .map(dept => ({
        ...dept,
        percentage: clampPercentage(dept.departmentPercentage)
      }))
      .sort((a, b) => b.percentage - a.percentage);

    return (
      <StyledCard sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <School sx={{ mr: 1.5, color: 'secondary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Department/Course Performance
          </Typography>
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={sortedDepartments.map(dept => ({
                name: dept.department || 'Unknown',
                percentage: dept.percentage,
                attempts: safeParseInt(dept.totalAttempts),
                score: safeParseFloat(dept.averageScore)
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.text.secondary, 0.1)} />
                <XAxis 
                  dataKey="name" 
                  stroke={theme.palette.text.secondary}
                  fontSize={12}
                />
                <YAxis 
                  stroke={theme.palette.text.secondary}
                  fontSize={12}
                  domain={[0, 100]}
                />
                <RechartsTooltip 
                  formatter={(value) => [`${value}%`, 'Score']}
                  contentStyle={{
                    borderRadius: 8,
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: theme.shadows[3],
                    backgroundColor: theme.palette.background.paper
                  }}
                />
                <Bar 
                  dataKey="percentage" 
                  fill={theme.palette.secondary.main} 
                  name="Department Score %"
                  radius={[4, 4, 0, 0]}
                />
              </RechartsBarChart>
            </ResponsiveContainer>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
              {sortedDepartments.map((dept, index) => {
                const percentage = dept.percentage;
                return (
                  <Box key={dept.department || index} sx={{ 
                    mb: 2, 
                    p: 2, 
                    bgcolor: alpha(theme.palette.secondary.main, 0.05), 
                    borderRadius: 2,
                    borderLeft: `4px solid ${
                      index === 0 ? theme.palette.success.main :
                      index === 1 ? theme.palette.warning.main :
                      index === 2 ? theme.palette.info.main :
                      theme.palette.secondary.main
                    }`
                  }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      {dept.department || 'Unknown Department'}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        Score: {formatPercentage(percentage)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Attempts: {dept.totalAttempts || 0}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>
                        Average: {safeParseFloat(dept.averageScore).toFixed(1)}
                      </Typography>
                      <Chip 
                        label={`Rank: ${index + 1}`} 
                        size="small" 
                        color={
                          index === 0 ? 'success' : 
                          index === 1 ? 'warning' : 
                          index === 2 ? 'info' :
                          'default'
                        }
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                    
                    <ProgressBar 
                      variant="determinate" 
                      value={percentage} 
                      customcolor={
                        percentage >= 80 ? theme.palette.success.main :
                        percentage >= 60 ? theme.palette.warning.main :
                        theme.palette.error.main
                      }
                      sx={{ mt: 1 }}
                    />
                  </Box>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </StyledCard>
    );
  }, [analyticsData, theme]);

  const renderRankAnalytics = useCallback(() => {
  if (!quizHistoryData?.attempts?.length) {
    return <EmptyState message="No rank data available" icon={EmojiEvents} />;
  }
  
  // Filter valid ranked attempts
  const rankedAttempts = quizHistoryData.attempts.filter(attempt => {
    const rank = attempt.rank?.position;
    const total = attempt.rank?.totalParticipants;
    return rank && total && total > 0 && rank >= 1 && rank <= total;
  });
  
  if (rankedAttempts.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', p: 4 }}>
        <EmojiEvents sx={{ fontSize: 60, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No Valid Rank Data Available
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Complete more quizzes with rank data to see analytics.
        </Typography>
        <Button variant="outlined" startIcon={<Refresh />} onClick={handleRefresh}>
          Refresh Data
        </Button>
      </Box>
    );
  }
  
  // Prepare chart data with PERFECT percentile calculation
  const chartData = rankedAttempts
    .slice(-10) // Last 10 attempts (or all if less than 10)
    .map(attempt => {
      const position = attempt.rank.position;
      const total = attempt.rank.totalParticipants;
      const percentile = calculatePercentile(position, total);
      const score = safeParseFloat(attempt.score);
      
      // Determine performance category
      let performanceCategory = '';
      let performanceColor = '';
      
      if (percentile >= 90) {
        performanceCategory = 'Excellent';
        performanceColor = theme.palette.success.main;
      } else if (percentile >= 75) {
        performanceCategory = 'Good';
        performanceColor = theme.palette.info.main;
      } else if (percentile >= 50) {
        performanceCategory = 'Average';
        performanceColor = theme.palette.warning.main;
      } else {
        performanceCategory = 'Needs Improvement';
        performanceColor = theme.palette.error.main;
      }
      
      return {
        name: attempt.quizTitle?.substring(0, 12) + (attempt.quizTitle?.length > 12 ? '...' : ''),
        rank: position,
        participants: total,
        percentile: percentile,
        score: score,
        date: formatDate(attempt.attemptedAt),
        performanceCategory,
        performanceColor,
        rankText: `Rank ${position} of ${total}`,
        percentileText: `Better than ${Math.round(percentile)}% of participants`,
        tooltipText: total === 1 ? 
          `Only participant (100th Percentile)` :
          `Rank ${position} of ${total} (${percentile.toFixed(1)}th Percentile)`
      };
    })
    .reverse();
  
  // Calculate statistics
  const ranks = rankedAttempts.map(a => a.rank.position);
  const totals = rankedAttempts.map(a => a.rank.totalParticipants);
  const percentiles = rankedAttempts.map(a => 
    calculatePercentile(a.rank.position, a.rank.totalParticipants)
  ).filter(p => p !== null);
  
  const averageRank = ranks.length > 0 ? 
    ranks.reduce((a, b) => a + b, 0) / ranks.length : 0;
  
  const averagePercentile = percentiles.length > 0 ? 
    percentiles.reduce((a, b) => a + b, 0) / percentiles.length : 0;
  
  const bestRank = ranks.length > 0 ? Math.min(...ranks) : 0;
  const worstRank = ranks.length > 0 ? Math.max(...ranks) : 0;
  
  // Count performance categories
  const performanceCounts = {
    excellent: percentiles.filter(p => p >= 90).length,
    good: percentiles.filter(p => p >= 75 && p < 90).length,
    average: percentiles.filter(p => p >= 50 && p < 75).length,
    needsImprovement: percentiles.filter(p => p < 50).length
  };
  
  return (
    <Grid container spacing={3}>
      {/* Performance Summary Card */}
      <Grid item xs={12}>
        <StyledCard sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Leaderboard sx={{ mr: 1.5, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Percentile Performance Summary
            </Typography>
          </Box>
          
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: alpha(theme.palette.success.main, 0.1), borderRadius: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                  {formatPercentile(averagePercentile)}
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  Average Percentile
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: alpha(theme.palette.info.main, 0.1), borderRadius: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'info.main' }}>
                  {performanceCounts.excellent + performanceCounts.good}
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  Above 75th Percentile
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: alpha(theme.palette.primary.main, 0.1), borderRadius: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  #{averageRank.toFixed(1)}
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  Average Rank
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: alpha(theme.palette.secondary.main, 0.1), borderRadius: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                  {rankedAttempts.length}
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  Ranked Quizzes
                </Typography>
              </Box>
            </Grid>
          </Grid>
          
          {/* Percentile Distribution */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
              Percentile Distribution
            </Typography>
            <Grid container spacing={1}>
              {[
                { label: '90-100% (Excellent)', count: performanceCounts.excellent, color: theme.palette.success.main },
                { label: '75-89% (Good)', count: performanceCounts.good, color: theme.palette.info.main },
                { label: '50-74% (Average)', count: performanceCounts.average, color: theme.palette.warning.main },
                { label: 'Below 50% (Needs Improvement)', count: performanceCounts.needsImprovement, color: theme.palette.error.main }
              ].map((category, index) => {
                const percentage = rankedAttempts.length > 0 ? 
                  Math.round((category.count / rankedAttempts.length) * 100) : 0;
                
                return (
                  <Grid item xs={12} key={index}>
                    <Box sx={{ mb: 1.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {category.label}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: category.color }}>
                          {category.count} ({percentage}%)
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={percentage}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: alpha(category.color, 0.1),
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: category.color,
                            borderRadius: 4
                          }
                        }}
                      />
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </StyledCard>
      </Grid>
      
      {/* Rank vs Performance Chart */}
      <Grid item xs={12}>
        <StyledCard sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Equalizer sx={{ mr: 1.5, color: 'info.main' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Rank vs Performance (Percentile vs Score)
            </Typography>
          </Box>
          
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.text.secondary, 0.1)} />
              
              <XAxis 
                type="number" 
                dataKey="percentile" 
                name="Percentile" 
                label={{ 
                  value: 'Percentile Score (%)', 
                  position: 'insideBottom',
                  offset: -5,
                  style: { 
                    fill: theme.palette.text.secondary,
                    fontSize: 12,
                    fontWeight: 500 
                  }
                }}
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
              />
              
              <YAxis 
                type="number" 
                dataKey="score" 
                name="Score" 
                label={{ 
                  value: 'Quiz Score', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { 
                    fill: theme.palette.text.secondary,
                    fontSize: 12,
                    fontWeight: 500 
                  }
                }}
              />
              
              <ZAxis 
                type="number" 
                dataKey="rank" 
                range={[100, 600]} 
                name="Rank"
              />
              
              <RechartsTooltip 
                formatter={(value, name) => {
                  if (name === 'percentile') return [`${value.toFixed(1)}%`, 'Percentile'];
                  if (name === 'score') return [value.toFixed(1), 'Score'];
                  if (name === 'rank') return [`#${value}`, 'Rank'];
                  return [value, name];
                }}
                labelFormatter={(label, payload) => {
                  if (payload && payload.length > 0) {
                    const data = payload[0].payload;
                    return `${data.name}\n${data.date}\n${data.tooltipText}`;
                  }
                  return label;
                }}
                contentStyle={{
                  borderRadius: 8,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: theme.shadows[3],
                  backgroundColor: theme.palette.background.paper,
                  padding: '12px'
                }}
              />
              
              <Scatter 
                name="Quiz Performance" 
                data={chartData} 
                fill={theme.palette.primary.main}
                shape={(props) => {
                  const { cx, cy, payload } = props;
                  return (
                    <circle 
                      cx={cx} 
                      cy={cy} 
                      r={8} 
                      fill={payload.performanceColor}
                      stroke={theme.palette.background.paper}
                      strokeWidth={2}
                      opacity={0.8}
                    />
                  );
                }}
              />
            </ScatterChart>
          </ResponsiveContainer>
          
          {/* Educational Note */}
          <Box sx={{ mt: 3, p: 2, bgcolor: alpha(theme.palette.info.main, 0.08), borderRadius: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={1} sx={{ textAlign: 'center' }}>
                <Info color="info" sx={{ fontSize: 32 }} />
              </Grid>
              <Grid item xs={12} md={11}>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, color: 'info.main' }}>
                  Understanding Percentile Scores
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                  <strong>Percentile</strong> indicates the percentage of participants you scored better than.
                  <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                    <li><strong>100th Percentile</strong>: Best performance (top score)</li>
                    <li><strong>90th+ Percentile</strong>: Excellent (top 10% of participants)</li>
                    <li><strong>75th+ Percentile</strong>: Good (top 25% of participants)</li>
                    <li><strong>50th Percentile</strong>: Average (better than half the participants)</li>
                    <li><strong>Below 50th Percentile</strong>: Needs improvement</li>
                  </ul>
                  Formula: Percentile = 100 × (Total Participants - Your Rank) ÷ (Total Participants - 1)
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </StyledCard>
      </Grid>
      
      {/* Percentile Trend Chart */}
      <Grid item xs={12}>
        <StyledCard sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <TimelineIcon sx={{ mr: 1.5, color: 'secondary.main' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Percentile Trend Over Time
            </Typography>
          </Box>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.text.secondary, 0.1)} />
              <XAxis 
                dataKey="name" 
                stroke={theme.palette.text.secondary}
                fontSize={12}
              />
              <YAxis 
                stroke={theme.palette.text.secondary}
                fontSize={12}
                domain={[0, 100]}
                label={{ 
                  value: 'Percentile (%)', 
                  angle: -90, 
                  position: 'insideLeft',
                  offset: -10,
                  style: { fill: theme.palette.text.secondary }
                }}
              />
              <RechartsTooltip 
                formatter={(value, name) => {
                  if (name === 'percentile') return [`${value.toFixed(1)}%`, 'Percentile'];
                  if (name === 'score') return [value.toFixed(1), 'Score'];
                  return [value, name];
                }}
                labelFormatter={(label, payload) => {
                  if (payload && payload.length > 0) {
                    const data = payload[0].payload;
                    return `${data.name}\n${data.date}\n${data.tooltipText}`;
                  }
                  return label;
                }}
                contentStyle={{
                  borderRadius: 8,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: theme.shadows[3],
                  backgroundColor: theme.palette.background.paper
                }}
              />
              <Line 
                type="monotone" 
                dataKey="percentile" 
                stroke={theme.palette.secondary.main} 
                strokeWidth={3}
                dot={{ r: 6 }}
                activeDot={{ r: 8 }}
                name="Percentile"
              />
            </LineChart>
          </ResponsiveContainer>
        </StyledCard>
      </Grid>
    </Grid>
  );
}, [quizHistoryData, theme, handleRefresh]);

  // Loading state
  if (analyticsLoading) {
    return <LoadingSkeleton />;
  }

  // Error state
  if (analyticsError) {
    return <ErrorDisplay error={analyticsError} onRetry={handleRefresh} />;
  }

  // Empty state
  if (!analyticsData) {
    return <EmptyState message="No analytics data found" />;
  }

  return (
    <Box sx={{ p: isMobile ? 1 : 3, bgcolor: theme.palette.background.default, minHeight: '100vh'}}>
      {/* Header */}
      <StyledCard sx={{ mb: 3, p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center' }}>
          <Box sx={{ flexGrow: 1, mb: isMobile ? 2 : 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1}}>
              <Avatar 
                sx={{ 
                  bgcolor: theme.palette.primary.main, 
                  mr: 2,
                  width: 56,
                  height: 56,
                  fontSize: 24,
                  fontWeight: 600
                }}
              >
                {analyticsData.studentInfo?.name?.charAt(0) || 'S'}
              </Avatar>
              <Box>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700}}>
                  Analytics Dashboard
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                  {analyticsData.studentInfo?.name || 'Student'} • {analyticsData.studentInfo?.enrollmentNumber || 'N/A'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {analyticsData.studentInfo?.department || 'N/A'} • {analyticsData.studentInfo?.course || 'N/A'} • Semester {analyticsData.studentInfo?.semester || 'N/A'}
                </Typography>
              </Box>
            </Box>
          </Box>
          
          <Stack direction="row" spacing={1}>
            <Tooltip title="Go Back">
              <IconButton 
                onClick={() => navigate(-1)}
                sx={{ 
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) }
                }}
              >
                <ArrowBack />
              </IconButton>
            </Tooltip>
            <Tooltip title="Refresh Data">
              <IconButton 
                onClick={handleRefresh}
                sx={{ 
                  bgcolor: alpha(theme.palette.info.main, 0.1),
                  '&:hover': { bgcolor: alpha(theme.palette.info.main, 0.2) }
                }}
              >
                <Refresh />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export Analytics">
              <Button
                variant="contained"
                startIcon={<Download />}
                onClick={handleExportData}
                sx={{ borderRadius: 2 }}
              >
                Export
              </Button>
            </Tooltip>
          </Stack>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        {/* Quick Stats */}
        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
                {analyticsData.summary?.totalRegisteredQuizzes || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Registered Quizzes
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main' }}>
                {analyticsData.summary?.totalAttemptedQuizzes || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quizzes Attempted
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main' }}>
                {safeParseFloat(analyticsData.summary?.averageScore).toFixed(1)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Average Score
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'error.main' }}>
                {formatPercentage(analyticsData.summary?.passPercentage)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Overall Pass Rate
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </StyledCard>

      {/* Metrics Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {summaryMetrics.map(renderMetricCard)}
      </Grid>

      {/* Main Content */}
      <StyledCard sx={{ mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile ? "auto" : false}
            sx={{
              '& .MuiTab-root': {
                fontWeight: 600,
                textTransform: 'none',
                fontSize: isMobile ? '0.875rem' : '1rem',
                minHeight: 60
              }
            }}
          >
            <Tab icon={<Assessment />} label="Overview" />
            <Tab icon={<Timeline />} label="Performance Analytics" />
            <Tab icon={<SubjectIcon />} label="Subject Analysis" />
            <Tab icon={<School />} label="Course Performance" />
            <Tab icon={<History />} label="Quiz History" />
            <Tab icon={<EmojiEvents />} label="Rank Analytics" />
            <Tab icon={<Insights />} label="Recommendations" />
          </Tabs>
        </Box>

        <Box sx={{ p: 3 }}>
          {/* Tab 1: Overview */}
          {activeTab === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} lg={8}>
                {renderPerformanceChart()}
              </Grid>
              <Grid item xs={12} lg={4}>
                {renderSubjectAnalysis()}
              </Grid>
              <Grid item xs={12}>
                {renderMonthlyTrend()}
              </Grid>
              <Grid item xs={12} lg={6}>
                {renderRankSummary()}
              </Grid>
              <Grid item xs={12} lg={6}>
                {renderRecommendations()}
              </Grid>
            </Grid>
          )}

          {/* Tab 2: Performance Analytics */}
          {activeTab === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {renderQuizComparison()}
              </Grid>
              <Grid item xs={12}>
                {renderMonthlyTrend()}
              </Grid>
              <Grid item xs={12} lg={6}>
                {renderScoreDistribution()}
              </Grid>
              <Grid item xs={12} lg={6}>
                <StyledCard sx={{ p: 3, height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Timer sx={{ mr: 1.5, color: 'info.main' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Time Analysis
                    </Typography>
                  </Box>
                  
                  {analyticsData.summary && (
                    <Box>
                      <Box sx={{ mb: 3, p: 2, bgcolor: alpha(theme.palette.info.main, 0.05), borderRadius: 2 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Average Time per Quiz
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: 'info.main' }}>
                          {formatTime(analyticsData.summary.averageTimePerQuiz)}
                        </Typography>
                      </Box>
                      <Box sx={{ p: 2, bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: 2 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Total Time Spent on Quizzes
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                          {analyticsData.summary.totalTimeSpent || 'N/A'}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </StyledCard>
              </Grid>
            </Grid>
          )}

          {/* Tab 3: Subject Analysis */}
          {activeTab === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {renderSubjectAnalysis()}
              </Grid>
              <Grid item xs={12} lg={6}>
                <StyledCard sx={{ p: 3, height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <CompareArrows sx={{ mr: 1.5, color: 'secondary.main' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Subject Comparison
                    </Typography>
                  </Box>
                  
                  {subjectChartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsBarChart data={subjectChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <RechartsTooltip 
                          formatter={(value) => [`${value}%`, 'Score']}
                          contentStyle={{
                            borderRadius: 8,
                            border: `1px solid ${theme.palette.divider}`,
                            boxShadow: theme.shadows[3],
                            backgroundColor: theme.palette.background.paper
                          }}
                        />
                        <Bar dataKey="value" fill={theme.palette.secondary.main} radius={[4, 4, 0, 0]} />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  ) : (
                    <EmptyState message="No subject comparison data" />
                  )}
                </StyledCard>
              </Grid>
              <Grid item xs={12} lg={6}>
                <StyledCard sx={{ p: 3, height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Numbers sx={{ mr: 1.5, color: 'primary.main' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Subject-wise Attempts
                    </Typography>
                  </Box>
                  
                  {analyticsData.subjectWiseAnalysis?.length > 0 ? (
                    <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                      {analyticsData.subjectWiseAnalysis.map((subject, index) => (
                        <Box key={index} sx={{ mb: 2, p: 2, bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {subject.subject || `Subject ${index + 1}`}
                            </Typography>
                            <Chip 
                              label={`${subject.totalAttempts || 0} attempts`} 
                              size="small" 
                              color="primary"
                              variant="outlined"
                            />
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="caption" color="text.secondary">
                              Score: {formatPercentage(subject.subjectPercentage)}
                            </Typography>
                            <Typography variant="caption" sx={{ fontWeight: 500 }}>
                              Avg: {safeParseFloat(subject.averageScore).toFixed(1)}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <EmptyState message="No subject attempt data" />
                  )}
                </StyledCard>
              </Grid>
            </Grid>
          )}

          {/* Tab 4: Course Performance */}
          {activeTab === 3 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {renderCoursePerformance()}
              </Grid>
            </Grid>
          )}

          {/* Tab 5: Quiz History */}
          {activeTab === 4 && (
            <Box>
              {renderQuizHistory()}
            </Box>
          )}

          {/* Tab 6: Rank Analytics */}
          {activeTab === 5 && (
            <Box>
              {renderRankAnalytics()}
            </Box>
          )}

          {/* Tab 7: Recommendations */}
          {activeTab === 6 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {renderRecommendations()}
              </Grid>
              <Grid item xs={12}>
                {renderImprovementAreas()}
              </Grid>
            </Grid>
          )}
        </Box>
      </StyledCard>

      {/* Footer Info */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Last updated: {new Date().toLocaleDateString()} • Data refreshes automatically
        </Typography>
      </Box>
    </Box>
  );
};

export default StudentAnalytics;