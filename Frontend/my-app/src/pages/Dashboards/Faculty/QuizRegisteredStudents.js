// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const QuizRegisteredStudents = () => {
//   const { quizId } = useParams();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchRegisteredStudents();
//   }, []);

//   const fetchRegisteredStudents = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/faculty/quiz/${quizId}/registered-students`,
//         { withCredentials: true }
//       );
//       setData(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (!data) return <p>No data found</p>;

//   const { quiz, students, registeredCount } = data;

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>{quiz.title}</h2>
//       <p>
//         {quiz.subject} | {quiz.course.join(", ")}
//       </p>
//       <h3>Total Registered: {registeredCount}</h3>

//       <table border="1" width="100%" cellPadding="8">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Enrollment</th>
//             <th>Course</th>
//             <th>Group</th>
//             <th>Semester</th>
//             <th>Department</th>
//             <th>Email</th>
//             <th>Mobile</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students && students.length > 0 ? (
//             students.map((s, index) => (
//               <tr key={s._id}>
//                 <td>{index + 1}</td>
//                 <td>{s.name}</td>
//                 <td>{s.studentId}</td>
//                 <td>{s.course}</td>
//                 <td>{s.group}</td>
//                 <td>{s.semester}</td>
//                 <td>{s.department}</td>
//                 <td>{s.email}</td>
//                 <td>{s.mobileNumber}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="9">No registered students yet.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default QuizRegisteredStudents;












// import React, { useEffect, useState, useMemo } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Container,
//   Grid,
//   Paper,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Chip,
//   IconButton,
//   Tooltip,
//   Card,
//   CardContent,
//   LinearProgress,
//   Avatar,
//   Button,
//   Stack,
//   alpha,
//   useTheme,
//   CircularProgress,
//   Alert,
//   TextField,
//   InputAdornment,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Pagination,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Tab,
//   Tabs,
//   Divider,
//   Rating,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Badge
// } from "@mui/material";
// import {
//   People as PeopleIcon,
//   School as SchoolIcon,
//   BarChart as BarChartIcon,
//   Timeline as TimelineIcon,
//   PieChart as PieChartIcon,
//   Groups as GroupsIcon,
//   Email as EmailIcon,
//   Phone as PhoneIcon,
//   Person as PersonIcon,
//   Score as ScoreIcon,
//   AccessTime as TimeIcon,
//   CheckCircle as SuccessIcon,
//   Cancel as CancelIcon,
//   TrendingUp as TrendingUpIcon,
//   Download as DownloadIcon,
//   Male as MaleIcon,
//   Female as FemaleIcon,
//   Transgender as OtherIcon,
//   CalendarToday as CalendarIcon,
//   Insights as InsightsIcon,
//   Search as SearchIcon,
//   FilterList as FilterIcon,
//   ViewIcon,
  
//   ContactPhone as ContactIcon,
//   Assignment as AssignmentIcon,
//   LibraryBooks as LibraryBooksIcon,
//   Today as TodayIcon,
//   AccessTimeFilled as ClockIcon,
//   Star as StarIcon,
//   StarBorder as StarBorderIcon,
//   Psychology as PsychologyIcon,
//   EmojiEvents as TrophyIcon
// } from "@mui/icons-material";
// import TimerIcon from "@mui/icons-material/Timer";
// import VisibilityIcon from "@mui/icons-material/Visibility";

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip as ChartTooltip,
//   Legend,
//   Filler,
//   RadialLinearScale
// } from 'chart.js';
// import { Line, Bar, Pie, Doughnut, Radar } from 'react-chartjs-2';

// // Register ChartJS components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   ArcElement,
//   Title,
//   ChartTooltip,
//   Legend,
//   Filler,
//   RadialLinearScale
// );

// // Safe access helper function
// const safeGet = (obj, path, defaultValue = null) => {
//   const keys = path.split('.');
//   let result = obj;
  
//   for (const key of keys) {
//     if (result === null || result === undefined) {
//       return defaultValue;
//     }
//     result = result[key];
//   }
  
//   return result === undefined ? defaultValue : result;
// };

// // Custom styled components
// const StatCard = ({ title, value, icon, color, subtext, progress }) => {
//   const theme = useTheme();
  
//   return (
//     <Card sx={{
//       height: '100%',
//       borderRadius: 3,
//       background: `linear-gradient(135deg, ${alpha(theme.palette[color]?.main || theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette[color]?.main || theme.palette.primary.main, 0.05)} 100%)`,
//       border: `1px solid ${alpha(theme.palette[color]?.main || theme.palette.primary.main, 0.2)}`,
//       transition: 'all 0.3s ease',
//       '&:hover': {
//         transform: 'translateY(-4px)',
//         boxShadow: `0 12px 24px ${alpha(theme.palette[color]?.main || theme.palette.primary.main, 0.15)}`,
//         borderColor: alpha(theme.palette[color]?.main || theme.palette.primary.main, 0.3)
//       }
//     }}>
//       <CardContent sx={{ p: 3 }}>
//         <Stack direction="row" alignItems="center" spacing={2}>
//           <Avatar sx={{
//             bgcolor: alpha(theme.palette[color]?.main || theme.palette.primary.main, 0.15),
//             color: theme.palette[color]?.main || theme.palette.primary.main,
//             width: 56,
//             height: 56,
//             borderRadius: 2
//           }}>
//             {icon}
//           </Avatar>
//           <Box sx={{ flex: 1 }}>
//             <Typography variant="h3" fontWeight="bold" color={`${color}.main`}>
//               {value}
//             </Typography>
//             <Typography variant="body2" color="text.secondary" fontWeight={500}>
//               {title}
//             </Typography>
//             {subtext && (
//               <Typography variant="caption" color="text.secondary">
//                 {subtext}
//               </Typography>
//             )}
//           </Box>
//         </Stack>
//         {progress !== undefined && (
//           <Box sx={{ mt: 2 }}>
//             <LinearProgress
//               variant="determinate"
//               value={progress || 0}
//               sx={{
//                 height: 6,
//                 borderRadius: 3,
//                 bgcolor: alpha(theme.palette[color]?.main || theme.palette.primary.main, 0.1),
//                 '& .MuiLinearProgress-bar': {
//                   borderRadius: 3,
//                   background: `linear-gradient(90deg, ${theme.palette[color]?.light || theme.palette.primary.light} 0%, ${theme.palette[color]?.main || theme.palette.primary.main} 100%)`
//                 }
//               }}
//             />
//           </Box>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// const QuizRegisteredStudents = () => {
//   const theme = useTheme();
//   const { quizId } = useParams();
//   const navigate = useNavigate();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedTab, setSelectedTab] = useState(0);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [viewModalOpen, setViewModalOpen] = useState(false);
//   const [search, setSearch] = useState('');
//   const [filter, setFilter] = useState('all');
//   const [page, setPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   useEffect(() => {
//     fetchRegisteredStudents();
//   }, [quizId, page, rowsPerPage, filter]);

//   const fetchRegisteredStudents = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await axios.get(
//         `http://localhost:5000/api/faculty/quiz/${quizId}/registered-students`,
//         {
//           params: {
//             page,
//             limit: rowsPerPage,
//             search,
//             filter
//           },
//           withCredentials: true
//         }
//       );
//       if (res.data.success) {
//         setData(res.data);
//       } else {
//         setError(res.data.message || "Failed to load data");
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError(err.response?.data?.message || "Failed to fetch data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     setPage(1);
//     fetchRegisteredStudents();
//   };

//   const handleViewStudent = (student) => {
//     setSelectedStudent(student);
//     setViewModalOpen(true);
//   };

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(1);
//   };

//   // Safe data access
//   const quiz = safeGet(data, 'quiz', {});
//   const statistics = safeGet(data, 'statistics', {});
//   const students = safeGet(data, 'students', []);
//   const pagination = safeGet(data, 'pagination', { total: 0, page: 1, totalPages: 1 });
//   const groupWiseStats = safeGet(data, 'groupWiseStats', []);
//   const performanceTrend = safeGet(data, 'performanceTrend', []);
//   const timeAnalysis = safeGet(data, 'timeAnalysis', {});

//   // Chart configurations with safe access
//   const performanceComparisonChart = {
//     labels: students.slice(0, 5).map(s => s?.name?.split(' ')[0] || 'Student') || [],
//     datasets: [
//       {
//         label: 'Best Score',
//         data: students.slice(0, 5).map(s => s?.bestScore || 0) || [0, 0, 0, 0, 0],
//         backgroundColor: alpha(theme.palette.success.main, 0.7),
//         borderColor: theme.palette.success.main,
//         borderWidth: 2,
//         borderRadius: 4
//       },
//       {
//         label: 'Average Score',
//         data: students.slice(0, 5).map(s => s?.avgScore || 0) || [0, 0, 0, 0, 0],
//         backgroundColor: alpha(theme.palette.primary.main, 0.7),
//         borderColor: theme.palette.primary.main,
//         borderWidth: 2,
//         borderRadius: 4
//       }
//     ]
//   };

//   const timeAnalysisChart = {
//     labels: safeGet(timeAnalysis, 'hourlyDistribution', []).map(h => h?.hour || '0:00') || [],
//     datasets: [
//       {
//         label: 'Attempts by Hour',
//         data: safeGet(timeAnalysis, 'hourlyDistribution', []).map(h => h?.count || 0) || [],
//         backgroundColor: alpha(theme.palette.info.main, 0.7),
//         borderColor: theme.palette.info.main,
//         borderWidth: 2,
//         borderRadius: 4
//       }
//     ]
//   };

//   const performanceDistributionChart = {
//     labels: ['Excellent (≥80%)', 'Good (60-79%)', 'Average (40-59%)', 'Poor (<40%)', 'Not Attempted'],
//     datasets: [
//       {
//         data: [
//           safeGet(statistics, 'performanceStats.excellent', 0),
//           safeGet(statistics, 'performanceStats.good', 0),
//           safeGet(statistics, 'performanceStats.average', 0),
//           safeGet(statistics, 'performanceStats.poor', 0),
//           safeGet(statistics, 'notAttemptedCount', 0)
//         ],
//         backgroundColor: [
//           theme.palette.success.main,
//           theme.palette.primary.main,
//           theme.palette.warning.main,
//           theme.palette.error.main,
//           theme.palette.grey[400]
//         ],
//         borderColor: [
//           theme.palette.success.dark,
//           theme.palette.primary.dark,
//           theme.palette.warning.dark,
//           theme.palette.error.dark,
//           theme.palette.grey[600]
//         ],
//         borderWidth: 2
//       }
//     ]
//   };

//  const getPerformanceColor = (percentage) => {
//   if (!percentage && percentage !== 0) return 'info';  // Use 'info' instead of 'default'
//   if (percentage >= 80) return 'success';
//   if (percentage >= 60) return 'primary';
//   if (percentage >= 40) return 'warning';
//   return 'error';
// };

//   const getPerformanceLabel = (percentage) => {
//     if (!percentage && percentage !== 0) return 'Not Attempted';
//     if (percentage >= 80) return 'Excellent';
//     if (percentage >= 60) return 'Good';
//     if (percentage >= 40) return 'Average';
//     if (percentage > 0) return 'Poor';
//     return 'Not Attempted';
//   };

//   const getGenderIcon = (gender) => {
//     if (!gender) return <OtherIcon fontSize="small" />;
//     switch (gender.toLowerCase()) {
//       case 'male': return <MaleIcon fontSize="small" />;
//       case 'female': return <FemaleIcon fontSize="small" />;
//       default: return <OtherIcon fontSize="small" />;
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) return 'Invalid Date';
//       return date.toLocaleDateString('en-US', {
//         day: 'numeric',
//         month: 'short',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch {
//       return 'Invalid Date';
//     }
//   };

//   const formatTime = (seconds) => {
//     if (!seconds || seconds === 0) return '0s';
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
    
//     if (hrs > 0) return `${hrs}h ${mins}m`;
//     if (mins > 0) return `${mins}m ${secs}s`;
//     return `${secs}s`;
//   };

//   if (loading && !data) {
//     return (
//       <Box sx={{ 
//         bgcolor: 'grey.50', 
//         minHeight: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center'
//       }}>
//         <Box sx={{ textAlign: 'center' }}>
//           <CircularProgress size={80} thickness={4} sx={{ color: theme.palette.primary.main }} />
//           <Typography variant="h6" sx={{ mt: 3, color: 'text.secondary', fontWeight: 500 }}>
//             Loading University Analytics Dashboard...
//           </Typography>
//           <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
//             Preparing comprehensive quiz insights
//           </Typography>
//         </Box>
//       </Box>
//     );
//   }

//   if (error || !data) {
//     return (
//       <Container maxWidth="xl" sx={{ py: 8 }}>
//         <Paper sx={{ 
//           p: 6, 
//           textAlign: 'center', 
//           bgcolor: 'background.paper',
//           borderRadius: 3,
//           boxShadow: theme.shadows[3]
//         }}>
//           <CancelIcon sx={{ fontSize: 80, mb: 3, color: 'error.main' }} />
//           <Typography variant="h4" gutterBottom fontWeight="bold">
//             Unable to Load Analytics
//           </Typography>
//           <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
//             {error || 'No data available for this quiz'}
//           </Typography>
//           <Button
//             variant="contained"
//             size="large"
//             onClick={fetchRegisteredStudents}
//             sx={{ 
//               px: 4,
//               py: 1.5,
//               borderRadius: 2,
//               bgcolor: theme.palette.primary.main,
//               '&:hover': { 
//                 bgcolor: theme.palette.primary.dark,
//                 transform: 'translateY(-2px)',
//                 boxShadow: theme.shadows[4]
//               },
//               transition: 'all 0.3s ease'
//             }}
//           >
//             Retry Loading
//           </Button>
//         </Paper>
//       </Container>
//     );
//   }

