import React, { useEffect } from "react";
import "./styles/CreateQuiz.css";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllCoursesQuery } from "../redux/services/coursesApi";
import { useNavigate } from "react-router-dom";
import {
  setQuizTitle,
  setSubject,
  setDescription,
  setDepartment,
  setSelectedCourses,
  setSelectedYears,
  setSelectedGroups,
  setTotalQuestions,
  setPassingMarks,
  setMarksPerQuestion,
  setNegativeMark,
  setNegativeMarksPerQuestion,
  setStartDate,
  setStartTime,
  setEndDate,
  setEndTime,
  setDurationMinutes,
} from "../redux/features/quizSlice";
import { useGetAllDepartmentsQuery } from "../redux/services/departmentApi";

const CreateQuiz = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const {
    quizTitle,
    subject,
    description,
    department,
    selectedCourses,
    selectedYears,
    selectedGroups,
    totalQuestions,
    passingMarks,
    marksPerQuestion,
    negativeMark,
    negativeMarksPerQuestion,
    startDate,
    startTime,
    endDate,
    endTime,
    durationMinutes,
  } = useSelector((state) => state.quiz);

  const {
  data: courses,
  isLoading: coursesLoading,
  isError: coursesError,
  error: coursesErrorData,
} = useGetAllCoursesQuery();

const {
  data: departments,
  isLoading: departmentsLoading,
  isError: departmentsError,
  error: departmentsErrorData,
  refetch,
} = useGetAllDepartmentsQuery();

if(departmentsLoading){
  return <p>Loading...</p>;
}
if(departmentsError){
  return <p>Error loading courses: {coursesErrorData?.message || 'Unknown error'}</p>;
}

if(coursesLoading){
  return <p>Loading...</p>;
}
if(coursesError){
  return <p>Error loading courses: {coursesErrorData?.message || 'Unknown error'}</p>;
}

const departmentList = departments?.data?.[0]?.departmentNames || [];


const courseOptions =
  courses?.courses?.map((course) => ({
    value: course._id,
    label: course.courseName.join(", "),
    yrs: course.year,
    grps: course.groups,
  })) || [];


  return (
    <div className="quiz-container">
      <h2 className="page-title">Create Quiz</h2>

      <div className="quiz-layout">
        <div className="quiz-card">
          <div className="form-row">
            <div className="form-group">
              <label>Quiz Title</label>
              <input
                type="text"
                value={quizTitle}
                onChange={(e) => dispatch(setQuizTitle(e.target.value))}
                placeholder="Enter Quiz Title"
              />
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => dispatch(setSubject(e.target.value))}
                placeholder="Enter Subject"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => dispatch(setDescription(e.target.value))}
              placeholder="Enter Description"
            />
          </div>

          <div className="form-group">
            <label>Quiz Department</label>
          <select
  value={department}
  onChange={(e) => dispatch(setDepartment(e.target.value))}
  className="all-select"
>
  <option value="">Select Department</option>

  {departmentList.map((dept, index) => (
    <option key={index} value={dept}>
      {dept}
    </option>
  ))}
</select>
          </div>

          <h3 className="section-title">Target Audience (optional)</h3>

          <div className="form-row">
            <div className="form-group">
              <label>Courses</label>
              <Select
                options={courseOptions}
                isMulti
                value={selectedCourses}
                onChange={(v) => dispatch(setSelectedCourses(v))}
                placeholder="Select Courses"
              />
            </div>

            <div className="form-group">
              <label>Years</label>
              <Select
                options={courseOptions
                  .flatMap((course) =>
                    course.yrs.map((yr) => ({
                      value: yr,
                      label: `Year ${yr}`,
                    }))
                  )
                  .filter(( (value, index, self) =>
                    self.findIndex((v) => v.value === value.value) === index
                  ))}
                isMulti
                value={selectedYears}
                onChange={(v) => dispatch(setSelectedYears(v))}
                placeholder="Select Years"
              />
            </div>

            <div className="form-group">
              <label>Groups</label>
              <Select
                options={courseOptions
                  .flatMap((course) =>
                    course.grps.map((grp) => ({
                      value: grp,
                      label: grp,
                    }))
                  )
                  .filter((value, index, self) =>
                    self.findIndex((v) => v.value === value.value) === index
                  )
                    }
                isMulti
                value={selectedGroups}
                onChange={(v) => dispatch(setSelectedGroups(v))}
                placeholder="Select Groups"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Total Questions</label>
              <select
                value={totalQuestions}
                onChange={(e) =>
                  dispatch(setTotalQuestions(Number(e.target.value)))
                }
                className="all-select"
              >
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={40}>40</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="form-group">
              <label>Passing Marks</label>
              <input
                type="number"
                value={passingMarks||""}
                onChange={(e) =>
                  dispatch(setPassingMarks(Number(e.target.value)))
                }
                placeholder="Enter Passing Marks"
              />
            </div>

            <div className="form-group">
              <label>Marks per Question</label>
              <input
                type="number"
                value={marksPerQuestion||""}
                onChange={(e) =>
                  dispatch(setMarksPerQuestion(Number(e.target.value)))
                }
                placeholder="Enter Marks"
              />
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={negativeMark}
                  onChange={(e) =>
                    dispatch(setNegativeMark(e.target.checked))
                  }
                />
                Add Negative Marking
              </label>
            </div>
          </div>

          {negativeMark && (
            <div className="form-group">
              <label>Negative Marks per Question</label>
              <input
                type="number"
                value={negativeMarksPerQuestion||""}
                onChange={(e) =>
                  dispatch(
                    setNegativeMarksPerQuestion(Number(e.target.value))
                  )
                }
                placeholder="Enter Negative Marks"
              />
            </div>
          )}
        </div>

        <div className="quiz-card schedule-card">
          <h3 className="section-title">Schedule Quiz</h3>

          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => dispatch(setStartDate(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label>Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => dispatch(setStartTime(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => dispatch(setEndDate(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label>End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => dispatch(setEndTime(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label>Duration (minutes)</label>
            <input
              type="number"
              value={durationMinutes}
              onChange={(e) =>
                dispatch(setDurationMinutes(Number(e.target.value)))
              }
              placeholder="Enter Duration"
            />
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button className="btn primary" onClick={()=>Navigate('/questions')}>Next</button>
      </div>
    </div>
  );
};

export default CreateQuiz;
