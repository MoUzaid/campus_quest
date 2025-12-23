import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Signup = () => {
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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        console.log('Signup Data:', formData);
        // Add API call logic here
    };

    return (
        <div className="auth-page">
            <div className="auth-container" style={{ maxWidth: '800px' }}>
                <h2 className="auth-title">Student Registration</h2>
                <p className="auth-subtitle">Join the Campus Quest community</p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="signup-grid">
                        <div className="form-group">
                            <label htmlFor="studentId">Student ID</label>
                            <input
                                type="text"
                                id="studentId"
                                name="studentId"
                                className="auth-input"
                                placeholder="ex. 123456"
                                value={formData.studentId}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="auth-input"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="auth-input"
                                placeholder="student@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="mobileNumber">Mobile Number</label>
                            <input
                                type="tel"
                                id="mobileNumber"
                                name="mobileNumber"
                                className="auth-input"
                                placeholder="10-digit number"
                                pattern="[0-9]{10}"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="gender">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                className="auth-select"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="department">Department</label>
                            <input
                                type="text"
                                id="department"
                                name="department"
                                className="auth-input"
                                placeholder="ex. Computer Science"
                                value={formData.department}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="course">Course</label>
                            <input
                                type="text"
                                id="course"
                                name="course"
                                className="auth-input"
                                placeholder="ex. B.Tech"
                                value={formData.course}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="semester">Semester</label>
                            <input
                                type="number"
                                id="semester"
                                name="semester"
                                className="auth-input"
                                placeholder="Current Semester"
                                value={formData.semester}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="group">Group</label>
                            <input
                                type="text"
                                id="group"
                                name="group"
                                className="auth-input"
                                placeholder="ex. A1"
                                value={formData.group}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group" style={{ visibility: 'hidden' }}>
                            {/* Spacer or extra field could go here */}
                        </div>
                    </div>

                    <div className="signup-grid">
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="auth-input"
                                placeholder="Create Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className="auth-input"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="auth-button">Sign Up</button>
                </form>

                <div className="auth-footer">
                    Already have an account?
                    <Link to="/student/login" className="auth-link">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
