import express from "express";

import {
  createVideo,
  getVideos,
  getVideoById,
} from "../controllers/videoController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// Create a video
// User must be logged in
router.post("/", protect, createVideo);


// Get all videos
router.get("/", getVideos);


// Get a single video
router.get("/:id", getVideoById);


export default router;