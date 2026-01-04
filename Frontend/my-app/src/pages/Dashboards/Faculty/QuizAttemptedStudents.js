// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const QuizAttemptedStudents = () => {
//   const { quizId } = useParams();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAttemptedStudents();
//   }, []);

//   const fetchAttemptedStudents = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/faculty/quiz/${quizId}/attempted-students`,
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

//   return (
//     <div>
//       <h2>{data.quiz.title}</h2>
//       <p>
//         {data.quiz.subject} | Total Marks: {data.quiz.totalMarks}
//       </p>

//       <h3>Total Attempted: {data.attemptedCount}</h3>

//       <table border="1" width="100%">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Enrollment</th>
//             <th>Course</th>
//             <th>Group</th>
//             <th>Score</th>
//             <th>Correct</th>
//             <th>Wrong</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.attemptedStudents.map((a, index) => (
//             <tr key={a.attemptId}>
//               <td>{index + 1}</td>
//               <td>{a.student.name}</td>
//               <td>{a.student.enrollmentNumber}</td>
//               <td>{a.student.course}</td>
//               <td>{a.student.group}</td>
//               <td>
//                 {a.score} / {a.totalMarks}
//               </td>
//               <td>{a.correctCount}</td>
//               <td>{a.wrongCount}</td>
//               <td>{a.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default QuizAttemptedStudents;






// import { FaMedal } from "react-icons/fa";

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
//   PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line,
//   AreaChart, Area, ScatterChart, Scatter
// } from "recharts";
// import {
//   FaUserGraduate, FaChartBar, FaTable, FaUsers,
//   FaTrophy, FaClock, FaPercent, FaCertificate,
//   FaEye, FaDownload, FaFilter, FaSort, FaChartLine,
//   FaChevronRight, FaUserCircle, FaCalendarAlt,
//   FaBookOpen, FaUniversity, FaMobileAlt, FaEnvelope,
//   FaVenusMars, FaCrown, FaCheckCircle, FaTimesCircle,
//   FaStar, FaChartPie
// } from "react-icons/fa";
// import { FiBarChart2, FiTrendingUp } from "react-icons/fi";
// import { GiDuration } from "react-icons/gi";
// import "./QuizAttemptedStudent.css";

// const QuizAttemptedStudents = () => {
//   const { quizId } = useParams();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("overview");
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [sortConfig, setSortConfig] = useState({ key: "rank", direction: "asc" });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");

//   useEffect(() => {
//     fetchAttemptedStudents();
//   }, []);

//   const fetchAttemptedStudents = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/faculty/quiz/${quizId}/attempted-students`,
//         { withCredentials: true }
//       );
//       setData(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };

//   const getPerformanceColor = (percentage) => {
//     if (percentage >= 90) return "#10B981"; // Excellent - Green
//     if (percentage >= 75) return "#3B82F6"; // Good - Blue
//     if (percentage >= 50) return "#F59E0B"; // Average - Orange
//     if (percentage >= 25) return "#EF4444"; // Poor - Red
//     return "#6B7280"; // Fail - Gray
//   };

//   const getPerformanceLabel = (percentage) => {
//     if (percentage >= 90) return "Excellent";
//     if (percentage >= 75) return "Good";
//     if (percentage >= 50) return "Average";
//     if (percentage >= 25) return "Poor";
//     return "Fail";
//   };

//   const sortedStudents = data?.attemptedStudents?.slice().sort((a, b) => {
//     const multiplier = sortConfig.direction === "asc" ? 1 : -1;
    
//     switch (sortConfig.key) {
//       case "name":
//         return multiplier * a.student.name.localeCompare(b.student.name);
//       case "score":
//         return multiplier * (a.score - b.score);
//       case "rank":
//         return multiplier * (a.rank - b.rank);
//       case "percentage":
//         return multiplier * (parseFloat(a.percentage) - parseFloat(b.percentage));
//       case "timeTaken":
//         return multiplier * (a.timeTaken - b.timeTaken);
//       default:
//         return 0;
//     }
//   });

//   const filteredStudents = sortedStudents?.filter(student => {
//     const matchesSearch = 
//       student.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       student.student.enrollmentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       student.student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesStatus = 
//       filterStatus === "all" ||
//       (filterStatus === "passed" && student.passed) ||
//       (filterStatus === "failed" && !student.passed);
    
//     return matchesSearch && matchesStatus;
//   });

//   const performanceColors = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#6B7280"];
//   const departmentColors = ["#8B5CF6", "#EC4899", "#10B981", "#F59E0B", "#3B82F6"];

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="spinner"></div>
//         <p className="loading-text">Loading Analytics Dashboard...</p>
//       </div>
//     );
//   }

//   if (!data) return <div className="error-container">No data found</div>;

//   return (
//     <div className="analytics-container">
//       {/* Header */}
//       <div className="analytics-header">
//         <div className="header-content">
//           <div className="breadcrumb">
//             <span>Dashboard</span>
//             <FaChevronRight className="breadcrumb-icon" />
//             <span>Quizzes</span>
//             <FaChevronRight className="breadcrumb-icon" />
//             <span>Analytics</span>
//           </div>
//           <h1 className="page-title">{data.quiz.title}</h1>
//           <p className="page-subtitle">Quiz Performance Analytics & Insights</p>
          
//           <div className="quiz-metadata">
//             <div className="metadata-grid">
//               <div className="metadata-item">
//                 <span className="metadata-label">Subject</span>
//                 <span className="metadata-value">{data.quiz.subject}</span>
//               </div>
//               <div className="metadata-item">
//                 <span className="metadata-label">Total Marks</span>
//                 <span className="metadata-value">{data.quiz.totalMarks}</span>
//               </div>
//               <div className="metadata-item">
//                 <span className="metadata-label">Passing Marks</span>
//                 <span className="metadata-value">{data.quiz.passingMarks}</span>
//               </div>
//               <div className="metadata-item">
//                 <span className="metadata-label">Duration</span>
//                 <span className="metadata-value">{data.quiz.durationMinutes} min</span>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="header-actions">
//           <button className="btn-action btn-secondary">
//             <FaDownload /> Export CSV
//           </button>
//           <button className="btn-action btn-primary">
//             <FaChartPie /> Generate Report
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="stats-grid">
//         <div className="stat-card stat-primary">
//           <div className="stat-icon">
//             <FaUsers />
//           </div>
//           <div className="stat-content">
//             <h3>{data.attemptedCount}</h3>
//             <p>Total Attempts</p>
//             <span className="stat-trend">
//               <FiTrendingUp /> 100% participation
//             </span>
//           </div>
//         </div>
        
//         <div className="stat-card stat-success">
//           <div className="stat-icon">
//             <FaPercent />
//           </div>
//           <div className="stat-content">
//             <h3>{data.analytics.averageScore.toFixed(1)}</h3>
//             <p>Average Score</p>
//             <span className="stat-trend">
//               <FiTrendingUp /> {data.analytics.passingRate.toFixed(1)}% pass rate
//             </span>
//           </div>
//         </div>
        
//         <div className="stat-card stat-warning">
//           <div className="stat-icon">
//             <FaTrophy />
//           </div>
//           <div className="stat-content">
//             <h3>{data.analytics.highestScore}</h3>
//             <p>Highest Score</p>
//             <span className="stat-trend">
//               <FiTrendingUp /> Top performer
//             </span>
//           </div>
//         </div>
        
//         <div className="stat-card stat-info">
//           <div className="stat-icon">
//             <GiDuration />
//           </div>
//           <div className="stat-content">
//             <h3>{Math.floor(data.analytics.timeStats.averageTime / 60)}:{(data.analytics.timeStats.averageTime % 60).toString().padStart(2, '0')}</h3>
//             <p>Avg. Time Taken</p>
//             <span className="stat-trend">
//               <FaClock /> Time efficiency
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Tabs Navigation */}
//       <div className="tabs-container">
//         <div className="tabs-header">
//           <h2 className="tabs-title">Analytics Dashboard</h2>
//           <div className="tabs-actions">
//             <span className="last-updated">
//               Last updated: {new Date().toLocaleTimeString()}
//             </span>
//           </div>
//         </div>
//         <div className="tabs">
//           <button
//             className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
//             onClick={() => setActiveTab("overview")}
//           >
//             <FaChartBar /> Overview
//           </button>
//           <button
//             className={`tab-btn ${activeTab === "students" ? "active" : ""}`}
//             onClick={() => setActiveTab("students")}
//           >
//             <FaUserGraduate /> Students ({data.attemptedCount})
//           </button>
//           <button
//             className={`tab-btn ${activeTab === "analytics" ? "active" : ""}`}
//             onClick={() => setActiveTab("analytics")}
//           >
//             <FiBarChart2 /> Deep Analytics
//           </button>
//           <button
//             className={`tab-btn ${activeTab === "performance" ? "active" : ""}`}
//             onClick={() => setActiveTab("performance")}
//           >
//             <FaChartLine /> Performance
//           </button>
//         </div>
//       </div>

