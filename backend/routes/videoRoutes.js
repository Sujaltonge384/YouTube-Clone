import express from "express";

import {
  createVideo,
  getVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  likeVideo,
  dislikeVideo,
} from "../controllers/videoController.js";

import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();


// Create video
router.post("/", protect, createVideo);


// Get all videos
router.get("/", getVideos);


// Get single video
router.get("/:id", getVideoById);


// Like video
router.post("/:id/like", protect, likeVideo);


// Dislike video
router.post("/:id/dislike", protect, dislikeVideo);


// Update video
router.put("/:id", protect, updateVideo);


// Delete video
router.delete("/:id", protect, deleteVideo);


export default router;