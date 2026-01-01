import "./dashboard.css";

import OngoingQuizzes from "./components/OngoingQuizzes";
import RegisteredQuizzes from "./components/RegisteredQuizzes";
import PreviousQuizzes from "./components/PreviousQuizzes";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Student Dashboard</h1>

        <Link to="/student/profile" className="profile-link">
         View Profile  <FaUserCircle size={30} />
        </Link>
      </div>

      <OngoingQuizzes />
      <RegisteredQuizzes />
      <PreviousQuizzes />
    </div>
  );
};

export default Dashboard;
