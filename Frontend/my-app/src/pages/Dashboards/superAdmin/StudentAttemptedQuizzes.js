// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./StudentAttemptQuizzes.css";
// import {
//   FaArrowLeft,
//   FaUserGraduate,
//   FaEnvelope,
//   FaIdBadge,
//   FaBook,
//   FaChartBar,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaClock,
//   FaCalendarAlt,
//   FaTrophy,
//   FaPercentage,
//   FaBrain,
//   FaChartLine
// } from "react-icons/fa";

// const StudentAttemptedQuizzes = () => {
//   const { studentId } = useParams();
//   const navigate = useNavigate();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [timeRange, setTimeRange] = useState("all"); // Filter for time range

//   useEffect(() => {
//     fetchStudentAttempts();
//   }, []);

//   const fetchStudentAttempts = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await axios.get(
//         `http://localhost:5000/api/superadmin/attempted-quizzes/student/${studentId}`,
//         { withCredentials: true }
//       );
//       setData(res.data);
//     } catch (err) {
//       setError("Failed to load student data. Please try again.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const calculateSuccessRate = (attempt) => {
//     if (!attempt.quizId?.totalMarks || !attempt.quizId.totalQuestions) return 0;
//     return Math.round((attempt.scoredMarks / attempt.quizId.totalMarks) * 100);
//   };

//   const getPerformanceColor = (percentage) => {
//     if (percentage >= 80) return "var(--success)";
//     if (percentage >= 60) return "var(--warning)";
//     return "var(--danger)";
//   };

//   const getTimeTakenColor = (time) => {
//     if (time < 300) return "var(--success)"; // Under 5 minutes
//     if (time < 600) return "var(--warning)"; // 5-10 minutes
//     return "var(--danger)"; // Over 10 minutes
//   };

//   const formatTimeTaken = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}m ${secs}s`;
//   };

//   const getPerformanceLevel = (percentage) => {
//     if (percentage >= 90) return "Excellent";
//     if (percentage >= 75) return "Good";
//     if (percentage >= 60) return "Average";
//     if (percentage >= 40) return "Below Average";
//     return "Needs Improvement";
//   };

//   const calculateAverageScore = () => {
//     if (!data?.attempts?.length) return 0;
//     const total = data.attempts.reduce((sum, attempt) => {
//       return sum + (attempt.scoredMarks / attempt.quizId?.totalMarks * 100);
//     }, 0);
//     return Math.round(total / data.attempts.length);
//   };

//   const filterAttemptsByTime = () => {
//     if (!data?.attempts) return [];
//     if (timeRange === "all") return data.attempts;
    
//     const now = new Date();
//     const filtered = data.attempts.filter(attempt => {
//       const attemptDate = new Date(attempt.attemptedAt);
//       const diffDays = Math.floor((now - attemptDate) / (1000 * 60 * 60 * 24));
      
//       switch(timeRange) {
//         case "week": return diffDays <= 7;
//         case "month": return diffDays <= 30;
//         case "quarter": return diffDays <= 90;
//         default: return true;
//       }
//     });
    

    
//     return filtered;
//   };

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="spinner"></div>
//         <p>Loading student details...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="error-container">
//         <div className="error-message">
//           <FaTimesCircle className="error-icon" />
//           <h3>Oops! Something went wrong</h3>
//           <p>{error}</p>
//           <button className="back-btn" onClick={() => navigate(-1)}>
//             <FaArrowLeft /> Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!data || !data.student) {
//     return (
//       <div className="no-data-container">
//         <h3>No data found</h3>
//         <p>The student record doesn't exist or has been removed.</p>
//         <button className="back-btn" onClick={() => navigate(-1)}>
//           <FaArrowLeft /> Go Back
//         </button>
//       </div>
//     );
//   }


  
//   const { student, attempts, totalQuizzesAttempted, department } = data;
//   const filteredAttempts = filterAttemptsByTime();
//   const averageScore = calculateAverageScore();

//   return (
//     <div className="student-attempts-container">
//       {/* Header */}
//       <header className="dashboard-header">
//         <div className="header-content">
//           <button className="back-button" onClick={() => navigate(-1)}>
//             <FaArrowLeft /> Back
//           </button>
//           <h1 className="dashboard-title">
//             <FaChartBar /> Student Performance Dashboard
//           </h1>
//         </div>
//       </header>

//       {/* Student Profile Card */}
//       <div className="profile-section">
//         <div className="profile-card">
//           <div className="profile-header">
//             <div className="profile-avatar">
//               <FaUserGraduate />
//             </div>
//             <div className="profile-info">
//               <h2 className="student-name">{student.name}</h2>
//               <p className="student-enrollment">
//                 <FaIdBadge /> {student.enrollmentNumber}
//               </p>
//             </div>
//             <div className="performance-badge" style={{ 
//               backgroundColor: getPerformanceColor(averageScore) 
//             }}>
//               <FaTrophy />
//               <span>{averageScore}% Avg</span>
//             </div>
//           </div>
          
//           <div className="profile-details">
//             <div className="detail-item">
//               <FaEnvelope className="detail-icon" />
//               <div>
//                 <span className="detail-label">Email</span>
//                 <span className="detail-value">{student.email}</span>
//               </div>
//             </div>
            
//             <div className="detail-item">
//               <FaBook className="detail-icon" />
//               <div>
//                 <span className="detail-label">Department</span>
//                 <span className="detail-value">{department}</span>
//               </div>
//             </div>
            
//             <div className="detail-item">
//               <FaChartLine className="detail-icon" />
//               <div>
//                 <span className="detail-label">Quizzes Attempted</span>
//                 <span className="detail-value highlight">{totalQuizzesAttempted}</span>
//               </div>
//             </div>
            
//             <div className="detail-item">
//               <FaBrain className="detail-icon" />
//               <div>
//                 <span className="detail-label">Performance Level</span>
//                 <span className="detail-value">{getPerformanceLevel(averageScore)}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="stats-grid">
//           <div className="stat-card">
//             <div className="stat-header">
//               <FaPercentage className="stat-icon" />
//               <span className="stat-label">Average Score</span>
//             </div>
//             <div className="stat-value" style={{ color: getPerformanceColor(averageScore) }}>
//               {averageScore}%
//             </div>
//             <div className="stat-trend">Overall Performance</div>
//           </div>
          
