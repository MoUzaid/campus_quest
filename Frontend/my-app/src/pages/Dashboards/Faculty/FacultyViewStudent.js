// import React, { useEffect, useState, useMemo } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Tooltip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Grid,
//   Chip,
//   Divider,
//   Box,
//   TextField,
//   InputAdornment,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   CircularProgress,
//   Alert,
//   TablePagination,
//   Stack,
//   alpha,
//   useTheme,
//   Tabs,
//   Tab,
//   Avatar,
//   LinearProgress,
//   Rating,
//   Switch,
//   FormControlLabel,
//   CardHeader,
//   Container
// } from "@mui/material";
// import {
//   Visibility,
//   Delete,
//   Search,
//   FilterList,
//   Download,
//   Refresh,
//   Person,
//   Quiz,
//   School,
//   Group,
//   Email,
//   Male,
//   Female,
//   CalendarToday,
//   BarChart as BarChartIcon,
//   PieChart as PieChartIcon,
//   Timeline,
//   Analytics,
//   Assessment,
//   TrendingUp,
//   TrendingDown,
//   CheckCircle,
//   Cancel,
//   MoreVert,
//   Edit,
//   Print,
//   Share,
//   CloudDownload,
//   VisibilityOff,
//   Notifications,
//   AccountCircle,
//   Score,
//   Category,
//   DateRange,
//   Sort,
//   ExpandMore,
//   ExpandLess,
//   Home,
//   NavigateNext,
//   ArrowBack,
//   Tag,
//   Warning,
//   Schedule,
//   AccessAlarm,
//   Speed,
//   EmojiEvents,
//   Timer,
//   TrendingFlat,
//   PriorityHigh,
//   AssignmentLate,
//   Lightbulb,
//   Psychology,
//   ThumbUp,
//   ThumbDown,
//   FilterAlt,
//   SortByAlpha,
//   Clear,
//   Close,
//   Check,
//   OpenInNew,
//   Launch,
//   Percent,
//   PrecisionManufacturing,
//   ExpandMore as ExpandMoreIcon,
//   ExpandLess as ExpandLessIcon,
//   ShowChart,
//   DonutLarge,
//   ScatterPlot,
//   Tree,
//   QueryStats,
//   LibraryBooks,
//   Calculate,
//   SpeedOutlined,
//   Grade,
//   Star,
//   Notifications as NotificationsIcon,
//   ErrorOutline,
//   AssignmentLate as AssignmentLateIcon,
//   Flag,
//   Bookmarks,
//   Bookmark,
//   Attachment,
//   Description,
//   MenuBook,
//   QuestionAnswer,
//   Science,
//   Functions,
//   HistoryEdu,
//   Public,
//   Computer,
//   Business,
//   Healing,
//   Architecture,
//   Engineering,
//   Biotech,
//   Numbers,
//   Code,
//   Dataset,
//   Groups,
//   AccountTree,
//   Event,
//   AvTimer,
//   DoneAll,
//   PendingActions,
//   HourglassEmpty,
//   PlayArrow,
//   Stop,
//   Pause,
//   FastForward,
//   FastRewind,
//   SkipNext,
//   SkipPrevious,
//   FirstPage,
//   LastPage,
//   ChevronLeft,
//   ChevronRight,
//   MoreHoriz,
//   FileCopy,
//   Archive,
//   Unarchive,
//   Report,
//   Feedback,
//   Chat,
//   Forum,
//   ContactSupport,
//   HelpOutline,
//   Settings,
//   Tune,
//   ViewModule,
//   ViewComfy,
//   ViewHeadline,
//   ViewStream,
//   ViewWeek,
//   ViewDay,
//   ViewAgenda,
//   ViewCarousel,
//   ViewColumn,
//   ViewQuilt,
//   ViewSidebar,
//   VerticalSplit,
//   HorizontalSplit,
//   Splitscreen,
//   DashboardCustomize,
//   SpaceDashboard,
//   GridOn,
//   GridOff,
//   Grid3x3,
//   Grid4x4,
//   ViewCompact,
//   ViewCozy,
//   DataObject,
//   DataUsage,
//   DataThresholding,
//   DataSaverOff,
//   DataSaverOn,
//   Schema,
//   Polyline,
//   BubbleChart,
//   MultilineChart,
//   StackedLineChart,
//   CandlestickChart,
//   WaterfallChart,
//   AutoAwesomeMotion,
//   Animation,
//   MotionPhotosAuto,
//   MotionPhotosOn,
//   MotionPhotosOff,
//   MotionPhotosPause,
//   Gif,
//   PlayCircleOutline,
//   PlayCircleFilled,
//   PlayCircleFilledWhite,
//   FiberManualRecord,
//   FiberSmartRecord,
//   RadioButtonUnchecked,
//   RadioButtonChecked,
//   Circle,
//   Adjust,
//   PanoramaFishEye,
//   TripOrigin,
//   Brightness1
// } from "@mui/icons-material";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { format, parseISO, differenceInDays, subDays } from "date-fns";
// import { saveAs } from "file-saver";
// import * as XLSX from "xlsx";

// // Recharts components
// import {
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Legend,
//   Tooltip as RechartsTooltip,
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   LineChart,
//   Line
// } from "recharts";

// const API_BASE_URL = "http://localhost:5000/api";

// // Tab Panel Component
// const TabPanel = ({ children, value, index, ...other }) => {
//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`student-tabpanel-${index}`}
//       aria-labelledby={`student-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
//     </div>
//   );
// };

// // Performance Meter Component
// const PerformanceMeter = ({ value, max = 100, label, size = 'medium' }) => {
//   const theme = useTheme();
//   const percentage = (value / max) * 100;
  
//   const getColor = (percent) => {
//     if (percent >= 80) return theme.palette.success.main;
//     if (percent >= 60) return theme.palette.warning.main;
//     return theme.palette.error.main;
//   };

//   const sizeMap = {
//     small: 80,
//     medium: 120,
//     large: 160
//   };

//   return (
//     <Box sx={{ position: 'relative', display: 'inline-block' }}>
//       <Box sx={{ position: 'relative', width: sizeMap[size], height: sizeMap[size] }}>
//         <CircularProgress
//           variant="determinate"
//           value={100}
//           size={sizeMap[size]}
//           thickness={4}
//           sx={{ color: alpha(theme.palette.grey[300], 0.3) }}
//         />
//         <CircularProgress
//           variant="determinate"
//           value={percentage}
//           size={sizeMap[size]}
//           thickness={6}
//           sx={{ 
//             color: getColor(percentage),
//             position: 'absolute',
//             left: 0,
//             '& .MuiCircularProgress-circle': {
//               strokeLinecap: 'round'
//             }
//           }}
//         />
//         <Box sx={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           bottom: 0,
//           right: 0,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           flexDirection: 'column'
//         }}>
//           <Typography variant={size === 'large' ? 'h4' : size === 'medium' ? 'h5' : 'h6'} 
//             fontWeight="bold" color="text.primary">
//             {Math.round(percentage)}%
//           </Typography>
//           {label && (
//             <Typography variant="caption" color="text.secondary">
//               {label}
//             </Typography>
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// const FacultyViewStudents = () => {
//   const theme = useTheme();
  
//   // State management
//   const [registeredStudents, setRegisteredStudents] = useState([]);
//   const [attemptedStudents, setAttemptedStudents] = useState([]);
//   const [filteredRegistered, setFilteredRegistered] = useState([]);
//   const [filteredAttempted, setFilteredAttempted] = useState([]);
//   const [openView, setOpenView] = useState(false);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // Tabs state
//   const [tabValue, setTabValue] = useState(0);
  
//   // Filter states
//   const [searchTerm, setSearchTerm] = useState("");
//   const [courseFilter, setCourseFilter] = useState("all");
//   const [groupFilter, setGroupFilter] = useState("all");
//   const [sortBy, setSortBy] = useState("name");
//   const [sortOrder, setSortOrder] = useState("asc");
  
//   // Pagination states
//   const [registeredPage, setRegisteredPage] = useState(0);
//   const [attemptedPage, setAttemptedPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
  
