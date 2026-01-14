// import React, { useState } from "react";
// import { useChangePasswordMutation } from "../../../redux/services/facultyApi";
// import "./FacultyChangePassword.css";

// const FacultyChangePassword = () => {
//   const [formData, setFormData] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [changePassword, { isLoading }] = useChangePasswordMutation();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.newPassword !== formData.confirmPassword) {
//       alert("New password and confirm password do not match");
//       return;
//     }

//     try {
//       const response = await changePassword({
//         currentPassword: formData.currentPassword,
//         newPassword: formData.newPassword,
//       }).unwrap();

//       alert(response.msg || "Password updated successfully");
//       setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
//     } catch (error) {
//       console.error("Change password error:", error);
//       alert(error?.data?.msg || "Password update failed");
//     }
//   };

//   return (
//     <div className="change-password-container">
//       <div className="change-password-card">
//         <h2 className="title">Campus Quest</h2>
//         <p className="subtitle">Faculty Update Password</p>

//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Current Password</label>
//             <input
//               type="password"
//               name="currentPassword"
//               value={formData.currentPassword}
//               onChange={handleChange}
//               placeholder="Enter current password"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>New Password</label>
//             <input
//               type="password"
//               name="newPassword"
//               value={formData.newPassword}
//               onChange={handleChange}
//               placeholder="Enter new password"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Confirm New Password</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               placeholder="Re-enter new password"
//               required
//             />
//           </div>

//           <button type="submit" className="btn-primary" disabled={isLoading}>
//             {isLoading ? "Updating..." : "Update Password"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default FacultyChangePassword;




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../../../redux/services/studentApi";
// import "./FacultyChangePassword.css";

const FacultyChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Password validation function
  const validatePassword = (password) => {
    const rules = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    return rules;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validatePassword(formData.newPassword);
    const validationErrors = {};

    if (!validation.length) validationErrors.newPassword = "Password must be at least 8 characters";
    if (!validation.uppercase) validationErrors.newPassword = "Password must include at least one uppercase letter";
    if (!validation.lowercase) validationErrors.newPassword = "Password must include at least one lowercase letter";
    if (!validation.number) validationErrors.newPassword = "Password must include at least one number";
    if (!validation.special) validationErrors.newPassword = "Password must include at least one special character";

    if (formData.newPassword !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      }).unwrap();

      alert(response.msg || "Password updated successfully!");
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      navigate("/student/login"); // Redirect to login
    } catch (error) {
      console.error("Change password error:", error);
      alert(error?.data?.msg || "Password update failed");
    }
  };

  return (
    <div className="change-password-container">
      <div className="change-password-card">
        <header className="header">
          <h1>Campus Quest</h1>
          <h2>Student Password Update</h2>
          <button className="dashboard-btn" onClick={() => navigate("/student/dashboard")}>
            Back to Dashboard
          </button>
        </header>

        <form onSubmit={handleSubmit} className="password-form">
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
              required
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              required
            />
            {errors.newPassword && <span className="error">{errors.newPassword}</span>}
          </div>

          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter new password"
              required
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FacultyChangePassword;

