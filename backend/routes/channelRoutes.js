import express from "express";
// Express is used to create our channel router.

import {
  createChannel,
  getChannel,
} from "../controllers/channelController.js";
// Import the channel controllers.

import { protect } from "../middleware/authMiddleware.js";
// JWT middleware protects channel creation.

const router = express.Router();
// Creates the channel router.

router.post("/", protect, createChannel);
// POST /api/channels
//
// User MUST be logged in.
// protect verifies the JWT before createChannel runs.

router.get("/:id", getChannel);
// GET /api/channels/:id
//
// Public route.
// Anyone can view a channel.

export default router;
// Export the router.