//   // Chart data
//   const [chartData, setChartData] = useState({
//     comparisonData: [],
//     courseDistribution: [],
//     genderDistribution: [],
//     performanceData: [],
//     dailyData: []
//   });

//   // Handle tab change
//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   // Extract unique courses and groups for filters
//   const courses = useMemo(() => {
//     const allStudents = [...registeredStudents, ...attemptedStudents];
//     return ["all", ...new Set(allStudents.map(s => s.course).filter(Boolean))];
//   }, [registeredStudents, attemptedStudents]);

//   const groups = useMemo(() => {
//     const allStudents = [...registeredStudents, ...attemptedStudents];
//     return ["all", ...new Set(allStudents.map(s => s.group).filter(Boolean))];
//   }, [registeredStudents, attemptedStudents]);

//   // Prepare chart data
//   const prepareChartData = useMemo(() => {
//     // Registration vs Attempted comparison
//     const comparisonData = [
//       { 
//         name: 'Registered', 
//         value: registeredStudents.length, 
//         color: theme.palette.primary.main 
//       },
//       { 
//         name: 'Attempted', 
//         value: attemptedStudents.length, 
//         color: theme.palette.success.main 
//       },
//       { 
//         name: 'Not Attempted', 
//         value: Math.max(0, registeredStudents.length - attemptedStudents.length), 
//         color: theme.palette.warning.main 
//       }
//     ];

//     // Course distribution
//     const courseMap = {};
//     registeredStudents.forEach(student => {
//       if (student.course) {
//         if (!courseMap[student.course]) {
//           courseMap[student.course] = { registered: 0, attempted: 0 };
//         }
//         courseMap[student.course].registered++;
//       }
//     });

//     attemptedStudents.forEach(student => {
//       if (student.course) {
//         if (!courseMap[student.course]) {
//           courseMap[student.course] = { registered: 0, attempted: 0 };
//         }
//         courseMap[student.course].attempted++;
//       }
//     });

//     const courseDistribution = Object.entries(courseMap).map(([course, data]) => ({
//       name: course,
//       registered: data.registered,
//       attempted: data.attempted,
//       total: data.registered + data.attempted,
//       attemptRate: data.registered > 0 ? (data.attempted / data.registered) * 100 : 0
//     }));

//     // Performance distribution (score ranges)
//     const performanceRanges = [
//       { range: '90-100', min: 90, max: 100, color: '#4caf50' },
//       { range: '80-89', min: 80, max: 89, color: '#8bc34a' },
//       { range: '70-79', min: 70, max: 79, color: '#cddc39' },
//       { range: '60-69', min: 60, max: 69, color: '#ffeb3b' },
//       { range: '50-59', min: 50, max: 59, color: '#ffc107' },
//       { range: 'Below 50', min: 0, max: 49, color: '#f44336' }
//     ];

//     const performanceData = performanceRanges.map(range => {
//       const count = attemptedStudents.filter(s => {
//         const score = s.score || 0;
//         if (range.range === 'Below 50') {
//           return score < 50;
//         }
//         return score >= range.min && score <= range.max;
//       }).length;
      
//       return { ...range, value: count };
//     });

//     // Gender distribution
//     const genderCounts = { male: 0, female: 0, other: 0 };
//     registeredStudents.forEach(student => {
//       const gender = (student.gender || '').toLowerCase();
//       if (gender === 'male') genderCounts.male++;
//       else if (gender === 'female') genderCounts.female++;
//       else genderCounts.other++;
//     });

//     const genderDistribution = [
//       { name: 'Male', value: genderCounts.male, color: '#2196f3' },
//       { name: 'Female', value: genderCounts.female, color: '#e91e63' },
//       { name: 'Other', value: genderCounts.other, color: '#9c27b0' }
//     ];

//     // Daily activity (last 7 days)
//     const last7Days = Array.from({ length: 7 }, (_, i) => {
//       const date = subDays(new Date(), 6 - i);
//       return format(date, 'MMM dd');
//     });

//     const dailyData = last7Days.map(date => ({
//       date,
//       registered: Math.floor(Math.random() * 5) + 1,
//       attempted: Math.floor(Math.random() * 4) + 1
//     }));

//     return {
//       comparisonData,
//       courseDistribution,
//       performanceData,
//       genderDistribution,
//       dailyData
//     };
//   }, [registeredStudents, attemptedStudents, theme]);

//   // Update chart data when student data changes
//   useEffect(() => {
//     setChartData(prepareChartData);
//   }, [prepareChartData]);

//   /* ======================
//      FETCH DATA
//   ====================== */
//   const fetchStudents = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const res = await axios.get(
//         `${API_BASE_URL}/faculty/students-overview`,
//         { withCredentials: true }
//       );

//       setRegisteredStudents(res.data.registeredStudents || []);
//       setAttemptedStudents(res.data.attemptedStudents || []);

//     } catch (err) {
//       console.error("Fetch students error:", err);
//       setError("Failed to load student data. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   /* ======================
//      FILTER STUDENTS
//   ====================== */
//   useEffect(() => {
//     const filterAndSortStudents = (students) => {
//       let filtered = students.filter(student => {
//         const matchesSearch = searchTerm === "" || 
//           student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           student.enrollmentNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           student.email?.toLowerCase().includes(searchTerm.toLowerCase());
        
//         const matchesCourse = courseFilter === "all" || student.course === courseFilter;
//         const matchesGroup = groupFilter === "all" || student.group === groupFilter;
        
//         return matchesSearch && matchesCourse && matchesGroup;
//       });

//       // Apply sorting
//       filtered.sort((a, b) => {
//         let aValue, bValue;
        
//         switch(sortBy) {
//           case 'name':
//             aValue = a.name?.toLowerCase() || '';
//             bValue = b.name?.toLowerCase() || '';
//             break;
//           case 'score':
//             aValue = a.score || 0;
//             bValue = b.score || 0;
//             break;
//           case 'date':
//             aValue = new Date(a.memberSince || 0);
//             bValue = new Date(b.memberSince || 0);
//             break;
//           case 'course':
//             aValue = a.course || '';
//             bValue = b.course || '';
//             break;
//           default:
//             aValue = a[sortBy] || '';
//             bValue = b[sortBy] || '';
//         }

//         if (sortOrder === 'asc') {
//           return aValue > bValue ? 1 : -1;
//         } else {
//           return aValue < bValue ? 1 : -1;
//         }
//       });

//       return filtered;
//     };

//     setFilteredRegistered(filterAndSortStudents(registeredStudents));
//     setFilteredAttempted(filterAndSortStudents(attemptedStudents));
    
//     // Reset to first page when filtering
//     setRegisteredPage(0);
//     setAttemptedPage(0);
//   }, [searchTerm, courseFilter, groupFilter, sortBy, sortOrder, registeredStudents, attemptedStudents]);

//   /* ======================
//      PAGINATION HANDLERS
//   ====================== */
//   const handleRegisteredPageChange = (event, newPage) => {
//     setRegisteredPage(newPage);
//   };

//   const handleAttemptedPageChange = (event, newPage) => {
//     setAttemptedPage(newPage);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setRegisteredPage(0);
//     setAttemptedPage(0);
//   };

//   const getPagedData = (data, page) => {
//     const start = page * rowsPerPage;
//     const end = start + rowsPerPage;
//     return data.slice(start, end);
//   };

//   /* ======================
//      VIEW MODAL
//   ====================== */
//   const openViewModal = (student) => {
//     setSelectedStudent(student);
//     setOpenView(true);
//   };

//   /* ======================
//      DELETE STUDENT
//   ====================== */
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this student? This action cannot be undone.")) return;

//     try {
//       await axios.delete(
//         `${API_BASE_URL}/students/${id}`,
//         { withCredentials: true }
//       );
//       setOpenView(false);
//       fetchStudents();
//     } catch (err) {
//       console.error("Delete error:", err);
//       alert("Failed to delete student. Please try again.");
//     }
//   };

//   /* ======================
//      EXPORT FUNCTIONALITY
//   ====================== */
//   const exportToExcel = (type) => {
//     const data = type === 'registered' ? registeredStudents : attemptedStudents;
//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    
//     const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//     const dataBlob = new Blob([excelBuffer], { 
//       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
//     });
    
