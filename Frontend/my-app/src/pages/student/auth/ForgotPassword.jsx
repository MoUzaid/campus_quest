import "./Auth.css";

const ForgotPassword = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Password reset link sent to your email");
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">Forgot Password</h2>
        <p className="auth-subtext">
          Enter your registered email to reset your password
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="auth-input"
            placeholder="Enter your email"
            required
          />

          <button type="submit" className="auth-button">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
