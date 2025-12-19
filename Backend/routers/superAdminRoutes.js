const express = require("express");
const router = express.Router();

const {
  registerSuperAdmin,
  loginSuperAdmin,
  forgotPassword,
  resetPassword,
  changePassword
} = require("../controllers/superAdminController");

// ✔ Register Super Admin
router.post("/register", registerSuperAdmin);

// ✔ Login Super Admin
router.post("/login", loginSuperAdmin);

// ✔ Change Password (FIRST LOGIN)
router.put("/change-password", changePassword);

// ✔ Forgot Password
router.post("/forgot-password", forgotPassword);

// ✔ Reset Password
router.post("/reset-password", resetPassword);

module.exports = router;
