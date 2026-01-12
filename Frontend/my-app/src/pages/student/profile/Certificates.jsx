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
            const quiz = quizzes.find((q) => q._id === cert.quizId);

            return (
              <div className="certificate-card" key={index}>
                {/* 📄 PDF ICON */}
                <div className="pdf-thumbnail">
                  📄
                  <span>PDF Certificate</span>
                </div>

                <div className="certificate-info">
                  <h4>{quiz?.title || "Quiz Certificate"}</h4>

                  <div className="certificate-actions">
                    {/* 👁 VIEW */}
                    <a
                      href={cert.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-btn"
                    >
                      View
                    </a>

                    {/* ⬇️ DOWNLOAD */}
                    <a
                      href={cert.certificateUrl}
                      download
                      className="download-btn"
                    >
                      Download
                    </a>
                  </div>
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
