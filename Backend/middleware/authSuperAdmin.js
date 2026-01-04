
const jwt = require("jsonwebtoken");
const SuperAdmin = require("../models/superAdminModel");

const authSuperAdmin = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||       // browser
      req.headers.accesstoken;           // thunder / postman

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










