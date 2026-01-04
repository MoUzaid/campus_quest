import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ViewQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/quiz/all-quizzes", {
          withCredentials: true, // if using cookies for auth
        });
        setQuizzes(res.data);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="view-quiz-container">
      <h1>My Quizzes</h1>
      <button onClick={() => navigate("/createquiz")}>Create Quiz</button> {/* ✅ Navigate to create quiz */}
      <div className="quiz-list">
        {quizzes.length === 0 ? (
          <p>No quizzes found</p>
        ) : (
          quizzes.map((quiz) => (
            <div key={quiz._id} className="quiz-card">
              <h3>{quiz.title}</h3>
              <p>Subject: {quiz.subject}</p>
              <p>Department: {quiz.department}</p>
              <p>
                Start: {new Date(quiz.startTime).toLocaleString()} | End:{" "}
                {new Date(quiz.endTime).toLocaleString()}
              </p>
              <button onClick={() => navigate(`/quiz/${quiz._id}`)}>View Details</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewQuiz;