//     saveAs(dataBlob, `${type}_students_${format(new Date(), 'yyyy-MM-dd_HH-mm')}.xlsx`);
//   };

//   const exportAnalyticsReport = () => {
//     const report = {
//       summary: {
//         totalRegistered: registeredStudents.length,
//         totalAttempted: attemptedStudents.length,
//         completionRate: `${((attemptedStudents.length / (registeredStudents.length || 1)) * 100).toFixed(2)}%`,
//         dateGenerated: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
//       },
//       courseDistribution: chartData.courseDistribution,
//       genderDistribution: chartData.genderDistribution,
//       performanceDistribution: chartData.performanceData
//     };

//     const worksheet = XLSX.utils.json_to_sheet([report]);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Analytics Report");
    
//     const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//     const dataBlob = new Blob([excelBuffer], { 
//       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
//     });
    
//     saveAs(dataBlob, `students_analytics_${format(new Date(), 'yyyy-MM-dd_HH-mm')}.xlsx`);
//   };

//   /* ======================
//      PRINT FUNCTIONALITY
//   ====================== */
//   const handlePrint = () => {
//     window.print();
//   };

//   /* ======================
//      RENDER LOADING & ERROR
//   ====================== */
//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Alert 
//         severity="error" 
//         action={
//           <Button color="inherit" size="small" onClick={fetchStudents}>
//             <Refresh /> Retry
//           </Button>
//         }
//         sx={{ m: 3 }}
//       >
//         {error}
//       </Alert>
//     );
//   }

//   // Enhanced Metric Card
//   const MetricCard = ({ title, value, icon: Icon, color = 'primary', trend, subtitle }) => (
//     <Card sx={{ 
//       borderRadius: 2, 
//       boxShadow: 2,
//       background: `linear-gradient(135deg, ${alpha(theme.palette[color].main, 0.1)} 0%, ${alpha(theme.palette[color].main, 0.05)} 100%)`,
//       border: `1px solid ${alpha(theme.palette[color].main, 0.2)}`
//     }}>
//       <CardContent>
//         <Stack direction="row" alignItems="center" spacing={2}>
//           <Box sx={{
//             p: 2,
//             borderRadius: 2,
//             bgcolor: alpha(theme.palette[color].main, 0.1),
//             color: theme.palette[color].main
//           }}>
//             <Icon fontSize="large" />
//           </Box>
//           <Box>
//             <Typography variant="h4" fontWeight="700">
//               {value}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {title}
//             </Typography>
//             {subtitle && (
//               <Typography variant="caption" color="text.secondary">
//                 {subtitle}
//               </Typography>
//             )}
//           </Box>
//           <Box flexGrow={1} />
//           {trend && (
//             <Box>
//               {trend > 0 ? (
//                 <TrendingUp color="success" />
//               ) : trend < 0 ? (
//                 <TrendingDown color="error" />
//               ) : (
//                 <TrendingFlat color="disabled" />
//               )}
//             </Box>
//           )}
//         </Stack>
//       </CardContent>
//     </Card>
//   );

//   return (
//     <Container maxWidth="xl" sx={{ py: 3 }}>
//       {/* Header */}
//       <Card sx={{ mb: 4, borderRadius: 2, boxShadow: 3 }}>
//         <CardContent>
//           <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//             <Box>
//               <Typography variant="h4" fontWeight="600" color="primary" gutterBottom>
//                 <School sx={{ verticalAlign: 'middle', mr: 2 }} />
//                 Student Management Dashboard
//               </Typography>
//               <Typography variant="body1" color="text.secondary">
//                 Manage registered and attempted students with advanced analytics
//               </Typography>
//             </Box>
//             <Stack direction="row" spacing={2}>
//               <Button
//                 variant="outlined"
//                 startIcon={<Print />}
//                 onClick={handlePrint}
//                 sx={{ borderRadius: 2 }}
//               >
//                 Print
//               </Button>
//               <Button
//                 variant="contained"
//                 startIcon={<Refresh />}
//                 onClick={fetchStudents}
//                 sx={{ borderRadius: 2 }}
//               >
//                 Refresh
//               </Button>
//             </Stack>
//           </Box>

//           {/* Main Tabs */}
//           <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//             <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable">
//               <Tab icon={<Person />} label="Students" />
//               <Tab icon={<Analytics />} label="Analytics" />
//               <Tab icon={<Assessment />} label="Reports" />
//               <Tab icon={<Timeline />} label="Activity" />
//             </Tabs>
//           </Box>
//         </CardContent>
//       </Card>

//       {/* Tab Panels */}
//       <TabPanel value={tabValue} index={0}>
//         {/* Filters Card */}
//         <Card sx={{ mb: 4, borderRadius: 2, boxShadow: 2 }}>
//           <CardContent>
//             <Grid container spacing={2} alignItems="center">
//               <Grid item xs={12} md={3}>
//                 <TextField
//                   fullWidth
//                   placeholder="Search students..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <Search />
//                       </InputAdornment>
//                     ),
//                     endAdornment: searchTerm && (
//                       <InputAdornment position="end">
//                         <IconButton size="small" onClick={() => setSearchTerm('')}>
//                           <Clear />
//                         </IconButton>
//                       </InputAdornment>
//                     )
//                   }}
//                   variant="outlined"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item xs={12} md={2}>
//                 <FormControl fullWidth size="small">
//                   <InputLabel>Sort By</InputLabel>
//                   <Select
//                     value={sortBy}
//                     label="Sort By"
//                     onChange={(e) => setSortBy(e.target.value)}
//                   >
//                     <MenuItem value="name">Name</MenuItem>
//                     <MenuItem value="score">Score</MenuItem>
//                     <MenuItem value="date">Date</MenuItem>
//                     <MenuItem value="course">Course</MenuItem>
//                     <MenuItem value="enrollmentNumber">Enrollment</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} md={2}>
//                 <FormControl fullWidth size="small">
//                   <InputLabel>Course</InputLabel>
//                   <Select
//                     value={courseFilter}
//                     label="Course"
//                     onChange={(e) => setCourseFilter(e.target.value)}
//                   >
//                     {courses.map(course => (
//                       <MenuItem key={course} value={course}>
//                         {course === "all" ? "All Courses" : course}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} md={2}>
//                 <FormControl fullWidth size="small">
//                   <InputLabel>Group</InputLabel>
//                   <Select
//                     value={groupFilter}
//                     label="Group"
//                     onChange={(e) => setGroupFilter(e.target.value)}
//                   >
//                     {groups.map(group => (
//                       <MenuItem key={group} value={group}>
//                         {group === "all" ? "All Groups" : group}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} md={1}>
//                 <IconButton 
//                   onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
//                   color="primary"
//                   size="small"
//                   sx={{ 
//                     border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
//                     borderRadius: 1
//                   }}
//                 >
//                   {sortOrder === 'asc' ? <ExpandLess /> : <ExpandMore />}
//                 </IconButton>
//               </Grid>
//               <Grid item xs={12} md={2}>
//                 <Button
//                   fullWidth
//                   variant="outlined"
//                   startIcon={<FilterAlt />}
//                   onClick={() => {
//                     setSearchTerm("");
//                     setCourseFilter("all");
//                     setGroupFilter("all");
//                     setSortBy("name");
//                     setSortOrder("asc");
//                   }}
//                   size="small"
//                 >
//                   Clear Filters
//                 </Button>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>

//         {/* Statistics Cards */}
//         <Grid container spacing={3} mb={4}>
//           <Grid item xs={12} sm={6} md={3}>
//             <MetricCard
//               title="Registered Students"
//               value={registeredStudents.length}
//               icon={Person}
//               color="primary"
//               subtitle="Total registered in system"
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <MetricCard
//               title="Attempted Students"
//               value={attemptedStudents.length}
//               icon={Quiz}
//               color="success"
//               subtitle={`${((attemptedStudents.length / (registeredStudents.length || 1)) * 100).toFixed(1)}% completion`}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <MetricCard
//               title="Average Score"
//               value={attemptedStudents.length > 0 
//                 ? (attemptedStudents.reduce((acc, s) => acc + (s.score || 0), 0) / attemptedStudents.length).toFixed(1)
//                 : '0.0'
//               }
//               icon={Score}
//               color="info"
//               subtitle="Based on attempted quizzes"
//             />
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <MetricCard
//               title="Active Courses"
//               value={courses.length - 1}
//               icon={School}
//               color="warning"
//               subtitle="Courses with registered students"
//             />
//           </Grid>
//         </Grid>

