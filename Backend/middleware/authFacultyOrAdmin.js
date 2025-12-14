const jwt = require('jsonwebtoken');
const Faculty = require('../models/FacultyModel');
const SuperAdmin = require('../models/superAdminModel');

const authFacultyOrSuperAdmin = async (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // 🔍 First check Faculty
        const faculty = await Faculty.findById(decoded.id).select('-password');
        if (faculty) {
            req.user = faculty;
            req.role = "FACULTY";
            return next();
        }

        // 🔍 If not Faculty, check SuperAdmin (HOD)
        const superAdmin = await SuperAdmin.findById(decoded.id).select('-password');
        if (superAdmin) {
            req.user = superAdmin;
            req.role = "SUPERADMIN";
            return next();
        }

        return res.status(401).json({ message: "Unauthorized access" });

    } catch (err) {
        return res.status(401).json({ message: "Token is not valid" });
    }
};

module.exports = authFacultyOrSuperAdmin;
