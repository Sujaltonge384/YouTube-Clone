import express from "express";
// Express is used to create the router.

import { getCurrentUser } from "../controllers/userController.js";
// Imports our /me controller.

import { protect } from "../middleware/authMiddleware.js";
// Imports the JWT protection middleware.

const router = express.Router();
// Creates the user router.

router.get("/me", protect, getCurrentUser);
// GET /api/users/me
//
// protect runs FIRST.
// If the JWT is valid, getCurrentUser runs.
//
// Request flow:
//
// Request
//    ↓
// protect
//    ↓
// getCurrentUser

export default router;
// Exports the router.