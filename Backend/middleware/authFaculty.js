
// const jwt = require("jsonwebtoken");
// const Faculty = require("../models/FacultyModel");

// const authFaculty = async (req, res, next) => {
//   try {
//     // ✅ Get token from cookies (matches your login)
//     const token = req.cookies?.accessToken;
//     console.log(req.cookies)
//     if (!token) {
//       return res.status(401).json({ message: "No token, authorization denied" });
//     }

//     // 🔐 Verify token
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//   console.log(decoded)
//     // 🔍 Fetch faculty from DB
//     const faculty = await Faculty.findById(decoded.id).select("-password");

//     if (!faculty) {
//       return res.status(401).json({ message: "Authorization denied" });
//     }

//     // ✅ Attach faculty to request
//     req.user = faculty;
//     next();
//   } catch (err) {
//     console.error("AuthFaculty Error:", err);
//     return res.status(401).json({ message: "Token is not valid" });
//   }
// };

// module.exports = authFaculty;






const jwt = require("jsonwebtoken");
const Faculty = require("../models/FacultyModel");

const authFaculty = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Include password for routes like change-password
    const faculty = await Faculty.findById(decoded.id);
    if (!faculty) return res.status(401).json({ message: "Unauthorized" });

    req.user = faculty; // password included
    next();
  } catch (err) {
    console.error("AuthFaculty Error:", err);
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authFaculty;
