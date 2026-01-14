import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Socket from "../../../Socket";
import axios from "axios";
import "./Leaderboard.css";

const Leaderboard = () => {
  const location = useLocation();
  const { quizId } = location.state || {};

  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    if (!quizId) return;

    Socket.emit("joinRoom", quizId);
    fetchLeaderboard();

    Socket.on("leaderboardUpdate", (data) => {
      setLeaderboard(data);
    });

    return () => {
      Socket.off("leaderboardUpdate");
    };
  }, [quizId]);

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/leaderboard/quiz/${quizId}`
      );
      setLeaderboard(res.data);
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
    }
  };

  const formatTime = (seconds = 0) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const topThree = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <div className="lb-page">
      <h2 className="lb-title">🏆 Quiz Leaderboard</h2>

      {/* TOP 3 */}
      <div className="lb-top-three">
        {topThree.map((item, index) => (
          <div
            key={item._id}
            className={`lb-winner-card lb-rank-${index + 1}`}
          >
            <div className="lb-rank-badge">#{index + 1}</div>

            <h3>{item.userId?.name}</h3>

            <p className="lb-score-text">{item.score} Marks</p>

            <span className="lb-time-text">
              ⏱ {formatTime(item.timeTaken)}
            </span>
          </div>
        ))}
      </div>

      {/* FULL LEADERBOARD */}
      <div className="lb-list">
        {rest.map((item, index) => (
          <div className="lb-row" key={item._id}>
            <span className="lb-rank">{index + 4}</span>

            <span className="lb-name">{item.userId?.name}</span>

            <span className="lb-time">
              ⏱ {formatTime(item.timeTaken)}
            </span>

            <span className="lb-score">{item.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;