import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./QuizDetails.css";
import {
  useRegisterStudentForQuizMutation,
  useGetQuizTimerQuery,
} from "../../../redux/services/quizApi";
import { useGetMeQuery } from "../../../redux/services/studentApi";
import { toast } from "react-toastify";
import Socket from "../../../Socket";

const QuizDetails = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  /* ================= ALL HOOKS FIRST ================= */

  const { quizData } = location.state || {};

  const { data: student } = useGetMeQuery();

  const [registerStudentForQuiz, { isLoading }] =
    useRegisterStudentForQuizMutation();

  const {
    isLoading: timerLoading,
    isError: timerError,
    refetch,
  } = useGetQuizTimerQuery(quizId, {
    skip: !quizData?.isStarted,
  });

  const [errorMsg, setErrorMsg] = useState("");

  /* ================= SAFE DERIVED VALUES ================= */

  const isRegistered =
    quizData?.registeredStudents?.includes(student?._id) || false;

  /* ================= CONDITIONAL RENDERING AFTER HOOKS ================= */

  if (!quizData) {
    return <p style={{ color: "#fff" }}>Invalid quiz data</p>;
  }

  if (timerLoading && quizData.isStarted) {
    return <p style={{ color: "#fff" }}>Loading timer...</p>;
  }

  if (timerError && quizData.isStarted) {
    return <p style={{ color: "#fff" }}>Error loading timer</p>;
  }

  /* ================= HELPERS ================= */

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
      toast.success(res.message);
      navigate("/");
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

    const startTimeMs = new Date(quizData.quizStartTime).getTime();
    const endTimeMs =
      startTimeMs + quizData.durationSeconds * 1000;

    if (Date.now() >= endTimeMs) {
      alert("Quiz Timer Ended");
      return;
    }

    try {
      const latestTimer = await refetch().unwrap();

      const freshEndTime =
        new Date(latestTimer.startTime).getTime() +
        Number(latestTimer.duration) * 1000;

      if (Date.now() >= freshEndTime) {
        alert("Quiz Timer Ended");
        return;
      }

      Socket.emit("join-timer-room", quizId);

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

  /* ================= JSX ================= */

  return (
    <div className="quiz-details">
      <div className="quiz-details-card">
        <h1>Quiz Details</h1>

        <p><strong>Quiz Title:</strong> {quizData.title}</p>
        <p><strong>Subject:</strong> {quizData.subject}</p>
        <p><strong>Description:</strong> {quizData.description}</p>

        <p>
          <strong>Start Time:</strong>{" "}
          {formatDateTime(quizData.startTime)}
        </p>

        <p>
          <strong>End Time:</strong>{" "}
          {formatDateTime(quizData.endTime)}
        </p>

        <p>
          <strong>Duration:</strong> {quizData.durationMinutes} Minutes
        </p>

        <p>
          <strong>Total Marks:</strong> {quizData.totalMarks}
        </p>

        <p>
          <strong>Passing Marks:</strong> {quizData.passingMarks}
        </p>

        {errorMsg && <p className="quiz-error">{errorMsg}</p>}

        {/* ================= BUTTON LOGIC ================= */}
       {quizData.isStarted && isRegistered ? (
          <button className="quiz-start-btn" onClick={handleJoin}>
            Join
          </button>
        ) : (
          <button
            className="quiz-start-btn"
            onClick={handleRegister}
            disabled={isLoading || isRegistered}
          >
            {isRegistered
              ? "Join"
              : isLoading
              ? "Registering..."
              : "Register"}
          </button>
        )}
        <button
          className="leaderboard-btn"
          onClick={() =>
            navigate("/leaderboard", { state: { quizId } })
          }
        >
          🏆 View Leaderboard
        </button>
      </div>
    </div>
  );
};

export default QuizDetails;