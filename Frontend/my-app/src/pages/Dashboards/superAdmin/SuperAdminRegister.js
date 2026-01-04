import React, { useState } from "react";
import { 
  FaEye, 
  FaEyeSlash, 
  FaLock, 
  FaUserTie, 
  FaIdCard, 
  FaEnvelope, 
  FaBuilding, 
  FaShieldAlt,
  FaKey,
  FaUniversity
} from "react-icons/fa";
import "./SuperAdminRegister.css";
const departments = [
  { code: "CA", name: "Computer Applications" },
  { code: "CS", name: "Computer Science" },
  { code: "CSE", name: "Computer Science & Engineering" },
  { code: "IT", name: "Information Technology" },
  { code: "AI", name: "Artificial Intelligence" },
  { code: "DS", name: "Data Science" },

  { code: "ME", name: "Mechanical Engineering" },
  { code: "CE", name: "Civil Engineering" },
  { code: "EE", name: "Electrical Engineering" },
  { code: "ECE", name: "Electronics & Communication Engineering" },

  { code: "BBA", name: "Business Administration" },
  { code: "MBA", name: "Master of Business Administration" },
  { code: "BCom", name: "Commerce" },

  { code: "MATH", name: "Mathematics" },
  { code: "PHY", name: "Physics" },
  { code: "CHEM", name: "Chemistry" },
  { code: "BIO", name: "Biology" },

  { code: "ECO", name: "Economics" },
  { code: "ENG", name: "English" },
  { code: "LAW", name: "Law" }
];


const SuperAdminRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    facultyId: "",
    email: "",
    designation: "Head of Department",
    department: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { username, facultyId, email, designation, department, password } = formData;
    const errors = [];

    if (!username.trim()) errors.push("Full name is required");
    if (!facultyId.match(/^[A-Z]{2,3}\d{4,6}$/)) {
      errors.push("Faculty ID should follow pattern: ABC12345");
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.push("Valid email is required");
    }
    if (password.length < 6) {
      errors.push("Password must be at least 6 characters");
    }
    if (!department) errors.push("Please select a department");

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:5000/api/superadmin/register", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        },
        body: JSON.stringify({
          ...formData,
          registeredAt: new Date().toISOString()
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Registration failed");
      }

      alert("✅ " + data.msg);
      // Reset form on successful submission
      setFormData({
        username: "",
        facultyId: "",
        email: "",
        designation: "Head of Department",
        department: "",
        password: ""
      });
    } catch (error) {
      alert(`❌ Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="superadmin-register-container">
      {/* Header with Badge */}
      <div className="header-badge">
        <div className="badge-icon">
          <FaShieldAlt />
        </div>
        <span className="badge-text">Super Admin Portal</span>
      </div>

     <div className="register-card-wrapper">
  <div className="form-panel">
    <div className="form-header">
      <div className="form-header-main">
        <FaUserTie className="header-icon" style={{fontSize: '44px'}} />
        <div>
          <h2>Super Admin Registration</h2>
         
        </div>
      </div>
      
      <div className="form-logo">
        <img 
          src="/campus-quest.png" 
          alt="Campus Quest" 
          className="app-logo"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%231a237e'/%3E%3Ctext x='50' y='60' font-family='Arial' font-size='24' fill='white' text-anchor='middle'%3ECQ%3C/text%3E%3C/svg%3E";
          }}
        />
        <span className="logo-text">Campus Quest</span>
      </div>
    </div>
    {/* Rest of your form remains exactly the same */}
          <form onSubmit={handleSubmit} className="registration-form">
            {/* Form Grid - Two Columns */}
            <div className="form-row">
              {/* Full Name */}
              <div className="form-column">
                <div className="form-group">
                  <label className="form-label">
                    <FaUserTie className="label-icon" />
                    Full Name
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      name="username"
                      required
                      placeholder="Dr. John Smith"
                      value={formData.username}
                      onChange={handleChange}
                      className="form-input"
                    />
                    <span className="input-note">Enter official full name</span>
                  </div>
                </div>
              </div>

              {/* Faculty ID */}
              <div className="form-column">
                <div className="form-group">
                  <label className="form-label">
                    <FaIdCard className="label-icon" />
                    Faculty ID
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      name="facultyId"
                      required
                      placeholder="CS2024001"
                      value={formData.facultyId}
                      onChange={handleChange}
                      className="form-input"
                      pattern="[A-Z]{2,3}\d{4,6}"
                      title="Format: ABC12345"
                    />
                    <span className="input-note">Format: ABC12345</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row */}
            <div className="form-row">
              {/* Email */}
              <div className="form-column">
                <div className="form-group">
                  <label className="form-label">
                    <FaEnvelope className="label-icon" />
                    Email Address
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="john.smith@university.edu"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                    />
                    <span className="input-note">Official university email</span>
                  </div>
                </div>
              </div>

              {/* Designation */}
              <div className="form-column">
                <div className="form-group">
                  <label className="form-label">
                    <FaUserTie className="label-icon" />
                    Designation
                    <span className="badge-tag">Default: HOD</span>
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      name="designation"
                      required
                      placeholder="Head of Department"
                      value={formData.designation}
                      onChange={handleChange}
                      className="form-input"
                    />
                    <button
                      type="button"
                      className="reset-btn"
                      onClick={() => setFormData({...formData, designation: "Head of Department"})}
                    >
                      Reset to Default
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Single Column Row for Department */}
            <div className="form-row">
              <div className="form-full-column">
                <div className="form-group">
                  <label className="form-label">
                    <FaBuilding className="label-icon" />
                    Department
                  </label>
                  <div className="custom-select-wrapper">
                    <select
                      name="department"
                      required
                      value={formData.department}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="" disabled>
                        Select Department
                      </option>
                      {departments.map((dept) => (
                        <option key={dept.code} value={dept.code}>
                          {dept.icon} {dept.code} – {dept.name}
                        </option>
                      ))}
                    </select>
                    <div className="select-arrow">▼</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Password Row */}
            <div className="form-row">
              <div className="form-full-column">
                <div className="form-group">
                  <label className="form-label">
                    <FaLock className="label-icon" />
                    Temporary Password
                    <span className="temp-tag">
                      <FaKey /> Temporary
                    </span>
                  </label>
                  <div className="password-container">
                    <div className="password-input-wrapper">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        required
                        placeholder="Enter temporary password"
                        value={formData.password}
                        onChange={handleChange}
                        className="password-input"
                        minLength="6"
                      />
                      <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                        <span>{showPassword ? "Hide" : "Show"}</span>
                      </button>
                    </div>
                    <div className="password-hint">
                      Enter a secure password (minimum 6 characters). Super Admin must change it on first login.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="security-alert">
              <FaShieldAlt className="alert-icon" />
              <div className="alert-content">
                <h4>Security Notice</h4>
                <p>
                  This password is temporary. Super Admin must change it on first login.
                  All credentials are encrypted and stored securely.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="submit-spinner"></span>
                  Processing Registration...
                </>
              ) : (
                <>
                  <FaShieldAlt className="button-icon" />
                  Register Super Admin
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="form-footer">
            <div className="security-indicator">
              <FaLock className="footer-icon" />
              <span>HTTPS Secure Connection • Encrypted Transmission</span>
            </div>
            <p className="copyright">
              © {new Date().getFullYear()} Campus Quest • Authorized Personnel Only
            </p>
          </div>
        </div>

        {/* Right Panel - Branding (EXACTLY AS BEFORE - PERFECT) */}
        <div className="brand-panel">
          <div className="brand-header">
            <div className="logo-container">
              <div className="logo-badge">
                <FaUniversity className="logo-icon" />
                <span className="logo-text">Campus Quest</span>
              </div>
              <div className="security-badge">
                <FaShieldAlt className="security-icon" />
                <span>Secured</span>
              </div>
            </div>
            <h1 className="brand-title">
              Campus Quest
              <span className="brand-subtitle">Academic Management System</span>
            </h1>
          </div>

          <div className="feature-list">
            <div className="feature-item">
              <FaShieldAlt className="feature-icon" />
              <div>
                <h4>Enhanced Security</h4>
                <p>End-to-end encrypted registration</p>
              </div>
            </div>
            <div className="feature-item">
              <FaUserTie className="feature-icon" />
              <div>
                <h4>Role-Based Access</h4>
                <p>Super Admin privileges & controls</p>
              </div>
            </div>
            <div className="feature-item">
              <FaLock className="feature-icon" />
              <div>
                <h4>Secure Authentication</h4>
                <p>Multi-factor ready system</p>
              </div>
            </div>
          </div>

          <div className="watermark">
            <FaUniversity />
            <span>Campus Quest v2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminRegister;