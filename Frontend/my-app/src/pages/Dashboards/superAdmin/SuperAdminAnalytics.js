// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import {
// //   Grid,
// //   Card,
// //   CardContent,
// //   Typography,
// //   Box,
// //   CircularProgress
// // } from "@mui/material";

// // const StatCard = ({ title, value }) => (
// //   <Card sx={{ borderRadius: 3 }}>
// //     <CardContent>
// //       <Typography variant="subtitle2">{title}</Typography>
// //       <Typography variant="h5" fontWeight="bold">
// //         {value}
// //       </Typography>
// //     </CardContent>
// //   </Card>
// // );

// // const SuperAdminAnalytics = () => {
// //   const [data, setData] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     axios
// //       .get("http://localhost:5000/api/superadmin/analytics", { withCredentials: true })
// //       .then(res => {
// //         setData(res.data);
// //         setLoading(false);
// //       })
// //       .catch(err => {
// //         console.error(err);
// //         setLoading(false);
// //       });
// //   }, []);

// //   if (loading) {
// //     return (
// //       <Box textAlign="center" mt={5}>
// //         <CircularProgress />
// //       </Box>
// //     );
// //   }

// //   if (!data) return null;

// //   return (
// //     <Box p={3}>
// //       <Typography variant="h4" gutterBottom>
// //         Department Analytics ({data.department})
// //       </Typography>

// //       {/* OVERVIEW */}
// //       <Grid container spacing={2}>
// //         <Grid item xs={12} md={2}>
// //           <StatCard title="Faculties" value={data.overview.totalFaculties} />
// //         </Grid>
// //         <Grid item xs={12} md={2}>
// //           <StatCard title="Students" value={data.overview.totalStudents} />
// //         </Grid>
// //         <Grid item xs={12} md={2}>
// //           <StatCard title="Courses" value={data.overview.totalCourses} />
// //         </Grid>
// //         <Grid item xs={12} md={2}>
// //           <StatCard title="Groups" value={data.overview.totalGroups} />
// //         </Grid>
// //         <Grid item xs={12} md={2}>
// //           <StatCard title="Quizzes" value={data.overview.totalQuizzes} />
// //         </Grid>
// //       </Grid>

// //       {/* FACULTY */}
// //       <Box mt={4}>
// //         <Typography variant="h6">Top Faculty</Typography>
// //         {data.facultyAnalytics.mostActiveFaculty && (
// //           <Typography>
// //             {data.facultyAnalytics.mostActiveFaculty.name} (
// //             {data.facultyAnalytics.mostActiveFaculty.quizCount} quizzes)
// //           </Typography>
// //         )}
// //       </Box>

// //       {/* PASS RATE */}
// //       <Box mt={4}>
// //         <Typography variant="h6">
// //           Department Pass Rate: {data.quizAnalytics.departmentPassRate}%
// //         </Typography>
// //       </Box>

// //       {/* REGISTRATION GAP */}
// //       <Box mt={4}>
// //         <Typography variant="h6">Participation</Typography>
// //         <Typography>
// //           Registered: {data.participation.totalRegisteredStudents}
// //         </Typography>
// //         <Typography>
// //           Attempted: {data.participation.totalAttemptedStudents}
// //         </Typography>
// //       </Box>

// //       {/* AVG TIME */}
// //       <Box mt={4}>
// //         <Typography variant="h6">Avg Time (Course Wise)</Typography>
// //         {data.avgTimeByCourse.map(item => (
// //           <Typography key={item.course}>
// //             {item.course}: {item.avgTimeMinutes} mins
// //           </Typography>
// //         ))}
// //       </Box>

// //       {/* TOPPERS */}
// //       <Box mt={4}>
// //         <Typography variant="h6">Quiz Toppers</Typography>
// //         {data.quizToppers.map((t, i) => (
// //           <Typography key={i}>
// //             {t.studentName} ({t.studentId}) – {t.course} – {t.score}
// //           </Typography>
// //         ))}
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default SuperAdminAnalytics;










// // src/pages/Dashboards/superAdmin/SuperAdminAnalytics.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   CircularProgress,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

// const SuperAdminAnalytics = () => {
//   const [analytics, setAnalytics] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/superadmin/analytics", { withCredentials: true });
//         setAnalytics(res.data);
//       } catch (err) {
//         console.error(err);
//         setError(err.response?.data?.message || "Failed to fetch analytics");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAnalytics();
//   }, []);

//   if (loading) return <Box textAlign="center" mt={5}><CircularProgress /></Box>;
//   if (error) return <Box textAlign="center" mt={5}><Typography color="error">{error}</Typography></Box>;

//   const { overview, facultyAnalytics, quizAnalytics, participation, avgTimeByCourse, quizToppers } = analytics;

//   return (
//     <Box p={3}>
//       <Typography variant="h4" gutterBottom>Department Analytics - {analytics.department}</Typography>

//       {/* Overview Cards */}
//       <Grid container spacing={2} mb={3}>
//         {[
//           { title: "Total Faculties", value: overview.totalFaculties },
//           { title: "Male Faculties", value: overview.maleFaculties },
//           { title: "Female Faculties", value: overview.femaleFaculties },
//           { title: "Total Students", value: overview.totalStudents },
//           { title: "Total Courses", value: overview.totalCourses },
//           { title: "Total Groups", value: overview.totalGroups },
//           { title: "Total Quizzes", value: overview.totalQuizzes },
//         ].map((item) => (
//           <Grid item xs={12} sm={6} md={3} key={item.title}>
//             <Card>
//               <CardContent>
//                 <Typography variant="subtitle2">{item.title}</Typography>
//                 <Typography variant="h6">{item.value}</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Faculty Analytics */}
//       <Typography variant="h5" gutterBottom>Faculty Analytics</Typography>
//       <Grid container spacing={2} mb={3}>
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="subtitle2">Most Active Faculty</Typography>
//               {facultyAnalytics.mostActiveFaculty ? (
//                 <>
//                   <Typography variant="body1">{facultyAnalytics.mostActiveFaculty.name}</Typography>
//                   <Typography variant="body2">Quizzes Created: {facultyAnalytics.mostActiveFaculty.quizCount}</Typography>
//                 </>
//               ) : <Typography>No data</Typography>}
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="subtitle2">Top 3 Faculties</Typography>
//               {facultyAnalytics.top3Faculties.length > 0 ? (
//                 <TableContainer component={Paper}>
//                   <Table size="small">
//                     <TableHead>
//                       <TableRow>
//                         <TableCell>Name</TableCell>
//                         <TableCell>Quiz Count</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {facultyAnalytics.top3Faculties.map(f => (
//                         <TableRow key={f.facultyId}>
//                           <TableCell>{f.name}</TableCell>
//                           <TableCell>{f.quizCount}</TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               ) : <Typography>No data</Typography>}
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Quiz Analytics */}
//       <Typography variant="h5" gutterBottom>Quiz Analytics</Typography>
//       <Grid container spacing={2} mb={3}>
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="subtitle2">Best Quiz</Typography>
//               {quizAnalytics.bestQuiz ? (
//                 <>
//                   <Typography variant="body1">{quizAnalytics.bestQuiz.quizTitle}</Typography>
//                   <Typography variant="body2">Avg Score: {quizAnalytics.bestQuiz.avgScore.toFixed(2)}</Typography>
//                   <Typography variant="body2">Total Attempts: {quizAnalytics.bestQuiz.totalAttempts}</Typography>
//                   <Typography variant="body2">Course: {quizAnalytics.bestQuiz.course.join(", ")}</Typography>
//                 </>
//               ) : <Typography>No data</Typography>}
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="subtitle2">Department Pass Rate</Typography>
//               <Typography variant="h6">{quizAnalytics.departmentPassRate}%</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Participation */}
//       <Typography variant="h5" gutterBottom>Participation</Typography>
//       <Grid container spacing={2} mb={3}>
//         {[
//           { title: "Total Registered Students", value: participation.totalRegisteredStudents },
//           { title: "Total Attempted Students", value: participation.totalAttemptedStudents },
//           { title: "Inactive Students", value: participation.inactiveStudents },
//           { title: "Registration to Attempt Rate (%)", value: participation.registrationToAttemptRate },
//         ].map((item) => (
//           <Grid item xs={12} sm={6} md={3} key={item.title}>
//             <Card>
//               <CardContent>
//                 <Typography variant="subtitle2">{item.title}</Typography>
//                 <Typography variant="h6">{item.value}</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Avg Time by Course Chart */}
//       <Typography variant="h5" gutterBottom>Average Time by Course (minutes)</Typography>
//       <Card mb={3}>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={avgTimeByCourse}>
//               <XAxis dataKey="course" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="avgTimeMinutes" fill="#1976d2" name="Avg Time (min)" />
//             </BarChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       {/* Quiz Toppers */}
//       <Typography variant="h5" gutterBottom>Quiz Toppers</Typography>
//       <TableContainer component={Paper} mb={3}>
//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell>Quiz</TableCell>
//               <TableCell>Student Name</TableCell>
//               <TableCell>Student ID</TableCell>
//               <TableCell>Course</TableCell>
//               <TableCell>Score</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {quizToppers.map((q) => (
//               <TableRow key={q.quizId + q.studentId}>
//                 <TableCell>{q.quizId}</TableCell>
//                 <TableCell>{q.studentName}</TableCell>
//                 <TableCell>{q.studentId}</TableCell>
//                 <TableCell>{q.course}</TableCell>
//                 <TableCell>{q.score}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default SuperAdminAnalytics;











// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import {
//   Box, Container, Grid, Paper, Typography, Card, CardContent,
//   CircularProgress, Alert, Button, Chip, Stack, IconButton,
//   Tabs, Tab, MenuItem, Select, FormControl, InputLabel,
//   Table, TableBody, TableCell, TableContainer, TableHead,
//   TableRow, TablePagination, Tooltip, LinearProgress,
//   useTheme, useMediaQuery, Divider, CardHeader,
//   Dialog, DialogTitle, DialogContent, DialogActions,
//   Snackbar, Avatar, Badge, Switch, FormControlLabel,
//   TextField, Menu, ListItemIcon, ListItemText,
//   Rating, Accordion, AccordionSummary, AccordionDetails,
//   List, ListItem, ListItemAvatar
// } from '@mui/material';
// import {
//   Refresh, TrendingUp, TrendingDown, People, School,
//   Quiz, AccessTime, EmojiEvents, Analytics, Timeline as TimelineIcon,
//   Warning, CheckCircle, Error, Info, Download, DateRange,
//   Person, Groups, Category, Subject, Speed, Psychology,
//   CloudDownload, Cached, DataUsage, Score, Percent,
//   ArrowUpward, ArrowDownward, Insights, Dashboard,
//   Assessment, Timeline, TrendingFlat, Delete,
//   MoreVert, FilterList, Print, Share, ZoomIn,
//   ZoomOut, Fullscreen, FullscreenExit, ViewList,
//   ViewModule, Star, StarBorder, Whatshot,
//   TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon,
//   Timeline as TimelineChart, BarChart as BarChartIcon,
//   PieChart as PieChartIcon, ShowChart, DonutLarge,
//   Grade, MilitaryTech, Timer, Speed as SpeedIcon,
//   Psychology as PsychologyIcon, School as SchoolIcon,
//   AutoGraph, Functions, Calculate, Numbers,
//   InsertChart, InsertChartOutlined,
//   TableChart, GridView, TableRows,
//   Sort, FilterAlt, SortByAlpha,
//   DownloadForOffline, Upload,
//   History, Restore, Update,
//   Settings, Tune, Palette,
//   DarkMode, LightMode,
//   Notifications, NotificationsActive,
//   NotificationsOff, NotificationsNone,
//   TableView, ExpandMore, ExpandLess,
//   Visibility, VisibilityOff, Edit,
//   Add, Remove, BarChart,
//   PieChart, ShowChart as ShowChartIcon,
//   TrendingFlat as TrendingFlatIcon,
//   CheckCircle as CheckCircleIcon,
//   Cancel, Schedule, Done,
//   LocalLibrary, Computer, Science,
//   Engineering, Business, Arts,
//   HealthAndSafety, Language,
//   AccountCircle, Email, Phone,
//   CalendarToday, LocationOn,
//   AttachMoney, Work, School as SchoolIcon2,
//   ArrowForward, ArrowBack,
//   FirstPage, LastPage,
//   ChevronLeft, ChevronRight,
//   KeyboardArrowDown, KeyboardArrowUp,
//   FilterList as FilterListIcon,
//   Sort as SortIcon,
//   Search
// } from '@mui/icons-material';
// import {
//    BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
//   Legend, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell,
//   AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
//   ComposedChart, Scatter, Treemap, Sankey, FunnelChart, Funnel,
//   RadialBarChart, RadialBar, SunburstChart, Sunburst
// } from 'recharts';
// import { PlayCircle } from '@mui/icons-material';

// import { motion, AnimatePresence } from 'framer-motion';
// import { format, parseISO, subDays, subMonths, subWeeks } from 'date-fns';
// import axios from 'axios';
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import html2canvas from 'html2canvas';

// // ==================== API CONFIG ====================
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// // ==================== CUSTOM COMPONENTS ====================
// const LoadingScreen = () => (
//   <Box sx={{ 
//     display: 'flex', 
//     justifyContent: 'center', 
//     alignItems: 'center', 
//     minHeight: '70vh',
//     flexDirection: 'column',
//     gap: 3,
//     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     borderRadius: 4,
//     p: 4,
//     mx: 2
//   }}>
//     <CircularProgress 
//       size={80} 
//       thickness={4}
//       sx={{ 
//         color: 'white',
//         '& .MuiCircularProgress-circle': {
//           animationDuration: '2s'
//         }
//       }}
//     />
//     <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
//       Loading Advanced Analytics Dashboard
//     </Typography>
//     <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', textAlign: 'center', maxWidth: 400 }}>
//       Crunching numbers, analyzing trends, and preparing insights...
//     </Typography>
//   </Box>
// );

// const ErrorDisplay = ({ message, onRetry, errorCode }) => (
//   <Box sx={{ 
//     display: 'flex', 
//     flexDirection: 'column', 
//     alignItems: 'center', 
//     p: 6,
//     textAlign: 'center',
//     background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
//     borderRadius: 4,
//     color: 'white',
//     mx: 2
//   }}>
//     <Error sx={{ fontSize: 100, mb: 3, opacity: 0.9 }} />
//     <Typography variant="h4" gutterBottom fontWeight="bold">
//       Analytics Load Failed
//     </Typography>
//     <Typography variant="body1" sx={{ mb: 3, maxWidth: 500, opacity: 0.9 }}>
//       {message || 'We encountered an error while fetching analytics data.'}
//     </Typography>
//     {errorCode && (
//       <Chip 
//         label={`Error Code: ${errorCode}`}
//         sx={{ 
//           mb: 3, 
//           background: 'rgba(255,255,255,0.2)',
//           color: 'white',
//           fontWeight: 'bold'
//         }}
//       />
//     )}
//     <Stack direction="row" spacing={2}>
//       <Button 
//         variant="contained" 
//         startIcon={<Refresh />} 
//         onClick={onRetry}
//         sx={{ 
//           background: 'white',
//           color: '#f5576c',
//           fontWeight: 'bold',
//           '&:hover': {
//             background: 'rgba(255,255,255,0.9)'
//           }
//         }}
//       >
//         Retry Now
//       </Button>
//       <Button 
//         variant="outlined"
//         onClick={() => window.location.reload()}
//         sx={{ 
//           borderColor: 'white',
//           color: 'white',
//           '&:hover': {
//             borderColor: 'rgba(255,255,255,0.8)',
//             background: 'rgba(255,255,255,0.1)'
//           }
//         }}
//       >
//         Reload Page
//       </Button>
//     </Stack>
//   </Box>
// );

// const MetricCard = ({ title, value, change, icon, color, loading = false, onClick, isHighlighted = false }) => {
//   const theme = useTheme();
//   const isPositive = change > 0;
//   const isNeutral = change === 0;

//   return (
//     <Card 
//       component={motion.div}
//       whileHover={{ 
//         y: -8,
//         scale: 1.02,
//         transition: { type: "spring", stiffness: 300 }
//       }}
//       whileTap={{ scale: 0.98 }}
//       onClick={onClick}
//       sx={{ 
//         height: '100%',
//         borderRadius: 3,
//         border: `2px solid ${isHighlighted ? color : theme.palette.divider}`,
//         background: isHighlighted 
//           ? `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`
//           : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%)`,
//         boxShadow: isHighlighted ? `0 8px 32px ${color}40` : 2,
//         position: 'relative',
//         overflow: 'hidden',
//         cursor: onClick ? 'pointer' : 'default',
//         '&::before': {
//           content: '""',
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           height: '4px',
//           background: `linear-gradient(90deg, ${color}, ${color}80)`,
//           opacity: isHighlighted ? 1 : 0.7
//         }
//       }}
//     >
//       <CardContent sx={{ p: 3 }}>
//         <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
//           <Box sx={{ flex: 1 }}>
//             <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
//               <Box sx={{ 
//                 p: 0.5,
//                 borderRadius: 1,
//                 bgcolor: `${color}20`,
//                 color: color,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center'
//               }}>
//                 {icon}
//               </Box>
//               <Typography 
//                 variant="caption" 
//                 color="text.secondary" 
//                 sx={{ 
//                   fontWeight: 600,
//                   textTransform: 'uppercase',
//                   letterSpacing: 0.5,
//                   fontSize: '0.7rem'
//                 }}
//               >
//                 {title}
//               </Typography>
//             </Stack>
            
//             {loading ? (
//               <Box sx={{ mt: 2 }}>
//                 <LinearProgress 
//                   sx={{ 
//                     borderRadius: 1,
//                     height: 8,
//                     background: `${color}20`,
//                     '& .MuiLinearProgress-bar': {
//                       background: `linear-gradient(90deg, ${color}, ${color}80)`,
//                       borderRadius: 1
//                     }
//                   }} 
//                 />
//               </Box>
//             ) : (
//               <Typography 
//                 variant="h3" 
//                 component="div" 
//                 fontWeight="bold"
//                 sx={{ 
//                   mt: 1,
//                   background: `linear-gradient(45deg, ${theme.palette.text.primary}, ${color})`,
//                   WebkitBackgroundClip: 'text',
//                   WebkitTextFillColor: 'transparent',
//                   backgroundClip: 'text'
//                 }}
//               >
//                 {value}
//               </Typography>
//             )}
//           </Box>
          
//           {change !== undefined && (
//             <Box sx={{ 
//               p: 1,
//               borderRadius: 2,
//               bgcolor: isPositive ? 'success.light' : isNeutral ? 'warning.light' : 'error.light',
//               color: isPositive ? 'success.contrastText' : isNeutral ? 'warning.contrastText' : 'error.contrastText',
//               minWidth: 60,
//               textAlign: 'center'
//             }}>
//               <Typography variant="caption" fontWeight="bold" display="block">
//                 {isPositive ? '↑' : isNeutral ? '→' : '↓'}
//               </Typography>
//               <Typography variant="body2" fontWeight="bold">
//                 {isPositive ? '+' : ''}{change}%
//               </Typography>
//             </Box>
//           )}
//         </Stack>
        
//         {!loading && (
//           <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
//             <Stack direction="row" alignItems="center" spacing={1}>
//               <Typography variant="caption" color="text.secondary">
//                 Last 30 days
//               </Typography>
//               {isPositive && <TrendingUpIcon fontSize="small" sx={{ color: 'success.main' }} />}
//               {isNeutral && <TrendingFlat fontSize="small" sx={{ color: 'warning.main' }} />}
//               {!isPositive && !isNeutral && <TrendingDownIcon fontSize="small" sx={{ color: 'error.main' }} />}
//             </Stack>
//           </Box>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// const TimeRangeSelector = ({ value, onChange, disabled = false }) => {
//   const ranges = [
//     { value: 'today', label: 'Today', icon: <DateRange fontSize="small" /> },
//     { value: 'week', label: 'Last 7 Days', icon: <DateRange fontSize="small" /> },
//     { value: 'month', label: 'Last 30 Days', icon: <DateRange fontSize="small" /> },
//     { value: 'quarter', label: 'Last 90 Days', icon: <DateRange fontSize="small" /> },
//     { value: 'year', label: 'Last Year', icon: <DateRange fontSize="small" /> },
//     { value: 'all', label: 'All Time', icon: <DateRange fontSize="small" /> },
//   ];

//   return (
//     <FormControl size="small" sx={{ minWidth: 180 }} disabled={disabled}>
//       <InputLabel>Time Range</InputLabel>
//       <Select
//         value={value}
//         label="Time Range"
//         onChange={(e) => onChange(e.target.value)}
//         startAdornment={<DateRange sx={{ mr: 1, color: 'text.secondary' }} />}
//         sx={{ borderRadius: 2 }}
//       >
//         {ranges.map((range) => (
//           <MenuItem key={range.value} value={range.value}>
//             <Stack direction="row" alignItems="center" spacing={1}>
//               {range.icon}
//               <Typography variant="body2">{range.label}</Typography>
//             </Stack>
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );
// };

// // ==================== MAIN COMPONENT ====================
// const SuperAdminAnalytics = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
//   const [analyticsData, setAnalyticsData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [timeRange, setTimeRange] = useState('month');
//   const [activeTab, setActiveTab] = useState(0);
//   const [refreshing, setRefreshing] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
//   const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'detailed'
//   const [autoRefresh, setAutoRefresh] = useState(false);
//   const [exportDialog, setExportDialog] = useState(false);
//   const [exportFormat, setExportFormat] = useState('pdf');
//   const [fullscreenChart, setFullscreenChart] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [darkMode, setDarkMode] = useState(false);
//   const [notifications, setNotifications] = useState(true);
//   const [facultyPage, setFacultyPage] = useState(0);
//   const [studentsPage, setStudentsPage] = useState(0);
//   const [quizzesPage, setQuizzesPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
  

//   // Fetch Analytics Data
//   const fetchAnalytics = useCallback(async (refresh = false, silent = false) => {
//     try {
//       if (!silent) setLoading(true);
//       setRefreshing(true);
//       setError(null);

//       const response = await axios.get(`${API_BASE_URL}/superadmin/analytics`, {
//         params: { 
//           timeRange, 
//           refresh: refresh.toString() 
//         },
//         withCredentials: true,
//       });

//       if (response.data.success) {
//         setAnalyticsData(response.data);
//         setSnackbar({
//           open: true,
//           message: 'Analytics dashboard loaded successfully',
//           severity: 'success'
//         });
//       } else {
//         throw new Error(response.data.message || 'Failed to fetch analytics');
//       }
//     } catch (err) {
//       console.error('Analytics fetch error:', err);
//       const errorMessage = err.response?.data?.message || err.message || 'Network error';
//       setError({ 
//         message: errorMessage,
//         code: err.response?.status 
//       });
//       setSnackbar({
//         open: true,
//         message: errorMessage,
//         severity: 'error'
//       });
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, [timeRange]);

