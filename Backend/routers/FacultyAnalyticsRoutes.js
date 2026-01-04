const express = require("express");
const router = express.Router();
const { getFacultyAnalytics } = require("../controllers/FacultyAnalyticsController");
const authFaculty  = require("../middleware/authFaculty");

router.get("/faculty/analytics", authFaculty, getFacultyAnalytics);

module.exports = router;
