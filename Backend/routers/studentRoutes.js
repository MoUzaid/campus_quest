const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");
const feedbackController = require("../controllers/feedbackController");

const authFacultyOrSuperAdmin = require("../middleware/authFacultyOrAdmin");

const authUser = require("../middleware/authUser");

/* ================= AUTH ================= */

// REGISTER
router.post("/register", studentController.registerStudent);
router.put("/update-password", authUser, studentController.changePassword);
// GET STUDENT PROFILE

router.get("/me", authUser, studentController.getStudentProfile);

// VERIFY EMAIL (OTP)
router.post("/verify-email", studentController.verifyEmail);

// LOGIN - DUPLICATE ROUTES (COMMENTED ONE)
// router.post("/login", studentController.loginStudent);
router.post("/login",studentController.loginStudent);

// REFRESH ACCESS TOKEN
router.post("/refresh", studentController.refreshToken);

// FORGOT PASSWORD
router.post("/forgot-password", studentController.forgotPassword);

// RESET PASSWORD
router.post("/reset-password", studentController.resetPassword);

/* ================= STUDENTS ================= */

// GET ALL STUDENTS
router.get("/", authFacultyOrSuperAdmin, studentController.getAllStudents);

// GET REGISTERED STUDENTS
router.get("/registered-students", authFacultyOrSuperAdmin, studentController.getRegisteredStudents);

// GET STUDENT QUIZZES
router.get("/students-quizzes/:id", authFacultyOrSuperAdmin, studentController.getStudentQuizzes);

// GET ONE STUDENT
router.get("/:id", authFacultyOrSuperAdmin, studentController.getStudent);

// DELETE STUDENT
router.delete("/:id", authFacultyOrSuperAdmin, studentController.deleteStudent);

// Test route (commented in both files)
// router.get("/:id", (req, res) => {
//   console.log("Student ID requested:", req.params.id);
//   res.json({ ok: true });
// });

/* ================= FEEDBACK ================= */

// SUBMIT FEEDBACK - DUPLICATE ROUTES WITH DIFFERENT MIDDLEWARE
// router.post("/feedback", auth, feedbackController.submitFeedback);
router.post("/feedback", authUser, feedbackController.submitFeedback);

// GET QUIZ RATING
router.get("/rating/:quizId", feedbackController.getQuizRating);

// GET ALL FEEDBACKS
router.get("/all-feedbacks", feedbackController.getAllFeedbacks);


// router.get("/profile", authUser, studentController.getMe);
module.exports = router;