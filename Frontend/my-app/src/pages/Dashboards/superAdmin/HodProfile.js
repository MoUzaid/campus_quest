


import React, { useEffect, useState } from "react";
import "./HodProfile.css";

const HodProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    fetch("http://localhost:5000/api/superadmin/me", {
      method: "GET",
      credentials: "include"
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => {
        window.location.href = "/login";
      });
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/superadmin/logout", {
        method: "POST",
        credentials: "include"
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      window.location.href = "/login";
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/superadmin/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      if (response.ok) {
        alert("Password changed successfully!");
        setShowPasswordModal(false);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
      } else {
        const error = await response.json();
        alert(error.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("An error occurred while changing password");
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="spinner-ring">
            <div className="ring"></div>
            <div className="ring"></div>
            <div className="ring"></div>
            <div className="avatar-placeholder"></div>
          </div>
          <h3>Loading Profile</h3>
          <p>Please wait while we fetch your details...</p>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <>
      <div className="hod-profile-container">
        {/* Decorative Background Elements */}
        <div className="bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>

        <div className="profile-main">
          {/* Profile Card */}
          <div className="profile-card-elegant">
            {/* Profile Header with Floating Elements */}
            <div className="card-header">
              <div className="header-decoration">
                <div className="decoration-line"></div>
                <div className="academic-icon">🎓</div>
                <div className="decoration-line"></div>
              </div>
              
              <div className="profile-avatar-section">
                <div className="avatar-wrapper">
                  <div className="avatar-glow"></div>
                  <div className="profile-avatar-main">
                    <span className="avatar-initials">
                      {profile.facultyName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="avatar-status">
                    <div className="status-dot"></div>
                    <span className="status-text">HOD</span>
                  </div>
                </div>
                
                <div className="profile-titles-main">
                  <h1 className="profile-name-main">{profile.facultyName}</h1>
                  <div className="profile-subtitles">
                    <span className="subtitle-item">
                      <span className="subtitle-icon">💼</span>
                      {profile.designation}
                    </span>
                    <span className="subtitle-item">
                      <span className="subtitle-icon">🏛️</span>
                      {profile.department}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details with Elegant Layout */}
            <div className="profile-details-elegant">
              <div className="details-section-elegant">
                <div className="section-header">
                  <h3 className="section-title-elegant">
                    <span className="title-icon">📋</span>
                    Personal Information
                  </h3>
                  <div className="section-line"></div>
                </div>
                
                <div className="info-grid-elegant">
                  <div className="info-card">
                    <div className="info-card-icon">👤</div>
                    <div className="info-card-content">
                      <label>Full Name</label>
                      <h4>{profile.facultyName}</h4>
                    </div>
                    <div className="info-card-decoration"></div>
                  </div>

                  <div className="info-card">
                    <div className="info-card-icon">🆔</div>
                    <div className="info-card-content">
                      <label>Faculty ID</label>
                      <h4 className="faculty-id">{profile.facultyId}</h4>
                    </div>
                    <div className="info-card-decoration"></div>
                  </div>

                  <div className="info-card">
                    <div className="info-card-icon">📧</div>
                    <div className="info-card-content">
                      <label>Email Address</label>
                      <h4 className="email-text">{profile.email}</h4>
                    </div>
                    <div className="info-card-decoration"></div>
                  </div>

                  <div className="info-card">
                    <div className="info-card-icon">🏛️</div>
                    <div className="info-card-content">
                      <label>Department</label>
                      <h4>{profile.department}</h4>
                    </div>
                    <div className="info-card-decoration"></div>
                  </div>

                  <div className="info-card">
                    <div className="info-card-icon">💼</div>
                    <div className="info-card-content">
                      <label>Designation</label>
                      <h4>{profile.designation}</h4>
                    </div>
                    <div className="info-card-decoration"></div>
                  </div>

                  <div className="info-card">
                    <div className="info-card-icon">🔒</div>
                    <div className="info-card-content">
                      <label>Account Security</label>
                      <h4 className="security-status">Password Protected</h4>
                    </div>
                    <div className="info-card-decoration"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons with Elegant Style */}
            <div className="action-buttons-elegant">
              <button 
                className="action-btn btn-change-password"
                onClick={() => setShowPasswordModal(true)}
              >
                <span className="btn-icon-main">🔑</span>
                <span className="btn-text">Change Password</span>
                <span className="btn-arrow">→</span>
              </button>
              
              <button 
                className="action-btn btn-profile"
                onClick={() => {/* Edit profile functionality */}}
              >
                <span className="btn-icon-main">✏️</span>
                <span className="btn-text">Edit Profile</span>
                <span className="btn-arrow">→</span>
              </button>
              
              <button 
                className="action-btn btn-logout"
                onClick={handleLogout}
              >
                <span className="btn-icon-main">🚪</span>
                <span className="btn-text">Logout</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>

            {/* Footer Note */}
            <div className="profile-footer">
              <p className="footer-note">
                <span className="note-icon">ℹ️</span>
                This profile information is securely stored and can be updated as needed.
              </p>
            </div>
          </div>
        </div>

        {/* Password Change Modal */}
        {showPasswordModal && (
          <div className="modal-overlay-elegant" onClick={() => setShowPasswordModal(false)}>
            <div className="modal-content-elegant" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-elegant">
                <h3 className="modal-title">
                  <span className="modal-icon">🔐</span>
                  Change Password
                </h3>
                <p className="modal-subtitle">Secure your account with a new password</p>
              </div>
              
              <form onSubmit={handlePasswordChange} className="password-form">
                <div className="form-group-elegant">
                  <label htmlFor="currentPassword">
                    <span className="form-icon">🔒</span>
                    Current Password
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="password"
                      id="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value
                      })}
                      required
                      placeholder="Enter your current password"
                      className="form-input"
                    />
                    <div className="input-underline"></div>
                  </div>
                </div>

                <div className="form-group-elegant">
                  <label htmlFor="newPassword">
                    <span className="form-icon">🆕</span>
                    New Password
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="password"
                      id="newPassword"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value
                      })}
                      required
                      placeholder="Enter new password (min. 6 characters)"
                      minLength="6"
                      className="form-input"
                    />
                    <div className="input-underline"></div>
                  </div>
                </div>

                <div className="form-group-elegant">
                  <label htmlFor="confirmPassword">
                    <span className="form-icon">✓</span>
                    Confirm Password
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="password"
                      id="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value
                      })}
                      required
                      placeholder="Re-enter new password"
                      minLength="6"
                      className="form-input"
                    />
                    <div className="input-underline"></div>
                  </div>
                </div>

                <div className="form-requirements">
                  <p className="requirements-title">Password Requirements:</p>
                  <ul className="requirements-list">
                    <li className={passwordData.newPassword.length >= 6 ? 'valid' : ''}>
                      Minimum 6 characters
                    </li>
                    <li className={passwordData.newPassword && passwordData.newPassword === passwordData.confirmPassword ? 'valid' : ''}>
                      Passwords must match
                    </li>
                  </ul>
                </div>

                <div className="modal-actions-elegant">
                  <button 
                    type="button"
                    className="modal-btn btn-cancel"
                    onClick={() => setShowPasswordModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="modal-btn btn-submit"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HodProfile;







