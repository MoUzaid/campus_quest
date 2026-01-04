const jwt = require("jsonwebtoken");
const User = require("../models/studentModel");

const authUser = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken; // ✅ read from cookie
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Ensure this user is a student
    req.user = await User.findById(decoded.id).select("-password -refreshToken");
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authUser;