//       {/* Tab Content */}
//       <div className="tab-content">
//         {activeTab === "overview" && (
//           <div className="overview-grid">
//             {/* Performance Distribution */}
//             <div className="chart-card">
//               <div className="chart-header">
//                 <h3><FaChartPie /> Performance Distribution</h3>
//                 <div className="chart-legend">
//                   {Object.entries(data.analytics.performanceDistribution).map(([key, value], index) => (
//                     <div key={key} className="legend-item">
//                       <span className="legend-color" style={{ backgroundColor: performanceColors[index] }}></span>
//                       <span className="legend-label">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
//                       <span className="legend-value">({value})</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie
//                     data={Object.entries(data.analytics.performanceDistribution).map(([key, value], index) => ({
//                       name: key.charAt(0).toUpperCase() + key.slice(1),
//                       value,
//                       color: performanceColors[index]
//                     }))}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={60}
//                     outerRadius={80}
//                     paddingAngle={2}
//                     dataKey="value"
//                   >
//                     {Object.entries(data.analytics.performanceDistribution).map((_, index) => (
//                       <Cell key={`cell-${index}`} fill={performanceColors[index]} stroke="#fff" strokeWidth={2} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Score Distribution */}
//             <div className="chart-card">
//               <div className="chart-header">
//                 <h3><FaChartBar /> Score Distribution</h3>
//               </div>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={data.chartData.scores.map((score, index) => ({ score, rank: index + 1 }))}>
//                   <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                   <XAxis dataKey="rank" name="Rank" />
//                   <YAxis />
//                   <Tooltip 
//                     formatter={(value) => [`${value} marks`, 'Score']}
//                     labelFormatter={(label) => `Rank #${label}`}
//                   />
//                   <Bar 
//                     dataKey="score" 
//                     fill="#3B82F6" 
//                     radius={[4, 4, 0, 0]}
//                     name="Score"
//                   />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Department Distribution */}
//             <div className="chart-card">
//               <div className="chart-header">
//                 <h3><FaUniversity /> Department Distribution</h3>
//               </div>
//               <div className="department-list">
//                 {data.chartData.departmentDistribution.map((dept, index) => (
//                   <div key={dept.name} className="department-item">
//                     <div className="dept-info">
//                       <span className="dept-name">{dept.name}</span>
//                       <span className="dept-count">{dept.value} students</span>
//                     </div>
//                     <div className="dept-bar-container">
//                       <div 
//                         className="dept-bar" 
//                         style={{ 
//                           width: `${(dept.value / data.attemptedCount) * 100}%`,
//                           backgroundColor: departmentColors[index % departmentColors.length]
//                         }}
//                       ></div>
//                     </div>
//                     <span className="dept-percentage">
//                       {((dept.value / data.attemptedCount) * 100).toFixed(1)}%
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Time Analysis */}
//             <div className="chart-card">
//               <div className="chart-header">
//                 <h3><FaClock /> Time Analysis</h3>
//               </div>
//               <div className="time-stats-grid">
//                 <div className="time-stat">
//                   <div className="time-stat-icon fastest">
//                     <FaTrophy />
//                   </div>
//                   <div className="time-stat-content">
//                     <span className="time-label">Fastest</span>
//                     <span className="time-value">
//                       {Math.floor(data.analytics.timeStats.fastestTime / 60)}:
//                       {(data.analytics.timeStats.fastestTime % 60).toString().padStart(2, '0')}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="time-stat">
//                   <div className="time-stat-icon average">
//                     <FaChartBar />
//                   </div>
//                   <div className="time-stat-content">
//                     <span className="time-label">Average</span>
//                     <span className="time-value">
//                       {Math.floor(data.analytics.timeStats.averageTime / 60)}:
//                       {(data.analytics.timeStats.averageTime % 60).toString().padStart(2, '0')}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="time-stat">
//                   <div className="time-stat-icon slowest">
//                     <FaClock />
//                   </div>
//                   <div className="time-stat-content">
//                     <span className="time-label">Slowest</span>
//                     <span className="time-value">
//                       {Math.floor(data.analytics.timeStats.slowestTime / 60)}:
//                       {(data.analytics.timeStats.slowestTime % 60).toString().padStart(2, '0')}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <ResponsiveContainer width="100%" height={200}>
//                 <AreaChart data={data.chartData.times.map((time, index) => ({ time, rank: index + 1 }))}>
//                   <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                   <XAxis dataKey="rank" />
//                   <YAxis />
//                   <Tooltip 
//                     formatter={(value) => [`${Math.floor(value / 60)}:${(value % 60).toString().padStart(2, '0')}`, 'Time Taken']}
//                     labelFormatter={(label) => `Rank #${label}`}
//                   />
//                   <Area 
//                     type="monotone" 
//                     dataKey="time" 
//                     stroke="#10B981" 
//                     fill="#10B981" 
//                     fillOpacity={0.1}
//                     strokeWidth={2}
//                   />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         )}

//         {activeTab === "students" && (
//           <div className="students-container">
//             {/* Table Controls */}
//             <div className="table-controls">
//               <div className="controls-left">
//                 <div className="search-container">
//                   <FaFilter className="search-icon" />
//                   <input
//                     type="text"
//                     placeholder="Search students by name, enrollment, or email..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="search-input"
//                   />
//                   {searchTerm && (
//                     <button className="clear-search" onClick={() => setSearchTerm("")}>
//                       ×
//                     </button>
//                   )}
//                 </div>
                
//                 <div className="filter-buttons">
//                   <button 
//                     className={`filter-btn ${filterStatus === "all" ? "active" : ""}`}
//                     onClick={() => setFilterStatus("all")}
//                   >
//                     All ({data.attemptedCount})
//                   </button>
//                   <button 
//                     className={`filter-btn ${filterStatus === "passed" ? "active" : ""}`}
//                     onClick={() => setFilterStatus("passed")}
//                   >
//                     <FaCheckCircle /> Passed ({data.attemptedStudents.filter(s => s.passed).length})
//                   </button>
//                   <button 
//                     className={`filter-btn ${filterStatus === "failed" ? "active" : ""}`}
//                     onClick={() => setFilterStatus("failed")}
//                   >
//                     <FaTimesCircle /> Failed ({data.attemptedStudents.filter(s => !s.passed).length})
//                   </button>
//                 </div>
//               </div>
              
//               <div className="controls-right">
//                 <div className="sort-info">
//                   Sorted by: <strong>{sortConfig.key}</strong> ({sortConfig.direction})
//                 </div>
//                 <div className="results-count">
//                   Showing {filteredStudents?.length || 0} of {data.attemptedCount} students
//                 </div>
//               </div>
//             </div>

