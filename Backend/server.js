require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./Config/db.js");

const authRoutes = require("./Routes/authRoutes.js");
const resumeRoutes = require("./Routes/resumeRoutes.js");


const app = express();
app.set("trust proxy", 1);

// Middleware to handle CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);

// Connect DB
connectDB();

//Midleware
app.use(express.json());

// Serve uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes); 

// Serve frontend build
app.use(express.static(path.join(__dirname, "client/build")));

// React Router fallback
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
