// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import {
//   Container,
//   Grid,
//   Paper,
//   Typography,
//   Box,
//   Tabs,
//   Tab,
//   Card,
//   CardContent,
//   LinearProgress,
//   Alert,
//   Chip,
//   Avatar,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemAvatar,
//   Divider,
//   IconButton,
//   Tooltip,
//   CircularProgress,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Button,
//   Menu,
//   MenuItem,
//   TextField,
//   InputAdornment,
//   FormControl,
//   InputLabel,
//   Select,
//   FormHelperText,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Switch,
//   FormControlLabel,
//   Badge,
//   SpeedDial,
//   SpeedDialAction,
//   SpeedDialIcon,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   useMediaQuery,
//   alpha,
//   styled
// } from '@mui/material';
// import {
//   Timeline,
//   TrendingUp,
//   People,
//   School,
//   Assessment,
//   InsertChart,
//   BarChart as BarChartIcon,
//   PieChart as PieChartIcon,
//   Warning,
//   CheckCircle,
//   Error as ErrorIcon,
//   Info,
//   Download,
//   Refresh,
//   CalendarToday,
//   FilterList,
//   Search,
//   ArrowUpward,
//   ArrowDownward,
//   Remove,
//   Star,
//   EmojiEvents,
//   AccessTime,
//   Person,
//   Group,
//   LocalLibrary,
//   Psychology,
//   Lightbulb,
//   CompareArrows,
//   Female,
//   Male,
//   Transgender,
//   Analytics as AnalyticsIcon,
//   TimelineRounded,
//   Score,
//   DataUsage,
//   AutoGraph,
//   Insights,
//   TrendingDown,
//   ShowChart,
//   MultilineChart,
//   DonutLarge,
//   DonutSmall,
//   Radar as RadarIcon,
//   TimelineSharp,
//   Functions,
//   Calculate,
//   Numbers,
//   Dashboard,
//   ViewQuilt,
//   TableChart,
//   GridView,
//   Visibility,
//   ZoomIn,
//   ZoomOut,
//   Settings,
//   MoreVert,
//   ExpandMore,
//   ChevronRight,
//   FirstPage,
//   LastPage,
//   FilterAlt,
//   Sort,
//   ImportExport,
//   RotateRight,
//   RotateLeft,
//   Cached,
//   CloudDownload,
//   CloudUpload,
//   Save,
//   Print,
//   Share,
//   Close,
//   Add,
//   MoreHoriz,
//   OpenInNew,
//   Launch,
//   AccountCircle,
//   PeopleAlt,
//   SupervisorAccount,
//   AdminPanelSettings,
//   Security,
//   Verified,
//   Shield,
//   Email,
//   Phone,
//   LocationOn,
//   Business,
//   School as SchoolIcon,
//   MenuBook,
//   LibraryBooks,
//   Book,
//   Videocam,
//   Headset,
//   VolumeUp,
//   Notifications,
//   NotificationsActive,
//   Mail,
//   Send,
//   Inbox,
//   Archive,
//   Delete,
//   Restore,
//   Undo,
//   Clear,
//   Block,
//   Cancel,
//   Check,
//   Done,
//   DoneAll,
//   HighlightOff,
//   AddCircle,
//   Edit,
//   Build,
//   DesignServices,
//   Architecture,
//   QueryStats
// } from '@mui/icons-material';
// import { useTheme } from '@mui/material/styles';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
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
//   ComposedChart,
//   Brush,
//   ReferenceLine,
//   Label
// } from 'recharts';
// import { format, parseISO, isValid } from 'date-fns';
// import axios from 'axios';
// import { motion, AnimatePresence } from 'framer-motion';

// // Custom Theme with Professional Colors
// const professionalTheme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2',
//       light: '#42a5f5',
//       dark: '#1565c0',
//       contrastText: '#ffffff',
//     },
//     secondary: {
//       main: '#9c27b0',
//       light: '#ba68c8',
//       dark: '#7b1fa2',
//       contrastText: '#ffffff',
//     },
//     success: {
//       main: '#2e7d32',
//       light: '#4caf50',
//       dark: '#1b5e20',
//       contrastText: '#ffffff',
//     },
//     warning: {
//       main: '#ed6c02',
//       light: '#ff9800',
//       dark: '#e65100',
//       contrastText: '#000000',
//     },
//     error: {
//       main: '#d32f2f',
//       light: '#ef5350',
//       dark: '#c62828',
//       contrastText: '#ffffff',
//     },
//     info: {
//       main: '#0288d1',
//       light: '#03a9f4',
//       dark: '#01579b',
//       contrastText: '#ffffff',
//     },
//     background: {
//       default: '#f5f7fa',
//       paper: '#ffffff',
//     },
//     grey: {
//       50: '#fafafa',
//       100: '#f5f5f5',
//       200: '#eeeeee',
//       300: '#e0e0e0',
//       400: '#bdbdbd',
//       500: '#9e9e9e',
//       600: '#757575',
//       700: '#616161',
//       800: '#424242',
//       900: '#212121',
//     },
//   },
//   typography: {
//     fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
//     h1: { fontWeight: 700, fontSize: '2.5rem' },
//     h2: { fontWeight: 600, fontSize: '2rem' },
//     h3: { fontWeight: 600, fontSize: '1.75rem' },
//     h4: { fontWeight: 600, fontSize: '1.5rem' },
//     h5: { fontWeight: 500, fontSize: '1.25rem' },
//     h6: { fontWeight: 500, fontSize: '1.125rem' },
//     subtitle1: { fontWeight: 500 },
//     subtitle2: { fontWeight: 400 },
//   },
//   shape: {
//     borderRadius: 12,
//   },
//   shadows: [
//     'none',
//     '0px 2px 1px -1px rgba(0,0,0,0.05)',
//     '0px 3px 1px -2px rgba(0,0,0,0.05)',
//     '0px 3px 3px -2px rgba(0,0,0,0.05)',
//     ...Array(21).fill('0px 2px 4px -1px rgba(0,0,0,0.1)'),
//   ],
//   components: {
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           borderRadius: 16,
//           boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
//           transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: 8,
//           textTransform: 'none',
//           fontWeight: 500,
//         },
//       },
//     },
//     MuiChip: {
//       styleOverrides: {
//         root: {
//           borderRadius: 8,
//           fontWeight: 500,
//         },
//       },
//     },
//   },
// });

// // Custom styled components
// const GlassCard = styled(Card)(({ theme }) => ({
//   background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
//   backdropFilter: 'blur(10px)',
//   border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//   '&:hover': {
//     transform: 'translateY(-4px)',
//     boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
//   },
// }));

// const MetricCard = styled(Paper)(({ theme, color = 'primary', value }) => {
//   const getGradient = (val) => {
//     if (val >= 80) return `linear-gradient(135deg, ${theme.palette.success.light} 0%, ${theme.palette.success.main} 100%)`;
//     if (val >= 60) return `linear-gradient(135deg, ${theme.palette.info.light} 0%, ${theme.palette.info.main} 100%)`;
//     if (val >= 40) return `linear-gradient(135deg, ${theme.palette.warning.light} 0%, ${theme.palette.warning.main} 100%)`;
//     return `linear-gradient(135deg, ${theme.palette.error.light} 0%, ${theme.palette.error.main} 100%)`;
//   };
  
//   // Get the color values safely
//   const getColorValues = () => {
//     // If color is 'gradient', return white text
//     if (color === 'gradient') {
//       return {
//         background: getGradient(value || 0),
//         text: '#ffffff'
//       };
//     }
    
//     // Check if color exists in palette
//     const paletteColor = theme.palette[color];
//     if (!paletteColor) {
//       // Fallback to primary if color doesn't exist
//       return {
//         background: theme.palette.primary.main,
//         text: theme.palette.primary.contrastText
//       };
//     }
    
//     return {
//       background: paletteColor.main,
//       text: paletteColor.contrastText
//     };
//   };
  
//   const colorValues = getColorValues();
  
//   return {
//     padding: theme.spacing(2.5),
//     borderRadius: 16,
//     background: colorValues.background,
//     color: colorValues.text,
//     height: '100%',
//     position: 'relative',
//     overflow: 'hidden',
//     '&::before': {
//       content: '""',
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       right: 0,
//       height: '4px',
//       background: color === 'gradient' ? getGradient(value || 0) : 
//                  theme.palette[color] ? theme.palette[color].light : theme.palette.primary.light,
//     },
//   };
// });

// const AnalyticsTabs = styled(Tabs)(({ theme }) => ({
//   '& .MuiTabs-indicator': {
//     height: 3,
//     borderRadius: 3,
//     backgroundColor: theme.palette.primary.main,
//   },
//   '& .MuiTab-root': {
//     textTransform: 'none',
//     fontSize: '0.875rem',
//     fontWeight: 500,
//     minHeight: 48,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   '&:hover': {
//     backgroundColor: theme.palette.action.selected,
//   },
// }));

// const LoadingSkeleton = () => (
//   <Box sx={{ width: '100%', p: 3 }}>
//     <Grid container spacing={3}>
//       {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
//         <Grid item xs={12} sm={6} md={3} key={item}>
//           <Paper sx={{ p: 3, height: 120, borderRadius: 3 }}>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//               <Box>
//                 <LinearProgress sx={{ width: 80, mb: 1 }} />
//                 <LinearProgress sx={{ width: 60 }} />
//               </Box>
//               <CircularProgress size={40} thickness={4} />
//             </Box>
//           </Paper>
//         </Grid>
//       ))}
//     </Grid>
//   </Box>
// );

// const ErrorFallback = ({ error, resetErrorBoundary }) => (
//   <motion.div
//     initial={{ opacity: 0, scale: 0.9 }}
//     animate={{ opacity: 1, scale: 1 }}
//     transition={{ duration: 0.3 }}
//   >
//     <Alert 
//       severity="error" 
//       sx={{ m: 2 }}
//       action={
//         <Button color="inherit" size="small" onClick={resetErrorBoundary} startIcon={<Refresh />}>
//           Retry
//         </Button>
//       }
//     >
//       <Typography variant="h6" gutterBottom>Analytics Error</Typography>
//       <Typography variant="body2" gutterBottom>{error.message}</Typography>
//       <Typography variant="caption" color="textSecondary">
//         Reference: ERR_{Date.now().toString(36)}
//       </Typography>
//     </Alert>
//   </motion.div>
// );

// // Inline components instead of lazy loading
// const AdvancedCharts = ({ chartData }) => (
//   <Grid container spacing={3}>
//     <Grid item xs={12} lg={8}>
//       <GlassCard>
//         <CardContent>
//           <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//             <Typography variant="h6">Advanced Performance Analysis</Typography>
//           </Box>
//           <Box sx={{ height: 350 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <ComposedChart data={chartData?.timeSeriesData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke={alpha(professionalTheme.palette.divider, 0.5)} />
//                 <XAxis dataKey="month" />
//                 <YAxis yAxisId="left" />
//                 <YAxis yAxisId="right" orientation="right" />
//                 <RechartsTooltip />
//                 <Legend />
//                 <Line 
//                   yAxisId="left"
//                   type="monotone" 
//                   dataKey="score" 
//                   name="Average Score %" 
//                   stroke="#1976d2" 
//                   strokeWidth={3}
//                   dot={{ r: 4 }}
//                   activeDot={{ r: 6 }}
//                 />
//                 <Area 
//                   yAxisId="right"
//                   type="monotone" 
//                   dataKey="participation" 
//                   name="Participation %" 
//                   stroke="#82ca9d" 
//                   fill="#82ca9d"
//                   fillOpacity={0.3}
//                 />
//               </ComposedChart>
//             </ResponsiveContainer>
//           </Box>
//         </CardContent>
//       </GlassCard>
//     </Grid>
//   </Grid>
// );

// const StudentDemographics = ({ analyticsData }) => (
//   <Grid container spacing={3}>
//     <Grid item xs={12} md={6}>
//       <GlassCard>
//         <CardContent>
//           <Typography variant="h6" gutterBottom>Student Distribution</Typography>
//           <Box sx={{ height: 300 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <RechartsPieChart>
//                 <Pie
//                   data={[
//                     { name: 'Excellent', value: analyticsData?.data?.students?.distribution?.excellent || 0 },
//                     { name: 'Good', value: analyticsData?.data?.students?.distribution?.good || 0 },
//                     { name: 'Average', value: analyticsData?.data?.students?.distribution?.average || 0 },
//                     { name: 'Poor', value: analyticsData?.data?.students?.distribution?.poor || 0 },
//                     { name: 'Fail', value: analyticsData?.data?.students?.distribution?.fail || 0 }
//                   ]}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   <Cell fill="#2e7d32" />
//                   <Cell fill="#0288d1" />
//                   <Cell fill="#ed6c02" />
//                   <Cell fill="#d32f2f" />
//                   <Cell fill="#757575" />
//                 </Pie>
//                 <RechartsTooltip />
//               </RechartsPieChart>
//             </ResponsiveContainer>
//           </Box>
//         </CardContent>
//       </GlassCard>
//     </Grid>
//   </Grid>
// );

// const PredictiveInsights = ({ analyticsData }) => {
//   if (!analyticsData?.data?.predictive) return null;

//   const predictive = analyticsData.data.predictive;
  
//   if (!predictive.available) {
//     return (
//       <Alert severity="info" sx={{ borderRadius: 2 }}>
//         <Typography variant="subtitle1" gutterBottom>
//           Predictive Analytics Unavailable
//         </Typography>
//         <Typography variant="body2">
//           {predictive.message}
//         </Typography>
//       </Alert>
//     );
//   }

//   return (
//     <Grid container spacing={3}>
//       <Grid item xs={12} md={6}>
//         <GlassCard>
//           <CardContent>
//             <Typography variant="h6" gutterBottom>Performance Forecast</Typography>
//             <Box textAlign="center" py={3}>
//               <CircularProgress 
//                 variant="determinate" 
//                 value={predictive.nextQuizPrediction?.confidence || 75}
//                 size={120}
//                 thickness={4}
//                 sx={{ mb: 2 }}
//               />
//               <Typography variant="h3" gutterBottom>
//                 {predictive.nextQuizPrediction?.predictedAverageScore?.toFixed(1)}%
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Predicted Average Score
//               </Typography>
//             </Box>
//           </CardContent>
//         </GlassCard>
//       </Grid>
//     </Grid>
//   );
// };

// const FacultyAnalytics = () => {
//   const [tabValue, setTabValue] = useState(0);
//   const [analyticsData, setAnalyticsData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [timeframe, setTimeframe] = useState('all');
//   const [courseFilter, setCourseFilter] = useState('all');
//   const [genderFilter, setGenderFilter] = useState('all');
//   const [performanceFilter, setPerformanceFilter] = useState('all');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [exportMenuAnchor, setExportMenuAnchor] = useState(null);
//   const [settingsMenuAnchor, setSettingsMenuAnchor] = useState(null);
//   const [viewMode, setViewMode] = useState('grid');
//   const [autoRefresh, setAutoRefresh] = useState(true);
//   const [showFilters, setShowFilters] = useState(true);
//   const [zoomLevel, setZoomLevel] = useState(1);
//   const [compareMode, setCompareMode] = useState(false);
//   const [selectedQuizzes, setSelectedQuizzes] = useState([]);
//   const [detailDialog, setDetailDialog] = useState({ open: false, type: '', data: null });
//   const [studentDetail, setStudentDetail] = useState(null);
//   const [quizDetail, setQuizDetail] = useState(null);
//   const [courseDetail, setCourseDetail] = useState(null);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.down('md'));

//   const fetchAnalytics = useCallback(async () => {
//     if (!autoRefresh && analyticsData) return;
    
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get('http://localhost:5000/api/faculty/analytics', {
//       withCredentials:true,
        
//         headers: {
//           'Cache-Control': 'no-cache',
//           'Pragma': 'no-cache'
//         }
//       });
      
//       if (response.data.success) {
//         setAnalyticsData(response.data);
//         localStorage.setItem('lastAnalyticsFetch', Date.now().toString());
//       } else {
//         throw new Error(response.data.message || 'Failed to fetch analytics');
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || 'Network error');
//       console.error('Analytics fetch error:', {
//         error: err.message,
//         code: err.code,
//         timestamp: new Date().toISOString()
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, [timeframe, autoRefresh, analyticsData]);

//   useEffect(() => {
//     fetchAnalytics();
    
//     let interval;
//     if (autoRefresh) {
//       interval = setInterval(fetchAnalytics, 300000);
//     }
    
