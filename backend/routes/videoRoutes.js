import express from "express";

import {
  createVideo,
  getVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
} from "../controllers/videoController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// ======================================================
// CREATE
// ======================================================

router.post("/", protect, createVideo);


// ======================================================
// READ
// ======================================================

router.get("/", getVideos);

router.get("/:id", getVideoById);


// ======================================================
// UPDATE
// ======================================================

router.put("/:id", protect, updateVideo);


// ======================================================
// DELETE
// ======================================================

router.delete("/:id", protect, deleteVideo);


export default router;