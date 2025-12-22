

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API = "http://localhost:5000/api/course";

// const CourseManagement = () => {
//   const token = localStorage.getItem("token");

//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Form states
//   const [courseType, setCourseType] = useState("departmental");
//   const [department, setDepartment] = useState("");
//   const [courseName, setCourseName] = useState("");
//   const [year, setYear] = useState("");
//   const [groups, setGroups] = useState("");

//   /* ======================
//      FETCH ALL COURSES
//   ======================= */
//   const fetchCourses = async () => {
//     try {
//       const res = await axios.get(API, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCourses(res.data.course);
//       setLoading(false);
//     } catch (err) {
//       console.error("Fetch error:", err.response || err);
//       setLoading(false);
//       alert(err.response?.data?.message || "Failed to fetch courses");
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   /* ======================
//      SUBMIT (ADD COURSE)
//   ======================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!courseName || !year) {
//       alert("Course Name and Year are required");
//       return;
//     }
//     if (courseType === "departmental") {
//       if (!department) {
//         alert("Department is required for departmental courses");
//         return;
//       }
//       if (!groups.trim()) {
//         alert("At least one group is required for departmental courses");
//         return;
//       }
//     }

//     // Prepare payload
//     const payload = {
//       courseType,
//       courseName,
//       year: Number(year), // convert string to number
//       department: courseType === "departmental" ? department : undefined,
//       groups:
//         courseType === "departmental"
//           ? groups.split(",").map((g) => g.trim()).filter(Boolean)
//           : [],
//     };

//     console.log("Submitting payload:", payload);

//     try {
//       const res = await axios.post(`${API}/add`, payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       alert(res.data.message);
//       fetchCourses(); // refresh list
//       setCourseName("");
//       setDepartment("");
//       setYear("");
//       setGroups("");
//     } catch (err) {
//       console.error("Add course error:", err.response || err);
//       alert(err.response?.data?.message || "Failed to add course");
//     }
//   };

//   /* ======================
//      UI
//   ======================= */
//   return (
//     <div className="course-container">
//       <h2>📚 Course Management</h2>

//       {/* ========= FORM ========= */}
//       <form className="course-form" onSubmit={handleSubmit}>
//         <select
//           value={courseType}
//           onChange={(e) => setCourseType(e.target.value)}
//         >
//           <option value="departmental">Departmental</option>
//           <option value="global">Global</option>
//         </select>

//         {courseType === "departmental" && (
//           <input
//             type="text"
//             placeholder="Department"
//             value={department}
//             onChange={(e) => setDepartment(e.target.value)}
//           />
//         )}

//         <input
//           type="text"
//           placeholder="Course Name (BCA, MCA...)"
//           value={courseName}
//           onChange={(e) => setCourseName(e.target.value)}
//         />

//         <input
//           type="number"
//           placeholder="Year"
//           value={year}
//           onChange={(e) => setYear(e.target.value)}
//         />

//         {courseType === "departmental" && (
//           <input
//             type="text"
//             placeholder="Groups (comma separated)"
//             value={groups}
//             onChange={(e) => setGroups(e.target.value)}
//           />
//         )}

//         <button type="submit">➕ Add Course</button>
//       </form>

//       {/* ========= TABLE ========= */}
//       {loading ? (
//         <p>Loading courses...</p>
//       ) : (
//         <table className="course-table">
//           <thead>
//             <tr>
//               <th>Type</th>
//               <th>Department</th>
//               <th>Name</th>
//               <th>Year</th>
//               <th>Groups</th>
//               <th>Created By</th>
//             </tr>
//           </thead>

