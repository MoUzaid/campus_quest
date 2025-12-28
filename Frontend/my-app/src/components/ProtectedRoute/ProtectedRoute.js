import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const roleToMeEndpoint = {
  superadmin: "http://localhost:3000/api/superadmin/me",
  faculty: "http://localhost:3000/api/faculty/me",
  student: "http://localhost:3000/api/student/me"
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check user for each allowed role
        for (let role of allowedRoles) {
          const res = await fetch(roleToMeEndpoint[role], {
            credentials: "include" // send cookies
          });

          if (res.ok) {
            setAuthorized(true);
            setLoading(false);
            return;
          }
        }

        // If no role is valid
        setAuthorized(false);
        setLoading(false);
      } catch (err) {
        setAuthorized(false);
        setLoading(false);
      }
    };

    checkAuth();
  }, [allowedRoles]);

  // -------------------------------
  // TEMPORARY TESTING CODE
  // This allows dashboard to open
  // without checking login
  // -------------------------------

  if (loading) {
    return <p>Checking authentication...</p>;
  }

  return children; // allow access for testing

  // -------------------------------
  // AFTER TESTING (IMPORTANT)
  // Replace the code above with:
  //
  // if (loading) return <p>Checking authentication...</p>;
  // if (!authorized) return <Navigate to="/student/login" replace />;
  // return children;
  // -------------------------------
};

export default ProtectedRoute;
