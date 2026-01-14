






// import React, { useState, useEffect } from "react";
// import "./superAdminDashboard.css";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Users,
//   BookOpen,
//   GraduationCap,
//   TrendingUp,
//   Activity,
//   BarChart3,
//   ShieldCheck,
//   Layers,
//   Moon,
//   Sun,
//   Settings,
//   Bell,
//   ChevronRight,
//   Clock,
//   User,
//   LogOut,
//   Database,
//   Server,
//   Shield
// } from "lucide-react";

// const SuperAdminDashboard = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [darkMode, setDarkMode] = useState(false);
//   const [notifications] = useState(3); // Mock notification count

//   const [stats, setStats] = useState({
//     totalFaculties: 0,
//     totalStudents: 0,
//     activeCourses: 0,
//     totalQuizzes: 0
//   });

//   const [activities, setActivities] = useState([
//     {
//       _id: "1",
//       message: "New faculty member registered - Dr. Sarah Johnson",
//       performedBy: "System",
//       createdAt: new Date(Date.now() - 3600000),
//       type: "success",
//       icon: <User size={16} />
//     },
//     {
//       _id: "2",
//       message: "System maintenance completed successfully",
//       performedBy: "Automated",
//       createdAt: new Date(Date.now() - 7200000),
//       type: "info",
//       icon: <Server size={16} />
//     },
//     {
//       _id: "3",
//       message: "Security audit passed with 99.8% score",
//       performedBy: "Security Bot",
//       createdAt: new Date(Date.now() - 10800000),
//       type: "warning",
//       icon: <Shield size={16} />
//     },
//     {
//       _id: "4",
//       message: "Database backup completed - 2.4GB",
//       performedBy: "Backup System",
//       createdAt: new Date(Date.now() - 14400000),
//       type: "info",
//       icon: <Database size={16} />
//     }
//   ]);

//   const actionCards = [
//     {
//       title: "Advanced Analytics",
//       icon: <BarChart3 size={24} />,
//       path: "/superadmin/analytics",
//       description: "Detailed system insights",
//       gradient: "gradient-blue"
//     },
//     {
//       title: "Course Management",
//       icon: <BookOpen size={24} />,
//       path: "/superadmin/course-management",
//       description: "Manage all courses",
//       gradient: "gradient-purple"
//     },
//     {
//       title: "Faculty Control",
//       icon: <Users size={24} />,
//       path: "/superadmin/view-faculty",
//       description: "Faculty administration",
//       gradient: "gradient-green"
//     },
//     {
//       title: "Student Oversight",
//       icon: <GraduationCap size={24} />,
//       path: "/students",
//       description: "Student management",
//       gradient: "gradient-orange"
//     }
//   ];

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       setLoading(true);
//       try {
//         const facultyRes = await axios.get(
//           "http://localhost:5000/api/faculty/all",
//           { withCredentials: true }
//         );

//         const courseRes = await axios.get(
//           "http://localhost:5000/api/course",
//           { withCredentials: true }
//         );

//         let studentCount = 0;
//         try {
//           const studentRes = await axios.get(
//             "http://localhost:5000/students/registered-students",
//             { withCredentials: true }
//           );
//           studentCount = studentRes.data.totalRegistered || 0;
//         } catch {}

//         let quizCount = 0;
//         try {
//           const quizRes = await axios.get(
//             "http://localhost:5000/quiz/all-quizzes",
//             { withCredentials: true }
//           );
//           quizCount = quizRes.data.length || 0;
//         } catch {}

//         const activityRes = await axios.get(
//           "http://localhost:5000/api/activity/recent",
//           { withCredentials: true }
//         );

//         setStats({
//           totalFaculties: facultyRes.data.total || 0,
//           activeCourses: courseRes.data.total || 0,
//           totalStudents: studentCount,
//           totalQuizzes: quizCount
//         });