//   // Auto-refresh
//   useEffect(() => {
//     let interval;
//     if (autoRefresh && analyticsData) {
//       interval = setInterval(() => {
//         fetchAnalytics(true, true);
//       }, 300000); // 5 minutes
//     }
//     return () => clearInterval(interval);
//   }, [autoRefresh, analyticsData, fetchAnalytics]);

//   // Initial fetch
//   useEffect(() => {
//     fetchAnalytics();
//   }, [fetchAnalytics]);

//   // Handlers
//   const handleRefresh = () => {
//     setRefreshing(true);
//     fetchAnalytics(true);
//   };

//   const handleClearCache = async () => {
//     try {
//       await axios.delete(`${API_BASE_URL}/superadmin/analytics/cache`, { 
//         withCredentials: true 
//       });
      
//       setSnackbar({
//         open: true,
//         message: 'Analytics cache cleared successfully',
//         severity: 'success'
//       });
      
//       fetchAnalytics(true, true);
//     } catch (err) {
//       setSnackbar({
//         open: true,
//         message: 'Failed to clear cache',
//         severity: 'error'
//       });
//     }
//   };

//   const handleExport = async () => {
//     try {
//       if (!analyticsData) return;

//       let data, fileName;

//       switch(exportFormat) {
//         case 'pdf':
//           const doc = new jsPDF();
//           doc.setFontSize(20);
//           doc.text('Analytics Report', 105, 20, { align: 'center' });
//           doc.setFontSize(12);
//           doc.text(`Department: ${analyticsData.department}`, 20, 40);
//           doc.text(`Generated: ${format(new Date(), 'yyyy-MM-dd HH:mm')}`, 20, 50);
          
//           // Add table
//           const tableData = [
//             ['Metric', 'Value'],
//             ['Total Students', analyticsData.overview?.totalStudents],
//             ['Total Faculties', analyticsData.overview?.totalFaculties],
//             ['Total Quizzes', analyticsData.overview?.totalQuizzes],
//             ['Average Score', analyticsData.performance?.overallAvgScore],
//             ['Pass Rate', analyticsData.performance?.overallPassRate],
//           ];
          
//           doc.autoTable({
//             startY: 60,
//             head: [tableData[0]],
//             body: tableData.slice(1),
//           });
          
//           fileName = `analytics-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`;
//           doc.save(fileName);
//           break;

//         case 'excel':
//           const ws = XLSX.utils.json_to_sheet([analyticsData.overview || {}]);
//           const wb = XLSX.utils.book_new();
//           XLSX.utils.book_append_sheet(wb, ws, "Analytics");
//           fileName = `analytics-${format(new Date(), 'yyyy-MM-dd')}.xlsx`;
//           XLSX.writeFile(wb, fileName);
//           break;

//         case 'json':
//         default:
//           const dataStr = JSON.stringify(analyticsData, null, 2);
//           const blob = new Blob([dataStr], { type: 'application/json' });
//           const url = window.URL.createObjectURL(blob);
//           const link = document.createElement('a');
//           link.href = url;
//           link.download = `analytics-${analyticsData.department}-${format(new Date(), 'yyyy-MM-dd')}.json`;
//           link.click();
//           window.URL.revokeObjectURL(url);
//           break;
//       }

//       setSnackbar({
//         open: true,
//         message: `Data exported as ${exportFormat.toUpperCase()}`,
//         severity: 'success'
//       });
//       setExportDialog(false);
//     } catch (err) {
//       setSnackbar({
//         open: true,
//         message: 'Export failed',
//         severity: 'error'
//       });
//     }
//   };

//   const handleScreenshot = async () => {
//     try {
//       const element = document.getElementById('analytics-dashboard');
//       const canvas = await html2canvas(element, {
//         scale: 2,
//         useCORS: true,
//         backgroundColor: theme.palette.background.default
//       });
      
//       const imgData = canvas.toDataURL('image/png');
//       const link = document.createElement('a');
//       link.href = imgData;
//       link.download = `analytics-screenshot-${format(new Date(), 'yyyy-MM-dd-HH-mm')}.png`;
//       link.click();
      
//       setSnackbar({
//         open: true,
//         message: 'Screenshot saved successfully',
//         severity: 'success'
//       });
//     } catch (err) {
//       setSnackbar({
//         open: true,
//         message: 'Failed to take screenshot',
//         severity: 'error'
//       });
//     }
//   };

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleSnackbarClose = () => {
//     setSnackbar({ ...snackbar, open: false });
//   };

//   const handleChangePage = (setPageFunc, newPage) => {
//     setPageFunc(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setFacultyPage(0);
//     setStudentsPage(0);
//     setQuizzesPage(0);
//   };

//   // Data Transformations
//   const metrics = useMemo(() => {
//     if (!analyticsData) return [];

//     const { overview, performance, faculty, students, quizzes } = analyticsData;
    
//     return [
//       {
//         title: 'Total Students',
//         value: overview?.totalStudents?.toLocaleString() || '0',
//         change: 12.5,
//         icon: <People />,
//         color: '#2196f3',
//         isHighlighted: true
//       },
//       {
//         title: 'Active Faculties',
//         value: faculty?.total?.toLocaleString() || '0',
//         change: 8.3,
//         icon: <School />,
//         color: '#4caf50'
//       },
//       {
//         title: 'Quizzes Created',
//         value: overview?.totalQuizzes?.toLocaleString() || '0',
//         change: overview?.quizGrowthRate || 15.2,
//         icon: <Quiz />,
//         color: '#ff9800'
//       },
//       {
//         title: 'Avg Score',
//         value: (performance?.overallAvgScore || 0).toFixed(1),
//         change: 5.7,
//         icon: <Score />,
//         color: '#9c27b0'
//       },
//       {
//         title: 'Pass Rate',
//         value: `${performance?.overallPassRate || 0}%`,
//         change: parseFloat(performance?.overallPassRate || 0) - 72,
//         icon: <Percent />,
//         color: '#f44336'
//       },
//       {
//         title: 'Engagement',
//         value: `${analyticsData.kpis?.studentEngagementRate || 0}%`,
//         change: 8.5,
//         icon: <DataUsage />,
//         color: '#00bcd4'
//       }
//     ];
//   }, [analyticsData]);

//   const chartData = useMemo(() => {
//     if (!analyticsData?.trends?.monthly) return [];
    
//     return analyticsData.trends.monthly.slice(-12).map(item => ({
//       name: item.period,
//       attempts: item.attempts || 0,
//       students: item.uniqueStudents || 0,
//       avgScore: item.avgScore || 0,
//       growth: Math.random() * 20 - 10
//     }));
//   }, [analyticsData]);

//   const courseDistributionData = useMemo(() => {
//     if (!analyticsData?.students?.courseDistribution) return [];
    
//     return analyticsData.students.courseDistribution.slice(0, 8).map((course, index) => ({
//       name: course._id || `Course ${index + 1}`,
//       value: course.count || 0,
//       fill: `hsl(${index * 45}, 70%, 60%)`
//     }));
//   }, [analyticsData]);

//   const facultyPerformanceData = useMemo(() => {
//     if (!analyticsData?.faculty?.topPerformers) return [];
    
//     return analyticsData.faculty.topPerformers.slice(0, 8).map((faculty, index) => ({
//       name: faculty.name?.split(' ')[0] || `Faculty ${index + 1}`,
//       quizzes: faculty.quizCount || 0,
//       students: faculty.totalStudents || 0,
//       engagement: Math.round((faculty.engagementScore || 0) / 10),
//       score: 70 + Math.random() * 30
//     }));
//   }, [analyticsData]);

//   const performanceRadarData = useMemo(() => {
//     if (!analyticsData?.kpis) return [];
    
//     return [
//       { subject: 'Engagement', value: analyticsData.kpis.studentEngagementRate || 0, fullMark: 100 },
//       { subject: 'Performance', value: analyticsData.kpis.quizEffectiveness || 0, fullMark: 100 },
//       { subject: 'Productivity', value: analyticsData.kpis.facultyProductivity * 10 || 0, fullMark: 100 },
//       { subject: 'Efficiency', value: 75, fullMark: 100 },
//       { subject: 'Outcomes', value: analyticsData.kpis.learningOutcomeIndex || 0, fullMark: 100 },
//       { subject: 'Utilization', value: analyticsData.kpis.resourceUtilization * 2 || 0, fullMark: 100 },
//     ];
//   }, [analyticsData]);

//   const hourlyData = useMemo(() => {
//     if (analyticsData?.trends?.peakHours) {
//       return analyticsData.trends.peakHours.map(item => ({
//         hour: `${item._id}:00`,
//         attempts: item.attempts || 0,
//         percentage: (item.attempts / analyticsData.performance.totalAttempts * 100) || 0
//       })).sort((a, b) => parseInt(a.hour) - parseInt(b.hour));
//     }
//     return [];
//   }, [analyticsData]);

//   const scoreDistributionData = useMemo(() => {
//     if (!analyticsData?.performance?.scoreDistribution) return [];
    
//     return [
//       { range: '90-100%', count: analyticsData.performance.scoreDistribution.excellent || 0, color: '#4caf50' },
//       { range: '75-89%', count: analyticsData.performance.scoreDistribution.good || 0, color: '#8bc34a' },
//       { range: '60-74%', count: analyticsData.performance.scoreDistribution.average || 0, color: '#ffc107' },
//       { range: '40-59%', count: analyticsData.performance.scoreDistribution.belowAverage || 0, color: '#ff9800' },
//       { range: '0-39%', count: analyticsData.performance.scoreDistribution.poor || 0, color: '#f44336' },
//     ];
//   }, [analyticsData]);

//   const facultyDesignationData = useMemo(() => {
//     if (!analyticsData?.faculty?.distributionByDesignation) return [];
    
//     return analyticsData.faculty.distributionByDesignation.map((item, index) => ({
//       name: item._id || 'Unknown',
//       value: item.count || 0,
//       fill: `hsl(${index * 60}, 70%, 60%)`
//     }));
//   }, [analyticsData]);

//   const studentPerformanceData = useMemo(() => {
//     if (!analyticsData?.students?.topPerformers) return [];
    
//     return analyticsData.students.topPerformers.slice(0, 10).map((student, index) => ({
//       name: student.name?.split(' ')[0] || `Student ${index + 1}`,
//       score: student.avgScore || 0,
//       attempts: student.attemptCount || 0,
//       course: student.course || 'Unknown'
//     }));
//   }, [analyticsData]);

//   const quizPerformanceData = useMemo(() => {
//     if (!analyticsData?.quizzes?.topQuizzesByParticipation) return [];
    
//     return analyticsData.quizzes.topQuizzesByParticipation.slice(0, 8).map((quiz, index) => ({
//       name: quiz.title || `Quiz ${index + 1}`,
//       attempts: quiz.attemptCount || 0,
//       completion: (quiz.completionRate * 100) || 0,
//       difficulty: (quiz.difficultyIndex * 100) || 0,
//       score: quiz.avgScore || 0
//     }));
//   }, [analyticsData]);

//   // Tabs configuration
//   const tabs = [
//     { label: 'Dashboard', icon: <Dashboard /> },
//     { label: 'Faculty', icon: <School /> },
//     { label: 'Students', icon: <People /> },
//     { label: 'Quizzes', icon: <Quiz /> },
//     { label: 'Performance', icon: <Assessment /> },
//     { label: 'Trends', icon: <Timeline /> },
//     { label: 'Insights', icon: <Insights /> },
//   ];

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//   };

//   // Render based on state
//   if (loading && !analyticsData) {
//     return <LoadingScreen />;
//   }

//   if (error) {
//     return <ErrorDisplay 
//       message={error.message}
//       errorCode={error.code}
//       onRetry={handleRefresh} 
//     />;
//   }

//   return (
//     <Box id="analytics-dashboard">
//       <Container maxWidth="xl" sx={{ py: isMobile ? 2 : 4 }}>
//         {/* Header */}
//         <Box sx={{ mb: isMobile ? 2 : 4 }}>
//           <Grid container spacing={2} alignItems="center" justifyContent="space-between">
//             <Grid item xs={12} md={6}>
//               <Stack spacing={1}>
//                 <Stack direction="row" alignItems="center" spacing={2}>
//                   <Avatar sx={{ 
//                     bgcolor: 'primary.main',
//                     width: 56,
//                     height: 56,
//                     boxShadow: 3
//                   }}>
//                     <Analytics fontSize="large" />
//                   </Avatar>
//                   <Box>
//                     <Typography variant="h4" fontWeight="bold" gutterBottom>
//                       Analytics Command Center
//                     </Typography>
//                     <Stack direction="row" spacing={2} alignItems="center">
//                       <Chip 
//                         label={analyticsData?.department || 'Department'} 
//                         color="primary" 
//                         icon={<Category />}
//                         sx={{ fontWeight: 'bold' }}
//                       />
//                       <Chip 
//                         label={analyticsData?.metadata?.processingTime || '0ms'} 
//                         variant="outlined"
//                         size="small"
//                         icon={<SpeedIcon fontSize="small" />}
//                       />
//                       <Typography variant="caption" color="text.secondary">
//                         Updated: {analyticsData?.metadata?.generatedAt ? 
//                           format(parseISO(analyticsData.metadata.generatedAt), 'MMM dd, yyyy HH:mm:ss') : 
//                           'Just now'}
//                       </Typography>
//                     </Stack>
//                   </Box>
//                 </Stack>
//               </Stack>
//             </Grid>
            
//             <Grid item xs={12} md={6}>
//               <Stack 
//                 direction="row" 
//                 spacing={1} 
//                 justifyContent={isMobile ? 'flex-start' : 'flex-end'}
//                 flexWrap="wrap"
//                 gap={1}
//               >
//                 <TimeRangeSelector 
//                   value={timeRange} 
//                   onChange={setTimeRange}
//                   disabled={refreshing}
//                 />
                
//                 <Tooltip title={viewMode === 'grid' ? 'Switch to Detailed View' : 'Switch to Grid View'}>
//                   <IconButton onClick={() => setViewMode(viewMode === 'grid' ? 'detailed' : 'grid')}>
//                     {viewMode === 'grid' ? <TableView /> : <GridView />}
//                   </IconButton>
//                 </Tooltip>
                
//                 <Tooltip title={autoRefresh ? "Disable Auto Refresh" : "Enable Auto Refresh (5 min)"}>
//                   <IconButton
//                     color={autoRefresh ? "success" : "default"}
//                     onClick={() => setAutoRefresh(!autoRefresh)}
//                   >
//                     <Cached />
//                   </IconButton>
//                 </Tooltip>
                
//                 <Tooltip title="Refresh Data">
//                   <IconButton 
//                     onClick={handleRefresh} 
//                     disabled={refreshing}
//                     color="primary"
//                   >
//                     <Badge color="error" variant="dot" invisible={!refreshing}>
//                       <Refresh sx={{ 
//                         animation: refreshing ? 'spin 1s linear infinite' : 'none',
//                         '@keyframes spin': { 
//                           '0%': { transform: 'rotate(0deg)' }, 
//                           '100%': { transform: 'rotate(360deg)' } 
//                         }
//                       }} />
//                     </Badge>
//                   </IconButton>
//                 </Tooltip>
                
//                 <Tooltip title="More Options">
//                   <IconButton onClick={handleMenuOpen}>
//                     <MoreVert />
//                   </IconButton>
//                 </Tooltip>
//               </Stack>
//             </Grid>
//           </Grid>
//         </Box>

//         {/* Metrics Grid */}
//         <Grid container spacing={isMobile ? 1 : 2} sx={{ mb: isMobile ? 2 : 4 }}>
//           {metrics.map((metric, index) => (
//             <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
//               <MetricCard 
//                 {...metric} 
//                 loading={refreshing} 
//                 onClick={() => setActiveTab(index === 0 ? 2 : index === 1 ? 1 : index === 2 ? 3 : 4)}
//               />
//             </Grid>
//           ))}
//         </Grid>

//         {/* Main Content Area */}
//         <Paper sx={{ 
//           borderRadius: 3, 
//           overflow: 'hidden', 
//           mb: 4,
//           boxShadow: 3,
//           border: `1px solid ${theme.palette.divider}`
//         }}>
//           {/* Tabs Header */}
//           <Box sx={{ 
//             borderBottom: 1, 
//             borderColor: 'divider',
//             background: `linear-gradient(90deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`
//           }}>
//             <Tabs
//               value={activeTab}
//               onChange={handleTabChange}
//               variant={isMobile ? "scrollable" : "fullWidth"}
//               scrollButtons="auto"
//               sx={{
//                 '& .MuiTab-root': {
//                   minHeight: 64,
//                   fontSize: isMobile ? '0.875rem' : '1rem',
//                   fontWeight: 600,
//                   textTransform: 'none',
//                   '&.Mui-selected': {
//                     color: theme.palette.primary.main
//                   }
//                 }
//               }}
//             >
//               {tabs.map((tab, index) => (
//                 <Tab
//                   key={index}
//                   icon={tab.icon}
//                   iconPosition="start"
//                   label={tab.label}
//                 />
//               ))}
//             </Tabs>
//           </Box>

//           {/* Tab Content */}
//           <Box sx={{ p: isMobile ? 2 : 3 }}>
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={activeTab}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 {/* Dashboard Tab */}
//                 {activeTab === 0 && (
//                   <DashboardTab 
//                     data={analyticsData}
//                     chartData={chartData}
//                     courseDistributionData={courseDistributionData}
//                     facultyPerformanceData={facultyPerformanceData}
//                     performanceRadarData={performanceRadarData}
//                     hourlyData={hourlyData}
//                     scoreDistributionData={scoreDistributionData}
//                     theme={theme}
//                     colors={['#2196f3', '#4caf50', '#ff9800', '#9c27b0', '#f44336', '#00bcd4']}
//                   />
//                 )}

//                 {/* Faculty Tab */}
//                 {activeTab === 1 && (
//                   <FacultyTab 
//                     data={analyticsData}
//                     facultyPerformanceData={facultyPerformanceData}
//                     facultyDesignationData={facultyDesignationData}
//                     facultyPage={facultyPage}
//                     rowsPerPage={rowsPerPage}
//                     handleChangePage={handleChangePage}
//                     handleChangeRowsPerPage={handleChangeRowsPerPage}
//                     theme={theme}
//                     colors={['#4caf50', '#2196f3', '#ff9800', '#9c27b0']}
//                   />
//                 )}

//                 {/* Students Tab */}
//                 {activeTab === 2 && (
//                   <StudentsTab 
//                     data={analyticsData}
//                     courseDistributionData={courseDistributionData}
//                     studentPerformanceData={studentPerformanceData}
//                     studentsPage={studentsPage}
//                     rowsPerPage={rowsPerPage}
//                     handleChangePage={handleChangePage}
//                     handleChangeRowsPerPage={handleChangeRowsPerPage}
//                     theme={theme}
//                     colors={['#2196f3', '#4caf50', '#ff9800', '#9c27b0']}
//                   />
//                 )}

//                 {/* Quizzes Tab */}
//                 {activeTab === 3 && (
//                   <QuizzesTab 
//                     data={analyticsData}
//                     quizPerformanceData={quizPerformanceData}
//                     quizzesPage={quizzesPage}
//                     rowsPerPage={rowsPerPage}
//                     handleChangePage={handleChangePage}
//                     handleChangeRowsPerPage={handleChangeRowsPerPage}
//                     theme={theme}
//                     colors={['#ff9800', '#4caf50', '#2196f3', '#9c27b0']}
//                   />
//                 )}

//                 {/* Performance Tab */}
//                 {activeTab === 4 && (
//                   <PerformanceTab 
//                     data={analyticsData}
//                     performanceRadarData={performanceRadarData}
//                     scoreDistributionData={scoreDistributionData}
//                     theme={theme}
//                     colors={['#9c27b0', '#4caf50', '#2196f3', '#ff9800']}
//                   />
//                 )}

//                 {/* Trends Tab */}
//                 {activeTab === 5 && (
//                   <TrendsTab 
//                     data={analyticsData}
//                     chartData={chartData}
//                     hourlyData={hourlyData}
//                     theme={theme}
//                     colors={['#00bcd4', '#4caf50', '#ff9800', '#9c27b0']}
//                   />
//                 )}

//                 {/* Insights Tab */}
//                 {activeTab === 6 && (
//                   <InsightsTab 
//                     data={analyticsData}
//                     theme={theme}
//                   />
//                 )}
//               </motion.div>
//             </AnimatePresence>
//           </Box>
//         </Paper>

//         {/* More Options Menu */}
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleMenuClose}
//           PaperProps={{
//             sx: {
//               width: 250,
//               borderRadius: 2,
//               boxShadow: 3
//             }
//           }}
//         >
//           <MenuItem onClick={handleScreenshot}>
//             <ListItemIcon><Download fontSize="small" /></ListItemIcon>
//             <ListItemText>Screenshot Dashboard</ListItemText>
//           </MenuItem>
//           <MenuItem onClick={() => setExportDialog(true)}>
//             <ListItemIcon><CloudDownload fontSize="small" /></ListItemIcon>
//             <ListItemText>Export Data</ListItemText>
//           </MenuItem>
//           <MenuItem onClick={handleClearCache}>
//             <ListItemIcon><Delete fontSize="small" /></ListItemIcon>
//             <ListItemText>Clear Cache</ListItemText>
//           </MenuItem>
//           <Divider />
//           <MenuItem onClick={() => setNotifications(!notifications)}>
//             <ListItemIcon>
//               {notifications ? <NotificationsActive fontSize="small" /> : <NotificationsOff fontSize="small" />}
//             </ListItemIcon>
//             <ListItemText>{notifications ? 'Disable Notifications' : 'Enable Notifications'}</ListItemText>
//           </MenuItem>
//           <MenuItem onClick={() => setDarkMode(!darkMode)}>
//             <ListItemIcon>
//               {darkMode ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
//             </ListItemIcon>
//             <ListItemText>{darkMode ? 'Light Mode' : 'Dark Mode'}</ListItemText>
//           </MenuItem>
//           <Divider />
//           <MenuItem>
//             <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
//             <ListItemText>Settings</ListItemText>
//           </MenuItem>
//         </Menu>

//         {/* Export Dialog */}
//         <Dialog open={exportDialog} onClose={() => setExportDialog(false)} maxWidth="sm" fullWidth>
//           <DialogTitle>Export Analytics Data</DialogTitle>
//           <DialogContent>
//             <Stack spacing={3} sx={{ mt: 2 }}>
//               <FormControl fullWidth>
//                 <InputLabel>Export Format</InputLabel>
//                 <Select
//                   value={exportFormat}
//                   label="Export Format"
//                   onChange={(e) => setExportFormat(e.target.value)}
//                 >
//                   <MenuItem value="pdf">PDF Report</MenuItem>
//                   <MenuItem value="excel">Excel Spreadsheet</MenuItem>
//                   <MenuItem value="json">JSON Data</MenuItem>
//                   <MenuItem value="csv">CSV Format</MenuItem>
//                 </Select>
//               </FormControl>
              
