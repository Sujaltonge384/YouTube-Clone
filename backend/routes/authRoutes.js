import express from "express";

import {
  registerUser,
  loginUser,
} from "../controllers/authController.js";
// Import both authentication controllers.

const router = express.Router();
// Creates the Express router for authentication endpoints.

router.post("/register", registerUser);
// POST /api/auth/register
// Creates a new user.

router.post("/login", loginUser);
// POST /api/auth/login
// Authenticates an existing user and returns a JWT.

export default router;
// Exports the router so server.js can use it.