//         // Merge API activities with mock ones
//         if (activityRes.data && activityRes.data.length > 0) {
//           const apiActivities = activityRes.data.map(act => ({
//             ...act,
//             icon: <User size={16} />,
//             type: "info"
//           }));
//           setActivities(prev => [...apiActivities, ...prev.slice(0, 4)]);
//         }
//       } catch (err) {
//         console.error("Dashboard error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
    
//     // Check for saved theme preference
//     const savedTheme = localStorage.getItem('superadmin-theme');
//     if (savedTheme === 'dark') {
//       setDarkMode(true);
//       document.body.classList.add('dark-mode');
//     }
//   }, []);

//   const toggleDarkMode = () => {
//     const newDarkMode = !darkMode;
//     setDarkMode(newDarkMode);
//     if (newDarkMode) {
//       document.body.classList.add('dark-mode');
//       localStorage.setItem('superadmin-theme', 'dark');
//     } else {
//       document.body.classList.remove('dark-mode');
//       localStorage.setItem('superadmin-theme', 'light');
//     }
//   };

//   const handleLogout = () => {
//     // Add logout logic here
//     navigate("/login");
//   };

//   return (
//     <div className={`superadmin-wrapper ${darkMode ? 'dark-mode' : ''}`}>
//       {/* TOP NAVIGATION BAR */}
//       <div className="top-navbar">
//         <div className="brand-section">
//           <div className="brand-logo">
//             <ShieldCheck size={28} />
//           </div>
//           <div>
//             <h5 className="brand-title">University Management System</h5>
//             <span className="brand-subtitle">Super Admin Console</span>
//           </div>
//         </div>

//         <div className="nav-controls">
//           <button 
//             className="theme-toggle"
//             onClick={toggleDarkMode}
//             title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
//           >
//             {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//           </button>

//           <button className="notification-btn" title="Notifications">
//             <Bell size={20} />
//             {notifications > 0 && (
//               <span className="notification-badge">{notifications}</span>
//             )}
//           </button>

//           <button 
//             className="settings-btn"
//             onClick={() => navigate("/superadmin/settings")}
//             title="Settings"
//           >
//             <Settings size={20} />
//           </button>

//           <button 
//             className="logout-btn"
//             onClick={handleLogout}
//             title="Logout"
//           >
//             <LogOut size={20} />
//           </button>
//         </div>
//       </div>

//       {/* MAIN DASHBOARD CONTENT */}
//       <div className="container-fluid py-4">
//         {/* HEADER WITH PROFILE */}
//         <div className="dashboard-header mb-4">
//           <div className="header-content">
//             <h1 className="display-6 fw-bold mb-2">
//               <Shield className="me-3" size={32} />
//               Super Admin Control Panel
//             </h1>
//             <p className="lead text-muted mb-0">
//               University System Oversight & Governance
//             </p>
//           </div>

//           <div 
//             className="admin-profile-card"
//             onClick={() => navigate("/superadmin/profile")}
//           >
//             <div className="profile-avatar">
//               <span className="avatar-badge">
//                 <ShieldCheck size={12} />
//               </span>
//               <div className="avatar-initials">SA</div>
//             </div>
//             <div className="profile-info">
//               <h6 className="mb-0 fw-bold">System Super Admin</h6>
//               <small className="text-muted">Full System Privileges</small>
//               <div className="profile-status">
//                 <span className="status-indicator active"></span>
//                 <span>Administrator</span>
//               </div>
//             </div>
//             <ChevronRight size={20} className="text-muted ms-3" />
//           </div>
//         </div>

//         {/* STATS CARDS */}
//         <div className="row g-4 mb-5">
//           <div className="col-xl-3 col-md-6">
//             <div className="stat-card premium-card border-start border-primary border-4">
//               <div className="stat-icon bg-primary bg-opacity-10">
//                 <Users className="text-primary" size={24} />
//               </div>
//               <div className="stat-content">
//                 <h2 className="display-5 fw-bold mb-1">{stats.totalFaculties}</h2>
//                 <p className="text-muted mb-0">Total Faculties</p>
//                 <small className="text-success">
//                   <TrendingUp size={14} /> +12% this month
//                 </small>
//               </div>
//             </div>
//           </div>

