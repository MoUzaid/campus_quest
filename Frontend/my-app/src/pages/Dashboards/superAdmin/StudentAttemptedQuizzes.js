import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./StudentAttemptQuizzes.css";
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
  FaChartLine
} from "react-icons/fa";

const StudentAttemptedQuizzes = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState("all"); // Filter for time range

  useEffect(() => {
    fetchStudentAttempts();
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
    } catch (err) {
      setError("Failed to load student data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateSuccessRate = (attempt) => {
    if (!attempt.quizId?.totalMarks || !attempt.quizId.totalQuestions) return 0;
    return Math.round((attempt.scoredMarks / attempt.quizId.totalMarks) * 100);
  };

  const getPerformanceColor = (percentage) => {
    if (percentage >= 80) return "var(--success)";
    if (percentage >= 60) return "var(--warning)";
    return "var(--danger)";
  };

  const getTimeTakenColor = (time) => {
    if (time < 300) return "var(--success)"; // Under 5 minutes
    if (time < 600) return "var(--warning)"; // 5-10 minutes
    return "var(--danger)"; // Over 10 minutes
  };

  const formatTimeTaken = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getPerformanceLevel = (percentage) => {
    if (percentage >= 90) return "Excellent";
    if (percentage >= 75) return "Good";
    if (percentage >= 60) return "Average";
    if (percentage >= 40) return "Below Average";
    return "Needs Improvement";
  };

  const calculateAverageScore = () => {
    if (!data?.attempts?.length) return 0;
    const total = data.attempts.reduce((sum, attempt) => {
      return sum + (attempt.scoredMarks / attempt.quizId?.totalMarks * 100);
    }, 0);
    return Math.round(total / data.attempts.length);
  };

  const filterAttemptsByTime = () => {
    if (!data?.attempts) return [];
    if (timeRange === "all") return data.attempts;
    
    const now = new Date();
    const filtered = data.attempts.filter(attempt => {
      const attemptDate = new Date(attempt.attemptedAt);
      const diffDays = Math.floor((now - attemptDate) / (1000 * 60 * 60 * 24));
      
      switch(timeRange) {
        case "week": return diffDays <= 7;
        case "month": return diffDays <= 30;
        case "quarter": return diffDays <= 90;
        default: return true;
      }
    });
    

    
    return filtered;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading student details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <FaTimesCircle className="error-icon" />
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!data || !data.student) {
    return (
      <div className="no-data-container">
        <h3>No data found</h3>
        <p>The student record doesn't exist or has been removed.</p>
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Go Back
        </button>
      </div>
    );
  }


  
  const { student, attempts, totalQuizzesAttempted, department } = data;
  const filteredAttempts = filterAttemptsByTime();
  const averageScore = calculateAverageScore();

  return (
    <div className="student-attempts-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <button className="back-button" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back
          </button>
          <h1 className="dashboard-title">
            <FaChartBar /> Student Performance Dashboard
          </h1>
        </div>
      </header>

      {/* Student Profile Card */}
      <div className="profile-section">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              <FaUserGraduate />
            </div>
            <div className="profile-info">
              <h2 className="student-name">{student.name}</h2>
              <p className="student-enrollment">
                <FaIdBadge /> {student.enrollmentNumber}
              </p>
            </div>
            <div className="performance-badge" style={{ 
              backgroundColor: getPerformanceColor(averageScore) 
            }}>
              <FaTrophy />
              <span>{averageScore}% Avg</span>
            </div>
          </div>
          
          <div className="profile-details">
            <div className="detail-item">
              <FaEnvelope className="detail-icon" />
              <div>
                <span className="detail-label">Email</span>
                <span className="detail-value">{student.email}</span>
              </div>
            </div>
            
            <div className="detail-item">
              <FaBook className="detail-icon" />
              <div>
                <span className="detail-label">Department</span>
                <span className="detail-value">{department}</span>
              </div>
            </div>
            
            <div className="detail-item">
              <FaChartLine className="detail-icon" />
              <div>
                <span className="detail-label">Quizzes Attempted</span>
                <span className="detail-value highlight">{totalQuizzesAttempted}</span>
              </div>
            </div>
            
            <div className="detail-item">
              <FaBrain className="detail-icon" />
              <div>
                <span className="detail-label">Performance Level</span>
                <span className="detail-value">{getPerformanceLevel(averageScore)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <FaPercentage className="stat-icon" />
              <span className="stat-label">Average Score</span>
            </div>
            <div className="stat-value" style={{ color: getPerformanceColor(averageScore) }}>
              {averageScore}%
            </div>
            <div className="stat-trend">Overall Performance</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-header">
              <FaCheckCircle className="stat-icon" />
              <span className="stat-label">Total Correct</span>
            </div>
            <div className="stat-value">
              {filteredAttempts.reduce((sum, a) => sum + a.correctCount, 0)}
            </div>
            <div className="stat-trend">Questions Answered Right</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-header">
              <FaClock className="stat-icon" />
              <span className="stat-label">Avg Time/Quiz</span>
            </div>
            <div className="stat-value">
              {filteredAttempts.length > 0 
                ? formatTimeTaken(Math.round(filteredAttempts.reduce((sum, a) => sum + a.timeTaken, 0) / filteredAttempts.length))
                : "0m 0s"
              }
            </div>
            <div className="stat-trend">Time Management</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-header">
              <FaCalendarAlt className="stat-icon" />
              <span className="stat-label">Completion Rate</span>
            </div>
            <div className="stat-value">
              {filteredAttempts.length > 0 ? "100%" : "0%"}
            </div>
            <div className="stat-trend">All quizzes completed</div>
          </div>
        </div>
      </div>


      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <label>Time Range:</label>
          <div className="filter-buttons">
            {["all", "week", "month", "quarter"].map(range => (
              <button
                key={range}
                className={`filter-btn ${timeRange === range ? 'active' : ''}`}
                onClick={() => setTimeRange(range)}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="results-count">
          Showing {filteredAttempts.length} of {attempts.length} attempts
        </div>
      </div>

      {/* Attempts Table */}
      <div className="attempts-section">
        <h3 className="section-title">
          <FaChartBar /> Quiz Attempts History
        </h3>
        
        {filteredAttempts.length === 0 ? (
          <div className="no-attempts">
            <p>No quiz attempts found for the selected time period.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="attempts-table">
              <thead>
                <tr>
                  <th>Quiz Title</th>
                  <th>Subject</th>
                  <th>Score</th>
                  <th>Correct/Wrong</th>
                  <th>Success Rate</th>
                  <th>Time Taken</th>
                  <th>Attempted At</th>
                  <th>Performance</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttempts.map((attempt) => {
                  const successRate = calculateSuccessRate(attempt);
                  return (
                    <tr key={attempt._id}>
                      <td className="quiz-title">
                        <strong>{attempt.quizId?.title || "N/A"}</strong>
                      </td>
                      <td className="quiz-subject">
                        {attempt.quizId?.subject || "N/A"}
                      </td>
                      <td className="score-cell">
                        <span className="score-value">
                          {attempt.scoredMarks} / {attempt.quizId?.totalMarks || "N/A"}
                        </span>
                      </td>
                      <td className="answer-stats">
                        <div className="correct-count">
                          <FaCheckCircle /> {attempt.correctCount}
                        </div>
                        <div className="wrong-count">
                          <FaTimesCircle /> {attempt.wrongCount}
                        </div>
                      </td>
                      <td>
                        <div className="progress-container">
                          <div 
                            className="progress-bar" 
                            style={{ 
                              width: `${successRate}%`,
                              backgroundColor: getPerformanceColor(successRate)
                            }}
                          ></div>
                          <span className="progress-text">{successRate}%</span>
                        </div>
                      </td>
                      <td style={{ color: getTimeTakenColor(attempt.timeTaken) }}>
                        {formatTimeTaken(attempt.timeTaken)}
                      </td>
                      <td>
                        <div className="attempt-time">
                          <FaCalendarAlt />
                          {new Date(attempt.attemptedAt).toLocaleDateString()}
                          <br />
                          <small>{new Date(attempt.attemptedAt).toLocaleTimeString()}</small>
                        </div>
                      </td>
                      <td>
                        <span 
                          className="performance-badge-small"
                          style={{ backgroundColor: getPerformanceColor(successRate) }}
                        >
                          {getPerformanceLevel(successRate)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="summary-section">
        <div className="summary-card">
          <h4>Performance Summary</h4>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-label">Best Score</span>
              <span className="summary-value">
                {filteredAttempts.length > 0
                  ? Math.max(...filteredAttempts.map(a => calculateSuccessRate(a))) + "%"
                  : "N/A"
                }
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Total Time Spent</span>
              <span className="summary-value">
                {formatTimeTaken(filteredAttempts.reduce((sum, a) => sum + a.timeTaken, 0))}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Total Questions</span>
              <span className="summary-value">
                {filteredAttempts.reduce((sum, a) => sum + a.correctCount + a.wrongCount, 0)}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Accuracy</span>
              <span className="summary-value">
                {filteredAttempts.length > 0
                  ? Math.round(
                      (filteredAttempts.reduce((sum, a) => sum + a.correctCount, 0) /
                      filteredAttempts.reduce((sum, a) => sum + a.correctCount + a.wrongCount, 0)) * 100
                    ) + "%"
                  : "0%"
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="footer-actions">
        <button className="export-btn" onClick={() => window.print()}>
          Export Report
        </button>
        <button className="refresh-btn" onClick={fetchStudentAttempts}>
          Refresh Data
        </button>
        <button className="dashboard-btn" onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default StudentAttemptedQuizzes;