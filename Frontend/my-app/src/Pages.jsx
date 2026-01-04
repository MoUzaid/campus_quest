import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Header1 from "./components/Header/Header1";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import SuperAdminDashboard from "./pages/Dashboards/superAdmin/SuperAdminDashboard";
import FacultyDashboard from "./pages/Dashboards/Faculty/FacultyDashboard";
import HodProfile from "./pages/Dashboards/superAdmin/HodProfile";
import CourseManagement from "./pages/Dashboards/superAdmin/CourseManagement";
import AddFaculty from "./pages/Dashboards/superAdmin/AddFaculty";
import ViewFaculty from "./pages/Dashboards/superAdmin/ViewFaculty";
import ViewStudent from "./pages/Dashboards/superAdmin/ViewStudent";
import FacultyProfile from "./pages/Dashboards/Faculty/FacultyProfile";
import AddCourse from "./pages/Dashboards/superAdmin/AddCourse";
import CreateQuiz from "./pages/Dashboards/Faculty/CreateQuiz";
import ViewQuiz from "./pages/Dashboards/Faculty/ViewQuiz";
import SuperAdminRegister from "./pages/Dashboards/superAdmin/SuperAdminRegister";
import StudentAttemptedQuizzes from "./pages/Dashboards/superAdmin/StudentAttemptedQuizzes";
import AttemptedQuizzes from "./pages/Dashboards/superAdmin/AttemptedQuizzes";
import FacultyQuizzes from "./pages/Dashboards/superAdmin/FacultyQuizzes";
import AttemptedStudentByQuiz from "./pages/Dashboards/superAdmin/AttemptedStudentByQuiz";
import SuperAdminAnalytics from "./pages/Dashboards/superAdmin/SuperAdminAnalytics";
import FacultyViewStudent from "./pages/Dashboards/Faculty/FacultyViewStudent";
import StudentRegisteredQuizzes from "./pages/Dashboards/Faculty/StudentRegisteredQuizzes";
import FacultyAttemptedStudent from "./pages/Dashboards/Faculty/FacultyAttemptedStudent"
import QuizRegisteredStudents from "./pages/Dashboards/Faculty/QuizRegisteredStudents";
import QuizAttemptedStudents from "./pages/Dashboards/Faculty/QuizAttemptedStudents"; 
import OwnFacultyQuizzes from "./pages/Dashboards/Faculty/OwnFacultyQuizzes";
import FacultyAnalytics from "./pages/Dashboards/Faculty/FacultyAnalytics";

const Unauthorized = () => <h2>Access Denied</h2>;

function Pages() {
  return (
    <>
      <Header />
      <Header1 />
      
      <Routes>
        {/* AUTHENTICATION ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* SUPERADMIN REGISTRATION */}
        <Route path="/superadmin/register" element={<SuperAdminRegister />} />

        {/* SUPERADMIN DASHBOARD & PROFILE */}
        <Route
          path="/superadmin"
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

        {/* SUPERADMIN FACULTY MANAGEMENT */}
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
        <Route
          path="/superadmin/faculty/:facultyId/quizzes"
          element={<FacultyQuizzes />}
        />

        {/* SUPERADMIN COURSE MANAGEMENT */}
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

        {/* SUPERADMIN STUDENT MANAGEMENT */}
        <Route
          path="/students"
          element={
            <ProtectedRoute allowedRoles={["superadmin", "faculty"]}>
              <ViewStudent />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/students/quizzes/:studentId" 
          element={<StudentAttemptedQuizzes />} 
        />
        <Route
          path="/superadmin/student-attempts/:studentId"
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

        {/* FACULTY DASHBOARD & PROFILE */}
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
        <Route path="/createquiz" element={<CreateQuiz />} />
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
      </Routes>
    </>
  );
}

export default Pages;