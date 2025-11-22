const express = require("express");
const router = express.Router();

const {
  addFaculty,
  loginFaculty,
  updatePassword,
  deleteFaculty,
  getAllFaculty
} = require("../controllers/facultyController");



router.post("/add", addFaculty);
router.post("/login", loginFaculty);
router.put("/update-password", updatePassword);
router.delete("/delete/:facultyId", deleteFaculty);
router.get("/all", getAllFaculty);
module.exports = router;