//   return (
//     <Box sx={{ 
//       bgcolor: 'grey.50', 
//       minHeight: '100vh',
//       position: 'relative'
//     }}>
//       {/* Main Container */}
//       <Container maxWidth="xl" sx={{ py: 4 }}>
//         {/* Header */}
//         <Paper sx={{
//           bgcolor: 'white',
//           borderRadius: 3,
//           boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.08)}`,
//           mb: 4,
//           overflow: 'hidden',
//           border: `1px solid ${alpha(theme.palette.divider, 0.2)}`
//         }}>
//           <Box sx={{ p: 4, pb: 3 }}>
//             <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={3}>
//               <Box>
//                 <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ 
//                   background: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 100%)`,
//                   WebkitBackgroundClip: 'text',
//                   WebkitTextFillColor: 'transparent',
//                   backgroundClip: 'text',
//                   fontSize: { xs: '2rem', md: '2.5rem' }
//                 }}>
//                   {quiz.title || 'Quiz Analytics'}
//                 </Typography>
//                 <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
//                   <Chip 
//                     label={quiz.subject || 'No Subject'} 
//                     size="small"
//                     sx={{ 
//                       bgcolor: alpha(theme.palette.primary.main, 0.1),
//                       color: theme.palette.primary.main,
//                       fontWeight: 500
//                     }} 
//                   />
//                   <Chip 
//                     label={`${quiz.department || 'No Department'}`} 
//                     size="small"
//                     sx={{ 
//                       bgcolor: alpha(theme.palette.secondary.main, 0.1),
//                       color: theme.palette.secondary.main,
//                       fontWeight: 500
//                     }} 
//                   />
//                   <Chip 
//                     icon={<CalendarIcon sx={{ fontSize: 16 }} />}
//                     label={`${formatDate(quiz.startTime)}`}
//                     size="small"
//                     sx={{ 
//                       bgcolor: alpha(theme.palette.info.main, 0.1),
//                       color: theme.palette.info.main,
//                       fontWeight: 500
//                     }}
//                   />
//                   <Chip 
//                     label={`${quiz.totalMarks || 0} Marks`}
//                     size="small"
//                     sx={{ 
//                       bgcolor: alpha(theme.palette.success.main, 0.1),
//                       color: theme.palette.success.main,
//                       fontWeight: 500
//                     }}
//                   />
//                 </Stack>
//               </Box>
//               <Stack direction="row" spacing={1}>
//                 <Button
//                   variant="contained"
//                   startIcon={<DownloadIcon />}
//                   sx={{ 
//                     px: 3,
//                     py: 1,
//                     borderRadius: 2,
//                     bgcolor: theme.palette.primary.main,
//                     color: 'white',
//                     '&:hover': { 
//                       bgcolor: theme.palette.primary.dark,
//                       transform: 'translateY(-2px)',
//                       boxShadow: theme.shadows[4]
//                     },
//                     transition: 'all 0.3s ease'
//                   }}
//                 >
//                   Export Report
//                 </Button>
//               </Stack>
//             </Stack>
//           </Box>
//         </Paper>

//         {/* Navigation Tabs */}
//         <Paper sx={{ 
//           borderRadius: 3, 
//           mb: 4,
//           overflow: 'hidden',
//           border: `1px solid ${alpha(theme.palette.divider, 0.2)}`
//         }}>
//           <Tabs
//             value={selectedTab}
//             onChange={(e, newValue) => setSelectedTab(newValue)}
//             variant="fullWidth"
//             sx={{
//               '& .MuiTab-root': {
//                 py: 2.5,
//                 fontSize: '1rem',
//                 fontWeight: 600,
//                 textTransform: 'none',
//                 minHeight: '64px'
//               },
//               '& .Mui-selected': {
//                 color: theme.palette.primary.main + '!important'
//               },
//               '& .MuiTabs-indicator': {
//                 height: 3,
//                 borderRadius: '3px 3px 0 0',
//                 backgroundColor: theme.palette.primary.main
//               }
//             }}
//           >
//             <Tab icon={<BarChartIcon />} iconPosition="start" label="Overview" />
//             <Tab icon={<PsychologyIcon />} iconPosition="start" label="Analytics" />
//             <Tab icon={<PeopleIcon />} iconPosition="start" label="Students" />
//             <Tab icon={<TrophyIcon />} iconPosition="start" label="Performance" />
//           </Tabs>
//         </Paper>

//         {/* Tab Content */}
//         {selectedTab === 0 && (
//           /* Overview Tab */
//           <>
//             {/* Quick Stats Row */}
//             <Grid container spacing={3} sx={{ mb: 4 }}>
//               <Grid item xs={12} sm={6} md={3}>
//                 <StatCard
//                   title="Total Students"
//                   value={statistics.totalStudents || 0}
//                   icon={<PeopleIcon />}
//                   color="primary"
//                   progress={100}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <StatCard
//                   title="Attempted"
//                   value={statistics.attemptedCount || 0}
//                   subtext={`${statistics.attemptRate || 0}% attempt rate`}
//                   icon={<SuccessIcon />}
//                   color="success"
//                   progress={statistics.attemptRate || 0}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <StatCard
//                   title="Average Score"
//                   value={statistics.avgScoreOverall || 0}
//                   subtext={`High: ${statistics.highestScore || 0} | Low: ${statistics.lowestScore || 0}`}
//                   icon={<ScoreIcon />}
//                   color="warning"
//                   progress={quiz.totalMarks ? ((statistics.avgScoreOverall || 0) / quiz.totalMarks) * 100 : 0}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <StatCard
//                   title="Pass Percentage"
//                   value={`${statistics.passPercentage || 0}%`}
//                   subtext={`${statistics.passedStudents || 0} passed / ${statistics.failedStudents || 0} failed`}
//                   icon={<TrendingUpIcon />}
//                   color="info"
//                   progress={statistics.passPercentage || 0}
//                 />
//               </Grid>
//             </Grid>

//             {/* Performance Charts */}
//             <Grid container spacing={3} sx={{ mb: 4 }}>
//               <Grid item xs={12} lg={8}>
//                 <Card sx={{ 
//                   height: '100%',
//                   borderRadius: 3,
//                   boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.08)}`,
//                   border: `1px solid ${alpha(theme.palette.divider, 0.2)}`
//                 }}>
//                   <CardContent sx={{ p: 3 }}>
//                     <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
//                       <Typography variant="h6" fontWeight="bold">
//                         Performance Trends
//                       </Typography>
//                       <Chip 
//                         icon={<TimelineIcon />} 
//                         label="Top 5 Students" 
//                         size="small" 
//                         sx={{ 
//                           bgcolor: alpha(theme.palette.primary.main, 0.1),
//                           color: theme.palette.primary.main,
//                           fontWeight: 500
//                         }}
//                       />
//                     </Stack>
//                     <Box sx={{ height: 300 }}>
//                       <Bar 
//                         data={performanceComparisonChart}
//                         options={{
//                           responsive: true,
//                           maintainAspectRatio: false,
//                           plugins: {
//                             legend: { 
//                               position: 'top',
//                               labels: {
//                                 font: { size: 12, weight: '500' },
//                                 usePointStyle: true
//                               }
//                             }
//                           },
//                           scales: {
//                             y: {
//                               beginAtZero: true,
//                               grid: { 
//                                 color: alpha('#000', 0.05),
//                                 drawBorder: false
//                               }
//                             },
//                             x: {
//                               grid: { 
//                                 color: alpha('#000', 0.05),
//                                 drawBorder: false
//                               }
//                             }
//                           }
//                         }}
//                       />
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Grid>

//               <Grid item xs={12} lg={4}>
//                 <Card sx={{ 
//                   height: '100%',
//                   borderRadius: 3,
//                   boxShadow: `0 4px 20px ${alpha(theme.palette.secondary.main, 0.08)}`,
//                   border: `1px solid ${alpha(theme.palette.divider, 0.2)}`
//                 }}>
//                   <CardContent sx={{ p: 3 }}>
//                     <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
//                       <Typography variant="h6" fontWeight="bold">
//                         Performance Distribution
//                       </Typography>
//                       <Chip 
//                         icon={<PieChartIcon />} 
//                         label="Categories" 
//                         size="small"
//                         sx={{ 
//                           bgcolor: alpha(theme.palette.secondary.main, 0.1),
//                           color: theme.palette.secondary.main,
//                           fontWeight: 500
//                         }}
//                       />
//                     </Stack>
//                     <Box sx={{ height: 300, position: 'relative' }}>
//                       <Doughnut 
//                         data={performanceDistributionChart}
//                         options={{
//                           responsive: true,
//                           maintainAspectRatio: false,
//                           cutout: '60%',
//                           plugins: {
//                             legend: { 
//                               position: 'bottom',
//                               labels: {
//                                 padding: 15,
//                                 usePointStyle: true,
//                                 pointStyle: 'circle',
//                                 font: { size: 11, weight: '500' }
//                               }
//                             }
//                           }
//                         }}
//                       />
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             </Grid>
//           </>
//         )}

//         {selectedTab === 1 && (
//           /* Analytics Tab */
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <Typography variant="h5" fontWeight="bold" gutterBottom>
//                 Deep Analytics Dashboard
//               </Typography>
//             </Grid>
            
//             <Grid item xs={12} lg={6}>
//               <Card sx={{ 
//                 borderRadius: 3,
//                 boxShadow: `0 4px 20px ${alpha(theme.palette.success.main, 0.08)}`,
//                 border: `1px solid ${alpha(theme.palette.divider, 0.2)}`
//               }}>
//                 <CardContent sx={{ p: 3 }}>
//                   <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
//                     <Typography variant="h6" fontWeight="bold">
//                       Time Analysis
//                     </Typography>
//                     <Chip 
//                       icon={<ClockIcon />} 
//                       label="Hourly Pattern" 
//                       size="small"
//                       sx={{ 
//                         bgcolor: alpha(theme.palette.success.main, 0.1),
//                         color: theme.palette.success.main,
//                         fontWeight: 500
//                       }}
//                     />
//                   </Stack>
//                   <Box sx={{ height: 250 }}>
//                     <Bar 
//                       data={timeAnalysisChart}
//                       options={{
//                         responsive: true,
//                         maintainAspectRatio: false,
//                         plugins: {
//                           legend: { display: false }
//                         },
//                         scales: {
//                           y: {
//                             beginAtZero: true,
//                             grid: { 
//                               color: alpha('#000', 0.05),
//                               drawBorder: false
//                             }
//                           },
//                           x: {
//                             grid: { 
//                               color: alpha('#000', 0.05),
//                               drawBorder: false
//                             }
//                           }
//                         }
//                       }}
//                     />
//                   </Box>
//                   <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
//                     <Box>
//                       <Typography variant="body2" color="text.secondary">Avg Time/Attempt</Typography>
//                       <Typography variant="h6" fontWeight="bold">
//                         {formatTime(safeGet(timeAnalysis, 'avgTimePerAttempt', 0))}
//                       </Typography>
//                     </Box>
//                     <Box>
//                       <Typography variant="body2" color="text.secondary">Fastest Attempt</Typography>
//                       <Typography variant="h6" fontWeight="bold" color="success.main">
//                         {formatTime(safeGet(timeAnalysis, 'fastestAttempt', 0))}
//                       </Typography>
//                     </Box>
//                     <Box>
//                       <Typography variant="body2" color="text.secondary">Slowest Attempt</Typography>
//                       <Typography variant="h6" fontWeight="bold" color="warning.main">
//                         {formatTime(safeGet(timeAnalysis, 'slowestAttempt', 0))}
//                       </Typography>
//                     </Box>
//                   </Stack>
//                 </CardContent>
//               </Card>
//             </Grid>

//             <Grid item xs={12} lg={6}>
//               <Card sx={{ 
//                 borderRadius: 3,
//                 boxShadow: `0 4px 20px ${alpha(theme.palette.warning.main, 0.08)}`,
//                 border: `1px solid ${alpha(theme.palette.divider, 0.2)}`
//               }}>
//                 <CardContent sx={{ p: 3 }}>
//                   <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
//                     <Typography variant="h6" fontWeight="bold">
//                       Group Performance
//                     </Typography>
//                     <Chip 
//                       icon={<GroupsIcon />} 
//                       label="By Department" 
//                       size="small"
//                       sx={{ 
//                         bgcolor: alpha(theme.palette.warning.main, 0.1),
//                         color: theme.palette.warning.main,
//                         fontWeight: 500
//                       }}
//                     />
//                   </Stack>
//                   <List>
//                     {groupWiseStats.slice(0, 5).map((group, index) => (
//                       <ListItem key={index} sx={{ px: 0 }}>
//                         <ListItemIcon>
//                           <Avatar sx={{ 
//                             bgcolor: alpha(theme.palette.primary.main, 0.1),
//                             color: theme.palette.primary.main,
//                             width: 36,
//                             height: 36
//                           }}>
//                             {index + 1}
//                           </Avatar>
//                         </ListItemIcon>
//                         <ListItemText
//                           primary={
//                             <Typography variant="subtitle2" fontWeight="medium">
//                               {group?.course || 'N/A'} - Sem {group?.semester || 'N/A'} ({group?.group || 'N/A'})
//                             </Typography>
//                           }
//                           secondary={
//                             <Stack direction="row" spacing={2} alignItems="center">
//                               <Typography variant="caption" color="text.secondary">
//                                 {group?.count || 0} students
//                               </Typography>
//                               <Typography variant="caption" color="text.secondary">
//                                 {group?.attempted || 0} attempted
//                               </Typography>
//                               <Typography variant="caption" color="success.main" fontWeight="medium">
//                                 {group?.passRate || 0}% pass rate
//                               </Typography>
//                             </Stack>
//                           }
//                         />
//                         <Chip 
//                           label={`${(group?.bestAvgScore || 0).toFixed(1)}`}
//                           size="small"
//                           color="primary"
//                           sx={{ fontWeight: 600 }}
//                         />
//                       </ListItem>
//                     ))}
//                     {groupWiseStats.length === 0 && (
//                       <ListItem>
//                         <ListItemText
//                           primary="No group data available"
//                           secondary="Groups will appear when students are registered"
//                         />
//                       </ListItem>
//                     )}
//                   </List>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         )}

//         {selectedTab === 2 && (
//           /* Students Tab */
//           <Card sx={{ 
//             borderRadius: 3,
//             boxShadow: `0 4px 24px ${alpha(theme.palette.primary.main, 0.08)}`,
//             border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
//             overflow: 'hidden'
//           }}>
//             {/* Search and Filter Bar */}
//             <Box sx={{ 
//               p: 3, 
//               bgcolor: alpha(theme.palette.primary.main, 0.02),
//               borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`
//             }}>
//               <Grid container spacing={2} alignItems="center">
//                 <Grid item xs={12} md={4}>
//                   <form onSubmit={handleSearchSubmit}>
//                     <TextField
//                       fullWidth
//                       placeholder="Search students by name, enrollment, or email..."
//                       value={search}
//                       onChange={handleSearchChange}
//                       size="small"
//                       sx={{
//                         '& .MuiOutlinedInput-root': {
//                           borderRadius: 2,
//                           bgcolor: 'white'
//                         }
//                       }}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <SearchIcon color="action" />
//                           </InputAdornment>
//                         )
//                       }}
//                     />
//                   </form>
//                 </Grid>
//                 <Grid item xs={12} md={3}>
//                   <FormControl fullWidth size="small">
//                     <InputLabel>Filter</InputLabel>
//                     <Select
//                       value={filter}
//                       onChange={(e) => setFilter(e.target.value)}
//                       label="Filter"
//                       sx={{ borderRadius: 2 }}
//                     >
//                       <MenuItem value="all">All Students</MenuItem>
//                       <MenuItem value="attempted">Attempted Only</MenuItem>
//                       <MenuItem value="not_attempted">Not Attempted</MenuItem>
//                       <MenuItem value="passed">Passed Only</MenuItem>
//                       <MenuItem value="failed">Failed Only</MenuItem>
//                       <MenuItem value="excellent">Excellent (≥80%)</MenuItem>
//                       <MenuItem value="good">Good (60-79%)</MenuItem>
//                       <MenuItem value="average">Average (40-59%)</MenuItem>
//                       <MenuItem value="poor">Poor (40%)</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} md={2}>
//                   <FormControl fullWidth size="small">
//                     <InputLabel>Per Page</InputLabel>
//                     <Select
//                       value={rowsPerPage}
//                       onChange={handleRowsPerPageChange}
//                       label="Per Page"
//                       sx={{ borderRadius: 2 }}
//                     >
//                       <MenuItem value={5}>5</MenuItem>
//                       <MenuItem value={10}>10</MenuItem>
//                       <MenuItem value={25}>25</MenuItem>
//                       <MenuItem value={50}>50</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} md={3}>
//                   <Stack direction="row" spacing={1} justifyContent="flex-end">
//                     <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center' }}>
//                       {pagination.total || 0} students found
//                     </Typography>
//                   </Stack>
//                 </Grid>
//               </Grid>
//             </Box>

