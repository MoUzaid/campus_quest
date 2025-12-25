import "./dashboard.css";

import OngoingQuizzes from "./components/OngoingQuizzes";
import UpcomingQuizzes from "./components/UpcomingQuizzes";
import PreviousQuizzes from "./components/PreviousQuizzes";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Student Dashboard</h1>

      <OngoingQuizzes />
      <UpcomingQuizzes />
      <PreviousQuizzes />
    </div>
  );
};

export default Dashboard;
