




// import React, { useEffect, useState } from "react";
// import "./HodProfile.css";
// import { useNavigate } from "react-router-dom";
// import {
//   useGetSuperAdminQuery,
//   useChangePasswordMutation,
//   useUpdateSuperAdminProfileMutation,
// } from "../../../redux/services/superAdminApi";

// const HodProfile = () => {
//   const navigate = useNavigate();

//   const { data: profile, isLoading, refetch } = useGetSuperAdminQuery();
//   const [changePassword] = useChangePasswordMutation();
//   const [updateProfile] = useUpdateSuperAdminProfileMutation();

//   const [showPasswordModal, setShowPasswordModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);

//   const [passwordData, setPasswordData] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [editData, setEditData] = useState({
//     username: "",
//     email: "",
//     designation: "",
//     department: "",
//   });

//   useEffect(() => {
//     if (profile) {
//       setEditData({
//         username: profile.username || "",
//         email: profile.email || "",
//         designation: profile.designation || "",
//         department: profile.department || "",
//       });
//     }
//   }, [profile]);

//   const handleLogout = () => {
//     navigate("/login");
//   };

//   /* ---------------- PASSWORD CHANGE ---------------- */
//   const handlePasswordChange = async (e) => {
//     e.preventDefault();

//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       alert("New passwords do not match");
//       return;
//     }

//     try {
//       await changePassword({
//         currentPassword: passwordData.currentPassword,
//         newPassword: passwordData.newPassword,
//       }).unwrap();

//       alert("Password updated successfully");
//       setShowPasswordModal(false);
//       setPasswordData({
//         currentPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//       });
//     } catch (err) {
//       alert(err?.data?.message || "Password update failed");
//     }
//   };

//   /* ---------------- PROFILE UPDATE ---------------- */
//   const handleProfileUpdate = async (e) => {
//     e.preventDefault();

//     try {
//       await updateProfile(editData).unwrap();
//       alert("Profile updated successfully");
//       setShowEditModal(false);
//       refetch();
//     } catch (err) {
//       alert(err?.data?.message || "Profile update failed");
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="loading-screen">
//         <h3>Loading profile...</h3>
//       </div>
//     );
//   }

//   if (!profile) return null;

//   return (
//     <>
//       <div className="hod-profile-container">
//         <div className="profile-card-elegant">

//           {/* -------- HEADER -------- */}
//           <div className="card-header">
//             <div className="profile-avatar-main">
//               {profile.username
//                 .split(" ")
//                 .map((n) => n[0])
//                 .join("")}
//             </div>

//             <div className="profile-titles-main">
//               <h1>{profile.username}</h1>
//               <p>{profile.designation} • {profile.department}</p>
//               <span className="role-badge">System Administrator</span>
//             </div>
//           </div>

//           {/* -------- DETAILS -------- */}
//           <div className="profile-details-elegant">
//             <div className="info-grid-elegant">
//               <div className="info-card">
//                 <label>Email</label>
//                 <h4>{profile.email}</h4>
//               </div>
//               <div className="info-card">
//                 <label>Faculty ID</label>
//                 <h4>{profile.facultyId}</h4>
//               </div>
//               <div className="info-card">
//                 <label>Department</label>
//                 <h4>{profile.department}</h4>
//               </div>
//               <div className="info-card">
//                 <label>Designation</label>
//                 <h4>{profile.designation}</h4>
//               </div>
//             </div>
//           </div>

//           {/* -------- ACTIONS -------- */}
//           <div className="action-buttons-elegant">
//             <button
//               className="action-btn btn-profile"
//               onClick={() => setShowEditModal(true)}
//             >
//               ✏️ Edit Profile
//             </button>

//         <button
//   className="action-btn btn-change-password"
//   onClick={() => navigate("/change-password")}
// >
//   🔐 Change Password
// </button>


//             <button className="action-btn btn-logout" onClick={handleLogout}>
//               🚪 Logout
//             </button>
//           </div>

//           <div className="profile-footer">
//             <p>
//               Profile information is securely managed under Campus Quest
//               enterprise standards.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* ================= EDIT PROFILE MODAL ================= */}
//       {showEditModal && (
//         <div className="modal-overlay-elegant" onClick={() => setShowEditModal(false)}>
//           <div className="modal-content-elegant" onClick={(e) => e.stopPropagation()}>
//             <h3>Edit Profile</h3>
//             <p className="modal-subtitle">
//               Update your official information
//             </p>

//             <form onSubmit={handleProfileUpdate}>
//               <div className="form-group-elegant">
//                 <label>Full Name</label>
//                 <input
//                   type="text"
//                   value={editData.username}
//                   onChange={(e) =>
//                     setEditData({ ...editData, username: e.target.value })
//                   }
//                   required
//                 />
//               </div>

//               <div className="form-group-elegant">
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   value={editData.email}
//                   onChange={(e) =>
//                     setEditData({ ...editData, email: e.target.value })
//                   }
//                   required
//                 />
//               </div>

//               <div className="form-group-elegant">
//                 <label>Designation</label>
//                 <input
//                   type="text"
//                   value={editData.designation}
//                   onChange={(e) =>
//                     setEditData({ ...editData, designation: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="form-group-elegant">
//                 <label>Department</label>
//                 <input
//                   type="text"
//                   value={editData.department}
//                   onChange={(e) =>
//                     setEditData({ ...editData, department: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="modal-actions-elegant">
//                 <button
//                   type="button"
//                   className="modal-btn btn-cancel"
//                   onClick={() => setShowEditModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="modal-btn btn-submit">
//                   Save Changes
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* ================= PASSWORD MODAL (UNCHANGED) ================= */}
//       {showPasswordModal && (
//         <div className="modal-overlay-elegant" onClick={() => setShowPasswordModal(false)}>
//           <div className="modal-content-elegant" onClick={(e) => e.stopPropagation()}>
//             <h3>Change Password</h3>

