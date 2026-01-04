const mongoose = require("mongoose");

const facultyActivitySchema = new mongoose.Schema(
  {
    facultyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
      index: true
    },

    action: {
      type: String,
      required: true
    },

    message: {
      type: String,
      required: true
    },

    performedBy: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "FacultyActivity",
  facultyActivitySchema
);
