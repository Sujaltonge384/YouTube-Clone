import mongoose from "mongoose";

import Comment from "../models/Comment.js";
import Video from "../models/Video.js";


// ======================================================
// CREATE COMMENT
// ======================================================

export const createComment = async (req, res) => {
  try {
    const { text, videoId } = req.body;

    // Make sure the comment text and video ID are provided
    if (!text || !videoId) {
      return res.status(400).json({
        message: "Comment text and video ID are required",
      });
    }

    // Validate the video ID
    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({
        message: "Invalid video ID",
      });
    }

    // Make sure the video exists
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    // Create the comment using the logged-in user's ID
    const comment = await Comment.create({
      text,
      user: req.user.userId,
      video: videoId,
    });

    // Populate user information for the response
    await comment.populate("user", "username avatar");

    res.status(201).json({
      message: "Comment created successfully",
      comment,
    });
  } catch (error) {
    console.error("Create comment error:", error.message);

    res.status(500).json({
      message: "Server error while creating comment",
    });
  }
};


// ======================================================
// GET COMMENTS FOR A VIDEO
// ======================================================

export const getVideoComments = async (req, res) => {
  try {
    const { videoId } = req.params;

    // Validate the video ID
    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({
        message: "Invalid video ID",
      });
    }

    // Make sure the video exists
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    // Fetch all comments belonging to this video
    const comments = await Comment.find({
      video: videoId,
    })
      .populate("user", "username avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: comments.length,
      comments,
    });
  } catch (error) {
    console.error("Get comments error:", error.message);

    res.status(500).json({
      message: "Server error while fetching comments",
    });
  }
};


// ======================================================
// UPDATE COMMENT
// ======================================================

export const updateComment = async (req, res) => {
  try {
    const { text } = req.body;

    // Comment text is required for an update
    if (!text) {
      return res.status(400).json({
        message: "Comment text is required",
      });
    }

    // Find the comment
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    // Only the person who created the comment can update it
    if (comment.user.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You can only update your own comments",
      });
    }

    // Update the comment text
    comment.text = text;

    await comment.save();

    // Return user information as well
    await comment.populate("user", "username avatar");

    res.status(200).json({
      message: "Comment updated successfully",
      comment,
    });
  } catch (error) {
    console.error("Update comment error:", error.message);

    res.status(500).json({
      message: "Server error while updating comment",
    });
  }
};


// ======================================================
// DELETE COMMENT
// ======================================================

export const deleteComment = async (req, res) => {
  try {
    // Find the comment
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    // Only the person who created the comment can delete it
    if (comment.user.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You can only delete your own comments",
      });
    }

    // Delete the comment
    await Comment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error("Delete comment error:", error.message);

    res.status(500).json({
      message: "Server error while deleting comment",
    });
  }
};