import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAttemptedQuizByIdQuery } from "../../../redux/services/quizApi";
import "./QuizReview.css";

const QuizReview = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { quizId } = location.state || {};

  const {
    data: prevQuiz,
    isLoading,
    isError,
  } = useGetAttemptedQuizByIdQuery(quizId, {
    skip: !quizId,
  });

  if (!quizId) {
    return (
      <div className="quiz-attempt">
        <div className="quiz-attempt-card">
          <p>Open this page from Feedback.</p>
        </div>
      </div>
    );
  }

  if (isLoading) return <p>Loading review...</p>;
  if (isError || !prevQuiz) return <p>Failed to load review.</p>;

  const correct = prevQuiz.correctCount ?? 0;
  const wrong = prevQuiz.wrongCount ?? 0;
  const attempted = prevQuiz.answers?.length ?? 0;
  const totalQuestions = correct + wrong + (prevQuiz.skippedCount || 0);

  const skipped =
    totalQuestions > attempted ? totalQuestions - attempted : 0;

  const accuracy =
    totalQuestions > 0
      ? Math.round((correct / totalQuestions) * 100)
      : 0;

  const minutes = Math.floor((prevQuiz.timeTaken || 0) / 60);
  const seconds = (prevQuiz.timeTaken || 0) % 60;

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (accuracy / 100) * circumference;

  return (
    <div className="quiz-attempt">
      <div className="quiz-attempt-card wide">
        <div className="review-summary">
          <div>
            <h1>{prevQuiz.quizId?.title}</h1>

            <p>
              Score: {prevQuiz.scoredMarks}
            </p>

            <p>
              Time Taken: {minutes}m {seconds}s
            </p>

            <p className="meta">
              Accuracy: {accuracy}% | Correct: {correct} | Wrong: {wrong} | Skipped: {skipped}
            </p>

            <p className="meta">
              Attempted on: {new Date(prevQuiz.attemptedAt).toLocaleString()} ·
              Status: {prevQuiz.status}
            </p>
          </div>

          <svg width="110" height="110" className="donut">
            <circle
              cx="55"
              cy="55"
              r={radius}
              stroke="#e5e7eb"
              strokeWidth="10"
              fill="none"
            />
            <circle
              cx="55"
              cy="55"
              r={radius}
              stroke="#16a34a"
              strokeWidth="10"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 55 55)"
            />
            <text x="50%" y="50%" textAnchor="middle" dy=".3em">
              {accuracy}%
            </text>
          </svg>
        </div>

        <div className="distribution">
          <div className="dist correct" style={{ flex: correct }} />
          <div className="dist wrong" style={{ flex: wrong }} />
          <div className="dist skipped" style={{ flex: skipped }} />
        </div>

        <p className="dist-legend">
          Correct: {correct} | Wrong: {wrong} | Skipped: {skipped}
        </p>

        <button
          className="primary"
          onClick={() => navigate("/student/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default QuizReview;