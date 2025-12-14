const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const studentSchema = new mongoose.Schema({
    studentId: {
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

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true
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

    course: {
        type: String,        // Example: "BCA", "BBA", "B.Tech"
        required: true,
        trim: true
    },

    semester: {
        type: Number,
        required: true
    },

    group: {
        type: String,        // Example: "A", "B", "C"
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    // password reset fields
    resetToken: {
        type: String,
        default: null
    },

    resetTokenExpiry: {
        type: Date,
        default: null
    }

}, { timestamps: true });


// Hash password before save
studentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model("Student", studentSchema);