//           <tbody>
//             {courses.map((c) => (
//               <tr key={c._id}>
//                 <td>{c.courseType}</td>
//                 <td>{c.department || "-"}</td>
//                 <td>{c.courseName}</td>
//                 <td>{c.year}</td>
//                 <td>{c.groups?.join(", ") || "-"}</td>
//                 <td>{c.createdBy?.name || "SuperAdmin"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default CourseManagement;

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { 
  Modal, 
  Button, 
  Form, 
  Alert, 
  Spinner, 
  Table, 
  Badge,
  Card,
  Container,
  Row,
  Col
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { 
  PlusCircle, 
  Trash, 
  Pencil, 
  Eye, 
  CheckCircle, 
  XCircle,
  Book,
  ArrowRepeat
} from "react-bootstrap-icons";

const API = "http://localhost:5000/api/course";

const CourseManagement = () => {
  const token = localStorage.getItem("token");
  
  // State management
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // Form states
  const [courseType, setCourseType] = useState("departmental");
  const [department, setDepartment] = useState("");
  const [courseName, setCourseName] = useState("");
  const [year, setYear] = useState("");
  const [groups, setGroups] = useState("");
  
  // Selected course for operations
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [viewingCourse, setViewingCourse] = useState(null);
  
  // Form errors
  const [formErrors, setFormErrors] = useState({});
  
  /* ======================
     FETCH ALL COURSES
  ======================= */
  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res.data.course);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch courses");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  /* ======================
     VALIDATION
  ======================= */
  const validateForm = () => {
    const errors = {};
    
    if (!courseName.trim()) errors.courseName = "Course name is required";
    if (!year) errors.year = "Year is required";
    if (parseInt(year) < 1 || parseInt(year) > 5) errors.year = "Year must be between 1 and 5";
    
    if (courseType === "departmental") {
      if (!department.trim()) errors.department = "Department is required";
      if (!groups.trim()) errors.groups = "At least one group is required";
    }
    
    return errors;
  };

  /* ======================
     ADD COURSE
  ======================= */
  const handleAddCourse = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Convert to uppercase before sending to backend
    const payload = {
      courseType,
      courseName: courseName.trim().toUpperCase(),
      year: parseInt(year),
      department: courseType === "departmental" 
        ? department.trim().toUpperCase() 
        : undefined,
      groups: courseType === "departmental" 
        ? groups.split(",").map(g => g.trim().toUpperCase()).filter(Boolean)
        : [],
    };

    try {
      setLoading(true);
      const res = await axios.post(`${API}/add`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess(res.data.message);
      fetchCourses();
      resetForm();
      setShowAddModal(false);
      
      // Auto-clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add course");
      console.error("Add course error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     EDIT COURSE
  ======================= */
  const handleEditCourse = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Convert to uppercase before sending to backend
    const payload = {
      courseType: editingCourse.courseType,
      courseName: courseName.trim().toUpperCase(),
      year: parseInt(year),
      department: editingCourse.courseType === "departmental" 
        ? department.trim().toUpperCase() 
        : undefined,
      groups: editingCourse.courseType === "departmental" 
        ? groups.split(",").map(g => g.trim().toUpperCase()).filter(Boolean)
        : [],
    };

    try {
      setLoading(true);
      const res = await axios.put(`${API}/${editingCourse._id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess(res.data.message);
      fetchCourses();
      setShowEditModal(false);
      setEditingCourse(null);
      resetForm();
      
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update course");
      console.error("Edit course error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     DELETE COURSE
  ======================= */
  const handleDeleteCourse = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(`${API}/${selectedCourse._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess(res.data.message);
      fetchCourses();
      setShowDeleteModal(false);
      setSelectedCourse(null);
      
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete course");
      console.error("Delete course error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     UTILITY FUNCTIONS
  ======================= */
  const resetForm = () => {
    setCourseType("departmental");
    setDepartment("");
    setCourseName("");
    setYear("");
    setGroups("");
    setFormErrors({});
  };

  const openEditModal = (course) => {
    setEditingCourse(course);
    setCourseType(course.courseType);
    setDepartment(course.department || "");
    setCourseName(course.courseName || "");
    setYear(course.year.toString());
    setGroups(course.groups?.join(", ") || "");
    setShowEditModal(true);
  };

  const openViewModal = (course) => {
    setViewingCourse(course);
    setShowViewModal(true);
  };

  const openDeleteModal = (course) => {
    setSelectedCourse(course);
    setShowDeleteModal(true);
  };

  const getCourseTypeBadge = (type) => {
    const formattedType = type.charAt(0).toUpperCase() + type.slice(1);
    return type === "departmental" 
      ? <Badge bg="primary">{formattedType}</Badge>
      : <Badge bg="success">{formattedType}</Badge>;
  };

  // Format text to uppercase for display
  const formatForDisplay = (text) => {
    return text ? text.toString().toUpperCase() : "-";
  };

  // Handle uppercase input in form fields
  const handleUppercaseInput = (value, setter) => {
    setter(value.toUpperCase());
  };

  /* ======================
     RENDER
  ======================= */
  return (
    <Container fluid className="py-4">
      {/* Header Section */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow border-0">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="mb-1 text-primary">
                  <Book className="me-2" />
                  Course Management
                </h2>
                <p className="text-muted mb-0">
                  Manage all courses in the system. Add, edit, or remove courses as needed.
                </p>
              </div>
              <div>
                <Button 
                  variant="outline-secondary" 
                  className="me-2"
                  onClick={fetchCourses}
                  disabled={loading}
                >
                  <ArrowRepeat className={loading ? "spin" : ""} />
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => setShowAddModal(true)}
                >
                  <PlusCircle className="me-2" />
                  Add New Course
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Alerts */}
      {error && (
        <Row className="mb-3">
          <Col>
            <Alert variant="danger" onClose={() => setError("")} dismissible>
              <XCircle className="me-2" />
              {error}
            </Alert>
          </Col>
        </Row>
      )}
      
      {success && (
        <Row className="mb-3">
          <Col>
            <Alert variant="success" onClose={() => setSuccess("")} dismissible>
              <CheckCircle className="me-2" />
              {success}
            </Alert>
          </Col>
        </Row>
      )}

      {/* Courses Table */}
      <Row>
        <Col>
          <Card className="shadow border-0">
            <Card.Body>
              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                  <p className="mt-2">Loading courses...</p>
                </div>
              ) : courses.length === 0 ? (
                <div className="text-center py-5">
                  <Book size={48} className="text-muted mb-3" />
                  <h5>No courses found</h5>
                  <p className="text-muted">
                    Get started by adding your first course.
                  </p>
                  <Button 
                    variant="outline-primary" 
                    onClick={() => setShowAddModal(true)}
                  >
                    <PlusCircle className="me-2" />
                    Add Course
                  </Button>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table hover className="mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Type</th>
                        <th>Course Name</th>
                        <th>Department</th>
                        <th>Year</th>
                        <th>Groups</th>
                        <th>Created By</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((course, index) => (
                        <tr key={course._id}>
                          <td className="fw-bold">{index + 1}</td>
                          <td>{getCourseTypeBadge(course.courseType)}</td>
                          <td className="fw-semibold text-uppercase">
                            {formatForDisplay(course.courseName)}
                          </td>
                          <td className="text-uppercase">
                            {formatForDisplay(course.department)}
                          </td>
                          <td>
                            <Badge bg="info" className="px-3 py-2">
                              Year {course.year}
                            </Badge>
                          </td>
                          <td>
                            {course.groups?.length > 0 ? (
                              <div className="d-flex flex-wrap gap-1">
                                {course.groups.map((group, i) => (
                                  <Badge key={i} bg="secondary" className="px-2 py-1 text-uppercase">
                                    {formatForDisplay(group)}
                                  </Badge>
                                ))}
                              </div>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td>{course.createdBy?.name || "SuperAdmin"}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <Button 
                                variant="outline-info" 
                                size="sm"
                                onClick={() => openViewModal(course)}
                                title="View Details"
                              >
                                <Eye />
                              </Button>
                              <Button 
                                variant="outline-warning" 
                                size="sm"
                                onClick={() => openEditModal(course)}
                                title="Edit Course"
                              >
                                <Pencil />
                              </Button>
                              <Button 
                                variant="outline-danger" 
                                size="sm"
                                onClick={() => openDeleteModal(course)}
                                title="Delete Course"
                              >
                                <Trash />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add Course Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <PlusCircle className="me-2" />
            Add New Course
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddCourse}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Course Type <span className="text-danger">*</span></Form.Label>
              <Form.Select 
                value={courseType} 
                onChange={(e) => setCourseType(e.target.value)}
                isInvalid={!!formErrors.courseType}
              >
                <option value="departmental">Departmental</option>
                <option value="global">Global</option>
              </Form.Select>
            </Form.Group>

            {courseType === "departmental" && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Department <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter department name (e.g., CSE, IT, ECE)"
                    value={department}
                    onChange={(e) => handleUppercaseInput(e.target.value, setDepartment)}
                    isInvalid={!!formErrors.department}
                    style={{ textTransform: 'uppercase' }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.department}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Groups <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="GROUP A, GROUP B, GROUP C"
                    value={groups}
                    onChange={(e) => handleUppercaseInput(e.target.value, setGroups)}
                    isInvalid={!!formErrors.groups}
                    style={{ textTransform: 'uppercase' }}
                  />
                  <Form.Text className="text-muted">
                    Enter groups separated by commas (will be converted to uppercase)
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    {formErrors.groups}
                  </Form.Control.Feedback>
                </Form.Group>
              </>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Course Name <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., BCA, MCA, B.TECH"
                value={courseName}
                onChange={(e) => handleUppercaseInput(e.target.value, setCourseName)}
                isInvalid={!!formErrors.courseName}
                style={{ textTransform: 'uppercase' }}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.courseName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Year <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="5"
                placeholder="e.g., 1, 2, 3"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                isInvalid={!!formErrors.year}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.year}
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Adding...
                </>
              ) : (
                <>
                  <PlusCircle className="me-2" />
                  Add Course
                </>
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Edit Course Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton className="bg-warning text-dark">
          <Modal.Title>
            <Pencil className="me-2" />
            Edit Course
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditCourse}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Course Type</Form.Label>
              <Form.Control 
                type="text" 
                value={editingCourse?.courseType} 
                disabled 
                className="bg-light"
              />
            </Form.Group>

            {editingCourse?.courseType === "departmental" && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Department <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    value={department}
                    onChange={(e) => handleUppercaseInput(e.target.value, setDepartment)}
                    isInvalid={!!formErrors.department}
                    style={{ textTransform: 'uppercase' }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.department}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Groups <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    value={groups}
                    onChange={(e) => handleUppercaseInput(e.target.value, setGroups)}
                    isInvalid={!!formErrors.groups}
                    style={{ textTransform: 'uppercase' }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.groups}
                  </Form.Control.Feedback>
                </Form.Group>
              </>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Course Name <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                value={courseName}
                onChange={(e) => handleUppercaseInput(e.target.value, setCourseName)}
                isInvalid={!!formErrors.courseName}
                style={{ textTransform: 'uppercase' }}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.courseName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Year <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="5"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                isInvalid={!!formErrors.year}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.year}
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button 
              variant="warning" 
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Updating...
                </>
              ) : (
                <>
                  <Pencil className="me-2" />
                  Update Course
                </>
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* View Course Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} centered>
        <Modal.Header closeButton className="bg-info text-white">
          <Modal.Title>
            <Eye className="me-2" />
            Course Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewingCourse && (
            <div>
              <div className="row mb-3">
                <div className="col-6">
                  <strong>Course ID:</strong>
                  <p className="text-muted">{viewingCourse._id}</p>
                </div>
                <div className="col-6">
                  <strong>Type:</strong>
                  <div className="mt-1">
                    {getCourseTypeBadge(viewingCourse.courseType)}
                  </div>
                </div>
              </div>
              
              <div className="row mb-3">
                <div className="col-6">
                  <strong>Course Name:</strong>
                  <p className="text-muted text-uppercase">
                    {formatForDisplay(viewingCourse.courseName)}
                  </p>
                </div>
                <div className="col-6">
                  <strong>Year:</strong>
                  <p className="text-muted">Year {viewingCourse.year}</p>
                </div>
              </div>
              
              {viewingCourse.department && (
                <div className="mb-3">
                  <strong>Department:</strong>
                  <p className="text-muted text-uppercase">
                    {formatForDisplay(viewingCourse.department)}
                  </p>
                </div>
              )}
              
              {viewingCourse.groups?.length > 0 && (
                <div className="mb-3">
                  <strong>Groups:</strong>
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {viewingCourse.groups.map((group, i) => (
                      <Badge key={i} bg="secondary" className="px-2 py-1 text-uppercase">
                        {formatForDisplay(group)}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mb-3">
                <strong>Created By:</strong>
                <p className="text-muted">
                  {viewingCourse.createdBy?.name || "SuperAdmin"}
                  {viewingCourse.createdBy?.email && (
                    <span className="d-block small">
                      {viewingCourse.createdBy.email}
                    </span>
                  )}
                </p>
              </div>
              
              <div className="mb-3">
                <strong>Created At:</strong>
                <p className="text-muted">
                  {viewingCourse.createdAt ? new Date(viewingCourse.createdAt).toLocaleString() : "N/A"}
                </p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>
            <Trash className="me-2" />
            Confirm Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="danger">
            <h5>Warning!</h5>
            <p className="mb-0">
              Are you sure you want to delete the course 
              <strong className="text-uppercase"> "{selectedCourse?.courseName}"</strong>? 
              This action cannot be undone.
            </p>
          </Alert>
          {selectedCourse && (
            <div className="bg-light p-3 rounded">
              <p className="mb-1">
                <strong>Type:</strong> {selectedCourse.courseType}
              </p>
              <p className="mb-1">
                <strong>Year:</strong> {selectedCourse.year}
              </p>
              {selectedCourse.department && (
                <p className="mb-0 text-uppercase">
                  <strong>Department:</strong> {formatForDisplay(selectedCourse.department)}
                </p>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDeleteCourse}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Deleting...
              </>
            ) : (
              <>
                <Trash className="me-2" />
                Delete Course
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Custom CSS */}
      <style jsx="true">{`
        .table th {
          border-top: none;
          font-weight: 600;
        }
        .table td {
          vertical-align: middle;
        }
        .card {
          border-radius: 12px;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        .modal-header {
          border-radius: 12px 12px 0 0;
        }
        .badge {
          border-radius: 6px;
        }
        .btn-outline-info:hover {
          background-color: #0dcaf0;
          color: white;
        }
        .btn-outline-warning:hover {
          background-color: #ffc107;
          color: black;
        }
        .btn-outline-danger:hover {
          background-color: #dc3545;
          color: white;
        }
        input[style*="text-transform: uppercase"] {
          font-family: monospace;
        }
        .text-uppercase {
          text-transform: uppercase;
        }
      `}</style>
    </Container>
  );
};

export default CourseManagement;