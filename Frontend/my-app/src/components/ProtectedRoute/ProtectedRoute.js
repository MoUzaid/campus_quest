






import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const roleToMeEndpoint = {
  superadmin: "http://localhost:5000/api/superadmin/me",
  faculty: "http://localhost:5000/api/faculty/me",
  student: "http://localhost:5000/api/student/me"
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!allowedRoles || allowedRoles.length === 0) {
          throw new Error("No roles defined");
        }

        // 🔁 Try each allowed role endpoint
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

        throw new Error("Unauthorized");
      } catch (err) {
        setAuthorized(false);
        setLoading(false);
      }
    };

    checkAuth();
  }, [allowedRoles]);

  if (loading) {
    return <p>Checking authentication...</p>;
  }

  if (!authorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
