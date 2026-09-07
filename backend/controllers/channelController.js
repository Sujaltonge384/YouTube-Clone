import mongoose from "mongoose";
import Channel from "../models/Channel.js";
// Imports the Channel model so we can create and query channels.

export const createChannel = async (req, res) => {
  // Handles POST /api/channels.
  //
  // This route will be protected by JWT middleware.

  try {
    const { channelName, description, channelBanner } = req.body;
    // Gets channel information from the request body.

    if (!channelName) {
      // Channel name is required.

      return res.status(400).json({
        message: "Channel name is required",
      });
    }

    // Check whether this user already owns a channel.
    const existingChannel = await Channel.findOne({
      owner: req.user.userId,
    });

    if (existingChannel) {
      return res.status(409).json({
        message: "User already has a channel",
      });
    }

    // Create the channel.
    const channel = await Channel.create({
      channelName,
      description,
      channelBanner,
      owner: req.user.userId,
    });

    res.status(201).json({
      message: "Channel created successfully",
      channel,
    });
  } catch (error) {
    console.error("Create channel error:", error.message);

    res.status(500).json({
      message: "Server error while creating channel",
    });
  }
};

export const getMyChannel = async (req, res) => {
  try {
    const channel = await Channel.findOne({
      owner: req.user.userId,
    })
      .populate(
        "owner",
        "username avatar"
      )
      .populate({
        path: "videos",
        populate: [
          {
            path: "channel",
            select:
              "channelName channelAvatar channelBanner",
          },
          {
            path: "uploader",
            select:
              "username avatar",
          },
        ],
      });

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    res.status(200).json({
      channel,
    });
  } catch (error) {
    console.error(
      "Get my channel error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};// ======================================================
// GET CURRENT USER'S CHANNEL
// ======================================================

export const getChannel = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid channel ID",
      });
    }

    const channel = await Channel.findById(id)
      .populate(
        "owner",
        "username avatar"
      )
      .populate({
        path: "videos",
        populate: [
          {
            path: "channel",
            select:
              "channelName channelAvatar channelBanner",
          },
          {
            path: "uploader",
            select:
              "username avatar",
          },
        ],
      });

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    res.status(200).json({
      channel,
    });
  } catch (error) {
    console.error(
      "Get channel error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};