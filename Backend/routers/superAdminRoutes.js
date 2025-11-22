
const express = require("express");
const router = express.Router();

const {
  registerSuperAdmin,
  loginSuperAdmin
} = require("../controllers/superAdminController");


// ✔ Register HOD / Super Admin
router.post("/register", registerSuperAdmin);

// ✔ Login Super Admin
router.post("/login", loginSuperAdmin);

module.exports = router;
