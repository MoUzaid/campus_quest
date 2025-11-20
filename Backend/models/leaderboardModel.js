const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students',
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
   timeTaken:{
        type: Number, // in seconds
        required: true,
   }
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
module.exports = Leaderboard;
