//           <div className="col-xl-3 col-md-6">
//             <div className="stat-card premium-card border-start border-success border-4">
//               <div className="stat-icon bg-success bg-opacity-10">
//                 <GraduationCap className="text-success" size={24} />
//               </div>
//               <div className="stat-content">
//                 <h2 className="display-5 fw-bold mb-1">{stats.totalStudents}</h2>
//                 <p className="text-muted mb-0">Total Students</p>
//                 <small className="text-success">
//                   <TrendingUp size={14} /> 
//                 </small>
//               </div>
//             </div>
//           </div>

//           <div className="col-xl-3 col-md-6">
//             <div className="stat-card premium-card border-start border-info border-4">
//               <div className="stat-icon bg-info bg-opacity-10">
//                 <Layers className="text-info" size={24} />
//               </div>
//               <div className="stat-content">
//                 <h2 className="display-5 fw-bold mb-1">{stats.activeCourses}</h2>
//                 <p className="text-muted mb-0">Active Courses</p>
//                 <small className="text-warning">
//                   <Activity size={14} /> 3 new this week
//                 </small>
//               </div>
//             </div>
//           </div>

//           <div className="col-xl-3 col-md-6">
//             <div className="stat-card premium-card border-start border-warning border-4">
//               <div className="stat-icon bg-warning bg-opacity-10">
//                 <ShieldCheck className="text-warning" size={24} />
//               </div>
//               <div className="stat-content">
//                 <h2 className="display-5 fw-bold mb-1">{stats.totalQuizzes}</h2>
//                 <p className="text-muted mb-0">Total Quizzes</p>
//                 <small className="text-info">
//                   <Activity size={14} /> 15 active now
//                 </small>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* QUICK ACTIONS */}
//         <div className="row g-4 mb-5">
//           <div className="col-12">
//             <div className="section-header mb-4">
//               <h3 className="fw-bold">
//                 <TrendingUp className="me-2" size={24} />
//                 Administrative Actions
//               </h3>
//               <p className="text-muted mb-0">Quick access to management panels</p>
//             </div>
//           </div>
          
//           {actionCards.map((card, idx) => (
//             <div key={idx} className="col-xl-3 col-md-6">
//               <div 
//                 className={`action-card ${card.gradient}`}
//                 onClick={() => navigate(card.path)}
//               >
//                 <div className="action-icon">
//                   {card.icon}
//                 </div>
//                 <div className="action-content">
//                   <h5 className="fw-bold mb-1">{card.title}</h5>
//                   <p className="text-muted small mb-2">{card.description}</p>
//                   <span className="action-link">
//                     Access Panel <ChevronRight size={16} />
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ENHANCED ACTIVITY LOG */}
//         <div className="row">
//           <div className="col-12">
//             <div className="premium-card activity-container">
//               <div className="activity-header">
//                 <div>
//                   <h3 className="fw-bold mb-1">
//                     <Activity className="me-2" size={24} />
//                     System Activity Log
//                   </h3>
//                   <p className="text-muted mb-0">Real-time system activities and events</p>
//                 </div>
//                 <button 
//                   className="btn btn-sm btn-outline-primary"
//                   onClick={() => navigate("/superadmin/activity-log")}
//                 >
//                   View Full Log
//                 </button>
//               </div>

//               <div className="activity-timeline">
//                 {loading ? (
//                   <div className="text-center py-5">
//                     <div className="spinner-border text-primary" role="status">
//                       <span className="visually-hidden">Loading...</span>
//                     </div>
//                     <p className="mt-2">Loading system activity...</p>
//                   </div>
//                 ) : activities.length === 0 ? (
//                   <div className="text-center py-5">
//                     <Activity size={48} className="text-muted mb-3" />
//                     <p className="text-muted">No recent activities recorded</p>
//                   </div>
//                 ) : (
//                   activities.map((act) => (
//                     <div key={act._id} className="activity-item">
//                       <div className="activity-timeline-marker">
//                         <div className={`marker-dot ${act.type}`}>
//                           {act.icon}
//                         </div>
//                         <div className="timeline-line"></div>
//                       </div>
                      
