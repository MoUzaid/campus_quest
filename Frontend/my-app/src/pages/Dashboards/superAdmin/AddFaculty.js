



import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Building,
  Award,
  Key,
  Plus,
  Shield,
  GraduationCap,
  Lock,
  Briefcase
} from "lucide-react";
import "./AddFaculty.css";

const AddFaculty = () => {
  const [formData, setFormData] = useState({
    facultyId: "",
    name: "",
    email: "",
    mobileNumber: "",
    department: "",
    designation: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Academic departments and designations
  const departments = [
    "Computer Science & Engineering",
    "Information Technology",
    "Electronics & Communication Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Business Administration",
    "Mathematics",
    "Physics",
    "Chemistry",
    "English & Literature",
    "History",
    "Economics",
    "Psychology"
  ];

  const designations = [
    "Professor",
    "Associate Professor",
    "Assistant Professor",
    "Senior Lecturer",
    "Lecturer",
    "Visiting Faculty",
    "Adjunct Professor",
    "Research Professor",
    "Emeritus Professor"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "mobileNumber") {
      const numbers = value.replace(/\D/g, '');
      setFormData({
        ...formData,
        [name]: numbers.slice(0, 10)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("http://localhost:5000/api/faculty/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.msg || "Failed to add faculty member" });
        return;
      }

      setMessage({ 
        type: "success", 
        text: "✓ Faculty member has been successfully added to the system." 
      });
      
      // Reset form
      setTimeout(() => {
        setFormData({
          facultyId: "",
          name: "",
          email: "",
          mobileNumber: "",
          department: "",
          designation: "",
          password: ""
        });
      }, 100);

    } catch (error) {
      console.error("Add faculty error:", error);
      setMessage({ 
        type: "error", 
        text: "✗ Server connection error. Please check your network and try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  // Generate academic-style password
  const generatePassword = () => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const password = `CQ${year}@${randomNum}`;
    setFormData({
      ...formData,
      password: password
    });
  };

  return (
    <motion.div 
      className="add-faculty-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header Section */}
      <div className="form-header">
        <div className="header-content">
          <div className="header-title">
            <div className="title-icon">
              <GraduationCap size={28} />
            </div>
            <div>
              <h1>Add New Faculty</h1>
              <p className="subtitle">Faculty Registration Portal | Campus Quest</p>
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

      {/* Status Message */}
      {message.text && (
        <motion.div 
          className={`status-message ${message.type}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="message-content">
            <div className="message-icon">
              {message.type === "success" ? "✓" : "✗"}
            </div>
            <span>{message.text}</span>
          </div>
        </motion.div>
      )}

      {/* Form Section */}
      <motion.form 
        onSubmit={handleSubmit} 
        className="add-faculty-form"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="form-section">
          <h3 className="section-title">
            <User size={20} />
            Personal Information
          </h3>
          <div className="form-grid">
            {/* Faculty ID */}
            <div className="input-group">
              <label htmlFor="facultyId">
                <span className="label-text">Faculty ID</span>
                <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <input
                  id="facultyId"
                  type="text"
                  name="facultyId"
                  placeholder="FAC2024001"
                  value={formData.facultyId}
                  onChange={handleChange}
                  required
                  className="formal-input"
                />
                <div className="input-icon">
                  <User size={18} />
                </div>
              </div>
              <div className="input-hint">Unique faculty identification number</div>
            </div>

            {/* Full Name */}
            <div className="input-group">
              <label htmlFor="name">
                <span className="label-text">Full Name</span>
                <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Dr. John A. Smith"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="formal-input"
                />
                <div className="input-icon">
                  <User size={18} />
                </div>
              </div>
              <div className="input-hint">Complete name with academic title</div>
            </div>

            {/* Email */}
            <div className="input-group">
              <label htmlFor="email">
                <span className="label-text">Email Address</span>
                <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="john.smith@university.edu"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="formal-input"
                />
                <div className="input-icon">
                  <Mail size={18} />
                </div>
              </div>
              <div className="input-hint">Official institutional email address</div>
            </div>

            {/* Mobile Number */}
            <div className="input-group">
              <label htmlFor="mobileNumber">
                <span className="label-text">Mobile Number</span>
                <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <input
                  id="mobileNumber"
                  type="tel"
                  name="mobileNumber"
                  placeholder="+91 9876543210"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                  className="formal-input"
                  maxLength="10"
                />
                <div className="input-icon">
                  <Phone size={18} />
                </div>
              </div>
              <div className="input-hint">10-digit mobile number for contact</div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">
            <Briefcase size={20} />
            Academic Information
          </h3>
          <div className="form-grid">
            {/* Department */}
            <div className="input-group">
              <label htmlFor="department">
                <span className="label-text">Department</span>
                <span className="required">*</span>
              </label>
              <div className="select-wrapper">
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="formal-select"
                >
                  <option value="">Select Academic Department</option>
                  {departments.map((dept, index) => (
                    <option key={index} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                <div className="select-icon">
                  <Building size={18} />
                </div>
              </div>
              <div className="input-hint">Primary academic department</div>
            </div>

            {/* Designation */}
            <div className="input-group">
              <label htmlFor="designation">
                <span className="label-text">Designation</span>
                <span className="required">*</span>
              </label>
              <div className="select-wrapper">
                <select
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                  className="formal-select"
                >
                  <option value="">Select Academic Position</option>
                  {designations.map((desig, index) => (
                    <option key={index} value={desig}>
                      {desig}
                    </option>
                  ))}
                </select>
                <div className="select-icon">
                  <Award size={18} />
                </div>
              </div>
              <div className="input-hint">Academic rank/position</div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">
            <Lock size={20} />
            Account Credentials
          </h3>
          <div className="password-section">
            <div className="input-group">
              <div className="password-header">
                <label htmlFor="password">
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
                  id="password"
                  type="text"
                  name="password"
                  placeholder="Enter or generate temporary password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="formal-input password-input"
                />
                <div className="input-icon">
                  <Lock size={18} />
                </div>
              </div>
              <div className="input-hint">
                Password for initial login. Faculty will be prompted to change upon first access.
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <motion.button 
            type="submit" 
            className="submit-btn primary-btn"
            disabled={loading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {loading ? (
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
          </motion.button>
          
          <button 
            type="button" 
            className="clear-btn secondary-btn"
            onClick={() => setFormData({
              facultyId: "",
              name: "",
              email: "",
              mobileNumber: "",
              department: "",
              designation: "",
              password: ""
            })}
          >
            Clear Form
          </button>
        </div>

        {/* Terms & Information */}
        <div className="terms-section">
          <div className="terms-content">
            <h4>Important Information</h4>
            <ul>
              <li>Faculty credentials will be sent to the provided email address</li>
              <li>Initial password must be changed on first login</li>
              <li>System access will be activated immediately upon registration</li>
              <li>All data is processed in compliance with institutional policies</li>
            </ul>
          </div>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default AddFaculty;