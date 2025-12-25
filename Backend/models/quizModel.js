const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({

  /* ================= BASIC INFO ================= */

  title: {
    type: String,
    required: true,
  },

  subject: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  department: {
    type: String,
    required: true,
  },

  course: [String],
  yr: [String],
  group: [String],

  /* ================= QUESTIONS ================= */

  questions: [
    {
      questionText: {
        type: String,
        required: true,
      },

      imageUrl: [
        {
          type: String,
        }
      ],

      options: [
        {
          type: String,
          required: true,
        }
      ],

      correctAnswer: {
        type: String,
        required: true,
      },

      marks: {
        type: Number,
        default: 1,
      },

      negativeMarks: {
        type: Number,
        default: 0,
      },
    }
  ],

  /* ================= MARKING ================= */

  passingMarks: {
    type: Number,
    required: true,
  },

  totalMarks: {
    type: Number,
    required: true,
  },

  /* ================= QUIZ SCHEDULE ================= */

  startTime: {
    type: Date,
    required: true,   // quiz visible start time
  },

  endTime: {
    type: Date,
    required: true,
  },

  durationMinutes: {
    type: Number,
    required: true,
  },

  /* ================= TIMER (MOST IMPORTANT) ================= */

  // jab faculty "Start Quiz" click kare
  quizStartTime: {
    type: Date,   // SERVER TIME
  },

  durationSeconds: {
    type: Number,
    default: 600, // 10 minutes
  },

  isStarted: {
    type: Boolean,
    default: false,
  },

  /* ================= STUDENTS ================= */

  registeredStudents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    }
  ],

  allowedAttempts: {
    type: Number,
    default: 1,
  },

  /* ================= RESULTS ================= */

  leaderboard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Leaderboard",
  },

  certificatesGenerated: {
    type: Boolean,
    default: false,
  },

  feedbacks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feedback",
    }
  ],

  /* ================= FACULTY ================= */

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: false,
  },

  /* ================= META ================= */

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model("Quiz", quizSchema);
