import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
// Imports all video-related API routes.
import commentRoutes from "./routes/commentRoutes.js";


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/channels", channelRoutes);
app.use("/api/videos", videoRoutes);
// All routes inside videoRoutes now start with /api/videos.
app.use("/api/comments", commentRoutes);


// Test route
app.get("/", (req, res) => {
  res.json({
    message: "YouTube Clone API is running",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});