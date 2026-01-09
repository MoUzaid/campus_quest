import { useState } from "react";
import { useForgotPasswordMutation } from "../../../redux/services/studentApi";
import "./Auth.css";

const ForgotPassword = () => {
  const [forgotPassword] = useForgotPasswordMutation();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email).unwrap();
      alert("Password reset link sent to your email");
    } catch (err) {
      console.error(err);
      alert("Failed to send reset link. Please try again.");
    }
  };

  return (
    <div className="student-login-page">
      <div className="student-login-card">
        <h2 className="student-login-title">Forgot Password</h2>
        <p className="student-login-subtitle">
          Enter your registered email to reset your password
        </p>

        <form className="student-login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="student-login-input"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit" className="student-login-btn">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
