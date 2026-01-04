// CourseModel.js
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    
    department: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },

    
    courseName: {
      type: String,
      required: true,
      trim: true
    },

    
    normalizedCourseName: {
      type: String,
      required: true,
      lowercase: true,
      index: true
    },

   
    year: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    
    groups: [
      {
        type: String,
        trim: true,
        uppercase: true,
        require:true
      }
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SuperAdmin",
      required: true
    }
  },
  { timestamps: true }
);


 
courseSchema.pre("save", function (next) {
  if (this.isModified("courseName")) {
    this.normalizedCourseName = this.courseName.toLowerCase();
  }
  next();
});


courseSchema.index(
  { department: 1, normalizedCourseName: 1 },
  { unique: true }
);

 module.exports = mongoose.model("Course", courseSchema);

