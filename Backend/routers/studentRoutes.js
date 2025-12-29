const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");
const feedbackController = require("../controllers/feedbackController");

const authFacultyOrSuperAdmin = require("../middleware/authFacultyOrAdmin");
const authUser = require("../middleware/authUser");


/* ================= AUTH ================= */

// REGISTER
router.post("/register", studentController.registerStudent);

// LOGIN
router.post("/login", studentController.loginStudent);

//get your id 
router.get("/profile", authUser, studentController.getMe);

//Logout
router.post("/logout", authUser, studentController.logoutStudent);

// VERIFY EMAIL (OTP)
router.post("/verify-email", studentController.verifyEmail);

//Resent Otp
router.post("/resend-otp", studentController.resendOtp);

// REFRESH ACCESS TOKEN
router.post("/refresh", studentController.refreshToken);

// FORGOT PASSWORD
router.post("/forgot-password", studentController.forgotPassword);

// RESET PASSWORD
router.post("/reset-password", studentController.resetPassword);

/* ================= STUDENTS ================= */

// GET ALL STUDENTS
router.get("/", studentController.getAllStudents);

// GET ONE STUDENT
router.get("/:id", authFacultyOrSuperAdmin, studentController.getStudent);

// DELETE STUDENT
router.delete("/:id", authFacultyOrSuperAdmin, studentController.deleteStudent);

/* ================= FEEDBACK ================= */

// SUBMIT FEEDBACK
router.post("/feedback", authUser, feedbackController.submitFeedback);

router.get(
    "/rating/:quizId",
    feedbackController.getQuizRating
);

// GET ALL FEEDBACKS
router.get("/all-feedbacks", feedbackController.getAllFeedbacks);

module.exports = router;
