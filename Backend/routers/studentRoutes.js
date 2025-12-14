const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const feedbackController = require("../controllers/feedbackController");
const authFacultyOrSuperAdmin = require("../middleware/authFacultyOrAdmin");
const auth = require("../middleware/auth");

// REGISTER
router.post("/register", studentController.registerStudent);

// LOGIN
router.post("/login", studentController.loginStudent);

// FORGOT PASSWORD (send reset email)
router.post("/forgot-password", studentController.forgotPassword);

// RESET PASSWORD (update password using token)
router.post("/reset-password", studentController.resetPassword);

// ALL STUDENTS
router.get("/",authFacultyOrSuperAdmin, studentController.getAllStudents);

// ONE STUDENT
router.get("/:id",authFacultyOrSuperAdmin, studentController.getStudent);

// DELETE STUDENT
router.delete("/:id", authFacultyOrSuperAdmin,studentController.deleteStudent);

// submit feedback
router.post("/feedback",auth, feedbackController.submitFeedback);
// get all feedbacks
router.get("/all-feedbacks", feedbackController.getAllFeedbacks);

module.exports = router;
