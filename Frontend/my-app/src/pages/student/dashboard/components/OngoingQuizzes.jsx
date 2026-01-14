// 




import { useNavigate } from "react-router-dom";
import { useGetAllQuizzesQuery } from "../../../../redux/services/quizApi";
import { useGetMeQuery } from "../../../../redux/services/studentApi";
import { FaPlay, FaArrowRight, FaShapes } from "react-icons/fa"; // Updated icons
import { MdOutlineQuiz } from "react-icons/md";
import "./QuizGrid.css";

const OngoingQuizzes = () => {
  const navigate = useNavigate();
  const { data: studentDetails = [], isLoading: studLoading } = useGetMeQuery();
  const { data: allQuizzes = [], isLoading, isError } = useGetAllQuizzesQuery();

  if (studLoading || isLoading) return <p style={{color: '#fff'}}>Loading...</p>;
  if (isError) return <p style={{color: '#fff'}}>Error loading quizzes</p>;

  const filteredQuizzes = allQuizzes
    .filter((quiz) => quiz.department === studentDetails.department && !quiz.isStarted &&  new Date(quiz.endTime).getTime() > Date.now() && !quiz.registeredStudents.includes(studentDetails._id))
    .slice(0, 4);
 const seeAllQuizzes = allQuizzes
    .filter((quiz) =>!quiz.isStarted &&  new Date(quiz.endTime).getTime() > Date.now() && !quiz.registeredStudents.includes(studentDetails._id));


  return (
    <div className="quiz-section">
      <div className="quiz-header">
        <h2 className="quiz-section-title">Ongoing Quizzes</h2>
        <button className="see-all-btn" onClick={() => navigate("/student/see-all",{ state:{ quizzes:seeAllQuizzes}})}>
          See All <FaArrowRight />
        </button>
      </div>

      <div className="quiz-grid">
        {filteredQuizzes.map((quiz) => (
          <div
            key={quiz._id}
            className="quiz-tile"
            onClick={() =>
              navigate(`/student/quiz/${quiz._id}`, { state: { quizData: quiz} })
            }
          >
            {/* Header of the Card */}
            <div className="card-top">
              <div className="quiz-icon-wrapper icon-ongoing">
                <FaPlay style={{ marginLeft: '4px' }} />
              </div>
              <span className="quiz-category-badge">Live</span>
            </div>

            {/* Content */}
            <div className="quiz-tile-title">{quiz.title}</div>
            
            <div className="quiz-tile-subtitle">
              <MdOutlineQuiz size={16} /> {quiz.subject}
              <FaArrowRight className="arrow-icon" />
            </div>

            {/* Background Decoration */}
            <FaShapes className="card-decoration" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OngoingQuizzes;