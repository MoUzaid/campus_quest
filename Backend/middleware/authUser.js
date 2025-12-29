const jwt = require("jsonwebtoken");
const User = require("../models/studentModel");

const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({
        message: "No token, authorization denied",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Token is not valid",
    });
  }
};

module.exports = authUser;
