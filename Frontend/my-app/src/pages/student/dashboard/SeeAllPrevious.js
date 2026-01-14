// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useGetAllDepartmentsQuery } from "../../../redux/services/departmentApi";
// import { FaHistory, FaCheckCircle } from "react-icons/fa";
// import { MdSubject } from "react-icons/md";
// import "./SeeAll.css";


// const SeeAllPrevious = () => {
//   const [department, setDepartment] = useState("");
//   const [filteredQuizzes, setFilteredQuizzes] = useState([]);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const { quizzes = [] } = location.state || {};
// console.log("All Previous Quizzes:", quizzes);
//   const { data: departments, isLoading: deptLoading } =
//     useGetAllDepartmentsQuery();

//   const departmentList = departments?.data?.[0]?.departmentNames || [];

//   const handleChange = (e) => {
//     const selectedDepartment = e.target.value;
//     setDepartment(selectedDepartment);

//     if (!selectedDepartment) {
//       setFilteredQuizzes([]);
//       return;
//     }

//     const filtered = quizzes.filter(
//       (item) =>
//         item.quizId?.department?.toLowerCase().trim() ===
//         selectedDepartment.toLowerCase().trim()
//     );

//     setFilteredQuizzes(filtered);
//   };

//   const quizzesToShow =
//     department && filteredQuizzes.length > 0 ? filteredQuizzes : quizzes;

//   return (
//     <div className="seeall-page">
//       <h1 className="seeall-title">Previous Attempts</h1>

//       <select
//         name="department"
//         onChange={handleChange}
//         value={department}
//         disabled={deptLoading}
//         className="seeall-select"
//       >
//         <option value="">All Departments</option>
//         {departmentList.map((dept, idx) => (
//           <option key={idx} value={dept}>
//             {dept}
//           </option>
//         ))}
//       </select>

//       <div className="quiz-grid">
//         {quizzesToShow.length === 0 ? (
//           <p style={{ color: "#9ca3af", marginTop: "20px" }}>
//             No attempted quizzes found
//           </p>
//         ) : (
//           quizzesToShow.map((item) => (
//             <div
//               key={item._id}
//               className="quiz-tile"
//               onClick={() =>
//                  navigate("/student/quiz/review", {
//                   state: { quizId: item.quizId._id },
//                 })
//               }
//             >
//               <div className="card-top">
//                 <div className="quiz-icon-wrapper icon-previous">
//                   <FaHistory />
//                 </div>
//                 <span className="quiz-category-badge">Completed</span>
//               </div>

//               <div className="quiz-tile-title">
//                 {item.quizId?.title}
//               </div>

//               <div className="quiz-tile-subtitle">
//                 <MdSubject size={16} /> {item.quizId?.subject}
//                 <FaCheckCircle
//                   className="arrow-icon"
//                   style={{ color: "#10b981" }}
//                 />
//               </div>

//               <FaHistory className="card-decoration" />
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default SeeAllPrevious;





import React, { useState, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllDepartmentsQuery } from "../../../redux/services/departmentApi";
import { FaHistory, FaCheckCircle } from "react-icons/fa";
import { MdSubject } from "react-icons/md";
import "./SeeAll.css";

// Helper function for consistent string comparison
const normalizeString = (str) => {
  return str?.toString().toLowerCase().trim() || "";
};

const SeeAllPrevious = () => {
  const [department, setDepartment] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
  // Safer state extraction with fallback
  const { quizzes = [] } = location.state || {};
  
  console.log("All Previous Quizzes:", quizzes);

  const { data: departments, isLoading: deptLoading, isError: deptError } =
    useGetAllDepartmentsQuery();

  // Extract department list safely
  const departmentList = useMemo(() => {
    if (!departments?.data?.[0]?.departmentNames) return [];
    return departments.data[0].departmentNames;
  }, [departments]);

  // Memoized filtered quizzes calculation
  const filteredQuizzes = useMemo(() => {
    if (!department) return [];
    
    return quizzes.filter((item) => {
      const quizDepartment = item.quizId?.department;
      if (!quizDepartment) return false;
      
      return normalizeString(quizDepartment) === normalizeString(department);
    });
  }, [department, quizzes]);

  // Determine which quizzes to show
  const quizzesToShow = useMemo(() => {
    if (department && filteredQuizzes.length > 0) {
      return filteredQuizzes;
    }
    return quizzes;
  }, [department, filteredQuizzes, quizzes]);

  const handleDepartmentChange = useCallback((e) => {
    setDepartment(e.target.value);
  }, []);

  const handleQuizClick = useCallback((quizId) => {
    if (!quizId) {
      console.warn("No quiz ID provided for navigation");
      return;
    }
    
    navigate("/student/quiz/review", {
      state: { quizId },
      replace: false
    });
  }, [navigate]);

  // Loading state for departments
  if (deptLoading) {
    return (
      <div className="seeall-page">
        <div className="loading-spinner">Loading departments...</div>
      </div>
    );
  }

  // Error state for departments
  if (deptError) {
    return (
      <div className="seeall-page">
        <div className="error-message">
          Failed to load departments. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="seeall-page">
      <h1 className="seeall-title">Previous Attempts</h1>

      {/* Department filter */}
      <div className="filter-section">
        <select
          name="department"
          onChange={handleDepartmentChange}
          value={department}
          className="seeall-select"
          aria-label="Filter by department"
        >
          <option value="">All Departments</option>
          {departmentList.map((dept, idx) => (
            <option key={`dept-${idx}`} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        
        {department && (
          <button 
            className="clear-filter-btn"
            onClick={() => setDepartment("")}
            aria-label="Clear filter"
          >
            Clear Filter
          </button>
        )}
      </div>

      {/* Results count */}
      <div className="results-info">
        <p>
          Showing {quizzesToShow.length} of {quizzes.length} quiz attempts
          {department && ` (filtered by ${department})`}
        </p>
      </div>

      {/* Quizzes grid */}
      <div className="quiz-grid">
        {quizzesToShow.length === 0 ? (
          <div className="no-results">
            <p className="no-results-text">
              {department 
                ? `No attempted quizzes found for ${department}`
                : "No attempted quizzes found"}
            </p>
          </div>
        ) : (
          quizzesToShow.map((item, index) => {
            const quizId = item.quizId?._id;
            const title = item.quizId?.title || "Untitled Quiz";
            const subject = item.quizId?.subject || "No Subject";
            
            return (
              <div
                key={item._id || `quiz-${index}`}
                className="quiz-tile"
                onClick={() => handleQuizClick(quizId)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleQuizClick(quizId);
                  }
                }}
                aria-label={`Review quiz: ${title}`}
              >
                <div className="card-top">
                  <div className="quiz-icon-wrapper icon-previous">
                    <FaHistory aria-hidden="true" />
                  </div>
                  <span className="quiz-category-badge">Completed</span>
                </div>

                <div className="quiz-tile-title" title={title}>
                  {title}
                </div>

                <div className="quiz-tile-subtitle">
                  <MdSubject size={16} aria-hidden="true" /> 
                  <span className="subject-text">{subject}</span>
                  <FaCheckCircle
                    className="arrow-icon"
                    style={{ color: "#10b981" }}
                    aria-label="Completed successfully"
                  />
                </div>

                <FaHistory className="card-decoration" aria-hidden="true" />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SeeAllPrevious;