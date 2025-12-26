const express = require("express");
const router = express.Router();
const authSuperAdmin = require("../middleware/authSuperAdmin");
const authFaculty = require("../middleware/authFaculty");
const authFacultyOrAdmin =require("../middleware/authFacultyOrAdmin");

const {
  addFaculty,
  // loginFaculty,
  changePassword,
  deleteFaculty,
  getAllFaculty,
  refreshToken,
  forgotPassword,       
  resetPassword,
  getFacultyProfile         
} = require("../controllers/facultyController");




// router.post("/add", authFacultyOrAdmin, addFaculty);

router.post("/add",addFaculty);
// router.post("/login", loginFaculty);
router.put("/update-password",changePassword );
router.delete("/delete/:facultyId",authSuperAdmin,deleteFaculty);
// router.get("/all",getAllFaculty);
router.get("/all", authFacultyOrAdmin, getAllFaculty);

router.post("/refresh_token",refreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/me", authFaculty, getFacultyProfile);

module.exports = router;

