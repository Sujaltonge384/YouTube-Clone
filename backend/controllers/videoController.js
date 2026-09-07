import mongoose from "mongoose";
import Video from "../models/Video.js";
import Channel from "../models/Channel.js";
import Reaction from "../models/Reaction.js";


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
      .populate(
        "channel",
        "channelName channelBanner description"
      )
      .populate(
        "uploader",
        "username avatar"
      );

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    // Increase the view count when the video is opened.
    video.views += 1;

    await video.save();

    res.status(200).json({
      video,
    });

  } catch (error) {
    console.error(
      "Get video error:",
      error.message
    );

    res.status(500).json({
      message: "Server error while fetching video",
    });
  }
};

// ======================================================
// UPDATE VIDEO
// ======================================================

export const updateVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnailUrl, category } =
      req.body;

    // Find the video we want to update
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    // Find the channel that owns this video
    const channel = await Channel.findById(video.channel);

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    // Only the channel owner can update the video
    if (channel.owner.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You can only update your own videos",
      });
    }

    // Update only the fields that were provided
    if (title !== undefined) video.title = title;
    if (description !== undefined) video.description = description;
    if (videoUrl !== undefined) video.videoUrl = videoUrl;
    if (thumbnailUrl !== undefined) video.thumbnailUrl = thumbnailUrl;
    if (category !== undefined) video.category = category;

    // Save the updated video
    await video.save();

    res.status(200).json({
      message: "Video updated successfully",
      video,
    });
  } catch (error) {
    console.error("Update video error:", error.message);

    res.status(500).json({
      message: "Server error while updating video",
    });
  }
};


// ======================================================
// DELETE VIDEO
// ======================================================

export const deleteVideo = async (req, res) => {
  try {
    // Find the video
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    // Find the channel that owns this video
    const channel = await Channel.findById(video.channel);

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    // Only the channel owner can delete the video
    if (channel.owner.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You can only delete your own videos",
      });
    }

    // Delete the video from the videos collection
    await Video.findByIdAndDelete(req.params.id);

    // Remove the video ID from the channel's videos array
    channel.videos = channel.videos.filter(
      (videoId) => videoId.toString() !== req.params.id
    );

    await channel.save();

    res.status(200).json({
      message: "Video deleted successfully",
    });
  } catch (error) {
    console.error("Delete video error:", error.message);

    res.status(500).json({
      message: "Server error while deleting video",
    });
  }
};

// ======================================================
// LIKE VIDEO
// ======================================================

export const likeVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    const existingReaction = await Reaction.findOne({
      user: req.user.userId,
      video: id,
    });

    // If the user already liked the video, remove the like.
    if (existingReaction?.type === "like") {
      await Reaction.deleteOne({
        _id: existingReaction._id,
      });

      video.likes = Math.max(0, video.likes - 1);
    }

    // If the user disliked it, switch to like.
    else if (existingReaction?.type === "dislike") {
      existingReaction.type = "like";
      await existingReaction.save();

      video.dislikes = Math.max(0, video.dislikes - 1);
      video.likes += 1;
    }

    // No existing reaction, create a like.
    else {
      await Reaction.create({
        user: req.user.userId,
        video: id,
        type: "like",
      });

      video.likes += 1;
    }

    await video.save();

    res.status(200).json({
      likes: video.likes,
      dislikes: video.dislikes,
    });
  } catch (error) {
    console.error("Like video error:", error.message);

    res.status(500).json({
      message: "Unable to like video",
    });
  }
};

// ======================================================
// DISLIKE VIDEO
// ======================================================

export const dislikeVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    const existingReaction = await Reaction.findOne({
      user: req.user.userId,
      video: id,
    });

    // If the user already disliked the video, remove the dislike.
    if (existingReaction?.type === "dislike") {
      await Reaction.deleteOne({
        _id: existingReaction._id,
      });

      video.dislikes = Math.max(0, video.dislikes - 1);
    }

    // If the user liked it, switch to dislike.
    else if (existingReaction?.type === "like") {
      existingReaction.type = "dislike";
      await existingReaction.save();

      video.likes = Math.max(0, video.likes - 1);
      video.dislikes += 1;
    }

    // No existing reaction, create a dislike.
    else {
      await Reaction.create({
        user: req.user.userId,
        video: id,
        type: "dislike",
      });

      video.dislikes += 1;
    }

    await video.save();

    res.status(200).json({
      likes: video.likes,
      dislikes: video.dislikes,
    });
  } catch (error) {
    console.error("Dislike video error:", error.message);

    res.status(500).json({
      message: "Unable to dislike video",
    });
  }
};