//                       <div className="activity-content">
//                         <div className="d-flex justify-content-between align-items-start">
//                           <div>
//                             <p className="mb-1 fw-medium">{act.message}</p>
//                             <div className="activity-meta">
//                               <span className="activity-user">
//                                 <User size={12} className="me-1" />
//                                 {act.performedBy}
//                               </span>
//                               <span className="activity-time">
//                                 <Clock size={12} className="me-1" />
//                                 {new Date(act.createdAt).toLocaleTimeString([], { 
//                                   hour: '2-digit', 
//                                   minute: '2-digit' 
//                                 })}
//                               </span>
//                               <span className="activity-date">
//                                 {new Date(act.createdAt).toLocaleDateString()}
//                               </span>
//                             </div>
//                           </div>
//                           <span className={`activity-badge ${act.type}`}>
//                             {act.type.charAt(0).toUpperCase() + act.type.slice(1)}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
              
//               {activities.length > 0 && (
//                 <div className="activity-footer text-center py-3">
//                   <button 
//                     className="btn btn-link text-decoration-none"
//                     onClick={() => navigate("/superadmin/activity-log")}
//                   >
//                     Load More Activities <ChevronRight size={16} />
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SuperAdminDashboard;




// import React, { useState, useEffect } from "react";
// import "./superAdminDashboard.css";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Users,
//   BookOpen,
//   GraduationCap,
//   TrendingUp,
//   Activity,
//   BarChart3,
//   ShieldCheck,
//   Layers,
//   ChevronRight,
//   Clock,
//   User,
//   LogOut,
//   Database,
//   Server,
//   Shield,
//   Building,
//   FileText,
//   CheckCircle,
//   AlertCircle
// } from "lucide-react";

// const SuperAdminDashboard = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [darkMode, setDarkMode] = useState(false);

//   const [stats, setStats] = useState({
//     totalFaculties: 0,
//     totalStudents: 0,
//     activeCourses: 0,
//     totalQuizzes: 0
//   });

  

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       setLoading(true);
//       try {
//         const facultyRes = await axios.get(
//           "http://localhost:5000/api/faculty/all",
//           { withCredentials: true }
//         );

//         const courseRes = await axios.get(
//           "http://localhost:5000/api/course",
//           { withCredentials: true }
//         );

//         let studentCount = 0;
//         try {
//           const studentRes = await axios.get(
//             "http://localhost:5000/students/registered-students",
//             { withCredentials: true }
//           );
//           studentCount = studentRes.data.totalRegistered || 0;
//         } catch {}

//         let quizCount = 0;
//         try {
//           const quizRes = await axios.get(
//             "http://localhost:5000/quiz/all-quizzes",
//             { withCredentials: true }
//           );
//           quizCount = quizRes.data.length || 0;
//         } catch {}

//         const activityRes = await axios.get(
//           "http://localhost:5000/api/activity/recent",
//           { withCredentials: true }
//         );

//         setStats({
//           totalFaculties: facultyRes.data.total || 0,
//           activeCourses: courseRes.data.total || 0,
//           totalStudents: studentCount,
//           totalQuizzes: quizCount
//         });

//         // Merge API activities with mock ones
//         if (activityRes.data && activityRes.data.length > 0) {
//           const apiActivities = activityRes.data.map(act => ({
//             ...act,
//             icon: <User size={16} />,
//             type: "info"
//           }));
//           setActivities(prev => [...apiActivities, ...prev.slice(0, 4)]);
//         }
//       } catch (err) {
//         console.error("Dashboard error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
    
//     // Check for saved theme preference
//     const savedTheme = localStorage.getItem('superadmin-theme');
//     if (savedTheme === 'dark') {
//       setDarkMode(true);
//       document.body.classList.add('dark-mode');
//     }
//   }, []);

