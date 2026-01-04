

// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Box,
//   Card,
//   CardContent,
//   Grid,
//   Chip,
//   CircularProgress,
//   Alert,
//   IconButton,
//   Tooltip,
//   Avatar,
//   Divider,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   LinearProgress
// } from "@mui/material";
// import {
//   ArrowBack,
//   Visibility,
//   Edit,
//   BarChart,
//   CalendarToday,
//   AccessTime,
//   School,
//   Quiz,
//   Person,
//   Apartment,
//   Close,
//   People,
//   CheckCircle,
//   Cancel,
//   HowToReg,
//   TrendingUp,
//   Assessment
// } from "@mui/icons-material";
// import { format, formatDistance, isValid } from "date-fns";

// const FacultyQuizzes = () => {
//   const { facultyId } = useParams();
//   const navigate = useNavigate();

//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [openView, setOpenView] = useState(false);
//   const [selectedQuiz, setSelectedQuiz] = useState(null);

//   const fetchFacultyQuizzes = useCallback(async () => {
//     try {
//       setLoading(true);
//       console.log("📡 Fetching quizzes for faculty:", facultyId);
//       const res = await axios.get(
//         `http://localhost:5000/api/faculty/${facultyId}/quizzes`,
//         { withCredentials: true }
//       );
      
//       // Debug log for API response
//       console.log("✅ API Response:", res.data);
//       console.log("📊 Quizzes Data:");
//       res.data.quizzes?.forEach((quiz, index) => {
//         console.log(`Quiz ${index + 1}:`, {
//           title: quiz.title,
//           registeredStudents: quiz.registeredStudents?.length || 0,
//           uniqueAttempts: quiz.uniqueAttempts || 0,
//           totalAttempts: quiz.totalAttempts || 0,
//           attemptedPercentage: quiz.attemptedPercentage || 0
//         });
//       });
      
//       setData(res.data);
//     } catch (err) {
//       console.error("❌ Error fetching quizzes:", err);
//       setError(err.response?.data?.message || "Failed to fetch quizzes");
//     } finally {
//       setLoading(false);
//     }
//   }, [facultyId]);

//   useEffect(() => {
//     fetchFacultyQuizzes();
//   }, [fetchFacultyQuizzes]);

//   const getStatusText = (start, end) => {
//     const now = new Date();
//     if (now < new Date(start)) return "Upcoming";
//     if (now > new Date(end)) return "Completed";
//     return "Active";
//   };

//   const getStatusColor = (start, end) => {
//     const status = getStatusText(start, end);
//     if (status === "Active") return "success";
//     if (status === "Upcoming") return "warning";
//     return "default";
//   };

//   const formatDate = (date) => {
//     const d = new Date(date);
//     return isValid(d) ? format(d, "PPpp") : "—";
//   };

//   const getInitials = (name) =>
//     name
//       ?.split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase();

//   const handleViewQuiz = (quiz) => {
//     setSelectedQuiz(quiz);
//     setOpenView(true);
//   };

//   // Calculate participation rate color
//   const getParticipationColor = (percentage) => {
//     if (percentage >= 80) return "success";
//     if (percentage >= 50) return "info";
//     if (percentage >= 30) return "warning";
//     return "error";
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", minHeight: "80vh" }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return <Alert severity="error">{error}</Alert>;
//   }

//   const { faculty, quizzes, totalQuizzes } = data;

//   return (
//     <Box sx={{ p: 4, maxWidth: 1400, mx: "auto" }}>
//       {/* Header */}
//       <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
//         <IconButton onClick={() => navigate(-1)}>
//           <ArrowBack />
//         </IconButton>
//         <Typography variant="h4" sx={{ ml: 2, fontWeight: 600 }}>
//           Faculty Dashboard
//         </Typography>
//       </Box>

//       {/* Faculty Card */}
//       <Card sx={{ mb: 4 }}>
//         <CardContent>
//           <Grid container spacing={3} alignItems="center">
//             <Grid item xs={12} md={4}>
//               <Box sx={{ display: "flex", gap: 2 }}>
//                 <Avatar sx={{ bgcolor: "primary.main", width: 70, height: 70 }}>
//                   {getInitials(faculty.name)}
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h5">{faculty.name}</Typography>
//                   <Typography variant="body2">
//                     Faculty ID: {faculty.facultyId}
//                   </Typography>
//                 </Box>
//               </Box>
//             </Grid>

//             <Grid item xs={12} md={8}>
//               <Grid container spacing={2}>
//                 <Grid item xs={6} md={3}>
//                   <Apartment fontSize="small" /> {faculty.department}
//                 </Grid>
//                 <Grid item xs={6} md={3}>
//                   <Quiz fontSize="small" /> {totalQuizzes} quizzes
//                 </Grid>
//                 <Grid item xs={6} md={3}>
//                   <CalendarToday fontSize="small" />{" "}
//                   {formatDate(faculty.createdAt)}
//                 </Grid>
//                 <Grid item xs={6} md={3}>
//                   <Person fontSize="small" /> Faculty
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>

//       {/* Quiz Table */}
//       <Card>
//         <CardContent>
//           <Typography variant="h5" sx={{ mb: 3 }}>
//             Quizzes Overview
//           </Typography>

//           {quizzes.length === 0 ? (
//             <Alert severity="info">No quizzes found</Alert>
//           ) : (
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Title</TableCell>
//                     <TableCell>Status</TableCell>
//                     <TableCell>Registered</TableCell>
//                     <TableCell>Attempted</TableCell>
//                     <TableCell>Participation</TableCell>
//                     <TableCell>Avg Score</TableCell>
//                     <TableCell>Marks</TableCell>
//                     <TableCell>Duration</TableCell>
//                     <TableCell>Created</TableCell>
//                     <TableCell align="right">Actions</TableCell>
//                   </TableRow>
//                 </TableHead>

//                 <TableBody>
//                   {quizzes.map((quiz) => {
//                     const registeredCount = quiz.registeredStudents?.length || 0;
//                     const attemptedCount = quiz.uniqueAttempts || 0;
//                     const participationPercentage = quiz.attemptedPercentage || 0;
//                     const totalAttemptsCount = quiz.totalAttempts || 0;
                    
//                     return (
//                       <TableRow key={quiz._id} hover>
//                         <TableCell>
//                           <Typography fontWeight={500}>{quiz.title}</Typography>
//                           <Typography variant="caption">
//                             <School fontSize="small" /> {quiz.subject}
//                           </Typography>
//                         </TableCell>

//                         <TableCell>
//                           <Chip
//                             label={getStatusText(quiz.startTime, quiz.endTime)}
//                             color={getStatusColor(quiz.startTime, quiz.endTime)}
//                             size="small"
//                           />
//                         </TableCell>

//                         {/* Registered Students */}
//                         <TableCell>
//                           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                             <HowToReg fontSize="small" color="action" />
//                             <Typography fontWeight={600}>
//                               {registeredCount}
//                             </Typography>
//                           </Box>
//                         </TableCell>

//                         {/* Attempted Students */}
//                         <TableCell>
//                           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                             <Assessment fontSize="small" color="action" />
//                             <Box>
//                               <Typography fontWeight={600}>
//                                 {attemptedCount}
//                               </Typography>
//                               {totalAttemptsCount > attemptedCount && (
//                                 <Typography variant="caption" color="text.secondary">
//                                   ({totalAttemptsCount} attempts)
//                                 </Typography>
//                               )}
//                             </Box>
//                           </Box>
//                         </TableCell>

//                         {/* Participation Rate */}
//                         <TableCell>
//                           <Box sx={{ width: "100%" }}>
//                             <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
//                               <Typography variant="caption">
//                                 {participationPercentage}%
//                               </Typography>
//                               <Typography variant="caption" color="text.secondary">
//                                 {attemptedCount}/{registeredCount}
//                               </Typography>
//                             </Box>
//                             <LinearProgress 
//                               variant="determinate" 
//                               value={participationPercentage}
//                               color={getParticipationColor(participationPercentage)}
//                               sx={{ height: 6, borderRadius: 3 }}
//                             />
//                           </Box>
//                         </TableCell>

//                         {/* AVG SCORE */}
//                         <TableCell>
//                           {quiz.totalAttempts > 0 ? (
//                             <>
//                               <Typography fontWeight={600}>
//                                 {quiz.avgScore} / {quiz.totalMarks}
//                               </Typography>
//                               <Typography variant="caption" color="text.secondary">
//                                 {quiz.totalAttempts} attempts
//                               </Typography>
//                             </>
//                           ) : (
//                             "—"
//                           )}
//                         </TableCell>

//                         <TableCell>{quiz.totalMarks}</TableCell>

//                         <TableCell>
//                           <AccessTime fontSize="small" />{" "}
//                           {quiz.durationMinutes} min
//                         </TableCell>

//                         <TableCell>
//                           <Tooltip title={formatDate(quiz.createdAt)}>
//                             <Typography variant="body2">
//                               {formatDistance(
//                                 new Date(quiz.createdAt),
//                                 new Date(),
//                                 { addSuffix: true }
//                               )}
//                             </Typography>
//                           </Tooltip>
//                         </TableCell>

//                         <TableCell align="right">
//                           <Tooltip title="Analytics">
//                             <IconButton
//                               onClick={() =>
//                                 navigate(
//                                   `/superadmin/quiz/${quiz._id}/attempts`
//                                 )
//                               }
//                             >
//                               <BarChart />
//                             </IconButton>
//                           </Tooltip>

//                           <Tooltip title="View Details">
//                             <IconButton onClick={() => handleViewQuiz(quiz)}>
//                               <Visibility />
//                             </IconButton>
//                           </Tooltip>

//                           <Tooltip title="Edit">
//                             <IconButton
//                               onClick={() =>
//                                 navigate(`/quiz/${quiz._id}/edit`)
//                               }
//                             >
//                               <Edit />
//                             </IconButton>
//                           </Tooltip>
//                         </TableCell>
//                       </TableRow>
//                     );
//                   })}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}

//           <Divider sx={{ my: 3 }} />

//           {/* Summary Statistics */}
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <Typography variant="body2" color="text.secondary">
//               Showing {quizzes.length} quizzes
//             </Typography>
            
