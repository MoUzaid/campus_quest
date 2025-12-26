





import React, { useState, useEffect } from "react";
import "./superAdminDashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Users,
  BookOpen,
  UserPlus,
  Calendar,
  Clock,
  History,
  Eye,
  BarChart3,
  GraduationCap,
  Target,
  TrendingUp,
  Award,
  MoreVertical,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  UserCheck
} from "lucide-react";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const [activeQuizTab, setActiveQuizTab] = useState("upcoming");
  const [loading, setLoading] = useState(true);

  /* ================= STATS ================= */
  const [stats, setStats] = useState({
    totalFaculties: 0,
    totalStudents: 0,   // TEMP
    activeCourses: 0,
    totalQuizzes: 0     // TEMP
  });

  /* ================= QUIZZES ================= */
  const [quizzes, setQuizzes] = useState({
    upcoming: [],
    ongoing: [],
    completed: []
  });

  /* ================= ACTION CARDS ================= */
  const actionCards = [
    {
      id: 1,
      title: "Add Faculty",
      path: "/superadmin/add-faculty",
      icon: <UserPlus />,
      description: "Register new faculty members with detailed profiles",
      count: `${stats.totalFaculties} Active`
    },
    {
      id: 2,
      title: "Add Course",
      path: "/superadmin/course-management",
      icon: <BookOpen />,
      description: "Create and manage academic courses",
      count: `${stats.activeCourses} Courses`
    },
    {
      id: 3,
      title: "View Faculty",
      path: "/superadmin/view-faculty",
      icon: <Users />,
      description: "Browse complete faculty directory",
      count: `${stats.totalFaculties} Faculty`
    },
    {
      id: 4,
      title: "View Students",
      path: "/students",
      icon: <GraduationCap />,
      description: "Access student management portal",
      count: stats.totalStudents ? `${stats.totalStudents} Students` : "Backend Pending"
    }
  ];

  /* ================= FETCH DASHBOARD DATA ================= */
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // ✅ FACULTY (ACTUAL)
        const facultyRes = await axios.get(
          "http://localhost:5000/api/faculty/all",
          { withCredentials: true }
        );

        // ✅ COURSES (ACTUAL)
        const courseRes = await axios.get(
          "http://localhost:5000/api/course",
          { withCredentials: true }
        );

        // 🟡 STUDENTS (TEMP ROUTE)
        let studentCount = 0;
        try {
          const studentRes = await axios.get(
            "http://localhost:5000/api/students/count",
            { withCredentials: true }
          );
          studentCount = studentRes.data.total || 0;
        } catch {
          studentCount = 0;
        }

        // 🟡 QUIZZES (TEMP ROUTE)
        let quizCount = 0;
        try {
          const quizRes = await axios.get(
            "http://localhost:5000/api/quizzes/count",
            { withCredentials: true }
          );
          quizCount = quizRes.data.total || 0;
        } catch {
          quizCount = 0;
        }

        setStats({
          totalFaculties: facultyRes.data.total || 0,
          activeCourses: courseRes.data.total || 0,
          totalStudents: studentCount,
          totalQuizzes: quizCount
        });

        // 🟡 QUIZ LIST TEMP (EMPTY – BACKEND READY)
        setQuizzes({
          upcoming: [],
          ongoing: [],
          completed: []
        });

      } catch (err) {
        console.error("Dashboard Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const currentQuizzes = quizzes[activeQuizTab] || [];

  return (
    <div className="superadmin-container">

      {/* ===== HEADER ===== */}
      <header className="superadmin-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Super Admin Dashboard</h1>
            <p>Welcome back! Manage your university efficiently</p>
          </div>

          <div
            className="profile-section"
            onClick={() => navigate("/superadmin/profile")}
          >
            <div className="profile-avatar">SA</div>
            <div className="profile-info">
              <h4>University Admin</h4>
              <p>Administrator</p>
            </div>
          </div>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <div className="main-content">

        {/* ===== STATISTICS ===== */}
        <div className="stats-overview">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="stat-item loading-shimmer" />
            ))
          ) : (
            <>
              <div className="stat-item">
                <h4>Total Faculty</h4>
                <div className="value">{stats.totalFaculties}</div>
                <div className="stat-trend trend-up">
                  <TrendingUp size={16} />
                  <span>Live from backend</span>
                </div>
              </div>

              <div className="stat-item">
                <h4>Total Students</h4>
                <div className="value">
                  {stats.totalStudents || "—"}
                </div>
                <div className="stat-trend">
                  <span>Temp route</span>
                </div>
              </div>

              <div className="stat-item">
                <h4>Active Courses</h4>
                <div className="value">{stats.activeCourses}</div>
                <div className="stat-trend trend-up">
                  <TrendingUp size={16} />
                  <span>Live from backend</span>
                </div>
              </div>

              <div className="stat-item">
                <h4>Total Quizzes</h4>
                <div className="value">
                  {stats.totalQuizzes || "—"}
                </div>
                <div className="stat-trend">
                  <span>Temp route</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ===== QUICK ACTIONS ===== */}
        <section className="actions-section">
          <h2 className="section-title">Quick Actions</h2>

          <div className="action-cards">
            {actionCards.map(card => (
              <div
                key={card.id}
                className="action-card"
                onClick={() => navigate(card.path)}
              >
                <div className="action-card-inner">
                  <div className="action-icon">{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <span className="action-count">{card.count}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== QUIZ MANAGEMENT ===== */}
        <section className="quiz-management-section">
          <div className="quiz-header">
            <h2>
              <Target size={28} />
              Quiz Management
            </h2>
            <p>Monitor and manage all departmental quizzes</p>
          </div>

          <div className="quiz-tabs">
            {["upcoming", "ongoing", "completed"].map(tab => (
              <button
                key={tab}
                className={`quiz-tab ${activeQuizTab === tab ? "active" : ""}`}
                onClick={() => setActiveQuizTab(tab)}
              >
                {tab.toUpperCase()}
                <span className="tab-badge">{quizzes[tab].length}</span>
              </button>
            ))}
          </div>

          <div className="quiz-content">
            {loading ? (
              <div className="empty-state">
                <div className="loading-shimmer" style={{ height: 300 }} />
              </div>
            ) : currentQuizzes.length === 0 ? (
              <div className="empty-state">
                <Target size={48} />
                <h3>No quizzes found</h3>
                <p>Backend integration pending</p>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
