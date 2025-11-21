const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const feedbackController = require("../controllers/feedbackController");

// REGISTER
router.post("/register", studentController.registerStudent);

// LOGIN
router.post("/login", studentController.loginStudent);

// FORGOT PASSWORD (send reset email)
router.post("/forgot-password", studentController.forgotPassword);

// RESET PASSWORD (update password using token)
router.post("/reset-password", studentController.resetPassword);

// ALL STUDENTS
router.get("/", studentController.getAllStudents);

// ONE STUDENT
router.get("/:id", studentController.getStudent);

// DELETE STUDENT
router.delete("/:id", studentController.deleteStudent);

// submit feedback
router.post("/feedback", feedbackController.submitFeedback);

module.exports = router;