//               {exportFormat === 'pdf' && (
//                 <TextField
//                   label="Report Title"
//                   defaultValue={`${analyticsData?.department} Analytics Report`}
//                   fullWidth
//                 />
//               )}
              
//               <FormControlLabel
//                 control={<Switch defaultChecked />}
//                 label="Include Charts and Graphs"
//               />
              
//               <FormControlLabel
//                 control={<Switch defaultChecked />}
//                 label="Include Raw Data"
//               />
//             </Stack>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setExportDialog(false)}>Cancel</Button>
//             <Button onClick={handleExport} variant="contained" startIcon={<CloudDownload />}>
//               Export Now
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Snackbar for notifications */}
//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={4000}
//           onClose={handleSnackbarClose}
//           anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//         >
//           <Alert 
//             onClose={handleSnackbarClose} 
//             severity={snackbar.severity}
//             sx={{ width: '100%' }}
//             variant="filled"
//           >
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </Container>
//     </Box>
//   );
// };

// // ==================== TAB COMPONENTS ====================

// const DashboardTab = ({ data, chartData, courseDistributionData, facultyPerformanceData, performanceRadarData, hourlyData, scoreDistributionData, theme, colors }) => (
//   <Grid container spacing={3}>
//     {/* Performance Trends Chart */}
//     <Grid item xs={12} lg={8}>
//       <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
//         <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
//           <Typography variant="h6" fontWeight="bold">
//             <ShowChart sx={{ verticalAlign: 'middle', mr: 1, color: colors[0] }} />
//             Performance Trends
//           </Typography>
//           <Stack direction="row" spacing={1}>
//             <IconButton size="small"><ZoomIn /></IconButton>
//             <IconButton size="small"><ZoomOut /></IconButton>
//             <IconButton size="small"><Fullscreen /></IconButton>
//           </Stack>
//         </Stack>
//         <Box sx={{ height: 400 }}>
//           <ResponsiveContainer width="100%" height="100%">
//             <ComposedChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
//               <XAxis 
//                 dataKey="name" 
//                 tick={{ fill: theme.palette.text.secondary }}
//                 axisLine={{ stroke: theme.palette.divider }}
//               />
//               <YAxis 
//                 yAxisId="left"
//                 tick={{ fill: theme.palette.text.secondary }}
//                 axisLine={{ stroke: theme.palette.divider }}
//               />
//               <YAxis 
//                 yAxisId="right"
//                 orientation="right"
//                 tick={{ fill: theme.palette.text.secondary }}
//                 axisLine={{ stroke: theme.palette.divider }}
//               />
//               <RechartsTooltip 
//                 contentStyle={{ 
//                   borderRadius: 8,
//                   border: `1px solid ${theme.palette.divider}`,
//                   backgroundColor: theme.palette.background.paper,
//                   boxShadow: theme.shadows[3]
//                 }}
//               />
//               <Legend />
//               <Area 
//                 yAxisId="left"
//                 type="monotone" 
//                 dataKey="students" 
//                 fill={colors[0]} 
//                 stroke={colors[0]} 
//                 fillOpacity={0.3}
//                 name="Unique Students"
//               />
//               <Bar 
//                 yAxisId="left"
//                 dataKey="attempts" 
//                 fill={colors[1]} 
//                 barSize={20}
//                 name="Quiz Attempts"
//               />
//               <Line 
//                 yAxisId="right"
//                 type="monotone" 
//                 dataKey="avgScore" 
//                 stroke={colors[2]} 
//                 strokeWidth={3}
//                 dot={{ r: 5, strokeWidth: 2 }}
//                 name="Average Score"
//               />
//               <Line 
//                 yAxisId="right"
//                 type="monotone" 
//                 dataKey="growth" 
//                 stroke={colors[3]} 
//                 strokeWidth={2}
//                 strokeDasharray="5 5"
//                 dot={false}
//                 name="Growth Rate"
//               />
//             </ComposedChart>
//           </ResponsiveContainer>
//         </Box>
//       </Paper>
//     </Grid>

//     {/* Key Metrics Summary */}
//     <Grid item xs={12} lg={4}>
//       <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
//         <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
//           <InsertChart sx={{ verticalAlign: 'middle', mr: 1, color: colors[4] }} />
//           Key Metrics Summary
//         </Typography>
//         <Stack spacing={3}>
//           <Box>
//             <Stack direction="row" justifyContent="space-between" alignItems="center">
//               <Typography variant="body2" color="text.secondary">Engagement Rate</Typography>
//               <Typography variant="h6" fontWeight="bold" color={colors[0]}>
//                 {data.kpis?.studentEngagementRate || 0}%
//               </Typography>
//             </Stack>
//             <LinearProgress 
//               variant="determinate" 
//               value={data.kpis?.studentEngagementRate || 0}
//               sx={{ 
//                 mt: 1, 
//                 height: 8, 
//                 borderRadius: 4,
//                 backgroundColor: `${colors[0]}20`,
//                 '& .MuiLinearProgress-bar': {
//                   background: `linear-gradient(90deg, ${colors[0]}, ${colors[0]}80)`,
//                   borderRadius: 4
//                 }
//               }}
//             />
//           </Box>
          
//           <Box>
//             <Stack direction="row" justifyContent="space-between" alignItems="center">
//               <Typography variant="body2" color="text.secondary">Pass Rate</Typography>
//               <Typography variant="h6" fontWeight="bold" color={colors[1]}>
//                 {data.performance?.overallPassRate || 0}%
//               </Typography>
//             </Stack>
//             <LinearProgress 
//               variant="determinate" 
//               value={data.performance?.overallPassRate || 0}
//               sx={{ 
//                 mt: 1, 
//                 height: 8, 
//                 borderRadius: 4,
//                 backgroundColor: `${colors[1]}20`,
//                 '& .MuiLinearProgress-bar': {
//                   background: `linear-gradient(90deg, ${colors[1]}, ${colors[1]}80)`,
//                   borderRadius: 4
//                 }
//               }}
//             />
//           </Box>
          
//           <Box>
//             <Stack direction="row" justifyContent="space-between" alignItems="center">
//               <Typography variant="body2" color="text.secondary">Faculty Productivity</Typography>
//               <Typography variant="h6" fontWeight="bold" color={colors[2]}>
//                 {data.kpis?.facultyProductivity || 0}
//               </Typography>
//             </Stack>
//             <LinearProgress 
//               variant="determinate" 
//               value={(data.kpis?.facultyProductivity || 0) * 10}
//               sx={{ 
//                 mt: 1, 
//                 height: 8, 
//                 borderRadius: 4,
//                 backgroundColor: `${colors[2]}20`,
//                 '& .MuiLinearProgress-bar': {
//                   background: `linear-gradient(90deg, ${colors[2]}, ${colors[2]}80)`,
//                   borderRadius: 4
//                 }
//               }}
//             />
//           </Box>
          
//           <Box>
//             <Stack direction="row" justifyContent="space-between" alignItems="center">
//               <Typography variant="body2" color="text.secondary">Learning Outcomes</Typography>
//               <Typography variant="h6" fontWeight="bold" color={colors[3]}>
//                 {data.kpis?.learningOutcomeIndex || 0}%
//               </Typography>
//             </Stack>
//             <LinearProgress 
//               variant="determinate" 
//               value={data.kpis?.learningOutcomeIndex || 0}
//               sx={{ 
//                 mt: 1, 
//                 height: 8, 
//                 borderRadius: 4,
//                 backgroundColor: `${colors[3]}20`,
//                 '& .MuiLinearProgress-bar': {
//                   background: `linear-gradient(90deg, ${colors[3]}, ${colors[3]}80)`,
//                   borderRadius: 4
//                 }
//               }}
//             />
//           </Box>
//         </Stack>
//       </Paper>
//     </Grid>

//     {/* Course Distribution */}
//     <Grid item xs={12} md={6}>
//       <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
//         <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
//           <PieChartIcon sx={{ verticalAlign: 'middle', mr: 1, color: colors[0] }} />
//           Course Distribution
//         </Typography>
//         <Box sx={{ height: 300 }}>
//           <ResponsiveContainer width="100%" height="100%">
//             <RechartsPieChart>
//               <Pie
//                 data={courseDistributionData}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
//                 outerRadius={100}
//                 fill="#8884d8"
//                 dataKey="value"
//               >
//                 {courseDistributionData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.fill || colors[index % colors.length]} />
//                 ))}
//               </Pie>
//               <RechartsTooltip 
//                 formatter={(value, name) => [`${value} students`, name]}
//                 contentStyle={{ 
//                   borderRadius: 8,
//                   border: `1px solid ${theme.palette.divider}`,
//                   backgroundColor: theme.palette.background.paper
//                 }}
//               />
//             </RechartsPieChart>
//           </ResponsiveContainer>
//         </Box>
//       </Paper>
//     </Grid>

//     {/* Score Distribution */}
//     <Grid item xs={12} md={6}>
//       <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
//         <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
//           <Grade sx={{ verticalAlign: 'middle', mr: 1, color: colors[2] }} />
//           Score Distribution
//         </Typography>
//         <Box sx={{ height: 300 }}>
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={scoreDistributionData}>
//               <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
//               <XAxis 
//                 dataKey="range" 
//                 tick={{ fill: theme.palette.text.secondary }}
//                 axisLine={{ stroke: theme.palette.divider }}
//               />
//               <YAxis 
//                 tick={{ fill: theme.palette.text.secondary }}
//                 axisLine={{ stroke: theme.palette.divider }}
//               />
//               <RechartsTooltip 
//                 contentStyle={{ 
//                   borderRadius: 8,
//                   border: `1px solid ${theme.palette.divider}`,
//                   backgroundColor: theme.palette.background.paper
//                 }}
//               />
//               <Bar 
//                 dataKey="count" 
//                 radius={[4, 4, 0, 0]}
//               >
//                 {scoreDistributionData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </Box>
//       </Paper>
//     </Grid>
//   </Grid>
// );

// const FacultyTab = ({ data, facultyPerformanceData,setFacultyPage, facultyDesignationData, facultyPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage, theme, colors }) => {
//   const facultyStats = data?.faculty || {};
  
//   return (
//     <Grid container spacing={3}>
//       {/* Faculty Overview Cards */}
//       <Grid item xs={12}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6} md={3}>
//             <Card sx={{ p: 2, borderRadius: 2 }}>
//               <Stack direction="row" alignItems="center" spacing={2}>
//                 <Avatar sx={{ bgcolor: `${colors[0]}20`, color: colors[0] }}>
//                   <Groups />
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h6" fontWeight="bold">
//                     {facultyStats.total || 0}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     Total Faculty
//                   </Typography>
//                 </Box>
//               </Stack>
//             </Card>
//           </Grid>
          
//           <Grid item xs={12} sm={6} md={3}>
//             <Card sx={{ p: 2, borderRadius: 2 }}>
//               <Stack direction="row" alignItems="center" spacing={2}>
//                 <Avatar sx={{ bgcolor: `${colors[1]}20`, color: colors[1] }}>
//                   <Quiz />
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h6" fontWeight="bold">
//                     {facultyStats.averageQuizzesPerFaculty || '0'}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     Avg Quizzes/Faculty
//                   </Typography>
//                 </Box>
//               </Stack>
//             </Card>
//           </Grid>
          
//           <Grid item xs={12} sm={6} md={3}>
//             <Card sx={{ p: 2, borderRadius: 2 }}>
//               <Stack direction="row" alignItems="center" spacing={2}>
//                 <Avatar sx={{ bgcolor: `${colors[2]}20`, color: colors[2] }}>
//                   <People />
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h6" fontWeight="bold">
//                     {data?.overview?.studentToFacultyRatio || '0'}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     Student:Faculty Ratio
//                   </Typography>
//                 </Box>
//               </Stack>
//             </Card>
//           </Grid>
          
//           <Grid item xs={12} sm={6} md={3}>
//             <Card sx={{ p: 2, borderRadius: 2 }}>
//               <Stack direction="row" alignItems="center" spacing={2}>
//                 <Avatar sx={{ bgcolor: `${colors[3]}20`, color: colors[3] }}>
//                   <Warning />
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h6" fontWeight="bold">
//                     {facultyStats.inactiveFaculties || 0}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     Inactive Faculty
//                   </Typography>
//                 </Box>
//               </Stack>
//             </Card>
//           </Grid>
//         </Grid>
//       </Grid>

//       {/* Faculty Performance Chart */}
//       <Grid item xs={12} md={8}>
//         <Paper sx={{ p: 3, borderRadius: 3 }}>
//           <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
//             <BarChartIcon sx={{ verticalAlign: 'middle', mr: 1, color: colors[0] }} />
//             Top Performing Faculty
//           </Typography>
//           <Box sx={{ height: 350 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={facultyPerformanceData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
//                 <XAxis 
//                   dataKey="name" 
//                   tick={{ fill: theme.palette.text.secondary }}
//                   axisLine={{ stroke: theme.palette.divider }}
//                 />
//                 <YAxis 
//                   tick={{ fill: theme.palette.text.secondary }}
//                   axisLine={{ stroke: theme.palette.divider }}
//                 />
//                 <RechartsTooltip 
//                   contentStyle={{ 
//                     borderRadius: 8,
//                     border: `1px solid ${theme.palette.divider}`,
//                     backgroundColor: theme.palette.background.paper
//                   }}
//                 />
//                 <Legend />
//                 <Bar dataKey="quizzes" fill={colors[0]} name="Quizzes Created" radius={[4, 4, 0, 0]} />
//                 <Bar dataKey="students" fill={colors[1]} name="Total Students" radius={[4, 4, 0, 0]} />
//                 <Bar dataKey="engagement" fill={colors[2]} name="Engagement Score" radius={[4, 4, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </Box>
//         </Paper>
//       </Grid>

//       {/* Faculty Designation Distribution */}
//       <Grid item xs={12} md={4}>
//         <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
//           <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
//             <DonutLarge sx={{ verticalAlign: 'middle', mr: 1, color: colors[1] }} />
//             Designation Distribution
//           </Typography>
//           <Box sx={{ height: 350 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <RechartsPieChart>
//                 <Pie
//                   data={facultyDesignationData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                   outerRadius={100}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {facultyDesignationData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.fill || colors[index % colors.length]} />
//                   ))}
//                 </Pie>
//                 <RechartsTooltip 
//                   formatter={(value) => [`${value} faculty`, 'Count']}
//                   contentStyle={{ 
//                     borderRadius: 8,
//                     border: `1px solid ${theme.palette.divider}`,
//                     backgroundColor: theme.palette.background.paper
//                   }}
//                 />
//               </RechartsPieChart>
//             </ResponsiveContainer>
//           </Box>
//         </Paper>
//       </Grid>

//       {/* Top Performers Table */}
//       <Grid item xs={12}>
//         <Paper sx={{ p: 3, borderRadius: 3 }}>
//           <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
//             <Typography variant="h6" fontWeight="bold">
//               <EmojiEvents sx={{ verticalAlign: 'middle', mr: 1, color: colors[2] }} />
//               Faculty Leaderboard
//             </Typography>
//             <Button size="small" startIcon={<Download />}>
//               Export
//             </Button>
//           </Stack>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell><b>Rank</b></TableCell>
//                   <TableCell><b>Faculty Name</b></TableCell>
//                   <TableCell><b>Designation</b></TableCell>
//                   <TableCell align="right"><b>Quizzes Created</b></TableCell>
//                   <TableCell align="right"><b>Total Students</b></TableCell>
//                   <TableCell align="right"><b>Engagement Score</b></TableCell>
//                   <TableCell><b>Status</b></TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {facultyStats.topPerformers?.slice(0, 10).map((faculty, index) => (
//                   <TableRow key={index} hover>
//                     <TableCell>
//                       <Chip 
//                         label={`#${index + 1}`}
//                         size="small"
//                         sx={{ 
//                           bgcolor: index < 3 ? `${colors[index]}20` : 'action.hover',
//                           color: index < 3 ? colors[index] : 'text.primary'
//                         }}
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Stack direction="row" alignItems="center" spacing={1}>
//                         <Avatar sx={{ width: 32, height: 32, bgcolor: colors[0] }}>
//                           {faculty.name?.charAt(0) || 'F'}
//                         </Avatar>
//                         <Typography variant="body2">{faculty.name || 'Unknown Faculty'}</Typography>
//                       </Stack>
//                     </TableCell>
//                     <TableCell>{faculty.designation || 'Not Specified'}</TableCell>
//                     <TableCell align="right">{faculty.quizCount || 0}</TableCell>
//                     <TableCell align="right">{faculty.totalStudents || 0}</TableCell>
//                     <TableCell align="right">
//                       <Box sx={{ 
//                         display: 'inline-flex',
//                         alignItems: 'center',
//                         bgcolor: `${colors[2]}20`,
//                         color: colors[2],
//                         px: 1,
//                         py: 0.5,
//                         borderRadius: 1
//                       }}>
//                         {faculty.engagementScore || 0}
//                       </Box>
//                     </TableCell>
//                     <TableCell>
//                       <Chip 
//                         label={faculty.quizCount > 0 ? "Active" : "Inactive"}
//                         size="small"
//                         color={faculty.quizCount > 0 ? "success" : "default"}
//                         variant="outlined"
//                       />
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={facultyStats.topPerformers?.length || 0}
//             rowsPerPage={rowsPerPage}
//             page={facultyPage}
//             onPageChange={(e, newPage) => handleChangePage(setFacultyPage, newPage)}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };

// const StudentsTab = ({ data, courseDistributionData, setStudentsPage,studentPerformanceData, studentsPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage, theme, colors }) => {
//   const studentStats = data?.students || {};
  
//   return (
//     <Grid container spacing={3}>
//       {/* Student Overview Cards */}
//       <Grid item xs={12}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6} md={3}>
//             <Card sx={{ p: 2, borderRadius: 2 }}>
//               <Stack direction="row" alignItems="center" spacing={2}>
//                 <Avatar sx={{ bgcolor: `${colors[0]}20`, color: colors[0] }}>
//                   <People />
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h6" fontWeight="bold">
//                     {data?.overview?.totalStudents || 0}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     Total Students
//                   </Typography>
//                 </Box>
//               </Stack>
//             </Card>
//           </Grid>
          
//           <Grid item xs={12} sm={6} md={3}>
//             <Card sx={{ p: 2, borderRadius: 2 }}>
//               <Stack direction="row" alignItems="center" spacing={2}>
//                 <Avatar sx={{ bgcolor: `${colors[1]}20`, color: colors[1] }}>
//                   <CheckCircle />
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h6" fontWeight="bold">
//                     {studentStats.activeStudents || 0}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     Active Students
//                   </Typography>
//                 </Box>
//               </Stack>
//             </Card>
//           </Grid>
          
//           <Grid item xs={12} sm={6} md={3}>
//             <Card sx={{ p: 2, borderRadius: 2 }}>
//               <Stack direction="row" alignItems="center" spacing={2}>
//                 <Avatar sx={{ bgcolor: `${colors[2]}20`, color: colors[2] }}>
//                   <Percent />
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h6" fontWeight="bold">
//                     {studentStats.participationRate || 0}%
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     Participation Rate
//                   </Typography>
//                 </Box>
//               </Stack>
//             </Card>
//           </Grid>
          
//           <Grid item xs={12} sm={6} md={3}>
//             <Card sx={{ p: 2, borderRadius: 2 }}>
//               <Stack direction="row" alignItems="center" spacing={2}>
//                 <Avatar sx={{ bgcolor: `${colors[3]}20`, color: colors[3] }}>
//                   <Timer />
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h6" fontWeight="bold">
//                     {studentStats.avgAttemptsPerStudent || '0'}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     Avg Attempts/Student
//                   </Typography>
//                 </Box>
//               </Stack>
//             </Card>
//           </Grid>
//         </Grid>
//       </Grid>

//       {/* Top Performing Students Chart */}
//       <Grid item xs={12} md={8}>
//         <Paper sx={{ p: 3, borderRadius: 3 }}>
//           <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
//             <TrendingUpIcon sx={{ verticalAlign: 'middle', mr: 1, color: colors[0] }} />
//             Top Performing Students
//           </Typography>
//           <Box sx={{ height: 350 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <ComposedChart data={studentPerformanceData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
//                 <XAxis 
//                   dataKey="name" 
//                   tick={{ fill: theme.palette.text.secondary }}
//                   axisLine={{ stroke: theme.palette.divider }}
//                 />
//                 <YAxis 
//                   yAxisId="left"
//                   tick={{ fill: theme.palette.text.secondary }}
//                   axisLine={{ stroke: theme.palette.divider }}
//                 />
//                 <YAxis 
//                   yAxisId="right"
//                   orientation="right"
//                   tick={{ fill: theme.palette.text.secondary }}
//                   axisLine={{ stroke: theme.palette.divider }}
//                 />
//                 <RechartsTooltip 
//                   contentStyle={{ 
//                     borderRadius: 8,
//                     border: `1px solid ${theme.palette.divider}`,
//                     backgroundColor: theme.palette.background.paper
//                   }}
//                 />
//                 <Legend />
//                 <Bar 
//                   yAxisId="left"
//                   dataKey="score" 
//                   fill={colors[0]} 
//                   name="Average Score"
//                   radius={[4, 4, 0, 0]}
//                 />
//                 <Line 
//                   yAxisId="right"
//                   type="monotone" 
//                   dataKey="attempts" 
//                   stroke={colors[1]} 
//                   strokeWidth={2}
//                   dot={{ r: 4 }}
//                   name="Attempts"
//                 />
//               </ComposedChart>
//             </ResponsiveContainer>
//           </Box>
//         </Paper>
//       </Grid>

//       {/* Course Distribution */}
//       <Grid item xs={12} md={4}>
//         <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
//           <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
//             <Category sx={{ verticalAlign: 'middle', mr: 1, color: colors[1] }} />
//             Students by Course
//           </Typography>
//           <Box sx={{ height: 350, overflowY: 'auto' }}>
//             <List>
//               {courseDistributionData.map((course, index) => (
//                 <ListItem key={index} divider={index < courseDistributionData.length - 1}>
//                   <ListItemAvatar>
//                     <Avatar sx={{ bgcolor: course.fill || colors[index % colors.length] }}>
//                       {course.name?.charAt(0) || 'C'}
//                     </Avatar>
//                   </ListItemAvatar>
//                   <Box sx={{ flex: 1 }}>
//                     <Typography variant="body2" fontWeight="medium">
//                       {course.name}
//                     </Typography>
//                     <Typography variant="caption" color="text.secondary">
//                       {course.value} students
//                     </Typography>
//                   </Box>
//                   <Box sx={{ 
//                     bgcolor: `${colors[0]}20`,
//                     color: colors[0],
//                     px: 1,
//                     py: 0.5,
//                     borderRadius: 1
//                   }}>
//                     <Typography variant="caption" fontWeight="bold">
//                       {((course.value / data?.overview?.totalStudents) * 100 || 0).toFixed(1)}%
//                     </Typography>
//                   </Box>
//                 </ListItem>
//               ))}
//             </List>
//           </Box>
//         </Paper>
//       </Grid>

