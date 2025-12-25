import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: '', // email or studentId
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Data:', formData);
    // Add API call logic here
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">Student Login</h2>
        <p className="auth-subtitle">Login to access your student portal</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="identifier">Student ID or Email</label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              className="auth-input"
              placeholder="Enter your Student ID or Email"
              value={formData.identifier}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="auth-input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* ✅ Forgot Password link */}
          <div className="forgot-password">
            <Link to="/student/forgot-password" className="auth-link">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="auth-button">Login</button>
        </form>

        <div className="auth-footer">
          Don't have an account?
          <Link to="/student/signup" className="auth-link"> Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
