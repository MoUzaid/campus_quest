const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');

router.get('/quiz/:quizId', leaderboardController.getLeaderboardByQuiz);

module.exports = router;