import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

/* AUTH */
import Login from "./pages/Login";
import Signup from "./pages/Dashboards/Student/Signup";

/* SUPER ADMIN */
import SuperAdminDashboard from "./pages/Dashboards/superAdmin/SuperAdminDashboard";
import HodProfile from "./pages/Dashboards/superAdmin/HodProfile";
import CourseManagement from "./pages/Dashboards/superAdmin/CourseManagement";
import AddFaculty from "./pages/Dashboards/superAdmin/AddFaculty";
import ViewFaculty from "./pages/Dashboards/superAdmin/ViewFaculty";
import ViewStudent from "./pages/Dashboards/superAdmin/ViewStudent";
import AddCourse from "./pages/Dashboards/superAdmin/AddCourse";

/* FACULTY */
import FacultyDashboard from "./pages/Dashboards/Faculty/FacultyDashboard";
import FacultyProfile from "./pages/Dashboards/Faculty/FacultyProfile";

/* STUDENT */
import StudentDashboard from "./pages/Dashboards/Student/StudentDashboard";

/* QUIZ / EXTRA */
import CreateQuiz from "./pages/CreateQuiz";
import QuestionsPage from "./pages/QuestionsPage";
import AI from "./pages/AI";

const Unauthorized = () => <h2>Access Denied</h2>;

const Pages = () => {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/students/signup" element={<Signup />} />

      {/* SUPER ADMIN */}
      <Route
        path="/superadmin"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <SuperAdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/superadmin/add-faculty"
        element={
            <AddFaculty />
        }
      />

      <Route
        path="/superadmin/profile"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <HodProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/superadmin/course-management"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <CourseManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/superadmin/courses/add"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <AddCourse />
          </ProtectedRoute>
        }
      />

      {/* SUPER ADMIN + FACULTY */}
      <Route
        path="/superadmin/view-faculty"
        element={
          <ProtectedRoute allowedRoles={["superadmin", "faculty"]}>
            <ViewFaculty />
          </ProtectedRoute>
        }
      />

      <Route
        path="/students"
        element={
          <ProtectedRoute allowedRoles={["superadmin", "faculty"]}>
            <ViewStudent />
          </ProtectedRoute>
        }
      />

      {/* FACULTY */}
      <Route
        path="/faculty"
        element={
          <ProtectedRoute allowedRoles={["faculty"]}>
            <FacultyDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/faculty/profile"
        element={
          <ProtectedRoute allowedRoles={["faculty"]}>
            <FacultyProfile />
          </ProtectedRoute>
        }
      />

      {/* STUDENT */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      {/* QUIZ / EXTRA */}
      <Route path="/create-quiz" element={<CreateQuiz />} />
      <Route path="/questions" element={<QuestionsPage />} />
      <Route path="/chat" element={<AI />} />

      {/* FALLBACK */}
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};

export default Pages;
