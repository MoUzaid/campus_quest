const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    action: { type: String, required: true }, // e.g. COURSE_ADDED, FACULTY_DELETED
    message: { type: String, required: true }, // human-readable
    performedBy: { type: String, default: "Super Admin" } // can be req.user.name
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
