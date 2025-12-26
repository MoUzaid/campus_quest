import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Phone, Lock, GraduationCap, Calendar, Users, Hash, CheckCircle, BookOpen, Shield } from 'lucide-react';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    gender: '',
    email: '',
    mobileNumber: '',
    department: '',
    course: '',
    semester: '',
    group: '',
    password: '',
    confirmPassword: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const departments = [
    'Computer Science',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electronics & Communication',
    'Information Technology',
    'Chemical Engineering',
    'Bio-Technology'
  ];

  const courses = ['B.Tech', 'B.E.', 'M.Tech', 'B.Sc', 'M.Sc', 'BCA', 'MCA'];
  const semesters = Array.from({ length: 8 }, (_, i) => i + 1);
  const groups = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate specific fields
    if (name === 'password') {
      validatePassword(value);
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validatePassword = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'studentId':
        if (!/^\d{6,10}$/.test(value)) error = 'Student ID must be 6-10 digits';
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email format';
        break;
      case 'mobileNumber':
        if (!/^[0-9]{10}$/.test(value)) error = 'Mobile number must be 10 digits';
        break;
      case 'password':
        if (value.length < 8) error = 'Password must be at least 8 characters';
        break;
      case 'confirmPassword':
        if (value !== formData.password) error = 'Passwords do not match';
        break;
      default:
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isValid = Object.keys(formData).every(key => 
      formData[key] && validateField(key, formData[key])
    );
    
    if (!isValid) {
      alert('Please fill all fields correctly.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/students/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      alert("🎉 Signup successful! You can now login.");
      navigate("/student/login");
    } catch (err) {
      setLoading(false);
      console.error("Signup error:", err);
      alert("Server error. Please try again later.");
    }
  };

  const getStrengthColor = () => {
    switch(passwordStrength) {
      case 0: return '#ff4757';
      case 1: return '#ff4757';
      case 2: return '#ffa502';
      case 3: return '#2ed573';
      case 4: return '#1e90ff';
      default: return '#ff4757';
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-glass-container">
        {/* Decorative Elements */}
        <div className="decorative-shape shape-1"></div>
        <div className="decorative-shape shape-2"></div>
        <div className="decorative-shape shape-3"></div>
        
        <div className="signup-header">
          <div className="header-icon-container">
            <GraduationCap className="header-icon" />
            <div className="icon-glow"></div>
          </div>
          <h1 className="signup-title">
            Create Your <span className="highlight">Campus Quest</span> Account
          </h1>
          <p className="signup-subtitle">
            Join thousands of students exploring opportunities
          </p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-tabs">
            <div className="tab active">Personal Info</div>
            <div className="tab">Academic Info</div>
            <div className="tab">Security</div>
          </div>

          <div className="form-sections">
            {/* Personal Information Section */}
            <div className="form-section personal-info">
              <div className="section-header">
                <User className="section-icon" />
                <h3>Personal Information</h3>
              </div>
              
              <div className="form-grid">
                <div className="input-group">
                  <label className="input-label">
                    <Hash size={16} />
                    Student ID
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      name="studentId"
                      className={`styled-input ${errors.studentId ? 'error' : ''}`}
                      placeholder="Enter your student ID"
                      value={formData.studentId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    {!errors.studentId && formData.studentId && (
                      <CheckCircle className="valid-icon" size={18} />
                    )}
                  </div>
                  {errors.studentId && (
                    <span className="error-text">{errors.studentId}</span>
                  )}
                </div>

                <div className="input-group">
                  <label className="input-label">
                    <User size={16} />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="styled-input"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Gender</label>
                  <div className="radio-group">
                    {['Male', 'Female', 'Other'].map(gender => (
                      <label key={gender} className="radio-label">
                        <input
                          type="radio"
                          name="gender"
                          value={gender}
                          checked={formData.gender === gender}
                          onChange={handleChange}
                          className="radio-input"
                        />
                        <span className="radio-custom"></span>
                        {gender}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">
                    <Mail size={16} />
                    Email Address
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      name="email"
                      className={`styled-input ${errors.email ? 'error' : ''}`}
                      placeholder="student@university.edu"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    {!errors.email && formData.email && (
                      <CheckCircle className="valid-icon" size={18} />
                    )}
                  </div>
                  {errors.email && (
                    <span className="error-text">{errors.email}</span>
                  )}
                </div>

                <div className="input-group">
                  <label className="input-label">
                    <Phone size={16} />
                    Mobile Number
                  </label>
                  <div className="input-wrapper">
                    <span className="country-code">+91</span>
                    <input
                      type="tel"
                      name="mobileNumber"
                      className={`styled-input ${errors.mobileNumber ? 'error' : ''}`}
                      placeholder="Enter 10-digit number"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength="10"
                      required
                    />
                  </div>
                  {errors.mobileNumber && (
                    <span className="error-text">{errors.mobileNumber}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Academic Information Section */}
            <div className="form-section academic-info">
              <div className="section-header">
                <BookOpen className="section-icon" />
                <h3>Academic Information</h3>
              </div>
              
              <div className="form-grid">
                <div className="input-group">
                  <label className="input-label">Department</label>
                  <div className="select-wrapper">
                    <select
                      name="department"
                      className="styled-select"
                      value={formData.department}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                    <div className="select-arrow"></div>
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Course</label>
                  <div className="select-wrapper">
                    <select
                      name="course"
                      className="styled-select"
                      value={formData.course}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Course</option>
                      {courses.map(course => (
                        <option key={course} value={course}>{course}</option>
                      ))}
                    </select>
                    <div className="select-arrow"></div>
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">
                    <Calendar size={16} />
                    Semester
                  </label>
                  <div className="select-wrapper">
                    <select
                      name="semester"
                      className="styled-select"
                      value={formData.semester}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Semester</option>
                      {semesters.map(sem => (
                        <option key={sem} value={sem}>Semester {sem}</option>
                      ))}
                    </select>
                    <div className="select-arrow"></div>
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">
                    <Users size={16} />
                    Group
                  </label>
                  <div className="select-wrapper">
                    <select
                      name="group"
                      className="styled-select"
                      value={formData.group}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Group</option>
                      {groups.map(group => (
                        <option key={group} value={group}>{group}</option>
                      ))}
                    </select>
                    <div className="select-arrow"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="form-section security-info">
              <div className="section-header">
                <Shield className="section-icon" />
                <h3>Security</h3>
              </div>
              
              <div className="form-grid">
                <div className="input-group">
                  <label className="input-label">
                    <Lock size={16} />
                    Password
                  </label>
                  <div className="password-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className={`styled-input ${errors.password ? 'error' : ''}`}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {formData.password && (
                    <div className="password-strength">
                      <div className="strength-bar">
                        {[1, 2, 3, 4].map(level => (
                          <div
                            key={level}
                            className={`strength-segment ${passwordStrength >= level ? 'active' : ''}`}
                            style={passwordStrength >= level ? { backgroundColor: getStrengthColor() } : {}}
                          ></div>
                        ))}
                      </div>
                      <span className="strength-text">
                        {passwordStrength === 0 && 'Very Weak'}
                        {passwordStrength === 1 && 'Weak'}
                        {passwordStrength === 2 && 'Fair'}
                        {passwordStrength === 3 && 'Good'}
                        {passwordStrength === 4 && 'Strong'}
                      </span>
                    </div>
                  )}
                  {errors.password && (
                    <span className="error-text">{errors.password}</span>
                  )}
                </div>

                <div className="input-group">
                  <label className="input-label">
                    <Lock size={16} />
                    Confirm Password
                  </label>
                  <div className="password-wrapper">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      className={`styled-input ${errors.confirmPassword ? 'error' : ''}`}
                      placeholder="Re-enter your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <span className="error-text">{errors.confirmPassword}</span>
                  )}
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <div className="match-indicator">
                      <CheckCircle size={16} />
                      <span>Passwords match</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="password-requirements">
                <p className="requirements-title">Password must contain:</p>
                <ul className="requirements-list">
                  <li className={formData.password.length >= 8 ? 'met' : ''}>
                    <CheckCircle size={14} />
                    At least 8 characters
                  </li>
                  <li className={/[A-Z]/.test(formData.password) ? 'met' : ''}>
                    <CheckCircle size={14} />
                    One uppercase letter
                  </li>
                  <li className={/[0-9]/.test(formData.password) ? 'met' : ''}>
                    <CheckCircle size={14} />
                    One number
                  </li>
                  <li className={/[^A-Za-z0-9]/.test(formData.password) ? 'met' : ''}>
                    <CheckCircle size={14} />
                    One special character
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  <GraduationCap size={20} />
                  Create Campus Quest Account
                </>
              )}
            </button>
            
            <div className="terms-agreement">
              <input
                type="checkbox"
                id="terms"
                className="terms-checkbox"
                required
              />
              <label htmlFor="terms">
                I agree to the <a href="/terms" className="terms-link">Terms of Service</a> and{' '}
                <a href="/privacy" className="terms-link">Privacy Policy</a>
              </label>
            </div>
          </div>
        </form>

        <div className="signup-footer">
          <p className="footer-text">
            Already have an account?
            <Link to="/student/login" className="login-link">
              Sign In Here
            </Link>
          </p>
          <div className="footer-note">
            <Shield size={14} />
            <span>Your data is securely encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;