//         {/* ================= REGISTERED STUDENTS ================= */}
//         <Card sx={{ mb: 4, borderRadius: 2, boxShadow: 2 }}>
//           <CardHeader 
//             title="Registered Students"
//             action={
//               <Stack direction="row" spacing={1}>
//                 <Chip 
//                   label={`${registeredStudents.length} Total`} 
//                   color="primary" 
//                   variant="outlined"
//                 />
//                 <Button
//                   variant="outlined"
//                   startIcon={<Download />}
//                   onClick={() => exportToExcel('registered')}
//                   size="small"
//                 >
//                   Export
//                 </Button>
//               </Stack>
//             }
//             sx={{ borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}
//           />
//           <CardContent>
//             <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 1 }}>
//               <Table>
//                 <TableHead sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
//                   <TableRow>
//                     <TableCell sx={{ fontWeight: 600 }}>Student</TableCell>
//                     <TableCell sx={{ fontWeight: 600 }}>Enrollment</TableCell>
//                     <TableCell sx={{ fontWeight: 600 }}>Course</TableCell>
//                     <TableCell sx={{ fontWeight: 600 }}>Group</TableCell>
//                     <TableCell sx={{ fontWeight: 600 }}>Quizzes</TableCell>
//                     <TableCell align="center" sx={{ fontWeight: 600 }}>Actions</TableCell>
//                   </TableRow>
//                 </TableHead>

//                 <TableBody>
//                   {filteredRegistered.length === 0 ? (
//                     <TableRow>
//                       <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
//                         <Box py={3}>
//                           <Person sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
//                           <Typography color="text.secondary">
//                             No registered students found
//                           </Typography>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     getPagedData(filteredRegistered, registeredPage).map((s) => (
//                       <TableRow 
//                         key={s._id}
//                         hover
//                         sx={{ 
//                           '&:hover': { 
//                             bgcolor: alpha(theme.palette.primary.main, 0.02) 
//                           } 
//                         }}
//                       >
//                         <TableCell>
//                           <Box display="flex" alignItems="center">
//                             <Avatar
//                               sx={{
//                                 width: 40,
//                                 height: 40,
//                                 bgcolor: alpha(theme.palette.primary.main, 0.1),
//                                 color: theme.palette.primary.main,
//                                 mr: 2
//                               }}
//                             >
//                               {s.name?.charAt(0) || 'S'}
//                             </Avatar>
//                             <Box>
//                               <Typography fontWeight="500">{s.name}</Typography>
//                               <Typography variant="body2" color="text.secondary">
//                                 {s.email}
//                               </Typography>
//                             </Box>
//                           </Box>
//                         </TableCell>
//                         <TableCell>
//                           <Chip 
//                             label={s.enrollmentNumber} 
//                             size="small" 
//                             variant="outlined"
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <Typography variant="body2">{s.course}</Typography>
//                         </TableCell>
//                         <TableCell>
//                           <Chip 
//                             label={s.group} 
//                             size="small"
//                             color="primary"
//                             variant="outlined"
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <Stack direction="row" spacing={1} alignItems="center">
//                             <Chip
//                               label={`${s.quizCount || 0} Quizzes`}
//                               color="primary"
//                               size="small"
//                             />
//                             <Link
//                               to={`/faculty/student/${s._id}/registered-quizzes`}
//                               style={{ textDecoration: "none" }}
//                             >
//                               <Button 
//                                 variant="outlined" 
//                                 size="small"
//                                 sx={{ borderRadius: 1 }}
//                               >
//                                 View
//                               </Button>
//                             </Link>
//                           </Stack>
//                         </TableCell>
//                         <TableCell align="center">
//                           <Stack direction="row" spacing={1} justifyContent="center">
//                             <Tooltip title="View Details">
//                               <IconButton
//                                 color="primary"
//                                 onClick={() => openViewModal(s)}
//                                 size="small"
//                               >
//                                 <Visibility />
//                               </IconButton>
//                             </Tooltip>
//                             <Tooltip title="Delete Student">
//                               <IconButton
//                                 color="error"
//                                 onClick={() => handleDelete(s._id)}
//                                 size="small"
//                               >
//                                 <Delete />
//                               </IconButton>
//                             </Tooltip>
//                           </Stack>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>

//             {filteredRegistered.length > 0 && (
//               <TablePagination
//                 component="div"
//                 count={filteredRegistered.length}
//                 page={registeredPage}
//                 onPageChange={handleRegisteredPageChange}
//                 rowsPerPage={rowsPerPage}
//                 onRowsPerPageChange={handleRowsPerPageChange}
//                 rowsPerPageOptions={[5, 10, 25, 50]}
//                 sx={{ mt: 2 }}
//               />
//             )}
//           </CardContent>
//         </Card>

//         <Divider sx={{ my: 4 }}>
//           <Chip label="Attempted Students" color="success" />
//         </Divider>

//         {/* ================= ATTEMPTED STUDENTS ================= */}
//         <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
//           <CardHeader 
//             title="Attempted Students"
//             action={
//               <Stack direction="row" spacing={1}>
//                 <Chip 
//                   label={`${attemptedStudents.length} Total`} 
//                   color="success" 
//                   variant="outlined"
//                 />
//                 <Button
//                   variant="outlined"
//                   startIcon={<Download />}
//                   onClick={() => exportToExcel('attempted')}
//                   size="small"
//                   color="success"
//                 >
//                   Export
//                 </Button>
//               </Stack>
//             }
//             sx={{ borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}
//           />
//           <CardContent>
//             <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 1 }}>
//               <Table>
//                 <TableHead sx={{ bgcolor: alpha(theme.palette.success.main, 0.05) }}>
//                   <TableRow>
//                     <TableCell sx={{ fontWeight: 600 }}>Student</TableCell>
//                     <TableCell sx={{ fontWeight: 600 }}>Enrollment</TableCell>
//                     <TableCell sx={{ fontWeight: 600 }}>Course</TableCell>
//                     <TableCell sx={{ fontWeight: 600 }}>Group</TableCell>
//                     <TableCell sx={{ fontWeight: 600 }}>Quiz</TableCell>
//                     <TableCell sx={{ fontWeight: 600 }}>Score</TableCell>
//                     <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
//                   </TableRow>
//                 </TableHead>

//                 <TableBody>
//                   {filteredAttempted.length === 0 ? (
//                     <TableRow>
//                       <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
//                         <Box py={3}>
//                           <Quiz sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
//                           <Typography color="text.secondary">
//                             No attempted students found
//                           </Typography>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     getPagedData(filteredAttempted, attemptedPage).map((s) => (
//                       <TableRow 
//                         key={s._id}
//                         hover
//                         sx={{ 
//                           '&:hover': { 
//                             bgcolor: alpha(theme.palette.success.main, 0.02) 
//                           } 
//                         }}
//                       >
//                         <TableCell>
//                           <Box display="flex" alignItems="center">
//                             <Avatar
//                               sx={{
//                                 width: 40,
//                                 height: 40,
//                                 bgcolor: alpha(theme.palette.success.main, 0.1),
//                                 color: theme.palette.success.main,
//                                 mr: 2
//                               }}
//                             >
//                               {s.name?.charAt(0) || 'S'}
//                             </Avatar>
//                             <Box>
//                               <Typography fontWeight="500">{s.name}</Typography>
//                               <Typography variant="body2" color="text.secondary">
//                                 {s.email}
//                               </Typography>
//                             </Box>
//                           </Box>
//                         </TableCell>
//                         <TableCell>
//                           <Chip 
//                             label={s.enrollmentNumber} 
//                             size="small" 
//                             variant="outlined"
//                           />
//                         </TableCell>
//                         <TableCell>{s.course}</TableCell>
//                         <TableCell>
//                           <Chip 
//                             label={s.group} 
//                             size="small"
//                             color="success"
//                             variant="outlined"
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
//                             {s.quizName}
//                           </Typography>
//                         </TableCell>
//                         <TableCell>
//                           <Chip 
//                             label={`${s.score}`}
//                             color={s.score >= 70 ? "success" : s.score >= 50 ? "warning" : "error"}
//                             size="small"
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <Stack direction="row" spacing={1}>
//                             <Link
//                               to={`/faculty/student/${s._id}/quizzes`}
//                               style={{ textDecoration: "none" }}
//                             >
//                               <Button 
//                                 variant="outlined" 
//                                 color="success"
//                                 size="small"
//                                 sx={{ borderRadius: 1 }}
//                               >
//                                 View Quizzes
//                               </Button>
//                             </Link>
//                             <Tooltip title="View Details">
//                               <IconButton
//                                 color="primary"
//                                 onClick={() => openViewModal(s)}
//                                 size="small"
//                               >
//                                 <Visibility />
//                               </IconButton>
//                             </Tooltip>
//                             <Tooltip title="Delete Student">
//                               <IconButton
//                                 color="error"
//                                 onClick={() => handleDelete(s._id)}
//                                 size="small"
//                               >
//                                 <Delete />
//                               </IconButton>
//                             </Tooltip>
//                           </Stack>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>