//             {/* Students Table */}
//             <TableContainer sx={{ maxHeight: 600 }}>
//               <Table stickyHeader>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell sx={{ 
//                       bgcolor: alpha(theme.palette.primary.main, 0.05),
//                       fontWeight: 600,
//                       py: 2.5,
//                       fontSize: '0.875rem'
//                     }}>
//                       <Stack direction="row" alignItems="center" spacing={0.5}>
//                         <PersonIcon fontSize="small" />
//                         <span>Student</span>
//                       </Stack>
//                     </TableCell>
//                     <TableCell sx={{ 
//                       bgcolor: alpha(theme.palette.primary.main, 0.05),
//                       fontWeight: 600,
//                       py: 2.5,
//                       fontSize: '0.875rem'
//                     }}>
//                       <Stack direction="row" alignItems="center" spacing={0.5}>
//                         <SchoolIcon fontSize="small" />
//                         <span>Academic Info</span>
//                       </Stack>
//                     </TableCell>
//                     <TableCell align="center" sx={{ 
//                       bgcolor: alpha(theme.palette.primary.main, 0.05),
//                       fontWeight: 600,
//                       py: 2.5,
//                       fontSize: '0.875rem'
//                     }}>
//                       <Stack direction="row" alignItems="center" spacing={0.5} justifyContent="center">
//                         <ScoreIcon fontSize="small" />
//                         <span>Performance</span>
//                       </Stack>
//                     </TableCell>
//                     <TableCell align="center" sx={{ 
//                       bgcolor: alpha(theme.palette.primary.main, 0.05),
//                       fontWeight: 600,
//                       py: 2.5,
//                       fontSize: '0.875rem'
//                     }}>
//                       <Stack direction="row" alignItems="center" spacing={0.5} justifyContent="center">
//                         <TimerIcon fontSize="small" />
//                         <span>Time</span>
//                       </Stack>
//                     </TableCell>
//                     <TableCell align="center" sx={{ 
//                       bgcolor: alpha(theme.palette.primary.main, 0.05),
//                       fontWeight: 600,
//                       py: 2.5,
//                       fontSize: '0.875rem'
//                     }}>
//                       <Stack direction="row" alignItems="center" spacing={0.5} justifyContent="center">
//                         <AssignmentIcon fontSize="small" />
//                         <span>Status</span>
//                       </Stack>
//                     </TableCell>
//                     <TableCell align="center" sx={{ 
//                       bgcolor: alpha(theme.palette.primary.main, 0.05),
//                       fontWeight: 600,
//                       py: 2.5,
//                       fontSize: '0.875rem'
//                     }}>
//                       <Stack direction="row" alignItems="center" spacing={0.5} justifyContent="center">
//                         <InsightsIcon fontSize="small" />
//                         <span>Actions</span>
//                       </Stack>
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {students.length > 0 ? (
//                     students.map((student) => (
//                       <TableRow 
//                         key={student._id}
//                         hover
//                         sx={{ 
//                           '&:last-child td': { border: 0 },
//                           bgcolor: student.hasAttempted 
//                             ? alpha(theme.palette.success.light, 0.03) 
//                             : alpha(theme.palette.grey[100], 0.5),
//                           transition: 'all 0.2s ease',
//                           '&:hover': {
//                             bgcolor: alpha(theme.palette.primary.main, 0.05)
//                           }
//                         }}
//                       >
//                         <TableCell sx={{ py: 2.5 }}>
//                           <Stack direction="row" alignItems="center" spacing={2}>
//                             <Avatar 
//   sx={{ 
//     bgcolor: alpha(theme.palette[getPerformanceColor(student.performancePercentage)]?.main || theme.palette.grey[400], 0.15),
//     color: theme.palette[getPerformanceColor(student.performancePercentage)]?.main || theme.palette.grey[600],
//     fontWeight: 600,
//     width: 44,
//     height: 44,
//     fontSize: '1rem'
//   }}
// >
//   {student.name?.charAt(0) || '?'}
// </Avatar>
//                             <Box>
//                               <Typography variant="subtitle2" fontWeight="medium">
//                                 {student.name || 'N/A'}
//                               </Typography>
//                               <Stack direction="row" spacing={1} alignItems="center">
//                                 <Typography variant="caption" color="text.secondary">
//                                   {student.enrollmentNumber || 'N/A'}
//                                 </Typography>
//                                 <Tooltip title={student.gender || 'Other'}>
//                                   <Box sx={{ 
//                                     color: 'text.secondary', 
//                                     display: 'flex',
//                                     '& svg': { fontSize: '1rem' }
//                                   }}>
//                                     {getGenderIcon(student.gender)}
//                                   </Box>
//                                 </Tooltip>
//                               </Stack>
//                             </Box>
//                           </Stack>
//                         </TableCell>
//                         <TableCell sx={{ py: 2.5 }}>
//                           <Box>
//                             <Typography variant="body2" fontWeight={500} color="primary.main">
//                               {student.course || 'N/A'} • Sem {student.semester || 'N/A'}
//                             </Typography>
//                             <Typography variant="caption" color="text.secondary">
//                               {student.department || 'N/A'} | Group: {student.group || 'N/A'}
//                             </Typography>
//                           </Box>
//                         </TableCell>
//                         <TableCell align="center" sx={{ py: 2.5 }}>
//                           {student.hasAttempted ? (
//                             <Stack spacing={1}>
//                               <Box>
//                                 <Chip
//                                   label={`${student.bestScore || 0}/${quiz.totalMarks || 0}`}
//                                   size="small"
//                                   color={getPerformanceColor(student.performancePercentage)}
//                                   sx={{ 
//                                     fontWeight: 600,
//                                     minWidth: 80
//                                   }}
//                                 />
//                               </Box>
//                               <Stack direction="row" spacing={1} justifyContent="center">
//                                 <Box sx={{ textAlign: 'center' }}>
//                                   <Typography variant="caption" color="text.secondary" display="block">
//                                     Avg
//                                   </Typography>
//                                   <Typography variant="caption" fontWeight="bold" display="block">
//                                     {student.avgScore || 0}
//                                   </Typography>
//                                 </Box>
//                                 <Divider orientation="vertical" flexItem />
//                                 <Box sx={{ textAlign: 'center' }}>
//                                   <Typography variant="caption" color="text.secondary" display="block">
//                                     Attempts
//                                   </Typography>
//                                   <Typography variant="caption" fontWeight="bold" display="block">
//                                     {student.attempts || 0}
//                                   </Typography>
//                                 </Box>
//                                 <Divider orientation="vertical" flexItem />
//                                 <Box sx={{ textAlign: 'center' }}>
//                                   <Typography variant="caption" color="text.secondary" display="block">
//                                     Improvement
//                                   </Typography>
//                                   <Typography variant="caption" fontWeight="bold" display="block" color={student.improvement > 0 ? 'success.main' : 'error.main'}>
//                                     {student.improvement > 0 ? `+${student.improvement}%` : `${student.improvement}%`}
//                                   </Typography>
//                                 </Box>
//                               </Stack>
//                             </Stack>
//                           ) : (
//                             <Chip 
//                               label="No Attempt" 
//                               size="small" 
//                               variant="outlined" 
//                               sx={{ 
//                                 color: 'text.secondary',
//                                 borderColor: alpha(theme.palette.grey[400], 0.5)
//                               }}
//                             />
//                           )}
//                         </TableCell>
//                         <TableCell align="center" sx={{ py: 2.5 }}>
//                           {student.hasAttempted ? (
//                             <Stack spacing={1}>
//                               <Chip
//                                 icon={<TimeIcon />}
//                                 label={formatTime(student.totalTimeTaken)}
//                                 size="small"
//                                 variant="outlined"
//                                 sx={{ 
//                                   borderColor: alpha(theme.palette.info.main, 0.3),
//                                   color: theme.palette.info.main
//                                 }}
//                               />
//                               <Typography variant="caption" color="text.secondary">
//                                 {student.avgTimePerQuestion ? `${student.avgTimePerQuestion}s/q` : 'N/A'}
//                               </Typography>
//                             </Stack>
//                           ) : (
//                             <Typography variant="caption" color="text.secondary" fontStyle="italic">
//                               N/A
//                             </Typography>
//                           )}
//                         </TableCell>
//                         <TableCell align="center" sx={{ py: 2.5 }}>
//                           <Stack spacing={1}>
//                            <Chip
//   label={getPerformanceLabel(student.performancePercentage)}
//   size="small"
//   color={getPerformanceColor(student.performancePercentage) === 'default' ? 'default' : getPerformanceColor(student.performancePercentage)}
//   icon={student.hasAttempted ? <SuccessIcon /> : <CancelIcon />}
//   sx={{ 
//     fontWeight: 600,
//     '&.MuiChip-filledSuccess': {
//       bgcolor: alpha(theme.palette.success.main, 0.1),
//       color: theme.palette.success.dark
//     },
//     '&.MuiChip-filledPrimary': {
//       bgcolor: alpha(theme.palette.primary.main, 0.1),
//       color: theme.palette.primary.dark
//     },
//     '&.MuiChip-filledWarning': {
//       bgcolor: alpha(theme.palette.warning.main, 0.1),
//       color: theme.palette.warning.dark
//     },
//     '&.MuiChip-filledError': {
//       bgcolor: alpha(theme.palette.error.main, 0.1),
//       color: theme.palette.error.dark
//     },
//     '&.MuiChip-filledInfo': {  // Add this for the 'info' color
//       bgcolor: alpha(theme.palette.info.main, 0.1),
//       color: theme.palette.info.dark
//     }
//   }}
// />
//                             {student.firstAttempt && (
//                               <Typography variant="caption" color="text.secondary">
//                                 {formatDate(student.firstAttempt)}
//                               </Typography>
//                             )}
//                           </Stack>
//                         </TableCell>
//                         <TableCell align="center" sx={{ py: 2.5 }}>
//                           <Stack direction="row" spacing={0.5} justifyContent="center">
//                             <Tooltip title="View Full Profile">
//                               <IconButton
//                                 size="small"
//                                 onClick={() => handleViewStudent(student)}
//                                 sx={{ 
//                                   color: theme.palette.primary.main,
//                                   bgcolor: alpha(theme.palette.primary.main, 0.1),
//                                   '&:hover': {
//                                     bgcolor: alpha(theme.palette.primary.main, 0.2)
//                                   }
//                                 }}
//                               >
//                                 <VisibilityIcon fontSize="small" />
//                               </IconButton>
//                             </Tooltip>
//                             <Tooltip title="Contact Student">
//                               <IconButton 
//                                 size="small"
//                                 sx={{ 
//                                   color: theme.palette.info.main,
//                                   bgcolor: alpha(theme.palette.info.main, 0.1),
//                                   '&:hover': {
//                                     bgcolor: alpha(theme.palette.info.main, 0.2)
//                                   }
//                                 }}
//                               >
//                                 <ContactIcon fontSize="small" />
//                               </IconButton>
//                             </Tooltip>
//                             <Tooltip title="Performance Details">
//                               <IconButton 
//                                 size="small"
//                                 sx={{ 
//                                   color: theme.palette.success.main,
//                                   bgcolor: alpha(theme.palette.success.main, 0.1),
//                                   '&:hover': {
//                                     bgcolor: alpha(theme.palette.success.main, 0.2)
//                                   }
//                                 }}
//                               >
//                                 <InsightsIcon fontSize="small" />
//                               </IconButton>
//                             </Tooltip>
//                           </Stack>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
//                         <Box sx={{ textAlign: 'center', py: 2 }}>
//                           <PersonIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2, opacity: 0.3 }} />
//                           <Typography variant="h6" color="text.secondary" gutterBottom>
//                             No students found
//                           </Typography>
//                           <Typography variant="body2" color="text.secondary">
//                             Try adjusting your search or filter criteria
//                           </Typography>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>

//             {/* Pagination */}
//             {pagination.totalPages > 1 && (
//               <Box sx={{ 
//                 p: 2, 
//                 borderTop: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
//                 bgcolor: alpha(theme.palette.primary.main, 0.02)
//               }}>
//                 <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems="center">
//                   <Typography variant="body2" color="text.secondary">
//                     Showing {((page - 1) * rowsPerPage) + 1} to {Math.min(page * rowsPerPage, pagination.total || 0)} of {pagination.total || 0} students
//                   </Typography>
//                   <Pagination
//                     count={pagination.totalPages || 1}
//                     page={page}
//                     onChange={handlePageChange}
//                     color="primary"
//                     size="large"
//                     showFirstButton
//                     showLastButton
//                     sx={{
//                       '& .MuiPaginationItem-root': {
//                         borderRadius: 1.5,
//                         fontWeight: 500
//                       },
//                       '& .Mui-selected': {
//                         boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.3)}`
//                       }
//                     }}
//                   />
//                   <Typography variant="body2" color="text.secondary">
//                     Page {page} of {pagination.totalPages || 1}
//                   </Typography>
//                 </Stack>
//               </Box>
//             )}
//           </Card>
//         )}

//         {selectedTab === 3 && (
//           /* Performance Tab */
//           <Card sx={{ 
//             borderRadius: 3,
//             boxShadow: `0 4px 24px ${alpha(theme.palette.warning.main, 0.08)}`,
//             border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
//             overflow: 'hidden'
//           }}>
//             <CardContent sx={{ p: 3 }}>
//               <Typography variant="h5" fontWeight="bold" gutterBottom>
//                 Performance Insights
//               </Typography>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={6}>
//                   <Box sx={{ p: 3, bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: 2 }}>
//                     <Typography variant="h6" fontWeight="bold" gutterBottom>
//                       Top Performers
//                     </Typography>
//                     <List>
//                       {students
//                         .filter(s => s.hasAttempted)
//                         .sort((a, b) => (b.bestScore || 0) - (a.bestScore || 0))
//                         .slice(0, 5)
//                         .map((student, index) => (
//                           <ListItem key={student._id} sx={{ px: 0 }}>
//                             <ListItemIcon>
//                               <Avatar sx={{ 
//                                 bgcolor: index === 0 ? alpha(theme.palette.warning.main, 0.1) : 
//                                          index === 1 ? alpha(theme.palette.info.main, 0.1) : 
//                                          index === 2 ? alpha(theme.palette.success.main, 0.1) : 
//                                          alpha(theme.palette.primary.main, 0.1),
//                                 color: index === 0 ? theme.palette.warning.main : 
//                                        index === 1 ? theme.palette.info.main : 
//                                        index === 2 ? theme.palette.success.main : 
//                                        theme.palette.primary.main
//                               }}>
//                                 {index + 1}
//                               </Avatar>
//                             </ListItemIcon>
//                             <ListItemText
//                               primary={
//                                 <Typography variant="subtitle2" fontWeight="medium">
//                                   {student.name || 'N/A'}
//                                 </Typography>
//                               }
//                               secondary={
//                                 <Typography variant="caption" color="text.secondary">
//                                   {student.enrollmentNumber || 'N/A'} • {student.course || 'N/A'}
//                                 </Typography>
//                               }
//                             />
//                             <Chip 
//                               label={`${student.bestScore || 0}/${quiz.totalMarks || 0}`}
//                               color={index === 0 ? 'warning' : index === 1 ? 'info' : index === 2 ? 'success' : 'primary'}
//                               sx={{ fontWeight: 600 }}
//                             />
//                           </ListItem>
//                         ))}
//                       {students.filter(s => s.hasAttempted).length === 0 && (
//                         <ListItem>
//                           <ListItemText
//                             primary="No performance data available"
//                             secondary="Students need to attempt the quiz first"
//                           />
//                         </ListItem>
//                       )}
//                     </List>
//                   </Box>
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <Box sx={{ p: 3, bgcolor: alpha(theme.palette.info.main, 0.05), borderRadius: 2 }}>
//                     <Typography variant="h6" fontWeight="bold" gutterBottom>
//                       Improvement Leaders
//                     </Typography>
//                     <List>
//                       {students
//                         .filter(s => s.hasAttempted && s.attempts > 1)
//                         .sort((a, b) => (b.improvement || 0) - (a.improvement || 0))
//                         .slice(0, 5)
//                         .map((student, index) => (
//                           <ListItem key={student._id} sx={{ px: 0 }}>
//                             <ListItemIcon>
//                               <Avatar sx={{ 
//                                 bgcolor: alpha(theme.palette.success.main, 0.1),
//                                 color: theme.palette.success.main
//                               }}>
//                                 <TrendingUpIcon />
//                               </Avatar>
//                             </ListItemIcon>
//                             <ListItemText
//                               primary={
//                                 <Typography variant="subtitle2" fontWeight="medium">
//                                   {student.name || 'N/A'}
//                                 </Typography>
//                               }
//                               secondary={
//                                 <Typography variant="caption" color="text.secondary">
//                                   {student.improvement > 0 ? `Improved by ${student.improvement}%` : `Declined by ${Math.abs(student.improvement)}%`}
//                                 </Typography>
//                               }
//                             />
//                             <Typography variant="body2" fontWeight="bold" color={student.improvement > 0 ? 'success.main' : 'error.main'}>
//                               {student.improvement > 0 ? `+${student.improvement}%` : `${student.improvement}%`}
//                             </Typography>
//                           </ListItem>
//                         ))}
//                       {students.filter(s => s.hasAttempted && s.attempts > 1).length === 0 && (
//                         <ListItem>
//                           <ListItemText
//                             primary="No improvement data available"
//                             secondary="Students need multiple attempts to track improvement"
//                           />
//                         </ListItem>
//                       )}
//                     </List>
//                   </Box>
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         )}
//       </Container>

