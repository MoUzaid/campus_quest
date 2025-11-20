const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// REGISTER
router.post("/register", studentController.registerStudent);

// LOGIN
router.post("/login", studentController.loginStudent);

// ALL STUDENTS
router.get("/", studentController.getAllStudents);

// ONE STUDENT
router.get("/:id", studentController.getStudent);

module.exports = router;
