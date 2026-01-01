import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetAllDepartmentsQuery } from "../../../redux/services/departmentApi";
import "./SeeAll.css";
import { useNavigate } from "react-router-dom";
const SeeAll = () => {
  const [department, setDepartment] = useState("");
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();
  const { quizzes = [] } = location.state || {};
  console.log(quizzes);

  const { data: departments, isLoading: deptLoading } =
    useGetAllDepartmentsQuery();

  const departmentList = departments?.data?.[0]?.departmentNames || [];

  const handleChange = (e) => {
    const selectedDepartment = e.target.value;
    setDepartment(selectedDepartment);

    if (!selectedDepartment) {
      setFilteredQuizzes([]);
      return;
    }

    const filtered = quizzes.filter(
      (quiz) =>
        quiz.department?.toLowerCase().trim() ===
        selectedDepartment.toLowerCase().trim()
    );

    setFilteredQuizzes(filtered);
  };

  const quizzesToShow =
    department && filteredQuizzes.length > 0 ? filteredQuizzes : quizzes;

  return (
    <div className="seeall-page">
      <h1 className="seeall-title">All Quizzes</h1>

      <select
        name="department"
        onChange={handleChange}
        value={department}
        disabled={deptLoading}
        className="seeall-select"
      >
        <option value="">All Departments</option>
        {departmentList.map((dept, idx) => (
          <option key={idx} value={dept}>
            {dept}
          </option>
        ))}
      </select>

      <div className="quiz-grid">
        {quizzesToShow.map((quiz, index) => (
          <div className="quiz-card" key={index}  onClick={() =>
              navigate(`/student/quiz/${quiz._id}`, { state: { quizData: quiz } })
            }>
            <div className="quiz-top">
              <div className="play-icon">▶</div>
              <span className="live-badge">LIVE</span>
            </div>

            <h3 className="quiz-title">{quiz.title}</h3>
            <p className="quiz-subject">{quiz.subject}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeeAll;
