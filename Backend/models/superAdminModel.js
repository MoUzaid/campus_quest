const mongoose = require('mongoose');

const superAdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    facultyId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    designation: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    departmentQuizzes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Quiz',
        }
    ],

    /* 🔐 PASSWORD FIELDS */
    password: {
        type: String,
        required: true,
    },

    tempPassword: {
        type: String, // hashed temp password
        default: null,
    },

    isTempPasswordUsed: {
        type: Boolean,
        default: false, // first login check
    },

    /* 🔁 RESET PASSWORD FIELDS */
    resetPasswordToken: {
        type: String,
        default: null,
    },

    resetPasswordExpires: {
        type: Date,
        default: null,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const SuperAdmin = mongoose.model('SuperAdmin', superAdminSchema);
module.exports = SuperAdmin;
