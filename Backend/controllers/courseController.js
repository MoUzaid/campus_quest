const Course = require("../models/courseModel");



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

/***********************************
 * CREATE or MERGE Course (Departmental/Global)
 ***********************************/
exports.createOrMergeCourse = async (req, res) => {
  try {
    const { courseType, department, courseName, year, groups, createdBy } =
      normalizeInput(req.body);

    // 1) Base validation
    if (!courseType || !courseName || !year || !createdBy) {
      return res.status(400).json({
        message:
          "courseType, courseName, year, and createdBy are required fields."
      });
    }

    // 2) Check valid courseType
    if (!["departmental", "global"].includes(courseType)) {
      return res
        .status(400)
        .json({ message: "courseType must be 'departmental' or 'global'." });
    }

    // 3) Mode-based validations
    if (courseType === "departmental") {
      if (!department)
        return res
          .status(400)
          .json({ message: "department is required for departmental courses." });

      if (!groups.length)
        return res.status(400).json({
          message: "Groups are required for departmental courses."
        });
    }

    // Filter based on type
    const filter =
      courseType === "departmental"
        ? { courseType, department, courseName, year }
        : { courseType, courseName, year };

    // Update for departmental
    const update =
      courseType === "departmental"
        ? { $addToSet: { groups: { $each: groups } } }
        : {}; // global has no groups to merge

    const updated = await Course.findOneAndUpdate(filter, update, {
      new: true
    });

    if (updated) {
      return res.status(200).json({
        message: "Existing course updated (merged groups if departmental).",
        course: updated
      });
    }

    // Create new course
    const createData =
      courseType === "departmental"
        ? { courseType, department, courseName, year, groups, createdBy }
        : { courseType, courseName, year, createdBy };

    const created = await Course.create(createData);

    return res
      .status(201)
      .json({ message: "New course created successfully.", course: created });
  } catch (err) {
    // Handle unique index race-case
    if (err.code === 11000) {
      try {
        const { courseType, department, courseName, year, groups } =
          normalizeInput(req.body);

        const filter =
          courseType === "departmental"
            ? { courseType, department, courseName, year }
            : { courseType, courseName, year };

        const merge =
          courseType === "departmental"
            ? { $addToSet: { groups: { $each: groups } } }
            : {};

        const merged = await Course.findOneAndUpdate(filter, merge, {
          new: true
        });

        return res.status(200).json({
          message: "Race condition: existing course updated.",
          course: merged
        });
      } catch (e) {
        return res.status(500).json({ error: e.message });
      }
    }

    return res.status(500).json({ error: err.message });
  }
};

/***********************************
 * GET ALL COURSES (Filtered)
 ***********************************/
exports.getAllCourses = async (req, res) => {
  try {
    const filter = {};

    if (req.query.courseType)
      filter.courseType = String(req.query.courseType).trim();

    if (req.query.department)
      filter.department = String(req.query.department).trim();

    if (req.query.courseName)
      filter.courseName = String(req.query.courseName).trim();

    if (req.query.year) filter.year = Number(req.query.year);

    const courses = await Course.find(filter).sort({
      courseType: 1,
      department: 1,
      courseName: 1,
      year: 1
    });

    return res.status(200).json({ total: courses.length, courses });
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