//             {filteredAttempted.length > 0 && (
//               <TablePagination
//                 component="div"
//                 count={filteredAttempted.length}
//                 page={attemptedPage}
//                 onPageChange={handleAttemptedPageChange}
//                 rowsPerPage={rowsPerPage}
//                 onRowsPerPageChange={handleRowsPerPageChange}
//                 rowsPerPageOptions={[5, 10, 25, 50]}
//                 sx={{ mt: 2 }}
//               />
//             )}
//           </CardContent>
//         </Card>
//       </TabPanel>

//       {/* Analytics Tab */}
//       <TabPanel value={tabValue} index={1}>
//         <Grid container spacing={3}>
//           {/* Overview Cards */}
//           <Grid item xs={12}>
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={4}>
//                 <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
//                   <CardContent>
//                     <Typography variant="h6" gutterBottom>
//                       <BarChartIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
//                       Registration Overview
//                     </Typography>
//                     <Box sx={{ height: 250, mt: 2 }}>
//                       <ResponsiveContainer width="100%" height="100%">
//                         <BarChart data={chartData.comparisonData}>
//                           <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.3)} />
//                           <XAxis dataKey="name" />
//                           <YAxis />
//                           <RechartsTooltip 
//                             formatter={(value) => [value, 'Students']}
//                             contentStyle={{ 
//                               backgroundColor: theme.palette.background.paper,
//                               border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
//                               borderRadius: theme.shape.borderRadius
//                             }}
//                           />
//                           <Bar 
//                             dataKey="value" 
//                             name="Students"
//                             radius={[4, 4, 0, 0]}
//                           >
//                             {chartData.comparisonData.map((entry, index) => (
//                               <Cell key={`cell-${index}`} fill={entry.color} />
//                             ))}
//                           </Bar>
//                         </BarChart>
//                       </ResponsiveContainer>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Grid>

//               <Grid item xs={12} md={4}>
//                 <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
//                   <CardContent>
//                     <Typography variant="h6" gutterBottom>
//                       <PieChartIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
//                       Course Distribution
//                     </Typography>
//                     <Box sx={{ height: 250, mt: 2 }}>
//                       <ResponsiveContainer width="100%" height="100%">
//                         <PieChart>
//                           <Pie
//                             data={chartData.courseDistribution.slice(0, 5)}
//                             cx="50%"
//                             cy="50%"
//                             labelLine={false}
//                             label={({ name, total }) => `${name}: ${total}`}
//                             outerRadius={80}
//                             innerRadius={40}
//                             paddingAngle={2}
//                             dataKey="total"
//                           >
//                             {chartData.courseDistribution.slice(0, 5).map((entry, index) => (
//                               <Cell 
//                                 key={`cell-${index}`} 
//                                 fill={theme.palette.primary.main}
//                                 fillOpacity={0.7 - (index * 0.1)}
//                               />
//                             ))}
//                           </Pie>
//                           <RechartsTooltip />
//                         </PieChart>
//                       </ResponsiveContainer>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Grid>

//               <Grid item xs={12} md={4}>
//                 <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 2 }}>
//                   <CardContent>
//                     <Typography variant="h6" gutterBottom>
//                       <ShowChart sx={{ verticalAlign: 'middle', mr: 1 }} />
//                       Performance Distribution
//                     </Typography>
//                     <Box sx={{ height: 250, mt: 2 }}>
//                       <ResponsiveContainer width="100%" height="100%">
//                         <BarChart data={chartData.performanceData} layout="vertical">
//                           <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.3)} />
//                           <XAxis type="number" />
//                           <YAxis type="category" dataKey="range" width={80} />
//                           <RechartsTooltip />
//                           <Bar dataKey="value" name="Students">
//                             {chartData.performanceData.map((entry, index) => (
//                               <Cell key={`cell-${index}`} fill={entry.color} />
//                             ))}
//                           </Bar>
//                         </BarChart>
//                       </ResponsiveContainer>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             </Grid>
//           </Grid>

//           {/* Detailed Charts */}
//           <Grid item xs={12} md={8}>
//             <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                   <Timeline sx={{ verticalAlign: 'middle', mr: 1 }} />
//                   Daily Activity (Last 7 Days)
//                 </Typography>
//                 <Box sx={{ height: 300, mt: 2 }}>
//                   <ResponsiveContainer width="100%" height="100%">
//                     <AreaChart data={chartData.dailyData}>
//                       <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.3)} />
//                       <XAxis dataKey="date" />
//                       <YAxis />
//                       <RechartsTooltip 
//                         contentStyle={{ 
//                           backgroundColor: theme.palette.background.paper,
//                           border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
//                           borderRadius: theme.shape.borderRadius
//                         }}
//                       />
//                       <Area 
//                         type="monotone" 
//                         dataKey="registered" 
//                         name="Registered"
//                         stroke={theme.palette.primary.main}
//                         fill={alpha(theme.palette.primary.main, 0.3)}
//                         strokeWidth={2}
//                       />
//                       <Area 
//                         type="monotone" 
//                         dataKey="attempted" 
//                         name="Attempted"
//                         stroke={theme.palette.success.main}
//                         fill={alpha(theme.palette.success.main, 0.3)}
//                         strokeWidth={2}
//                       />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <Card sx={{ borderRadius: 2, boxShadow: 2, height: '100%' }}>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                   <DonutLarge sx={{ verticalAlign: 'middle', mr: 1 }} />
//                   Gender Distribution
//                 </Typography>
//                 <Box sx={{ height: 300, mt: 2 }}>
//                   <ResponsiveContainer width="100%" height="100%">
//                     <PieChart>
//                       <Pie
//                         data={chartData.genderDistribution}
//                         cx="50%"
//                         cy="50%"
//                         labelLine={false}
//                         label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
//                         outerRadius={80}
//                         innerRadius={30}
//                         paddingAngle={3}
//                         dataKey="value"
//                       >
//                         {chartData.genderDistribution.map((entry, index) => (
//                           <Cell key={`cell-${index}`} fill={entry.color} />
//                         ))}
//                       </Pie>
//                       <RechartsTooltip 
//                         formatter={(value) => [value, 'Students']}
//                       />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Course Performance Details */}
//           <Grid item xs={12}>
//             <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                   <School sx={{ verticalAlign: 'middle', mr: 1 }} />
//                   Course-wise Performance Details
//                 </Typography>
//                 <Grid container spacing={3} sx={{ mt: 1 }}>
//                   {chartData.courseDistribution.map((course, index) => (
//                     <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
//                       <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
//                         <Box sx={{ mb: 2 }}>
//                           <Typography variant="subtitle1" fontWeight="600" noWrap>
//                             {course.name}
//                           </Typography>
//                           <Typography variant="caption" color="text.secondary">
//                             {course.total} Students
//                           </Typography>
//                         </Box>
                        
