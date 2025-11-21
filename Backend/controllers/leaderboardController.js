// const Leaderboard = require('../models/leaderboardModel');

// const leaderboardController = { 
//     getLeaderboardByQuiz: async (req, res) => {
//         try {
//             const { quizId } = req.params;
//             const leaderboardEntries = await Leaderboard.find({ quizId })
//                 .populate('userId', 'name email') 
//                 .sort({ score: -1, timeTaken: 1 });

//         }
//         catch (error) {
//             res.status(500).json({ message: 'Error fetching leaderboard', error: error.message });
//         }   
//     }
// };
// module.exports = leaderboardController;