//             {/* Enhanced Students Table */}
//             <div className="students-table-container">
//               <div className="table-wrapper">
//                 <table className="students-table">
//                   <thead>
//                     <tr>
//                       <th className="rank-col" onClick={() => handleSort("rank")}>
//                         <div className="th-content">
//                           Rank
//                           <FaSort className="sort-icon" />
//                         </div>
//                       </th>
//                       <th className="student-col">
//                         <div className="th-content">
//                           Student
//                         </div>
//                       </th>
//                       <th className="academic-col">
//                         <div className="th-content">
//                           Academic Info
//                         </div>
//                       </th>
//                       <th className="score-col" onClick={() => handleSort("score")}>
//                         <div className="th-content">
//                           Score
//                           <FaSort className="sort-icon" />
//                         </div>
//                       </th>
//                       <th className="performance-col" onClick={() => handleSort("percentage")}>
//                         <div className="th-content">
//                           Performance
//                           <FaSort className="sort-icon" />
//                         </div>
//                       </th>
//                       <th className="time-col" onClick={() => handleSort("timeTaken")}>
//                         <div className="th-content">
//                           Time
//                           <FaSort className="sort-icon" />
//                         </div>
//                       </th>
//                       <th className="status-col">
//                         <div className="th-content">
//                           Status
//                         </div>
//                       </th>
//                       <th className="actions-col">
//                         <div className="th-content">
//                           Actions
//                         </div>
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredStudents?.map((student) => {
//                       const performanceColor = getPerformanceColor(parseFloat(student.percentage));
//                       const performanceLabel = getPerformanceLabel(parseFloat(student.percentage));
                      
//                       return (
//                         <tr key={student.attemptId} className={student.passed ? "row-passed" : "row-failed"}>
//                           {/* Rank Column */}
//                           <td className="rank-cell">
//                             <div className={`rank-badge rank-${student.rank}`}>
//                               {student.rank <= 3 ? (
//                                 <>
//                                   <FaCrown className="crown-icon" />
//                                   <span>#{student.rank}</span>
//                                 </>
//                               ) : (
//                                 <span>#{student.rank}</span>
//                               )}
//                             </div>
//                           </td>
                          
//                           {/* Student Column */}
//                           <td className="student-cell">
//                             <div className="student-info-compact">
//                               <div className="student-avatar">
//                                 {student.student.name.charAt(0).toUpperCase()}
//                               </div>
//                               <div className="student-details">
//                                 <div className="student-name">
//                                   {student.student.name}
//                                   {student.rank === 1 && <FaStar className="top-performer-icon" />}
//                                 </div>
//                                 <div className="student-enrollment">
//                                   {student.student.enrollmentNumber}
//                                 </div>
//                                 <div className="student-email">
//                                   {student.student.email}
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
                          
//                           {/* Academic Info Column */}
//                           <td className="academic-cell">
//                             <div className="academic-info">
//                               <div className="academic-item">
//                                 <FaUniversity className="academic-icon" />
//                                 <span>{student.student.department}</span>
//                               </div>
//                               <div className="academic-item">
//                                 <FaBookOpen className="academic-icon" />
//                                 <span>{student.student.course} - Sem {student.student.semester}</span>
//                               </div>
//                               <div className="academic-item">
//                                 <FaUserGraduate className="academic-icon" />
//                                 <span>Group {student.student.group}</span>
//                               </div>
//                             </div>
//                           </td>
                          
//                           {/* Score Column */}
//                           <td className="score-cell">
//                             <div className="score-display">
//                               <div className="score-main">
//                                 <span className="score-value">{student.score}</span>
//                                 <span className="score-divider">/</span>
//                                 <span className="score-total">{student.totalMarks}</span>
//                               </div>
//                               <div className="score-progress">
//                                 <div className="score-bar">
//                                   <div 
//                                     className="score-fill" 
//                                     style={{ width: `${student.percentage}%`, backgroundColor: performanceColor }}
//                                   ></div>
//                                 </div>
//                                 <div className="score-labels">
//                                   <span className="passing-label">Pass: {student.passingMarks}</span>
//                                   <span className="percentage-label">{student.percentage}%</span>
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
                          
//                           {/* Performance Column */}
//                           <td className="performance-cell">
//                             <div className="performance-indicator" style={{ borderColor: performanceColor }}>
//                               <div 
//                                 className="performance-circle" 
//                                 style={{ 
//                                   backgroundColor: performanceColor,
//                                   width: `${Math.min(parseFloat(student.percentage), 100)}%`
//                                 }}
//                               ></div>
//                               <span className="performance-label">{performanceLabel}</span>
//                             </div>
//                             <div className="performance-stats">
//                               <div className="stat-item">
//                                 <span className="stat-label">Correct:</span>
//                                 <span className="stat-value correct">{student.correctCount}</span>
//                               </div>
//                               <div className="stat-item">
//                                 <span className="stat-label">Wrong:</span>
//                                 <span className="stat-value wrong">{student.wrongCount}</span>
//                               </div>
//                             </div>
//                           </td>
                          
//                           {/* Time Column */}
//                           <td className="time-cell">
//                             <div className="time-display">
//                               <FaClock className="time-icon" />
//                               <div className="time-details">
//                                 <div className="time-value">
//                                   {Math.floor(student.timeTaken / 60)}:
//                                   {(student.timeTaken % 60).toString().padStart(2, '0')}
//                                 </div>
//                                 <div className="time-label">min:sec</div>
//                               </div>
//                             </div>
//                           </td>
                          
//                           {/* Status Column */}
//                           <td className="status-cell">
//                             <div className={`status-indicator ${student.passed ? "status-passed" : "status-failed"}`}>
//                               {student.passed ? (
//                                 <>
//                                   <FaCheckCircle className="status-icon" />
//                                   <span>Passed</span>
//                                 </>
//                               ) : (
//                                 <>
//                                   <FaTimesCircle className="status-icon" />
//                                   <span>Failed</span>
//                                 </>
//                               )}
//                             </div>
//                             <div className="attempt-date">
//                               <FaCalendarAlt className="date-icon" />
//                               {new Date(student.attemptedAt).toLocaleDateString()}
//                             </div>
//                           </td>
                          
//                           {/* Actions Column */}
//                           <td className="actions-cell">
//                             <button
//                               className="btn-view-details"
//                               onClick={() => setSelectedStudent(student)}
//                             >
//                               <FaEye className="view-icon" />
//                               <span>View Details</span>
//                             </button>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
                
//                 {filteredStudents?.length === 0 && (
//                   <div className="no-results">
//                     <FaUserGraduate className="no-results-icon" />
//                     <h3>No students found</h3>
//                     <p>Try adjusting your search or filter criteria</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === "analytics" && (
//           <div className="analytics-grid">
//             {/* Detailed Analytics */}
//             <div className="analytics-card">
//               <h3><FaChartBar /> Detailed Statistics</h3>
//               <div className="analytics-stats">
//                 <div className="stat-row">
//                   <span>Total Attempts</span>
//                   <strong>{data.analytics.totalAttempts}</strong>
//                 </div>
//                 <div className="stat-row">
//                   <span>Average Score</span>
//                   <strong>{data.analytics.averageScore.toFixed(2)}</strong>
//                 </div>
//                 <div className="stat-row">
//                   <span>Highest Score</span>
//                   <strong>{data.analytics.highestScore}</strong>
//                 </div>
//                 <div className="stat-row">
//                   <span>Lowest Score</span>
//                   <strong>{data.analytics.lowestScore}</strong>
//                 </div>
//                 <div className="stat-row highlight">
//                   <span>Passing Rate</span>
//                   <strong className={data.analytics.passingRate >= 50 ? "success" : "danger"}>
//                     {data.analytics.passingRate.toFixed(1)}%
//                   </strong>
//                 </div>
//               </div>
//             </div>

//             {/* Department Analysis */}
//             <div className="analytics-card">
//               <h3><FaUniversity /> Department Analysis</h3>
//               <div className="dept-analysis">
//                 {Object.entries(data.analytics.departmentStats).map(([dept, count]) => (
//                   <div key={dept} className="dept-item">
//                     <span className="dept-name">{dept}</span>
//                     <div className="dept-bar">
//                       <div 
//                         className="dept-fill" 
//                         style={{ 
//                           width: `${(count / data.attemptedCount) * 100}%`,
//                           backgroundColor: departmentColors[Object.keys(data.analytics.departmentStats).indexOf(dept) % departmentColors.length]
//                         }}
//                       ></div>
//                     </div>
//                     <span className="dept-count">{count} students</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Performance Insights */}
//             <div className="analytics-card full-width">
//               <h3><FaChartLine /> Performance Insights</h3>
//               <div className="insights-grid">
//                 <div className="insight-item excellent">
//                   <div className="insight-icon">
//                     <FaTrophy />
//                   </div>
//                   <div className="insight-content">
//                     <h4>Excellent (90-100%)</h4>
//                     <p>{data.analytics.performanceDistribution.excellent} students</p>
//                     <div className="insight-percentage">
//                       {((data.analytics.performanceDistribution.excellent / data.attemptedCount) * 100).toFixed(1)}%
//                     </div>
//                   </div>
//                 </div>
//                 <div className="insight-item good">
//                   <div className="insight-icon">
//                     <FaChartBar />
//                   </div>
//                   <div className="insight-content">
//                     <h4>Good (75-89%)</h4>
//                     <p>{data.analytics.performanceDistribution.good} students</p>
//                     <div className="insight-percentage">
//                       {((data.analytics.performanceDistribution.good / data.attemptedCount) * 100).toFixed(1)}%
//                     </div>
//                   </div>
//                 </div>
//                 <div className="insight-item average">
//                   <div className="insight-icon">
//                     <FaPercent />
//                   </div>
//                   <div className="insight-content">
//                     <h4>Average (50-74%)</h4>
//                     <p>{data.analytics.performanceDistribution.average} students</p>
//                     <div className="insight-percentage">
//                       {((data.analytics.performanceDistribution.average / data.attemptedCount) * 100).toFixed(1)}%
//                     </div>
//                   </div>
//                 </div>
//                 <div className="insight-item poor">
//                   <div className="insight-icon">
//                     <FaClock />
//                   </div>
//                   <div className="insight-content">
//                     <h4>Poor (25-49%)</h4>
//                     <p>{data.analytics.performanceDistribution.poor} students</p>
//                     <div className="insight-percentage">
//                       {((data.analytics.performanceDistribution.poor / data.attemptedCount) * 100).toFixed(1)}%
//                     </div>
//                   </div>
//                 </div>
//                 <div className="insight-item fail">
//                   <div className="insight-icon">
//                     <FaChartLine />
//                   </div>
//                   <div className="insight-content">
//                     <h4>Fail (0-24%)</h4>
//                     <p>{data.analytics.performanceDistribution.fail} students</p>
//                     <div className="insight-percentage">
//                       {((data.analytics.performanceDistribution.fail / data.attemptedCount) * 100).toFixed(1)}%
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === "performance" && (
//           <div className="performance-container">
//             <div className="performance-chart">
//               <h3>Score vs Time Taken Analysis</h3>
//               <ResponsiveContainer width="100%" height={400}>
//                 <ScatterChart>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis type="number" dataKey="score" name="Score" label={{ value: 'Score', position: 'insideBottom', offset: -5 }} />
//                   <YAxis type="number" dataKey="timeTaken" name="Time Taken" label={{ value: 'Time Taken (seconds)', angle: -90, position: 'insideLeft' }} />
//                   <Tooltip 
//                     cursor={{ strokeDasharray: '3 3' }}
//                     formatter={(value, name) => {
//                       if (name === 'Score') return [value, 'Score'];
//                       if (name === 'Time Taken') return [`${Math.floor(value / 60)}:${(value % 60).toString().padStart(2, '0')}`, 'Time Taken'];
//                       return value;
//                     }}
//                   />
//                   <Scatter 
//                     name="Students" 
//                     data={data.attemptedStudents} 
//                     fill="#8884d8"
//                     shape={(props) => {
//                       const { cx, cy, payload } = props;
//                       const percentage = parseFloat(payload.percentage);
//                       const color = getPerformanceColor(percentage);
//                       return <circle cx={cx} cy={cy} r={6} fill={color} stroke="#fff" strokeWidth={2} />;
//                     }}
//                   />
//                 </ScatterChart>
//               </ResponsiveContainer>
//             </div>
            
//             <div className="comparison-grid">
//               <div className="comparison-card">
//                 <h4>Top 5 Performers</h4>
//                 {/* <ul className="top-performers">
//                   {data.attemptedStudents.slice(0, 5).map((student, index) => (
//                     <li key={student.attemptId}>
//                       <div className="top-performer-rank">
//                         <span className={`rank-badge-small rank-${index + 1}`}>
//                           #{index + 1}
//                         </span>
//                       </div>
//                       <div className="top-performer-info">
//                         <div className="top-performer-name">{student.student.name}</div>
//                         <div className="top-performer-score">
//                           <span className="score-value">{student.score}</span>
//                           <span className="score-percentage">({student.percentage}%)</span>
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul> */}
//               </div>

//               <div className="comparison-grid">
//   <div className="comparison-card premium-card">
//     <div className="comparison-card-header">
//       <div className="header-icon">
//         <FaTrophy className="trophy-icon" />
//       </div>
//       <div className="header-content">
//         <h4 className="comparison-title">Top 5 Performers</h4>
//         <p className="comparison-subtitle">Leading performers in this quiz</p>
//       </div>
//       <div className="header-badge">
//         <span className="badge-premium">PREMIUM</span>
//       </div>
//     </div>
    
//     <div className="top-performers-container">
//       <div className="performers-table-header">
//         <div className="header-rank">Rank</div>
//         <div className="header-student">Student</div>
//         <div className="header-score">Score</div>
//         <div className="header-performance">Performance</div>
//       </div>
      
//       <div className="performers-list">
//         {data.attemptedStudents.slice(0, 5).map((student, index) => {
//           const percentage = parseFloat(student.percentage);
//           const performanceColor = getPerformanceColor(percentage);
//           const performanceLabel = getPerformanceLabel(percentage);
          
//           return (
//             <div key={student.attemptId} className="performer-card">
//               {/* Rank Column */}
//               <div className="performer-rank">
//                 <div className={`rank-medal rank-${index + 1}`}>
//                   {index === 0 && <div className="gold-shine"></div>}
//                   {index === 1 && <div className="silver-shine"></div>}
//                   {index === 2 && <div className="bronze-shine"></div>}
//                   <span className="rank-number">#{index + 1}</span>
//                   {index <= 2 && (
//                     <div className="medal-icon">
//                       <FaMedal className="medal-svg" />
//                     </div>
//                   )}
//                 </div>
//               </div>
              
//               {/* Student Column */}
//               <div className="performer-info">
//                 <div className="performer-avatar">
//                   <div className="avatar-circle">
//                     {student.student.name.charAt(0).toUpperCase()}
//                     {index === 0 && <div className="crown-badge"><FaCrown /></div>}
//                   </div>
//                   <div className="performer-details">
//                     <h5 className="performer-name">{student.student.name}</h5>
//                     <div className="performer-meta">
//                       <span className="enrollment">{student.student.enrollmentNumber}</span>
//                       <span className="separator">•</span>
//                       <span className="department">{student.student.department}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Score Column */}
//               <div className="performer-score">
//                 <div className="score-display-compact">
//                   <div className="score-main-compact">
//                     <span className="score-value-large">{student.score}</span>
//                     <span className="score-divider">/</span>
//                     <span className="score-total-compact">{student.totalMarks}</span>
//                   </div>
//                   <div className="score-progress-mini">
//                     <div className="progress-bar-mini">
//                       <div 
//                         className="progress-fill-mini" 
//                         style={{ 
//                           width: `${percentage}%`,
//                           background: `linear-gradient(90deg, ${performanceColor} 0%, ${performanceColor}88 100%)`
//                         }}
//                       >
//                         <div className="progress-glow"></div>
//                       </div>
//                     </div>
//                     <div className="passing-indicator" style={{ left: `${(student.passingMarks / student.totalMarks) * 100}%` }}>
//                       <div className="indicator-line"></div>
//                       <div className="indicator-label">Pass</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Performance Column */}
//               <div className="performer-performance">
//                 <div className="performance-badge-compact" style={{ backgroundColor: `${performanceColor}15`, borderColor: performanceColor }}>
//                   <div className="performance-dot" style={{ backgroundColor: performanceColor }}></div>
//                   <span className="performance-label-compact">{performanceLabel}</span>
//                   <span className="performance-percentage">{student.percentage}%</span>
//                 </div>
//                 <div className="performance-stats-mini">
//                   <div className="stat-mini">
//                     <FaCheckCircle className="stat-icon-correct" />
//                     <span className="stat-value-mini">{student.correctCount}</span>
//                   </div>
//                   <div className="stat-mini">
//                     <FaTimesCircle className="stat-icon-wrong" />
//                     <span className="stat-value-mini">{student.wrongCount}</span>
//                   </div>
//                   <div className="stat-mini">
//                     <FaClock className="stat-icon-time" />
//                     <span className="stat-value-mini">
//                       {Math.floor(student.timeTaken / 60)}:{(student.timeTaken % 60).toString().padStart(2, '0')}
//                     </span>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Action Column */}
//               <div className="performer-action">
//                 <button 
//                   className="btn-view-performer"
//                   onClick={() => setSelectedStudent(student)}
//                   title="View detailed performance"
//                 >
//                   <FaEye className="view-icon-small" />
//                   <span>View</span>
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
      
//       {/* Legend and Stats */}
//       <div className="performers-footer">
//         <div className="footer-stats">
//           <div className="footer-stat">
//             <div className="stat-label">Avg. Score</div>
//             <div className="stat-value">{data.analytics.averageScore.toFixed(1)}</div>
//           </div>
//           <div className="footer-stat">
//             <div className="stat-label">Highest</div>
//             <div className="stat-value">{data.analytics.highestScore}</div>
//           </div>
//           <div className="footer-stat">
//             <div className="stat-label">Top 5 Avg.</div>
//             <div className="stat-value">
//               {(
//                 data.attemptedStudents.slice(0, 5).reduce((sum, student) => sum + student.score, 0) / 
//                 Math.min(5, data.attemptedStudents.length)
//               ).toFixed(1)}
//             </div>
//           </div>
//         </div>
        
//         <div className="performance-legend">
//           <div className="legend-title">Performance Scale:</div>
//           <div className="legend-items">
//             <div className="legend-item">
//               <div className="legend-color excellent"></div>
//               <span>Excellent (90-100%)</span>
//             </div>
//             <div className="legend-item">
//               <div className="legend-color good"></div>
//               <span>Good (75-89%)</span>
//             </div>
//             <div className="legend-item">
//               <div className="legend-color average"></div>
//               <span>Average (50-74%)</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
              
//               <div className="comparison-card">
//                 <h4>Department Comparison</h4>
//                 <ResponsiveContainer width="100%" height={200}>
//                   <BarChart data={data.chartData.departmentDistribution}>
//                     <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="value" fill="#82ca9d" radius={[4, 4, 0, 0]} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Enhanced Student Detail Modal */}
//       {selectedStudent && (
//         <div className="modal-overlay" onClick={() => setSelectedStudent(null)}>
//           <div className="modal-content" onClick={e => e.stopPropagation()}>
//             <div className="modal-header">
//               <div className="modal-title-section">
//                 <h2>Student Performance Details</h2>
//                 <p className="modal-subtitle">Comprehensive analysis of student's quiz attempt</p>
//               </div>
//               <button className="close-btn" onClick={() => setSelectedStudent(null)}>
//                 ×
//               </button>
//             </div>
            
//             <div className="modal-body">
//               {/* Student Profile Header */}
//               <div className="student-profile-header">
//                 <div className="profile-avatar-section">
//                   <div className="profile-avatar-large">
//                     {selectedStudent.student.name.charAt(0).toUpperCase()}
//                   </div>
//                   <div className="profile-rank-badge">
//                     <FaCrown className="crown-icon" />
//                     <span>Rank #{selectedStudent.rank}</span>
//                   </div>
//                 </div>
                
//                 <div className="profile-info-section">
//                   <div className="profile-name-section">
//                     <h3>{selectedStudent.student.name}</h3>
//                     <div className="profile-enrollment">
//                       {selectedStudent.student.enrollmentNumber}
//                     </div>
//                   </div>
                  
//                   <div className="profile-status-section">
//                     <div className={`performance-badge ${selectedStudent.passed ? "passed" : "failed"}`}>
//                       {selectedStudent.passed ? (
//                         <>
//                           <FaCheckCircle className="status-icon" />
//                           <span>Passed</span>
//                         </>
//                       ) : (
//                         <>
//                           <FaTimesCircle className="status-icon" />
//                           <span>Failed</span>
//                         </>
//                       )}
//                     </div>
//                     <div className="performance-category" style={{ color: getPerformanceColor(parseFloat(selectedStudent.percentage)) }}>
//                       {getPerformanceLabel(parseFloat(selectedStudent.percentage))} Performance
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Performance Summary Cards */}
//               <div className="performance-summary-cards">
//                 <div className="summary-card score-card">
//                   <div className="summary-icon">
//                     <FaChartBar />
//                   </div>
//                   <div className="summary-content">
//                     <div className="summary-label">Quiz Score</div>
//                     <div className="summary-value">
//                       <span className="score-main">{selectedStudent.score}</span>
//                       <span className="score-divider">/</span>
//                       <span className="score-total">{selectedStudent.totalMarks}</span>
//                     </div>
//                     <div className="summary-percentage">
//                       {selectedStudent.percentage}%
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="summary-card accuracy-card">
//                   <div className="summary-icon">
//                     <FaPercent />
//                   </div>
//                   <div className="summary-content">
//                     <div className="summary-label">Accuracy</div>
//                     <div className="summary-value">
//                       {selectedStudent.correctCount + selectedStudent.wrongCount > 0 
//                         ? Math.round((selectedStudent.correctCount / (selectedStudent.correctCount + selectedStudent.wrongCount)) * 100)
//                         : 0}%
//                     </div>
//                     <div className="summary-detail">
//                       {selectedStudent.correctCount} correct • {selectedStudent.wrongCount} wrong
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="summary-card time-card">
//                   <div className="summary-icon">
//                     <FaClock />
//                   </div>
//                   <div className="summary-content">
//                     <div className="summary-label">Time Taken</div>
//                     <div className="summary-value">
//                       {Math.floor(selectedStudent.timeTaken / 60)}:
//                       {(selectedStudent.timeTaken % 60).toString().padStart(2, '0')}
//                     </div>
//                     <div className="summary-detail">
//                       {Math.round((selectedStudent.timeTaken / (data.quiz.durationMinutes * 60)) * 100)}% of total time
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="summary-card comparison-card">
//                   <div className="summary-icon">
//                     <FaChartLine />
//                   </div>
//                   <div className="summary-content">
//                     <div className="summary-label">Class Rank</div>
//                     <div className="summary-value rank-display">
//                       #{selectedStudent.rank}
//                     </div>
//                     <div className="summary-detail">
//                       Top {Math.round((selectedStudent.rank / data.attemptedCount) * 100)}% of class
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Detailed Information Grid */}
//               <div className="detailed-info-grid">
//                 {/* Personal Information */}
//                 <div className="info-section">
//                   <div className="section-header">
//                     <FaUserCircle className="section-icon" />
//                     <h4>Personal Information</h4>
//                   </div>
//                   <div className="section-content">
//                     <div className="info-row">
//                       <span className="info-label">Email Address</span>
//                       <span className="info-value">{selectedStudent.student.email}</span>
//                     </div>
//                     <div className="info-row">
//                       <span className="info-label">Mobile Number</span>
//                       <span className="info-value">{selectedStudent.student.mobileNumber}</span>
//                     </div>
//                     <div className="info-row">
//                       <span className="info-label">Gender</span>
//                       <span className="info-value">
//                         <FaVenusMars className="gender-icon" />
//                         {selectedStudent.student.gender}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Academic Information */}
//                 <div className="info-section">
//                   <div className="section-header">
//                     <FaUniversity className="section-icon" />
//                     <h4>Academic Information</h4>
//                   </div>
//                   <div className="section-content">
//                     <div className="info-row">
//                       <span className="info-label">Department</span>
//                       <span className="info-value">{selectedStudent.student.department}</span>
//                     </div>
//                     <div className="info-row">
//                       <span className="info-label">Course & Semester</span>
//                       <span className="info-value">{selectedStudent.student.course} - Semester {selectedStudent.student.semester}</span>
//                     </div>
//                     <div className="info-row">
//                       <span className="info-label">Group</span>
//                       <span className="info-value">{selectedStudent.student.group}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Quiz Attempt Details */}
//                 <div className="info-section">
//                   <div className="section-header">
//                     <FaCalendarAlt className="section-icon" />
//                     <h4>Attempt Details</h4>
//                   </div>
//                   <div className="section-content">
//                     <div className="info-row">
//                       <span className="info-label">Attempted On</span>
//                       <span className="info-value">
//                         {new Date(selectedStudent.attemptedAt).toLocaleDateString('en-US', {
//                           weekday: 'long',
//                           year: 'numeric',
//                           month: 'long',
//                           day: 'numeric'
//                         })}
//                       </span>
//                     </div>
//                     <div className="info-row">
//                       <span className="info-label">Attempt Time</span>
//                       <span className="info-value">
//                         {new Date(selectedStudent.attemptedAt).toLocaleTimeString()}
//                       </span>
//                     </div>
//                     <div className="info-row">
//                       <span className="info-label">Status</span>
//                       <span className={`info-value ${selectedStudent.passed ? "text-success" : "text-danger"}`}>
//                         {selectedStudent.passed ? "Completed Successfully" : "Needs Improvement"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Performance Analysis */}
//                 <div className="info-section">
//                   <div className="section-header">
//                     <FaChartLine className="section-icon" />
//                     <h4>Performance Analysis</h4>
//                   </div>
//                   <div className="section-content">
//                     <div className="info-row">
//                       <span className="info-label">Score vs Passing Marks</span>
//                       <div className="progress-comparison">
//                         <div className="progress-bar-container">
//                           <div className="progress-bar">
//                             <div 
//                               className="progress-fill score-progress" 
//                               style={{ width: `${(selectedStudent.score / selectedStudent.totalMarks) * 100}%` }}
//                             ></div>
//                           </div>
//                           <div className="progress-labels">
//                             <span>0</span>
//                             <span className="passing-mark" style={{ left: `${(selectedStudent.passingMarks / selectedStudent.totalMarks) * 100}%` }}>
//                               Pass: {selectedStudent.passingMarks}
//                             </span>
//                             <span>{selectedStudent.totalMarks}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="info-row">
//                       <span className="info-label">Performance Category</span>
//                       <span className="info-value performance-category-badge" style={{ backgroundColor: getPerformanceColor(parseFloat(selectedStudent.percentage)) }}>
//                         {getPerformanceLabel(parseFloat(selectedStudent.percentage))}
//                       </span>
//                     </div>
//                     <div className="info-row">
//                       <span className="info-label">Class Comparison</span>
//                       <span className="info-value">
//                         Better than {Math.round(((data.attemptedCount - selectedStudent.rank) / data.attemptedCount) * 100)}% of class
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="modal-footer">
//               <button className="btn-secondary" onClick={() => setSelectedStudent(null)}>
//                 Close
//               </button>
//               <button className="btn-primary">
//                 <FaDownload /> Download Detailed Report
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuizAttemptedStudents;

















