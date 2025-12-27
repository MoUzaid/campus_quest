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
import {
  PlusCircle,
  ArrowLeft,
  CheckCircle,
  Building,
  Calendar,
  People,
  Book,
  Award
} from "react-bootstrap-icons";

import { useCreateCourseMutation } from "../../../redux/services/coursesApi";
import { useGetAllDepartmentsQuery } from "../../../redux/services/departmentApi";

import "./AddCourse.css";

/* ================= CONSTANTS ================= */

const GROUPS = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i)
);

const COMMON_COURSES = [
  "BCA", "MCA", "B.Tech", "M.Tech", "B.Sc", "M.Sc",
  "BBA", "MBA", "BE", "ME", "B.Com", "M.Com", "BA", "MA"
];

/* ================= COMPONENT ================= */

const AddCourse = () => {
  const navigate = useNavigate();

  /* ===== API HOOKS ===== */
  const [createCourse, { isLoading }] = useCreateCourseMutation();
  const { data: departments, isLoading: departmentsLoading } =
    useGetAllDepartmentsQuery();

  /* ===== DERIVED DATA ===== */
  const departmentList =
    departments?.data?.[0]?.departmentNames || [];

  /* ===== LOCAL STATE ===== */
  const [formData, setFormData] = useState({
    department: "",
    courseName: "",
    year: "",
    groups: []
  });

  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [courseSearch, setCourseSearch] = useState("");

  /* ================= HELPERS ================= */

  const filteredCourses = COMMON_COURSES.filter((c) =>
    c.toLowerCase().includes(courseSearch.toLowerCase())
  );

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
    if (!formData.courseName) return "Please enter course name";
    if (!formData.year) return "Please select academic year";
    if (formData.groups.length === 0) return "Please select at least one group";
    return null;
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const payload = {
      courseName: formData.courseName.toUpperCase(),
      department: formData.department,
      year: Number(formData.year),
      groups: formData.groups
    };

    try {
      await createCourse(payload).unwrap();
      setSuccess("Course created successfully!");

      setTimeout(() => {
        setFormData({
          department: "",
          courseName: "",
          year: "",
          groups: []
        });
        setStep(1);
      }, 1500);
    } catch (err) {
      setError(err?.data?.message || "Failed to create course");
    }
  };

  const progress = (step / 4) * 100;

  /* ================= UI ================= */

  return (
    <Container fluid className="add-course-page p-0">
      {/* HEADER */}
      <div className="page-header">
        <div className="header-overlay">
          <Container>
            <Row className="align-items-center py-4">
              <Col xs="auto">
                <Button
                  variant="light"
                  onClick={() => navigate("/superadmin/courses")}
                  className="rounded-circle p-2"
                >
                  <ArrowLeft />
                </Button>
              </Col>
              <Col>
                <h1 className="text-white mb-0">
                  Add Course <span className="fw-light">CampusQuest</span>
                </h1>
                <p className="text-white-50 mb-0">
                  Expand academic offerings
                </p>
              </Col>
              <Col xs="auto">
                <Badge bg="light" text="dark">
                  <PlusCircle className="me-2" />
                  New Course
                </Badge>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      {/* PROGRESS */}
      <Container className="mt-4">
        <ProgressBar now={progress} />
      </Container>

      {/* ALERTS */}
      <Container className="mt-4">
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
      </Container>

      {/* FORM */}
      <Container className="mt-3">
        <Card className="shadow-lg border-0">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              {/* ================= STEP 1 ================= */}
              {step === 1 && (
                <>
                  <h4 className="mb-3">
                    <Building /> Select Department
                  </h4>

                  {departmentsLoading ? (
                    <Spinner animation="border" />
                  ) : (
                    <Form.Select
                      value={formData.department}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          department: e.target.value
                        })
                      }
                      required
                    >
                      <option value="">Select Department</option>
                      {departmentList.map((dept, idx) => (
                        <option key={idx} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </Form.Select>
                  )}

                  <Button
                    className="mt-3"
                    disabled={!formData.department}
                    onClick={() => setStep(2)}
                  >
                    Continue
                  </Button>
                </>
              )}

              {/* ================= STEP 2 ================= */}
              {step === 2 && (
                <>
                  <h4 className="mb-3">
                    <Book /> Course Name
                  </h4>

                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Search course"
                      value={courseSearch}
                      onChange={(e) => setCourseSearch(e.target.value)}
                    />
                  </InputGroup>

                  {filteredCourses.map((c) => (
                    <Button
                      key={c}
                      className="me-2 mb-2"
                      onClick={() => {
                        setFormData({ ...formData, courseName: c });
                        setStep(3);
                      }}
                    >
                      {c}
                    </Button>
                  ))}

                  <Form.Control
                    className="mt-3"
                    placeholder="Custom course name"
                    value={formData.courseName}
                    onChange={(e) =>
                      setFormData({ ...formData, courseName: e.target.value })
                    }
                  />
                </>
              )}

              {/* ================= STEP 3 ================= */}
              {step === 3 && (
                <>
                  <h4 className="mb-3">
                    <People /> Select Groups
                  </h4>

                  {GROUPS.map((g) => (
                    <Badge
                      key={g}
                      bg={formData.groups.includes(g) ? "primary" : "light"}
                      text={formData.groups.includes(g) ? "light" : "dark"}
                      className="me-2 mb-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => toggleGroup(g)}
                    >
                      {g}
                    </Badge>
                  ))}

                  <Button
                    className="d-block mt-3"
                    onClick={() => setStep(4)}
                  >
                    Continue
                  </Button>
                </>
              )}

              {/* ================= STEP 4 ================= */}
              {step === 4 && (
                <>
                  <h4 className="mb-3">
                    <Calendar /> Academic Year
                  </h4>

                  {[1, 2, 3, 4, 5].map((y) => (
                    <Button
                      key={y}
                      className="me-2 mb-2"
                      variant={
                        formData.year === y ? "success" : "outline-success"
                      }
                      onClick={() =>
                        setFormData({ ...formData, year: y })
                      }
                    >
                      Year {y}
                    </Button>
                  ))}

                  <Button
                    type="submit"
                    className="d-block mt-4"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Spinner size="sm" className="me-2" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <PlusCircle className="me-2" />
                        Create Course
                      </>
                    )}
                  </Button>
                </>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Container>
  );
};

export default AddCourse;
