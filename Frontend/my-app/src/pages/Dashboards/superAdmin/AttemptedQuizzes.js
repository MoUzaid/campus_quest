import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Clock, Calendar, User, Award, TrendingUp, BarChart3, Filter, Download } from "lucide-react";

const AttemptedQuizzes = () => {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [stats, setStats] = useState({ total: 0, averageScore: 0, bestScore: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    fetchAttemptedQuizzes();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [attempts]);

  const fetchAttemptedQuizzes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/superadmin/attempted-quizzes",
        { withCredentials: true }
      );
      setAttempts(res.data);
    } catch (error) {
      console.error("Error fetching attempts:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    if (attempts.length === 0) return;

    const total = attempts.length;
    const totalScore = attempts.reduce((sum, attempt) => sum + (attempt.scoredMarks || 0), 0);
    const averageScore = total > 0 ? (totalScore / total).toFixed(1) : 0;
    const bestScore = Math.max(...attempts.map(a => a.scoredMarks || 0));

    setStats({ total, averageScore, bestScore });
  };

  const getUniqueSubjects = () => {
    const subjects = attempts.map(a => a.quizId?.subject).filter(Boolean);
    return [...new Set(subjects)];
  };

  const filterAndSortAttempts = () => {
    let filtered = attempts.filter(attempt => {
      const matchesSearch = 
        attempt.student?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attempt.student?.enrollmentNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attempt.quizId?.title?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSubject = selectedSubject === "all" || attempt.quizId?.subject === selectedSubject;
      
      return matchesSearch && matchesSubject;
    });

    // Sorting logic
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return new Date(b.attemptedAt) - new Date(a.attemptedAt);
        case "highest-score":
          return (b.scoredMarks || 0) - (a.scoredMarks || 0);
        case "name":
          return (a.student?.name || "").localeCompare(b.student?.name || "");
        default:
          return 0;
      }
    });

    return filtered;
  };

  const exportToCSV = () => {
    const headers = ["Student", "Enrollment", "Quiz", "Subject", "Total Marks", "Scored", "Percentage", "Attempted At"];
    const csvContent = [
      headers.join(","),
      ...filterAndSortAttempts().map(a => [
        `"${a.student?.name || ""}"`,
        a.student?.enrollmentNumber || "",
        `"${a.quizId?.title || ""}"`,
        a.quizId?.subject || "",
        a.quizId?.totalMarks || 0,
        a.scoredMarks || 0,
        a.quizId?.totalMarks ? `${((a.scoredMarks || 0) / a.quizId.totalMarks * 100).toFixed(1)}%` : "0%",
        new Date(a.attemptedAt).toLocaleString()
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `quiz-attempts-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getScoreColor = (scored, total) => {
    const percentage = total ? (scored / total) * 100 : 0;
    if (percentage >= 80) return "#10b981"; // Green
    if (percentage >= 60) return "#f59e0b"; // Yellow
    return "#ef4444"; // Red
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading attempted quizzes...</p>
      </div>
    );
  }

  if (attempts.length === 0) {
    return (
      <div className="empty-state">
        <BarChart3 size={48} color="#9ca3af" />
        <h3>No Attempts Found</h3>
        <p>No quiz attempts have been recorded for your department yet.</p>
      </div>
    );
  }

  const filteredAttempts = filterAndSortAttempts();
  const subjects = getUniqueSubjects();

  return (
    <div className="attempted-quizzes-container">
      {/* Header Section */}
      <div className="header-section">
        <div className="header-left">
          <h1>
            <TrendingUp size={28} />
            Department Quiz Attempts
          </h1>
          <p className="subtitle">Overview of all quiz attempts in your department</p>
        </div>
        <button onClick={exportToCSV} className="export-btn">
          <Download size={18} />
          Export CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total-attempts">
            <BarChart3 size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.total}</h3>
            <p>Total Attempts</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon average-score">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.averageScore}</h3>
            <p>Average Score</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon best-score">
            <Award size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.bestScore}</h3>
            <p>Best Score</p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by student name, enrollment, or quiz..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-controls">
          <div className="filter-group">
            <Filter size={16} />
            <select 
              value={selectedSubject} 
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="latest">Latest First</option>
              <option value="highest-score">Highest Score</option>
              <option value="name">Student Name A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-container">
        {filteredAttempts.length === 0 ? (
          <div className="no-results">
            <p>No attempts found matching your criteria</p>
          </div>
        ) : (
          <table className="attempts-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Enrollment</th>
                <th>Quiz</th>
                <th>Subject</th>
                <th>Total Marks</th>
                <th>Scored</th>
                <th>Percentage</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Attempted At</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttempts.map((attempt) => {
                const percentage = attempt.quizId?.totalMarks 
                  ? ((attempt.scoredMarks || 0) / attempt.quizId.totalMarks * 100).toFixed(1)
                  : 0;
                const scoreColor = getScoreColor(attempt.scoredMarks || 0, attempt.quizId?.totalMarks || 1);

                return (
                  <tr key={attempt._id} className="attempt-row">
                    <td 
                      className="student-cell clickable"
                      onClick={() => navigate(`/superadmin/student-attempts/${attempt.student?._id}`)}
                    >
                      <User size={16} />
                      <span>{attempt.student?.name || "N/A"}</span>
                    </td>
                    <td>{attempt.student?.enrollmentNumber || "N/A"}</td>
                    <td>{attempt.quizId?.title || "N/A"}</td>
                    <td>
                      <span className="subject-tag">{attempt.quizId?.subject || "N/A"}</span>
                    </td>
                    <td>{attempt.quizId?.totalMarks || 0}</td>
                    <td>
                      <span className="score-badge" style={{ backgroundColor: scoreColor }}>
                        {attempt.scoredMarks || 0}
                      </span>
                    </td>
                    <td>
                      <div className="percentage-bar">
                        <div 
                          className="percentage-fill" 
                          style={{ 
                            width: `${Math.min(percentage, 100)}%`,
                            backgroundColor: scoreColor
                          }}
                        />
                        <span className="percentage-text">{percentage}%</span>
                      </div>
                    </td>
                    <td>
                      <div className="duration-cell">
                        <Clock size={14} />
                        {attempt.quizId?.durationMinutes || 0} min
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${percentage >= 50 ? 'passed' : 'failed'}`}>
                        {percentage >= 50 ? 'Passed' : 'Failed'}
                      </span>
                    </td>
                    <td>
                      <div className="timestamp-cell">
                        <Calendar size={14} />
                        {new Date(attempt.attemptedAt).toLocaleDateString()}
                        <span className="timestamp-time">
                          {new Date(attempt.attemptedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination/Summary */}
      <div className="table-footer">
        <div className="results-info">
          Showing {filteredAttempts.length} of {attempts.length} attempts
        </div>
      </div>
    </div>
  );
};

export default AttemptedQuizzes;

// CSS Styles
const styles = `
.attempted-quizzes-container {
  padding: 24px;
  font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
  background: #f8fafc;
  min-height: 100vh;
}

/* Header Section */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.header-left h1 {
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
}

.subtitle {
  color: #64748b;
  margin-top: 4px;
  font-size: 14px;
}

.export-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.export-btn:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.total-attempts {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.average-score {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.best-score {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.stat-content h3 {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.stat-content p {
  color: #64748b;
  font-size: 14px;
  margin: 4px 0 0 0;
}

/* Filters Section */
.filters-section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.filter-controls {
  display: flex;
  gap: 16px;
  margin-top: 16px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  cursor: pointer;
}

/* Table Container */
.table-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.attempts-table {
  width: 100%;
  border-collapse: collapse;
}

.attempts-table thead {
  background: #f1f5f9;
}

.attempts-table th {
  padding: 16px;
  text-align: left;
  font-weight: 600;
  color: #475569;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e2e8f0;
}

.attempts-table td {
  padding: 16px;
  border-bottom: 1px solid #f1f5f9;
  color: #334155;
  font-size: 14px;
}

.attempt-row:hover {
  background: #f8fafc;
}

/* Student Cell */
.student-cell {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.clickable {
  cursor: pointer;
  transition: color 0.2s ease;
}

.clickable:hover {
  color: #3b82f6;
}

.clickable:hover span {
  text-decoration: underline;
}

/* Tags and Badges */
.subject-tag {
  background: #e0f2fe;
  color: #0369a1;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.score-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  color: white;
  font-weight: 600;
  font-size: 13px;
}

/* Percentage Bar */
.percentage-bar {
  width: 100%;
  height: 24px;
  background: #f1f5f9;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.percentage-fill {
  height: 100%;
  border-radius: 12px;
  transition: width 0.3s ease;
}

.percentage-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  font-weight: 600;
  color: #1e293b;
}

/* Status Badge */
.status-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge.passed {
  background: #dcfce7;
  color: #166534;
}

.status-badge.failed {
  background: #fee2e2;
  color: #991b1b;
}

/* Duration & Timestamp Cells */
.duration-cell, .timestamp-cell {
  display: flex;
  align-items: center;
  gap: 6px;
}

.timestamp-time {
  color: #64748b;
  margin-left: 4px;
  font-size: 12px;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 16px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  color: #6b7280;
}

.empty-state h3 {
  margin: 16px 0 8px;
  color: #374151;
}

/* No Results */
.no-results {
  text-align: center;
  padding: 48px 24px;
  color: #6b7280;
}

/* Table Footer */
.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #64748b;
  font-size: 14px;
}

/* Responsive */
@media (max-width: 1024px) {
  .attempts-table {
    display: block;
    overflow-x: auto;
  }
  
  .attempts-table th,
  .attempts-table td {
    min-width: 150px;
  }
}

@media (max-width: 768px) {
  .header-section {
    flex-direction: column;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-controls {
    flex-direction: column;
  }
}
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);