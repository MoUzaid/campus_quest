import { useNavigate } from "react-router-dom";

const OngoingQuizzes = () => {
  const navigate = useNavigate();

  const quizzes = [
    { id: 1, title: "Web Development Quiz", subject: "Web Development" },
    { id: 2, title: "Cyber Security Quiz", subject: "Cyber Security" },
  ];

  return (
    <div className="section">
      <h2>Ongoing Quizzes</h2>

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

export default OngoingQuizzes;
