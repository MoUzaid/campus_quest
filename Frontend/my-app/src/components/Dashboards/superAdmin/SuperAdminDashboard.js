import React from "react";
import "./superAdminDashboard.css";
import { useNavigate } from "react-router-dom";
const SuperAdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="superadmin-container">

      {/* ===== HEADER ===== */}
      <div className="superadmin-header">
        <h1>Super Admin Dashboard</h1>

        {/* 👤 PROFILE ICON */}
        <div
          className="profile-icon"
          onClick={() => navigate("/superadmin/profile")}
          title="View Profile"
        >
          👤
        </div>
      </div>

      <hr />

      {/* ===== QUICK ACTION CARDS ===== */}
      <div className="action-cards">
       <div className="action-cards">
      <div
        className="action-card"
        onClick={() => navigate("/superadmin/add-faculty")}
        style={{ cursor: "pointer" }}
      >
        <div className="icon">👨‍🏫</div>
        <p>Add Faculty</p>
      </div>
    </div>

       <div 

  className="action-card"
  onClick={() => navigate("/superadmin/course-management")}
>
  <div className="icon">➕</div>
  <p>Add Course</p>
</div>



        {/* <div className="action-card">
          <div className="icon">🎓</div>
          <p>View Students</p>
        </div> */}


<div
  className="action-card"
  onClick={() => navigate("/superadmin/view-faculty")}
  style={{ cursor: "pointer" }}
>
  <div className="icon">👥</div>
  <p>View Faculties</p>
</div>




        {/* <div className="action-card">
          <div className="icon">👥</div>
          <p>View Faculties</p>
        </div> */}

        <div
  className="action-card"
  onClick={() => (window.location.href = "/students")}
>
  <div className="icon">👥</div>
  <p>View Students</p>
</div>

      </div>

      {/* ===== QUIZ SECTION ===== */}
      <div className="quiz-section">
        <div className="quiz-header">
          <h2>Departmental Quizes</h2>

          <div className="quiz-actions">
            <input
              type="text"
              placeholder="Search for a quiz ..."
            />
            <button className="create-btn">+ Create New Quiz</button>
          </div>
        </div>

        {/* ===== UPCOMING ===== */}
        <div className="quiz-block">
          <h3>📅 Upcoming Quizes</h3>
          <div className="quiz-list">
            <div className="quiz-item">C++</div>
            <div className="quiz-item">Java</div>
            <div className="quiz-item">Python</div>
          </div>
        </div>

        {/* ===== ONGOING ===== */}
        <div className="quiz-block">
          <h3>⏳ Ongoing Quizes</h3>
          <div className="quiz-list">
            <div className="quiz-item">Python</div>
            <div className="quiz-item">JavaScript</div>
            <div className="quiz-item">DBMS</div>
          </div>
        </div>

        {/* ===== PREVIOUS ===== */}
        <div className="quiz-block">
          <h3>⏱ Previous Quizes</h3>
          <div className="quiz-list">
            <div className="quiz-item">C++</div>
            <div className="quiz-item">Java</div>
            <div className="quiz-item">Cyber</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SuperAdminDashboard;
