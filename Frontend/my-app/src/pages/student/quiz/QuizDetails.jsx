import { useParams, useNavigate } from "react-router-dom";
import "./quizDetails.css";

const QuizDetails = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate(`/student/quiz/attempt/${quizId}`);
  };

  return (
    <div className="quiz-details">
      <div className="quiz-details-card">
        <h1>Quiz Details</h1>

        <p className="quiz-meta">
          <strong>Quiz ID:</strong> {quizId}
        </p>

        <p className="quiz-meta">
          <strong>Subject:</strong> Java Programming
        </p>

        <p className="quiz-description">
          This quiz covers basic Java programming concepts.
        </p>

        <button className="quiz-start-btn" onClick={startQuiz}>
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizDetails;
