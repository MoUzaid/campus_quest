// // import React from 'react'
// // import Header from './components/Header/Header.jsx';
// // import Pages from './Pages.jsx';

// // const App = () => {
// //   return (
// //     <>
// //      <Header />
// //      <Pages/>
// //      </>
// //   )
// // }

// // export default App



// import 'bootstrap/dist/css/bootstrap.min.css';

// import { Routes, Route } from "react-router-dom";
// import Header from "./components/Header/Header";
// import Header1 from "./components/Header/Header1";
// import Login from "./components/Auth/Login";
// import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// import SuperAdminDashboard from "./components/Dashboards/superAdmin/SuperAdminDashboard";
// import FacultyDashboard from "./components/Dashboards/FacultyDashboard";
// import StudentDashboard from "./components/Dashboards/StudentDashboard";
// import HodProfile from "./components/Dashboards/superAdmin/HodProfile";
// // import AddCourse from "./components/Dashboards/superAdmin/AddCourse";
// import CourseManagement from "./components/Dashboards/superAdmin/CourseManagement";
// import AddFaculty from "./components/Dashboards/superAdmin/AddFaculty";
// import ViewFaculty from "./components/Dashboards/superAdmin/ViewFaculty" ;
// import ViewStudent from "./components/Dashboards/superAdmin/ViewStudent" ;
// const Unauthorized = () => <h2>Access Denied</h2>;

// function App() {
//   return (
//     <>
//       <Header />
//        <Header1></Header1>
//       <Routes>
//         <Route path="/login" element={<Login />} />

//         <Route
//           path="/superadmin"
//           element={
//             <ProtectedRoute allowedRoles={["superadmin"]}>
//               <SuperAdminDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/superadmin/add-faculty"
//           element={
//             <ProtectedRoute allowedRoles={["superadmin"]}>
//               <AddFaculty />
//             </ProtectedRoute>
//           }
//         />
// <Route
//   path="/superadmin/profile"
//   element={
//     <ProtectedRoute allowedRoles={["superadmin"]}>
//       <HodProfile />
//     </ProtectedRoute>
//   }
// />
// <Route
//   path="/superadmin/course-management"
//   element={
//     <ProtectedRoute allowedRoles={["superadmin"]}>
//       <CourseManagement />
//     </ProtectedRoute>
//   }
// />

// <Route
//   path="/superadmin/view-faculty"
//   element={
//     <ProtectedRoute allowedRoles={["superadmin"]}>
//       <ViewFaculty />
//     </ProtectedRoute>
//   }
// />

// <Route
//           path="/students"
//           element={
//             <ProtectedRoute allowedRoles={["superadmin", "faculty"]}>
//               <ViewStudent />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/faculty"
//           element={
//             <ProtectedRoute allowedRoles={["faculty"]}>
//               <FacultyDashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/student"
//           element={
//             <ProtectedRoute allowedRoles={["student"]}>
//               <StudentDashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route path="/unauthorized" element={<Unauthorized />} />
//       </Routes>
//     </>
//   );
// }

// export default App;



import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Header1 from "./components/Header/Header1";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import SuperAdminDashboard from "./pages/Dashboards/superAdmin/SuperAdminDashboard";
import FacultyDashboard from "./pages/Dashboards/Faculty/FacultyDashboard";
import StudentDashboard from "./pages/Dashboards/Student/StudentDashboard";
import HodProfile from "./pages/Dashboards/superAdmin/HodProfile";
import CourseManagement from "./pages/Dashboards/superAdmin/CourseManagement";
import AddFaculty from "./pages/Dashboards/superAdmin/AddFaculty";
import ViewFaculty from "./pages/Dashboards/superAdmin/ViewFaculty";
import ViewStudent from "./pages/Dashboards/superAdmin/ViewStudent";
import FacultyProfile from "./pages/Dashboards/Faculty/FacultyProfile";
import Signup from "./pages/Dashboards/Student/Signup";
import AddCourse from "./pages/Dashboards/superAdmin/AddCourse";

const Unauthorized = () => <h2>Access Denied</h2>;

function App() {
  return (
    <>
      <Header />
      <Header1 />
      
      <Routes>
        {/* AUTH */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/students/signup" element={<Signup />} />

        {/* SUPERADMIN ROUTES */}
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

        {/* SUPERADMIN + FACULTY */}
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

        {/* FACULTY ROUTES */}
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

        {/* STUDENT ROUTES */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </>
  );
}

export default App;
