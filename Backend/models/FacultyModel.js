const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    facultyId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },
    mobileNumber: {
        type: String,
        required: true,
        trim: true,
        match: [/^[0-9]{10}$/, "Invalid mobile number"]
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    designation: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    createdQuizzes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz"
        }
    ]
}, {
    timestamps: true
});

const Faculty = mongoose.model("Faculty", facultySchema);
module.exports = Faculty;
