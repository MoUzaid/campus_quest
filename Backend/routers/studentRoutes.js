const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");
const feedbackController = require("../controllers/feedbackController");

const authFacultyOrSuperAdmin = require("../middleware/authFacultyOrAdmin");
const auth = require("../middleware/auth");

/* ================= AUTH ================= */

// REGISTER
router.post("/register", studentController.registerStudent);
router.get("/me", auth, studentController.getStudentProfile);

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
// GET /students/registered
router.get("/registered-students", authFacultyOrSuperAdmin, studentController.getRegisteredStudents);
router.get("/students-quizzes/:id", authFacultyOrSuperAdmin,studentController.getStudentQuizzes);
// GET ONE STUDENT
router.get("/:id", authFacultyOrSuperAdmin, studentController.getStudent);

// DELETE STUDENT
router.delete("/:id", authFacultyOrSuperAdmin, studentController.deleteStudent);

// router.get("/:id", (req, res) => {
//   console.log("Student ID requested:", req.params.id);
//   res.json({ ok: true });
// });

/* ================= FEEDBACK ================= */

// SUBMIT FEEDBACK
router.post("/feedback", auth, feedbackController.submitFeedback);

// GET ALL FEEDBACKS
router.get("/all-feedbacks", feedbackController.getAllFeedbacks);

module.exports = router;
