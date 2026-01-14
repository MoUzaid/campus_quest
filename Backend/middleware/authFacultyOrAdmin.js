


// const jwt = require("jsonwebtoken");
// const SuperAdmin = require("../models/superAdminModel");

// const authFacultyOrAdmin = async (req, res, next) => {
//   try {
//     const token = req.cookies?.accessToken;
//     if (!token) {
//       return res.status(401).json({ message: "Access token missing" });
//     }

//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//     // Allow only superadmin
//     if (decoded.role !== "superadmin") {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     const admin = await SuperAdmin.findById(decoded.id).select(
//       "_id name department role"
//     );

//     if (!admin) {
//       return res.status(403).json({ message: "SuperAdmin not found" });
//     }

//     if (!admin.department) {
//       return res.status(403).json({ message: "Department not assigned" });
//     }

//     req.user = {
//       id: admin._id,
//       role: admin.role,
//       department: admin.department
//     };

//     next();
//   } catch (error) {
//     console.error("AUTH ERROR:", error.message);
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// module.exports = authFacultyOrAdmin;






const jwt = require("jsonwebtoken");
const Faculty = require("../models/FacultyModel");
const SuperAdmin = require("../models/superAdminModel");

// const authFacultyOrAdmin = async (req, res, next) => {
//   try {
//     const token = req.cookies?.accessToken;
//     if (!token) {
//       return res.status(401).json({ message: "Access token missing" });
//     }

//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//     // ================= SUPER ADMIN =================
//     if (decoded.role === "superadmin") {
//       const admin = await SuperAdmin.findById(decoded.id);
//       if (!admin) {
//         return res.status(403).json({ message: "SuperAdmin not found" });
//       }
//       req.user = admin;
//       return next();
//     }

//     // ================= FACULTY =================
//     if (decoded.role === "faculty") {
//       const faculty = await Faculty.findById(decoded.id);
//       if (!faculty) {
//         return res.status(403).json({ message: "Faculty not found" });
//       }

//       // faculty can update ONLY their own profile
//       if (faculty.facultyId !== req.params.facultyId) {
//         return res.status(403).json({ message: "Access denied" });
//       }

//       req.user = faculty;
//       return next();
//     }

//     return res.status(403).json({ message: "Invalid role" });
//   } catch (err) {
//     console.error("AUTH ERROR:", err.message);
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// module.exports = authFacultyOrAdmin;






const authFacultyOrSuperAdmin = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) {
      return res.status(401).json({ message: "Access token missing" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // SuperAdmin
    if (decoded.role === "superadmin") {
      const admin = await SuperAdmin.findById(decoded.id);
      if (!admin) {
        return res.status(403).json({ message: "SuperAdmin not found" });
      }
      req.user = { id: admin._id, role: "superadmin" };
      return next();
    }

    // Faculty
    if (decoded.role === "faculty") {
      const faculty = await Faculty.findById(decoded.id);
      if (!faculty) {
        return res.status(403).json({ message: "Faculty not found" });
      }
      req.user = { id: faculty._id, role: "faculty" };
      return next();
    }

    return res.status(403).json({ message: "Invalid role" });

  } catch (err) {
    console.log("AUTH ERROR:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authFacultyOrSuperAdmin;