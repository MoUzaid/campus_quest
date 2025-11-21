const Feedback = require('../models/feedbackModel');
const feedbackController = {
    submitFeedback: async (req, res) => {
        try {
const userId = req.user.id;
            const {message, rating } = req.body;
            const newFeedback = new Feedback({
                userId,
                message,
                rating, 
            });
            await newFeedback.save();
            res.status(201).json({ message: 'Feedback submitted successfully', feedback: newFeedback });
        } catch (error) {
            res.status(500).json({ message: 'Error submitting feedback', error: error.message });
        }   
    }
};
module.exports = feedbackController;