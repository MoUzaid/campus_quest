import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import "./FeedbackPage.css";

const FeedbackPage = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const { state } = useLocation();
  const [feedback, setFeedback] = useState("");

  /* =========================
     SAFETY GUARD
  ========================= */
  if (!state || !state.answers) {
    return (
      <div className="feedback-page">
        <div className="feedback-card">
          <h2>No quiz data found</h2>
          <button
            className="primary"
            onClick={() => navigate("/student/dashboard")}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const { totalQuestions, answers } = state;
  const answeredCount = Object.keys(answers).length;

  const handleSubmitFeedback = () => {
    if (feedback.trim()) {
      console.log("User feedback:", {
        quizId,
        feedback
      });
      // later → send to backend
    }

    navigate("/student/dashboard", { replace: true });
  };

  return (
    <div className="feedback-page">
      <div className="feedback-card">
        <h1>Quiz Submitted Successfully 🎉</h1>

        {/* <p className="summary-text">
          You answered <strong>{answeredCount}</strong> out of{" "}
          <strong>{totalQuestions}</strong> questions.
        </p> */}
    <p>Submission complete.
    </p>

        <p className="lock-text">
          Your responses have been recorded.
        </p>

        <div className="feedback-box">
          <label>
            Optional feedback <span>(helps us improve)</span>
          </label>

          <textarea
            placeholder="Anything confusing or worth improving?"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            maxLength={300}
          />

          <div className="char-count">
            {feedback.length}/300
          </div>
        </div>

        <button className="primary" onClick={handleSubmitFeedback}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default FeedbackPage;
