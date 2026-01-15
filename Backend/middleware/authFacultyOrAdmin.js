





const jwt = require("jsonwebtoken");
const Faculty = require("../models/FacultyModel");
const SuperAdmin = require("../models/superAdminModel");
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
      req.user = { id: admin._id, role: "superadmin" ,department: admin.department || null };
      return next();
    }




    // Faculty
    if (decoded.role === "faculty") {
      const faculty = await Faculty.findById(decoded.id);
      if (!faculty) {
        return res.status(403).json({ message: "Faculty not found" });
      }
      req.user = { id: faculty._id, role: "faculty",department: faculty.department  };
      return next();
    }

    return res.status(403).json({ message: "Invalid role" });

  } catch (err) {
    console.log("AUTH ERROR:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};


module.exports = authFacultyOrSuperAdmin;