//             <Box sx={{ display: "flex", gap: 3 }}>
//               <Typography variant="body2">
//                 <CheckCircle fontSize="small" sx={{ mr: 0.5, color: "success.main" }} />
//                 Total Registered: {quizzes.reduce((sum, q) => sum + (q.registeredStudents?.length || 0), 0)}
//               </Typography>
//               <Typography variant="body2">
//                 <TrendingUp fontSize="small" sx={{ mr: 0.5, color: "info.main" }} />
//                 Total Attempted: {quizzes.reduce((sum, q) => sum + (q.uniqueAttempts || 0), 0)}
//               </Typography>
//               <Typography variant="body2">
//                 <Assessment fontSize="small" sx={{ mr: 0.5, color: "warning.main" }} />
//                 Total Attempts: {quizzes.reduce((sum, q) => sum + (q.totalAttempts || 0), 0)}
//               </Typography>
//             </Box>
//           </Box>
//         </CardContent>
//       </Card>

//       {/* VIEW QUIZ MODAL */}
//       <Dialog open={openView} onClose={() => setOpenView(false)} maxWidth="md" fullWidth>
//         <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
//           Quiz Details
//           <IconButton onClick={() => setOpenView(false)}>
//             <Close />
//           </IconButton>
//         </DialogTitle>

//         <DialogContent dividers>
//           {selectedQuiz && (
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <Typography variant="h6">{selectedQuiz.title}</Typography>
//                 <Typography color="text.secondary">
//                   {selectedQuiz.description}
//                 </Typography>
//               </Grid>

//               <Grid item xs={6}><b>Subject:</b> {selectedQuiz.subject}</Grid>
//               <Grid item xs={6}><b>Department:</b> {selectedQuiz.department}</Grid>
//               <Grid item xs={6}><b>Total Marks:</b> {selectedQuiz.totalMarks}</Grid>
//               <Grid item xs={6}><b>Passing Marks:</b> {selectedQuiz.passingMarks}</Grid>
//               <Grid item xs={6}><b>Duration:</b> {selectedQuiz.durationMinutes} min</Grid>
//               <Grid item xs={6}><b>Allowed Attempts:</b> {selectedQuiz.allowedAttempts}</Grid>
//               <Grid item xs={6}><b>Questions:</b> {selectedQuiz.questions.length}</Grid>
              
//               {/* Enhanced Attempts Statistics */}
//               <Grid item xs={12}>
//                 <Divider sx={{ my: 1 }} />
//                 <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
//                   <People fontSize="small" sx={{ mr: 1 }} />
//                   Attempts Statistics
//                 </Typography>
//               </Grid>

//               <Grid item xs={4}>
//                 <Box sx={{ textAlign: "center", p: 1, bgcolor: "grey.50", borderRadius: 1 }}>
//                   <Typography variant="h5" color="primary">
//                     {selectedQuiz.registeredStudents?.length || 0}
//                   </Typography>
//                   <Typography variant="body2">Registered Students</Typography>
//                 </Box>
//               </Grid>

//               <Grid item xs={4}>
//                 <Box sx={{ textAlign: "center", p: 1, bgcolor: "info.light", borderRadius: 1 }}>
//                   <Typography variant="h5" color="info.dark">
//                     {selectedQuiz.uniqueAttempts || 0}
//                   </Typography>
//                   <Typography variant="body2">Students Attempted</Typography>
//                 </Box>
//               </Grid>

//               <Grid item xs={4}>
//                 <Box sx={{ textAlign: "center", p: 1, bgcolor: "warning.light", borderRadius: 1 }}>
//                   <Typography variant="h5" color="warning.dark">
//                     {selectedQuiz.totalAttempts || 0}
//                   </Typography>
//                   <Typography variant="body2">Total Attempts</Typography>
//                 </Box>
//               </Grid>

//               <Grid item xs={12}>
//                 <Box sx={{ mt: 2 }}>
//                   <Typography variant="body2" sx={{ mb: 1 }}>
//                     <b>Participation Rate:</b> {selectedQuiz.attemptedPercentage || 0}%
//                   </Typography>
//                   <LinearProgress 
//                     variant="determinate" 
//                     value={selectedQuiz.attemptedPercentage || 0}
//                     color={getParticipationColor(selectedQuiz.attemptedPercentage || 0)}
//                     sx={{ height: 8, borderRadius: 4 }}
//                   />
//                 </Box>
//               </Grid>

//               <Grid item xs={6}>
//                 <b>Average Score:</b>{" "}
//                 {selectedQuiz.totalAttempts > 0
//                   ? `${selectedQuiz.avgScore} / ${selectedQuiz.totalMarks}`
//                   : "Not attempted"}
//               </Grid>

//               <Grid item xs={6}>
//                 <b>Total Attempts:</b> {selectedQuiz.totalAttempts}
//               </Grid>
//             </Grid>
//           )}
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={() => setOpenView(false)}>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default FacultyQuizzes;



// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   // Layout
//   Box,
//   Container,
//   Grid,
//   Paper,
//   Card,
//   CardContent,

//   // Typography
//   Typography,

//   // Data Display
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Chip,
//   Avatar,
//   Divider,
//   Tooltip,

//   // Navigation
//   IconButton,
//   Button,

//   // Feedback
//   CircularProgress,
//   Alert,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   LinearProgress,

//   // Input
//   TextField,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,

//   SvgIcon
// } from "@mui/material";

// import {
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip as RechartsTooltip,
//   Legend,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   AreaChart,
//   Area,
//   RadarChart,
//   Radar,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
//   ScatterChart,
//   Scatter
// } from "recharts";

// import {
//   ArrowBack,
//   Visibility,
//   Edit,
//   Analytics,
//   CalendarToday,
//   AccessTime,
//   School,
//   Quiz,
//   Person,
//   Apartment,
//   Close,
//   People,
//   CheckCircle,
//   TrendingUp,
//   Assessment,
//   FilterList,
//   Search,
//   Download,
//   Refresh,
//   MoreVert,
//   PieChart as PieChartIcon,
//   BarChart as BarChartIcon,
//   Timeline,
//   Dashboard,
//   Speed,
//   AssignmentTurnedIn,
//   Groups,
//   EmojiEvents,
//   Psychology,
//   Insights,
//   Score,
//   Timer,
//   Numbers
// } from "@mui/icons-material";

// import { format, isValid, differenceInMinutes, parseISO } from "date-fns";
// import { useTheme } from "@mui/material/styles";


// const FacultyQuizzesEnhanced = () => {
//   const { facultyId } = useParams();
//   const navigate = useNavigate();
//   const theme = useTheme();

//   // State Management
//   const [data, setData] = useState({
//     faculty: null,
//     quizzes: [],
//     stats: {},
//     loading: true,
//     error: null,
//     lastUpdated: null
//   });
  
//   const [filters, setFilters] = useState({
//     status: 'all',
//     search: '',
//     sortBy: 'createdAt',
//     sortOrder: 'desc',
//     minParticipants: 0
//   });
  
//   const [viewState, setViewState] = useState({
//     selectedQuiz: null,
//     viewDialogOpen: false,
//     analyticsDialogOpen: false,
//     currentPage: 0,
//     pageSize: 20,
//     chartType: 'overview'
//   });

//   // Fetch Data with Caching Strategy
//   const fetchFacultyQuizzes = useCallback(async () => {
//     try {
//       setData(prev => ({ ...prev, loading: true, error: null }));
      
//       const res = await axios.get(
//         `http://localhost:5000/api/faculty/${facultyId}/quizzes`,
//         { 
//           withCredentials: true,
//           params: {
//             includeAnalytics: true,
//             includeAttempts: true,
//             cache: new Date().getTime() // Prevent caching
//           }
//         }
//       );
      
//       // Transform and structure data efficiently
//       const transformedData = {
//         ...res.data,
//         stats: calculateOverallStats(res.data.quizzes),
//         lastUpdated: new Date().toISOString(),
//         loading: false
//       };
      
//       setData(transformedData);
      
//       // Optional: Store in sessionStorage for quick navigation back
//       sessionStorage.setItem(`faculty_${facultyId}_quizzes`, JSON.stringify({
//         ...transformedData,
//         cachedAt: new Date().toISOString()
//       }));
      
//     } catch (err) {
//       console.error("Error fetching quizzes:", err);
//       setData(prev => ({
//         ...prev,
//         error: err.response?.data?.message || "Failed to fetch quizzes",
//         loading: false
//       }));
//     }
//   }, [facultyId]);

//   // Calculate overall statistics
//   const calculateOverallStats = (quizzes) => {
//     if (!quizzes.length) return {};
    
//     const totalQuizzes = quizzes.length;
//     const totalRegistered = quizzes.reduce((sum, q) => sum + (q.registeredStudents?.length || 0), 0);
//     const totalAttempted = quizzes.reduce((sum, q) => sum + (q.uniqueAttempts || 0), 0);
//     const totalAttempts = quizzes.reduce((sum, q) => sum + (q.totalAttempts || 0), 0);
    
//     const attemptedQuizzes = quizzes.filter(q => q.totalAttempts > 0);
//     const avgScore = attemptedQuizzes.length 
//       ? attemptedQuizzes.reduce((sum, q) => sum + (q.avgScore || 0), 0) / attemptedQuizzes.length
//       : 0;
    
//     const avgParticipation = totalRegistered > 0 
//       ? ((totalAttempted / totalRegistered) * 100).toFixed(1)
//       : 0;
    
//     const completedQuizzes = quizzes.filter(q => new Date(q.endTime) < new Date());
//     const avgCompletionRate = completedQuizzes.length
//       ? completedQuizzes.reduce((sum, q) => sum + (q.attemptedPercentage || 0), 0) / completedQuizzes.length
//       : 0;
    
//     return {
//       totalQuizzes,
//       totalRegistered,
//       totalAttempted,
//       totalAttempts,
//       avgScore: parseFloat(avgScore.toFixed(2)),
//       avgParticipation: parseFloat(avgParticipation),
//       avgCompletionRate: parseFloat(avgCompletionRate.toFixed(2)),
//       attemptedQuizzes: attemptedQuizzes.length,
//       activeQuizzes: quizzes.filter(q => 
//         new Date(q.startTime) <= new Date() && new Date(q.endTime) >= new Date()
//       ).length,
//       upcomingQuizzes: quizzes.filter(q => new Date(q.startTime) > new Date()).length
//     };
//   };

//   // Filter and sort quizzes efficiently
//   const filteredAndSortedQuizzes = useMemo(() => {
//     let result = [...data.quizzes];
    
//     // Apply search filter
//     if (filters.search) {
//       const searchLower = filters.search.toLowerCase();
//       result = result.filter(quiz =>
//         quiz.title.toLowerCase().includes(searchLower) ||
//         quiz.subject.toLowerCase().includes(searchLower) ||
//         quiz.department.toLowerCase().includes(searchLower)
//       );
//     }
    
