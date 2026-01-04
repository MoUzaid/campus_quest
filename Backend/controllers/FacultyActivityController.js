// const FacultyActivity = require("../models/FacultyActivityModel");

// exports.createFacultyActivity = async ({
//   facultyId,
//   action,
//   message,
//   performedBy,
// }) => {
//   try {
//     await FacultyActivity.create({
//       facultyId,
//       action,
//       message,
//       performedBy,
//     });
//   } catch (error) {
//     console.error("Faculty Activity Error:", error.message);
//   }
// };

// exports.getFacultyActivities = async (req, res) => {
//   try {
//     const activities = await FacultyActivity.find({
//       facultyId: req.user._id,
//     })
//       .sort({ createdAt: -1 })
//       .limit(50);

//     res.status(200).json(activities);
//   } catch (error) {
//     res.status(500).json({
//       message: "Error fetching faculty activities",
//       error: error.message,
//     });
//   }
// };
