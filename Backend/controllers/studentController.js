const Student = require("../models/studentModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

// REGISTER STUDENT
exports.registerStudent = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;

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

// DELETE STUDENT
exports.deleteStudent = async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: "Student deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// FORGOT PASSWORD (send email with token)
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const student = await Student.findOne({ email });
        if (!student) return res.status(404).json({ msg: "Student not found" });

        const resetToken = jwt.sign(
            { id: student._id },
            process.env.RESET_PASSWORD_SECRET,
            { expiresIn: "15m" }
        );

        student.resetToken = resetToken;
        student.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
        await student.save();

        const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

        await sendEmail(
            email,
            "Reset Your Campus Quest Password",
            `<p>Hello ${student.name},</p>
            <p>Click the link below to reset your password:</p>
            <a href="${resetLink}">${resetLink}</a>
            <p>This link expires in 15 minutes.</p>`
        );

        res.json({ msg: "Password reset email sent" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// RESET PASSWORD
exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token) return res.status(400).json({ msg: "No token provided" });

        const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);

        const student = await Student.findById(decoded.id);
        if (!student) return res.status(404).json({ msg: "Invalid token" });

        if (student.resetToken !== token)
            return res.status(400).json({ msg: "Token mismatch" });

        if (student.resetTokenExpiry < Date.now())
            return res.status(400).json({ msg: "Token expired" });

        const hashed = await bcrypt.hash(newPassword, 10);
        student.password = hashed;
        student.resetToken = undefined;
        student.resetTokenExpiry = undefined;

        await student.save();

        res.json({ msg: "Password reset successful" });
    } catch (err) {
        res.status(400).json({ msg: "Invalid or expired token" });
    }
};
