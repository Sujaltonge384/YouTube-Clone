import express from "express";

import {
  createChannel,
  getChannel,
  getMyChannel,
} from "../controllers/channelController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// ======================================================
// CREATE CHANNEL
// ======================================================

// User must be logged in
router.post("/", protect, createChannel);


// ======================================================
// GET CURRENT USER'S CHANNEL
// ======================================================

// User must be logged in
router.get("/my-channel", protect, getMyChannel);


// ======================================================
// GET CHANNEL BY ID
// ======================================================

// Public route
router.get("/:id", getChannel);


export default router;