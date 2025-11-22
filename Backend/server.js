const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// ----------------------------
// MIDDLEWARES
// ----------------------------
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// ----------------------------
// ROUTES IMPORT
// ----------------------------
const studentRoutes = require('./routers/studentRoutes');
const quizRoutes = require('./routers/quizRoutes');
const facultyRoutes = require("./routers/facultyRoutes");
const superAdminRoutes = require("./routers/superAdminRoutes");

// ----------------------------
// ROUTES MOUNTING
// ----------------------------
app.use('/students', studentRoutes);
app.use('/quiz', quizRoutes);
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
