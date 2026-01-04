const express = require("express");
const router = express.Router();
const authSuperAdmin = require("../middleware/authSuperAdmin");

const {
  registerSuperAdmin,
  forgotPassword,
  resetPassword,
  changePassword,
  getSuperAdminProfile,
  getDepartmentAttemptedQuizzes,
  getStudentAttemptedQuizzes,
  getQuizAttemptsAnalytics
} = require("../controllers/superAdminController");



// ✔ Register Super Admin
router.post("/register", registerSuperAdmin);

// ✔ Change Password (FIRST LOGIN)
router.put("/change-password",authSuperAdmin, changePassword);

// ✔ Forgot Password
router.post("/forgot-password", forgotPassword);

// ✔ Reset Password
router.post("/reset-password", resetPassword);

// ✔ SuperAdmin Profile
router.get("/me", authSuperAdmin, getSuperAdminProfile);

// ✔ HOD → Course / Faculty Stats

router.get(
  "/attempted-quizzes",
  authSuperAdmin,
  getDepartmentAttemptedQuizzes
);


router.get(
  "/attempted-quizzes/student/:studentId",
  authSuperAdmin,
  getStudentAttemptedQuizzes
);


router.get(
  "/quiz/:quizId/attempts",
  authSuperAdmin,
  getQuizAttemptsAnalytics
);
module.exports = router;
