import { useNavigate } from "react-router-dom";
import { useGetAllAttemptedQuizzesQuery } from "../../../../redux/services/quizApi";
import { FaHistory, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { MdSubject } from "react-icons/md";
import "./QuizGrid.css";

const PreviousQuizzes = () => {
  const navigate = useNavigate();
  const { data: prevQuiz = [], isLoading, isError } = useGetAllAttemptedQuizzesQuery();

  if (isLoading) return <p style={{color: '#fff'}}>Loading...</p>;
  if (isError) return <p style={{color: '#fff'}}>Error loading quizzes</p>;

  const topFour = prevQuiz.slice(0, 4);

  return (
    <div className="quiz-section">
      <div className="quiz-header">
        <h2 className="quiz-section-title">Previous Attempts</h2>
        {prevQuiz.length > 0 && (
          <button className="see-all-btn" onClick={() => navigate("/student/see-all-prev",{ state:{ quizzes:prevQuiz}})}>
            See All <FaArrowRight />
          </button>
        )}
      </div>

      {topFour.length === 0 ? (
        <div className="quiz-empty">No attempted quizzes yet.</div>
      ) : (
        <div className="quiz-grid">
          {topFour.map((item) => (
            <div key={item._id} className="quiz-tile" onClick={() => navigate("/student/quiz/review",{ state:{ quizId: item.quizId._id }})}>
              <div className="card-top">
                <div className="quiz-icon-wrapper icon-previous">
                  <FaHistory />
                </div>
                <span className="quiz-category-badge">Completed</span>
              </div>

              <div className="quiz-tile-title">{item.quizId.title}</div>

              <div className="quiz-tile-subtitle">
                <MdSubject size={16} /> {item.quizId.subject}
                <FaCheckCircle className="arrow-icon" style={{color: '#10b981'}}/>
              </div>

              <FaHistory className="card-decoration" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PreviousQuizzes;