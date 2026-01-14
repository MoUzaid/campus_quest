const express = require("express");
const router = express.Router();
const authSuperAdmin = require("../middleware/authSuperAdmin");

const {
  superAdminLogin,
  registerSuperAdmin,
  forgotPassword,
  resetPassword,
  changePassword,
  getSuperAdminProfile,
  refreshToken,
  getDepartmentAttemptedQuizzes,
  getStudentAttemptedQuizzes,
  getQuizAttemptsAnalytics,
  updateSuperAdminProfile

} = require("../controllers/superAdminController");

const authFacultyOrAdmin = require("../middleware/authFacultyOrAdmin");


router.post("/login",superAdminLogin);

// ✔ Register Super Admin
router.post("/register", registerSuperAdmin);

// ✔ Change Password (FIRST LOGIN)
router.put("/change-password",authSuperAdmin, changePassword);

// ✔ Forgot Password
router.post("/forgot-password", forgotPassword);

// ✔ Reset Password
router.post("/reset-password", resetPassword);

//refresh Token
router.get("/refresh-token",refreshToken);

// ✔ SuperAdmin Profile
router.put("/update/profile", authSuperAdmin, updateSuperAdminProfile);
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
