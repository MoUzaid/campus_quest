import React from "react";
import { useLocation } from "react-router-dom";
import { useGetAllQuizzesQuery } from "../../../redux/services/quizApi";
import "./Certificate.css";

const Certificates = () => {
  const location = useLocation();
  const { data: quizzes = [], isLoading } = useGetAllQuizzesQuery();

  const certificates = location.state?.certificates || [];

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="certificates-page">
      <h2 className="certificates-title">Your Certificates</h2>

      {certificates.length === 0 ? (
        <p className="empty-text">No certificates available.</p>
      ) : (
        <div className="certificates-grid">
          {certificates.map((cert, index) => {
            const quiz = quizzes.find(
              (q) => q._id === cert.quizId
            );

            return (
              <div className="certificate-card" key={index}>
                <a
                  href={cert.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={cert.certificateUrl}
                    alt="Certificate"
                    className="certificate-img"
                  />
                </a>

                <div className="certificate-info">
                  <h4>{quiz?.title || "Quiz Certificate"}</h4>
                  <a
                    href={cert.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-btn"
                  >
                    View Certificate
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Certificates;
