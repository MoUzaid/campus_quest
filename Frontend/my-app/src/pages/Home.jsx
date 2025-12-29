import React from 'react'
import { useSelector } from 'react-redux';
import StudentDashboard from './student/dashboard/Dashboard';
import FacultyDashboard from './Dashboards/Faculty/FacultyDashboard';
import AdminDashboard from './Dashboards/superAdmin/SuperAdminDashboard';
const Home = () => {
 const { user, role, isAuthenticated } = useSelector(
  (state) => state.auth
);
console.log(user);

  return (
<div>
      {role === "student" && <StudentDashboard />}
      {role === "faculty" && <FacultyDashboard />}
      {role === "superadmin" && <AdminDashboard />}
    </div>
  )

}

export default Home