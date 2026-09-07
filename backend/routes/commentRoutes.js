import express from "express";

import {
  createComment,
  getVideoComments,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// ======================================================
// CREATE COMMENT
// ======================================================

// User must be logged in to comment
router.post("/", protect, createComment);


// ======================================================
// GET COMMENTS
// ======================================================

// Anyone can read comments
router.get("/video/:videoId", getVideoComments);


// ======================================================
// UPDATE COMMENT
// ======================================================

// User must be logged in
router.put("/:id", protect, updateComment);


// ======================================================
// DELETE COMMENT
// ======================================================

// User must be logged in
router.delete("/:id", protect, deleteComment);


export default router;