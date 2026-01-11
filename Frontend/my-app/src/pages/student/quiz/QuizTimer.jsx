import React, { useEffect, useState } from "react";

const QuizTimer = ({
  countdownStartTime, // Date.now() (ms) OR future timestamp
  countdownDuration,  // seconds (eg: 600)
  onQuizStart
}) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (
      countdownStartTime == null ||
      isNaN(Number(countdownStartTime)) ||
      !countdownDuration
    ) {
      setTimeLeft(0);
      return;
    }

    const startTimeMs = Number(countdownStartTime);

    const interval = setInterval(() => {
      const now = Date.now();

      // 🔹 CASE 1: Quiz start time abhi aaya hi nahi (WAITING)
      if (now < startTimeMs) {
        const waitingSeconds = Math.ceil(
          (startTimeMs - now) / 1000
        );
        setTimeLeft(waitingSeconds);
        return;
      }

      // 🔹 CASE 2: Quiz has started (RUNNING)
      if (!hasStarted) {
        setHasStarted(true);
        onQuizStart?.(); // 🚀 quiz officially started
      }

      const elapsedSeconds = Math.floor(
        (now - startTimeMs) / 1000
      );

      const remainingSeconds = Math.max(
        countdownDuration - elapsedSeconds,
        0
      );

      setTimeLeft(remainingSeconds);

      // 🔹 CASE 3: Quiz ended
      if (remainingSeconds === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdownStartTime, countdownDuration, onQuizStart, hasStarted]);

  const safeTime = isNaN(timeLeft) ? 0 : timeLeft;

  const minutes = Math.floor(safeTime / 60);
  const seconds = safeTime % 60;

  return (
    <div style={{ fontSize: "22px", fontWeight: "bold", color: "black" }}>
      ⏳ Time left{" "}
      {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  );
};

export default QuizTimer;
