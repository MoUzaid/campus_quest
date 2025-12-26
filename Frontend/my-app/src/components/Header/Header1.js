// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Header1.css";

// const Header = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <header className="app-header">
//       <div className="logo">
//         <span>Campus Quest</span>
//       </div>

//       {!token ? (
//         <button onClick={() => navigate("/login")}>Login</button>
//       ) : (
//         <button onClick={logout}>Logout</button>
//       )}
//     </header>
//   );
// };

// export default Header;



import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header1.css";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="app-header">
      <div className="logo">
        <span>Campus Quest</span>
      </div>

      <div className="header-buttons">
        {!token ? (
          <button onClick={() => navigate("/login")}>Login</button>
        ) : (
          <>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