//       {/* Student Leaderboard Table */}
//       <Grid item xs={12}>
//         <Paper sx={{ p: 3, borderRadius: 3 }}>
//           <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
//             <Typography variant="h6" fontWeight="bold">
//               <MilitaryTech sx={{ verticalAlign: 'middle', mr: 1, color: colors[2] }} />
//               Student Leaderboard
//             </Typography>
//             <Button size="small" startIcon={<Download />}>
//               Export
//             </Button>
//           </Stack>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell><b>Rank</b></TableCell>
//                   <TableCell><b>Student Name</b></TableCell>
//                   <TableCell><b>Student ID</b></TableCell>
//                   <TableCell><b>Course</b></TableCell>
//                   <TableCell align="right"><b>Avg Score</b></TableCell>
//                   <TableCell align="right"><b>Attempts</b></TableCell>
//                   <TableCell><b>Performance</b></TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {studentStats.topPerformers?.slice(studentsPage * rowsPerPage, studentsPage * rowsPerPage + rowsPerPage).map((student, index) => (
//                   <TableRow key={index} hover>
//                     <TableCell>
//                       <Chip 
//                         label={`#${index + 1 + (studentsPage * rowsPerPage)}`}
//                         size="small"
//                         sx={{ 
//                           bgcolor: index < 3 ? `${colors[index]}20` : 'action.hover',
//                           color: index < 3 ? colors[index] : 'text.primary'
//                         }}
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Stack direction="row" alignItems="center" spacing={1}>
//                         <Avatar sx={{ width: 32, height: 32, bgcolor: colors[0] }}>
//                           {student.name?.charAt(0) || 'S'}
//                         </Avatar>
//                         <Typography variant="body2">{student.name || 'Unknown Student'}</Typography>
//                       </Stack>
//                     </TableCell>
//                     <TableCell>
//                       <Typography variant="body2" color="text.secondary">
//                         {student.studentId || 'N/A'}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Chip 
//                         label={student.course || 'Unknown'}
//                         size="small"
//                         variant="outlined"
//                       />
//                     </TableCell>
//                     <TableCell align="right">
//                       <Typography variant="body2" fontWeight="bold">
//                         {(student.avgScore || 0).toFixed(1)}
//                       </Typography>
//                     </TableCell>
//                     <TableCell align="right">
//                       <Box sx={{ 
//                         display: 'inline-flex',
//                         alignItems: 'center',
//                         bgcolor: `${colors[1]}20`,
//                         color: colors[1],
//                         px: 1,
//                         py: 0.5,
//                         borderRadius: 1
//                       }}>
//                         {student.attemptCount || 0}
//                       </Box>
//                     </TableCell>
//                     <TableCell>
//                       <LinearProgress 
//                         variant="determinate" 
//                         value={student.avgScore || 0}
//                         sx={{ 
//                           height: 6,
//                           borderRadius: 3,
//                           backgroundColor: `${colors[0]}20`,
//                           '& .MuiLinearProgress-bar': {
//                             background: `linear-gradient(90deg, ${colors[0]}, ${colors[0]}80)`,
//                             borderRadius: 3
//                           }
//                         }}
//                       />
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={studentStats.topPerformers?.length || 0}
//             rowsPerPage={rowsPerPage}
//             page={studentsPage}
//             onPageChange={(e, newPage) => handleChangePage(setStudentsPage, newPage)}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };

// const QuizzesTab = ({ data, quizPerformanceData, quizzesPage,setQuizzesPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage, theme, colors }) => {
//   const quizStats = data?.quizzes || {};
  
//   return (
//     <Grid container spacing={3}>
//       {/* Quiz Overview Cards */}
//       <Grid item xs={12}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6} md={3}>
//             <Card sx={{ p: 2, borderRadius: 2 }}>
//               <Stack direction="row" alignItems="center" spacing={2}>
//                 <Avatar sx={{ bgcolor: `${colors[0]}20`, color: colors[0] }}>
//                   <Quiz />
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h6" fontWeight="bold">
//                     {data?.overview?.totalQuizzes || 0}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     Total Quizzes
//                   </Typography>
//                 </Box>
//               </Stack>
//             </Card>
//           </Grid>
          
//           <Grid item xs={12} sm={6} md={3}>
//             <Card sx={{ p: 2, borderRadius: 2 }}>
//               <Stack direction="row" alignItems="center" spacing={2}>
//                 <Avatar sx={{ bgcolor: `${colors[1]}20`, color: colors[1] }}>
//                   <PlayCircle />
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h6" fontWeight="bold">
//                     {quizStats.activeQuizzes || 0}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     Active Quizzes
//                   </Typography>
//                 </Box>
//               </Stack>
//             </Card>
//           </Grid>
          
//           <Grid item xs={12} sm={6} md={3}>
//             <Card sx={{ p: 2, borderRadius: 2 }}>
//               <Stack direction="row" alignItems="center" spacing={2}>
//                 <Avatar sx={{ bgcolor: `${colors[2]}20`, color: colors[2] }}>
//                   <CheckCircle />
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h6" fontWeight="bold">
//                     {quizStats.avgCompletionRate || 0}%
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     Avg Completion Rate
//                   </Typography>
//                 </Box>
//               </Stack>
//             </Card>
//           </Grid>
          
//           <Grid item xs={12} sm={6} md={3}>
//             <Card sx={{ p: 2, borderRadius: 2 }}>
//               <Stack direction="row" alignItems="center" spacing={2}>
//                 <Avatar sx={{ bgcolor: `${colors[3]}20`, color: colors[3] }}>
//                   <SpeedIcon />
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h6" fontWeight="bold">
//                     {quizStats.avgDifficultyIndex || '0.0'}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     Avg Difficulty Index
//                   </Typography>
//                 </Box>
//               </Stack>
//             </Card>
//           </Grid>
//         </Grid>
//       </Grid>

//       {/* Quiz Performance Chart */}
//       <Grid item xs={12} md={8}>
//         <Paper sx={{ p: 3, borderRadius: 3 }}>
//           <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
//             <BarChartIcon sx={{ verticalAlign: 'middle', mr: 1, color: colors[0] }} />
//             Top Quizzes by Participation
//           </Typography>
//           <Box sx={{ height: 350 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <ComposedChart data={quizPerformanceData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
//                 <XAxis 
//                   dataKey="name" 
//                   tick={{ fill: theme.palette.text.secondary }}
//                   axisLine={{ stroke: theme.palette.divider }}
//                 />
//                 <YAxis 
//                   yAxisId="left"
//                   tick={{ fill: theme.palette.text.secondary }}
//                   axisLine={{ stroke: theme.palette.divider }}
//                 />
//                 <YAxis 
//                   yAxisId="right"
//                   orientation="right"
//                   tick={{ fill: theme.palette.text.secondary }}
//                   axisLine={{ stroke: theme.palette.divider }}
//                 />
//                 <RechartsTooltip 
//                   contentStyle={{ 
//                     borderRadius: 8,
//                     border: `1px solid ${theme.palette.divider}`,
//                     backgroundColor: theme.palette.background.paper
//                   }}
//                 />
//                 <Legend />
//                 <Bar 
//                   yAxisId="left"
//                   dataKey="attempts" 
//                   fill={colors[0]} 
//                   name="Attempts"
//                   radius={[4, 4, 0, 0]}
//                 />
//                 <Line 
//                   yAxisId="right"
//                   type="monotone" 
//                   dataKey="completion" 
//                   stroke={colors[1]} 
//                   strokeWidth={2}
//                   dot={{ r: 4 }}
//                   name="Completion %"
//                 />
//                 <Line 
//                   yAxisId="right"
//                   type="monotone" 
//                   dataKey="score" 
//                   stroke={colors[2]} 
//                   strokeWidth={2}
//                   strokeDasharray="3 3"
//                   dot={false}
//                   name="Avg Score"
//                 />
//               </ComposedChart>
//             </ResponsiveContainer>
//           </Box>
//         </Paper>
//       </Grid>

//       {/* Quiz Difficulty Distribution */}
//       <Grid item xs={12} md={4}>
//         <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
//           <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
//             <PsychologyIcon sx={{ verticalAlign: 'middle', mr: 1, color: colors[1] }} />
//             Difficulty Analysis
//           </Typography>
//           <Box sx={{ height: 350, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//             <Stack spacing={3} sx={{ p: 2 }}>
//               <Box>
//                 <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
//                   <Typography variant="body2" color="text.secondary">
//                     Easy (0-0.3)
//                   </Typography>
//                   <Typography variant="body2" fontWeight="bold">
//                     {Math.round((quizStats.avgDifficultyIndex || 0) * 33)}%
//                   </Typography>
//                 </Stack>
//                 <LinearProgress 
//                   variant="determinate" 
//                   value={(quizStats.avgDifficultyIndex || 0) * 33}
//                   sx={{ 
//                     height: 8,
//                     borderRadius: 4,
//                     backgroundColor: `${colors[0]}20`,
//                     '& .MuiLinearProgress-bar': {
//                       backgroundColor: colors[0],
//                       borderRadius: 4
//                     }
//                   }}
//                 />
//               </Box>
              
//               <Box>
//                 <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
//                   <Typography variant="body2" color="text.secondary">
//                     Moderate (0.3-0.7)
//                   </Typography>
//                   <Typography variant="body2" fontWeight="bold">
//                     {Math.round((quizStats.avgDifficultyIndex || 0) * 34)}%
//                   </Typography>
//                 </Stack>
//                 <LinearProgress 
//                   variant="determinate" 
//                   value={(quizStats.avgDifficultyIndex || 0) * 34}
//                   sx={{ 
//                     height: 8,
//                     borderRadius: 4,
//                     backgroundColor: `${colors[1]}20`,
//                     '& .MuiLinearProgress-bar': {
//                       backgroundColor: colors[1],
//                       borderRadius: 4
//                     }
//                   }}
//                 />
//               </Box>
              
//               <Box>
//                 <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
//                   <Typography variant="body2" color="text.secondary">
//                     Difficult (0.7-1.0)
//                   </Typography>
//                   <Typography variant="body2" fontWeight="bold">
//                     {Math.round((quizStats.avgDifficultyIndex || 0) * 33)}%
//                   </Typography>
//                 </Stack>
//                 <LinearProgress 
//                   variant="determinate" 
//                   value={(quizStats.avgDifficultyIndex || 0) * 33}
//                   sx={{ 
//                     height: 8,
//                     borderRadius: 4,
//                     backgroundColor: `${colors[2]}20`,
//                     '& .MuiLinearProgress-bar': {
//                       backgroundColor: colors[2],
//                       borderRadius: 4
//                     }
//                   }}
//                 />
//               </Box>
//             </Stack>
            
//             <Box sx={{ mt: 4, p: 2, bgcolor: `${colors[3]}10`, borderRadius: 2 }}>
//               <Typography variant="body2" sx={{ mb: 1 }}>
//                 <strong>Insight:</strong> Average quiz difficulty is 
//                 <Box component="span" sx={{ color: colors[1], fontWeight: 'bold', mx: 0.5 }}>
//                   {(quizStats.avgDifficultyIndex || 0).toFixed(2)}
//                 </Box>
//                 indicating
//                 {(quizStats.avgDifficultyIndex || 0) > 0.7 ? ' challenging content' : 
//                  (quizStats.avgDifficultyIndex || 0) < 0.3 ? ' beginner-friendly content' : 
//                  ' well-balanced difficulty'}
//               </Typography>
//             </Box>
//           </Box>
//         </Paper>
//       </Grid>

//       {/* Quiz Details Table */}
//       <Grid item xs={12}>
//         <Paper sx={{ p: 3, borderRadius: 3 }}>
//           <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
//             <Typography variant="h6" fontWeight="bold">
//               <Assessment sx={{ verticalAlign: 'middle', mr: 1, color: colors[2] }} />
//               Quiz Analytics Details
//             </Typography>
//             <Button size="small" startIcon={<Download />}>
//               Export
//             </Button>
//           </Stack>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell><b>Quiz Title</b></TableCell>
//                   <TableCell><b>Subject</b></TableCell>
//                   <TableCell><b>Faculty</b></TableCell>
//                   <TableCell align="right"><b>Attempts</b></TableCell>
//                   <TableCell align="right"><b>Completion</b></TableCell>
//                   <TableCell align="right"><b>Avg Score</b></TableCell>
//                   <TableCell align="right"><b>Difficulty</b></TableCell>
//                   <TableCell><b>Status</b></TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {quizStats.topQuizzesByParticipation?.slice(quizzesPage * rowsPerPage, quizzesPage * rowsPerPage + rowsPerPage).map((quiz, index) => (
//                   <TableRow key={index} hover>
//                     <TableCell>
//                       <Typography variant="body2" fontWeight="medium">
//                         {quiz.title || 'Untitled Quiz'}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Chip 
//                         label={quiz.subject || 'General'}
//                         size="small"
//                         variant="outlined"
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Typography variant="body2" color="text.secondary">
//                         {quiz.facultyName || 'Unknown'}
//                       </Typography>
//                     </TableCell>
//                     <TableCell align="right">
//                       <Box sx={{ 
//                         display: 'inline-flex',
//                         alignItems: 'center',
//                         bgcolor: `${colors[0]}20`,
//                         color: colors[0],
//                         px: 1,
//                         py: 0.5,
//                         borderRadius: 1
//                       }}>
//                         {quiz.attemptCount || 0}
//                       </Box>
//                     </TableCell>
//                     <TableCell align="right">
//                       <Typography variant="body2" fontWeight="bold" color={quiz.completion > 70 ? 'success.main' : quiz.completion > 40 ? 'warning.main' : 'error.main'}>
//                         {quiz.completion?.toFixed(1) || 0}%
//                       </Typography>
//                     </TableCell>
//                     <TableCell align="right">
//                       <Typography variant="body2" fontWeight="bold">
//                         {(quiz.avgScore || 0).toFixed(1)}
//                       </Typography>
//                     </TableCell>
//                     <TableCell align="right">
//                       <Rating 
//                         value={Math.round((quiz.difficultyIndex || 0) * 5)}
//                         max={5}
//                         size="small"
//                         readOnly
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Chip 
//                         label={quiz.attemptCount > 0 ? "Active" : "New"}
//                         size="small"
//                         color={quiz.attemptCount > 0 ? "success" : "default"}
//                         variant="outlined"
//                       />
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={quizStats.topQuizzesByParticipation?.length || 0}
//             rowsPerPage={rowsPerPage}
//             page={quizzesPage}
//             onPageChange={(e, newPage) => handleChangePage(setQuizzesPage, newPage)}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };

// const PerformanceTab = ({ data, performanceRadarData, scoreDistributionData, theme, colors }) => {
//   const performanceStats = data?.performance || {};
  
//   return (
//     <Grid container spacing={3}>
//       {/* Performance Overview Cards */}
//       <Grid item xs={12}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6} md={3}>
//             <Card sx={{ p: 2, borderRadius: 2 }}>
//               <Stack direction="row" alignItems="center" spacing={2}>
//                 <Avatar sx={{ bgcolor: `${colors[0]}20`, color: colors[0] }}>
//                   <Score />
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h6" fontWeight="bold">
//                     {performanceStats.overallAvgScore || 0}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     Overall Avg Score
//                   </Typography>
//                 </Box>
//               </Stack>
//             </Card>
//           </Grid>
          
//           <Grid item xs={12} sm={6} md={3}>
//             <Card sx={{ p: 2, borderRadius: 2 }}>
//               <Stack direction="row" alignItems="center" spacing={2}>
//                 <Avatar sx={{ bgcolor: `${colors[1]}20`, color: colors[1] }}>
//                   <Percent />
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h6" fontWeight="bold">
//                     {performanceStats.overallPassRate || 0}%
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     Overall Pass Rate
//                   </Typography>
//                 </Box>
//               </Stack>
//             </Card>
//           </Grid>
          
//           <Grid item xs={12} sm={6} md={3}>
//             <Card sx={{ p: 2, borderRadius: 2 }}>
//               <Stack direction="row" alignItems="center" spacing={2}>
//                 <Avatar sx={{ bgcolor: `${colors[2]}20`, color: colors[2] }}>
//                   <AccessTime />
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h6" fontWeight="bold">
//                     {performanceStats.avgTimePerQuestion || 0}m
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     Avg Time/Question
//                   </Typography>
//                 </Box>
//               </Stack>
//             </Card>
//           </Grid>
          
//           <Grid item xs={12} sm={6} md={3}>
//             <Card sx={{ p: 2, borderRadius: 2 }}>
//               <Stack direction="row" alignItems="center" spacing={2}>
//                 <Avatar sx={{ bgcolor: `${colors[3]}20`, color: colors[3] }}>
//                   <People />
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h6" fontWeight="bold">
//                     {performanceStats.uniqueParticipants || 0}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     Unique Participants
//                   </Typography>
//                 </Box>
//               </Stack>
//             </Card>
//           </Grid>
//         </Grid>
//       </Grid>

//       {/* Performance Radar Chart */}
//       <Grid item xs={12} md={6}>
//         <Paper sx={{ p: 3, borderRadius: 3 }}>
//           <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
//             <RadarChart sx={{ verticalAlign: 'middle', mr: 1, color: colors[0] }} />
//             Performance Metrics Radar
//           </Typography>
//           <Box sx={{ height: 400 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <RadarChart data={performanceRadarData}>
//                 <PolarGrid stroke={theme.palette.divider} />
//                 <PolarAngleAxis 
//                   dataKey="subject" 
//                   tick={{ fill: theme.palette.text.secondary }}
//                 />
//                 <PolarRadiusAxis 
//                   angle={30} 
//                   domain={[0, 100]}
//                   tick={{ fill: theme.palette.text.secondary }}
//                 />
//                 <Radar
//                   name="Performance"
//                   dataKey="value"
//                   stroke={colors[0]}
//                   fill={colors[0]}
//                   fillOpacity={0.6}
//                 />
//                 <RechartsTooltip 
//                   contentStyle={{ 
//                     borderRadius: 8,
//                     border: `1px solid ${theme.palette.divider}`,
//                     backgroundColor: theme.palette.background.paper
//                   }}
//                 />
//                 <Legend />
//               </RadarChart>
//             </ResponsiveContainer>
//           </Box>
//         </Paper>
//       </Grid>

//       {/* Score Distribution Chart */}
//       <Grid item xs={12} md={6}>
//         <Paper sx={{ p: 3, borderRadius: 3 }}>
//           <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
//             <PieChartIcon sx={{ verticalAlign: 'middle', mr: 1, color: colors[1] }} />
//             Score Distribution
//           </Typography>
//           <Box sx={{ height: 400 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={scoreDistributionData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
//                 <XAxis 
//                   dataKey="range" 
//                   tick={{ fill: theme.palette.text.secondary }}
//                   axisLine={{ stroke: theme.palette.divider }}
//                 />
//                 <YAxis 
//                   tick={{ fill: theme.palette.text.secondary }}
//                   axisLine={{ stroke: theme.palette.divider }}
//                 />
//                 <RechartsTooltip 
//                   contentStyle={{ 
//                     borderRadius: 8,
//                     border: `1px solid ${theme.palette.divider}`,
//                     backgroundColor: theme.palette.background.paper
//                   }}
//                   formatter={(value) => [`${value} students`, 'Count']}
//                 />
//                 <Bar 
//                   dataKey="count" 
//                   radius={[4, 4, 0, 0]}
//                 >
//                   {scoreDistributionData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Bar>
//               </BarChart>
//             </ResponsiveContainer>
//           </Box>
//         </Paper>
//       </Grid>

//       {/* Performance Insights */}
//       <Grid item xs={12}>
//         <Paper sx={{ p: 3, borderRadius: 3 }}>
//           <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
//             <Insights sx={{ verticalAlign: 'middle', mr: 1, color: colors[2] }} />
//             Performance Insights
//           </Typography>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <Box sx={{ p: 2, bgcolor: `${colors[0]}10`, borderRadius: 2 }}>
//                 <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1, color: colors[0] }}>
//                   <TrendingUpIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
//                   Strengths
//                 </Typography>
//                 <List dense>
//                   <ListItem sx={{ px: 0 }}>
//                     <ListItemIcon sx={{ minWidth: 36 }}>
//                       <CheckCircle sx={{ color: 'success.main' }} />
//                     </ListItemIcon>
//                     <ListItemText 
//                       primary="High Engagement Rate"
//                       secondary={`${data?.kpis?.studentEngagementRate || 0}% of students actively participating`}
//                     />
//                   </ListItem>
//                   <ListItem sx={{ px: 0 }}>
//                     <ListItemIcon sx={{ minWidth: 36 }}>
//                       <CheckCircle sx={{ color: 'success.main' }} />
//                     </ListItemIcon>
//                     <ListItemText 
//                       primary="Good Pass Rate"
//                       secondary={`${performanceStats.overallPassRate || 0}% overall pass rate`}
//                     />
//                   </ListItem>
//                 </List>
//               </Box>
//             </Grid>
            
//             <Grid item xs={12} md={6}>
//               <Box sx={{ p: 2, bgcolor: `${colors[1]}10`, borderRadius: 2 }}>
//                 <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1, color: colors[1] }}>
//                   <Warning fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
//                   Areas for Improvement
//                 </Typography>
//                 <List dense>
//                   <ListItem sx={{ px: 0 }}>
//                     <ListItemIcon sx={{ minWidth: 36 }}>
//                       <Warning sx={{ color: 'warning.main' }} />
//                     </ListItemIcon>
//                     <ListItemText 
//                       primary="Score Distribution"
//                       secondary={`${scoreDistributionData[4]?.count || 0} students scored below 40%`}
//                     />
//                   </ListItem>
//                   <ListItem sx={{ px: 0 }}>
//                     <ListItemIcon sx={{ minWidth: 36 }}>
//                       <Warning sx={{ color: 'warning.main' }} />
//                     </ListItemIcon>
//                     <ListItemText 
//                       primary="Time Management"
//                       secondary={`Average ${performanceStats.avgTimePerQuestion || 0} minutes per question`}
//                     />
//                   </ListItem>
//                 </List>
//               </Box>
//             </Grid>
//           </Grid>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };

// const TrendsTab = ({ data, chartData, hourlyData, theme, colors }) => {
//   const trends = data?.trends || {};
  