//     // Apply status filter
//     if (filters.status !== 'all') {
//       const now = new Date();
//       result = result.filter(quiz => {
//         const start = new Date(quiz.startTime);
//         const end = new Date(quiz.endTime);
        
//         if (filters.status === 'active') return start <= now && end >= now;
//         if (filters.status === 'upcoming') return start > now;
//         if (filters.status === 'completed') return end < now;
//         return true;
//       });
//     }
    
//     // Apply participants filter
//     if (filters.minParticipants > 0) {
//       result = result.filter(quiz => 
//         (quiz.registeredStudents?.length || 0) >= filters.minParticipants
//       );
//     }
    
//     // Apply sorting
//     result.sort((a, b) => {
//       let aVal, bVal;
      
//       switch (filters.sortBy) {
//         case 'title':
//           aVal = a.title.toLowerCase();
//           bVal = b.title.toLowerCase();
//           break;
//         case 'participants':
//           aVal = a.registeredStudents?.length || 0;
//           bVal = b.registeredStudents?.length || 0;
//           break;
//         case 'attempts':
//           aVal = a.uniqueAttempts || 0;
//           bVal = b.uniqueAttempts || 0;
//           break;
//         case 'score':
//           aVal = a.avgScore || 0;
//           bVal = b.avgScore || 0;
//           break;
//         case 'createdAt':
//           aVal = new Date(a.createdAt);
//           bVal = new Date(b.createdAt);
//           break;
//         default:
//           return 0;
//       }
      
//       if (filters.sortOrder === 'desc') {
//         return aVal < bVal ? 1 : -1;
//       }
//       return aVal > bVal ? 1 : -1;
//     });
    
//     return result;
//   }, [data.quizzes, filters]);

//   // Pagination
//   const paginatedQuizzes = useMemo(() => {
//     const start = viewState.currentPage * viewState.pageSize;
//     return filteredAndSortedQuizzes.slice(start, start + viewState.pageSize);
//   }, [filteredAndSortedQuizzes, viewState.currentPage, viewState.pageSize]);

//   // Initialize
//   useEffect(() => {
//     fetchFacultyQuizzes();
    
//     // Set up refresh interval (every 5 minutes)
//     const interval = setInterval(fetchFacultyQuizzes, 300000);
    
//     return () => clearInterval(interval);
//   }, [fetchFacultyQuizzes]);

//   // Helper Functions
//   const getQuizStatus = (start, end) => {
//     const now = new Date();
//     if (now < new Date(start)) return { text: "Upcoming", color: "warning" };
//     if (now > new Date(end)) return { text: "Completed", color: "default" };
//     return { text: "Active", color: "success" };
//   };

//   const formatDate = (date) => {
//     const d = new Date(date);
//     return isValid(d) ? format(d, "PPpp") : "—";
//   };

//   const getInitials = (name) =>
//     name?.split(' ').map(n => n[0]).join('').toUpperCase();

//   const getParticipationColor = (percentage) => {
//     if (percentage >= 80) return "success";
//     if (percentage >= 50) return "info";
//     if (percentage >= 30) return "warning";
//     return "error";
//   };

//   const getPerformanceColor = (score, total) => {
//     const percentage = (score / total) * 100;
//     if (percentage >= 80) return "success";
//     if (percentage >= 60) return "info";
//     if (percentage >= 40) return "warning";
//     return "error";
//   };

//   // Chart Data Preparation
//   const chartData = useMemo(() => {
//     if (!data.quizzes.length) return {};
    
//     const attemptedQuizzes = data.quizzes.filter(q => q.totalAttempts > 0);
    
//     return {
//       // Performance over time
//       timelineData: attemptedQuizzes
//         .sort((a, b) => new Date(a.endTime) - new Date(b.endTime))
//         .map(quiz => ({
//           date: format(new Date(quiz.endTime), 'MMM dd'),
//           avgScore: quiz.avgScore || 0,
//           participation: quiz.attemptedPercentage || 0,
//           attempts: quiz.totalAttempts || 0
//         })),
      
//       // Quiz distribution by subject
//       subjectDistribution: Object.entries(
//         data.quizzes.reduce((acc, quiz) => {
//           acc[quiz.subject] = (acc[quiz.subject] || 0) + 1;
//           return acc;
//         }, {})
//       ).map(([name, value]) => ({ name, value })),
      
//       // Participation distribution
//       participationDistribution: [
//         { name: 'High (>80%)', value: data.quizzes.filter(q => (q.attemptedPercentage || 0) >= 80).length },
//         { name: 'Good (50-80%)', value: data.quizzes.filter(q => (q.attemptedPercentage || 0) >= 50 && (q.attemptedPercentage || 0) < 80).length },
//         { name: 'Low (30-50%)', value: data.quizzes.filter(q => (q.attemptedPercentage || 0) >= 30 && (q.attemptedPercentage || 0) < 50).length },
//         { name: 'Poor (<30%)', value: data.quizzes.filter(q => (q.attemptedPercentage || 0) < 30).length }
//       ],
      
//       // Performance vs Participation scatter
//       performanceScatter: attemptedQuizzes.map(quiz => ({
//         x: quiz.attemptedPercentage || 0,
//         y: quiz.avgScore || 0,
//         z: quiz.registeredStudents?.length || 0,
//         name: quiz.title.substring(0, 20)
//       }))
//     };
//   }, [data.quizzes]);

//   // Handlers
//   const handleViewQuiz = (quiz) => {
//     setViewState(prev => ({ ...prev, selectedQuiz: quiz, viewDialogOpen: true }));
//   };

//   const handleAnalytics = (quiz) => {
//     setViewState(prev => ({ ...prev, selectedQuiz: quiz, analyticsDialogOpen: true }));
//   };

//   const handleFilterChange = (field, value) => {
//     setFilters(prev => ({ ...prev, [field]: value }));
//     setViewState(prev => ({ ...prev, currentPage: 0 })); // Reset to first page
//   };

//   const handleExportData = () => {
//     // Implementation for exporting data
//     console.log("Export data functionality");
//   };

//   // Loading State
//   if (data.loading && !data.quizzes.length) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
//         <CircularProgress size={60} />
//       </Box>
//     );
//   }

//   // Error State
//   if (data.error) {
//     return (
//       <Container maxWidth="lg" sx={{ mt: 4 }}>
//         <Alert severity="error" action={
//           <Button color="inherit" onClick={fetchFacultyQuizzes}>
//             Retry
//           </Button>
//         }>
//           {data.error}
//         </Alert>
//       </Container>
//     );
//   }

//   const { faculty, stats } = data;

//   return (
//     <Container maxWidth="xl" sx={{ py: 4 }}>
//       {/* Header */}
//       <Box sx={{ mb: 4 }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <IconButton onClick={() => navigate(-1)} size="large">
//               <ArrowBack />
//             </IconButton>
//             <Box>
//               <Typography variant="h4" fontWeight={700} color="primary">
//                 Faculty Analytics Dashboard
//               </Typography>
//               <Typography variant="subtitle1" color="text.secondary">
//                 Comprehensive overview of all quizzes and performance metrics
//               </Typography>
//             </Box>
//           </Box>
          
//           <Box sx={{ display: 'flex', gap: 1 }}>
//             <Button
//               startIcon={<Refresh />}
//               onClick={fetchFacultyQuizzes}
//               variant="outlined"
//               size="small"
//             >
//               Refresh
//             </Button>
//             <Button
//               startIcon={<Download />}
//               onClick={handleExportData}
//               variant="contained"
//               size="small"
//             >
//               Export Data
//             </Button>
//           </Box>
//         </Box>

//         {/* Faculty Profile Card */}
//         <Card sx={{ mb: 3, bgcolor: 'background.paper' }}>
//           <CardContent>
//             <Grid container spacing={3} alignItems="center">
//               <Grid item xs={12} md={3}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                   <Avatar
//                     sx={{
//                       width: 80,
//                       height: 80,
//                       bgcolor: 'primary.main',
//                       fontSize: '1.5rem',
//                       fontWeight: 'bold'
//                     }}
//                   >
//                     {getInitials(faculty?.name)}
//                   </Avatar>
//                   <Box>
//                     <Typography variant="h6" fontWeight={600}>
//                       {faculty?.name}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       ID: {faculty?.facultyId}
//                     </Typography>
//                     <Chip
//                       label="Faculty"
//                       size="small"
//                       color="primary"
//                       variant="outlined"
//                       sx={{ mt: 0.5 }}
//                     />
//                   </Box>
//                 </Box>
//               </Grid>
              
//               <Grid item xs={12} md={9}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={6} sm={3}>
//                     <Box sx={{ textAlign: 'center' }}>
//                       <Typography variant="h4" color="primary" fontWeight={700}>
//                         {stats.totalQuizzes}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         Total Quizzes
//                       </Typography>
//                     </Box>
//                   </Grid>
                  
//                   <Grid item xs={6} sm={3}>
//                     <Box sx={{ textAlign: 'center' }}>
//                       <Typography variant="h4" color="success.main" fontWeight={700}>
//                         {stats.attemptedQuizzes}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         Attempted Quizzes
//                       </Typography>
//                     </Box>
//                   </Grid>
                  
//                   <Grid item xs={6} sm={3}>
//                     <Box sx={{ textAlign: 'center' }}>
//                       <Typography variant="h4" color="info.main" fontWeight={700}>
//                         {stats.avgScore}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         Avg Score
//                       </Typography>
//                     </Box>
//                   </Grid>
                  
//                   <Grid item xs={6} sm={3}>
//                     <Box sx={{ textAlign: 'center' }}>
//                       <Typography variant="h4" color="warning.main" fontWeight={700}>
//                         {stats.avgParticipation}%
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         Avg Participation
//                       </Typography>
//                     </Box>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>
//       </Box>

//       {/* Analytics Overview Section */}
//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         {/* Performance Overview Card */}
//         <Grid item xs={12} lg={8}>
//           <Card sx={{ height: '100%' }}>
//             <CardContent>
//               <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
//                 <Typography variant="h6" fontWeight={600}>
//                   <Insights sx={{ mr: 1, verticalAlign: 'middle' }} />
//                   Performance Overview
//                 </Typography>
//                 <Box sx={{ display: 'flex', gap: 1 }}>
//                   {['overview', 'timeline', 'comparison'].map(type => (
//                     <Chip
//                       key={type}
//                       label={type.charAt(0).toUpperCase() + type.slice(1)}
//                       size="small"
//                       color={viewState.chartType === type ? "primary" : "default"}
//                       onClick={() => setViewState(prev => ({ ...prev, chartType: type }))}
//                     />
//                   ))}
//                 </Box>
//               </Box>
              
