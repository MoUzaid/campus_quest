import { useState } from "react";
import { useResetPasswordMutation } from "../../../redux/services/studentApi";
import "./Auth.css";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const [resetPassword] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPass) {
      setMsg("Passwords do not match");
      return;
    }

    try {
      const res = await resetPassword({ token, newPassword }).unwrap();
      if (res) {
        setMsg("Redirecting to login...");
        setTimeout(() => navigate("/student/login"), 2000);
      }
    } catch (error) {
      setErr("Failed to reset password");
    }
  };

  return (
    <div className="student-login-page">
      <div className="student-login-card">
        <h2 className="student-login-title">Reset Password</h2>
        <p className="student-login-subtitle">
          Enter your new password
        </p>

        <form className="student-login-form" onSubmit={handleSubmit}>
          <input
            type="password"
            className="student-login-input"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <input
            type="password"
            className="student-login-input"
            placeholder="Confirm new password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            required
          />

          <button type="submit" className="student-login-btn">
            Reset Password
          </button>

          {err && <p className="student-login-error">{err}</p>}
          {msg && <p>{msg}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
