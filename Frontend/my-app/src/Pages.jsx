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

import resetPassword from "./pages/Dashboards/Faculty/resetPassword";

import fOtp from "./pages/Dashboards/Faculty/Otp";
import forgotPassword from "./pages/Dashboards/Faculty/ForgotPassword";

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
import SeeAll from "./pages/student/dashboard/SeeAll";
import FacultyChangePassword from "./pages/Dashboards/Faculty/FacultyChangePassword";
import ChangePassword from "./pages/Dashboards/superAdmin/ChangePasswordSuper";
import SeeAllPrevious from "./pages/student/dashboard/SeeAllPrevious";

/* QUIZ */
import QuizDetails from "./pages/student/quiz/QuizDetails";
import QuizAttempt from "./pages/student/quiz/QuizAttempt";
import FeedbackPage from "./pages/student/quiz/FeedbackPage";
import QuizWaiting from "./pages/student/quiz/QuizWaiting";
import QuizReview from "./pages/student/quiz/QuizReview";
import QuizReviewMock from "./pages/student/quiz/QuizReviewMock";
import StudentAnalytics from "./pages/student/profile/StudentAnalytics";

import OngoingQuizzes from "./pages/student/dashboard/components/OngoingQuizzes";
import StudentHome from "./pages/student/dashboard/StudentHome";
import StudentChangePassword from "./pages/student/auth/StudentChangePassword";
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
        {/* ROOT - REDIRECT BASED ON AUTH & ROLE */}
<Route path='/student/change-password' element={<StudentChangePassword/>} />
<Route path='/Student/Home' element={<StudentHome/>} />
   <Route path='/ongoing-quiz' element={<OngoingQuizzes/>} />
        <Route path='forgott-password' element={<forgotPassword/>} />
        <Route path='reset-password/:token' element={<resetPassword/>} />
        <Route path='faculty-otp' element={<fOtp/>} />

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

        {/* AUTHENTICATION ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* SUPERADMIN REGISTRATION */}
        <Route path="/superadmin/register" element={<SuperAdminRegister />} />

        <Route
  path="/change-password"
  element={<ChangePassword />}
