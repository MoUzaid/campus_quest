




import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Breadcrumbs,
  Link,
  Pagination,
  Stack,
  CardHeader,
  Divider,
  alpha,
  styled,
  LinearProgress,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  useTheme,
  Container,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  InputAdornment,
  FormGroup,
  ToggleButton,
  ToggleButtonGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Fade,
  Zoom,
  Slide,
  Grow,
  Toolbar,
  AppBar,
  Tab,
  Tabs,
  CardActions,
  Rating,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  TimelineOppositeContent,
  useMediaQuery
} from '@mui/material';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ScatterChart,
  Scatter,
  ZAxis,
  Treemap
} from 'recharts';

import {
  Person as PersonIcon,
  Quiz as QuizIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Warning as WarningIcon,
  FilterList as FilterIcon,
  School as SchoolIcon,
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  ArrowBack as ArrowBackIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Subject as SubjectIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  TrendingFlat as TrendingFlatIcon,
  Assessment as AssessmentIcon,
  Dashboard as DashboardIcon,
  Insights as InsightsIcon,
  Psychology as PsychologyIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Email as EmailIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  Sort as SortIcon,
  MoreVert as MoreVertIcon,
  Info as InfoIcon,
  Lightbulb as LightbulbIcon,
  AutoGraph as AutoGraphIcon,
  Speed as SpeedIcon,
  EmojiEvents as EmojiEventsIcon,
  CompareArrows as CompareArrowsIcon,
  TableChart as TableChartIcon,
  ViewList as ViewListIcon,
  GridView as GridViewIcon,
  Clear as ClearIcon,
  Close as CloseIcon,
  Check as CheckIcon,
  OpenInNew as OpenInNewIcon,
  Launch as LaunchIcon,
  Tag as TagIcon,
  Timer as TimerIcon,
  Percent as PercentIcon,
  Visibility as VisibilityIcon,
  AccessAlarm as AccessAlarmIcon,
  PrecisionManufacturing as PrecisionManufacturingIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  ShowChart as ShowChartIcon,
  DonutLarge as DonutLargeIcon,
  Timeline as TimelineIcon,
  ScatterPlot as ScatterPlotIcon,
  Radar as RadarIcon,
  Tree as TreeIcon,
  Analytics as AnalyticsIcon,
  LibraryBooks as LibraryBooksIcon,
  Calculate as CalculateIcon,
  SpeedOutlined as SpeedOutlinedIcon,
  Grade as GradeIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  StarHalf as StarHalfIcon,
  Notifications as NotificationsIcon,
  PriorityHigh as PriorityHighIcon,
  AssignmentLate as AssignmentLateIcon,
  ErrorOutline as ErrorOutlineIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  TrendingUpOutlined as TrendingUpOutlinedIcon,
  TrendingDownOutlined as TrendingDownOutlinedIcon,
  Flag as FlagIcon,
  Bookmarks as BookmarksIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Bookmark as BookmarkIcon,
  Attachment as AttachmentIcon,
  Description as DescriptionIcon,
  MenuBook as MenuBookIcon,
  QuestionAnswer as QuestionAnswerIcon,
  PsychologyOutlined as PsychologyOutlinedIcon,
  Science as ScienceIcon,
  Functions as FunctionsIcon,
  HistoryEdu as HistoryEduIcon,
  Public as PublicIcon,
  Computer as ComputerIcon,
  Business as BusinessIcon,
  Healing as HealingIcon,
  Architecture as ArchitectureIcon,
  Engineering as EngineeringIcon,
  Biotech as BiotechIcon,
  CalculateOutlined as CalculateOutlinedIcon,
  Numbers as NumbersIcon,
  Code as CodeIcon,
  Dataset as DatasetIcon,
  SchoolOutlined as SchoolOutlinedIcon,
  Groups as GroupsIcon,
  AccountTree as AccountTreeIcon,
  Category as CategoryIcon,
  FilterAlt as FilterAltIcon,
  SortByAlpha as SortByAlphaIcon,
  Event as EventIcon,
  AvTimer as AvTimerIcon,
  Score as ScoreIcon,
  DoneAll as DoneAllIcon,
  PendingActions as PendingActionsIcon,
  HourglassEmpty as HourglassEmptyIcon,
  PlayArrow as PlayArrowIcon,
  Stop as StopIcon,
  Pause as PauseIcon,
  FastForward as FastForwardIcon,
  FastRewind as FastRewindIcon,
  SkipNext as SkipNextIcon,
  SkipPrevious as SkipPreviousIcon,
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  MoreHoriz as MoreHorizIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Share as ShareIcon,
  FileCopy as FileCopyIcon,
  Archive as ArchiveIcon,
  Unarchive as UnarchiveIcon,
  Report as ReportIcon,
  Feedback as FeedbackIcon,
  Chat as ChatIcon,
  Forum as ForumIcon,
  ContactSupport as ContactSupportIcon,
  HelpOutline as HelpOutlineIcon,
  Settings as SettingsIcon,
  Tune as TuneIcon,
  ViewModule as ViewModuleIcon,
  ViewComfy as ViewComfyIcon,
  ViewHeadline as ViewHeadlineIcon,
  ViewStream as ViewStreamIcon,
  ViewWeek as ViewWeekIcon,
  ViewDay as ViewDayIcon,
  ViewAgenda as ViewAgendaIcon,
  ViewCarousel as ViewCarouselIcon,
  ViewColumn as ViewColumnIcon,
  ViewQuilt as ViewQuiltIcon,
  ViewSidebar as ViewSidebarIcon,
  VerticalSplit as VerticalSplitIcon,
  HorizontalSplit as HorizontalSplitIcon,
  Splitscreen as SplitscreenIcon,
  DashboardCustomize as DashboardCustomizeIcon,
  SpaceDashboard as SpaceDashboardIcon,
  GridViewOutlined as GridViewOutlinedIcon,
  GridOn as GridOnIcon,
  GridOff as GridOffIcon,
  Grid3x3 as Grid3x3Icon,
  Grid4x4 as Grid4x4Icon,
  ViewCompact as ViewCompactIcon,
  ViewCozy as ViewCozyIcon,
  ViewComfyOutlined as ViewComfyOutlinedIcon,
  DataObject as DataObjectIcon,
  DatasetOutlined as DatasetOutlinedIcon,
  DataUsage as DataUsageIcon,
  DataThresholding as DataThresholdingIcon,
  DataSaverOff as DataSaverOffIcon,
  DataSaverOn as DataSaverOnIcon,
  AnalyticsOutlined as AnalyticsOutlinedIcon,
  QueryStats as QueryStatsIcon,
  Schema as SchemaIcon,
  Polyline as PolylineIcon,
  BubbleChart as BubbleChartIcon,
  MultilineChart as MultilineChartIcon,
  ShowChartOutlined as ShowChartOutlinedIcon,
  StackedLineChart as StackedLineChartIcon,
  AreaChart as AreaChartIcon,
  CandlestickChart as CandlestickChartIcon,
  WaterfallChart as WaterfallChartIcon,
  AutoAwesomeMotion as AutoAwesomeMotionIcon,
  Animation as AnimationIcon,
  MotionPhotosAuto as MotionPhotosAutoIcon,
  MotionPhotosOn as MotionPhotosOnIcon,
  MotionPhotosOff as MotionPhotosOffIcon,
  MotionPhotosPause as MotionPhotosPauseIcon,
  Gif as GifIcon,
  PlayCircleOutline as PlayCircleOutlineIcon,
  PlayCircleFilled as PlayCircleFilledIcon,
  PlayCircleFilledWhite as PlayCircleFilledWhiteIcon,
  FiberManualRecord as FiberManualRecordIcon,
  FiberSmartRecord as FiberSmartRecordIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  RadioButtonChecked as RadioButtonCheckedIcon,
  Circle as CircleIcon,
  CircleOutlined as CircleOutlinedIcon,
  Adjust as AdjustIcon,
  PanoramaFishEye as PanoramaFishEyeIcon,
  TripOrigin as TripOriginIcon,
  Brightness1 as Brightness1Icon,
  Brightness1Outlined as Brightness1OutlinedIcon
} from '@mui/icons-material';
import { format, isValid, parseISO, differenceInDays, differenceInHours, formatDistanceToNow } from 'date-fns';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

// Custom theme extensions
const themeExtensions = {
  gradients: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    success: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    warning: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    info: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    dark: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)'
  }
};

// Helper function for gradients
const getGradient = (theme, colorName) => {
  const colorMap = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    info: theme.palette.info.main,
    error: theme.palette.error.main,
    dark: theme.palette.grey[900]
  };
  
  const color = colorMap[colorName] || colorMap.primary;
  
  switch(colorName) {
    case 'dark':
      return `linear-gradient(135deg, ${theme.palette.grey[900]} 0%, ${theme.palette.grey[700]} 100%)`;
    default:
      return `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.7)} 100%)`;
  }
};

// Custom styled components
const GlassCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.background.paper, 0.9)} 0%, 
    ${alpha(theme.palette.background.paper, 0.7)} 100%)`,
  backdropFilter: 'blur(20px)',
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.08)}`,
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: `linear-gradient(90deg, 
      transparent 0%, 
      ${alpha(theme.palette.primary.main, 0.3)} 50%, 
      transparent 100%)`
  }
}));

const MetricCard = styled(Card)(({ theme, color = 'primary' }) => ({
  background: getGradient(theme, color),
  color: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'visible',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: `linear-gradient(135deg, 
      ${alpha(theme.palette.common.white, 0.3)} 0%, 
      transparent 50%,
      ${alpha(theme.palette.common.black, 0.1)} 100%)`,
    borderRadius: theme.shape.borderRadius * 2 + 2,
    zIndex: -1
  }
}));

const AnimatedCard = styled(Card)(({ theme }) => ({
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8]
  }
}));

const StatusBadge = styled(Badge)(({ theme, status }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: status === 'attempted' ? theme.palette.success.main :
                    status === 'missed' ? theme.palette.error.main :
                    status === 'active' ? theme.palette.info.main :
                    status === 'upcoming' ? theme.palette.warning.main :
                    theme.palette.grey[500],
    color: theme.palette.common.white,
    fontWeight: 'bold',
    fontSize: '0.65rem',
    minWidth: 20,
    height: 20,
    borderRadius: 10
  }
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  fontWeight: 500
}));