//               <Box sx={{ height: 300 }}>
//                 <ResponsiveContainer width="100%" height="100%">
//                   {viewState.chartType === 'overview' ? (
//                     <AreaChart data={chartData.timelineData}>
//                       <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
//                       <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
//                       <YAxis stroke={theme.palette.text.secondary} />
//                       <RechartsTooltip 
//                         contentStyle={{ 
//                           backgroundColor: theme.palette.background.paper,
//                           borderColor: theme.palette.divider
//                         }}
//                       />
//                       <Legend />
//                       <Area 
//                         type="monotone" 
//                         dataKey="avgScore" 
//                         stackId="1"
//                         stroke={theme.palette.primary.main} 
//                         fill={theme.palette.primary.light} 
//                         fillOpacity={0.6}
//                         name="Average Score"
//                       />
//                       <Area 
//                         type="monotone" 
//                         dataKey="participation" 
//                         stackId="2"
//                         stroke={theme.palette.success.main} 
//                         fill={theme.palette.success.light} 
//                         fillOpacity={0.6}
//                         name="Participation %"
//                       />
//                     </AreaChart>
//                   ) : viewState.chartType === 'timeline' ? (
//                     <LineChart data={chartData.timelineData}>
//                       <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
//                       <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
//                       <YAxis stroke={theme.palette.text.secondary} />
//                       <RechartsTooltip />
//                       <Legend />
//                       <Line 
//                         type="monotone" 
//                         dataKey="avgScore" 
//                         stroke={theme.palette.primary.main} 
//                         strokeWidth={2}
//                         dot={{ r: 4 }}
//                         activeDot={{ r: 6 }}
//                       />
//                     </LineChart>
//                   ) : (
//                     <BarChart data={chartData.timelineData.slice(-10)}>
//                       <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
//                       <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
//                       <YAxis stroke={theme.palette.text.secondary} />
//                       <RechartsTooltip />
//                       <Legend />
//                       <Bar 
//                         dataKey="attempts" 
//                         fill={theme.palette.info.main}
//                         name="Total Attempts"
//                       />
//                     </BarChart>
//                   )}
//                 </ResponsiveContainer>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Quick Stats Cards */}
//         <Grid item xs={12} lg={4}>
//           <Grid container spacing={2}>
//             {[
//               { 
//                 title: 'Active Quizzes', 
//                 value: stats.activeQuizzes, 
//                 icon: <Speed />, 
//                 color: 'success.main',
//                 subtext: 'Currently running'
//               },
//               { 
//                 title: 'Upcoming', 
//                 value: stats.upcomingQuizzes, 
//                 icon: <CalendarToday />, 
//                 color: 'warning.main',
//                 subtext: 'Scheduled'
//               },
//               { 
//                 title: 'Completion Rate', 
//                 value: `${stats.avgCompletionRate}%`, 
//                 icon: <AssignmentTurnedIn />, 
//                 color: 'info.main',
//                 subtext: 'Quiz completion average'
//               },
//               { 
//                 title: 'Total Participants', 
//                 value: stats.totalRegistered?.toLocaleString(), 
//                 icon: <Groups />, 
//                 color: 'secondary.main',
//                 subtext: 'Across all quizzes'
//               }
//             ].map((stat, index) => (
//               <Grid item xs={6} key={index}>
//                 <Card sx={{ height: '100%', bgcolor: 'background.default' }}>
//                   <CardContent sx={{ p: 2, textAlign: 'center' }}>
//                     <Box sx={{ 
//                       display: 'inline-flex', 
//                       p: 1, 
//                       mb: 1,
//                       borderRadius: 1,
//                       bgcolor: `${stat.color}15`
//                     }}>
//                       <SvgIcon sx={{ color: stat.color }}>
//                         {stat.icon}
//                       </SvgIcon>
//                     </Box>
//                     <Typography variant="h5" fontWeight={700} color={stat.color}>
//                       {stat.value}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       {stat.title}
//                     </Typography>
//                     <Typography variant="caption" color="text.secondary">
//                       {stat.subtext}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Grid>
//       </Grid>

//       {/* Filters Bar */}
//       <Paper sx={{ p: 2, mb: 3 }}>
//         <Grid container spacing={2} alignItems="center">
//           <Grid item xs={12} sm={3}>
//             <TextField
//               fullWidth
//               size="small"
//               placeholder="Search quizzes..."
//               value={filters.search}
//               onChange={(e) => handleFilterChange('search', e.target.value)}
//               InputProps={{
//                 startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />
//               }}
//             />
//           </Grid>
          
//           <Grid item xs={6} sm={2}>
//             <FormControl fullWidth size="small">
//               <InputLabel>Status</InputLabel>
//               <Select
//                 value={filters.status}
//                 label="Status"
//                 onChange={(e) => handleFilterChange('status', e.target.value)}
//               >
//                 <MenuItem value="all">All Status</MenuItem>
//                 <MenuItem value="active">Active</MenuItem>
//                 <MenuItem value="upcoming">Upcoming</MenuItem>
//                 <MenuItem value="completed">Completed</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
          
//           <Grid item xs={6} sm={2}>
//             <FormControl fullWidth size="small">
//               <InputLabel>Sort By</InputLabel>
//               <Select
//                 value={filters.sortBy}
//                 label="Sort By"
//                 onChange={(e) => handleFilterChange('sortBy', e.target.value)}
//               >
//                 <MenuItem value="createdAt">Created Date</MenuItem>
//                 <MenuItem value="title">Title</MenuItem>
//                 <MenuItem value="participants">Participants</MenuItem>
//                 <MenuItem value="attempts">Attempts</MenuItem>
//                 <MenuItem value="score">Average Score</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
          
//           <Grid item xs={6} sm={2}>
//             <FormControl fullWidth size="small">
//               <InputLabel>Order</InputLabel>
//               <Select
//                 value={filters.sortOrder}
//                 label="Order"
//                 onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
//               >
//                 <MenuItem value="desc">Descending</MenuItem>
//                 <MenuItem value="asc">Ascending</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
          
//           <Grid item xs={6} sm={2}>
//             <TextField
//               fullWidth
//               size="small"
//               type="number"
//               label="Min Participants"
//               value={filters.minParticipants}
//               onChange={(e) => handleFilterChange('minParticipants', parseInt(e.target.value) || 0)}
//             />
//           </Grid>
          
//           <Grid item xs={12} sm={1}>
//             <Button
//               fullWidth
//               variant="outlined"
//               onClick={() => setFilters({
//                 status: 'all',
//                 search: '',
//                 sortBy: 'createdAt',
//                 sortOrder: 'desc',
//                 minParticipants: 0
//               })}
//             >
//               Clear
//             </Button>
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* Quizzes Table */}
//       <Card>
//         <CardContent>
//           <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
//             <Typography variant="h6" fontWeight={600}>
//               Quizzes ({filteredAndSortedQuizzes.length} total)
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Showing {paginatedQuizzes.length} of {filteredAndSortedQuizzes.length}
//             </Typography>
//           </Box>

//           <TableContainer sx={{ maxHeight: 600 }}>
//             <Table stickyHeader>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Quiz Details</TableCell>
//                   <TableCell align="center">Status</TableCell>
//                   <TableCell align="center">Participants</TableCell>
//                   <TableCell align="center">Participation</TableCell>
//                   <TableCell align="center">Performance</TableCell>
//                   <TableCell align="center">Duration</TableCell>
//                   <TableCell align="center">Schedule</TableCell>
//                   <TableCell align="right">Actions</TableCell>
//                 </TableRow>
//               </TableHead>
              
//               <TableBody>
//                 {paginatedQuizzes.map((quiz) => {
//                   const status = getQuizStatus(quiz.startTime, quiz.endTime);
//                   const registeredCount = quiz.registeredStudents?.length || 0;
//                   const attemptedCount = quiz.uniqueAttempts || 0;
//                   const participationPercentage = quiz.attemptedPercentage || 0;
                  
//                   return (
//                     <TableRow 
//                       key={quiz._id} 
//                       hover
//                       sx={{ '&:hover': { bgcolor: 'action.hover' } }}
//                     >
//                       <TableCell>
//                         <Box>
//                           <Typography fontWeight={600} variant="body1">
//                             {quiz.title}
//                           </Typography>
//                           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
//                             <School fontSize="small" color="action" />
//                             <Typography variant="body2" color="text.secondary">
//                               {quiz.subject} • {quiz.department}
//                             </Typography>
//                           </Box>
//                           <Typography variant="caption" color="text.secondary">
//                             {quiz.questions?.length || 0} questions • {quiz.totalMarks} marks
//                           </Typography>
//                         </Box>
//                       </TableCell>

//                       <TableCell align="center">
//                         <Chip
//                           label={status.text}
//                           color={status.color}
//                           size="small"
//                           variant="outlined"
//                         />
//                       </TableCell>

//                       <TableCell align="center">
//                         <Tooltip title={`${attemptedCount} attempted / ${registeredCount} registered`}>
//                           <Box>
//                             <Typography fontWeight={600}>
//                               {registeredCount}
//                             </Typography>
//                             <Typography variant="caption" color="text.secondary">
//                               {attemptedCount} attempted
//                             </Typography>
//                           </Box>
//                         </Tooltip>
//                       </TableCell>

//                       <TableCell align="center">
//                         <Box sx={{ width: 80, mx: 'auto' }}>
//                           <LinearProgress 
//                             variant="determinate" 
//                             value={participationPercentage}
//                             color={getParticipationColor(participationPercentage)}
//                             sx={{ height: 8, borderRadius: 4, mb: 0.5 }}
//                           />
//                           <Typography variant="caption" fontWeight={500}>
//                             {participationPercentage}%
//                           </Typography>
//                         </Box>
//                       </TableCell>

//                       <TableCell align="center">
//                         {quiz.totalAttempts > 0 ? (
//                           <Box>
//                             <Chip
//                               label={`${quiz.avgScore || 0}/${quiz.totalMarks}`}
//                               color={getPerformanceColor(quiz.avgScore || 0, quiz.totalMarks)}
//                               size="small"
//                               variant="filled"
//                             />
//                             <Typography variant="caption" display="block" color="text.secondary">
//                               {quiz.totalAttempts} attempts
//                             </Typography>
//                           </Box>
//                         ) : (
//                           <Typography variant="caption" color="text.secondary">
//                             No attempts
//                           </Typography>
//                         )}
//                       </TableCell>

//                       <TableCell align="center">
//                         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
//                           <AccessTime fontSize="small" color="action" />
//                           <Typography>{quiz.durationMinutes}m</Typography>
//                         </Box>
//                       </TableCell>

