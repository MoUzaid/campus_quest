const express = require("express");
const router = express.Router();
const authSuperAdmin = require("../middleware/authSuperAdmin");

const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getGroups
} = require("../controllers/courseController");

// Create or merge course
router.post("/add",authSuperAdmin,createCourse);

// Get all courses
router.get("/",getAllCourses);

router.get('/group',getGroups);

// Get course by id
router.get("/:id",authSuperAdmin, getCourseById);

// Update course
router.put("/:id",authSuperAdmin,updateCourse);

// Delete course
router.delete("/:id",authSuperAdmin,deleteCourse);

module.exports = router;
