const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");
const feedbackController = require("../controllers/feedbackController");

const authFacultyOrSuperAdmin = require("../middleware/authFacultyOrAdmin");
const auth = require("../middleware/auth");

/* ================= AUTH ================= */

// REGISTER
router.post("/register", studentController.registerStudent);

// VERIFY EMAIL (OTP)
router.post("/verify-email", studentController.verifyEmail);

// LOGIN
router.post("/login", studentController.loginStudent);

// REFRESH ACCESS TOKEN
router.post("/refresh", studentController.refreshToken);

// FORGOT PASSWORD
router.post("/forgot-password", studentController.forgotPassword);

// RESET PASSWORD
router.post("/reset-password", studentController.resetPassword);

/* ================= STUDENTS ================= */

// GET ALL STUDENTS
router.get("/", authFacultyOrSuperAdmin, studentController.getAllStudents);

// GET ONE STUDENT
router.get("/:id", authFacultyOrSuperAdmin, studentController.getStudent);

// DELETE STUDENT
router.delete("/:id", authFacultyOrSuperAdmin, studentController.deleteStudent);

/* ================= FEEDBACK ================= */

// SUBMIT FEEDBACK
router.post("/feedback", auth, feedbackController.submitFeedback);

// GET ALL FEEDBACKS
router.get("/all-feedbacks", feedbackController.getAllFeedbacks);

module.exports = router;
