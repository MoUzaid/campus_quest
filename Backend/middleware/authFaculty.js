const jwt = require('jsonwebtoken');
const faculty = require('../models/FacultyModel');

const authFaculty = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const newFaculty = await faculty.findById(decoded.id).select('-password');
        if (!newFaculty) {
            return res.status(401).json({ message: 'Authorization denied' });
        }
        req.faculty = newFaculty;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authFaculty;