// const Course = require("../models/CourseModel");


// function normalizeInput(data) {
//   return {
//     courseType: data.courseType
//       ? String(data.courseType).trim().toLowerCase()
//       : "",
//     department: data.department ? String(data.department).trim() : "",
//     courseName: data.courseName ? String(data.courseName).trim() : "",
//     year: Number(data.year),
//     groups: Array.isArray(data.groups)
//       ? data.groups.map(g => String(g).trim()).filter(Boolean)
//       : [],
//   };
// }

// /* =========================================
//    CREATE or MERGE COURSE (MAIN FIXED API)
// ========================================= */
// exports.createOrMergeCourse = async (req, res) => {
//   try {
//     const { courseType, department, courseName, year, groups } =
//       normalizeInput(req.body);

//     // 🔐 createdBy ALWAYS from token
//     const createdBy = req.user._id;

//     /* -------- Validation -------- */
//     if (!courseType || !courseName || !year) {
//       return res.status(400).json({
//         success: false,
//         message: "courseType, courseName and year are required.",
//       });
//     }

//     if (!["departmental", "global"].includes(courseType)) {
//       return res.status(400).json({
//         success: false,
//         message: "courseType must be 'departmental' or 'global'.",
//       });
//     }

//     if (courseType === "departmental") {
//       if (!department) {
//         return res.status(400).json({
//           success: false,
//           message: "department is required for departmental courses.",
//         });
//       }

//       if (!groups.length) {
//         return res.status(400).json({
//           success: false,
//           message: "At least one group is required for departmental courses.",
//         });
//       }
//     }

//     /* -------- Check existing course -------- */
//     const filter =
//       courseType === "departmental"
//         ? { courseType, department, courseName, year }
//         : { courseType, courseName, year };

//     const existingCourse = await Course.findOne(filter).populate(
//       "createdBy",
//       "name email"
//     );

//     // 🔁 Merge groups if already exists
//     if (existingCourse) {
//       if (courseType === "departmental") {
//         existingCourse.groups = [
//           ...new Set([...existingCourse.groups, ...groups]),
//         ];
//         await existingCourse.save();
//       }

//       return res.status(200).json({
//         success: true,
//         message: "Course already exists. Groups merged successfully.",
//         course: existingCourse,
//       });
//     }

//     /* -------- Create new course -------- */
//     const newCourse = await Course.create({
//       courseType,
//       department: courseType === "departmental" ? department : undefined,
//       courseName,
//       year,
//       groups: courseType === "departmental" ? groups : [],
//       createdBy, // ✅ from token
//     });

//     const populatedCourse = await Course.findById(newCourse._id).populate(
//       "createdBy",
//       "name email"
//     );

//     return res.status(201).json({
//       success: true,
//       message: "Course created successfully.",
//       course: populatedCourse,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   }
// };

// /* ==========================
//    GET ALL COURSES
// ========================== */
// exports.getAllCourses = async (req, res) => {
//   try {
//     const courses = await Course.find({})
//       .populate("createdBy", "name email")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       total: courses.length,
//       course: courses,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   }
// };

// /* ==========================
//    GET COURSE BY ID
// ========================== */
// exports.getCourseById = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id).populate(
//       "createdBy",
//       "name email"
//     );

//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         message: "Course not found.",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       course,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   }
// };

// /* ==========================
//    UPDATE COURSE
// ========================== */
// exports.updateCourse = async (req, res) => {
//   try {
//     const body = normalizeInput(req.body);

//     const updated = await Course.findByIdAndUpdate(
//       req.params.id,
//       body,
//       { new: true, runValidators: true }
//     ).populate("createdBy", "name email");

//     if (!updated) {
//       return res.status(404).json({
//         success: false,
//         message: "Course not found.",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Course updated successfully.",
//       course: updated,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   }
// };

// /* ==========================
//    DELETE COURSE
// ========================== */
// exports.deleteCourse = async (req, res) => {
//   try {
//     const deleted = await Course.findByIdAndDelete(req.params.id);

//     if (!deleted) {
//       return res.status(404).json({
//         success: false,
//         message: "Course not found.",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Course deleted successfully.",
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   }
// };