//   return (
//     <Grid container spacing={3}>
//       {/* Time Series Trends */}
//       <Grid item xs={12}>
//         <Paper sx={{ p: 3, borderRadius: 3 }}>
//           <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
//             <TimelineChart sx={{ verticalAlign: 'middle', mr: 1, color: colors[0] }} />
//             Monthly Trends
//           </Typography>
//           <Box sx={{ height: 400 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={chartData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
//                 <XAxis 
//                   dataKey="name" 
//                   tick={{ fill: theme.palette.text.secondary }}
//                   axisLine={{ stroke: theme.palette.divider }}
//                 />
//                 <YAxis 
//                   tick={{ fill: theme.palette.text.secondary }}
//                   axisLine={{ stroke: theme.palette.divider }}
//                 />
//                 <RechartsTooltip 
//                   contentStyle={{ 
//                     borderRadius: 8,
//                     border: `1px solid ${theme.palette.divider}`,
//                     backgroundColor: theme.palette.background.paper
//                   }}
//                 />
//                 <Area 
//                   type="monotone" 
//                   dataKey="attempts" 
//                   stackId="1"
//                   stroke={colors[0]}
//                   fill={colors[0]}
//                   fillOpacity={0.3}
//                   name="Quiz Attempts"
//                 />
//                 <Area 
//                   type="monotone" 
//                   dataKey="students" 
//                   stackId="2"
//                   stroke={colors[1]}
//                   fill={colors[1]}
//                   fillOpacity={0.3}
//                   name="Unique Students"
//                 />
//                 <Area 
//                   type="monotone" 
//                   dataKey="avgScore" 
//                   stackId="3"
//                   stroke={colors[2]}
//                   fill={colors[2]}
//                   fillOpacity={0.3}
//                   name="Average Score"
//                 />
//                 <Legend />
//               </AreaChart>
//             </ResponsiveContainer>
//           </Box>
//         </Paper>
//       </Grid>

//       {/* Peak Activity Hours */}
//       <Grid item xs={12} md={6}>
//         <Paper sx={{ p: 3, borderRadius: 3 }}>
//           <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
//             <AccessTime sx={{ verticalAlign: 'middle', mr: 1, color: colors[1] }} />
//             Peak Activity Hours
//           </Typography>
//           <Box sx={{ height: 300 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={hourlyData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
//                 <XAxis 
//                   dataKey="hour" 
//                   tick={{ fill: theme.palette.text.secondary }}
//                   axisLine={{ stroke: theme.palette.divider }}
//                 />
//                 <YAxis 
//                   tick={{ fill: theme.palette.text.secondary }}
//                   axisLine={{ stroke: theme.palette.divider }}
//                 />
//                 <RechartsTooltip 
//                   contentStyle={{ 
//                     borderRadius: 8,
//                     border: `1px solid ${theme.palette.divider}`,
//                     backgroundColor: theme.palette.background.paper
//                   }}
//                   formatter={(value) => [`${value} attempts`, 'Count']}
//                 />
//                 <Bar 
//                   dataKey="attempts" 
//                   fill={colors[1]}
//                   radius={[4, 4, 0, 0]}
//                   name="Attempts"
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </Box>
//         </Paper>
//       </Grid>

//       {/* Growth Indicators */}
//       <Grid item xs={12} md={6}>
//         <Paper sx={{ p: 3, borderRadius: 3 }}>
//           <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
//             <TrendingUpIcon sx={{ verticalAlign: 'middle', mr: 1, color: colors[2] }} />
//             Growth Indicators
//           </Typography>
//           <Box sx={{ height: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//             <Stack spacing={3} sx={{ p: 2 }}>
//               <Box>
//                 <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
//                   <Typography variant="body2" color="text.secondary">
//                     Quiz Creation Growth
//                   </Typography>
//                   <Typography variant="body2" fontWeight="bold" color={data?.overview?.quizGrowthRate > 0 ? 'success.main' : 'error.main'}>
//                     {data?.overview?.quizGrowthRate > 0 ? '+' : ''}{data?.overview?.quizGrowthRate || 0}%
//                   </Typography>
//                 </Stack>
//                 <LinearProgress 
//                   variant="determinate" 
//                   value={Math.abs(data?.overview?.quizGrowthRate || 0)}
//                   sx={{ 
//                     height: 8,
//                     borderRadius: 4,
//                     backgroundColor: `${data?.overview?.quizGrowthRate > 0 ? colors[0] : colors[3]}20`,
//                     '& .MuiLinearProgress-bar': {
//                       backgroundColor: data?.overview?.quizGrowthRate > 0 ? colors[0] : colors[3],
//                       borderRadius: 4
//                     }
//                   }}
//                 />
//               </Box>
              
//               <Box>
//                 <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
//                   <Typography variant="body2" color="text.secondary">
//                     Student Participation
//                   </Typography>
//                   <Typography variant="body2" fontWeight="bold" color="success.main">
//                     +{data?.students?.participationRate || 0}%
//                   </Typography>
//                 </Stack>
//                 <LinearProgress 
//                   variant="determinate" 
//                   value={data?.students?.participationRate || 0}
//                   sx={{ 
//                     height: 8,
//                     borderRadius: 4,
//                     backgroundColor: `${colors[1]}20`,
//                     '& .MuiLinearProgress-bar': {
//                       backgroundColor: colors[1],
//                       borderRadius: 4
//                     }
//                   }}
//                 />
//               </Box>
              
//               <Box>
//                 <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
//                   <Typography variant="body2" color="text.secondary">
//                     Faculty Engagement
//                   </Typography>
//                   <Typography variant="body2" fontWeight="bold" color="success.main">
//                     +{Math.round((data?.kpis?.facultyProductivity || 0) * 10)}%
//                   </Typography>
//                 </Stack>
//                 <LinearProgress 
//                   variant="determinate" 
//                   value={(data?.kpis?.facultyProductivity || 0) * 10}
//                   sx={{ 
//                     height: 8,
//                     borderRadius: 4,
//                     backgroundColor: `${colors[2]}20`,
//                     '& .MuiLinearProgress-bar': {
//                       backgroundColor: colors[2],
//                       borderRadius: 4
//                     }
//                   }}
//                 />
//               </Box>
//             </Stack>
//           </Box>
//         </Paper>
//       </Grid>

//       {/* Trend Analysis */}
//       <Grid item xs={12}>
//         <Paper sx={{ p: 3, borderRadius: 3 }}>
//           <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
//             <Analytics sx={{ verticalAlign: 'middle', mr: 1, color: colors[3] }} />
//             Trend Analysis
//           </Typography>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={4}>
//               <Card sx={{ p: 2, borderRadius: 2 }}>
//                 <Stack direction="row" alignItems="center" spacing={2}>
//                   <Avatar sx={{ bgcolor: `${colors[0]}20`, color: colors[0] }}>
//                     <CalendarToday />
//                   </Avatar>
//                   <Box>
//                     <Typography variant="body2" fontWeight="medium">
//                       Busiest Day
//                     </Typography>
//                     <Typography variant="caption" color="text.secondary">
//                       {trends.daily?.[0]?._id?.date || 'N/A'}
//                     </Typography>
//                     <Typography variant="body2" fontWeight="bold" color={colors[0]}>
//                       {trends.daily?.[0]?.attempts || 0} attempts
//                     </Typography>
//                   </Box>
//                 </Stack>
//               </Card>
//             </Grid>
            
//             <Grid item xs={12} md={4}>
//               <Card sx={{ p: 2, borderRadius: 2 }}>
//                 <Stack direction="row" alignItems="center" spacing={2}>
//                   <Avatar sx={{ bgcolor: `${colors[1]}20`, color: colors[1] }}>
//                     <AccessTime />
//                   </Avatar>
//                   <Box>
//                     <Typography variant="body2" fontWeight="medium">
//                       Peak Hour
//                     </Typography>
//                     <Typography variant="caption" color="text.secondary">
//                       {hourlyData.length > 0 ? 
//                         hourlyData.reduce((max, item) => item.attempts > max.attempts ? item : max).hour : 
//                         'N/A'}
//                     </Typography>
//                     <Typography variant="body2" fontWeight="bold" color={colors[1]}>
//                       {hourlyData.length > 0 ? 
//                         hourlyData.reduce((max, item) => item.attempts > max.attempts ? item : max).attempts : 
//                         0} attempts
//                     </Typography>
//                   </Box>
//                 </Stack>
//               </Card>
//             </Grid>
            
//             <Grid item xs={12} md={4}>
//               <Card sx={{ p: 2, borderRadius: 2 }}>
//                 <Stack direction="row" alignItems="center" spacing={2}>
//                   <Avatar sx={{ bgcolor: `${colors[2]}20`, color: colors[2] }}>
//                     <TrendingUp />
//                   </Avatar>
//                   <Box>
//                     <Typography variant="body2" fontWeight="medium">
//                       Growth Trend
//                     </Typography>
//                     <Typography variant="caption" color="text.secondary">
//                       Last 30 days
//                     </Typography>
//                     <Typography variant="body2" fontWeight="bold" color={chartData[chartData.length - 1]?.growth > 0 ? 'success.main' : 'error.main'}>
//                       {chartData[chartData.length - 1]?.growth > 0 ? '+' : ''}
//                       {chartData[chartData.length - 1]?.growth?.toFixed(1) || 0}%
//                     </Typography>
//                   </Box>
//                 </Stack>
//               </Card>
//             </Grid>
//           </Grid>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };

// const InsightsTab = ({ data, theme }) => {
//   const insights = data?.insights || {};
  
//   return (
//     <Grid container spacing={3}>
//       {/* AI Insights Summary */}
//       <Grid item xs={12}>
//         <Paper sx={{ p: 3, borderRadius: 3 }}>
//           <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
//             <Avatar sx={{ bgcolor: 'primary.main' }}>
//               <Insights />
//             </Avatar>
//             <Box>
//               <Typography variant="h6" fontWeight="bold">
//                 AI-Powered Insights
//               </Typography>
//               <Typography variant="caption" color="text.secondary">
//                 Automated analysis based on performance data
//               </Typography>
//             </Box>
//           </Stack>
          
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <Card sx={{ p: 3, borderRadius: 2, bgcolor: 'primary.50' }}>
//                 <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary.main">
//                   <Whatshot sx={{ verticalAlign: 'middle', mr: 1 }} />
//                   Key Findings
//                 </Typography>
//                 <List dense>
//                   <ListItem sx={{ px: 0 }}>
//                     <ListItemIcon sx={{ minWidth: 36 }}>
//                       <CheckCircle color="success" />
//                     </ListItemIcon>
//                     <ListItemText 
//                       primary="Strong Engagement"
//                       secondary={`${data?.kpis?.studentEngagementRate || 0}% engagement rate exceeds target`}
//                     />
//                   </ListItem>
//                   <ListItem sx={{ px: 0 }}>
//                     <ListItemIcon sx={{ minWidth: 36 }}>
//                       <TrendingUp color="success" />
//                     </ListItemIcon>
//                     <ListItemText 
//                       primary="Positive Growth"
//                       secondary={`Quiz creation growing at ${data?.overview?.quizGrowthRate || 0}% rate`}
//                     />
//                   </ListItem>
//                   <ListItem sx={{ px: 0 }}>
//                     <ListItemIcon sx={{ minWidth: 36 }}>
//                       <Warning color="warning" />
//                     </ListItemIcon>
//                     <ListItemText 
//                       primary="Attention Needed"
//                       secondary={`${data?.performance?.scoreDistribution?.poor || 0} students at risk of failing`}
//                     />
//                   </ListItem>
//                 </List>
//               </Card>
//             </Grid>
            
//             <Grid item xs={12} md={6}>
//               <Card sx={{ p: 3, borderRadius: 2, bgcolor: 'secondary.50' }}>
//                 <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="secondary.main">
//                   <Psychology sx={{ verticalAlign: 'middle', mr: 1 }} />
//                   Predictive Analytics
//                 </Typography>
//                 <List dense>
//                   <ListItem sx={{ px: 0 }}>
//                     <ListItemIcon sx={{ minWidth: 36 }}>
//                       <Timeline color="info" />
//                     </ListItemIcon>
//                     <ListItemText 
//                       primary="Growth Forecast"
//                       secondary="Expected 15-20% growth in participation next quarter"
//                     />
//                   </ListItem>
//                   <ListItem sx={{ px: 0 }}>
//                     <ListItemIcon sx={{ minWidth: 36 }}>
//                       <People color="info" />
//                     </ListItemIcon>
//                     <ListItemText 
//                       primary="Student Retention"
//                       secondary="95% retention rate predicted based on current engagement"
//                     />
//                   </ListItem>
//                   <ListItem sx={{ px: 0 }}>
//                     <ListItemIcon sx={{ minWidth: 36 }}>
//                       <School color="info" />
//                     </ListItemIcon>
//                     <ListItemText 
//                       primary="Faculty Impact"
//                       secondary="Top 3 faculty account for 40% of all quiz creation"
//                     />
//                   </ListItem>
//                 </List>
//               </Card>
//             </Grid>
//           </Grid>
//         </Paper>
//       </Grid>

//       {/* Suggested Improvements */}
//       <Grid item xs={12} md={6}>
//         <Paper sx={{ p: 3, borderRadius: 3 }}>
//           <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
//             <AutoGraph sx={{ verticalAlign: 'middle', mr: 1 }} />
//             Suggested Improvements
//           </Typography>
//           <Accordion defaultExpanded>
//             <AccordionSummary expandIcon={<ExpandMore />}>
//               <Typography fontWeight="medium">Teaching Strategies</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <List dense>
//                 {insights.suggestedImprovements?.map((improvement, index) => (
//                   <ListItem key={index} sx={{ px: 0 }}>
//                     <ListItemIcon sx={{ minWidth: 36 }}>
//                       <CheckCircle sx={{ color: 'primary.main' }} />
//                     </ListItemIcon>
//                     <ListItemText primary={improvement} />
//                   </ListItem>
//                 ))}
//                 <ListItem sx={{ px: 0 }}>
//                   <ListItemIcon sx={{ minWidth: 36 }}>
//                     <CheckCircle sx={{ color: 'primary.main' }} />
//                   </ListItemIcon>
//                   <ListItemText primary="Implement adaptive learning paths for struggling students" />
//                 </ListItem>
//                 <ListItem sx={{ px: 0 }}>
//                   <ListItemIcon sx={{ minWidth: 36 }}>
//                     <CheckCircle sx={{ color: 'primary.main' }} />
//                   </ListItemIcon>
//                   <ListItemText primary="Introduce peer-to-peer learning sessions" />
//                 </ListItem>
//               </List>
//             </AccordionDetails>
//           </Accordion>
          
//           <Accordion>
//             <AccordionSummary expandIcon={<ExpandMore />}>
//               <Typography fontWeight="medium">Resource Allocation</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <List dense>
//                 <ListItem sx={{ px: 0 }}>
//                   <ListItemIcon sx={{ minWidth: 36 }}>
//                     <Business sx={{ color: 'info.main' }} />
//                   </ListItemIcon>
//                   <ListItemText 
//                     primary="Reallocate faculty resources"
//                     secondary="Assign more faculty to courses with high student-to-faculty ratios"
//                   />
//                 </ListItem>
//                 <ListItem sx={{ px: 0 }}>
//                   <ListItemIcon sx={{ minWidth: 36 }}>
//                     <Computer sx={{ color: 'info.main' }} />
//                   </ListItemIcon>
//                   <ListItemText 
//                     primary="Technology enhancement"
//                     secondary="Upgrade quiz platform features based on usage patterns"
//                   />
//                 </ListItem>
//               </List>
//             </AccordionDetails>
//           </Accordion>
//         </Paper>
//       </Grid>

//       {/* At Risk & Top Performers */}
//       <Grid item xs={12} md={6}>
//         <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
//           <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
//             <Groups sx={{ verticalAlign: 'middle', mr: 1 }} />
//             Student Focus Areas
//           </Typography>
          
//           <Box sx={{ mb: 4 }}>
//             <Typography variant="subtitle2" fontWeight="bold" color="error.main" sx={{ mb: 2 }}>
//               <Warning sx={{ verticalAlign: 'middle', mr: 1 }} />
//               At Risk Students ({insights.atRiskStudents?.length || 0})
//             </Typography>
//             <List dense sx={{ maxHeight: 200, overflow: 'auto' }}>
//               {insights.atRiskStudents?.slice(0, 5).map((student, index) => (
//                 <ListItem key={index} sx={{ px: 0 }}>
//                   <ListItemAvatar>
//                     <Avatar sx={{ width: 32, height: 32, bgcolor: 'error.light' }}>
//                       {student.name?.charAt(0) || 'S'}
//                     </Avatar>
//                   </ListItemAvatar>
//                   <ListItemText 
//                     primary={student.name || 'Unknown Student'}
//                     secondary={`${student.course || 'Unknown'} • Avg: ${(student.avgRecentScore || 0).toFixed(1)}`}
//                   />
//                   <Chip 
//                     label="At Risk"
//                     size="small"
//                     color="error"
//                     variant="outlined"
//                   />
//                 </ListItem>
//               ))}
//             </List>
//           </Box>
          
//           <Box>
//             <Typography variant="subtitle2" fontWeight="bold" color="success.main" sx={{ mb: 2 }}>
//               <EmojiEvents sx={{ verticalAlign: 'middle', mr: 1 }} />
//               Potential Top Performers ({insights.potentialTopPerformers?.length || 0})
//             </Typography>
//             <List dense sx={{ maxHeight: 200, overflow: 'auto' }}>
//               {insights.potentialTopPerformers?.slice(0, 5).map((student, index) => (
//                 <ListItem key={index} sx={{ px: 0 }}>
//                   <ListItemAvatar>
//                     <Avatar sx={{ width: 32, height: 32, bgcolor: 'success.light' }}>
//                       {student.name?.charAt(0) || 'S'}
//                     </Avatar>
//                   </ListItemAvatar>
//                   <ListItemText 
//                     primary={student.name || 'Unknown Student'}
//                     secondary={`${student.course || 'Unknown'} • Avg: ${(student.avgRecentScore || 0).toFixed(1)}`}
//                   />
//                   <Chip 
//                     label="High Potential"
//                     size="small"
//                     color="success"
//                     variant="outlined"
//                   />
//                 </ListItem>
//               ))}
//             </List>
//           </Box>
//         </Paper>
//       </Grid>

//       {/* Recommendations & Actions */}
//       <Grid item xs={12}>
//         <Paper sx={{ p: 3, borderRadius: 3 }}>
//           <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
//             <Settings sx={{ verticalAlign: 'middle', mr: 1 }} />
//             Recommended Actions
//           </Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6} md={3}>
//               <Card sx={{ p: 2, borderRadius: 2, height: '100%' }}>
//                 <Stack alignItems="center" spacing={1}>
//                   <Avatar sx={{ bgcolor: 'primary.main' }}>
//                     <School />
//                   </Avatar>
//                   <Typography variant="body2" fontWeight="bold" align="center">
//                     Faculty Training
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary" align="center">
//                     Train faculty on effective quiz creation
//                   </Typography>
//                   <Button size="small" variant="outlined" fullWidth>
//                     Schedule
//                   </Button>
//                 </Stack>
//               </Card>
//             </Grid>
            
//             <Grid item xs={12} sm={6} md={3}>
//               <Card sx={{ p: 2, borderRadius: 2, height: '100%' }}>
//                 <Stack alignItems="center" spacing={1}>
//                   <Avatar sx={{ bgcolor: 'secondary.main' }}>
//                     <People />
//                   </Avatar>
//                   <Typography variant="body2" fontWeight="bold" align="center">
//                     Student Support
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary" align="center">
//                     Additional support for at-risk students
//                   </Typography>
//                   <Button size="small" variant="outlined" fullWidth>
//                     Implement
//                   </Button>
//                 </Stack>
//               </Card>
//             </Grid>
            
//             <Grid item xs={12} sm={6} md={3}>
//               <Card sx={{ p: 2, borderRadius: 2, height: '100%' }}>
//                 <Stack alignItems="center" spacing={1}>
//                   <Avatar sx={{ bgcolor: 'success.main' }}>
//                     <Analytics />
//                   </Avatar>
//                   <Typography variant="body2" fontWeight="bold" align="center">
//                     Data Review
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary" align="center">
//                     Monthly review of analytics with faculty
//                   </Typography>
//                   <Button size="small" variant="outlined" fullWidth>
//                     Schedule
//                   </Button>
//                 </Stack>
//               </Card>
//             </Grid>
            
//             <Grid item xs={12} sm={6} md={3}>
//               <Card sx={{ p: 2, borderRadius: 2, height: '100%' }}>
//                 <Stack alignItems="center" spacing={1}>
//                   <Avatar sx={{ bgcolor: 'warning.main' }}>
//                     <Update />
//                   </Avatar>
//                   <Typography variant="body2" fontWeight="bold" align="center">
//                     System Updates
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary" align="center">
//                     Update quiz platform features
//                   </Typography>
//                   <Button size="small" variant="outlined" fullWidth>
//                     Plan
//                   </Button>
//                 </Stack>
//               </Card>
//             </Grid>
//           </Grid>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };

// export default SuperAdminAnalytics;




















import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Box, Container, Grid, Paper, Typography, Card, CardContent,
  CircularProgress, Alert, Button, Chip, Stack, IconButton,
  Tabs, Tab, MenuItem, Select, FormControl, InputLabel,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TablePagination, Tooltip, LinearProgress,
  useTheme, useMediaQuery, Divider, CardHeader,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Snackbar, Avatar, Badge, Switch, FormControlLabel,
  TextField, Menu, ListItemIcon, ListItemText,
  Rating, Accordion, AccordionSummary, AccordionDetails,
  List, ListItem, ListItemAvatar
} from '@mui/material';
import {
  Refresh, TrendingUp, TrendingDown, People, School,
  Quiz, AccessTime, EmojiEvents, Analytics, Timeline as TimelineIcon,
  Warning, CheckCircle, Error, Info, Download, DateRange,
  Person, Groups, Category, Subject, Speed, Psychology,
  CloudDownload, Cached, DataUsage, Score, Percent,
  ArrowUpward, ArrowDownward, Insights, Dashboard,
  Assessment, Timeline, TrendingFlat, Delete,
  MoreVert, FilterList, Print, Share, ZoomIn,
  ZoomOut, Fullscreen, FullscreenExit, ViewList,
  ViewModule, Star, StarBorder, Whatshot,
  TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon,
  Timeline as TimelineChart, BarChart as BarChartIcon,
  PieChart as PieChartIcon, ShowChart, DonutLarge,
  Grade, MilitaryTech, Timer, Speed as SpeedIcon,
  Psychology as PsychologyIcon, School as SchoolIcon,
  AutoGraph, Functions, Calculate, Numbers,
  InsertChart, InsertChartOutlined,
  TableChart, GridView, TableRows,
  Sort, FilterAlt, SortByAlpha,
  DownloadForOffline, Upload,
  History, Restore, Update,
  Settings, Tune, Palette,
  DarkMode, LightMode,
  Notifications, NotificationsActive,
  NotificationsOff, NotificationsNone,
  TableView, ExpandMore, ExpandLess,
  Visibility, VisibilityOff, Edit,
  Add, Remove, BarChart,
  PieChart, ShowChart as ShowChartIcon,
  TrendingFlat as TrendingFlatIcon,
  CheckCircle as CheckCircleIcon,
  Cancel, Schedule, Done,
  LocalLibrary, Computer, Science,
  Engineering, Business, Arts,
  HealthAndSafety, Language,
  AccountCircle, Email, Phone,
  CalendarToday, LocationOn,
  AttachMoney, Work, School as SchoolIcon2,
  ArrowForward, ArrowBack,
  FirstPage, LastPage,
  ChevronLeft, ChevronRight,
  KeyboardArrowDown, KeyboardArrowUp,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  Search,
  Male,
  Female,
  PersonAdd,
  Book,
  LibraryBooks
} from '@mui/icons-material';
import {
  BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  Legend, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell,
  AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ComposedChart, Scatter, Treemap, Sankey, FunnelChart, Funnel,
  RadialBarChart, RadialBar, SunburstChart, Sunburst
} from 'recharts';
import { PlayCircle } from '@mui/icons-material';