import React, { useEffect, useState } from "react";
// import { FaShareAlt } from 'react-icons/fa';
import { FaSync, FaBook ,FaShareAlt} from "react-icons/fa";

import { useParams } from "react-router-dom";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line,
  AreaChart, Area, ScatterChart, Scatter
} from "recharts";
import {
  FaUserGraduate, FaChartBar, FaTable, FaUsers,
  FaTrophy, FaClock, FaPercent, FaCertificate,
  FaEye, FaDownload, FaFilter, FaSort, FaChartLine,
  FaChevronRight, FaUserCircle, FaCalendarAlt,
  FaBookOpen, FaUniversity, FaMobileAlt, FaEnvelope,
  FaVenusMars, FaCrown, FaCheckCircle, FaTimesCircle,
  FaStar, FaChartPie, FaMedal, FaArrowUp, FaFire,
  FaAward, FaChartArea, FaCaretUp, FaCaretDown,
  FaChevronDown, FaExternalLinkAlt, FaListOl
} from "react-icons/fa";
import { FiBarChart2, FiTrendingUp } from "react-icons/fi";
import { GiDuration, GiLaurelsTrophy } from "react-icons/gi";
import "./QuizAttemptedStudent.css";

const QuizAttemptedStudents = () => {
  const { quizId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "rank", direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [topPerformersSort, setTopPerformersSort] = useState({ key: "rank", direction: "asc" });

  useEffect(() => {
    fetchAttemptedStudents();
  }, []);

  const fetchAttemptedStudents = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/faculty/quiz/${quizId}/attempted-students`,
        { withCredentials: true }
      );
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleTopPerformersSort = (key) => {
    let direction = "asc";
    if (topPerformersSort.key === key && topPerformersSort.direction === "asc") {
      direction = "desc";
    }
    setTopPerformersSort({ key, direction });
  };

  const getPerformanceColor = (percentage) => {
    if (percentage >= 90) return "#10B981"; // Excellent - Green
    if (percentage >= 75) return "#3B82F6"; // Good - Blue
    if (percentage >= 50) return "#F59E0B"; // Average - Orange
    if (percentage >= 25) return "#EF4444"; // Poor - Red
    return "#6B7280"; // Fail - Gray
  };

  const getPerformanceLabel = (percentage) => {
    if (percentage >= 90) return "Excellent";
    if (percentage >= 75) return "Good";
    if (percentage >= 50) return "Average";
    if (percentage >= 25) return "Poor";
    return "Fail";
  };

  const sortedStudents = data?.attemptedStudents?.slice().sort((a, b) => {
    const multiplier = sortConfig.direction === "asc" ? 1 : -1;
    
    switch (sortConfig.key) {
      case "name":
        return multiplier * a.student.name.localeCompare(b.student.name);
      case "score":
        return multiplier * (a.score - b.score);
      case "rank":
        return multiplier * (a.rank - b.rank);
      case "percentage":
        return multiplier * (parseFloat(a.percentage) - parseFloat(b.percentage));
      case "timeTaken":
        return multiplier * (a.timeTaken - b.timeTaken);
      default:
        return 0;
    }
  });

  const filteredStudents = sortedStudents?.filter(student => {
    const matchesSearch = 
      student.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.student.enrollmentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      filterStatus === "all" ||
      (filterStatus === "passed" && student.passed) ||
      (filterStatus === "failed" && !student.passed);
    
    return matchesSearch && matchesStatus;
  });

  // Sort Top 5 Performers
  const sortedTopPerformers = data?.attemptedStudents?.slice().sort((a, b) => {
    const multiplier = topPerformersSort.direction === "asc" ? 1 : -1;
    
    switch (topPerformersSort.key) {
      case "rank":
        return multiplier * (a.rank - b.rank);
      case "score":
        return multiplier * (a.score - b.score);
      case "percentage":
        return multiplier * (parseFloat(a.percentage) - parseFloat(b.percentage));
      case "timeTaken":
        return multiplier * (a.timeTaken - b.timeTaken);
      default:
        return multiplier * (a.rank - b.rank);
    }
  }).slice(0, 5);

  const performanceColors = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#6B7280"];
  const departmentColors = ["#8B5CF6", "#EC4899", "#10B981", "#F59E0B", "#3B82F6"];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading Analytics Dashboard...</p>
      </div>
    );
  }

  if (!data) return <div className="error-container">Not Authrized</div>;

  return (
   <div className="analytics-container">
      {/* Header */}
      <div className="analytics-header">
        <div className="header-content">
          <div className="breadcrumb">
            <span>Dashboard</span>
            <FaChevronRight className="breadcrumb-icon" />
            <span>Quizzes</span>
            <FaChevronRight className="breadcrumb-icon" />
            <span>Analytics</span>
          </div>
          <h1 className="page-title">{data.quiz.title}</h1>
          <p className="page-subtitle">Quiz Performance Analytics & Insights</p>
          
          <div className="quiz-metadata">
            <div className="metadata-grid">
              <div className="metadata-item">
                <span className="metadata-label">Subject</span>
                <span className="metadata-value">{data.quiz.subject}</span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">Total Marks</span>
                <span className="metadata-value">{data.quiz.totalMarks}</span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">Passing Marks</span>
                <span className="metadata-value">{data.quiz.passingMarks}</span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">Duration</span>
                <span className="metadata-value">{data.quiz.durationMinutes} min</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="header-actions">
          <button className="btn-action btn-secondary">
            <FaDownload /> Export CSV
          </button>
          <button className="btn-action btn-primary">
            <FaChartPie /> Generate Report
          </button>
        </div>
      </div> 
        
      
  {/* Rest of your component remains the same... */}

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card stat-primary">
          <div className="stat-icon">
            <FaUsers />
          </div>
          <div className="stat-content">
            <h3>{data.attemptedCount}</h3>
            <p>Total Attempts</p>
            <span className="stat-trend">
              <FiTrendingUp /> 100% participation
            </span>
          </div>
        </div>
        
        <div className="stat-card stat-success">
          <div className="stat-icon">
            <FaPercent />
          </div>
          <div className="stat-content">
            <h3>{data.analytics.averageScore.toFixed(1)}</h3>
            <p>Average Score</p>
            <span className="stat-trend">
              <FiTrendingUp /> {data.analytics.passingRate.toFixed(1)}% pass rate
            </span>
          </div>
        </div>
        
        <div className="stat-card stat-warning">
          <div className="stat-icon">
            <FaTrophy />
          </div>
          <div className="stat-content">
            <h3>{data.analytics.highestScore}</h3>
            <p>Highest Score</p>
            <span className="stat-trend">
              <FiTrendingUp /> Top performer
            </span>
          </div>
        </div>
        
        <div className="stat-card stat-info">
          <div className="stat-icon">
            <GiDuration />
          </div>
          <div className="stat-content">
            <h3>{Math.floor(data.analytics.timeStats.averageTime / 60)}:{(data.analytics.timeStats.averageTime % 60).toString().padStart(2, '0')}</h3>
            <p>Avg. Time Taken</p>
            <span className="stat-trend">
              <FaClock /> Time efficiency
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="tabs-container">
        <div className="tabs-header">
          <h2 className="tabs-title">Analytics Dashboard</h2>
          <div className="tabs-actions">
            <span className="last-updated">
              Last updated: {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <FaChartBar /> Overview
          </button>
          <button
            className={`tab-btn ${activeTab === "students" ? "active" : ""}`}
            onClick={() => setActiveTab("students")}
          >
            <FaUserGraduate /> All Students ({data.attemptedCount})
          </button>
          <button
            className={`tab-btn ${activeTab === "topPerformers" ? "active" : ""}`}
            onClick={() => setActiveTab("topPerformers")}
          >
            <FaTrophy /> Top 5 Performers
          </button>
          <button
            className={`tab-btn ${activeTab === "analytics" ? "active" : ""}`}
            onClick={() => setActiveTab("analytics")}
          >
            <FiBarChart2 /> Deep Analytics
          </button>
          <button
            className={`tab-btn ${activeTab === "performance" ? "active" : ""}`}
            onClick={() => setActiveTab("performance")}
          >
            <FaChartLine /> Performance
          </button>
        </div>
      </div>


      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "overview" && (
          <div className="overview-grid">
            {/* Performance Distribution */}
            <div className="chart-card">
              <div className="chart-header">
                <h3><FaChartPie /> Performance Distribution</h3>
                <div className="chart-legend">
                  {Object.entries(data.analytics.performanceDistribution).map(([key, value], index) => (
                    <div key={key} className="legend-item">
                      <span className="legend-color" style={{ backgroundColor: performanceColors[index] }}></span>
                      <span className="legend-label">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                      <span className="legend-value">({value})</span>
                    </div>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={Object.entries(data.analytics.performanceDistribution).map(([key, value], index) => ({
                      name: key.charAt(0).toUpperCase() + key.slice(1),
                      value,
                      color: performanceColors[index]
                    }))}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {Object.entries(data.analytics.performanceDistribution).map((_, index) => (
                      <Cell key={`cell-${index}`} fill={performanceColors[index]} stroke="#fff" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Score Distribution */}
            <div className="chart-card">
              <div className="chart-header">
                <h3><FaChartBar /> Score Distribution</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.chartData.scores.map((score, index) => ({ score, rank: index + 1 }))}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="rank" name="Rank" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} marks`, 'Score']}
                    labelFormatter={(label) => `Rank #${label}`}
                  />
                  <Bar 
                    dataKey="score" 
                    fill="#3B82F6" 
                    radius={[4, 4, 0, 0]}
                    name="Score"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Department Distribution */}
            <div className="chart-card">
              <div className="chart-header">
                <h3><FaUniversity /> Department Distribution</h3>
              </div>
              <div className="department-list">
                {data.chartData.departmentDistribution.map((dept, index) => (
                  <div key={dept.name} className="department-item">
                    <div className="dept-info">
                      <span className="dept-name">{dept.name}</span>
                      <span className="dept-count">{dept.value} students</span>
                    </div>
                    <div className="dept-bar-container">
                      <div 
                        className="dept-bar" 
                        style={{ 
                          width: `${(dept.value / data.attemptedCount) * 100}%`,
                          backgroundColor: departmentColors[index % departmentColors.length]
                        }}
                      ></div>
                    </div>
                    <span className="dept-percentage">
                      {((dept.value / data.attemptedCount) * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Analysis */}
            <div className="chart-card">
              <div className="chart-header">
                <h3><FaClock /> Time Analysis</h3>
              </div>
              <div className="time-stats-grid">
                <div className="time-stat">
                  <div className="time-stat-icon fastest">
                    <FaTrophy />
                  </div>
                  <div className="time-stat-content">
                    <span className="time-label">Fastest</span>
                    <span className="time-value">
                      {Math.floor(data.analytics.timeStats.fastestTime / 60)}:
                      {(data.analytics.timeStats.fastestTime % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>
                <div className="time-stat">
                  <div className="time-stat-icon average">
                    <FaChartBar />
                  </div>
                  <div className="time-stat-content">
                    <span className="time-label">Average</span>
                    <span className="time-value">
                      {Math.floor(data.analytics.timeStats.averageTime / 60)}:
                      {(data.analytics.timeStats.averageTime % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>
                <div className="time-stat">
                  <div className="time-stat-icon slowest">
                    <FaClock />
                  </div>
                  <div className="time-stat-content">
                    <span className="time-label">Slowest</span>
                    <span className="time-value">
                      {Math.floor(data.analytics.timeStats.slowestTime / 60)}:
                      {(data.analytics.timeStats.slowestTime % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={data.chartData.times.map((time, index) => ({ time, rank: index + 1 }))}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="rank" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${Math.floor(value / 60)}:${(value % 60).toString().padStart(2, '0')}`, 'Time Taken']}
                    labelFormatter={(label) => `Rank #${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="time" 
                    stroke="#10B981" 
                    fill="#10B981" 
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === "students" && (
          <div className="students-container">
            {/* Table Controls */}
            <div className="table-controls">
              <div className="controls-left">
                <div className="search-container">
                  <FaFilter className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search students by name, enrollment, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  {searchTerm && (
                    <button className="clear-search" onClick={() => setSearchTerm("")}>
                      ×
                    </button>
                  )}
                </div>
                
                <div className="filter-buttons">
                  <button 
                    className={`filter-btn ${filterStatus === "all" ? "active" : ""}`}
                    onClick={() => setFilterStatus("all")}
                  >
                    All ({data.attemptedCount})
                  </button>
                  <button 
                    className={`filter-btn ${filterStatus === "passed" ? "active" : ""}`}
                    onClick={() => setFilterStatus("passed")}
                  >
                    <FaCheckCircle /> Passed ({data.attemptedStudents.filter(s => s.passed).length})
                  </button>
                  <button 
                    className={`filter-btn ${filterStatus === "failed" ? "active" : ""}`}
                    onClick={() => setFilterStatus("failed")}
                  >
                    <FaTimesCircle /> Failed ({data.attemptedStudents.filter(s => !s.passed).length})
                  </button>
                </div>
              </div>
              
              <div className="controls-right">
                <div className="sort-info">
                  Sorted by: <strong>{sortConfig.key}</strong> ({sortConfig.direction})
                </div>
                <div className="results-count">
                  Showing {filteredStudents?.length || 0} of {data.attemptedCount} students
                </div>
              </div>
            </div>

            {/* Enhanced Students Table */}
            <div className="students-table-container">
              <div className="table-wrapper">
                <table className="students-table">
                  <thead>
                    <tr>
                      <th className="rank-col" onClick={() => handleSort("rank")}>
                        <div className="th-content">
                          Rank
                          <FaSort className="sort-icon" />
                        </div>
                      </th>
                      <th className="student-col">
                        <div className="th-content">
                          Student
                        </div>
                      </th>
                      <th className="academic-col">
                        <div className="th-content">
                          Academic Info
                        </div>
                      </th>
                      <th className="score-col" onClick={() => handleSort("score")}>
                        <div className="th-content">
                          Score
                          <FaSort className="sort-icon" />
                        </div>
                      </th>
                      <th className="performance-col" onClick={() => handleSort("percentage")}>
                        <div className="th-content">
                          Performance
                          <FaSort className="sort-icon" />
                        </div>
                      </th>
                      <th className="time-col" onClick={() => handleSort("timeTaken")}>
                        <div className="th-content">
                          Time
                          <FaSort className="sort-icon" />
                        </div>
                      </th>
                      <th className="status-col">
                        <div className="th-content">
                          Status
                        </div>
                      </th>
                      <th className="actions-col">
                        <div className="th-content">
                          Actions
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents?.map((student) => {
                      const performanceColor = getPerformanceColor(parseFloat(student.percentage));
                      const performanceLabel = getPerformanceLabel(parseFloat(student.percentage));
                      
                      return (
                        <tr key={student.attemptId} className={student.passed ? "row-passed" : "row-failed"}>
                          {/* Rank Column */}
                          <td className="rank-cell">
                            <div className={`rank-badge rank-${student.rank}`}>
                              {student.rank <= 3 ? (
                                <>
                                  <FaCrown className="crown-icon" />
                                  <span>#{student.rank}</span>
                                </>
                              ) : (
                                <span>#{student.rank}</span>
                              )}
                            </div>
                          </td>
                          
                          {/* Student Column */}
                          <td className="student-cell">
                            <div className="student-info-compact">
                              <div className="student-avatar">
                                {student.student.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="student-details">
                                <div className="student-name">
                                  {student.student.name}
                                  {student.rank === 1 && <FaStar className="top-performer-icon" />}
                                </div>
                                <div className="student-enrollment">
                                  {student.student.enrollmentNumber}
                                </div>
                                <div className="student-email">
                                  {student.student.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          
                          {/* Academic Info Column */}
                          <td className="academic-cell">
                            <div className="academic-info">
                              <div className="academic-item">
                                <FaUniversity className="academic-icon" />
                                <span>{student.student.department}</span>
                              </div>
                              <div className="academic-item">
                                <FaBookOpen className="academic-icon" />
                                <span>{student.student.course} - Sem {student.student.semester}</span>
                              </div>
                              <div className="academic-item">
                                <FaUserGraduate className="academic-icon" />
                                <span>Group {student.student.group}</span>
                              </div>
                            </div>
                          </td>
                          
                          {/* Score Column */}
                          <td className="score-cell">
                            <div className="score-display">
                              <div className="score-main">
                                <span className="score-value">{student.score}</span>
                                <span className="score-divider">/</span>
                                <span className="score-total">{student.totalMarks}</span>
                              </div>
                              <div className="score-progress">
                                <div className="score-bar">
                                  <div 
                                    className="score-fill" 
                                    style={{ width: `${student.percentage}%`, backgroundColor: performanceColor }}
                                  ></div>
                                </div>
                                <div className="score-labels">
                                  <span className="passing-label">Pass: {student.passingMarks}</span>
                                  <span className="percentage-label">{student.percentage}%</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          
                          {/* Performance Column */}
                          <td className="performance-cell">
                            <div className="performance-indicator" style={{ borderColor: performanceColor }}>
                              <div 
                                className="performance-circle" 
                                style={{ 
                                  backgroundColor: performanceColor,
                                  width: `${Math.min(parseFloat(student.percentage), 100)}%`
                                }}
                              ></div>
                              <span className="performance-label">{performanceLabel}</span>
                            </div>
                            <div className="performance-stats">
                              <div className="stat-item">
                                <span className="stat-label">Correct:</span>
                                <span className="stat-value correct">{student.correctCount}</span>
                              </div>
                              <div className="stat-item">
                                <span className="stat-label">Wrong:</span>
                                <span className="stat-value wrong">{student.wrongCount}</span>
                              </div>
                            </div>
                          </td>
                          
                          {/* Time Column */}
                          <td className="time-cell">
                            <div className="time-display">
                              <FaClock className="time-icon" />
                              <div className="time-details">
                                <div className="time-value">
                                  {Math.floor(student.timeTaken / 60)}:
                                  {(student.timeTaken % 60).toString().padStart(2, '0')}
                                </div>
                                <div className="time-label">min:sec</div>
                              </div>
                            </div>
                          </td>
                          
                          {/* Status Column */}
                          <td className="status-cell">
                            <div className={`status-indicator ${student.passed ? "status-passed" : "status-failed"}`}>
                              {student.passed ? (
                                <>
                                  <FaCheckCircle className="status-icon" />
                                  <span>Passed</span>
                                </>
                              ) : (
                                <>
                                  <FaTimesCircle className="status-icon" />
                                  <span>Failed</span>
                                </>
                              )}
                            </div>
                            <div className="attempt-date">
                              <FaCalendarAlt className="date-icon" />
                              {new Date(student.attemptedAt).toLocaleDateString()}
                            </div>
                          </td>
                          
                          {/* Actions Column */}
                          <td className="actions-cell">
                            <button
                              className="btn-view-details"
                              onClick={() => setSelectedStudent(student)}
                            >
                              <FaEye className="view-icon" />
                              <span>View Details</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                
                {filteredStudents?.length === 0 && (
                  <div className="no-results">
                    <FaUserGraduate className="no-results-icon" />
                    <h3>No students found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "topPerformers" && (
          <div className="top-performers-container">
            {/* Header Section */}
            <div className="top-performers-header">
              <div className="performers-header-left">
                <div className="trophy-banner">
                  <GiLaurelsTrophy className="laurel-trophy" />
                  <h2>Top 5 Performers Hall of Fame</h2>
                  <GiLaurelsTrophy className="laurel-trophy" />
                </div>
                <p className="performers-subtitle">
                  Celebrating exceptional academic achievement and outstanding performance
                </p>
              </div>
              <div className="performers-header-right">
                <div className="top-stats">
                  <div className="top-stat">
                    <div className="top-stat-label">Avg. Score (Top 5)</div>
                    <div className="top-stat-value">
                      {(
                        data.attemptedStudents.slice(0, 5).reduce((sum, student) => sum + student.score, 0) / 
                        Math.min(5, data.attemptedStudents.length)
                      ).toFixed(1)}
                    </div>
                  </div>
                  <div className="top-stat">
                    <div className="top-stat-label">Highest Score</div>
                    <div className="top-stat-value">{data.analytics.highestScore}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sort Controls */}
            <div className="top-performers-controls">
              <div className="sort-controls">
                <span className="sort-label">Sort by:</span>
                <div className="sort-buttons">
                  <button 
                    className={`sort-btn ${topPerformersSort.key === "rank" ? "active" : ""}`}
                    onClick={() => handleTopPerformersSort("rank")}
                  >
                    <FaListOl /> Rank
                    {topPerformersSort.key === "rank" && (
                      topPerformersSort.direction === "asc" ? <FaCaretUp /> : <FaCaretDown />
                    )}
                  </button>
                  <button 
                    className={`sort-btn ${topPerformersSort.key === "score" ? "active" : ""}`}
                    onClick={() => handleTopPerformersSort("score")}
                  >
                    <FaChartBar /> Score
                    {topPerformersSort.key === "score" && (
                      topPerformersSort.direction === "asc" ? <FaCaretUp /> : <FaCaretDown />
                    )}
                  </button>
                  <button 
                    className={`sort-btn ${topPerformersSort.key === "percentage" ? "active" : ""}`}
                    onClick={() => handleTopPerformersSort("percentage")}
                  >
                    <FaPercent /> Percentage
                    {topPerformersSort.key === "percentage" && (
                      topPerformersSort.direction === "asc" ? <FaCaretUp /> : <FaCaretDown />
                    )}
                  </button>
                  <button 
                    className={`sort-btn ${topPerformersSort.key === "timeTaken" ? "active" : ""}`}
                    onClick={() => handleTopPerformersSort("timeTaken")}
                  >
                    <FaClock /> Time Taken
                    {topPerformersSort.key === "timeTaken" && (
                      topPerformersSort.direction === "asc" ? <FaCaretUp /> : <FaCaretDown />
                    )}
                  </button>
                </div>
              </div>
              <div className="results-info">
                <span className="results-count">
                  Showing Top 5 of {data.attemptedCount} total participants
                </span>
              </div>
            </div>

            {/* Modern Top Performers Table */}
            <div className="top-performers-table-wrapper">
              <div className="performers-grid">
                {sortedTopPerformers?.map((student, index) => {
                  const percentage = parseFloat(student.percentage);
                  const performanceColor = getPerformanceColor(percentage);
                  const performanceLabel = getPerformanceLabel(percentage);
                  const timeTaken = student.timeTaken;
                  
                  return (
                    <div key={student.attemptId} className="performer-card-modern">
                      {/* Medal and Rank Section */}
                      <div className="performer-medal-section">
                        <div className={`medal-display rank-${index + 1}`}>
                          {index === 0 && <div className="gold-glow"></div>}
                          {index === 1 && <div className="silver-glow"></div>}
                          {index === 2 && <div className="bronze-glow"></div>}
                          <FaMedal className="medal-icon-large" />
                          <div className="rank-number-large">#{index + 1}</div>
                          {index === 0 && (
                            <div className="crown-badge-large">
                              <FaCrown />
                            </div>
                          )}
                        </div>
                        <div className="rank-tag">
                          <span className="rank-text">
                            {index === 0 ? "Champion" : 
                             index === 1 ? "Runner-up" : 
                             index === 2 ? "Third Place" : 
                             `Rank ${index + 1}`}
                          </span>
                        </div>
                      </div>

                      {/* Student Profile Section */}
                      <div className="performer-profile-section">
                        <div className="profile-avatar-modern">
                          <div className="avatar-circle-modern">
                            {student.student.name.charAt(0).toUpperCase()}
                            <div className="avatar-glow"></div>
                          </div>
                          <div className="profile-info-modern">
                            <h3 className="student-name-modern">
                              {student.student.name}
                              {index === 0 && <FaFire className="fire-icon" />}
                            </h3>
                            <div className="student-details-modern">
                              <div className="detail-item">
                                <FaUniversity className="detail-icon" />
                                <span>{student.student.department}</span>
                              </div>
                              <div className="detail-item">
                                <FaBookOpen className="detail-icon" />
                                <span>{student.student.course} - Sem {student.student.semester}</span>
                              </div>
                              <div className="detail-item">
                                <FaUserGraduate className="detail-icon" />
                                <span>ID: {student.student.enrollmentNumber}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Performance Metrics Section */}
                      <div className="performance-metrics-section">
                        <div className="score-display-modern">
                          <div className="score-main-modern">
                            <span className="score-value-modern">{student.score}</span>
                            <span className="score-divider-modern">/</span>
                            <span className="score-total-modern">{student.totalMarks}</span>
                          </div>
                          <div className="score-progress-modern">
                            <div className="progress-bar-modern">
                              <div 
                                className="progress-fill-modern" 
                                style={{ 
                                  width: `${percentage}%`,
                                  background: `linear-gradient(90deg, ${performanceColor}, ${performanceColor}dd)`
                                }}
                              >
                                <div className="progress-shine"></div>
                              </div>
                              <div 
                                className="passing-line" 
                                style={{ left: `${(student.passingMarks / student.totalMarks) * 100}%` }}
                              >
                                <div className="line-dot"></div>
                                <div className="line-label">Pass</div>
                              </div>
                            </div>
                            <div className="progress-labels">
                              <span>0</span>
                              <span className="percentage-display">{student.percentage}%</span>
                              <span>{student.totalMarks}</span>
                            </div>
                          </div>
                        </div>

                        <div className="performance-breakdown">
                          <div className="breakdown-item">
                            <div className="breakdown-label">Performance</div>
                            <div 
                              className="performance-tag" 
                              style={{ 
                                backgroundColor: `${performanceColor}15`,
                                color: performanceColor,
                                borderColor: performanceColor
                              }}
                            >
                              {performanceLabel}
                            </div>
                          </div>
                          <div className="breakdown-item">
                            <div className="breakdown-label">Accuracy</div>
                            <div className="accuracy-value">
                              {student.correctCount + student.wrongCount > 0 
                                ? Math.round((student.correctCount / (student.correctCount + student.wrongCount)) * 100)
                                : 0}%
                            </div>
                          </div>
                          <div className="breakdown-item">
                            <div className="breakdown-label">Time Efficiency</div>
                            <div className="time-efficiency">
                              <FaClock className="time-icon-modern" />
                              <span className="time-value-modern">
                                {Math.floor(timeTaken / 60)}:{(timeTaken % 60).toString().padStart(2, '0')}
                              </span>
                              <span className="efficiency-label">
                                ({Math.round((timeTaken / (data.quiz.durationMinutes * 60)) * 100)}% used)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Stats Section */}
                      <div className="stats-section">
                        <div className="stats-grid-mini">
                          <div className="stat-card-mini correct-stat">
                            <FaCheckCircle className="stat-icon-mini" />
                            <div className="stat-content-mini">
                              <div className="stat-value-mini">{student.correctCount}</div>
                              <div className="stat-label-mini">Correct</div>
                            </div>
                          </div>
                          <div className="stat-card-mini wrong-stat">
                            <FaTimesCircle className="stat-icon-mini" />
                            <div className="stat-content-mini">
                              <div className="stat-value-mini">{student.wrongCount}</div>
                              <div className="stat-label-mini">Wrong</div>
                            </div>
                          </div>
                          <div className="stat-card-mini rank-stat">
                            <FaArrowUp className="stat-icon-mini" />
                            <div className="stat-content-mini">
                              <div className="stat-value-mini">
                                Top {Math.round((student.rank / data.attemptedCount) * 100)}%
                              </div>
                              <div className="stat-label-mini">Percentile</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Section */}
                      <div className="action-section">
                        <button 
                          className="btn-view-full"
                          onClick={() => setSelectedStudent(student)}
                        >
                          <FaEye className="view-icon-full" />
                          <span>View Full Profile</span>
                          <FaExternalLinkAlt className="external-icon" />
                        </button>
                        <div className="attempt-info">
                          <FaCalendarAlt className="calendar-icon" />
                          <span className="attempt-date-modern">
                            {new Date(student.attemptedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Legend and Comparison */}
            <div className="performers-comparison">
              <div className="comparison-card">
                <h4><FaChartArea /> Performance Comparison</h4>
                <div className="comparison-stats">
                  <div className="comparison-stat">
                    <div className="comparison-label">Top 5 Average</div>
                    <div className="comparison-value">
                      {(
                        data.attemptedStudents.slice(0, 5).reduce((sum, student) => sum + parseFloat(student.percentage), 0) / 
                        Math.min(5, data.attemptedStudents.length)
                      ).toFixed(1)}%
                    </div>
                    <div className="comparison-diff">
                      <FaArrowUp className="diff-icon" />
                      +{(
                        (data.attemptedStudents.slice(0, 5).reduce((sum, student) => sum + parseFloat(student.percentage), 0) / 
                        Math.min(5, data.attemptedStudents.length)) - data.analytics.averageScore
                      ).toFixed(1)}% vs class avg
                    </div>
                  </div>
                  <div className="comparison-stat">
                    <div className="comparison-label">Class Average</div>
                    <div className="comparison-value">
                      {data.analytics.averageScore.toFixed(1)}
                    </div>
                    <div className="comparison-diff">
                      Overall performance
                    </div>
                  </div>
                  <div className="comparison-stat">
                    <div className="comparison-label">Performance Gap</div>
                    <div className="comparison-value">
                      {(
                        data.analytics.highestScore - data.analytics.lowestScore
                      ).toFixed(1)}
                    </div>
                    <div className="comparison-diff">
                      Score range in class
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="legend-card">
                <h4><FaAward /> Performance Scale</h4>
                <div className="scale-items">
                  <div className="scale-item excellent">
                    <div className="scale-color"></div>
                    <div className="scale-info">
                      <div className="scale-label">Excellent</div>
                      <div className="scale-range">90-100%</div>
                    </div>
                    <div className="scale-count">
                      {data.analytics.performanceDistribution.excellent} students
                    </div>
                  </div>
                  <div className="scale-item good">
                    <div className="scale-color"></div>
                    <div className="scale-info">
                      <div className="scale-label">Good</div>
                      <div className="scale-range">75-89%</div>
                    </div>
                    <div className="scale-count">
                      {data.analytics.performanceDistribution.good} students
                    </div>
                  </div>
                  <div className="scale-item average">
                    <div className="scale-color"></div>
                    <div className="scale-info">
                      <div className="scale-label">Average</div>
                      <div className="scale-range">50-74%</div>
                    </div>
                    <div className="scale-count">
                      {data.analytics.performanceDistribution.average} students
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="analytics-grid">
            {/* Detailed Analytics */}
            <div className="analytics-card">
              <h3><FaChartBar /> Detailed Statistics</h3>
              <div className="analytics-stats">
                <div className="stat-row">
                  <span>Total Attempts</span>
                  <strong>{data.analytics.totalAttempts}</strong>
                </div>
                <div className="stat-row">
                  <span>Average Score</span>
                  <strong>{data.analytics.averageScore.toFixed(2)}</strong>
                </div>
                <div className="stat-row">
                  <span>Highest Score</span>
                  <strong>{data.analytics.highestScore}</strong>
                </div>
                <div className="stat-row">
                  <span>Lowest Score</span>
                  <strong>{data.analytics.lowestScore}</strong>
                </div>
                <div className="stat-row highlight">
                  <span>Passing Rate</span>
                  <strong className={data.analytics.passingRate >= 50 ? "success" : "danger"}>
                    {data.analytics.passingRate.toFixed(1)}%
                  </strong>
                </div>
              </div>
            </div>

            {/* Department Analysis */}
            <div className="analytics-card">
              <h3><FaUniversity /> Department Analysis</h3>
              <div className="dept-analysis">
                {Object.entries(data.analytics.departmentStats).map(([dept, count]) => (
                  <div key={dept} className="dept-item">
                    <span className="dept-name">{dept}</span>
                    <div className="dept-bar">
                      <div 
                        className="dept-fill" 
                        style={{ 
                          width: `${(count / data.attemptedCount) * 100}%`,
                          backgroundColor: departmentColors[Object.keys(data.analytics.departmentStats).indexOf(dept) % departmentColors.length]
                        }}
                      ></div>
                    </div>
                    <span className="dept-count">{count} students</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Insights */}
            <div className="analytics-card full-width">
              <h3><FaChartLine /> Performance Insights</h3>
              <div className="insights-grid">
                <div className="insight-item excellent">
                  <div className="insight-icon">
                    <FaTrophy />
                  </div>
                  <div className="insight-content">
                    <h4>Excellent (90-100%)</h4>
                    <p>{data.analytics.performanceDistribution.excellent} students</p>
                    <div className="insight-percentage">
                      {((data.analytics.performanceDistribution.excellent / data.attemptedCount) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
                <div className="insight-item good">
                  <div className="insight-icon">
                    <FaChartBar />
                  </div>
                  <div className="insight-content">
                    <h4>Good (75-89%)</h4>
                    <p>{data.analytics.performanceDistribution.good} students</p>
                    <div className="insight-percentage">
                      {((data.analytics.performanceDistribution.good / data.attemptedCount) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
                <div className="insight-item average">
                  <div className="insight-icon">
                    <FaPercent />
                  </div>
                  <div className="insight-content">
                    <h4>Average (50-74%)</h4>
                    <p>{data.analytics.performanceDistribution.average} students</p>
                    <div className="insight-percentage">
                      {((data.analytics.performanceDistribution.average / data.attemptedCount) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
                <div className="insight-item poor">
                  <div className="insight-icon">
                    <FaClock />
                  </div>
                  <div className="insight-content">
                    <h4>Poor (25-49%)</h4>
                    <p>{data.analytics.performanceDistribution.poor} students</p>
                    <div className="insight-percentage">
                      {((data.analytics.performanceDistribution.poor / data.attemptedCount) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
                <div className="insight-item fail">
                  <div className="insight-icon">
                    <FaChartLine />
                  </div>
                  <div className="insight-content">
                    <h4>Fail (0-24%)</h4>
                    <p>{data.analytics.performanceDistribution.fail} students</p>
                    <div className="insight-percentage">
                      {((data.analytics.performanceDistribution.fail / data.attemptedCount) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "performance" && (
          <div className="performance-container">
            <div className="performance-chart">
              <h3>Score vs Time Taken Analysis</h3>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" dataKey="score" name="Score" label={{ value: 'Score', position: 'insideBottom', offset: -5 }} />
                  <YAxis type="number" dataKey="timeTaken" name="Time Taken" label={{ value: 'Time Taken (seconds)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    formatter={(value, name) => {
                      if (name === 'Score') return [value, 'Score'];
                      if (name === 'Time Taken') return [`${Math.floor(value / 60)}:${(value % 60).toString().padStart(2, '0')}`, 'Time Taken'];
                      return value;
                    }}
                  />
                  <Scatter 
                    name="Students" 
                    data={data.attemptedStudents} 
                    fill="#8884d8"
                    shape={(props) => {
                      const { cx, cy, payload } = props;
                      const percentage = parseFloat(payload.percentage);
                      const color = getPerformanceColor(percentage);
                      return <circle cx={cx} cy={cy} r={6} fill={color} stroke="#fff" strokeWidth={2} />;
                    }}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            
            <div className="comparison-grid">
              <div className="comparison-card">
                <h4>Top 5 Performers</h4>
                <ul className="top-performers">
                  {data.attemptedStudents.slice(0, 5).map((student, index) => (
                    <li key={student.attemptId}>
                      <div className="top-performer-rank">
                        <span className={`rank-badge-small rank-${index + 1}`}>
                          #{index + 1}
                        </span>
                      </div>
                      <div className="top-performer-info">
                        <div className="top-performer-name">{student.student.name}</div>
                        <div className="top-performer-score">
                          <span className="score-value">{student.score}</span>
                          <span className="score-percentage">({student.percentage}%)</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="comparison-card">
                <h4>Department Comparison</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={data.chartData.departmentDistribution}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Student Detail Modal */}
      {selectedStudent && (
        <div className="modal-overlay" onClick={() => setSelectedStudent(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-section">
                <h2>Student Performance Details</h2>
                <p className="modal-subtitle">Comprehensive analysis of student's quiz attempt</p>
              </div>
              <button className="close-btn" onClick={() => setSelectedStudent(null)}>
                ×
              </button>
            </div>
            
            <div className="modal-body">
              {/* Student Profile Header */}
              <div className="student-profile-header">
                <div className="profile-avatar-section">
                  <div className="profile-avatar-large">
                    {selectedStudent.student.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="profile-rank-badge">
                    <FaCrown className="crown-icon" />
                    <span>Rank #{selectedStudent.rank}</span>
                  </div>
                </div>
                
                <div className="profile-info-section">
                  <div className="profile-name-section">
                    <h3>{selectedStudent.student.name}</h3>
                    <div className="profile-enrollment">
                      {selectedStudent.student.enrollmentNumber}
                    </div>
                  </div>
                  
                  <div className="profile-status-section">
                    <div className={`performance-badge ${selectedStudent.passed ? "passed" : "failed"}`}>
                      {selectedStudent.passed ? (
                        <>
                          <FaCheckCircle className="status-icon" />
                          <span>Passed</span>
                        </>
                      ) : (
                        <>
                          <FaTimesCircle className="status-icon" />
                          <span>Failed</span>
                        </>
                      )}
                    </div>
                    <div className="performance-category" style={{ color: getPerformanceColor(parseFloat(selectedStudent.percentage)) }}>
                      {getPerformanceLabel(parseFloat(selectedStudent.percentage))} Performance
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Summary Cards */}
              <div className="performance-summary-cards">
                <div className="summary-card score-card">
                  <div className="summary-icon">
                    <FaChartBar />
                  </div>
                  <div className="summary-content">
                    <div className="summary-label">Quiz Score</div>
                    <div className="summary-value">
                      <span className="score-main">{selectedStudent.score}</span>
                      <span className="score-divider">/</span>
                      <span className="score-total">{selectedStudent.totalMarks}</span>
                    </div>
                    <div className="summary-percentage">
                      {selectedStudent.percentage}%
                    </div>
                  </div>
                </div>
                
                <div className="summary-card accuracy-card">
                  <div className="summary-icon">
                    <FaPercent />
                  </div>
                  <div className="summary-content">
                    <div className="summary-label">Accuracy</div>
                    <div className="summary-value">
                      {selectedStudent.correctCount + selectedStudent.wrongCount > 0 
                        ? Math.round((selectedStudent.correctCount / (selectedStudent.correctCount + selectedStudent.wrongCount)) * 100)
                        : 0}%
                    </div>
                    <div className="summary-detail">
                      {selectedStudent.correctCount} correct • {selectedStudent.wrongCount} wrong
                    </div>
                  </div>
                </div>
                
                <div className="summary-card time-card">
                  <div className="summary-icon">
                    <FaClock />
                  </div>
                  <div className="summary-content">
                    <div className="summary-label">Time Taken</div>
                    <div className="summary-value">
                      {Math.floor(selectedStudent.timeTaken / 60)}:
                      {(selectedStudent.timeTaken % 60).toString().padStart(2, '0')}
                    </div>
                    <div className="summary-detail">
                      {Math.round((selectedStudent.timeTaken / (data.quiz.durationMinutes * 60)) * 100)}% of total time
                    </div>
                  </div>
                </div>
                
                <div className="summary-card comparison-card">
                  <div className="summary-icon">
                    <FaChartLine />
                  </div>
                  <div className="summary-content">
                    <div className="summary-label">Class Rank</div>
                    <div className="summary-value rank-display">
                      #{selectedStudent.rank}
                    </div>
                    <div className="summary-detail">
                      Top {Math.round((selectedStudent.rank / data.attemptedCount) * 100)}% of class
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Information Grid */}
              <div className="detailed-info-grid">
                {/* Personal Information */}
                <div className="info-section">
                  <div className="section-header">
                    <FaUserCircle className="section-icon" />
                    <h4>Personal Information</h4>
                  </div>
                  <div className="section-content">
                    <div className="info-row">
                      <span className="info-label">Email Address</span>
                      <span className="info-value">{selectedStudent.student.email}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Mobile Number</span>
                      <span className="info-value">{selectedStudent.student.mobileNumber}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Gender</span>
                      <span className="info-value">
                        <FaVenusMars className="gender-icon" />
                        {selectedStudent.student.gender}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Academic Information */}
                <div className="info-section">
                  <div className="section-header">
                    <FaUniversity className="section-icon" />
                    <h4>Academic Information</h4>
                  </div>
                  <div className="section-content">
                    <div className="info-row">
                      <span className="info-label">Department</span>
                      <span className="info-value">{selectedStudent.student.department}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Course & Semester</span>
                      <span className="info-value">{selectedStudent.student.course} - Semester {selectedStudent.student.semester}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Group</span>
                      <span className="info-value">{selectedStudent.student.group}</span>
                    </div>
                  </div>
                </div>

                {/* Quiz Attempt Details */}
                <div className="info-section">
                  <div className="section-header">
                    <FaCalendarAlt className="section-icon" />
                    <h4>Attempt Details</h4>
                  </div>
                  <div className="section-content">
                    <div className="info-row">
                      <span className="info-label">Attempted On</span>
                      <span className="info-value">
                        {new Date(selectedStudent.attemptedAt).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Attempt Time</span>
                      <span className="info-value">
                        {new Date(selectedStudent.attemptedAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Status</span>
                      <span className={`info-value ${selectedStudent.passed ? "text-success" : "text-danger"}`}>
                        {selectedStudent.passed ? "Completed Successfully" : "Needs Improvement"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Performance Analysis */}
                <div className="info-section">
                  <div className="section-header">
                    <FaChartLine className="section-icon" />
                    <h4>Performance Analysis</h4>
                  </div>
                  <div className="section-content">
                    <div className="info-row">
                      <span className="info-label">Score vs Passing Marks</span>
                      <div className="progress-comparison">
                        <div className="progress-bar-container">
                          <div className="progress-bar">
                            <div 
                              className="progress-fill score-progress" 
                              style={{ width: `${(selectedStudent.score / selectedStudent.totalMarks) * 100}%` }}
                            ></div>
                          </div>
                          <div className="progress-labels">
                            <span>0</span>
                            <span className="passing-mark" style={{ left: `${(selectedStudent.passingMarks / selectedStudent.totalMarks) * 100}%` }}>
                              Pass: {selectedStudent.passingMarks}
                            </span>
                            <span>{selectedStudent.totalMarks}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Performance Category</span>
                      <span className="info-value performance-category-badge" style={{ backgroundColor: getPerformanceColor(parseFloat(selectedStudent.percentage)) }}>
                        {getPerformanceLabel(parseFloat(selectedStudent.percentage))}
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Class Comparison</span>
                      <span className="info-value">
                        Better than {Math.round(((data.attemptedCount - selectedStudent.rank) / data.attemptedCount) * 100)}% of class
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setSelectedStudent(null)}>
                Close
              </button>
              <button className="btn-primary">
                <FaDownload /> Download Detailed Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizAttemptedStudents;