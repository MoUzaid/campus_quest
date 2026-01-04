// const express = require("express");
// const router = express.Router();
// const { getSuperAdminAnalytics } = require("../controllers/superAdminAnalyticsController");
// const authSuperadmin = require("../middleware/authSuperAdmin");

// router.get(
//   "/superadmin/analytics",
//   authSuperadmin,
//   getSuperAdminAnalytics
// );

// module.exports = router;



const express = require("express");
const router = express.Router();

const {
  getSuperAdminAnalytics,
  getAnalyticsByType,
  clearAnalyticsCache
} = require("../controllers/superAdminAnalyticsController");

const authSuperadmin = require("../middleware/authSuperAdmin");

/* ================= SUPER ADMIN ANALYTICS ROUTES ================= */


router.get("/analytics", authSuperadmin, getSuperAdminAnalytics);
router.get("/analytics/:type", authSuperadmin, getAnalyticsByType);
router.delete("/analytics/cache", authSuperadmin, clearAnalyticsCache);


module.exports = router;
