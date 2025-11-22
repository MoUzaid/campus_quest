const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
<<<<<<< HEAD
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const studentRoutes = require('./routers/studentRoutes');
const quizRoutes = require('./routers/quizRoutes');
const http = require("http");

require('dotenv').config();
const PORT = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer(app);

// Socket.IO setup
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});
=======

// ----------------------------
// MIDDLEWARES
// ----------------------------
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
>>>>>>> d0c79d1afb8614dbd05156f0fe58713cf9719ffe

// Export io
module.exports = { io };

// Socket events
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
        console.log("Joined Room:", roomId);
    });
});

// Middlewares
app.use(express.json());
app.use(cookieParser());

<<<<<<< HEAD
// Routes
=======
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
>>>>>>> d0c79d1afb8614dbd05156f0fe58713cf9719ffe
app.use('/students', studentRoutes);
app.use('/quiz', quizRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/superadmin", superAdminRoutes);

<<<<<<< HEAD
// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB error:", err));

// Start server (NOT app.listen)
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
=======
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
>>>>>>> d0c79d1afb8614dbd05156f0fe58713cf9719ffe
});
