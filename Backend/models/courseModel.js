const mongoose = require('mongoose');
const { Schema } = mongoose;

const CourseSchema = new Schema(
  {
    department: {
      type: String,
      required: true,
      trim: true,
    },
    courseName: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
    },
    groups: {
      type: [String],
      required: true,
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: 'At least one group is required',
      },
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User', // HOD
      required: true,
    }
  },
  { timestamps: true }
);

// Prevent duplicate course only inside SAME department
CourseSchema.index(
  { department: 1, courseName: 1, year: 1 },
  { unique: true }
);

module.exports = mongoose.model('Course', CourseSchema);
