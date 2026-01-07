
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { useSelector } from "react-redux";
import {logout} from "../../redux/features/authSlice";
import { useDispatch } from "react-redux";
import { studentApi } from "../../redux/services/studentApi";


const Header = () => {
  const navigate = useNavigate();
   const dispatch = useDispatch();
  const {user,role,isAuthenticated} = useSelector((state) => state.auth);
 console.log("Header auth state:", {user,role,isAuthenticated});

  const handleLogout = () => {
   dispatch(logout()); 
   dispatch(studentApi.util.resetApiState());
    navigate("/student/login");
  };

  return (
    <header className="app-header">
      <div className="logo">
        <span id="text">Welcome back!</span>
        <span id="user">{user}</span>
      </div>

      <div className="header-buttons">
        {!isAuthenticated ? (
          <button onClick={() => navigate("/student/login")}>Login</button>
        ) : (
          <>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
