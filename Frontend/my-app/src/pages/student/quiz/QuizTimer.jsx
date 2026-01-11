import React, { useEffect, useState } from "react";

const QuizTimer = ({
  countdownStartTime, // MUST be timestamp (ms)
  countdownDuration,  // seconds
  onQuizStart,
}) => {

  const [timeLeft, setTimeLeft] = useState(() => {
    if (!countdownStartTime) return 0;

    const now = Date.now();
    const start = countdownStartTime; // ✅ already timestamp

    if (now < start) {
      return Math.ceil((start - now) / 1000); // waiting
    }

    const elapsed = Math.floor((now - start) / 1000);
    return Math.max(countdownDuration - elapsed, 0);
  });

  const [hasStarted, setHasStarted] = useState(() => {
    if (!countdownStartTime) return false;
    return Date.now() >= countdownStartTime;
  });

  useEffect(() => {
    if (!countdownStartTime) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const start = countdownStartTime;

      // WAITING
      if (now < start) {
        setHasStarted(false);
        setTimeLeft(Math.ceil((start - now) / 1000));
        return;
      }

      // START EVENT
      if (!hasStarted) {
        setHasStarted(true);
        onQuizStart?.();
      }

      // RUNNING
      const elapsed = Math.floor((now - start) / 1000);
      const remaining = Math.max(countdownDuration - elapsed, 0);
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdownStartTime, countdownDuration, hasStarted, onQuizStart]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div style={{ fontSize: "22px", fontWeight: "bold" }}>
      {hasStarted ? (
        <span>⏳ Time left {minutes}:{seconds.toString().padStart(2, "0")}</span>
      ) : (
        <span style={{ color: "orange" }}>
          🚀 Starts in {minutes}:{seconds.toString().padStart(2, "0")}
        </span>
      )}
    </div>
  );
};

export default QuizTimer;
