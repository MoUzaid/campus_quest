

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FacultyProfile.css";

const FacultyProfile = () => {
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // 🔐 Fetch profile using cookie automatically
        const res = await fetch("http://localhost:5000/api/faculty/me", {
          credentials: "include", // Important for cookies
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setFaculty(data.profile);
        setLoading(false);
      } catch (error) {
        // Redirect to login if not authorized
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      // Clear cookies from backend if you have logout endpoint
      await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error:", err);
    }

    navigate("/login");
  };

  if (loading) {
    return <p className="loading">Loading profile...</p>;
  }

  return (
    <div className="faculty-profile">
      <div className="profile-card">
        {/* HEADER */}
        <div className="profile-header">
          <div className="avatar">{faculty.name?.charAt(0).toUpperCase()}</div>
          <h2>{faculty.name}</h2>
          <p>{faculty.designation}</p>
        </div>

        {/* DETAILS */}
        <div className="profile-details">
          <div>
            <span>Name</span>
            <p>{faculty.name}</p>
          </div>

          <div>
            <span>Email</span>
            <p>{faculty.email}</p>
          </div>

          <div>
            <span>Department</span>
            <p>{faculty.department}</p>
          </div>

          <div>
            <span>Designation</span>
            <p>{faculty.designation}</p>
          </div>
        </div>

        {/* LOGOUT */}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default FacultyProfile;