//                       <TableCell align="center">
//                         <Tooltip title={`Start: ${formatDate(quiz.startTime)}\nEnd: ${formatDate(quiz.endTime)}`}>
//                           <Box>
//                             <Typography variant="body2">
//                               {format(new Date(quiz.startTime), 'MMM dd')}
//                             </Typography>
//                             <Typography variant="caption" color="text.secondary">
//                               {format(new Date(quiz.startTime), 'hh:mm a')}
//                             </Typography>
//                           </Box>
//                         </Tooltip>
//                       </TableCell>

//                       <TableCell align="right">
//                         <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
//                           <Tooltip title="View Analytics">
//                             <IconButton 
//                               size="small" 
//                               onClick={() => handleAnalytics(quiz)}
//                               color="info"
//                             >
//                               <Analytics />
//                             </IconButton>
//                           </Tooltip>
                          
//                           <Tooltip title="View Details">
//                             <IconButton 
//                               size="small"
//                               onClick={() => handleViewQuiz(quiz)}
//                             >
//                               <Visibility />
//                             </IconButton>
//                           </Tooltip>
                          
//                           <Tooltip title="Edit Quiz">
//                             <IconButton 
//                               size="small"
//                               onClick={() => navigate(`/quiz/${quiz._id}/edit`)}
//                               color="primary"
//                             >
//                               <Edit />
//                             </IconButton>
//                           </Tooltip>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* Pagination and Summary */}
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, pt: 2, borderTop: 1, borderColor: 'divider' }}>
//             <Typography variant="body2" color="text.secondary">
//               Last updated: {data.lastUpdated ? format(new Date(data.lastUpdated), 'PPpp') : 'Never'}
//             </Typography>
            
//             <Box sx={{ display: 'flex', gap: 3 }}>
//               <Button
//                 disabled={viewState.currentPage === 0}
//                 onClick={() => setViewState(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
//                 size="small"
//               >
//                 Previous
//               </Button>
              
//               <Typography variant="body2">
//                 Page {viewState.currentPage + 1} of {Math.ceil(filteredAndSortedQuizzes.length / viewState.pageSize)}
//               </Typography>
              
//               <Button
//                 disabled={(viewState.currentPage + 1) * viewState.pageSize >= filteredAndSortedQuizzes.length}
//                 onClick={() => setViewState(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
//                 size="small"
//               >
//                 Next
//               </Button>
//             </Box>
//           </Box>
//         </CardContent>
//       </Card>

//       {/* Quiz Details Dialog */}
//       <Dialog 
//         open={viewState.viewDialogOpen} 
//         onClose={() => setViewState(prev => ({ ...prev, viewDialogOpen: false }))}
//         maxWidth="md"
//         fullWidth
//       >
//         <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//           <Typography variant="h6">Quiz Details</Typography>
//           <IconButton onClick={() => setViewState(prev => ({ ...prev, viewDialogOpen: false }))}>
//             <Close />
//           </IconButton>
//         </DialogTitle>
        
//         <DialogContent dividers>
//           {viewState.selectedQuiz && (
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <Typography variant="h5" gutterBottom>
//                   {viewState.selectedQuiz.title}
//                 </Typography>
//                 <Typography color="text.secondary" paragraph>
//                   {viewState.selectedQuiz.description}
//                 </Typography>
//               </Grid>

//               {/* Key Metrics */}
//               <Grid item xs={12}>
//                 <Grid container spacing={2}>
//                   {[
//                     { label: 'Subject', value: viewState.selectedQuiz.subject, icon: <School /> },
//                     { label: 'Department', value: viewState.selectedQuiz.department, icon: <Apartment /> },
//                     { label: 'Total Marks', value: viewState.selectedQuiz.totalMarks, icon: <Score /> },
//                     { label: 'Passing Marks', value: viewState.selectedQuiz.passingMarks, icon: <CheckCircle /> },
//                     { label: 'Duration', value: `${viewState.selectedQuiz.durationMinutes} minutes`, icon: <Timer /> },
//                     { label: 'Allowed Attempts', value: viewState.selectedQuiz.allowedAttempts, icon: <Numbers /> },
//                     { label: 'Questions', value: viewState.selectedQuiz.questions?.length || 0, icon: <Quiz /> },
//                     { label: 'Created', value: formatDate(viewState.selectedQuiz.createdAt), icon: <CalendarToday /> }
//                   ].map((item, index) => (
//                     <Grid item xs={6} sm={3} key={index}>
//                       <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
//                         <SvgIcon color="primary" sx={{ mb: 1 }}>
//                           {item.icon}
//                         </SvgIcon>
//                         <Typography variant="caption" display="block" color="text.secondary">
//                           {item.label}
//                         </Typography>
//                         <Typography fontWeight={600}>
//                           {item.value}
//                         </Typography>
//                       </Paper>
//                     </Grid>
//                   ))}
//                 </Grid>
//               </Grid>

//               {/* Performance Insights */}
//               <Grid item xs={12}>
//                 <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
//                   Performance Insights
//                 </Typography>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} md={6}>
//                     <Paper sx={{ p: 2 }}>
//                       <Typography variant="subtitle2" gutterBottom>
//                         Participation Analysis
//                       </Typography>
//                       <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
//                         <Typography variant="body2">Registered Students</Typography>
//                         <Typography fontWeight={600}>
//                           {viewState.selectedQuiz.registeredStudents?.length || 0}
//                         </Typography>
//                       </Box>
//                       <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
//                         <Typography variant="body2">Unique Attempts</Typography>
//                         <Typography fontWeight={600}>
//                           {viewState.selectedQuiz.uniqueAttempts || 0}
//                         </Typography>
//                       </Box>
//                       <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                         <Typography variant="body2">Total Attempts</Typography>
//                         <Typography fontWeight={600}>
//                           {viewState.selectedQuiz.totalAttempts || 0}
//                         </Typography>
//                       </Box>
//                     </Paper>
//                   </Grid>
                  
//                   <Grid item xs={12} md={6}>
//                     <Paper sx={{ p: 2 }}>
//                       <Typography variant="subtitle2" gutterBottom>
//                         Score Analysis
//                       </Typography>
//                       {viewState.selectedQuiz.totalAttempts > 0 ? (
//                         <>
//                           <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
//                             <Typography variant="body2">Average Score</Typography>
//                             <Typography fontWeight={600} color="primary">
//                               {viewState.selectedQuiz.avgScore || 0} / {viewState.selectedQuiz.totalMarks}
//                             </Typography>
//                           </Box>
//                           <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                             <Typography variant="body2">Performance</Typography>
//                             <Chip
//                               label={`${((viewState.selectedQuiz.avgScore || 0) / viewState.selectedQuiz.totalMarks * 100).toFixed(1)}%`}
//                               color={getPerformanceColor(viewState.selectedQuiz.avgScore || 0, viewState.selectedQuiz.totalMarks)}
//                               size="small"
//                             />
//                           </Box>
//                         </>
//                       ) : (
//                         <Typography color="text.secondary" align="center">
//                           No attempts recorded yet
//                         </Typography>
//                       )}
//                     </Paper>
//                   </Grid>
//                 </Grid>
//               </Grid>

//               {/* Schedule Information */}
//               <Grid item xs={12}>
//                 <Paper sx={{ p: 2 }}>
//                   <Typography variant="subtitle2" gutterBottom>
//                     Schedule Information
//                   </Typography>
//                   <Grid container spacing={2}>
//                     <Grid item xs={12} sm={6}>
//                       <Typography variant="body2" color="text.secondary">
//                         Start Time
//                       </Typography>
//                       <Typography fontWeight={600}>
//                         {formatDate(viewState.selectedQuiz.startTime)}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                       <Typography variant="body2" color="text.secondary">
//                         End Time
//                       </Typography>
//                       <Typography fontWeight={600}>
//                         {formatDate(viewState.selectedQuiz.endTime)}
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                 </Paper>
//               </Grid>
//             </Grid>
//           )}
//         </DialogContent>
        
//         <DialogActions>
//           <Button onClick={() => setViewState(prev => ({ ...prev, viewDialogOpen: false }))}>
//             Close
//           </Button>
//           <Button 
//             variant="contained"
//             onClick={() => {
//               setViewState(prev => ({ ...prev, viewDialogOpen: false }));
//               handleAnalytics(viewState.selectedQuiz);
//             }}
//           >
//             View Full Analytics
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Analytics Dialog */}
//       <Dialog 
//         open={viewState.analyticsDialogOpen} 
//         onClose={() => setViewState(prev => ({ ...prev, analyticsDialogOpen: false }))}
//         maxWidth="lg"
//         fullWidth
//         scroll="paper"
//       >
//         <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//           <Typography variant="h6">
//             <Analytics sx={{ mr: 1, verticalAlign: 'middle' }} />
//             Quiz Analytics: {viewState.selectedQuiz?.title}
//           </Typography>
//           <IconButton onClick={() => setViewState(prev => ({ ...prev, analyticsDialogOpen: false }))}>
//             <Close />
//           </IconButton>
//         </DialogTitle>
        
//         <DialogContent dividers>
//           {viewState.selectedQuiz && (
//             <Grid container spacing={3}>
//               {/* Advanced Analytics Charts */}
//               <Grid item xs={12}>
//                 <Typography variant="h6" gutterBottom>
//                   Performance Distribution
//                 </Typography>
//                 <Box sx={{ height: 300 }}>
//                   <ResponsiveContainer width="100%" height="100%">
//                     <RadarChart data={[
//                       { subject: 'Participation', A: viewState.selectedQuiz.attemptedPercentage || 0, fullMark: 100 },
//                       { subject: 'Avg Score', A: ((viewState.selectedQuiz.avgScore || 0) / viewState.selectedQuiz.totalMarks) * 100, fullMark: 100 },
//                       { subject: 'Completion', A: 85, fullMark: 100 },
//                       { subject: 'Engagement', A: 75, fullMark: 100 },
//                       { subject: 'Difficulty', A: 65, fullMark: 100 },
//                     ]}>
//                       <PolarGrid />
//                       <PolarAngleAxis dataKey="subject" />
//                       <PolarRadiusAxis />
//                       <Radar name="Performance" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
//                     </RadarChart>
//                   </ResponsiveContainer>
//                 </Box>
//               </Grid>

