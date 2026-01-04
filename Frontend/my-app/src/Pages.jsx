import { Routes, Route, Navigate } from "react-router-dom";
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
import Otp from "./pages/student/auth/Otp";
import Leaderboard from "./pages/student/quiz/Leaderboard";

/* QUIZ */
import QuizDetails from "./pages/student/quiz/QuizDetails";
import QuizAttempt from "./pages/student/quiz/QuizAttempt";
import FeedbackPage from "./pages/student/quiz/FeedbackPage";
import QuizWaiting from "./pages/student/quiz/QuizWaiting";
import QuizReview from "./pages/student/quiz/QuizReview";
/* EXTRA */
import CreateQuiz from "./pages/CreateQuiz";
import QuestionsPage from "./pages/QuestionsPage";
import AI from "./pages/AI";
import Home from "./pages/Home";
import SeeAll from "./pages/student/dashboard/SeeAll";
import SeeAllPrevious from "./pages/student/dashboard/SeeAllPrevious";

const Unauthorized = () => <h2>Access Denied</h2>;

const Pages = () => {
  const { role, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Routes>

      {/* ✅ ROOT → ROLE BASED REDIRECT */}
     <Route
  path="/"
  element={
    isAuthenticated ? (
      role === "student" ? (
        <Navigate to="/student/dashboard" replace />
      ) : role === "faculty" ? (
        <Navigate to="/faculty/dashboard" replace />
      ) : role === "superadmin" ? (
        <Navigate to="/superadmin/dashboard" replace />
      ) : (
        <Navigate to="/unauthorized" replace />
      )
    ) : (
      <Login />
    )
  }
/>

<Route path="/login" element={<Login />} />

      {/* ================= SUPER ADMIN ================= */}
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

      {/* ================= SHARED ================= */}
      <Route
        path="/view-faculty"
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

      {/* ================= FACULTY ================= */}
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

      {/* ================= STUDENT AUTH ================= */}
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/student/signup" element={<Signup />} />
      <Route path="/student/forgot-password" element={<ForgotPassword />} />
      <Route path="/student/reset-password/:token" element={<ResetPassword />} />
      <Route path="/student/see-all" element={<SeeAll/>}/>
      <Route path="/student/verify-email" element={<Otp />} />

      {/* ================= STUDENT ================= */}
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

      {/* ================= QUIZ ================= */}

      <Route
  path="/student/quiz/waiting/:quizId"
  element={<QuizWaiting />}
/>

<Route 
path="/student/see-all-prev"
element={
<ProtectedRoute allowedRoles={["student"]}>
  <SeeAllPrevious/>
</ProtectedRoute>
}
/>

<Route  path="/leaderboard"
element={
<Leaderboard />
}
/>

<Route 
  path="/student/quiz/review"
  element={
    <ProtectedRoute allowedRoles={["student"]}>
      <QuizReview />
    </ProtectedRoute>
  }
/>

      <Route
        path="/student/quiz/:quizId"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <QuizDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/quiz/attempt/:quizId"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <QuizAttempt />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/quiz/feedback"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <FeedbackPage />
          </ProtectedRoute>
        }
      />

      {/* ================= EXTRA ================= */}
      <Route path="/create-quiz" element={<CreateQuiz />} />
      <Route path="/questions" element={<QuestionsPage />} />
      <Route path="/chat" element={<AI />} />
      <Route path="/home" element={<Home />} />

      {/* ================= FALLBACK ================= */}
      <Route path="/unauthorized" element={<Unauthorized />} />

    </Routes>
  );
};

export default Pages;
