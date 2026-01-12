import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header/Header";
import Navbar from "./components/Header/Navbar";

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
import SuperAdminRegister from "./pages/Dashboards/superAdmin/SuperAdminRegister";
import StudentAttemptedQuizzes from "./pages/Dashboards/superAdmin/StudentAttemptedQuizzes";
import AttemptedQuizzes from "./pages/Dashboards/superAdmin/AttemptedQuizzes";
import FacultyQuizzes from "./pages/Dashboards/superAdmin/FacultyQuizzes";
import AttemptedStudentByQuiz from "./pages/Dashboards/superAdmin/AttemptedStudentByQuiz";
import SuperAdminAnalytics from "./pages/Dashboards/superAdmin/SuperAdminAnalytics";

/* FACULTY */
import FacultyDashboard from "./pages/Dashboards/Faculty/FacultyDashboard";
import FacultyProfile from "./pages/Dashboards/Faculty/FacultyProfile";
import FacultyViewStudent from "./pages/Dashboards/Faculty/FacultyViewStudent";
import StudentRegisteredQuizzes from "./pages/Dashboards/Faculty/StudentRegisteredQuizzes";
import FacultyAttemptedStudent from "./pages/Dashboards/Faculty/FacultyAttemptedStudent";
import ViewQuiz from "./pages/Dashboards/Faculty/ViewQuiz";
import QuizRegisteredStudents from "./pages/Dashboards/Faculty/QuizRegisteredStudents";
import QuizAttemptedStudents from "./pages/Dashboards/Faculty/QuizAttemptedStudents";
import OwnFacultyQuizzes from "./pages/Dashboards/Faculty/OwnFacultyQuizzes";
import FacultyAnalytics from "./pages/Dashboards/Faculty/FacultyAnalytics";

/* STUDENT */
import HomeStudent from "./pages/student/dashboard/HomeStudent";
import StudentLogin from "./pages/student/auth/StudentLogin";
import Signup from "./pages/student/auth/Signup";
import ForgotPassword from "./pages/student/auth/ForgotPassword";
import ResetPassword from "./pages/student/auth/ResetPassword";
import Profile from "./pages/student/profile/Profile";
import Certificates from "./pages/student/profile/Certificates";
import Otp from "./pages/student/auth/Otp";
import Leaderboard from "./pages/student/quiz/Leaderboard";
import SeeAll from "./pages/student/dashboard/SeeAll";
import SeeAllPrevious from "./pages/student/dashboard/SeeAllPrevious";

/* QUIZ */
import QuizDetails from "./pages/student/quiz/QuizDetails";
import QuizAttempt from "./pages/student/quiz/QuizAttempt";
import FeedbackPage from "./pages/student/quiz/FeedbackPage";
import QuizWaiting from "./pages/student/quiz/QuizWaiting";
import QuizReview from "./pages/student/quiz/QuizReview";
import QuizReviewMock from "./pages/student/quiz/QuizReviewMock";

/* EXTRA */
import CreateQuiz from "./pages/CreateQuiz";
import QuestionsPage from "./pages/QuestionsPage";
import AI from "./pages/AI";
import Home from "./pages/Home";

const Unauthorized = () => <h2>Access Denied</h2>;

const Pages = () => {
  const { role, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <>
      <Header />
      <Navbar />

      <Routes>
        {/* ROOT */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              role === "student" ? (
                <Navigate to="/student/home" replace />
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

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* SUPER ADMIN */}
        <Route path="/superadmin/register" element={<SuperAdminRegister />} />

        <Route
          path="/superadmin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["superadmin"]}>
              <SuperAdminDashboard />
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
          path="/superadmin/add-faculty"
          element={
            <ProtectedRoute allowedRoles={["superadmin"]}>
              <AddFaculty />
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

        <Route path="/superadmin/faculty/:facultyId/quizzes" element={<FacultyQuizzes />} />

        <Route path="/superadmin/student-attempts/:studentId" element={<StudentAttemptedQuizzes />} />

        <Route path="/superadmin/attempted-quizzes" element={<AttemptedQuizzes />} />

        <Route
          path="/superadmin/quiz/:quizId/attempts"
          element={
            <ProtectedRoute allowedRoles={["superadmin"]}>
              <AttemptedStudentByQuiz />
            </ProtectedRoute>
          }
        />

        <Route
          path="/superadmin/analytics"
          element={
            <ProtectedRoute allowedRoles={["superadmin"]}>
              <SuperAdminAnalytics />
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

        <Route path="/faculty/students" element={<FacultyViewStudent />} />
        <Route path="/faculty/student/:studentId/registered-quizzes" element={<StudentRegisteredQuizzes />} />
        <Route path="/faculty/student/:studentId/quizzes" element={<FacultyAttemptedStudent />} />
        <Route path="/faculty/my-quizzes" element={<OwnFacultyQuizzes />} />
        <Route path="/faculty/analytics" element={<FacultyAnalytics />} />
        <Route path="/faculty/quiz/:quizId/registered-students" element={<QuizRegisteredStudents />} />
        <Route path="/faculty/quiz/:quizId/attempted-students" element={<QuizAttemptedStudents />} />

        {/* STUDENT AUTH */}
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/signup" element={<Signup />} />
        <Route path="/student/forgot-password" element={<ForgotPassword />} />
        <Route path="/student/reset-password/:token" element={<ResetPassword />} />
        <Route path="/student/verifyOtp" element={<Otp />} />

        {/* STUDENT */}
        <Route
          path="/student/home"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <HomeStudent />
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

        <Route path="/student/see-all" element={<SeeAll />} />
        <Route path="/student/see-all-prev" element={<SeeAllPrevious />} />

        {/* QUIZ */}
        <Route path="/student/quiz/waiting/:quizId" element={<QuizWaiting />} />
        <Route path="/student/quiz/:quizId" element={<QuizDetails />} />
        <Route path="/student/quiz/attempt/:quizId" element={<QuizAttempt />} />
        <Route path="/student/quiz/feedback" element={<FeedbackPage />} />
        <Route path="/student/quiz/review" element={<QuizReview />} />
        <Route path="/student/quiz/review-mock" element={<QuizReviewMock />} />

        {/* EXTRA */}
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/chat" element={<AI />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
};

export default Pages;
