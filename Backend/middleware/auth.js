// middleware/auth.js
exports.devAuth = (req, res, next) => {
  // Just attach a dummy user
  req.user = { id: "dummyid", role: "superadmin" }; // or "faculty"
  next();
};
