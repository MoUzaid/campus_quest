import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import'../styles/Login.css';

const Login = () => {
  const [facultyId, setFacultyId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://localhost:5000/api/superadmin/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            facultyId,   // 🔑 matches SuperAdmin schema
            password
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Invalid credentials");
        return;
      }

      // ✅ SAVE AUTH DATA
      localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

      // 🔥 redirect to SuperAdmin dashboard
      navigate("/superadmin");
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h3>Super Admin Login</h3>

        <input
          placeholder="Faculty ID"
          value={facultyId}
          onChange={(e) => setFacultyId(e.target.value)}
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
