import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./styles/Login.css";

import { useLoginFacultyMutation } from "../redux/services/facultyApi";
import { useLoginSuperAdminMutation } from "../redux/services/superAdminApi";
import { setCredentials } from "../redux/features/authSlice";

const Login = () => {
  const [facultyId, setFacultyId] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginFaculty, { isLoading }] = useLoginFacultyMutation();
  const [loginSuperAdmin, { isLoading: isSuperAdminLoading }] =
    useLoginSuperAdminMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!userType) {
      setError("Please select user type");
      return;
    }

    try {
      let res;

      // ================= FACULTY LOGIN =================
      if (userType === "faculty") {
        res = await loginFaculty({
          facultyId,
          password,
        }).unwrap();
        
        dispatch(
          setCredentials({
            user: res.user,
            role: "faculty",
          })
        );

        navigate("/faculty/dashboard");
      }

      // ================= SUPER ADMIN LOGIN =================
      else if (userType === "superAdmin") {
        res = await loginSuperAdmin({
          facultyId,
          password,
        }).unwrap();

        dispatch(
          setCredentials({
            user: res.user,
            role: "superadmin",
          })
        );

        navigate("/superadmin/dashboard");
      }
    } catch (err) {
      // ✅ HANDLE TEMP PASSWORD (403)
      if (
        userType === "faculty" &&
        err?.status === 403 &&
        err?.data?.forceChangePassword
      ) {
        navigate("/faculty-change-password", {
          state: { facultyId },
        });
        return;
      }

      const message =
        err?.data?.msg ||
        err?.data?.message ||
        err?.error ||
        "Login failed";

      setError(message);
    }
  };



  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h3>Login</h3>

        <select
          value={userType}
          className="auth-select"
          onChange={(e) => setUserType(e.target.value)}
          required
        >
          <option value="">Select User Type</option>
          <option value="faculty">Faculty</option>
          <option value="superAdmin">Super Admin</option>
        </select>

        <input
          placeholder="User ID / Faculty ID"
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

        <button type="submit" disabled={isLoading || isSuperAdminLoading}>
          {isLoading || isSuperAdminLoading ? "Logging in..." : "Login"}
        </button>

        {error && <p className="error-text">{error}</p>}
      </form>
    </div>
  );
};

export default Login;