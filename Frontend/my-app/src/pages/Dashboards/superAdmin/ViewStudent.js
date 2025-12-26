

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewStudent.css";

const ViewStudent = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const navigate = useNavigate();

  // ✅ Fetch students on load
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/students", {
        method: "GET",
        credentials: "include", // send cookies
      });

      if (!res.ok) {
        if (res.status === 401) {
          navigate("/login"); // unauthorized → go to login
          return;
        }
        const data = await res.json();
        setError(data.msg || data.message || "Failed to fetch students");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setStudents(Array.isArray(data) ? data : data.students || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Server error");
      setLoading(false);
    }
  };

  // ✅ Delete student
  const handleDelete = async (id, name) => {
    try {
      const res = await fetch(`http://localhost:5000/students/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.msg || data.message || "Failed to delete student");
        return;
      }

      setStudents((prev) => prev.filter((s) => s._id !== id));
      setDeleteConfirm(null);
      alert(`✅ Student "${name}" deleted successfully`);
    } catch (err) {
      console.error(err);
      alert("❌ Server error while deleting student");
    }
  };

  const confirmDelete = (id, name) => setDeleteConfirm({ id, name });
  const cancelDelete = () => setDeleteConfirm(null);

  const handleEdit = (id) => navigate(`/students/edit/${id}`);

  // ✅ Filter + Sort
  const filtered = students
    .filter((s) =>
      `${s.name} ${s.studentId} ${s.email} ${s.group} ${s.course}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  // ✅ Group by course
  const groupedByCourse = filtered.reduce((acc, student) => {
    acc[student.course] = acc[student.course] || [];
    acc[student.course].push(student);
    return acc;
  }, {});

  if (loading)
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading students...</p>
      </div>
    );

  if (error) return <p className="status-text error">{error}</p>;

  return (
    <div className="student-page">
      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Confirm Deletion</h3>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to delete student{" "}
                <strong>{deleteConfirm.name}</strong>? This action cannot be
                undone.
              </p>
            </div>
            <div className="modal-actions">
              <button className="modal-cancel-btn" onClick={cancelDelete}>
                Cancel
              </button>
              <button
                className="modal-confirm-btn"
                onClick={() =>
                  handleDelete(deleteConfirm.id, deleteConfirm.name)
                }
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="student-header">
        <div className="header-content">
          <h1 className="page-title">Student Management</h1>
          <p className="page-subtitle">
            View and manage all registered students ({students.length} total)
          </p>
        </div>
        <button
          className="add-btn"
          onClick={() => navigate("/students/signup")}
        >
          <span className="btn-icon">+</span> Add New Student
        </button>
      </div>

      {/* CONTROLS */}
      <div className="student-controls">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, email, course, group, or student ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="control-actions">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Name (A → Z)</option>
            <option value="desc">Name (Z → A)</option>
          </select>

          <button onClick={fetchStudents} title="Refresh list">
            Refresh
          </button>
        </div>
      </div>

      {/* COURSE SECTIONS */}
      {Object.keys(groupedByCourse).length === 0 ? (
        <div className="empty-state">
          <h3>No students found</h3>
          <p>Try adjusting your search or add a new student.</p>
        </div>
      ) : (
        <div className="course-sections">
          {Object.keys(groupedByCourse).map((course) => (
            <div key={course} className="course-card">
              <div
                className="course-header"
                onClick={() =>
                  setExpandedCourse(expandedCourse === course ? null : course)
                }
              >
                <h3>{course}</h3>
                <span>{groupedByCourse[course].length} students</span>
              </div>
              {expandedCourse === course && (
                <table className="student-table">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Name</th>
                      <th>Student ID</th>
                      <th>Email</th>
                      <th>Course</th>
                      <th>Group</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedByCourse[course].map((s, i) => (
                      <tr key={s._id}>
                        <td>{i + 1}</td>
                        <td>{s.name}</td>
                        <td>{s.studentId || "—"}</td>
                        <td>{s.email}</td>
                        <td>{s.course}</td>
                        <td>{s.group || "—"}</td>
                        <td>
                          <button onClick={() => handleEdit(s._id)}>Edit</button>
                          <button onClick={() => confirmDelete(s._id, s.name)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
        </div>
      )}

      {/* FOOTER */}
      <div className="student-footer">
        <p>
          Showing <strong>{filtered.length}</strong> of{" "}
          <strong>{students.length}</strong> students across{" "}
          <strong>{Object.keys(groupedByCourse).length}</strong> courses
        </p>
      </div>
    </div>
  );
};

export default ViewStudent;
