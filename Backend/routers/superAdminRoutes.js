const express = require("express");
const router = express.Router();
const authSuperAdmin = require("../middleware/authSuperAdmin");
const {
  registerSuperAdmin,
  loginSuperAdmin,
  forgotPassword,
  resetPassword,
  changePassword,
  getSuperAdminProfile
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
router.get("/me", authSuperAdmin, getSuperAdminProfile);
module.exports = router;
