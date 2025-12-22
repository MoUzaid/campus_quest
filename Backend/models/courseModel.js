// CourseModel.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseType: {
    type: String,
    enum: ['departmental', 'global'],
    required: true,
    lowercase: true // Store in lowercase
  },
  department: {
    type: String,
    trim: true
  },
  courseName: {
    type: String,
    required: true,
    trim: true
  },
  normalizedCourseName: {  // ✅ NEW: For case-insensitive search
    type: String,
    required: true,
    lowercase: true,
    index: true  // Index for fast searches
  },
  year: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  groups: [{
    type: String,
    trim: true
  }],
  normalizedGroups: [{  // ✅ NEW: For case-insensitive group search
    type: String,
    lowercase: true
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SuperAdmin',
    required: true
  }
}, {
  timestamps: true
});

// Pre-save middleware to normalize data
courseSchema.pre('save', function(next) {
  // Normalize course name for search
  if (this.isModified('courseName')) {
    this.normalizedCourseName = this.courseName.toLowerCase();
  }
  
  // Normalize department for search
  if (this.isModified('department') && this.department) {
    this.department = this.department.toUpperCase(); // Store department in uppercase
  }
  
  // Normalize groups for search
  if (this.isModified('groups') && this.groups.length > 0) {
    this.normalizedGroups = this.groups.map(g => g.toLowerCase());
  }
  
  next();
});

module.exports = mongoose.model('Course', courseSchema);