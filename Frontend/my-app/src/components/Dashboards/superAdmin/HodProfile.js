import React, { useEffect, useState } from "react";
import "./HodProfile.css";

const HodProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   fetch("http://localhost:5000/api/superadmin/me", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }


    })
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => {
        localStorage.clear();
        window.location.href = "/login";
      });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">

        <div className="profile-top">
          <div className="avatar">👤</div>
          <h2>{profile.facultyName}</h2>
          <span className="role">{profile.designation}</span>
        </div>

        <div className="profile-info">
          <div className="info-row">
            <span>Faculty Name</span>
            <p>{profile.facultyName}</p>
          </div>

          <div className="info-row">
            <span>Faculty ID</span>
            <p>{profile.facultyId}</p>
          </div>

          <div className="info-row">
            <span>Department</span>
            <p>{profile.department}</p>
          </div>

          <div className="info-row">
            <span>Designation</span>
            <p>{profile.designation}</p>
          </div>

          <div className="info-row">
            <span>Email</span>
            <p>{profile.email}</p>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

      </div>
    </div>
  );
};

export default HodProfile;
