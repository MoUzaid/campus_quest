const Feedback = require('../models/feedbackModel');
const Quiz = require('../models/quizModel');

const feedbackController = {
    submitFeedback: async (req, res) => {
        try {
            const { quizId } = req.params;
            const userId = req.user.id;
            const { message, rating } = req.body;

            const quiz = await Quiz.findById(quizId);
            if (!quiz) {
                return res.status(404).json({ message: "Quiz not found" });
            }

            const newFeedback = await Feedback.create({
                userId,
                quizId,
                message,
                rating,
            });

            quiz.feedbacks.push(newFeedback._id);
            await quiz.save();

            res.status(201).json({
                message: "Feedback submitted successfully",
                feedback: newFeedback
            });

        } catch (error) {
            res.status(500).json({
                message: "Error submitting feedback",
                error: error.message
            });
        }
    },

    getAllFeedbacks: async (req, res) => {
        try {
            const feedbacks = await Feedback.find()
                .populate('userId', 'name enrollmentNumber')
                .populate('quizId', 'title subject');

            res.status(200).json(feedbacks);
        } catch (error) {
            res.status(500).json({
                message: "Error fetching feedbacks",
                error: error.message
            });
        }
    }
};

module.exports = feedbackController;
