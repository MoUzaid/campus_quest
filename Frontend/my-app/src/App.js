// import React from 'react'
// import Header from './components/Header/Header.jsx';
// import Pages from './Pages.jsx';

// const App = () => {
//   return (
//     <>
//      <Header />
//      <Pages/>
//      </>
//   )
// }

// export default App



import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Header1 from "./components/Header/Header1";
import Login from "./components/Auth/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import SuperAdminDashboard from "./components/Dashboards/superAdmin/SuperAdminDashboard";
import FacultyDashboard from "./components/Dashboards/FacultyDashboard";
import StudentDashboard from "./components/Dashboards/StudentDashboard";
import HodProfile from "./components/Dashboards/superAdmin/HodProfile";
// import AddCourse from "./components/Dashboards/superAdmin/AddCourse";
import CourseManagement from "./components/Dashboards/superAdmin/CourseManagement";
import AddFaculty from "./components/Dashboards/superAdmin/AddFaculty";
import ViewFaculty from "./components/Dashboards/superAdmin/ViewFaculty" ;
import ViewStudent from "./components/Dashboards/superAdmin/ViewStudent" ;
const Unauthorized = () => <h2>Access Denied</h2>;

function App() {
  return (
    <>
      <Header />
       <Header1></Header1>
      <Routes>
        <Route path="/login" element={<Login />} />

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
  path="/superadmin/view-faculty"
  element={
    <ProtectedRoute allowedRoles={["superadmin"]}>
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

        <Route
          path="/faculty"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </>
  );
}

export default App;