//               {/* Detailed Statistics */}
//               <Grid item xs={12}>
//                 <Typography variant="h6" gutterBottom>
//                   Detailed Statistics
//                 </Typography>
//                 <Grid container spacing={2}>
//                   {[
//                     { label: 'Questions Analysis', value: `${viewState.selectedQuiz.questions?.length || 0} questions` },
//                     { label: 'Time per Question', value: `${Math.round(viewState.selectedQuiz.durationMinutes / (viewState.selectedQuiz.questions?.length || 1))} min` },
//                     { label: 'Retake Rate', value: `${viewState.selectedQuiz.totalAttempts > 0 ? ((viewState.selectedQuiz.totalAttempts - viewState.selectedQuiz.uniqueAttempts) / viewState.selectedQuiz.uniqueAttempts * 100).toFixed(1) : 0}%` },
//                     { label: 'Completion Time Avg', value: '-- min' },
//                     { label: 'First Attempt Pass', value: '--%' },
//                     { label: 'Most Difficult Question', value: 'Q#' },
//                   ].map((stat, index) => (
//                     <Grid item xs={6} md={4} key={index}>
//                       <Paper sx={{ p: 2, height: '100%' }}>
//                         <Typography variant="caption" display="block" color="text.secondary">
//                           {stat.label}
//                         </Typography>
//                         <Typography variant="h6" fontWeight={600}>
//                           {stat.value}
//                         </Typography>
//                       </Paper>
//                     </Grid>
//                   ))}
//                 </Grid>
//               </Grid>

//               {/* Recommendations */}
//               <Grid item xs={12}>
//                 <Paper sx={{ p: 3, bgcolor: 'info.light', color: 'info.contrastText' }}>
//                   <Typography variant="h6" gutterBottom>
//                     <Psychology sx={{ mr: 1, verticalAlign: 'middle' }} />
//                     Insights & Recommendations
//                   </Typography>
//                   <ul style={{ margin: 0, paddingLeft: 20 }}>
//                     <li><Typography>Participation rate is {viewState.selectedQuiz.attemptedPercentage || 0}%, consider sending reminders</Typography></li>
//                     <li><Typography>Average score is {(viewState.selectedQuiz.avgScore || 0) / viewState.selectedQuiz.totalMarks * 100}%, adjust difficulty if needed</Typography></li>
//                     <li><Typography>{viewState.selectedQuiz.totalAttempts - viewState.selectedQuiz.uniqueAttempts} retakes recorded</Typography></li>
//                   </ul>
//                 </Paper>
//               </Grid>
//             </Grid>
//           )}
//         </DialogContent>
        
//         <DialogActions>
//           <Button onClick={() => setViewState(prev => ({ ...prev, analyticsDialogOpen: false }))}>
//             Close
//           </Button>
//           <Button 
//             variant="contained"
//             onClick={() => navigate(`/superadmin/quiz/${viewState.selectedQuiz?._id}/attempts`)}
//           >
//             View Attempt Details
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default FacultyQuizzesEnhanced;







import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
  Avatar,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  LinearProgress,
  Pagination,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TablePagination,
  AlertTitle
} from "@mui/material";
import {
  ArrowBack,
  Visibility,
  Edit,
  BarChart,
  CalendarToday,
  AccessTime,
  School,
  Quiz,
  Person,
  Apartment,
  Close,
  People,
  CheckCircle,
  Cancel,
  HowToReg,
  TrendingUp,
  Assessment,
  Search,
  FilterList,
  Download,
  Refresh,
  TrendingDown,
  Analytics,
  Insights,
  Timeline,
  Score,
  Groups,
  AutoGraph,
  PieChart,
  TableChart,
  DataUsage,
  CompareArrows,
  Sort
} from "@mui/icons-material";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  ComposedChart
} from "recharts";
import { format, formatDistance, isValid, differenceInDays, parseISO } from "date-fns";
import "./FacultyQuizzes.css";