const StyledTableRow = styled(TableRow)(({ theme, status }) => ({
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
    '& .action-buttons': {
      opacity: 1
    }
  },
  backgroundColor: status === 'attempted' ? alpha(theme.palette.success.main, 0.03) :
                  status === 'missed' ? alpha(theme.palette.error.main, 0.03) :
                  status === 'active' ? alpha(theme.palette.info.main, 0.03) :
                  status === 'upcoming' ? alpha(theme.palette.warning.main, 0.03) :
                  'transparent',
  '&.Mui-selected': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08)
  }
}));

const PerformanceMeter = ({ value, max = 100, label, size = 'medium' }) => {
  const theme = useTheme();
  const percentage = (value / max) * 100;
  
  const getColor = (percent) => {
    if (percent >= 80) return '#4caf50';
    if (percent >= 60) return '#ff9800';
    return '#f44336';
  };

  const sizeMap = {
    small: 80,
    medium: 120,
    large: 160
  };

  return (
    <Box sx={{ position: 'relative', display: 'inline-block' }}>
      <Box sx={{ position: 'relative', width: sizeMap[size], height: sizeMap[size] }}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={sizeMap[size]}
          thickness={4}
          sx={{ color: alpha(theme.palette.grey[300], 0.3) }}
        />
        <CircularProgress
          variant="determinate"
          value={percentage}
          size={sizeMap[size]}
          thickness={6}
          sx={{ 
            color: getColor(percentage),
            position: 'absolute',
            left: 0,
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round'
            }
          }}
        />
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}>
          <Typography variant={size === 'large' ? 'h4' : size === 'medium' ? 'h5' : 'h6'} 
            fontWeight="bold" color="text.primary">
            {Math.round(percentage)}%
          </Typography>
          {label && (
            <Typography variant="caption" color="text.secondary">
              {label}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

// Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  withCredentials: true,
  timeout: 30000,
});

