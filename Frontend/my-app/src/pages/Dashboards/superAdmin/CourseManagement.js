









// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Table,
//   Button,
//   Badge,
//   Form,
//   Modal,
//   InputGroup,
//   Spinner,
//   Alert
// } from "react-bootstrap";
// import {
//   Search,
//   Plus,
//   Trash2,
//   Filter,
//   Calendar,
//   Building,
//   Award
// } from "react-bootstrap-icons";


// import {
//   BookOpen,
//   Users,
//   Edit2,
 
// } from "lucide-react";
// const API = "http://localhost:5000/api/course";

// const CourseManagement = () => {
//   const navigate = useNavigate();
//   const [courses, setCourses] = useState([]);
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // Modal states
//   const [showModal, setShowModal] = useState(false);
//   const [modalType, setModalType] = useState(""); // "edit" or "delete"
//   const [selectedCourse, setSelectedCourse] = useState(null);
  
//   // Form state for editing
//   const [editForm, setEditForm] = useState({
//     department: "",
//     courseName: "",
//     year: 1,
//     groups: []
//   });
  
//   const [newGroup, setNewGroup] = useState("");
  
//   // Filters
//   const [filters, setFilters] = useState({
//     search: "",
//     department: "",
//     year: ""
//   });

//   // Department options
//   const departmentOptions = ["CA", "CS", "IT", "EC", "ME", "CE", "EE"];
//   const yearOptions = [1, 2, 3, 4, 5];

//   /* ================= FETCH COURSES ================= */
//   const fetchCourses = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await axios.get(API, { withCredentials: true });
//       setCourses(res.data.courses || []);
//       setFilteredCourses(res.data.courses || []);
//     } catch (err) {
//       console.error("Fetch courses error:", err);
//       setError("Failed to load courses. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchCourses();
//   }, [fetchCourses]);

//   /* ================= FILTERING ================= */
//   useEffect(() => {
//     let temp = [...courses];

//     if (filters.search) {
//       const searchTerm = filters.search.toLowerCase();
//       temp = temp.filter(c =>
//         c.courseName.toLowerCase().includes(searchTerm) ||
//         c.department.toLowerCase().includes(searchTerm)
//       );
//     }

//     if (filters.department) {
//       temp = temp.filter(c => c.department === filters.department);
//     }

//     if (filters.year) {
//       temp = temp.filter(c => c.year === Number(filters.year));
//     }

//     setFilteredCourses(temp);
//   }, [filters, courses]);

//   /* ================= HANDLERS ================= */
//   const handleAddCourse = () => navigate("/superadmin/courses/add");

//   const openModal = (type, course) => {
//     setModalType(type);
//     setSelectedCourse(course);
    
//     if (type === "edit") {
//       setEditForm({
//         department: course.department,
//         courseName: course.courseName,
//         year: course.year,
//         groups: [...course.groups] || []
//       });
//     }
    
//     setShowModal(true);
//   };

//   const handleDelete = async () => {
//     try {
//       setLoading(true);
//       await axios.delete(`${API}/${selectedCourse._id}`, {
//         withCredentials: true
//       });
//       await fetchCourses();
//       setShowModal(false);
//     } catch (err) {
//       console.error("Delete error:", err);
//       setError("Failed to delete course.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditSave = async () => {
//     try {
//       setLoading(true);
//       await axios.put(
//         `${API}/${selectedCourse._id}`,
//         editForm,
//         { withCredentials: true }
//       );
//       await fetchCourses();
//       setShowModal(false);
//     } catch (err) {
//       console.error("Edit error:", err);
//       setError("Failed to update course.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddGroup = () => {
//     if (newGroup.trim() && !editForm.groups.includes(newGroup.trim().toUpperCase())) {
//       setEditForm({
//         ...editForm,
//         groups: [...editForm.groups, newGroup.trim().toUpperCase()]
//       });
//       setNewGroup("");
//     }
//   };

//   const handleRemoveGroup = (groupToRemove) => {
//     setEditForm({
//       ...editForm,
//       groups: editForm.groups.filter(g => g !== groupToRemove)
//     });
//   };

//   const getDepartmentColor = (dept) => {
//     const colorMap = {
//       CA: "primary",
//       CS: "info",
//       IT: "success",
//       EC: "warning",
//       ME: "danger",
//       CE: "secondary",
//       EE: "dark"
//     };
//     return colorMap[dept] || "light";
//   };