const FacultyQuizzes = () => {
  const { facultyId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  
  // Enhanced state for analytics and filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [overallStats, setOverallStats] = useState(null);
  const [departmentStats, setDepartmentStats] = useState([]);
  const [courseStats, setCourseStats] = useState([]);
  const [performanceTrend, setPerformanceTrend] = useState([]);

  const fetchFacultyQuizzes = useCallback(async () => {
    try {
      setLoading(true);
      console.log("📡 Fetching quizzes for faculty:", facultyId);
      const res = await axios.get(
        `http://localhost:5000/api/faculty/${facultyId}/quizzes`,
        { withCredentials: true }
      );
      
      console.log("✅ API Response:", res.data);
      
      // Process and enhance data
      const processedData = processQuizData(res.data);
      setData(processedData);
      
      // Calculate overall statistics
      calculateOverallStats(processedData.quizzes);
      
    } catch (err) {
      console.error("❌ Error fetching quizzes:", err);
      setError(err.response?.data?.message || "Failed to fetch quizzes");
    } finally {
      setLoading(false);
    }
  }, [facultyId]);

  const processQuizData = (apiData) => {
    const quizzes = apiData.quizzes?.map(quiz => {
      // Calculate participation metrics
      const registeredCount = quiz.registeredStudents?.length || 0;
      const attemptedCount = quiz.uniqueAttempts || 0;
      const totalAttemptsCount = quiz.totalAttempts || 0;
      const participationPercentage = registeredCount > 0 
        ? (attemptedCount / registeredCount) * 100 
        : 0;
      
      // Calculate completion rate (for completed quizzes)
      const now = new Date();
      const quizEnd = new Date(quiz.endTime);
      const isCompleted = now > quizEnd;
      const completionRate = isCompleted && registeredCount > 0 
        ? (attemptedCount / registeredCount) * 100 
        : null;
      
      // Calculate avg score percentage
      const avgScorePercentage = quiz.totalMarks > 0 && quiz.totalAttempts > 0
        ? (quiz.avgScore / quiz.totalMarks) * 100
        : 0;
      
      // Determine performance category
      let performanceCategory = "no-data";
      if (quiz.totalAttempts > 0) {
        if (avgScorePercentage >= 80) performanceCategory = "excellent";
        else if (avgScorePercentage >= 60) performanceCategory = "good";
        else if (avgScorePercentage >= 40) performanceCategory = "average";
        else performanceCategory = "poor";
      }
      
      return {
        ...quiz,
        registeredCount,
        attemptedCount,
        totalAttemptsCount,
        participationPercentage,
        completionRate,
        avgScorePercentage,
        performanceCategory,
        efficiency: quiz.avgScore > 0 && quiz.durationMinutes > 0
          ? (quiz.avgScore / quiz.durationMinutes).toFixed(2)
          : 0
      };
    }) || [];
    
    return {
      ...apiData,
      quizzes
    };
  };

  const calculateOverallStats = (quizzes) => {
    if (!quizzes || quizzes.length === 0) {
      setOverallStats(null);
      return;
    }
    
    const totalQuizzes = quizzes.length;
    const completedQuizzes = quizzes.filter(q => new Date() > new Date(q.endTime)).length;
    const activeQuizzes = quizzes.filter(q => {
      const now = new Date();
      return now >= new Date(q.startTime) && now <= new Date(q.endTime);
    }).length;
    
    // Calculate totals
    const totalRegistered = quizzes.reduce((sum, q) => sum + q.registeredCount, 0);
    const totalAttempted = quizzes.reduce((sum, q) => sum + q.attemptedCount, 0);
    const totalParticipation = totalRegistered > 0 ? (totalAttempted / totalRegistered) * 100 : 0;
    
    // Calculate average scores across all quizzes with attempts
    const quizzesWithAttempts = quizzes.filter(q => q.totalAttempts > 0);
    const overallAvgScore = quizzesWithAttempts.length > 0
      ? quizzesWithAttempts.reduce((sum, q) => sum + q.avgScore, 0) / quizzesWithAttempts.length
      : 0;
    
    const overallAvgScorePercentage = quizzesWithAttempts.length > 0
      ? quizzesWithAttempts.reduce((sum, q) => sum + q.avgScorePercentage, 0) / quizzesWithAttempts.length
      : 0;
    
    // Calculate department-wise statistics
    const deptMap = {};
    quizzes.forEach(quiz => {
      if (!deptMap[quiz.department]) {
        deptMap[quiz.department] = {
          totalQuizzes: 0,
          totalRegistered: 0,
          totalAttempted: 0,
          avgScore: 0,
          quizCount: 0
        };
      }
      deptMap[quiz.department].totalQuizzes++;
      deptMap[quiz.department].totalRegistered += quiz.registeredCount;
      deptMap[quiz.department].totalAttempted += quiz.attemptedCount;
      if (quiz.totalAttempts > 0) {
        deptMap[quiz.department].avgScore += quiz.avgScore;
        deptMap[quiz.department].quizCount++;
      }
    });
    
    const departmentStatsArray = Object.keys(deptMap).map(dept => {
      const deptData = deptMap[dept];
      const avgScore = deptData.quizCount > 0 ? deptData.avgScore / deptData.quizCount : 0;
      const participation = deptData.totalRegistered > 0 
        ? (deptData.totalAttempted / deptData.totalRegistered) * 100 
        : 0;
      
      return {
        department: dept,
        totalQuizzes: deptData.totalQuizzes,
        participationRate: participation,
        avgScore: avgScore
      };
    });
    
    // Calculate course-wise statistics
    const courseMap = {};
    quizzes.forEach(quiz => {
      if (!courseMap[quiz.subject]) {
        courseMap[quiz.subject] = {
          totalQuizzes: 0,
          totalRegistered: 0,
          totalAttempted: 0,
          avgScore: 0,
          quizCount: 0
        };
      }
      courseMap[quiz.subject].totalQuizzes++;
      courseMap[quiz.subject].totalRegistered += quiz.registeredCount;
      courseMap[quiz.subject].totalAttempted += quiz.attemptedCount;
      if (quiz.totalAttempts > 0) {
        courseMap[quiz.subject].avgScore += quiz.avgScore;
        courseMap[quiz.subject].quizCount++;
      }
    });
    
    const courseStatsArray = Object.keys(courseMap).map(course => {
      const courseData = courseMap[course];
      const avgScore = courseData.quizCount > 0 ? courseData.avgScore / courseData.quizCount : 0;
      const participation = courseData.totalRegistered > 0 
        ? (courseData.totalAttempted / courseData.totalRegistered) * 100 
        : 0;
      
      return {
        course: course,
        totalQuizzes: courseData.totalQuizzes,
        participationRate: participation,
        avgScore: avgScore
      };
    });
    
    // Calculate performance trend (last 7 days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();
    
    const trendData = last7Days.map(date => {
      const dayQuizzes = quizzes.filter(q => {
        const quizDate = new Date(q.createdAt).toISOString().split('T')[0];
        return quizDate === date;
      });
      
      const avgScore = dayQuizzes.length > 0
        ? dayQuizzes.reduce((sum, q) => sum + q.avgScorePercentage, 0) / dayQuizzes.length
        : 0;
      
      const participation = dayQuizzes.length > 0
        ? dayQuizzes.reduce((sum, q) => sum + q.participationPercentage, 0) / dayQuizzes.length
        : 0;
      
      return {
        date: date.split('-').slice(1).join('/'),
        avgScore: parseFloat(avgScore.toFixed(2)),
        participation: parseFloat(participation.toFixed(2)),
        quizCount: dayQuizzes.length
      };
    });
    
    setOverallStats({
      totalQuizzes,
      completedQuizzes,
      activeQuizzes,
      totalRegistered,
      totalAttempted,
      totalParticipation: parseFloat(totalParticipation.toFixed(2)),
      overallAvgScore: parseFloat(overallAvgScore.toFixed(2)),
      overallAvgScorePercentage: parseFloat(overallAvgScorePercentage.toFixed(2)),
      quizzesWithAttempts: quizzesWithAttempts.length
    });
    
    setDepartmentStats(departmentStatsArray);
    setCourseStats(courseStatsArray);
    setPerformanceTrend(trendData);
  };

  useEffect(() => {
    fetchFacultyQuizzes();
  }, [fetchFacultyQuizzes]);

  const getStatusText = (start, end) => {
    const now = new Date();
    if (now < new Date(start)) return "Upcoming";
    if (now > new Date(end)) return "Completed";
    return "Active";
  };

  const getStatusColor = (start, end) => {
    const status = getStatusText(start, end);
    if (status === "Active") return "success";
    if (status === "Upcoming") return "warning";
    return "default";
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return isValid(d) ? format(d, "PPpp") : "—";
  };

  const getInitials = (name) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const handleViewQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setOpenView(true);
  };

  const getParticipationColor = (percentage) => {
    if (percentage >= 80) return "success";
    if (percentage >= 50) return "info";
    if (percentage >= 30) return "warning";
    return "error";
  };

  const getPerformanceColor = (percentage) => {
    if (percentage >= 80) return "#10b981";
    if (percentage >= 60) return "#3b82f6";
    if (percentage >= 40) return "#f59e0b";
    return "#ef4444";
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter and sort quizzes
  const filteredAndSortedQuizzes = useMemo(() => {
    if (!data?.quizzes) return [];
    
    let filtered = data.quizzes;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(quiz => 
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter(quiz => getStatusText(quiz.startTime, quiz.endTime) === filterStatus);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let aVal, bVal;
      
      if (sortConfig.key.includes('.')) {
        const keys = sortConfig.key.split('.');
        aVal = keys.reduce((obj, key) => obj?.[key], a);
        bVal = keys.reduce((obj, key) => obj?.[key], b);
      } else {
        aVal = a[sortConfig.key];
        bVal = b[sortConfig.key];
      }
      
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    
    return filtered;
  }, [data, searchTerm, filterStatus, sortConfig]);

  // Paginated quizzes
  const paginatedQuizzes = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredAndSortedQuizzes.slice(start, start + rowsPerPage);
  }, [filteredAndSortedQuizzes, page, rowsPerPage]);

  // Enhanced chart data
  const performanceData = useMemo(() => {
    if (!data?.quizzes) return [];
    
    const categories = ["Excellent (≥80%)", "Good (60-79%)", "Average (40-59%)", "Poor (<40%)", "No Data"];
    const counts = [0, 0, 0, 0, 0];
    
    data.quizzes.forEach(quiz => {
      if (quiz.performanceCategory === "excellent") counts[0]++;
      else if (quiz.performanceCategory === "good") counts[1]++;
      else if (quiz.performanceCategory === "average") counts[2]++;
      else if (quiz.performanceCategory === "poor") counts[3]++;
      else counts[4]++;
    });
    
    return categories.map((category, index) => ({
      name: category,
      value: counts[index],
      color: getPerformanceColor(index === 0 ? 85 : index === 1 ? 70 : index === 2 ? 50 : 30)
    }));
  }, [data]);

  const exportToCSV = () => {
    if (!data?.quizzes) return;
    
    const headers = [
      'Quiz Title', 'Subject', 'Department', 'Status', 'Registered Students',
      'Attempted Students', 'Participation Rate', 'Total Attempts', 'Average Score',
      'Total Marks', 'Duration (min)', 'Start Time', 'End Time', 'Created At'
    ];
    
    const csvContent = [
      headers.join(','),
      ...data.quizzes.map(quiz => [
        `"${quiz.title}"`,
        quiz.subject,
        quiz.department,
        getStatusText(quiz.startTime, quiz.endTime),
        quiz.registeredCount,
        quiz.attemptedCount,
        `${quiz.participationPercentage.toFixed(2)}%`,
        quiz.totalAttemptsCount,
        quiz.avgScore || 0,
        quiz.totalMarks,
        quiz.durationMinutes,
        `"${formatDate(quiz.startTime)}"`,
        `"${formatDate(quiz.endTime)}"`,
        `"${formatDate(quiz.createdAt)}"`
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `faculty_${facultyId}_quizzes_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    );
  }

  const { faculty, totalQuizzes } = data;

  return (
    <Box sx={{ p: 4, maxWidth: 1400, mx: "auto" }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Faculty Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Comprehensive analytics and quiz management
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button 
            startIcon={<Refresh />} 
            onClick={fetchFacultyQuizzes}
            variant="outlined"
          >
            Refresh
          </Button>
          <Button 
            startIcon={<Download />} 
            onClick={exportToCSV}
            variant="contained"
          >
            Export Data
          </Button>
        </Box>
      </Box>

      {/* Faculty Card */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={3}>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Avatar sx={{ bgcolor: "primary.main", width: 70, height: 70 }}>
                  {getInitials(faculty.name)}
                </Avatar>
                <Box>
                  <Typography variant="h6">{faculty.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ID: {faculty.facultyId}
                  </Typography>
                  <Chip 
                    label="Faculty" 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                    sx={{ mt: 0.5 }}
                  />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={9}>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Apartment fontSize="small" color="action" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Department</Typography>
                      <Typography fontWeight={500}>{faculty.department}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Quiz fontSize="small" color="action" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Total Quizzes</Typography>
                      <Typography fontWeight={500}>{totalQuizzes}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CalendarToday fontSize="small" color="action" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Member Since</Typography>
                      <Typography fontWeight={500}>
                        {formatDate(faculty.createdAt).split(',')[0]}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Score fontSize="small" color="action" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Avg Score (All)</Typography>
                      <Typography fontWeight={500}>
                        {overallStats ? `${overallStats.overallAvgScorePercentage.toFixed(1)}%` : "0%"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tabs for different views */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab icon={<TableChart />} label="Quiz List" />
          <Tab icon={<Analytics />} label="Analytics Overview" />
          <Tab icon={<CompareArrows />} label="Department Comparison" />
          <Tab icon={<Insights />} label="Performance Insights" />
        </Tabs>
      </Box>

      {/* Quiz List View */}
      {activeTab === 0 && (
        <Card>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h5">
                Quizzes Management
              </Typography>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <TextField
                  placeholder="Search quizzes..."
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ width: 250 }}
                />
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>Filter by Status</InputLabel>
                  <Select
                    value={filterStatus}
                    label="Filter by Status"
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <MenuItem value="all">All Status</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Upcoming">Upcoming</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {filteredAndSortedQuizzes.length === 0 ? (
              <Alert severity="info" sx={{ mb: 3 }}>
                No quizzes found matching your criteria
              </Alert>
            ) : (
              <>
                <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Title
                            <IconButton size="small" onClick={() => handleSort('title')}>
                              <Sort fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                        <TableCell>Subject</TableCell>
                        <TableCell>Department</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            Status
                            <IconButton size="small" onClick={() => handleSort('startTime')}>
                              <Sort fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                        <TableCell align="right">Registered</TableCell>
                        <TableCell align="right">Attempted</TableCell>
                        <TableCell>Participation</TableCell>
                        <TableCell align="right">Avg Score</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {paginatedQuizzes.map((quiz) => (
                        <TableRow key={quiz._id} hover>
                          <TableCell>
                            <Typography fontWeight={500}>{quiz.title}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              ID: {quiz._id.substring(0, 8)}...
                            </Typography>
                          </TableCell>
                          <TableCell>{quiz.subject}</TableCell>
                          <TableCell>{quiz.department}</TableCell>
                          <TableCell>
                            <Chip
                              label={getStatusText(quiz.startTime, quiz.endTime)}
                              color={getStatusColor(quiz.startTime, quiz.endTime)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 1 }}>
                              <HowToReg fontSize="small" color="action" />
                              <Typography>{quiz.registeredCount}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 1 }}>
                              <Assessment fontSize="small" color="action" />
                              <Typography>{quiz.attemptedCount}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                              <LinearProgress 
                                variant="determinate" 
                                value={quiz.participationPercentage}
                                color={getParticipationColor(quiz.participationPercentage)}
                                sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                              />
                              <Typography variant="body2" sx={{ minWidth: 40 }}>
                                {quiz.participationPercentage.toFixed(1)}%
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            {quiz.totalAttempts > 0 ? (
                              <Box>
                                <Typography fontWeight={600}>
                                  {quiz.avgScorePercentage.toFixed(1)}%
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {quiz.avgScore}/{quiz.totalMarks}
                                </Typography>
                              </Box>
                            ) : (
                              <Typography color="text.secondary">—</Typography>
                            )}
                          </TableCell>
                          <TableCell align="right">
                            <Tooltip title="Analytics">
                              <IconButton
                                size="small"
                                onClick={() => navigate(`/superadmin/quiz/${quiz._id}/attempts`)}
                              >
                                <BarChart />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="View Details">
                              <IconButton size="small" onClick={() => handleViewQuiz(quiz)}>
                                <Visibility />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                              <IconButton
                                size="small"
                                onClick={() => navigate(`/quiz/${quiz._id}/edit`)}
                              >
                                <Edit />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  component="div"
                  count={filteredAndSortedQuizzes.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  sx={{ borderTop: '1px solid', borderColor: 'divider' }}
                />
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Analytics Overview */}
      {activeTab === 1 && overallStats && (
        <Box>
          {/* Overview Cards */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ 
                      bgcolor: 'primary.main', 
                      borderRadius: 2,
                      p: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Quiz sx={{ color: 'white', fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Total Quizzes</Typography>
                      <Typography variant="h4">{overallStats.totalQuizzes}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {overallStats.activeQuizzes} active, {overallStats.completedQuizzes} completed
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ 
                      bgcolor: 'success.main', 
                      borderRadius: 2,
                      p: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <People sx={{ color: 'white', fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Participation Rate</Typography>
                      <Typography variant="h4">{overallStats.totalParticipation}%</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {overallStats.totalAttempted}/{overallStats.totalRegistered} students
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ 
                      bgcolor: 'info.main', 
                      borderRadius: 2,
                      p: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Score sx={{ color: 'white', fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Avg Score (All)</Typography>
                      <Typography variant="h4">{overallStats.overallAvgScorePercentage.toFixed(1)}%</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Based on {overallStats.quizzesWithAttempts} quizzes
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ 
                      bgcolor: 'warning.main', 
                      borderRadius: 2,
                      p: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <TrendingUp sx={{ color: 'white', fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Quiz Efficiency</Typography>
                      <Typography variant="h4">
                        {data.quizzes.filter(q => q.totalAttempts > 0).length > 0
                          ? (data.quizzes
                              .filter(q => q.totalAttempts > 0)
                              .reduce((sum, q) => sum + parseFloat(q.efficiency), 0) / 
                            data.quizzes.filter(q => q.totalAttempts > 0).length).toFixed(2)
                          : '0.00'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Score per minute
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Charts */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Performance Distribution
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <RePieChart>
                        <Pie
                          data={performanceData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {performanceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ReTooltip formatter={(value) => [`${value} quizzes`, 'Count']} />
                        <Legend />
                      </RePieChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Performance Trend (Last 7 Days)
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={performanceTrend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <ReTooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="quizCount" name="Quizzes Created" fill="#8884d8" />
                        <Line yAxisId="right" type="monotone" dataKey="avgScore" name="Avg Score %" stroke="#10b981" strokeWidth={2} />
                        <Line yAxisId="right" type="monotone" dataKey="participation" name="Participation %" stroke="#3b82f6" strokeWidth={2} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Department Comparison */}
      {activeTab === 2 && departmentStats.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Department Performance Comparison
            </Typography>
            <Box sx={{ height: 400, mt: 3 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ReTooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="totalQuizzes" name="Number of Quizzes" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="participationRate" name="Participation %" fill="#10b981" />
                  <Line yAxisId="right" type="monotone" dataKey="avgScore" name="Avg Score" stroke="#ef4444" strokeWidth={2} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Performance Insights */}
      {activeTab === 3 && overallStats && (
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <Insights sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Key Insights
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {overallStats.overallAvgScorePercentage >= 70 ? (
                      <Alert severity="success" sx={{ mb: 2 }}>
                        <AlertTitle>Strong Performance</AlertTitle>
                        Excellent average score of {overallStats.overallAvgScorePercentage.toFixed(1)}% across all quizzes
                      </Alert>
                    ) : overallStats.overallAvgScorePercentage >= 50 ? (
                      <Alert severity="info" sx={{ mb: 2 }}>
                        <AlertTitle>Good Performance</AlertTitle>
                        Average score of {overallStats.overallAvgScorePercentage.toFixed(1)}% indicates satisfactory understanding
                      </Alert>
                    ) : (
                      <Alert severity="warning" sx={{ mb: 2 }}>
                        <AlertTitle>Needs Improvement</AlertTitle>
                        Below average score of {overallStats.overallAvgScorePercentage.toFixed(1)}% - consider additional support
                      </Alert>
                    )}
                    
                    {overallStats.totalParticipation >= 80 ? (
                      <Alert severity="success" sx={{ mb: 2 }}>
                        <AlertTitle>High Engagement</AlertTitle>
                        Excellent participation rate of {overallStats.totalParticipation}%
                      </Alert>
                    ) : overallStats.totalParticipation >= 50 ? (
                      <Alert severity="info" sx={{ mb: 2 }}>
                        <AlertTitle>Moderate Engagement</AlertTitle>
                        Participation rate of {overallStats.totalParticipation}% - room for improvement
                      </Alert>
                    ) : (
                      <Alert severity="warning" sx={{ mb: 2 }}>
                        <AlertTitle>Low Engagement</AlertTitle>
                        Low participation rate of {overallStats.totalParticipation}% - consider increasing awareness
                      </Alert>
                    )}
                    
                    <Alert severity="info">
                      <AlertTitle>Quiz Activity</AlertTitle>
                      You have {overallStats.activeQuizzes} active quiz(es) and {overallStats.completedQuizzes} completed
                    </Alert>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <Timeline sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Recommendations
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {overallStats.totalParticipation < 70 && (
                      <Alert severity="warning" icon={false} sx={{ mb: 2 }}>
                        <strong>Increase Participation:</strong> Consider sending reminders or making quizzes more accessible
                      </Alert>
                    )}
                    
                    {performanceData.find(p => p.name === "Poor (<40%)")?.value > 0 && (
                      <Alert severity="error" icon={false} sx={{ mb: 2 }}>
                        <strong>Focus on Low Performers:</strong> {performanceData.find(p => p.name === "Poor (<40%)")?.value} quiz(es) have poor average scores
                      </Alert>
                    )}
                    
                    {overallStats.overallAvgScorePercentage < 60 && (
                      <Alert severity="info" icon={false} sx={{ mb: 2 }}>
                        <strong>Review Quiz Difficulty:</strong> Consider adjusting question difficulty or providing study materials
                      </Alert>
                    )}
                    
                    <Alert severity="success" icon={false}>
                      <strong>Best Performing:</strong> {departmentStats.length > 0 
                        ? departmentStats.reduce((a, b) => a.avgScore > b.avgScore ? a : b).department
                        : 'No data'} department has the highest average score
                    </Alert>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Enhanced View Quiz Modal */}
      <Dialog open={openView} onClose={() => setOpenView(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 2 }}>
          <Box>
            <Typography variant="h5">Quiz Details</Typography>
            <Typography variant="body2" color="text.secondary">
              Comprehensive analysis and statistics
            </Typography>
          </Box>
          <IconButton onClick={() => setOpenView(false)} size="small">
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ pt: 2 }}>
          {selectedQuiz && (
            <Box>
              {/* Quiz Header */}
              <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="h6" gutterBottom>{selectedQuiz.title}</Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {selectedQuiz.description}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body2" color="text.secondary">Subject</Typography>
                    <Typography fontWeight={500}>{selectedQuiz.subject}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body2" color="text.secondary">Department</Typography>
                    <Typography fontWeight={500}>{selectedQuiz.department}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body2" color="text.secondary">Status</Typography>
                    <Chip 
                      label={getStatusText(selectedQuiz.startTime, selectedQuiz.endTime)} 
                      color={getStatusColor(selectedQuiz.startTime, selectedQuiz.endTime)} 
                      size="small" 
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body2" color="text.secondary">Created</Typography>
                    <Typography fontWeight={500}>
                      {formatDate(selectedQuiz.createdAt).split(',')[0]}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              {/* Performance Metrics */}
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                <Assessment sx={{ mr: 1, verticalAlign: 'middle' }} />
                Performance Metrics
              </Typography>
              
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="primary">
                        {selectedQuiz.registeredCount}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Registered Students
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="info.main">
                        {selectedQuiz.attemptedCount}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Students Attempted
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {selectedQuiz.totalAttemptsCount} total attempts
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" style={{ color: getPerformanceColor(selectedQuiz.avgScorePercentage) }}>
                        {selectedQuiz.avgScorePercentage.toFixed(1)}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Average Score
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {selectedQuiz.avgScore}/{selectedQuiz.totalMarks}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" style={{ 
                        color: selectedQuiz.participationPercentage >= 50 ? 'success.main' : 
                               selectedQuiz.participationPercentage >= 30 ? 'warning.main' : 'error.main'
                      }}>
                        {selectedQuiz.participationPercentage.toFixed(1)}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Participation Rate
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {selectedQuiz.attemptedCount}/{selectedQuiz.registeredCount}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Detailed Statistics */}
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                <DataUsage sx={{ mr: 1, verticalAlign: 'middle' }} />
                Detailed Statistics
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1 }}>
                    <Typography variant="subtitle2" gutterBottom>Quiz Configuration</Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Total Marks:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" fontWeight={500}>{selectedQuiz.totalMarks}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Passing Marks:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" fontWeight={500}>{selectedQuiz.passingMarks}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Duration:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" fontWeight={500}>{selectedQuiz.durationMinutes} minutes</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Questions:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" fontWeight={500}>{selectedQuiz.questions?.length || 0}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Allowed Attempts:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" fontWeight={500}>{selectedQuiz.allowedAttempts}</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1 }}>
                    <Typography variant="subtitle2" gutterBottom>Time Information</Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Start Time:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" fontWeight={500}>
                          {formatDate(selectedQuiz.startTime)}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">End Time:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" fontWeight={500}>
                          {formatDate(selectedQuiz.endTime)}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Time Remaining:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" fontWeight={500}>
                          {getStatusText(selectedQuiz.startTime, selectedQuiz.endTime) === 'Active' 
                            ? `${differenceInDays(new Date(selectedQuiz.endTime), new Date())} days`
                            : getStatusText(selectedQuiz.startTime, selectedQuiz.endTime)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>

              {/* Participation Analysis */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Participation Analysis
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={selectedQuiz.participationPercentage}
                    color={getParticipationColor(selectedQuiz.participationPercentage)}
                    sx={{ flexGrow: 1, height: 10, borderRadius: 5 }}
                  />
                  <Typography variant="body2" fontWeight={500}>
                    {selectedQuiz.participationPercentage.toFixed(1)}%
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {selectedQuiz.attemptedCount} out of {selectedQuiz.registeredCount} registered students have attempted this quiz
                </Typography>
              </Box>

              {/* Performance Insights */}
              {selectedQuiz.totalAttempts > 0 && (
                <Box sx={{ mt: 3, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    <Insights sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Performance Insights
                  </Typography>
                  <Typography variant="body2">
                    {selectedQuiz.avgScorePercentage >= 70 
                      ? "Excellent performance with above average scores"
                      : selectedQuiz.avgScorePercentage >= 50
                      ? "Average performance with room for improvement"
                      : "Below average performance - consider reviewing quiz difficulty"}
                  </Typography>
                  {selectedQuiz.participationPercentage < 50 && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Note:</strong> Low participation rate indicates students may need reminders or motivation.
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenView(false)} variant="outlined">
            Close
          </Button>
          {selectedQuiz && (
            <Button 
              onClick={() => navigate(`/superadmin/quiz/${selectedQuiz._id}/attempts`)}
              variant="contained"
              startIcon={<Analytics />}
            >
              View Detailed Analytics
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FacultyQuizzes;