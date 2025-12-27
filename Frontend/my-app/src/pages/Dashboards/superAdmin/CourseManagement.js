import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  Alert
} from "react-bootstrap";
import {
  Search,
  Plus,
  Trash2,
  Filter,
  Calendar,
  Building,
  Award
} from "react-bootstrap-icons";
import { BookOpen, Users, Edit2 } from "lucide-react";

import {
  fetchCoursesStart,
  fetchCoursesSuccess,
  fetchCoursesFailure,
} from "../../../redux/features/courseSlice";

import {
  useGetAllCoursesQuery,
  useDeleteCourseByIdMutation,
  useUpdateCourseByIdMutation,
} from "../../../redux/services/coursesApi";

const CourseManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* ================= REDUX STATE ================= */
  const { courses, loading, error } = useSelector(
    (state) => state.course
  );

  /* ================= API HOOKS ================= */
  const { data, isLoading, isError } = useGetAllCoursesQuery();
  const [deleteCourse] = useDeleteCourseByIdMutation();
  const [updateCourse] = useUpdateCourseByIdMutation();

  /* ================= LOCAL UI STATE ================= */
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [editForm, setEditForm] = useState({
    department: "",
    courseName: "",
    year: 1,
    groups: [],
  });

  const [newGroup, setNewGroup] = useState("");

  const [filters, setFilters] = useState({
    search: "",
    department: "",
    year: "",
  });

  /* ================= FETCH COURSES ================= */
  useEffect(() => {
    dispatch(fetchCoursesStart());

    if (data?.courses) {
      dispatch(fetchCoursesSuccess(data.courses));
      setFilteredCourses(data.courses);
    }

    if (isError) {
      dispatch(fetchCoursesFailure("Failed to load courses"));
    }
  }, [data, isError, dispatch]);

  /* ================= FILTERING ================= */
  useEffect(() => {
    let temp = [...courses];

    if (filters.search) {
      const term = filters.search.toLowerCase();
      temp = temp.filter(
        (c) =>
          c.courseName.toLowerCase().includes(term) ||
          c.department.toLowerCase().includes(term)
      );
    }

    if (filters.department) {
      temp = temp.filter((c) => c.department === filters.department);
    }

    if (filters.year) {
      temp = temp.filter((c) => c.year === Number(filters.year));
    }

    setFilteredCourses(temp);
  }, [filters, courses]);

  /* ================= HANDLERS ================= */
  const handleAddCourse = () => navigate("/superadmin/courses/add");

  const openModal = (type, course) => {
    setModalType(type);
    setSelectedCourse(course);

    if (type === "edit") {
      setEditForm({
        department: course.department,
        courseName: course.courseName,
        year: course.year,
        groups: [...(course.groups || [])],
      });
    }

    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteCourse(selectedCourse._id).unwrap();
      setShowModal(false);
    } catch {
      dispatch(fetchCoursesFailure("Failed to delete course"));
    }
  };

  const handleEditSave = async () => {
    try {
      await updateCourse({
        courseId: selectedCourse._id,
        data: editForm,
      }).unwrap();
      setShowModal(false);
    } catch {
      dispatch(fetchCoursesFailure("Failed to update course"));
    }
  };

  const handleAddGroup = () => {
    if (
      newGroup.trim() &&
      !editForm.groups.includes(newGroup.toUpperCase())
    ) {
      setEditForm({
        ...editForm,
        groups: [...editForm.groups, newGroup.toUpperCase()],
      });
      setNewGroup("");
    }
  };

  const handleRemoveGroup = (group) => {
    setEditForm({
      ...editForm,
      groups: editForm.groups.filter((g) => g !== group),
    });
  };

  /* ================= UI ================= */
  return (
    <Container fluid className="py-4 px-4">
      {/* HEADER */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Row>
            <Col>
              <h3 className="fw-bold">Course Management</h3>
            </Col>
            <Col className="text-end">
              <Button onClick={handleAddCourse}>
                <Plus className="me-2" />
                Add Course
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* ERROR */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* TABLE */}
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          {loading || isLoading ? (
            <div className="text-center py-5">
              <Spinner animation="border" />
            </div>
          ) : (
            <Table hover>
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Course</th>
                  <th>Groups</th>
                  <th>Year</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course) => (
                  <tr key={course._id}>
                    <td>
                      <Badge>{course.department}</Badge>
                    </td>
                    <td>{course.courseName}</td>
                    <td>{course.groups?.join(", ")}</td>
                    <td>Year {course.year}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={() => openModal("edit", course)}
                      >
                        <Edit2 size={14} />
                      </Button>{" "}
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => openModal("delete", course)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        {modalType === "delete" ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Delete Course</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <Button onClick={() => setShowModal(false)}>Cancel</Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </>
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Edit Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Control
                className="mb-2"
                value={editForm.courseName}
                onChange={(e) =>
                  setEditForm({ ...editForm, courseName: e.target.value })
                }
              />
              <Form.Control
                className="mb-2"
                value={newGroup}
                onChange={(e) => setNewGroup(e.target.value)}
                placeholder="Add group"
              />
              <Button onClick={handleAddGroup}>Add Group</Button>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setShowModal(false)}>Cancel</Button>
              <Button onClick={handleEditSave}>Save</Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
};

export default CourseManagement;