//     return () => clearInterval(interval);
//   }, [fetchAnalytics, autoRefresh]);

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const handleExportClick = (event) => {
//     setExportMenuAnchor(event.currentTarget);
//   };

//   const handleExportClose = () => {
//     setExportMenuAnchor(null);
//   };

//   const handleSettingsClick = (event) => {
//     setSettingsMenuAnchor(event.currentTarget);
//   };

//   const handleSettingsClose = () => {
//     setSettingsMenuAnchor(null);
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     try {
//       const date = parseISO(dateString);
//       return isValid(date) ? format(date, 'MMM dd, yyyy HH:mm') : 'Invalid Date';
//     } catch {
//       return 'Invalid Date';
//     }
//   };

//   const getColorByValue = (value, type = 'percentage') => {
//     if (type === 'percentage') {
//       if (value >= 80) return 'success';
//       if (value >= 60) return 'info';
//       if (value >= 40) return 'warning';
//       return 'error';
//     }
//     if (type === 'participation') {
//       if (value >= 70) return 'success';
//       if (value >= 40) return 'info';
//       if (value >= 20) return 'warning';
//       return 'error';
//     }
//     return 'primary';
//   };

//   const getGenderIcon = (gender) => {
//     switch (gender?.toLowerCase()) {
//       case 'male': return <Male />;
//       case 'female': return <Female />;
//       default: return <Transgender />;
//     }
//   };

//   const filteredQuizzes = useMemo(() => {
//     if (!analyticsData?.data?.quizzes) return [];
//     return analyticsData.data.quizzes.filter(quiz => {
//       const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           quiz.subject.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesCourse = courseFilter === 'all' || 
//                           (quiz.course && quiz.course.includes(courseFilter));
//       return matchesSearch && matchesCourse;
//     });
//   }, [analyticsData, searchTerm, courseFilter]);

//   const uniqueCourses = useMemo(() => {
//     if (!analyticsData?.data?.courses) return [];
//     return analyticsData.data.courses.map(c => c.course).filter(Boolean);
//   }, [analyticsData]);

//   const chartData = useMemo(() => {
//     if (!analyticsData) return null;

//     const { data } = analyticsData;
//     const monthlyData = data?.trends?.timeBased?.monthly || [];
    
//     const courseData = data?.courses?.map(course => ({
//       name: course.course,
//       avgScore: course.averagePercentage,
//       participation: course.participationRate,
//       passRate: course.passRate,
//       accuracy: course.averageAccuracy
//     })) || [];

//     const difficultyData = [
//       { name: 'Hard', value: data?.quizzes?.filter(q => q.difficultyLevel === 'Hard').length || 0 },
//       { name: 'Medium', value: data?.quizzes?.filter(q => q.difficultyLevel === 'Medium').length || 0 },
//       { name: 'Easy', value: data?.quizzes?.filter(q => q.difficultyLevel === 'Easy').length || 0 }
//     ];

//     const performanceData = [
//       { category: 'Excellent', value: data?.students?.distribution?.excellent || 0 },
//       { category: 'Good', value: data?.students?.distribution?.good || 0 },
//       { category: 'Average', value: data?.students?.distribution?.average || 0 },
//       { category: 'Poor', value: data?.students?.distribution?.poor || 0 },
//       { category: 'Fail', value: data?.students?.distribution?.fail || 0 }
//     ];

//     const timeSeriesData = monthlyData.map(month => ({
//       month: month.month,
//       score: month.averagePercentage,
//       participation: month.participationRate,
//       attempts: month.averageAttemptsPerQuiz * 10
//     }));

//     return {
//       monthlyData,
//       courseData,
//       difficultyData,
//       performanceData,
//       timeSeriesData,
//       overview: {
//         participationRate: data?.overview?.participationRate || 0,
//         averageAccuracy: data?.overview?.averageAccuracy || 0,
//         passRate: data?.overview?.passRate || 0,
//         averageScore: data?.overview?.averagePercentage || 0
//       }
//     };
//   }, [analyticsData]);

// const renderMetrics = () => {
//   if (!analyticsData?.data?.overview) return null;

//   const { overview } = analyticsData.data;
//   const metrics = [
//     {
//       title: 'Overall Performance',
//       value: `${overview.averagePercentage.toFixed(1)}%`,
//       change: overview.averagePercentage > 70 ? '+5.2%' : '-2.1%',
//       icon: <Assessment />,
//       color: 'primary',
//       valueColor: getColorByValue(overview.averagePercentage),
//       tooltip: 'Average score across all quizzes'
//     },
//     {
//       title: 'Student Engagement',
//       value: `${overview.participationRate.toFixed(1)}%`,
//       change: overview.participationRate > 60 ? '+3.4%' : '-5.1%',
//       icon: <People />,
//       color: 'info',
//       valueColor: getColorByValue(overview.participationRate, 'participation'),
//       tooltip: 'Percentage of registered students attempting quizzes'
//     },
//     {
//       title: 'Success Rate',
//       value: `${overview.passRate.toFixed(1)}%`,
//       change: overview.passRate > 75 ? '+2.8%' : '-1.3%',
//       icon: <CheckCircle />,
//       color: 'success',
//       tooltip: 'Percentage of students passing quizzes'
//     },
//     {
//       title: 'Question Accuracy',
//       value: `${overview.averageAccuracy.toFixed(1)}%`,
//       change: overview.averageAccuracy > 70 ? '+4.2%' : '-3.6%',
//       icon: <BarChartIcon />,
//       color: 'warning',
//       valueColor: getColorByValue(overview.averageAccuracy),
//       tooltip: 'Average accuracy of answers across all attempts'
//     },
//     {
//       title: 'Active Students',
//       value: analyticsData.data.students?.totalStudents || 0,
//       icon: <Group />,
//       color: 'primary',
//       tooltip: 'Number of unique students who attempted quizzes'
//     },
//     {
//       title: 'Quiz Completion',
//       value: `${overview.averageTimePerAttempt}s`,
//       icon: <AccessTime />,
//       color: 'info',
//       tooltip: 'Average time taken per quiz attempt'
//     },
//     {
//       title: 'Question Volume',
//       value: overview.totalQuestionsAnswered || 0,
//       icon: <Numbers />,
//       color: 'secondary',
//       tooltip: 'Total questions answered across all attempts'
//     },
//     {
//       title: 'Consistency Score',
//       value: `${(100 - overview.standardDeviation).toFixed(1)}%`,
//       icon: <Timeline />,
//       color: 'warning',
//       tooltip: 'Score consistency across all attempts'
//     }
//   ];

//   return (
//     <Grid container spacing={2}>
//       {metrics.map((metric, index) => (
//         <Grid item xs={12} sm={6} md={3} key={index}>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//           >
//             <Tooltip title={metric.tooltip} arrow>
//               <MetricCard color={metric.color} value={parseFloat(metric.value)}>
//                 <Box display="flex" alignItems="flex-start" justifyContent="space-between">
//                   <Box>
//                     <Typography variant="caption" sx={{ opacity: 0.9, fontSize: '0.75rem' }}>
//                       {metric.title}
//                     </Typography>
//                     <Typography variant="h5" sx={{ fontWeight: 700, my: 1 }}>
//                       {metric.value}
//                     </Typography>
//                     {metric.change && (
//                       <Box display="flex" alignItems="center" gap={0.5}>
//                         {metric.change.startsWith('+') ? 
//                           <ArrowUpward fontSize="small" sx={{ fontSize: '0.875rem' }} /> : 
//                           <ArrowDownward fontSize="small" sx={{ fontSize: '0.875rem' }} />
//                         }
//                         <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.75rem' }}>
//                           {metric.change}
//                         </Typography>
//                       </Box>
//                     )}
//                   </Box>
//                   <Box sx={{ opacity: 0.9 }}>
//                     {metric.icon}
//                   </Box>
//                 </Box>
//               </MetricCard>
//             </Tooltip>
//           </motion.div>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// // Add this component definition before or after your other styled components

// const PerformanceBadge = ({ label, performance }) => {
//   return (
//     <Chip 
//       label={label}
//       size="small"
//       sx={{
//         backgroundColor: (theme) => {
//           const colors = {
//             excellent: theme.palette.success.light,
//             good: theme.palette.info.light,
//             average: theme.palette.warning.light,
//             poor: theme.palette.error.light,
//             fail: theme.palette.grey[300],
//           };
//           return colors[performance] || colors.average;
//         },
//         color: (theme) => {
//           const colors = {
//             excellent: theme.palette.success.dark,
//             good: theme.palette.info.dark,
//             average: theme.palette.warning.dark,
//             poor: theme.palette.error.dark,
//             fail: theme.palette.grey[700],
//           };
//           return colors[performance] || colors.average;
//         },
//         fontWeight: 600,
//         fontSize: '0.75rem',
//         padding: '2px 8px',
//         borderRadius: 6,
//         '& .MuiChip-label': {
//           padding: '0 4px',
//         },
//       }}
//     />
//   );
// };

//   const renderAlerts = () => {
//     if (!analyticsData?.data?.insights?.alerts) return null;

//     return (
//       <Grid container spacing={2}>
//         {analyticsData.data.insights.alerts.map((alert, index) => (
//           <Grid item xs={12} key={index}>
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: index * 0.1 }}
//             >
//               <Alert 
//                 severity={alert.type}
//                 sx={{ 
//                   borderRadius: 2,
//                   borderLeft: `4px solid ${theme.palette[alert.type].main}`
//                 }}
//                 icon={alert.type === 'warning' ? <Warning /> : <Info />}
//               >
//                 <Typography fontWeight={600}>{alert.title}</Typography>
//                 <Typography variant="body2" sx={{ mt: 0.5 }}>{alert.description}</Typography>
//                 {alert.quizzes && (
//                   <Box sx={{ mt: 1 }}>
//                     <Typography variant="caption" fontWeight={500}>
//                       Affected Quizzes:
//                     </Typography>
//                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
//                       {alert.quizzes.map((quiz, idx) => (
//                         <Chip key={idx} label={quiz} size="small" variant="outlined" />
//                       ))}
//                     </Box>
//                   </Box>
//                 )}
//               </Alert>
//             </motion.div>
//           </Grid>
//         ))}
//       </Grid>
//     );
//   };

//   const renderTopPerformers = () => {
//     if (!analyticsData?.data?.students?.topRankers) return null;

//     return (
//       <List sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
//         {analyticsData.data.students.topRankers.slice(0, 10).map((student, index) => (
//           <React.Fragment key={index}>
//             <ListItem 
//               sx={{ 
//                 py: 2,
//                 '&:hover': { bgcolor: 'action.hover' }
//               }}
//               secondaryAction={
//                 <Box textAlign="right">
//                   <Typography variant="h6" color="primary" fontWeight={600}>
//                     {student.performance.averagePercentage.toFixed(1)}%
//                   </Typography>
//                   <Typography variant="caption" color="textSecondary">
//                     Rank #{student.performance.rank}
//                   </Typography>
//                 </Box>
//               }
//               onClick={() => setStudentDetail(student)}
//               button
//             >
//               <ListItemAvatar>
//                 <Avatar 
//                   sx={{ 
//                     bgcolor: index < 3 ? 
//                       (index === 0 ? 'gold' : index === 1 ? 'silver' : '#CD7F32') : 
//                       'primary.main' 
//                   }}
//                 >
//                   {index < 3 ? <EmojiEvents /> : student.student.name.charAt(0)}
//                 </Avatar>
//               </ListItemAvatar>
//               <ListItemText
//                 primary={
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Typography fontWeight={600}>
//                       {student.student.name}
//                     </Typography>
//                     <PerformanceBadge 
//                       label={student.performance.performanceCategory.toUpperCase()}
//                       performance={student.performance.performanceCategory}
//                     />
//                     {student.student.course && (
//                       <Chip 
//                         label={student.student.course}
//                         size="small"
//                         variant="outlined"
//                       />
//                     )}
//                   </Box>
//                 }
//                 secondary={
//                   <>
//                     <Typography variant="body2" color="textSecondary">
//                       {student.student.department || 'Department not specified'}
//                     </Typography>
//                     <Box display="flex" alignItems="center" gap={2} mt={0.5}>
//                       <Typography variant="caption">
//                         <strong>Accuracy:</strong> {student.performance.accuracyRate.toFixed(1)}%
//                       </Typography>
//                       <Typography variant="caption">
//                         <strong>Attempts:</strong> {student.performance.totalAttempts}
//                       </Typography>
//                       <Typography variant="caption">
//                         <strong>Consistency:</strong> {student.performance.consistencyScore}%
//                       </Typography>
//                     </Box>
//                   </>
//                 }
//               />
//             </ListItem>
//             {index < analyticsData.data.students.topRankers.length - 1 && <Divider />}
//           </React.Fragment>
//         ))}
//       </List>
//     );
//   };

//   const renderQuizTable = () => {
//     const columns = [
//       { id: 'title', label: 'Quiz Title', minWidth: 200 },
//       { id: 'course', label: 'Course', minWidth: 120 },
//       { id: 'subject', label: 'Subject', minWidth: 120 },
//       { id: 'date', label: 'Date', minWidth: 140 },
//       { id: 'registered', label: 'Registered', minWidth: 100, align: 'center' },
//       { id: 'attempted', label: 'Attempted', minWidth: 100, align: 'center' },
//       { id: 'attendance', label: 'Attendance', minWidth: 120, align: 'center' },
//       { id: 'avgScore', label: 'Avg Score', minWidth: 120, align: 'center' },
//       { id: 'passRate', label: 'Pass Rate', minWidth: 120, align: 'center' },
//       { id: 'difficulty', label: 'Difficulty', minWidth: 100, align: 'center' },
//       { id: 'actions', label: 'Actions', minWidth: 100, align: 'center' }
//     ];

//     const sortedQuizzes = [...filteredQuizzes].sort((a, b) => {
//       return new Date(b.createdAt) - new Date(a.createdAt);
//     });

