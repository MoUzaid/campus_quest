const Activity = require("../models/activityModel");

/* =======================================================
   GET RECENT ACTIVITIES
   Fetch last 10 activities (most recent first)
======================================================= */
exports.getRecentActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .sort({ createdAt: -1 })   // newest first
      .limit(10);

    res.status(200).json(activities);
  } catch (err) {
    console.error("Get Recent Activities Error:", err);
    res.status(500).json({ msg: "Failed to fetch activities" });
  }
};

  //  GET ALL ACTIVITIES (OPTIONAL)
  //  If you want to show full history with pagination

exports.getAllActivities = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const total = await Activity.countDocuments();
    const activities = await Activity.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      activities
    });
  } catch (err) {
    console.error("Get All Activities Error:", err);
    res.status(500).json({ msg: "Failed to fetch activities" });
  }
};