//           <div className="stat-card">
//             <div className="stat-header">
//               <FaCheckCircle className="stat-icon" />
//               <span className="stat-label">Total Correct</span>
//             </div>
//             <div className="stat-value">
//               {filteredAttempts.reduce((sum, a) => sum + a.correctCount, 0)}
//             </div>
//             <div className="stat-trend">Questions Answered Right</div>
//           </div>
          
//           <div className="stat-card">
//             <div className="stat-header">
//               <FaClock className="stat-icon" />
//               <span className="stat-label">Avg Time/Quiz</span>
//             </div>
//             <div className="stat-value">
//               {filteredAttempts.length > 0 
//                 ? formatTimeTaken(Math.round(filteredAttempts.reduce((sum, a) => sum + a.timeTaken, 0) / filteredAttempts.length))
//                 : "0m 0s"
//               }
//             </div>
//             <div className="stat-trend">Time Management</div>
//           </div>
          
//           <div className="stat-card">
//             <div className="stat-header">
//               <FaCalendarAlt className="stat-icon" />
//               <span className="stat-label">Completion Rate</span>
//             </div>
//             <div className="stat-value">
//               {filteredAttempts.length > 0 ? "100%" : "0%"}
//             </div>
//             <div className="stat-trend">All quizzes completed</div>
//           </div>
//         </div>
//       </div>


//       {/* Filters */}
//       <div className="filters-section">
//         <div className="filter-group">
//           <label>Time Range:</label>
//           <div className="filter-buttons">
//             {["all", "week", "month", "quarter"].map(range => (
//               <button
//                 key={range}
//                 className={`filter-btn ${timeRange === range ? 'active' : ''}`}
//                 onClick={() => setTimeRange(range)}
//               >
//                 {range.charAt(0).toUpperCase() + range.slice(1)}
//               </button>
//             ))}
//           </div>
//         </div>
//         <div className="results-count">
//           Showing {filteredAttempts.length} of {attempts.length} attempts
//         </div>
//       </div>

//       {/* Attempts Table */}
//       <div className="attempts-section">
//         <h3 className="section-title">
//           <FaChartBar /> Quiz Attempts History
//         </h3>
        
//         {filteredAttempts.length === 0 ? (
//           <div className="no-attempts">
//             <p>No quiz attempts found for the selected time period.</p>
//           </div>
//         ) : (
//           <div className="table-container">
//             <table className="attempts-table">
//               <thead>
//                 <tr>
//                   <th>Quiz Title</th>
//                   <th>Subject</th>
//                   <th>Score</th>
//                   <th>Correct/Wrong</th>
//                   <th>Success Rate</th>
//                   <th>Time Taken</th>
//                   <th>Attempted At</th>
//                   <th>Performance</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredAttempts.map((attempt) => {
//                   const successRate = calculateSuccessRate(attempt);
//                   return (
//                     <tr key={attempt._id}>
//                       <td className="quiz-title">
//                         <strong>{attempt.quizId?.title || "N/A"}</strong>
//                       </td>
//                       <td className="quiz-subject">
//                         {attempt.quizId?.subject || "N/A"}
//                       </td>
//                       <td className="score-cell">
//                         <span className="score-value">
//                           {attempt.scoredMarks} / {attempt.quizId?.totalMarks || "N/A"}
//                         </span>
//                       </td>
//                       <td className="answer-stats">
//                         <div className="correct-count">
//                           <FaCheckCircle /> {attempt.correctCount}
//                         </div>
//                         <div className="wrong-count">
//                           <FaTimesCircle /> {attempt.wrongCount}
//                         </div>
//                       </td>
//                       <td>
//                         <div className="progress-container">
//                           <div 
//                             className="progress-bar" 
//                             style={{ 
//                               width: `${successRate}%`,
//                               backgroundColor: getPerformanceColor(successRate)
//                             }}
//                           ></div>
//                           <span className="progress-text">{successRate}%</span>
//                         </div>
//                       </td>
//                       <td style={{ color: getTimeTakenColor(attempt.timeTaken) }}>
//                         {formatTimeTaken(attempt.timeTaken)}
//                       </td>
//                       <td>
//                         <div className="attempt-time">
//                           <FaCalendarAlt />
//                           {new Date(attempt.attemptedAt).toLocaleDateString()}
//                           <br />
//                           <small>{new Date(attempt.attemptedAt).toLocaleTimeString()}</small>
//                         </div>
//                       </td>
//                       <td>
//                         <span 
//                           className="performance-badge-small"
//                           style={{ backgroundColor: getPerformanceColor(successRate) }}
//                         >
//                           {getPerformanceLevel(successRate)}
//                         </span>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Summary */}
//       <div className="summary-section">
//         <div className="summary-card">
//           <h4>Performance Summary</h4>
//           <div className="summary-grid">
//             <div className="summary-item">
//               <span className="summary-label">Best Score</span>
//               <span className="summary-value">
//                 {filteredAttempts.length > 0
//                   ? Math.max(...filteredAttempts.map(a => calculateSuccessRate(a))) + "%"
//                   : "N/A"
//                 }
//               </span>
//             </div>
//             <div className="summary-item">
//               <span className="summary-label">Total Time Spent</span>
//               <span className="summary-value">
//                 {formatTimeTaken(filteredAttempts.reduce((sum, a) => sum + a.timeTaken, 0))}
//               </span>
//             </div>
//             <div className="summary-item">
//               <span className="summary-label">Total Questions</span>
//               <span className="summary-value">
//                 {filteredAttempts.reduce((sum, a) => sum + a.correctCount + a.wrongCount, 0)}
//               </span>
//             </div>
//             <div className="summary-item">
//               <span className="summary-label">Accuracy</span>
//               <span className="summary-value">
//                 {filteredAttempts.length > 0
//                   ? Math.round(
//                       (filteredAttempts.reduce((sum, a) => sum + a.correctCount, 0) /
//                       filteredAttempts.reduce((sum, a) => sum + a.correctCount + a.wrongCount, 0)) * 100
//                     ) + "%"
//                   : "0%"
//                 }
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer Actions */}
//       <div className="footer-actions">
//         <button className="export-btn" onClick={() => window.print()}>
//           Export Report
//         </button>
//         <button className="refresh-btn" onClick={fetchStudentAttempts}>
//           Refresh Data
//         </button>
//         <button className="dashboard-btn" onClick={() => navigate("/dashboard")}>
//           Go to Dashboard
//         </button>
//       </div>
//     </div>
//   );
// };

