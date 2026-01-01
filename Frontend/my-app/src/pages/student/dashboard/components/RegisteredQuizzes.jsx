import { useNavigate } from "react-router-dom";
import { useGetRegisteredQuizzesForStudentQuery } from "../../../../redux/services/quizApi";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import "./QuizGrid.css";

const RegisteredQuizzes = () => {
  const navigate = useNavigate();
  const { data: quizzesData = [], isLoading, isError } = useGetRegisteredQuizzesForStudentQuery();

  if (isLoading) return <p style={{color: '#fff'}}>Loading...</p>;
  if (isError) return <p style={{color: '#fff'}}>Error loading quizzes</p>;

  const topFour = quizzesData.slice(0, 4);

  return (
    <div className="quiz-section">
      <div className="quiz-header">
        <h2 className="quiz-section-title">Registered Quizzes</h2>
        {quizzesData.length > 0 && (
          <button className="see-all-btn" onClick={() => navigate("/student/see-all",{ state:{ quizzes:quizzesData}})}>
            See All <FaArrowRight />
          </button>
        )}
      </div>

      {topFour.length === 0 ? (
        <div className="quiz-empty">No registered quizzes found.</div>
      ) : (
        <div className="quiz-grid">
          {topFour.map((quiz) => (
            <div
              key={quiz._id}
              className="quiz-tile"
              onClick={() =>
                navigate(`/student/quiz/${quiz._id}`, {
                  state: { quizData: quiz, registered: true },
                })
              }
            >
              <div className="card-top">
                <div className="quiz-icon-wrapper icon-registered">
                  <FaCalendarAlt />
                </div>
                <span className="quiz-category-badge">Upcoming</span>
              </div>

              <div className="quiz-tile-title">{quiz.title}</div>

              <div className="quiz-tile-subtitle">
                <BiTimeFive size={18} /> {quiz.subject}
                <FaArrowRight className="arrow-icon" />
              </div>

               <FaCalendarAlt className="card-decoration" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RegisteredQuizzes;