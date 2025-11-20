const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT || 3000;





app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});





mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log("MongoDB connection error: ", err));
  

// For student routes
const studentRoutes = require("./routes/studentRoutes");
app.use("/api/students", studentRoutes);
