// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./FacultyProfile.css";

// const FacultyProfile = () => {
//   const [faculty, setFaculty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showEditModal, setShowEditModal] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobileNumber: "",
//     department: "",
//     designation: ""
//   });
//   console.log("Faculty profile:", faculty);


//   const navigate = useNavigate();

//   /* ================= FETCH PROFILE ================= */
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/faculty/me", {
//           credentials: "include"
//         });

//         if (!res.ok) throw new Error("Unauthorized");

//         const data = await res.json();
//         setFaculty(data.profile);

//         setFormData({
//           name: data.profile.name || "",
//           email: data.profile.email || "",
//           mobileNumber: data.profile.mobileNumber || "",
//           department: data.profile.department || "",
//           designation: data.profile.designation || ""
//         });

//         setLoading(false);
//       } catch (err) {
//         navigate("/login");
//       }
//     };

//     fetchProfile();
//   }, [navigate]);

//   /* ================= LOGOUT ================= */
//   const handleLogout = async () => {
//     try {
//       await fetch("http://localhost:5000/api/logout", {
//         method: "POST",
//         credentials: "include"
//       });
//     } catch (err) {
//       console.error("Logout error:", err);
//     }
//     navigate("/login");
//   };

//   /* ================= FORM HANDLING ================= */
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   /* ================= UPDATE PROFILE ================= */
//   const handleUpdateProfile = async () => {
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/faculty/update/${faculty.facultyId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           credentials: "include",
//           body: JSON.stringify(formData)
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.msg || "Update failed");
//         return;
//       }

//       setFaculty(data.faculty);
//       setShowEditModal(false);
//     } catch (err) {
//       console.error("Update error:", err);
//       alert("Something went wrong");
//     }
//   };

//   if (loading) {
//     return <p className="loading">Loading profile...</p>;
//   }

//   return (
//     <div className="faculty-profile">
//       <div className="profile-card">
//         {/* ================= HEADER ================= */}
//         <div className="profile-header">
//           <div className="avatar">
//             {faculty.name?.charAt(0).toUpperCase()}
//           </div>
//           <h2>{faculty.name}</h2>
//           <p>{faculty.designation}</p>
//         </div>

//         {/* ================= DETAILS ================= */}
//         <div className="profile-details">
//           <div>
//             <span>Faculty ID</span>
//             <p>{faculty.facultyId}</p>
//           </div>

//           <div>
//             <span>Name</span>
//             <p>{faculty.name}</p>
//           </div>

//           <div>
//             <span>Email</span>
//             <p>{faculty.email}</p>
//           </div>

//           <div>
//             <span>Mobile Number</span>
//             <p>{faculty.mobileNumber}</p>
//           </div>

//           <div>
//             <span>Department</span>
//             <p>{faculty.department}</p>
//           </div>

//           <div>
//             <span>Designation</span>
//             <p>{faculty.designation}</p>
//           </div>
//         </div>

//         {/* ================= ACTION BUTTONS ================= */}
//         <div className="profile-actions">
//           <button
//             className="edit-btn"
//             onClick={() => setShowEditModal(true)}
//           >
//             Edit Profile
//           </button>

//           <button
//             className="password-btn"
//             onClick={() => navigate("/faculty/change-password")}
//           >
//             Change Password
//           </button>

//           <button className="logout-btn" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* ================= EDIT PROFILE MODAL ================= */}
//       {showEditModal && (
//         <div className="modal-overlay">
//           <div className="modal-card">
//             <h3>Edit Profile</h3>

//             <div className="modal-form">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Name"
//                 value={formData.name}
//                 onChange={handleChange}
//               />

//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />

//               <input
//                 type="text"
//                 name="mobileNumber"
//                 placeholder="Mobile Number"
//                 value={formData.mobileNumber}
//                 onChange={handleChange}
//               />

//               <input
//                 type="text"
//                 name="department"
//                 placeholder="Department"
//                 value={formData.department}
//                 onChange={handleChange}
//               />

//               <input
//                 type="text"
//                 name="designation"
//                 placeholder="Designation"
//                 value={formData.designation}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="modal-actions">
//               <button className="save-btn" onClick={handleUpdateProfile}>
//                 Save Changes
//               </button>
//               <button
//                 className="cancel-btn"
//                 onClick={() => setShowEditModal(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FacultyProfile;




