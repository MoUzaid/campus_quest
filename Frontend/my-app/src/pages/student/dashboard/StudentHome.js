
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentHome.css";
import OngoingQuizzes from "./components/OngoingQuizzes";
import RegisteredQuizzes from "./components/RegisteredQuizzes";
import PreviousQuizzes from "./components/PreviousQuizzes";
import { 
  FaUserCircle, 
  FaHome, 
  FaArrowLeft,
  FaBookOpen,
  FaCalendarCheck,
  FaHistory,
  FaChevronRight,
  FaBell
} from "react-icons/fa";
import { 
  FiCalendar,
  FiChevronDown
} from "react-icons/fi";
import { 
  IoStatsChart,
  IoPersonCircleOutline
} from "react-icons/io5";

const AcademicHub = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ongoing");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

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

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading academic Quizzes...</p>
      </div>
    );
  }

  if (!student) {
    return null;
  }

  return (
    <div className="academic-hub-container">
      {/* Premium Header */}
      <header className="academic-hub-header">
        <div className="header-wrapper">
          <div className="header-main">
            {/* Left Section - Brand & Back */}
            <div className="header-left">
              <button 
                className="header-back-btn"
                onClick={() => navigate("/student/dashboard")}
              >
                <FaArrowLeft className="back-icon" />
                <span className="back-text">Dashboard</span>
              </button>
              
              <div className="header-divider"></div>
              
              <div className="header-brand">
                <FaBookOpen className="brand-icon" />
                <div className="brand-text">
                  <h1 className="brand-title">Academic Quizzes</h1>
                  <p className="brand-subtitle">Learning Resources & Assessments</p>
                </div>
              </div>
            </div>

            {/* Right Section - Actions */}
            <div className="header-right">
              <div className="header-actions">
                {/* Date Display */}
                <div className="date-display">
                  <FiCalendar className="date-icon" />
                  <span className="date-text">
                    {new Date().toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>

                {/* Notifications */}
                {/* <div className="notification-wrapper">
                  <button className="notification-btn">
                    <FaBell className="bell-icon" />
                    <span className="notification-badge">3</span>
                  </button>
                </div> */}

                {/* Profile Dropdown */}
                <div className="profile-wrapper">
                  <button 
                    className="profile-btn"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                  >
                    <div className="profile-avatar">
                      {student.profilePicture ? (
                        <img src={student.profilePicture} alt={student.name} />
                      ) : (
                        <FaUserCircle size={36} />
                      )}
                    </div>
                    <div className="profile-info">
                      <span className="profile-name">{student.name.split(" ")[0]}</span>
                      <span className="profile-role">Student</span>
                    </div>
                    <FiChevronDown className={`profile-chevron ${showProfileMenu ? 'rotate' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {showProfileMenu && (
                    <div className="profile-menu">
                      <button 
                        className="menu-item"
                        onClick={() => navigate("/student/profile")}
                      >
                        <IoPersonCircleOutline className="menu-icon" />
                        <span>My Profile</span>
                      </button>
                      
                      <div className="menu-divider"></div>
                      <button 
                        className="menu-item logout"
                        onClick={handleLogout}
                      >
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="header-mobile">
            <button 
              className="mobile-back-btn"
              onClick={() => navigate("/student/dashboard")}
            >
              <FaArrowLeft />
            </button>
            
            <div className="mobile-brand">
              <FaBookOpen />
              <span>Academic Hub</span>
            </div>
            
            <button 
              className="mobile-menu-btn"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <div className="mobile-avatar">
                {student.profilePicture ? (
                  <img src={student.profilePicture} alt={student.name} />
                ) : (
                  <FaUserCircle size={28} />
                )}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="academic-hub-main">
        {/* Tab Navigation */}
        <div className="tab-navigation">
          <div className="tab-header">
            <h2 className="tab-main-title">Your Assessments</h2>
            <p className="tab-subtitle">Manage and track all your quizzes in one place</p>
          </div>
          
          <div className="tab-buttons">
            <button 
              className={`tab-button ${activeTab === "ongoing" ? "active" : ""}`}
              onClick={() => setActiveTab("ongoing")}
            >
              <FaBookOpen className="tab-icon" />
              <span className="tab-label">Ongoing</span>
              {activeTab === "ongoing" && <div className="tab-indicator"></div>}
            </button>
            
            <button 
              className={`tab-button ${activeTab === "registered" ? "active" : ""}`}
              onClick={() => setActiveTab("registered")}
            >
              <FaCalendarCheck className="tab-icon" />
              <span className="tab-label">Registered</span>
              {activeTab === "registered" && <div className="tab-indicator"></div>}
            </button>
            
            <button 
              className={`tab-button ${activeTab === "previous" ? "active" : ""}`}
              onClick={() => setActiveTab("previous")}
            >
              <FaHistory className="tab-icon" />
              <span className="tab-label">Previous</span>
              {activeTab === "previous" && <div className="tab-indicator"></div>}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === "ongoing" && (
            <section className="content-section">
              <div className="section-header">
                <h3 className="section-title">
                  <FaBookOpen className="title-icon" />
                  Ongoing Quizzes
                </h3>
                <p className="section-description">
                  Active quizzes that require your immediate attention
                </p>
              </div>
              <OngoingQuizzes />
            </section>
          )}
          
          {activeTab === "registered" && (
            <section className="content-section">
              <div className="section-header">
                <h3 className="section-title">
                  <FaCalendarCheck className="title-icon" />
                  Registered Quizzes
                </h3>
                <p className="section-description">
                  Upcoming quizzes you are scheduled to take
                </p>
              </div>
              <RegisteredQuizzes />
            </section>
          )}
          
          {activeTab === "previous" && (
            <section className="content-section">
              <div className="section-header">
                <h3 className="section-title">
                  <FaHistory className="title-icon" />
                  Previous Quizzes
                </h3>
                <p className="section-description">
                  Review your past quiz attempts and performance history
                </p>
              </div>
              <PreviousQuizzes />
            </section>
          )}
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-section">
          <div className="actions-header">
            <h3 className="actions-title">Quick Navigation</h3>
            <p className="actions-subtitle">Quickly access other important sections</p>
          </div>
          
          <div className="actions-grid">
            <div 
              className="action-card primary-card"
              onClick={() => navigate("/student/dashboard")}
            >
              <div className="card-icon-wrapper">
                <FaHome className="card-icon" />
              </div>
              <div className="card-content">
                <h4 className="card-title">Dashboard</h4>
                <p className="card-description">Return to your main dashboard overview</p>
              </div>
              <FaChevronRight className="card-arrow" />
            </div>
            
            <div 
              className="action-card secondary-card"
              onClick={() => navigate(`/student/analytics/${student.id}`)}
            >
              <div className="card-icon-wrapper">
                <IoStatsChart className="card-icon" />
              </div>
              <div className="card-content">
                <h4 className="card-title">Performance Analytics</h4>
                <p className="card-description">View detailed insights and progress reports</p>
              </div>
              <FaChevronRight className="card-arrow" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="academic-hub-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <FaBookOpen className="footer-icon" />
            <div className="footer-brand-text">
              <span className="footer-brand-name">Academic Hub</span>
              <span className="footer-brand-tagline">QuizMaster Pro</span>
            </div>
          </div>
          
          <div className="footer-links">
            <button className="footer-link">Help Center</button>
            <span className="footer-divider">•</span>
            <button className="footer-link">Privacy Policy</button>
            <span className="footer-divider">•</span>
            <button className="footer-link">Terms of Service</button>
          </div>
          
          <p className="footer-copyright">
            © {new Date().getFullYear()} QuizMaster Pro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AcademicHub;