//   const handleLogout = () => {
//     navigate("/login");
//   };

//   return (
//     <div className={`enterprise-dashboard ${darkMode ? 'dark-mode' : ''}`}>
//       {/* ENTERPRISE HEADER */}
//       <header className="enterprise-header">
//         <div className="header-left">
//           <div className="brand-section">
//             <div className="enterprise-logo">
//               <Building size={28} className="logo-icon" />
//               <div className="brand-text">
//                 <h1 className="enterprise-name">University Management System</h1>
//                 <p className="enterprise-tagline">Super Administrator Console</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="header-right">
//           <div className="admin-info">
//             <div className="admin-avatar" onClick={() => navigate("/superadmin/profile")}>
//               <div className="avatar-initials">SA</div>
//               <span className="admin-badge">
//                 <ShieldCheck size={10} />
//               </span>
//             </div>
//             <div className="admin-details">
//               <span className="admin-role">Super Administrator</span>
//               <span className="admin-name">System Administrator</span>
//             </div>
//           </div>
//           <button 
//             className="logout-btn-enterprise"
//             onClick={handleLogout}
//             title="Logout"
//           >
//             <LogOut size={18} />
//           </button>
//         </div>
//       </header>

//       {/* MAIN DASHBOARD */}
//       <main className="dashboard-main">
        
//         {/* <div className="dashboard-title-section">
//           <div className="title-content">
//             <ShieldCheck size={32} className="title-icon" />
//             <div>
//               <h1 className="dashboard-title">System Control Panel</h1>
//               <p className="dashboard-subtitle">University System Governance & Oversight</p>
//             </div>
//           </div>
//           <div className="system-status">
//             <span className="status-indicator active"></span>
//             <span>System Operational</span>
//           </div>
//         </div> */}

//         {/* KEY METRICS */}
//         <div className="metrics-section">
//           <h2 className="section-title">
//             <TrendingUp size={20} />
//             System Overview
//           </h2>

          
//           <div className="metrics-grid">
//   {/* Faculty Card */}
//   <div className="metric-card premium">
//     <div className="metric-card-bg"></div>
//     <div className="metric-content">
//       <div className="metric-header">
//         <div className="metric-icon-wrapper">
//           <div className="metric-icon-bg primary">
//             <Users size={22} />
//           </div>
//           <div className="metric-tag">
//             <TrendingUp size={14} />
//             <span>+12%</span>
//           </div>
//         </div>
//         <span className="metric-label">Total Faculties</span>
//       </div>
//       <div className="metric-main">
//         <div className="metric-value">{stats.totalFaculties}</div>
//         <div className="metric-progress">
//           <div className="progress-bar">
//             <div className="progress-fill" style={{ width: '72%' }}></div>
//           </div>
//           <span className="progress-text">72% active</span>
//         </div>
//       </div>
//     </div>
//   </div>

//   {/* Students Card */}
//   <div className="metric-card premium">
//     <div className="metric-card-bg"></div>
//     <div className="metric-content">
//       <div className="metric-header">
//         <div className="metric-icon-wrapper">
//           <div className="metric-icon-bg success">
//             <GraduationCap size={22} />
//           </div>
//           <div className="metric-tag">
//             <TrendingUp size={14} />
//             <span>+8%</span>
//           </div>
//         </div>
//         <span className="metric-label">Total Students</span>
//       </div>
//       <div className="metric-main">
//         <div className="metric-value">{stats.totalStudents}</div>
//         <div className="metric-progress">
//           <div className="progress-bar">
//             <div className="progress-fill" style={{ width: '85%' }}></div>
//           </div>
//           <span className="progress-text">85% enrolled</span>
//         </div>
//       </div>
//     </div>
//   </div>

