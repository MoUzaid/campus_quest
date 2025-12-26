import "./dashboard.css";

import OngoingQuizzes from "./components/OngoingQuizzes";
import UpcomingQuizzes from "./components/UpcomingQuizzes";
import PreviousQuizzes from "./components/PreviousQuizzes";

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Student Dashboard</h1>

        <a href="/student/profile" className="profile-link">
          View Profile
        </a>
      </div>

      <OngoingQuizzes />
      <UpcomingQuizzes />
      <PreviousQuizzes />
    </div>
  );
};

export default Dashboard;
