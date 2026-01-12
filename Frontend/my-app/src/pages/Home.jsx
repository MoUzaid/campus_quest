import React from 'react'
import { useSelector } from 'react-redux';
import FacultyDashboard from './Dashboards/Faculty/FacultyDashboard';
import AdminDashboard from './Dashboards/superAdmin/SuperAdminDashboard';
import HomeStudent from './student/dashboard/HomeStudent';
const Home = () => {
 const { user, role, isAuthenticated } = useSelector(
  (state) => state.auth
);
console.log(user);

  return (
<div>
      {role === "student" && <HomeStudent />}
      {role === "faculty" && <FacultyDashboard />}
      {role === "superadmin" && <AdminDashboard />}
    </div>
  )

}

export default Home