


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include", // ⭐ VERY IMPORTANT
        body: JSON.stringify({
          userId,
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials");
        return;
      }

      // 🔐 DO NOT store token anymore
      // cookies are already set by backend

      // 🎯 Redirect based on role
      if (data.role === "superadmin") {
        navigate("/superadmin");
      } else if (data.role === "faculty") {
        navigate("/faculty");
      } else if (data.role === "student") {
        navigate("/student");
      } else {
        setError("Unknown role");
      }

    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h3>Login</h3>

        {error && <p className="error-text">{error}</p>}

        <input
          placeholder="User ID / Faculty ID / Roll No"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
