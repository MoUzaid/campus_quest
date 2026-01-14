// const jwt = require("jsonwebtoken");
// const User = require("../models/studentModel");

// const authUser = async (req, res, next) => {
//   try {
//     const token = req.cookies.accessToken;
//     if (!token) {
//       return res.status(401).json({
//         message: "No token, authorization denied",
//       });
//     }

//     const decoded = jwt.verify(
//       token,
//       process.env.ACCESS_TOKEN_SECRET
//     );

//     req.user = await User.findById(decoded.id).select("-password");

//     if (!req.user) {
//       return res.status(401).json({
//         message: "User not found",
//       });
//     }

//     next();
//   } catch (err) {
//     return res.status(401).json({
//       message: "Token is not valid",
//     });
//   }
// };

// module.exports = authUser;



const jwt = require("jsonwebtoken");
const User = require("../models/studentModel");

const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (
      req.params.studentId &&
      user._id.toString() !== req.params.studentId
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authUser;