//   {/* Courses Card */}
//   <div className="metric-card premium">
//     <div className="metric-card-bg"></div>
//     <div className="metric-content">
//       <div className="metric-header">
//         <div className="metric-icon-wrapper">
//           <div className="metric-icon-bg info">
//             <Layers size={22} />
//           </div>
//           <div className="metric-tag new">
//             <Activity size={14} />
//             <span>+3 new</span>
//           </div>
//         </div>
//         <span className="metric-label">Active Courses</span>
//       </div>
//       <div className="metric-main">
//         <div className="metric-value">{stats.activeCourses}</div>
//         <div className="metric-progress">
//           <div className="progress-bar">
//             <div className="progress-fill" style={{ width: '68%' }}></div>
//           </div>
//           <span className="progress-text">68% capacity</span>
//         </div>
//       </div>
//     </div>
//   </div>

//   {/* Quizzes Card */}
//   <div className="metric-card premium">
//     <div className="metric-card-bg"></div>
//     <div className="metric-content">
//       <div className="metric-header">
//         <div className="metric-icon-wrapper">
//           <div className="metric-icon-bg warning">
//             <ShieldCheck size={22} />
//           </div>
//           <div className="metric-tag active">
//             <Activity size={14} />
//             <span>15 active</span>
//           </div>
//         </div>
//         <span className="metric-label">Total Quizzes</span>
//       </div>
//       <div className="metric-main">
//         <div className="metric-value">{stats.totalQuizzes}</div>
//         <div className="metric-progress">
//           <div className="progress-bar">
//             <div className="progress-fill" style={{ width: '90%' }}></div>
//           </div>
//           <span className="progress-text">90% completion</span>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
          
//         </div>

//         {/* ADMINISTRATIVE ACTIONS */}
//         <div className="actions-section">
//           <div className="section-header">
//             <h2 className="section-title">
//               <BarChart3 size={20} />
//               Administrative Actions
//             </h2>
//             <p className="section-description">Quick access to management panels</p>
//           </div>
          
//           <div className="actions-grid">
//             {actionCards.map((card, idx) => (
//               <div 
//                 key={idx} 
//                 className="action-card-enterprise"
//                 onClick={() => navigate(card.path)}
//               >
//                 <div className={`action-icon-enterprise ${card.color}`}>
//                   {card.icon}
//                 </div>
//                 <div className="action-content-enterprise">
//                   <h3 className="action-title">{card.title}</h3>
//                   <p className="action-description">{card.description}</p>
//                   <div className="action-cta">
//                     <span>Access Panel</span>
//                     <ChevronRight size={16} />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* SYSTEM ACTIVITY */}
//         <div className="activity-section">
//           <div className="activity-header">
//             <div>
//               <h2 className="section-title">
//                 <Activity size={20} />
//                 System Activity Log
//               </h2>
//               <p className="section-description">Real-time system activities and events</p>
//             </div>
           
//           </div>

//           <div className="activity-container">
//             {loading ? (
//               <div className="loading-state">
//                 <div className="loading-spinner"></div>
//                 <p>Loading system activities...</p>
//               </div>
//             ) : activities.length === 0 ? (
//               <div className="empty-state">
//                 <Activity size={40} />
//                 <p>No recent activities recorded</p>
//               </div>
//             ) : (
//               <div className="activity-list">
//                 {activities.map((act) => (
//                   <div key={act._id} className="activity-item-enterprise">
//                     <div className={`activity-icon ${act.type}`}>
//                       {act.icon}
//                     </div>
//                     <div className="activity-content-enterprise">
//                       <div className="activity-message">{act.message}</div>
//                       <div className="activity-meta">
//                         <span className="activity-user">
//                           <User size={12} />
//                           {act.performedBy}
//                         </span>
//                         <span className="activity-time">
//                           <Clock size={12} />
//                           {new Date(act.createdAt).toLocaleTimeString([], { 
//                             hour: '2-digit', 
//                             minute: '2-digit' 
//                           })}
//                         </span>
//                         <span className="activity-date">
//                           {new Date(act.createdAt).toLocaleDateString()}
//                         </span>
//                       </div>
//                     </div>
//                     <div className={`activity-status ${act.type}`}>
//                       {act.type === 'success' && <CheckCircle size={14} />}
//                       {act.type === 'info' && <FileText size={14} />}
//                       {act.type === 'warning' && <AlertCircle size={14} />}
//                       <span>{act.type.charAt(0).toUpperCase() + act.type.slice(1)}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
            
