import mongoose from "mongoose";
import Video from "../models/Video.js";
import Channel from "../models/Channel.js";


// ======================================================
// CREATE VIDEO
// ======================================================

export const createVideo = async (req, res) => {
  try {
    const {
      title,
      description,
      videoUrl,
      thumbnailUrl,
      category,
      channelId,
    } = req.body;

    // Check that all required video fields are provided
    if (
      !title ||
      !description ||
      !videoUrl ||
      !thumbnailUrl ||
      !category ||
      !channelId
    ) {
      return res.status(400).json({
        message: "All video fields are required",
      });
    }

    // Check whether the provided channel ID is a valid MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(channelId)) {
      return res.status(400).json({
        message: "Invalid channel ID",
      });
    }

    // Find the channel that the user wants to upload the video to
    const channel = await Channel.findById(channelId);

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    // Make sure the logged-in user owns this channel
    if (channel.owner.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You can only upload videos to your own channel",
      });
    }

    // Create the video
    // uploader comes from the JWT, so the client cannot fake the owner
    const video = await Video.create({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      category,
      channel: channel._id,
      uploader: req.user.userId,
    });

    // Add the newly created video to the channel's video list
    channel.videos.push(video._id);

    await channel.save();

    // Return the newly created video
    res.status(201).json({
      message: "Video created successfully",
      video,
    });
  } catch (error) {
    console.error("Create video error:", error.message);

    res.status(500).json({
      message: "Server error while creating video",
    });
  }
};


// ======================================================
// GET ALL VIDEOS
// ======================================================

export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate("channel", "channelName channelBanner")
      .populate("uploader", "username avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: videos.length,
      videos,
    });
  } catch (error) {
    console.error("Get videos error:", error.message);

    res.status(500).json({
      message: "Server error while fetching videos",
    });
  }
};


// ======================================================
// GET SINGLE VIDEO
// ======================================================

export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate("channel", "channelName channelBanner description")
      .populate("uploader", "username avatar");

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    res.status(200).json({
      video,
    });
  } catch (error) {
    console.error("Get video error:", error.message);

    res.status(500).json({
      message: "Server error while fetching video",
    });
  }
};