



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