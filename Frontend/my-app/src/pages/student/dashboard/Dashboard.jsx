
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import { useGetAllQuizzesQuery } from "../../../redux/services/quizApi";
import { 
  FiCalendar, 
  FiChevronRight, 
  FiLogOut, 
  FiBell,
  FiHome,
  FiCheck,
  FiAward,
  FiTrendingUp,
  FiTarget
} from "react-icons/fi";
import { 
  TbClipboardText,
  TbHistory
} from "react-icons/tb";
import { 
  IoStatsChart,
  IoPersonCircleOutline,
  IoLibrary,
  IoRocket,
  IoAnalytics,
  IoCheckmarkCircle,
  IoTime,
  IoBarChart
} from "react-icons/io5";
import { 
  FaUserCircle,
  FaCalendarCheck,
  FaGraduationCap,
  FaChartLine,
  FaBookReader,
  FaLightbulb
} from "react-icons/fa";

const StudentHome = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { data: allQuizzes = [], isLoading: quizzesLoading } = useGetAllQuizzesQuery();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/students/me", {
          credentials: "include",
        });

        if (res.status === 401 || res.status === 403) {
          navigate("/student/login");
          return;
        }

        const data = await res.json();
        setStudent(data);
        localStorage.setItem("studentId", data.id);
      } catch (err) {
        console.error("Profile fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/students/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate("/student/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Calculate real statistics
  const calculateStats = () => {
    const totalQuizzes = allQuizzes.length;
    const completedQuizzes = allQuizzes.filter(q => q.completed).length;
    const pendingQuizzes = totalQuizzes - completedQuizzes;
    
    // Find ongoing quizzes (not completed and within date range)
    const today = new Date();
    const ongoingQuizzes = allQuizzes.filter(q => {
      if (q.completed) return false;
      if (q.startDate && q.endDate) {
        const start = new Date(q.startDate);
        const end = new Date(q.endDate);
        return today >= start && today <= end;
      }
      return false;
    }).length;

    const averageScore = completedQuizzes > 0 
      ? Math.round(allQuizzes.reduce((sum, q) => sum + (q.score || 0), 0) / completedQuizzes)
      : 0;

    return {
      total: totalQuizzes,
      completed: completedQuizzes,
      pending: pendingQuizzes,
      ongoing: ongoingQuizzes,
      averageScore
    };
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Preparing your dashboard...</p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="auth-prompt-container">
        <div className="auth-prompt-card">
          <div className="auth-prompt-icon">👨‍🎓</div>
          <h2 className="auth-prompt-title">Academic Portal Access Required</h2>
          <p className="auth-prompt-subtitle">Please authenticate to view your personalized dashboard</p>
          <button onClick={() => navigate("/student/login")} className="auth-primary-btn">
            Access Student Portal
          </button>
        </div>
      </div>
    );
  }

  const stats = calculateStats();
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="student-home-container">
      {/* Header */}
      <header className="student-home-header">
        <div className="header-content">
          <div className="brand-section">
            <div className="brand-logo">
              <FaGraduationCap className="logo-icon" />
            </div>
            <div className="brand-text">
              <h1 className="brand-title">Student Dashboard</h1>
              <p className="brand-tagline">Manage Activity & Track Performance</p>
            </div>
          </div>

          <div className="header-actions">
            <div className="date-display">
              <FiCalendar className="date-icon" />
              <span className="date-text">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
            
            <div className="notification-bell">
              <FiBell className="bell-icon" />
              <span className="notification-count">2</span>
            </div>
            
            <div className="profile-dropdown">
              <button className="profile-button" onClick={() => navigate("/student/profile")}>
                <div className="profile-avatar">
                  {student.profilePicture ? (
                    <img src={student.profilePicture} alt={student.name} />
                  ) : (
                    <FaUserCircle size={40} />
                  )}
                </div>
                <div className="profile-info">
                  <span className="profile-name">{student.name}</span>
                  <span className="profile-role">Student • {student.department || "Computer Science"}</span>
                </div>
                <FiChevronRight className="profile-chevron" />
              </button>
              
              <div className="dropdown-menu">
                <button className="dropdown-item" onClick={() => navigate("/student/profile")}>
                  <IoPersonCircleOutline />
                  <span>My Profile</span>
                </button>
                <button className="dropdown-item logout" onClick={handleLogout}>
                  <FiLogOut />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="student-home-main">
        {/* Welcome & Stats Section */}
        <section className="welcome-section">
          <div className="welcome-content">
            <div className="welcome-text">
              <h2 className="welcome-title">
                {getGreeting()}, <span className="highlight">{student.name.split(" ")[0]}</span>!
              </h2>
              <p className="welcome-subtitle">
                Your personalized learning dashboard is ready. Track progress, access materials, and excel in your academic journey.
              </p>
            </div>
            
            <div className="quick-stats">
              <div className="stat-card">
                <div className="stat-icon registered">
                  <FaCalendarCheck />
                </div>
                <div className="stat-details">
                  <span className="stat-value">{stats.pending}</span>
                  <span className="stat-label">Quizzes</span>
                </div>
              </div>
              </div>
            </div>
          
        </section>

        {/* Premium Quick Actions */}
        <section className="premium-actions">
          <div className="premium-header">
            <h3 className="premium-title">
              <IoRocket className="premium-icon" />
              Quick Access
            </h3>
            <p className="premium-subtitle">Navigate seamlessly to essential academic tools</p>
          </div>
          
          <div className="premium-cards-grid">
            <div className="premium-card analytics-card" onClick={() => navigate(`/student/analytics/${student.id}`)}>
              <div className="card-background">
                <div className="background-pattern"></div>
                <div className="card-glow"></div>
              </div>
              
              <div className="card-content">
                <div className="card-icon-wrapper">
                  <IoAnalytics className="card-icon" />
                </div>
                
                <div className="card-text">
                  <h4 className="card-title">Performance Analytics</h4>
                  <p className="card-description">
                    Dive deep into your learning patterns, track progress trends, and get personalized insights
                  </p>
                </div>
                
                <div className="card-footer">
                  <span className="card-action">View Insights</span>
                  <FiChevronRight className="card-arrow" />
                </div>
              </div>
              
              <div className="card-badge">
                <span className="badge-text">Insights</span>
              </div>
            </div>
            
            <div className="premium-card academics-card" onClick={() => navigate("/Student/Home")}>
              <div className="card-background">
                <div className="background-pattern"></div>
                <div className="card-glow"></div>
              </div>
              
              <div className="card-content">
                <div className="card-icon-wrapper">
                  <FaBookReader className="card-icon" />
                </div>
                
                <div className="card-text">
                  <h4 className="card-title">Academic Quizzes</h4>
                  <p className="card-description">
                    Access all quizzes, study materials, assignments, and learning resources in one place
                  </p>
                </div>
                
                <div className="card-footer">
                  <span className="card-action">Explore</span>
                  <FiChevronRight className="card-arrow" />
                </div>
              </div>
              
              <div className="card-badge">
                <span className="badge-text">Resources</span>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="key-features">
          <div className="features-header">
            <h3 className="features-title">
              <FaLightbulb className="features-icon" />
              Platform Highlights
            </h3>
            <p className="features-subtitle">Discover the features that enhance your learning experience</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <FiTarget className="feature-icon" />
              </div>
              <div className="feature-content">
                <h4 className="feature-title">Smart Learning Path</h4>
                <p className="feature-description">
                  Personalized quiz recommendations based on your performance and learning goals
                </p>
              </div>
              <div className="feature-bullets">
                <div className="bullet-point">
                  <FiCheck className="bullet-icon" />
                  <span>Adaptive difficulty levels</span>
                </div>
                <div className="bullet-point">
                  <FiCheck className="bullet-icon" />
                  <span>Progress tracking</span>
                </div>
                <div className="bullet-point">
                  <FiCheck className="bullet-icon" />
                  <span>Performance insights</span>
                </div>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <IoTime className="feature-icon" />
              </div>
              <div className="feature-content">
                <h4 className="feature-title">Time Management</h4>
                <p className="feature-description">
                  Efficient tools to manage your study time and optimize learning schedules
                </p>
              </div>
              <div className="feature-bullets">
                <div className="bullet-point">
                  <FiCheck className="bullet-icon" />
                  <span>Quiz scheduling</span>
                </div>
                <div className="bullet-point">
                  <FiCheck className="bullet-icon" />
                  <span>Study reminders</span>
                </div>
                <div className="bullet-point">
                  <FiCheck className="bullet-icon" />
                  <span>Progress tracking</span>
                </div>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <FiAward className="feature-icon" />
              </div>
              <div className="feature-content">
                <h4 className="feature-title">Achievement System</h4>
                <p className="feature-description">
                  Earn badges, certificates, and recognition for your academic accomplishments
                </p>
              </div>
              <div className="feature-bullets">
                <div className="bullet-point">
                  <FiCheck className="bullet-icon" />
                  <span>Performance badges</span>
                </div>
                <div className="bullet-point">
                  <FiCheck className="bullet-icon" />
                  <span>Milestone certificates</span>
                </div>
                <div className="bullet-point">
                  <FiCheck className="bullet-icon" />
                  <span>Leaderboard ranking</span>
                </div>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <FiTrendingUp className="feature-icon" />
              </div>
              <div className="feature-content">
                <h4 className="feature-title">Progress Analytics</h4>
                <p className="feature-description">
                  Detailed insights into your learning journey with visual progress reports
                </p>
              </div>
              <div className="feature-bullets">
                <div className="bullet-point">
                  <FiCheck className="bullet-icon" />
                  <span>Visual reports</span>
                </div>
                <div className="bullet-point">
                  <FiCheck className="bullet-icon" />
                  <span>Performance trends</span>
                </div>
                <div className="bullet-point">
                  <FiCheck className="bullet-icon" />
                  <span>Weakness analysis</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="student-home-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <FaGraduationCap className="footer-logo" />
            <div className="footer-brand-text">
              <h4 className="footer-brand-title">Campus Quest</h4>
              <p className="footer-brand-subtitle">Elevating Learning Experiences</p>
            </div>
          </div>
          
          <div className="footer-links">
            <button className="footer-link" onClick={() => navigate("/student/help")}>
              Support Center
            </button>
            <span className="footer-divider">•</span>
            <button className="footer-link" onClick={() => navigate("/privacy")}>
              Privacy Policy
            </button>
            <span className="footer-divider">•</span>
            <button className="footer-link" onClick={() => navigate("/terms")}>
              Terms of Service
            </button>
          </div>
          
          <p className="footer-text">
            © {new Date().getFullYear()} Campus Quest . All rights reserved. v1.0
          </p>
        </div>
      </footer>
    </div>
  );
};

export default StudentHome;