//     return (
//       <>
//         <TableContainer sx={{ borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}>
//           <Table stickyHeader size="medium">
//             <TableHead>
//               <TableRow>
//                 {columns.map((column) => (
//                   <TableCell
//                     key={column.id}
//                     align={column.align}
//                     sx={{ 
//                       minWidth: column.minWidth, 
//                       fontWeight: 600,
//                       bgcolor: 'background.default',
//                       py: 2
//                     }}
//                   >
//                     <Box display="flex" alignItems="center" gap={0.5}>
//                       {column.label}
//                       <Sort fontSize="small" sx={{ opacity: 0.5 }} />
//                     </Box>
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {sortedQuizzes
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((quiz) => (
//                   <StyledTableRow hover key={quiz.quizId}>
//                     <TableCell>
//                       <Box>
//                         <Typography fontWeight={500}>{quiz.title}</Typography>
//                         <Typography variant="caption" color="textSecondary">
//                           ID: {quiz.quizId?.substring(0, 8)}...
//                         </Typography>
//                       </Box>
//                     </TableCell>
//                     <TableCell>
//                       <Box>
//                         {quiz.course?.map((c, idx) => (
//                           <Chip key={idx} label={c} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
//                         ))}
//                       </Box>
//                     </TableCell>
//                     <TableCell>{quiz.subject}</TableCell>
//                     <TableCell>
//                       <Tooltip title={formatDate(quiz.createdAt)}>
//                         <Typography variant="body2">
//                           {format(new Date(quiz.createdAt), 'MMM dd, yyyy')}
//                         </Typography>
//                       </Tooltip>
//                     </TableCell>
//                     <TableCell align="center">
//                       <Typography fontWeight={500}>
//                         {quiz.registeredStudents}
//                       </Typography>
//                     </TableCell>
//                     <TableCell align="center">
//                       <Typography fontWeight={500} color={
//                         quiz.attemptedStudents > 0 ? 'primary' : 'textSecondary'
//                       }>
//                         {quiz.attemptedStudents}
//                       </Typography>
//                     </TableCell>
//                     <TableCell align="center">
//                       <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
//                         <CircularProgress 
//                           variant="determinate" 
//                           value={quiz.attendanceRate} 
//                           size={24}
//                           thickness={4}
//                           color={getColorByValue(quiz.attendanceRate, 'participation')}
//                         />
//                         <Typography>
//                           {quiz.attendanceRate?.toFixed(1)}%
//                         </Typography>
//                       </Box>
//                     </TableCell>
//                     <TableCell align="center">
//                       <Tooltip title={`Score: ${quiz.averageScore?.toFixed(1)}/${quiz.totalMarks}`}>
//                         <Box>
//                           <Typography 
//                             color={getColorByValue(quiz.averagePercentage)}
//                             fontWeight={600}
//                           >
//                             {quiz.averagePercentage?.toFixed(1)}%
//                           </Typography>
//                           <Typography variant="caption" color="textSecondary">
//                             {quiz.averageScore?.toFixed(1)}/{quiz.totalMarks}
//                           </Typography>
//                         </Box>
//                       </Tooltip>
//                     </TableCell>
//                     <TableCell align="center">
//                       <Chip 
//                         label={`${quiz.passRate?.toFixed(1)}%`}
//                         size="small"
//                         color={
//                           quiz.passRate >= 80 ? 'success' : 
//                           quiz.passRate >= 60 ? 'warning' : 'error'
//                         }
//                         variant="outlined"
//                       />
//                     </TableCell>
//                     <TableCell align="center">
//                       <Chip 
//                         label={quiz.difficultyLevel}
//                         size="small"
//                         icon={
//                           quiz.difficultyLevel === 'Hard' ? <Warning /> :
//                           quiz.difficultyLevel === 'Medium' ? <Info /> :
//                           <CheckCircle />
//                         }
//                         color={
//                           quiz.difficultyLevel === 'Hard' ? 'error' : 
//                           quiz.difficultyLevel === 'Medium' ? 'warning' : 'success'
//                         }
//                       />
//                     </TableCell>
//                     <TableCell align="center">
//                       <Tooltip title="View Details">
//                         <IconButton 
//                           size="small"
//                           onClick={() => setQuizDetail(quiz)}
//                         >
//                           <Visibility />
//                         </IconButton>
//                       </Tooltip>
//                       <Tooltip title="Compare">
//                         <IconButton 
//                           size="small"
//                           onClick={() => {
//                             if (selectedQuizzes.includes(quiz.quizId)) {
//                               setSelectedQuizzes(selectedQuizzes.filter(id => id !== quiz.quizId));
//                             } else {
//                               setSelectedQuizzes([...selectedQuizzes, quiz.quizId]);
//                             }
//                           }}
//                           color={selectedQuizzes.includes(quiz.quizId) ? 'primary' : 'default'}
//                         >
//                           <CompareArrows />
//                         </IconButton>
//                       </Tooltip>
//                     </TableCell>
//                   </StyledTableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25, 50]}
//           component="div"
//           count={sortedQuizzes.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={(event, newPage) => setPage(newPage)}
//           onRowsPerPageChange={(event) => {
//             setRowsPerPage(parseInt(event.target.value, 10));
//             setPage(0);
//           }}
//           sx={{ borderTop: `1px solid ${theme.palette.divider}` }}
//         />
//       </>
//     );
//   };

//   const renderCharts = () => {
//     if (!chartData) return null;

//     return (
//       <Grid container spacing={3}>
//         {/* Performance Trend */}
//         <Grid item xs={12} lg={8}>
//           <GlassCard>
//             <CardContent>
//               <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                 <Typography variant="h6">Performance Trend Over Time</Typography>
//                 <Box display="flex" gap={1}>
//                   <IconButton size="small" onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.1))}>
//                     <ZoomIn />
//                   </IconButton>
//                   <IconButton size="small" onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))}>
//                     <ZoomOut />
//                   </IconButton>
//                 </Box>
//               </Box>
//               <Box sx={{ height: 350 }}>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <ComposedChart data={chartData.timeSeriesData}>
//                     <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.5)} />
//                     <XAxis dataKey="month" />
//                     <YAxis yAxisId="left" />
//                     <YAxis yAxisId="right" orientation="right" />
//                     <RechartsTooltip />
//                     <Legend />
//                     <Line 
//                       yAxisId="left"
//                       type="monotone" 
//                       dataKey="score" 
//                       name="Average Score %" 
//                       stroke="#1976d2" 
//                       strokeWidth={3}
//                       dot={{ r: 4 }}
//                       activeDot={{ r: 6 }}
//                     />
//                     <Area 
//                       yAxisId="right"
//                       type="monotone" 
//                       dataKey="participation" 
//                       name="Participation %" 
//                       stroke="#82ca9d" 
//                       fill="#82ca9d"
//                       fillOpacity={0.3}
//                     />
//                     <Bar 
//                       yAxisId="right"
//                       dataKey="attempts" 
//                       name="Relative Attempts" 
//                       fill="#8884d8"
//                       opacity={0.6}
//                     />
//                   </ComposedChart>
//                 </ResponsiveContainer>
//               </Box>
//             </CardContent>
//           </GlassCard>
//         </Grid>

//         {/* Course Comparison Radar */}
//         <Grid item xs={12} lg={4}>
//           <GlassCard>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>Course Performance Radar</Typography>
//               <Box sx={{ height: 350 }}>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData.courseData}>
//                     <PolarGrid stroke={alpha(theme.palette.divider, 0.5)} />
//                     <PolarAngleAxis dataKey="name" />
//                     <PolarRadiusAxis angle={30} domain={[0, 100]} />
//                     <Radar 
//                       name="Score" 
//                       dataKey="avgScore" 
//                       stroke="#1976d2" 
//                       fill="#1976d2" 
//                       fillOpacity={0.6} 
//                     />
//                     <Radar 
//                       name="Participation" 
//                       dataKey="participation" 
//                       stroke="#82ca9d" 
//                       fill="#82ca9d" 
//                       fillOpacity={0.6} 
//                     />
//                     <Radar 
//                       name="Accuracy" 
//                       dataKey="accuracy" 
//                       stroke="#9c27b0" 
//                       fill="#9c27b0" 
//                       fillOpacity={0.6} 
//                     />
//                     <Legend />
//                     <RechartsTooltip />
//                   </RadarChart>
//                 </ResponsiveContainer>
//               </Box>
//             </CardContent>
//           </GlassCard>
//         </Grid>

//         {/* Performance Distribution */}
//         <Grid item xs={12} md={6}>
//           <GlassCard>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>Student Performance Distribution</Typography>
//               <Box sx={{ height: 300 }}>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <RechartsBarChart data={chartData.performanceData}>
//                     <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.5)} />
//                     <XAxis dataKey="category" />
//                     <YAxis />
//                     <RechartsTooltip />
//                     <Legend />
//                     <Bar dataKey="value" name="Number of Students" radius={[4, 4, 0, 0]}>
//                       {chartData.performanceData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={
//                           entry.category === 'Excellent' ? '#2e7d32' :
//                           entry.category === 'Good' ? '#0288d1' :
//                           entry.category === 'Average' ? '#ed6c02' :
//                           entry.category === 'Poor' ? '#d32f2f' : '#757575'
//                         } />
//                       ))}
//                     </Bar>
//                   </RechartsBarChart>
//                 </ResponsiveContainer>
//               </Box>
//             </CardContent>
//           </GlassCard>
//         </Grid>

//         {/* Difficulty Distribution */}
//         <Grid item xs={12} md={6}>
//           <GlassCard>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>Quiz Difficulty Distribution</Typography>
//               <Box sx={{ height: 300 }}>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <RechartsPieChart>
//                     <Pie
//                       data={chartData.difficultyData}
//                       cx="50%"
//                       cy="50%"
//                       labelLine={false}
//                       label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
//                       outerRadius={80}
//                       fill="#8884d8"
//                       dataKey="value"
//                     >
//                       {chartData.difficultyData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={
//                           entry.name === 'Hard' ? '#d32f2f' : 
//                           entry.name === 'Medium' ? '#ed6c02' : '#2e7d32'
//                         } />
//                       ))}
//                     </Pie>
//                     <RechartsTooltip formatter={(value) => [`${value} quizzes`, 'Count']} />
//                   </RechartsPieChart>
//                 </ResponsiveContainer>
//               </Box>
//             </CardContent>
//           </GlassCard>
//         </Grid>
//       </Grid>
//     );
//   };

//   const renderRecommendations = () => {
//     if (!analyticsData?.data?.recommendations) return null;

//     return (
//       <Grid container spacing={2}>
//         {analyticsData.data.recommendations.map((rec, index) => (
//           <Grid item xs={12} key={index}>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//             >
//               <Paper sx={{ 
//                 p: 3, 
//                 borderRadius: 2,
//                 borderLeft: `4px solid ${
//                   rec.priority === 'high' ? theme.palette.error.main :
//                   rec.priority === 'medium' ? theme.palette.warning.main :
//                   theme.palette.info.main
//                 }`
//               }}>
//                 <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
//                   <Box>
//                     <Typography variant="h6" gutterBottom>
//                       {rec.title}
//                     </Typography>
//                     <Chip 
//                       label={`${rec.priority.toUpperCase()} PRIORITY`}
//                       size="small"
//                       color={
//                         rec.priority === 'high' ? 'error' :
//                         rec.priority === 'medium' ? 'warning' : 'info'
//                       }
//                       sx={{ mb: 1 }}
//                     />
//                   </Box>
//                   <IconButton size="small">
//                     <Lightbulb />
//                   </IconButton>
//                 </Box>
//                 <Typography variant="body1" paragraph color="text.secondary">
//                   {rec.description}
//                 </Typography>
                
//                 <Typography variant="subtitle2" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
//                   Action Items:
//                 </Typography>
//                 <List dense>
//                   {rec.actionItems.map((item, idx) => (
//                     <ListItem key={idx} sx={{ py: 0.5 }}>
//                       <ListItemText 
//                         primary={
//                           <Typography variant="body2">
//                             • {item}
//                           </Typography>
//                         }
//                       />
//                     </ListItem>
//                   ))}
//                 </List>
                
//                 <Box mt={2} p={1.5} bgcolor="action.hover" borderRadius={1}>
//                   <Typography variant="caption" fontWeight={500}>
//                     Expected Impact: {rec.expectedImpact}
//                   </Typography>
//                 </Box>
//               </Paper>
//             </motion.div>
//           </Grid>
//         ))}
//       </Grid>
//     );
//   };

//   const renderPredictiveAnalytics = () => {
//     if (!analyticsData?.data?.predictive) return null;

//     const predictive = analyticsData.data.predictive;
    
//     if (!predictive.available) {
//       return (
//         <Alert severity="info" sx={{ borderRadius: 2 }}>
//           <Typography variant="subtitle1" gutterBottom>
//             Predictive Analytics Unavailable
//           </Typography>
//           <Typography variant="body2">
//             {predictive.message}
//           </Typography>
//           <Box mt={1}>
//             <Typography variant="caption" display="block">
//               • Required Quizzes: {predictive.minimumRequirements?.requiredQuizzes || 3}
//             </Typography>
//             <Typography variant="caption" display="block">
//               • Current Quizzes: {predictive.minimumRequirements?.currentQuizzes || 0}
//             </Typography>
//             <Typography variant="caption" display="block">
//               • Required Attempts: {predictive.minimumRequirements?.requiredAttempts || 10}
//             </Typography>
//             <Typography variant="caption" display="block">
//               • Current Attempts: {predictive.minimumRequirements?.currentAttempts || 0}
//             </Typography>
//           </Box>
//         </Alert>
//       );
//     }

//     return (
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={6}>
//           <GlassCard>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Next Quiz Performance Prediction
//               </Typography>
//               <Box textAlign="center" py={3}>
//                 <CircularProgress 
//                   variant="determinate" 
//                   value={predictive.nextQuizPrediction?.confidence || 75}
//                   size={120}
//                   thickness={4}
//                   sx={{ mb: 2 }}
//                 />
//                 <Typography variant="h3" gutterBottom>
//                   {predictive.nextQuizPrediction?.predictedAverageScore?.toFixed(1)}%
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Predicted Average Score
//                 </Typography>
//                 <Chip 
//                   label={`${predictive.nextQuizPrediction?.trend?.toUpperCase()} TREND`}
//                   color={predictive.nextQuizPrediction?.trend === 'improving' ? 'success' : 'warning'}
//                   sx={{ mt: 2 }}
//                 />
//               </Box>
//             </CardContent>
//           </GlassCard>
//         </Grid>
        
//         <Grid item xs={12} md={6}>
//           <GlassCard>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Performance Trends
//               </Typography>
//               <Box py={2}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={6}>
//                     <Paper sx={{ p: 2, textAlign: 'center' }}>
//                       <Typography variant="h4" color="success.main">
//                         {predictive.recentPerformance?.toFixed(1)}%
//                       </Typography>
//                       <Typography variant="caption">Recent Performance</Typography>
//                     </Paper>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Paper sx={{ p: 2, textAlign: 'center' }}>
//                       <Typography variant="h4" color="primary.main">
//                         {predictive.historicalPerformance?.toFixed(1)}%
//                       </Typography>
//                       <Typography variant="caption">Historical Average</Typography>
//                     </Paper>
//                   </Grid>
//                 </Grid>
                
//                 <Box mt={3}>
//                   <Typography variant="body2" gutterBottom>
//                     <strong>Recommendation:</strong> {predictive.nextQuizPrediction?.recommendation}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     Based on {predictive.dataQuality?.totalDataPoints} data points over {predictive.dataQuality?.timeSpanDays} days
//                   </Typography>
//                 </Box>
//               </Box>
//             </CardContent>
//           </GlassCard>
//         </Grid>
//       </Grid>
//     );
//   };

//   if (loading && !analyticsData) {
//     return <LoadingSkeleton />;
//   }

//   if (error) {
//     return (
//       <Container maxWidth="xl">
//         <ErrorFallback error={new Error(error)} resetErrorBoundary={fetchAnalytics} />
//       </Container>
//     );
//   }

//   if (!analyticsData) {
//     return (
//       <Container maxWidth="xl" sx={{ mt: 4 }}>
//         <Alert severity="info" sx={{ borderRadius: 2 }}>
//           <Typography variant="h6" gutterBottom>
//             Welcome to Faculty Analytics
//           </Typography>
//           <Typography paragraph>
//             No analytics data available yet. Start by creating quizzes and having students attempt them to unlock powerful insights.
//           </Typography>
//           <Button variant="contained" startIcon={<Add />}>
//             Create Your First Quiz
//           </Button>
//         </Alert>
//       </Container>
//     );
//   }

//   const tabLabels = [
//     { label: 'Overview', icon: <Dashboard /> },
//     { label: 'Deep Analytics', icon: <Insights /> },
//     { label: 'Quizzes', icon: <Assessment /> },
//     { label: 'Courses', icon: <School /> },
//     { label: 'Students', icon: <People /> },
//     { label: 'Trends', icon: <Timeline /> },
//     { label: 'Predictive', icon: <AutoGraph /> },
//     { label: 'Charts', icon: <BarChartIcon /> },
//     { label: 'Reports', icon: <InsertChart /> },
//   ];

//   return (
//     <ThemeProvider theme={theme}>
//       <Container maxWidth="xl" sx={{ py: isMobile ? 2 : 3, px: isMobile ? 1 : 3 }}>
//         {/* Header with Stats */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <GlassCard sx={{ mb: 3, p: 2 }}>
//             <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <Box display="flex" alignItems="center" gap={2}>
//                   <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
//                     <AnalyticsIcon />
//                   </Avatar>
//                   <Box>
//                     <Typography variant="h5" fontWeight={700}>
//                       Faculty Analytics Dashboard
//                     </Typography>
//                     <Box display="flex" alignItems="center" gap={2} mt={0.5}>
//                       <Chip 
//                         icon={<Person />}
//                         label={`Prof. ${analyticsData.data.summary.facultyName}`}
//                         size="small"
//                         variant="outlined"
//                       />
//                       <Chip 
//                         icon={<SchoolIcon />}
//                         label={analyticsData.data.summary.department}
//                         size="small"
//                         variant="outlined"
//                       />
//                       <Typography variant="caption" color="text.secondary">
//                         Last updated: {formatDate(analyticsData.data.summary.lastUpdated)}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </Box>
//               </Grid>
              
//               <Grid item xs={12} md={6}>
//                 <Box display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
//                   <Tooltip title="Auto Refresh">
//                     <FormControlLabel
//                       control={
//                         <Switch
//                           checked={autoRefresh}
//                           onChange={(e) => setAutoRefresh(e.target.checked)}
//                           size="small"
//                         />
//                       }
//                       label="Auto"
//                     />
//                   </Tooltip>
                  
//                   <Tooltip title="Refresh Data">
//                     <IconButton onClick={fetchAnalytics} size="small">
//                       <Refresh />
//                     </IconButton>
//                   </Tooltip>
                  
//                   <Tooltip title="Export">
//                     <IconButton onClick={handleExportClick} size="small">
//                       <Download />
//                     </IconButton>
//                   </Tooltip>
                  
//                   <Menu
//                     anchorEl={exportMenuAnchor}
//                     open={Boolean(exportMenuAnchor)}
//                     onClose={handleExportClose}
//                   >
//                     <MenuItem onClick={handleExportClose}>
//                       <Download /> Export as PDF Report
//                     </MenuItem>
//                     <MenuItem onClick={handleExportClose}>
//                       <TableChart /> Export as CSV
//                     </MenuItem>
//                     <MenuItem onClick={handleExportClose}>
//                       <BarChartIcon /> Export Charts Only
//                     </MenuItem>
//                     <Divider />
//                     <MenuItem onClick={handleExportClose}>
//                       <Print /> Print Summary
//                     </MenuItem>
//                   </Menu>
                  
//                   <Tooltip title="Settings">
//                     <IconButton onClick={handleSettingsClick} size="small">
//                       <Settings />
//                     </IconButton>
//                   </Tooltip>
                  
//                   <Menu
//                     anchorEl={settingsMenuAnchor}
//                     open={Boolean(settingsMenuAnchor)}
//                     onClose={handleSettingsClose}
//                   >
//                     <MenuItem onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
//                       View as {viewMode === 'grid' ? 'List' : 'Grid'}
//                     </MenuItem>
//                     <MenuItem onClick={() => setShowFilters(!showFilters)}>
//                       {showFilters ? 'Hide' : 'Show'} Filters
//                     </MenuItem>
//                     <MenuItem onClick={() => setCompareMode(!compareMode)}>
//                       {compareMode ? 'Disable' : 'Enable'} Compare Mode
//                     </MenuItem>
//                     <Divider />
//                     <MenuItem onClick={() => setZoomLevel(1)}>Reset Zoom</MenuItem>
//                   </Menu>
//                 </Box>
//               </Grid>
//             </Grid>
//           </GlassCard>
//         </motion.div>

//         {/* Filters Section */}
//         {showFilters && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//           >
//             <GlassCard sx={{ mb: 3, p: 2 }}>
//               <Grid container spacing={2} alignItems="center">
//                 <Grid item xs={12} sm={6} md={3}>
//                   <TextField
//                     fullWidth
//                     size="small"
//                     placeholder="Search quizzes, students..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <Search />
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                 </Grid>
                
//                 <Grid item xs={6} sm={3} md={2}>
//                   <FormControl fullWidth size="small">
//                     <InputLabel>Course</InputLabel>
//                     <Select
//                       value={courseFilter}
//                       label="Course"
//                       onChange={(e) => setCourseFilter(e.target.value)}
//                     >
//                       <MenuItem value="all">All Courses</MenuItem>
//                       {uniqueCourses.map((course) => (
//                         <MenuItem key={course} value={course}>
//                           {course}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </Grid>
                
//                 <Grid item xs={6} sm={3} md={2}>
//                   <FormControl fullWidth size="small">
//                     <InputLabel>Performance</InputLabel>
//                     <Select
//                       value={performanceFilter}
//                       label="Performance"
//                       onChange={(e) => setPerformanceFilter(e.target.value)}
//                     >
//                       <MenuItem value="all">All Levels</MenuItem>
//                       <MenuItem value="excellent">Excellent (80%+)</MenuItem>
//                       <MenuItem value="good">Good (60-79%)</MenuItem>
//                       <MenuItem value="average">Average (40-59%)</MenuItem>
//                       <MenuItem value="poor">Poor (20-39%)</MenuItem>
//                       <MenuItem value="fail">Fail (&lt;20%)</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
                
//                 <Grid item xs={6} sm={3} md={2}>
//                   <FormControl fullWidth size="small">
//                     <InputLabel>Timeframe</InputLabel>
//                     <Select
//                       value={timeframe}
//                       label="Timeframe"
//                       onChange={(e) => setTimeframe(e.target.value)}
//                     >
//                       <MenuItem value="today">Today</MenuItem>
//                       <MenuItem value="week">Last Week</MenuItem>
//                       <MenuItem value="month">Last Month</MenuItem>
//                       <MenuItem value="quarter">Last Quarter</MenuItem>
//                       <MenuItem value="year">Last Year</MenuItem>
//                       <MenuItem value="all">All Time</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
                
//                 <Grid item xs={6} sm={3} md={2}>
//                   <Button
//                     fullWidth
//                     size="small"
//                     variant="outlined"
//                     startIcon={<FilterList />}
//                     onClick={() => {
//                       setSearchTerm('');
//                       setCourseFilter('all');
//                       setPerformanceFilter('all');
//                       setTimeframe('all');
//                       setGenderFilter('all');
//                     }}
//                   >
//                     Clear All
//                   </Button>
//                 </Grid>
//               </Grid>
              
//               {compareMode && selectedQuizzes.length > 0 && (
//                 <Box mt={2} p={1} bgcolor="action.selected" borderRadius={1}>
//                   <Typography variant="caption" fontWeight={500}>
//                     Comparing {selectedQuizzes.length} quizzes
//                   </Typography>
//                   <Button size="small" onClick={() => setSelectedQuizzes([])} sx={{ ml: 1 }}>
//                     Clear Selection
//                   </Button>
//                 </Box>
//               )}
//             </GlassCard>
//           </motion.div>
//         )}

//         {/* Main Content Tabs */}
//         <Paper sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
//           <AnalyticsTabs 
//             value={tabValue}
//             onChange={handleTabChange}
//             variant="scrollable"
//             scrollButtons="auto"
//             allowScrollButtonsMobile
//           >
//             {tabLabels.map((tab, index) => (
//               <Tab 
//                 key={index} 
//                 label={isMobile ? '' : tab.label}
//                 icon={isMobile ? tab.icon : undefined}
//                 iconPosition="start"
//                 {...(isMobile ? {} : { icon: tab.icon })}
//               />
//             ))}
//           </AnalyticsTabs>
//         </Paper>

//         {/* Tab Content */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={tabValue}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.2 }}
//           >
//             {/* Overview Tab */}
//             {tabValue === 0 && (
//               <Box>
//                 {/* Alerts */}
//                 {analyticsData.data.insights?.alerts?.length > 0 && (
//                   <Box mb={3}>
//                     <Typography variant="h6" gutterBottom>
//                       System Alerts
//                     </Typography>
//                     {renderAlerts()}
//                   </Box>
//                 )}

//                 {/* Key Metrics */}
//                 <Box mb={4}>
//                   <Typography variant="h6" gutterBottom>
//                     Key Performance Indicators
//                   </Typography>
//                   {renderMetrics()}
//                 </Box>

//                 {/* Charts */}
//                 <Box mb={4}>
//                   <Typography variant="h6" gutterBottom>
//                     Performance Overview
//                   </Typography>
//                   {renderCharts()}
//                 </Box>

//                 {/* Recommendations */}
//                 {analyticsData.data.recommendations?.length > 0 && (
//                   <Box mb={4}>
//                     <Typography variant="h6" gutterBottom>
//                       Actionable Recommendations
//                     </Typography>
//                     {renderRecommendations()}
//                   </Box>
//                 )}

//                 {/* Data Quality */}
//                 {analyticsData.data.dataQuality && (
//                   <GlassCard>
//                     <CardContent>
//                       <Typography variant="h6" gutterBottom>
//                         Data Quality & Reliability
//                       </Typography>
//                       <Grid container spacing={2}>
//                         <Grid item xs={12} md={6}>
//                           <Box p={2} bgcolor="background.default" borderRadius={1}>
//                             <Typography variant="subtitle2" gutterBottom>
//                               Data Completeness
//                             </Typography>
//                             <Box display="flex" alignItems="center" gap={2}>
//                               <CircularProgress 
//                                 variant="determinate" 
//                                 value={analyticsData.data.dataQuality.completeness.percentage}
//                                 size={80}
//                                 thickness={4}
//                                 color={
//                                   analyticsData.data.dataQuality.completeness.percentage > 80 ? 'success' :
//                                   analyticsData.data.dataQuality.completeness.percentage > 50 ? 'warning' : 'error'
//                                 }
//                               />
//                               <Box>
//                                 <Typography variant="h5">
//                                   {analyticsData.data.dataQuality.completeness.percentage.toFixed(1)}%
//                                 </Typography>
//                                 <Typography variant="caption" color="text.secondary">
//                                   {analyticsData.data.dataQuality.completeness.quizzesWithAttempts} of {analyticsData.data.dataQuality.completeness.totalQuizzes} quizzes have data
//                                 </Typography>
//                               </Box>
//                             </Box>
//                           </Box>
//                         </Grid>
//                         <Grid item xs={12} md={6}>
//                           <Box p={2} bgcolor="background.default" borderRadius={1}>
//                             <Typography variant="subtitle2" gutterBottom>
//                               Data Freshness
//                             </Typography>
//                             <Typography variant="body2">
//                               Last Updated: {formatDate(analyticsData.data.summary.lastUpdated)}
//                             </Typography>
//                             <Typography variant="body2">
//                               Computation Time: {analyticsData.computationTime}ms
//                             </Typography>
//                             <Typography variant="caption" color="text.secondary">
//                               Data Source: {analyticsData.data.dataQuality.reliability.dataSource}
//                             </Typography>
//                           </Box>
//                         </Grid>
//                       </Grid>
//                     </CardContent>
//                   </GlassCard>
//                 )}
//               </Box>
//             )}

//             {/* Deep Analytics Tab */}
//             {tabValue === 1 && (
//               <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                   <Typography variant="h6" gutterBottom>
//                     Comprehensive Analytics
//                   </Typography>
//                 </Grid>
                
//                 {/* Course Performance */}
//                 <Grid item xs={12} md={6}>
//                   <GlassCard>
//                     <CardContent>
//                       <Typography variant="h6" gutterBottom>
//                         Course-wise Performance
//                       </Typography>
//                       <TableContainer>
//                         <Table size="small">
//                           <TableHead>
//                             <TableRow>
//                               <TableCell>Course</TableCell>
//                               <TableCell align="center">Avg Score</TableCell>
//                               <TableCell align="center">Participation</TableCell>
//                               <TableCell align="center">Pass Rate</TableCell>
//                             </TableRow>
//                           </TableHead>
//                           <TableBody>
//                             {analyticsData.data.courses?.map((course, index) => (
//                               <TableRow key={index} hover>
//                                 <TableCell>
//                                   <Typography fontWeight={500}>{course.course}</Typography>
//                                 </TableCell>
//                                 <TableCell align="center">
//                                   <Chip 
//                                     label={`${course.averagePercentage.toFixed(1)}%`}
//                                     size="small"
//                                     color={getColorByValue(course.averagePercentage)}
//                                   />
//                                 </TableCell>
//                                 <TableCell align="center">
//                                   <Chip 
//                                     label={`${course.participationRate.toFixed(1)}%`}
//                                     size="small"
//                                     color={getColorByValue(course.participationRate, 'participation')}
//                                     variant="outlined"
//                                   />
//                                 </TableCell>
//                                 <TableCell align="center">
//                                   <Chip 
//                                     label={`${course.passRate.toFixed(1)}%`}
//                                     size="small"
//                                     color={
//                                       course.passRate >= 80 ? 'success' :
//                                       course.passRate >= 60 ? 'warning' : 'error'
//                                     }
//                                   />
//                                 </TableCell>
//                               </TableRow>
//                             ))}
//                           </TableBody>
//                         </Table>
//                       </TableContainer>
//                     </CardContent>
//                   </GlassCard>
//                 </Grid>

//                 {/* Student Demographics */}
//                 <Grid item xs={12} md={6}>
//                   <GlassCard>
//                     <CardContent>
//                       <Typography variant="h6" gutterBottom>
//                         Student Performance Distribution
//                       </Typography>
//                       <Box sx={{ height: 300 }}>
//                         <ResponsiveContainer width="100%" height="100%">
//                           <RechartsBarChart data={chartData?.performanceData}>
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis dataKey="category" />
//                             <YAxis />
//                             <RechartsTooltip />
//                             <Bar dataKey="value" name="Students" radius={[4, 4, 0, 0]}>
//                               {chartData?.performanceData?.map((entry, index) => (
//                                 <Cell key={`cell-${index}`} fill={
//                                   entry.category === 'Excellent' ? '#2e7d32' :
//                                   entry.category === 'Good' ? '#0288d1' :
//                                   entry.category === 'Average' ? '#ed6c02' :
//                                   entry.category === 'Poor' ? '#d32f2f' : '#757575'
//                                 } />
//                               ))}
//                             </Bar>
//                           </RechartsBarChart>
//                         </ResponsiveContainer>
//                       </Box>
//                     </CardContent>
//                   </GlassCard>
//                 </Grid>

//                 {/* Time Analysis */}
//                 <Grid item xs={12}>
//                   <GlassCard>
//                     <CardContent>
//                       <Typography variant="h6" gutterBottom>
//                         Time-based Performance Analysis
//                       </Typography>
//                       <Grid container spacing={2}>
//                         <Grid item xs={12} md={4}>
//                           <Paper sx={{ p: 2, textAlign: 'center' }}>
//                             <Typography variant="h3" color="primary">
//                               {analyticsData.data.overview.averageTimePerAttempt}s
//                             </Typography>
//                             <Typography variant="body2">Avg Time per Attempt</Typography>
//                           </Paper>
//                         </Grid>
//                         <Grid item xs={12} md={4}>
//                           <Paper sx={{ p: 2, textAlign: 'center' }}>
//                             <Typography variant="h3" color="success">
//                               {analyticsData.data.trends?.engagement?.completionRate.toFixed(1)}%
//                             </Typography>
//                             <Typography variant="body2">Completion Rate</Typography>
//                           </Paper>
//                         </Grid>
//                         <Grid item xs={12} md={4}>
//                           <Paper sx={{ p: 2, textAlign: 'center' }}>
//                             <Typography variant="h3" color="warning">
//                               {analyticsData.data.trends?.engagement?.dropoutRate.toFixed(1)}%
//                             </Typography>
//                             <Typography variant="body2">Dropout Rate</Typography>
//                           </Paper>
//                         </Grid>
//                       </Grid>
//                     </CardContent>
//                   </GlassCard>
//                 </Grid>
//               </Grid>
//             )}

//             {/* Quizzes Tab */}
//             {tabValue === 2 && (
//               <Box>
//                 <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                   <Typography variant="h6">
//                     Quiz Performance Analysis
//                   </Typography>
//                   <Box display="flex" gap={1}>
//                     <Button 
//                       size="small" 
//                       startIcon={<CompareArrows />}
//                       variant={compareMode ? "contained" : "outlined"}
//                       onClick={() => setCompareMode(!compareMode)}
//                     >
//                       Compare
//                     </Button>
//                     <Button 
//                       size="small" 
//                       startIcon={<FilterList />}
//                       onClick={() => setShowFilters(!showFilters)}
//                     >
//                       Filters
//                     </Button>
//                   </Box>
//                 </Box>
//                 {renderQuizTable()}
//               </Box>
//             )}

//             {/* Courses Tab */}
//             {tabValue === 3 && (
//               <Grid container spacing={3}>
//                 {analyticsData.data.courses?.map((course, index) => (
//                   <Grid item xs={12} md={6} lg={4} key={index}>
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0.9 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ delay: index * 0.1 }}
//                     >
//                       <GlassCard>
//                         <CardContent>
//                           <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
//                             <Box>
//                               <Typography variant="h6" gutterBottom>
//                                 {course.course}
//                               </Typography>
//                               <Chip 
//                                 label={course.difficultyLevel}
//                                 size="small"
//                                 color={
//                                   course.difficultyLevel === 'Hard' ? 'error' :
//                                   course.difficultyLevel === 'Medium' ? 'warning' : 'success'
//                                 }
//                                 sx={{ mb: 1 }}
//                               />
//                             </Box>
//                             <IconButton 
//                               size="small"
//                               onClick={() => setCourseDetail(course)}
//                             >
//                               <Visibility />
//                             </IconButton>
//                           </Box>
                          
//                           <Grid container spacing={1}>
//                             <Grid item xs={6}>
//                               <Paper sx={{ p: 1.5, textAlign: 'center' }}>
//                                 <Typography variant="h5" color="primary">
//                                   {course.averagePercentage.toFixed(1)}%
//                                 </Typography>
//                                 <Typography variant="caption">Avg Score</Typography>
//                               </Paper>
//                             </Grid>
//                             <Grid item xs={6}>
//                               <Paper sx={{ p: 1.5, textAlign: 'center' }}>
//                                 <Typography variant="h5" color="info">
//                                   {course.participationRate.toFixed(1)}%
//                                 </Typography>
//                                 <Typography variant="caption">Participation</Typography>
//                               </Paper>
//                             </Grid>
//                             <Grid item xs={6}>
//                               <Paper sx={{ p: 1.5, textAlign: 'center' }}>
//                                 <Typography variant="h5" color="success">
//                                   {course.passRate.toFixed(1)}%
//                                 </Typography>
//                                 <Typography variant="caption">Pass Rate</Typography>
//                               </Paper>
//                             </Grid>
//                             <Grid item xs={6}>
//                               <Paper sx={{ p: 1.5, textAlign:"center" }}>
//                                 <Typography variant="h5" color="warning">
//                                   {course.averageAccuracy.toFixed(1)}%
//                                 </Typography>
//                                 <Typography variant="caption">Accuracy</Typography>
//                               </Paper>
//                             </Grid>
//                           </Grid>
                          
//                           <Box mt={2}>
//                             <Typography variant="caption" color="text.secondary">
//                               • {course.totalQuizzes} quizzes
//                             </Typography>
//                             <Typography variant="caption" color="text.secondary" display="block">
//                               • {course.totalRegisteredStudents} registered students
//                             </Typography>
//                             <Typography variant="caption" color="text.secondary" display="block">
//                               • {course.totalAttempts} total attempts
//                             </Typography>
//                           </Box>
//                         </CardContent>
//                       </GlassCard>
//                     </motion.div>
//                   </Grid>
//                 ))}
//               </Grid>
//             )}

//             {/* Students Tab */}
//             {tabValue === 4 && (
//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={8}>
//                   <GlassCard>
//                     <CardContent>
//                       <Typography variant="h6" gutterBottom>
//                         Top Performers
//                       </Typography>
//                       {renderTopPerformers()}
//                     </CardContent>
//                   </GlassCard>
//                 </Grid>
                
//                 <Grid item xs={12} md={4}>
//                   <GlassCard>
//                     <CardContent>
//                       <Typography variant="h6" gutterBottom>
//                         Performance Summary
//                       </Typography>
//                       <Box py={2}>
//                         <Grid container spacing={2}>
//                           <Grid item xs={6}>
//                             <Paper sx={{ p: 2, textAlign: 'center' }}>
//                               <Typography variant="h4">
//                                 {analyticsData.data.students.totalStudents}
//                               </Typography>
//                               <Typography variant="caption">Total Students</Typography>
//                             </Paper>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Paper sx={{ p: 2, textAlign: 'center' }}>
//                               <Typography variant="h4" color="primary">
//                                 {analyticsData.data.students.averageStudentPercentage.toFixed(1)}%
//                               </Typography>
//                               <Typography variant="caption">Avg Score</Typography>
//                             </Paper>
//                           </Grid>
//                         </Grid>
                        
//                         <Box mt={3}>
//                           <Typography variant="subtitle2" gutterBottom>
//                             Performance Categories:
//                           </Typography>
//                           {Object.entries(analyticsData.data.students.distribution || {}).map(([key, value]) => (
//                             <Box key={key} display="flex" justifyContent="space-between" mb={1}>
//                               <Typography variant="body2">
//                                 {key.charAt(0).toUpperCase() + key.slice(1)}:
//                               </Typography>
//                               <Typography variant="body2" fontWeight={500}>
//                                 {value} students
//                               </Typography>
//                             </Box>
//                           ))}
//                         </Box>
//                       </Box>
//                     </CardContent>
//                   </GlassCard>
//                 </Grid>
//               </Grid>
//             )}

//             {/* Trends Tab */}
//             {tabValue === 5 && (
//               <Box>
//                 <Typography variant="h6" gutterBottom>
//                   Performance Trends & Patterns
//                 </Typography>
                
//                 {/* Monthly Trends */}
//                 <GlassCard sx={{ mb: 3 }}>
//                   <CardContent>
//                     <Typography variant="h6" gutterBottom>
//                       Monthly Performance Trends
//                     </Typography>
//                     <Box sx={{ height: 400 }}>
//                       <ResponsiveContainer width="100%" height="100%">
//                         <AreaChart data={chartData?.timeSeriesData}>
//                           <CartesianGrid strokeDasharray="3 3" />
//                           <XAxis dataKey="month" />
//                           <YAxis />
//                           <RechartsTooltip />
//                           <Legend />
//                           <Area 
//                             type="monotone" 
//                             dataKey="score" 
//                             name="Average Score %" 
//                             stroke="#1976d2" 
//                             fill="#1976d2"
//                             fillOpacity={0.3}
//                           />
//                           <Area 
//                             type="monotone" 
//                             dataKey="participation" 
//                             name="Participation %" 
//                             stroke="#82ca9d" 
//                             fill="#82ca9d"
//                             fillOpacity={0.3}
//                           />
//                         </AreaChart>
//                       </ResponsiveContainer>
//                     </Box>
//                   </CardContent>
//                 </GlassCard>

//                 {/* Engagement Metrics */}
//                 <Grid container spacing={3}>
//                   <Grid item xs={12} md={6}>
//                     <GlassCard>
//                       <CardContent>
//                         <Typography variant="h6" gutterBottom>
//                           Engagement Metrics
//                         </Typography>
//                         <Box>
//                           <Typography variant="body2" gutterBottom>
//                             Engagement Level: 
//                             <Chip 
//                               label={analyticsData.data.trends?.engagement?.engagementLevel}
//                               size="small"
//                               color={
//                                 analyticsData.data.trends?.engagement?.engagementLevel === 'Excellent' ? 'success' :
//                                 analyticsData.data.trends?.engagement?.engagementLevel === 'Good' ? 'info' :
//                                 analyticsData.data.trends?.engagement?.engagementLevel === 'Average' ? 'warning' : 'error'
//                               }
//                               sx={{ ml: 1 }}
//                             />
//                           </Typography>
                          
//                           <Box mt={2}>
//                             <Grid container spacing={2}>
//                               <Grid item xs={6}>
//                                 <Paper sx={{ p: 2, textAlign: 'center' }}>
//                                   <Typography variant="h4" color="success">
//                                     {analyticsData.data.trends?.engagement?.completionRate.toFixed(1)}%
//                                   </Typography>
//                                   <Typography variant="caption">Completion Rate</Typography>
//                                 </Paper>
//                               </Grid>
//                               <Grid item xs={6}>
//                                 <Paper sx={{ p: 2, textAlign: 'center' }}>
//                                   <Typography variant="h4" color="error">
//                                     {analyticsData.data.trends?.engagement?.dropoutRate.toFixed(1)}%
//                                   </Typography>
//                                   <Typography variant="caption">Dropout Rate</Typography>
//                                 </Paper>
//                               </Grid>
//                             </Grid>
//                           </Box>
//                         </Box>
//                       </CardContent>
//                     </GlassCard>
//                   </Grid>
                  
//                   <Grid item xs={12} md={6}>
//                     <GlassCard>
//                       <CardContent>
//                         <Typography variant="h6" gutterBottom>
//                           Growth Analysis
//                         </Typography>
//                         <Box textAlign="center" py={3}>
//                           <CircularProgress 
//                             variant="determinate" 
//                             value={Math.min(100, Math.abs(analyticsData.data.trends?.timeBased?.growthRate || 0))}
//                             size={120}
//                             thickness={4}
//                             color={
//                               (analyticsData.data.trends?.timeBased?.growthRate || 0) > 0 ? 'success' : 'error'
//                             }
//                           />
//                           <Typography variant="h3" gutterBottom sx={{ mt: 2 }}>
//                             {analyticsData.data.trends?.timeBased?.growthRate?.toFixed(1)}%
//                           </Typography>
//                           <Typography variant="body2" color="text.secondary">
//                             Quiz Creation Growth Rate
//                           </Typography>
//                         </Box>
//                       </CardContent>
//                     </GlassCard>
//                   </Grid>
//                 </Grid>
//               </Box>
//             )}

//             {/* Predictive Tab */}
//             {tabValue === 6 && (
//               <Box>
//                 <Typography variant="h6" gutterBottom>
//                   Predictive Analytics & Forecasts
//                 </Typography>
//                 {renderPredictiveAnalytics()}
//               </Box>
//             )}

//             {/* Charts Tab */}
//             {tabValue === 7 && renderCharts()}

//             {/* Reports Tab */}
//             {tabValue === 8 && (
//               <Box>
//                 <Typography variant="h6" gutterBottom>
//                   Advanced Reports & Insights
//                 </Typography>
                
//                 <Grid container spacing={3}>
//                   <Grid item xs={12} md={6}>
//                     <GlassCard>
//                       <CardContent>
//                         <Typography variant="h6" gutterBottom>
//                           Detailed Performance Report
//                         </Typography>
//                         <List>
//                           <ListItem>
//                             <ListItemText 
//                               primary="Overall Performance Score"
//                               secondary={`${analyticsData.data.overview.averagePercentage.toFixed(1)}%`}
//                             />
//                           </ListItem>
//                           <ListItem>
//                             <ListItemText 
//                               primary="Student Engagement Index"
//                               secondary={`${analyticsData.data.overview.participationRate.toFixed(1)}%`}
//                             />
//                           </ListItem>
//                           <ListItem>
//                             <ListItemText 
//                               primary="Question Effectiveness"
//                               secondary={`${analyticsData.data.overview.averageAccuracy.toFixed(1)}% accuracy`}
//                             />
//                           </ListItem>
//                           <ListItem>
//                             <ListItemText 
//                               primary="Assessment Quality"
//                               secondary={`${analyticsData.data.overview.passRate.toFixed(1)}% pass rate`}
//                             />
//                           </ListItem>
//                         </List>
//                       </CardContent>
//                     </GlassCard>
//                   </Grid>
                  
//                   <Grid item xs={12} md={6}>
//                     <GlassCard>
//                       <CardContent>
//                         <Typography variant="h6" gutterBottom>
//                           Quick Insights
//                         </Typography>
//                         <List dense>
//                           {analyticsData.data.insights?.keyFindings?.map((finding, index) => (
//                             <ListItem key={index}>
//                               <ListItemText 
//                                 primary={finding.title}
//                                 secondary={finding.description}
//                               />
//                             </ListItem>
//                           ))}
//                         </List>
//                       </CardContent>
//                     </GlassCard>
//                   </Grid>
//                 </Grid>
//               </Box>
//             )}
//           </motion.div>
//         </AnimatePresence>

//         {/* Footer */}
//         <Box mt={4} pt={2} borderTop={1} borderColor="divider">
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={4}>
//               <Typography variant="caption" color="text.secondary">
//                 Data refreshed every 5 minutes
//               </Typography>
//             </Grid>
//             <Grid item xs={12} md={4} textAlign="center">
//               <Typography variant="caption" color="text.secondary">
//                 Computation Time: {analyticsData.computationTime}ms
//               </Typography>
//             </Grid>
//             <Grid item xs={12} md={4} textAlign="right">
//               <Typography variant="caption" color="text.secondary">
//                 Analytics ID: {analyticsData.data.summary.facultyId}
//               </Typography>
//             </Grid>
//           </Grid>
//         </Box>

//         {/* Speed Dial for Quick Actions */}
//         <SpeedDial
//           ariaLabel="Quick Actions"
//           sx={{ position: 'fixed', bottom: 16, right: 16 }}
//           icon={<SpeedDialIcon />}
//         >
//           <SpeedDialAction
//             icon={<Refresh />}
//             tooltipTitle="Refresh"
//             onClick={fetchAnalytics}
//           />
//           <SpeedDialAction
//             icon={<Download />}
//             tooltipTitle="Export"
//             onClick={handleExportClick}
//           />
//           <SpeedDialAction
//             icon={<FilterList />}
//             tooltipTitle="Toggle Filters"
//             onClick={() => setShowFilters(!showFilters)}
//           />
//         </SpeedDial>
//       </Container>

//       {/* Detail Dialogs */}
//       <Dialog 
//         open={!!studentDetail} 
//         onClose={() => setStudentDetail(null)}
//         maxWidth="md"
//         fullWidth
//       >
//         <DialogTitle>
//           Student Performance Details
//         </DialogTitle>
//         <DialogContent>
//           {studentDetail && (
//             <Box>
//               <Typography variant="h6" gutterBottom>
//                 {studentDetail.student.name}
//               </Typography>
//               <Typography variant="body2">
//                 Detailed performance analysis will be shown here.
//               </Typography>
//             </Box>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setStudentDetail(null)}>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </ThemeProvider>
//   );
// };

// export default FacultyAnalytics;









import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  LinearProgress,
  Alert,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  IconButton,
  Tooltip,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  Badge,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
  alpha,
  styled
} from '@mui/material';
import {
  Timeline,
  TrendingUp,
  People,
  School,
  Assessment,
  InsertChart,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Warning,
  CheckCircle,
  Error as ErrorIcon,
  Info,
  Download,
  Refresh,
  CalendarToday,
  FilterList,
  Search,
  ArrowUpward,
  ArrowDownward,
  Remove,
  Star,
  EmojiEvents,
  AccessTime,
  Person,
  Group,
  LocalLibrary,
  Psychology,
  Lightbulb,
  CompareArrows,
  Female,
  Male,
  Transgender,
  Analytics as AnalyticsIcon,
  TimelineRounded,
  Score,
  DataUsage,
  AutoGraph,
  Insights,
  TrendingDown,
  ShowChart,
  MultilineChart,
  DonutLarge,
  DonutSmall,
  Radar as RadarIcon,
  TimelineSharp,
  Functions,
  Calculate,
  Numbers,
  Dashboard,
  ViewQuilt,
  TableChart,
  GridView,
  Visibility,
  ZoomIn,
  ZoomOut,
  Settings,
  MoreVert,
  ExpandMore,
  ChevronRight,
  FirstPage,
  LastPage,
  FilterAlt,
  Sort,
  ImportExport,
  RotateRight,
  RotateLeft,
  Cached,
  CloudDownload,
  CloudUpload,
  Save,
  Print,
  Share,
  Close,
  Add,
  MoreHoriz,
  OpenInNew,
  Launch,
  AccountCircle,
  PeopleAlt,
  SupervisorAccount,
  AdminPanelSettings,
  Security,
  Verified,
  Shield,
  Email,
  Phone,
  LocationOn,
  Business,
  School as SchoolIcon,
  MenuBook,
  LibraryBooks,
  Book,
  Videocam,
  Headset,
  VolumeUp,
  Notifications,
  NotificationsActive,
  Mail,
  Send,
  Inbox,
  Archive,
  Delete,
  Restore,
  Undo,
  Clear,
  Block,
  Cancel,
  Check,
  Done,
  DoneAll,
  HighlightOff,
  AddCircle,
  Edit,
  Build,
  DesignServices,
  Architecture,
  QueryStats
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
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
  ComposedChart,
  Brush,
  ReferenceLine,
  Label
} from 'recharts';
import { format, parseISO, isValid } from 'date-fns';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

