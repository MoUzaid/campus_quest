const express = require("express");
const router = express.Router();

const {
  getStudentAnalytics,
  getQuizHistory,
  getSubjectAnalysis,
} = require("../controllers/studentAnalyticsController");

const authUser = require("../middleware/authUser");




router.get(
  "/:studentId",
  authUser,
  getStudentAnalytics
);

router.get(
  "/:studentId/quiz-history",
  authUser,
  getQuizHistory
);


router.get(
  "/:studentId/subject-analysis",
    authUser,
  getSubjectAnalysis
);

module.exports = router;