//             <form onSubmit={handlePasswordChange}>
//               <input
//                 type="password"
//                 placeholder="Current password"
//                 value={passwordData.currentPassword}
//                 onChange={(e) =>
//                   setPasswordData({ ...passwordData, currentPassword: e.target.value })
//                 }
//                 required
//               />
//               <input
//                 type="password"
//                 placeholder="New password"
//                 value={passwordData.newPassword}
//                 onChange={(e) =>
//                   setPasswordData({ ...passwordData, newPassword: e.target.value })
//                 }
//                 required
//               />
//               <input
//                 type="password"
//                 placeholder="Confirm new password"
//                 value={passwordData.confirmPassword}
//                 onChange={(e) =>
//                   setPasswordData({ ...passwordData, confirmPassword: e.target.value })
//                 }
//                 required
//               />

//               <div className="modal-actions-elegant">
//                 <button
//                   type="button"
//                   className="modal-btn btn-cancel"
//                   onClick={() => setShowPasswordModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="modal-btn btn-submit">
//                   Update Password
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default HodProfile;




import React, { useEffect, useState } from "react";
import "./HodProfile.css";
import { useNavigate } from "react-router-dom";
import {
  useGetSuperAdminQuery,
  useChangePasswordMutation,
  useUpdateSuperAdminProfileMutation,
} from "../../../redux/services/superAdminApi";

const HodProfile = () => {
  const navigate = useNavigate();

  const { data: profile, isLoading, refetch } = useGetSuperAdminQuery();
  const [changePassword] = useChangePasswordMutation();
  const [updateProfile] = useUpdateSuperAdminProfileMutation();

  const [showEditModal, setShowEditModal] = useState(false);

  const [editData, setEditData] = useState({
    username: "",
    email: "",
    designation: "",
    department: "",
  });

  useEffect(() => {
    if (profile) {
      setEditData({
        username: profile.username || "",
        email: profile.email || "",
        designation: profile.designation || "",
        department: profile.department || "",
      });
    }
  }, [profile]);

  const handleLogout = () => {
    navigate("/login");
  };

  /* ---------------- PROFILE UPDATE ---------------- */
  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(editData).unwrap();
      alert("Profile updated successfully");
      setShowEditModal(false);
      refetch();
    } catch (err) {
      alert(err?.data?.message || "Profile update failed");
    }
  };

  if (isLoading) {
    return (
      <div className="simple-loading">
        <h3>Loading profile...</h3>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <>
      <div className="simple-profile-container">
        <div className="simple-profile-card">
          {/* Header Section */}
          <div className="simple-profile-header">
            <div className="profile-avatar">
              <div className="avatar-initials">
                {profile.username
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            </div>
            <div className="profile-title">
              <h1>{profile.username}</h1>
              <p className="profile-subtitle">{profile.designation}</p>
              <span className="profile-badge">Super Administrator</span>
            </div>
          </div>

          {/* Profile Form Layout */}
          <div className="profile-form-layout">
            <div className="form-section">
              <h3 className="section-title">Personal Information</h3>
              
              <div className="form-row">
                <div className="form-field">
                  <label>Full Name</label>
                  <div className="field-value">{profile.username}</div>
                </div>
                
                <div className="form-field">
                  <label>Email Address</label>
                  <div className="field-value">{profile.email}</div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Faculty ID</label>
                  <div className="field-value">{profile.facultyId}</div>
                </div>
                
                <div className="form-field">
                  <label>Department</label>
                  <div className="field-value">{profile.department}</div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Designation</label>
                  <div className="field-value">{profile.designation}</div>
                </div>
                
                <div className="form-field">
                  <label>Account Type</label>
                  <div className="field-value">Super Administrator</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="profile-actions">
              <button
                className="action-btn edit-btn"
                onClick={() => setShowEditModal(true)}
              >
                Edit Profile
              </button>
              
              <button
                className="action-btn password-btn"
                onClick={() => navigate("/change-password")}
              >
                Change Password
              </button>
              
              <button 
                className="action-btn logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="simple-modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="simple-modal" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header with Blue Background */}
            <div className="modal-header-blue">
              <h2>Edit Profile Information</h2>
              <p>Update your personal details</p>
            </div>

            <form onSubmit={handleProfileUpdate} className="modal-form">
              <div className="modal-form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  value={editData.username}
                  onChange={(e) =>
                    setEditData({ ...editData, username: e.target.value })
                  }
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="modal-form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                  required
                  placeholder="Enter your email address"
                />
              </div>

              <div className="form-grid">
                <div className="modal-form-group">
                  <label>Designation</label>
                  <input
                    type="text"
                    value={editData.designation}
                    onChange={(e) =>
                      setEditData({ ...editData, designation: e.target.value })
                    }
                    placeholder="Your designation"
                  />
                </div>

                <div className="modal-form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    value={editData.department}
                    onChange={(e) =>
                      setEditData({ ...editData, department: e.target.value })
                    }
                    placeholder="Your department"
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="modal-btn cancel-btn"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="modal-btn save-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default HodProfile;