//   const getYearColor = (year) => {
//     const colors = ["primary", "success", "warning", "danger", "info"];
//     return colors[year - 1] || "secondary";
//   };

//   return (
//     <Container fluid className="py-4 px-4">
//       {/* Header with Border Design */}
//       <Card className="border-0 shadow-sm mb-4">
//         <Card.Body className="p-4">
//           <Row className="align-items-center">
//             <Col md={6}>
//               <div className="d-flex align-items-center">
//                 <div className="border-start border-4 border-primary ps-3">
//                   <h1 className="h3 fw-bold mb-1">Campus Quest</h1>
//                   <h2 className="h5 text-muted mb-0">Course Management System</h2>
//                 </div>
//               </div>
//             </Col>
//             <Col md={6} className="text-md-end">
//               <Badge bg="light" text="dark" className="p-2 border">
//                 <Award size={16} className="me-2" />
//                 {courses.length} Courses Registered
//               </Badge>
//             </Col>
//           </Row>
//         </Card.Body>
//       </Card>

//       {/* Stats and Action Bar */}
//       <Row className="mb-4">
//         <Col lg={8}>
//           <Card className="border-0 shadow-sm h-100">
//             <Card.Body>
//               <Row className="g-3">
//                 <Col md={4}>
//                   <div className="d-flex align-items-center">
//                     <div className="bg-primary bg-opacity-10 p-3 rounded me-3">
//                       <Building size={24} className="text-primary" />
//                     </div>
//                     <div>
//                       <h6 className="mb-0 text-muted">Departments</h6>
//                       <h4 className="mb-0 fw-bold">
//                         {[...new Set(courses.map(c => c.department))].length}
//                       </h4>
//                     </div>
//                   </div>
//                 </Col>
//                 <Col md={4}>
//                   <div className="d-flex align-items-center">
//                     <div className="bg-success bg-opacity-10 p-3 rounded me-3">
//                       <BookOpen size={24} className="text-success" />
//                     </div>
//                     <div>
//                       <h6 className="mb-0 text-muted">Total Courses</h6>
//                       <h4 className="mb-0 fw-bold">{filteredCourses.length}</h4>
//                     </div>
//                   </div>
//                 </Col>
//                 <Col md={4}>
//                   <div className="d-flex align-items-center">
//                     <div className="bg-info bg-opacity-10 p-3 rounded me-3">
//                       <Users size={24} className="text-info" />
//                     </div>
//                     <div>
//                       <h6 className="mb-0 text-muted">Active Groups</h6>
//                       <h4 className="mb-0 fw-bold">
//                         {courses.reduce((acc, curr) => acc + (curr.groups?.length || 0), 0)}
//                       </h4>
//                     </div>
//                   </div>
//                 </Col>
//               </Row>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col lg={4}>
//           <Button
//             variant="primary"
//             size="lg"
//             className="w-100 h-100 py-3"
//             onClick={handleAddCourse}
//           >
//             <Plus size={20} className="me-2" />
//             Add New Course
//           </Button>
//         </Col>
//       </Row>

//       {/* Filters */}
//       <Card className="border-0 shadow-sm mb-4">
//         <Card.Body className="p-4">
//           <Row className="g-3 align-items-end">
//             <Col lg={4}>
//               <Form.Label className="fw-semibold">
//                 <Search size={16} className="me-2" />
//                 Search Courses
//               </Form.Label>
//               <InputGroup>
//                 <Form.Control
//                   placeholder="Search by course or department..."
//                   value={filters.search}
//                   onChange={(e) =>
//                     setFilters({ ...filters, search: e.target.value })
//                   }
//                 />
//               </InputGroup>
//             </Col>
            
//             <Col lg={3}>
//               <Form.Label className="fw-semibold">
//                 <Filter size={16} className="me-2" />
//                 Department
//               </Form.Label>
//               <Form.Select
//                 value={filters.department}
//                 onChange={(e) =>
//                   setFilters({ ...filters, department: e.target.value })
//                 }
//               >
//                 <option value="">All Departments</option>
//                 {departmentOptions.map((dept) => (
//                   <option key={dept} value={dept}>
//                     {dept}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Col>
            
//             <Col lg={3}>
//               <Form.Label className="fw-semibold">
//                 <Calendar size={16} className="me-2" />
//                 Year
//               </Form.Label>
//               <Form.Select
//                 value={filters.year}
//                 onChange={(e) =>
//                   setFilters({ ...filters, year: e.target.value })
//                 }
//               >
//                 <option value="">All Years</option>
//                 {yearOptions.map((year) => (
//                   <option key={year} value={year}>
//                     Year {year}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Col>
            
