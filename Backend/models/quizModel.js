const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    title: {
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