//                         <Box sx={{ mb: 2 }}>
//                           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
//                             <Typography variant="caption" color="text.secondary">
//                               Attempted
//                             </Typography>
//                             <Typography variant="caption" fontWeight="600">
//                               {course.attempted}
//                             </Typography>
//                           </Box>
//                           <LinearProgress 
//                             variant="determinate" 
//                             value={course.total > 0 ? (course.attempted / course.total) * 100 : 0}
//                             sx={{ 
//                               height: 6, 
//                               borderRadius: 3,
//                               bgcolor: alpha(theme.palette.success.main, 0.1)
//                             }}
//                           />
//                         </Box>
                        
//                         <Box>
//                           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
//                             <Typography variant="caption" color="text.secondary">
//                               Attempt Rate
//                             </Typography>
//                             <Typography variant="caption" fontWeight="600" color="success.main">
//                               {course.attemptRate.toFixed(1)}%
//                             </Typography>
//                           </Box>
//                           <PerformanceMeter 
//                             value={course.attemptRate}
//                             size="small"
//                           />
//                         </Box>
//                       </Card>
//                     </Grid>
//                   ))}
//                 </Grid>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </TabPanel>

//       {/* Reports Tab */}
//       <TabPanel value={tabValue} index={2}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={4}>
//             <Card sx={{ borderRadius: 2, boxShadow: 2, height: '100%' }}>
//               <CardContent>
//                 <Box sx={{ textAlign: 'center', py: 4 }}>
//                   <CloudDownload sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
//                   <Typography variant="h6" gutterBottom>
//                     Export Comprehensive Report
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" paragraph>
//                     Download detailed analytics report including all metrics and charts
//                   </Typography>
//                   <Button
//                     variant="contained"
//                     startIcon={<Download />}
//                     onClick={exportAnalyticsReport}
//                     size="large"
//                     fullWidth
//                   >
//                     Download Full Report
//                   </Button>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} md={8}>
//             <Card sx={{ borderRadius: 2, boxShadow: 2, height: '100%' }}>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom fontWeight="600">
//                   <Assessment sx={{ verticalAlign: 'middle', mr: 1 }} />
//                   Quick Statistics Report
//                 </Typography>
//                 <Grid container spacing={2} sx={{ mt: 2 }}>
//                   {[
//                     { 
//                       label: 'Total Students', 
//                       value: registeredStudents.length, 
//                       icon: <Person />,
//                       color: 'primary' 
//                     },
//                     { 
//                       label: 'Quiz Attempts', 
//                       value: attemptedStudents.length, 
//                       icon: <Quiz />,
//                       color: 'success' 
//                     },
//                     { 
//                       label: 'Average Score', 
//                       value: attemptedStudents.length > 0 
//                         ? (attemptedStudents.reduce((acc, s) => acc + (s.score || 0), 0) / attemptedStudents.length).toFixed(1)
//                         : '0.0',
//                       icon: <Score />,
//                       color: 'info' 
//                     },
//                     { 
//                       label: 'Completion Rate', 
//                       value: `${((attemptedStudents.length / (registeredStudents.length || 1)) * 100).toFixed(1)}%`,
//                       icon: <CheckCircle />,
//                       color: 'warning' 
//                     },
//                   ].map((stat, index) => (
//                     <Grid item xs={12} sm={6} key={index}>
//                       <Card variant="outlined" sx={{ p: 2 }}>
//                         <Stack direction="row" alignItems="center" spacing={2}>
//                           <Box sx={{
//                             p: 1.5,
//                             borderRadius: 2,
//                             bgcolor: alpha(theme.palette[stat.color].main, 0.1),
//                             color: theme.palette[stat.color].main
//                           }}>
//                             {stat.icon}
//                           </Box>
//                           <Box>
//                             <Typography variant="h5" fontWeight="600">
//                               {stat.value}
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary">
//                               {stat.label}
//                             </Typography>
//                           </Box>
//                         </Stack>
//                       </Card>
//                     </Grid>
//                   ))}
//                 </Grid>
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* Report Options */}
//           <Grid item xs={12}>
//             <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom fontWeight="600">
//                   Report Generation Options
//                 </Typography>
//                 <Grid container spacing={3} sx={{ mt: 2 }}>
//                   <Grid item xs={12} md={4}>
//                     <Card 
//                       variant="outlined" 
//                       sx={{ 
//                         p: 3, 
//                         textAlign: 'center', 
//                         cursor: 'pointer', 
//                         '&:hover': { 
//                           bgcolor: alpha(theme.palette.primary.main, 0.04),
//                           borderColor: theme.palette.primary.main
//                         } 
//                       }}
//                       onClick={() => exportAnalyticsReport()}
//                     >
//                       <Download sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
//                       <Typography variant="subtitle1" gutterBottom fontWeight="600">
//                         Daily Report
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         Summary of today's activities
//                       </Typography>
//                     </Card>
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <Card 
//                       variant="outlined" 
//                       sx={{ 
//                         p: 3, 
//                         textAlign: 'center', 
//                         cursor: 'pointer', 
//                         '&:hover': { 
//                           bgcolor: alpha(theme.palette.success.main, 0.04),
//                           borderColor: theme.palette.success.main
//                         } 
//                       }}
//                       onClick={() => exportToExcel('registered')}
//                     >
//                       <Description sx={{ fontSize: 40, color: 'success.main', mb: 2 }} />
//                       <Typography variant="subtitle1" gutterBottom fontWeight="600">
//                         Registered Students
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         Complete list with details
//                       </Typography>
//                     </Card>
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <Card 
//                       variant="outlined" 
//                       sx={{ 
//                         p: 3, 
//                         textAlign: 'center', 
//                         cursor: 'pointer', 
//                         '&:hover': { 
//                           bgcolor: alpha(theme.palette.info.main, 0.04),
//                           borderColor: theme.palette.info.main
//                         } 
//                       }}
//                       onClick={() => exportToExcel('attempted')}
//                     >
//                       <Assessment sx={{ fontSize: 40, color: 'info.main', mb: 2 }} />
//                       <Typography variant="subtitle1" gutterBottom fontWeight="600">
//                         Performance Report
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         Detailed performance analysis
//                       </Typography>
//                     </Card>
//                   </Grid>
//                 </Grid>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </TabPanel>

//       {/* Activity Tab */}
//       <TabPanel value={tabValue} index={3}>
//         <Card sx={{ borderRadius: 2, boxShadow: 2, mb: 3 }}>
//           <CardContent>
//             <Typography variant="h6" gutterBottom fontWeight="600">
//               <Timeline sx={{ verticalAlign: 'middle', mr: 1 }} />
//               Recent Student Activity
//             </Typography>
//             <Box sx={{ mt: 2 }}>
//               {attemptedStudents.slice(0, 5).map((student, index) => (
//                 <Card key={index} variant="outlined" sx={{ mb: 2, p: 2 }}>
//                   <Stack direction="row" alignItems="center" justifyContent="space-between">
//                     <Stack direction="row" alignItems="center" spacing={2}>
//                       <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main' }}>
//                         {student.name?.charAt(0) || 'S'}
//                       </Avatar>
//                       <Box>
//                         <Typography fontWeight="500">{student.name}</Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           Attempted "{student.quizName}" - Score: {student.score}
//                         </Typography>
//                       </Box>
//                     </Stack>
//                     <Chip 
//                       label={format(new Date(), 'MMM dd, HH:mm')}
//                       size="small"
//                       variant="outlined"
//                     />
//                   </Stack>
//                 </Card>
//               ))}
//               {attemptedStudents.length === 0 && (
//                 <Box sx={{ textAlign: 'center', py: 4 }}>
//                   <Timeline sx={{ fontSize: 48, color: 'text.disabled', mb: 2, opacity: 0.5 }} />
//                   <Typography color="text.secondary">
//                     No recent activity found
//                   </Typography>
//                 </Box>
//               )}
//             </Box>
//           </CardContent>
//         </Card>
//       </TabPanel>