//             <Col lg={2}>
//               <Button
//                 variant="outline-secondary"
//                 className="w-100"
//                 onClick={() => setFilters({ search: "", department: "", year: "" })}
//               >
//                 Clear Filters
//               </Button>
//             </Col>
//           </Row>
//         </Card.Body>
//       </Card>

//       {/* Error Alert */}
//       {error && (
//         <Alert variant="danger" className="mb-4" dismissible onClose={() => setError(null)}>
//           {error}
//         </Alert>
//       )}

//       {/* Courses Table */}
//       <Card className="border-0 shadow-sm">
//         <Card.Body className="p-0">
//           {loading ? (
//             <div className="text-center py-5">
//               <Spinner animation="border" variant="primary" />
//               <p className="mt-3 text-muted">Loading courses...</p>
//             </div>
//           ) : (
//             <div className="table-responsive">
//               <Table hover className="mb-0">
//                 <thead className="table-light">
//                   <tr>
//                     <th className="ps-4">Department</th>
//                     <th>Course</th>
//                     <th>Groups</th>
//                     <th>Year</th>
//                     <th className="text-end pe-4">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredCourses.length > 0 ? (
//                     filteredCourses.map((course) => (
//                       <tr key={course._id} className="align-middle">
//                         <td className="ps-4">
//                           <Badge
//                             bg={getDepartmentColor(course.department)}
//                             className="px-3 py-2"
//                           >
//                             <Building size={14} className="me-2" />
//                             {course.department}
//                           </Badge>
//                         </td>
//                         <td>
//                           <div className="d-flex align-items-center">
//                             <div className="bg-light rounded p-2 me-3">
//                               <BookOpen size={18} className="text-primary" />
//                             </div>
//                             <div>
//                               <h6 className="mb-0">{course.courseName}</h6>
//                               <small className="text-muted">
//                                 Created: {new Date(course.createdAt).toLocaleDateString()}
//                               </small>
//                             </div>
//                           </div>
//                         </td>
//                         <td>
//                           <div className="d-flex flex-wrap gap-1">
//                             {course.groups && course.groups.length > 0 ? (
//                               course.groups.map((group, idx) => (
//                                 <Badge
//                                   key={idx}
//                                   bg="light"
//                                   text="dark"
//                                   className="border"
//                                 >
//                                   <Users size={12} className="me-1" />
//                                   {group}
//                                 </Badge>
//                               ))
//                             ) : (
//                               <span className="text-muted">No groups</span>
//                             )}
//                           </div>
//                         </td>
//                         <td>
//                           <Badge
//                             bg={getYearColor(course.year)}
//                             className="px-3 py-2"
//                           >
//                             Year {course.year}
//                           </Badge>
//                         </td>
//                         <td className="text-end pe-4">
//                           <Button
//                             variant="outline-primary"
//                             size="sm"
//                             className="me-2"
//                             onClick={() => openModal("edit", course)}
//                           >
//                             <Edit2 size={14} />
//                           </Button>
//                           <Button
//                             variant="outline-danger"
//                             size="sm"
//                             onClick={() => openModal("delete", course)}
//                           >
//                             <Trash2 size={14} />
//                           </Button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="5" className="text-center py-5">
//                         <div className="text-muted">
//                           <BookOpen size={48} className="mb-3" />
//                           <h5>No courses found</h5>
//                           <p>Try adjusting your filters or add a new course</p>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </Table>
//             </div>
//           )}
//         </Card.Body>
//       </Card>

