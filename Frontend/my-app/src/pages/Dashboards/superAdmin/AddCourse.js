import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Form, 
  Button, 
  Alert, 
  Spinner,
  InputGroup,
  Badge,
  ProgressBar
} from "react-bootstrap";
import axios from "axios";
import { 
  PlusCircle, 
  ArrowLeft, 
  CheckCircle,
  Building,
  Calendar,
  People,
  Book,
  Award,
  
  Layers
} from "react-bootstrap-icons";
import "./AddCourse.css";

const API = "http://localhost:5000/api/course/add";

// Departments data
const DEPARTMENTS = [
  { code: "CS", name: "Computer Science", color: "#0d6efd" },
  { code: "IT", name: "Information Technology", color: "#6610f2" },
  { code: "CA", name: "Computer Application", color: "#20c997" },
  { code: "EE", name: "Electrical Engineering", color: "#fd7e14" },
  { code: "ME", name: "Mechanical Engineering", color: "#dc3545" },
  { code: "CE", name: "Civil Engineering", color: "#6f42c1" },
  { code: "EC", name: "Electronics & Communication", color: "#198754" },
  { code: "MBA", name: "Master of Business Administration", color: "#0dcaf0" },
  { code: "BBA", name: "Bachelor of Business Administration", color: "#6c757d" },
  { code: "BCA", name: "Bachelor of Computer Applications", color: "#ffc107" }
];

// Available groups A-Z
const GROUPS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

// Common courses
const COMMON_COURSES = [
  "BCA", "MCA", "B.Tech", "M.Tech", "B.Sc", "M.Sc", 
  "BBA", "MBA", "BE", "ME", "B.Com", "M.Com", "BA", "MA"
];

