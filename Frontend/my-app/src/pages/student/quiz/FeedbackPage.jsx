import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import "./FeedbackPage.css";
import { useSubmitFeedbackMutation } from "../../../redux/services/studentApi";

const FeedbackPage = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const location = useLocation();
  const [submitFeedback] = useSubmitFeedbackMutation();

  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0); 

  const state = location.state || {};
  const { totalQuestions = 0, answers = {} } = state;

  const handleSubmitFeedback =async () => {
    console.log("Quiz Feedback:", {
      quizId,
      rating,
      feedback,
    });

    const res = await submitFeedback({
      quizId,
      rating,
      feedback,
    }).unwrap();

    console.log("Feedback submission response:", res.messsage);

    navigate("/student/dashboard", { replace: true });
  };

  return (
    <div className="feedback-page">
      <div className="feedback-card">
        <h1>Quiz Submitted Successfully 🎉</h1>

        <p className="summary-text">
          You answered <strong>{Object.keys(answers).length}</strong> out of{" "}
          <strong>{totalQuestions}</strong> questions.
        </p>

        <p className="lock-text">
          Your responses are final and have been recorded.
        </p>

        <div className="feedback-box">
          <label>
            Rate this quiz <span>(1 = Poor, 5 = Excellent)</span>
          </label>

          {/* ⭐ STAR RATING */}
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${rating >= star ? "active" : ""}`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>

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
