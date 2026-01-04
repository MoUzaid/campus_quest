


const Course = require("../models/courseModel");



const Activity = require("../models/activityModel");

/* ================================
   Normalize Input Helper
================================ */
const normalizeInput = (data) => {
  return {
    department: data.department
      ? String(data.department).trim().toUpperCase()
      : "",
    courseName: data.courseName
      ? String(data.courseName).trim()
      : "",
    year: Number(data.year),
    groups: Array.isArray(data.groups)
      ? data.groups
          .map((g) => String(g).trim().toUpperCase())
          .filter(Boolean)
      : [],
  };
};

/* =========================================
   CREATE OR MERGE COURSE
========================================= */
exports.createOrMergeCourse = async (req, res) => {
  try {
    const { department, courseName, year, groups } =
      normalizeInput(req.body);

    // 🔐 Always from auth middleware
    const createdBy = req.user.id;

    /* -------- Validation -------- */
    if (!department || !courseName || !year) {
      return res.status(400).json({
        success: false,
        message: "Department, Course Name and Year are required.",
      });
    }

    /* -------- Check existing course -------- */
    const existingCourse = await Course.findOne({
      department,
      normalizedCourseName: courseName.toLowerCase(),
      year,
    });

    /* -------- Merge groups if course exists -------- */
    if (existingCourse) {
      if (groups.length) {
        existingCourse.groups = [
          ...new Set([...existingCourse.groups, ...groups]),
        ];
        await existingCourse.save();
      

await Activity.create({
          action: "COURSE_UPDATED",
          message: `Groups of course "${courseName}" updated in ${department} department`,
          performedBy: req.user?.name || "Super Admin"
        });
    }



      return res.status(200).json({
        success: true,
        message: "Course already exists. Groups merged successfully.",
        course: existingCourse,
      });
    }

    /* -------- Create new course -------- */
    const newCourse = await Course.create({
      department,
      courseName,
      normalizedCourseName: courseName.toLowerCase(),
      year,
      groups,
      createdBy,
    });

     await Activity.create({
      action: "COURSE_ADDED",
      message: `Course "${courseName}" created in ${department} department`,
      performedBy: req.user?.name || "Super Admin"
    });

    const populatedCourse = await Course.findById(newCourse._id).populate(
      "createdBy",
      "name email"
    );

    return res.status(201).json({
      success: true,
      message: "Course created successfully.",
      course: populatedCourse,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

/* ==========================
   UPDATE COURSE
========================== */
exports.updateCourse = async (req, res) => {
  try {
    const body = normalizeInput(req.body);

    if (body.courseName) {
      body.normalizedCourseName = body.courseName.toLowerCase();
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      body,
      { new: true, runValidators: true }
    ).populate("createdBy", "name email");

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }


 await Activity.create({
      action: "COURSE_UPDATED",
      message: `Course "${updatedCourse.courseName}" updated in ${updatedCourse.department} department`,
      performedBy: req.user?.name || "Super Admin"
    });


    return res.status(200).json({
      success: true,
      message: "Course updated successfully.",
      course: updatedCourse,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

/* ==========================
   GET ALL COURSES
========================== */
// exports.getAllCourses = async (req, res) => {
//   try {
//     const courses = await Course.find({
//       department: req.user.department, // 🔥 MAIN FILTER
//     })
//       .populate("createdBy", "name email")
//       .sort({ createdAt: -1 });
//        console.log(
//       `📚 Total Courses in ${req.user.department} department:`,
//       courses.length
//     );

//     return res.status(200).json({
//       success: true,
//       total: courses.length,
//       courses,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   }
// };



exports.getAllCourses = async (req, res) => {
  try {
    console.log("👤 Logged in user:", req.user);
    console.log("🏢 User department:", req.user.department);

    const courses = await Course.find({
      department: req.user.department,
    });

    console.log("📚 Courses found:", courses.length);

    res.status(200).json({
      success: true,
      total: courses.length,
      courses,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};



/* ==========================
   GET COURSE BY ID
========================== */
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    return res.status(200).json({
      success: true,
      course,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

/* ==========================
   DELETE COURSE
========================== */
exports.deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);

    if (!deletedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }


  await Activity.create({
      action: "COURSE_DELETED",
      message: `Course "${deletedCourse.courseName}" deleted from ${deletedCourse.department} department`,
      performedBy: req.user?.name || "Super Admin"
    });


    return res.status(200).json({
      success: true,
      message: "Course deleted successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
