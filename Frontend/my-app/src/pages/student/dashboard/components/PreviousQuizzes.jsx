import { useNavigate } from "react-router-dom";

const PreviousQuizzes = () => {
  const navigate = useNavigate();

  const quizzes = [
    { id: 4, title: "C++ Quiz", subject: "C++ Programming" },
  ];

  return (
    <div className="section">
      <h2>Previous Quizzes</h2>

      {quizzes.map((quiz) => (
        <div
          key={quiz.id}
          className="quiz-card"
          onClick={() => navigate(`/student/quiz/${quiz.id}`)}
        >
          <div className="quiz-title">{quiz.title}</div>
          <div className="quiz-sub">{quiz.subject}</div>
        </div>
      ))}
    </div>
  );
};

export default PreviousQuizzes;
