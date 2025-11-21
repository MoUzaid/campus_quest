const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subject:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    course: {
        type: [String],
        required: true,
    },
    yr:{
        type:[String],
        required: true,
    },
    group:{
      type:[String],
        required: true,
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
                required: true,
                default: 0,
            }
        }
    ],
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
    registeredStudents:[
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
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;