//       {/* Student Detail Modal */}
//       <Dialog
//         open={viewModalOpen}
//         onClose={() => setViewModalOpen(false)}
//         maxWidth="md"
//         fullWidth
//         PaperProps={{
//           sx: {
//             borderRadius: 3,
//             boxShadow: `0 24px 48px ${alpha(theme.palette.primary.main, 0.15)}`,
//             overflow: 'hidden'
//           }
//         }}
//       >
//         {selectedStudent && (
//           <>
//             <DialogTitle sx={{ 
//               p: 0,
//               bgcolor: 'primary.main',
//               color: 'white'
//             }}>
//               <Box sx={{ p: 3, pb: 2 }}>
//                 <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
//                   <Box>
//                     <Typography variant="h4" fontWeight="bold" gutterBottom>
//                       {selectedStudent.name || 'N/A'}
//                     </Typography>
//                     <Stack direction="row" spacing={1} alignItems="center">
//                       <Chip
//                         label={selectedStudent.enrollmentNumber || 'N/A'}
//                         size="small"
//                         sx={{ 
//                           bgcolor: 'rgba(255,255,255,0.2)',
//                           color: 'white',
//                           fontWeight: 500
//                         }}
//                       />
//                       <Chip
//                         icon={getGenderIcon(selectedStudent.gender)}
//                         label={selectedStudent.gender || 'Other'}
//                         size="small"
//                         sx={{ 
//                           bgcolor: 'rgba(255,255,255,0.15)',
//                           color: 'white',
//                           '& .MuiChip-icon': { color: 'white' }
//                         }}
//                       />
//                     </Stack>
//                   </Box>
//                   <IconButton onClick={() => setViewModalOpen(false)} sx={{ color: 'white' }}>
//                     <CancelIcon />
//                   </IconButton>
//                 </Stack>
//               </Box>
//             </DialogTitle>

//             <DialogContent sx={{ p: 0 }}>
//               <Grid container>
//                 {/* Left Column - Personal Info */}
//                 <Grid item xs={12} md={4} sx={{ 
//                   bgcolor: alpha(theme.palette.primary.main, 0.03),
//                   borderRight: `1px solid ${alpha(theme.palette.divider, 0.2)}`
//                 }}>
//                   <Box sx={{ p: 3 }}>
//                     <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
//                       Personal Information
//                     </Typography>
                    
//                     <Stack spacing={3}>
//                       <Box>
//                         <Typography variant="caption" color="text.secondary" display="block">
//                           Email Address
//                         </Typography>
//                         <Box display="flex" alignItems="center" sx={{ mt: 0.5 }}>
//                           <EmailIcon sx={{ mr: 1.5, color: 'text.secondary', fontSize: '1.2rem' }} />
//                           <Typography variant="body1" fontWeight={500}>
//                             {selectedStudent.email || 'N/A'}
//                           </Typography>
//                         </Box>
//                       </Box>

//                       <Box>
//                         <Typography variant="caption" color="text.secondary" display="block">
//                           Mobile Number
//                         </Typography>
//                         <Box display="flex" alignItems="center" sx={{ mt: 0.5 }}>
//                           <PhoneIcon sx={{ mr: 1.5, color: 'text.secondary', fontSize: '1.2rem' }} />
//                           <Typography variant="body1" fontWeight={500}>
//                             {selectedStudent.mobileNumber || 'N/A'}
//                           </Typography>
//                         </Box>
//                       </Box>

//                       <Box>
//                         <Typography variant="caption" color="text.secondary" display="block">
//                           Registration Date
//                         </Typography>
//                         <Box display="flex" alignItems="center" sx={{ mt: 0.5 }}>
//                           <CalendarIcon sx={{ mr: 1.5, color: 'text.secondary', fontSize: '1.2rem' }} />
//                           <Typography variant="body1" fontWeight={500}>
//                             {formatDate(selectedStudent.registrationDate)}
//                           </Typography>
//                         </Box>
//                       </Box>

//                       <Box>
//                         <Typography variant="caption" color="text.secondary" display="block">
//                           Academic Details
//                         </Typography>
//                         <Stack spacing={1} sx={{ mt: 1 }}>
//                           <Box display="flex" alignItems="center">
//                             <SchoolIcon sx={{ mr: 1.5, color: 'text.secondary', fontSize: '1.2rem' }} />
//                             <Typography variant="body2" fontWeight={500}>
//                               {selectedStudent.course || 'N/A'} - Semester {selectedStudent.semester || 'N/A'}
//                             </Typography>
//                           </Box>
//                           <Box display="flex" alignItems="center">
//                             <LibraryBooksIcon sx={{ mr: 1.5, color: 'text.secondary', fontSize: '1.2rem' }} />
//                             <Typography variant="body2" fontWeight={500}>
//                               {selectedStudent.department || 'N/A'}
//                             </Typography>
//                           </Box>
//                           <Box display="flex" alignItems="center">
//                             <GroupsIcon sx={{ mr: 1.5, color: 'text.secondary', fontSize: '1.2rem' }} />
//                             <Typography variant="body2" fontWeight={500}>
//                               Group: {selectedStudent.group || 'N/A'}
//                             </Typography>
//                           </Box>
//                         </Stack>
//                       </Box>
//                     </Stack>
//                   </Box>
//                 </Grid>

//                 {/* Right Column - Performance */}
//                 <Grid item xs={12} md={8}>
//                   <Box sx={{ p: 3 }}>
//                     <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
//                       Quiz Performance Analytics
//                     </Typography>

//                     {selectedStudent.hasAttempted ? (
//                       <>
//                         {/* Performance Summary */}
//                         <Grid container spacing={3} sx={{ mb: 4 }}>
//                           <Grid item xs={6} sm={3}>
//                             <Box sx={{ 
//                               p: 2, 
//                               bgcolor: alpha(theme.palette.primary.main, 0.05),
//                               borderRadius: 2,
//                               textAlign: 'center'
//                             }}>
//                               <Typography variant="h3" fontWeight="bold" color="primary.main">
//                                 {selectedStudent.bestScore || 0}
//                               </Typography>
//                               <Typography variant="caption" color="text.secondary">
//                                 Best Score
//                               </Typography>
//                             </Box>
//                           </Grid>
//                           <Grid item xs={6} sm={3}>
//                             <Box sx={{ 
//                               p: 2, 
//                               bgcolor: alpha(theme.palette.success.main, 0.05),
//                               borderRadius: 2,
//                               textAlign: 'center'
//                             }}>
//                               <Typography variant="h3" fontWeight="bold" color="success.main">
//                                 {selectedStudent.performancePercentage || 0}%
//                               </Typography>
//                               <Typography variant="caption" color="text.secondary">
//                                 Performance
//                               </Typography>
//                             </Box>
//                           </Grid>
//                           <Grid item xs={6} sm={3}>
//                             <Box sx={{ 
//                               p: 2, 
//                               bgcolor: alpha(theme.palette.warning.main, 0.05),
//                               borderRadius: 2,
//                               textAlign: 'center'
//                             }}>
//                               <Typography variant="h3" fontWeight="bold" color="warning.main">
//                                 {selectedStudent.avgScore || 0}
//                               </Typography>
//                               <Typography variant="caption" color="text.secondary">
//                                 Average Score
//                               </Typography>
//                             </Box>
//                           </Grid>
//                           <Grid item xs={6} sm={3}>
//                             <Box sx={{ 
//                               p: 2, 
//                               bgcolor: alpha(theme.palette.info.main, 0.05),
//                               borderRadius: 2,
//                               textAlign: 'center'
//                             }}>
//                               <Typography variant="h3" fontWeight="bold" color="info.main">
//                                 {selectedStudent.attempts || 0}
//                               </Typography>
//                               <Typography variant="caption" color="text.secondary">
//                                 Total Attempts
//                               </Typography>
//                             </Box>
//                           </Grid>
//                         </Grid>

//                         {/* Time Analysis */}
//                         <Box sx={{ mb: 4 }}>
//                           <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
//                             Time Analysis
//                           </Typography>
//                           <Grid container spacing={2}>
//                             <Grid item xs={6}>
//                               <Box sx={{ 
//                                 p: 2, 
//                                 bgcolor: alpha(theme.palette.grey[100], 0.8),
//                                 borderRadius: 2
//                               }}>
//                                 <Typography variant="body2" color="text.secondary">
//                                   Total Time Taken
//                                 </Typography>
//                                 <Typography variant="h6" fontWeight="bold">
//                                   {formatTime(selectedStudent.totalTimeTaken)}
//                                 </Typography>
//                               </Box>
//                             </Grid>
//                             <Grid item xs={6}>
//                               <Box sx={{ 
//                                 p: 2, 
//                                 bgcolor: alpha(theme.palette.grey[100], 0.8),
//                                 borderRadius: 2
//                               }}>
//                                 <Typography variant="body2" color="text.secondary">
//                                   Avg Time per Question
//                                 </Typography>
//                                 <Typography variant="h6" fontWeight="bold">
//                                   {selectedStudent.avgTimePerQuestion ? `${selectedStudent.avgTimePerQuestion}s` : 'N/A'}
//                                 </Typography>
//                               </Box>
//                             </Grid>
//                           </Grid>
//                         </Box>

//                         {/* Attempt History */}
//                         <Box>
//                           <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
//                             Attempt History
//                           </Typography>
//                           <Stack spacing={2}>
//                             <Box>
//                               <Typography variant="caption" color="text.secondary">
//                                 First Attempt
//                               </Typography>
//                               <Typography variant="body2" fontWeight={500}>
//                                 {formatDate(selectedStudent.firstAttempt)}
//                               </Typography>
//                             </Box>
//                             <Box>
//                               <Typography variant="caption" color="text.secondary">
//                                 Last Attempt
//                               </Typography>
//                               <Typography variant="body2" fontWeight={500}>
//                                 {formatDate(selectedStudent.lastAttempt)}
//                               </Typography>
//                             </Box>
//                             <Box>
//                               <Typography variant="caption" color="text.secondary">
//                                 Improvement
//                               </Typography>
//                               <Typography variant="body2" fontWeight={500} color={selectedStudent.improvement > 0 ? 'success.main' : 'error.main'}>
//                                 {selectedStudent.improvement > 0 ? `Improved by ${selectedStudent.improvement}%` : `Declined by ${Math.abs(selectedStudent.improvement)}%`}
//                               </Typography>
//                             </Box>
//                           </Stack>
//                         </Box>

//                         {/* Performance Rating */}
//                         <Box sx={{ mt: 4 }}>
//                           <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
//                             Performance Rating
//                           </Typography>
//                           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                             <Rating
//                               value={(selectedStudent.performancePercentage || 0) / 20}
//                               readOnly
//                               precision={0.5}
//                               size="large"
//                               icon={<StarIcon sx={{ color: theme.palette.warning.main }} />}
//                               emptyIcon={<StarBorderIcon sx={{ color: theme.palette.grey[400] }} />}
//                             />
//                             <Chip
//                               label={getPerformanceLabel(selectedStudent.performancePercentage)}
//                               color={getPerformanceColor(selectedStudent.performancePercentage)}
//                               sx={{ fontWeight: 600 }}
//                             />
//                           </Box>
//                         </Box>
//                       </>
//                     ) : (
//                       <Box sx={{ 
//                         p: 4, 
//                         textAlign: 'center',
//                         bgcolor: alpha(theme.palette.grey[100], 0.8),
//                         borderRadius: 2
//                       }}>
//                         <CancelIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
//                         <Typography variant="h6" color="text.secondary" gutterBottom>
//                           No Attempts Recorded
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           This student has not attempted the quiz yet.
//                         </Typography>
//                       </Box>
//                     )}
//                   </Box>
//                 </Grid>
//               </Grid>
//             </DialogContent>

//             <DialogActions sx={{ 
//               p: 3, 
//               borderTop: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
//               bgcolor: alpha(theme.palette.primary.main, 0.02)
//             }}>
//               <Button
//                 onClick={() => setViewModalOpen(false)}
//                 sx={{ 
//                   borderRadius: 2,
//                   px: 3
//                 }}
//               >
//                 Close
//               </Button>
//               <Button
//                 variant="contained"
//                 startIcon={<InsightsIcon />}
//                 onClick={() => {
//                   // Navigate to detailed performance page
//                   navigate(`/faculty/student/${selectedStudent._id}/performance?quiz=${quizId}`);
//                 }}
//                 sx={{ 
//                   borderRadius: 2,
//                   px: 3,
//                   bgcolor: theme.palette.primary.main,
//                   '&:hover': { 
//                     bgcolor: theme.palette.primary.dark,
//                     transform: 'translateY(-2px)',
//                     boxShadow: theme.shadows[4]
//                   },
//                   transition: 'all 0.3s ease'
//                 }}
//               >
//                 View Detailed Analytics
//               </Button>
//             </DialogActions>
//           </>
//         )}
//       </Dialog>
//     </Box>
//   );
// };
// export default QuizRegisteredStudents;




