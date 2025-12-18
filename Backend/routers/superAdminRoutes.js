
const express = require("express");
const router = express.Router();

const {
  registerSuperAdmin,
  loginSuperAdmin,
  forgotPassword,
  resetPassword
} = require("../controllers/superAdminController");


// ✔ Register HOD / Super Admin
router.post("/register", registerSuperAdmin);

// ✔ Login Super Admin
router.post("/login", loginSuperAdmin);

// ✔ Forgot Password
router.post("/forgot-password", forgotPassword);

// ✔ Reset Password
router.post("/reset-password", resetPassword);


module.exports = router;
