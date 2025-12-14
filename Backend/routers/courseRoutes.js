const express = require("express");
const router = express.Router();
const authSuperAdmin = require("../middleware/authSuperAdmin");

const {
  createOrMergeCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} = require("../controllers/courseController");

// Create or merge course
router.post("/add",authSuperAdmin, createOrMergeCourse);

// Get all courses
router.get("/",authSuperAdmin,getAllCourses);

// Get course by id
router.get("/:id",authSuperAdmin, getCourseById);

// Update course
router.put("/:id",authSuperAdmin,updateCourse);

// Delete course
router.delete("/:id",authSuperAdmin,deleteCourse);

module.exports = router;
