import React from "react";
import { motion } from "framer-motion";
import { useGetAllDepartmentsQuery } from "../../../redux/services/departmentApi";
import { useDispatch, useSelector } from "react-redux";
import {
  User,
  Mail,
  Phone,
  Building,
  Award,
  Key,
  Shield,
  GraduationCap,
  Lock,
  Briefcase,
  Plus,
} from "lucide-react";

import {
  setFacultyField,
  resetFacultyForm,
  setFacultyMessage,
  clearFacultyMessage,
} from "../../../redux/features/facultySlice";

import { useAddFacultyMutation } from "../../../redux/services/facultyApi";

import "./AddFaculty.css";

const AddFaculty = () => {
  const dispatch = useDispatch();
  const { formData, message } = useSelector((state) => state.faculty);

  const [addFaculty, { isLoading }] = useAddFacultyMutation();

   const { data: departments, isLoading: departmentsLoading } =
      useGetAllDepartmentsQuery();

        const departmentList =
    departments?.data?.[0]?.departmentNames || [];
  /* ================================
     STATIC DATA
  ================================= */
  // const departments = [
  //   "Computer Science & Engineering",
  //   "Information Technology",
  //   "Electronics & Communication Engineering",
  //   "Mechanical Engineering",
  //   "Civil Engineering",
  //   "Electrical Engineering",
  //   "Business Administration",
  //   "Mathematics",
  //   "Physics",
  //   "Chemistry",
  //   "English & Literature",
  //   "History",
  //   "Economics",
  //   "Psychology",
  // ];

  const designations = [
    "Professor",
    "Associate Professor",
    "Assistant Professor",
    "Senior Lecturer",
    "Lecturer",
    "Visiting Faculty",
    "Adjunct Professor",
    "Research Professor",
    "Emeritus Professor",
  ];

  /* ================================
     HANDLERS
  ================================= */
  const handleChange = (e) => {
    let value = e.target.value;

    if (e.target.name === "mobileNumber") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }

    dispatch(
      setFacultyField({
        field: e.target.name,
        value,
      })
    );
  };

  const generatePassword = () => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    dispatch(
      setFacultyField({
        field: "password",
        value: `CQ${year}@${randomNum}`,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearFacultyMessage());

    try {
      await addFaculty(formData).unwrap();

      dispatch(
        setFacultyMessage({
          type: "success",
          text: "✓ Faculty member has been successfully added to the system.",
        })
      );

      dispatch(resetFacultyForm());
    } catch (err) {
      dispatch(
        setFacultyMessage({
          type: "error",
          text: err?.data?.msg || "Failed to add faculty member",
        })
      );
    }
  };

  /* ================================
     UI
  ================================= */
  return (
    <motion.div
      className="add-faculty-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* ================= HEADER ================= */}
      <div className="form-header">
        <div className="header-content">
          <div className="header-title">
            <div className="title-icon">
              <GraduationCap size={28} />
            </div>
            <div>
              <h1>Add New Faculty</h1>
              <p className="subtitle">
                Faculty Registration Portal | Campus Quest
              </p>
            </div>
          </div>

          <div className="header-info">
            <div className="info-item">
              <Shield size={16} />
              <span>Secure & Encrypted Submission</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= STATUS MESSAGE ================= */}
      {message.text && (
        <div className={`status-message ${message.type}`}>
          <div className="message-content">
            <div className="message-icon">
              {message.type === "success" ? "✓" : "✗"}
            </div>
            <span>{message.text}</span>
          </div>
        </div>
      )}

      {/* ================= FORM ================= */}
      <motion.form
        onSubmit={handleSubmit}
        className="add-faculty-form"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* ===== PERSONAL INFO ===== */}
        <div className="form-section">
          <h3 className="section-title">
            <User size={20} />
            Personal Information
          </h3>

          <div className="form-grid">
            <div className="input-group">
              <label>
                <span className="label-text">Faculty ID</span>
                <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <input
                  name="facultyId"
                  value={formData.facultyId}
                  onChange={handleChange}
                  className="formal-input"
                  required
                />
                <div className="input-icon">
                  <User size={18} />
                </div>
              </div>
            </div>

            <div className="input-group">
              <label>
                <span className="label-text">Full Name</span>
                <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="formal-input"
                  required
                />
                <div className="input-icon">
                  <User size={18} />
                </div>
              </div>
            </div>

            <div className="input-group">
              <label>
                <span className="label-text">Email</span>
                <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="formal-input"
                  required
                />
                <div className="input-icon">
                  <Mail size={18} />
                </div>
              </div>
            </div>

            <div className="input-group">
              <label>
                <span className="label-text">Mobile Number</span>
                <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <input
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="formal-input"
                  required
                />
                <div className="input-icon">
                  <Phone size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== ACADEMIC INFO ===== */}
        <div className="form-section">
          <h3 className="section-title">
            <Briefcase size={20} />
            Academic Information
          </h3>

          <div className="form-grid">
            <div className="input-group">
              <label>
                <span className="label-text">Department</span>
                <span className="required">*</span>
              </label>
              <div className="select-wrapper">
                     {/* 🔹 Department */}
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="formal-select"
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
                <div className="select-icon">
                  <Building size={18} />
                </div>
              </div>
            </div>

            <div className="input-group">
              <label>
                <span className="label-text">Designation</span>
                <span className="required">*</span>
              </label>
              <div className="select-wrapper">
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="formal-select"
                  required
                >
                  <option value="">Select Designation</option>
                  {designations.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <div className="select-icon">
                  <Award size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== PASSWORD ===== */}
        <div className="form-section">
          <h3 className="section-title">
            <Lock size={20} />
            Account Credentials
          </h3>

          <div className="password-section">
            <div className="password-header">
              <label>
                <span className="label-text">Temporary Password</span>
                <span className="required">*</span>
              </label>

              <button
                type="button"
                className="generate-btn"
                onClick={generatePassword}
              >
                <Key size={16} />
                Generate Password
              </button>
            </div>

            <div className="input-wrapper">
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="formal-input password-input"
                required
              />
              <div className="input-icon">
                <Lock size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* ===== ACTIONS ===== */}
        <div className="form-actions">
          <button
            type="submit"
            className="primary-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Processing...
              </>
            ) : (
              <>
                <Plus size={20} />
                Register Faculty Member
              </>
            )}
          </button>

          <button
            type="button"
            className="secondary-btn"
            onClick={() => dispatch(resetFacultyForm())}
          >
            Clear Form
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default AddFaculty;
