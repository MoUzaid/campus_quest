// const express = require('express');
// const mongoose = require('mongoose');
// require('dotenv').config();

// const app = express();

// // Middleware to parse JSON
// app.use(express.json());

// // Import Routes
// const superAdminRoutes = require("./routes/superAdminRoutes");

// const facultyRoutes = require("./routes/facultyRoutes");
// app.use("/api/faculty", facultyRoutes);
// // ENV Variables
// const PORT = process.env.PORT || 3000;
// const MONGO_URI = process.env.MONGO_URI;

// // Connect to MongoDB
// mongoose.connect(MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected Successfully"))
//   .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// // Routes
// app.use("/api/superadmin", superAdminRoutes);

// // Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on port ${PORT}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ----------------------------
// ROUTES IMPORT
// ----------------------------
const facultyRoutes = require("./routes/facultyRoutes");
const superAdminRoutes = require("./routes/superAdminRoutes");

// ----------------------------
// ROUTES MOUNTING
// ----------------------------
app.use("/api/faculty", facultyRoutes);
app.use("/api/superadmin", superAdminRoutes);

// ----------------------------
// MONGODB CONNECTION
// ----------------------------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("DB Error:", err));

// ----------------------------
// SERVER START
// ----------------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
