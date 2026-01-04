












// import React, { useEffect, useState } from "react";
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
//   Loader2
// } from "lucide-react";

// const ViewFaculty = () => {
//   const [faculties, setFaculties] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [deleteModal, setDeleteModal] = useState(null);
  
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
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;
//   const navigate = useNavigate();

//   const departments = ["All", "Computer Science", "Software Engineering", "Information Technology", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering"];
//   const designations = ["All", "Professor", "Associate Professor", "Assistant Professor", "Lecturer", "Head of Department"];
//   const statuses = ["All", "Active", "Inactive"];

//   useEffect(() => {
//     fetchFaculties();
//   }, []);

//   const fetchFaculties = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/faculty/all", {
//         method: "GET",
//         credentials: "include",
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         if (res.status === 401) {
//           localStorage.clear();
//           navigate("/login");
//           return;
//         }
//         setError(data.msg || data.message || "Failed to fetch faculty");
//         setLoading(false);
//         return;
//       }

//       setFaculties(Array.isArray(data.faculty) ? data.faculty : []);
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setError("Server error");
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (facultyId) => {
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/faculty/delete/${facultyId}`,
//         {
//           method: "DELETE",
//           credentials: "include",
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.msg || data.message || "Failed to delete faculty");
//         return;
//       }

//       setFaculties((prev) =>
//         prev.filter((faculty) => faculty.facultyId !== facultyId)
//       );
//       setDeleteModal(null);
//     } catch (err) {
//       console.error(err);
//       alert("❌ Server error while deleting faculty");
//     }
//   };

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
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//           body: JSON.stringify(editForm)
//         }
//       );

//       const data = await res.json();
//       if (!res.ok) {
//         alert(data.msg || "Update failed");
//         return;
//       }

//       setFaculties((prev) =>
//         prev.map((f) =>
//           f.facultyId === editModal.facultyId
//             ? { ...f, ...editForm }
//             : f
//         )
//       );

//       setEditModal(null);
//       alert("✅ Faculty updated successfully!");
//     } catch (err) {
//       alert("Server error");
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

//   const handleFilterChange = (filterName, value) => {
//     setFilters(prev => ({
//       ...prev,
//       [filterName]: value === "All" ? "" : value
//     }));
//     setCurrentPage(1);
//   };

//   const clearFilters = () => {
//     setFilters({
//       department: "",
//       designation: "",
//       status: ""
//     });
//     setSearch("");
//     setCurrentPage(1);
//   };

//   const filteredFaculties = faculties.filter((faculty) => {
//     const matchesSearch = 
//       `${faculty.name} ${faculty.facultyId} ${faculty.email} ${faculty.department}`
//         .toLowerCase()
//         .includes(search.toLowerCase());
    
//     const matchesDepartment = !filters.department || 
//       faculty.department?.toLowerCase().includes(filters.department.toLowerCase());
    
//     const matchesDesignation = !filters.designation || 
//       faculty.designation?.toLowerCase().includes(filters.designation.toLowerCase());
    
//     const matchesStatus = !filters.status || 
//       (filters.status === "Active" ? faculty.isActive : 
//        filters.status === "Inactive" ? !faculty.isActive : true);

//     return matchesSearch && matchesDepartment && matchesDesignation && matchesStatus;
//   });

//   // Pagination
//   const totalPages = Math.ceil(filteredFaculties.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedFaculties = filteredFaculties.slice(startIndex, startIndex + itemsPerPage);

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
//     return name
//       .split(" ")
//       .map(word => word[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   const exportToCSV = () => {
//     const headers = ["Faculty ID", "Name", "Email", "Department", "Designation", "Status"];
//     const csvContent = [
//       headers.join(","),
//       ...filteredFaculties.map(f => [
//         f.facultyId,
//         `"${f.name}"`,
//         f.email,
//         f.department,
//         f.designation || "N/A",
//         f.isActive ? "Active" : "Inactive"
//       ].join(","))
//     ].join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "faculty_list.csv";
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   if (loading) {
//     return (
//       <div className="status-container">
//         <div className="status-card">
//           <div className="loading-spinner"></div>
//           <p className="status-text">Loading faculty data...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="status-container">
//         <div className="status-card">
//           <AlertCircle size={48} color="#f43f5e" />
//           <p className="status-text error">{error}</p>
//           <button className="secondary-btn" onClick={fetchFaculties}>
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="faculty-page">
//       {/* ================= VIEW MODAL ================= */}
//       {viewModal && (
//         <div className="modal-overlay" onClick={() => setViewModal(null)}>
//           <div className="modal-content view-modal" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <div className="faculty-avatar-large">
//                 {getInitials(viewModal.name)}
//               </div>
//               <div>
//                 <h3>{viewModal.name}</h3>
//                 <p className="faculty-id-modal">ID: {viewModal.facultyId}</p>
//               </div>
//               <button className="close-btn" onClick={() => setViewModal(null)}>
//                 <X size={24} />
//               </button>
//             </div>

//             <div className="modal-body">
//               <div className="detail-grid">
//                 <div className="detail-item">
//                   <Mail size={18} className="detail-icon" />
//                   <div>
//                     <p className="detail-label">Email</p>
//                     <p className="detail-value">{viewModal.email}</p>
//                   </div>
//                 </div>

//                 <div className="detail-item">
//                   <Building size={18} className="detail-icon" />
//                   <div>
//                     <p className="detail-label">Department</p>
//                     <p className="detail-value">{viewModal.department || "Not assigned"}</p>
//                   </div>
//                 </div>

//                 <div className="detail-item">
//                   <Award size={18} className="detail-icon" />
//                   <div>
//                     <p className="detail-label">Designation</p>
//                     <p className="detail-value">{viewModal.designation || "Not specified"}</p>
//                   </div>
//                 </div>

//                 <div className="detail-item">
//                   <Clock size={18} className="detail-icon" />
//                   <div>
//                     <p className="detail-label">Status</p>
//                     <span className={`status-badge ${viewModal.isActive ? 'active' : 'inactive'}`}>
//                       {viewModal.isActive ? (
//                         <>
//                           <CheckCircle size={14} />
//                           Active
//                         </>
//                       ) : (
//                         <>
//                           <AlertCircle size={14} />
//                           Inactive
//                         </>
//                       )}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="detail-item full-width">
//                   <User size={18} className="detail-icon" />
//                   <div>
//                     <p className="detail-label">Faculty ID</p>
//                     <p className="detail-value">{viewModal.facultyId}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="modal-footer">
//                 <button 
//                   className="edit-modal-btn"
//                   onClick={() => {
//                     setViewModal(null);
//                     openEditModal(viewModal);
//                   }}
//                 >
//                   <Edit2 size={18} />
//                   Edit Profile
//                 </button>
//                 <button 
//                   className="close-modal-btn"
//                   onClick={() => setViewModal(null)}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}


// {editModal && (
//   <div className="modal-overlay" onClick={() => setEditModal(null)}>
//     <div className="modal-content edit-modal" onClick={(e) => e.stopPropagation()}>
//       <div className="modal-header">
//         <div className="modal-title">
//           <Edit2 size={20} />
//           <h3>Edit Faculty Profile</h3>
//         </div>
//         <button className="close-btn" onClick={() => setEditModal(null)}>
//           <X size={20} />
//         </button>
//       </div>

//       <div className="form-header">
//         <div className="edit-avatar">
//           {getInitials(editForm.name)}
//         </div>
//         <div className="edit-id-email">
//           <p className="edit-id">ID: {editModal.facultyId}</p>
//           <p className="edit-email" title={editModal.email}>{editModal.email}</p>
//         </div>
//       </div>

//       <div className="form-grid">
//         <div className="form-group">
//           <label htmlFor="edit-name">
//             <User size={14} />
//             Full Name
//           </label>
//           <input
//             id="edit-name"
//             type="text"
//             placeholder="Dr. John Doe"
//             value={editForm.name}
//             onChange={(e) =>
//               setEditForm({ ...editForm, name: e.target.value })
//             }
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="edit-email">
//             <Mail size={14} />
//             Email Address
//           </label>
//           <input
//             id="edit-email"
//             type="email"
//             placeholder="john.doe@university.edu"
//             value={editForm.email}
//             onChange={(e) =>
//               setEditForm({ ...editForm, email: e.target.value })
//             }
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="edit-department">
//             <Building size={14} />
//             Department
//           </label>
//           <select
//             id="edit-department"
//             value={editForm.department}
//             onChange={(e) =>
//               setEditForm({ ...editForm, department: e.target.value })
//             }
//             required
//           >
//             <option value="">Select Department</option>
//             {departments
//               .filter((d) => d !== "All")
//               .map((dep) => (
//                 <option key={dep} value={dep}>
//                   {dep}
//                 </option>
//               ))}
//           </select>
//         </div>

//         <div className="form-group">
//           <label htmlFor="edit-designation">
//             <Award size={14} />
//             Designation
//           </label>
//           <select
//             id="edit-designation"
//             value={editForm.designation}
//             onChange={(e) =>
//               setEditForm({ ...editForm, designation: e.target.value })
//             }
//           >
//             <option value="">Select Designation</option>
//             {designations
//               .filter((d) => d !== "All")
//               .map((desig) => (
//                 <option key={desig} value={desig}>
//                   {desig}
//                 </option>
//               ))}
//           </select>
//         </div>

//         <div className="form-group full-width">
//           <label>
//             <CheckCircle size={14} />
//             Account Status
//           </label>
//           <div className="status-toggle">
//             <button
//               className={`status-toggle-btn ${editForm.isActive ? 'active' : ''}`}
//               onClick={() => setEditForm({ ...editForm, isActive: true })}
//               type="button"
//             >
//               <CheckCircle size={12} />
//               Active
//             </button>
//             <button
//               className={`status-toggle-btn ${!editForm.isActive ? 'inactive' : ''}`}
//               onClick={() => setEditForm({ ...editForm, isActive: false })}
//               type="button"
//             >
//               <AlertCircle size={12} />
//               Inactive
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="modal-footer">
//         <button 
//           className="cancel-btn"
//           onClick={() => setEditModal(null)}
//           disabled={saving}
//         >
//           Cancel
//         </button>
//         <button 
//           className="save-btn"
//           onClick={handleEditSubmit}
//           disabled={saving}
//         >
//           {saving ? (
//             <>
//               <Loader2 size={16} className="spinner" />
//               Saving Changes...
//             </>
//           ) : (
//             <>
//               <Save size={16} />
//               Save Changes
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//       {/* ================= DELETE MODAL ================= */}
//       {deleteModal && (
//         <div className="modal-overlay">
//           <div className="modal-content delete-modal">
//             <div className="modal-header">
//               <div className="delete-icon">
//                 <Trash2 size={32} color="#f43f5e" />
//               </div>
//               <h3>Confirm Deletion</h3>
//               <button className="close-btn" onClick={() => setDeleteModal(null)}>
//                 <X size={20} />
//               </button>
//             </div>
//             <p>Are you sure you want to delete faculty member <strong>{deleteModal.name}</strong> (ID: {deleteModal.id})? This action cannot be undone.</p>
//             <div className="modal-actions">
//               <button className="cancel-btn" onClick={() => setDeleteModal(null)}>
//                 Cancel
//               </button>
//               <button 
//                 className="confirm-delete-btn"
//                 onClick={() => handleDelete(deleteModal.id)}
//               >
//                 <Trash2 size={16} />
//                 Delete Faculty
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Header */}
//       <div className="faculty-header">
//         <div>
//           <h2>
//             <Users size={32} style={{ marginRight: "12px" }} />
//             Faculty Management
//           </h2>
//           <p>View and manage all registered faculty members across departments</p>
//         </div>

//         <button
//           className="primary-btn"
//           onClick={() => navigate("/superadmin/add-faculty")}
//         >
//           <UserPlus size={20} />
//           Add New Faculty
//         </button>
//       </div>

//       {/* Filter Section */}
//       <div className="filter-section">
//         <div className="filter-header">
//           <h3>
//             <Filter size={20} />
//             Filter Faculty
//             <span className="filter-count">
//               {filteredFaculties.length} {filteredFaculties.length === 1 ? 'Member' : 'Members'}
//             </span>
//           </h3>
//           <div className="search-bar">
//             <Search className="search-icon" size={20} />
//             <input
//               type="text"
//               placeholder="Search by name, ID, email or department..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="filter-grid">
//           <div className="filter-group">
//             <label htmlFor="department">
//               <Building size={16} /> Department
//             </label>
//             <select
//               id="department"
//               className="select-input"
//               value={filters.department || "All"}
//               onChange={(e) => handleFilterChange("department", e.target.value)}
//             >
//               {departments.map(dept => (
//                 <option key={dept} value={dept}>{dept}</option>
//               ))}
//             </select>
//           </div>

//           <div className="filter-group">
//             <label htmlFor="designation">
//               <Award size={16} /> Designation
//             </label>
//             <select
//               id="designation"
//               className="select-input"
//               value={filters.designation || "All"}
//               onChange={(e) => handleFilterChange("designation", e.target.value)}
//             >
//               {designations.map(desig => (
//                 <option key={desig} value={desig}>{desig}</option>
//               ))}
//             </select>
//           </div>

//           <div className="filter-group">
//             <label htmlFor="status">
//               <CheckCircle size={16} /> Status
//             </label>
//             <select
//               id="status"
//               className="select-input"
//               value={filters.status || "All"}
//               onChange={(e) => handleFilterChange("status", e.target.value)}
//             >
//               {statuses.map(status => (
//                 <option key={status} value={status}>{status}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="filter-actions">
//           <button className="secondary-btn" onClick={clearFilters}>
//             <X size={16} />
//             Clear Filters
//           </button>
//           <button className="secondary-btn" onClick={exportToCSV}>
//             <Download size={16} />
//             Export CSV
//           </button>
//         </div>
//       </div>

//       {/* Faculty Table */}
//       <div className="table-container">
//         <div className="table-header">
//           <h3>
//             <Users size={24} />
//             Faculty Directory
//           </h3>
//           <div className="table-actions">
//             <button className="export-btn" onClick={exportToCSV}>
//               <Download size={16} />
//               Export List
//             </button>
//           </div>
//         </div>

//         <div className="table-wrapper">
//           <table className="faculty-table">
//             <thead>
//               <tr>
//                 <th>Faculty</th>
//                 <th>Email</th>
//                 <th>Department</th>
//                 <th>Designation</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {paginatedFaculties.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" style={{ textAlign: "center", padding: "3rem" }}>
//                     <div style={{ 
//                       display: "flex", 
//                       flexDirection: "column", 
//                       alignItems: "center",
//                       gap: "1rem",
//                       color: "var(--text-secondary)"
//                     }}>
//                       <Users size={48} />
//                       <p style={{ fontSize: "1.1rem", fontWeight: "500" }}>
//                         No faculty members found
//                       </p>
//                       <p>Try adjusting your search or filters</p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 paginatedFaculties.map((faculty) => (
//                   <tr key={faculty.facultyId}>
//                     <td>
//                       <div className="faculty-cell">
//                         <div className="faculty-avatar">
//                           {getInitials(faculty.name)}
//                         </div>
//                         <div className="faculty-info">
//                           <span className="faculty-name">{faculty.name}</span>
//                           <span className="faculty-id">ID: {faculty.facultyId}</span>
//                         </div>
//                       </div>
//                     </td>
//                     <td>
//                       <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
//                         <Mail size={16} color="var(--text-secondary)" />
//                         {faculty.email}
//                       </div>
//                     </td>
//                     <td>
//                       <span className={`department-badge ${getDepartmentClass(faculty.department)}`}>
//                         {faculty.department || "Not Assigned"}
//                       </span>
//                     </td>
//                     <td>
//                       <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
//                         <Award size={16} color="var(--accent-amber)" />
//                         {faculty.designation || "—"}
//                       </div>
//                     </td>
//                     <td>
//                       <span style={{
//                         display: "inline-flex",
//                         alignItems: "center",
//                         gap: "0.5rem",
//                         padding: "0.4rem 0.8rem",
//                         borderRadius: "20px",
//                         background: faculty.isActive ? "rgba(16, 185, 129, 0.1)" : "rgba(244, 63, 94, 0.1)",
//                         color: faculty.isActive ? "#10b981" : "#f43f5e",
//                         fontSize: "0.85rem",
//                         fontWeight: "500"
//                       }}>
//                         {faculty.isActive ? (
//                           <>
//                             <CheckCircle size={14} />
//                             Active
//                           </>
//                         ) : (
//                           <>
//                             <AlertCircle size={14} />
//                             Inactive
//                           </>
//                         )}
//                       </span>
//                     </td>
//                     <td>
//                       <div className="action-buttons">
//                         <button 
//                           className="view-btn"
//                           onClick={() => setViewModal(faculty)}
//                         >
//                           <Eye size={14} />
//                           View
//                         </button>
//                         <button 
//                           className="edit-btn"
//                           onClick={() => openEditModal(faculty)}
//                         >
//                           <Edit2 size={14} />
//                           Edit
//                         </button>
//                         <button 
//                           className="delete-btn"
//                           onClick={() => setDeleteModal({
//                             id: faculty.facultyId,
//                             name: faculty.name
//                           })}
//                         >
//                           <Trash2 size={14} />
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="pagination">
//             <button
//               className="pagination-btn"
//               onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//               disabled={currentPage === 1}
//             >
//               <ChevronLeft size={16} />
//               Previous
//             </button>
            
//             {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//               let pageNum;
//               if (totalPages <= 5) {
//                 pageNum = i + 1;
//               } else if (currentPage <= 3) {
//                 pageNum = i + 1;
//               } else if (currentPage >= totalPages - 2) {
//                 pageNum = totalPages - 4 + i;
//               } else {
//                 pageNum = currentPage - 2 + i;
//               }
              
//               return (
//                 <button
//                   key={pageNum}
//                   className={`pagination-number ${currentPage === pageNum ? "active" : ""}`}
//                   onClick={() => setCurrentPage(pageNum)}
//                 >
//                   {pageNum}
//                 </button>
//               );
//             })}
            
//             <button
//               className="pagination-btn"
//               onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//               disabled={currentPage === totalPages}
//             >
//               Next
//               <ChevronRight size={16} />
//             </button>
            
//             <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginLeft: "1rem" }}>
//               Page {currentPage} of {totalPages}
//             </span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ViewFaculty;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const ViewFaculty = () => {
//   const [faculties, setFaculties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchFaculties();
//   }, []);

//   const fetchFaculties = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/faculty/all", {
//         method: "GET",
//         credentials: "include", // 🍪 cookie auth
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Failed to fetch faculty");
//         setLoading(false);
//         return;
//       }

//       // 🔑 IMPORTANT: data.faculty (NOT data)
//       setFaculties(Array.isArray(data.faculty) ? data.faculty : []);
//     } catch (err) {
//       console.error(err);
//       setError("Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleViewQuizzes = (facultyMongoId) => {
//     // 👇 navigate using MongoDB _id
//     navigate(`/superadmin/faculty/${facultyMongoId}/quizzes`);
//   };

//   if (loading) return <p style={{ padding: 20 }}>Loading faculties...</p>;
//   if (error) return <p style={{ padding: 20, color: "red" }}>{error}</p>;

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Faculty List</h2>

//       {faculties.length === 0 ? (
//         <p>No faculty found</p>
//       ) : (
//         <table
//           border="1"
//           width="100%"
//           cellPadding="10"
//           style={{ marginTop: 20 }}
//         >
//           <thead style={{ background: "#f1f5f9" }}>
//             <tr>
//               <th>Name</th>
//               <th>Faculty ID</th>
//               <th>Email</th>
//               <th>Department</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {faculties.map((faculty) => (
//               <tr key={faculty._id}>
//                 <td>{faculty.name}</td>
//                 <td>{faculty.facultyId}</td>
//                 <td>{faculty.email}</td>
//                 <td>{faculty.department}</td>
//                 <td>
//                   <button
//                     onClick={() => handleViewQuizzes(faculty._id)}
//                     style={{
//                       padding: "6px 12px",
//                       background: "#2563eb",
//                       color: "#fff",
//                       border: "none",
//                       borderRadius: 4,
//                       cursor: "pointer",
//                     }}
//                   >
//                     View Quizzes
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ViewFaculty;



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
                <p className="faculty-id-modal">ID: {viewModal.facultyId}</p>
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
            <div className="modal-header">
              <div className="modal-title">
                <Edit2 size={20} />
                <h3>Edit Faculty Profile</h3>
              </div>
              <button className="close-btn" onClick={() => setEditModal(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="form-header">
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