//       {/* Universal Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         {modalType === "delete" ? (
//           <>
//             <Modal.Header closeButton className="border-0 pb-0">
//               <Modal.Title className="h5">Delete Course</Modal.Title>
//             </Modal.Header>
//             <Modal.Body className="py-4">
//               <div className="text-center mb-4">
//                 <div className="bg-danger bg-opacity-10 p-3 rounded-circle d-inline-block mb-3">
//                   <Trash2 size={32} className="text-danger" />
//                 </div>
//                 <h5>Confirm Deletion</h5>
//                 <p className="text-muted">
//                   Are you sure you want to delete{" "}
//                   <strong>{selectedCourse?.courseName}</strong> (
//                   {selectedCourse?.department})?
//                 </p>
//                 <p className="text-danger small">
//                   This action cannot be undone.
//                 </p>
//               </div>
//             </Modal.Body>
//             <Modal.Footer className="border-0">
//               <Button
//                 variant="light"
//                 onClick={() => setShowModal(false)}
//                 className="px-4"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 variant="danger"
//                 onClick={handleDelete}
//                 className="px-4"
//               >
//                 Delete Course
//               </Button>
//             </Modal.Footer>
//           </>
//         ) : (
//           <>
//             <Modal.Header closeButton className="border-0 pb-0">
//               <Modal.Title className="h5">Edit Course</Modal.Title>
//             </Modal.Header>
//             <Modal.Body className="py-4">
//               <Form>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Department</Form.Label>
//                   <Form.Select
//                     value={editForm.department}
//                     onChange={(e) =>
//                       setEditForm({ ...editForm, department: e.target.value })
//                     }
//                   >
//                     <option value="">Select Department</option>
//                     {departmentOptions.map((dept) => (
//                       <option key={dept} value={dept}>
//                         {dept}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Course Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={editForm.courseName}
//                     onChange={(e) =>
//                       setEditForm({ ...editForm, courseName: e.target.value })
//                     }
//                     placeholder="Enter course name"
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Year</Form.Label>
//                   <Form.Select
//                     value={editForm.year}
//                     onChange={(e) =>
//                       setEditForm({ ...editForm, year: parseInt(e.target.value) })
//                     }
//                   >
//                     {yearOptions.map((year) => (
//                       <option key={year} value={year}>
//                         Year {year}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Groups</Form.Label>
//                   <InputGroup className="mb-2">
//                     <Form.Control
//                       placeholder="Add group (e.g., A, B, C)"
//                       value={newGroup}
//                       onChange={(e) => setNewGroup(e.target.value)}
//                       onKeyPress={(e) => e.key === "Enter" && handleAddGroup()}
//                     />
//                     <Button variant="outline-primary" onClick={handleAddGroup}>
//                       Add
//                     </Button>
//                   </InputGroup>
//                   <div className="d-flex flex-wrap gap-2">
//                     {editForm.groups.map((group, idx) => (
//                       <Badge
//                         key={idx}
//                         bg="light"
//                         text="dark"
//                         className="border d-flex align-items-center"
//                       >
//                         {group}
//                         <button
//                           type="button"
//                           className="btn-close btn-close-sm ms-1"
//                           onClick={() => handleRemoveGroup(group)}
//                           style={{ fontSize: "0.5rem" }}
//                         />
//                       </Badge>
//                     ))}
//                   </div>
//                 </Form.Group>
//               </Form>
//             </Modal.Body>
//             <Modal.Footer className="border-0">
//               <Button
//                 variant="light"
//                 onClick={() => setShowModal(false)}
//                 className="px-4"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 variant="primary"
//                 onClick={handleEditSave}
//                 className="px-4"
//               >
//                 Save Changes
//               </Button>
//             </Modal.Footer>
//           </>
//         )}
//       </Modal>
//     </Container>
//   );
// }; 

// export default CourseManagement; 



import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Badge,
  Form,
  Modal,
  InputGroup,
  Spinner,
  Alert,
  Pagination,
  Dropdown
} from "react-bootstrap";
import {
  Search,
  Plus,
  Trash2,
  Filter,
  Calendar,
  Building,
  Award,
  Download,
  FileText,
  XCircle,
   ChevronLeft,
  ChevronRight
} from "react-bootstrap-icons";
import { ChevronsLeft,ChevronsRight, } from "lucide-react";

import {
  BookOpen,
  Users,
  Edit2,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const API = "http://localhost:5000/api/course";

const CourseManagement = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "edit" or "delete"
  const [selectedCourse, setSelectedCourse] = useState(null);
  
  // Form state for editing
  const [editForm, setEditForm] = useState({
    department: "",
    courseName: "",
    year: 1,
    groups: []
  });
  const [editErrors, setEditErrors] = useState({});
  const [newGroup, setNewGroup] = useState("");
  
  // Filters
  const [filters, setFilters] = useState({
    search: "",
    department: "",
    year: ""
  });

  // Debounce state for search
  const [searchTerm, setSearchTerm] = useState("");
  
  // Department options
  const departmentOptions = ["CA", "CS", "IT", "EC", "ME", "CE", "EE"];
  const yearOptions = [1, 2, 3, 4, 5];

  /* ================= FETCH COURSES ================= */
  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(API, { withCredentials: true });
      setCourses(res.data.courses || []);
    } catch (err) {
      console.error("Fetch courses error:", err);
      setError("Failed to load courses. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  /* ================= SEARCH & FILTERING ================= */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: searchTerm }));
    }, 300); // 300ms debounce delay

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  useEffect(() => {
    let temp = [...courses];

    if (filters.search.trim()) {
      const searchTerm = filters.search.toLowerCase();
      temp = temp.filter(c =>
        c.courseName.toLowerCase().includes(searchTerm) ||
        c.department.toLowerCase().includes(searchTerm) ||
        (c.groups && c.groups.some(g => g.toLowerCase().includes(searchTerm)))
      );
    }

    if (filters.department) {
      temp = temp.filter(c => c.department === filters.department);
    }

    if (filters.year) {
      temp = temp.filter(c => c.year === Number(filters.year));
    }

    setFilteredCourses(temp);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, courses]);

  /* ================= PAGINATION CALCULATIONS ================= */
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = useMemo(() => 
    filteredCourses.slice(startIndex, endIndex),
    [filteredCourses, startIndex, endIndex]
  );

  const paginationItems = useMemo(() => {
    const items = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // First page
    if (startPage > 1) {
      items.push(
        <Pagination.Item key={1} onClick={() => setCurrentPage(1)}>
          1
        </Pagination.Item>
      );
      if (startPage > 2) {
        items.push(<Pagination.Ellipsis key="ellipsis-start" disabled />);
      }
    }

    // Visible pages
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<Pagination.Ellipsis key="ellipsis-end" disabled />);
      }
      items.push(
        <Pagination.Item
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    return items;
  }, [currentPage, totalPages]);

  /* ================= VALIDATION ================= */
  const validateEditForm = () => {
    const errors = {};
    
    if (!editForm.department.trim()) {
      errors.department = "Department is required";
    }
    
    if (!editForm.courseName.trim()) {
      errors.courseName = "Course name is required";
    } else if (editForm.courseName.length < 3) {
      errors.courseName = "Course name must be at least 3 characters";
    }
    
    if (!editForm.year || editForm.year < 1 || editForm.year > 5) {
      errors.year = "Please select a valid year (1-5)";
    }
    
    // Check for duplicate groups
    const uniqueGroups = [...new Set(editForm.groups)];
    if (uniqueGroups.length !== editForm.groups.length) {
      errors.groups = "Duplicate groups are not allowed";
    }
    
    setEditErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /* ================= HANDLERS ================= */
  const handleAddCourse = () => navigate("/superadmin/courses/add");

  const openModal = (type, course) => {
    setModalType(type);
    setSelectedCourse(course);
    setEditErrors({});
    
    if (type === "edit") {
      setEditForm({
        department: course.department,
        courseName: course.courseName,
        year: course.year,
        groups: [...(course.groups || [])]
      });
    }
    
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`${API}/${selectedCourse._id}`, {
        withCredentials: true
      });
      await fetchCourses();
      setShowModal(false);
    } catch (err) {
      console.error("Delete error:", err);
      setError(`Failed to delete course: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSave = async () => {
    if (!validateEditForm()) {
      return;
    }
    
    try {
      setLoading(true);
      await axios.put(
        `${API}/${selectedCourse._id}`,
        {
          ...editForm,
          groups: editForm.groups.filter(g => g.trim() !== "")
        },
        { withCredentials: true }
      );
      await fetchCourses();
      setShowModal(false);
    } catch (err) {
      console.error("Edit error:", err);
      setError(`Failed to update course: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGroup = () => {
    const trimmedGroup = newGroup.trim().toUpperCase();
    
    if (!trimmedGroup) {
      setEditErrors(prev => ({ ...prev, groups: "Group name cannot be empty" }));
      return;
    }
    
    if (editForm.groups.includes(trimmedGroup)) {
      setEditErrors(prev => ({ ...prev, groups: "Group already exists" }));
      return;
    }
    
    if (trimmedGroup.length > 5) {
      setEditErrors(prev => ({ ...prev, groups: "Group name too long (max 5 chars)" }));
      return;
    }
    
    setEditForm({
      ...editForm,
      groups: [...editForm.groups, trimmedGroup]
    });
    setNewGroup("");
    setEditErrors(prev => ({ ...prev, groups: null }));
  };

  const handleRemoveGroup = (groupToRemove) => {
    setEditForm({
      ...editForm,
      groups: editForm.groups.filter(g => g !== groupToRemove)
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddGroup();
    }
  };

  /* ================= DOWNLOAD FUNCTIONS ================= */
  const downloadCSV = () => {
    const headers = ["Department", "Course Name", "Year", "Groups", "Created At"];
    const csvContent = [
      headers.join(","),
      ...filteredCourses.map(course => [
        course.department,
        `"${course.courseName.replace(/"/g, '""')}"`,
        course.year,
        `"${(course.groups || []).join(', ')}"`,
        new Date(course.createdAt).toLocaleDateString()
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `courses_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadJSON = () => {
    const data = filteredCourses.map(course => ({
      ...course,
      createdAt: new Date(course.createdAt).toISOString()
    }));
    
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `courses_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getDepartmentColor = (dept) => {
    const colorMap = {
      CA: "primary",
      CS: "info",
      IT: "success",
      EC: "warning",
      ME: "danger",
      CE: "secondary",
      EE: "dark"
    };
    return colorMap[dept] || "light";
  };

  const getYearColor = (year) => {
    const colors = ["primary", "success", "warning", "danger", "info"];
    return colors[year - 1] || "secondary";
  };

  return (
    <Container fluid className="py-4 px-4">
      {/* Header */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="p-4">
          <Row className="align-items-center">
            <Col md={6}>
              <div className="d-flex align-items-center">
                <div className="border-start border-4 border-primary ps-3">
                  <h1 className="h3 fw-bold mb-1">Campus Quest</h1>
                  <h2 className="h5 text-muted mb-0">Course Management System</h2>
                </div>
              </div>
            </Col>
            <Col md={6} className="text-md-end">
              <div className="d-flex align-items-center justify-content-end gap-3">
                <Badge bg="light" text="dark" className="p-2 border">
                  <Award size={16} className="me-2" />
                  {courses.length} Courses Registered
                </Badge>
                
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="download-dropdown">
                    <Download size={16} className="me-2" />
                    Download
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={downloadCSV}>
                      <FileText size={14} className="me-2" />
                      Download as CSV
                    </Dropdown.Item>
                    <Dropdown.Item onClick={downloadJSON}>
                      <FileText size={14} className="me-2" />
                      Download as JSON
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Stats and Action Bar */}
      <Row className="mb-4">
        <Col lg={8}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <Row className="g-3">
                <Col md={4}>
                  <div className="d-flex align-items-center">
                    <div className="bg-primary bg-opacity-10 p-3 rounded me-3">
                      <Building size={24} className="text-primary" />
                    </div>
                    <div>
                      <h6 className="mb-0 text-muted">Departments</h6>
                      <h4 className="mb-0 fw-bold">
                        {[...new Set(courses.map(c => c.department))].length}
                      </h4>
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="d-flex align-items-center">
                    <div className="bg-success bg-opacity-10 p-3 rounded me-3">
                      <BookOpen size={24} className="text-success" />
                    </div>
                    <div>
                      <h6 className="mb-0 text-muted">Total Courses</h6>
                      <h4 className="mb-0 fw-bold">{filteredCourses.length}</h4>
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="d-flex align-items-center">
                    <div className="bg-info bg-opacity-10 p-3 rounded me-3">
                      <Users size={24} className="text-info" />
                    </div>
                    <div>
                      <h6 className="mb-0 text-muted">Active Groups</h6>
                      <h4 className="mb-0 fw-bold">
                        {courses.reduce((acc, curr) => acc + (curr.groups?.length || 0), 0)}
                      </h4>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Button
            variant="primary"
            size="lg"
            className="w-100 h-100 py-3"
            onClick={handleAddCourse}
          >
            <Plus size={20} className="me-2" />
            Add New Course
          </Button>
        </Col>
      </Row>

      {/* Filters */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="p-4">
          <Row className="g-3 align-items-end">
            <Col lg={4}>
              <Form.Label className="fw-semibold">
                <Search size={16} className="me-2" />
                Search Courses
              </Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Search by course, department, or group..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search courses"
                />
                {searchTerm && (
                  <Button
                    variant="outline-secondary"
                    onClick={() => setSearchTerm("")}
                    title="Clear search"
                  >
                    <XCircle size={16} />
                  </Button>
                )}
              </InputGroup>
              <Form.Text className="text-muted">
                Search in course names, departments, and groups
              </Form.Text>
            </Col>
            
            <Col lg={3}>
              <Form.Label className="fw-semibold">
                <Filter size={16} className="me-2" />
                Department
              </Form.Label>
              <Form.Select
                value={filters.department}
                onChange={(e) =>
                  setFilters({ ...filters, department: e.target.value })
                }
                aria-label="Filter by department"
              >
                <option value="">All Departments</option>
                {departmentOptions.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </Form.Select>
            </Col>
            
            <Col lg={3}>
              <Form.Label className="fw-semibold">
                <Calendar size={16} className="me-2" />
                Year
              </Form.Label>
              <Form.Select
                value={filters.year}
                onChange={(e) =>
                  setFilters({ ...filters, year: e.target.value })
                }
                aria-label="Filter by year"
              >
                <option value="">All Years</option>
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    Year {year}
                  </option>
                ))}
              </Form.Select>
            </Col>
            
            <Col lg={2}>
              <Button
                variant="outline-secondary"
                className="w-100"
                onClick={() => {
                  setFilters({ search: "", department: "", year: "" });
                  setSearchTerm("");
                }}
              >
                Clear Filters
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert variant="danger" className="mb-4" dismissible onClose={() => setError(null)}>
          <AlertCircle size={16} className="me-2" />
          {error}
        </Alert>
      )}

      {/* Courses Table */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="p-0">
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3 text-muted">Loading courses...</p>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-4">Department</th>
                      <th>Course</th>
                      <th>Groups</th>
                      <th>Year</th>
                      <th className="text-end pe-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCourses.length > 0 ? (
                      currentCourses.map((course) => (
                        <tr key={course._id} className="align-middle">
                          <td className="ps-4">
                            <Badge
                              bg={getDepartmentColor(course.department)}
                              className="px-3 py-2"
                            >
                              <Building size={14} className="me-2" />
                              {course.department}
                            </Badge>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="bg-light rounded p-2 me-3">
                                <BookOpen size={18} className="text-primary" />
                              </div>
                              <div>
                                <h6 className="mb-0">{course.courseName}</h6>
                                <small className="text-muted">
                                  Created: {new Date(course.createdAt).toLocaleDateString()}
                                </small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex flex-wrap gap-1">
                              {course.groups && course.groups.length > 0 ? (
                                course.groups.map((group, idx) => (
                                  <Badge
                                    key={idx}
                                    bg="light"
                                    text="dark"
                                    className="border"
                                  >
                                    <Users size={12} className="me-1" />
                                    {group}
                                  </Badge>
                                ))
                              ) : (
                                <span className="text-muted">No groups</span>
                              )}
                            </div>
                          </td>
                          <td>
                            <Badge
                              bg={getYearColor(course.year)}
                              className="px-3 py-2"
                            >
                              Year {course.year}
                            </Badge>
                          </td>
                          <td className="text-end pe-4">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="me-2"
                              onClick={() => openModal("edit", course)}
                              title="Edit course"
                            >
                              <Edit2 size={14} />
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => openModal("delete", course)}
                              title="Delete course"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-5">
                          <div className="text-muted">
                            <BookOpen size={48} className="mb-3" />
                            <h5>No courses found</h5>
                            <p>Try adjusting your filters or add a new course</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>

              {/* Pagination Controls */}
              {filteredCourses.length > 0 && (
                <div className="border-top px-4 py-3">
                  <Row className="align-items-center">
                    <Col md={4}>
                      <div className="d-flex align-items-center">
                        <span className="text-muted me-2">Show:</span>
                        <Form.Select
                          size="sm"
                          style={{ width: "auto" }}
                          value={itemsPerPage}
                          onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                          }}
                        >
                          <option value={5}>5 per page</option>
                          <option value={10}>10 per page</option>
                          <option value={25}>25 per page</option>
                          <option value={50}>50 per page</option>
                        </Form.Select>
                      </div>
                    </Col>
                    <Col md={4} className="text-center">
                      <span className="text-muted">
                        Showing {startIndex + 1} to {Math.min(endIndex, filteredCourses.length)} of {filteredCourses.length} courses
                      </span>
                    </Col>
                    <Col md={4}>
                      <div className="d-flex justify-content-end">
                        <Pagination className="mb-0">
                          <Pagination.First
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                          >
                            <ChevronsLeft size={14} />
                          </Pagination.First>
                          <Pagination.Prev
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                          >
                            <ChevronLeft size={14} />
                          </Pagination.Prev>
                          {paginationItems}
                          <Pagination.Next
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                          >
                            <ChevronRight size={14} />
                          </Pagination.Next>
                          <Pagination.Last
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                          >
                            <ChevronsRight size={14} />
                          </Pagination.Last>
                        </Pagination>
                      </div>
                    </Col>
                  </Row>
                </div>
              )}
            </>
          )}
        </Card.Body>
      </Card>

      {/* Universal Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size={modalType === "edit" ? "lg" : "md"}>
        {modalType === "delete" ? (
          <>
            <Modal.Header closeButton className="border-0 pb-0">
              <Modal.Title className="h5">Delete Course</Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-4">
              <div className="text-center mb-4">
                <div className="bg-danger bg-opacity-10 p-3 rounded-circle d-inline-block mb-3">
                  <Trash2 size={32} className="text-danger" />
                </div>
                <h5>Confirm Deletion</h5>
                <p className="text-muted">
                  Are you sure you want to delete{" "}
                  <strong>{selectedCourse?.courseName}</strong> (
                  {selectedCourse?.department})?
                </p>
                <div className="alert alert-warning small mt-3">
                  <strong>Warning:</strong> This will permanently delete the course and all associated data.
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="border-0">
              <Button
                variant="light"
                onClick={() => setShowModal(false)}
                className="px-4"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleDelete}
                className="px-4"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Deleting...
                  </>
                ) : (
                  "Delete Course"
                )}
              </Button>
            </Modal.Footer>
          </>
        ) : (
          <>
            <Modal.Header closeButton className="border-0 pb-0">
              <Modal.Title className="h5">Edit Course</Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-4">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Department</Form.Label>
                  <Form.Select
                    value={editForm.department}
                    onChange={(e) =>
                      setEditForm({ ...editForm, department: e.target.value })
                    }
                    isInvalid={!!editErrors.department}
                  >
                    <option value="">Select Department</option>
                    {departmentOptions.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {editErrors.department}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    Course Name
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={editForm.courseName}
                    onChange={(e) =>
                      setEditForm({ ...editForm, courseName: e.target.value })
                    }
                    placeholder="Enter course name"
                    isInvalid={!!editErrors.courseName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {editErrors.courseName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    Year
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    value={editForm.year}
                    onChange={(e) =>
                      setEditForm({ ...editForm, year: parseInt(e.target.value) })
                    }
                    isInvalid={!!editErrors.year}
                  >
                    {yearOptions.map((year) => (
                      <option key={year} value={year}>
                        Year {year}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {editErrors.year}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold d-flex justify-content-between align-items-center">
                    <span>Groups</span>
                    <Badge bg="light" text="dark" className="border">
                      {editForm.groups.length} groups
                    </Badge>
                  </Form.Label>
                  
                  <InputGroup className="mb-2">
                    <Form.Control
                      placeholder="Add group (e.g., A, B, C)"
                      value={newGroup}
                      onChange={(e) => setNewGroup(e.target.value)}
                      onKeyPress={handleKeyPress}
                      maxLength={5}
                      isInvalid={!!editErrors.groups}
                    />
                    <Button 
                      variant="outline-primary" 
                      onClick={handleAddGroup}
                      disabled={!newGroup.trim()}
                    >
                      Add
                    </Button>
                  </InputGroup>
                  
                  {editErrors.groups && (
                    <div className="text-danger small mb-2">
                      <AlertCircle size={12} className="me-1" />
                      {editErrors.groups}
                    </div>
                  )}
                  
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {editForm.groups.length > 0 ? (
                      editForm.groups.map((group, idx) => (
                        <Badge
                          key={idx}
                          bg="light"
                          text="dark"
                          className="border d-flex align-items-center py-2 px-3"
                        >
                          <Users size={12} className="me-2" />
                          {group}
                          <button
                            type="button"
                            className="btn-close btn-close-sm ms-2"
                            onClick={() => handleRemoveGroup(group)}
                            aria-label={`Remove group ${group}`}
                            style={{ fontSize: "0.5rem" }}
                          />
                        </Badge>
                      ))
                    ) : (
                      <div className="text-muted small">
                        No groups added. Add groups for this course.
                      </div>
                    )}
                  </div>
                  
                  <Form.Text className="text-muted">
                    Press Enter or click Add to add groups. Groups are automatically converted to uppercase.
                  </Form.Text>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer className="border-0">
              <Button
                variant="light"
                onClick={() => setShowModal(false)}
                className="px-4"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleEditSave}
                className="px-4"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} className="me-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
};

export default CourseManagement;



