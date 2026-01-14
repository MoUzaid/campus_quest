
const jwt = require("jsonwebtoken");
const SuperAdmin = require("../models/superAdminModel");

const authSuperAdmin = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: Access token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const superAdmin = await SuperAdmin.findById(decoded.id).select("-password");

    if (!superAdmin) {
      return res.status(401).json({
        message: "Unauthorized: Invalid token",
      });
    }

    req.superAdmin = superAdmin;

    req.user = {
      id: superAdmin._id,
      role: superAdmin.role || "superadmin",
      department: superAdmin.department,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized: Token expired or invalid",
    });
  }
};

module.exports = authSuperAdmin;




// const jwt = require("jsonwebtoken");
// const SuperAdmin = require("../models/superAdminModel");
// const Faculty = require("../models/FacultyModel");

// const authFacultyOrAdmin = async (req, res, next) => {
//   try {
//     const token = req.cookies?.accessToken;
//     if (!token) {
//       return res.status(401).json({ message: "Access token missing" });
//     }

//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//     /* ===== SUPER ADMIN ===== */
//     if (decoded.role === "superadmin") {
//       const admin = await SuperAdmin.findById(decoded.id);
//       if (!admin) {
//         return res.status(403).json({ message: "SuperAdmin not found" });
//       }

//       req.user = admin;
//       return next();
//     }

//     /* ===== FACULTY (SELF UPDATE ONLY) ===== */
//     if (decoded.role === "faculty") {
//       const faculty = await Faculty.findById(decoded.id);
//       if (!faculty) {
//         return res.status(403).json({ message: "Faculty not found" });
//       }

//       // 🔐 faculty can update ONLY their own profile
//       if (faculty.facultyId !== req.params.facultyId) {
//         return res.status(403).json({ message: "Access denied" });
//       }

//       // req.user = faculty;
//        req.superAdmin = admin;
//       return next();
//     }

//     return res.status(403).json({ message: "Access denied" });
//   } catch (error) {
//     console.error("AUTH ERROR:", error.message);
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// module.exports = authFacultyOrAdmin;