import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  LinearProgress,
  Avatar,
  Button,
  Stack,
  alpha,
  useTheme,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tab,
  Tabs,
  Divider,
  Rating,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  Snackbar,
  Backdrop,
  Breadcrumbs,
  Link as MuiLink
} from "@mui/material";
import {
  People as PeopleIcon,
  School as SchoolIcon,
  BarChart as BarChartIcon,
  Timeline as TimelineIcon,
  PieChart as PieChartIcon,
  Groups as GroupsIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Person as PersonIcon,
  Score as ScoreIcon,
  AccessTime as TimeIcon,
  CheckCircle as SuccessIcon,
  Cancel as CancelIcon,
  TrendingUp as TrendingUpIcon,
  Download as DownloadIcon,
  Male as MaleIcon,
  Female as FemaleIcon,
  Transgender as OtherIcon,
  CalendarToday as CalendarIcon,
  Insights as InsightsIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  ContactPhone as ContactIcon,
  Assignment as AssignmentIcon,
  LibraryBooks as LibraryBooksIcon,
  Today as TodayIcon,
  AccessTimeFilled as ClockIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Psychology as PsychologyIcon,
  EmojiEvents as TrophyIcon,
  Home as HomeIcon,
  Quiz as QuizIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon
} from "@mui/icons-material";
import TimerIcon from "@mui/icons-material/Timer";
import VisibilityIcon from "@mui/icons-material/Visibility";

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
import { Line, Bar, Pie, Doughnut, Radar } from 'react-chartjs-2';

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

// Enhanced safe access helper function with error logging
const safeGet = (obj, path, defaultValue = null) => {
  if (!obj) return defaultValue;
  
  try {
    const keys = Array.isArray(path) ? path : path.split('.');
    let result = obj;
    
    for (const key of keys) {
      if (result === null || result === undefined) {
        return defaultValue;
      }
      result = result[key];
    }
    
    return result === undefined ? defaultValue : result;
  } catch (error) {
    console.warn(`safeGet error accessing path "${path}":`, error);
    return defaultValue;
  }
};

// Safe number formatter function
const formatNumber = (value, decimals = 1, defaultValue = '0.0') => {
  if (value === null || value === undefined || isNaN(value)) {
    return defaultValue;
  }
  const num = Number(value);
  return num.toFixed(decimals);
};

// Validation helper functions
const isValidArray = (arr) => Array.isArray(arr) && arr.length > 0;
const isValidObject = (obj) => obj && typeof obj === 'object' && Object.keys(obj).length > 0;
const isValidNumber = (num) => typeof num === 'number' && !isNaN(num);
const isValidString = (str) => typeof str === 'string' && str.trim().length > 0;

