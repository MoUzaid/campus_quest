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

  /* ================= REDUX STATE ================= */

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

  /* ================= API HOOKS ================= */

  const [registerStudent, { isLoading }] =
    useRegisterStudentMutation();

  const { data: departments, isLoading: deptLoading } =
    useGetAllDepartmentsQuery();

  const { data: courses } = useGetAllCoursesQuery();

  console.log(courses);

  /* ================= DATA NORMALIZATION ================= */

  // Departments
  const departmentList =
    departments?.data?.[0]?.departmentNames || [];

  // 👇 IMAGE KE HISAAB SE ACTUAL COURSES YAHAN HAIN
  const allCourses =
  courses?.courses?.[0]?.courses || [];


  // Filter courses by selected department
  const filteredCourses = allCourses.filter(
  (c) =>
    c.department?.trim().toLowerCase() ===
    department?.trim().toLowerCase()
);


  // Selected course object
const selectedCourseObj = filteredCourses.find(
  (c) => c.courseName === course
);


  /* ================= HANDLERS ================= */

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

  /* ================= JSX ================= */

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

            {/* ===== COURSE ===== */}
            <select
  name="course"
  value={course}
  onChange={handleChange}
  className="student-signup-select"
  disabled={!department}
  required
>
  <option value="">Select Course</option>

  {filteredCourses.length === 0 && (
    <option disabled>No courses found</option>
  )}

  {filteredCourses.map((c, idx) => (
    <option key={idx} value={c.courseName}>
      {c.courseName}
    </option>
  ))}
</select>


            {/* ===== YEAR ===== */}
            <select
              name="year"
              value={year}
              onChange={handleChange}
              className="student-signup-select"
              required
            >
              <option value="">Select Year</option>
              {[1, 2, 3, 4].map((yr) => (
                <option key={yr} value={yr}>
                  Year {yr}
                </option>
              ))}
            </select>

            {/* ===== SEMESTER ===== */}
            <select
              name="semester"
              value={semester}
              onChange={handleChange}
              className="student-signup-select"
              required
            >
              <option value="">Select Semester</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            {/* ===== GROUP ===== */}
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