const Course = require("../models/CourseModel");

/* ================================
   Normalize input (convert to uppercase)
================================ */
function normalizeInput(data) {
  return {
    courseType: data.courseType
      ? String(data.courseType).trim().toLowerCase()
      : "",
    department: data.department 
      ? String(data.department).trim().toUpperCase()
      : "",
    courseName: data.courseName 
      ? String(data.courseName).trim().toUpperCase()
      : "",
    year: Number(data.year),
    groups: Array.isArray(data.groups)
      ? data.groups.map(g => String(g).trim().toUpperCase()).filter(Boolean)
      : [],
  };
}

/* =========================================
   CREATE or MERGE COURSE (MAIN FIXED API)
========================================= */
exports.createOrMergeCourse = async (req, res) => {
  try {
    const { courseType, department, courseName, year, groups } =
      normalizeInput(req.body);

    // 🔐 createdBy ALWAYS from token
    const createdBy = req.user._id;

    /* -------- Validation -------- */
    if (!courseType || !courseName || !year) {
      return res.status(400).json({
        success: false,
        message: "courseType, courseName and year are required.",
      });
    }

    if (!["departmental", "global"].includes(courseType)) {
      return res.status(400).json({
        success: false,
        message: "courseType must be 'departmental' or 'global'.",
      });
    }

    if (courseType === "departmental") {
      if (!department) {
        return res.status(400).json({
          success: false,
          message: "department is required for departmental courses.",
        });
      }

      if (!groups.length) {
        return res.status(400).json({
          success: false,
          message: "At least one group is required for departmental courses.",
        });
      }
    }

    /* -------- Check existing course (CASE INSENSITIVE) -------- */
    // Convert search criteria to uppercase for case-insensitive comparison
    const filter =
      courseType === "departmental"
        ? { 
            courseType, 
            department: department.toUpperCase(), 
            courseName: courseName.toUpperCase(), 
            year 
          }
        : { 
            courseType, 
            courseName: courseName.toUpperCase(), 
            year 
          };

    // Use regex for case-insensitive search in database
    const existingCourse = await Course.findOne({
      courseType,
      year,
      $or: [
        { 
          courseName: { $regex: new RegExp(`^${courseName}$`, 'i') },
          ...(courseType === "departmental" ? { department: { $regex: new RegExp(`^${department}$`, 'i') } } : {})
        }
      ]
    }).populate("createdBy", "name email");

    // 🔁 Merge groups if already exists
    if (existingCourse) {
      if (courseType === "departmental") {
        // Combine groups, convert to uppercase, and remove duplicates
        const combinedGroups = [
          ...new Set([
            ...existingCourse.groups.map(g => g.toUpperCase()),
            ...groups
          ])
        ];
        existingCourse.groups = combinedGroups;
        await existingCourse.save();
      }

      return res.status(200).json({
        success: true,
        message: "Course already exists. Groups merged successfully.",
        course: existingCourse,
      });
    }

    /* -------- Create new course -------- */
    const newCourse = await Course.create({
      courseType,
      department: courseType === "departmental" ? department.toUpperCase() : undefined,
      courseName: courseName.toUpperCase(),
      year,
      groups: courseType === "departmental" 
        ? groups.map(g => g.toUpperCase()) 
        : [],
      createdBy, // ✅ from token
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
    
    // Convert values to uppercase before saving
    if (body.department) body.department = body.department.toUpperCase();
    if (body.courseName) body.courseName = body.courseName.toUpperCase();
    if (body.groups && body.groups.length) {
      body.groups = body.groups.map(g => g.toUpperCase());
    }

    const updated = await Course.findByIdAndUpdate(
      req.params.id,
      body,
      { new: true, runValidators: true }
    ).populate("createdBy", "name email");

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully.",
      course: updated,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

/* ==========================
   GET ALL COURSES
========================== */
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({})
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: courses.length,
      course: courses,
    });
  } catch (err) {
    res.status(500).json({
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

    res.status(200).json({
      success: true,
      course,
    });
  } catch (err) {
    res.status(500).json({
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
    const deleted = await Course.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};