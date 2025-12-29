import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { useLoginStudentMutation } from "../../../redux/services/studentApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../redux/features/authSlice";

const StudentLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginStudent, { isLoading, error }] =
    useLoginStudentMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting", formData);
      const res = await loginStudent(formData).unwrap();
      dispatch(setCredentials({ user: res.student.name, role: "student" }));
      navigate("/");
    } catch {}
  };

  return (
    <div className="student-login-page">
      <div className="student-login-card">
        <h2 className="student-login-title">Student Login</h2>
        <p className="student-login-subtitle">
          Login to access your student portal
        </p>

        <form className="student-login-form" onSubmit={handleSubmit}>
          <div className="student-login-group">
            <label>Email or Student ID</label>
            <input
              name="email"
              className="student-login-input"
              placeholder="Enter your email or ID"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="student-login-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="student-login-input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="student-login-forgot">
            <Link to="/student/forgot-password">Forgot password?</Link>
          </div>

          <button
            type="submit"
            className="student-login-btn"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          {error && (
            <p className="student-login-error">
              {error?.data?.msg || "Login failed"}
            </p>
          )}
        </form>

        <div className="student-login-footer">
          Don’t have an account?
          <Link to="/student/signup"> Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
