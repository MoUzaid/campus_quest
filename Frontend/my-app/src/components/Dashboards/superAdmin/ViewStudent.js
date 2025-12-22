// import React, { useEffect, useState } from "react";
// import "./ViewStudent.css";

// const ViewStudent = () => {
//   const [students, setStudents] = useState([]);
//   const [search, setSearch] = useState("");
//   const [expandedCourse, setExpandedCourse] = useState(null);
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/students", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       const data = await res.json();
//       setStudents(Array.isArray(data) ? data : data.students || []);
//       setLoading(false);
//     } catch {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id, name) => {
//     if (!window.confirm(`Delete student ${name}?`)) return;

//     try {
//       const res = await fetch(`http://localhost:5000/students/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       if (res.ok) {
//         setStudents((prev) => prev.filter((s) => s._id !== id));
//       }
//     } catch {}
//   };

//   /* ---------- FILTER + SORT ---------- */
//   const filtered = students
//     .filter((s) =>
//       `${s.name} ${s.studentId} ${s.email} ${s.group}`
//         .toLowerCase()
//         .includes(search.toLowerCase())
//     )
//     .sort((a, b) =>
//       sortOrder === "asc"
//         ? a.name.localeCompare(b.name)
//         : b.name.localeCompare(a.name)
//     );

//   /* ---------- GROUP BY COURSE ---------- */
//   const groupedByCourse = filtered.reduce((acc, student) => {
//     acc[student.course] = acc[student.course] || [];
//     acc[student.course].push(student);
//     return acc;
//   }, {});

//   if (loading) return <p className="loading">Loading students...</p>;

//   return (
//     <div className="student-page">
//       {/* HEADER */}
//       <div className="student-header">
//         <h2>All Students</h2>
//         <button
//           className="add-btn"
//           onClick={() => (window.location.href = "/students/add")}
//         >
//           + Add New Student
//         </button>
//       </div>

//       {/* CONTROLS */}
//       <div className="student-controls">
//         <input
//           type="text"
//           placeholder="Search by Name, Enroll, Email, or Group ..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <select onChange={(e) => setSortOrder(e.target.value)}>
//           <option value="asc">Sort by name (A–Z)</option>
//           <option value="desc">Sort by name (Z–A)</option>
//         </select>
//       </div>

//       {/* COURSE SECTIONS */}
//       {Object.keys(groupedByCourse).map((course) => (
//         <div key={course} className="course-card">
//           <div
//             className="course-header"
//             onClick={() =>
//               setExpandedCourse(
//                 expandedCourse === course ? null : course
//               )
//             }
//           >
//             <h3>
//               {course} – {groupedByCourse[course].length} Students
//             </h3>
//             <span>{expandedCourse === course ? "▲" : "▼"}</span>
//           </div>

//           {expandedCourse === course && (
//             <table className="student-table">
//               <thead>
//                 <tr>
//                   <th>S.No.</th>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Course</th>
//                   <th>Group</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {groupedByCourse[course].map((s, i) => (
//                   <tr key={s._id}>
//                     <td>{i + 1}</td>
//                     <td>{s.name}</td>
//                     <td>{s.email}</td>
//                     <td>{s.course}</td>
//                     <td>{s.group}</td>
//                     <td>
//                       <button
//                         type="button"
//                         className="delete-btn"
//                         onClick={() => handleDelete(s._id, s.name)}
//                       >
//                         🗑
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ViewStudent;




import React, { useEffect, useState } from "react";
import "./ViewStudent.css";

const ViewStudent = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch("http://localhost:5000/students", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      setStudents(Array.isArray(data) ? data : data.students || []);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    try {
      const res = await fetch(`http://localhost:5000/students/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        setStudents((prev) => prev.filter((s) => s._id !== id));
        setDeleteConfirm(null);
      }
    } catch {}
  };

  const confirmDelete = (id, name) => {
    setDeleteConfirm({ id, name });
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const handleEdit = (id) => {
    window.location.href = `/students/edit/${id}`;
  };

  /* ---------- FILTER + SORT ---------- */
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

  /* ---------- GROUP BY COURSE ---------- */
  const groupedByCourse = filtered.reduce((acc, student) => {
    acc[student.course] = acc[student.course] || [];
    acc[student.course].push(student);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading students...</p>
      </div>
    );
  }

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
                <strong>{deleteConfirm.name}</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="modal-actions">
              <button className="modal-cancel-btn" onClick={cancelDelete}>
                Cancel
              </button>
              <button
                className="modal-confirm-btn"
                onClick={() => handleDelete(deleteConfirm.id, deleteConfirm.name)}
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
          onClick={() => (window.location.href = "/students/add")}
        >
          <span className="btn-icon">+</span>
          Add New Student
        </button>
      </div>

      {/* CONTROLS */}
      <div className="student-controls">
        <div className="search-container">
          <svg className="search-icon" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, email, course, group, or student ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="control-actions">
          <div className="sort-container">
            <label htmlFor="sort-select" className="sort-label">
              Sort by:
            </label>
            <select
              id="sort-select"
              className="sort-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Name (A → Z)</option>
              <option value="desc">Name (Z → A)</option>
            </select>
          </div>

          <button
            className="refresh-btn"
            onClick={fetchStudents}
            title="Refresh student list"
          >
            <svg className="refresh-icon" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
              />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* RESULTS SUMMARY */}
      <div className="results-summary">
        <div className="summary-card">
          <span className="summary-label">Total Students</span>
          <span className="summary-value">{students.length}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Courses</span>
          <span className="summary-value">{Object.keys(groupedByCourse).length}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Filtered</span>
          <span className="summary-value">{filtered.length}</span>
        </div>
      </div>

      {/* COURSE SECTIONS */}
      {Object.keys(groupedByCourse).length === 0 ? (
        <div className="empty-state">
          <svg className="empty-icon" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"
            />
          </svg>
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
                <div className="course-title">
                  <h3>{course}</h3>
                  <span className="student-count">
                    {groupedByCourse[course].length} student
                    {groupedByCourse[course].length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="course-actions">
                  <span className="expand-icon">
                    {expandedCourse === course ? "▲" : "▼"}
                  </span>
                </div>
              </div>

              {expandedCourse === course && (
                <div className="course-table-container">
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
                        <tr key={s._id} className={i % 2 === 0 ? "even-row" : "odd-row"}>
                          <td className="serial-number">{i + 1}</td>
                          <td className="student-name">
                            <span className="name-text">{s.name}</span>
                          </td>
                          <td className="student-id">{s.studentId || "—"}</td>
                          <td className="student-email">{s.email}</td>
                          <td className="student-course">{s.course}</td>
                          <td className="student-group">
                            <span className="group-badge">{s.group || "—"}</span>
                          </td>
                          <td className="action-buttons">
                            <button
                              className="edit-btn"
                              onClick={() => handleEdit(s._id)}
                              title="Edit student"
                            >
                              <svg className="action-icon" viewBox="0 0 24 24">
                                <path
                                  fill="currentColor"
                                  d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                                />
                              </svg>
                            </button>
                            <button
                              className="delete-btn"
                              onClick={() => confirmDelete(s._id, s.name)}
                              title="Delete student"
                            >
                              <svg className="action-icon" viewBox="0 0 24 24">
                                <path
                                  fill="currentColor"
                                  d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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