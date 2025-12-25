import { useNavigate } from "react-router-dom";

const UpcomingQuizzes = () => {
  const navigate = useNavigate();

  const quizzes = [
    { id: 3, title: "Java", subject: "Java Programming" },
  ];

  return (
    <div className="section">
      <h2>Upcoming Quizzes</h2>

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

export default UpcomingQuizzes;