//             {activities.length > 0 && !loading && (
//               <div className="activity-footer">
              
//               </div>
//             )}
//           </div>
//         </div>
//       </main>

//       {/* FOOTER */}
//       <footer className="enterprise-footer">
//         <div className="footer-content">
//           <span className="copyright">© {new Date().getFullYear()} University Management System</span>
//           <div className="footer-right">
//             <span className="version">v2.4.1</span>
//             <span className="separator">|</span>
//             <span className="last-updated">Last updated: {new Date().toLocaleDateString()}</span>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default SuperAdminDashboard;



import React, { useState, useEffect } from "react";
import "./superAdminDashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Users,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Activity,
  BarChart3,
  ShieldCheck,
  Layers,
  ChevronRight,
  Clock,
  User,
  LogOut,
  Building,
  FileText,
  CheckCircle,
  AlertCircle,
  Search,
  Bell
} from "lucide-react";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalFaculties: 0,
    totalStudents: 0,
    activeCourses: 0,
    totalQuizzes: 0
  });

  const [activities, setActivities] = useState([]);

  const actionCards = [
    {
      title: "Faculty Management",
      description: "Manage faculty accounts and permissions",
      icon: <Users size={24} />,
      path: "/superadmin/view-faculty"
    },
    {
      title: "Student Management",
      description: "View and manage student records",
      icon: <GraduationCap size={24} />,
      path: "/students"
    },
    {
      title: "Course Management",
      description: "Oversee courses and curriculum",
      icon: <BookOpen size={24} />,
      path: "/superadmin/course-management"
    },
    {
      title: "Analytics & Reports",
      description: "View system analytics and generate reports",
      icon: <ShieldCheck size={24} />,
      path: "/superadmin/Analytics",
    }
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const facultyRes = await axios.get(
          "http://localhost:5000/api/faculty/all",
          { withCredentials: true }
        );

        const courseRes = await axios.get(
          "http://localhost:5000/api/course",
          { withCredentials: true }
        );

        let studentCount = 0;
        try {
          const studentRes = await axios.get(
            "http://localhost:5000/students/registered-students",
            { withCredentials: true }
          );
          studentCount = studentRes.data.totalRegistered || 0;
        } catch {}

        let quizCount = 0;
        try {
          const quizRes = await axios.get(
            "http://localhost:5000/quiz/all-quizzes",
            { withCredentials: true }
          );
          quizCount = quizRes.data.length || 0;
        } catch {}

        const activityRes = await axios.get(
          "http://localhost:5000/api/activity/recent",
          { withCredentials: true }
        );

        setStats({
          totalFaculties: facultyRes.data.total || 0,
          activeCourses: courseRes.data.total || 0,
          totalStudents: studentCount,
          totalQuizzes: quizCount
        });

        if (activityRes.data && activityRes.data.length > 0) {
          const apiActivities = activityRes.data.map(act => ({
            ...act,
            icon: <User size={16} />,
            type: "info"
          }));
          setActivities(apiActivities);
        }
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="premium-admin-dashboard">
      {/* Premium Header */}
      <header className="premium-header">
        <div className="header-left">
          <div className="brand-section">
            <div className="brand-logo">
              <Building size={28} className="logo-icon" />
              <div className="brand-text">
                <h1 className="system-name">University Management System</h1>
                <p className="system-role">Super Administrator</p>
              </div>
            </div>
          </div>
        </div>

        <div className="header-right">
          <div className="admin-profile">
            <div className="profile-avatar" onClick={() => navigate("/superadmin/profile")}>
              <div className="avatar-initials">SA</div>
            </div>
            <div className="profile-info">
              <span className="profile-name">System Administrator</span>
              <span className="profile-role">Super Admin</span>
            </div>
          </div>
          <button 
            className="logout-btn"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="dashboard-content">
        {/* Key Metrics */}
        <div className="metrics-section">
          <h2 className="section-title">System Overview</h2>
          
          <div className="metrics-grid">
            {/* Faculty Card */}
            <div className="metric-card">
              <div className="metric-icon blue">
                <Users size={24} />
              </div>
              <div className="metric-content">
                <div className="metric-value">{stats.totalFaculties}</div>
                <div className="metric-label">Total Faculties</div>
                <div className="metric-trend">
                  <span>Active: {Math.round(stats.totalFaculties * 0.85)}</span>
                </div>
              </div>
            </div>

            {/* Students Card */}
            <div className="metric-card">
              <div className="metric-icon green">
                <GraduationCap size={24} />
              </div>
              <div className="metric-content">
                <div className="metric-value">{stats.totalStudents}</div>
                <div className="metric-label">Total Students</div>
                <div className="metric-trend">
                  <span>Enrolled: {Math.round(stats.totalStudents * 0.92)}</span>
                </div>
              </div>
            </div>

            {/* Courses Card */}
            <div className="metric-card">
              <div className="metric-icon purple">
                <BookOpen size={24} />
              </div>
              <div className="metric-content">
                <div className="metric-value">{stats.activeCourses}</div>
                <div className="metric-label">Active Courses</div>
                <div className="metric-trend">
                  <span>Capacity: {Math.round(stats.activeCourses * 0.68)}%</span>
                </div>
              </div>
            </div>

            {/* Quizzes Card */}
            <div className="metric-card">
              <div className="metric-icon amber">
                <ShieldCheck size={24} />
              </div>
              <div className="metric-content">
                <div className="metric-value">{stats.totalQuizzes}</div>
                <div className="metric-label">Total Quizzes</div>
                <div className="metric-trend">
                  <span>Completed: {Math.round(stats.totalQuizzes * 0.9)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Administrative Actions */}
        <div className="actions-section">
          <div className="section-header">
            <h2 className="section-title">Administrative Actions</h2>
            <p className="section-description">Quick access to management panels</p>
          </div>
          
          <div className="actions-grid">
            {actionCards.map((card, idx) => (
              <div 
                key={idx} 
                className="action-card"
                onClick={() => navigate(card.path)}
              >
                <div className="action-icon">
                  {card.icon}
                </div>
                <div className="action-content">
                  <h3 className="action-title">{card.title}</h3>
                  <p className="action-description">{card.description}</p>
                  <div className="action-cta">
                    <span>Access Panel</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Activity */}
        <div className="activity-section">
          <div className="activity-header">
            <div>
              <h2 className="section-title">System Activity Log</h2>
              <p className="section-description">Recent system activities and events</p>
            </div>
          </div>

          <div className="activity-container">
            {loading ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Loading system activities...</p>
              </div>
            ) : activities.length === 0 ? (
              <div className="empty-state">
                <Activity size={40} />
                <p>No recent activities recorded</p>
              </div>
            ) : (
              <div className="activity-list">
                {activities.map((act) => (
                  <div key={act._id} className="activity-item">
                    <div className={`activity-icon ${act.type}`}>
                      {act.icon}
                    </div>
                    <div className="activity-content">
                      <div className="activity-message">{act.message}</div>
                      <div className="activity-meta">
                        <span className="activity-user">
                          <User size={12} />
                          {act.performedBy || 'System'}
                        </span>
                        <span className="activity-time">
                          <Clock size={12} />
                          {new Date(act.createdAt).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Premium Footer */}
      <footer className="premium-footer">
        <div className="footer-content">
          <span className="copyright">
            © {new Date().getFullYear()} University Management System
          </span>
          <div className="footer-right">
            <span className="version">v2.4.1</span>
            <span className="system-status">
              <span className="status-indicator active"></span>
              System Operational
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SuperAdminDashboard;