const StudentRegisteredQuizzes = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [filters, setFilters] = useState({
    status: '',
    subject: '',
    course: '',
    search: '',
    sortBy: 'startTime',
    sortOrder: 'desc',
    page: 1,
    limit: 10,
    viewMode: 'table',
    dateRange: 'all'
  });
  
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [quizDetailDialog, setQuizDetailDialog] = useState({
    open: false,
    quiz: null,
    view: 'details'
  });
  
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);
  const [analyticsView, setAnalyticsView] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [expandedQuiz, setExpandedQuiz] = useState(null);

  // Color schemes
  const CHART_COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.info.main
  ];

  const STATUS_CONFIG = {
    attempted: {
      color: theme.palette.success.main,
      icon: CheckCircleIcon,
      label: 'Attempted',
      gradient: themeExtensions.gradients.success
    },
    missed: {
      color: theme.palette.error.main,
      icon: WarningIcon,
      label: 'Not Attempted',
      gradient: themeExtensions.gradients.warning
    },
    active: {
      color: theme.palette.info.main,
      icon: PlayArrowIcon,
      label: 'Active',
      gradient: themeExtensions.gradients.info
    },
    upcoming: {
      color: theme.palette.warning.main,
      icon: ScheduleIcon,
      label: 'Upcoming',
      gradient: themeExtensions.gradients.warning
    }
  };

  // Fetch data
  const fetchStudentQuizzes = async (forceRefresh = false) => {
    try {
      setLoading(true);
      setIsRefreshing(true);
      
      const params = {
        ...filters,
        page: filters.page,
        limit: filters.limit,
        status: filters.status || undefined,
        subject: filters.subject || undefined,
        course: filters.course || undefined
      };

      const res = await axiosInstance.get(
        `/api/faculty/student/${studentId}/registered-quizzes`,
        { 
          params,
          withCredentials: true
        }
      );

      if (res.data && res.data.student) {
        setData(res.data);
        setError('');
      } else {
        throw new Error('No data received from server');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.response?.data?.message || 'Failed to load student data. Please try again.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (!studentId) return;
    fetchStudentQuizzes();
  }, [studentId, filters.page, filters.limit, filters.status, filters.subject, filters.course]);

  // Handlers
  const handlePageChange = (event, value) => {
    setFilters(prev => ({ ...prev, page: value }));
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value, page: 1 }));
  };

  const handleResetFilters = () => {
    setFilters({
      status: '',
      subject: '',
      course: '',
      search: '',
      sortBy: 'startTime',
      sortOrder: 'desc',
      page: 1,
      limit: 10,
      viewMode: 'table',
      dateRange: 'all'
    });
  };

  const handleQuizDetailView = (quiz, view = 'details') => {
    setQuizDetailDialog({ open: true, quiz, view });
  };

  const handleExpandQuiz = (quizId) => {
    setExpandedQuiz(expandedQuiz === quizId ? null : quizId);
  };

  // Format helpers
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = parseISO(dateString);
      if (!isValid(date)) return 'Invalid Date';
      return format(date, 'PP');
    } catch {
      return 'Invalid Date';
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = parseISO(dateString);
      if (!isValid(date)) return 'Invalid Date';
      return format(date, 'PPpp');
    } catch {
      return 'Invalid Date';
    }
  };

  const formatDuration = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  const getTimeRemaining = (startTime) => {
    try {
      const now = new Date();
      const start = parseISO(startTime);
      if (!isValid(start)) return 'Invalid date';
      
      const diff = start - now;
      if (diff <= 0) return 'Started';
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      if (days > 0) return `${days}d ${hours}h remaining`;
      return `${hours}h remaining`;
    } catch {
      return 'N/A';
    }
  };

  // Process chart data
  const chartData = useMemo(() => {
    if (!data) return {};
    
    const courseWise = data.analytics?.courseWise?.map(course => ({
      name: course.course || 'Unknown',
      attempted: course.attempted || 0,
      missed: course.missed || 0,
      upcoming: course.upcoming || 0,
      active: course.active || 0,
      total: (course.attempted || 0) + (course.missed || 0) + (course.upcoming || 0) + (course.active || 0),
      attemptRate: parseFloat(course.attemptRate || 0)
    })) || [];

    const subjectWise = data.analytics?.subjectWise?.map(subject => ({
      name: subject.subject || 'Unknown',
      value: subject.total || 0,
      attempted: subject.attempted || 0,
      attemptRate: parseFloat(subject.attemptRate || 0)
    })) || [];

    const timeSeries = data.quizzes?.attempted?.map(quiz => ({
      date: format(parseISO(quiz.performance?.attemptedAt || quiz.startTime), 'MMM dd'),
      score: quiz.performance?.percentage || 0,
      timeTaken: quiz.performance?.timeTaken || 0,
      accuracy: parseFloat(quiz.performance?.accuracy || 0),
      marks: quiz.performance?.scoredMarks || 0
    })) || [];

    const difficultyData = data.analytics?.difficultyDistribution?.map(diff => ({
      name: diff.difficulty,
      value: diff.count,
      percentage: parseFloat(diff.percentage)
    })) || [];

    const topicPerformance = data.analytics?.topicPerformance?.map(topic => ({
      topic: topic.topic,
      accuracy: parseFloat(topic.accuracy),
      marksEfficiency: parseFloat(topic.marksEfficiency)
    })) || [];

    return {
      courseWise,
      subjectWise,
      timeSeries,
      difficultyData,
      topicPerformance
    };
  }, [data]);

  // Get current quizzes with filters
  const getCurrentQuizzes = () => {
    if (!data?.quizzes?.all) return [];
    
    let filtered = [...data.quizzes.all];
    
    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter(quiz => 
        quiz.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
        quiz.subject?.toLowerCase().includes(filters.search.toLowerCase()) ||
        quiz.description?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(quiz => quiz.status === filters.status);
    }
    
    // Apply subject filter
    if (filters.subject) {
      filtered = filtered.filter(quiz => quiz.subject === filters.subject);
    }
    
    // Apply course filter
    if (filters.course) {
      filtered = filtered.filter(quiz => 
        Array.isArray(quiz.course) 
          ? quiz.course.includes(filters.course)
          : quiz.course === filters.course
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (filters.sortBy) {
        case 'title':
          aValue = a.title?.toLowerCase() || '';
          bValue = b.title?.toLowerCase() || '';
          break;
        case 'startTime':
          aValue = new Date(a.startTime || 0);
          bValue = new Date(b.startTime || 0);
          break;
        case 'totalMarks':
          aValue = a.totalMarks || 0;
          bValue = b.totalMarks || 0;
          break;
        case 'status':
          aValue = a.status || '';
          bValue = b.status || '';
          break;
        default:
          aValue = new Date(a.startTime || 0);
          bValue = new Date(b.startTime || 0);
      }
      
      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    return filtered;
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {[...Array(4)].map((_, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CircularProgress size={40} />
                <Box sx={{ ml: 2, flex: 1 }}>
                  <Typography variant="body1">Loading...</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  // Error display
  const ErrorDisplay = ({ message, onRetry }) => (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Alert 
        severity="error" 
        sx={{ mb: 2, maxWidth: 600, mx: 'auto' }}
        action={
          <Button color="inherit" size="small" onClick={onRetry}>
            Retry
          </Button>
        }
      >
        <Typography variant="h6">{message}</Typography>
      </Alert>
      <Button variant="contained" startIcon={<RefreshIcon />} onClick={onRetry}>
        Refresh Data
      </Button>
    </Box>
  );

  // No data display
  const NoDataDisplay = () => (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <AssessmentIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
      <Typography variant="h5" color="text.secondary" gutterBottom>
        No Quizzes Found
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph sx={{ maxWidth: 400, mx: 'auto', mb: 3 }}>
        This student is not registered for any quizzes in your courses or no data matches your current filters.
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button variant="outlined" onClick={handleResetFilters} startIcon={<FilterIcon />}>
          Reset Filters
        </Button>
        <Button variant="contained" onClick={() => navigate('/faculty/quizzes')} startIcon={<QuizIcon />}>
          Browse Quizzes
        </Button>
      </Stack>
    </Box>
  );

  // Render quiz status chip
  const renderStatusChip = (status) => {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.upcoming;
    const Icon = config.icon;
    
    return (
      <Chip
        icon={<Icon sx={{ color: config.color }} />}
        label={config.label}
        sx={{
          backgroundColor: alpha(config.color, 0.1),
          color: config.color,
          fontWeight: 600,
          border: `1px solid ${alpha(config.color, 0.3)}`,
          '& .MuiChip-icon': {
            color: `${config.color} !important`
          }
        }}
        size="small"
      />
    );
  };

  // Enhanced Quiz Detail Dialog Component
  const QuizDetailDialog = () => {
    if (!quizDetailDialog.quiz) return null;
    
    const quiz = quizDetailDialog.quiz;
    const performance = quiz.performance;
    const isAttempted = quiz.status === 'attempted';
    
    return (
      <Dialog 
        open={quizDetailDialog.open} 
        onClose={() => setQuizDetailDialog({ open: false, quiz: null })}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle sx={{ 
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          pb: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <QuizIcon color="primary" />
            <Typography variant="h5" fontWeight="bold">{quiz.title}</Typography>
            {renderStatusChip(quiz.status)}
          </Box>
          <IconButton onClick={() => setQuizDetailDialog({ open: false, quiz: null })}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            {/* Left Column - Basic Info */}
            <Grid item xs={12} md={6}>
              <AnimatedCard>
                <CardHeader 
                  title="Quiz Information"
                  avatar={<DescriptionIcon color="primary" />}
                />
                <CardContent>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Subject
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {quiz.subject}
                      </Typography>
                    </Box>
                    
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Course(s)
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                        {Array.isArray(quiz.course) ? 
                          quiz.course.map((c, i) => (
                            <Chip key={i} label={c} size="small" variant="outlined" />
                          )) : 
                          <Chip label={quiz.course} size="small" variant="outlined" />
                        }
                      </Stack>
                    </Box>
                    
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Description
                      </Typography>
                      <Typography variant="body1">
                        {quiz.description || 'No description provided'}
                      </Typography>
                    </Box>
                    
                    <Divider />
                    
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary" display="block">
                          Total Marks
                        </Typography>
                        <Typography variant="h6" color="primary">
                          {quiz.totalMarks}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary" display="block">
                          Passing Marks
                        </Typography>
                        <Typography variant="h6" color={isAttempted && performance?.passed ? 'success' : 'error'}>
                          {quiz.passingMarks}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Stack>
                </CardContent>
              </AnimatedCard>
              
              {/* Schedule Card */}
              <AnimatedCard sx={{ mt: 3 }}>
                <CardHeader 
                  title="Schedule"
                  avatar={<CalendarIcon color="primary" />}
                />
                <CardContent>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Start Time
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {formatDateTime(quiz.startTime)}
                      </Typography>
                    </Box>
                    
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">
                        End Time
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {formatDateTime(quiz.endTime)}
                      </Typography>
                    </Box>
                    
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Duration
                      </Typography>
                      <Typography variant="body1">
                        {formatDuration(quiz.durationMinutes)}
                      </Typography>
                    </Box>
                    
                    {quiz.daysRemaining !== undefined && (
                      <Box>
                        <Typography variant="caption" color="text.secondary" display="block">
                          Days Remaining
                        </Typography>
                        <Typography variant="body1" color="warning.main" fontWeight="medium">
                          {quiz.daysRemaining} days
                        </Typography>
                      </Box>
                    )}
                  </Stack>
                </CardContent>
              </AnimatedCard>
            </Grid>
            
            {/* Right Column - Performance & Details */}
            <Grid item xs={12} md={6}>
              {isAttempted && performance ? (
                <>
                  <AnimatedCard>
                    <CardHeader 
                      title="Performance Summary"
                      avatar={<AssessmentIcon color="primary" />}
                    />
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item xs={6}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h2" fontWeight="bold" color="primary">
                              {performance.percentage}%
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Score
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" fontWeight="bold" 
                              color={performance.passed ? 'success' : 'error'}>
                              {performance.scoredMarks}/{quiz.totalMarks}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Marks Obtained
                            </Typography>
                          </Box>
                        </Grid>
                        
                        <Grid item xs={12}>
                          <Divider sx={{ my: 1 }} />
                        </Grid>
                        
                        <Grid item xs={4}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h6" color="success.main">
                              {performance.correctCount}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Correct
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h6" color="error.main">
                              {performance.wrongCount}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Wrong
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h6">
                              {performance.timeTaken || 'N/A'}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Time Taken
                            </Typography>
                          </Box>
                        </Grid>
                        
                        <Grid item xs={12}>
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="caption" color="text.secondary" display="block">
                              Accuracy
                            </Typography>
                            <LinearProgress 
                              variant="determinate" 
                              value={parseFloat(performance.accuracy || 0)}
                              sx={{ 
                                height: 8, 
                                borderRadius: 4,
                                backgroundColor: alpha(theme.palette.primary.main, 0.1)
                              }}
                            />
                            <Typography variant="body2" sx={{ mt: 0.5 }}>
                              {performance.accuracy}%
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </AnimatedCard>
                  
                  {performance.attemptedAt && (
                    <AnimatedCard sx={{ mt: 3 }}>
                      <CardHeader 
                        title="Attempt Details"
                        avatar={<TimeIcon color="primary" />}
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          Attempted on: {formatDateTime(performance.attemptedAt)}
                        </Typography>
                      </CardContent>
                    </AnimatedCard>
                  )}
                </>
              ) : (
                <AnimatedCard sx={{ height: '100%' }}>
                  <CardContent sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    height: '100%',
                    textAlign: 'center',
                    py: 8
                  }}>
                    {quiz.status === 'upcoming' ? (
                      <>
                        <ScheduleIcon sx={{ fontSize: 64, color: 'warning.main', mb: 2, opacity: 0.7 }} />
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                          Quiz Not Yet Started
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          This quiz will be available on {formatDate(quiz.startTime)}
                        </Typography>
                        {quiz.daysRemaining > 0 && (
                          <Chip 
                            label={`Starts in ${quiz.daysRemaining} days`}
                            color="warning"
                            variant="outlined"
                            sx={{ mt: 2 }}
                          />
                        )}
                      </>
                    ) : quiz.status === 'missed' ? (
                      <>
                        <WarningIcon sx={{ fontSize: 64, color: 'error.main', mb: 2, opacity: 0.7 }} />
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                          Quiz Not Attempted
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          The quiz period has ended without an attempt
                        </Typography>
                      </>
                    ) : (
                      <>
                        <QuizIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2, opacity: 0.7 }} />
                        <Typography variant="h6" color="text.secondary">
                          No Performance Data Available
                        </Typography>
                      </>
                    )}
                  </CardContent>
                </AnimatedCard>
              )}
            </Grid>
            
            {/* Additional Details Row */}
            <Grid item xs={12}>
              <AnimatedCard>
                <CardHeader 
                  title="Additional Information"
                  avatar={<InfoIcon color="primary" />}
                />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box>
                        <Typography variant="caption" color="text.secondary" display="block">
                          Department
                        </Typography>
                        <Typography variant="body1">
                          {quiz.department || 'N/A'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box>
                        <Typography variant="caption" color="text.secondary" display="block">
                          Year/Groups
                        </Typography>
                        <Typography variant="body1">
                          {quiz.yr?.join(', ') || 'N/A'} / {quiz.group?.join(', ') || 'N/A'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box>
                        <Typography variant="caption" color="text.secondary" display="block">
                          Total Questions
                        </Typography>
                        <Typography variant="body1">
                          {quiz.totalQuestions || 'N/A'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box>
                        <Typography variant="caption" color="text.secondary" display="block">
                          Allowed Attempts
                        </Typography>
                        <Typography variant="body1">
                          {quiz.allowedAttempts || 1}
                        </Typography>
                      </Box>
                    </Grid>
                    
                    {quiz.isStarted !== undefined && (
                      <Grid item xs={12} sm={6} md={3}>
                        <Box>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Quiz Status
                          </Typography>
                          <Chip 
                            label={quiz.isStarted ? 'Started' : 'Not Started'} 
                            size="small"
                            color={quiz.isStarted ? 'success' : 'default'}
                            variant="outlined"
                          />
                        </Box>
                      </Grid>
                    )}
                    
                    {quiz.hasLeaderboard && (
                      <Grid item xs={12} sm={6} md={3}>
                        <Box>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Leaderboard
                          </Typography>
                          <Chip 
                            label="Available" 
                            size="small"
                            color="info"
                            variant="outlined"
                          />
                        </Box>
                      </Grid>
                    )}
                    
                    {quiz.certificatesGenerated && (
                      <Grid item xs={12} sm={6} md={3}>
                        <Box>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Certificates
                          </Typography>
                          <Chip 
                            label="Generated" 
                            size="small"
                            color="success"
                            variant="outlined"
                          />
                        </Box>
                      </Grid>
                    )}
                    
                    {quiz.hasFeedback && (
                      <Grid item xs={12} sm={6} md={3}>
                        <Box>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Feedback
                          </Typography>
                          <Chip 
                            label="Available" 
                            size="small"
                            color="warning"
                            variant="outlined"
                          />
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                </CardContent>
              </AnimatedCard>
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`, p: 2 }}>
          <Button onClick={() => setQuizDetailDialog({ open: false, quiz: null })}>
            Close
          </Button>
          {isAttempted && (
            <Button variant="contained" startIcon={<VisibilityIcon />}>
              View Detailed Answers
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  };

  // Enhanced Recommendations Component
  const EnhancedRecommendations = () => {
    if (!data?.recommendations) return null;
    
    const recommendations = data.recommendations;
    
    return (
      <Grid container spacing={3}>
        {/* Priority Actions */}
        {recommendations.priorityActions && recommendations.priorityActions.length > 0 && (
          <Grid item xs={12}>
            <AnimatedCard>
              <CardHeader 
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PriorityHighIcon color="error" />
                    <Typography variant="h6">Priority Actions</Typography>
                  </Box>
                }
                sx={{ backgroundColor: alpha(theme.palette.error.main, 0.05) }}
              />
              <CardContent>
                <Timeline>
                  {recommendations.priorityActions.map((action, index) => (
                    <TimelineItem key={index}>
                      <TimelineSeparator>
                        <TimelineDot color="error">
                          {index === 0 ? <FlagIcon /> : <AssignmentLateIcon />}
                        </TimelineDot>
                        {index < recommendations.priorityActions.length - 1 && <TimelineConnector />}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography variant="body1" fontWeight="medium">
                          {action}
                        </Typography>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </CardContent>
            </AnimatedCard>
          </Grid>
        )}
        
        {/* Faculty Recommendations */}
        <Grid item xs={12} md={6}>
          <AnimatedCard>
            <CardHeader 
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SchoolIcon color="primary" />
                  <Typography variant="h6">For Faculty Guidance</Typography>
                </Box>
              }
            />
            <CardContent>
              <List>
                {recommendations.forFaculty && recommendations.forFaculty.map((rec, index) => (
                  <ListItem key={index} sx={{ py: 1 }}>
                    <ListItemIcon>
                      <LightbulbIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={rec}
                      primaryTypographyProps={{ variant: 'body1' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </AnimatedCard>
        </Grid>
        
        {/* Student Recommendations */}
        <Grid item xs={12} md={6}>
          <AnimatedCard>
            <CardHeader 
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PersonIcon color="secondary" />
                  <Typography variant="h6">For Student Improvement</Typography>
                </Box>
              }
            />
            <CardContent>
              <List>
                {recommendations.forStudent && recommendations.forStudent.map((rec, index) => (
                  <ListItem key={index} sx={{ py: 1 }}>
                    <ListItemIcon>
                      <PsychologyIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={rec}
                      primaryTypographyProps={{ variant: 'body1' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </AnimatedCard>
        </Grid>
        
        {/* Performance-Based Recommendations */}
        {data.performance && (
          <Grid item xs={12}>
            <AnimatedCard>
              <CardHeader 
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TrendingUpIcon color="success" />
                    <Typography variant="h6">Performance-Based Suggestions</Typography>
                  </Box>
                }
              />
              <CardContent>
                <Grid container spacing={2}>
                  {data.performance.accuracy && parseFloat(data.performance.accuracy) < 70 && (
                    <Grid item xs={12} md={6}>
                      <Box sx={{ 
                        p: 2, 
                        borderRadius: 2, 
                        bgcolor: alpha(theme.palette.warning.main, 0.1),
                        border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`
                      }}>
                        <Typography variant="subtitle2" color="warning.main" gutterBottom>
                          <WarningIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          Accuracy Improvement Needed
                        </Typography>
                        <Typography variant="body2">
                          Current accuracy is {data.performance.accuracy}. Consider:
                        </Typography>
                        <List dense>
                          <ListItem sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <CircleIcon sx={{ fontSize: 8 }} />
                            </ListItemIcon>
                            <ListItemText primary="Review fundamental concepts" />
                          </ListItem>
                          <ListItem sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <CircleIcon sx={{ fontSize: 8 }} />
                            </ListItemIcon>
                            <ListItemText primary="Practice with mock tests" />
                          </ListItem>
                          <ListItem sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <CircleIcon sx={{ fontSize: 8 }} />
                            </ListItemIcon>
                            <ListItemText primary="Focus on time management" />
                          </ListItem>
                        </List>
                      </Box>
                    </Grid>
                  )}
                  
                  {data.summary?.missedQuizzes > 0 && (
                    <Grid item xs={12} md={6}>
                      <Box sx={{ 
                        p: 2, 
                        borderRadius: 2, 
                        bgcolor: alpha(theme.palette.error.main, 0.1),
                        border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`
                      }}>
                        <Typography variant="subtitle2" color="error.main" gutterBottom>
                          <WarningIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          Participation Issue
                        </Typography>
                        <Typography variant="body2">
                          Missed {data.summary.missedQuizzes} quizzes. Consider:
                        </Typography>
                        <List dense>
                          <ListItem sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <CircleIcon sx={{ fontSize: 8 }} />
                            </ListItemIcon>
                            <ListItemText primary="Schedule reminders for upcoming quizzes" />
                          </ListItem>
                          <ListItem sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <CircleIcon sx={{ fontSize: 8 }} />
                            </ListItemIcon>
                            <ListItemText primary="Check for technical issues" />
                          </ListItem>
                          <ListItem sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <CircleIcon sx={{ fontSize: 8 }} />
                            </ListItemIcon>
                            <ListItemText primary="Discuss participation concerns" />
                          </ListItem>
                        </List>
                      </Box>
                    </Grid>
                  )}
                  
                  {data.performance?.efficiencyScore && parseFloat(data.performance.efficiencyScore) < 1 && (
                    <Grid item xs={12} md={6}>
                      <Box sx={{ 
                        p: 2, 
                        borderRadius: 2, 
                        bgcolor: alpha(theme.palette.info.main, 0.1),
                        border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`
                      }}>
                        <Typography variant="subtitle2" color="info.main" gutterBottom>
                          <SpeedIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          Time Efficiency
                        </Typography>
                        <Typography variant="body2">
                          Efficiency score: {data.performance.efficiencyScore}. Suggestions:
                        </Typography>
                        <List dense>
                          <ListItem sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <CircleIcon sx={{ fontSize: 8 }} />
                            </ListItemIcon>
                            <ListItemText primary="Practice speed reading techniques" />
                          </ListItem>
                          <ListItem sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <CircleIcon sx={{ fontSize: 8 }} />
                            </ListItemIcon>
                            <ListItemText primary="Use time management strategies" />
                          </ListItem>
                        </List>
                      </Box>
                    </Grid>
                  )}
                  
                  {data.patterns?.attemptPatterns?.weakestSubject && data.patterns.attemptPatterns.weakestSubject !== 'No data' && (
                    <Grid item xs={12} md={6}>
                      <Box sx={{ 
                        p: 2, 
                        borderRadius: 2, 
                        bgcolor: alpha(theme.palette.warning.main, 0.1),
                        border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`
                      }}>
                        <Typography variant="subtitle2" color="warning.main" gutterBottom>
                          <TrendingDownIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          Weak Subject Area
                        </Typography>
                        <Typography variant="body2">
                          Weakest performance in: {data.patterns.attemptPatterns.weakestSubject}
                        </Typography>
                        <List dense>
                          <ListItem sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <CircleIcon sx={{ fontSize: 8 }} />
                            </ListItemIcon>
                            <ListItemText primary="Additional study materials needed" />
                          </ListItem>
                          <ListItem sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <CircleIcon sx={{ fontSize: 8 }} />
                            </ListItemIcon>
                            <ListItemText primary="Consider extra tutoring sessions" />
                          </ListItem>
                        </List>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </AnimatedCard>
          </Grid>
        )}
      </Grid>
    );
  };

  // Enhanced Insights Component
  const EnhancedInsights = () => {
    if (!data) return null;
    
    return (
      <Grid container spacing={3}>
        {/* Performance Insights */}
        <Grid item xs={12} lg={8}>
          <AnimatedCard>
            <CardHeader 
              title="Performance Insights"
              avatar={<InsightsIcon color="primary" />}
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <CardContent>
              <Grid container spacing={3}>
                {/* Overall Performance */}
                <Grid item xs={12}>
                  <Box sx={{ 
                    p: 3, 
                    borderRadius: 2, 
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
                  }}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AssessmentIcon color="primary" />
                      Overall Performance Level
                    </Typography>
                    {data.performance ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <PerformanceMeter 
                          value={parseFloat(data.performance.overallScore?.replace('%', '') || 0)}
                          label="Overall"
                          size="medium"
                        />
                        <Box>
                          <Typography variant="h4" color="primary" fontWeight="bold">
                            {data.performance.performanceLevel || 'No Data'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Based on {data.summary?.attempted || 0} attempted quizzes
                          </Typography>
                          <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
                            <Box>
                              <Typography variant="caption" color="text.secondary">Accuracy</Typography>
                              <Typography variant="h6">{data.performance.accuracy || '0%'}</Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" color="text.secondary">Pass Rate</Typography>
                              <Typography variant="h6">{data.performance.passRate || '0%'}</Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" color="text.secondary">Efficiency</Typography>
                              <Typography variant="h6">{data.performance.efficiencyScore || '0'}</Typography>
                            </Box>
                          </Stack>
                        </Box>
                      </Box>
                    ) : (
                      <Typography color="text.secondary">No performance data available</Typography>
                    )}
                  </Box>
                </Grid>
                
                {/* Strengths */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    p: 2, 
                    borderRadius: 2, 
                    bgcolor: alpha(theme.palette.success.main, 0.05),
                    border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                    height: '100%'
                  }}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ThumbUpIcon color="success" />
                      Strengths
                    </Typography>
                    <List dense>
                      {data.performance?.accuracy && parseFloat(data.performance.accuracy) >= 70 && (
                        <ListItem sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <CheckIcon color="success" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={`High accuracy rate: ${data.performance.accuracy}`}
                            secondary="Consistently answers questions correctly"
                          />
                        </ListItem>
                      )}
                      
                      {data.performance?.passRate && parseFloat(data.performance.passRate) >= 70 && (
                        <ListItem sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <CheckIcon color="success" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={`Excellent pass rate: ${data.performance.passRate}`}
                            secondary="Regularly meets passing requirements"
                          />
                        </ListItem>
                      )}
                      
                      {data.summary?.attemptRate && parseFloat(data.summary.attemptRate) >= 70 && (
                        <ListItem sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <CheckIcon color="success" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={`High participation: ${data.summary.attemptRate}`}
                            secondary="Regularly attempts quizzes"
                          />
                        </ListItem>
                      )}
                      
                      {data.patterns?.attemptPatterns?.bestSubject && data.patterns.attemptPatterns.bestSubject !== 'No data' && (
                        <ListItem sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <CheckIcon color="success" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={`Strong in: ${data.patterns.attemptPatterns.bestSubject}`}
                            secondary="Excels in this subject area"
                          />
                        </ListItem>
                      )}
                      
                      {(!data.performance || !data.summary || data.patterns?.attemptPatterns?.bestSubject === 'No data') && (
                        <ListItem>
                          <ListItemText 
                            primary="No significant strengths identified"
                            secondary="Focus on building foundational skills"
                          />
                        </ListItem>
                      )}
                    </List>
                  </Box>
                </Grid>
                
                {/* Areas for Improvement */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    p: 2, 
                    borderRadius: 2, 
                    bgcolor: alpha(theme.palette.warning.main, 0.05),
                    border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                    height: '100%'
                  }}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <WarningIcon color="warning" />
                      Areas for Improvement
                    </Typography>
                    <List dense>
                      {data.summary?.missedQuizzes > 0 && (
                        <ListItem sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <WarningIcon color="warning" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={`Missed ${data.summary.missedQuizzes} quizzes`}
                            secondary="Participation needs improvement"
                          />
                        </ListItem>
                      )}
                      
                      {data.performance?.accuracy && parseFloat(data.performance.accuracy) < 70 && (
                        <ListItem sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <WarningIcon color="warning" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={`Accuracy needs work: ${data.performance.accuracy}`}
                            secondary="Focus on understanding concepts"
                          />
                        </ListItem>
                      )}
                      
                      {data.performance?.averageTimePerQuiz > 60 && (
                        <ListItem sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <WarningIcon color="warning" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={`Slow pace: ${data.performance.averageTimePerQuiz} min/quiz`}
                            secondary="Time management needs improvement"
                          />
                        </ListItem>
                      )}
                      
                      {data.patterns?.attemptPatterns?.weakestSubject && data.patterns.attemptPatterns.weakestSubject !== 'No data' && (
                        <ListItem sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <WarningIcon color="warning" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={`Weak in: ${data.patterns.attemptPatterns.weakestSubject}`}
                            secondary="Needs additional support in this area"
                          />
                        </ListItem>
                      )}
                      
                      {(!data.summary?.missedQuizzes && (!data.performance || parseFloat(data.performance.accuracy) >= 70) && 
                        (!data.performance?.averageTimePerQuiz || data.performance.averageTimePerQuiz <= 60)) && (
                        <ListItem>
                          <ListItemText 
                            primary="No major improvement areas identified"
                            secondary="Continue with current study habits"
                          />
                        </ListItem>
                      )}
                    </List>
                  </Box>
                </Grid>
                
                {/* Time Analysis */}
                <Grid item xs={12}>
                  <Box sx={{ 
                    p: 2, 
                    borderRadius: 2, 
                    bgcolor: alpha(theme.palette.info.main, 0.05),
                    border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`
                  }}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TimeIcon color="info" />
                      Time Analysis
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Most Active Time
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {data.patterns?.timePatterns?.mostActiveHour || 'No data'}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Most Active Day
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {data.patterns?.timePatterns?.mostActiveDay || 'No data'}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Total Study Time
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {data.summary?.totalStudyTime || '0 hours'}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Avg Quiz Duration
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {data.summary?.averageQuizDuration || '0 minutes'}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </AnimatedCard>
        </Grid>
        
        {/* Pattern Insights */}
        <Grid item xs={12} lg={4}>
          <AnimatedCard>
            <CardHeader 
              title="Pattern Insights"
              avatar={<QueryStatsIcon color="primary" />}
            />
            <CardContent>
              <Stack spacing={3}>
                {/* Attempt Patterns */}
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Attempt Patterns
                  </Typography>
                  <List dense>
                    <ListItem sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        {data.patterns?.attemptPatterns?.hasConsistentMisses ? (
                          <TrendingDownOutlinedIcon color="error" />
                        ) : (
                          <TrendingUpOutlinedIcon color="success" />
                        )}
                      </ListItemIcon>
                      <ListItemText 
                        primary={data.patterns?.attemptPatterns?.hasConsistentMisses ? 
                          "Consistent Misses" : "Regular Participation"}
                        secondary={data.patterns?.attemptPatterns?.hasConsistentMisses ? 
                          "Frequently misses quizzes" : "Regularly attempts quizzes"}
                      />
                    </ListItem>
                    
                    <ListItem sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        {data.patterns?.attemptPatterns?.improving ? (
                          <TrendingUpIcon color="success" />
                        ) : (
                          <TrendingFlatIcon color="warning" />
                        )}
                      </ListItemIcon>
                      <ListItemText 
                        primary={data.patterns?.attemptPatterns?.improving ? 
                          "Performance Improving" : "Performance Stable"}
                        secondary={data.patterns?.attemptPatterns?.improving ? 
                          "Showing recent improvement" : "Consistent performance level"}
                      />
                    </ListItem>
                    
                    <ListItem sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        {data.patterns?.attemptPatterns?.needsAttention ? (
                          <PriorityHighIcon color="error" />
                        ) : (
                          <CheckIcon color="success" />
                        )}
                      </ListItemIcon>
                      <ListItemText 
                        primary={data.patterns?.attemptPatterns?.needsAttention ? 
                          "Needs Attention" : "Active Participation"}
                        secondary={data.patterns?.attemptPatterns?.needsAttention ? 
                          "Has active quizzes not attempted" : "Managing current quizzes well"}
                      />
                    </ListItem>
                  </List>
                </Box>
                
                {/* Subject Performance */}
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Subject Performance
                  </Typography>
                  <List dense>
                    {data.analytics?.courseWise?.slice(0, 3).map((course, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <SchoolIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={course.course}
                          secondary={`${course.attemptRate}% attempt rate`}
                        />
                        <Chip 
                          label={`${course.averagePercentage || 0}%`}
                          size="small"
                          color={parseFloat(course.averagePercentage || 0) >= 70 ? "success" : 
                                 parseFloat(course.averagePercentage || 0) >= 50 ? "warning" : "error"}
                          variant="outlined"
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
                
                {/* Upcoming Priority */}
                {data.quizzes?.highPriority && data.quizzes.highPriority.length > 0 && (
                  <Box sx={{ 
                    p: 1.5, 
                    borderRadius: 2, 
                    bgcolor: alpha(theme.palette.warning.main, 0.1),
                    border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`
                  }}>
                    <Typography variant="subtitle2" fontWeight="bold" color="warning.main" gutterBottom>
                      <AccessAlarmIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                      High Priority Quizzes
                    </Typography>
                    <Typography variant="body2">
                      {data.quizzes.highPriority.length} quizzes starting within 2 days
                    </Typography>
                  </Box>
                )}
              </Stack>
            </CardContent>
          </AnimatedCard>
        </Grid>
      </Grid>
    );
  };

  // Enhanced Analytics Component
  const EnhancedAnalytics = () => {
    return (
      <Grid container spacing={3}>
        {/* Analytics View Toggle */}
        <Grid item xs={12}>
          <GlassCard>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Analytics Dashboard</Typography>
                <ToggleButtonGroup
                  value={analyticsView}
                  exclusive
                  onChange={(e, val) => val && setAnalyticsView(val)}
                  size="small"
                >
                  <ToggleButton value="overview">
                    <DashboardIcon sx={{ mr: 1 }} />
                    Overview
                  </ToggleButton>
                  <ToggleButton value="charts">
                    <BarChartIcon sx={{ mr: 1 }} />
                    Charts
                  </ToggleButton>
                  <ToggleButton value="detailed">
                    <TableChartIcon sx={{ mr: 1 }} />
                    Detailed
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </CardContent>
          </GlassCard>
        </Grid>

        {analyticsView === 'overview' && (
          <>
            {/* Course Performance */}
            <Grid item xs={12} lg={8}>
              <AnimatedCard>
                <CardHeader 
                  title="Course-wise Performance"
                  subheader="Comparison across different courses"
                  avatar={<SchoolIcon color="primary" />}
                />
                <CardContent>
                  <Box sx={{ height: 300 }}>
                    {chartData.courseWise.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData.courseWise}>
                          <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.5)} />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <RechartsTooltip 
                            contentStyle={{ 
                              backgroundColor: theme.palette.background.paper,
                              border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                              borderRadius: theme.shape.borderRadius
                            }}
                          />
                          <Legend />
                          <Bar dataKey="attempted" name="Attempted" fill={theme.palette.success.main} />
                          <Bar dataKey="missed" name="Missed" fill={theme.palette.error.main} />
                          <Bar dataKey="upcoming" name="Upcoming" fill={theme.palette.warning.main} />
                          <Bar dataKey="active" name="Active" fill={theme.palette.info.main} />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                        <Typography color="text.secondary">No course data available</Typography>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </AnimatedCard>
            </Grid>

            {/* Subject Distribution */}
            <Grid item xs={12} lg={4}>
              <AnimatedCard>
                <CardHeader 
                  title="Subject Distribution"
                  avatar={<SubjectIcon color="primary" />}
                />
                <CardContent>
                  <Box sx={{ height: 300 }}>
                    {chartData.subjectWise.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData.subjectWise}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {chartData.subjectWise.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                            ))}
                          </Pie>
                          <RechartsTooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                        <Typography color="text.secondary">No subject data available</Typography>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </AnimatedCard>
            </Grid>

            {/* Performance Trend */}
            <Grid item xs={12}>
              <AnimatedCard>
                <CardHeader 
                  title="Performance Trend Over Time"
                  avatar={<TrendingUpIcon color="primary" />}
                />
                <CardContent>
                  <Box sx={{ height: 300 }}>
                    {chartData.timeSeries.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData.timeSeries}>
                          <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.5)} />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <RechartsTooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="score" 
                            name="Score %" 
                            stroke={theme.palette.primary.main}
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="accuracy" 
                            name="Accuracy %" 
                            stroke={theme.palette.success.main}
                            strokeWidth={2}
                            dot={{ r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                        <Typography color="text.secondary">No time series data available</Typography>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </AnimatedCard>
            </Grid>
          </>
        )}

        {analyticsView === 'charts' && (
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {/* Difficulty Distribution */}
              <Grid item xs={12} md={6}>
                <AnimatedCard>
                  <CardHeader 
                    title="Difficulty Distribution"
                    avatar={<SpeedOutlinedIcon color="primary" />}
                  />
                  <CardContent>
                    <Box sx={{ height: 250 }}>
                      {chartData.difficultyData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={chartData.difficultyData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percentage }) => `${name}: ${percentage}%`}
                              outerRadius={70}
                              fill="#8884d8"
                              dataKey="percentage"
                            >
                              {chartData.difficultyData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                              ))}
                            </Pie>
                            <RechartsTooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      ) : (
                        <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                          <Typography color="text.secondary">No difficulty data available</Typography>
                        </Box>
                      )}
                    </Box>
                  </CardContent>
                </AnimatedCard>
              </Grid>

              {/* Topic Performance */}
              <Grid item xs={12} md={6}>
                <AnimatedCard>
                  <CardHeader 
                    title="Topic Performance"
                    avatar={<CategoryIcon color="primary" />}
                  />
                  <CardContent>
                    <Box sx={{ height: 250 }}>
                      {chartData.topicPerformance.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData.topicPerformance.slice(0, 5)} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.5)} />
                            <XAxis type="number" domain={[0, 100]} />
                            <YAxis type="category" dataKey="topic" width={100} />
                            <RechartsTooltip />
                            <Legend />
                            <Bar dataKey="accuracy" name="Accuracy %" fill={theme.palette.primary.main} />
                            <Bar dataKey="marksEfficiency" name="Marks Efficiency %" fill={theme.palette.success.main} />
                          </BarChart>
                        </ResponsiveContainer>
                      ) : (
                        <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                          <Typography color="text.secondary">No topic data available</Typography>
                        </Box>
                      )}
                    </Box>
                  </CardContent>
                </AnimatedCard>
              </Grid>

              {/* Time Distribution */}
              <Grid item xs={12}>
                <AnimatedCard>
                  <CardHeader 
                    title="Attempt Time Distribution"
                    avatar={<TimeIcon color="primary" />}
                  />
                  <CardContent>
                    <Box sx={{ height: 300 }}>
                      {data?.patterns?.timePatterns?.hourDistribution && data.patterns.timePatterns.hourDistribution.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={data.patterns.timePatterns.hourDistribution}>
                            <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.5)} />
                            <XAxis dataKey="hour" />
                            <YAxis />
                            <RechartsTooltip />
                            <Area 
                              type="monotone" 
                              dataKey="attempts" 
                              name="Attempts"
                              stroke={theme.palette.info.main}
                              fill={theme.palette.info.main}
                              fillOpacity={0.3}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      ) : (
                        <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                          <Typography color="text.secondary">No time distribution data available</Typography>
                        </Box>
                      )}
                    </Box>
                  </CardContent>
                </AnimatedCard>
              </Grid>
            </Grid>
          </Grid>
        )}

        {analyticsView === 'detailed' && (
          <Grid item xs={12}>
            <AnimatedCard>
              <CardHeader 
                title="Detailed Statistics"
                avatar={<AnalyticsIcon color="primary" />}
              />
              <CardContent>
                <Grid container spacing={3}>
                  {/* Performance Metrics */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AssessmentIcon />
                      Performance Metrics
                    </Typography>
                    <Grid container spacing={2}>
                      {[
                        { 
                          label: 'Average Score', 
                          value: data?.performance?.averageScore || '0', 
                          unit: 'marks',
                          icon: <GradeIcon color="primary" />,
                          color: 'primary'
                        },
                        { 
                          label: 'Total Marks Obtained', 
                          value: data?.performance?.totalMarksObtained || '0', 
                          unit: 'marks',
                          icon: <ScoreIcon color="success" />,
                          color: 'success'
                        },
                        { 
                          label: 'Passed Quizzes', 
                          value: data?.performance?.passedQuizzes || '0', 
                          unit: 'quizzes',
                          icon: <DoneAllIcon color="success" />,
                          color: 'success'
                        },
                        { 
                          label: 'Failed Quizzes', 
                          value: data?.performance?.failedQuizzes || '0', 
                          unit: 'quizzes',
                          icon: <WarningIcon color="error" />,
                          color: 'error'
                        },
                      ].map((metric, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Box sx={{ 
                            p: 2, 
                            borderRadius: 2, 
                            bgcolor: alpha(theme.palette[metric.color].main, 0.05),
                            border: `1px solid ${alpha(theme.palette[metric.color].main, 0.1)}`,
                            height: '100%'
                          }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              {metric.icon}
                              <Typography variant="body2" color="text.secondary">
                                {metric.label}
                              </Typography>
                            </Box>
                            <Typography variant="h4" fontWeight="bold" color={`${metric.color}.main`}>
                              {metric.value} <Typography component="span" variant="body2" color="text.secondary">{metric.unit}</Typography>
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>

                  {/* Time Analysis */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AvTimerIcon />
                      Time Analysis
                    </Typography>
                    <Grid container spacing={2}>
                      {[
                        { 
                          label: 'Total Study Time', 
                          value: data?.summary?.totalStudyTime || '0 hours',
                          icon: <TimerIcon color="info" />,
                          color: 'info'
                        },
                        { 
                          label: 'Average Quiz Duration', 
                          value: data?.summary?.averageQuizDuration || '0 minutes',
                          icon: <TimeIcon color="info" />,
                          color: 'info'
                        },
                        { 
                          label: 'Average Time Per Quiz', 
                          value: `${data?.performance?.averageTimePerQuiz || 0} minutes`,
                          icon: <SpeedIcon color="info" />,
                          color: 'info'
                        },
                        { 
                          label: 'Efficiency Score', 
                          value: data?.performance?.efficiencyScore || '0',
                          icon: <SpeedOutlinedIcon color="info" />,
                          color: 'info'
                        },
                      ].map((metric, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Box sx={{ 
                            p: 2, 
                            borderRadius: 2, 
                            bgcolor: alpha(theme.palette[metric.color].main, 0.05),
                            border: `1px solid ${alpha(theme.palette[metric.color].main, 0.1)}`,
                            height: '100%'
                          }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              {metric.icon}
                              <Typography variant="body2" color="text.secondary">
                                {metric.label}
                              </Typography>
                            </Box>
                            <Typography variant="h5" fontWeight="bold">
                              {metric.value}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>

                  {/* Department & Subject Stats */}
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                      <AccountTreeIcon />
                      Department & Subject Statistics
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <AnimatedCard>
                          <CardHeader 
                            title="Department Distribution"
                            avatar={<BusinessIcon />}
                          />
                          <CardContent>
                            <List dense>
                              {data?.analytics?.departmentWise?.slice(0, 5).map((dept, index) => (
                                <ListItem key={index} sx={{ py: 1 }}>
                                  <ListItemText 
                                    primary={dept.department}
                                    secondary={`${dept.count} quizzes`}
                                  />
                                  <Typography variant="body2" color="text.secondary">
                                    {((dept.count / data.summary.totalRegisteredQuizzes) * 100).toFixed(1)}%
                                  </Typography>
                                </ListItem>
                              ))}
                            </List>
                          </CardContent>
                        </AnimatedCard>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <AnimatedCard>
                          <CardHeader 
                            title="Subject Performance"
                            avatar={<SubjectIcon />}
                          />
                          <CardContent>
                            <List dense>
                              {data?.analytics?.subjectWise?.slice(0, 5).map((subject, index) => (
                                <ListItem key={index} sx={{ py: 1 }}>
                                  <ListItemText 
                                    primary={subject.subject}
                                    secondary={`${subject.attempted}/${subject.total} attempted`}
                                  />
                                  <Chip 
                                    label={`${subject.attemptRate}%`}
                                    size="small"
                                    color={parseFloat(subject.attemptRate) >= 70 ? "success" : 
                                           parseFloat(subject.attemptRate) >= 50 ? "warning" : "error"}
                                    variant="outlined"
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </CardContent>
                        </AnimatedCard>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </AnimatedCard>
          </Grid>
        )}
      </Grid>
    );
  };

  // Enhanced Quizzes Table Component
  const EnhancedQuizzesTable = () => {
    const currentQuizzes = getCurrentQuizzes();
    const paginatedQuizzes = currentQuizzes.slice(
      (filters.page - 1) * filters.limit,
      filters.page * filters.limit
    );

    if (paginatedQuizzes.length === 0) {
      return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <QuizIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No quizzes found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your filters or search terms
          </Typography>
        </Box>
      );
    }

    return (
      <>
        <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.05) }}>
                <StyledTableCell>
                  <Typography variant="subtitle2" fontWeight="bold">Quiz Title</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="subtitle2" fontWeight="bold">Subject & Course</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="subtitle2" fontWeight="bold">Schedule</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="subtitle2" fontWeight="bold">Marks</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="subtitle2" fontWeight="bold">Status</Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Typography variant="subtitle2" fontWeight="bold">Actions</Typography>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedQuizzes.map((quiz) => (
                <StyledTableRow 
                  key={quiz._id} 
                  hover
                  status={quiz.status}
                  onClick={() => handleExpandQuiz(quiz._id)}
                  sx={{ cursor: 'pointer' }}
                >
                  <StyledTableCell>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {quiz.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" noWrap sx={{ maxWidth: 200, display: 'block' }}>
                        {quiz.description?.substring(0, 60)}...
                      </Typography>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Chip 
                        label={quiz.subject} 
                        size="small" 
                        variant="outlined"
                        icon={<SubjectIcon />}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {Array.isArray(quiz.course) ? quiz.course.join(', ') : quiz.course}
                      </Typography>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {formatDate(quiz.startTime)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {formatDuration(quiz.durationMinutes)}
                      </Typography>
                      {quiz.status === 'upcoming' && quiz.daysRemaining > 0 && (
                        <Chip 
                          label={`${quiz.daysRemaining}d left`}
                          size="small"
                          color="warning"
                          variant="outlined"
                          sx={{ mt: 0.5 }}
                        />
                      )}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {quiz.totalMarks || 0} marks
                      </Typography>
                      {quiz.performance && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                          <Chip
                            label={`${quiz.performance.scoredMarks || 0}/${quiz.totalMarks || 0}`}
                            size="small"
                            color={quiz.performance.passed ? 'success' : 'error'}
                            variant="outlined"
                          />
                          <Typography variant="caption" color="text.secondary">
                            {quiz.performance.percentage}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    {renderStatusChip(quiz.status)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                      <Tooltip title="View Details">
                        <IconButton 
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuizDetailView(quiz);
                          }}
                          sx={{ 
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                            '&:hover': {
                              backgroundColor: alpha(theme.palette.primary.main, 0.2)
                            }
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      {quiz.status === 'attempted' && (
                        <Tooltip title="View Performance">
                          <IconButton 
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuizDetailView(quiz, 'performance');
                            }}
                            sx={{ 
                              backgroundColor: alpha(theme.palette.success.main, 0.1),
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.success.main, 0.2)
                              }
                            }}
                          >
                            <AssessmentIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                      {quiz.status === 'upcoming' && (
                        <Tooltip title="Schedule">
                          <IconButton 
                            size="small"
                            sx={{ 
                              backgroundColor: alpha(theme.palette.warning.main, 0.1),
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.warning.main, 0.2)
                              }
                            }}
                          >
                            <CalendarIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Stack>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Expanded Row Details */}
        {expandedQuiz && (
          <Box sx={{ mt: 1 }}>
            {paginatedQuizzes
              .filter(quiz => quiz._id === expandedQuiz)
              .map(quiz => (
                <AnimatedCard key={quiz._id}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Description
                        </Typography>
                        <Typography variant="body2">
                          {quiz.description || 'No description available'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Additional Information
                        </Typography>
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <Typography variant="caption" color="text.secondary">Department:</Typography>
                            <Typography variant="body2">{quiz.department || 'N/A'}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="caption" color="text.secondary">Year/Groups:</Typography>
                            <Typography variant="body2">
                              {quiz.yr?.join(', ') || 'N/A'} / {quiz.group?.join(', ') || 'N/A'}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="caption" color="text.secondary">Total Questions:</Typography>
                            <Typography variant="body2">{quiz.totalQuestions || 'N/A'}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="caption" color="text.secondary">Allowed Attempts:</Typography>
                            <Typography variant="body2">{quiz.allowedAttempts || 1}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                      <Button 
                        size="small" 
                        variant="outlined"
                        startIcon={<VisibilityIcon />}
                        onClick={() => handleQuizDetailView(quiz)}
                      >
                        View Full Details
                      </Button>
                      {quiz.status === 'attempted' && (
                        <Button 
                          size="small" 
                          variant="outlined"
                          startIcon={<AssessmentIcon />}
                          onClick={() => handleQuizDetailView(quiz, 'performance')}
                        >
                          Performance Analysis
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </AnimatedCard>
              ))}
          </Box>
        )}

        {/* Pagination */}
        {currentQuizzes.length > filters.limit && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={Math.ceil(currentQuizzes.length / filters.limit)}
              page={filters.page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
              siblingCount={1}
              boundaryCount={1}
              sx={{
                '& .MuiPaginationItem-root': {
                  borderRadius: 2
                }
              }}
            />
          </Box>
        )}
      </>
    );
  };

  // Enhanced Overview Component
  const EnhancedOverview = () => {
    if (!data) return null;
    
    return (
      <Grid container spacing={3}>
        {/* Key Metrics */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {/* Total Registered */}
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard color="primary">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ p: 1, borderRadius: 3, bgcolor: alpha(theme.palette.common.white, 0.2) }}>
                      <QuizIcon sx={{ fontSize: 28, color: 'white' }} />
                    </Box>
                    {data.summary?.attemptRate && parseFloat(data.summary.attemptRate) >= 70 ? (
                      <TrendingUpIcon sx={{ color: 'white' }} />
                    ) : (
                      <TrendingFlatIcon sx={{ color: 'white' }} />
                    )}
                  </Box>
                  <Typography variant="h2" fontWeight="bold" color="white">
                    {data.summary?.totalRegisteredQuizzes || 0}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mt: 1 }}>
                    Total Registered Quizzes
                  </Typography>
                </CardContent>
              </MetricCard>
            </Grid>

            {/* Attempted */}
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard color="success">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ p: 1, borderRadius: 3, bgcolor: alpha(theme.palette.common.white, 0.2) }}>
                      <CheckCircleIcon sx={{ fontSize: 28, color: 'white' }} />
                    </Box>
                    <TrendingUpIcon sx={{ color: 'white' }} />
                  </Box>
                  <Typography variant="h2" fontWeight="bold" color="white">
                    {data.summary?.attempted || 0}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mt: 1 }}>
                    Attempted ({data.summary?.attemptRate || '0%'})
                  </Typography>
                </CardContent>
              </MetricCard>
            </Grid>

            {/* Missed */}
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard color="warning">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ p: 1, borderRadius: 3, bgcolor: alpha(theme.palette.common.white, 0.2) }}>
                      <WarningIcon sx={{ fontSize: 28, color: 'white' }} />
                    </Box>
                    {data.summary?.missedQuizzes > 0 ? (
                      <TrendingUpIcon sx={{ color: 'white' }} />
                    ) : (
                      <TrendingDownIcon sx={{ color: 'white' }} />
                    )}
                  </Box>
                  <Typography variant="h2" fontWeight="bold" color="white">
                    {data.summary?.missedQuizzes || 0}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mt: 1 }}>
                    Not Attempted
                  </Typography>
                </CardContent>
              </MetricCard>
            </Grid>

            {/* Upcoming */}
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard color="info">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ p: 1, borderRadius: 3, bgcolor: alpha(theme.palette.common.white, 0.2) }}>
                      <ScheduleIcon sx={{ fontSize: 28, color: 'white' }} />
                    </Box>
                    <AccessAlarmIcon sx={{ color: 'white' }} />
                  </Box>
                  <Typography variant="h2" fontWeight="bold" color="white">
                    {data.summary?.upcomingQuizzes || 0}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mt: 1 }}>
                    Upcoming Quizzes
                  </Typography>
                </CardContent>
              </MetricCard>
            </Grid>
          </Grid>
        </Grid>

        {/* Performance Overview & Course Stats */}
        <Grid item xs={12} lg={8}>
          <AnimatedCard>
            <CardHeader 
              title="Performance Overview"
              avatar={<AssessmentIcon color="primary" />}
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <CardContent>
              {data.performance ? (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={3}>
                      <Box>
                        <Typography variant="h6" gutterBottom>Overall Performance</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                          <PerformanceMeter 
                            value={parseFloat(data.performance.overallScore?.replace('%', '') || 0)}
                            label="Overall"
                            size="medium"
                          />
                          <Box>
                            <Typography variant="h4" color="primary" fontWeight="bold">
                              {data.performance.performanceLevel}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Based on {data.summary.attempted} quizzes
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      
                      <Divider />
                      
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="caption" color="text.secondary" display="block">
                              Accuracy
                            </Typography>
                            <Typography variant="h4" color="success.main" fontWeight="bold">
                              {data.performance.accuracy}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="caption" color="text.secondary" display="block">
                              Pass Rate
                            </Typography>
                            <Typography variant="h4" color="info.main" fontWeight="bold">
                              {data.performance.passRate}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Stack>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Box sx={{ height: 250 }}>
                      <Typography variant="h6" gutterBottom>Performance Trend</Typography>
                      {chartData.timeSeries.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={chartData.timeSeries}>
                            <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.5)} />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <RechartsTooltip />
                            <Area 
                              type="monotone" 
                              dataKey="score" 
                              name="Score %" 
                              stroke={theme.palette.primary.main}
                              fill={theme.palette.primary.main}
                              fillOpacity={0.3}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      ) : (
                        <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                          <Typography color="text.secondary">No performance data available</Typography>
                        </Box>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <QuizIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
                  <Typography variant="h6" color="text.secondary">
                    No Performance Data
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Student hasn't attempted any quizzes yet
                  </Typography>
                </Box>
              )}
            </CardContent>
          </AnimatedCard>
        </Grid>

        {/* Course Performance */}
        <Grid item xs={12} lg={4}>
          <AnimatedCard sx={{ height: '100%' }}>
            <CardHeader 
              title="Course Performance"
              avatar={<SchoolIcon color="primary" />}
            />
            <CardContent>
              <Stack spacing={2}>
                {chartData.courseWise.slice(0, 4).map((course, index) => (
                  <Box key={index}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body1" fontWeight="medium">
                        {course.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {course.attempted}/{course.total}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={course.total > 0 ? (course.attempted / course.total) * 100 : 0}
                        sx={{ 
                          flex: 1, 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: alpha(theme.palette.primary.main, 0.1)
                        }}
                      />
                      <Typography variant="caption" color="text.secondary" sx={{ minWidth: 40 }}>
                        {course.total > 0 ? Math.round((course.attempted / course.total) * 100) : 0}%
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                      <Chip 
                        label={`${course.attemptRate}%`}
                        size="small"
                        variant="outlined"
                        sx={{ height: 20, fontSize: '0.65rem' }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Avg: {course.averagePercentage || 0}%
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </AnimatedCard>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <AnimatedCard>
                <CardContent>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ 
                      display: 'inline-flex', 
                      p: 2, 
                      borderRadius: 3, 
                      bgcolor: alpha(theme.palette.success.main, 0.1),
                      mb: 2
                    }}>
                      <TimerIcon sx={{ color: theme.palette.success.main, fontSize: 32 }} />
                    </Box>
                    <Typography variant="h4" fontWeight="bold">
                      {data.summary?.averageQuizDuration || '0m'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Avg Quiz Duration
                    </Typography>
                  </Box>
                </CardContent>
              </AnimatedCard>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AnimatedCard>
                <CardContent>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ 
                      display: 'inline-flex', 
                      p: 2, 
                      borderRadius: 3, 
                      bgcolor: alpha(theme.palette.info.main, 0.1),
                      mb: 2
                    }}>
                      <SpeedIcon sx={{ color: theme.palette.info.main, fontSize: 32 }} />
                    </Box>
                    <Typography variant="h4" fontWeight="bold">
                      {data.performance?.efficiencyScore || '0'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Efficiency Score
                    </Typography>
                  </Box>
                </CardContent>
              </AnimatedCard>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AnimatedCard>
                <CardContent>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ 
                      display: 'inline-flex', 
                      p: 2, 
                      borderRadius: 3, 
                      bgcolor: alpha(theme.palette.warning.main, 0.1),
                      mb: 2
                    }}>
                      <AccessAlarmIcon sx={{ color: theme.palette.warning.main, fontSize: 32 }} />
                    </Box>
                    <Typography variant="h4" fontWeight="bold">
                      {data.quizzes?.highPriority?.length || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      High Priority
                    </Typography>
                  </Box>
                </CardContent>
              </AnimatedCard>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AnimatedCard>
                <CardContent>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ 
                      display: 'inline-flex', 
                      p: 2, 
                      borderRadius: 3, 
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      mb: 2
                    }}>
                      <EmojiEventsIcon sx={{ color: theme.palette.primary.main, fontSize: 32 }} />
                    </Box>
                    <Typography variant="h4" fontWeight="bold">
                      {data.performance?.passedQuizzes || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Passed Quizzes
                    </Typography>
                  </Box>
                </CardContent>
              </AnimatedCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  // Main render
  if (loading && !data) {
    return <LoadingSkeleton />;
  }

  if (error && !data) {
    return <ErrorDisplay message={error} onRetry={fetchStudentQuizzes} />;
  }

  if (!data || (data.summary?.totalRegisteredQuizzes === 0)) {
    return <NoDataDisplay />;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header Section */}
      <GlassCard sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <IconButton 
                onClick={() => navigate(-1)} 
                size="large"
                sx={{ 
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.2)
                  }
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Grid>
            <Grid item xs>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Student Quiz Analytics
              </Typography>
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate('/faculty/dashboard')}
                  sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                >
                  <HomeIcon fontSize="small" />
                  Dashboard
                </Link>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate('/faculty/students')}
                >
                  Students
                </Link>
                <Typography color="text.primary" fontWeight="medium">
                  {data.student?.basicInfo?.name || 'Unknown'}
                </Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item>
              <Stack direction="row" spacing={1}>
                <Tooltip title="Refresh">
                  <IconButton 
                    onClick={fetchStudentQuizzes} 
                    disabled={isRefreshing}
                    sx={{ 
                      backgroundColor: alpha(theme.palette.info.main, 0.1),
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.info.main, 0.2)
                      }
                    }}
                  >
                    <RefreshIcon className={isRefreshing ? 'spin' : ''} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Export Data">
                  <IconButton 
                    onClick={() => console.log('Export')}
                    sx={{ 
                      backgroundColor: alpha(theme.palette.success.main, 0.1),
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.success.main, 0.2)
                      }
                    }}
                  >
                    <DownloadIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Filters">
                  <IconButton 
                    onClick={() => setFilterDrawerOpen(true)}
                    sx={{ 
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.2)
                      }
                    }}
                  >
                    <FilterIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Grid>
          </Grid>

          {/* Student Profile */}
          <Box sx={{ 
            mt: 3, 
            p: 3, 
            background: `linear-gradient(135deg, ${theme.palette.grey[900]} 0%, ${theme.palette.grey[700]} 100%)`,
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden'
          }}>
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              pointerEvents: 'none'
            }} />
            
            <Grid container spacing={3} alignItems="center">
              <Grid item>
                <Avatar sx={{
                  width: 80,
                  height: 80,
                  bgcolor: theme.palette.primary.main,
                  fontSize: '2rem',
                  border: `3px solid ${theme.palette.common.white}`,
                  boxShadow: theme.shadows[4]
                }}>
                  {data.student?.basicInfo?.name?.charAt(0) || '?'}
                </Avatar>
              </Grid>
              <Grid item xs>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Typography variant="h4" fontWeight="bold" color="white" gutterBottom>
                        {data.student?.basicInfo?.name || 'Unknown'}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        <Chip 
                          icon={<SchoolIcon />}
                          label={data.student?.basicInfo?.course || 'Unknown'}
                          size="small"
                          sx={{ 
                            backgroundColor: alpha(theme.palette.common.white, 0.2),
                            color: 'white',
                            '& .MuiChip-icon': { color: 'white' }
                          }}
                        />
                        <Chip 
                          icon={<PersonIcon />}
                          label={data.student?.basicInfo?.gender || 'N/A'}
                          size="small"
                          sx={{ 
                            backgroundColor: alpha(theme.palette.common.white, 0.2),
                            color: 'white',
                            '& .MuiChip-icon': { color: 'white' }
                          }}
                        />
                        <Chip 
                          icon={<TagIcon />}
                          label={`ID: ${data.student?.basicInfo?.studentId || 'N/A'}`}
                          size="small"
                          sx={{ 
                            backgroundColor: alpha(theme.palette.common.white, 0.2),
                            color: 'white',
                            '& .MuiChip-icon': { color: 'white' }
                          }}
                        />
                      </Stack>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Box>
                          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }} display="block">
                            <EmailIcon sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
                            Email
                          </Typography>
                          <Typography variant="body1" sx={{ color: 'white' }}>
                            {data.student?.contactInfo?.email || 'N/A'}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box>
                          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }} display="block">
                            <CalendarIcon sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
                            Enrollment Date
                          </Typography>
                          <Typography variant="body1" sx={{ color: 'white' }}>
                            {formatDate(data.student?.enrollmentDate)}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }} display="block">
                    Engagement Score
                  </Typography>
                  <PerformanceMeter 
                    value={data.performance?.engagementScore || 0} 
                    label="Engagement"
                    size="small"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </GlassCard>

      {/* Navigation Tabs */}
      <Box sx={{ mb: 3 }}>
        <Tabs 
          value={activeTab}
          onChange={(e, val) => setActiveTab(val)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              minHeight: 60,
              fontSize: '0.95rem',
              fontWeight: 600,
              textTransform: 'none'
            },
            '& .Mui-selected': {
              color: theme.palette.primary.main
            },
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: '3px 3px 0 0'
            }
          }}
        >
          <Tab 
            icon={<DashboardIcon />} 
            iconPosition="start" 
            label="Overview" 
            value="overview" 
          />
          <Tab 
            icon={<AnalyticsIcon />} 
            iconPosition="start" 
            label="Analytics" 
            value="analytics" 
          />
          <Tab 
            icon={<QuizIcon />} 
            iconPosition="start" 
            label={`Quizzes (${data.summary?.totalRegisteredQuizzes || 0})`} 
            value="quizzes" 
          />
          <Tab 
            icon={<InsightsIcon />} 
            iconPosition="start" 
            label="Insights" 
            value="insights" 
          />
          <Tab 
            icon={<PsychologyIcon />} 
            iconPosition="start" 
            label="Recommendations" 
            value="recommendations" 
          />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {activeTab === 'overview' && <EnhancedOverview />}
      {activeTab === 'analytics' && <EnhancedAnalytics />}
      {activeTab === 'insights' && <EnhancedInsights />}
      {activeTab === 'recommendations' && <EnhancedRecommendations />}
      
      {/* Quizzes Tab Content */}
      {activeTab === 'quizzes' && (
        <AnimatedCard>
          <CardHeader 
            title="Registered Quizzes"
            subheader={`Total: ${getCurrentQuizzes().length} quizzes found`}
            action={
              <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                  size="small"
                  placeholder="Search quizzes..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                    endAdornment: filters.search && (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => handleFilterChange('search', '')}>
                          <ClearIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  sx={{ width: 250 }}
                />
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={filters.sortBy}
                    label="Sort By"
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  >
                    <MenuItem value="startTime">Start Time</MenuItem>
                    <MenuItem value="title">Title</MenuItem>
                    <MenuItem value="totalMarks">Total Marks</MenuItem>
                    <MenuItem value="status">Status</MenuItem>
                  </Select>
                </FormControl>
                <ToggleButtonGroup
                  value={filters.sortOrder}
                  exclusive
                  onChange={(e, val) => val && handleFilterChange('sortOrder', val)}
                  size="small"
                >
                  <ToggleButton value="asc">
                    <SortByAlphaIcon />
                  </ToggleButton>
                  <ToggleButton value="desc">
                    <SortByAlphaIcon sx={{ transform: 'rotate(180deg)' }} />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Stack>
            }
          />
          <CardContent>
            <EnhancedQuizzesTable />
          </CardContent>
        </AnimatedCard>
      )}

      {/* Filter Drawer */}
      <Drawer
        anchor="right"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 400 },
            p: 3
          }
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" fontWeight="bold">
              <FilterAltIcon sx={{ mr: 1 }} />
              Filters & Settings
            </Typography>
            <IconButton onClick={() => setFilterDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Stack spacing={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                label="Status"
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="attempted">Attempted</MenuItem>
                <MenuItem value="missed">Not Attempted</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="upcoming">Upcoming</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Subject</InputLabel>
              <Select
                value={filters.subject}
                label="Subject"
                onChange={(e) => handleFilterChange('subject', e.target.value)}
              >
                <MenuItem value="">All Subjects</MenuItem>
                {data?.analytics?.subjectWise?.map((subject, index) => (
                  <MenuItem key={index} value={subject.subject}>
                    {subject.subject} ({subject.total})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Course</InputLabel>
              <Select
                value={filters.course}
                label="Course"
                onChange={(e) => handleFilterChange('course', e.target.value)}
              >
                <MenuItem value="">All Courses</MenuItem>
                {data?.analytics?.courseWise?.map((course, index) => (
                  <MenuItem key={index} value={course.course}>
                    {course.course} ({course.total || 0})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Divider />

            <Box>
              <Typography variant="subtitle2" gutterBottom>Items per page</Typography>
              <ToggleButtonGroup
                value={filters.limit}
                exclusive
                onChange={(e, val) => val && handleFilterChange('limit', val)}
                fullWidth
              >
                <ToggleButton value={5}>5</ToggleButton>
                <ToggleButton value={10}>10</ToggleButton>
                <ToggleButton value={25}>25</ToggleButton>
                <ToggleButton value={50}>50</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Button 
              variant="outlined" 
              onClick={handleResetFilters} 
              fullWidth
              startIcon={<ClearIcon />}
              size="large"
            >
              Reset All Filters
            </Button>
            
            <Button 
              variant="contained" 
              onClick={() => setFilterDrawerOpen(false)} 
              fullWidth
              size="large"
            >
              Apply Filters
            </Button>
          </Stack>
        </Box>
      </Drawer>

      {/* Quiz Detail Dialog */}
      <QuizDetailDialog />

      {/* Speed Dial */}
      <SpeedDial
        ariaLabel="Quick actions"
        sx={{ position: 'fixed', bottom: 24, right: 24 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction 
          icon={<RefreshIcon />} 
          tooltipTitle="Refresh" 
          onClick={fetchStudentQuizzes} 
        />
        <SpeedDialAction 
          icon={<DownloadIcon />} 
          tooltipTitle="Export Data" 
          onClick={() => console.log('Export')}
        />
        <SpeedDialAction 
          icon={<PrintIcon />} 
          tooltipTitle="Print Report" 
          onClick={() => window.print()}
        />
      </SpeedDial>
    </Container>
  );
};

// Add CSS for spinning icon
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .spin {
    animation: spin 1s linear infinite;
  }
  .fade-in {
    animation: fadeIn 0.3s ease-in;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(styleSheet);

export default StudentRegisteredQuizzes;


