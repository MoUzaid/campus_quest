// import React, { useEffect, useState } from "react";
// import "./ViewFaculty.css";

// const ViewFaculty = () => {
//   const [faculties, setFaculties] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchFaculties();
//   }, []);

//   const fetchFaculties = async () => {
//   try {
//     const res = await fetch("http://localhost:5000/api/faculty/all", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`
//       }
//     });

//     const data = await res.json();
//     console.log("Faculty API response:", data);

//     if (!res.ok) {
//       setError(data.message || "Failed to fetch faculty");
//       setLoading(false);
//       return;
//     }

//     // ✅ CORRECT KEY
//     if (Array.isArray(data.faculty)) {
//       setFaculties(data.faculty);
//     } else {
//       setFaculties([]);
//     }

//     setLoading(false);
//   } catch (err) {
//     setError("Server error");
//     setLoading(false);
//   }
// };


// const handleDelete = async (facultyId) => {
//   const confirmDelete = window.confirm(
//     "Are you sure you want to delete this faculty?"
//   );

//   if (!confirmDelete) return;

//   try {
//     const res = await fetch(
//       `http://localhost:5000/api/faculty/delete/${facultyId}`,
//       {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`
//         }
//       }
//     );

//     const data = await res.json();

//     if (!res.ok) {
//       alert(data.message || "Failed to delete faculty");
//       return;
//     }

//     // ✅ REMOVE FROM UI (no reload)
//     setFaculties((prev) =>
//       prev.filter((faculty) => faculty.facultyId !== facultyId)
//     );

//     alert("Faculty deleted successfully");
//   } catch (error) {
//     alert("Server error while deleting faculty");
//   }
// };


//   // 🔍 FILTER
//   const filteredFaculties = faculties.filter((f) =>
//     `${f.name} ${f.facultyId} ${f.email} ${f.department}`
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   if (loading) return <p style={{ padding: 20 }}>Loading faculties...</p>;
//   if (error) return <p style={{ padding: 20, color: "red" }}>{error}</p>;

//   return (
//     <div className="view-faculty-container">
//       <div className="header">
//         <h2>All Faculties</h2>
//         <button
//           className="add-btn"
//           onClick={() => (window.location.href = "/superadmin/add-faculty")}
//         >
//           + Add New Faculty
//         </button>
//       </div>

//       <input
//         type="text"
//         placeholder="Search by Name, Id, Email, or Department..."
//         className="search-box"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <div className="faculty-table-wrapper">
//         <table className="faculty-table">
//           <thead>
//             <tr>
//               <th>S.No.</th>
//               <th>Faculty ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Department</th>
//               <th>Designation</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredFaculties.length === 0 ? (
//               <tr>
//                 <td colSpan="7" style={{ textAlign: "center" }}>
//                   No faculty found
//                 </td>
//               </tr>
//             ) : (
//               filteredFaculties.map((faculty, index) => (
//                 <tr key={faculty._id}>
//                   <td>{index + 1}</td>
//                   <td>{faculty.facultyId}</td>
//                   <td>{faculty.name}</td>
//                   <td>{faculty.email}</td>
//                   <td>{faculty.department}</td>
//                   <td>{faculty.designation}</td>
//                   <td>
//                     {/* CRUD buttons will be added next */}
//                     <button
//   className="delete-btn"
//   onClick={() => handleDelete(faculty.facultyId)}
// >
//   🗑
// </button>

//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ViewFaculty;


import React, { useEffect, useState } from "react";
import "./ViewFaculty.css";

const ViewFaculty = () => {
  const [faculties, setFaculties] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/faculty/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to fetch faculty");
        setLoading(false);
        return;
      }

      setFaculties(Array.isArray(data.faculty) ? data.faculty : []);
      setLoading(false);
    } catch (err) {
      setError("Server error");
      setLoading(false);
    }
  };

  const handleDelete = async (facultyId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this faculty?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/faculty/delete/${facultyId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to delete faculty");
        return;
      }

      setFaculties((prev) =>
        prev.filter((faculty) => faculty.facultyId !== facultyId)
      );

      alert("Faculty deleted successfully");
    } catch (error) {
      alert("Server error while deleting faculty");
    }
  };

  const filteredFaculties = faculties.filter((f) =>
    `${f.name} ${f.facultyId} ${f.email} ${f.department}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) return <p className="status-text">Loading faculties...</p>;
  if (error) return <p className="status-text error">{error}</p>;

  return (
    <div className="faculty-page">
      <div className="faculty-header">
        <div>
          <h2>Faculty Management</h2>
          <p>View and manage all registered faculty members</p>
        </div>

        <button
          className="primary-btn"
          onClick={() => (window.location.href = "/superadmin/add-faculty")}
        >
          + Add Faculty
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by name, ID, email or department..."
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="table-wrapper">
        <table className="faculty-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Faculty ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredFaculties.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">
                  No faculty found
                </td>
              </tr>
            ) : (
              filteredFaculties.map((faculty, index) => (
                <tr key={faculty.facultyId}>
                  <td>{index + 1}</td>
                  <td>{faculty.facultyId}</td>
                  <td>{faculty.name}</td>
                  <td>{faculty.email}</td>
                  <td>{faculty.department}</td>
                  <td>{faculty.designation || "—"}</td>
                  <td>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDelete(faculty.facultyId)}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewFaculty;








