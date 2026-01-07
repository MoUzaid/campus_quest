


const Course = require("../models/courseModel");
const Activity = require("../models/activityModel");

/* ================================
   Normalize Input Helper
================================ */
const normalizeInput = (data) => {
  return {
    courseType: data.courseType ? String(data.courseType).trim() : "",
    department: data.department ? String(data.department).trim() : "",
    courseName: data.courseName ? String(data.courseName).trim() : "",
    year: Number(data.year),
    groups: Array.isArray(data.groups)
      ? data.groups
          .map((g) => String(g).trim().toUpperCase())
          .filter(Boolean)
      : [],
  };
}


//  CREATE or MERGE Course (Departmental/Global)

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
//     console.log("👤 Logged in user:", req.user);
//     console.log("🏢 User department:", req.user.department);

//     const courses = await Course.find({
//       department: req.user.department,
//     });

//     console.log("📚 Courses found:", courses.length);

//     res.status(200).json({
//       success: true,
//       total: courses.length,
//       courses,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

exports.allCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      courses,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};


exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      department: req.user.department, // 🔥 MAIN FILTER
    })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });
       console.log(
      `📚 Total Courses in ${req.user.department} department:`,
      courses.length
    );

    return res.status(200).json({
      success: true,
      total: courses.length,
      courses,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
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

exports.getGroups = async (req, res) => {
  try {
    const {courseName, year } = req.body;
    if (!courseName || !year) {
      return res.status(400).json({ message: "courseName and year are required." });
    }
   const course = await Course.findOne({
      courseName: String(courseName).trim(),
      year: Number(year)
    });
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }
    return res.status(200).json({ groups: course.groups });
  } 
  catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
exports.createCoursesBulk = async (req, res) => {
  try {
    const { courses } = req.body;

    if (!Array.isArray(courses) || courses.length === 0) {
      return res.status(400).json({
        message: "Courses array is required"
      });
    }

    const created = [];
    const skipped = [];

    for (const item of courses) {
      const { department, courseName, year, groups } = item;

      if (!department || !Array.isArray(courseName)) {
        skipped.push({ department, reason: "Invalid data" });
        continue;
      }

      const exists = await Course.findOne({ department });

      if (exists) {
        skipped.push({ department, reason: "Already exists" });
        continue;
      }

      const newCourse = new Course({
        department: department.trim(),
        courseName: courseName.map(c => c.trim()),
        year: year || [],
        groups: groups || []
        // createdBy: req.superAdmin._id
      });

      const saved = await newCourse.save();
      created.push(saved);
    }

    return res.status(201).json({
      message: "Bulk course creation completed",
      createdCount: created.length,
      skippedCount: skipped.length,
      skipped
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong",
      error: err.message
    });
  }
};