const Course = require('../models/CourseModel');

function normalizeInput({ department, courseName, year, groups }) {
  const dept = department ? String(department).trim() : '';
  const course = courseName ? String(courseName).trim() : '';
  const yr = Number(year);

  const normalizedGroups = Array.isArray(groups)
    ? groups
        .map(g => String(g).trim())
        .filter(g => g.length > 0)
    : [];

  return { dept, course, yr, normalizedGroups };
}

// CREATE or MERGE course
exports.createOrMergeCourse = async (req, res) => {
  try {
    const { department, courseName, year, groups, createdBy } = req.body;

    if (!department || !courseName || !year || !groups || !createdBy) {
      return res.status(400).json({ message: 'department, courseName, year, groups and createdBy are required.' });
    }

    const { dept, course, yr, normalizedGroups } = normalizeInput({ department, courseName, year, groups });

    if (!dept || !course || !yr || normalizedGroups.length === 0) {
      return res.status(400).json({ message: 'Invalid input after normalization.' });
    }

    const filter = { department: dept, courseName: course, year: yr };

    // Add sorted groups
    const updated = await Course.findOneAndUpdate(
      filter,
      { 
        $addToSet: { groups: { $each: normalizedGroups } } 
      },
      { new: true }
    );

    if (updated) {
      // Ensure groups stay sorted
      updated.groups = updated.groups.sort();
      await updated.save();

      return res.status(200).json({
        message: 'Existing course updated with new groups (if any).',
        course: updated
      });
    }

    // Create new course
    const created = await Course.create({
      department: dept,
      courseName: course,
      year: yr,
      groups: normalizedGroups.sort(),
      createdBy
    });

    return res.status(201).json({ message: 'New course created successfully.', course: created });

  } catch (err) {
    if (err && err.code === 11000) {
      try {
        const { department, courseName, year, groups } = req.body;
        const { dept, course, yr, normalizedGroups } = normalizeInput({ department, courseName, year, groups });

        const merged = await Course.findOneAndUpdate(
          { department: dept, courseName: course, year: yr },
          { $addToSet: { groups: { $each: normalizedGroups } } },
          { new: true }
        );

        merged.groups = merged.groups.sort();
        await merged.save();

        return res.status(200).json({
          message: 'Race condition: existing course updated with new groups.',
          course: merged
        });
      } catch (e2) {
        return res.status(500).json({ error: e2.message });
      }
    }
    return res.status(400).json({ error: err.message });
  }
};

// GET all courses — now uses lean()
exports.getAllCourses = async (req, res) => {
  try {
    const { department, courseName, year } = req.query;
    const filter = {};

    if (department) filter.department = String(department).trim();
    if (courseName) filter.courseName = String(courseName).trim();
    if (year) filter.year = Number(year);

    const courses = await Course.find(filter)
      .sort({ department: 1, courseName: 1, year: 1 })
      .lean();

    return res.status(200).json({ total: courses.length, courses });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).lean();
    if (!course) return res.status(404).json({ message: 'Course not found.' });
    return res.status(200).json(course);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    if (req.body.department) req.body.department = String(req.body.department).trim();
    if (req.body.courseName) req.body.courseName = String(req.body.courseName).trim();
    if (req.body.year) req.body.year = Number(req.body.year);
    if (Array.isArray(req.body.groups)) {
      req.body.groups = req.body.groups.map(g => String(g).trim()).filter(Boolean).sort();
    }

    const updated = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: 'Course not found.' });

    return res.status(200).json({ message: 'Course updated.', course: updated });
  } catch (err) {
    if (err && err.code === 11000) {
      return res.status(400).json({ message: 'Update would create duplicate course (department+courseName+year must be unique).' });
    }
    return res.status(400).json({ error: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Course not found.' });
    return res.status(200).json({ message: 'Course deleted.' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
