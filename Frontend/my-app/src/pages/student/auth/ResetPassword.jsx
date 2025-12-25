import "./Auth.css";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Password reset successful");
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">Reset Password</h2>
        <p className="auth-subtext">
          Enter your new password
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="password"
            className="auth-input"
            placeholder="New password"
            required
          />

          <input
            type="password"
            className="auth-input"
            placeholder="Confirm new password"
            required
          />

          <button type="submit" className="auth-button">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
