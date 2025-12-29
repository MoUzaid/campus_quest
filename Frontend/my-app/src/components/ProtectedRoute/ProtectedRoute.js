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
        for (let role of allowedRoles) {
          const res = await fetch(roleToMeEndpoint[role], {
            credentials: "include"
          });

          if (res.ok) {
            setAuthorized(true);
            setLoading(false);
            return;
          }
        }

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
  // TEMPORARY TESTING MODE
  // -------------------------------
  if (loading) {
    return <p>Checking authentication...</p>;
  }

  return children;

  // -------------------------------
  // AFTER TESTING (RESTORE THIS)
  //
  // if (loading) return <p>Checking authentication...</p>;
  // if (!authorized) return <Navigate to="/student/login" replace />;
  // return children;
  // -------------------------------
};

export default ProtectedRoute;