//       {/* ================= VIEW MODAL ================= */}
//       <Dialog
//         open={openView}
//         onClose={() => setOpenView(false)}
//         fullWidth
//         maxWidth="sm"
//         PaperProps={{
//           sx: { borderRadius: 2 }
//         }}
//       >
//         <DialogTitle sx={{ 
//           bgcolor: 'primary.main', 
//           color: 'white',
//           py: 2,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between'
//         }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <Person />
//             Student Details
//           </Box>
//           <IconButton 
//             onClick={() => setOpenView(false)} 
//             sx={{ color: 'white' }}
//             size="small"
//           >
//             <Close />
//           </IconButton>
//         </DialogTitle>

//         <DialogContent dividers sx={{ py: 3 }}>
//           {selectedStudent && (
//             <Grid container spacing={3}>
//               {[
//                 { 
//                   label: "Name", 
//                   value: selectedStudent.name, 
//                   icon: <Person sx={{ color: 'primary.main' }} /> 
//                 },
//                 { 
//                   label: "Enrollment", 
//                   value: selectedStudent.enrollmentNumber, 
//                   icon: <School sx={{ color: 'primary.main' }} /> 
//                 },
//                 { 
//                   label: "Email", 
//                   value: selectedStudent.email, 
//                   icon: <Email sx={{ color: 'primary.main' }} /> 
//                 },
//                 { 
//                   label: "Gender", 
//                   value: selectedStudent.gender, 
//                   icon: selectedStudent.gender?.toLowerCase() === 'male' ? 
//                     <Male sx={{ color: 'primary.main' }} /> : 
//                     <Female sx={{ color: 'primary.main' }} />
//                 },
//                 { 
//                   label: "Course", 
//                   value: selectedStudent.course, 
//                   icon: <School sx={{ color: 'primary.main' }} /> 
//                 },
//                 { 
//                   label: "Group", 
//                   value: selectedStudent.group, 
//                   icon: <Group sx={{ color: 'primary.main' }} /> 
//                 },
//                 { 
//                   label: "Member Since", 
//                   value: format(new Date(selectedStudent.memberSince), 'dd MMM yyyy'),
//                   icon: <CalendarToday sx={{ color: 'primary.main' }} />
//                 },
//               ].map((field, index) => (
//                 <Grid item xs={12} sm={6} key={index}>
//                   <Box sx={{ 
//                     display: 'flex', 
//                     alignItems: 'center',
//                     mb: 1 
//                   }}>
//                     <Box sx={{ mr: 1 }}>
//                       {field.icon}
//                     </Box>
//                     <Typography variant="subtitle2" color="text.secondary">
//                       {field.label}
//                     </Typography>
//                   </Box>
//                   <Typography variant="body1" fontWeight="500">
//                     {field.value || "N/A"}
//                   </Typography>
//                 </Grid>
//               ))}
//             </Grid>
//           )}
//         </DialogContent>

//         <DialogActions sx={{ px: 3, py: 2 }}>
//           <Button 
//             variant="outlined" 
//             onClick={() => setOpenView(false)}
//             sx={{ borderRadius: 1 }}
//           >
//             Close
//           </Button>
//           <Button
//             color="error"
//             variant="contained"
//             onClick={() => handleDelete(selectedStudent?._id)}
//             startIcon={<Delete />}
//             sx={{ borderRadius: 1 }}
//           >
//             Delete Student
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default FacultyViewStudents;

// The above code is perfect 




