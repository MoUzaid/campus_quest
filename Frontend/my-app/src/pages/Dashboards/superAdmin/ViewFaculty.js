

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewFaculty.css";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit2, 
  Trash2, 
  UserPlus, 
  X,
  ChevronLeft,
  ChevronRight,
  Building,
  Mail,
  Award,
  Calendar,
  CheckCircle,
  AlertCircle,
  Users,
  User,
  IdCard,
  Phone,
  GraduationCap,
  Clock,
  Briefcase,
  Save,
  Loader2,
  FileText // Quizzes ke liye new icon
} from "lucide-react";

const ViewFaculty = () => {
  const [faculties, setFaculties] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteModal, setDeleteModal] = useState(null);
  
  // ================= MODAL STATES =================
  const [viewModal, setViewModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    department: "",
    designation: "",
    isActive: true
  });
  const [saving, setSaving] = useState(false);
  
  const [filters, setFilters] = useState({
    department: "",
    designation: "",
    status: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const departments = ["All", "Computer Science", "Software Engineering", "Information Technology", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering"];
  const designations = ["All", "Professor", "Associate Professor", "Assistant Professor", "Lecturer", "Head of Department"];
  const statuses = ["All", "Active", "Inactive"];

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/faculty/all", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.clear();
          navigate("/login");
          return;
        }
        setError(data.msg || data.message || "Failed to fetch faculty");
        setLoading(false);
        return;
      }

      setFaculties(Array.isArray(data.faculty) ? data.faculty : []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Server error");
      setLoading(false);
    }
  };

  const handleDelete = async (facultyId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/faculty/delete/${facultyId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || data.message || "Failed to delete faculty");
        return;
      }

      setFaculties((prev) =>
        prev.filter((faculty) => faculty.facultyId !== facultyId)
      );
      setDeleteModal(null);
    } catch (err) {
      console.error(err);
      alert("❌ Server error while deleting faculty");
    }
  };

  // ================= EDIT SUBMIT HANDLER =================
  const handleEditSubmit = async () => {
    if (!editForm.name.trim() || !editForm.email.trim() || !editForm.department.trim()) {
      alert("Please fill all required fields");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/faculty/update/${editModal.facultyId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(editForm)
        }
      );

      const data = await res.json();
      if (!res.ok) {
        alert(data.msg || "Update failed");
        return;
      }

      setFaculties((prev) =>
        prev.map((f) =>
          f.facultyId === editModal.facultyId
            ? { ...f, ...editForm }
            : f
        )
      );

      setEditModal(null);
      alert("✅ Faculty updated successfully!");
    } catch (err) {
      alert("Server error");
    } finally {
      setSaving(false);
    }
  };

  // ================= OPEN EDIT MODAL =================
  const openEditModal = (faculty) => {
    setEditModal(faculty);
    setEditForm({
      name: faculty.name || "",
      email: faculty.email || "",
      department: faculty.department || "",
      designation: faculty.designation || "",
      isActive: faculty.isActive !== undefined ? faculty.isActive : true
    });
  };

  // ================= VIEW QUIZZES HANDLER =================
  const handleViewQuizzes = (facultyMongoId) => {
    navigate(`/superadmin/faculty/${facultyMongoId}/quizzes`);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value === "All" ? "" : value
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      department: "",
      designation: "",
      status: ""
    });
    setSearch("");
    setCurrentPage(1);
  };

  const filteredFaculties = faculties.filter((faculty) => {
    const matchesSearch = 
      `${faculty.name} ${faculty.facultyId} ${faculty.email} ${faculty.department}`
        .toLowerCase()
        .includes(search.toLowerCase());
    
    const matchesDepartment = !filters.department || 
      faculty.department?.toLowerCase().includes(filters.department.toLowerCase());
    
    const matchesDesignation = !filters.designation || 
      faculty.designation?.toLowerCase().includes(filters.designation.toLowerCase());
    
    const matchesStatus = !filters.status || 
      (filters.status === "Active" ? faculty.isActive : 
       filters.status === "Inactive" ? !faculty.isActive : true);

    return matchesSearch && matchesDepartment && matchesDesignation && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredFaculties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFaculties = filteredFaculties.slice(startIndex, startIndex + itemsPerPage);

  const getDepartmentClass = (dept) => {
    if (!dept) return "department-cs";
    const deptLower = dept.toLowerCase();
    if (deptLower.includes("computer")) return "department-cs";
    if (deptLower.includes("software")) return "department-se";
    if (deptLower.includes("information")) return "department-it";
    if (deptLower.includes("mechanical")) return "department-me";
    if (deptLower.includes("electrical")) return "department-ee";
    return "department-cs";
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const exportToCSV = () => {
    const headers = ["Faculty ID", "Name", "Email", "Department", "Designation", "Status"];
    const csvContent = [
      headers.join(","),
      ...filteredFaculties.map(f => [
        f.facultyId,
        `"${f.name}"`,
        f.email,
        f.department,
        f.designation || "N/A",
        f.isActive ? "Active" : "Inactive"
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "faculty_list.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="status-container">
        <div className="status-card">
          <div className="loading-spinner"></div>
          <p className="status-text">Loading faculty data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-container">
        <div className="status-card">
          <AlertCircle size={48} color="#f43f5e" />
          <p className="status-text error">{error}</p>
          <button className="secondary-btn" onClick={fetchFaculties}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="faculty-page">
      {/* ================= VIEW MODAL ================= */}
      {viewModal && (
        <div className="modal-overlay" onClick={() => setViewModal(null)}>
          <div className="modal-content view-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="faculty-avatar-large">
                {getInitials(viewModal.name)}
              </div>
              <div>
                <h3>{viewModal.name}</h3>
                <p className="faculty-id-modall">ID: {viewModal.facultyId}</p>
              </div>
              <button className="close-btn" onClick={() => setViewModal(null)}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-item">
                  <Mail size={18} className="detail-icon" />
                  <div>
                    <p className="detail-label">Email</p>
                    <p className="detail-value">{viewModal.email}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <Building size={18} className="detail-icon" />
                  <div>
                    <p className="detail-label">Department</p>
                    <p className="detail-value">{viewModal.department || "Not assigned"}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <Award size={18} className="detail-icon" />
                  <div>
                    <p className="detail-label">Designation</p>
                    <p className="detail-value">{viewModal.designation || "Not specified"}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <Clock size={18} className="detail-icon" />
                  <div>
                    <p className="detail-label">Status</p>
                    <span className={`status-badge ${viewModal.isActive ? 'active' : 'inactive'}`}>
                      {viewModal.isActive ? (
                        <>
                          <CheckCircle size={14} />
                          Active
                        </>
                      ) : (
                        <>
                          <AlertCircle size={14} />
                          Inactive
                        </>
                      )}
                    </span>
                  </div>
                </div>

                <div className="detail-item full-width">
                  <User size={18} className="detail-icon" />
                  <div>
                    <p className="detail-label">Faculty ID</p>
                    <p className="detail-value">{viewModal.facultyId}</p>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button 
                  className="quizzes-btn"
                  onClick={() => {
                    setViewModal(null);
                    handleViewQuizzes(viewModal._id);
                  }}
                >
                  <FileText size={18} />
                  View Quizzes
                </button>
                <button 
                  className="edit-modal-btn"
                  onClick={() => {
                    setViewModal(null);
                    openEditModal(viewModal);
                  }}
                >
                  <Edit2 size={18} />
                  Edit Profile
                </button>
                <button 
                  className="close-modal-btn"
                  onClick={() => setViewModal(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editModal && (
        <div className="modal-overlay" onClick={() => setEditModal(null)}>
          <div className="modal-content edit-modal" onClick={(e) => e.stopPropagation()}>
            {/* <div className="modal-header"> */}
              <div className="modal-title">
                {/* <Edit2 size={20} /> */}
                {/* <h3>Edit Faculty Profile</h3> */}
              </div>
              {/* <button className="close-btn" onClick={() => setEditModal(null)}>
                <X size={20} />
              </button> */}
          
            

            <div className="form-header" >
              <div className="edit-avatar">
                {getInitials(editForm.name)}
              </div>
              <div className="edit-id-email">
                <p className="edit-id">ID: {editModal.facultyId}</p>
                <p className="edit-email" title={editModal.email}>{editModal.email}</p>
              </div>
            </div>

 
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="edit-name">
                  <User size={14} />
                  Full Name
                </label>
                <input
                  id="edit-name"
                  type="text"
                  placeholder="Dr. John Doe"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-email">
                  <Mail size={14} />
                  Email Address
                </label>
                <input
                  id="edit-email"
                  type="email"
                  placeholder="john.doe@university.edu"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-department">
                  <Building size={14} />
                  Department
                </label>
                <select
                  id="edit-department"
                  value={editForm.department}
                  onChange={(e) =>
                    setEditForm({ ...editForm, department: e.target.value })
                  }
                  required
                >
                  <option value="">Select Department</option>
                  {departments
                    .filter((d) => d !== "All")
                    .map((dep) => (
                      <option key={dep} value={dep}>
                        {dep}
                      </option>
                    ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="edit-designation">
                  <Award size={14} />
                  Designation
                </label>
                <select
                  id="edit-designation"
                  value={editForm.designation}
                  onChange={(e) =>
                    setEditForm({ ...editForm, designation: e.target.value })
                  }
                >
                  <option value="">Select Designation</option>
                  {designations
                    .filter((d) => d !== "All")
                    .map((desig) => (
                      <option key={desig} value={desig}>
                        {desig}
                      </option>
                    ))}
                </select>
              </div>

              <div className="form-group full-width">
                <label>
                  <CheckCircle size={14} />
                  Account Status
                </label>
                <div className="status-toggle">
                  <button
                    className={`status-toggle-btn ${editForm.isActive ? 'active' : ''}`}
                    onClick={() => setEditForm({ ...editForm, isActive: true })}
                    type="button"
                  >
                    <CheckCircle size={12} />
                    Active
                  </button>
                  <button
                    className={`status-toggle-btn ${!editForm.isActive ? 'inactive' : ''}`}
                    onClick={() => setEditForm({ ...editForm, isActive: false })}
                    type="button"
                  >
                    <AlertCircle size={12} />
                    Inactive
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setEditModal(null)}
                disabled={saving}
              >
                Cancel
              </button>
              <button 
                className="save-btn"
                onClick={handleEditSubmit}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 size={16} className="spinner" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= DELETE MODAL ================= */}
      {deleteModal && (
        <div className="modal-overlay">
          <div className="modal-content delete-modal">
            <div className="modal-header">
              <div className="delete-icon">
                <Trash2 size={32} color="#f43f5e" />
              </div>
              <h3>Confirm Deletion</h3>
              <button className="close-btn" onClick={() => setDeleteModal(null)}>
                <X size={20} />
              </button>
            </div>
            <p>Are you sure you want to delete faculty member <strong>{deleteModal.name}</strong> (ID: {deleteModal.id})? This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setDeleteModal(null)}>
                Cancel
              </button>
              <button 
                className="confirm-delete-btn"
                onClick={() => handleDelete(deleteModal.id)}
              >
                <Trash2 size={16} />
                Delete Faculty
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="faculty-header">
        <div>
          <h2>
            <Users size={32} style={{ marginRight: "12px" }} />
            Faculty Management
          </h2>
          <p>View and manage all registered faculty members across departments</p>
        </div>

        <button
          className="primary-btn"
          onClick={() => navigate("/superadmin/add-faculty")}
        >
          <UserPlus size={20} />
          Add New Faculty
        </button>
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <div className="filter-header">
          <h3>
            <Filter size={20} />
            Filter Faculty
            <span className="filter-count">
              {filteredFaculties.length} {filteredFaculties.length === 1 ? 'Member' : 'Members'}
            </span>
          </h3>
          <div className="search-bar">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search by name, ID, email or department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-grid">
          <div className="filter-group">
            <label htmlFor="department">
              <Building size={16} /> Department
            </label>
            <select
              id="department"
              className="select-input"
              value={filters.department || "All"}
              onChange={(e) => handleFilterChange("department", e.target.value)}
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="designation">
              <Award size={16} /> Designation
            </label>
            <select
              id="designation"
              className="select-input"
              value={filters.designation || "All"}
              onChange={(e) => handleFilterChange("designation", e.target.value)}
            >
              {designations.map(desig => (
                <option key={desig} value={desig}>{desig}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="status">
              <CheckCircle size={16} /> Status
            </label>
            <select
              id="status"
              className="select-input"
              value={filters.status || "All"}
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="filter-actions">
          <button className="secondary-btn" onClick={clearFilters}>
            <X size={16} />
            Clear Filters
          </button>
          <button className="secondary-btn" onClick={exportToCSV}>
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Faculty Table */}
      <div className="table-container">
        <div className="table-header">
          <h3>
            <Users size={24} />
            Faculty Directory
          </h3>
          <div className="table-actions">
            <button className="export-btn" onClick={exportToCSV}>
              <Download size={16} />
              Export List
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="faculty-table">
            <thead>
              <tr>
                <th>Faculty</th>
                <th>Email</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedFaculties.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "3rem" }}>
                    <div style={{ 
                      display: "flex", 
                      flexDirection: "column", 
                      alignItems: "center",
                      gap: "1rem",
                      color: "var(--text-secondary)"
                    }}>
                      <Users size={48} />
                      <p style={{ fontSize: "1.1rem", fontWeight: "500" }}>
                        No faculty members found
                      </p>
                      <p>Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedFaculties.map((faculty) => (
                  <tr key={faculty.facultyId}>
                    <td>
                      <div className="faculty-cell">
                        <div className="faculty-avatar">
                          {getInitials(faculty.name)}
                        </div>
                        <div className="faculty-info">
                          <span className="faculty-name">{faculty.name}</span>
                          <span className="faculty-id">ID: {faculty.facultyId}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Mail size={16} color="var(--text-secondary)" />
                        {faculty.email}
                      </div>
                    </td>
                    <td>
                      <span className={`department-badge ${getDepartmentClass(faculty.department)}`}>
                        {faculty.department || "Not Assigned"}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Award size={16} color="var(--accent-amber)" />
                        {faculty.designation || "—"}
                      </div>
                    </td>
                    <td>
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.4rem 0.8rem",
                        borderRadius: "20px",
                        background: faculty.isActive ? "rgba(16, 185, 129, 0.1)" : "rgba(244, 63, 94, 0.1)",
                        color: faculty.isActive ? "#10b981" : "#f43f5e",
                        fontSize: "0.85rem",
                        fontWeight: "500"
                      }}>
                        {faculty.isActive ? (
                          <>
                            <CheckCircle size={14} />
                            Active
                          </>
                        ) : (
                          <>
                            <AlertCircle size={14} />
                            Inactive
                          </>
                        )}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="view-btn"
                          onClick={() => setViewModal(faculty)}
                        >
                          <Eye size={14} />
                          View
                        </button>
                        <button 
                          className="quizzes-action-btn"
                          onClick={() => handleViewQuizzes(faculty._id)}
                        >
                          <FileText size={14} />
                          Quizzes
                        </button>
                        <button 
                          className="edit-btn"
                          onClick={() => openEditModal(faculty)}
                        >
                          <Edit2 size={14} />
                          Edit
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={() => setDeleteModal({
                            id: faculty.facultyId,
                            name: faculty.name
                          })}
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  className={`pagination-number ${currentPage === pageNum ? "active" : ""}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight size={16} />
            </button>
            
            <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginLeft: "1rem" }}>
              Page {currentPage} of {totalPages}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewFaculty;








// better error handling and performance optimizations below




// import React, { useEffect, useState, useMemo, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import "./ViewFaculty.css";
// import { 
//   Search, 
//   Filter, 
//   Download, 
//   Eye, 
//   Edit2, 
//   Trash2, 
//   UserPlus, 
//   X,
//   ChevronLeft,
//   ChevronRight,
//   Building,
//   Mail,
//   Award,
//   Calendar,
//   CheckCircle,
//   AlertCircle,
//   Users,
//   User,
//   IdCard,
//   Phone,
//   GraduationCap,
//   Clock,
//   Briefcase,
//   Save,
//   Loader2,
//   FileText,
//   AlertTriangle,
//   RefreshCw,
//   Database,
//   Shield
// } from "lucide-react";

// // Utility function for error handling
// const handleApiError = (error, defaultMessage) => {
//   console.error('API Error:', error);
  
//   if (error?.networkError) {
//     return {
//       type: 'network',
//       message: 'Network connection failed. Please check your internet connection.',
//       retry: true
//     };
//   }
  
//   if (error?.status === 401) {
//     return {
//       type: 'auth',
//       message: 'Session expired. Please login again.',
//       retry: false
//     };
//   }
  
//   if (error?.status === 403) {
//     return {
//       type: 'permission',
//       message: 'You do not have permission to perform this action.',
//       retry: false
//     };
//   }
  
//   if (error?.status === 429) {
//     return {
//       type: 'rate_limit',
//       message: 'Too many requests. Please try again later.',
//       retry: true
//     };
//   }
  
//   return {
//     type: 'server',
//     message: error?.message || defaultMessage || 'An unexpected error occurred.',
//     retry: true
//   };
// };

// // Constants for configuration
// const PAGINATION_CONFIG = {
//   ITEMS_PER_PAGE: 10,
//   MAX_VISIBLE_PAGES: 5,
//   API_PAGE_SIZE: 100, // For future API pagination
//   CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
// };

// const ViewFaculty = () => {
//   const [faculties, setFaculties] = useState([]);
//   const [filteredFaculties, setFilteredFaculties] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [deleteModal, setDeleteModal] = useState(null);
//   const [totalCount, setTotalCount] = useState(0);
  
//   // ================= MODAL STATES =================
//   const [viewModal, setViewModal] = useState(null);
//   const [editModal, setEditModal] = useState(null);
  
//   const [editForm, setEditForm] = useState({
//     name: "",
//     email: "",
//     department: "",
//     designation: "",
//     isActive: true
//   });
//   const [saving, setSaving] = useState(false);
  
//   const [filters, setFilters] = useState({
//     department: "",
//     designation: "",
//     status: ""
//   });
  
//   // Enhanced pagination state
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     itemsPerPage: PAGINATION_CONFIG.ITEMS_PER_PAGE,
//     totalPages: 0,
//     totalItems: 0
//   });
  
//   // Cache state for performance
//   const [cache, setCache] = useState({
//     data: null,
//     timestamp: null,
//     filters: {}
//   });
  
//   const navigate = useNavigate();

//   const departments = ["All", "Computer Science", "Software Engineering", "Information Technology", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering"];
//   const designations = ["All", "Professor", "Associate Professor", "Assistant Professor", "Lecturer", "Head of Department"];
//   const statuses = ["All", "Active", "Inactive"];

//   // Memoized filter function for performance
//   const applyFilters = useCallback((facultyList, searchTerm, filterObj) => {
//     if (!facultyList || !Array.isArray(facultyList)) return [];
    
//     const searchLower = searchTerm.toLowerCase().trim();
//     const { department, designation, status } = filterObj;
    
//     return facultyList.filter((faculty) => {
//       // Search across multiple fields
//       const matchesSearch = searchLower === '' || 
//         faculty.name?.toLowerCase().includes(searchLower) ||
//         faculty.facultyId?.toLowerCase().includes(searchLower) ||
//         faculty.email?.toLowerCase().includes(searchLower) ||
//         faculty.department?.toLowerCase().includes(searchLower);
      
//       // Department filter
//       const matchesDepartment = !department || 
//         faculty.department?.toLowerCase() === department.toLowerCase();
      
//       // Designation filter
//       const matchesDesignation = !designation || 
//         faculty.designation?.toLowerCase() === designation.toLowerCase();
      
//       // Status filter
//       const matchesStatus = !status || 
//         (status === "Active" ? faculty.isActive : 
//          status === "Inactive" ? !faculty.isActive : true);

//       return matchesSearch && matchesDepartment && matchesDesignation && matchesStatus;
//     });
//   }, []);

//   // Fetch faculties with improved error handling
//   const fetchFaculties = useCallback(async (forceRefresh = false) => {
//     // Check cache first
//     if (!forceRefresh && cache.data && cache.timestamp) {
//       const cacheAge = Date.now() - cache.timestamp;
//       if (cacheAge < PAGINATION_CONFIG.CACHE_DURATION) {
//         setFaculties(cache.data);
//         setTotalCount(cache.data.length);
//         setLoading(false);
//         return;
//       }
//     }

//     setLoading(true);
//     setError(null);
//       let timeoutId;
    
//     try {
//       const controller = new AbortController();
//       const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
//       const res = await fetch("http://localhost:5000/api/faculty/all", {
//         method: "GET",
//         credentials: "include",
//         signal: controller.signal,
//         headers: {
//           'Cache-Control': 'no-cache',
//           'Pragma': 'no-cache'
//         }
//       });

//       clearTimeout(timeoutId);

//       if (!res.ok) {
//         const errorData = await res.json().catch(() => ({}));
//         throw {
//           status: res.status,
//           message: errorData.msg || errorData.message || `HTTP ${res.status}`,
//           networkError: false
//         };
//       }

//       const data = await res.json();
//       const facultyList = Array.isArray(data.faculty) ? data.faculty : [];
      
//       // Update cache
//       setCache({
//         data: facultyList,
//         timestamp: Date.now(),
//         filters: {}
//       });
      
//       setFaculties(facultyList);
//       setTotalCount(facultyList.length);
//       setLoading(false);
      
//     } catch (err) {
//       clearTimeout(timeoutId);
      
//       const errorInfo = handleApiError(err, "Failed to fetch faculty data");
//       setError(errorInfo);
      
//       if (errorInfo.type === 'auth') {
//         localStorage.clear();
//         setTimeout(() => navigate("/login"), 2000);
//       }
      
//       setLoading(false);
//     }
//   }, [cache, navigate]);

//   // Handle filter changes with debouncing
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       const filtered = applyFilters(faculties, search, filters);
//       setFilteredFaculties(filtered);
      
//       // Update pagination
//       setPagination(prev => ({
//         ...prev,
//         currentPage: 1,
//         totalItems: filtered.length,
//         totalPages: Math.ceil(filtered.length / prev.itemsPerPage)
//       }));
//     }, 300); // 300ms debounce

//     return () => clearTimeout(timeoutId);
//   }, [faculties, search, filters, applyFilters]);

//   // Handle delete with confirmation and error handling
//   const handleDelete = useCallback(async (facultyId) => {
//     if (!window.confirm("Are you sure you want to delete this faculty member? This action cannot be undone.")) {
//       return;
//     }

//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/faculty/delete/${facultyId}`,
//         {
//           method: "DELETE",
//           credentials: "include",
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       if (!res.ok) {
//         const errorData = await res.json().catch(() => ({}));
//         throw new Error(errorData.msg || "Failed to delete faculty");
//       }

//       // Update local state and cache
//       setFaculties(prev => prev.filter((faculty) => faculty.facultyId !== facultyId));
//       setCache(prev => ({
//         ...prev,
//         data: prev.data?.filter((faculty) => faculty.facultyId !== facultyId) || []
//       }));
      
//       setDeleteModal(null);
      
//       // Show success message
//       alert("✅ Faculty member deleted successfully!");
      
//     } catch (err) {
//       console.error('Delete error:', err);
//       alert(`❌ Failed to delete faculty: ${err.message}`);
//     }
//   }, []);

//   // ================= EDIT SUBMIT HANDLER =================
//   const handleEditSubmit = async () => {
//     if (!editForm.name.trim() || !editForm.email.trim() || !editForm.department.trim()) {
//       alert("Please fill all required fields");
//       return;
//     }

//     setSaving(true);
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/faculty/update/${editModal.facultyId}`,
//         {
//           method: "PUT",
//           headers: { 
//             "Content-Type": "application/json",
//             'Cache-Control': 'no-cache'
//           },
//           credentials: "include",
//           body: JSON.stringify(editForm)
//         }
//       );

//       if (!res.ok) {
//         const errorData = await res.json().catch(() => ({}));
//         throw new Error(errorData.msg || "Update failed");
//       }

//       const data = await res.json();
      
//       // Update local state
//       setFaculties((prev) =>
//         prev.map((f) =>
//           f.facultyId === editModal.facultyId
//             ? { ...f, ...editForm }
//             : f
//         )
//       );
      
//       // Update cache
//       setCache(prev => ({
//         ...prev,
//         data: prev.data?.map((f) =>
//           f.facultyId === editModal.facultyId
//             ? { ...f, ...editForm }
//             : f
//         ) || []
//       }));

//       setEditModal(null);
//       alert("✅ Faculty updated successfully!");
//     } catch (err) {
//       console.error('Update error:', err);
//       alert(`❌ Failed to update faculty: ${err.message}`);
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ================= OPEN EDIT MODAL =================
//   const openEditModal = (faculty) => {
//     setEditModal(faculty);
//     setEditForm({
//       name: faculty.name || "",
//       email: faculty.email || "",
//       department: faculty.department || "",
//       designation: faculty.designation || "",
//       isActive: faculty.isActive !== undefined ? faculty.isActive : true
//     });
//   };

//   // ================= VIEW QUIZZES HANDLER =================
//   const handleViewQuizzes = (facultyMongoId) => {
//     navigate(`/superadmin/faculty/${facultyMongoId}/quizzes`);
//   };

//   const handleFilterChange = (filterName, value) => {
//     setFilters(prev => ({
//       ...prev,
//       [filterName]: value === "All" ? "" : value
//     }));
//   };

//   const clearFilters = () => {
//     setFilters({
//       department: "",
//       designation: "",
//       status: ""
//     });
//     setSearch("");
//   };

//   // Pagination calculations using useMemo for performance
//   const paginatedFaculties = useMemo(() => {
//     const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
//     const endIndex = startIndex + pagination.itemsPerPage;
//     return filteredFaculties.slice(startIndex, endIndex);
//   }, [filteredFaculties, pagination.currentPage, pagination.itemsPerPage]);

//   // Pagination controls
//   const goToPage = (pageNumber) => {
//     setPagination(prev => ({
//       ...prev,
//       currentPage: Math.max(1, Math.min(pageNumber, prev.totalPages))
//     }));
//   };

//   const goToFirstPage = () => goToPage(1);
//   const goToLastPage = () => goToPage(pagination.totalPages);
//   const goToNextPage = () => goToPage(pagination.currentPage + 1);
//   const goToPrevPage = () => goToPage(pagination.currentPage - 1);

//   // Generate page numbers for pagination controls
//   const getPageNumbers = () => {
//     const { currentPage, totalPages } = pagination;
//     const maxVisible = PAGINATION_CONFIG.MAX_VISIBLE_PAGES;
    
//     if (totalPages <= maxVisible) {
//       return Array.from({ length: totalPages }, (_, i) => i + 1);
//     }
    
//     let start = Math.max(2, currentPage - 1);
//     let end = Math.min(totalPages - 1, currentPage + 1);
    
//     if (currentPage <= 3) {
//       start = 2;
//       end = maxVisible - 1;
//     } else if (currentPage >= totalPages - 2) {
//       start = totalPages - maxVisible + 2;
//       end = totalPages - 1;
//     }
    
//     const pages = [1];
    
//     if (start > 2) pages.push('...');
    
//     for (let i = start; i <= end; i++) {
//       pages.push(i);
//     }
    
//     if (end < totalPages - 1) pages.push('...');
    
//     pages.push(totalPages);
    
//     return pages;
//   };

//   const getDepartmentClass = (dept) => {
//     if (!dept) return "department-cs";
//     const deptLower = dept.toLowerCase();
//     if (deptLower.includes("computer")) return "department-cs";
//     if (deptLower.includes("software")) return "department-se";
//     if (deptLower.includes("information")) return "department-it";
//     if (deptLower.includes("mechanical")) return "department-me";
//     if (deptLower.includes("electrical")) return "department-ee";
//     return "department-cs";
//   };

//   const getInitials = (name) => {
//     if (!name) return "NA";
//     return name
//       .split(" ")
//       .map(word => word[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   const exportToCSV = () => {
//     try {
//       const headers = ["Faculty ID", "Name", "Email", "Department", "Designation", "Status", "Last Updated"];
//       const csvContent = [
//         headers.join(","),
//         ...filteredFaculties.map(f => [
//           f.facultyId,
//           `"${f.name}"`,
//           f.email,
//           f.department,
//           f.designation || "N/A",
//           f.isActive ? "Active" : "Inactive",
//           new Date().toISOString().split('T')[0]
//         ].join(","))
//       ].join("\n");

//       const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `faculty_list_${new Date().toISOString().split('T')[0]}.csv`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error('Export error:', err);
//       alert('Failed to export CSV');
//     }
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="container-fluid py-4">
//         <div className="row justify-content-center">
//           <div className="col-12 col-md-6 col-lg-4">
//             <div className="status-card text-center p-5">
//               <div className="loading-spinner mb-3"></div>
//               <h4 className="mb-2">Loading Faculty Data</h4>
//               <p className="text-muted">Please wait while we fetch the latest information...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="container-fluid py-4">
//         <div className="row justify-content-center">
//           <div className="col-12 col-md-6 col-lg-5">
//             <div className="status-card text-center p-5">
//               <AlertTriangle size={48} className="text-danger mb-3" />
//               <h4 className="mb-2">Unable to Load Data</h4>
//               <p className="text-danger mb-4">{error.message}</p>
//               <div className="d-flex gap-2 justify-content-center">
//                 {error.retry && (
//                   <button 
//                     className="btn btn-primary"
//                     onClick={() => fetchFaculties(true)}
//                   >
//                     <RefreshCw size={16} className="me-2" />
//                     Try Again
//                   </button>
//                 )}
//                 <button 
//                   className="btn btn-outline-secondary"
//                   onClick={() => navigate('/superadmin/dashboard')}
//                 >
//                   Go to Dashboard
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="faculty-page container-fluid px-3 px-md-4 px-lg-5 py-3 py-md-4">
//       {/* ================= VIEW MODAL ================= */}
//       {viewModal && (
//         <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setViewModal(null)}>
//           <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-content view-modal">
//               <div className="modal-header align-items-center">
//                 <div className="d-flex align-items-center gap-3">
//                   <div className="faculty-avatar-large">
//                     {getInitials(viewModal.name)}
//                   </div>
//                   <div>
//                     <h4 className="modal-title mb-0">{viewModal.name}</h4>
//                     <p className="faculty-id-modall text-muted mb-0">ID: {viewModal.facultyId}</p>
//                   </div>
//                 </div>
//                 <button type="button" className="btn-close" onClick={() => setViewModal(null)}></button>
//               </div>

//               <div className="modal-body">
//                 <div className="row g-3">
//                   <div className="col-12 col-md-6">
//                     <div className="detail-item">
//                       <Mail size={18} className="detail-icon" />
//                       <div>
//                         <p className="detail-label">Email</p>
//                         <p className="detail-value">{viewModal.email}</p>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="col-12 col-md-6">
//                     <div className="detail-item">
//                       <Building size={18} className="detail-icon" />
//                       <div>
//                         <p className="detail-label">Department</p>
//                         <p className="detail-value">{viewModal.department || "Not assigned"}</p>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="col-12 col-md-6">
//                     <div className="detail-item">
//                       <Award size={18} className="detail-icon" />
//                       <div>
//                         <p className="detail-label">Designation</p>
//                         <p className="detail-value">{viewModal.designation || "Not specified"}</p>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="col-12 col-md-6">
//                     <div className="detail-item">
//                       <Clock size={18} className="detail-icon" />
//                       <div>
//                         <p className="detail-label">Status</p>
//                         <span className={`status-badge ${viewModal.isActive ? 'active' : 'inactive'}`}>
//                           {viewModal.isActive ? (
//                             <>
//                               <CheckCircle size={14} />
//                               Active
//                             </>
//                           ) : (
//                             <>
//                               <AlertCircle size={14} />
//                               Inactive
//                             </>
//                           )}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="modal-footer mt-4">
//                   <button 
//                     className="quizzes-btn"
//                     onClick={() => {
//                       setViewModal(null);
//                       handleViewQuizzes(viewModal._id);
//                     }}
//                   >
//                     <FileText size={18} />
//                     View Quizzes
//                   </button>
//                   <button 
//                     className="edit-modal-btn"
//                     onClick={() => {
//                       setViewModal(null);
//                       openEditModal(viewModal);
//                     }}
//                   >
//                     <Edit2 size={18} />
//                     Edit Profile
//                   </button>
//                   <button 
//                     className="close-modal-btn"
//                     onClick={() => setViewModal(null)}
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Edit Modal */}
//       {editModal && (
//         <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setEditModal(null)}>
//           <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-content edit-modal">
//               <div className="modal-header">
//                 <h5 className="modal-title">
//                   <Edit2 size={20} className="me-2" />
//                   Edit Faculty Profile
//                 </h5>
//                 <button type="button" className="btn-close" onClick={() => setEditModal(null)} disabled={saving}></button>
//               </div>

//               <div className="modal-body">
//                 <div className="row align-items-center mb-4">
//                   <div className="col-auto">
//                     <div className="edit-avatar">
//                       {getInitials(editForm.name)}
//                     </div>
//                   </div>
//                   <div className="col">
//                     <p className="edit-id mb-1">ID: {editModal.facultyId}</p>
//                     <p className="edit-email text-truncate mb-0" title={editModal.email}>{editModal.email}</p>
//                   </div>
//                 </div>

//                 <div className="row g-3">
//                   <div className="col-12 col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="edit-name" className="form-label">
//                         <User size={14} className="me-2" />
//                         Full Name
//                       </label>
//                       <input
//                         id="edit-name"
//                         type="text"
//                         className="form-control"
//                         placeholder="Dr. John Doe"
//                         value={editForm.name}
//                         onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
//                         required
//                         disabled={saving}
//                       />
//                     </div>
//                   </div>

//                   <div className="col-12 col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="edit-email" className="form-label">
//                         <Mail size={14} className="me-2" />
//                         Email Address
//                       </label>
//                       <input
//                         id="edit-email"
//                         type="email"
//                         className="form-control"
//                         placeholder="john.doe@university.edu"
//                         value={editForm.email}
//                         onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
//                         required
//                         disabled={saving}
//                       />
//                     </div>
//                   </div>

//                   <div className="col-12 col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="edit-department" className="form-label">
//                         <Building size={14} className="me-2" />
//                         Department
//                       </label>
//                       <select
//                         id="edit-department"
//                         className="form-select"
//                         value={editForm.department}
//                         onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
//                         required
//                         disabled={saving}
//                       >
//                         <option value="">Select Department</option>
//                         {departments
//                           .filter((d) => d !== "All")
//                           .map((dep) => (
//                             <option key={dep} value={dep}>
//                               {dep}
//                             </option>
//                           ))}
//                       </select>
//                     </div>
//                   </div>

//                   <div className="col-12 col-md-6">
//                     <div className="form-group">
//                       <label htmlFor="edit-designation" className="form-label">
//                         <Award size={14} className="me-2" />
//                         Designation
//                       </label>
//                       <select
//                         id="edit-designation"
//                         className="form-select"
//                         value={editForm.designation}
//                         onChange={(e) => setEditForm({ ...editForm, designation: e.target.value })}
//                         disabled={saving}
//                       >
//                         <option value="">Select Designation</option>
//                         {designations
//                           .filter((d) => d !== "All")
//                           .map((desig) => (
//                             <option key={desig} value={desig}>
//                               {desig}
//                             </option>
//                           ))}
//                       </select>
//                     </div>
//                   </div>

//                   <div className="col-12">
//                     <div className="form-group">
//                       <label className="form-label d-block mb-2">
//                         <CheckCircle size={14} className="me-2" />
//                         Account Status
//                       </label>
//                       <div className="btn-group w-100" role="group">
//                         <button
//                           className={`btn ${editForm.isActive ? 'btn-success' : 'btn-outline-success'}`}
//                           onClick={() => setEditForm({ ...editForm, isActive: true })}
//                           type="button"
//                           disabled={saving}
//                         >
//                           <CheckCircle size={12} className="me-1" />
//                           Active
//                         </button>
//                         <button
//                           className={`btn ${!editForm.isActive ? 'btn-danger' : 'btn-outline-danger'}`}
//                           onClick={() => setEditForm({ ...editForm, isActive: false })}
//                           type="button"
//                           disabled={saving}
//                         >
//                           <AlertCircle size={12} className="me-1" />
//                           Inactive
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="modal-footer">
//                 <button 
//                   className="btn btn-secondary"
//                   onClick={() => setEditModal(null)}
//                   disabled={saving}
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   className="btn btn-primary"
//                   onClick={handleEditSubmit}
//                   disabled={saving}
//                 >
//                   {saving ? (
//                     <>
//                       <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                       Saving Changes...
//                     </>
//                   ) : (
//                     <>
//                       <Save size={16} className="me-2" />
//                       Save Changes
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ================= DELETE MODAL ================= */}
//       {deleteModal && (
//         <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content delete-modal">
//               <div className="modal-header border-0">
//                 <div className="delete-icon">
//                   <Trash2 size={32} className="text-danger" />
//                 </div>
//                 <h5 className="modal-title ms-3">Confirm Deletion</h5>
//                 <button type="button" className="btn-close" onClick={() => setDeleteModal(null)}></button>
//               </div>
//               <div className="modal-body">
//                 <p>Are you sure you want to delete faculty member <strong>{deleteModal.name}</strong> (ID: {deleteModal.id})? This action cannot be undone.</p>
//               </div>
//               <div className="modal-footer border-0">
//                 <button className="btn btn-secondary" onClick={() => setDeleteModal(null)}>
//                   Cancel
//                 </button>
//                 <button 
//                   className="btn btn-danger"
//                   onClick={() => handleDelete(deleteModal.id)}
//                 >
//                   <Trash2 size={16} className="me-2" />
//                   Delete Faculty
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Header */}
//       <div className="row align-items-center mb-4">
//         <div className="col-12 col-md-6">
//           <div className="d-flex align-items-center">
//             <Users size={32} className="me-3 text-primary" />
//             <div>
//               <h1 className="h3 mb-1">Faculty Management</h1>
//               <p className="text-muted mb-0">Manage {totalCount} faculty members across departments</p>
//             </div>
//           </div>
//         </div>
//         <div className="col-12 col-md-6 text-md-end mt-3 mt-md-0">
//           <button
//             className="btn btn-primary"
//             onClick={() => navigate("/superadmin/add-faculty")}
//           >
//             <UserPlus size={20} className="me-2" />
//             Add New Faculty
//           </button>
//         </div>
//       </div>

//       {/* Filter Section */}
//       <div className="card mb-4">
//         <div className="card-body">
//           <div className="row align-items-center mb-3">
//             <div className="col-12 col-md-6">
//               <div className="d-flex align-items-center">
//                 <Filter size={20} className="me-2 text-muted" />
//                 <h5 className="mb-0">Filter Faculty</h5>
//                 <span className="badge bg-primary ms-2">
//                   {filteredFaculties.length} {filteredFaculties.length === 1 ? 'Member' : 'Members'}
//                 </span>
//               </div>
//             </div>
//             <div className="col-12 col-md-6 mt-2 mt-md-0">
//               <div className="input-group">
//                 <span className="input-group-text bg-transparent border-end-0">
//                   <Search size={20} className="text-muted" />
//                 </span>
//                 <input
//                   type="text"
//                   className="form-control border-start-0"
//                   placeholder="Search by name, ID, email or department..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="row g-3">
//             <div className="col-12 col-md-4">
//               <label htmlFor="department" className="form-label">
//                 <Building size={16} className="me-2" />
//                 Department
//               </label>
//               <select
//                 id="department"
//                 className="form-select"
//                 value={filters.department || "All"}
//                 onChange={(e) => handleFilterChange("department", e.target.value)}
//               >
//                 {departments.map(dept => (
//                   <option key={dept} value={dept}>{dept}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="col-12 col-md-4">
//               <label htmlFor="designation" className="form-label">
//                 <Award size={16} className="me-2" />
//                 Designation
//               </label>
//               <select
//                 id="designation"
//                 className="form-select"
//                 value={filters.designation || "All"}
//                 onChange={(e) => handleFilterChange("designation", e.target.value)}
//               >
//                 {designations.map(desig => (
//                   <option key={desig} value={desig}>{desig}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="col-12 col-md-4">
//               <label htmlFor="status" className="form-label">
//                 <CheckCircle size={16} className="me-2" />
//                 Status
//               </label>
//               <select
//                 id="status"
//                 className="form-select"
//                 value={filters.status || "All"}
//                 onChange={(e) => handleFilterChange("status", e.target.value)}
//               >
//                 {statuses.map(status => (
//                   <option key={status} value={status}>{status}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="row mt-3">
//             <div className="col-12">
//               <div className="d-flex gap-2">
//                 <button className="btn btn-outline-secondary" onClick={clearFilters}>
//                   <X size={16} className="me-2" />
//                   Clear Filters
//                 </button>
//                 <button className="btn btn-outline-primary" onClick={exportToCSV}>
//                   <Download size={16} className="me-2" />
//                   Export CSV
//                 </button>
//                 <button className="btn btn-outline-success ms-auto" onClick={() => fetchFaculties(true)}>
//                   <RefreshCw size={16} className="me-2" />
//                   Refresh Data
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Faculty Table */}
//       <div className="card">
//         <div className="card-body">
//           <div className="row align-items-center mb-3">
//             <div className="col-12 col-md-6">
//               <div className="d-flex align-items-center">
//                 <Users size={24} className="me-2 text-primary" />
//                 <h5 className="mb-0">Faculty Directory</h5>
//                 <span className="badge bg-light text-dark ms-2">
//                   Page {pagination.currentPage} of {pagination.totalPages}
//                 </span>
//               </div>
//             </div>
//             <div className="col-12 col-md-6 text-md-end mt-2 mt-md-0">
//               <div className="d-flex gap-2 justify-content-md-end">
//                 <div className="input-group w-auto">
//                   <label className="input-group-text" htmlFor="itemsPerPage">
//                     Show
//                   </label>
//                   <select
//                     id="itemsPerPage"
//                     className="form-select"
//                     value={pagination.itemsPerPage}
//                     onChange={(e) => setPagination(prev => ({
//                       ...prev,
//                       itemsPerPage: parseInt(e.target.value),
//                       currentPage: 1,
//                       totalPages: Math.ceil(prev.totalItems / parseInt(e.target.value))
//                     }))}
//                   >
//                     <option value="5">5</option>
//                     <option value="10">10</option>
//                     <option value="25">25</option>
//                     <option value="50">50</option>
//                     <option value="100">100</option>
//                   </select>
//                 </div>
//                 <button className="btn btn-outline-primary" onClick={exportToCSV}>
//                   <Download size={16} className="me-2" />
//                   Export
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="table-responsive">
//             <table className="table table-hover faculty-table">
//               <thead>
//                 <tr>
//                   <th scope="col">Faculty</th>
//                   <th scope="col">Email</th>
//                   <th scope="col">Department</th>
//                   <th scope="col">Designation</th>
//                   <th scope="col">Status</th>
//                   <th scope="col">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {paginatedFaculties.length === 0 ? (
//                   <tr>
//                     <td colSpan="6" className="text-center py-5">
//                       <div className="d-flex flex-column align-items-center">
//                         <Users size={48} className="text-muted mb-3" />
//                         <h5 className="mb-2">No faculty members found</h5>
//                         <p className="text-muted mb-0">Try adjusting your search or filters</p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   paginatedFaculties.map((faculty) => (
//                     <tr key={faculty.facultyId}>
//                       <td>
//                         <div className="d-flex align-items-center">
//                           <div className="faculty-avatar me-3">
//                             {getInitials(faculty.name)}
//                           </div>
//                           <div>
//                             <div className="faculty-name">{faculty.name}</div>
//                             <div className="faculty-id text-muted small">ID: {faculty.facultyId}</div>
//                           </div>
//                         </div>
//                       </td>
//                       <td>
//                         <div className="d-flex align-items-center">
//                           <Mail size={16} className="me-2 text-muted" />
//                           <span className="text-truncate" style={{ maxWidth: '200px' }} title={faculty.email}>
//                             {faculty.email}
//                           </span>
//                         </div>
//                       </td>
//                       <td>
//                         <span className={`department-badge ${getDepartmentClass(faculty.department)}`}>
//                           {faculty.department || "Not Assigned"}
//                         </span>
//                       </td>
//                       <td>
//                         <div className="d-flex align-items-center">
//                           <Award size={16} className="me-2 text-warning" />
//                           {faculty.designation || "—"}
//                         </div>
//                       </td>
//                       <td>
//                         <span className={`badge ${faculty.isActive ? 'bg-success' : 'bg-danger'}`}>
//                           {faculty.isActive ? 'Active' : 'Inactive'}
//                         </span>
//                       </td>
//                       <td>
//                         <div className="d-flex gap-1">
//                           <button 
//                             className="btn btn-sm btn-outline-info"
//                             onClick={() => setViewModal(faculty)}
//                             title="View Details"
//                           >
//                             <Eye size={14} />
//                           </button>
//                           <button 
//                             className="btn btn-sm btn-outline-secondary"
//                             onClick={() => handleViewQuizzes(faculty._id)}
//                             title="View Quizzes"
//                           >
//                             <FileText size={14} />
//                           </button>
//                           <button 
//                             className="btn btn-sm btn-outline-warning"
//                             onClick={() => openEditModal(faculty)}
//                             title="Edit Faculty"
//                           >
//                             <Edit2 size={14} />
//                           </button>
//                           <button 
//                             className="btn btn-sm btn-outline-danger"
//                             onClick={() => setDeleteModal({
//                               id: faculty.facultyId,
//                               name: faculty.name
//                             })}
//                             title="Delete Faculty"
//                           >
//                             <Trash2 size={14} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Enhanced Pagination */}
//           {pagination.totalPages > 1 && (
//             <div className="row align-items-center mt-4">
//               <div className="col-12 col-md-6 mb-2 mb-md-0">
//                 <div className="text-muted">
//                   Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to{' '}
//                   {Math.min(pagination.currentPage * pagination.itemsPerPage, filteredFaculties.length)} of{' '}
//                   {filteredFaculties.length} entries
//                   {filteredFaculties.length !== totalCount && (
//                     <span className="ms-2">
//                       (Filtered from {totalCount} total)
//                     </span>
//                   )}
//                 </div>
//               </div>
//               <div className="col-12 col-md-6">
//                 <nav aria-label="Faculty pagination">
//                   <ul className="pagination justify-content-center justify-content-md-end mb-0">
//                     <li className={`page-item ${pagination.currentPage === 1 ? 'disabled' : ''}`}>
//                       <button className="page-link" onClick={goToFirstPage} disabled={pagination.currentPage === 1}>
//                         <ChevronLeft size={14} className="me-1" />
//                         First
//                       </button>
//                     </li>
//                     <li className={`page-item ${pagination.currentPage === 1 ? 'disabled' : ''}`}>
//                       <button className="page-link" onClick={goToPrevPage} disabled={pagination.currentPage === 1}>
//                         <ChevronLeft size={14} />
//                       </button>
//                     </li>
                    
//                     {getPageNumbers().map((pageNum, index) => (
//                       <li key={index} className={`page-item ${pageNum === '...' ? 'disabled' : ''} ${pageNum === pagination.currentPage ? 'active' : ''}`}>
//                         {pageNum === '...' ? (
//                           <span className="page-link">...</span>
//                         ) : (
//                           <button className="page-link" onClick={() => goToPage(pageNum)}>
//                             {pageNum}
//                           </button>
//                         )}
//                       </li>
//                     ))}
                    
//                     <li className={`page-item ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}`}>
//                       <button className="page-link" onClick={goToNextPage} disabled={pagination.currentPage === pagination.totalPages}>
//                         <ChevronRight size={14} />
//                       </button>
//                     </li>
//                     <li className={`page-item ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}`}>
//                       <button className="page-link" onClick={goToLastPage} disabled={pagination.currentPage === pagination.totalPages}>
//                         Last
//                         <ChevronRight size={14} className="ms-1" />
//                       </button>
//                     </li>
//                   </ul>
//                 </nav>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Data Stats Footer */}
//       <div className="row mt-4">
//         <div className="col-12">
//           <div className="card bg-light">
//             <div className="card-body py-2">
//               <div className="row text-center">
//                 <div className="col-6 col-md-3">
//                   <div className="text-muted small">Total Faculty</div>
//                   <div className="h5 mb-0">{totalCount}</div>
//                 </div>
//                 <div className="col-6 col-md-3">
//                   <div className="text-muted small">Active</div>
//                   <div className="h5 mb-0 text-success">
//                     {faculties.filter(f => f.isActive).length}
//                   </div>
//                 </div>
//                 <div className="col-6 col-md-3">
//                   <div className="text-muted small">Inactive</div>
//                   <div className="h5 mb-0 text-danger">
//                     {faculties.filter(f => !f.isActive).length}
//                   </div>
//                 </div>
//                 <div className="col-6 col-md-3">
//                   <div className="text-muted small">Filtered</div>
//                   <div className="h5 mb-0 text-primary">
//                     {filteredFaculties.length}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewFaculty;