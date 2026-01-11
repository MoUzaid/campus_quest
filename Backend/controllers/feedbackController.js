const mongoose = require("mongoose");
const Feedback = require("../models/feedbackModel");
const Quiz = require("../models/quizModel");

const feedbackController = {
  /* ================= SUBMIT FEEDBACK ================= */
 submitFeedback: async (req, res) => {
  try {
    console.log("Feedback data received:", req.body);

    const { quizId } = req.params;
    const userId = req.user.id;
    const { message, feedback, rating } = req.body;

    // ✅ Validate quizId
    if (!quizId || !mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ message: "Invalid quiz ID" });
    }

    // ✅ Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    // ✅ Check quiz exists
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // ✅ Prevent duplicate feedback
    const alreadyGiven = await Feedback.findOne({ quizId, userId });
    if (alreadyGiven) {
      return res.status(400).json({
        message: "You have already submitted feedback",
      });
    }

    const feedbackDoc = await Feedback.create({
      userId,
      quizId,
      message: message || feedback,
      rating,
    });

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback: feedbackDoc,
    });
  } catch (error) {
    console.error("Feedback Error:", error);
    res.status(500).json({
      message: "Error submitting feedback",
      error: error.message,
    });
  }
},

  /* ================= GET QUIZ RATING ================= */
  getQuizRating: async (req, res) => {
    try {
      const { quizId } = req.params;

      const result = await Feedback.aggregate([
        {
          $match: {
            quizId: new mongoose.Types.ObjectId(quizId),
          },
        },
        {
          $group: {
            _id: "$quizId",
            averageRating: { $avg: "$rating" },
            totalReviews: { $sum: 1 },
          },
        },
      ]);

      if (result.length === 0) {
        return res.json({
          averageRating: 0,
          totalReviews: 0,
        });
      }

      res.json({
        averageRating: Number(result[0].averageRating.toFixed(1)),
        totalReviews: result[0].totalReviews,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error calculating rating",
        error: error.message,
      });
    }
  },

  /* ================= GET ALL FEEDBACKS ================= */
  getAllFeedbacks: async (req, res) => {
    try {
      const feedbacks = await Feedback.find()
        .populate("userId", "name enrollmentNumber")
        .populate("quizId", "title subject");

      res.status(200).json(feedbacks);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching feedbacks",
        error: error.message,
      });
    }
  },
};

module.exports = feedbackController;
