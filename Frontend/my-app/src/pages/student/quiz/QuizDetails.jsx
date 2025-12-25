import { useParams } from "react-router-dom";

const QuizDetails = () => {
  const { quizId } = useParams();

  return (
    <div style={{ padding: "40px" }}>
      <h1>Quiz Details</h1>

      <p><strong>Quiz ID:</strong> {quizId}</p>
      <p><strong>Subject:</strong> Mathematics</p>
      <p>This quiz covers basic algebra concepts.</p>

      <button
        style={{
          marginTop: "20px",
          padding: "10px 18px",
          borderRadius: "10px",
          border: "none",
          background: "#6f6cd9",
          color: "#fff",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        Register
      </button>
    </div>
  );
};

export default QuizDetails;
