const mongoose = require('mongoose');
const { Schema } = mongoose;

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
    groups: {
      type: [String],
      required: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'superAdmin',
      required: true
    }
  },
  { timestamps: true }
);



module.exports = mongoose.model('Course', CourseSchema);
