const express = require("express");
const router = express.Router();

/* ================= CONTROLLERS ================= */
const studentController = require("../controllers/studentController");
const feedbackController = require("../controllers/feedbackController");

/* ================= MIDDLEWARE ================= */
const authUser = require("../middleware/authUser");
const authFacultyOrSuperAdmin = require("../middleware/authFacultyOrAdmin");

/* =================================================
   AUTH & ACCOUNT
================================================= */

// REGISTER
router.post("/register", studentController.registerStudent);

// LOGIN
router.post("/login", studentController.loginStudent);

// VERIFY EMAIL (OTP)
router.post("/verify-email", studentController.verifyEmail);

// RESEND OTP
router.post("/resend-otp", studentController.resendOtp);

// REFRESH TOKEN
router.post("/refresh", studentController.refreshToken);

// FORGOT PASSWORD
router.post("/forgot-password", studentController.forgotPassword);

// RESET PASSWORD
router.post("/reset-password", studentController.resetPassword);

// LOGOUT
router.post("/logout", authUser, studentController.logoutStudent);

// GET LOGGED-IN USER PROFILE
router.get("/profile", authUser, studentController.getMe);

/* =================================================
   STUDENT MANAGEMENT (ADMIN / FACULTY)
================================================= */

// GET ALL STUDENTS
router.get("/", studentController.getAllStudents);

// GET SINGLE STUDENT
router.get("/:id", authFacultyOrSuperAdmin, studentController.getStudent);

// DELETE STUDENT
router.delete("/:id", authFacultyOrSuperAdmin, studentController.deleteStudent);

/* =================================================
   FEEDBACK
================================================= */

// SUBMIT FEEDBACK (student → quiz)
router.post(
  "/:quizId/feedback",
  authUser,
  feedbackController.submitFeedback
);

// GET QUIZ RATING
router.get(
  "/rating/:quizId",
  feedbackController.getQuizRating
);

// GET ALL FEEDBACKS (admin / faculty)
router.get(
  "/all-feedbacks",
  authFacultyOrSuperAdmin,
  feedbackController.getAllFeedbacks
);

module.exports = router;
