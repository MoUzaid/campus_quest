



const jwt = require("jsonwebtoken");
const SuperAdmin = require("../models/superAdminModel");

const authFacultyOrAdmin = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // ✅ Allow only superadmin / HOD
    if (decoded.role !== "superadmin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const superAdmin = await SuperAdmin.findById(decoded.id).select(
      "_id name department role"
    );

    if (!superAdmin) {
      return res.status(403).json({ message: "SuperAdmin not found" });
    }

    if (!superAdmin.department) {
      return res.status(403).json({ message: "Department not assigned" });
    }

    // 🔥 Attach clean user object
    req.user = {
      id: superAdmin._id,
      role: superAdmin.role,
      department: superAdmin.department
    };

    next();
  } catch (err) {
    console.error("AUTH ERROR:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authFacultyOrAdmin;




