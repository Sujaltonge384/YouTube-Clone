import bcrypt from "bcryptjs";
// bcrypt is used to securely hash passwords.

import User from "../models/User.js";
// Imports our User model so we can create and search users.

export const registerUser = async (req, res) => {
  // This function handles POST /api/auth/register.

  try {
    const { username, email, password } = req.body;
    // Gets the registration information sent by the frontend.

    if (!username || !email || !password) {
      // Checks whether all required fields were provided.

      return res.status(400).json({
        message: "Username, email, and password are required",
      });
      // 400 means the client sent invalid/incomplete data.
    }

    const existingUser = await User.findOne({ email });
    // Searches MongoDB to see whether this email already exists.

    if (existingUser) {
      return res.status(409).json({
        message: "Email is already registered",
      });
      // 409 means there is a conflict with existing data.
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Converts the plain password into a secure hash.
    // 10 is the bcrypt salt-round value we're using.

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    // Creates and saves the new user in MongoDB.

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
    // Sends a successful response.
    // Notice that we DON'T send the password back.

  } catch (error) {
    // Handles unexpected server/database errors.

    console.error("Registration error:", error.message);

    res.status(500).json({
      message: "Server error during registration",
    });
    // 500 means something went wrong on the server.
  }
};