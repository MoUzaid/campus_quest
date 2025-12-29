const express = require("express");
const router = express.Router();
const authSuperAdmin = require("../middleware/authSuperAdmin");

const {
 createOrMergeCourse ,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getGroups,
  createCoursesBulk,
  getAllCoursesByDept,
  getAllCoursesFilter
} = require("../controllers/courseController");

// Create or merge course
//router.post("/add",authSuperAdmin,createOrMergeCourse );

//router.get("/All-courses",getAllCoursesFilter)

// Get all courses
//router.get("/", getAllCourses);

//router.get("/dept",getAllCoursesByDept);

//router.get('/group',getGroups);

// Get course by id
//router.get("/:id",authSuperAdmin, getCourseById);

// Update course
//router.put("/:id",authSuperAdmin,updateCourse);

// Delete course
//router.delete("/:id",authSuperAdmin,deleteCourse);

router.post("/bulk-create", createCoursesBulk);


module.exports = router;
