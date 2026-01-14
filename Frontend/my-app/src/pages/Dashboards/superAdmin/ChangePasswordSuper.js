// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import "./ChangePassword.css";
// import { useChangePasswordMutation } from "../../../redux/services/superAdminApi";

// const ChangePassword = () => {
//   const navigate = useNavigate();
//   const [changePassword, { isLoading }] = useChangePasswordMutation();

//   const [formData, setFormData] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.newPassword !== formData.confirmPassword) {
//       alert("New passwords do not match");
//       return;
//     }

//     if (formData.newPassword.length < 6) {
//       alert("Password must be at least 6 characters");
//       return;
//     }

//     try {
//       await changePassword({
//         currentPassword: formData.currentPassword,
//         newPassword: formData.newPassword,
//       }).unwrap();

//       alert("Password updated successfully");
//       navigate(-1); // go back to profile
//     } catch (err) {
//       alert(err?.data?.message || "Failed to change password");
//     }
//   };

//   return (
//     <div className="change-password-container">
//       <div className="change-password-card">
//         <h2>Change Password</h2>
//         <p className="subtitle">
//           For security reasons, please choose a strong password.
//         </p>

//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Current Password</label>
//             <input
//               type="password"
//               value={formData.currentPassword}
//               onChange={(e) =>
//                 setFormData({ ...formData, currentPassword: e.target.value })
//               }
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>New Password</label>
//             <input
//               type="password"
//               value={formData.newPassword}
//               onChange={(e) =>
//                 setFormData({ ...formData, newPassword: e.target.value })
//               }
//               required
//               minLength={6}
//             />
//           </div>

//           <div className="form-group">
//             <label>Confirm New Password</label>
//             <input
//               type="password"
//               value={formData.confirmPassword}
//               onChange={(e) =>
//                 setFormData({ ...formData, confirmPassword: e.target.value })
//               }
//               required
//               minLength={6}
//             />
//           </div>

//           <div className="password-hints">
//             <ul>
//               <li className={formData.newPassword.length >= 6 ? "valid" : ""}>
//                 Minimum 6 characters
//               </li>
//               <li
//                 className={
//                   formData.newPassword &&
//                   formData.newPassword === formData.confirmPassword
//                     ? "valid"
//                     : ""
//                 }
//               >
//                 Passwords must match
//               </li>
//             </ul>
//           </div>

//           <div className="actions">
//             <button
//               type="button"
//               className="btn-secondary"
//               onClick={() => navigate(-1)}
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               className="btn-primary"
//               disabled={isLoading}
//             >
//               {isLoading ? "Updating..." : "Update Password"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ChangePassword;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../../../redux/services/superAdminApi";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    try {
      await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      }).unwrap();

      alert("Password updated successfully. Please login again.");
      navigate("/login");
    } catch (err) {
      alert(err?.data?.message || "Failed to update password");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* 🔵 BLUE HEADER */}
        <div style={styles.header}>
          <h2 style={styles.headerTitle}>Campus Quest</h2>
          <p style={styles.headerSubtitle}>Super Admin – Change Password</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              minLength={6}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
              style={styles.input}
            />
          </div>

          <div style={styles.hints}>
            <span>• Minimum 6 characters</span>
            <span>
              • Passwords match{" "}
              {formData.newPassword === formData.confirmPassword &&
              formData.newPassword
                ? "✅"
                : "❌"}
            </span>
          </div>

          <div style={styles.actions}>
            <button
              type="button"
              style={styles.backBtn}
              onClick={() => navigate("/superadmin/dashboard")}
            >
              Back
            </button>

            <button type="submit" style={styles.submitBtn} disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;


const styles = {
  container: {
    minHeight: "100vh",
    background: "#eef2f7",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "16px",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  },
  header: {
    background: "linear-gradient(135deg, #0d6efd, #084298)",
    color: "#fff",
    padding: "20px",
    textAlign: "center",
  },
  headerTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "700",
  },
  headerSubtitle: {
    margin: "6px 0 0",
    fontSize: "14px",
    opacity: 0.9,
  },
  form: {
    padding: "22px",
  },
  formGroup: {
    marginBottom: "14px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "6px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  hints: {
    fontSize: "13px",
    color: "#555",
    marginBottom: "18px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  actions: {
    display: "flex",
    gap: "10px",
  },
  backBtn: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    background: "#fff",
    cursor: "pointer",
  },
  submitBtn: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    background: "#0d6efd",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
};
