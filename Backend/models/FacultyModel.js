const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema(
  {
    facultyId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    mobileNumber: {
      type: String,
      required: true,
      trim: true
    },

    department: {
      type: String,
      required: true,
      trim: true
    },

    designation: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
role:{
 type:Number,
 required:true,
 default:0,
},
    isTempPassword: {
      type: Boolean,
      default: true
    },

    createdQuizzes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz"
      }
    ]
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.models.Faculty || mongoose.model("Faculty", facultySchema);