// export default StudentAttemptedQuizzes;


import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, RadialLinearScale } from 'chart.js';
import { Bar, Pie, Line, Radar } from 'react-chartjs-2';
import './StudentAttemptQuizzes.css';

// Bootstrap imports - ALL AT TOP
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Badge from 'react-bootstrap/Badge';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Pagination from 'react-bootstrap/Pagination';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Nav from 'react-bootstrap/Nav';

// Import Icons
import {
  FaArrowLeft,
  FaUserGraduate,
  FaEnvelope,
  FaIdBadge,
  FaBook,
  FaChartBar,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaCalendarAlt,
  FaTrophy,
  FaPercentage,
  FaBrain,

  // 📈 Charts / Trends
  FaChartLine,
  FaChartPie,
  FaRegChartBar,

  FaFilter,
  FaDownload,
  FaFileExcel,
  FaFileCsv,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaPrint,
  FaSync,
  FaHome,
  FaExclamationTriangle,
  FaInfoCircle,
  FaUniversity,
  FaGraduationCap,
  FaAward,
  FaMedal,
  FaStar,
  FaCrown,
  FaHistory,
  FaListOl,

  // 🔼 Growth / Increase
  FaArrowUp,
  FaCaretUp,
  FaLongArrowUp,

  // 🔽 Decrease
  FaArrowDown,
  FaCaretDown,

  FaEye,
  FaCalendar,
  FaUserTie,
  FaDatabase,
  FaCogs,
  FaClipboardList,
  FaQuestionCircle,
  FaBookOpen,
  FaUsers,
  FaBolt,
  FaCaretRight,

  // ✅ Aliases (THIS is the key fix)
  FaChartLine as FaTrendingUp,
  FaArrowDown as FaTrendingDown

} from "react-icons/fa";


// Register ChartJS components
ChartJS.register(
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, 
  ArcElement, PointElement, LineElement, RadialLinearScale
);

