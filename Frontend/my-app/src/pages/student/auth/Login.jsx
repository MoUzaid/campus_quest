import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { useLoginStudentMutation } from "../../../redux/services/studentApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../redux/features/authSlice";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginStudent, { isLoading, error }] =
    useLoginStudentMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginStudent(formData).unwrap();
      dispatch(
        setCredentials({
          user: res.user,
          role: "student",
        })
      );
      // example redirect after login
      navigate("/student/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">Student Login</h2>
        <p className="auth-subtitle">
          Login to access your student portal
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Student ID or Email</label>
            <input
              type="text"
              id="identifier"
              name="email"
              className="auth-input"
              placeholder="Enter your Student ID or Email"
              value={formData.email}
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

          {/* Forgot password */}
          <div className="forgot-password">
            <Link to="/student/forgot-password" className="auth-link">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          {error && (
            <p style={{ color: "red", marginTop: "10px" }}>
              {error?.data?.msg || "Login failed"}
            </p>
          )}
        </form>

        <div className="auth-footer">
          Don't have an account?
          <Link to="/student/signup" className="auth-link">
            {" "}
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
