const jwt = require('jsonwebtoken');
const superAdmin = require('../models/superAdminModel');

const authSuperAdmin = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const newSuperAdmin = await superAdmin.findById(decoded.id).select('-password');
        if (!newSuperAdmin) {
            return res.status(401).json({ message: 'Authorization denied' });
        }
        req.superAdmin = newSuperAdmin;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authSuperAdmin;