const StudentAttemptedQuizzes = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  
  // State Management
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "attemptedAt", direction: "desc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [exporting, setExporting] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [selectedAttempt, setSelectedAttempt] = useState(null);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [departmentStats, setDepartmentStats] = useState(null);
  const [performanceTrend, setPerformanceTrend] = useState([]);
  
  const itemsPerPage = 15;

  useEffect(() => {
    fetchStudentAttempts();
    fetchDepartmentStats();
  }, []);

  const fetchStudentAttempts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(
        `http://localhost:5000/api/superadmin/attempted-quizzes/student/${studentId}`,
        { withCredentials: true }
      );
      setData(res.data);
      calculatePerformanceTrend(res.data.attempts || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load student performance data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartmentStats = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/superadmin/department-stats`,
        { withCredentials: true }
      );
      setDepartmentStats(res.data);
    } catch (err) {
      console.error("Failed to fetch department stats:", err);
    }
  };

  const calculatePerformanceTrend = (attempts) => {
    if (!attempts.length) return;
    
    const sortedAttempts = [...attempts].sort((a, b) => 
      new Date(a.attemptedAt) - new Date(b.attemptedAt)
    );
    
    const trend = sortedAttempts.map((attempt, index) => {
      const successRate = calculateSuccessRate(attempt);
      return {
        attempt: index + 1,
        score: successRate,
        date: new Date(attempt.attemptedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        quizTitle: attempt.quizId?.title || `Quiz ${index + 1}`
      };
    });
    
    setPerformanceTrend(trend);
  };

  // Utility Functions
  const calculateSuccessRate = (attempt) => {
    if (!attempt.quizId?.totalMarks || attempt.quizId.totalMarks === 0) return 0;
    return Math.round((attempt.scoredMarks / attempt.quizId.totalMarks) * 100);
  };

  const getPerformanceColor = (percentage) => {
    if (percentage >= 90) return "success";
    if (percentage >= 80) return "info";
    if (percentage >= 70) return "warning";
    return "danger";
  };

  const getPerformanceBadge = (percentage) => {
    if (percentage >= 90) return <Badge bg="success">Excellent</Badge>;
    if (percentage >= 80) return <Badge bg="info">Very Good</Badge>;
    if (percentage >= 70) return <Badge bg="warning">Good</Badge>;
    if (percentage >= 60) return <Badge bg="secondary">Average</Badge>;
    return <Badge bg="danger">Needs Improvement</Badge>;
  };

  const getPerformanceLevel = (percentage) => {
    if (percentage >= 90) return { level: "Distinction", icon: <FaCrown /> };
    if (percentage >= 80) return { level: "Excellent", icon: <FaAward /> };
    if (percentage >= 70) return { level: "Good", icon: <FaStar /> };
    if (percentage >= 60) return { level: "Satisfactory", icon: <FaCheckCircle /> };
    return { level: "Needs Attention", icon: <FaExclamationTriangle /> };
  };

  const formatTimeTaken = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  // Data Processing
  const filteredAttempts = useMemo(() => {
    if (!data?.attempts) return [];
    
    let attempts = [...data.attempts];
    
    // Time filter
    if (timeRange !== "all") {
      const now = new Date();
      attempts = attempts.filter(attempt => {
        const attemptDate = new Date(attempt.attemptedAt);
        const diffDays = Math.floor((now - attemptDate) / (1000 * 60 * 60 * 24));
        
        switch(timeRange) {
          case "week": return diffDays <= 7;
          case "month": return diffDays <= 30;
          case "quarter": return diffDays <= 90;
          default: return true;
        }
      });
    }
    
    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      attempts = attempts.filter(attempt => 
        attempt.quizId?.title?.toLowerCase().includes(term) ||
        attempt.quizId?.subject?.toLowerCase().includes(term) ||
        attempt.quizId?.department?.toLowerCase().includes(term)
      );
    }
    
    // Sorting
    if (sortConfig.key) {
      attempts.sort((a, b) => {
        let aValue, bValue;
        
        switch(sortConfig.key) {
          case 'quizTitle':
            aValue = a.quizId?.title || '';
            bValue = b.quizId?.title || '';
            break;
          case 'score':
            aValue = calculateSuccessRate(a);
            bValue = calculateSuccessRate(b);
            break;
          case 'timeTaken':
            aValue = a.timeTaken;
            bValue = b.timeTaken;
            break;
          default:
            aValue = new Date(a.attemptedAt);
            bValue = new Date(b.attemptedAt);
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    return attempts;
  }, [data, timeRange, searchTerm, sortConfig]);

  const paginatedAttempts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAttempts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAttempts, currentPage]);

  const totalPages = Math.ceil(filteredAttempts.length / itemsPerPage);

  // Calculate Statistics
  const stats = useMemo(() => {
    if (!filteredAttempts.length) {
      return {
        averageScore: 0,
        totalCorrect: 0,
        totalWrong: 0,
        totalQuestions: 0,
        totalTime: 0,
        accuracy: 0,
        bestScore: 0,
        worstScore: 0,
        completionRate: 100,
        avgTimePerQuestion: 0,
        consistencyScore: 0
      };
    }

    const totalCorrect = filteredAttempts.reduce((sum, a) => sum + a.correctCount, 0);
    const totalWrong = filteredAttempts.reduce((sum, a) => sum + a.wrongCount, 0);
    const totalQuestions = totalCorrect + totalWrong;
    const totalTime = filteredAttempts.reduce((sum, a) => sum + a.timeTaken, 0);
    const scores = filteredAttempts.map(a => calculateSuccessRate(a));
    const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    
    // Calculate consistency (standard deviation inverse)
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - avgScore, 2), 0) / scores.length;
    const consistencyScore = Math.max(0, 100 - Math.sqrt(variance));
    
    return {
      averageScore: Math.round(avgScore),
      totalCorrect,
      totalWrong,
      totalQuestions,
      totalTime,
      accuracy: totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0,
      bestScore: Math.max(...scores),
      worstScore: Math.min(...scores),
      completionRate: 100, // Assuming all attempts are completed
      avgTimePerQuestion: totalQuestions > 0 ? Math.round(totalTime / totalQuestions) : 0,
      consistencyScore: Math.round(consistencyScore)
    };
  }, [filteredAttempts]);

  // Chart Data
  const scoreDistributionData = useMemo(() => {
    const distribution = {
      '90-100': 0,
      '80-89': 0,
      '70-79': 0,
      '60-69': 0,
      '0-59': 0
    };

    filteredAttempts.forEach(attempt => {
      const score = calculateSuccessRate(attempt);
      if (score >= 90) distribution['90-100']++;
      else if (score >= 80) distribution['80-89']++;
      else if (score >= 70) distribution['70-79']++;
      else if (score >= 60) distribution['60-69']++;
      else distribution['0-59']++;
    });

    return {
      labels: ['90-100%', '80-89%', '70-79%', '60-69%', 'Below 60%'],
      datasets: [
        {
          label: 'Number of Attempts',
          data: Object.values(distribution),
          backgroundColor: [
            'rgba(34, 197, 94, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(168, 85, 247, 0.8)',
            'rgba(239, 68, 68, 0.8)'
          ],
          borderColor: [
            'rgb(34, 197, 94)',
            'rgb(59, 130, 246)',
            'rgb(245, 158, 11)',
            'rgb(168, 85, 247)',
            'rgb(239, 68, 68)'
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [filteredAttempts]);

  const performanceTrendData = useMemo(() => {
    return {
      labels: performanceTrend.map(item => item.date),
      datasets: [
        {
          label: 'Performance Trend',
          data: performanceTrend.map(item => item.score),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true,
        },
      ],
    };
  }, [performanceTrend]);

  const subjectWiseData = useMemo(() => {
    const subjectMap = {};
    
    filteredAttempts.forEach(attempt => {
      const subject = attempt.quizId?.subject || 'Unknown';
      const score = calculateSuccessRate(attempt);
      
      if (!subjectMap[subject]) {
        subjectMap[subject] = {
          totalScore: 0,
          count: 0,
          bestScore: 0,
          worstScore: 100
        };
      }
      
      subjectMap[subject].totalScore += score;
      subjectMap[subject].count++;
      subjectMap[subject].bestScore = Math.max(subjectMap[subject].bestScore, score);
      subjectMap[subject].worstScore = Math.min(subjectMap[subject].worstScore, score);
    });
    
    const labels = Object.keys(subjectMap);
    const avgScores = labels.map(subject => 
      Math.round(subjectMap[subject].totalScore / subjectMap[subject].count)
    );
    
    return {
      labels,
      datasets: [
        {
          label: 'Average Score (%)',
          data: avgScores,
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 1,
        },
      ],
    };
  }, [filteredAttempts]);

  // Export Functions
  const exportToExcel = () => {
    setExporting(true);
    try {
      const exportData = filteredAttempts.map(attempt => ({
        'Quiz Title': attempt.quizId?.title || 'N/A',
        'Subject': attempt.quizId?.subject || 'N/A',
        'Department': attempt.quizId?.department || 'N/A',
        'Scored Marks': attempt.scoredMarks,
        'Total Marks': attempt.quizId?.totalMarks || 0,
        'Score Percentage': calculateSuccessRate(attempt) + '%',
        'Correct Answers': attempt.correctCount,
        'Wrong Answers': attempt.wrongCount,
        'Accuracy': attempt.correctCount + attempt.wrongCount > 0 
          ? Math.round((attempt.correctCount / (attempt.correctCount + attempt.wrongCount)) * 100) + '%' 
          : '0%',
        'Time Taken (seconds)': attempt.timeTaken,
        'Time Taken': formatTimeTaken(attempt.timeTaken),
        'Attempt Date': new Date(attempt.attemptedAt).toLocaleDateString(),
        'Attempt Time': new Date(attempt.attemptedAt).toLocaleTimeString(),
        'Performance Level': getPerformanceLevel(calculateSuccessRate(attempt)).level
      }));

      // Add summary sheet
      const summaryData = [{
        'Student Name': data?.student?.name || 'N/A',
        'Enrollment Number': data?.student?.enrollmentNumber || 'N/A',
        'Department': data?.department || 'N/A',
        'Total Attempts': filteredAttempts.length,
        'Average Score': stats.averageScore + '%',
        'Best Score': stats.bestScore + '%',
        'Worst Score': stats.worstScore + '%',
        'Accuracy Rate': stats.accuracy + '%',
        'Total Questions Attempted': stats.totalQuestions,
        'Total Time Spent': formatTimeTaken(stats.totalTime),
        'Report Generated': new Date().toLocaleString()
      }];

      const ws1 = XLSX.utils.json_to_sheet(exportData);
      const ws2 = XLSX.utils.json_to_sheet(summaryData);
      const wb = XLSX.utils.book_new();
      
      XLSX.utils.book_append_sheet(wb, ws1, "Quiz Attempts");
      XLSX.utils.book_append_sheet(wb, ws2, "Summary");
      
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      
      const fileName = `${data?.student?.name?.replace(/\s+/g, '_') || 'Student'}_Performance_Report_${new Date().toISOString().split('T')[0]}.xlsx`;
      saveAs(blob, fileName);
      
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export data. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  const generatePerformanceReport = () => {
    const report = `
      PERFORMANCE ANALYSIS REPORT
      ============================
      
      Student: ${data?.student?.name}
      Enrollment: ${data?.student?.enrollmentNumber}
      Department: ${data?.department}
      Report Date: ${new Date().toLocaleDateString()}
      
      OVERALL PERFORMANCE
      -------------------
      Average Score: ${stats.averageScore}%
      Best Score: ${stats.bestScore}%
      Accuracy Rate: ${stats.accuracy}%
      Consistency Score: ${stats.consistencyScore}%
      Total Attempts: ${filteredAttempts.length}
      
      ATTEMPT ANALYSIS
      ----------------
      Total Questions: ${stats.totalQuestions}
      Correct Answers: ${stats.totalCorrect}
      Wrong Answers: ${stats.totalWrong}
      Total Time Spent: ${formatTimeTaken(stats.totalTime)}
      Avg Time/Question: ${formatTimeTaken(stats.avgTimePerQuestion)}
      
      PERFORMANCE TREND
      -----------------
      ${performanceTrend.map((item, i) => 
        `Attempt ${item.attempt} (${item.date}): ${item.score}%`
      ).join('\n')}
      
      RECOMMENDATIONS
      ---------------
      ${generateRecommendations()}
    `;
    
    const blob = new Blob([report], { type: 'text/plain' });
    saveAs(blob, `${data?.student?.name}_Performance_Report.txt`);
  };

  const generateRecommendations = () => {
    const recs = [];
    
    if (stats.accuracy < 70) recs.push("• Focus on improving question accuracy through practice");
    if (stats.consistencyScore < 70) recs.push("• Work on maintaining consistent performance across attempts");
    if (stats.worstScore < 50) recs.push("• Review weak areas identified in low-scoring attempts");
    if (stats.avgTimePerQuestion > 60) recs.push("• Practice time management for better efficiency");
    
    if (recs.length === 0) recs.push("• Excellent performance! Continue with current study patterns");
    
    return recs.join('\n');
  };

  // Render Functions
  const renderOverviewTab = () => (
    <div className="overview-tab">
      <Row className="g-4 mb-4">
        <Col lg={8}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0"><FaChartLine /> Performance Analytics</h5>
              <Badge bg="light" text="dark">
                {performanceTrend.length} Attempts
              </Badge>
            </Card.Header>
            <Card.Body>
              <div style={{ height: '300px' }}>
                <Line 
                  data={performanceTrendData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      title: {
                        display: true,
                        text: 'Performance Trend Over Time'
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                          display: true,
                          text: 'Score (%)'
                        }
                      }
                    }
                  }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-info text-white">
              <h5 className="mb-0"><FaChartPie /> Score Distribution</h5>
            </Card.Header>
            <Card.Body>
              <div style={{ height: '250px' }}>
                <Pie 
                  data={scoreDistributionData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right'
                      }
                    }
                  }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        <Col lg={6}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-success text-white">
              <h5 className="mb-0"><FaRegChartBar /> Subject-wise Performance</h5>
            </Card.Header>
            <Card.Body>
              <div style={{ height: '250px' }}>
                <Bar 
                  data={subjectWiseData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                          display: true,
                          text: 'Score (%)'
                        }
                      }
                    }
                  }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={6}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-warning text-dark">
              <h5 className="mb-0"><FaBolt /> Performance Metrics</h5>
            </Card.Header>
            <Card.Body>
              <Row className="g-3">
                <Col md={6}>
                  <Card className="text-center h-100 border-0">
                    <Card.Body>
                      <div className="display-4 fw-bold" style={{ color: `var(--bs-${getPerformanceColor(stats.averageScore)})` }}>
                        {stats.averageScore}%
                      </div>
                      <Card.Text className="text-muted">Average Score</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="text-center h-100 border-0">
                    <Card.Body>
                      <div className="display-4 fw-bold text-success">
                        {stats.accuracy}%
                      </div>
                      <Card.Text className="text-muted">Accuracy Rate</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="text-center h-100 border-0">
                    <Card.Body>
                      <div className="display-4 fw-bold text-info">
                        {stats.consistencyScore}%
                      </div>
                      <Card.Text className="text-muted">Consistency</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="text-center h-100 border-0">
                    <Card.Body>
                      <div className="display-4 fw-bold text-primary">
                        {formatTimeTaken(stats.avgTimePerQuestion)}
                      </div>
                      <Card.Text className="text-muted">Avg Time/Question</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );

  const renderAttemptsTab = () => (
    <div className="attempts-tab">
      <Card className="shadow-sm">
        <Card.Header className="bg-light">
          <Row className="align-items-center">
            <Col md={6}>
              <h5 className="mb-0"><FaClipboardList /> Quiz Attempt History</h5>
            </Col>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search by quiz title, subject, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>
        </Card.Header>
        
        <Card.Body>
          {filteredAttempts.length === 0 ? (
            <Alert variant="info" className="text-center">
              <FaInfoCircle /> No quiz attempts found for the selected criteria.
            </Alert>
          ) : (
            <>
              <div className="table-responsive">
                <Table hover className="align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Quiz Details</th>
                      <th>Score</th>
                      <th>Correct/Wrong</th>
                      <th>Time Taken</th>
                      <th>Attempted On</th>
                      <th>Performance</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedAttempts.map((attempt) => {
                      const successRate = calculateSuccessRate(attempt);
                      const performance = getPerformanceLevel(successRate);
                      
                      return (
                        <tr key={attempt._id}>
                          <td>
                            <div>
                              <strong className="d-block">{attempt.quizId?.title || 'Unknown Quiz'}</strong>
                              <small className="text-muted">
                                <FaBook className="me-1" />
                                {attempt.quizId?.subject || 'N/A'}
                                {attempt.quizId?.department && (
                                  <Badge bg="secondary" className="ms-2">
                                    {attempt.quizId.department}
                                  </Badge>
                                )}
                              </small>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="me-3">
                                <strong className={`text-${getPerformanceColor(successRate)}`}>
                                  {successRate}%
                                </strong>
                              </div>
                              <ProgressBar 
                                now={successRate} 
                                variant={getPerformanceColor(successRate)}
                                style={{ width: '100px', height: '8px' }}
                              />
                            </div>
                            <small className="text-muted">
                              {attempt.scoredMarks}/{attempt.quizId?.totalMarks || 0}
                            </small>
                          </td>
                          <td>
                            <div>
                              <Badge bg="success" className="me-2">
                                <FaCheckCircle /> {attempt.correctCount}
                              </Badge>
                              <Badge bg="danger">
                                <FaTimesCircle /> {attempt.wrongCount}
                              </Badge>
                            </div>
                            <small className="text-muted">
                              {attempt.correctCount + attempt.wrongCount} total
                            </small>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <FaClock className="me-2" />
                              {formatTimeTaken(attempt.timeTaken)}
                            </div>
                          </td>
                          <td>
                            <div>
                              <FaCalendarAlt className="me-2" />
                              {new Date(attempt.attemptedAt).toLocaleDateString()}
                              <div className="text-muted small">
                                {new Date(attempt.attemptedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              {performance.icon}
                              <span className="ms-2">{performance.level}</span>
                            </div>
                          </td>
                          <td>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => {
                                setSelectedAttempt(attempt);
                                setShowAnalyticsModal(true);
                              }}
                            >
                              <FaEye /> Details
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-between align-items-center mt-4">
                  <div className="text-muted">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAttempts.length)} of {filteredAttempts.length} attempts
                  </div>
                  <Pagination>
                    <Pagination.Prev 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    />
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <Pagination.Item 
                          key={pageNum}
                          active={pageNum === currentPage}
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </Pagination.Item>
                      );
                    })}
                    
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <>
                        <Pagination.Ellipsis disabled />
                        <Pagination.Item onClick={() => setCurrentPage(totalPages)}>
                          {totalPages}
                        </Pagination.Item>
                      </>
                    )}
                    
                    <Pagination.Next 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    />
                  </Pagination>
                </div>
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="analytics-tab">
      <Row className="g-4 mb-4">
        <Col xl={3} lg={6}>
          <Card className="text-center shadow-sm border-primary">
            <Card.Body>
              <div className="display-5 fw-bold text-primary">
                {stats.averageScore}%
              </div>
              <Card.Title>Overall Average</Card.Title>
              <div className="mt-3">
                {getPerformanceBadge(stats.averageScore)}
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col xl={3} lg={6}>
          <Card className="text-center shadow-sm border-success">
            <Card.Body>
              <div className="display-5 fw-bold text-success">
                {stats.bestScore}%
              </div>
              <Card.Title>Best Score</Card.Title>
              <div className="mt-3">
                <FaTrophy className="fs-3 text-warning" />
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col xl={3} lg={6}>
          <Card className="text-center shadow-sm border-warning">
            <Card.Body>
              <div className="display-5 fw-bold text-warning">
                {stats.consistencyScore}%
              </div>
              <Card.Title>Consistency Score</Card.Title>
              <div className="mt-3">
                {stats.consistencyScore >= 80 ? (
                  <FaTrendingUp className="fs-3 text-success" />
                ) : (
                  <FaTrendingDown className="fs-3 text-danger" />
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col xl={3} lg={6}>
          <Card className="text-center shadow-sm border-info">
            <Card.Body>
              <div className="display-5 fw-bold text-info">
                {formatTimeTaken(stats.totalTime)}
              </div>
              <Card.Title>Total Time Spent</Card.Title>
              <div className="mt-3">
                <FaClock className="fs-3 text-info" />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Header className="bg-dark text-white">
              <h5 className="mb-0"><FaBrain /> Detailed Performance Analysis</h5>
            </Card.Header>
            <Card.Body>
              <Table borderless>
                <tbody>
                  <tr>
                    <td><strong>Accuracy Rate:</strong></td>
                    <td>
                      <ProgressBar 
                        now={stats.accuracy} 
                        label={`${stats.accuracy}%`}
                        variant={stats.accuracy >= 80 ? "success" : stats.accuracy >= 60 ? "warning" : "danger"}
                        className="mb-0"
                      />
                    </td>
                    <td className="text-end">
                      {stats.accuracy >= 80 ? "Excellent" : stats.accuracy >= 60 ? "Good" : "Needs Improvement"}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Question Efficiency:</strong></td>
                    <td>
                      <ProgressBar 
                        now={Math.min(100, stats.accuracy)} 
                        label={`${stats.correctCount}/${stats.totalQuestions}`}
                        variant="info"
                        className="mb-0"
                      />
                    </td>
                    <td className="text-end">
                      {stats.totalCorrect} correct of {stats.totalQuestions}
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Time Management:</strong></td>
                    <td>
                      <ProgressBar 
                        now={Math.min(100, stats.avgTimePerQuestion / 120 * 100)} 
                        label={formatTimeTaken(stats.avgTimePerQuestion)}
                        variant={stats.avgTimePerQuestion < 60 ? "success" : "warning"}
                        className="mb-0"
                      />
                    </td>
                    <td className="text-end">
                      Avg per question
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Performance Range:</strong></td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="text-danger me-2">{stats.worstScore}%</span>
                        <ProgressBar className="flex-grow-1">
                          <ProgressBar 
                            variant="danger" 
                            now={(stats.worstScore / 100) * 30} 
                          />
                          <ProgressBar 
                            variant="warning" 
                            now={(stats.averageScore - stats.worstScore) / 100 * 30} 
                          />
                          <ProgressBar 
                            variant="success" 
                            now={(stats.bestScore - stats.averageScore) / 100 * 30} 
                          />
                        </ProgressBar>
                        <span className="text-success ms-2">{stats.bestScore}%</span>
                      </div>
                    </td>
                    <td className="text-end">
                      {stats.bestScore - stats.worstScore}% spread
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-secondary text-white">
              <h5 className="mb-0"><FaGraduationCap /> Recommendations</h5>
            </Card.Header>
            <Card.Body>
              <div className="recommendations-list">
                {stats.accuracy < 70 && (
                  <Alert variant="warning" className="d-flex align-items-start">
                    <FaExclamationTriangle className="me-2 mt-1" />
                    <div>
                      <strong>Improve Accuracy</strong>
                      <p className="mb-0 small">Focus on understanding questions before answering</p>
                    </div>
                  </Alert>
                )}
                
                {stats.consistencyScore < 70 && (
                  <Alert variant="info" className="d-flex align-items-start">
                    <FaChartLine className="me-2 mt-1" />
                    <div>
                      <strong>Increase Consistency</strong>
                      <p className="mb-0 small">Regular practice can help maintain stable performance</p>
                    </div>
                  </Alert>
                )}
                
                {stats.worstScore < 50 && (
                  <Alert variant="danger" className="d-flex align-items-start">
                    <FaBookOpen className="me-2 mt-1" />
                    <div>
                      <strong>Review Weak Areas</strong>
                      <p className="mb-0 small">Identify and focus on subjects with lowest scores</p>
                    </div>
                  </Alert>
                )}
                
                {stats.avgTimePerQuestion > 60 && (
                  <Alert variant="secondary" className="d-flex align-items-start">
                    <FaClock className="me-2 mt-1" />
                    <div>
                      <strong>Time Management</strong>
                      <p className="mb-0 small">Practice with time limits to improve speed</p>
                    </div>
                  </Alert>
                )}
                
                {stats.averageScore >= 80 && stats.accuracy >= 80 && (
                  <Alert variant="success" className="d-flex align-items-start">
                    <FaAward className="me-2 mt-1" />
                    <div>
                      <strong>Excellent Performance!</strong>
                      <p className="mb-0 small">Continue with current study patterns</p>
                    </div>
                  </Alert>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );

  // Loading State
  if (loading) {
    return (
      <Container fluid className="py-5">
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <Spinner animation="border" variant="primary" className="mb-3" />
            <h4>Loading Student Performance Dashboard...</h4>
            <p className="text-muted">Fetching comprehensive analytics data</p>
          </Col>
        </Row>
      </Container>
    );
  }

  // Error State
  if (error) {
    return (
      <Container fluid className="py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Alert variant="danger" className="text-center">
              <FaExclamationTriangle className="fs-1 mb-3" />
              <h4>Unable to Load Dashboard</h4>
              <p>{error}</p>
              <div className="d-flex justify-content-center gap-3">
                <Button variant="outline-danger" onClick={() => navigate(-1)}>
                  <FaArrowLeft /> Go Back
                </Button>
                <Button variant="primary" onClick={fetchStudentAttempts}>
                  <FaSync /> Retry
                </Button>
              </div>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  // No Data State
  if (!data || !data.student) {
    return (
      <Container fluid className="py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Alert variant="info" className="text-center">
              <FaInfoCircle className="fs-1 mb-3" />
              <h4>Student Record Not Found</h4>
              <p>The requested student data is unavailable or has been removed.</p>
              <Button variant="primary" onClick={() => navigate(-1)}>
                <FaArrowLeft /> Return to Dashboard
              </Button>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid className="student-performance-dashboard py-3">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm border-0 bg-gradient-primary text-white">
            <Card.Body className="pb-2">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <Button 
                    variant="light" 
                    size="sm" 
                    className="mb-3"
                    onClick={() => navigate(-1)}
                  >
                    <FaArrowLeft /> Back
                  </Button>
                  <h1 className="h2 mb-2">
                    <FaUserTie /> Student Performance Analytics
                  </h1>
                  <p className="mb-0 opacity-75">
                    Comprehensive performance analysis for {data.student.name} 
                    • {data.department} Department • {filteredAttempts.length} Quiz Attempts
                  </p>
                </div>
                <div className="text-end">
                  <div className="display-6 fw-bold">
                    {stats.averageScore}%
                  </div>
                  <div className="small">Overall Score</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Student Profile */}
      <Row className="mb-4">
        <Col xl={3} lg={6} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <div className="avatar-circle mb-3">
                <FaUserGraduate className="fs-2" />
              </div>
              <h4 className="mb-1">{data.student.name}</h4>
              <p className="text-muted mb-3">
                <FaIdBadge /> {data.student.enrollmentNumber}
              </p>
              <div className="d-flex justify-content-around mb-3">
                <div>
                  <div className="fw-bold">{stats.averageScore}%</div>
                  <small className="text-muted">Avg Score</small>
                </div>
                <div>
                  <div className="fw-bold">{filteredAttempts.length}</div>
                  <small className="text-muted">Attempts</small>
                </div>
                <div>
                  <div className="fw-bold">{stats.accuracy}%</div>
                  <small className="text-muted">Accuracy</small>
                </div>
              </div>
              <Badge bg="dark" className="w-100 py-2">
                <FaUniversity /> {data.department}
              </Badge>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={9} lg={6}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-light">
              <h5 className="mb-0"><FaChartBar /> Performance Summary</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={3} className="text-center border-end">
                  <div className="display-6 fw-bold text-success">
                    {stats.bestScore}%
                  </div>
                  <div className="small text-muted">Best Score</div>
                  <FaTrophy className="mt-2 text-warning" />
                </Col>
                <Col md={3} className="text-center border-end">
                  <div className="display-6 fw-bold text-primary">
                    {stats.consistencyScore}%
                  </div>
                  <div className="small text-muted">Consistency</div>
                  <FaChartLine className="mt-2 text-primary" />
                </Col>
                <Col md={3} className="text-center border-end">
                  <div className="display-6 fw-bold text-info">
                    {formatTimeTaken(stats.totalTime)}
                  </div>
                  <div className="small text-muted">Total Time</div>
                  <FaClock className="mt-2 text-info" />
                </Col>
                <Col md={3} className="text-center">
                  <div className="display-6 fw-bold text-warning">
                    {stats.totalQuestions}
                  </div>
                  <div className="small text-muted">Questions</div>
                  <FaQuestionCircle className="mt-2 text-warning" />
                </Col>
              </Row>
              <hr />
              <div className="text-center">
                <div className="h5 mb-2">Performance Level</div>
                <div className="display-4 fw-bold" style={{ color: `var(--bs-${getPerformanceColor(stats.averageScore)})` }}>
                  {getPerformanceLevel(stats.averageScore).level}
                </div>
                {getPerformanceLevel(stats.averageScore).icon}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Main Tabs */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="bg-light p-0">
              <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="nav-tabs-custom"
                fill
              >
                <Tab 
                  eventKey="overview" 
                  title={
                    <span>
                      <FaChartLine /> Overview
                    </span>
                  }
                />
                <Tab 
                  eventKey="attempts" 
                  title={
                    <span>
                      <FaHistory /> Attempt History
                    </span>
                  }
                />
                <Tab 
                  eventKey="analytics" 
                  title={
                    <span>
                      <FaBrain /> Deep Analytics
                    </span>
                  }
                />
              </Tabs>
            </Card.Header>
            <Card.Body>
              {activeTab === "overview" && renderOverviewTab()}
              {activeTab === "attempts" && renderAttemptsTab()}
              {activeTab === "analytics" && renderAnalyticsTab()}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filters and Actions */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Row className="align-items-center">
                <Col md={4}>
                  <div className="d-flex align-items-center gap-3">
                    <Form.Label className="mb-0 fw-bold">Time Range:</Form.Label>
                    <Dropdown>
                      <Dropdown.Toggle variant="outline-primary" size="sm">
                        <FaCalendarAlt /> {timeRange === "all" ? "All Time" : 
                          timeRange === "week" ? "Last 7 Days" :
                          timeRange === "month" ? "Last 30 Days" : "Last 90 Days"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setTimeRange("all")}>All Time</Dropdown.Item>
                        <Dropdown.Item onClick={() => setTimeRange("week")}>Last 7 Days</Dropdown.Item>
                        <Dropdown.Item onClick={() => setTimeRange("month")}>Last 30 Days</Dropdown.Item>
                        <Dropdown.Item onClick={() => setTimeRange("quarter")}>Last 90 Days</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Col>
                <Col md={4} className="text-center">
                  <Badge bg="light" text="dark" className="p-2">
                    <FaDatabase /> Showing {filteredAttempts.length} of {data.attempts?.length || 0} attempts
                  </Badge>
                </Col>
                <Col md={4}>
                  <div className="d-flex justify-content-end gap-2">
                    <Button
                      variant="outline-success"
                      onClick={exportToExcel}
                      disabled={exporting}
                    >
                      {exporting ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Exporting...
                        </>
                      ) : (
                        <>
                          <FaFileExcel /> Export to Excel
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={generatePerformanceReport}
                    >
                      <FaDownload /> Generate Report
                    </Button>
                    <Button
                      variant="outline-dark"
                      onClick={() => window.print()}
                    >
                      <FaPrint /> Print
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Detailed Analytics Modal */}
      <Modal
        show={showAnalyticsModal}
        onHide={() => setShowAnalyticsModal(false)}
        size="lg"
      >
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <FaChartBar /> Attempt Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAttempt && (
            <Row>
              <Col md={6}>
                <h5>{selectedAttempt.quizId?.title}</h5>
                <p className="text-muted">
                  <FaBook className="me-2" />
                  {selectedAttempt.quizId?.subject || 'N/A'}
                </p>
                <Table borderless size="sm">
                  <tbody>
                    <tr>
                      <td><strong>Score:</strong></td>
                      <td className="text-end">
                        <Badge bg={getPerformanceColor(calculateSuccessRate(selectedAttempt))}>
                          {calculateSuccessRate(selectedAttempt)}%
                        </Badge>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Marks:</strong></td>
                      <td className="text-end">
                        {selectedAttempt.scoredMarks}/{selectedAttempt.quizId?.totalMarks || 0}
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Correct:</strong></td>
                      <td className="text-end">
                        <Badge bg="success">{selectedAttempt.correctCount}</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Wrong:</strong></td>
                      <td className="text-end">
                        <Badge bg="danger">{selectedAttempt.wrongCount}</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Time Taken:</strong></td>
                      <td className="text-end">
                        {formatTimeTaken(selectedAttempt.timeTaken)}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col md={6}>
                <div className="performance-analysis">
                  <h6>Performance Analysis</h6>
                  <ProgressBar className="mb-3">
                    <ProgressBar 
                      variant="success" 
                      now={selectedAttempt.correctCount / (selectedAttempt.correctCount + selectedAttempt.wrongCount) * 100} 
                      label="Correct"
                    />
                    <ProgressBar 
                      variant="danger" 
                      now={selectedAttempt.wrongCount / (selectedAttempt.correctCount + selectedAttempt.wrongCount) * 100} 
                      label="Wrong"
                    />
                  </ProgressBar>
                  <div className="text-center">
                    <div className="display-6 fw-bold">
                      {getPerformanceLevel(calculateSuccessRate(selectedAttempt)).level}
                    </div>
                    {getPerformanceLevel(calculateSuccessRate(selectedAttempt)).icon}
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAnalyticsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Footer */}
      <Row>
        <Col>
          <Card className="shadow-sm border-0 bg-light">
            <Card.Body className="py-3">
              <div className="d-flex justify-content-between align-items-center">
                <div className="text-muted small">
                  <FaCogs /> System Analytics Dashboard • Generated on {new Date().toLocaleString()}
                </div>
                <div>
                  <Button
                    variant="outline-dark"
                    size="sm"
                    onClick={() => navigate("/dashboard")}
                  >
                    <FaHome /> Dashboard
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentAttemptedQuizzes;