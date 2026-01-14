// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Form,
//   Button,
//   Alert,
//   Spinner,
//   InputGroup,
//   Badge,
//   ProgressBar
// } from "react-bootstrap";
// import {
//   PlusCircle,
//   ArrowLeft,
//   CheckCircle,
//   Building,
//   Calendar,
//   People,
//   Book,
//   Award
// } from "react-bootstrap-icons";

// import { useCreateCourseMutation } from "../../../redux/services/coursesApi";
// import { useGetAllDepartmentsQuery } from "../../../redux/services/departmentApi";

// import "./AddCourse.css";

// /* ================= CONSTANTS ================= */

// const GROUPS = Array.from({ length: 26 }, (_, i) =>
//   String.fromCharCode(65 + i)
// );

// const COMMON_COURSES = [
//   "BCA", "MCA", "B.Tech", "M.Tech", "B.Sc", "M.Sc",
//   "BBA", "MBA", "BE", "ME", "B.Com", "M.Com", "BA", "MA"
// ];

// /* ================= COMPONENT ================= */

// const AddCourse = () => {
//   const navigate = useNavigate();

//   /* ===== API HOOKS ===== */
//   const [createCourse, { isLoading }] = useCreateCourseMutation();
//   const { data: departments, isLoading: departmentsLoading } =
//     useGetAllDepartmentsQuery();

//   /* ===== DERIVED DATA ===== */
//   const departmentList =
//     departments?.data?.[0]?.departmentNames || [];

//   /* ===== LOCAL STATE ===== */
//   const [formData, setFormData] = useState({
//     department: "",
//     courseName: "",
//     year: "",
//     groups: []
//   });

//   const [step, setStep] = useState(1);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [courseSearch, setCourseSearch] = useState("");

//   /* ================= HELPERS ================= */

//   const filteredCourses = COMMON_COURSES.filter((c) =>
//     c.toLowerCase().includes(courseSearch.toLowerCase())
//   );

//   const toggleGroup = (group) => {
//     setFormData((prev) => ({
//       ...prev,
//       groups: prev.groups.includes(group)
//         ? prev.groups.filter((g) => g !== group)
//         : [...prev.groups, group]
//     }));
//   };

//   const validateForm = () => {
//     if (!formData.department) return "Please select department";
//     if (!formData.courseName) return "Please enter course name";
//     if (!formData.year) return "Please select academic year";
//     if (formData.groups.length === 0) return "Please select at least one group";
//     return null;
//   };

//   /* ================= SUBMIT ================= */

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     const validationError = validateForm();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     const payload = {
//       courseName: formData.courseName.toUpperCase(),
//       department: formData.department,
//       year: Number(formData.year),
//       groups: formData.groups
//     };

//     try {
//       await createCourse(payload).unwrap();
//       setSuccess("Course created successfully!");

//       setTimeout(() => {
//         setFormData({
//           department: "",
//           courseName: "",
//           year: "",
//           groups: []
//         });
//         setStep(1);
//       }, 1500);
//     } catch (err) {
//       setError(err?.data?.message || "Failed to create course");
//     }
//   };

//   const progress = (step / 4) * 100;

//   /* ================= UI ================= */

//   return (
//     <Container fluid className="add-course-page p-0">
//       {/* HEADER */}
//       <div className="page-header">
//         <div className="header-overlay">
//           <Container>
//             <Row className="align-items-center py-4">
//               <Col xs="auto">
//                 <Button
//                   variant="light"
//                   onClick={() => navigate("/superadmin/courses")}
//                   className="rounded-circle p-2"
//                 >
//                   <ArrowLeft />
//                 </Button>
//               </Col>
//               <Col>
//                 <h1 className="text-white mb-0">
//                   Add Course <span className="fw-light">CampusQuest</span>
//                 </h1>
//                 <p className="text-white-50 mb-0">
//                   Expand academic offerings
//                 </p>
//               </Col>
//               <Col xs="auto">
//                 <Badge bg="light" text="dark">
//                   <PlusCircle className="me-2" />
//                   New Course
//                 </Badge>
//               </Col>
//             </Row>
//           </Container>
//         </div>
//       </div>

//       {/* PROGRESS */}
//       <Container className="mt-4">
//         <ProgressBar now={progress} />
//       </Container>

//       {/* ALERTS */}
//       <Container className="mt-4">
//         {error && <Alert variant="danger">{error}</Alert>}
//         {success && <Alert variant="success">{success}</Alert>}
//       </Container>

//       {/* FORM */}
//       <Container className="mt-3">
//         <Card className="shadow-lg border-0">
//           <Card.Body>
//             <Form onSubmit={handleSubmit}>
//               {/* ================= STEP 1 ================= */}
//               {step === 1 && (
//                 <>
//                   <h4 className="mb-3">
//                     <Building /> Select Department
//                   </h4>

//                   {departmentsLoading ? (
//                     <Spinner animation="border" />
//                   ) : (
//                     <Form.Select
//                       value={formData.department}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           department: e.target.value
//                         })
//                       }
//                       required
//                     >
//                       <option value="">Select Department</option>
//                       {departmentList.map((dept, idx) => (
//                         <option key={idx} value={dept}>
//                           {dept}
//                         </option>
//                       ))}
//                     </Form.Select>
//                   )}

//                   <Button
//                     className="mt-3"
//                     disabled={!formData.department}
//                     onClick={() => setStep(2)}
//                   >
//                     Continue
//                   </Button>
//                 </>
//               )}

//               {/* ================= STEP 2 ================= */}
//               {step === 2 && (
//                 <>
//                   <h4 className="mb-3">
//                     <Book /> Course Name
//                   </h4>

//                   <InputGroup className="mb-3">
//                     <Form.Control
//                       placeholder="Search course"
//                       value={courseSearch}
//                       onChange={(e) => setCourseSearch(e.target.value)}
//                     />
//                   </InputGroup>

//                   {filteredCourses.map((c) => (
//                     <Button
//                       key={c}
//                       className="me-2 mb-2"
//                       onClick={() => {
//                         setFormData({ ...formData, courseName: c });
//                         setStep(3);
//                       }}
//                     >
//                       {c}
//                     </Button>
//                   ))}

//                   <Form.Control
//                     className="mt-3"
//                     placeholder="Custom course name"
//                     value={formData.courseName}
//                     onChange={(e) =>
//                       setFormData({ ...formData, courseName: e.target.value })
//                     }
//                   />
//                 </>
//               )}

//               {/* ================= STEP 3 ================= */}
//               {step === 3 && (
//                 <>
//                   <h4 className="mb-3">
//                     <People /> Select Groups
//                   </h4>

//                   {GROUPS.map((g) => (
//                     <Badge
//                       key={g}
//                       bg={formData.groups.includes(g) ? "primary" : "light"}
//                       text={formData.groups.includes(g) ? "light" : "dark"}
//                       className="me-2 mb-2"
//                       style={{ cursor: "pointer" }}
//                       onClick={() => toggleGroup(g)}
//                     >
//                       {g}
//                     </Badge>
//                   ))}

//                   <Button
//                     className="d-block mt-3"
//                     onClick={() => setStep(4)}
//                   >
//                     Continue
//                   </Button>
//                 </>
//               )}

//               {/* ================= STEP 4 ================= */}
//               {step === 4 && (
//                 <>
//                   <h4 className="mb-3">
//                     <Calendar /> Academic Year
//                   </h4>

//                   {[1, 2, 3, 4, 5].map((y) => (
//                     <Button
//                       key={y}
//                       className="me-2 mb-2"
//                       variant={
//                         formData.year === y ? "success" : "outline-success"
//                       }
//                       onClick={() =>
//                         setFormData({ ...formData, year: y })
//                       }
//                     >
//                       Year {y}
//                     </Button>
//                   ))}

//                   <Button
//                     type="submit"
//                     className="d-block mt-4"
//                     disabled={isLoading}
//                   >
//                     {isLoading ? (
//                       <>
//                         <Spinner size="sm" className="me-2" />
//                         Creating...
//                       </>
//                     ) : (
//                       <>
//                         <PlusCircle className="me-2" />
//                         Create Course
//                       </>
//                     )}
//                   </Button>
//                 </>
//               )}
//             </Form>
//           </Card.Body>
//         </Card>
//       </Container>
//     </Container>
//   );
// };

// export default AddCourse;






import React, { useState, useEffect } from "react";
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
  Modal
} from "react-bootstrap";
import {
  PlusCircle,
  ArrowLeft,
  CheckCircle,
  Building,
  Calendar,
  People,
  Book,
  Award,
  Search,
  ChevronDown,
  ChevronUp,
  Globe,
  Users,
  Clock,
  Check,
  X
} from "react-bootstrap-icons";
import { useCreateCourseMutation } from "../../../redux/services/coursesApi";
import { useGetAllDepartmentsQuery } from "../../../redux/services/departmentApi";
import "./AddCourse.css";

// Constants
const GROUPS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
const YEARS = [1, 2, 3, 4, 5];
const COMMON_COURSES = [
  "BCA", "MCA", "B.Tech", "M.Tech", "B.Sc", "M.Sc",
  "BBA", "MBA", "BE", "ME", "B.Com", "M.Com", "BA", "MA",
  "B.Pharm", "M.Pharm", "B.Arch", "M.Arch", "BDS", "MDS",
  "MBBS", "BPT", "MPT", "LLB", "LLM", "BFA", "MFA",
  "BHM", "MHM", "B.Des", "M.Des"
];

const AddCourse = () => {
  const navigate = useNavigate();

  // API Hooks
  const [createCourse, { isLoading }] = useCreateCourseMutation();
  const { data: departments, isLoading: departmentsLoading } = useGetAllDepartmentsQuery();

  // State
  const [formData, setFormData] = useState({
    department: "",
    courseName: "",
    customCourseName: "",
    year: "",
    groups: []
  });
  
  const [courseSearch, setCourseSearch] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showCustomCourse, setShowCustomCourse] = useState(false);
  const [showCoursesDropdown, setShowCoursesDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Derived Data
  const departmentList = departments?.data?.[0]?.departmentNames || [];
  
  // Filter courses based on search
  const filteredCourses = COMMON_COURSES.filter((c) =>
    c.toLowerCase().includes(courseSearch.toLowerCase().trim())
  );

  // Handlers
  const toggleGroup = (group) => {
    setFormData((prev) => ({
      ...prev,
      groups: prev.groups.includes(group)
        ? prev.groups.filter((g) => g !== group)
        : [...prev.groups, group]
    }));
  };

  const validateForm = () => {
    if (!formData.department) return "Please select department";
    if (!formData.courseName && !formData.customCourseName) return "Please enter or select course name";
    if (!formData.year) return "Please select academic year";
    if (formData.groups.length === 0) return "Please select at least one group";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    const courseName = formData.customCourseName || formData.courseName;
    
    const payload = {
      courseName: courseName.toUpperCase(),
      department: formData.department,
      year: Number(formData.year),
      groups: formData.groups
    };

    try {
      await createCourse(payload).unwrap();
      setSuccess("Course created successfully!");
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          department: "",
          courseName: "",
          customCourseName: "",
          year: "",
          groups: []
        });
        setCourseSearch("");
        setShowCustomCourse(false);
        setShowCoursesDropdown(false);
        setIsSubmitting(false);
      }, 2000);
    } catch (err) {
      setError(err?.data?.message || "Failed to create course. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleCourseSelect = (course) => {
    setFormData({ 
      ...formData, 
      courseName: course, 
      customCourseName: "" 
    });
    setCourseSearch(course);
    setShowCoursesDropdown(false);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setCourseSearch(value);
    setShowCoursesDropdown(value.length > 0);
    setFormData({ 
      ...formData, 
      courseName: "", 
      customCourseName: value 
    });
  };

  const resetForm = () => {
    setFormData({
      department: "",
      courseName: "",
      customCourseName: "",
      year: "",
      groups: []
    });
    setCourseSearch("");
    setShowCustomCourse(false);
    setShowCoursesDropdown(false);
    setError("");
    setSuccess("");
  };

  // Calculate form completion percentage
  const completionPercentage = () => {
    let completed = 0;
    const totalFields = 4;
    
    if (formData.department) completed++;
    if (formData.courseName || formData.customCourseName) completed++;
    if (formData.year) completed++;
    if (formData.groups.length > 0) completed++;
    
    return (completed / totalFields) * 100;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.courses-search-container')) {
        setShowCoursesDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <Container fluid className="add-course-page px-0">
      {/* Header Section */}
      <div className="page-header-banner">
        <div className="header-gradient">
          <Container>
            <Row className="align-items-center py-5">
              <Col lg={8}>
                <Button
                  variant="light"
                  onClick={() => navigate("/superadmin/courses")}
                  className="back-btn rounded-circle p-2 me-3"
                >
                  <ArrowLeft size={20} />
                </Button>
                <span className="header-badge">NEW COURSE</span>
                <h1 className="text-white mt-3 mb-2">
                  CampusQuest <span className="fw-light">Course Registration</span>
                </h1>
                <p className="text-white-50 mb-0">
                  Expand academic offerings with our comprehensive course registration system
                </p>
              </Col>
              <Col lg={4} className="text-lg-end mt-4 mt-lg-0">
                <div className="completion-card p-3 rounded">
                  <h6 className="text-white mb-1">Form Completion</h6>
                  <div className="progress-container mb-2">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${completionPercentage()}%` }}
                    ></div>
                  </div>
                  <span className="text-white-50 small">
                    {Math.round(completionPercentage())}% Complete
                  </span>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      {/* Main Content */}
      <Container className="main-content py-5">
        {error && (
          <Alert variant="danger" className="alert-elevated">
            <X className="me-2" />
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert variant="success" className="alert-elevated">
            <CheckCircle className="me-2" />
            {success}
          </Alert>
        )}

        <Row className="justify-content-center">
          <Col lg={10} xl={8}>
            <Card className="registration-card shadow-lg border-0">
              <Card.Header className="card-header-gradient py-4">
                <div className="d-flex align-items-center">
                  <div className="header-icon me-3">
                    <Book size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white mb-1">Course Registration Form</h3>
                    <p className="text-white-50 mb-0">Fill in all required fields to register a new course</p>
                  </div>
                </div>
              </Card.Header>
              
              <Card.Body className="p-4 p-md-5">
                <Form onSubmit={handleSubmit} className="enterprise-form">
                  {/* Department Selection */}
                  <div className="form-section mb-5">
                    <div className="section-header mb-4">
                      <h5 className="mb-2">
                        <Building className="me-2" />
                        Department Information
                      </h5>
                      <p className="text-muted small">Select the department offering this course</p>
                    </div>
                    
                    {departmentsLoading ? (
                      <div className="loading-container text-center py-4">
                        <Spinner animation="border" variant="primary" />
                        <p className="mt-2 text-muted">Loading departments...</p>
                      </div>
                    ) : (
                      <div className="select-wrapper">
                        <Form.Label className="form-label">Department *</Form.Label>
                        <Form.Select
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                          className="form-select-custom"
                          required
                        >
                          <option value="">Select a department</option>
                          {departmentList.map((dept, idx) => (
                            <option key={idx} value={dept} className="option-item">
                              {dept}
                            </option>
                          ))}
                        </Form.Select>
                        {formData.department && (
                          <div className="selected-indicator mt-2">
                            <Badge bg="light" text="dark" className="px-3 py-2">
                              <Check className="me-2" size={12} />
                              Selected: <strong>{formData.department}</strong>
                            </Badge>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Course Information */}
                  <div className="form-section mb-5">
                    <div className="section-header mb-4">
                      <h5 className="mb-2">
                        <Book className="me-2" />
                        Course Details
                      </h5>
                      <p className="text-muted small">Select from common courses or enter a custom course name</p>
                    </div>
                    
                    <div className="row">
                      <Col md={6}>
                        <div className="courses-search-container mb-3">
                          <Form.Label className="form-label">Course Name *</Form.Label>
                          <InputGroup className="mb-2">
                            <InputGroup.Text className="input-group-text-custom">
                              <Search />
                            </InputGroup.Text>
                            <Form.Control
                              placeholder="Search courses or type custom name..."
                              value={courseSearch}
                              onChange={handleSearchChange}
                              onFocus={() => setShowCoursesDropdown(true)}
                              className="form-control-custom"
                              autoComplete="off"
                            />
                          </InputGroup>
                          
                          {/* Courses Dropdown - FIXED HERE */}
                          {showCoursesDropdown && filteredCourses.length > 0 && (
                            <div className="courses-dropdown-container">
                              <div className="courses-dropdown">
                                <div className="dropdown-header">
                                  <small className="text-muted">Common Courses ({filteredCourses.length})</small>
                                </div>
                                <div className="courses-list">
                                  {filteredCourses.map((course) => (
                                    <button
                                      type="button"
                                      key={course}
                                      className={`course-option ${formData.courseName === course ? 'active' : ''}`}
                                      onClick={() => handleCourseSelect(course)}
                                    >
                                      <span className="course-name">{course}</span>
                                      {formData.courseName === course && (
                                        <Check className="selected-icon" size={14} />
                                      )}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {/* No Results Message */}
                          {showCoursesDropdown && courseSearch.length > 0 && filteredCourses.length === 0 && (
                            <div className="no-results-message p-3 text-center">
                              <p className="text-muted mb-2">No matching courses found</p>
                              <small>Continue typing to create a custom course</small>
                            </div>
                          )}
                          
                          {/* Selected Course Display */}
                          {formData.courseName && (
                            <div className="selected-course-display mt-3 p-3 bg-light rounded">
                              <div className="d-flex align-items-center justify-content-between">
                                <div>
                                  <strong>Selected Course:</strong> {formData.courseName}
                                </div>
                                <Button
                                  variant="outline-secondary"
                                  size="sm"
                                  onClick={() => {
                                    setFormData({ ...formData, courseName: "" });
                                    setCourseSearch("");
                                  }}
                                >
                                  <X size={12} />
                                </Button>
                              </div>
                            </div>
                          )}
                          
                          {/* Custom Course Toggle */}
                          <div className="mt-3">
                            <Button
                              variant="outline-secondary"
                              className="w-100"
                              onClick={() => setShowCustomCourse(!showCustomCourse)}
                              type="button"
                            >
                              {showCustomCourse ? <ChevronUp className="me-2" /> : <ChevronDown className="me-2" />}
                              {showCustomCourse ? "Hide Custom Course Field" : "Add Custom Course Manually"}
                            </Button>
                            
                            {showCustomCourse && (
                              <div className="mt-3">
                                <Form.Label className="form-label">Custom Course Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter custom course name (e.g., B.Sc Computer Science)"
                                  value={formData.customCourseName}
                                  onChange={(e) => {
                                    setFormData({ 
                                      ...formData, 
                                      customCourseName: e.target.value,
                                      courseName: "" 
                                    });
                                    setCourseSearch(e.target.value);
                                  }}
                                  className="form-control-custom"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </Col>
                      
                      <Col md={6}>
                        <Form.Label className="form-label">Academic Year *</Form.Label>
                        <div className="year-selector">
                          {YEARS.map((year) => (
                            <Button
                              key={year}
                              variant={formData.year === year.toString() ? "primary" : "outline-primary"}
                              className="year-option"
                              onClick={() => setFormData({ ...formData, year: year.toString() })}
                              type="button"
                            >
                              Year {year}
                              {formData.year === year.toString() && <Check className="ms-2" size={14} />}
                            </Button>
                          ))}
                        </div>
                        
                        {(formData.courseName || formData.customCourseName) && formData.year && (
                          <div className="selection-summary mt-4 p-3 bg-light rounded">
                            <h6 className="mb-2">Course Summary</h6>
                            <p className="mb-1">
                              <strong>Course:</strong> {formData.customCourseName || formData.courseName}
                            </p>
                            <p className="mb-0">
                              <strong>Duration:</strong> {formData.year} Year{formData.year > 1 ? 's' : ''}
                            </p>
                          </div>
                        )}
                      </Col>
                    </div>
                  </div>

                  {/* Group Selection */}
                  <div className="form-section mb-5">
                    <div className="section-header mb-4">
                      <h5 className="mb-2">
                        <People className="me-2" />
                        Student Groups
                      </h5>
                      <p className="text-muted small">Select the groups that will be part of this course</p>
                    </div>
                    
                    <div className="groups-section">
                      <Form.Label className="form-label">Select Groups *</Form.Label>
                      <div className="groups-container">
                        {GROUPS.map((group) => (
                          <div
                            key={group}
                            className={`group-item ${formData.groups.includes(group) ? 'selected' : ''}`}
                            onClick={() => toggleGroup(group)}
                          >
                            <div className="group-checkbox">
                              {formData.groups.includes(group) && <Check size={14} />}
                            </div>
                            <span className="group-label">Group {group}</span>
                          </div>
                        ))}
                      </div>
                      
                      {formData.groups.length > 0 && (
                        <div className="selected-groups mt-4">
                          <h6 className="mb-2">Selected Groups ({formData.groups.length})</h6>
                          <div className="d-flex flex-wrap gap-2">
                            {formData.groups.map((group) => (
                              <Badge key={group} bg="primary" className="selected-group-badge px-3 py-2">
                                Group {group}
                                <X 
                                  size={12} 
                                  className="ms-2" 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleGroup(group);
                                  }}
                                  style={{ cursor: 'pointer' }}
                                />
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="form-actions mt-5 pt-4 border-top">
                    <Row className="align-items-center">
                      <Col md={6} className="mb-3 mb-md-0">
                        <Button
                          variant="outline-secondary"
                          onClick={resetForm}
                          className="action-btn"
                          disabled={isSubmitting}
                          type="button"
                        >
                          <X className="me-2" />
                          Reset Form
                        </Button>
                      </Col>
                      <Col md={6} className="text-md-end">
                        <Button
                          type="submit"
                          variant="primary"
                          className="submit-btn px-5"
                          disabled={isSubmitting || completionPercentage() < 100}
                        >
                          {isSubmitting ? (
                            <>
                              <Spinner size="sm" className="me-2" />
                              Creating Course...
                            </>
                          ) : (
                            <>
                              <PlusCircle className="me-2" />
                              Register Course
                            </>
                          )}
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </Card.Body>
              
              <Card.Footer className="card-footer-light py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="text-muted small">
                      <CheckCircle className="me-1" size={12} />
                      All fields marked with * are required
                    </span>
                  </div>
                  <div className="text-end">
                    <span className="text-muted small">
                      CampusQuest Academic System v2.1
                    </span>
                  </div>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default AddCourse;