const AddCourse = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    department: "",
    courseName: "",
    year: "",
    groups: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [step, setStep] = useState(1);
  const [departmentSearch, setDepartmentSearch] = useState("");
  const [courseSearch, setCourseSearch] = useState("");

  // Filter departments based on search
  const filteredDepartments = DEPARTMENTS.filter(dept =>
    dept.name.toLowerCase().includes(departmentSearch.toLowerCase()) ||
    dept.code.toLowerCase().includes(departmentSearch.toLowerCase())
  );

  // Filter courses based on search
  const filteredCourses = COMMON_COURSES.filter(course =>
    course.toLowerCase().includes(courseSearch.toLowerCase())
  );

  const handleDepartmentSelect = (deptName, deptCode) => {
    setFormData(prev => ({
      ...prev,
      department: deptName,
      departmentCode: deptCode
    }));
    setStep(2);
  };

  const handleCourseSelect = (course) => {
    setFormData(prev => ({
      ...prev,
      courseName: course
    }));
    setStep(3);
  };

  const toggleGroup = (group) => {
    setFormData(prev => {
      const groups = [...prev.groups];
      if (groups.includes(group)) {
        return { ...prev, groups: groups.filter(g => g !== group) };
      } else {
        return { ...prev, groups: [...groups, group] };
      }
    });
  };

  const handleYearSelect = (year) => {
    setFormData(prev => ({
      ...prev,
      year: year
    }));
    setStep(4);
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.department) errors.department = "Please select a department";
    if (!formData.courseName.trim()) errors.courseName = "Please enter course name";
    if (!formData.year) errors.year = "Please select academic year";
    if (formData.groups.length === 0) errors.groups = "Please select at least one group";
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setError("Please complete all required fields");
      return;
    }

    // Prepare data for backend
    const newCourse = {
      courseName: formData.courseName.trim().toUpperCase(),
      department: formData.departmentCode || 
        DEPARTMENTS.find(d => d.name === formData.department)?.code || 
        formData.department.split(" ").map(w => w[0]).join("").toUpperCase(),
      year: parseInt(formData.year),
      groups: formData.groups.map(g => g.toUpperCase())
    };

    try {
      setLoading(true);
      const res = await axios.post(API, newCourse, { withCredentials: true });
      setSuccess(res.data.message || "Course created successfully!");
      
      // Reset after success
      setTimeout(() => {
        setFormData({
          department: "",
          courseName: "",
          year: "",
          groups: []
        });
        setStep(1);
      }, 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error;
      setError(errorMsg || "Failed to create course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const progress = (step / 4) * 100;
  const errors = validateForm();

  return (
    <Container fluid className="add-course-page p-0">
      {/* Modern Header */}
      <div className="page-header">
        <div className="header-overlay">
          <Container>
            <Row className="align-items-center py-4">
              <Col xs="auto">
                <Button 
                  variant="light" 
                  onClick={() => navigate("/superadmin/courses")}
                  className="rounded-circle back-btn p-2 shadow-sm"
                >
                  <ArrowLeft size={20} />
                </Button>
              </Col>
              <Col>
                <div className="d-flex align-items-center">
                  <div className="header-icon me-3">
                    {/* <University size={40} className="text-white" /> */}
                  </div>
                  <div>
                    <h1 className="text-white mb-0">
                      <span className="fw-light">Add Course</span>
                      <span className="fw-bold ms-2">CampusQuest</span>
                    </h1>
                    <p className="text-white-50 mb-0">
                      Expand academic offerings with new courses
                    </p>
                  </div>
                </div>
              </Col>
              <Col xs="auto">
                <Badge bg="light" text="dark" className="px-3 py-2">
                  <PlusCircle className="me-2" />
                  New Course
                </Badge>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      {/* Progress Bar */}
      <Container className="mt-4">
        <div className="progress-container mb-4">
          <div className="d-flex justify-content-between mb-2">
            {["Department", "Course", "Groups", "Year"].map((label, index) => (
              <div key={index} className="text-center">
                <div className={`step-circle ${step > index + 1 ? "completed" : step === index + 1 ? "active" : ""}`}>
                  {index + 1}
                </div>
                <small className={`step-label ${step >= index + 1 ? "text-primary fw-bold" : "text-muted"}`}>
                  {label}
                </small>
              </div>
            ))}
          </div>
          <ProgressBar now={progress} className="custom-progress" />
        </div>
      </Container>

      <Container className="mt-4">
        {/* Alerts */}
        <Row className="mb-4">
          <Col lg={8} className="mx-auto">
            {error && (
              <Alert 
                variant="danger" 
                dismissible 
                onClose={() => setError("")}
                className="border-0 shadow-sm alert-modern"
              >
                <div className="d-flex align-items-center">
                  <div className="alert-icon bg-danger me-3">
                    <Layers className="text-white" />
                  </div>
                  <div>
                    <Alert.Heading className="h6 mb-1">Validation Error</Alert.Heading>
                    <p className="mb-0">{error}</p>
                  </div>
                </div>
              </Alert>
            )}
            
            {success && (
              <Alert 
                variant="success" 
                dismissible 
                onClose={() => setSuccess("")}
                className="border-0 shadow-sm alert-modern"
              >
                <div className="d-flex align-items-center">
                  <div className="alert-icon bg-success me-3">
                    <CheckCircle className="text-white" />
                  </div>
                  <div>
                    <Alert.Heading className="h6 mb-1">Success!</Alert.Heading>
                    <p className="mb-0">{success}</p>
                  </div>
                </div>
              </Alert>
            )}
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col xl={10}>
            <Card className="border-0 shadow-lg form-card">
              <Card.Body className="p-4">
                <Form onSubmit={handleSubmit}>
                  {/* Step 1: Department Selection */}
                  <div className={`step-content ${step === 1 ? "active" : ""}`}>
                    <div className="step-header mb-4">
                      <div className="step-icon">
                        <Building size={24} />
                      </div>
                      <div>
                        <h4 className="mb-1">Select Department</h4>
                        <p className="text-muted mb-0">Choose the department offering this course</p>
                      </div>
                    </div>

                    <Form.Group className="mb-4">
                      <InputGroup className="search-box">
                        <InputGroup.Text className="bg-light border-end-0">
                          <Building />
                        </InputGroup.Text>
                        <Form.Control
                          placeholder="Search department (e.g., Computer Application)"
                          value={departmentSearch}
                          onChange={(e) => setDepartmentSearch(e.target.value)}
                          className="border-start-0"
                        />
                      </InputGroup>
                    </Form.Group>

                    <div className="departments-grid">
                      {filteredDepartments.map((dept, index) => (
                        <div 
                          key={index}
                          className={`department-card ${formData.department === dept.name ? "selected" : ""}`}
                          onClick={() => handleDepartmentSelect(dept.name, dept.code)}
                          style={{ borderLeftColor: dept.color }}
                        >
                          <div className="department-icon" style={{ backgroundColor: dept.color }}>
                            <Building className="text-white" />
                          </div>
                          <div className="department-info">
                            <h6 className="mb-0">{dept.name}</h6>
                            <small className="text-muted">Code: {dept.code}</small>
                          </div>
                          {formData.department === dept.name && (
                            <div className="selected-indicator">
                              <CheckCircle className="text-success" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {formData.department && (
                      <div className="selected-preview mt-4 p-3 bg-light rounded">
                        <div className="d-flex align-items-center">
                          <Badge bg="primary" className="me-2 px-3 py-2">
                            Selected Department
                          </Badge>
                          <span className="fw-bold">{formData.department}</span>
                          <small className="text-muted ms-2">
                            (Will be stored as: {formData.departmentCode || 
                              DEPARTMENTS.find(d => d.name === formData.department)?.code})
                          </small>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Step 2: Course Selection */}
                  <div className={`step-content ${step === 2 ? "active" : ""}`}>
                    <div className="step-header mb-4">
                      <div className="step-icon">
                        <Book size={24} />
                      </div>
                      <div>
                        <h4 className="mb-1">Course Details</h4>
                        <p className="text-muted mb-0">Enter course name or select from common courses</p>
                      </div>
                    </div>

                    <Form.Group className="mb-4">
                      <InputGroup className="search-box">
                        <InputGroup.Text className="bg-light border-end-0">
                          <Book />
                        </InputGroup.Text>
                        <Form.Control
                          placeholder="Type course name or search..."
                          value={courseSearch}
                          onChange={(e) => setCourseSearch(e.target.value)}
                          className="border-start-0"
                        />
                      </InputGroup>
                    </Form.Group>

                    <div className="courses-grid mb-4">
                      {filteredCourses.map((course, index) => (
                        <Button
                          key={index}
                          variant={formData.courseName === course ? "primary" : "outline-primary"}
                          onClick={() => handleCourseSelect(course)}
                          className="course-btn"
                        >
                          {course}
                        </Button>
                      ))}
                    </div>

                    <Form.Group>
                      <Form.Label className="fw-semibold">Or Enter Custom Course Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="e.g., Bachelor of Computer Applications"
                        value={formData.courseName}
                        onChange={(e) => setFormData(prev => ({ ...prev, courseName: e.target.value }))}
                        className="form-control-lg"
                      />
                    </Form.Group>

                    {formData.courseName && (
                      <div className="selected-preview mt-4 p-3 bg-light rounded">
                        <div className="d-flex align-items-center">
                          <Badge bg="success" className="me-2 px-3 py-2">
                            Course Preview
                          </Badge>
                          <span className="fw-bold">{formData.courseName.toUpperCase()}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Step 3: Groups Selection */}
                  <div className={`step-content ${step === 3 ? "active" : ""}`}>
                    <div className="step-header mb-4">
                      <div className="step-icon">
                        <People size={24} />
                      </div>
                      <div>
                        <h4 className="mb-1">Student Groups</h4>
                        <p className="text-muted mb-0">Select groups for this course (Required)</p>
                      </div>
                    </div>

                    <div className="groups-container mb-4">
                      <div className="groups-grid">
                        {GROUPS.map((group) => (
                          <div
                            key={group}
                            className={`group-item ${formData.groups.includes(group) ? "selected" : ""}`}
                            onClick={() => toggleGroup(group)}
                          >
                            <div className="group-letter">{group}</div>
                            <small className="text-muted">Group {group}</small>
                          </div>
                        ))}
                      </div>
                    </div>

                    {formData.groups.length > 0 && (
                      <div className="selected-groups-preview">
                        <h6 className="mb-2">Selected Groups:</h6>
                        <div className="d-flex flex-wrap gap-2">
                          {formData.groups.map((group) => (
                            <Badge 
                              key={group} 
                              bg="info" 
                              className="px-3 py-2 group-badge"
                              onClick={() => toggleGroup(group)}
                              style={{ cursor: 'pointer' }}
                            >
                              {group} ✕
                            </Badge>
                          ))}
                        </div>
                        <small className="text-muted mt-2 d-block">
                          {formData.groups.length} group{formData.groups.length !== 1 ? 's' : ''} selected
                        </small>
                      </div>
                    )}
                  </div>

                  {/* Step 4: Year Selection */}
                  <div className={`step-content ${step === 4 ? "active" : ""}`}>
                    <div className="step-header mb-4">
                      <div className="step-icon">
                        <Calendar size={24} />
                      </div>
                      <div>
                        <h4 className="mb-1">Academic Year</h4>
                        <p className="text-muted mb-0">Select which year students this course is for</p>
                      </div>
                    </div>

                    <div className="years-container">
                      <div className="years-grid">
                        {[1, 2, 3, 4, 5].map((year) => (
                          <div
                            key={year}
                            className={`year-card ${formData.year === year.toString() ? "selected" : ""}`}
                            onClick={() => handleYearSelect(year.toString())}
                          >
                            <div className="year-number">{year}</div>
                            <div className="year-label">Year {year}</div>
                            <small className="text-muted">
                              {year === 1 ? "First Year" : 
                               year === 2 ? "Second Year" : 
                               year === 3 ? "Third Year" : 
                               year === 4 ? "Fourth Year" : "Fifth Year"}
                            </small>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Form.Group className="mt-4">
                      <Form.Label className="fw-semibold">Or Enter Year</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter year (1-5)"
                        value={formData.year}
                        onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                        min="1"
                        max="5"
                        className="form-control-lg"
                      />
                    </Form.Group>

                    {formData.year && (
                      <div className="selected-preview mt-4 p-3 bg-primary bg-opacity-10 rounded border border-primary">
                        <div className="d-flex align-items-center">
                          <Award className="text-primary me-2" />
                          <span className="fw-bold">Course will be added for Year {formData.year} students</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="form-actions mt-5 pt-4 border-top">
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="outline-secondary"
                        onClick={() => setStep(step - 1)}
                        disabled={step === 1 || loading}
                        className="px-4 py-2"
                      >
                        <ArrowLeft className="me-2" />
                        Back
                      </Button>
                      
                      {step < 4 ? (
                        <Button
                          variant="primary"
                          onClick={() => setStep(step + 1)}
                          className="px-4 py-2"
                        >
                          Continue
                          <ArrowLeft className="ms-2" style={{ transform: 'rotate(180deg)' }} />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          variant="success"
                          disabled={loading || Object.keys(errors).length > 0}
                          className="px-4 py-2"
                        >
                          {loading ? (
                            <>
                              <Spinner animation="border" size="sm" className="me-2" />
                              Creating Course...
                            </>
                          ) : (
                            <>
                              <PlusCircle className="me-2" />
                              Create Course
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Course Summary Preview */}
        {(formData.department || formData.courseName || formData.year || formData.groups.length > 0) && (
          <Row className="mt-4">
            <Col xl={10}>
              <Card className="border-0 shadow-sm preview-card">
                <Card.Body className="p-3">
                  <h6 className="mb-3">
                    <Award className="me-2 text-primary" />
                    Course Summary Preview
                  </h6>
                  <div className="d-flex flex-wrap align-items-center gap-3">
                    {formData.department && (
                      <div className="preview-item">
                        <small className="text-muted d-block">Department</small>
                        <Badge bg="primary" className="px-3 py-2">
                          {formData.department}
                        </Badge>
                      </div>
                    )}
                    
                    {formData.courseName && (
                      <div className="preview-item">
                        <small className="text-muted d-block">Course</small>
                        <Badge bg="success" className="px-3 py-2">
                          {formData.courseName.toUpperCase()}
                        </Badge>
                      </div>
                    )}
                    
                    {formData.year && (
                      <div className="preview-item">
                        <small className="text-muted d-block">Academic Year</small>
                        <Badge bg="warning" className="px-3 py-2">
                          Year {formData.year}
                        </Badge>
                      </div>
                    )}
                    
                    {formData.groups.length > 0 && (
                      <div className="preview-item">
                        <small className="text-muted d-block">Groups ({formData.groups.length})</small>
                        <div className="d-flex gap-1">
                          {formData.groups.map((group, index) => (
                            <Badge key={index} bg="info" className="px-2 py-1">
                              {group}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </Container>
  );
};

export default AddCourse;