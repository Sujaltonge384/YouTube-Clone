import bcrypt from "bcryptjs";
// bcrypt allows us to compare the password entered during login
// with the hashed password stored in MongoDB.

import jwt from "jsonwebtoken";
// jsonwebtoken is used to create a JWT after successful login.

import User from "../models/User.js";
// Imports the User model so we can find the user in MongoDB.   

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

export const loginUser = async (req, res) => {
  // Handles POST /api/auth/login.

  try {
    const { email, password } = req.body;
    // Gets the email and password sent by the client.

    // Check that both fields were provided.
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find the user using their email.
    const user = await User.findOne({ email });

    // If no user exists with this email, stop the request.
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Compare the plain password entered by the user
    // with the hashed password stored in MongoDB.
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    // If the passwords don't match, reject the login.
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Create a JWT containing the user's ID.
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Send the token and basic user information to the client.
    // We NEVER send the user's password.
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    // Handles unexpected errors such as database problems.

    console.error("Login error:", error.message);

    res.status(500).json({
      message: "Server error during login",
    });
  }
};