/>


        {/* ================= SUPER ADMIN ================= */}
        
        {/* SUPERADMIN DASHBOARD - DUPLICATE ROUTES COMMENTED */}
        <Route
          path="/superadmin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["superadmin"]}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />
        
        {/* Alternate route for superadmin dashboard */}
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
            <ProtectedRoute allowedRoles={["superadmin"]}>
              <AddFaculty />
            </ProtectedRoute>
          }
        />

        {/* SUPERADMIN PROFILE - DUPLICATE ROUTES COMMENTED */}
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

        {/* SUPERADMIN FACULTY MANAGEMENT */}
        <Route
          path="/superadmin/view-faculty"
          element={
            <ProtectedRoute allowedRoles={["superadmin", "faculty"]}>
              <ViewFaculty />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/superadmin/faculty/:facultyId/quizzes"
          element={<FacultyQuizzes />}
        />

        {/* SUPERADMIN STUDENT MANAGEMENT */}
        <Route 
          path="/superadmin/student-attempts/:studentId"
          element={<StudentAttemptedQuizzes />}
        />
        <Route 
          path="/students/quizzes/:studentId" 
          element={<StudentAttemptedQuizzes />} 
        />

        {/* SUPERADMIN QUIZ ANALYTICS */}
        <Route
          path="/superadmin/attempted-quizzes"
          element={<AttemptedQuizzes />}
        />
        
        <Route
          path="/superadmin/quiz/:quizId/attempts"
          element={
            <ProtectedRoute allowedRoles={["superadmin"]}>
              <AttemptedStudentByQuiz />
            </ProtectedRoute>
          }
        />

        {/* SUPERADMIN ANALYTICS */}
        <Route
          path="/superadmin/analytics"
          element={
            <ProtectedRoute allowedRoles={["superadmin"]}>
              <SuperAdminAnalytics />
            </ProtectedRoute>
          }
        />

        {/* ================= SHARED ROUTES ================= */}
        
        {/* VIEW FACULTY - DUPLICATE ROUTES COMMENTED */}
       <Route path="/faculty-change-password" element={<FacultyChangePassword />} />
      
        <Route
          path="/view-faculty"
          element={
            <ProtectedRoute allowedRoles={["superadmin", "faculty"]}>
              <ViewFaculty />
            </ProtectedRoute>
          }
        />

        {/* VIEW STUDENT - DUPLICATE ROUTES COMMENTED */}
        <Route
          path="/students"
          element={
            <ProtectedRoute allowedRoles={["superadmin", "faculty"]}>
              <ViewStudent />
            </ProtectedRoute>
          }
        />

        {/* ================= FACULTY ================= */}
        
        {/* FACULTY DASHBOARD - DUPLICATE ROUTES COMMENTED */}
        <Route
          path="/faculty/dashboard"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />
        
        {/* Alternate route for faculty dashboard */}
        <Route
          path="/faculty"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />

        {/* FACULTY PROFILE - DUPLICATE ROUTES COMMENTED */}
        <Route
          path="/faculty/profile"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <FacultyProfile />
            </ProtectedRoute>
          }
        />

        {/* FACULTY STUDENT MANAGEMENT */}
        <Route
          path="/faculty/students"
          element={<FacultyViewStudent />}
        />
        
        <Route
          path="/faculty/student/:studentId/registered-quizzes"
          element={<StudentRegisteredQuizzes />}
        />
        
        <Route
          path="/faculty/student/:studentId/quizzes"
          element={<FacultyAttemptedStudent />}
        />

        {/* FACULTY QUIZ MANAGEMENT */}
        <Route path="/view-quizzes" element={<ViewQuiz />} />
        <Route path="/faculty/my-quizzes" element={<OwnFacultyQuizzes />} />
        
        <Route
          path="/faculty/quiz/:quizId/registered-students"
          element={<QuizRegisteredStudents />}
        />
        
        <Route
          path="/faculty/quiz/:quizId/attempted-students"
          element={<QuizAttemptedStudents />}
        />

        {/* FACULTY ANALYTICS */}
        <Route path="/faculty/analytics" element={<FacultyAnalytics />} />

        {/* ================= STUDENT AUTH ================= */}
        <Route path="/student/login" element={<StudentLogin/>} />
        
        <Route path="/student/signup" element={<Signup />} />
        <Route path="/student/forgot-password" element={<ForgotPassword />} />
        <Route path="/student/reset-password/:token" element={<ResetPassword />} />
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
        <Route path="/student/analytics/:studentId" element={<StudentAnalytics />} />

        <Route
          path="/student/certificates"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Certificates />
            </ProtectedRoute>
          }
        />

        {/* ================= SEE ALL ================= */}
        <Route
          path="/student/see-all"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <SeeAll />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/see-all-prev"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <SeeAllPrevious />
            </ProtectedRoute>
          }
        />

        {/* ================= QUIZ ================= */}
        <Route
          path="/student/quiz/waiting/:quizId"
          element={<QuizWaiting />}
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

        {/* 🚀 REAL REVIEW */}
        <Route
          path="/student/quiz/review"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <QuizReview />
            </ProtectedRoute>
          }
        />

        {/* 🧪 MOCK REVIEW (DEV ONLY) */}
        <Route
          path="/student/quiz/review-mock"
          element={<QuizReviewMock />}
        />

        {/* ================= LEADERBOARD ================= */}
        <Route path="/leaderboard" element={<Leaderboard />} />

        {/* ================= EXTRA ================= */}
        {/* CREATE QUIZ - DUPLICATE ROUTES COMMENTED */}
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/createquiz" element={<CreateQuiz />} />
        
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/chat" element={<AI />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
};

export default Pages;