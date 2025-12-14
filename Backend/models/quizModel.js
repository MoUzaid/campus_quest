const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
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
    course: {
        type: [String],
    },
    yr: {
        type: [String],
    },
    group: {
        type: [String],
    },
    department: {
        type: String,
        required: true,
    },
    questions: [
        {
            questionText: {
                type: String,
                required: true,
            },
            imageUrl:[ {
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
                required: true,
                default: 1,
            },

            negativeMarks: {
                type: Number,
                default: 0,
            },
        }
    ],

    passingMarks: {
        type: Number,
        required: true,
    },

    totalMarks: {
        type: Number,
        required: true,
    },

    startTime: {
        type: Date,
        required: true,
    },

    endTime: {
        type: Date,
        required: true,
    },

    durationMinutes: {
        type: Number,
        required: true,
    },

    registeredStudents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
        }
    ],

    leaderboard: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Leaderboard',
    },

    allowedAttempts: {
        type: Number,
        required: true,
        default: 1,
    },
   feedbacks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Feedback',
        }
    ],
    certificatesGenerated: {
  type: Boolean,
  default: false
},
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
