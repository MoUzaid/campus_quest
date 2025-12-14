const mongoose = require('mongoose');

const quizAttemptSchema = new mongoose.Schema({
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    answers: [
        {
            questionId: String,
            selectedOption: String
        }
    ],
    correctCount: {
        type: Number,
        default: 0
    },
    wrongCount: {
        type: Number,
        default: 0
    },
    scoredMarks: {
        type: Number,
        default: 0
    },
    timeTaken:{
        type: Number,
        required: true
    },
    attemptedAt: {
        type: Date,
        default: Date.now
    }
});

const QuizAttempt = mongoose.model('QuizAttempt', quizAttemptSchema);
module.exports = QuizAttempt;