import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./FeedbackPage.css";
import { useSubmitFeedbackMutation } from "../../../redux/services/studentApi";

const FeedbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [submitFeedback] = useSubmitFeedbackMutation();

  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ DATA FROM NAVIGATION STATE
  const {
    quizId,
    quizData,
    totalQuestions = 0,
    reason,
  } = location.state || {};

  // ✅ SAFETY CHECK (refresh / direct access protection)
  useEffect(() => {
    if (!quizId || !quizData) {
      console.error("Quiz data missing, redirecting...");
      navigate("/student/dashboard", { replace: true });
    }
  }, [quizId, quizData, navigate]);

  const handleSubmitFeedback = async () => {
    if (rating === 0 || isSubmitting) return;

    try {
      setIsSubmitting(true);

        if (!message.trim()) {
    alert("Please write a short feedback message");
    return;
  }

      await submitFeedback({
        quizId,
        rating,
        message, 
      }).unwrap();

      navigate("/student/dashboard", { replace: true });
    } catch (err) {
      console.error("Feedback submit failed:", err);
      alert(err?.data?.message || "Failed to submit feedback");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="feedback-page">
      <div className="feedback-card">

        {/* ✅ QUIZ INFO */}
        <h1>Quiz Submitted Successfully 🎉</h1>
        <h3 className="quiz-title">{quizData?.title}</h3>
        <p className="quiz-subject">{quizData?.subject}</p>

        <p className="summary-text">
          Total Questions: <strong>{totalQuestions}</strong>
        </p>

        <p className="lock-text">
          Reason: <strong>{reason || "Completed"}</strong>
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={300}
          />

          <div className="char-count">
            {message.length}/300
          </div>
        </div>

        <button
          className="primary"
          disabled={rating === 0 || isSubmitting}
          onClick={handleSubmitFeedback}
        >
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </button>
      </div>
    </div>
  );
};

export default FeedbackPage;