import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import { saveAnswer } from "../../../redux/features/quizAnswerSlice";
import { useSubmitQuizMutation } from "../../../redux/services/quizApi";

import QuizSecurity from "./QuizSecurity";
import "./QuizAttempt.css";

const QuizAttempt = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { quizData } = location.state || {};
  const questions = quizData?.questions || [];

  const [submitQuiz] = useSubmitQuizMutation();

  const { answers } = useSelector(
    (state) => state.quizAnswer
  );

  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(
    (quizData?.durationMinutes || 0) * 60
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  /* =========================
     START QUIZ
  ========================= */
  const handleStartQuiz = async () => {
    try {
      await document.documentElement.requestFullscreen();
      setHasStarted(true);
    } catch {
      alert("Fullscreen permission is required to start the quiz.");
    }
  };

  /* =========================
     TIMER
  ========================= */
  useEffect(() => {
    if (!hasStarted || isSubmitted) return;

    if (timeLeft === 0) {
      handleSubmit("Time up");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, isSubmitted, timeLeft]);

  /* =========================
     CURRENT QUESTION
  ========================= */
  const currentQuestion = questions[currentIndex];

  const isAnswered = answers.some(
    (a) => a.questionId === currentQuestion?._id
  );

  /* =========================
     ANSWER SELECT
  ========================= */
  const handleSelect = (option) => {
    dispatch(
      saveAnswer({
        questionId: currentQuestion._id,
        selectedAnswer: option,
      })
    );
  };

  /* =========================
     SUBMIT QUIZ
  ========================= */
  const handleSubmit = async (reason = "Completed") => {
    if (isSubmitted) return;

    setIsSubmitted(true);

    const timeTaken =
      quizData.durationMinutes * 60 - timeLeft;

    try {
      const res = await submitQuiz({
        quizId,
        data: {
          answers,
          timeTaken,
        },
      }).unwrap();

      console.log("Quiz submitted:", res);

      if (document.fullscreenElement) {
        document.exitFullscreen();
      }

      navigate(`/student/quiz/feedback`, {
        state: {
          quizId,
          quizData,
          timeTaken,
          totalQuestions: questions.length,
          reason,
        },
      });
    } catch (error) {
      console.error("Submit failed:", error);
      alert("Quiz submission failed. Try again.");
      setIsSubmitted(false);
    }
  };

  const min = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60;

  /* =========================
     START SCREEN
  ========================= */
  if (!hasStarted) {
    return (
      <div className="quiz-attempt">
        <div className="quiz-attempt-card">
          <h2>Ready to start the quiz?</h2>
          <p>
            Duration: {quizData?.durationMinutes} minutes <br />
            Quiz will run in fullscreen mode <br />
            Don't switch tabs or minimize the window <br />
            Don't Leave the quiz until submission
          </p>

          <button className="primary" onClick={handleStartQuiz}>
            OK
          </button>
        </div>
      </div>
    );
  }

  /* =========================
     QUIZ UI
  ========================= */
  return (
    <div className="quiz-attempt">
      <QuizSecurity
        hasStarted={hasStarted}
        isSubmitted={isSubmitted}
        onAutoSubmit={handleSubmit}
      />

      <div className="quiz-attempt-card">
        <div className="quiz-header">
          <h1>{quizData?.title}</h1>
          <span className="quiz-timer">
            ⏱ {min}:{sec.toString().padStart(2, "0")}
          </span>
        </div>

        <p className="quiz-progress">
          Question {currentIndex + 1} of {questions.length}
        </p>

        <h2>{currentQuestion?.questionText}</h2>

        <ul className="quiz-options">
          {currentQuestion?.options.map((opt, i) => (
            <li
              key={i}
              className={
                answers.find(
                  (a) =>
                    a.questionId === currentQuestion._id &&
                    a.selectedAnswer === opt
                )
                  ? "selected"
                  : ""
              }
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>

        <div className="quiz-nav">
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((i) => i - 1)}
          >
            Previous
          </button>

          <button
            disabled={!isAnswered}
            onClick={() =>
              currentIndex === questions.length - 1
                ? handleSubmit("Completed")
                : setCurrentIndex((i) => i + 1)
            }
          >
            {currentIndex === questions.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizAttempt;
