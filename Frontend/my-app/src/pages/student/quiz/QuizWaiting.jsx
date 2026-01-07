import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import QuizTimer from "./QuizTimer";
import "./QuizWaiting.css";

const QuizWaiting = () => {
  const { quizId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const { quizData, startTime, duration } = state || {};

  if (!startTime || !duration) {
    return <p style={{ color: "#fff" }}>Timer data missing</p>;
  }
const handleStartQuiz = async () => {

      navigate(`/student/quiz/attempt/${quizId}`, {
        state: { quizData },
      });

};


  return (
    <div className="quiz-waiting-wrapper">
      <div className="quiz-waiting-card">
        
        {/* LEFT – TIMER */}
        <div className="quiz-waiting-left">
          <h2 className="quiz-waiting-title">Quiz starts in</h2>

          <QuizTimer
            countdownStartTime={startTime}
            countdownDuration={duration}
            onQuizStart={handleStartQuiz}
          />
        </div>

        {/* RIGHT – WARNINGS */}
        <div className="quiz-waiting-right">
          <h3 className="warning-title">⚠ Important Warnings</h3>

          <ul className="warning-list">
            <li>Do not switch tabs or minimize the window during the quiz.</li>
            <li>Copy, paste, cut, and right-click are strictly disabled.</li>
            <li>Any violation will cause automatic quiz submission.</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default QuizWaiting;
