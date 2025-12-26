import { useParams } from "react-router-dom";
import "./quizDetails.css";

const QuizDetails = () => {
  const { quizId } = useParams();

  return (
    <div className="quiz-details">
      <div className="quiz-details-card">
        <h1>Quiz Details</h1>

        <p className="quiz-meta">
          <strong>Quiz ID:</strong> {quizId}
        </p>

        <p className="quiz-meta">
          <strong>Subject:</strong> java Programming
        </p>

        <p className="quiz-description">
          This quiz covers basic Java Programming concepts.
        </p>

        <button className="quiz-register-btn">
          Register
        </button>
      </div>
    </div>
  );
};

export default QuizDetails;
