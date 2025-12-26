


import React from "react";
import { FaBell, FaCommentDots, FaUserCircle } from "react-icons/fa";
import {
  FaHome,
  FaUserGraduate,
  FaClipboardList,
  FaChartBar
} from "react-icons/fa";
import "./facultyDashboard.css";
 import { useNavigate } from "react-router-dom";

const FacultyDashboard = () => {
   const navigate = useNavigate();
  const recentActivities = [
    {
      title: 'Quiz Published: "Data Structures"',
      date: "November 26, 2025",
      timeAgo: "2 hours ago",
    },
    {
      title: 'Quiz Published: "Operating System"',
      date: "November 25, 2025",
      timeAgo: "1 day ago",
    },
  ];

  return (
    <div className="dashboard">
      {/* HEADER */}
      <header className="header">
        <div>
          <h1>Welcome back, Dr. Professor</h1>
          <p>Assistant Professor</p>
        </div>
        <div className="icons">
          <FaBell />
          <FaCommentDots />
          <FaUserCircle
        className="profile-icon"
        title="View Profile"
        onClick={() => navigate("/faculty/profile")}
      />
        </div>
      </header>

      {/* TOP OPTIONS (4 CARDS) */}
      <div className="top-options">
        <div className="option-card">
          <FaHome className="option-icon" />
          <span>Dashboard</span>
        </div>

        <div className="option-card"
          onClick={() => (window.location.href = "/students")}>
          <FaUserGraduate className="option-icon" />
          
          <span> view-Students</span>
        </div>

        <div className="option-card">
          <FaClipboardList className="option-icon" />
          <span>Quizzes</span>
        </div>

        <div className="option-card">
          <FaChartBar className="option-icon" />
          <span>Analytics</span>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="recent-activity">
        <h3>Recent Activity</h3>

        {recentActivities.map((activity, index) => (
          <div key={index} className="activity-item">
            <div className="activity-left">
              <div className="activity-icon">❓</div>
              <div>
                <p className="activity-title">{activity.title}</p>
                <p className="activity-date">
                  Published on: {activity.date}
                </p>
              </div>
            </div>
            <p className="activity-time">{activity.timeAgo}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyDashboard;
