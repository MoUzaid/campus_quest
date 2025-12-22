// const jwt = require('jsonwebtoken');
// const superAdmin = require('../models/superAdminModel');

// const authSuperAdmin = async (req, res, next) => {
//     try {
//         const token = req.header('Authorization');
//         const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//         const newSuperAdmin = await superAdmin.findById(decoded.id).select('-password');
//         if (!newSuperAdmin) {
//             return res.status(401).json({ message: 'Authorization denied' });
//         }
//         req.superAdmin = newSuperAdmin;
//         next();
//     } catch (err) {
//         res.status(401).json({ message: 'Token is not valid' });
//     }
// };

// module.exports = authSuperAdmin;









// const jwt = require("jsonwebtoken");
// const SuperAdmin = require("../models/superAdminModel");

// const authSuperAdmin = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         message: "Unauthorized: No token provided"
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(
//       token,
//       process.env.ACCESS_TOKEN_SECRET
//     );

//     const superAdmin = await SuperAdmin
//       .findById(decoded.id)
//       .select("-password");

//     if (!superAdmin) {
//       return res.status(401).json({
//         message: "Unauthorized: Invalid token"
//       });
//     }

//     // attach to request (enterprise pattern)
//     req.superAdmin = superAdmin;
//     req.user = { id: superAdmin._id, role: "superadmin" };

//     next();
//   } catch (error) {
//     return res.status(401).json({
//       message: "Unauthorized: Token expired or invalid"
//     });
//   }
// };

// module.exports = authSuperAdmin;




const jwt = require("jsonwebtoken");
const SuperAdmin = require("../models/superAdminModel");

const authSuperAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized: No token provided"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

  const superAdmin = await SuperAdmin.findById(decoded.id || decoded._id)

      .select("-password");

    if (!superAdmin) {
      return res.status(401).json({
        message: "Unauthorized: Invalid token"
      });
    }

    // ✅ FIXED HERE
    req.superAdmin = superAdmin;
    req.user = { _id: superAdmin._id, role: "superadmin" };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized: Token expired or invalid"
    });
  }
};

module.exports = authSuperAdmin;
