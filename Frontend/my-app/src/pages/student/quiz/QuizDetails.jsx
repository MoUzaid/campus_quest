import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./QuizDetails.css";
import {
  useRegisterStudentForQuizMutation,
  useGetQuizTimerQuery,
} from "../../../redux/services/quizApi";
import Socket from "../../../Socket";

const QuizDetails = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { quizData, registered } = location.state || {};

  const [errorMsg, setErrorMsg] = useState("");

  const [registerStudentForQuiz,{isLoading,isError}] = useRegisterStudentForQuizMutation();

  const {
    data: timerData,
    isLoading: timerLoading,
    isError: timerError,
    refetch,
  } = useGetQuizTimerQuery(quizId, {
    skip: !quizData?.isStarted,
  });

  if (!quizData) {
    return <p style={{ color: "#fff" }}>Invalid quiz data</p>;
  }

  if (timerLoading && quizData?.isStarted) {
    return <p style={{ color: "#fff" }}>Loading timer...</p>;
  }

  if (timerError && quizData?.isStarted) {
    return <p style={{ color: "#fff" }}>Error loading timer</p>;
  }

  const formatDateTime = (value) => {
    if (!value) return "N/A";
    return new Date(value).toLocaleString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  /* ================= REGISTER ================= */
  const handleRegister = async () => {
    try {
      const res = await registerStudentForQuiz({ quizId }).unwrap();
      alert(res.message || "Successfully registered for the quiz!");
      setErrorMsg("");
    } catch (err) {
      setErrorMsg(err?.data?.message || "Registration failed");
    }
  };

  /* ================= JOIN QUIZ ================= */
  const handleJoin = async () => {
    if (!quizData.isStarted) {
      alert("Quiz has not started yet!");
      return;
    }

    try {
      // 🔥 fetch fresh timer data
      const latestTimer = await refetch().unwrap();

      // 🔥 join socket room
      Socket.emit("join-timer-room", { quizId });

      // 🔥 navigate safely
      navigate(`/student/quiz/waiting/${quizId}`, {
        state: {
          quizData,
          startTime: new Date(latestTimer.startTime).getTime(),
          duration: Number(latestTimer.duration),
        },
      });
    } catch (err) {
      alert(err?.data?.message || "Failed to join quiz");
    }
  };

  return (
    <div className="quiz-details">
      <div className="quiz-details-card">
        <h1>Quiz Details</h1>

        <p className="quiz-meta">
          <strong>Quiz Title:</strong> {quizData.title}
        </p>

        <p className="quiz-meta">
          <strong>Subject:</strong> {quizData.subject}
        </p>

        <p className="quiz-description">
          <strong>Description:</strong> {quizData.description}
        </p>

        <p className="quiz-startTime">
          <strong>Start Time:</strong>{" "}
          {formatDateTime(quizData.startTime)}
        </p>

        <p className="quiz-Time">
          <strong>End Time:</strong>{" "}
          {formatDateTime(quizData.endTime)}
        </p>

        <p className="quiz-min">
          <strong>Duration:</strong> {quizData.durationMinutes} Minutes
        </p>

        <p className="quiz-marks">
          <strong>Total Marks:</strong> {quizData.totalMarks}
        </p>

        <p className="quiz-marks">
          <strong>Passing Marks:</strong> {quizData.passingMarks}
        </p>

        {errorMsg && <p className="quiz-error">{errorMsg}</p>}

        {/* ================= BUTTON LOGIC ================= */}
       {quizData?.isStarted || registered ? (
  <button
    className="quiz-start-btn"
    onClick={handleJoin}
  >
    Join
  </button>
) : (
  <button
    className="quiz-start-btn"
    onClick={handleRegister}
  >
  {isLoading?"Registering":"Register"}
  </button>
)}

        <button
          className="leaderboard-btn"
          onClick={() =>
            navigate("/leaderboard", {
              state: { quizId },
            })
          }
        >
          🏆 View Leaderboard
        </button>
      </div>
    </div>
  );
};

export default QuizDetails;
