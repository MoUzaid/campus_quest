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
<<<<<<< HEAD
import ForgotPassword from "./pages/student/auth/ForgotPassword";
import ResetPassword from "./pages/student/auth/ResetPassword";
import Profile from "./pages/student/profile/Profile";
=======
import Signup from "./pages/student/auth/Signup";
import ForgotPassword from "./pages/student/auth/ForgotPassword";
import ResetPassword from "./pages/student/auth/ResetPassword";
>>>>>>> c023ccea86f75e3b746c5796d622bbf787ba5727

/* EXTRA */
import CreateQuiz from "./pages/CreateQuiz";
import QuestionsPage from "./pages/QuestionsPage";
import AI from "./pages/AI";
import QuizDetails from "./pages/student/quiz/QuizDetails";
import Certificates from "./pages/student/profile/Certificates";
import Home from "./pages/Home";

const Unauthorized = () => <h2>Access Denied</h2>;

const Pages = () => {
   const { user, role, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  return (
    <Routes>
<<<<<<< HEAD
    
    {role==="student" && isAuthenticated && <Route path="/" element={<StudentDashboard />} />}
      {role==="faculty" && isAuthenticated && <Route path="/" element={<FacultyDashboard />} />}
      {role==="superadmin" && isAuthenticated && <Route path="/" element={<SuperAdminDashboard />} />}
    

      {/* <Route path="/login" element={<Login />} /> */}
=======
      {/* ROOT */}
      <Route path="/" element={<Login />} />
>>>>>>> c023ccea86f75e3b746c5796d622bbf787ba5727

      {/* SUPER ADMIN */}
      {/* <Route
        path="/superadmin"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <SuperAdminDashboard />
          </ProtectedRoute>
        }
<<<<<<< HEAD
      /> */}

      <Route
        path="/superadmin/add-faculty"
        element={
            <AddFaculty />
        }
      />

=======
      />
      <Route path="/superadmin/add-faculty" element={<AddFaculty />} />
>>>>>>> c023ccea86f75e3b746c5796d622bbf787ba5727
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
      {/* <Route
        path="/faculty"
        element={
          <ProtectedRoute allowedRoles={["faculty"]}>
            <FacultyDashboard />
          </ProtectedRoute>
        }
<<<<<<< HEAD
      /> */}

=======
      />
>>>>>>> c023ccea86f75e3b746c5796d622bbf787ba5727
      <Route
        path="/faculty/profile"
        element={
          <ProtectedRoute allowedRoles={["faculty"]}>
            <FacultyProfile />
          </ProtectedRoute>
        }
      />

<<<<<<< HEAD
      {/* STUDENT */}
      {/* <Route
        path="/student"
=======
      {/* STUDENT AUTH (PUBLIC) */}
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/student/signup" element={<Signup />} />
      <Route path="/student/forgot-password" element={<ForgotPassword />} />
      <Route path="/student/reset-password" element={<ResetPassword />} />

      {/* STUDENT DASHBOARD (PROTECTED) */}
      <Route
        path="/student/dashboard"
>>>>>>> c023ccea86f75e3b746c5796d622bbf787ba5727
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      /> */}

      <Route 
      path="/student/profile"
      element={
        <ProtectedRoute allowedRoles={["student"]}>
          <Profile />
        </ProtectedRoute>
      }
      />
<<<<<<< HEAD

<Route 
path="/student/certificates"
element={
  <ProtectedRoute allowedRoles={["student"]}>
    <Certificates />
  </ProtectedRoute>
}
/>
<Route path="/student/quiz/:quizId" element={<QuizDetails/>}/>

<Route path="/student/login" 
element={ <StudentLogin/>
}/>

<Route path="/student/forgot-password" element={<ForgotPassword />} />
<Route path="/student/reset-password/:token" element={<ResetPassword />} />
 <Route path="/student/signup" element={<Signup />} />

      {/* QUIZ / EXTRA */}
=======

      {/* EXTRA */}
>>>>>>> c023ccea86f75e3b746c5796d622bbf787ba5727
      <Route path="/create-quiz" element={<CreateQuiz />} />
      <Route path="/questions" element={<QuestionsPage />} />
      <Route path="/chat" element={<AI />} />

      {/* FALLBACK */}
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};

export default Pages;
