




const jwt = require("jsonwebtoken");
const SuperAdmin = require("../models/superAdminModel");

const authFacultyOrAdmin = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) {
      return res.status(401).json({ message: "Access token missing" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Allow only superadmin
    if (decoded.role !== "superadmin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const admin = await SuperAdmin.findById(decoded.id).select(
      "_id name department role"
    );

    if (!admin) {
      return res.status(403).json({ message: "SuperAdmin not found" });
    }

    if (!admin.department) {
      return res.status(403).json({ message: "Department not assigned" });
    }

    req.user = {
      id: admin._id,
      role: admin.role,
      department: admin.department
    };

    next();
  } catch (error) {
    console.error("AUTH ERROR:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authFacultyOrAdmin;




