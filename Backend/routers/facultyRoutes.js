const express = require("express");
const router = express.Router();
const authSuperAdmin = require("../middleware/authSuperAdmin");

const {
  addFaculty,
  loginFaculty,
  updatePassword,
  deleteFaculty,
  getAllFaculty,
  refreshToken
} = require("../controllers/facultyController");



router.post("/add",authSuperAdmin,addFaculty);
router.post("/login", loginFaculty);
router.put("/update-password", updatePassword);
router.delete("/delete/:facultyId",authSuperAdmin,deleteFaculty);
router.get("/all",authSuperAdmin,getAllFaculty);
router.post("/refresh_token",refreshToken);
module.exports = router;
