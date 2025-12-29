import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

/* AUTH */
import Login from "./pages/Login";

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
import StudentDashboard from "./pages/student/dashboard/Dashboard";
import StudentLogin from "./pages/student/auth/StudentLogin";
import Signup from "./pages/student/auth/Signup";
import ForgotPassword from "./pages/student/auth/ForgotPassword";
import ResetPassword from "./pages/student/auth/ResetPassword";
import Profile from "./pages/student/profile/Profile";
import Certificates from "./pages/student/profile/Certificates";

/* QUIZ */
import QuizDetails from "./pages/student/quiz/QuizDetails";

/* EXTRA */
import CreateQuiz from "./pages/CreateQuiz";
import QuestionsPage from "./pages/QuestionsPage";
import AI from "./pages/AI";
import Home from "./pages/Home";

const Unauthorized = () => <h2>Access Denied</h2>;

const Pages = () => {
  const { role, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Routes>
      {/* ROOT */}
      <Route path="/" element={<Login />} />

      {/* SUPER ADMIN */}
      <Route
        path="/superadmin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <SuperAdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/superadmin/add-faculty"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <AddFaculty />
          </ProtectedRoute>
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
        path="/faculty/dashboard"
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

      {/* STUDENT AUTH */}
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/student/signup" element={<Signup />} />
      <Route path="/student/forgot-password" element={<ForgotPassword />} />
      <Route path="/student/reset-password/:token" element={<ResetPassword />} />

      {/* STUDENT DASHBOARD */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/profile"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/certificates"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <Certificates />
          </ProtectedRoute>
        }
      />

      {/* QUIZ */}
      <Route
        path="/student/quiz/:quizId"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <QuizDetails />
          </ProtectedRoute>
        }
      />

      {/* EXTRA */}
      <Route path="/create-quiz" element={<CreateQuiz />} />
      <Route path="/questions" element={<QuestionsPage />} />
      <Route path="/chat" element={<AI />} />
      <Route path="/home" element={<Home />} />

      {/* FALLBACK */}
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};

export default Pages;