import React, { useEffect, useState, useMemo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Chip,
  Divider,
  Box,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  TablePagination,
  Stack,
  alpha,
  useTheme
} from "@mui/material";
import {
  Visibility,
  Delete,
  Search,
  FilterList,
  Download,
  Refresh,
  Person,
  Quiz,
  School,
  Group,
  Email,
  Male,
  Female,
  CalendarToday
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const API_BASE_URL = "http://localhost:5000/api";

const FacultyViewStudents = () => {
  const theme = useTheme();
  
  // State management
  const [registeredStudents, setRegisteredStudents] = useState([]);
  const [attemptedStudents, setAttemptedStudents] = useState([]);
  const [filteredRegistered, setFilteredRegistered] = useState([]);
  const [filteredAttempted, setFilteredAttempted] = useState([]);
  const [openView, setOpenView] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [groupFilter, setGroupFilter] = useState("all");
  
  // Pagination states
  const [registeredPage, setRegisteredPage] = useState(0);
  const [attemptedPage, setAttemptedPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Extract unique courses and groups for filters
  const courses = useMemo(() => {
    const allStudents = [...registeredStudents, ...attemptedStudents];
    return ["all", ...new Set(allStudents.map(s => s.course).filter(Boolean))];
  }, [registeredStudents, attemptedStudents]);

  const groups = useMemo(() => {
    const allStudents = [...registeredStudents, ...attemptedStudents];
    return ["all", ...new Set(allStudents.map(s => s.group).filter(Boolean))];
  }, [registeredStudents, attemptedStudents]);

  /* ======================
     FETCH DATA
  ====================== */
  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await axios.get(
        `${API_BASE_URL}/faculty/students-overview`,
        { withCredentials: true }
      );

      setRegisteredStudents(res.data.registeredStudents || []);
      setAttemptedStudents(res.data.attemptedStudents || []);
    } catch (err) {
      console.error("Fetch students error:", err);
      setError("Failed to load student data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  /* ======================
     FILTER STUDENTS
  ====================== */
  useEffect(() => {
    const filterStudents = (students) => {
      return students.filter(student => {
        const matchesSearch = searchTerm === "" || 
          student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.enrollmentNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.email?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCourse = courseFilter === "all" || student.course === courseFilter;
        const matchesGroup = groupFilter === "all" || student.group === groupFilter;
        
        return matchesSearch && matchesCourse && matchesGroup;
      });
    };

    setFilteredRegistered(filterStudents(registeredStudents));
    setFilteredAttempted(filterStudents(attemptedStudents));
    
    // Reset to first page when filtering
    setRegisteredPage(0);
    setAttemptedPage(0);
  }, [searchTerm, courseFilter, groupFilter, registeredStudents, attemptedStudents]);

  /* ======================
     PAGINATION HANDLERS
  ====================== */
  const handleRegisteredPageChange = (event, newPage) => {
    setRegisteredPage(newPage);
  };

  const handleAttemptedPageChange = (event, newPage) => {
    setAttemptedPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setRegisteredPage(0);
    setAttemptedPage(0);
  };

  const getPagedData = (data, page) => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    return data.slice(start, end);
  };

  /* ======================
     VIEW MODAL
  ====================== */
  const openViewModal = (student) => {
    setSelectedStudent(student);
    setOpenView(true);
  };

  /* ======================
     DELETE STUDENT
  ====================== */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student? This action cannot be undone.")) return;

    try {
      await axios.delete(
        `${API_BASE_URL}/students/${id}`,
        { withCredentials: true }
      );
      setOpenView(false);
      fetchStudents();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete student. Please try again.");
    }
  };

  /* ======================
     EXPORT FUNCTIONALITY
  ====================== */
  const exportToExcel = (type) => {
    const data = type === 'registered' ? registeredStudents : attemptedStudents;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { 
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
    });
    
    saveAs(dataBlob, `${type}_students_${format(new Date(), 'yyyy-MM-dd_HH-mm')}.xlsx`);
  };

  /* ======================
     RENDER LOADING & ERROR
  ====================== */
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert 
        severity="error" 
        action={
          <Button color="inherit" size="small" onClick={fetchStudents}>
            <Refresh /> Retry
          </Button>
        }
      >
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ maxWidth: '95%', mx: 'auto', p: 3 }}>
      {/* Header */}
      <Card sx={{ mb: 4, borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Box>
              <Typography variant="h4" fontWeight="600" color="primary" gutterBottom>
                <School sx={{ verticalAlign: 'middle', mr: 2 }} />
                Student Management
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Manage registered and attempted students
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Refresh />}
              onClick={fetchStudents}
              sx={{ borderRadius: 2 }}
            >
              Refresh
            </Button>
          </Box>

          {/* Filters */}
          <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Course</InputLabel>
                  <Select
                    value={courseFilter}
                    label="Course"
                    onChange={(e) => setCourseFilter(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <School fontSize="small" />
                      </InputAdornment>
                    }
                  >
                    {courses.map(course => (
                      <MenuItem key={course} value={course}>
                        {course === "all" ? "All Courses" : course}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Group</InputLabel>
                  <Select
                    value={groupFilter}
                    label="Group"
                    onChange={(e) => setGroupFilter(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <Group fontSize="small" />
                      </InputAdornment>
                    }
                  >
                    {groups.map(group => (
                      <MenuItem key={group} value={group}>
                        {group === "all" ? "All Groups" : group}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FilterList />}
                  onClick={() => {
                    setSearchTerm("");
                    setCourseFilter("all");
                    setGroupFilter("all");
                  }}
                  size="small"
                >
                  Clear Filters
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            borderRadius: 2, 
            boxShadow: 2,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`
          }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'primary.main',
                  color: 'white'
                }}>
                  <Person fontSize="large" />
                </Box>
                <Box>
                  <Typography variant="h3" fontWeight="700">
                    {registeredStudents.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Registered Students
                  </Typography>
                </Box>
                <Box flexGrow={1} />
                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  onClick={() => exportToExcel('registered')}
                  size="small"
                >
                  Export
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            borderRadius: 2, 
            boxShadow: 2,
            background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.1)} 0%, ${alpha(theme.palette.success.main, 0.05)} 100%)`
          }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'success.main',
                  color: 'white'
                }}>
                  <Quiz fontSize="large" />
                </Box>
                <Box>
                  <Typography variant="h3" fontWeight="700">
                    {attemptedStudents.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Attempted Students
                  </Typography>
                </Box>
                <Box flexGrow={1} />
                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  onClick={() => exportToExcel('attempted')}
                  size="small"
                  color="success"
                >
                  Export
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ================= REGISTERED STUDENTS ================= */}
      <Card sx={{ mb: 4, borderRadius: 2, boxShadow: 2 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" fontWeight="600">
              Registered Students
            </Typography>
            <Chip 
              label={`${registeredStudents.length} Total`} 
              color="primary" 
              variant="outlined"
            />
          </Box>

          <TableContainer component={Paper} sx={{ borderRadius: 1 }}>
            <Table>
              <TableHead sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Student</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Enrollment</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Course</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Group</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Quizzes</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredRegistered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <Box py={3}>
                        <Person sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                        <Typography color="text.secondary">
                          No registered students found
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : (
                  getPagedData(filteredRegistered, registeredPage).map((s) => (
                    <TableRow 
                      key={s._id}
                      hover
                      sx={{ 
                        '&:hover': { 
                          bgcolor: alpha(theme.palette.primary.main, 0.02) 
                        } 
                      }}
                    >
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Box sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2
                          }}>
                            <Person color="primary" />
                          </Box>
                          <Box>
                            <Typography fontWeight="500">{s.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {s.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={s.enrollmentNumber} 
                          size="small" 
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{s.course}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={s.group} 
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Chip
                            label={`${s.quizCount || 0} Quizzes`}
                            color="primary"
                            size="small"
                            icon={<Quiz fontSize="small" />}
                          />
                          <Link
                            to={`/faculty/student/${s._id}/registered-quizzes`}
                            style={{ textDecoration: "none" }}
                          >
                            <Button 
                              variant="contained" 
                              size="small"
                              sx={{ borderRadius: 1 }}
                            >
                              View
                            </Button>
                          </Link>
                        </Stack>
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          <Tooltip title="View Details">
                            <IconButton
                              color="primary"
                              onClick={() => openViewModal(s)}
                              size="small"
                            >
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Student">
                            <IconButton
                              color="error"
                              onClick={() => handleDelete(s._id)}
                              size="small"
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredRegistered.length > 0 && (
            <TablePagination
              component="div"
              count={filteredRegistered.length}
              page={registeredPage}
              onPageChange={handleRegisteredPageChange}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
              rowsPerPageOptions={[5, 10, 25, 50]}
            />
          )}
        </CardContent>
      </Card>

      <Divider sx={{ my: 4 }}>
        <Chip label="Attempted Students" color="success" />
      </Divider>

      {/* ================= ATTEMPTED STUDENTS ================= */}
      <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" fontWeight="600">
              Attempted Students
            </Typography>
            <Chip 
              label={`${attemptedStudents.length} Total`} 
              color="success" 
              variant="outlined"
            />
          </Box>

          <TableContainer component={Paper} sx={{ borderRadius: 1 }}>
            <Table>
              <TableHead sx={{ bgcolor: alpha(theme.palette.success.main, 0.05) }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Student</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Enrollment</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Course</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Group</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Quiz</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Score</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredAttempted.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                      <Box py={3}>
                        <Quiz sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                        <Typography color="text.secondary">
                          No attempted students found
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : (
                  getPagedData(filteredAttempted, attemptedPage).map((s) => (
                    <TableRow 
                      key={s._id}
                      hover
                      sx={{ 
                        '&:hover': { 
                          bgcolor: alpha(theme.palette.success.main, 0.02) 
                        } 
                      }}
                    >
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Box sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            bgcolor: alpha(theme.palette.success.main, 0.1),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2
                          }}>
                            <Person color="success" />
                          </Box>
                          <Box>
                            <Typography fontWeight="500">{s.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {s.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={s.enrollmentNumber} 
                          size="small" 
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>{s.course}</TableCell>
                      <TableCell>
                        <Chip 
                          label={s.group} 
                          size="small"
                          color="success"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" noWrap>
                          {s.quizName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={`${s.score}`}
                          color={s.score >= 70 ? "success" : s.score >= 50 ? "warning" : "error"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Link
                            to={`/faculty/student/${s._id}/quizzes`}
                            style={{ textDecoration: "none" }}
                          >
                            <Button 
                              variant="contained" 
                              color="success"
                              size="small"
                              sx={{ borderRadius: 1 }}
                            >
                              View Quizzes
                            </Button>
                          </Link>
                          <Tooltip title="View Details">
                            <IconButton
                              color="primary"
                              onClick={() => openViewModal(s)}
                              size="small"
                            >
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Student">
                            <IconButton
                              color="error"
                              onClick={() => handleDelete(s._id)}
                              size="small"
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredAttempted.length > 0 && (
            <TablePagination
              component="div"
              count={filteredAttempted.length}
              page={attemptedPage}
              onPageChange={handleAttemptedPageChange}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
              rowsPerPageOptions={[5, 10, 25, 50]}
            />
          )}
        </CardContent>
      </Card>

      {/* ================= VIEW MODAL ================= */}
      <Dialog
        open={openView}
        onClose={() => setOpenView(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ 
          bgcolor: 'primary.main', 
          color: 'white',
          py: 2
        }}>
          <Person sx={{ verticalAlign: 'middle', mr: 1 }} />
          Student Details
        </DialogTitle>

        <DialogContent dividers sx={{ py: 3 }}>
          {selectedStudent && (
            <Grid container spacing={3}>
              {[
                { label: "Name", value: selectedStudent.name, icon: <Person /> },
                { label: "Enrollment", value: selectedStudent.enrollmentNumber, icon: <School /> },
                { label: "Email", value: selectedStudent.email, icon: <Email /> },
                { 
                  label: "Gender", 
                  value: selectedStudent.gender, 
                  icon: selectedStudent.gender?.toLowerCase() === 'male' ? <Male /> : <Female />
                },
                { label: "Course", value: selectedStudent.course, icon: <School /> },
                { label: "Group", value: selectedStudent.group, icon: <Group /> },
                { 
                  label: "Member Since", 
                  value: format(new Date(selectedStudent.memberSince), 'dd MMM yyyy'),
                  icon: <CalendarToday />
                },
              ].map((field, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    mb: 1 
                  }}>
                    <Box sx={{ 
                      color: 'primary.main',
                      mr: 1 
                    }}>
                      {field.icon}
                    </Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      {field.label}
                    </Typography>
                  </Box>
                  <Typography variant="body1" fontWeight="500">
                    {field.value || "N/A"}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button 
            variant="outlined" 
            onClick={() => setOpenView(false)}
            sx={{ borderRadius: 1 }}
          >
            Close
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => handleDelete(selectedStudent?._id)}
            startIcon={<Delete />}
            sx={{ borderRadius: 1 }}
          >
            Delete Student
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FacultyViewStudents;