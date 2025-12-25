const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    quizId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
    },
    message: {
        type: String,
        required: true,
        maxlength: 1000,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;