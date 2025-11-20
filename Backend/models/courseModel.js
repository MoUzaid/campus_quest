const mongoose = require('mongoose');
const { Schema } = mongoose;

// Group is stored simply as a string inside an array this is faizan branch
const CourseSchema = new Schema(
  {
    courseName: {
      type: String,
      required: true,
      trim: true
    },

    year: {
      type: Number,
      required: true
    },

    // Example: ["A", "B", "C"] or ["A"]
    groups: {
      type: [String],
      required: true,
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: 'At least one group is required'
      }
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User', // HOD
      required: true
    }
  },
  { timestamps: true }
);

// Index to prevent duplicate course + year combo
CourseSchema.index({ courseName: 1, year: 1 }, { unique: true });

module.exports = mongoose.model('Course', CourseSchema);