// Custom styled components
const StatCard = ({ title, value, icon, color, subtext, progress, loading = false }) => {
  const theme = useTheme();
  
  if (loading) {
    return (
      <Card sx={{
        height: '100%',
        borderRadius: 3,
        background: theme.palette.grey[50],
      }}>
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{
              bgcolor: theme.palette.grey[300],
              width: 56,
              height: 56,
              borderRadius: 2
            }}>
              <CircularProgress size={24} color="inherit" />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h3" fontWeight="bold" color="text.secondary">
                --
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                {title}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card sx={{
      height: '100%',
      borderRadius: 3,
      background: `linear-gradient(135deg, ${alpha(theme.palette[color]?.main || theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette[color]?.main || theme.palette.primary.main, 0.05)} 100%)`,
      border: `1px solid ${alpha(theme.palette[color]?.main || theme.palette.primary.main, 0.2)}`,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: `0 12px 24px ${alpha(theme.palette[color]?.main || theme.palette.primary.main, 0.15)}`,
        borderColor: alpha(theme.palette[color]?.main || theme.palette.primary.main, 0.3)
      }
    }}>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{
            bgcolor: alpha(theme.palette[color]?.main || theme.palette.primary.main, 0.15),
            color: theme.palette[color]?.main || theme.palette.primary.main,
            width: 56,
            height: 56,
            borderRadius: 2
          }}>
            {icon}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3" fontWeight="bold" color={`${color}.main`}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {title}
            </Typography>
            {subtext && (
              <Typography variant="caption" color="text.secondary">
                {subtext}
              </Typography>
            )}
          </Box>
        </Stack>
        {progress !== undefined && (
          <Box sx={{ mt: 2 }}>
            <LinearProgress
              variant="determinate"
              value={progress || 0}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: alpha(theme.palette[color]?.main || theme.palette.primary.main, 0.1),
                '& .MuiLinearProgress-bar': {
                  borderRadius: 3,
                  background: `linear-gradient(90deg, ${theme.palette[color]?.light || theme.palette.primary.light} 0%, ${theme.palette[color]?.main || theme.palette.primary.main} 100%)`
                }
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

const QuizRegisteredStudents = () => {
  const theme = useTheme();
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [retryCount, setRetryCount] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  // Data validation and normalization - FIXED VERSION
  const validateAndNormalizeData = useCallback((rawData) => {
    if (!rawData) return null;
    
    const normalized = { ...rawData };
    
    // Validate quiz data
    if (normalized.quiz) {
      normalized.quiz = {
        _id: safeGet(normalized.quiz, '_id', ''),
        title: safeGet(normalized.quiz, 'title', 'Untitled Quiz'),
        subject: safeGet(normalized.quiz, 'subject', 'No Subject'),
        department: safeGet(normalized.quiz, 'department', 'No Department'),
        startTime: safeGet(normalized.quiz, 'startTime'),
        endTime: safeGet(normalized.quiz, 'endTime'),
        totalMarks: Math.max(0, Number(safeGet(normalized.quiz, 'totalMarks', 0))),
        passingMarks: Math.max(0, Number(safeGet(normalized.quiz, 'passingMarks', 0)))
      };
    }
    
    // Validate statistics
    if (normalized.statistics) {
      const stats = normalized.statistics;
      normalized.statistics = {
        totalStudents: Math.max(0, Number(safeGet(stats, 'totalStudents', 0))),
        attemptedCount: Math.max(0, Number(safeGet(stats, 'attemptedCount', 0))),
        notAttemptedCount: Math.max(0, Number(safeGet(stats, 'notAttemptedCount', 0))),
        passedStudents: Math.max(0, Number(safeGet(stats, 'passedStudents', 0))),
        failedStudents: Math.max(0, Number(safeGet(stats, 'failedStudents', 0))),
        highestScore: Math.max(0, Number(safeGet(stats, 'highestScore', 0))),
        lowestScore: Math.max(0, Number(safeGet(stats, 'lowestScore', 0))),
        avgScoreOverall: Number(safeGet(stats, 'avgScoreOverall', 0)),
        passPercentage: Number(safeGet(stats, 'passPercentage', 0)),
        attemptRate: Number(safeGet(stats, 'attemptRate', 0)),
        performanceStats: {
          excellent: Math.max(0, Number(safeGet(stats, 'performanceStats.excellent', 0))),
          good: Math.max(0, Number(safeGet(stats, 'performanceStats.good', 0))),
          average: Math.max(0, Number(safeGet(stats, 'performanceStats.average', 0))),
          poor: Math.max(0, Number(safeGet(stats, 'performanceStats.poor', 0))),
          notAttempted: Math.max(0, Number(safeGet(stats, 'performanceStats.notAttempted', 0)))
        }
      };
    }
    
    // Validate students array - FIXED: Use backend calculated performancePercentage
    if (Array.isArray(normalized.students)) {
      normalized.students = normalized.students.map(student => {
        const hasAttempted = Boolean(safeGet(student, 'hasAttempted', false));
        
        // Use backend calculated values instead of recalculating
        const performancePercentage = Number(safeGet(student, 'performancePercentage', 0));
        const hasPassed = Boolean(safeGet(student, 'hasPassed', false));
        const bestScore = Math.max(0, Number(safeGet(student, 'bestScore', 0)));
        const avgScore = Number(safeGet(student, 'avgScore', 0));
        
        return {
          _id: safeGet(student, '_id', `student-${Math.random()}`),
          name: safeGet(student, 'name', 'Unknown Student'),
          enrollmentNumber: safeGet(student, 'enrollmentNumber', 'N/A'),
          email: safeGet(student, 'email', 'N/A'),
          mobileNumber: safeGet(student, 'mobileNumber', 'N/A'),
          gender: safeGet(student, 'gender', 'Other'),
          course: safeGet(student, 'course', 'N/A'),
          semester: safeGet(student, 'semester', 'N/A'),
          department: safeGet(student, 'department', 'N/A'),
          group: safeGet(student, 'group', 'N/A'),
          registrationDate: safeGet(student, 'registrationDate'),
          hasAttempted,
          attempts: Math.max(0, Number(safeGet(student, 'attempts', 0))),
          bestScore,
          avgScore,
          totalTimeTaken: Math.max(0, Number(safeGet(student, 'totalTimeTaken', 0))),
          avgTimePerQuestion: Number(safeGet(student, 'avgTimePerQuestion', 0)),
          firstAttempt: safeGet(student, 'firstAttempt'),
          lastAttempt: safeGet(student, 'lastAttempt'),
          improvement: Number(safeGet(student, 'improvement', 0)),
          // Use backend calculated performancePercentage
          performancePercentage,
          // Use backend calculated hasPassed
          hasPassed,
          status: hasAttempted ? (hasPassed ? 'passed' : 'failed') : 'not_attempted'
        };
      });
    } else {
      normalized.students = [];
    }
    
    // Validate groupWiseStats
    if (Array.isArray(normalized.groupWiseStats)) {
      normalized.groupWiseStats = normalized.groupWiseStats.map(group => ({
        course: safeGet(group, 'course', 'N/A'),
        semester: safeGet(group, 'semester', 'N/A'),
        group: safeGet(group, 'group', 'N/A'),
        department: safeGet(group, 'department', 'N/A'),
        count: Math.max(0, Number(safeGet(group, 'count', 0))),
        attempted: Math.max(0, Number(safeGet(group, 'attempted', 0))),
        passed: Math.max(0, Number(safeGet(group, 'passed', 0))),
        avgScore: Number(safeGet(group, 'avgScore', 0)),
        passRate: Number(safeGet(group, 'passRate', 0))
      }));
    } else {
      normalized.groupWiseStats = [];
    }
    
    // Validate pagination
    if (normalized.pagination) {
      normalized.pagination = {
        total: Math.max(0, Number(safeGet(normalized.pagination, 'total', 0))),
        page: Math.max(1, Number(safeGet(normalized.pagination, 'page', 1))),
        totalPages: Math.max(1, Number(safeGet(normalized.pagination, 'totalPages', 1))),
        limit: Math.max(1, Number(safeGet(normalized.pagination, 'limit', rowsPerPage)))
      };
    } else {
      normalized.pagination = {
        total: normalized.students?.length || 0,
        page: 1,
        totalPages: 1,
        limit: rowsPerPage
      };
    }
    
    return normalized;
  }, [rowsPerPage]);

  // Validate quizId
  useEffect(() => {
    if (!quizId || !quizId.trim()) {
      setError('Invalid quiz ID');
      setLoading(false);
      return;
    }
    
    // Initial fetch
    fetchRegisteredStudents();
  }, [quizId]);

  // Fetch data when dependencies change
  useEffect(() => {
    if (!quizId || !quizId.trim() || isFetching) return;
    
    const timer = setTimeout(() => {
      fetchRegisteredStudents();
    }, 300); // Debounce to prevent rapid calls
    
    return () => clearTimeout(timer);
  }, [page, rowsPerPage, filter, retryCount]);

  const fetchRegisteredStudents = useCallback(async () => {
    if (!quizId || isFetching) return;
    
    try {
      setIsFetching(true);
      setError(null);
      
      const res = await axios.get(
        `http://localhost:5000/api/faculty/quiz/${quizId}/registered-students`,
        {
          params: {
            page,
            limit: rowsPerPage,
            search: search.trim(),
            filter
          },
          withCredentials: true,
          timeout: 15000,
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        }
      );
      
      if (res.data && res.data.success) {
        // Validate and normalize data
        const validatedData = validateAndNormalizeData(res.data);
        setData(validatedData);
        setRetryCount(0);
        
        if (res.data.message) {
          setSnackbar({
            open: true,
            message: res.data.message,
            severity: 'success'
          });
        }
      } else {
        const errorMsg = res.data?.message || "Failed to load data";
        setError(errorMsg);
        setSnackbar({
          open: true,
          message: errorMsg,
          severity: 'error'
        });
      }
    } catch (err) {
      console.error("Fetch error:", err);
      
      let errorMessage = "Failed to fetch data";
      if (err.response) {
        errorMessage = err.response.data?.message || `Server error: ${err.response.status}`;
      } else if (err.request) {
        errorMessage = "No response from server. Please check your connection.";
      } else if (err.code === 'ECONNABORTED') {
        errorMessage = "Request timeout. Please try again.";
      }
      
      setError(errorMessage);
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error'
      });
      
      // Auto-retry logic (max 3 times)
      if (retryCount < 3) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
        }, 2000 * (retryCount + 1));
      }
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  }, [quizId, page, rowsPerPage, search, filter, retryCount, isFetching, validateAndNormalizeData]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchRegisteredStudents();
  };

  const handleViewStudent = (student) => {
    if (!student || !student._id) {
      setSnackbar({
        open: true,
        message: 'Invalid student data',
        severity: 'error'
      });
      return;
    }
    setSelectedStudent(student);
    setViewModalOpen(true);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    if (newRowsPerPage > 0) {
      setRowsPerPage(newRowsPerPage);
      setPage(1);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Safe data access
  const quiz = safeGet(data, 'quiz', {});
  const statistics = safeGet(data, 'statistics', {});
  const students = safeGet(data, 'students', []);
  const pagination = safeGet(data, 'pagination', { total: 0, page: 1, totalPages: 1 });
  const groupWiseStats = safeGet(data, 'groupWiseStats', []);
  const performanceTrend = safeGet(data, 'performanceTrend', []);
  const timeAnalysis = safeGet(data, 'timeAnalysis', {});

  // Filter students based on filter value
  const filteredStudents = useMemo(() => {
    if (!isValidArray(students)) return [];
    
    return students.filter(student => {
      switch(filter) {
        case 'attempted':
          return student.hasAttempted;
        case 'not_attempted':
          return !student.hasAttempted;
        case 'passed':
          return student.hasAttempted && student.hasPassed;
        case 'failed':
          return student.hasAttempted && !student.hasPassed;
        case 'excellent':
          return student.hasAttempted && student.performancePercentage >= 80;
        case 'good':
          return student.hasAttempted && student.performancePercentage >= 60 && student.performancePercentage < 80;
        case 'average':
          return student.hasAttempted && student.performancePercentage >= 40 && student.performancePercentage < 60;
        case 'poor':
          return student.hasAttempted && student.performancePercentage < 40 && student.performancePercentage > 0;
        default:
          return true;
      }
    });
  }, [students, filter]);
  
  // Chart configurations with safe access
  const performanceComparisonChart = {
    labels: filteredStudents.slice(0, 5).map(s => s?.name?.split(' ')[0] || 'Student') || ['Student 1', 'Student 2', 'Student 3', 'Student 4', 'Student 5'],
    datasets: [
      {
        label: 'Best Score',
        data: filteredStudents.slice(0, 5).map(s => s?.bestScore || 0) || [0, 0, 0, 0, 0],
        backgroundColor: alpha(theme.palette.success.main, 0.7),
        borderColor: theme.palette.success.main,
        borderWidth: 2,
        borderRadius: 4
      },
      {
        label: 'Average Score',
        data: filteredStudents.slice(0, 5).map(s => s?.avgScore || 0) || [0, 0, 0, 0, 0],
        backgroundColor: alpha(theme.palette.primary.main, 0.7),
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
        borderRadius: 4
      }
    ]
  };

  const timeAnalysisChart = {
    labels: safeGet(timeAnalysis, 'hourlyDistribution', []).map(h => h?.hour || '0:00') || ['0-1', '1-2', '2-3', '3-4', '4-5'],
    datasets: [
      {
        label: 'Attempts by Hour',
        data: safeGet(timeAnalysis, 'hourlyDistribution', []).map(h => h?.count || 0) || [0, 0, 0, 0, 0],
        backgroundColor: alpha(theme.palette.info.main, 0.7),
        borderColor: theme.palette.info.main,
        borderWidth: 2,
        borderRadius: 4
      }
    ]
  };

  const performanceDistributionChart = {
    labels: ['Excellent (≥80%)', 'Good (60-79%)', 'Average (40-59%)', 'Poor (<40%)', 'Not Attempted'],
    datasets: [
      {
        data: [
          safeGet(statistics, 'performanceStats.excellent', 0),
          safeGet(statistics, 'performanceStats.good', 0),
          safeGet(statistics, 'performanceStats.average', 0),
          safeGet(statistics, 'performanceStats.poor', 0),
          safeGet(statistics, 'notAttemptedCount', 0)
        ],
        backgroundColor: [
          theme.palette.success.main,
          theme.palette.primary.main,
          theme.palette.warning.main,
          theme.palette.error.main,
          theme.palette.grey[400]
        ],
        borderColor: [
          theme.palette.success.dark,
          theme.palette.primary.dark,
          theme.palette.warning.dark,
          theme.palette.error.dark,
          theme.palette.grey[600]
        ],
        borderWidth: 2
      }
    ]
  };

  const getPerformanceColor = (percentage, hasAttempted) => {
    if (!hasAttempted) return 'default';
    if (percentage >= 80) return 'success';
    if (percentage >= 60) return 'primary';
    if (percentage >= 40) return 'warning';
    return 'error';
  };

  const getPerformanceLabel = (percentage, hasAttempted) => {
    if (!hasAttempted) return 'Not Attempted';
    if (percentage >= 80) return 'Excellent';
    if (percentage >= 60) return 'Good';
    if (percentage >= 40) return 'Average';
    return 'Poor';
  };

  const getGenderIcon = (gender) => {
    if (!gender) return <OtherIcon fontSize="small" />;
    switch (gender.toLowerCase()) {
      case 'male': return <MaleIcon fontSize="small" />;
      case 'female': return <FemaleIcon fontSize="small" />;
      default: return <OtherIcon fontSize="small" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || seconds === 0) return '0s';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) return `${hrs}h ${mins}m`;
    if (mins > 0) return `${mins}m ${secs}s`;
    return `${secs}s`;
  };

  // Handle group performance display
  const renderGroupStats = () => {
    if (!isValidArray(groupWiseStats)) {
      return (
        <ListItem>
          <ListItemText
            primary="No group data available"
            secondary="Groups will appear when students are registered"
          />
        </ListItem>
      );
    }

    return groupWiseStats.map((group, index) => {
      const passRate = group.passRate || 0;
      const attempted = group.attempted || 0;
      const total = group.count || 0;
      
      // Pass rate calculation fix: Only calculate if there are attempts
      const calculatedPassRate = attempted > 0 ? passRate : 0;
      
      return (
        <ListItem key={`${group.course}-${group.semester}-${group.group}`} sx={{ px: 0 }}>
          <ListItemIcon>
            <Avatar sx={{ 
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              width: 36,
              height: 36
            }}>
              {index + 1}
            </Avatar>
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="subtitle2" fontWeight="medium">
                {group.course || 'N/A'} - Sem {group.semester || 'N/A'} ({group.group || 'N/A'})
              </Typography>
            }
            secondary={
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="caption" color="text.secondary">
                  {total} student{total !== 1 ? 's' : ''}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {attempted} attempted
                </Typography>
                <Typography 
                  variant="caption" 
                  color={calculatedPassRate > 0 ? 'success.main' : 'text.secondary'} 
                  fontWeight="medium"
                >
                  {attempted > 0 ? `${formatNumber(calculatedPassRate, 1)}% pass rate` : 'No attempts yet'}
                </Typography>
              </Stack>
            }
          />
          <Chip 
            label={`${formatNumber(group.avgScore || 0, 1)}`}
            size="small"
            color={group.avgScore > 0 ? 'primary' : 'default'}
            sx={{ fontWeight: 600 }}
          />
        </ListItem>
      );
    });
  };

  // Loading and error states - FIXED
  if (loading) {
    return (
      <Box sx={{ 
        bgcolor: 'grey.50', 
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={80} thickness={4} sx={{ color: theme.palette.primary.main }} />
          <Typography variant="h6" sx={{ mt: 3, color: 'text.secondary', fontWeight: 500 }}>
            Loading Quiz Analytics Dashboard...
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
            {retryCount > 0 ? `Retrying... (Attempt ${retryCount + 1}/3)` : 'Preparing comprehensive quiz insights'}
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Paper sx={{ 
          p: 6, 
          textAlign: 'center', 
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: theme.shadows[3]
        }}>
          <ErrorIcon sx={{ fontSize: 80, mb: 3, color: 'error.main' }} />
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Unable to Load Analytics
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
            {error || 'No data available for this quiz'}
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                setError(null);
                setLoading(true);
                fetchRegisteredStudents();
              }}
              disabled={isFetching}
              sx={{ 
                px: 4,
                py: 1.5,
                borderRadius: 2,
                bgcolor: theme.palette.primary.main,
                '&:hover': { 
                  bgcolor: theme.palette.primary.dark,
                  transform: 'translateY(-2px)',
                  boxShadow: theme.shadows[4]
                },
                transition: 'all 0.3s ease'
              }}
            >
              {isFetching ? <CircularProgress size={24} color="inherit" /> : 'Retry Loading'}
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/faculty/quizzes')}
              sx={{ 
                px: 4,
                py: 1.5,
                borderRadius: 2
              }}
            >
              Back to Quizzes
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  // Main content render
  return (
    <Box sx={{ 
      bgcolor: 'grey.50', 
      minHeight: '100vh',
      position: 'relative'
    }}>
      {/* Backdrop for loading during operations */}
      <Backdrop
        sx={{ 
          color: '#fff', 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: 'rgba(0, 0, 0, 0.5)'
        }}
        open={isFetching}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Main Container */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Breadcrumb Navigation */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <MuiLink
            underline="hover"
            color="inherit"
            onClick={() => navigate('/faculty/dashboard')}
            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
            Dashboard
          </MuiLink>
          <MuiLink
            underline="hover"
            color="inherit"
            onClick={() => navigate('/faculty/quizzes')}
            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <QuizIcon sx={{ mr: 0.5 }} fontSize="small" />
            Quizzes
          </MuiLink>
          <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
            <BarChartIcon sx={{ mr: 0.5 }} fontSize="small" />
            Quiz Analytics
          </Typography>
        </Breadcrumbs>

        {/* Header */}
        <Paper sx={{
          bgcolor: 'white',
          borderRadius: 3,
          boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.08)}`,
          mb: 4,
          overflow: 'hidden',
          border: `1px solid ${alpha(theme.palette.divider, 0.2)}`
        }}>
          <Box sx={{ p: 4, pb: 3 }}>
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={3}>
              <Box>
                <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ 
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: { xs: '2rem', md: '2.5rem' }
                }}>
                  {quiz.title || 'Quiz Analytics'}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <Chip 
                    label={quiz.subject || 'No Subject'} 
                    size="small"
                    sx={{ 
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      fontWeight: 500
                    }} 
                  />
                  <Chip 
                    label={`${quiz.department || 'No Department'}`} 
                    size="small"
                    sx={{ 
                      bgcolor: alpha(theme.palette.secondary.main, 0.1),
                      color: theme.palette.secondary.main,
                      fontWeight: 500
                    }} 
                  />
                  <Chip 
                    icon={<CalendarIcon sx={{ fontSize: 16 }} />}
                    label={`${formatDate(quiz.startTime)}`}
                    size="small"
                    sx={{ 
                      bgcolor: alpha(theme.palette.info.main, 0.1),
                      color: theme.palette.info.main,
                      fontWeight: 500
                    }}
                  />
                  <Chip 
                    label={`${quiz.totalMarks || 0} Marks`}
                    size="small"
                    sx={{ 
                      bgcolor: alpha(theme.palette.success.main, 0.1),
                      color: theme.palette.success.main,
                      fontWeight: 500
                    }}
                  />
                </Stack>
              </Box>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  sx={{ 
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    bgcolor: theme.palette.primary.main,
                    color: 'white',
                    '&:hover': { 
                      bgcolor: theme.palette.primary.dark,
                      transform: 'translateY(-2px)',
                      boxShadow: theme.shadows[4]
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Export Report
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Paper>

        {/* Navigation Tabs */}
        <Paper sx={{ 
          borderRadius: 3, 
          mb: 4,
          overflow: 'hidden',
          border: `1px solid ${alpha(theme.palette.divider, 0.2)}`
        }}>
          <Tabs
            value={selectedTab}
            onChange={(e, newValue) => setSelectedTab(newValue)}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                py: 2.5,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                minHeight: '64px'
              },
              '& .Mui-selected': {
                color: theme.palette.primary.main + '!important'
              },
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px 3px 0 0',
                backgroundColor: theme.palette.primary.main
              }
            }}
          >
            <Tab icon={<BarChartIcon />} iconPosition="start" label="Overview" />
            <Tab icon={<PsychologyIcon />} iconPosition="start" label="Analytics" />
            <Tab icon={<PeopleIcon />} iconPosition="start" label="Students" />
            <Tab icon={<TrophyIcon />} iconPosition="start" label="Performance" />
          </Tabs>
        </Paper>

        {/* Tab Content */}
        {selectedTab === 0 && (
          /* Overview Tab */
          <>
            {/* Quick Stats Row */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Total Students"
                  value={statistics.totalStudents || 0}
                  icon={<PeopleIcon />}
                  color="primary"
                  progress={100}
                  loading={isFetching}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Attempted"
                  value={statistics.attemptedCount || 0}
                  subtext={`${formatNumber(statistics.attemptRate, 1)}% attempt rate`}
                  icon={<SuccessIcon />}
                  color="success"
                  progress={statistics.attemptRate || 0}
                  loading={isFetching}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Average Score"
                  value={`${formatNumber(statistics.avgScoreOverall, 1)}`}
                  subtext={`High: ${statistics.highestScore || 0} | Low: ${statistics.lowestScore || 0}`}
                  icon={<ScoreIcon />}
                  color="warning"
                  progress={quiz.totalMarks ? ((statistics.avgScoreOverall || 0) / quiz.totalMarks) * 100 : 0}
                  loading={isFetching}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Pass Percentage"
                  value={`${formatNumber(statistics.passPercentage, 1)}%`}
                  subtext={`${statistics.passedStudents || 0} passed / ${statistics.failedStudents || 0} failed`}
                  icon={<TrendingUpIcon />}
                  color="info"
                  progress={statistics.passPercentage || 0}
                  loading={isFetching}
                />
              </Grid>
            </Grid>

            {/* Performance Charts */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} lg={8}>
                <Card sx={{ 
                  height: '100%',
                  borderRadius: 3,
                  boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.08)}`,
                  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                      <Typography variant="h6" fontWeight="bold">
                        Performance Trends
                      </Typography>
                      <Chip 
                        icon={<TimelineIcon />} 
                        label="Top 5 Students" 
                        size="small" 
                        sx={{ 
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                          fontWeight: 500
                        }}
                      />
                    </Stack>
                    <Box sx={{ height: 300 }}>
                      {isValidArray(filteredStudents) ? (
                        <Bar 
                          data={performanceComparisonChart}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: { 
                                position: 'top',
                                labels: {
                                  font: { size: 12, weight: '500' },
                                  usePointStyle: true
                                }
                              }
                            },
                            scales: {
                              y: {
                                beginAtZero: true,
                                title: {
                                  display: true,
                                  text: 'Score'
                                },
                                grid: { 
                                  color: alpha('#000', 0.05),
                                  drawBorder: false
                                }
                              },
                              x: {
                                grid: { 
                                  color: alpha('#000', 0.05),
                                  drawBorder: false
                                }
                              }
                            }
                          }}
                        />
                      ) : (
                        <Box sx={{ 
                          height: '100%', 
                          display: 'flex', 
                          flexDirection: 'column', 
                          justifyContent: 'center', 
                          alignItems: 'center',
                          color: 'text.secondary'
                        }}>
                          <BarChartIcon sx={{ fontSize: 60, mb: 2, opacity: 0.3 }} />
                          <Typography variant="body1">
                            No performance data available
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} lg={4}>
                <Card sx={{ 
                  height: '100%',
                  borderRadius: 3,
                  boxShadow: `0 4px 20px ${alpha(theme.palette.secondary.main, 0.08)}`,
                  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                      <Typography variant="h6" fontWeight="bold">
                        Performance Distribution
                      </Typography>
                      <Chip 
                        icon={<PieChartIcon />} 
                        label="Categories" 
                        size="small"
                        sx={{ 
                          bgcolor: alpha(theme.palette.secondary.main, 0.1),
                          color: theme.palette.secondary.main,
                          fontWeight: 500
                        }}
                      />
                    </Stack>
                    <Box sx={{ height: 300, position: 'relative' }}>
                      {statistics.totalStudents > 0 ? (
                        <Doughnut 
                          data={performanceDistributionChart}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            cutout: '60%',
                            plugins: {
                              legend: { 
                                position: 'bottom',
                                labels: {
                                  padding: 15,
                                  usePointStyle: true,
                                  pointStyle: 'circle',
                                  font: { size: 11, weight: '500' }
                                }
                              }
                            }
                          }}
                        />
                      ) : (
                        <Box sx={{ 
                          height: '100%', 
                          display: 'flex', 
                          flexDirection: 'column', 
                          justifyContent: 'center', 
                          alignItems: 'center',
                          color: 'text.secondary'
                        }}>
                          <PieChartIcon sx={{ fontSize: 60, mb: 2, opacity: 0.3 }} />
                          <Typography variant="body1" align="center">
                            No students registered yet
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </>
        )}

        {selectedTab === 1 && (
          /* Analytics Tab */
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Deep Analytics Dashboard
              </Typography>
            </Grid>
            
            <Grid item xs={12} lg={6}>
              <Card sx={{ 
                borderRadius: 3,
                boxShadow: `0 4px 20px ${alpha(theme.palette.success.main, 0.08)}`,
                border: `1px solid ${alpha(theme.palette.divider, 0.2)}`
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h6" fontWeight="bold">
                      Time Analysis
                    </Typography>
                    <Chip 
                      icon={<ClockIcon />} 
                      label="Hourly Pattern" 
                      size="small"
                      sx={{ 
                        bgcolor: alpha(theme.palette.success.main, 0.1),
                        color: theme.palette.success.main,
                        fontWeight: 500
                      }}
                    />
                  </Stack>
                  <Box sx={{ height: 250 }}>
                    {isValidArray(safeGet(timeAnalysis, 'hourlyDistribution', [])) ? (
                      <Bar 
                        data={timeAnalysisChart}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: { display: false }
                          },
                          scales: {
                            y: {
                              beginAtZero: true,
                              title: {
                                display: true,
                                text: 'Number of Attempts'
                              },
                              grid: { 
                                color: alpha('#000', 0.05),
                                drawBorder: false
                              }
                            },
                            x: {
                              title: {
                                display: true,
                                text: 'Time of Day'
                              },
                              grid: { 
                                color: alpha('#000', 0.05),
                                drawBorder: false
                              }
                            }
                          }
                        }}
                      />
                    ) : (
                      <Box sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column', 
                          justifyContent: 'center', 
                          alignItems: 'center',
                        color: 'text.secondary'
                      }}>
                        <ClockIcon sx={{ fontSize: 60, mb: 2, opacity: 0.3 }} />
                        <Typography variant="body1" align="center">
                          No time analysis data available
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Avg Time/Attempt</Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {formatTime(safeGet(timeAnalysis, 'avgTimePerAttempt', 0))}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Fastest Attempt</Typography>
                      <Typography variant="h6" fontWeight="bold" color="success.main">
                        {formatTime(safeGet(timeAnalysis, 'fastestAttempt', 0))}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Slowest Attempt</Typography>
                      <Typography variant="h6" fontWeight="bold" color="warning.main">
                        {formatTime(safeGet(timeAnalysis, 'slowestAttempt', 0))}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} lg={6}>
              <Card sx={{ 
                borderRadius: 3,
                boxShadow: `0 4px 20px ${alpha(theme.palette.warning.main, 0.08)}`,
                border: `1px solid ${alpha(theme.palette.divider, 0.2)}`
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h6" fontWeight="bold">
                      Group Performance
                    </Typography>
                    <Chip 
                      icon={<GroupsIcon />} 
                      label="By Department" 
                      size="small"
                      sx={{ 
                        bgcolor: alpha(theme.palette.warning.main, 0.1),
                        color: theme.palette.warning.main,
                        fontWeight: 500
                      }}
                    />
                  </Stack>
                  <List>
                    {renderGroupStats()}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {selectedTab === 2 && (
          /* Students Tab */
          <Card sx={{ 
            borderRadius: 3,
            boxShadow: `0 4px 24px ${alpha(theme.palette.primary.main, 0.08)}`,
            border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
            overflow: 'hidden'
          }}>
            {/* Search and Filter Bar */}
            <Box sx={{ 
              p: 3, 
              bgcolor: alpha(theme.palette.primary.main, 0.02),
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`
            }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                  <form onSubmit={handleSearchSubmit}>
                    <TextField
                      fullWidth
                      placeholder="Search students by name, enrollment, or email..."
                      value={search}
                      onChange={handleSearchChange}
                      size="small"
                      disabled={isFetching}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          bgcolor: 'white'
                        }
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon color={isFetching ? "disabled" : "action"} />
                          </InputAdornment>
                        )
                      }}
                    />
                  </form>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small" disabled={isFetching}>
                    <InputLabel>Filter</InputLabel>
                    <Select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      label="Filter"
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="all">All Students</MenuItem>
                      <MenuItem value="attempted">Attempted Only</MenuItem>
                      <MenuItem value="not_attempted">Not Attempted</MenuItem>
                      <MenuItem value="passed">Passed Only</MenuItem>
                      <MenuItem value="failed">Failed Only</MenuItem>
                      <MenuItem value="excellent">Excellent (≥80%)</MenuItem>
                      <MenuItem value="good">Good (60-79%)</MenuItem>
                      <MenuItem value="average">Average (40-59%)</MenuItem>
                      <MenuItem value="poor">Poor (40%)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormControl fullWidth size="small" disabled={isFetching}>
                    <InputLabel>Per Page</InputLabel>
                    <Select
                      value={rowsPerPage}
                      onChange={handleRowsPerPageChange}
                      label="Per Page"
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={25}>25</MenuItem>
                      <MenuItem value={50}>50</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center' }}>
                      {isFetching ? (
                        <CircularProgress size={16} sx={{ mr: 1 }} />
                      ) : null}
                      {pagination.total || 0} students found
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>

            {/* Students Table */}
            <TableContainer sx={{ maxHeight: 600 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ 
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      fontWeight: 600,
                      py: 2.5,
                      fontSize: '0.875rem'
                    }}>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <PersonIcon fontSize="small" />
                        <span>Student</span>
                      </Stack>
                    </TableCell>
                    <TableCell sx={{ 
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      fontWeight: 600,
                      py: 2.5,
                      fontSize: '0.875rem'
                    }}>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <SchoolIcon fontSize="small" />
                        <span>Academic Info</span>
                      </Stack>
                    </TableCell>
                    <TableCell align="center" sx={{ 
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      fontWeight: 600,
                      py: 2.5,
                      fontSize: '0.875rem'
                    }}>
                      <Stack direction="row" alignItems="center" spacing={0.5} justifyContent="center">
                        <ScoreIcon fontSize="small" />
                        <span>Performance</span>
                      </Stack>
                    </TableCell>
                    <TableCell align="center" sx={{ 
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      fontWeight: 600,
                      py: 2.5,
                      fontSize: '0.875rem'
                    }}>
                      <Stack direction="row" alignItems="center" spacing={0.5} justifyContent="center">
                        <TimerIcon fontSize="small" />
                        <span>Time</span>
                      </Stack>
                    </TableCell>
                    <TableCell align="center" sx={{ 
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      fontWeight: 600,
                      py: 2.5,
                      fontSize: '0.875rem'
                    }}>
                      <Stack direction="row" alignItems="center" spacing={0.5} justifyContent="center">
                        <AssignmentIcon fontSize="small" />
                        <span>Status</span>
                      </Stack>
                    </TableCell>
                    <TableCell align="center" sx={{ 
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      fontWeight: 600,
                      py: 2.5,
                      fontSize: '0.875rem'
                    }}>
                      <Stack direction="row" alignItems="center" spacing={0.5} justifyContent="center">
                        <InsightsIcon fontSize="small" />
                        <span>Actions</span>
                      </Stack>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isFetching ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                        <CircularProgress />
                        <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                          Loading students...
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <TableRow 
                        key={student._id}
                        hover
                        sx={{ 
                          '&:last-child td': { border: 0 },
                          bgcolor: student.hasAttempted 
                            ? student.hasPassed
                              ? alpha(theme.palette.success.light, 0.03)
                              : alpha(theme.palette.warning.light, 0.03)
                            : alpha(theme.palette.grey[100], 0.5),
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            bgcolor: alpha(theme.palette.primary.main, 0.05)
                          }
                        }}
                      >
                        <TableCell sx={{ py: 2.5 }}>
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar 
                              sx={{ 
                                bgcolor: alpha(theme.palette[getPerformanceColor(student.performancePercentage, student.hasAttempted)]?.main || theme.palette.grey[400], 0.15),
                                color: theme.palette[getPerformanceColor(student.performancePercentage, student.hasAttempted)]?.main || theme.palette.grey[600],
                                fontWeight: 600,
                                width: 44,
                                height: 44,
                                fontSize: '1rem'
                              }}
                            >
                              {student.name?.charAt(0) || '?'}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle2" fontWeight="medium">
                                {student.name || 'N/A'}
                              </Typography>
                              <Stack direction="row" spacing={1} alignItems="center">
                                <Typography variant="caption" color="text.secondary">
                                  {student.enrollmentNumber || 'N/A'}
                                </Typography>
                                <Tooltip title={student.gender || 'Other'}>
                                  <Box sx={{ 
                                    color: 'text.secondary', 
                                    display: 'flex',
                                    '& svg': { fontSize: '1rem' }
                                  }}>
                                    {getGenderIcon(student.gender)}
                                  </Box>
                                </Tooltip>
                              </Stack>
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ py: 2.5 }}>
                          <Box>
                            <Typography variant="body2" fontWeight={500} color="primary.main">
                              {student.course || 'N/A'} • Sem {student.semester || 'N/A'}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {student.department || 'N/A'} | Group: {student.group || 'N/A'}
                            </Typography>
                          </Box>
                        </TableCell>
                       <TableCell align="center" sx={{ py: 2.5 }}>
  {student.hasAttempted ? (
    <Stack spacing={1}>
      <Box>
        <Chip
          label={`${student.bestScore || 0}/${quiz.totalMarks || 0}`}
          size="small"
          color={getPerformanceColor(student.performancePercentage, true)}
          sx={{ 
            fontWeight: 600,
            minWidth: 80
          }}
        />
      </Box>
      {/* Add performance percentage display */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary" display="block">
          Performance
        </Typography>
        <Typography 
          variant="caption" 
          fontWeight="bold" 
          display="block"
          color={getPerformanceColor(student.performancePercentage, true)}
        >
          {student.performancePercentage ? `${formatNumber(student.performancePercentage, 1)}%` : '0.0%'}
        </Typography>
      </Box>
      <Stack direction="row" spacing={1} justifyContent="center">
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary" display="block">
            Avg
          </Typography>
          <Typography variant="caption" fontWeight="bold" display="block">
            {student.avgScore ? formatNumber(student.avgScore, 1) : '0.0'}
          </Typography>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary" display="block">
            Attempts
          </Typography>
          <Typography variant="caption" fontWeight="bold" display="block">
            {student.attempts || 0}
          </Typography>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary" display="block">
            Improvement
          </Typography>
          <Typography variant="caption" fontWeight="bold" display="block" color={student.improvement > 0 ? 'success.main' : student.improvement < 0 ? 'error.main' : 'text.secondary'}>
            {student.improvement > 0 ? `+${formatNumber(student.improvement, 1)}%` : student.improvement < 0 ? `${formatNumber(student.improvement, 1)}%` : '0%'}
          </Typography>
        </Box>
      </Stack>
    </Stack>
  ) : (
    <Chip 
      label="No Attempt" 
      size="small" 
      variant="outlined" 
      sx={{ 
        color: 'text.secondary',
        borderColor: alpha(theme.palette.grey[400], 0.5)
      }}
    />
  )}
</TableCell>
                        <TableCell align="center" sx={{ py: 2.5 }}>
                          {student.hasAttempted ? (
                            <Stack spacing={1}>
                              <Chip
                                icon={<TimeIcon />}
                                label={formatTime(student.totalTimeTaken)}
                                size="small"
                                variant="outlined"
                                sx={{ 
                                  borderColor: alpha(theme.palette.info.main, 0.3),
                                  color: theme.palette.info.main
                                }}
                              />
                              <Typography variant="caption" color="text.secondary">
                                {student.avgTimePerQuestion ? `${formatNumber(student.avgTimePerQuestion, 1)}s/q` : 'N/A'}
                              </Typography>
                            </Stack>
                          ) : (
                            <Typography variant="caption" color="text.secondary" fontStyle="italic">
                              N/A
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell align="center" sx={{ py: 2.5 }}>
                          <Stack spacing={1}>
                            <Chip
                              label={getPerformanceLabel(student.performancePercentage, student.hasAttempted)}
                              size="small"
                              color={getPerformanceColor(student.performancePercentage, student.hasAttempted)}
                              icon={student.hasAttempted ? (student.hasPassed ? <SuccessIcon /> : <WarningIcon />) : <CancelIcon />}
                              sx={{ 
                                fontWeight: 600,
                                '&.MuiChip-filledSuccess': {
                                  bgcolor: alpha(theme.palette.success.main, 0.1),
                                  color: theme.palette.success.dark
                                },
                                '&.MuiChip-filledPrimary': {
                                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                                  color: theme.palette.primary.dark
                                },
                                '&.MuiChip-filledWarning': {
                                  bgcolor: alpha(theme.palette.warning.main, 0.1),
                                  color: theme.palette.warning.dark
                                },
                                '&.MuiChip-filledError': {
                                  bgcolor: alpha(theme.palette.error.main, 0.1),
                                  color: theme.palette.error.dark
                                },
                                '&.MuiChip-filledDefault': {
                                  bgcolor: alpha(theme.palette.grey[400], 0.1),
                                  color: theme.palette.grey[700]
                                }
                              }}
                            />
                            {student.firstAttempt && (
                              <Typography variant="caption" color="text.secondary">
                                {formatDate(student.firstAttempt)}
                              </Typography>
                            )}
                          </Stack>
                        </TableCell>
                        <TableCell align="center" sx={{ py: 2.5 }}>
                          <Stack direction="row" spacing={0.5} justifyContent="center">
                            <Tooltip title="View Full Profile">
                              <IconButton
                                size="small"
                                onClick={() => handleViewStudent(student)}
                                disabled={!student._id}
                                sx={{ 
                                  color: theme.palette.primary.main,
                                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                                  '&:hover': {
                                    bgcolor: alpha(theme.palette.primary.main, 0.2)
                                  },
                                  '&:disabled': {
                                    bgcolor: theme.palette.grey[100],
                                    color: theme.palette.grey[400]
                                  }
                                }}
                              >
                                <VisibilityIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Contact Student">
                              <IconButton 
                                size="small"
                                disabled={!student.email}
                                sx={{ 
                                  color: theme.palette.info.main,
                                  bgcolor: alpha(theme.palette.info.main, 0.1),
                                  '&:hover': {
                                    bgcolor: alpha(theme.palette.info.main, 0.2)
                                  },
                                  '&:disabled': {
                                    bgcolor: theme.palette.grey[100],
                                    color: theme.palette.grey[400]
                                  }
                                }}
                              >
                                <ContactIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Performance Details">
                              <IconButton 
                                size="small"
                                disabled={!student.hasAttempted}
                                sx={{ 
                                  color: student.hasAttempted ? theme.palette.success.main : theme.palette.grey[400],
                                  bgcolor: alpha(student.hasAttempted ? theme.palette.success.main : theme.palette.grey[400], 0.1),
                                  '&:hover': student.hasAttempted ? {
                                    bgcolor: alpha(theme.palette.success.main, 0.2)
                                  } : {},
                                  '&:disabled': {
                                    bgcolor: theme.palette.grey[100],
                                    color: theme.palette.grey[400]
                                  }
                                }}
                              >
                                <InsightsIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                        <Box sx={{ textAlign: 'center', py: 2 }}>
                          <PeopleIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2, opacity: 0.3 }} />
                          <Typography variant="h6" color="text.secondary" gutterBottom>
                            No students found
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {search || filter !== 'all' ? 'Try adjusting your search or filter criteria' : 'No students are registered for this quiz yet'}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <Box sx={{ 
                p: 2, 
                borderTop: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                bgcolor: alpha(theme.palette.primary.main, 0.02)
              }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Showing {Math.min(((page - 1) * rowsPerPage) + 1, pagination.total || 0)} to {Math.min(page * rowsPerPage, pagination.total || 0)} of {pagination.total || 0} students
                  </Typography>
                  <Pagination
                    count={pagination.totalPages || 1}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                    disabled={isFetching}
                    sx={{
                      '& .MuiPaginationItem-root': {
                        borderRadius: 1.5,
                        fontWeight: 500
                      },
                      '& .Mui-selected': {
                        boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.3)}`
                      }
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Page {page} of {pagination.totalPages || 1}
                  </Typography>
                </Stack>
              </Box>
            )}
          </Card>
        )}

        {selectedTab === 3 && (
          /* Performance Tab */
          <Card sx={{ 
            borderRadius: 3,
            boxShadow: `0 4px 24px ${alpha(theme.palette.warning.main, 0.08)}`,
            border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
            overflow: 'hidden'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Performance Insights
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 3, bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: 2 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Top Performers
                    </Typography>
                    <List>
                      {filteredStudents
                        .filter(s => s.hasAttempted)
                        .sort((a, b) => (b.bestScore || 0) - (a.bestScore || 0))
                        .slice(0, 5)
                        .map((student, index) => (
                          <ListItem key={student._id} sx={{ px: 0 }}>
                            <ListItemIcon>
                              <Avatar sx={{ 
                                bgcolor: index === 0 ? alpha(theme.palette.warning.main, 0.1) : 
                                         index === 1 ? alpha(theme.palette.info.main, 0.1) : 
                                         index === 2 ? alpha(theme.palette.success.main, 0.1) : 
                                         alpha(theme.palette.primary.main, 0.1),
                                color: index === 0 ? theme.palette.warning.main : 
                                       index === 1 ? theme.palette.info.main : 
                                       index === 2 ? theme.palette.success.main : 
                                       theme.palette.primary.main
                              }}>
                                {index + 1}
                              </Avatar>
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography variant="subtitle2" fontWeight="medium">
                                  {student.name || 'N/A'}
                                </Typography>
                              }
                              secondary={
                                <Typography variant="caption" color="text.secondary">
                                  {student.enrollmentNumber || 'N/A'} • {student.course || 'N/A'}
                                </Typography>
                              }
                            />
                            <Chip 
                              label={`${student.bestScore || 0}/${quiz.totalMarks || 0}`}
                              color={index === 0 ? 'warning' : index === 1 ? 'info' : index === 2 ? 'success' : 'primary'}
                              sx={{ fontWeight: 600 }}
                            />
                          </ListItem>
                        ))}
                      {filteredStudents.filter(s => s.hasAttempted).length === 0 && (
                        <ListItem>
                          <ListItemText
                            primary="No performance data available"
                            secondary="Students need to attempt the quiz first"
                          />
                        </ListItem>
                      )}
                    </List>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 3, bgcolor: alpha(theme.palette.info.main, 0.05), borderRadius: 2 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Improvement Leaders
                    </Typography>
                    <List>
                      {filteredStudents
                        .filter(s => s.hasAttempted && s.attempts > 1)
                        .sort((a, b) => (b.improvement || 0) - (a.improvement || 0))
                        .slice(0, 5)
                        .map((student, index) => (
                          <ListItem key={student._id} sx={{ px: 0 }}>
                            <ListItemIcon>
                              <Avatar sx={{ 
                                bgcolor: student.improvement > 0 ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.error.main, 0.1),
                                color: student.improvement > 0 ? theme.palette.success.main : theme.palette.error.main
                              }}>
                                {student.improvement > 0 ? <TrendingUpIcon /> : <TrendingUpIcon sx={{ transform: 'rotate(90deg)' }} />}
                              </Avatar>
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography variant="subtitle2" fontWeight="medium">
                                  {student.name || 'N/A'}
                                </Typography>
                              }
                              secondary={
                                <Typography variant="caption" color="text.secondary">
                                  {student.improvement > 0 ? `Improved by ${formatNumber(student.improvement, 1)}%` : `Declined by ${formatNumber(Math.abs(student.improvement), 1)}%`}
                                </Typography>
                              }
                            />
                            <Typography variant="body2" fontWeight="bold" color={student.improvement > 0 ? 'success.main' : 'error.main'}>
                              {student.improvement > 0 ? `+${formatNumber(student.improvement, 1)}%` : `${formatNumber(student.improvement, 1)}%`}
                            </Typography>
                          </ListItem>
                        ))}
                      {filteredStudents.filter(s => s.hasAttempted && s.attempts > 1).length === 0 && (
                        <ListItem>
                          <ListItemText
                            primary="No improvement data available"
                            secondary="Students need multiple attempts to track improvement"
                          />
                        </ListItem>
                      )}
                    </List>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </Container>

      {/* Student Detail Modal */}
      <Dialog
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: `0 24px 48px ${alpha(theme.palette.primary.main, 0.15)}`,
            overflow: 'hidden'
          }
        }}
      >
        {selectedStudent && (
          <>
            <DialogTitle sx={{ 
              p: 0,
              bgcolor: 'primary.main',
              color: 'white'
            }}>
              <Box sx={{ p: 3, pb: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                      {selectedStudent.name || 'N/A'}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Chip
                        label={selectedStudent.enrollmentNumber || 'N/A'}
                        size="small"
                        sx={{ 
                          bgcolor: 'rgba(255,255,255,0.2)',
                          color: 'white',
                          fontWeight: 500
                        }}
                      />
                      <Chip
                        icon={getGenderIcon(selectedStudent.gender)}
                        label={selectedStudent.gender || 'Other'}
                        size="small"
                        sx={{ 
                          bgcolor: 'rgba(255,255,255,0.15)',
                          color: 'white',
                          '& .MuiChip-icon': { color: 'white' }
                        }}
                      />
                    </Stack>
                  </Box>
                  <IconButton onClick={() => setViewModalOpen(false)} sx={{ color: 'white' }}>
                    <CancelIcon />
                  </IconButton>
                </Stack>
              </Box>
            </DialogTitle>

            <DialogContent sx={{ p: 0 }}>
              <Grid container>
                {/* Left Column - Personal Info */}
                <Grid item xs={12} md={4} sx={{ 
                  bgcolor: alpha(theme.palette.primary.main, 0.03),
                  borderRight: `1px solid ${alpha(theme.palette.divider, 0.2)}`
                }}>
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
                      Personal Information
                    </Typography>
                    
                    <Stack spacing={3}>
                      <Box>
                        <Typography variant="caption" color="text.secondary" display="block">
                          Email Address
                        </Typography>
                        <Box display="flex" alignItems="center" sx={{ mt: 0.5 }}>
                          <EmailIcon sx={{ mr: 1.5, color: 'text.secondary', fontSize: '1.2rem' }} />
                          <Typography variant="body1" fontWeight={500}>
                            {selectedStudent.email || 'N/A'}
                          </Typography>
                        </Box>
                      </Box>

                      <Box>
                        <Typography variant="caption" color="text.secondary" display="block">
                          Mobile Number
                        </Typography>
                        <Box display="flex" alignItems="center" sx={{ mt: 0.5 }}>
                          <PhoneIcon sx={{ mr: 1.5, color: 'text.secondary', fontSize: '1.2rem' }} />
                          <Typography variant="body1" fontWeight={500}>
                            {selectedStudent.mobileNumber || 'N/A'}
                          </Typography>
                        </Box>
                      </Box>

                      <Box>
                        <Typography variant="caption" color="text.secondary" display="block">
                          Registration Date
                        </Typography>
                        <Box display="flex" alignItems="center" sx={{ mt: 0.5 }}>
                          <CalendarIcon sx={{ mr: 1.5, color: 'text.secondary', fontSize: '1.2rem' }} />
                          <Typography variant="body1" fontWeight={500}>
                            {formatDate(selectedStudent.registrationDate)}
                          </Typography>
                        </Box>
                      </Box>

                      <Box>
                        <Typography variant="caption" color="text.secondary" display="block">
                          Academic Details
                        </Typography>
                        <Stack spacing={1} sx={{ mt: 1 }}>
                          <Box display="flex" alignItems="center">
                            <SchoolIcon sx={{ mr: 1.5, color: 'text.secondary', fontSize: '1.2rem' }} />
                            <Typography variant="body2" fontWeight={500}>
                              {selectedStudent.course || 'N/A'} - Semester {selectedStudent.semester || 'N/A'}
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center">
                            <LibraryBooksIcon sx={{ mr: 1.5, color: 'text.secondary', fontSize: '1.2rem' }} />
                            <Typography variant="body2" fontWeight={500}>
                              {selectedStudent.department || 'N/A'}
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center">
                            <GroupsIcon sx={{ mr: 1.5, color: 'text.secondary', fontSize: '1.2rem' }} />
                            <Typography variant="body2" fontWeight={500}>
                              Group: {selectedStudent.group || 'N/A'}
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                    </Stack>
                  </Box>
                </Grid>

                {/* Right Column - Performance */}
                <Grid item xs={12} md={8}>
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
                      Quiz Performance Analytics
                    </Typography>

                    {selectedStudent.hasAttempted ? (
                      <>
                        {/* Performance Summary */}
                        <Grid container spacing={3} sx={{ mb: 4 }}>
                          <Grid item xs={6} sm={3}>
                            <Box sx={{ 
                              p: 2, 
                              bgcolor: alpha(theme.palette.primary.main, 0.05),
                              borderRadius: 2,
                              textAlign: 'center'
                            }}>
                              <Typography variant="h3" fontWeight="bold" color="primary.main">
                                {selectedStudent.bestScore || 0}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Best Score
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Box sx={{ 
                              p: 2, 
                              bgcolor: alpha(theme.palette.success.main, 0.05),
                              borderRadius: 2,
                              textAlign: 'center'
                            }}>
                              <Typography variant="h3" fontWeight="bold" color="success.main">
                                {selectedStudent.performancePercentage ? `${formatNumber(selectedStudent.performancePercentage, 1)}%` : '0%'}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Performance
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Box sx={{ 
                              p: 2, 
                              bgcolor: alpha(theme.palette.warning.main, 0.05),
                              borderRadius: 2,
                              textAlign: 'center'
                            }}>
                              <Typography variant="h3" fontWeight="bold" color="warning.main">
                                {selectedStudent.avgScore ? formatNumber(selectedStudent.avgScore, 1) : '0.0'}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Average Score
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Box sx={{ 
                              p: 2, 
                              bgcolor: alpha(theme.palette.info.main, 0.05),
                              borderRadius: 2,
                              textAlign: 'center'
                            }}>
                              <Typography variant="h3" fontWeight="bold" color="info.main">
                                {selectedStudent.attempts || 0}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Total Attempts
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>

                        {/* Time Analysis */}
                        <Box sx={{ mb: 4 }}>
                          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            Time Analysis
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Box sx={{ 
                                p: 2, 
                                bgcolor: alpha(theme.palette.grey[100], 0.8),
                                borderRadius: 2
                              }}>
                                <Typography variant="body2" color="text.secondary">
                                  Total Time Taken
                                </Typography>
                                <Typography variant="h6" fontWeight="bold">
                                  {formatTime(selectedStudent.totalTimeTaken)}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={6}>
                              <Box sx={{ 
                                p: 2, 
                                bgcolor: alpha(theme.palette.grey[100], 0.8),
                                borderRadius: 2
                              }}>
                                <Typography variant="body2" color="text.secondary">
                                  Avg Time per Question
                                </Typography>
                                <Typography variant="h6" fontWeight="bold">
                                  {selectedStudent.avgTimePerQuestion ? `${formatNumber(selectedStudent.avgTimePerQuestion, 1)}s` : 'N/A'}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>

                        {/* Attempt History */}
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            Attempt History
                          </Typography>
                          <Stack spacing={2}>
                            <Box>
                              <Typography variant="caption" color="text.secondary">
                                First Attempt
                              </Typography>
                              <Typography variant="body2" fontWeight={500}>
                                {formatDate(selectedStudent.firstAttempt)}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" color="text.secondary">
                                Last Attempt
                              </Typography>
                              <Typography variant="body2" fontWeight={500}>
                                {formatDate(selectedStudent.lastAttempt)}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" color="text.secondary">
                                Improvement
                              </Typography>
                              <Typography variant="body2" fontWeight={500} color={selectedStudent.improvement > 0 ? 'success.main' : selectedStudent.improvement < 0 ? 'error.main' : 'text.secondary'}>
                                {selectedStudent.improvement > 0 ? `Improved by ${formatNumber(selectedStudent.improvement, 1)}%` : 
                                 selectedStudent.improvement < 0 ? `Declined by ${formatNumber(Math.abs(selectedStudent.improvement), 1)}%` : 'No change'}
                              </Typography>
                            </Box>
                          </Stack>
                        </Box>

                        {/* Performance Rating */}
                        <Box sx={{ mt: 4 }}>
                          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            Performance Rating
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Rating
                              value={(selectedStudent.performancePercentage || 0) / 20}
                              readOnly
                              precision={0.5}
                              size="large"
                              icon={<StarIcon sx={{ color: theme.palette.warning.main }} />}
                              emptyIcon={<StarBorderIcon sx={{ color: theme.palette.grey[400] }} />}
                            />
                            <Chip
                              label={getPerformanceLabel(selectedStudent.performancePercentage, true)}
                              color={getPerformanceColor(selectedStudent.performancePercentage, true)}
                              sx={{ fontWeight: 600 }}
                            />
                          </Box>
                        </Box>
                      </>
                    ) : (
                      <Box sx={{ 
                        p: 4, 
                        textAlign: 'center',
                        bgcolor: alpha(theme.palette.grey[100], 0.8),
                        borderRadius: 2
                      }}>
                        <CancelIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                          No Attempts Recorded
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          This student has not attempted the quiz yet.
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions sx={{ 
              p: 3, 
              borderTop: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
              bgcolor: alpha(theme.palette.primary.main, 0.02)
            }}>
              <Button
                onClick={() => setViewModalOpen(false)}
                sx={{ 
                  borderRadius: 2,
                  px: 3
                }}
              >
                Close
              </Button>
              <Button
                variant="contained"
                startIcon={<InsightsIcon />}
                onClick={() => {
                  // Navigate to detailed performance page
                  navigate(`/faculty/student/${selectedStudent._id}/performance?quiz=${quizId}`);
                }}
                sx={{ 
                  borderRadius: 2,
                  px: 3,
                  bgcolor: theme.palette.primary.main,
                  '&:hover': { 
                    bgcolor: theme.palette.primary.dark,
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[4]
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                View Detailed Analytics
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ 
            width: '100%',
            borderRadius: 2,
            boxShadow: theme.shadows[4]
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default QuizRegisteredStudents;