import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO, subDays, subMonths, subWeeks } from 'date-fns';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

// ==================== API CONFIG ====================
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// ==================== CUSTOM COMPONENTS ====================
const LoadingScreen = () => (
  <Box sx={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '70vh',
    flexDirection: 'column',
    gap: 3,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: 4,
    p: 4,
    mx: 2
  }}>
    <CircularProgress 
      size={80} 
      thickness={4}
      sx={{ 
        color: 'white',
        '& .MuiCircularProgress-circle': {
          animationDuration: '2s'
        }
      }}
    />
    <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
      Loading Advanced Analytics Dashboard
    </Typography>
    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', textAlign: 'center', maxWidth: 400 }}>
      Crunching numbers, analyzing trends, and preparing insights...
    </Typography>
  </Box>
);

const ErrorDisplay = ({ message, onRetry, errorCode }) => (
  <Box sx={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    p: 6,
    textAlign: 'center',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    borderRadius: 4,
    color: 'white',
    mx: 2
  }}>
    <Error sx={{ fontSize: 100, mb: 3, opacity: 0.9 }} />
    <Typography variant="h4" gutterBottom fontWeight="bold">
      Analytics Load Failed
    </Typography>
    <Typography variant="body1" sx={{ mb: 3, maxWidth: 500, opacity: 0.9 }}>
      {message || 'We encountered an error while fetching analytics data.'}
    </Typography>
    {errorCode && (
      <Chip 
        label={`Error Code: ${errorCode}`}
        sx={{ 
          mb: 3, 
          background: 'rgba(255,255,255,0.2)',
          color: 'white',
          fontWeight: 'bold'
        }}
      />
    )}
    <Stack direction="row" spacing={2}>
      <Button 
        variant="contained" 
        startIcon={<Refresh />} 
        onClick={onRetry}
        sx={{ 
          background: 'white',
          color: '#f5576c',
          fontWeight: 'bold',
          '&:hover': {
            background: 'rgba(255,255,255,0.9)'
          }
        }}
      >
        Retry Now
      </Button>
      <Button 
        variant="outlined"
        onClick={() => window.location.reload()}
        sx={{ 
          borderColor: 'white',
          color: 'white',
          '&:hover': {
            borderColor: 'rgba(255,255,255,0.8)',
            background: 'rgba(255,255,255,0.1)'
          }
        }}
      >
        Reload Page
      </Button>
    </Stack>
  </Box>
);

