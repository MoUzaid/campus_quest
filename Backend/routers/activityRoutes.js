const express = require("express");
const router = express.Router();
const { getRecentActivities, getAllActivities } = require("../controllers/activityController");

// 🔹 Recent 10 activities
router.get("/recent", getRecentActivities);

// 🔹 Optional: paginated activity history
router.get("/", getAllActivities);

module.exports = router;
