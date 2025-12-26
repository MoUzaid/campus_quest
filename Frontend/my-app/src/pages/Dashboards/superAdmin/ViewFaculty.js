







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
  Users
} from "lucide-react";

const ViewFaculty = () => {
  const [faculties, setFaculties] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteModal, setDeleteModal] = useState(null);
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
  const statuses = ["All", "Active", "On Leave", "Inactive"];

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
      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
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
                className="confirm-btn"
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
                          onClick={() => navigate(`/superadmin/faculty/${faculty.facultyId}`)}
                        >
                          <Eye size={14} />
                          View
                        </button>
                        <button 
                          className="edit-btn"
                          onClick={() => navigate(`/superadmin/edit-faculty/${faculty.facultyId}`)}
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