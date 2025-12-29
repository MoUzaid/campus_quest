// CourseModel.js
const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    courseType: {
      type: String,
      enum: ["departmental", "global"],
      required: true,
    },

    // Only required when courseType is departmental
    department: {
      type: String,
      required: function () {
        return this.courseType === "departmental";
      },
      trim: true,
    },

    // Example: BCA, MCA, PGDCA
    courseName: {
      type: [String],
      required: true,
      trim: true
    },

    // Example: 1st year, 2nd year, etc.
    year: {
      type: Number,
      required: true,
    },

    // Only required for departmental mode
    groups: {
      type: [String],
      validate: {
        validator: function (v) {
          if (this.courseType === "departmental") {
            return Array.isArray(v) && v.length > 0;
          }
          return true;
        },
        message: "At least one group is required for departmental courses",
      },
      default: [],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'superAdmin', // HOD
      required: true,
    }
  },
  { timestamps: true }
);
  
CourseSchema.index(
  { courseType: 1, department: 1, courseName: 1, year: 1 },
  {
    unique: true,
    partialFilterExpression: { courseType: "departmental" }
  }
);

CourseSchema.index(
  { courseType: 1, courseName: 1, year: 1 },
  {
    unique: true,
    partialFilterExpression: { courseType: "global" }
  }
);

module.exports = mongoose.model('Course', CourseSchema);