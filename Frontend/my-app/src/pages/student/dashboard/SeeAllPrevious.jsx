import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllDepartmentsQuery } from "../../../redux/services/departmentApi";
import { FaHistory, FaCheckCircle } from "react-icons/fa";
import { MdSubject } from "react-icons/md";
import "./SeeAll.css";


const SeeAllPrevious = () => {
  const [department, setDepartment] = useState("");
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { quizzes = [] } = location.state || {};
console.log("All Previous Quizzes:", quizzes);
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
      (item) =>
        item.quizId?.department?.toLowerCase().trim() ===
        selectedDepartment.toLowerCase().trim()
    );

    setFilteredQuizzes(filtered);
  };

  const quizzesToShow =
    department && filteredQuizzes.length > 0 ? filteredQuizzes : quizzes;

  return (
    <div className="seeall-page">
      <h1 className="seeall-title">Previous Attempts</h1>

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
        {quizzesToShow.length === 0 ? (
          <p style={{ color: "#9ca3af", marginTop: "20px" }}>
            No attempted quizzes found
          </p>
        ) : (
          quizzesToShow.map((item) => (
            <div
              key={item._id}
              className="quiz-tile"
              onClick={() =>
                navigate("/student/quiz/review", {
                  state: { quizId: item._id },
                })
              }
            >
              <div className="card-top">
                <div className="quiz-icon-wrapper icon-previous">
                  <FaHistory />
                </div>
                <span className="quiz-category-badge">Completed</span>
              </div>

              <div className="quiz-tile-title">
                {item.quizId?.title}
              </div>

              <div className="quiz-tile-subtitle">
                <MdSubject size={16} /> {item.quizId?.subject}
                <FaCheckCircle
                  className="arrow-icon"
                  style={{ color: "#10b981" }}
                />
              </div>

              <FaHistory className="card-decoration" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SeeAllPrevious;
