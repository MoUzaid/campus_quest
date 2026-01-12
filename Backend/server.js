require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Importing Routes
const studentRoutes = require('./routers/studentRoutes');
const quizRoutes = require('./routers/quizRoutes');
const facultyRoutes = require('./routers/facultyRoutes');
const superAdminRoutes = require('./routers/superAdminRoutes');
const courseRoutes = require('./routers/courseRoutes');
const leaderboardRoutes = require('./routers/leaderboardRoutes');
const departmentRoutes = require('./routers/departmentRoutes');
const chatRoutes = require('./routers/chatRoutes');

//Importing HTTP and creating server 
const http = require("http");
const server = http.createServer(app);


//Port 
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization","cache-control","pragma"]
}));



// app.use("/api/faculty-activity", require("./FacultyActivityRoutes"));


// analytics routes
app.use("/api/superadmin", require("./routers/superAdminAnalyticsRoutes"));

app.use("/api", require("./routers/FacultyAnalyticsRoutes"));
//Routes 
app.use('/students', studentRoutes);
app.use('/quiz', quizRoutes);
app.use('/api/superadmin', superAdminRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/department', departmentRoutes);
app.use('/api/chat',chatRoutes);

app.use("/api/activity", require("./routers/activityRoutes"));



// Socket.IO setup
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});


// Socket events
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinRoom", (quizId) => {
        socket.join(quizId);
        console.log("Joined Room:", quizId);
    });
  socket.on("join-timer-room", (quizId) => {
    socket.join(`timer_${quizId}`);
    console.log(`Joined room: timer_${quizId}`);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});


//Exporting io for controllers
module.exports = { io };

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {console.log("MongoDB connected")

  require('./cron/certificateCron');

})
.catch(err => console.log("MongoDB error:", err));


// Starting the server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});






