import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

import { useDispatch, useSelector } from "react-redux";
import {
  setStudentField,
  resetStudentForm,
} from "../../../redux/features/studentSlice";
import { useRegisterStudentMutation } from "../../../redux/services/studentApi";
import { useGetAllDepartmentsQuery } from "../../../redux/services/departmentApi";
import { useGetAllCoursesQuery } from "../../../redux/services/coursesApi";
import { setCredentials } from "../../../redux/features/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    enrollmentNumber = "",
    name = "",
    gender = "",
    email = "",
    mobileNumber = "",
    department = "",
    course = "",
    year = "",
    semester = "",
    group = "",
    password = "",
    confirmPassword = "",
  } = useSelector((state) => state.student || {});

  const [registerStudent, { isLoading }] =
    useRegisterStudentMutation();

  const { data: departments, isLoading: deptLoading } =
    useGetAllDepartmentsQuery();

  const { data: courses } = useGetAllCoursesQuery();

  const departmentList =
    departments?.data?.[0]?.departmentNames || [];

  const allCourses =
    courses?.courses || courses?.data || [];

  const filteredCourses = allCourses.filter(
    (c) => c.department === department
  );

  const selectedCourseObj = filteredCourses.find(
    (c) =>
      Array.isArray(c.courseName) &&
      c.courseName.includes(course)
  );

  const handleChange = (e) => {
    dispatch(
      setStudentField({
        field: e.target.name,
        value: e.target.value,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!email.endsWith("@student.iul.ac.in")) {
      alert("Only college email allowed");
      return;
    }

    try {
      const payload = {
        enrollmentNumber,
        name,
        gender,
        email,
        mobileNumber,
        department,
        course,
        year: Number(year),
        semester: Number(semester),
        group,
        password,
      };

      const res = await registerStudent(payload).unwrap();

      dispatch(
        setCredentials({
          user: res.student.name,
          role: "student",
        })
      );

      dispatch(resetStudentForm());

      navigate("/student/verifyOtp", {
        state: { email },
      });
    } catch (err) {
      alert(err?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="student-signup-page">
      <div className="student-signup-container">
        <h2 className="student-signup-title">
          Student Registration
        </h2>
        <p className="student-signup-subtitle">
          Join the Campus Quest community
        </p>

        <form
          className="student-signup-form"
          onSubmit={handleSubmit}
        >
          <div className="student-signup-grid">
            <input
              name="enrollmentNumber"
              placeholder="Enrollment Number"
              value={enrollmentNumber}
              onChange={handleChange}
              className="student-signup-input"
              required
            />

            <input
              name="name"
              placeholder="Full Name"
              value={name}
              onChange={handleChange}
              className="student-signup-input"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="student@student.iul.ac.in"
              value={email}
              onChange={handleChange}
              className="student-signup-input"
              required
            />

            <input
              name="mobileNumber"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={handleChange}
              className="student-signup-input"
              required
            />

            <select
              name="gender"
              value={gender}
              onChange={handleChange}
              className="student-signup-select"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <select
              name="department"
              value={department}
              onChange={handleChange}
              className="student-signup-select"
              disabled={deptLoading}
              required
            >
              <option value="">Select Department</option>
              {departmentList.map((dept, idx) => (
                <option key={idx} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            <select
              name="course"
              value={course}
              onChange={handleChange}
              className="student-signup-select"
              disabled={!department}
              required
            >
              <option value="">Select Course</option>
              {filteredCourses.map((c) =>
                c.courseName.map((singleCourse, idx) => (
                  <option
                    key={`${c._id}-${idx}`}
                    value={singleCourse}
                  >
                    {singleCourse}
                  </option>
                ))
              )}
            </select>

            <select
              name="year"
              value={year}
              onChange={handleChange}
              className="student-signup-select"
              disabled={!selectedCourseObj}
              required
            >
              <option value="">Select Year</option>
              {selectedCourseObj && Array.isArray(selectedCourseObj.year) ? (
                selectedCourseObj.year.map((yr) => (
                  <option key={yr} value={String(yr)}>
                    Year {yr}
                  </option>
                ))
              ) : selectedCourseObj?.year ? (
                // If year is a single number, generate range
                Array.from(
                  { length: 4 },
                  (_, i) => i + Number(selectedCourseObj.year)
                ).map((yr) => (
                  <option key={yr} value={String(yr)}>
                    Year {yr}
                  </option>
                ))
              ) : null}
            </select>

            <select
              name="semester"
              value={semester}
              onChange={handleChange}
              className="student-signup-select"
              required
            >
              <option value="">Select Semester</option>
              {[1, 2, 3, 4, 5, 6, 7, 8,9,10].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <select
              name="group"
              value={group}
              onChange={handleChange}
              className="student-signup-select"
              disabled={!selectedCourseObj}
              required
            >
              <option value="">Select Group</option>
              {selectedCourseObj?.groups?.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div className="student-signup-grid">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              className="student-signup-input"
              required
            />

            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleChange}
              className="student-signup-input"
              required
            />
          </div>

          <button
            className="student-signup-btn"
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="student-signup-footer">
          Already have an account?
          <Link to="/student/login"> Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