import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEdit,
  FaKey,
  FaSignOutAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaIdBadge,
  FaGraduationCap,
  FaCalendarAlt,
  FaTimes,
  FaSave,
  FaSpinner,
  FaBell,
  FaUpload
} from "react-icons/fa";
import "./FacultyProfile.css";

const FacultyProfile = () => {
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [profileImage, setProfileImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    department: "",
    designation: ""
  });

  const navigate = useNavigate();

  /* ================= NOTIFICATION HANDLER ================= */
  const showNotificationMessage = (type, message) => {
    setNotification({ type, message });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  /* ================= FETCH PROFILE ================= */
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/faculty/me", {
        credentials: "include"
      });

      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();
      setFaculty(data.profile);

      setFormData({
        name: data.profile.name || "",
        email: data.profile.email || "",
        mobileNumber: data.profile.mobileNumber || "",
        department: data.profile.department || "",
        designation: data.profile.designation || ""
      });

      // Simulate fetching profile image
      if (data.profile.imageUrl) {
        setProfileImage(data.profile.imageUrl);
      }
    } catch (err) {
      showNotificationMessage("error", "Failed to load profile. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [navigate]);

  /* ================= LOGOUT ================= */
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include"
      });
      showNotificationMessage("success", "Logged out successfully!");
    } catch (err) {
      showNotificationMessage("error", "Logout failed");
    } finally {
      setTimeout(() => navigate("/login"), 500);
    }
  };

  /* ================= FORM HANDLING ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /* ================= VALIDATION ================= */
  const validateForm = () => {
    if (!formData.name.trim()) {
      showNotificationMessage("error", "Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      showNotificationMessage("error", "Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      showNotificationMessage("error", "Invalid email format");
      return false;
    }
    if (formData.mobileNumber && !/^\d{10}$/.test(formData.mobileNumber)) {
      showNotificationMessage("error", "Invalid mobile number (10 digits required)");
      return false;
    }
    return true;
  };

  /* ================= UPDATE PROFILE ================= */
  const handleUpdateProfile = async () => {
    if (!validateForm()) return;

    try {
      setUpdating(true);
      const res = await fetch(
        `http://localhost:5000/api/faculty/update/${faculty.facultyId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData)
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Update failed");
      }

      setFaculty(data.faculty);
      setShowEditModal(false);
      showNotificationMessage("success", "Profile updated successfully!");
      fetchProfile(); // Refresh data
    } catch (err) {
      showNotificationMessage("error", err.message || "Update failed");
    } finally {
      setUpdating(false);
    }
  };

  /* ================= PROFILE IMAGE UPLOAD ================= */
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      showNotificationMessage("error", "Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showNotificationMessage("error", "Image size should be less than 5MB");
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      setUpdating(true);
      const res = await fetch(
        `http://localhost:5000/api/faculty/upload-image/${faculty.facultyId}`,
        {
          method: "POST",
          credentials: "include",
          body: formData
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Upload failed");
      }

      setProfileImage(URL.createObjectURL(file));
      showNotificationMessage("success", "Profile image updated!");
    } catch (err) {
      showNotificationMessage("error", err.message || "Upload failed");
    } finally {
      setUpdating(false);
    }
  };

  /* ================= MODAL HANDLERS ================= */
  const handleModalClose = () => {
    if (!updating) {
      setShowEditModal(false);
      // Reset form to current faculty data
      setFormData({
        name: faculty.name || "",
        email: faculty.email || "",
        mobileNumber: faculty.mobileNumber || "",
        department: faculty.department || "",
        designation: faculty.designation || ""
      });
    }
  };

  /* ================= LOADING STATE ================= */
  if (loading) {
    return (
      <div className="loading-container">
        <FaSpinner className="spinner" />
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="faculty-profile">
      {/* ================= NOTIFICATION ================= */}
      {showNotification && (
        <div className={`notification ${notification.type}`}>
          <FaBell />
          <span>{notification.message}</span>
          <button onClick={() => setShowNotification(false)}>
            <FaTimes />
          </button>
        </div>
      )}

      <div className="profile-container">
        {/* ================= SIDEBAR ================= */}
        <div className="profile-sidebar">
          <div className="avatar-container">
            <div className="avatar-wrapper">
              {profileImage ? (
                <img src={profileImage} alt={faculty.name} className="profile-image" />
              ) : (
                <div className="avatar-large">
                  {faculty.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <label className="image-upload-btn">
                <FaUpload />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={updating}
                />
              </label>
            </div>
            <h2>{faculty.name}</h2>
            <p className="designation">{faculty.designation}</p>
            <p className="department">{faculty.department}</p>
          </div>

          <div className="quick-stats">
            <h3>Quick Stats</h3>
            <div className="stat-item">
              <FaGraduationCap />
              <span>Courses: 5</span>
            </div>
            <div className="stat-item">
              <FaCalendarAlt />
              <span>Joined: 2023</span>
            </div>
          </div>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="profile-content">
          <div className="profile-header">
            <h1>Faculty Profile</h1>
            <div className="header-actions">
              <button
                className="btn-primary"
                onClick={() => setShowEditModal(true)}
                disabled={updating}
              >
                <FaEdit /> Edit Profile
              </button>
            </div>
          </div>

          {/* ================= DETAILS SECTION ================= */}
          <div className="details-section">
            <h2>Personal Information</h2>
            <div className="details-grid">
              <div className="detail-card">
                <div className="detail-icon">
                  <FaIdBadge />
                </div>
                <div className="detail-content">
                  <span className="detail-label">Faculty ID</span>
                  <p className="detail-value">{faculty.facultyId}</p>
                </div>
              </div>

              <div className="detail-card">
                <div className="detail-icon">
                  <FaUser />
                </div>
                <div className="detail-content">
                  <span className="detail-label">Full Name</span>
                  <p className="detail-value">{faculty.name}</p>
                </div>
              </div>

              <div className="detail-card">
                <div className="detail-icon">
                  <FaEnvelope />
                </div>
                <div className="detail-content">
                  <span className="detail-label">Email Address</span>
                  <p className="detail-value">{faculty.email}</p>
                </div>
              </div>

              <div className="detail-card">
                <div className="detail-icon">
                  <FaPhone />
                </div>
                <div className="detail-content">
                  <span className="detail-label">Mobile Number</span>
                  <p className="detail-value">{faculty.mobileNumber || "Not provided"}</p>
                </div>
              </div>

              <div className="detail-card">
                <div className="detail-icon">
                  <FaBuilding />
                </div>
                <div className="detail-content">
                  <span className="detail-label">Department</span>
                  <p className="detail-value">{faculty.department}</p>
                </div>
              </div>

              <div className="detail-card">
                <div className="detail-icon">
                  <FaGraduationCap />
                </div>
                <div className="detail-content">
                  <span className="detail-label">Designation</span>
                  <p className="detail-value">{faculty.designation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= ACTION BUTTONS ================= */}
          <div className="action-section">
            <button
              className="btn-secondary"
              onClick={() => navigate("/faculty-change-password")}
              disabled={updating}
            >
              <FaKey /> Change Password
            </button>
            <button
              className="btn-danger"
              onClick={handleLogout}
              disabled={updating}
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* ================= EDIT PROFILE MODAL ================= */}
      {showEditModal && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Profile</h2>
              <button className="close-btn" onClick={handleModalClose}>
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label><FaUser /> Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  disabled={updating}
                />
              </div>

              <div className="form-group">
                <label><FaEnvelope /> Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  disabled={updating}
                />
              </div>

              <div className="form-group">
                <label><FaPhone /> Mobile Number</label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="Enter 10-digit mobile number"
                  maxLength="10"
                  disabled={updating}
                />
              </div>

              <div className="form-group">
                <label><FaBuilding /> Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Enter department"
                  disabled={updating}
                />
              </div>

              <div className="form-group">
                <label><FaGraduationCap /> Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="Enter designation"
                  disabled={updating}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn-cancel"
                onClick={handleModalClose}
                disabled={updating}
              >
                Cancel
              </button>
              <button
                className="btn-save"
                onClick={handleUpdateProfile}
                disabled={updating}
              >
                {updating ? <FaSpinner className="spinner" /> : <FaSave />}
                {updating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyProfile;