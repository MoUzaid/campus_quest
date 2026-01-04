








import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area,
  ResponsiveContainer, ComposedChart, Scatter, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  Treemap
} from "recharts";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

// Material-UI Components
import {
  Box, Container, Typography, Grid, Paper, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Tabs, Tab, Chip, Button, IconButton, LinearProgress,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Select, MenuItem, FormControl, InputLabel,
  Tooltip as MuiTooltip, Avatar, Divider,
  Stack, Badge, CircularProgress, Alert, AlertTitle,
  Pagination, TextField, InputAdornment,
  CardHeader, CardActions, List, ListItem, ListItemText,
  ListItemIcon, CardActionArea, Collapse, Fade,
  Drawer, ListItemButton, Checkbox, FormGroup, FormControlLabel,
  Slider, Autocomplete, RadioGroup, Radio,
  Menu, Switch, Chip as MuiChip, Toolbar
} from "@mui/material";

// Material-UI Icons
import {
  Dashboard as DashboardIcon,
  Analytics as AnalyticsIcon,
  CompareArrows as CompareArrowsIcon,
  Quiz as QuizIcon,
  Refresh as RefreshIcon,
  FilterList as FilterIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  ChevronRight as ChevronRightIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  People as PeopleIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingUpIcon,
  School as SchoolIcon,
  LibraryBooks as LibraryBooksIcon,
  Assignment as AssignmentIcon,
  EmojiEvents as EmojiEventsIcon,
  AccessTime as AccessTimeIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  MoreVert as MoreVertIcon,
  CalendarToday as CalendarTodayIcon,
  Info as InfoIcon,
  Error as ErrorIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Timeline as TimelineIcon,
  InsertChart as InsertChartIcon,
  Score as ScoreIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Sort as SortIcon,
  DateRange as DateRangeIcon,
  CloudDownload as CloudDownloadIcon,
  PictureAsPdf as PictureAsPdfIcon,
  TableChart as TableChartIcon,
  Close as CloseIcon,
  Tune as TuneIcon,
  TrendingFlat as TrendingFlatIcon,
  Speed as SpeedIcon,
  Psychology as PsychologyIcon,
  Dataset as DatasetIcon,
  FilterAlt as FilterAltIcon,
  FilterAltOff as FilterAltOffIcon,
  DownloadForOffline as DownloadForOfflineIcon,
  Upload as UploadIcon,
  Cached as CachedIcon,
  Whatshot as WhatshotIcon,
  Leaderboard as LeaderboardIcon,
  AnalyticsOutlined as AnalyticsOutlinedIcon
} from "@mui/icons-material";
import "./OwnFacultyQuizzes.css";
// Custom Styled Components
const StatCard = ({ title, value, icon: Icon, color, subtext, trend, onClick }) => {
  return (
    <Card 
      sx={{ 
        height: '100%',
        borderRadius: 2,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        border: `1px solid ${color}20`,
        transition: 'all 0.3s ease',
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          borderColor: color
        }
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div" fontWeight="bold" color="text.primary">
              {value}
            </Typography>
            {subtext && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {subtext}
              </Typography>
            )}
            {trend && (
              <Chip 
                size="small" 
                label={trend} 
                sx={{ 
                  mt: 1,
                  backgroundColor: trend.includes('+') ? '#e8f5e9' : '#ffebee',
                  color: trend.includes('+') ? '#2e7d32' : '#c62828'
                }}
              />
            )}
          </Box>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: `${color}15`,
              color: color
            }}
          >
            <Icon sx={{ fontSize: 28 }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const LoadingScreen = () => (
  <Box 
    display="flex" 
    flexDirection="column" 
    alignItems="center" 
    justifyContent="center" 
    minHeight="60vh"
  >
    <CircularProgress size={60} thickness={4} />
    <Typography variant="h6" color="text.secondary" sx={{ mt: 3 }}>
      Loading your quizzes...
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
      Please wait while we fetch your data
    </Typography>
  </Box>
);

const ErrorScreen = ({ message, onRetry }) => (
  <Box 
    display="flex" 
    flexDirection="column" 
    alignItems="center" 
    justifyContent="center" 
    minHeight="60vh"
    p={3}
  >
    <ErrorIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
    <Typography variant="h5" gutterBottom color="error">
      Something went wrong
    </Typography>
    <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 3 }}>
      {message || "We couldn't load your quizzes. Please try again."}
    </Typography>
    {onRetry && (
      <Button 
        variant="contained" 
        startIcon={<RefreshIcon />}
        onClick={onRetry}
        size="large"
      >
        Try Again
      </Button>
    )}
  </Box>
);

const EmptyState = () => (
  <Box 
    display="flex" 
    flexDirection="column" 
    alignItems="center" 
    justifyContent="center" 
    minHeight="60vh"
    p={3}
  >
    <QuizIcon sx={{ fontSize: 80, color: 'primary.main', opacity: 0.5, mb: 2 }} />
    <Typography variant="h5" gutterBottom>
      No Quizzes Created Yet
    </Typography>
    <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 3, maxWidth: 400 }}>
      You haven't created any quizzes. Create your first quiz to start engaging with students.
    </Typography>
    <Button variant="contained" startIcon={<AddIcon />} size="large">
      Create First Quiz
    </Button>
  </Box>
);

// Quiz Card Component
const QuizCard = ({ quiz, onViewDetails, onViewRegistered, onViewAttempted, isExpanded, onToggle }) => {
  const attemptedPercentage = quiz.registeredCount > 0 
    ? Math.round((quiz.attemptedCount / quiz.registeredCount) * 100) 
    : 0;

  const statusColors = {
    ONGOING: '#4caf50',
    COMPLETED: '#757575'
  };

  const scorePercentage = quiz.bestScore && quiz.totalMarks > 0 
    ? Math.round((quiz.bestScore / quiz.totalMarks) * 100) 
    : 0;

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        overflow: 'hidden',
        border: `1px solid ${statusColors[quiz.status]}30`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 8,
        }
      }}
    >
      <CardActionArea onClick={onToggle}>
        <CardContent sx={{ p: 2.5 }}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Box flex={1}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Chip 
                  label={quiz.status}
                  size="small"
                  sx={{ 
                    backgroundColor: statusColors[quiz.status] + '20',
                    color: statusColors[quiz.status],
                    fontWeight: 600,
                    fontSize: '0.7rem'
                  }}
                />
                {quiz.bestScore > 0 && (
                  <Chip 
                    icon={<StarIcon sx={{ fontSize: 14 }} />}
                    label={`${quiz.bestScore}/${quiz.totalMarks}`}
                    size="small"
                    sx={{ 
                      backgroundColor: '#fff3e0',
                      color: '#e65100',
                      fontWeight: 600,
                      fontSize: '0.7rem'
                    }}
                  />
                )}
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ ml: 'auto' }}
                >
                  {new Date(quiz.startTime).toLocaleDateString()}
                </Typography>
              </Box>
              
              <Typography variant="h6" gutterBottom fontWeight={600} noWrap>
                {quiz.title}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {quiz.subject} • {quiz.durationMinutes} min • {quiz.totalMarks} marks
              </Typography>

              {/* Best Score Indicator */}
              {quiz.bestScore > 0 && (
                <Box mb={2}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                    <Typography variant="caption" color="text.secondary">
                      Best Score: {quiz.bestScore}/{quiz.totalMarks}
                    </Typography>
                    <Typography variant="caption" fontWeight={600} color="success.main">
                      {scorePercentage}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={scorePercentage} 
                    sx={{ 
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: 'grey.100',
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(90deg, #ffd740, #ffab00)'
                      }
                    }}
                  />
                </Box>
              )}

              <Box display="flex" alignItems="center" gap={2} mt={2}>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <PeopleIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                  <Typography variant="body2" color="text.primary">
                    {quiz.registeredCount}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <CheckCircleIcon sx={{ fontSize: 16, color: 'success.main' }} />
                  <Typography variant="body2" color="text.primary">
                    {quiz.attemptedCount}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={attemptedPercentage} 
                    sx={{ 
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: 'grey.100'
                    }}
                  />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {attemptedPercentage}%
                </Typography>
              </Box>

              <Collapse in={isExpanded}>
                <Box mt={2}>
                  <Divider sx={{ my: 1 }} />
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Courses
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={0.5} mt={0.5}>
                        {quiz.course?.slice(0, 2).map((c, idx) => (
                          <Chip 
                            key={idx}
                            label={c}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                        {quiz.course?.length > 2 && (
                          <Chip 
                            label={`+${quiz.course.length - 2}`}
                            size="small"
                          />
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Groups
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={0.5} mt={0.5}>
                        {quiz.group?.slice(0, 2).map((g, idx) => (
                          <Chip 
                            key={idx}
                            label={g}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Grid>
                  </Grid>
                  
                  {/* Additional Quiz Info */}
                  {quiz.avgScore > 0 && (
                    <Box mt={2}>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Performance Metrics
                      </Typography>
                      <Grid container spacing={1} mt={0.5}>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">
                            Avg Score: 
                          </Typography>
                          <Typography variant="caption" fontWeight={600} ml={0.5}>
                            {quiz.avgScore.toFixed(1)}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">
                            Best: 
                          </Typography>
                          <Typography variant="caption" fontWeight={600} color="success.main" ml={0.5}>
                            {quiz.bestScore || 0}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                </Box>
              </Collapse>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>

      <Divider />
      
      <CardActions sx={{ p: 1.5, justifyContent: 'space-between' }}>
        <Button 
          size="small" 
          startIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={onToggle}
        >
          {isExpanded ? 'Less' : 'More'}
        </Button>
        <Box>
          <MuiTooltip title="View Details">
            <IconButton size="small" onClick={() => onViewDetails(quiz)}>
              <VisibilityIcon />
            </IconButton>
          </MuiTooltip>
          <Button 
            size="small" 
            variant="contained"
            onClick={(e) => {
              e.stopPropagation();
              onViewRegistered(quiz._id, e);
            }}
            sx={{ ml: 1, minWidth: 100 }}
          >
            Reg ({quiz.registeredCount})
          </Button>
          <Button 
            size="small" 
            variant="outlined"
            onClick={(e) => {
              e.stopPropagation();
              onViewAttempted(quiz._id, e);
            }}
            sx={{ ml: 1, minWidth: 100 }}
          >
            Att ({quiz.attemptedCount})
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

// Advanced Filter Component
const AdvancedFilterDrawer = ({ 
  open, 
  onClose, 
  filters, 
  onFilterChange,
  courses,
  groups,
  subjects
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApply = () => {
    onFilterChange(localFilters);
    onClose();
  };

  const handleReset = () => {
    setLocalFilters({
      dateRange: { start: null, end: null },
      courses: [],
      groups: [],
      subjects: [],
      minScore: 0,
      maxScore: 100,
      minRegistered: 0,
      minAttempted: 0,
      showBestScoresOnly: false,
      sortBy: 'date_desc'
    });
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: { xs: '100%', sm: 400 }, p: 3 } }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" fontWeight={600}>
          Advanced Filters
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Stack spacing={3}>
        {/* Date Range */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Date Range
          </Typography>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              size="small"
              value={localFilters.dateRange.start || ''}
              onChange={(e) => setLocalFilters({
                ...localFilters,
                dateRange: { ...localFilters.dateRange, start: e.target.value }
              })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="End Date"
              type="date"
              fullWidth
              size="small"
              value={localFilters.dateRange.end || ''}
              onChange={(e) => setLocalFilters({
                ...localFilters,
                dateRange: { ...localFilters.dateRange, end: e.target.value }
              })}
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
        </Box>

        {/* Courses Filter */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Courses
          </Typography>
          <Autocomplete
            multiple
            options={courses}
            value={localFilters.courses}
            onChange={(event, newValue) => {
              setLocalFilters({ ...localFilters, courses: newValue });
            }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Select courses" size="small" />
            )}
            size="small"
          />
        </Box>

        {/* Score Range */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Score Range (%)
          </Typography>
          <Box px={1}>
            <Slider
              value={[localFilters.minScore, localFilters.maxScore]}
              onChange={(event, newValue) => {
                setLocalFilters({ 
                  ...localFilters, 
                  minScore: newValue[0], 
                  maxScore: newValue[1] 
                });
              }}
              valueLabelDisplay="auto"
              min={0}
              max={100}
            />
            <Box display="flex" justifyContent="space-between" mt={1}>
              <Typography variant="caption">
                Min: {localFilters.minScore}%
              </Typography>
              <Typography variant="caption">
                Max: {localFilters.maxScore}%
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Other Filters */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Other Filters
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={localFilters.showBestScoresOnly}
                  onChange={(e) => setLocalFilters({
                    ...localFilters,
                    showBestScoresOnly: e.target.checked
                  })}
                />
              }
              label="Show only quizzes with best scores"
            />
          </FormGroup>
        </Box>

        {/* Sort Options */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Sort By
          </Typography>
          <FormControl fullWidth size="small">
            <Select
              value={localFilters.sortBy}
              onChange={(e) => setLocalFilters({ ...localFilters, sortBy: e.target.value })}
            >
              <MenuItem value="date_desc">Date (Newest First)</MenuItem>
              <MenuItem value="date_asc">Date (Oldest First)</MenuItem>
              <MenuItem value="title_asc">Title (A-Z)</MenuItem>
              <MenuItem value="title_desc">Title (Z-A)</MenuItem>
              <MenuItem value="score_desc">Best Score (High to Low)</MenuItem>
              <MenuItem value="registered_desc">Registered (High to Low)</MenuItem>
              <MenuItem value="attempted_desc">Attempted (High to Low)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Action Buttons */}
        <Box display="flex" gap={2} pt={2}>
          <Button
            variant="outlined"
            onClick={handleReset}
            fullWidth
            startIcon={<FilterAltOffIcon />}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            onClick={handleApply}
            fullWidth
            startIcon={<FilterAltIcon />}
          >
            Apply Filters
          </Button>
        </Box>
      </Stack>
    </Drawer>
  );
};

// Export Menu Component
const ExportMenu = ({ onExport, quizzes }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExport = (format) => {
    onExport(format);
    handleClose();
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<DownloadIcon />}
        onClick={handleClick}
       className="export-btn" >
        Export
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleExport('csv')}>
          <TableChartIcon sx={{ mr: 1 }} /> CSV Format
        </MenuItem>
        <MenuItem onClick={() => handleExport('excel')}>
          <TableChartIcon sx={{ mr: 1 }} /> Excel Format
        </MenuItem>
        <MenuItem onClick={() => handleExport('pdf')}>
          <PictureAsPdfIcon sx={{ mr: 1 }} /> PDF Report
        </MenuItem>
        <MenuItem onClick={() => handleExport('json')}>
          <DatasetIcon sx={{ mr: 1 }} /> JSON Data
        </MenuItem>
      </Menu>
    </>
  );
};

// Main Component
const OwnFacultyQuizzes = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [filter, setFilter] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [viewMode, setViewMode] = useState('cards');
  const [page, setPage] = useState(1);
  const [expandedQuiz, setExpandedQuiz] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [advancedFilters, setAdvancedFilters] = useState({
    dateRange: { start: null, end: null },
    courses: [],
    groups: [],
    subjects: [],
    minScore: 0,
    maxScore: 100,
    minRegistered: 0,
    minAttempted: 0,
    showBestScoresOnly: false,
    sortBy: 'date_desc'
  });
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const navigate = useNavigate();
  const itemsPerPage = 12;

  // Fetch quizzes
  const fetchMyQuizzes = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        ...advancedFilters,
        filter,
        searchQuery: searchQuery || undefined
      };

      const res = await axios.get("http://localhost:5000/api/faculty/my-quizzes", {
        params,
        withCredentials: true
      });
      setData(res.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch quizzes", err);
      setError(err.response?.data?.message || "Failed to load quizzes. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [advancedFilters, filter, searchQuery]);

  useEffect(() => {
    fetchMyQuizzes();
  }, [fetchMyQuizzes]);

  // Memoized computed values
  const {
    courseChartData,
    timeSeriesData,
    performanceData,
    comparisonData,
    allQuizzes,
    filteredQuizzes,
    uniqueCourses,
    stats,
    scoreDistributionData,
    bestScoresData,
    performanceTrendData,
    radarChartData,
    heatmapData
  } = useMemo(() => {
    if (!data) {
      return {
        courseChartData: [],
        timeSeriesData: [],
        performanceData: [],
        comparisonData: [],
        allQuizzes: [],
        filteredQuizzes: [],
        uniqueCourses: ['all'],
        stats: {},
        scoreDistributionData: [],
        bestScoresData: [],
        performanceTrendData: [],
        radarChartData: [],
        heatmapData: []
      };
    }

    const {
      global = {},
      courseWise = {},
      monthlyTrend = [],
      scoreDistribution = [],
      performanceTrend = []
    } = data.stats || {};

    // quizzes arrays come from ROOT, not stats
    const ongoingQuizzes = Array.isArray(data.ongoingQuizzes)
      ? data.ongoingQuizzes
      : [];

    const previousQuizzes = Array.isArray(data.previousQuizzes)
      ? data.previousQuizzes
      : [];

    const allQuizzes = [...ongoingQuizzes, ...previousQuizzes];

    // Filter quizzes
    let filteredQuizzes = allQuizzes;
    if (filter === 'ongoing') filteredQuizzes = ongoingQuizzes;
    if (filter === 'completed') filteredQuizzes = previousQuizzes;
    if (selectedCourse !== 'all') {
      filteredQuizzes = filteredQuizzes.filter(quiz => 
        quiz.course?.includes(selectedCourse)
      );
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredQuizzes = filteredQuizzes.filter(quiz =>
        quiz.title.toLowerCase().includes(query) ||
        quiz.subject.toLowerCase().includes(query) ||
        (quiz.course && quiz.course.some(c => c.toLowerCase().includes(query)))
      );
    }

    // Apply advanced filters
    if (advancedFilters.dateRange.start) {
      const startDate = new Date(advancedFilters.dateRange.start);
      filteredQuizzes = filteredQuizzes.filter(quiz => 
        new Date(quiz.startTime) >= startDate
      );
    }
    if (advancedFilters.dateRange.end) {
      const endDate = new Date(advancedFilters.dateRange.end);
      filteredQuizzes = filteredQuizzes.filter(quiz => 
        new Date(quiz.startTime) <= endDate
      );
    }
    if (advancedFilters.courses.length > 0) {
      filteredQuizzes = filteredQuizzes.filter(quiz =>
        quiz.course && quiz.course.some(c => advancedFilters.courses.includes(c))
      );
    }
    if (advancedFilters.showBestScoresOnly) {
      filteredQuizzes = filteredQuizzes.filter(quiz => quiz.bestScore > 0);
    }
    if (advancedFilters.minRegistered > 0) {
      filteredQuizzes = filteredQuizzes.filter(quiz => 
        quiz.registeredCount >= advancedFilters.minRegistered
      );
    }
    if (advancedFilters.minAttempted > 0) {
      filteredQuizzes = filteredQuizzes.filter(quiz => 
        quiz.attemptedCount >= advancedFilters.minAttempted
      );
    }

    // Apply sorting
    filteredQuizzes.sort((a, b) => {
      switch (advancedFilters.sortBy) {
        case 'date_desc':
          return new Date(b.startTime) - new Date(a.startTime);
        case 'date_asc':
          return new Date(a.startTime) - new Date(b.startTime);
        case 'title_asc':
          return a.title.localeCompare(b.title);
        case 'title_desc':
          return b.title.localeCompare(a.title);
        case 'score_desc':
          return (b.bestScore || 0) - (a.bestScore || 0);
        case 'registered_desc':
          return b.registeredCount - a.registeredCount;
        case 'attempted_desc':
          return b.attemptedCount - a.attemptedCount;
        default:
          return new Date(b.startTime) - new Date(a.startTime);
      }
    });

    // Course distribution data
    const courseChartData = Object.entries(courseWise).map(([course, stats], index) => ({
      name: course,
      value: stats.quizzesCount || 0,
      fill: `hsl(${index * 60}, 70%, 60%)`
    }));

    // Time series data
    const timeSeriesData = monthlyTrend.map(item => ({
      month: item.month,
      quizzes: item.quizzes || 0,
      attempted: item.attempted || 0,
      registered: item.registered || 0,
      avgScore: item.avgScore || 0
    }));

    // Performance data for bar chart
    const performanceData = Object.entries(courseWise).slice(0, 8).map(([course, stats]) => ({
      course: course.length > 10 ? course.substring(0, 10) + '...' : course,
      attemptedRatio: (stats.attemptedRatio || 0) * 100,
      avgMarks: stats.avgMarks || 0,
      avgDuration: stats.avgDuration || 0,
      quizzesCount: stats.quizzesCount || 0,
      bestScore: stats.bestScore || 0
    }));

    // Comparison data
    const comparisonData = Object.entries(courseWise).map(([course, stats]) => ({
      course,
      "Quizzes": stats.quizzesCount || 0,
      "Avg Score": stats.avgScore || 0,
      "Best Score": stats.bestScore || 0,
      "Attempt Rate": (stats.attemptedRatio || 0) * 100,
      "Avg Duration": stats.avgDuration || 0
    }));

    // Score Distribution Data
    const scoreDistributionData = scoreDistribution || allQuizzes
      .filter(quiz => quiz.bestScore > 0)
      .map(quiz => ({
        name: quiz.title.length > 15 ? quiz.title.substring(0, 15) + '...' : quiz.title,
        score: quiz.bestScore,
        total: quiz.totalMarks,
        percentage: Math.round((quiz.bestScore / quiz.totalMarks) * 100)
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 10);

    // Best Scores Data
    const bestScoresData = allQuizzes
      .filter(quiz => quiz.bestScore > 0)
      .sort((a, b) => {
        const aPercentage = a.bestScore / a.totalMarks;
        const bPercentage = b.bestScore / b.totalMarks;
        return bPercentage - aPercentage;
      })
      .slice(0, 8)
      .map(quiz => ({
        quiz: quiz.title,
        score: quiz.bestScore,
        total: quiz.totalMarks,
        percentage: Math.round((quiz.bestScore / quiz.totalMarks) * 100),
        students: quiz.attemptedCount,
        subject: quiz.subject
      }));

    // Performance Trend Data
    const performanceTrendData = performanceTrend || allQuizzes
      .filter(quiz => quiz.avgScore > 0)
      .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
      .map(quiz => ({
        date: new Date(quiz.startTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        avgScore: quiz.avgScore,
        bestScore: quiz.bestScore,
        totalMarks: quiz.totalMarks,
        attempted: quiz.attemptedCount
      }));

    // Radar Chart Data
    const radarChartData = Object.entries(courseWise).slice(0, 5).map(([course, stats]) => ({
      subject: course,
      A: Math.min((stats.attemptedRatio || 0) * 100, 100),
      B: Math.min((stats.avgScore || 0) / 20 * 100, 100), // Assuming max avg score is 20
      C: Math.min((stats.quizzesCount || 0) * 10, 100), // Scale quizzes count
      fullMark: 100
    }));

    // Heatmap Data
    const heatmapData = allQuizzes.slice(0, 15).map(quiz => ({
      quiz: quiz.title.substring(0, 10),
      registered: quiz.registeredCount,
      attempted: quiz.attemptedCount,
      score: quiz.bestScore || 0,
      total: quiz.totalMarks
    }));

    // Unique courses for filter
    const courseSet = new Set(['all']);
    allQuizzes.forEach(quiz => {
      quiz.course?.forEach(c => courseSet.add(c));
    });

    // Unique subjects
    const subjectSet = new Set();
    allQuizzes.forEach(quiz => {
      if (quiz.subject) subjectSet.add(quiz.subject);
    });

    // Unique groups
    const groupSet = new Set();
    allQuizzes.forEach(quiz => {
      quiz.group?.forEach(g => groupSet.add(g));
    });

    return {
      courseChartData,
      timeSeriesData,
      performanceData,
      comparisonData,
      allQuizzes,
      filteredQuizzes,
      uniqueCourses: Array.from(courseSet),
      uniqueSubjects: Array.from(subjectSet),
      uniqueGroups: Array.from(groupSet),
      stats: {
        ...data.stats,
        global
      },
      scoreDistributionData,
      bestScoresData,
      performanceTrendData,
      radarChartData,
      heatmapData
    };
  }, [data, filter, selectedCourse, searchQuery, advancedFilters]);

  // Pagination
  const totalPages = Math.ceil(filteredQuizzes.length / itemsPerPage);
  const paginatedQuizzes = filteredQuizzes.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Handlers
  const handleOpenDialog = (quiz) => {
    setSelectedQuiz(quiz);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedQuiz(null);
  };

  const handleViewRegistered = (quizId, e) => {
    e?.stopPropagation();
    navigate(`/faculty/quiz/${quizId}/registered-students`);
  };

  const handleViewAttempted = (quizId, e) => {
    e?.stopPropagation();
    navigate(`/faculty/quiz/${quizId}/attempted-students`);
  };

  const toggleQuizExpand = (quizId) => {
    setExpandedQuiz(expandedQuiz === quizId ? null : quizId);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setPage(1);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(1);
  };

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleAdvancedFilterChange = (newFilters) => {
    setAdvancedFilters(newFilters);
    setPage(1);
  };

  const handleExport = async (format) => {
    try {
      let exportData;
      
      switch (format) {
        case 'csv':
          exportData = filteredQuizzes.map(quiz => ({
            'Quiz Title': quiz.title,
            'Subject': quiz.subject,
            'Course': quiz.course?.join(', ') || '',
            'Groups': quiz.group?.join(', ') || '',
            'Total Marks': quiz.totalMarks,
            'Best Score': quiz.bestScore || 0,
            'Avg Score': quiz.avgScore || 0,
            'Registered Students': quiz.registeredCount,
            'Attempted Students': quiz.attemptedCount,
            'Not Attempted': quiz.notAttemptedCount,
            'Start Time': new Date(quiz.startTime).toLocaleString(),
            'End Time': new Date(quiz.endTime).toLocaleString(),
            'Status': quiz.status,
            'Duration (min)': quiz.durationMinutes
          }));
          
          const csvContent = [
            Object.keys(exportData[0]).join(','),
            ...exportData.map(row => Object.values(row).map(value => 
              `"${value}"`).join(','))
          ].join('\n');
          
          const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
          saveAs(csvBlob, `quizzes_export_${new Date().toISOString().split('T')[0]}.csv`);
          break;
          
        case 'excel':
          exportData = filteredQuizzes.map(quiz => ({
            'Quiz Title': quiz.title,
            'Subject': quiz.subject,
            'Course': quiz.course?.join(', ') || '',
            'Groups': quiz.group?.join(', ') || '',
            'Total Marks': quiz.totalMarks,
            'Best Score': quiz.bestScore || 0,
            'Avg Score': quiz.avgScore || 0,
            'Registered Students': quiz.registeredCount,
            'Attempted Students': quiz.attemptedCount,
            'Not Attempted': quiz.notAttemptedCount,
            'Start Time': new Date(quiz.startTime).toLocaleString(),
            'End Time': new Date(quiz.endTime).toLocaleString(),
            'Status': quiz.status,
            'Duration (min)': quiz.durationMinutes
          }));
          
          const ws = XLSX.utils.json_to_sheet(exportData);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Quizzes");
          XLSX.writeFile(wb, `quizzes_export_${new Date().toISOString().split('T')[0]}.xlsx`);
          break;
          
        case 'json':
          const jsonBlob = new Blob([JSON.stringify(filteredQuizzes, null, 2)], 
            { type: 'application/json' });
          saveAs(jsonBlob, `quizzes_export_${new Date().toISOString().split('T')[0]}.json`);
          break;
          
        default:
          alert('PDF export would be implemented with a PDF generation library');
      }
      
    } catch (err) {
      console.error('Export failed:', err);
      alert('Export failed. Please try again.');
    }
  };

  const clearAllFilters = () => {
    setFilter('all');
    setSelectedCourse('all');
    setSearchQuery('');
    setAdvancedFilters({
      dateRange: { start: null, end: null },
      courses: [],
      groups: [],
      subjects: [],
      minScore: 0,
      maxScore: 100,
      minRegistered: 0,
      minAttempted: 0,
      showBestScoresOnly: false,
      sortBy: 'date_desc'
    });
    setPage(1);
  };

  // Loading and error states
  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} onRetry={fetchMyQuizzes} />;
  if (!data || stats.totalQuizzes === 0) return <EmptyState />;

  // Chart colors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2} mb={3}>
          <Box>
            {/* <Typography variant="h4" fontWeight="bold" gutterBottom >
              Quiz Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Comprehensive analytics and management for your quizzes
            </Typography> */}

            <Box
  sx={{
    p: 2.5,
    mb: 1,
    borderRadius: "14px",
    background: "linear-gradient(135deg, #f8fafc, #eef2f7)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
  }}
>
  <Typography
  variant="h4"
  gutterBottom
  sx={{
    fontWeight: 900,
    letterSpacing: "0.8px",
    background: "linear-gradient(90deg, #1e3c72, #2a5298)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 2px 6px rgba(0,0,0,0.15)",
  }}
>
  Quiz Dashboard
</Typography>


  <Typography
    variant="body1"
    sx={{
      color: "text.secondary",
      maxWidth: 650,
      lineHeight: 1.6,
    }}
  >
    Comprehensive analytics and management for your quizzes
  </Typography>
</Box>

          </Box>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={fetchMyQuizzes}
           className="export-btn" >
              Refresh
            </Button>
            <ExportMenu onExport={handleExport} quizzes={filteredQuizzes} />
            <Button
              variant="contained"
              startIcon={<QuizIcon />}
           className="export1-btn" >
              Create Quiz
            </Button>
          </Stack>
        </Box>

        {/* Summary Stats */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Quizzes"
              value={stats.totalQuizzes || 0}
              icon={QuizIcon}
              color="#2196f3"
              subtext={`${stats.ongoingQuizzes || 0} ongoing`}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Students"
              value={stats.global?.totalRegisteredStudents || 0}
              icon={PeopleIcon}
              color="#4caf50"
              subtext={`${stats.global?.totalAttemptedStudents || 0} attempted`}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Best Score Avg"
              value={`${stats.global?.avgBestScore?.toFixed(1) || '0.0'}/${stats.global?.avgTotalMarksSet?.toFixed(0) || '0'}`}
              icon={TrendingUpIcon}
              color="#ff9800"
              subtext={`${stats.global?.bestScorePercentage || 0}% performance`}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Top Performer"
              value={stats.global?.topQuizScore || 'N/A'}
              icon={EmojiEventsIcon}
              color="#9c27b0"
              subtext={stats.global?.topQuizName || 'No quiz attempted'}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Search and Filters Bar */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search quizzes by title, subject, or course..."
              value={searchQuery}
              onChange={handleSearch}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={filter}
                label="Status"
                onChange={handleFilterChange}
              >
                <MenuItem value="all">All Quizzes</MenuItem>
                <MenuItem value="ongoing">Ongoing</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Course</InputLabel>
              <Select
                value={selectedCourse}
                label="Course"
                onChange={handleCourseChange}
              >
                {uniqueCourses.map((course) => (
                  <MenuItem key={course} value={course}>
                    {course === 'all' ? 'All Courses' : course}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Stack direction="row" spacing={1}>
              <Button
                variant={viewMode === 'cards' ? 'contained' : 'outlined'}
                size="small"
                startIcon={<ViewModuleIcon />}
                onClick={() => setViewMode('cards')}
                fullWidth
              >
                Cards
              </Button>
              <Button
                variant={viewMode === 'table' ? 'contained' : 'outlined'}
                size="small"
                startIcon={<ViewListIcon />}
                onClick={() => setViewMode('table')}
                fullWidth
              >
                Table
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button
              variant="outlined"
              startIcon={<TuneIcon />}
              onClick={() => setFilterDrawerOpen(true)}
              fullWidth
            >
              Advanced
            </Button>
          </Grid>
          {(filter !== 'all' || selectedCourse !== 'all' || searchQuery || 
            advancedFilters.courses.length > 0 || advancedFilters.dateRange.start) && (
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                <Typography variant="caption" color="text.secondary">
                  Active filters:
                </Typography>
                {filter !== 'all' && (
                  <Chip
                    label={`Status: ${filter}`}
                    size="small"
                    onDelete={() => setFilter('all')}
                  />
                )}
                {selectedCourse !== 'all' && (
                  <Chip
                    label={`Course: ${selectedCourse}`}
                    size="small"
                    onDelete={() => setSelectedCourse('all')}
                  />
                )}
                {searchQuery && (
                  <Chip
                    label={`Search: ${searchQuery}`}
                    size="small"
                    onDelete={() => setSearchQuery('')}
                  />
                )}
                <Button
                  size="small"
                  variant="text"
                  onClick={clearAllFilters}
                  startIcon={<CloseIcon />}
                >
                  Clear All
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </Paper>

      {/* Main Content with Tabs */}
      <Paper sx={{ mb: 4, borderRadius: 2 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              py: 2,
              px: 3,
              fontSize: '0.95rem',
              fontWeight: 500,
              minHeight: 60
            }
          }}
        >
          <Tab icon={<DashboardIcon />} iconPosition="start" label="Overview" />
          <Tab icon={<AnalyticsIcon />} iconPosition="start" label="Analytics" />
          <Tab icon={<LeaderboardIcon />} iconPosition="start" label="Leaderboard" />
          <Tab icon={<CompareArrowsIcon />} iconPosition="start" label="Comparison" />
          <Tab icon={<ViewModuleIcon />} iconPosition="start" label="All Quizzes" />
        </Tabs>

        {/* Tab Panels */}
        <Box sx={{ p: 3 }}>
          {/* Overview Tab */}
          {activeTab === 0 && (
            <Grid container spacing={3}>
              {/* Course Distribution */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, height: '100%', borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    <PieChartIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Course Distribution
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Quizzes created per course
                  </Typography>
                  <Box sx={{ height: 300, mt: 2 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={courseChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {courseChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </Paper>
              </Grid>

              {/* Monthly Trend */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, height: '100%', borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    <TimelineIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Monthly Trend
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Quiz creation and participation over time
                  </Typography>
                  <Box sx={{ height: 300, mt: 2 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={timeSeriesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="quizzes" fill="#8884d8" name="Quizzes" />
                        <Line type="monotone" dataKey="attempted" stroke="#ff7300" name="Attempted" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </Box>
                </Paper>
              </Grid>

              {/* Best Scores Overview */}
              <Grid item xs={12}>
                <Paper sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    <StarIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Top Performing Quizzes (Best Scores)
                  </Typography>
                  <Box sx={{ height: 300, mt: 2 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={bestScoresData.slice(0, 8)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="quiz" angle={-45} textAnchor="end" height={80} />
                        <YAxis />
                        <Tooltip 
                          formatter={(value, name) => {
                            if (name === 'score') return [`${value} points`, 'Score'];
                            if (name === 'percentage') return [`${value}%`, 'Percentage'];
                            return [value, name];
                          }}
                        />
                        <Legend />
                        <Bar dataKey="percentage" fill="#4caf50" name="Score %" />
                        <Bar dataKey="students" fill="#2196f3" name="Students Attempted" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          )}

          {/* Analytics Tab */}
          {activeTab === 1 && (
            <Grid container spacing={3}>
              {/* Performance by Course */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, height: '100%', borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    <BarChartIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Performance by Course
                  </Typography>
                  <Box sx={{ height: 400, mt: 2 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="course" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="attemptedRatio" fill="#0088FE" name="Attempt Ratio %" />
                        <Bar dataKey="bestScore" fill="#FF8042" name="Best Score" />
                        <Bar dataKey="avgMarks" fill="#00C49F" name="Avg Marks" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </Paper>
              </Grid>

              {/* Score Distribution */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, height: '100%', borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    <ScoreIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Score Distribution
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Best scores across all quizzes
                  </Typography>
                  <Box sx={{ height: 400, mt: 2 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={scoreDistributionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip 
                          formatter={(value, name) => {
                            if (name === 'score') return [`${value} points`, 'Best Score'];
                            if (name === 'percentage') return [`${value}%`, 'Percentage'];
                            return [value, name];
                          }}
                        />
                        <Legend />
                        <Bar yAxisId="left" dataKey="score" fill="#8884d8" name="Best Score" />
                        <Line yAxisId="right" type="monotone" dataKey="percentage" stroke="#ff7300" name="Score %" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </Box>
                </Paper>
              </Grid>

              {/* Radar Chart - Multi-dimensional Analysis */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, height: '100%', borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    <PsychologyIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Course Performance Radar
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Multi-dimensional analysis of top courses
                  </Typography>
                  <Box sx={{ height: 400, mt: 2 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarChartData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar name="Attempt Rate" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        <Radar name="Avg Score" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                        <Tooltip />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </Box>
                </Paper>
              </Grid>

              {/* Performance Trend */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, height: '100%', borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    <TrendingUpIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Performance Trend Over Time
                  </Typography>
                  <Box sx={{ height: 400, mt: 2 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="avgScore" stroke="#8884d8" name="Average Score" strokeWidth={2} />
                        <Line type="monotone" dataKey="bestScore" stroke="#ff7300" name="Best Score" strokeWidth={2} />
                        <Line type="monotone" dataKey="totalMarks" stroke="#82ca9d" name="Total Marks" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          )}

          {/* Leaderboard Tab */}
          {activeTab === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    <EmojiEventsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Quiz Leaderboard - Best Scores
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Top performing quizzes based on best scores achieved by students
                  </Typography>
                  
                  <TableContainer sx={{ mt: 3 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Rank</TableCell>
                          <TableCell>Quiz Title</TableCell>
                          <TableCell align="center">Subject</TableCell>
                          <TableCell align="center">Best Score</TableCell>
                          <TableCell align="center">Total Marks</TableCell>
                          <TableCell align="center">Percentage</TableCell>
                          <TableCell align="center">Students Attempted</TableCell>
                          <TableCell align="center">Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {bestScoresData.map((quiz, index) => (
                          <TableRow 
                            key={index} 
                            hover 
                            sx={{ 
                              '&:nth-of-type(odd)': { backgroundColor: 'action.hover' },
                              '&:first-child': { 
                                backgroundColor: '#fffde7',
                                borderLeft: '4px solid #ffd600'
                              }
                            }}
                          >
                            <TableCell>
                              <Box display="flex" alignItems="center" gap={1}>
                                {index === 0 && <StarIcon sx={{ color: '#ffd600' }} />}
                                <Typography fontWeight={index < 3 ? 600 : 400}>
                                  #{index + 1}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" fontWeight={500}>
                                {quiz.quiz}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {quiz.subject}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Chip label={quiz.subject} size="small" />
                            </TableCell>
                            <TableCell align="center">
                              <Typography variant="h6" fontWeight={600} color="success.main">
                                {quiz.score}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography variant="body2">
                                {quiz.total}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Box display="flex" flexDirection="column" alignItems="center">
                                <LinearProgress 
                                  variant="determinate" 
                                  value={quiz.percentage} 
                                  sx={{ 
                                    width: 60, 
                                    height: 8, 
                                    borderRadius: 4,
                                    mb: 0.5,
                                    '& .MuiLinearProgress-bar': {
                                      background: quiz.percentage >= 80 ? 'linear-gradient(90deg, #4caf50, #2e7d32)' :
                                                 quiz.percentage >= 60 ? 'linear-gradient(90deg, #ffd740, #ff9800)' :
                                                 'linear-gradient(90deg, #ef5350, #c62828)'
                                    }
                                  }}
                                />
                                <Typography variant="body2" fontWeight={600}>
                                  {quiz.percentage}%
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell align="center">
                              <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                                <PeopleIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                                <Typography variant="body2">
                                  {quiz.students}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell align="center">
                              <Chip 
                                label="COMPLETED" 
                                size="small" 
                                color="default"
                                sx={{ 
                                  backgroundColor: '#e0e0e0',
                                  color: '#424242'
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
            </Grid>
          )}

          {/* Comparison Tab */}
          {activeTab === 3 && (
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                <CompareArrowsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Course Comparison
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Course</TableCell>
                      <TableCell align="right">Quizzes</TableCell>
                      <TableCell align="right">Best Score</TableCell>
                      <TableCell align="right">Avg Score</TableCell>
                      <TableCell align="right">Attempt Rate</TableCell>
                      <TableCell align="right">Avg Duration</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {comparisonData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Typography variant="body2" fontWeight={500}>
                            {row.course}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">{row.Quizzes}</TableCell>
                        <TableCell align="right">
                          <Box display="flex" alignItems="center" justifyContent="flex-end" gap={1}>
                            {row["Best Score"] > 0 && <StarIcon sx={{ fontSize: 16, color: '#ffd600' }} />}
                            <Typography variant="body2" fontWeight={600}>
                              {row["Best Score"] || 'N/A'}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">{row["Avg Score"].toFixed(1)}</TableCell>
                        <TableCell align="right">
                          <Box display="flex" alignItems="center" justifyContent="flex-end" gap={1}>
                            <LinearProgress 
                              variant="determinate" 
                              value={row["Attempt Rate"]} 
                              sx={{ width: 60, height: 6, borderRadius: 3 }}
                            />
                            <Typography variant="body2">
                              {row["Attempt Rate"].toFixed(1)}%
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">{row["Avg Duration"].toFixed(0)}m</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}

          {/* All Quizzes Tab */}
          {activeTab === 4 && (
            <>
              {/* Quiz Display */}
              {viewMode === 'cards' ? (
                <Grid container spacing={3}>
                  {paginatedQuizzes.map((quiz) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={quiz._id}>
                      <QuizCard
                        quiz={quiz}
                        onViewDetails={handleOpenDialog}
                        onViewRegistered={handleViewRegistered}
                        onViewAttempted={handleViewAttempted}
                        isExpanded={expandedQuiz === quiz._id}
                        onToggle={() => toggleQuizExpand(quiz._id)}
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Paper sx={{ borderRadius: 2 }}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Quiz Title</TableCell>
                          <TableCell>Course</TableCell>
                          <TableCell>Best Score</TableCell>
                          <TableCell>Registered</TableCell>
                          <TableCell>Attempted</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {paginatedQuizzes.map((quiz) => (
                          <TableRow key={quiz._id} hover>
                            <TableCell>
                              <Typography variant="body2" fontWeight={500}>
                                {quiz.title}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {quiz.subject} • {quiz.durationMinutes}m • {quiz.totalMarks} marks
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Box display="flex" flexWrap="wrap" gap={0.5}>
                                {quiz.course?.slice(0, 2).map((c, idx) => (
                                  <Chip key={idx} label={c} size="small" />
                                ))}
                              </Box>
                            </TableCell>
                            <TableCell>
                              {quiz.bestScore > 0 ? (
                                <Box textAlign="center">
                                  <Typography variant="body2" fontWeight={600} color="success.main">
                                    {quiz.bestScore}/{quiz.totalMarks}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {Math.round((quiz.bestScore / quiz.totalMarks) * 100)}%
                                  </Typography>
                                </Box>
                              ) : (
                                <Typography variant="caption" color="text.secondary">
                                  No attempts
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell>
                              <Box textAlign="center">
                                <Typography variant="body2" fontWeight={500}>
                                  {quiz.registeredCount}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box textAlign="center">
                                <Typography variant="body2" fontWeight={500} color="success.main">
                                  {quiz.attemptedCount}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {quiz.registeredCount > 0 
                                    ? `${((quiz.attemptedCount / quiz.registeredCount) * 100).toFixed(1)}%`
                                    : '0%'
                                  }
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={quiz.status}
                                size="small"
                                color={quiz.status === 'ONGOING' ? 'success' : 'default'}
                              />
                            </TableCell>
                            <TableCell>
                              <Stack direction="row" spacing={1}>
                                <IconButton size="small" onClick={() => handleOpenDialog(quiz)}>
                                  <VisibilityIcon />
                                </IconButton>
                                <Button
                                  size="small"
                                  variant="contained"
                                  onClick={(e) => handleViewRegistered(quiz._id, e)}
                                >
                                  Reg ({quiz.registeredCount})
                                </Button>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  onClick={(e) => handleViewAttempted(quiz._id, e)}
                                >
                                  Att ({quiz.attemptedCount})
                                </Button>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <Box display="flex" justifyContent="center" alignItems="center" mt={4} gap={3}>
                  <Typography variant="body2" color="text.secondary">
                    Showing {(page - 1) * itemsPerPage + 1} - {Math.min(page * itemsPerPage, filteredQuizzes.length)} of {filteredQuizzes.length} quizzes
                  </Typography>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </Paper>

      {/* Quiz Detail Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedQuiz && (
          <>
            <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider', pb: 2 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h5" fontWeight={600}>
                  {selectedQuiz.title}
                </Typography>
                <Stack direction="row" spacing={1}>
                  {selectedQuiz.bestScore > 0 && (
                    <Chip
                      icon={<StarIcon />}
                      label={`Best: ${selectedQuiz.bestScore}/${selectedQuiz.totalMarks}`}
                      color="warning"
                      size="small"
                    />
                  )}
                  <Chip
                    label={selectedQuiz.status}
                    color={selectedQuiz.status === 'ONGOING' ? 'success' : 'default'}
                  />
                </Stack>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {selectedQuiz.subject} • {selectedQuiz.department}
              </Typography>
            </DialogTitle>
            
            <DialogContent dividers sx={{ py: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Quiz Information
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <AssignmentIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Total Marks" 
                        secondary={selectedQuiz.totalMarks} 
                      />
                    </ListItem>
                    {selectedQuiz.bestScore > 0 && (
                      <ListItem>
                        <ListItemIcon>
                          <StarIcon />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Best Score Achieved" 
                          secondary={
                            <Box>
                              <Typography variant="body2">
                                {selectedQuiz.bestScore} / {selectedQuiz.totalMarks} 
                                <Typography component="span" color="success.main" ml={1}>
                                  ({Math.round((selectedQuiz.bestScore / selectedQuiz.totalMarks) * 100)}%)
                                </Typography>
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Highest score by any student
                              </Typography>
                            </Box>
                          } 
                        />
                      </ListItem>
                    )}
                    {selectedQuiz.avgScore > 0 && (
                      <ListItem>
                        <ListItemIcon>
                          <TrendingUpIcon />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Average Score" 
                          secondary={`${selectedQuiz.avgScore.toFixed(1)} / ${selectedQuiz.totalMarks}`} 
                        />
                      </ListItem>
                    )}
                    <ListItem>
                      <ListItemIcon>
                        <AccessTimeIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Duration" 
                        secondary={`${selectedQuiz.durationMinutes} minutes`} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CalendarTodayIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Start Time" 
                        secondary={new Date(selectedQuiz.startTime).toLocaleString()} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CalendarTodayIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="End Time" 
                        secondary={new Date(selectedQuiz.endTime).toLocaleString()} 
                      />
                    </ListItem>
                  </List>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Target Audience
                  </Typography>
                  <Box mb={2}>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      Courses
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {selectedQuiz.course?.map((c, idx) => (
                        <Chip key={idx} label={c} size="small" />
                      ))}
                    </Stack>
                  </Box>
                  <Box mb={2}>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      Groups
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {selectedQuiz.group?.map((g, idx) => (
                        <Chip key={idx} label={g} size="small" variant="outlined" />
                      ))}
                    </Stack>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Student Statistics
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                        <PeopleIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                        <Typography variant="h4" color="primary.main" fontWeight={600}>
                          {selectedQuiz.registeredCount}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Registered
                        </Typography>
                      </Card>
                    </Grid>
                    <Grid item xs={4}>
                      <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                        <CheckCircleIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                        <Typography variant="h4" color="success.main" fontWeight={600}>
                          {selectedQuiz.attemptedCount}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Attempted
                        </Typography>
                        {selectedQuiz.registeredCount > 0 && (
                          <Typography variant="caption" color="text.secondary">
                            {Math.round((selectedQuiz.attemptedCount / selectedQuiz.registeredCount) * 100)}% of registered
                          </Typography>
                        )}
                      </Card>
                    </Grid>
                    <Grid item xs={4}>
                      <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                        <ErrorIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                        <Typography variant="h4" color="warning.main" fontWeight={600}>
                          {selectedQuiz.notAttemptedCount}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Not Attempted
                        </Typography>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2, borderTop: 1, borderColor: 'divider' }}>
              <Button onClick={handleCloseDialog}>
                Close
              </Button>
              <Button 
                variant="contained" 
                startIcon={<PeopleIcon />}
                onClick={() => handleViewRegistered(selectedQuiz._id, { stopPropagation: () => {} })}
              >
                View Registered ({selectedQuiz.registeredCount})
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<CheckCircleIcon />}
                onClick={() => handleViewAttempted(selectedQuiz._id, { stopPropagation: () => {} })}
              >
                View Attempted ({selectedQuiz.attemptedCount})
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Advanced Filter Drawer */}
      <AdvancedFilterDrawer
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        filters={advancedFilters}
        onFilterChange={handleAdvancedFilterChange}
        courses={uniqueCourses.filter(c => c !== 'all')}
        groups={[]}
        subjects={[]}
      />
    </Container>
  );
};

export default OwnFacultyQuizzes;