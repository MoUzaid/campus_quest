import React, { useState } from "react";
import "./CreateQuiz.css";
import Select from "react-select";

const CreateQuiz = () => {
  const [negativeMark, setNegativeMark] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);

  const courseOptions = [
    { value: "bca", label: "BCA" },
    { value: "mca", label: "MCA" },
    { value: "btech", label: "BTech" },
    { value: "mba", label: "MBA" },
  ];

  const yearOptions = [
    { value: "1", label: "1st Year" },
    { value: "2", label: "2nd Year" },
    { value: "3", label: "3rd Year" },
  ];

  const groupOptions = [
    { value: "A", label: "Group A" },
    { value: "B", label: "Group B" },
    { value: "C", label: "Group C" },
  ];

  return (
    <div className="quiz-container">
      <h2 className="page-title">Create Quiz</h2>

      {/* TWO COLUMN LAYOUT */}
      <div className="quiz-layout">

        {/* LEFT : CREATE QUIZ */}
        <div className="quiz-card">
          <div className="form-row">
            <div className="form-group">
              <label>Quiz Title</label>
              <input type="text" placeholder="Enter Quiz Title" />
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input type="text" placeholder="Enter Subject" />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea placeholder="Enter Description" />
          </div>

          <div className="form-group">
            <label>Department</label>
            <input type="text" placeholder="Enter Department" />
          </div>

          <h3 className="section-title">Target Audience (optional)</h3>

          <div className="form-row">
            <div className="form-group">
              <label>Courses</label>
              <Select
                options={courseOptions}
                isMulti
                placeholder="Select Courses"
                value={selectedCourses}
                onChange={setSelectedCourses}
              />
            </div>

            <div className="form-group">
              <label>Years</label>
              <Select
                options={yearOptions}
                isMulti
                placeholder="Select Years"
                value={selectedYears}
                onChange={setSelectedYears}
              />
            </div>

            <div className="form-group">
              <label>Groups</label>
              <Select
                options={groupOptions}
                isMulti
                placeholder="Select Groups"
                value={selectedGroups}
                onChange={setSelectedGroups}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
                <label>Total Questions</label>
                <select id="NumberOfQues">
                    <option value="0">0</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                </select>
                </div>
            <div className="form-group">
              <label>Marks per Question</label>
              <input type="number" placeholder="Enter Marks" />
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={negativeMark}
                  onChange={(e) => setNegativeMark(e.target.checked)}
                />
                Add Negative Marking
              </label>
            </div>
          </div>

          {negativeMark && (
            <div className="form-group">
              <label>Negative Marks per Question</label>
              <input type="number" placeholder="Enter Negative Marks" />
            </div>
          )}
        </div>

        {/* RIGHT : SCHEDULE QUIZ */}
        <div className="quiz-card schedule-card">
          <h3 className="section-title">Schedule Quiz</h3>

          <div className="form-group">
            <label>Start Date</label>
            <input type="date" />
          </div>

          <div className="form-group">
            <label>Start Time</label>
            <input type="time" />
          </div>

          <div className="form-group">
            <label>End Date</label>
            <input type="date" />
          </div>

          <div className="form-group">
            <label>End Time</label>
            <input type="time" />
          </div>

          <div className="form-group">
            <label>Duration (minutes)</label>
            <input type="number" placeholder="Enter Duration" />
          </div>
        </div>
      </div>

      {/* NEXT BUTTON OUTSIDE BOTH BOXES */}
      <div className="action-buttons">
        <button className="btn primary">Next</button>
      </div>
    </div>
  );
};

export default CreateQuiz;
