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

  // ✅ SAFE destructuring
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

  // 🔹 APIs
  const { data: departments, isLoading: departmentsLoading } =
    useGetAllDepartmentsQuery();

  const { data: courses } = useGetAllCoursesQuery();

  // 🔹 Department list
  const departmentList =
    departments?.data?.[0]?.departmentNames || [];

  // 🔹 All courses
  const allCourses = courses?.courses || [];

  // 🔹 Filter courses by department
  const filteredCourses = allCourses.filter(
    (c) => c.department === department
  );

  // 🔹 Selected course object
  const selectedCourseObj = filteredCourses.find(
    (c) => c.courseName.includes(course)
  );

  // 🔹 Handle input change
  const handleChange = (e) => {
    dispatch(
      setStudentField({
        field: e.target.name,
        value: e.target.value,
      })
    );
  };

  // 🔹 Submit
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
        year,
        semester: Number(semester),
        group,
        password,
      };
      const res = await registerStudent(payload).unwrap();
      dispatch(
        setCredentials({
          user: res.user,
          role: "student",
        })
      );

      if (res) {
        dispatch(resetStudentForm());
        console.log(email);
        navigate("/student/verifyOtp", { state: { email } });
      }
    } catch (err) {
      alert(err?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container" style={{ maxWidth: "900px" }}>
        <h2 className="auth-title">Student Registration</h2>
        <p className="auth-subtitle">
          Join the Campus Quest community
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="signup-grid">
            <input
              name="enrollmentNumber"
              placeholder="Enrollment Number"
              value={enrollmentNumber}
              onChange={handleChange}
              className="auth-input"
              required
            />

            <input
              name="name"
              placeholder="Full Name"
              value={name}
              onChange={handleChange}
              className="auth-input"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="student@student.iul.ac.in"
              value={email}
              onChange={handleChange}
              className="auth-input"
              required
            />

            <input
              name="mobileNumber"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={handleChange}
              className="auth-input"
              required
            />

            <select
              name="gender"
              value={gender}
              onChange={handleChange}
              className="auth-select"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            {/* 🔹 Department */}
            <select
              name="department"
              value={department}
              onChange={handleChange}
              className="auth-select"
              disabled={departmentsLoading}
              required
            >
              <option value="">Select Department</option>
              {departmentList.map((dept, idx) => (
                <option key={idx} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            {/* 🔹 Course */}
            <select
              name="course"
              value={course}
              onChange={handleChange}
              className="auth-select"
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

            {/* 🔹 YEAR (Course duration) */}
            <select
              name="year"
              value={year}
              onChange={handleChange}
              className="auth-select"
              disabled={!selectedCourseObj}
              required
            >
              <option value="">Select Year</option>
              {selectedCourseObj?.year?.map((yr) => (
                <option key={yr} value={yr}>
                  Year {yr}
                </option>
              ))}
            </select>

            <select
              name="semester"
              value={semester}
              onChange={handleChange}
              className="auth-select"
              required
            >
              <option value="">Select Semester</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>

            {/* 🔹 GROUP */}
            <select
              name="group"
              value={group}
              onChange={handleChange}
              className="auth-select"
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

          <div className="signup-grid">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              className="auth-input"
              required
            />

            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleChange}
              className="auth-input"
              required
            />
          </div>

          <button className="auth-button" disabled={isLoading}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?
          <Link to="/student/login" className="auth-link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
