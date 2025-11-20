const Student = require("../models/studentModel");
const bcrypt = require("bcryptjs");

// REGISTER STUDENT
exports.registerStudent = async (req, res) => {
    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;

        // Save student
        const student = await Student.create(req.body);
        res.json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// LOGIN STUDENT
exports.loginStudent = async (req, res) => {
    try {
        const student = await Student.findOne({ email: req.body.email });
        if (!student) return res.status(404).json({ error: "User not found" });

        const match = await bcrypt.compare(req.body.password, student.password);
        if (!match) return res.status(401).json({ error: "Wrong password" });

        res.json({ message: "Login successful", student });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET ALL STUDENTS
exports.getAllStudents = async (req, res) => {
    const students = await Student.find();
    res.json(students);
};

// GET ONE STUDENT
exports.getStudent = async (req, res) => {
    const student = await Student.findById(req.params.id);
    res.json(student);
};