// Premium Professional Theme
const professionalTheme = createTheme({
  palette: {
    primary: {
      main: '#4A6FA5', // Sophisticated blue
      light: '#6B8CC6',
      dark: '#3A5684',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF7E5F', // Coral accent
      light: '#FF9E8A',
      dark: '#E65E4A',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#2ECC71', // Vibrant green
      light: '#58D68D',
      dark: '#239954',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#F39C12', // Amber
      light: '#F7B731',
      dark: '#D68910',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#E74C3C', // Red
      light: '#EC7063',
      dark: '#CB4335',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#3498DB', // Blue
      light: '#5DADE2',
      dark: '#2C80B4',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Inter", "Roboto", sans-serif',
    h1: { fontWeight: 700, fontSize: '2.5rem', letterSpacing: '-0.5px' },
    h2: { fontWeight: 600, fontSize: '2rem', letterSpacing: '-0.5px' },
    h3: { fontWeight: 600, fontSize: '1.75rem' },
    h4: { fontWeight: 600, fontSize: '1.5rem' },
    h5: { fontWeight: 500, fontSize: '1.25rem' },
    h6: { fontWeight: 500, fontSize: '1.125rem' },
    subtitle1: { fontWeight: 500, fontSize: '1rem' },
    subtitle2: { fontWeight: 400, fontSize: '0.875rem' },
  },
  shape: {
    borderRadius: 16,
  },
  shadows: [
    'none',
    '0px 2px 8px rgba(0, 0, 0, 0.05)',
    '0px 4px 12px rgba(0, 0, 0, 0.08)',
    '0px 6px 16px rgba(0, 0, 0, 0.1)',
    ...Array(21).fill('0px 8px 24px rgba(0, 0, 0, 0.12)'),
  ],
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 48px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 20px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

// Custom styled components
const GlassCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.background.paper, 0.9)} 0%, 
    ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
  backdropFilter: 'blur(20px)',
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, 
      ${theme.palette.primary.main} 0%, 
      ${theme.palette.secondary.main} 100%)`,
  },
}));

const MetricCard = styled(Paper)(({ theme, color = 'primary', value }) => {
  const getGradient = (val) => {
    if (val >= 85) return `linear-gradient(135deg, ${theme.palette.success.main} 0%, #27AE60 100%)`;
    if (val >= 70) return `linear-gradient(135deg, ${theme.palette.info.main} 0%, #2980B9 100%)`;
    if (val >= 50) return `linear-gradient(135deg, ${theme.palette.warning.main} 0%, #D68910 100%)`;
    return `linear-gradient(135deg, ${theme.palette.error.main} 0%, #C0392B 100%)`;
  };
  
  const colorValues = {
    primary: {
      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #5D8AA8 100%)`,
      text: theme.palette.primary.contrastText
    },
    secondary: {
      background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, #FF9966 100%)`,
      text: theme.palette.secondary.contrastText
    },
    success: {
      background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, #27AE60 100%)`,
      text: theme.palette.success.contrastText
    },
    info: {
      background: `linear-gradient(135deg, ${theme.palette.info.main} 0%, #3498DB 100%)`,
      text: theme.palette.info.contrastText
    },
    warning: {
      background: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, #F1C40F 100%)`,
      text: theme.palette.warning.contrastText
    },
    error: {
      background: `linear-gradient(135deg, ${theme.palette.error.main} 0%, #E74C3C 100%)`,
      text: theme.palette.error.contrastText
    },
    gradient: {
      background: getGradient(value || 0),
      text: '#FFFFFF'
    }
  };
  
  const selectedColor = colorValues[color] || colorValues.primary;
  
  return {
    padding: theme.spacing(3),
    borderRadius: 20,
    background: selectedColor.background,
    color: selectedColor.text,
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      width: '80px',
      height: '80px',
      background: `radial-gradient(circle, ${alpha(selectedColor.text, 0.1)} 0%, transparent 70%)`,
      borderRadius: '50%',
      transform: 'translate(30px, -30px)',
    },
  };
});

const AnalyticsTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    height: 4,
    borderRadius: 2,
    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  },
  '& .MuiTab-root': {
    textTransform: 'none',
    fontSize: '0.9rem',
    fontWeight: 500,
    minHeight: 56,
    padding: '12px 20px',
    '&.Mui-selected': {
      color: theme.palette.primary.main,
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
    transform: 'translateY(-1px)',
    transition: 'all 0.2s ease',
  },
}));

const LoadingSkeleton = () => (
  <Box sx={{ width: '100%', p: 3 }}>
    <Grid container spacing={3}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <Grid item xs={12} sm={6} md={3} key={item}>
          <Paper sx={{ p: 3, height: 140, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Box>
                <LinearProgress sx={{ width: 80, mb: 1, borderRadius: 2 }} />
                <LinearProgress sx={{ width: 60, borderRadius: 2 }} />
              </Box>
              <CircularProgress size={40} thickness={4} />
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    <Alert 
      severity="error" 
      sx={{ 
        m: 2, 
        borderRadius: 3,
        borderLeft: `4px solid ${professionalTheme.palette.error.main}`
      }}
      action={
        <Button 
          color="inherit" 
          size="small" 
          onClick={resetErrorBoundary} 
          startIcon={<Refresh />}
          sx={{ borderRadius: 2 }}
        >
          Retry
        </Button>
      }
    >
      <Typography variant="h6" gutterBottom>Analytics Error</Typography>
      <Typography variant="body2" gutterBottom>{error.message}</Typography>
      <Typography variant="caption" color="textSecondary">
        Reference: ERR_{Date.now().toString(36)}
      </Typography>
    </Alert>
  </motion.div>
);

const FacultyAnalytics = () => {
  const [tabValue, setTabValue] = useState(0);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [performanceFilter, setPerformanceFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [exportMenuAnchor, setExportMenuAnchor] = useState(null);
  const [settingsMenuAnchor, setSettingsMenuAnchor] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);
  const [detailDialog, setDetailDialog] = useState({ open: false, type: '', data: null });
  const [studentDetail, setStudentDetail] = useState(null);
  const [quizDetail, setQuizDetail] = useState(null);
  const [courseDetail, setCourseDetail] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const fetchAnalytics = useCallback(async () => {
    if (!autoRefresh && analyticsData) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/faculty/analytics', {
        withCredentials: true,
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (response.data.success) {
        setAnalyticsData(response.data);
        localStorage.setItem('lastAnalyticsFetch', Date.now().toString());
      } else {
        throw new Error(response.data.message || 'Failed to fetch analytics');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Network error');
      console.error('Analytics fetch error:', {
        error: err.message,
        code: err.code,
        timestamp: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  }, [timeframe, autoRefresh, analyticsData]);

  useEffect(() => {
    fetchAnalytics();
    
    let interval;
    if (autoRefresh) {
      interval = setInterval(fetchAnalytics, 300000); // 5 minutes
    }
    
    return () => clearInterval(interval);
  }, [fetchAnalytics, autoRefresh]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleExportClick = (event) => {
    setExportMenuAnchor(event.currentTarget);
  };

  const handleExportClose = () => {
    setExportMenuAnchor(null);
  };

  const handleSettingsClick = (event) => {
    setSettingsMenuAnchor(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setSettingsMenuAnchor(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = parseISO(dateString);
      return isValid(date) ? format(date, 'MMM dd, yyyy HH:mm') : 'Invalid Date';
    } catch {
      return 'Invalid Date';
    }
  };

  const getColorByValue = (value, type = 'percentage') => {
    if (type === 'percentage') {
      if (value >= 85) return 'success';
      if (value >= 70) return 'info';
      if (value >= 50) return 'warning';
      return 'error';
    }
    if (type === 'participation') {
      if (value >= 80) return 'success';
      if (value >= 50) return 'info';
      if (value >= 30) return 'warning';
      return 'error';
    }
    return 'primary';
  };

  const getGenderIcon = (gender) => {
    switch (gender?.toLowerCase()) {
      case 'male': return <Male />;
      case 'female': return <Female />;
      default: return <Transgender />;
    }
  };

  const filteredQuizzes = useMemo(() => {
    if (!analyticsData?.data?.quizzes) return [];
    return analyticsData.data.quizzes.filter(quiz => {
      const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          quiz.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCourse = courseFilter === 'all' || 
                          (quiz.course && quiz.course.includes(courseFilter));
      return matchesSearch && matchesCourse;
    });
  }, [analyticsData, searchTerm, courseFilter]);

  const uniqueCourses = useMemo(() => {
    if (!analyticsData?.data?.courses) return [];
    return [...new Set(analyticsData.data.courses.map(c => c.course).filter(Boolean))];
  }, [analyticsData]);

  const chartData = useMemo(() => {
    if (!analyticsData) return null;

    const { data } = analyticsData;
    const monthlyData = data?.trends?.timeBased?.monthly || [];
    
    const courseData = data?.courses?.map(course => ({
      name: course.course,
      avgScore: course.averagePercentage,
      participation: course.participationRate,
      passRate: course.passRate,
      accuracy: course.averageAccuracy,
      students: course.totalRegisteredStudents || 0
    })) || [];

    const difficultyData = [
      { name: 'Hard', value: data?.quizzes?.filter(q => q.difficultyLevel === 'Hard').length || 0 },
      { name: 'Medium', value: data?.quizzes?.filter(q => q.difficultyLevel === 'Medium').length || 0 },
      { name: 'Easy', value: data?.quizzes?.filter(q => q.difficultyLevel === 'Easy').length || 0 }
    ];

    const performanceData = [
      { category: 'Excellent', value: data?.students?.distribution?.excellent || 0 },
      { category: 'Good', value: data?.students?.distribution?.good || 0 },
      { category: 'Average', value: data?.students?.distribution?.average || 0 },
      { category: 'Poor', value: data?.students?.distribution?.poor || 0 },
      { category: 'Fail', value: data?.students?.distribution?.fail || 0 }
    ];

    const timeSeriesData = monthlyData.map(month => ({
      month: month.month,
      score: month.averagePercentage,
      participation: month.participationRate,
      attempts: month.averageAttemptsPerQuiz * 10
    }));

    // Gender distribution data
    const genderDistribution = data?.students?.genderDistribution || {
      male: data?.students?.totalStudents ? Math.round(data.students.totalStudents * 0.55) : 0,
      female: data?.students?.totalStudents ? Math.round(data.students.totalStudents * 0.42) : 0,
      other: data?.students?.totalStudents ? Math.round(data.students.totalStudents * 0.03) : 0
    };

    return {
      monthlyData,
      courseData,
      difficultyData,
      performanceData,
      timeSeriesData,
      genderDistribution,
      overview: {
        participationRate: data?.overview?.participationRate || 0,
        averageAccuracy: data?.overview?.averageAccuracy || 0,
        passRate: data?.overview?.passRate || 0,
        averageScore: data?.overview?.averagePercentage || 0
      }
    };
  }, [analyticsData]);

  const renderMetrics = () => {
  if (!analyticsData?.data?.overview) return null;

  const { overview } = analyticsData.data;
  const metrics = [
    {
      title: 'Overall Performance',
      value: `${overview.averagePercentage.toFixed(1)}%`,
      change: overview.averagePercentage > 70 ? '+5.2%' : '-2.1%',
      icon: <Assessment />,
      color: overview.averagePercentage >= 85 ? 'success' : 
             overview.averagePercentage >= 70 ? 'info' : 
             overview.averagePercentage >= 50 ? 'warning' : 'error',
      tooltip: 'Average score across all quizzes',
      trend: overview.averagePercentage > 70 ? 'up' : 'down'
    },
    {
      title: 'Student Engagement',
      value: `${overview.participationRate.toFixed(1)}%`,
      change: overview.participationRate > 60 ? '+3.4%' : '-5.1%',
      icon: <People />,
      color: overview.participationRate >= 80 ? 'success' : 
             overview.participationRate >= 50 ? 'info' : 
             overview.participationRate >= 30 ? 'warning' : 'error',
      tooltip: 'Percentage of registered students attempting quizzes',
      trend: overview.participationRate > 60 ? 'up' : 'down'
    },
    {
      title: 'Success Rate',
      value: `${overview.passRate.toFixed(1)}%`,
      change: overview.passRate > 75 ? '+2.8%' : '-1.3%',
      icon: <CheckCircle />,
      color: overview.passRate >= 85 ? 'success' : 
             overview.passRate >= 70 ? 'info' : 
             overview.passRate >= 50 ? 'warning' : 'error',
      tooltip: 'Percentage of students passing quizzes',
      trend: overview.passRate > 75 ? 'up' : 'down'
    },
    {
      title: 'Question Accuracy',
      value: `${overview.averageAccuracy.toFixed(1)}%`,
      change: overview.averageAccuracy > 70 ? '+4.2%' : '-3.6%',
      icon: <BarChartIcon />,
      color: overview.averageAccuracy >= 85 ? 'success' : 
             overview.averageAccuracy >= 70 ? 'info' : 
             overview.averageAccuracy >= 50 ? 'warning' : 'error',
      tooltip: 'Average accuracy of answers across all attempts',
      trend: overview.averageAccuracy > 70 ? 'up' : 'down'
    },
    {
      title: 'Active Students',
      value: analyticsData.data.students?.totalStudents || 0,
      icon: <Group />,
      color: 'primary',
      tooltip: 'Number of unique students who attempted quizzes',
      trend: 'stable'
    },
    {
      title: 'Avg Attempt Time',
      value: `${overview.averageTimePerAttempt}s`,
      icon: <AccessTime />,
      color: 'info',
      tooltip: 'Average time taken per quiz attempt',
      trend: 'stable'
    },
    {
      title: 'Total Questions',
      value: overview.totalQuestionsAnswered || 0,
      icon: <Numbers />,
      color: 'secondary',
      tooltip: 'Total questions answered across all attempts',
      trend: 'up'
    },
    {
      title: 'Consistency Score',
      value: `${(100 - (overview.standardDeviation || 0)).toFixed(1)}%`,
      icon: <Timeline />,
      color: (100 - (overview.standardDeviation || 0)) >= 85 ? 'success' : 
             (100 - (overview.standardDeviation || 0)) >= 70 ? 'info' : 
             (100 - (overview.standardDeviation || 0)) >= 50 ? 'warning' : 'error',
      tooltip: 'Score consistency across all attempts',
      trend: 'up'
    }
  ];

  return (
    <Grid container spacing={2}>
      {metrics.map((metric, index) => {
        // Extract numeric value from metric.value for gradient calculation
        let numericValue = 0;
        if (typeof metric.value === 'string') {
          // Extract number from string like "85.5%" or "120s"
          const match = metric.value.match(/(\d+(\.\d+)?)/);
          numericValue = match ? parseFloat(match[1]) : 0;
        } else if (typeof metric.value === 'number') {
          numericValue = metric.value;
        }
        
        return (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Tooltip title={metric.tooltip} arrow>
                <MetricCard color={metric.color} value={numericValue}>
                  <Box display="flex" alignItems="flex-start" justifyContent="space-between">
                    <Box flex={1}>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          opacity: 0.9, 
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          letterSpacing: '0.5px'
                        }}
                      >
                        {metric.title}
                      </Typography>
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          fontWeight: 700, 
                          my: 1.5,
                          fontSize: '2rem',
                          letterSpacing: '-0.5px'
                        }}
                      >
                        {metric.value}
                      </Typography>
                      {metric.change && (
                        <Box display="flex" alignItems="center" gap={0.5}>
                          {metric.trend === 'up' ? 
                            <ArrowUpward fontSize="small" sx={{ fontSize: '0.875rem' }} /> : 
                            metric.trend === 'down' ?
                            <ArrowDownward fontSize="small" sx={{ fontSize: '0.875rem' }} /> :
                            <Remove fontSize="small" sx={{ fontSize: '0.875rem' }} />
                          }
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              opacity: 0.9, 
                              fontSize: '0.75rem',
                              fontWeight: 500
                            }}
                          >
                            {metric.change}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ 
                      opacity: 0.9,
                      backgroundColor: alpha('#FFFFFF', 0.2),
                      borderRadius: '12px',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {React.cloneElement(metric.icon, { sx: { fontSize: '1.5rem' } })}
                    </Box>
                  </Box>
                </MetricCard>
              </Tooltip>
            </motion.div>
          </Grid>
        );
      })}
    </Grid>
  );
};
  const PerformanceBadge = ({ label, performance }) => {
    return (
      <Chip 
        label={label}
        size="small"
        sx={{
          backgroundColor: (theme) => {
            const colors = {
              excellent: alpha(theme.palette.success.main, 0.15),
              good: alpha(theme.palette.info.main, 0.15),
              average: alpha(theme.palette.warning.main, 0.15),
              poor: alpha(theme.palette.error.main, 0.15),
              fail: alpha(theme.palette.grey[500], 0.15),
            };
            return colors[performance] || colors.average;
          },
          color: (theme) => {
            const colors = {
              excellent: theme.palette.success.dark,
              good: theme.palette.info.dark,
              average: theme.palette.warning.dark,
              poor: theme.palette.error.dark,
              fail: theme.palette.grey[700],
            };
            return colors[performance] || colors.average;
          },
          fontWeight: 600,
          fontSize: '0.7rem',
          padding: '2px 10px',
          borderRadius: 8,
          border: '1px solid',
          borderColor: (theme) => {
            const colors = {
              excellent: alpha(theme.palette.success.main, 0.3),
              good: alpha(theme.palette.info.main, 0.3),
              average: alpha(theme.palette.warning.main, 0.3),
              poor: alpha(theme.palette.error.main, 0.3),
              fail: alpha(theme.palette.grey[500], 0.3),
            };
            return colors[performance] || colors.average;
          },
          '& .MuiChip-label': {
            padding: '0 4px',
          },
        }}
      />
    );
  };

  const renderAlerts = () => {
    if (!analyticsData?.data?.insights?.alerts) return null;

    return (
      <Grid container spacing={2}>
        {analyticsData.data.insights.alerts.map((alert, index) => (
          <Grid item xs={12} key={index}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Alert 
                severity={alert.type}
                sx={{ 
                  borderRadius: 3,
                  borderLeft: `4px solid ${theme.palette[alert.type].main}`,
                  backgroundColor: alpha(theme.palette[alert.type].main, 0.08),
                  '& .MuiAlert-icon': {
                    color: theme.palette[alert.type].main,
                  }
                }}
                icon={alert.type === 'warning' ? <Warning /> : 
                      alert.type === 'error' ? <ErrorIcon /> : 
                      alert.type === 'success' ? <CheckCircle /> : <Info />}
              >
                <Typography fontWeight={600} variant="subtitle1">{alert.title}</Typography>
                <Typography variant="body2" sx={{ mt: 0.5, opacity: 0.9 }}>{alert.description}</Typography>
                {alert.quizzes && (
                  <Box sx={{ mt: 1.5 }}>
                    <Typography variant="caption" fontWeight={500} display="block" gutterBottom>
                      Affected Quizzes:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                      {alert.quizzes.map((quiz, idx) => (
                        <Chip 
                          key={idx} 
                          label={quiz} 
                          size="small" 
                          variant="outlined"
                          sx={{ 
                            backgroundColor: alpha(theme.palette[alert.type].main, 0.1),
                            borderColor: alpha(theme.palette[alert.type].main, 0.3)
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </Alert>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderTopPerformers = () => {
    if (!analyticsData?.data?.students?.topRankers) return null;

    return (
      <List sx={{ 
        bgcolor: 'background.paper', 
        borderRadius: 3,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        overflow: 'hidden'
      }}>
        {analyticsData.data.students.topRankers.slice(0, 10).map((student, index) => (
          <React.Fragment key={index}>
            <ListItem 
              sx={{ 
                py: 2.5,
                px: 3,
                '&:hover': { 
                  bgcolor: alpha(theme.palette.primary.main, 0.04),
                  cursor: 'pointer'
                },
                transition: 'all 0.2s ease'
              }}
              secondaryAction={
                <Box textAlign="right" minWidth={100}>
                  <Typography variant="h6" color="primary" fontWeight={700}>
                    {student.performance.averagePercentage.toFixed(1)}%
                  </Typography>
                  <Typography variant="caption" color="textSecondary" sx={{ opacity: 0.7 }}>
                    Rank #{student.performance.rank}
                  </Typography>
                </Box>
              }
              onClick={() => setDetailDialog({ open: true, type: 'student', data: student })}
            >
              <ListItemAvatar>
                <Avatar 
                  sx={{ 
                    bgcolor: index < 3 ? 
                      (index === 0 ? '#FFD700' : 
                       index === 1 ? '#C0C0C0' : 
                       '#CD7F32') : 
                      alpha(theme.palette.primary.main, 0.1),
                    color: index < 3 ? '#000' : theme.palette.primary.main,
                    width: 48,
                    height: 48,
                    fontWeight: 600
                  }}
                >
                  {index < 3 ? <EmojiEvents /> : student.student.name.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center" gap={1.5} flexWrap="wrap">
                    <Typography fontWeight={600} variant="subtitle1">
                      {student.student.name}
                    </Typography>
                    <PerformanceBadge 
                      label={student.performance.performanceCategory.toUpperCase()}
                      performance={student.performance.performanceCategory}
                    />
                    {student.student.course && (
                      <Chip 
                        label={student.student.course}
                        size="small"
                        variant="outlined"
                        sx={{ 
                          backgroundColor: alpha(theme.palette.info.main, 0.1),
                          borderColor: alpha(theme.palette.info.main, 0.3)
                        }}
                      />
                    )}
                  </Box>
                }
                secondary={
                  <>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                      {student.student.department || 'Department not specified'}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={2.5} mt={1}>
                      <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CheckCircle fontSize="inherit" color="success" />
                        <strong>Accuracy:</strong> {student.performance.accuracyRate.toFixed(1)}%
                      </Typography>
                      <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Assessment fontSize="inherit" color="info" />
                        <strong>Attempts:</strong> {student.performance.totalAttempts}
                      </Typography>
                      <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Timeline fontSize="inherit" color="warning" />
                        <strong>Consistency:</strong> {student.performance.consistencyScore}%
                      </Typography>
                    </Box>
                  </>
                }
              />
            </ListItem>
            {index < analyticsData.data.students.topRankers.length - 1 && (
              <Divider sx={{ mx: 3, opacity: 0.3 }} />
            )}
          </React.Fragment>
        ))}
      </List>
    );
  };

  const renderQuizTable = () => {
    const columns = [
      { id: 'title', label: 'Quiz Title', minWidth: 200 },
      { id: 'course', label: 'Course', minWidth: 120 },
      { id: 'subject', label: 'Subject', minWidth: 120 },
      { id: 'date', label: 'Date', minWidth: 140 },
      { id: 'registered', label: 'Registered', minWidth: 100, align: 'center' },
      { id: 'attempted', label: 'Attempted', minWidth: 100, align: 'center' },
      { id: 'attendance', label: 'Attendance', minWidth: 120, align: 'center' },
      { id: 'avgScore', label: 'Avg Score', minWidth: 120, align: 'center' },
      { id: 'passRate', label: 'Pass Rate', minWidth: 120, align: 'center' },
      { id: 'difficulty', label: 'Difficulty', minWidth: 100, align: 'center' },
      { id: 'actions', label: 'Actions', minWidth: 100, align: 'center' }
    ];

    const sortedQuizzes = [...filteredQuizzes].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return (
      <>
        <TableContainer sx={{ 
          borderRadius: 3, 
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          backgroundColor: theme.palette.background.paper
        }}>
          <Table stickyHeader size="medium">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={{ 
                      minWidth: column.minWidth, 
                      fontWeight: 700,
                      backgroundColor: theme.palette.background.default,
                      py: 2.5,
                      borderBottom: `2px solid ${theme.palette.divider}`,
                      fontSize: '0.875rem'
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={0.5}>
                      {column.label}
                      <Sort fontSize="small" sx={{ opacity: 0.5, fontSize: '0.875rem' }} />
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedQuizzes
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((quiz) => (
                  <StyledTableRow hover key={quiz.quizId}>
                    <TableCell sx={{ py: 2.5 }}>
                      <Box>
                        <Typography fontWeight={600} variant="subtitle2">
                          {quiz.title}
                        </Typography>
                        <Typography variant="caption" color="textSecondary" sx={{ opacity: 0.7 }}>
                          ID: {quiz.quizId?.substring(0, 8)}...
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 2.5 }}>
                      <Box>
                        {quiz.course?.map((c, idx) => (
                          <Chip 
                            key={idx} 
                            label={c} 
                            size="small" 
                            sx={{ 
                              mr: 0.5, 
                              mb: 0.5,
                              backgroundColor: alpha(theme.palette.info.main, 0.1),
                              borderColor: alpha(theme.palette.info.main, 0.3)
                            }}
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 2.5 }}>
                      <Typography variant="body2">{quiz.subject}</Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2.5 }}>
                      <Tooltip title={formatDate(quiz.createdAt)} arrow>
                        <Box>
                          <Typography variant="body2" fontWeight={500}>
                            {format(new Date(quiz.createdAt), 'MMM dd, yyyy')}
                          </Typography>
                          <Typography variant="caption" color="textSecondary" sx={{ opacity: 0.7 }}>
                            {format(new Date(quiz.createdAt), 'hh:mm a')}
                          </Typography>
                        </Box>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center" sx={{ py: 2.5 }}>
                      <Typography fontWeight={600} variant="body2">
                        {quiz.registeredStudents}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ py: 2.5 }}>
                      <Typography 
                        fontWeight={600} 
                        variant="body2" 
                        color={quiz.attemptedStudents > 0 ? 'primary' : 'textSecondary'}
                      >
                        {quiz.attemptedStudents}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ py: 2.5 }}>
                      <Box display="flex" alignItems="center" justifyContent="center" gap={1.5}>
                        <CircularProgress 
                          variant="determinate" 
                          value={quiz.attendanceRate} 
                          size={32}
                          thickness={5}
                          sx={{
                            color: getColorByValue(quiz.attendanceRate, 'participation') === 'success' ? theme.palette.success.main :
                                   getColorByValue(quiz.attendanceRate, 'participation') === 'info' ? theme.palette.info.main :
                                   getColorByValue(quiz.attendanceRate, 'participation') === 'warning' ? theme.palette.warning.main :
                                   theme.palette.error.main
                          }}
                        />
                        <Typography fontWeight={600} variant="body2">
                          {quiz.attendanceRate?.toFixed(1)}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center" sx={{ py: 2.5 }}>
                      <Tooltip title={`Score: ${quiz.averageScore?.toFixed(1)}/${quiz.totalMarks}`} arrow>
                        <Box>
                          <Typography 
                            color={getColorByValue(quiz.averagePercentage)}
                            fontWeight={700}
                            variant="h6"
                          >
                            {quiz.averagePercentage?.toFixed(1)}%
                          </Typography>
                          <Typography variant="caption" color="textSecondary" sx={{ opacity: 0.7 }}>
                            {quiz.averageScore?.toFixed(1)}/{quiz.totalMarks}
                          </Typography>
                        </Box>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center" sx={{ py: 2.5 }}>
                      <Chip 
                        label={`${quiz.passRate?.toFixed(1)}%`}
                        size="small"
                        sx={{
                          backgroundColor: quiz.passRate >= 80 ? alpha(theme.palette.success.main, 0.15) :
                                        quiz.passRate >= 60 ? alpha(theme.palette.warning.main, 0.15) :
                                        alpha(theme.palette.error.main, 0.15),
                          color: quiz.passRate >= 80 ? theme.palette.success.dark :
                                quiz.passRate >= 60 ? theme.palette.warning.dark :
                                theme.palette.error.dark,
                          fontWeight: 600,
                          border: '1px solid',
                          borderColor: quiz.passRate >= 80 ? alpha(theme.palette.success.main, 0.3) :
                                    quiz.passRate >= 60 ? alpha(theme.palette.warning.main, 0.3) :
                                    alpha(theme.palette.error.main, 0.3),
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ py: 2.5 }}>
                      <Chip 
                        label={quiz.difficultyLevel}
                        size="small"
                        icon={
                          quiz.difficultyLevel === 'Hard' ? <Warning fontSize="small" /> :
                          quiz.difficultyLevel === 'Medium' ? <Info fontSize="small" /> :
                          <CheckCircle fontSize="small" />
                        }
                        sx={{
                          backgroundColor: quiz.difficultyLevel === 'Hard' ? alpha(theme.palette.error.main, 0.15) :
                                        quiz.difficultyLevel === 'Medium' ? alpha(theme.palette.warning.main, 0.15) :
                                        alpha(theme.palette.success.main, 0.15),
                          color: quiz.difficultyLevel === 'Hard' ? theme.palette.error.dark :
                                quiz.difficultyLevel === 'Medium' ? theme.palette.warning.dark :
                                theme.palette.success.dark,
                          fontWeight: 600,
                          '& .MuiChip-icon': {
                            color: quiz.difficultyLevel === 'Hard' ? theme.palette.error.dark :
                                  quiz.difficultyLevel === 'Medium' ? theme.palette.warning.dark :
                                  theme.palette.success.dark,
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ py: 2.5 }}>
                      <Box display="flex" gap={0.5} justifyContent="center">
                        <Tooltip title="View Details" arrow>
                          <IconButton 
                            size="small"
                            onClick={() => setDetailDialog({ open: true, type: 'quiz', data: quiz })}
                            sx={{
                              backgroundColor: alpha(theme.palette.info.main, 0.1),
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.info.main, 0.2),
                              }
                            }}
                          >
                            <Visibility fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Compare" arrow>
                          <IconButton 
                            size="small"
                            onClick={() => {
                              if (selectedQuizzes.includes(quiz.quizId)) {
                                setSelectedQuizzes(selectedQuizzes.filter(id => id !== quiz.quizId));
                              } else {
                                setSelectedQuizzes([...selectedQuizzes, quiz.quizId]);
                              }
                            }}
                            sx={{
                              backgroundColor: selectedQuizzes.includes(quiz.quizId) ? 
                                alpha(theme.palette.primary.main, 0.2) : 
                                alpha(theme.palette.grey[300], 0.1),
                              '&:hover': {
                                backgroundColor: selectedQuizzes.includes(quiz.quizId) ? 
                                  alpha(theme.palette.primary.main, 0.3) : 
                                  alpha(theme.palette.grey[300], 0.2),
                              }
                            }}
                          >
                            <CompareArrows fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={sortedQuizzes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
          sx={{ 
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            backgroundColor: theme.palette.background.paper,
            borderRadius: '0 0 20px 20px',
            overflow: 'hidden'
          }}
        />
      </>
    );
  };

  const renderCharts = () => {
    if (!chartData) return null;

    return (
      <Grid container spacing={3}>
        {/* Performance Trend */}
        <Grid item xs={12} lg={8}>
          <GlassCard>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6" fontWeight={600}>Performance Trend Over Time</Typography>
                <Box display="flex" gap={0.5}>
                  <IconButton 
                    size="small" 
                    onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.1))}
                    sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.1) }}
                  >
                    <ZoomIn fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))}
                    sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.1) }}
                  >
                    <ZoomOut fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
              <Box sx={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData.timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.3)} />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fill: theme.palette.text.secondary }}
                    />
                    <YAxis 
                      yAxisId="left" 
                      tick={{ fill: theme.palette.text.secondary }}
                      domain={[0, 100]}
                    />
                    <YAxis 
                      yAxisId="right" 
                      orientation="right" 
                      tick={{ fill: theme.palette.text.secondary }}
                    />
                    <RechartsTooltip 
                      contentStyle={{
                        borderRadius: 12,
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        backgroundColor: theme.palette.background.paper,
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="score" 
                      name="Average Score %" 
                      stroke={theme.palette.primary.main} 
                      strokeWidth={3}
                      dot={{ r: 4, strokeWidth: 2 }}
                      activeDot={{ r: 6, strokeWidth: 2 }}
                    />
                    <Area 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="participation" 
                      name="Participation %" 
                      stroke={theme.palette.success.main} 
                      fill={theme.palette.success.main}
                      fillOpacity={0.2}
                    />
                    <Bar 
                      yAxisId="right"
                      dataKey="attempts" 
                      name="Relative Attempts" 
                      fill={theme.palette.secondary.main}
                      opacity={0.7}
                      radius={[4, 4, 0, 0]}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </GlassCard>
        </Grid>

        {/* Course Comparison Radar */}
        <Grid item xs={12} lg={4}>
          <GlassCard>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>Course Performance Radar</Typography>
              <Box sx={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData.courseData}>
                    <PolarGrid stroke={alpha(theme.palette.divider, 0.3)} />
                    <PolarAngleAxis 
                      dataKey="name" 
                      tick={{ fill: theme.palette.text.secondary }}
                    />
                    <PolarRadiusAxis 
                      angle={30} 
                      domain={[0, 100]} 
                      tick={{ fill: theme.palette.text.secondary }}
                    />
                    <Radar 
                      name="Score" 
                      dataKey="avgScore" 
                      stroke={theme.palette.primary.main} 
                      fill={theme.palette.primary.main} 
                      fillOpacity={0.4} 
                    />
                    <Radar 
                      name="Participation" 
                      dataKey="participation" 
                      stroke={theme.palette.success.main} 
                      fill={theme.palette.success.main} 
                      fillOpacity={0.4} 
                    />
                    <Radar 
                      name="Accuracy" 
                      dataKey="accuracy" 
                      stroke={theme.palette.secondary.main} 
                      fill={theme.palette.secondary.main} 
                      fillOpacity={0.4} 
                    />
                    <Legend />
                    <RechartsTooltip 
                      contentStyle={{
                        borderRadius: 12,
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        backgroundColor: theme.palette.background.paper
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </GlassCard>
        </Grid>
      </Grid>
    );
  };

  const renderRecommendations = () => {
    if (!analyticsData?.data?.recommendations) return null;

    return (
      <Grid container spacing={2}>
        {analyticsData.data.recommendations.map((rec, index) => (
          <Grid item xs={12} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Paper sx={{ 
                p: 3, 
                borderRadius: 3,
                borderLeft: `4px solid ${
                  rec.priority === 'high' ? theme.palette.error.main :
                  rec.priority === 'medium' ? theme.palette.warning.main :
                  theme.palette.info.main
                }`,
                backgroundColor: alpha(
                  rec.priority === 'high' ? theme.palette.error.main :
                  rec.priority === 'medium' ? theme.palette.warning.main :
                  theme.palette.info.main, 
                  0.05
                ),
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                }
              }}>
                <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
                  <Box flex={1}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      {rec.title}
                    </Typography>
                    <Chip 
                      label={`${rec.priority.toUpperCase()} PRIORITY`}
                      size="small"
                      sx={{
                        backgroundColor: rec.priority === 'high' ? 
                          alpha(theme.palette.error.main, 0.15) :
                          rec.priority === 'medium' ? 
                          alpha(theme.palette.warning.main, 0.15) :
                          alpha(theme.palette.info.main, 0.15),
                        color: rec.priority === 'high' ? 
                          theme.palette.error.dark :
                          rec.priority === 'medium' ? 
                          theme.palette.warning.dark :
                          theme.palette.info.dark,
                        fontWeight: 600,
                        mb: 1
                      }}
                    />
                  </Box>
                  <IconButton size="small" sx={{ 
                    backgroundColor: alpha(theme.palette.warning.main, 0.1),
                    color: theme.palette.warning.main
                  }}>
                    <Lightbulb />
                  </IconButton>
                </Box>
                <Typography variant="body1" paragraph color="text.secondary" sx={{ mb: 2 }}>
                  {rec.description}
                </Typography>
                
                <Typography variant="subtitle2" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
                  Action Items:
                </Typography>
                <List dense sx={{ mb: 2 }}>
                  {rec.actionItems.map((item, idx) => (
                    <ListItem key={idx} sx={{ py: 0.5, px: 0 }}>
                      <ListItemText 
                        primary={
                          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ 
                              width: 6, 
                              height: 6, 
                              borderRadius: '50%',
                              backgroundColor: rec.priority === 'high' ? 
                                theme.palette.error.main :
                                rec.priority === 'medium' ? 
                                theme.palette.warning.main :
                                theme.palette.info.main 
                            }} />
                            {item}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
                
                <Box mt={2} p={2} bgcolor="background.default" borderRadius={2}>
                  <Typography variant="caption" fontWeight={600} display="block" gutterBottom>
                    Expected Impact: 
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {rec.expectedImpact}
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderPredictiveAnalytics = () => {
    if (!analyticsData?.data?.predictive) return null;

    const predictive = analyticsData.data.predictive;
    
    if (!predictive.available) {
      return (
        <Alert severity="info" sx={{ 
          borderRadius: 3,
          backgroundColor: alpha(theme.palette.info.main, 0.08),
          borderLeft: `4px solid ${theme.palette.info.main}`
        }}>
          <Typography variant="subtitle1" gutterBottom fontWeight={600}>
            Predictive Analytics Unavailable
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {predictive.message}
          </Typography>
          <Box mt={1} pl={1}>
            <Typography variant="caption" display="block" sx={{ mb: 0.5 }}>
              • Required Quizzes: {predictive.minimumRequirements?.requiredQuizzes || 3}
            </Typography>
            <Typography variant="caption" display="block" sx={{ mb: 0.5 }}>
              • Current Quizzes: {predictive.minimumRequirements?.currentQuizzes || 0}
            </Typography>
            <Typography variant="caption" display="block" sx={{ mb: 0.5 }}>
              • Required Attempts: {predictive.minimumRequirements?.requiredAttempts || 10}
            </Typography>
            <Typography variant="caption" display="block">
              • Current Attempts: {predictive.minimumRequirements?.currentAttempts || 0}
            </Typography>
          </Box>
        </Alert>
      );
    }

    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <GlassCard>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Next Quiz Performance Prediction
              </Typography>
              <Box textAlign="center" py={3}>
                <CircularProgress 
                  variant="determinate" 
                  value={predictive.nextQuizPrediction?.confidence || 75}
                  size={120}
                  thickness={4}
                  sx={{ 
                    mb: 2,
                    color: predictive.nextQuizPrediction?.confidence >= 80 ? 
                          theme.palette.success.main :
                          predictive.nextQuizPrediction?.confidence >= 60 ?
                          theme.palette.warning.main :
                          theme.palette.error.main
                  }}
                />
                <Typography variant="h2" gutterBottom fontWeight={700}>
                  {predictive.nextQuizPrediction?.predictedAverageScore?.toFixed(1)}%
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Predicted Average Score
                </Typography>
                <Chip 
                  label={`${predictive.nextQuizPrediction?.trend?.toUpperCase()} TREND`}
                  sx={{
                    backgroundColor: predictive.nextQuizPrediction?.trend === 'improving' ? 
                      alpha(theme.palette.success.main, 0.15) : 
                      alpha(theme.palette.warning.main, 0.15),
                    color: predictive.nextQuizPrediction?.trend === 'improving' ? 
                      theme.palette.success.dark : 
                      theme.palette.warning.dark,
                    fontWeight: 600,
                    border: '1px solid',
                    borderColor: predictive.nextQuizPrediction?.trend === 'improving' ? 
                      alpha(theme.palette.success.main, 0.3) : 
                      alpha(theme.palette.warning.main, 0.3),
                  }}
                />
              </Box>
            </CardContent>
          </GlassCard>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <GlassCard>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Performance Trends Analysis
              </Typography>
              <Box py={2}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Paper sx={{ 
                      p: 2.5, 
                      textAlign: 'center',
                      borderRadius: 3,
                      backgroundColor: alpha(theme.palette.success.main, 0.08),
                      border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`
                    }}>
                      <Typography variant="h3" color="success.main" fontWeight={700}>
                        {predictive.recentPerformance?.toFixed(1)}%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">Recent Performance</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper sx={{ 
                      p: 2.5, 
                      textAlign: 'center',
                      borderRadius: 3,
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
                    }}>
                      <Typography variant="h3" color="primary.main" fontWeight={700}>
                        {predictive.historicalPerformance?.toFixed(1)}%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">Historical Average</Typography>
                    </Paper>
                  </Grid>
                </Grid>
                
                <Box mt={3}>
                  <Typography variant="body2" gutterBottom fontWeight={500}>
                    <strong>Recommendation:</strong> {predictive.nextQuizPrediction?.recommendation}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.7 }}>
                    Based on {predictive.dataQuality?.totalDataPoints || 0} data points over {predictive.dataQuality?.timeSpanDays || 0} days
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </GlassCard>
        </Grid>
      </Grid>
    );
  };

  if (loading && !analyticsData) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <Container maxWidth="xl">
        <ErrorFallback error={new Error(error)} resetErrorBoundary={fetchAnalytics} />
      </Container>
    );
  }

  if (!analyticsData) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Alert severity="info" sx={{ 
          borderRadius: 3,
          borderLeft: `4px solid ${theme.palette.info.main}`,
          backgroundColor: alpha(theme.palette.info.main, 0.08)
        }}>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Welcome to Faculty Analytics
          </Typography>
          <Typography paragraph>
            No analytics data available yet. Start by creating quizzes and having students attempt them to unlock powerful insights.
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<Add />}
            sx={{ 
              borderRadius: 2,
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              }
            }}
          >
            Create Your First Quiz
          </Button>
        </Alert>
      </Container>
    );
  }

  const tabLabels = [
    { label: 'Overview', icon: <Dashboard /> },
    { label: 'Deep Analytics', icon: <Insights /> },
    { label: 'Quizzes', icon: <Assessment /> },
    { label: 'Courses', icon: <School /> },
    { label: 'Students', icon: <People /> },
    { label: 'Trends', icon: <Timeline /> },
    { label: 'Predictive', icon: <AutoGraph /> },
    { label: 'Charts', icon: <BarChartIcon /> },
    { label: 'Reports', icon: <InsertChart /> },
  ];

  const renderGenderComparison = () => {
    if (!chartData?.genderDistribution) return null;
    
    const genderData = [
      { name: 'Male', value: chartData.genderDistribution.male, color: theme.palette.info.main },
      { name: 'Female', value: chartData.genderDistribution.female, color: theme.palette.secondary.main },
      { name: 'Other', value: chartData.genderDistribution.other, color: theme.palette.warning.main }
    ];
    
    const total = genderData.reduce((sum, item) => sum + item.value, 0);
    
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <GlassCard>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Gender Distribution
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={genderData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </GlassCard>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <GlassCard>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Gender-wise Performance Metrics
              </Typography>
              <Box py={2}>
                {genderData.map((gender, index) => (
                  <Box key={index} mb={2.5}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="subtitle1" fontWeight={500}>
                        {gender.name} Students
                      </Typography>
                      <Typography variant="h6" fontWeight={700} color={gender.color}>
                        {gender.value} ({((gender.value / total) * 100).toFixed(1)}%)
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={(gender.value / total) * 100}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: alpha(gender.color, 0.2),
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: gender.color,
                          borderRadius: 4,
                        }
                      }}
                    />
                  </Box>
                ))}
                
                <Box mt={3} p={2} bgcolor="background.default" borderRadius={2}>
                  <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                    Performance Insights
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Students: {total}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                    • Gender distribution helps in understanding engagement patterns
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    • Performance analysis by gender enables targeted interventions
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </GlassCard>
        </Grid>
      </Grid>
    );
  };

  const renderCourseWiseComparison = () => {
    if (!chartData?.courseData || chartData.courseData.length === 0) return null;

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Course-wise Performance Comparison
          </Typography>
        </Grid>
        
        {chartData.courseData.map((course, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <GlassCard>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Typography variant="h6" fontWeight={600} sx={{ flex: 1 }}>
                    {course.name}
                  </Typography>
                  <IconButton 
                    size="small"
                    onClick={() => setDetailDialog({ open: true, type: 'course', data: course })}
                    sx={{
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.2),
                      }
                    }}
                  >
                    <Visibility fontSize="small" />
                  </IconButton>
                </Box>
                
                <Grid container spacing={1.5}>
                  <Grid item xs={6}>
                    <Paper sx={{ 
                      p: 2, 
                      textAlign: 'center',
                      borderRadius: 2,
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
                    }}>
                      <Typography variant="h5" color="primary.main" fontWeight={700}>
                        {course.avgScore?.toFixed(1)}%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">Avg Score</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper sx={{ 
                      p: 2, 
                      textAlign: 'center',
                      borderRadius: 2,
                      backgroundColor: alpha(theme.palette.success.main, 0.08),
                      border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`
                    }}>
                      <Typography variant="h5" color="success.main" fontWeight={700}>
                        {course.participation?.toFixed(1)}%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">Participation</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper sx={{ 
                      p: 2, 
                      textAlign: 'center',
                      borderRadius: 2,
                      backgroundColor: alpha(theme.palette.info.main, 0.08),
                      border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`
                    }}>
                      <Typography variant="h5" color="info.main" fontWeight={700}>
                        {course.passRate?.toFixed(1)}%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">Pass Rate</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper sx={{ 
                      p: 2, 
                      textAlign: 'center',
                      borderRadius: 2,
                      backgroundColor: alpha(theme.palette.warning.main, 0.08),
                      border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`
                    }}>
                      <Typography variant="h5" color="warning.main" fontWeight={700}>
                        {course.accuracy?.toFixed(1)}%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">Accuracy</Typography>
                    </Paper>
                  </Grid>
                </Grid>
                
                <Box mt={2} pt={1.5} borderTop={`1px solid ${alpha(theme.palette.divider, 0.1)}`}>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
                    • Students: {course.students || 0}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    • Performance: {
                      course.avgScore >= 85 ? 'Excellent' :
                      course.avgScore >= 70 ? 'Good' :
                      course.avgScore >= 50 ? 'Average' : 'Needs Improvement'
                    }
                  </Typography>
                </Box>
              </CardContent>
            </GlassCard>
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderDetailDialog = () => {
    if (!detailDialog.open) return null;

    const getDialogContent = () => {
      switch (detailDialog.type) {
        case 'student':
          const student = detailDialog.data;
          return (
            <Box>
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Avatar 
                  sx={{ 
                    width: 80, 
                    height: 80,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    fontSize: '2rem',
                    fontWeight: 600
                  }}
                >
                  {student.student.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    {student.student.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {student.student.department || 'Department not specified'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Course: {student.student.course || 'Not specified'}
                  </Typography>
                </Box>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, borderRadius: 3 }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Performance Summary
                    </Typography>
                    <Box mt={2}>
                      <Box display="flex" justifyContent="space-between" mb={2}>
                        <Typography variant="body1">Average Score</Typography>
                        <Typography variant="h6" color="primary" fontWeight={700}>
                          {student.performance.averagePercentage.toFixed(1)}%
                        </Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between" mb={2}>
                        <Typography variant="body1">Accuracy Rate</Typography>
                        <Typography variant="h6" color="success" fontWeight={700}>
                          {student.performance.accuracyRate.toFixed(1)}%
                        </Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between" mb={2}>
                        <Typography variant="body1">Total Attempts</Typography>
                        <Typography variant="h6" color="info" fontWeight={700}>
                          {student.performance.totalAttempts}
                        </Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="body1">Consistency Score</Typography>
                        <Typography variant="h6" color="warning" fontWeight={700}>
                          {student.performance.consistencyScore}%
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, borderRadius: 3 }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Performance Category
                    </Typography>
                    <Box textAlign="center" py={3}>
                      <CircularProgress 
                        variant="determinate" 
                        value={student.performance.averagePercentage}
                        size={120}
                        thickness={4}
                        sx={{ 
                          mb: 2,
                          color: getColorByValue(student.performance.averagePercentage) === 'success' ? 
                                theme.palette.success.main :
                                getColorByValue(student.performance.averagePercentage) === 'info' ? 
                                theme.palette.info.main :
                                getColorByValue(student.performance.averagePercentage) === 'warning' ? 
                                theme.palette.warning.main :
                                theme.palette.error.main
                        }}
                      />
                      <PerformanceBadge 
                        label={student.performance.performanceCategory.toUpperCase()}
                        performance={student.performance.performanceCategory}
                      />
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper sx={{ p: 3, borderRadius: 3 }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Quiz History
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Detailed quiz performance history would be shown here...
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          );

        case 'quiz':
          const quiz = detailDialog.data;
          return (
            <Box>
              <Typography variant="h5" gutterBottom fontWeight={700}>
                {quiz.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {quiz.subject} • {quiz.course?.join(', ')}
              </Typography>

              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, borderRadius: 3 }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Quiz Details
                    </Typography>
                    <Box mt={2}>
                      <Box display="flex" justifyContent="space-between" mb={2}>
                        <Typography variant="body1">Difficulty Level</Typography>
                        <Chip 
                          label={quiz.difficultyLevel}
                          size="small"
                          sx={{
                            backgroundColor: quiz.difficultyLevel === 'Hard' ? 
                              alpha(theme.palette.error.main, 0.15) :
                              quiz.difficultyLevel === 'Medium' ? 
                              alpha(theme.palette.warning.main, 0.15) :
                              alpha(theme.palette.success.main, 0.15),
                            color: quiz.difficultyLevel === 'Hard' ? 
                              theme.palette.error.dark :
                              quiz.difficultyLevel === 'Medium' ? 
                              theme.palette.warning.dark :
                              theme.palette.success.dark,
                            fontWeight: 600
                          }}
                        />
                      </Box>
                      <Box display="flex" justifyContent="space-between" mb={2}>
                        <Typography variant="body1">Total Marks</Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {quiz.totalMarks}
                        </Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between" mb={2}>
                        <Typography variant="body1">Date Created</Typography>
                        <Typography variant="body1">
                          {format(new Date(quiz.createdAt), 'MMM dd, yyyy')}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, borderRadius: 3 }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Performance Metrics
                    </Typography>
                    <Box mt={2}>
                      <Box display="flex" justifyContent="space-between" mb={2}>
                        <Typography variant="body1">Average Score</Typography>
                        <Typography variant="h6" color="primary" fontWeight={700}>
                          {quiz.averagePercentage?.toFixed(1)}%
                        </Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between" mb={2}>
                        <Typography variant="body1">Attendance Rate</Typography>
                        <Typography variant="h6" color="info" fontWeight={700}>
                          {quiz.attendanceRate?.toFixed(1)}%
                        </Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="body1">Pass Rate</Typography>
                        <Typography variant="h6" color="success" fontWeight={700}>
                          {quiz.passRate?.toFixed(1)}%
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper sx={{ p: 3, borderRadius: 3 }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Student Statistics
                    </Typography>
                    <Box mt={2}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          <Box textAlign="center">
                            <Typography variant="h4" color="primary" fontWeight={700}>
                              {quiz.registeredStudents}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Registered
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <Box textAlign="center">
                            <Typography variant="h4" color="info" fontWeight={700}>
                              {quiz.attemptedStudents}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Attempted
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <Box textAlign="center">
                            <Typography variant="h4" color="success" fontWeight={700}>
                              {Math.round((quiz.passRate / 100) * quiz.attemptedStudents)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Passed
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <Box textAlign="center">
                            <Typography variant="h4" color="warning" fontWeight={700}>
                              {quiz.registeredStudents - quiz.attemptedStudents}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Not Attempted
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          );

        case 'course':
          const course = detailDialog.data;
          return (
            <Box>
              <Typography variant="h5" gutterBottom fontWeight={700}>
                {course.name || course.course}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Course Performance Analysis
              </Typography>

              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <Paper sx={{ p: 3, borderRadius: 3 }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Key Performance Indicators
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid item xs={6} md={3}>
                        <Box textAlign="center">
                          <Typography variant="h3" color="primary" fontWeight={700}>
                            {course.avgScore?.toFixed(1)}%
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Average Score
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Box textAlign="center">
                          <Typography variant="h3" color="success" fontWeight={700}>
                            {course.participation?.toFixed(1)}%
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Participation
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Box textAlign="center">
                          <Typography variant="h3" color="info" fontWeight={700}>
                            {course.passRate?.toFixed(1)}%
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Pass Rate
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Box textAlign="center">
                          <Typography variant="h3" color="warning" fontWeight={700}>
                            {course.accuracy?.toFixed(1)}%
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Accuracy
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, borderRadius: 3 }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Course Details
                    </Typography>
                    <Box mt={2}>
                      <Typography variant="body1" paragraph>
                        <strong>Students:</strong> {course.students || 'Not specified'}
                      </Typography>
                      <Typography variant="body1" paragraph>
                        <strong>Quizzes:</strong> {course.totalQuizzes || 'Not specified'}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Performance Level:</strong> {
                          course.avgScore >= 85 ? 'Excellent' :
                          course.avgScore >= 70 ? 'Good' :
                          course.avgScore >= 50 ? 'Average' : 'Needs Improvement'
                        }
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, borderRadius: 3 }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Recommendations
                    </Typography>
                    <Box mt={2}>
                      {course.avgScore < 50 && (
                        <Alert severity="warning" sx={{ mb: 2, borderRadius: 2 }}>
                          Consider revising course materials and assessment methods
                        </Alert>
                      )}
                      {course.participation < 50 && (
                        <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
                          Implement engagement strategies to improve participation
                        </Alert>
                      )}
                      {course.passRate < 60 && (
                        <Alert severity="error" sx={{ borderRadius: 2 }}>
                          Review quiz difficulty and provide additional support
                        </Alert>
                      )}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          );

        default:
          return null;
      }
    };

    return (
      <Dialog 
        open={detailDialog.open} 
        onClose={() => setDetailDialog({ ...detailDialog, open: false })}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle sx={{ 
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          py: 3
        }}>
          <Typography variant="h5" fontWeight={700}>
            {detailDialog.type === 'student' ? 'Student Details' :
             detailDialog.type === 'quiz' ? 'Quiz Details' :
             'Course Details'}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ py: 3, px: 3 }}>
          {getDialogContent()}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={() => setDetailDialog({ ...detailDialog, open: false })}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Close
          </Button>
          <Button 
            onClick={() => setDetailDialog({ ...detailDialog, open: false })}
            variant="contained"
            sx={{ borderRadius: 2 }}
          >
            Export Details
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <ThemeProvider theme={professionalTheme}>
      <Container maxWidth="xl" sx={{ py: isMobile ? 2 : 3, px: isMobile ? 1 : 3 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassCard sx={{ mb: 3, p: 3 }}>
            <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
              <Grid item xs={12} md={8}>
                <Box display="flex" alignItems="center" gap={3}>
                  <Avatar sx={{ 
                    bgcolor: 'primary.main', 
                    width: 64, 
                    height: 64,
                    boxShadow: '0 4px 12px rgba(74, 111, 165, 0.3)'
                  }}>
                    <AnalyticsIcon sx={{ fontSize: '2rem' }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                      Faculty Analytics Dashboard
                    </Typography>
                    <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
                      <Chip 
                        icon={<Person />}
                        label={`Prof. ${analyticsData.data.summary.facultyName}`}
                        size="medium"
                        sx={{ 
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                          fontWeight: 500
                        }}
                      />
                      <Chip 
                        icon={<SchoolIcon />}
                        label={analyticsData.data.summary.department}
                        size="medium"
                        sx={{ 
                          backgroundColor: alpha(theme.palette.info.main, 0.1),
                          border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`,
                          fontWeight: 500
                        }}
                      />
                      <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.8 }}>
                        Last updated: {formatDate(analyticsData.data.summary.lastUpdated)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
                  <Tooltip title="Auto Refresh" arrow>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={autoRefresh}
                          onChange={(e) => setAutoRefresh(e.target.checked)}
                          size="small"
                          color="primary"
                        />
                      }
                      label="Auto Refresh"
                      sx={{ mr: 1 }}
                    />
                  </Tooltip>
                  
                  <Tooltip title="Refresh Data" arrow>
                    <IconButton 
                      onClick={fetchAnalytics} 
                      size="small"
                      sx={{
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.2),
                        }
                      }}
                    >
                      <Refresh />
                    </IconButton>
                  </Tooltip>
                  
                  <Tooltip title="Export Options" arrow>
                    <IconButton 
                      onClick={handleExportClick} 
                      size="small"
                      sx={{
                        backgroundColor: alpha(theme.palette.success.main, 0.1),
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.success.main, 0.2),
                        }
                      }}
                    >
                      <Download />
                    </IconButton>
                  </Tooltip>
                  
                  <Menu
                    anchorEl={exportMenuAnchor}
                    open={Boolean(exportMenuAnchor)}
                    onClose={handleExportClose}
                    PaperProps={{
                      sx: {
                        borderRadius: 2,
                        mt: 1,
                        minWidth: 200
                      }
                    }}
                  >
                    <MenuItem onClick={handleExportClose}>
                      <Download sx={{ mr: 1 }} /> Export as PDF
                    </MenuItem>
                    <MenuItem onClick={handleExportClose}>
                      <TableChart sx={{ mr: 1 }} /> Export as CSV
                    </MenuItem>
                    <MenuItem onClick={handleExportClose}>
                      <BarChartIcon sx={{ mr: 1 }} /> Export Charts
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleExportClose}>
                      <Print sx={{ mr: 1 }} /> Print Summary
                    </MenuItem>
                  </Menu>
                  
                  <Tooltip title="Dashboard Settings" arrow>
                    <IconButton 
                      onClick={handleSettingsClick} 
                      size="small"
                      sx={{
                        backgroundColor: alpha(theme.palette.warning.main, 0.1),
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.warning.main, 0.2),
                        }
                      }}
                    >
                      <Settings />
                    </IconButton>
                  </Tooltip>
                  
                  <Menu
                    anchorEl={settingsMenuAnchor}
                    open={Boolean(settingsMenuAnchor)}
                    onClose={handleSettingsClose}
                    PaperProps={{
                      sx: {
                        borderRadius: 2,
                        mt: 1,
                        minWidth: 200
                      }
                    }}
                  >
                    <MenuItem onClick={() => { setViewMode(viewMode === 'grid' ? 'list' : 'grid'); handleSettingsClose(); }}>
                      {viewMode === 'grid' ? 'Switch to List View' : 'Switch to Grid View'}
                    </MenuItem>
                    <MenuItem onClick={() => { setShowFilters(!showFilters); handleSettingsClose(); }}>
                      {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </MenuItem>
                    <MenuItem onClick={() => { setCompareMode(!compareMode); handleSettingsClose(); }}>
                      {compareMode ? 'Disable Compare Mode' : 'Enable Compare Mode'}
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => { setZoomLevel(1); handleSettingsClose(); }}>
                      Reset Zoom Level
                    </MenuItem>
                  </Menu>
                </Box>
              </Grid>
            </Grid>
          </GlassCard>
        </motion.div>

        {/* Key Performance Indicators */}
        <Box mb={4}>
          <Typography variant="h5" gutterBottom fontWeight={700} sx={{ mb: 3 }}>
            Key Performance Indicators
          </Typography>
          {renderMetrics()}
        </Box>

        {/* Tabs Section */}
        <Paper sx={{ 
          mb: 3, 
          borderRadius: 3, 
          overflow: 'hidden',
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
        }}>
          <Box sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            backgroundColor: theme.palette.background.default
          }}>
            <AnalyticsTabs 
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{
                '& .MuiTab-root': {
                  minWidth: 'auto',
                  px: 3
                }
              }}
            >
              {tabLabels.map((tab, index) => (
                <Tab 
                  key={index} 
                  label={isMobile && !isTablet ? '' : tab.label}
                  icon={isMobile || isTablet ? tab.icon : undefined}
                  iconPosition="start"
                  {...(isMobile || isTablet ? {} : { icon: tab.icon })}
                  sx={{
                    fontWeight: tabValue === index ? 600 : 500,
                    fontSize: '0.9rem'
                  }}
                />
              ))}
            </AnalyticsTabs>
          </Box>
        </Paper>

        {/* Filters Section */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <GlassCard sx={{ mb: 3, p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Filters & Search
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Search quizzes, students, courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                      sx: { borderRadius: 2 }
                    }}
                  />
                </Grid>
                
                <Grid item xs={6} sm={3} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Course</InputLabel>
                    <Select
                      value={courseFilter}
                      label="Course"
                      onChange={(e) => setCourseFilter(e.target.value)}
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="all">All Courses</MenuItem>
                      {uniqueCourses.map((course) => (
                        <MenuItem key={course} value={course}>
                          {course}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={6} sm={3} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Performance</InputLabel>
                    <Select
                      value={performanceFilter}
                      label="Performance"
                      onChange={(e) => setPerformanceFilter(e.target.value)}
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="all">All Levels</MenuItem>
                      <MenuItem value="excellent">Excellent (85%+)</MenuItem>
                      <MenuItem value="good">Good (70-84%)</MenuItem>
                      <MenuItem value="average">Average (50-69%)</MenuItem>
                      <MenuItem value="poor">Poor (20-49%)</MenuItem>
                      <MenuItem value="fail">Fail (&lt;20%)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={6} sm={3} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Timeframe</InputLabel>
                    <Select
                      value={timeframe}
                      label="Timeframe"
                      onChange={(e) => setTimeframe(e.target.value)}
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="today">Today</MenuItem>
                      <MenuItem value="week">Last Week</MenuItem>
                      <MenuItem value="month">Last Month</MenuItem>
                      <MenuItem value="quarter">Last Quarter</MenuItem>
                      <MenuItem value="year">Last Year</MenuItem>
                      <MenuItem value="all">All Time</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={6} sm={3} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Gender</InputLabel>
                    <Select
                      value={genderFilter}
                      label="Gender"
                      onChange={(e) => setGenderFilter(e.target.value)}
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="all">All Genders</MenuItem>
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={6} sm={3} md={1}>
                  <Button
                    fullWidth
                    size="small"
                    variant="outlined"
                    startIcon={<FilterList />}
                    onClick={() => {
                      setSearchTerm('');
                      setCourseFilter('all');
                      setPerformanceFilter('all');
                      setTimeframe('all');
                      setGenderFilter('all');
                    }}
                    sx={{ borderRadius: 2, height: '40px' }}
                  >
                    Clear
                  </Button>
                </Grid>
              </Grid>
              
              {compareMode && selectedQuizzes.length > 0 && (
                <Box mt={2} p={2} bgcolor="action.selected" borderRadius={2}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Comparing {selectedQuizzes.length} quizzes
                  </Typography>
                  <Button 
                    size="small" 
                    onClick={() => setSelectedQuizzes([])} 
                    sx={{ mt: 1 }}
                  >
                    Clear Selection
                  </Button>
                </Box>
              )}
            </GlassCard>
          </motion.div>
        )}

        {/* System Alerts */}
        {analyticsData.data.insights?.alerts?.length > 0 && (
          <Box mb={4}>
            <Typography variant="h5" gutterBottom fontWeight={700} sx={{ mb: 3 }}>
              System Alerts & Notifications
            </Typography>
            {renderAlerts()}
          </Box>
        )}

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tabValue}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Overview Tab */}
            {tabValue === 0 && (
              <Box>
                {/* Charts */}
                <Box mb={4}>
                  <Typography variant="h5" gutterBottom fontWeight={700} sx={{ mb: 3 }}>
                    Performance Overview
                  </Typography>
                  {renderCharts()}
                </Box>

                {/* Recommendations */}
                {analyticsData.data.recommendations?.length > 0 && (
                  <Box mb={4}>
                    <Typography variant="h5" gutterBottom fontWeight={700} sx={{ mb: 3 }}>
                      Actionable Recommendations
                    </Typography>
                    {renderRecommendations()}
                  </Box>
                )}

                {/* Data Quality */}
                {analyticsData.data.dataQuality && (
                  <GlassCard>
                    <CardContent>
                      <Typography variant="h6" gutterBottom fontWeight={600}>
                        Data Quality & Reliability
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Box p={3} bgcolor="background.default" borderRadius={3}>
                            <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                              Data Completeness
                            </Typography>
                            <Box display="flex" alignItems="center" gap={3}>
                              <CircularProgress 
                                variant="determinate" 
                                value={analyticsData.data.dataQuality.completeness.percentage}
                                size={100}
                                thickness={5}
                                sx={{
                                  color: analyticsData.data.dataQuality.completeness.percentage > 80 ? 
                                        theme.palette.success.main :
                                        analyticsData.data.dataQuality.completeness.percentage > 50 ? 
                                        theme.palette.warning.main : 
                                        theme.palette.error.main
                                }}
                              />
                              <Box>
                                <Typography variant="h4" fontWeight={700}>
                                  {analyticsData.data.dataQuality.completeness.percentage.toFixed(1)}%
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {analyticsData.data.dataQuality.completeness.quizzesWithAttempts} of {analyticsData.data.dataQuality.completeness.totalQuizzes} quizzes have data
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Box p={3} bgcolor="background.default" borderRadius={3}>
                            <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                              Data Freshness & Sources
                            </Typography>
                            <List dense>
                              <ListItem sx={{ px: 0 }}>
                                <ListItemText 
                                  primary="Last Updated"
                                  secondary={formatDate(analyticsData.data.summary.lastUpdated)}
                                  primaryTypographyProps={{ fontWeight: 500 }}
                                />
                              </ListItem>
                              <ListItem sx={{ px: 0 }}>
                                <ListItemText 
                                  primary="Computation Time"
                                  secondary={`${analyticsData.computationTime}ms`}
                                  primaryTypographyProps={{ fontWeight: 500 }}
                                />
                              </ListItem>
                              <ListItem sx={{ px: 0 }}>
                                <ListItemText 
                                  primary="Data Source"
                                  secondary={analyticsData.data.dataQuality.reliability.dataSource}
                                  primaryTypographyProps={{ fontWeight: 500 }}
                                />
                              </ListItem>
                            </List>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </GlassCard>
                )}
              </Box>
            )}

            {/* Deep Analytics Tab */}
            {tabValue === 1 && (
              <Box>
                <Typography variant="h5" gutterBottom fontWeight={700} sx={{ mb: 3 }}>
                  Comprehensive Analytics
                </Typography>
                
                {/* Gender Comparison */}
                <Box mb={4}>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Gender Distribution & Analysis
                  </Typography>
                  {renderGenderComparison()}
                </Box>

                {/* Course-wise Comparison */}
                <Box mb={4}>
                  {renderCourseWiseComparison()}
                </Box>

                {/* Course Performance Table */}
                <GlassCard sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Course-wise Performance Details
                    </Typography>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>Course</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 700 }}>Avg Score</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 700 }}>Participation</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 700 }}>Pass Rate</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 700 }}>Accuracy</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 700 }}>Students</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 700 }}>Status</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {analyticsData.data.courses?.map((course, index) => (
                            <TableRow key={index} hover>
                              <TableCell sx={{ fontWeight: 500 }}>{course.course}</TableCell>
                              <TableCell align="center">
                                <Chip 
                                  label={`${course.averagePercentage.toFixed(1)}%`}
                                  size="small"
                                  sx={{
                                    backgroundColor: getColorByValue(course.averagePercentage) === 'success' ? 
                                      alpha(theme.palette.success.main, 0.15) :
                                      getColorByValue(course.averagePercentage) === 'info' ? 
                                      alpha(theme.palette.info.main, 0.15) :
                                      getColorByValue(course.averagePercentage) === 'warning' ? 
                                      alpha(theme.palette.warning.main, 0.15) :
                                      alpha(theme.palette.error.main, 0.15),
                                    color: getColorByValue(course.averagePercentage) === 'success' ? 
                                      theme.palette.success.dark :
                                      getColorByValue(course.averagePercentage) === 'info' ? 
                                      theme.palette.info.dark :
                                      getColorByValue(course.averagePercentage) === 'warning' ? 
                                      theme.palette.warning.dark :
                                      theme.palette.error.dark,
                                    fontWeight: 600,
                                    border: '1px solid',
                                    borderColor: getColorByValue(course.averagePercentage) === 'success' ? 
                                      alpha(theme.palette.success.main, 0.3) :
                                      getColorByValue(course.averagePercentage) === 'info' ? 
                                      alpha(theme.palette.info.main, 0.3) :
                                      getColorByValue(course.averagePercentage) === 'warning' ? 
                                      alpha(theme.palette.warning.main, 0.3) :
                                      alpha(theme.palette.error.main, 0.3),
                                  }}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <Chip 
                                  label={`${course.participationRate.toFixed(1)}%`}
                                  size="small"
                                  sx={{
                                    backgroundColor: getColorByValue(course.participationRate, 'participation') === 'success' ? 
                                      alpha(theme.palette.success.main, 0.15) :
                                      getColorByValue(course.participationRate, 'participation') === 'info' ? 
                                      alpha(theme.palette.info.main, 0.15) :
                                      getColorByValue(course.participationRate, 'participation') === 'warning' ? 
                                      alpha(theme.palette.warning.main, 0.15) :
                                      alpha(theme.palette.error.main, 0.15),
                                    color: getColorByValue(course.participationRate, 'participation') === 'success' ? 
                                      theme.palette.success.dark :
                                      getColorByValue(course.participationRate, 'participation') === 'info' ? 
                                      theme.palette.info.dark :
                                      getColorByValue(course.participationRate, 'participation') === 'warning' ? 
                                      theme.palette.warning.dark :
                                      theme.palette.error.dark,
                                    fontWeight: 600,
                                    border: '1px solid',
                                    borderColor: getColorByValue(course.participationRate, 'participation') === 'success' ? 
                                      alpha(theme.palette.success.main, 0.3) :
                                      getColorByValue(course.participationRate, 'participation') === 'info' ? 
                                      alpha(theme.palette.info.main, 0.3) :
                                      getColorByValue(course.participationRate, 'participation') === 'warning' ? 
                                      alpha(theme.palette.warning.main, 0.3) :
                                      alpha(theme.palette.error.main, 0.3),
                                  }}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <Chip 
                                  label={`${course.passRate.toFixed(1)}%`}
                                  size="small"
                                  sx={{
                                    backgroundColor: course.passRate >= 80 ? 
                                      alpha(theme.palette.success.main, 0.15) :
                                      course.passRate >= 60 ? 
                                      alpha(theme.palette.warning.main, 0.15) :
                                      alpha(theme.palette.error.main, 0.15),
                                    color: course.passRate >= 80 ? 
                                      theme.palette.success.dark :
                                      course.passRate >= 60 ? 
                                      theme.palette.warning.dark :
                                      theme.palette.error.dark,
                                    fontWeight: 600,
                                    border: '1px solid',
                                    borderColor: course.passRate >= 80 ? 
                                      alpha(theme.palette.success.main, 0.3) :
                                      course.passRate >= 60 ? 
                                      alpha(theme.palette.warning.main, 0.3) :
                                      alpha(theme.palette.error.main, 0.3),
                                  }}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <Typography variant="body2" fontWeight={500}>
                                  {course.averageAccuracy.toFixed(1)}%
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Typography variant="body2" fontWeight={500}>
                                  {course.totalRegisteredStudents || 0}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Chip 
                                  label={
                                    course.averagePercentage >= 85 ? 'Excellent' :
                                    course.averagePercentage >= 70 ? 'Good' :
                                    course.averagePercentage >= 50 ? 'Average' : 'Needs Improvement'
                                  }
                                  size="small"
                                  sx={{
                                    backgroundColor: course.averagePercentage >= 85 ? 
                                      alpha(theme.palette.success.main, 0.15) :
                                      course.averagePercentage >= 70 ? 
                                      alpha(theme.palette.info.main, 0.15) :
                                      course.averagePercentage >= 50 ? 
                                      alpha(theme.palette.warning.main, 0.15) :
                                      alpha(theme.palette.error.main, 0.15),
                                    color: course.averagePercentage >= 85 ? 
                                      theme.palette.success.dark :
                                      course.averagePercentage >= 70 ? 
                                      theme.palette.info.dark :
                                      course.averagePercentage >= 50 ? 
                                      theme.palette.warning.dark :
                                      theme.palette.error.dark,
                                    fontWeight: 600,
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </GlassCard>

                {/* Time Analysis */}
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <GlassCard>
                      <CardContent>
                        <Typography variant="h6" gutterBottom fontWeight={600}>
                          Average Time per Attempt
                        </Typography>
                        <Box textAlign="center" py={2}>
                          <Typography variant="h2" color="primary" fontWeight={700}>
                            {analyticsData.data.overview.averageTimePerAttempt}s
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            per quiz attempt
                          </Typography>
                        </Box>
                      </CardContent>
                    </GlassCard>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <GlassCard>
                      <CardContent>
                        <Typography variant="h6" gutterBottom fontWeight={600}>
                          Completion Rate
                        </Typography>
                        <Box textAlign="center" py={2}>
                          <Typography variant="h2" color="success" fontWeight={700}>
                            {analyticsData.data.trends?.engagement?.completionRate.toFixed(1)}%
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            of started quizzes completed
                          </Typography>
                        </Box>
                      </CardContent>
                    </GlassCard>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <GlassCard>
                      <CardContent>
                        <Typography variant="h6" gutterBottom fontWeight={600}>
                          Dropout Rate
                        </Typography>
                        <Box textAlign="center" py={2}>
                          <Typography variant="h2" color="warning" fontWeight={700}>
                            {analyticsData.data.trends?.engagement?.dropoutRate.toFixed(1)}%
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            of quizzes not completed
                          </Typography>
                        </Box>
                      </CardContent>
                    </GlassCard>
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Quizzes Tab */}
            {tabValue === 2 && (
              <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Typography variant="h5" fontWeight={700}>
                    Quiz Performance Analysis
                  </Typography>
                  <Box display="flex" gap={1}>
                    <Button 
                      size="small" 
                      startIcon={<CompareArrows />}
                      variant={compareMode ? "contained" : "outlined"}
                      onClick={() => setCompareMode(!compareMode)}
                      sx={{ borderRadius: 2 }}
                    >
                      Compare
                    </Button>
                    <Button 
                      size="small" 
                      startIcon={<FilterList />}
                      onClick={() => setShowFilters(!showFilters)}
                      variant={showFilters ? "contained" : "outlined"}
                      sx={{ borderRadius: 2 }}
                    >
                      Filters
                    </Button>
                  </Box>
                </Box>
                {renderQuizTable()}
              </Box>
            )}

            {/* Courses Tab */}
            {tabValue === 3 && (
              <Box>
                <Typography variant="h5" gutterBottom fontWeight={700} sx={{ mb: 3 }}>
                  Course Performance Analysis
                </Typography>
                {renderCourseWiseComparison()}
              </Box>
            )}

            {/* Students Tab */}
            {tabValue === 4 && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h5" gutterBottom fontWeight={700}>
                    Student Performance Analysis
                  </Typography>
                </Grid>
                
                <Grid item xs={12} lg={8}>
                  <GlassCard>
                    <CardContent>
                      <Typography variant="h6" gutterBottom fontWeight={600}>
                        Top Performers
                      </Typography>
                      {renderTopPerformers()}
                    </CardContent>
                  </GlassCard>
                </Grid>
                
                <Grid item xs={12} lg={4}>
                  <GlassCard>
                    <CardContent>
                      <Typography variant="h6" gutterBottom fontWeight={600}>
                        Performance Summary
                      </Typography>
                      <Box py={2}>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Paper sx={{ 
                              p: 2.5, 
                              textAlign: 'center',
                              borderRadius: 3,
                              backgroundColor: alpha(theme.palette.primary.main, 0.08),
                              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
                            }}>
                              <Typography variant="h3" fontWeight={700}>
                                {analyticsData.data.students.totalStudents}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">Total Students</Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={6}>
                            <Paper sx={{ 
                              p: 2.5, 
                              textAlign: 'center',
                              borderRadius: 3,
                              backgroundColor: alpha(theme.palette.info.main, 0.08),
                              border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`
                            }}>
                              <Typography variant="h3" color="primary" fontWeight={700}>
                                {analyticsData.data.students.averageStudentPercentage.toFixed(1)}%
                              </Typography>
                              <Typography variant="caption" color="text.secondary">Avg Score</Typography>
                            </Paper>
                          </Grid>
                        </Grid>
                        
                        <Box mt={3}>
                          <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                            Performance Distribution:
                          </Typography>
                          {Object.entries(analyticsData.data.students.distribution || {}).map(([key, value]) => (
                            <Box key={key} display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
                              <Box display="flex" alignItems="center" gap={1}>
                                <Box sx={{ 
                                  width: 12, 
                                  height: 12, 
                                  borderRadius: '50%',
                                  backgroundColor: 
                                    key === 'excellent' ? theme.palette.success.main :
                                    key === 'good' ? theme.palette.info.main :
                                    key === 'average' ? theme.palette.warning.main :
                                    key === 'poor' ? theme.palette.error.main :
                                    theme.palette.grey[500]
                                }} />
                                <Typography variant="body2">
                                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                                </Typography>
                              </Box>
                              <Typography variant="body2" fontWeight={600}>
                                {value} students
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </CardContent>
                  </GlassCard>
                </Grid>
              </Grid>
            )}

            {/* Trends Tab */}
            {tabValue === 5 && (
              <Box>
                <Typography variant="h5" gutterBottom fontWeight={700}>
                  Performance Trends & Patterns
                </Typography>
                
                {/* Monthly Trends */}
                <GlassCard sx={{ mb: 4 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Monthly Performance Trends
                    </Typography>
                    <Box sx={{ height: 400 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData?.timeSeriesData}>
                          <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.3)} />
                          <XAxis 
                            dataKey="month" 
                            tick={{ fill: theme.palette.text.secondary }}
                          />
                          <YAxis 
                            tick={{ fill: theme.palette.text.secondary }}
                            domain={[0, 100]}
                          />
                          <RechartsTooltip 
                            contentStyle={{
                              borderRadius: 12,
                              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                              backgroundColor: theme.palette.background.paper
                            }}
                          />
                          <Legend />
                          <Area 
                            type="monotone" 
                            dataKey="score" 
                            name="Average Score %" 
                            stroke={theme.palette.primary.main} 
                            fill={theme.palette.primary.main}
                            fillOpacity={0.3}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="participation" 
                            name="Participation %" 
                            stroke={theme.palette.success.main} 
                            fill={theme.palette.success.main}
                            fillOpacity={0.3}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </Box>
                  </CardContent>
                </GlassCard>

                {/* Engagement Metrics */}
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <GlassCard>
                      <CardContent>
                        <Typography variant="h6" gutterBottom fontWeight={600}>
                          Engagement Metrics
                        </Typography>
                        <Box>
                          <Typography variant="body2" gutterBottom sx={{ mb: 2 }}>
                            Engagement Level: 
                            <Chip 
                              label={analyticsData.data.trends?.engagement?.engagementLevel}
                              size="small"
                              sx={{
                                ml: 1,
                                backgroundColor: analyticsData.data.trends?.engagement?.engagementLevel === 'Excellent' ? 
                                  alpha(theme.palette.success.main, 0.15) :
                                  analyticsData.data.trends?.engagement?.engagementLevel === 'Good' ? 
                                  alpha(theme.palette.info.main, 0.15) :
                                  analyticsData.data.trends?.engagement?.engagementLevel === 'Average' ? 
                                  alpha(theme.palette.warning.main, 0.15) :
                                  alpha(theme.palette.error.main, 0.15),
                                color: analyticsData.data.trends?.engagement?.engagementLevel === 'Excellent' ? 
                                  theme.palette.success.dark :
                                  analyticsData.data.trends?.engagement?.engagementLevel === 'Good' ? 
                                  theme.palette.info.dark :
                                  analyticsData.data.trends?.engagement?.engagementLevel === 'Average' ? 
                                  theme.palette.warning.dark :
                                  theme.palette.error.dark,
                                fontWeight: 600
                              }}
                            />
                          </Typography>
                          
                          <Box mt={2}>
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <Paper sx={{ 
                                  p: 2.5, 
                                  textAlign: 'center',
                                  borderRadius: 3,
                                  backgroundColor: alpha(theme.palette.success.main, 0.08),
                                  border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`
                                }}>
                                  <Typography variant="h3" color="success" fontWeight={700}>
                                    {analyticsData.data.trends?.engagement?.completionRate.toFixed(1)}%
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">Completion Rate</Typography>
                                </Paper>
                              </Grid>
                              <Grid item xs={6}>
                                <Paper sx={{ 
                                  p: 2.5, 
                                  textAlign: 'center',
                                  borderRadius: 3,
                                  backgroundColor: alpha(theme.palette.error.main, 0.08),
                                  border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`
                                }}>
                                  <Typography variant="h3" color="error" fontWeight={700}>
                                    {analyticsData.data.trends?.engagement?.dropoutRate.toFixed(1)}%
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">Dropout Rate</Typography>
                                </Paper>
                              </Grid>
                            </Grid>
                          </Box>
                        </Box>
                      </CardContent>
                    </GlassCard>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <GlassCard>
                      <CardContent>
                        <Typography variant="h6" gutterBottom fontWeight={600}>
                          Growth Analysis
                        </Typography>
                        <Box textAlign="center" py={3}>
                          <CircularProgress 
                            variant="determinate" 
                            value={Math.min(100, Math.abs(analyticsData.data.trends?.timeBased?.growthRate || 0))}
                            size={140}
                            thickness={4}
                            sx={{
                              mb: 2,
                              color: (analyticsData.data.trends?.timeBased?.growthRate || 0) > 0 ? 
                                theme.palette.success.main : 
                                theme.palette.error.main
                            }}
                          />
                          <Typography variant="h2" gutterBottom fontWeight={700} sx={{ mt: 2 }}>
                            {analyticsData.data.trends?.timeBased?.growthRate?.toFixed(1)}%
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Quiz Creation Growth Rate
                          </Typography>
                          <Chip 
                            label={(analyticsData.data.trends?.timeBased?.growthRate || 0) > 0 ? "POSITIVE GROWTH" : "NEGATIVE GROWTH"}
                            size="small"
                            sx={{
                              mt: 2,
                              backgroundColor: (analyticsData.data.trends?.timeBased?.growthRate || 0) > 0 ? 
                                alpha(theme.palette.success.main, 0.15) : 
                                alpha(theme.palette.error.main, 0.15),
                              color: (analyticsData.data.trends?.timeBased?.growthRate || 0) > 0 ? 
                                theme.palette.success.dark : 
                                theme.palette.error.dark,
                              fontWeight: 600
                            }}
                          />
                        </Box>
                      </CardContent>
                    </GlassCard>
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Predictive Tab */}
            {tabValue === 6 && (
              <Box>
                <Typography variant="h5" gutterBottom fontWeight={700}>
                  Predictive Analytics & Forecasts
                </Typography>
                {renderPredictiveAnalytics()}
              </Box>
            )}

            {/* Charts Tab */}
            {tabValue === 7 && (
              <Box>
                <Typography variant="h5" gutterBottom fontWeight={700}>
                  Advanced Charts & Visualizations
                </Typography>
                {renderCharts()}
              </Box>
            )}

            {/* Reports Tab */}
            {tabValue === 8 && (
              <Box>
                <Typography variant="h5" gutterBottom fontWeight={700}>
                  Advanced Reports & Insights
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <GlassCard>
                      <CardContent>
                        <Typography variant="h6" gutterBottom fontWeight={600}>
                          Detailed Performance Report
                        </Typography>
                        <List>
                          <ListItem sx={{ px: 0, py: 1.5 }}>
                            <ListItemText 
                              primary="Overall Performance Score"
                              secondary={`${analyticsData.data.overview.averagePercentage.toFixed(1)}%`}
                              primaryTypographyProps={{ fontWeight: 500 }}
                              secondaryTypographyProps={{ 
                                color: 'primary',
                                fontWeight: 600,
                                fontSize: '1.1rem'
                              }}
                            />
                          </ListItem>
                          <Divider />
                          <ListItem sx={{ px: 0, py: 1.5 }}>
                            <ListItemText 
                              primary="Student Engagement Index"
                              secondary={`${analyticsData.data.overview.participationRate.toFixed(1)}%`}
                              primaryTypographyProps={{ fontWeight: 500 }}
                              secondaryTypographyProps={{ 
                                color: 'info',
                                fontWeight: 600,
                                fontSize: '1.1rem'
                              }}
                            />
                          </ListItem>
                          <Divider />
                          <ListItem sx={{ px: 0, py: 1.5 }}>
                            <ListItemText 
                              primary="Question Effectiveness"
                              secondary={`${analyticsData.data.overview.averageAccuracy.toFixed(1)}% accuracy`}
                              primaryTypographyProps={{ fontWeight: 500 }}
                              secondaryTypographyProps={{ 
                                color: 'warning',
                                fontWeight: 600,
                                fontSize: '1.1rem'
                              }}
                            />
                          </ListItem>
                          <Divider />
                          <ListItem sx={{ px: 0, py: 1.5 }}>
                            <ListItemText 
                              primary="Assessment Quality"
                              secondary={`${analyticsData.data.overview.passRate.toFixed(1)}% pass rate`}
                              primaryTypographyProps={{ fontWeight: 500 }}
                              secondaryTypographyProps={{ 
                                color: 'success',
                                fontWeight: 600,
                                fontSize: '1.1rem'
                              }}
                            />
                          </ListItem>
                        </List>
                      </CardContent>
                    </GlassCard>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <GlassCard>
                      <CardContent>
                        <Typography variant="h6" gutterBottom fontWeight={600}>
                          Quick Insights Summary
                        </Typography>
                        <List dense>
                          {analyticsData.data.insights?.keyFindings?.map((finding, index) => (
                            <ListItem key={index} sx={{ px: 0, py: 1.5 }}>
                              <ListItemAvatar>
                                <Avatar sx={{ 
                                  width: 32, 
                                  height: 32,
                                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                                  color: theme.palette.primary.main
                                }}>
                                  <Info fontSize="small" />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText 
                                primary={
                                  <Typography variant="subtitle2" fontWeight={600}>
                                    {finding.title}
                                  </Typography>
                                }
                                secondary={
                                  <Typography variant="body2" color="text.secondary">
                                    {finding.description}
                                  </Typography>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </GlassCard>
                  </Grid>
                </Grid>
              </Box>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <Box mt={4} pt={3} borderTop={1} borderColor="divider">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.7 }}>
                Data refreshed every 5 minutes
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} textAlign="center">
              <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.7 }}>
                Computation Time: {analyticsData.computationTime}ms
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} textAlign="right">
              <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.7 }}>
                Analytics ID: {analyticsData.data.summary.facultyId}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Speed Dial for Quick Actions */}
        <SpeedDial
          ariaLabel="Quick Actions"
          sx={{ 
            position: 'fixed', 
            bottom: 24, 
            right: 24,
            '& .MuiSpeedDial-fab': {
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              }
            }
          }}
          icon={<SpeedDialIcon />}
        >
          <SpeedDialAction
            icon={<Refresh />}
            tooltipTitle="Refresh"
            onClick={fetchAnalytics}
          />
          <SpeedDialAction
            icon={<Download />}
            tooltipTitle="Export"
            onClick={handleExportClick}
          />
          <SpeedDialAction
            icon={<FilterList />}
            tooltipTitle="Toggle Filters"
            onClick={() => setShowFilters(!showFilters)}
          />
          <SpeedDialAction
            icon={<Settings />}
            tooltipTitle="Settings"
            onClick={handleSettingsClick}
          />
        </SpeedDial>
      </Container>

      {/* Detail Dialog */}
      {renderDetailDialog()}
    </ThemeProvider>
  );
};

export default FacultyAnalytics;