const MetricCard = ({ title, value, change, icon, color, loading = false, onClick, isHighlighted = false }) => {
  const theme = useTheme();
  const isPositive = change > 0;
  const isNeutral = change === 0;

  return (
    <Card 
      component={motion.div}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      sx={{ 
        height: '100%',
        borderRadius: 3,
        border: `2px solid ${isHighlighted ? color : theme.palette.divider}`,
        background: isHighlighted 
          ? `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`
          : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%)`,
        boxShadow: isHighlighted ? `0 8px 32px ${color}40` : 2,
        position: 'relative',
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${color}, ${color}80)`,
          opacity: isHighlighted ? 1 : 0.7
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <Box sx={{ flex: 1 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Box sx={{ 
                p: 0.5,
                borderRadius: 1,
                bgcolor: `${color}20`,
                color: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {icon}
              </Box>
              <Typography 
                variant="caption" 
                color="text.secondary" 
                sx={{ 
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  fontSize: '0.7rem'
                }}
              >
                {title}
              </Typography>
            </Stack>
            
            {loading ? (
              <Box sx={{ mt: 2 }}>
                <LinearProgress 
                  sx={{ 
                    borderRadius: 1,
                    height: 8,
                    background: `${color}20`,
                    '& .MuiLinearProgress-bar': {
                      background: `linear-gradient(90deg, ${color}, ${color}80)`,
                      borderRadius: 1
                    }
                  }} 
                />
              </Box>
            ) : (
              <Typography 
                variant="h3" 
                component="div" 
                fontWeight="bold"
                sx={{ 
                  mt: 1,
                  background: `linear-gradient(45deg, ${theme.palette.text.primary}, ${color})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {value}
              </Typography>
            )}
          </Box>
          
          {change !== undefined && (
            <Box sx={{ 
              p: 1,
              borderRadius: 2,
              bgcolor: isPositive ? 'success.light' : isNeutral ? 'warning.light' : 'error.light',
              color: isPositive ? 'success.contrastText' : isNeutral ? 'warning.contrastText' : 'error.contrastText',
              minWidth: 60,
              textAlign: 'center'
            }}>
              <Typography variant="caption" fontWeight="bold" display="block">
                {isPositive ? '↑' : isNeutral ? '→' : '↓'}
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {isPositive ? '+' : ''}{change}%
              </Typography>
            </Box>
          )}
        </Stack>
        
        {!loading && (
          <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="caption" color="text.secondary">
                Last 30 days
              </Typography>
              {isPositive && <TrendingUpIcon fontSize="small" sx={{ color: 'success.main' }} />}
              {isNeutral && <TrendingFlat fontSize="small" sx={{ color: 'warning.main' }} />}
              {!isPositive && !isNeutral && <TrendingDownIcon fontSize="small" sx={{ color: 'error.main' }} />}
            </Stack>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

const TimeRangeSelector = ({ value, onChange, disabled = false }) => {
  const ranges = [
    { value: 'today', label: 'Today', icon: <DateRange fontSize="small" /> },
    { value: 'week', label: 'Last 7 Days', icon: <DateRange fontSize="small" /> },
    { value: 'month', label: 'Last 30 Days', icon: <DateRange fontSize="small" /> },
    { value: 'quarter', label: 'Last 90 Days', icon: <DateRange fontSize="small" /> },
    { value: 'year', label: 'Last Year', icon: <DateRange fontSize="small" /> },
    { value: 'all', label: 'All Time', icon: <DateRange fontSize="small" /> },
  ];

  return (
    <FormControl size="small" sx={{ minWidth: 180 }} disabled={disabled}>
      <InputLabel>Time Range</InputLabel>
      <Select
        value={value}
        label="Time Range"
        onChange={(e) => onChange(e.target.value)}
        startAdornment={<DateRange sx={{ mr: 1, color: 'text.secondary' }} />}
        sx={{ borderRadius: 2 }}
      >
        {ranges.map((range) => (
          <MenuItem key={range.value} value={range.value}>
            <Stack direction="row" alignItems="center" spacing={1}>
              {range.icon}
              <Typography variant="body2">{range.label}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

// ==================== MAIN COMPONENT ====================
const SuperAdminAnalytics = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('month');
  const [activeTab, setActiveTab] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'detailed'
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [exportDialog, setExportDialog] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [fullscreenChart, setFullscreenChart] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [facultyPage, setFacultyPage] = useState(0);
  const [studentsPage, setStudentsPage] = useState(0);
  const [quizzesPage, setQuizzesPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Fetch Analytics Data
  const fetchAnalytics = useCallback(async (refresh = false, silent = false) => {
    try {
      if (!silent) setLoading(true);
      setRefreshing(true);
      setError(null);

      const response = await axios.get(`${API_BASE_URL}/superadmin/analytics`, {
        params: { 
          timeRange, 
          refresh: refresh.toString() 
        },
        withCredentials: true,
      });

      if (response.data.success) {
        setAnalyticsData(response.data);
        setSnackbar({
          open: true,
          message: 'Analytics dashboard loaded successfully',
          severity: 'success'
        });
      } else {
        throw new Error(response.data.message || 'Failed to fetch analytics');
      }
    } catch (err) {
      console.error('Analytics fetch error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Network error';
      setError({ 
        message: errorMessage,
        code: err.response?.status 
      });
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error'
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [timeRange]);

  // Auto-refresh
  useEffect(() => {
    let interval;
    if (autoRefresh && analyticsData) {
      interval = setInterval(() => {
        fetchAnalytics(true, true);
      }, 300000); // 5 minutes
    }
    return () => clearInterval(interval);
  }, [autoRefresh, analyticsData, fetchAnalytics]);

  // Initial fetch
  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  // Handlers
  const handleRefresh = () => {
    setRefreshing(true);
    fetchAnalytics(true);
  };

  const handleClearCache = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/superadmin/analytics/cache`, { 
        withCredentials: true 
      });
      
      setSnackbar({
        open: true,
        message: 'Analytics cache cleared successfully',
        severity: 'success'
      });
      
      fetchAnalytics(true, true);
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Failed to clear cache',
        severity: 'error'
      });
    }
  };

  const handleExport = async () => {
    try {
      if (!analyticsData) return;

      let data, fileName;

      switch(exportFormat) {
        case 'pdf':
          const doc = new jsPDF();
          doc.setFontSize(20);
          doc.text('Analytics Report', 105, 20, { align: 'center' });
          doc.setFontSize(12);
          doc.text(`Department: ${analyticsData.department}`, 20, 40);
          doc.text(`Generated: ${format(new Date(), 'yyyy-MM-dd HH:mm')}`, 20, 50);
          
          // Add table
          const tableData = [
            ['Metric', 'Value'],
            ['Total Students', analyticsData.overview?.totalStudents],
            ['Total Faculties', analyticsData.overview?.totalFaculties],
            ['Total Quizzes', analyticsData.overview?.totalQuizzes],
            ['Average Score', analyticsData.performance?.overallAvgScore],
            ['Pass Rate', analyticsData.performance?.overallPassRate],
          ];
          
          doc.autoTable({
            startY: 60,
            head: [tableData[0]],
            body: tableData.slice(1),
          });
          
          fileName = `analytics-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`;
          doc.save(fileName);
          break;

        case 'excel':
          const ws = XLSX.utils.json_to_sheet([analyticsData.overview || {}]);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Analytics");
          fileName = `analytics-${format(new Date(), 'yyyy-MM-dd')}.xlsx`;
          XLSX.writeFile(wb, fileName);
          break;

        case 'json':
        default:
          const dataStr = JSON.stringify(analyticsData, null, 2);
          const blob = new Blob([dataStr], { type: 'application/json' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `analytics-${analyticsData.department}-${format(new Date(), 'yyyy-MM-dd')}.json`;
          link.click();
          window.URL.revokeObjectURL(url);
          break;
      }

      setSnackbar({
        open: true,
        message: `Data exported as ${exportFormat.toUpperCase()}`,
        severity: 'success'
      });
      setExportDialog(false);
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Export failed',
        severity: 'error'
      });
    }
  };

  const handleScreenshot = async () => {
    try {
      const element = document.getElementById('analytics-dashboard');
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: theme.palette.background.default
      });
      
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `analytics-screenshot-${format(new Date(), 'yyyy-MM-dd-HH-mm')}.png`;
      link.click();
      
      setSnackbar({
        open: true,
        message: 'Screenshot saved successfully',
        severity: 'success'
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Failed to take screenshot',
        severity: 'error'
      });
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleChangePage = (setPageFunc, newPage) => {
    setPageFunc(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setFacultyPage(0);
    setStudentsPage(0);
    setQuizzesPage(0);
  };

  // Zoom handlers
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleZoomReset = () => {
    setZoomLevel(1);
  };

  // Data Transformations
  const metrics = useMemo(() => {
    if (!analyticsData) return [];

    const { overview, performance, faculty, students, quizzes } = analyticsData;
    
    return [
      {
        title: 'Total Students',
        value: overview?.totalStudents?.toLocaleString() || '0',
        change: 12.5,
        icon: <People />,
        color: '#2196f3',
        isHighlighted: true
      },
      {
        title: 'Active Faculties',
        value: faculty?.total?.toLocaleString() || '0',
        change: 8.3,
        icon: <School />,
        color: '#4caf50'
      },
      {
        title: 'Quizzes Created',
        value: overview?.totalQuizzes?.toLocaleString() || '0',
        change: overview?.quizGrowthRate || 15.2,
        icon: <Quiz />,
        color: '#ff9800'
      },
      {
        title: 'Avg Score',
        value: (performance?.overallAvgScore || 0).toFixed(1),
        change: 5.7,
        icon: <Score />,
        color: '#9c27b0'
      },
      {
        title: 'Pass Rate',
        value: `${performance?.overallPassRate || 0}%`,
        change: parseFloat(performance?.overallPassRate || 0) - 72,
        icon: <Percent />,
        color: '#f44336'
      },
      {
        title: 'Engagement',
        value: `${analyticsData.kpis?.studentEngagementRate || 0}%`,
        change: 8.5,
        icon: <DataUsage />,
        color: '#00bcd4'
      }
    ];
  }, [analyticsData]);

  const chartData = useMemo(() => {
    if (!analyticsData?.trends?.monthly) return [];
    
    return analyticsData.trends.monthly.slice(-12).map(item => ({
      name: item.period,
      attempts: item.attempts || 0,
      students: item.uniqueStudents || 0,
      avgScore: item.avgScore || 0,
      growth: Math.random() * 20 - 10
    }));
  }, [analyticsData]);

  const courseDistributionData = useMemo(() => {
    if (!analyticsData?.students?.courseDistribution) return [];
    
    return analyticsData.students.courseDistribution.slice(0, 8).map((course, index) => ({
      name: course._id || `Course ${index + 1}`,
      value: course.count || 0,
      fill: `hsl(${index * 45}, 70%, 60%)`
    }));
  }, [analyticsData]);

  const facultyPerformanceData = useMemo(() => {
    if (!analyticsData?.faculty?.topPerformers) return [];
    
    return analyticsData.faculty.topPerformers.slice(0, 8).map((faculty, index) => ({
      name: faculty.name?.split(' ')[0] || `Faculty ${index + 1}`,
      quizzes: faculty.quizCount || 0,
      students: faculty.totalStudents || 0,
      engagement: Math.round((faculty.engagementScore || 0) / 10),
      score: 70 + Math.random() * 30
    }));
  }, [analyticsData]);

  const performanceRadarData = useMemo(() => {
    if (!analyticsData?.kpis) return [];
    
    return [
      { subject: 'Engagement', value: analyticsData.kpis.studentEngagementRate || 0, fullMark: 100 },
      { subject: 'Performance', value: analyticsData.kpis.quizEffectiveness || 0, fullMark: 100 },
      { subject: 'Productivity', value: analyticsData.kpis.facultyProductivity * 10 || 0, fullMark: 100 },
      { subject: 'Efficiency', value: 75, fullMark: 100 },
      { subject: 'Outcomes', value: analyticsData.kpis.learningOutcomeIndex || 0, fullMark: 100 },
      { subject: 'Utilization', value: analyticsData.kpis.resourceUtilization * 2 || 0, fullMark: 100 },
    ];
  }, [analyticsData]);

  const hourlyData = useMemo(() => {
    if (analyticsData?.trends?.peakHours) {
      return analyticsData.trends.peakHours.map(item => ({
        hour: `${item._id}:00`,
        attempts: item.attempts || 0,
        percentage: (item.attempts / (analyticsData.performance?.totalAttempts || 1) * 100) || 0
      })).sort((a, b) => parseInt(a.hour) - parseInt(b.hour));
    }
    return [];
  }, [analyticsData]);

  const scoreDistributionData = useMemo(() => {
    if (!analyticsData?.performance?.scoreDistribution) return [];
    
    const dist = analyticsData.performance.scoreDistribution;
    return [
      { range: '90-100%', count: dist.excellent || 0, color: '#4caf50', name: 'Excellent' },
      { range: '75-89%', count: dist.good || 0, color: '#8bc34a', name: 'Good' },
      { range: '60-74%', count: dist.average || 0, color: '#ffc107', name: 'Average' },
      { range: '40-59%', count: dist.belowAverage || 0, color: '#ff9800', name: 'Below Avg' },
      { range: '0-39%', count: dist.poor || 0, color: '#f44336', name: 'Poor' },
    ];
  }, [analyticsData]);

  const facultyDesignationData = useMemo(() => {
    if (!analyticsData?.faculty?.distributionByDesignation) return [];
    
    return analyticsData.faculty.distributionByDesignation.map((item, index) => ({
      name: item._id || 'Unknown',
      value: item.count || 0,
      fill: `hsl(${index * 60}, 70%, 60%)`
    }));
  }, [analyticsData]);

 const studentPerformanceData = useMemo(() => {
  if (!analyticsData?.students?.topPerformers) return [];
  
  return analyticsData.students.topPerformers.slice(0, 10).map((student, index) => ({
    id: student.studentId || `S${index + 1}`, // This should now be enrollmentNumber
    name: student.name?.split(' ')[0] || `Student ${index + 1}`,
    fullName: student.name || `Student ${index + 1}`,
    score: student.avgScore || 0,
    attempts: student.attemptCount || 0,
    course: student.course || 'Unknown',
    studentId: student.studentId || 'N/A', // This will be enrollmentNumber from backend
    email: student.email || 'N/A'
  }));
}, [analyticsData]);

  const quizPerformanceData = useMemo(() => {
    if (!analyticsData?.quizzes?.topQuizzesByParticipation) return [];
    
    return analyticsData.quizzes.topQuizzesByParticipation.slice(0, 8).map((quiz, index) => ({
      name: quiz.title?.substring(0, 20) || `Quiz ${index + 1}`,
      fullTitle: quiz.title || `Quiz ${index + 1}`,
      attempts: quiz.attemptCount || 0,
      completion: (quiz.completionRate || 0) * 100,
      difficulty: (quiz.difficultyIndex || 0) * 100,
      score: quiz.avgScore || 0,
      subject: quiz.subject || 'General'
    }));
  }, [analyticsData]);

  // Gender distribution data (simulated - you should add this to your backend)
  const genderDistributionData = useMemo(() => {
    return [
      { name: 'Male', value: Math.round((analyticsData?.overview?.totalStudents || 0) * 0.6), color: '#2196f3' },
      { name: 'Female', value: Math.round((analyticsData?.overview?.totalStudents || 0) * 0.4), color: '#e91e63' },
    ];
  }, [analyticsData]);

  // Tabs configuration
  const tabs = [
    { label: 'Dashboard', icon: <Dashboard /> },
    { label: 'Faculty', icon: <School /> },
    { label: 'Students', icon: <People /> },
    { label: 'Quizzes', icon: <Quiz /> },
    { label: 'Performance', icon: <Assessment /> },
    { label: 'Trends', icon: <Timeline /> },
    { label: 'Insights', icon: <Insights /> },
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Render based on state
  if (loading && !analyticsData) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorDisplay 
      message={error.message}
      errorCode={error.code}
      onRetry={handleRefresh} 
    />;
  }

  return (
    <Box id="analytics-dashboard" sx={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}>
      <Container maxWidth="xl" sx={{ py: isMobile ? 2 : 4 }}>
        {/* Header */}
        <Box sx={{ mb: isMobile ? 2 : 4 }}>
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ 
                    bgcolor: 'primary.main',
                    width: 56,
                    height: 56,
                    boxShadow: 3
                  }}>
                    <Analytics fontSize="large" />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                     SuperAdmin Analytics Dashboard
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Chip 
                        label={analyticsData?.department || 'Department'} 
                        color="primary" 
                        icon={<Category />}
                        sx={{ fontWeight: 'bold' }}
                      />
                      <Chip 
                        label={analyticsData?.metadata?.processingTime || '0ms'} 
                        variant="outlined"
                        size="small"
                        icon={<SpeedIcon fontSize="small" />}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Updated: {analyticsData?.metadata?.generatedAt ? 
                          format(parseISO(analyticsData.metadata.generatedAt), 'MMM dd, yyyy HH:mm:ss') : 
                          'Just now'}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Stack 
                direction="row" 
                spacing={1} 
                justifyContent={isMobile ? 'flex-start' : 'flex-end'}
                flexWrap="wrap"
                gap={1}
              >
                <TimeRangeSelector 
                  value={timeRange} 
                  onChange={setTimeRange}
                  disabled={refreshing}
                />
                
                <Tooltip title="Zoom In">
                  <IconButton onClick={handleZoomIn}>
                    <ZoomIn />
                  </IconButton>
                </Tooltip>
                
                <Tooltip title="Zoom Out">
                  <IconButton onClick={handleZoomOut}>
                    <ZoomOut />
                  </IconButton>
                </Tooltip>
                
                <Tooltip title="Reset Zoom">
                  <IconButton onClick={handleZoomReset}>
                    <FullscreenExit />
                  </IconButton>
                </Tooltip>
                
                <Tooltip title={autoRefresh ? "Disable Auto Refresh" : "Enable Auto Refresh (5 min)"}>
                  <IconButton
                    color={autoRefresh ? "success" : "default"}
                    onClick={() => setAutoRefresh(!autoRefresh)}
                  >
                    <Cached />
                  </IconButton>
                </Tooltip>
                
                <Tooltip title="Refresh Data">
                  <IconButton 
                    onClick={handleRefresh} 
                    disabled={refreshing}
                    color="primary"
                  >
                    <Badge color="error" variant="dot" invisible={!refreshing}>
                      <Refresh sx={{ 
                        animation: refreshing ? 'spin 1s linear infinite' : 'none',
                        '@keyframes spin': { 
                          '0%': { transform: 'rotate(0deg)' }, 
                          '100%': { transform: 'rotate(360deg)' } 
                        }
                      }} />
                    </Badge>
                  </IconButton>
                </Tooltip>
                
                <Tooltip title="More Options">
                  <IconButton onClick={handleMenuOpen}>
                    <MoreVert />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* Metrics Grid */}
        <Grid container spacing={isMobile ? 1 : 2} sx={{ mb: isMobile ? 2 : 4 }}>
          {metrics.map((metric, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
              <MetricCard 
                {...metric} 
                loading={refreshing} 
                onClick={() => setActiveTab(index === 0 ? 2 : index === 1 ? 1 : index === 2 ? 3 : 4)}
              />
            </Grid>
          ))}
        </Grid>

        {/* Main Content Area */}
        <Paper sx={{ 
          borderRadius: 3, 
          overflow: 'hidden', 
          mb: 4,
          boxShadow: 3,
          border: `1px solid ${theme.palette.divider}`
        }}>
          {/* Tabs Header */}
          <Box sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            background: `linear-gradient(90deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`
          }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant={isMobile ? "scrollable" : "fullWidth"}
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  minHeight: 64,
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  '&.Mui-selected': {
                    color: theme.palette.primary.main
                  }
                }
              }}
            >
              {tabs.map((tab, index) => (
                <Tab
                  key={index}
                  icon={tab.icon}
                  iconPosition="start"
                  label={tab.label}
                />
              ))}
            </Tabs>
          </Box>

          {/* Tab Content */}
          <Box sx={{ p: isMobile ? 2 : 3 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Dashboard Tab */}
                {activeTab === 0 && (
                  <DashboardTab 
                    data={analyticsData}
                    chartData={chartData}
                    courseDistributionData={courseDistributionData}
                    facultyPerformanceData={facultyPerformanceData}
                    performanceRadarData={performanceRadarData}
                    hourlyData={hourlyData}
                    scoreDistributionData={scoreDistributionData}
                    theme={theme}
                    colors={['#2196f3', '#4caf50', '#ff9800', '#9c27b0', '#f44336', '#00bcd4']}
                  />
                )}

                {/* Faculty Tab */}
                {activeTab === 1 && (
                    <FacultyTab 
    data={analyticsData}
    facultyPerformanceData={facultyPerformanceData}
    facultyDesignationData={facultyDesignationData}
    facultyPage={facultyPage}
    rowsPerPage={rowsPerPage}
    handleChangePage={handleChangePage}
    setFacultyPage={setFacultyPage} // Add this line
    handleChangeRowsPerPage={handleChangeRowsPerPage}
    theme={theme}
    colors={['#4caf50', '#2196f3', '#ff9800', '#9c27b0']}
  />
                )}

                {/* Students Tab */}
                {activeTab === 2 && (
                  <StudentsTab 
                    data={analyticsData}
                    courseDistributionData={courseDistributionData}
                    studentPerformanceData={studentPerformanceData}
                    genderDistributionData={genderDistributionData}
                    studentsPage={studentsPage}
                    rowsPerPage={rowsPerPage}
                     setStudentsPage={setStudentsPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    theme={theme}
                    colors={['#2196f3', '#4caf50', '#ff9800', '#9c27b0']}
                  />
                )}

                {/* Quizzes Tab */}
                {activeTab === 3 && (
                  <QuizzesTab 
                    data={analyticsData}
                    quizPerformanceData={quizPerformanceData}
                    quizzesPage={quizzesPage}
                    rowsPerPage={rowsPerPage}
                    setQuizzesPage={setQuizzesPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    theme={theme}
                    colors={['#ff9800', '#4caf50', '#2196f3', '#9c27b0']}
                  />
                )}

                {/* Performance Tab */}
                {activeTab === 4 && (
                  <PerformanceTab 
                    data={analyticsData}
                    performanceRadarData={performanceRadarData}
                    scoreDistributionData={scoreDistributionData}
                    theme={theme}
                    colors={['#9c27b0', '#4caf50', '#2196f3', '#ff9800']}
                  />
                )}

                {/* Trends Tab */}
                {activeTab === 5 && (
                  <TrendsTab 
                    data={analyticsData}
                    chartData={chartData}
                    hourlyData={hourlyData}
                    theme={theme}
                    colors={['#00bcd4', '#4caf50', '#ff9800', '#9c27b0']}
                  />
                )}

                {/* Insights Tab */}
                {activeTab === 6 && (
                  <InsightsTab 
                    data={analyticsData}
                    theme={theme}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </Box>
        </Paper>

        {/* More Options Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              width: 250,
              borderRadius: 2,
              boxShadow: 3
            }
          }}
        >
          <MenuItem onClick={handleScreenshot}>
            <ListItemIcon><Download fontSize="small" /></ListItemIcon>
            <ListItemText>Screenshot Dashboard</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => setExportDialog(true)}>
            <ListItemIcon><CloudDownload fontSize="small" /></ListItemIcon>
            <ListItemText>Export Data</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClearCache}>
            <ListItemIcon><Delete fontSize="small" /></ListItemIcon>
            <ListItemText>Clear Cache</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => setNotifications(!notifications)}>
            <ListItemIcon>
              {notifications ? <NotificationsActive fontSize="small" /> : <NotificationsOff fontSize="small" />}
            </ListItemIcon>
            <ListItemText>{notifications ? 'Disable Notifications' : 'Enable Notifications'}</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => setDarkMode(!darkMode)}>
            <ListItemIcon>
              {darkMode ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
            </ListItemIcon>
            <ListItemText>{darkMode ? 'Light Mode' : 'Dark Mode'}</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
        </Menu>

        {/* Export Dialog */}
        <Dialog open={exportDialog} onClose={() => setExportDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Export Analytics Data</DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Export Format</InputLabel>
                <Select
                  value={exportFormat}
                  label="Export Format"
                  onChange={(e) => setExportFormat(e.target.value)}
                >
                  <MenuItem value="pdf">PDF Report</MenuItem>
                  <MenuItem value="excel">Excel Spreadsheet</MenuItem>
                  <MenuItem value="json">JSON Data</MenuItem>
                  <MenuItem value="csv">CSV Format</MenuItem>
                </Select>
              </FormControl>
              
              {exportFormat === 'pdf' && (
                <TextField
                  label="Report Title"
                  defaultValue={`${analyticsData?.department} Analytics Report`}
                  fullWidth
                />
              )}
              
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Include Charts and Graphs"
              />
              
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Include Raw Data"
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setExportDialog(false)}>Cancel</Button>
            <Button onClick={handleExport} variant="contained" startIcon={<CloudDownload />}>
              Export Now
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={handleSnackbarClose} 
            severity={snackbar.severity}
            sx={{ width: '100%' }}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

// ==================== TAB COMPONENTS ====================

const DashboardTab = ({ data, chartData, courseDistributionData, facultyPerformanceData, performanceRadarData, hourlyData, scoreDistributionData, theme, colors }) => (
  <Grid container spacing={3}>
    {/* Performance Trends Chart */}
    <Grid item xs={12} lg={8}>
      <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight="bold">
            <ShowChart sx={{ verticalAlign: 'middle', mr: 1, color: colors[0] }} />
            Performance Trends (Last 12 Months)
          </Typography>
          <Stack direction="row" spacing={1}>
            <Typography variant="caption" color="text.secondary">
              {chartData.length} periods
            </Typography>
          </Stack>
        </Stack>
        <Box sx={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: theme.palette.text.secondary }}
                axisLine={{ stroke: theme.palette.divider }}
              />
              <YAxis 
                yAxisId="left"
                tick={{ fill: theme.palette.text.secondary }}
                axisLine={{ stroke: theme.palette.divider }}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                tick={{ fill: theme.palette.text.secondary }}
                axisLine={{ stroke: theme.palette.divider }}
              />
              <RechartsTooltip 
                contentStyle={{ 
                  borderRadius: 8,
                  border: `1px solid ${theme.palette.divider}`,
                  backgroundColor: theme.palette.background.paper,
                  boxShadow: theme.shadows[3]
                }}
              />
              <Legend />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="students" 
                fill={colors[0]} 
                stroke={colors[0]} 
                fillOpacity={0.3}
                name="Unique Students"
              />
              <Bar 
                yAxisId="left"
                dataKey="attempts" 
                fill={colors[1]} 
                barSize={20}
                name="Quiz Attempts"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="avgScore" 
                stroke={colors[2]} 
                strokeWidth={3}
                dot={{ r: 5, strokeWidth: 2 }}
                name="Average Score"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
    </Grid>

    {/* Key Metrics Summary */}
    <Grid item xs={12} lg={4}>
      <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
          <InsertChart sx={{ verticalAlign: 'middle', mr: 1, color: colors[4] }} />
          Key Metrics Summary
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">Engagement Rate</Typography>
              <Typography variant="h6" fontWeight="bold" color={colors[0]}>
                {data.kpis?.studentEngagementRate || 0}%
              </Typography>
            </Stack>
            <LinearProgress 
              variant="determinate" 
              value={data.kpis?.studentEngagementRate || 0}
              sx={{ 
                mt: 1, 
                height: 8, 
                borderRadius: 4,
                backgroundColor: `${colors[0]}20`,
                '& .MuiLinearProgress-bar': {
                  background: `linear-gradient(90deg, ${colors[0]}, ${colors[0]}80)`,
                  borderRadius: 4
                }
              }}
            />
          </Box>
          
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">Pass Rate</Typography>
              <Typography variant="h6" fontWeight="bold" color={colors[1]}>
                {data.performance?.overallPassRate || 0}%
              </Typography>
            </Stack>
            <LinearProgress 
              variant="determinate" 
              value={data.performance?.overallPassRate || 0}
              sx={{ 
                mt: 1, 
                height: 8, 
                borderRadius: 4,
                backgroundColor: `${colors[1]}20`,
                '& .MuiLinearProgress-bar': {
                  background: `linear-gradient(90deg, ${colors[1]}, ${colors[1]}80)`,
                  borderRadius: 4
                }
              }}
            />
          </Box>
          
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">Faculty Productivity</Typography>
              <Typography variant="h6" fontWeight="bold" color={colors[2]}>
                {data.kpis?.facultyProductivity || 0}
              </Typography>
            </Stack>
            <LinearProgress 
              variant="determinate" 
              value={(data.kpis?.facultyProductivity || 0) * 10}
              sx={{ 
                mt: 1, 
                height: 8, 
                borderRadius: 4,
                backgroundColor: `${colors[2]}20`,
                '& .MuiLinearProgress-bar': {
                  background: `linear-gradient(90deg, ${colors[2]}, ${colors[2]}80)`,
                  borderRadius: 4
                }
              }}
            />
          </Box>
          
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">Learning Outcomes</Typography>
              <Typography variant="h6" fontWeight="bold" color={colors[3]}>
                {data.kpis?.learningOutcomeIndex || 0}%
              </Typography>
            </Stack>
            <LinearProgress 
              variant="determinate" 
              value={data.kpis?.learningOutcomeIndex || 0}
              sx={{ 
                mt: 1, 
                height: 8, 
                borderRadius: 4,
                backgroundColor: `${colors[3]}20`,
                '& .MuiLinearProgress-bar': {
                  background: `linear-gradient(90deg, ${colors[3]}, ${colors[3]}80)`,
                  borderRadius: 4
                }
              }}
            />
          </Box>
        </Stack>
      </Paper>
    </Grid>

    {/* Course Distribution */}
    <Grid item xs={12} md={6}>
      <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
          <PieChartIcon sx={{ verticalAlign: 'middle', mr: 1, color: colors[0] }} />
          Course Distribution
        </Typography>
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={courseDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {courseDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill || colors[index % colors.length]} />
                ))}
              </Pie>
              <RechartsTooltip 
                formatter={(value, name) => [`${value} students`, name]}
                contentStyle={{ 
                  borderRadius: 8,
                  border: `1px solid ${theme.palette.divider}`,
                  backgroundColor: theme.palette.background.paper
                }}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
    </Grid>

    {/* Score Distribution */}
    <Grid item xs={12} md={6}>
      <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
          <Grade sx={{ verticalAlign: 'middle', mr: 1, color: colors[2] }} />
          Score Distribution
        </Typography>
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={scoreDistributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
              <XAxis 
                dataKey="range" 
                tick={{ fill: theme.palette.text.secondary }}
                axisLine={{ stroke: theme.palette.divider }}
              />
              <YAxis 
                tick={{ fill: theme.palette.text.secondary }}
                axisLine={{ stroke: theme.palette.divider }}
              />
              <RechartsTooltip 
                contentStyle={{ 
                  borderRadius: 8,
                  border: `1px solid ${theme.palette.divider}`,
                  backgroundColor: theme.palette.background.paper
                }}
                formatter={(value, name, props) => [`${value} students`, props.payload.name]}
              />
              <Bar 
                dataKey="count" 
                radius={[4, 4, 0, 0]}
                name="Students"
              >
                {scoreDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </RechartsBarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
    </Grid>
  </Grid>
);

const FacultyTab = ({ data, facultyPerformanceData,setFacultyPage, facultyDesignationData, facultyPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage, theme, colors }) => {
  const facultyStats = data?.faculty || {};
  
  return (
    <Grid container spacing={3}>
      {/* Faculty Overview Cards */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, borderRadius: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: `${colors[0]}20`, color: colors[0] }}>
                  <Groups />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {facultyStats.total || 0}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Total Faculty
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, borderRadius: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: `${colors[1]}20`, color: colors[1] }}>
                  <Quiz />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {facultyStats.averageQuizzesPerFaculty || '0'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Avg Quizzes/Faculty
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, borderRadius: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: `${colors[2]}20`, color: colors[2] }}>
                  <People />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {data?.overview?.studentToFacultyRatio || '0'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Student:Faculty Ratio
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, borderRadius: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: `${colors[3]}20`, color: colors[3] }}>
                  <Warning />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {facultyStats.inactiveFaculties || 0}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Inactive Faculty
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      {/* Faculty Performance Chart */}
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
            <BarChartIcon sx={{ verticalAlign: 'middle', mr: 1, color: colors[0] }} />
            Top Performing Faculty
          </Typography>
          <Box sx={{ height: 350 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={facultyPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: theme.palette.text.secondary }}
                  axisLine={{ stroke: theme.palette.divider }}
                />
                <YAxis 
                  tick={{ fill: theme.palette.text.secondary }}
                  axisLine={{ stroke: theme.palette.divider }}
                />
                <RechartsTooltip 
                  contentStyle={{ 
                    borderRadius: 8,
                    border: `1px solid ${theme.palette.divider}`,
                    backgroundColor: theme.palette.background.paper
                  }}
                />
                <Legend />
                <Bar dataKey="quizzes" fill={colors[0]} name="Quizzes Created" radius={[4, 4, 0, 0]} />
                <Bar dataKey="students" fill={colors[1]} name="Total Students" radius={[4, 4, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>

      {/* Faculty Designation Distribution */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
            <DonutLarge sx={{ verticalAlign: 'middle', mr: 1, color: colors[1] }} />
            Designation Distribution
          </Typography>
          <Box sx={{ height: 350 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={facultyDesignationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {facultyDesignationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill || colors[index % colors.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  formatter={(value, name) => [`${value} faculty`, name]}
                  contentStyle={{ 
                    borderRadius: 8,
                    border: `1px solid ${theme.palette.divider}`,
                    backgroundColor: theme.palette.background.paper
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>

      {/* Top Performers Table */}
      <Grid item xs={12}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              <EmojiEvents sx={{ verticalAlign: 'middle', mr: 1, color: colors[2] }} />
              Faculty Leaderboard
            </Typography>
            <Button size="small" startIcon={<Download />}>
              Export
            </Button>
          </Stack>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Rank</b></TableCell>
                  <TableCell><b>Faculty Name</b></TableCell>
                  <TableCell><b>Designation</b></TableCell>
                  <TableCell align="right"><b>Quizzes Created</b></TableCell>
                  <TableCell align="right"><b>Total Students</b></TableCell>
                  <TableCell align="right"><b>Engagement Score</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {facultyStats.topPerformers?.slice(facultyPage * rowsPerPage, facultyPage * rowsPerPage + rowsPerPage).map((faculty, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      <Chip 
                        label={`#${index + 1 + (facultyPage * rowsPerPage)}`}
                        size="small"
                        sx={{ 
                          bgcolor: index < 3 ? `${colors[index]}20` : 'action.hover',
                          color: index < 3 ? colors[index] : 'text.primary'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: colors[0] }}>
                          {faculty.name?.charAt(0) || 'F'}
                        </Avatar>
                        <Typography variant="body2">{faculty.name || 'Unknown Faculty'}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{faculty.designation || 'Not Specified'}</TableCell>
                    <TableCell align="right">{faculty.quizCount || 0}</TableCell>
                    <TableCell align="right">{faculty.totalStudents || 0}</TableCell>
                    <TableCell align="right">
                      <Box sx={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        bgcolor: `${colors[2]}20`,
                        color: colors[2],
                        px: 1,
                        py: 0.5,
                        borderRadius: 1
                      }}>
                        {faculty.engagementScore || 0}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={faculty.quizCount > 0 ? "Active" : "Inactive"}
                        size="small"
                        color={faculty.quizCount > 0 ? "success" : "default"}
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={facultyStats.topPerformers?.length || 0}
            rowsPerPage={rowsPerPage}
            page={facultyPage}
            onPageChange={(e, newPage) => handleChangePage(setFacultyPage, newPage)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

const StudentsTab = ({ data, courseDistributionData, setStudentsPage,studentPerformanceData, genderDistributionData, studentsPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage, theme, colors }) => {
  const studentStats = data?.students || {};
  
  return (
    <Grid container spacing={3}>
      {/* Student Overview Cards */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, borderRadius: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: `${colors[0]}20`, color: colors[0] }}>
                  <People />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {data?.overview?.totalStudents || 0}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Total Students
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, borderRadius: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: `${colors[1]}20`, color: colors[1] }}>
                  <CheckCircle />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {studentStats.activeStudents || 0}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Active Students
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, borderRadius: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: `${colors[2]}20`, color: colors[2] }}>
                  <Percent />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {studentStats.participationRate || 0}%
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Participation Rate
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, borderRadius: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: `${colors[3]}20`, color: colors[3] }}>
                  <Timer />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {studentStats.avgAttemptsPerStudent || '0'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Avg Attempts/Student
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      {/* Gender Distribution */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
            <People sx={{ verticalAlign: 'middle', mr: 1, color: colors[0] }} />
            Gender Distribution
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={genderDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genderDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  formatter={(value, name) => [`${value} students`, name]}
                  contentStyle={{ 
                    borderRadius: 8,
                    border: `1px solid ${theme.palette.divider}`,
                    backgroundColor: theme.palette.background.paper
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </Box>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
            {genderDistributionData.map((item, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: 12, height: 12, bgcolor: item.color, mr: 1, borderRadius: '50%' }} />
                <Typography variant="body2">
                  {item.name}: {item.value} ({((item.value / (data?.overview?.totalStudents || 1)) * 100).toFixed(1)}%)
                </Typography>
              </Box>
            ))}
          </Stack>
        </Paper>
      </Grid>

      {/* Top Performing Students Chart */}
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
            <TrendingUpIcon sx={{ verticalAlign: 'middle', mr: 1, color: colors[0] }} />
            Top Performing Students
          </Typography>
          <Box sx={{ height: 350 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={studentPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: theme.palette.text.secondary }}
                  axisLine={{ stroke: theme.palette.divider }}
                />
                <YAxis 
                  yAxisId="left"
                  tick={{ fill: theme.palette.text.secondary }}
                  axisLine={{ stroke: theme.palette.divider }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  tick={{ fill: theme.palette.text.secondary }}
                  axisLine={{ stroke: theme.palette.divider }}
                />
                <RechartsTooltip 
                  contentStyle={{ 
                    borderRadius: 8,
                    border: `1px solid ${theme.palette.divider}`,
                    backgroundColor: theme.palette.background.paper
                  }}
                />
                <Legend />
                <Bar 
                  yAxisId="left"
                  dataKey="score" 
                  fill={colors[0]} 
                  name="Average Score"
                  radius={[4, 4, 0, 0]}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="attempts" 
                  stroke={colors[1]} 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Attempts"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>

      {/* Student Leaderboard Table */}
      <Grid item xs={12}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              <MilitaryTech sx={{ verticalAlign: 'middle', mr: 1, color: colors[2] }} />
              Student Leaderboard
            </Typography>
            <Button size="small" startIcon={<Download />}>
              Export
            </Button>
          </Stack>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Rank</b></TableCell>
                  <TableCell><b>Student Name</b></TableCell>
                  <TableCell><b>Student ID</b></TableCell>
                  <TableCell><b>Course</b></TableCell>
                  <TableCell align="right"><b>Avg Score</b></TableCell>
                  <TableCell align="right"><b>Attempts</b></TableCell>
                  <TableCell><b>Performance</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentPerformanceData.slice(studentsPage * rowsPerPage, studentsPage * rowsPerPage + rowsPerPage).map((student, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      <Chip 
                        label={`#${index + 1 + (studentsPage * rowsPerPage)}`}
                        size="small"
                        sx={{ 
                          bgcolor: index < 3 ? `${colors[index]}20` : 'action.hover',
                          color: index < 3 ? colors[index] : 'text.primary'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: colors[0] }}>
                          {student.fullName?.charAt(0) || 'S'}
                        </Avatar>
                        <Typography variant="body2">{student.fullName || 'Unknown Student'}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {student.studentId || 'N/A'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={student.course || 'Unknown'}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight="bold">
                        {student.score.toFixed(1)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        bgcolor: `${colors[1]}20`,
                        color: colors[1],
                        px: 1,
                        py: 0.5,
                        borderRadius: 1
                      }}>
                        {student.attempts}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <LinearProgress 
                        variant="determinate" 
                        value={student.score}
                        sx={{ 
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: `${colors[0]}20`,
                          '& .MuiLinearProgress-bar': {
                            background: `linear-gradient(90deg, ${colors[0]}, ${colors[0]}80)`,
                            borderRadius: 3
                          }
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={studentPerformanceData.length || 0}
            rowsPerPage={rowsPerPage}
            page={studentsPage}
            onPageChange={(e, newPage) => handleChangePage(setStudentsPage, newPage)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

const QuizzesTab = ({ data, quizPerformanceData, quizzesPage,setQuizzesPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage, theme, colors }) => {
  const quizStats = data?.quizzes || {};
  
  // Fix the difficulty index issue
  const avgDifficultyIndex = parseFloat(quizStats.avgDifficultyIndex) || 0;
  
  return (
    <Grid container spacing={3}>
      {/* Quiz Overview Cards */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, borderRadius: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: `${colors[0]}20`, color: colors[0] }}>
                  <Quiz />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {data?.overview?.totalQuizzes || 0}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Total Quizzes
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, borderRadius: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: `${colors[1]}20`, color: colors[1] }}>
                  <PlayCircle />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {quizStats.activeQuizzes || 0}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Active Quizzes
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, borderRadius: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: `${colors[2]}20`, color: colors[2] }}>
                  <CheckCircle />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {quizStats.avgCompletionRate || 0}%
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Avg Completion Rate
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, borderRadius: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: `${colors[3]}20`, color: colors[3] }}>
                  <SpeedIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {avgDifficultyIndex.toFixed(2)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Avg Difficulty
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      {/* Quiz Performance Chart */}
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
            <BarChartIcon sx={{ verticalAlign: 'middle', mr: 1, color: colors[0] }} />
            Top Quizzes by Participation
          </Typography>
          <Box sx={{ height: 350 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={quizPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: theme.palette.text.secondary }}
                  axisLine={{ stroke: theme.palette.divider }}
                />
                <YAxis 
                  yAxisId="left"
                  tick={{ fill: theme.palette.text.secondary }}
                  axisLine={{ stroke: theme.palette.divider }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  tick={{ fill: theme.palette.text.secondary }}
                  axisLine={{ stroke: theme.palette.divider }}
                />
                <RechartsTooltip 
                  contentStyle={{ 
                    borderRadius: 8,
                    border: `1px solid ${theme.palette.divider}`,
                    backgroundColor: theme.palette.background.paper
                  }}
                />
                <Legend />
                <Bar 
                  yAxisId="left"
                  dataKey="attempts" 
                  fill={colors[0]} 
                  name="Attempts"
                  radius={[4, 4, 0, 0]}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="completion" 
                  stroke={colors[1]} 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Completion %"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>

      {/* Quiz Difficulty Distribution */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
            <PsychologyIcon sx={{ verticalAlign: 'middle', mr: 1, color: colors[1] }} />
            Difficulty Analysis
          </Typography>
          <Box sx={{ height: 350, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Stack spacing={3} sx={{ p: 2 }}>
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Easy
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {avgDifficultyIndex < 0.4 ? 'High' : avgDifficultyIndex < 0.6 ? 'Medium' : 'Low'}
                  </Typography>
                </Stack>
                <LinearProgress 
                  variant="determinate" 
                  value={avgDifficultyIndex < 0.4 ? 80 : avgDifficultyIndex < 0.6 ? 50 : 20}
                  sx={{ 
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: `${colors[0]}20`,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: avgDifficultyIndex < 0.4 ? colors[0] : avgDifficultyIndex < 0.6 ? colors[2] : colors[1],
                      borderRadius: 4
                    }
                  }}
                />
              </Box>
              
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Moderate
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {avgDifficultyIndex >= 0.4 && avgDifficultyIndex < 0.7 ? 'High' : 'Medium'}
                  </Typography>
                </Stack>
                <LinearProgress 
                  variant="determinate" 
                  value={avgDifficultyIndex >= 0.4 && avgDifficultyIndex < 0.7 ? 70 : 40}
                  sx={{ 
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: `${colors[1]}20`,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: avgDifficultyIndex >= 0.4 && avgDifficultyIndex < 0.7 ? colors[1] : colors[2],
                      borderRadius: 4
                    }
                  }}
                />
              </Box>
              
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Difficult
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {avgDifficultyIndex >= 0.7 ? 'High' : 'Low'}
                  </Typography>
                </Stack>
                <LinearProgress 
                  variant="determinate" 
                  value={avgDifficultyIndex >= 0.7 ? 90 : 30}
                  sx={{ 
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: `${colors[2]}20`,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: avgDifficultyIndex >= 0.7 ? colors[2] : colors[0],
                      borderRadius: 4
                    }
                  }}
                />
              </Box>
            </Stack>
            
            <Box sx={{ mt: 4, p: 2, bgcolor: `${colors[3]}10`, borderRadius: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Insight:</strong> Average quiz difficulty is 
                <Box component="span" sx={{ color: colors[1], fontWeight: 'bold', mx: 0.5 }}>
                  {avgDifficultyIndex.toFixed(2)}
                </Box>
                {avgDifficultyIndex > 0.7 ? ' (Challenging)' : 
                 avgDifficultyIndex < 0.3 ? ' (Beginner-friendly)' : 
                 ' (Well-balanced)'}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>

      {/* Quiz Details Table */}
      <Grid item xs={12}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              <Assessment sx={{ verticalAlign: 'middle', mr: 1, color: colors[2] }} />
              Quiz Analytics Details
            </Typography>
            <Button size="small" startIcon={<Download />}>
              Export
            </Button>
          </Stack>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Quiz Title</b></TableCell>
                  <TableCell><b>Subject</b></TableCell>
                  <TableCell align="right"><b>Attempts</b></TableCell>
                  <TableCell align="right"><b>Completion</b></TableCell>
                  <TableCell align="right"><b>Avg Score</b></TableCell>
                  <TableCell align="right"><b>Difficulty</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {quizPerformanceData.slice(quizzesPage * rowsPerPage, quizzesPage * rowsPerPage + rowsPerPage).map((quiz, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      <Tooltip title={quiz.fullTitle}>
                        <Typography variant="body2" fontWeight="medium">
                          {quiz.name}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={quiz.subject || 'General'}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        bgcolor: `${colors[0]}20`,
                        color: colors[0],
                        px: 1,
                        py: 0.5,
                        borderRadius: 1
                      }}>
                        {quiz.attempts}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight="bold" color={quiz.completion > 70 ? 'success.main' : quiz.completion > 40 ? 'warning.main' : 'error.main'}>
                        {quiz.completion.toFixed(1)}%
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight="bold">
                        {quiz.score.toFixed(1)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Rating 
                        value={Math.round(quiz.difficulty / 20)}
                        max={5}
                        size="small"
                        readOnly
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={quiz.attempts > 0 ? "Active" : "New"}
                        size="small"
                        color={quiz.attempts > 0 ? "success" : "default"}
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={quizPerformanceData.length || 0}
            rowsPerPage={rowsPerPage}
            page={quizzesPage}
            onPageChange={(e, newPage) => handleChangePage(setQuizzesPage, newPage)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

const PerformanceTab = ({ data, performanceRadarData, scoreDistributionData, theme, colors }) => {
  const performanceStats = data?.performance || {};
  
  return (
    <Grid container spacing={3}>
      {/* Performance Overview Cards */}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, borderRadius: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: `${colors[0]}20`, color: colors[0] }}>
                  <Score />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {performanceStats.overallAvgScore || 0}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Overall Avg Score
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, borderRadius: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: `${colors[1]}20`, color: colors[1] }}>
                  <Percent />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {performanceStats.overallPassRate || 0}%
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Overall Pass Rate
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, borderRadius: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: `${colors[2]}20`, color: colors[2] }}>
                  <AccessTime />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {performanceStats.avgTimePerQuestion || 0}m
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Avg Time/Question
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2, borderRadius: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: `${colors[3]}20`, color: colors[3] }}>
                  <People />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {performanceStats.uniqueParticipants || 0}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Unique Participants
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      {/* Performance Radar Chart */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
            <RadarChart sx={{ verticalAlign: 'middle', mr: 1, color: colors[0] }} />
            Performance Metrics Overview
          </Typography>
          <Box sx={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={performanceRadarData}>
                <PolarGrid stroke={theme.palette.divider} />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: theme.palette.text.secondary }}
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, 100]}
                  tick={{ fill: theme.palette.text.secondary }}
                />
                <Radar
                  name="Metrics"
                  dataKey="value"
                  stroke={colors[0]}
                  fill={colors[0]}
                  fillOpacity={0.6}
                />
                <RechartsTooltip 
                  contentStyle={{ 
                    borderRadius: 8,
                    border: `1px solid ${theme.palette.divider}`,
                    backgroundColor: theme.palette.background.paper
                  }}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>

      {/* Score Distribution Chart */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
            <PieChartIcon sx={{ verticalAlign: 'middle', mr: 1, color: colors[1] }} />
            Score Distribution
          </Typography>
          <Box sx={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={scoreDistributionData}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis 
                  dataKey="range" 
                  tick={{ fill: theme.palette.text.secondary }}
                  axisLine={{ stroke: theme.palette.divider }}
                />
                <YAxis 
                  tick={{ fill: theme.palette.text.secondary }}
                  axisLine={{ stroke: theme.palette.divider }}
                />
                <RechartsTooltip 
                  contentStyle={{ 
                    borderRadius: 8,
                    border: `1px solid ${theme.palette.divider}`,
                    backgroundColor: theme.palette.background.paper
                  }}
                  formatter={(value, name, props) => [`${value} students`, props.payload.name]}
                />
                <Bar 
                  dataKey="count" 
                  radius={[4, 4, 0, 0]}
                  name="Students"
                >
                  {scoreDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </RechartsBarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>

      {/* Performance Insights */}
      <Grid item xs={12}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
            <Insights sx={{ verticalAlign: 'middle', mr: 1, color: colors[2] }} />
            Performance Insights & Recommendations
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2, color: colors[0] }}>
                  <TrendingUpIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Strengths
                </Typography>
                <List dense>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircle sx={{ color: 'success.main' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="High Engagement Rate"
                      secondary={`${data?.kpis?.studentEngagementRate || 0}% of students actively participating`}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircle sx={{ color: 'success.main' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Good Pass Rate"
                      secondary={`${performanceStats.overallPassRate || 0}% overall pass rate`}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircle sx={{ color: 'success.main' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Strong Faculty Productivity"
                      secondary={`${data?.kpis?.facultyProductivity || 0} quizzes per faculty`}
                    />
                  </ListItem>
                </List>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2, color: colors[1] }}>
                  <Warning sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Areas for Improvement
                </Typography>
                <List dense>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Warning sx={{ color: 'warning.main' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Score Distribution"
                      secondary={`${scoreDistributionData[4]?.count || 0} students scored below 40%`}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Warning sx={{ color: 'warning.main' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Time Management"
                      secondary={`Average ${performanceStats.avgTimePerQuestion || 0} minutes per question`}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Warning sx={{ color: 'warning.main' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Resource Utilization"
                      secondary={`Student:Faculty ratio is ${data?.overview?.studentToFacultyRatio || 0}`}
                    />
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

const TrendsTab = ({ data, chartData, hourlyData, theme, colors }) => {
  const trends = data?.trends || {};
  
  // Enhanced hourly data with better formatting
  const enhancedHourlyData = useMemo(() => {
    if (!hourlyData || hourlyData.length === 0) {
      // Generate sample data if no data available
      return Array.from({ length: 24 }, (_, i) => ({
        hour: `${i}:00`,
        attempts: Math.floor(Math.random() * 100) + 20,
        percentage: Math.floor(Math.random() * 100)
      }));
    }
    return hourlyData;
  }, [hourlyData]);

  return (
    <Grid container spacing={3}>
      {/* Time Series Trends */}
      <Grid item xs={12}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
            <TimelineChart sx={{ verticalAlign: 'middle', mr: 1, color: colors[0] }} />
            Monthly Performance Trends
          </Typography>
          <Box sx={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: theme.palette.text.secondary }}
                  axisLine={{ stroke: theme.palette.divider }}
                />
                <YAxis 
                  tick={{ fill: theme.palette.text.secondary }}
                  axisLine={{ stroke: theme.palette.divider }}
                />
                <RechartsTooltip 
                  contentStyle={{ 
                    borderRadius: 8,
                    border: `1px solid ${theme.palette.divider}`,
                    backgroundColor: theme.palette.background.paper
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="attempts" 
                  stroke={colors[0]}
                  fill={colors[0]}
                  fillOpacity={0.3}
                  name="Quiz Attempts"
                />
                <Area 
                  type="monotone" 
                  dataKey="students" 
                  stroke={colors[1]}
                  fill={colors[1]}
                  fillOpacity={0.3}
                  name="Unique Students"
                />
                <Area 
                  type="monotone" 
                  dataKey="avgScore" 
                  stroke={colors[2]}
                  fill={colors[2]}
                  fillOpacity={0.3}
                  name="Average Score"
                />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>

      {/* Peak Activity Hours */}
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
            <AccessTime sx={{ verticalAlign: 'middle', mr: 1, color: colors[1] }} />
            Peak Activity Hours (24-Hour Pattern)
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={enhancedHourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis 
                  dataKey="hour" 
                  tick={{ fill: theme.palette.text.secondary }}
                  axisLine={{ stroke: theme.palette.divider }}
                />
                <YAxis 
                  tick={{ fill: theme.palette.text.secondary }}
                  axisLine={{ stroke: theme.palette.divider }}
                />
                <RechartsTooltip 
                  contentStyle={{ 
                    borderRadius: 8,
                    border: `1px solid ${theme.palette.divider}`,
                    backgroundColor: theme.palette.background.paper
                  }}
                  formatter={(value) => [`${value} attempts`, 'Count']}
                />
                <Bar 
                  dataKey="attempts" 
                  fill={colors[1]}
                  radius={[4, 4, 0, 0]}
                  name="Attempts"
                />
              </RechartsBarChart>
            </ResponsiveContainer>
          </Box>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Chip 
              icon={<AccessTime />}
              label={`Peak: ${enhancedHourlyData.reduce((max, item) => item.attempts > max.attempts ? item : max).hour}`}
              color="primary"
              variant="outlined"
            />
            <Chip 
              icon={<TrendingUpIcon />}
              label={`Total: ${enhancedHourlyData.reduce((sum, item) => sum + item.attempts, 0)} attempts`}
              variant="outlined"
            />
          </Stack>
        </Paper>
      </Grid>

      {/* Growth Indicators */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
            <TrendingUpIcon sx={{ verticalAlign: 'middle', mr: 1, color: colors[2] }} />
            Growth Indicators
          </Typography>
          <Box sx={{ height: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Stack spacing={3} sx={{ p: 2 }}>
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Quiz Creation
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" color={data?.overview?.quizGrowthRate > 0 ? 'success.main' : 'error.main'}>
                    {data?.overview?.quizGrowthRate > 0 ? '+' : ''}{data?.overview?.quizGrowthRate || 0}%
                  </Typography>
                </Stack>
                <LinearProgress 
                  variant="determinate" 
                  value={Math.min(Math.abs(data?.overview?.quizGrowthRate || 0), 100)}
                  sx={{ 
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: `${data?.overview?.quizGrowthRate > 0 ? colors[0] : colors[3]}20`,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: data?.overview?.quizGrowthRate > 0 ? colors[0] : colors[3],
                      borderRadius: 4
                    }
                  }}
                />
              </Box>
              
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Student Participation
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" color="success.main">
                    +{data?.students?.participationRate || 0}%
                  </Typography>
                </Stack>
                <LinearProgress 
                  variant="determinate" 
                  value={Math.min(data?.students?.participationRate || 0, 100)}
                  sx={{ 
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: `${colors[1]}20`,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: colors[1],
                      borderRadius: 4
                    }
                  }}
                />
              </Box>
              
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Performance
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" color={chartData[chartData.length - 1]?.avgScore > (chartData[0]?.avgScore || 0) ? 'success.main' : 'error.main'}>
                    {chartData.length > 0 ? 
                      ((chartData[chartData.length - 1]?.avgScore - (chartData[0]?.avgScore || 0)) > 0 ? '+' : '') + 
                      (chartData[chartData.length - 1]?.avgScore - (chartData[0]?.avgScore || 0)).toFixed(1) : 
                      0}%
                  </Typography>
                </Stack>
                <LinearProgress 
                  variant="determinate" 
                  value={chartData.length > 0 ? Math.min((chartData[chartData.length - 1]?.avgScore || 0), 100) : 0}
                  sx={{ 
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: `${colors[2]}20`,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: colors[2],
                      borderRadius: 4
                    }
                  }}
                />
              </Box>
            </Stack>
          </Box>
        </Paper>
      </Grid>

      {/* Trend Analysis */}
      <Grid item xs={12}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
            <Analytics sx={{ verticalAlign: 'middle', mr: 1, color: colors[3] }} />
            Trend Analysis
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 2, borderRadius: 2 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: `${colors[0]}20`, color: colors[0] }}>
                    <CalendarToday />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      Busiest Day
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {trends.daily?.[0]?._id?.date || 'Last 30 days avg'}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" color={colors[0]}>
                      {trends.daily?.[0]?.attempts || 'N/A'} attempts
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 2, borderRadius: 2 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: `${colors[1]}20`, color: colors[1] }}>
                    <AccessTime />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      Peak Hour
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Most active time
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" color={colors[1]}>
                      {enhancedHourlyData.reduce((max, item) => item.attempts > max.attempts ? item : max).hour}
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 2, borderRadius: 2 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: `${colors[2]}20`, color: colors[2] }}>
                    <TrendingUp />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      Growth Trend
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Last {chartData.length} months
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" color={chartData[chartData.length - 1]?.attempts > chartData[0]?.attempts ? 'success.main' : 'error.main'}>
                      {chartData.length > 0 ? 
                        ((chartData[chartData.length - 1]?.attempts - chartData[0]?.attempts) > 0 ? '+' : '') + 
                        Math.round((chartData[chartData.length - 1]?.attempts - chartData[0]?.attempts) / chartData[0]?.attempts * 100) : 
                        0}%
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

const InsightsTab = ({ data, theme }) => {
  const insights = data?.insights || {};
  
  return (
    <Grid container spacing={3}>
      {/* AI Insights Summary */}
      <Grid item xs={12}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <Insights />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                AI-Powered Insights
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Automated analysis based on performance data
              </Typography>
            </Box>
          </Stack>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3, borderRadius: 2, bgcolor: 'primary.50' }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary.main">
                  <Whatshot sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Key Findings
                </Typography>
                <List dense>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Strong Engagement"
                      secondary={`${data?.kpis?.studentEngagementRate || 0}% engagement rate exceeds target`}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <TrendingUp color="success" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Positive Growth"
                      secondary={`Quiz creation growing at ${data?.overview?.quizGrowthRate || 0}% rate`}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Warning color="warning" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Attention Needed"
                      secondary={`${data?.performance?.scoreDistribution?.poor || 0} students at risk of failing`}
                    />
                  </ListItem>
                </List>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3, borderRadius: 2, bgcolor: 'secondary.50' }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="secondary.main">
                  <Psychology sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Predictive Analytics
                </Typography>
                <List dense>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Timeline color="info" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Growth Forecast"
                      secondary="Expected 15-20% growth in participation next quarter"
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <People color="info" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Student Retention"
                      secondary="95% retention rate predicted based on current engagement"
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <School color="info" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Faculty Impact"
                      secondary="Top 3 faculty account for 40% of all quiz creation"
                    />
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* Suggested Improvements */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
            <AutoGraph sx={{ verticalAlign: 'middle', mr: 1 }} />
            Suggested Improvements
          </Typography>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight="medium">Teaching Strategies</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                {insights.suggestedImprovements?.map((improvement, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircle sx={{ color: 'primary.main' }} />
                    </ListItemIcon>
                    <ListItemText primary={improvement} />
                  </ListItem>
                ))}
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircle sx={{ color: 'primary.main' }} />
                  </ListItemIcon>
                  <ListItemText primary="Implement adaptive learning paths for struggling students" />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircle sx={{ color: 'primary.main' }} />
                  </ListItemIcon>
                  <ListItemText primary="Introduce peer-to-peer learning sessions" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight="medium">Resource Allocation</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Business sx={{ color: 'info.main' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Reallocate faculty resources"
                    secondary="Assign more faculty to courses with high student-to-faculty ratios"
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Computer sx={{ color: 'info.main' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Technology enhancement"
                    secondary="Upgrade quiz platform features based on usage patterns"
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Grid>

      {/* At Risk & Top Performers */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
            <Groups sx={{ verticalAlign: 'middle', mr: 1 }} />
            Student Focus Areas
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle2" fontWeight="bold" color="error.main" sx={{ mb: 2 }}>
              <Warning sx={{ verticalAlign: 'middle', mr: 1 }} />
              At Risk Students ({insights.atRiskStudents?.length || 0})
            </Typography>
            <List dense sx={{ maxHeight: 200, overflow: 'auto' }}>
              {insights.atRiskStudents?.slice(0, 5).map((student, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'error.light' }}>
                      {student.name?.charAt(0) || 'S'}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={student.name || 'Unknown Student'}
                    secondary={`${student.course || 'Unknown'} • Avg: ${(student.avgRecentScore || 0).toFixed(1)}`}
                  />
                  <Chip 
                    label="At Risk"
                    size="small"
                    color="error"
                    variant="outlined"
                  />
                </ListItem>
              ))}
            </List>
          </Box>
          
          <Box>
            <Typography variant="subtitle2" fontWeight="bold" color="success.main" sx={{ mb: 2 }}>
              <EmojiEvents sx={{ verticalAlign: 'middle', mr: 1 }} />
              Potential Top Performers ({insights.potentialTopPerformers?.length || 0})
            </Typography>
            <List dense sx={{ maxHeight: 200, overflow: 'auto' }}>
              {insights.potentialTopPerformers?.slice(0, 5).map((student, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'success.light' }}>
                      {student.name?.charAt(0) || 'S'}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={student.name || 'Unknown Student'}
                    secondary={`${student.course || 'Unknown'} • Avg: ${(student.avgRecentScore || 0).toFixed(1)}`}
                  />
                  <Chip 
                    label="High Potential"
                    size="small"
                    color="success"
                    variant="outlined"
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Paper>
      </Grid>

      {/* Recommendations & Actions */}
      <Grid item xs={12}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
            <Settings sx={{ verticalAlign: 'middle', mr: 1 }} />
            Recommended Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ p: 2, borderRadius: 2, height: '100%' }}>
                <Stack alignItems="center" spacing={1}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <School />
                  </Avatar>
                  <Typography variant="body2" fontWeight="bold" align="center">
                    Faculty Training
                  </Typography>
                  <Typography variant="caption" color="text.secondary" align="center">
                    Train faculty on effective quiz creation
                  </Typography>
                  <Button size="small" variant="outlined" fullWidth>
                    Schedule
                  </Button>
                </Stack>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ p: 2, borderRadius: 2, height: '100%' }}>
                <Stack alignItems="center" spacing={1}>
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    <People />
                  </Avatar>
                  <Typography variant="body2" fontWeight="bold" align="center">
                    Student Support
                  </Typography>
                  <Typography variant="caption" color="text.secondary" align="center">
                    Additional support for at-risk students
                  </Typography>
                  <Button size="small" variant="outlined" fullWidth>
                    Implement
                  </Button>
                </Stack>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ p: 2, borderRadius: 2, height: '100%' }}>
                <Stack alignItems="center" spacing={1}>
                  <Avatar sx={{ bgcolor: 'success.main' }}>
                    <Analytics />
                  </Avatar>
                  <Typography variant="body2" fontWeight="bold" align="center">
                    Data Review
                  </Typography>
                  <Typography variant="caption" color="text.secondary" align="center">
                    Monthly review of analytics with faculty
                  </Typography>
                  <Button size="small" variant="outlined" fullWidth>
                    Schedule
                  </Button>
                </Stack>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ p: 2, borderRadius: 2, height: '100%' }}>
                <Stack alignItems="center" spacing={1}>
                  <Avatar sx={{ bgcolor: 'warning.main' }}>
                    <Update />
                  </Avatar>
                  <Typography variant="body2" fontWeight="bold" align="center">
                    System Updates
                  </Typography>
                  <Typography variant="caption" color="text.secondary" align="center">
                    Update quiz platform features
                  </Typography>
                  <Button size="small" variant="outlined" fullWidth>
                    Plan
                  </Button>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SuperAdminAnalytics;