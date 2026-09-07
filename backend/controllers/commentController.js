import mongoose from "mongoose";

import Comment from "../models/Comment.js";
import Video from "../models/Video.js";


// ======================================================
// CREATE COMMENT
// ======================================================

export const createComment = async (req, res) => {
  try {
    const { text, videoId } = req.body;

    // --------------------------------------------------
    // Validate comment text and video ID
    // --------------------------------------------------

    if (!text || !videoId) {
      return res.status(400).json({
        message: "Comment text and video ID are required",
      });
    }

    if (!text.trim()) {
      return res.status(400).json({
        message: "Comment text cannot be empty",
      });
    }

    // --------------------------------------------------
    // Validate video ID
    // --------------------------------------------------

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({
        message: "Invalid video ID",
      });
    }

    // --------------------------------------------------
    // Check if video exists
    // --------------------------------------------------

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    // --------------------------------------------------
    // Create comment
    // --------------------------------------------------

    const comment = await Comment.create({
      text: text.trim(),
      user: req.user.userId,
      video: videoId,
    });

    // --------------------------------------------------
    // Populate user information
    // --------------------------------------------------

    const populatedComment = await Comment.findById(
      comment._id
    ).populate(
      "user",
      "username avatar"
    );

    // --------------------------------------------------
    // Send response
    // --------------------------------------------------

    res.status(201).json({
      message: "Comment created successfully",
      comment: populatedComment,
    });
  } catch (error) {
    console.error(
      "Create comment error:",
      error.message
    );

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

    // --------------------------------------------------
    // Validate video ID
    // --------------------------------------------------

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({
        message: "Invalid video ID",
      });
    }

    // --------------------------------------------------
    // Check if video exists
    // --------------------------------------------------

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    // --------------------------------------------------
    // Fetch comments
    // --------------------------------------------------

    const comments = await Comment.find({
      video: videoId,
    })
      .populate(
        "user",
        "username avatar"
      )
      .sort({
        createdAt: -1,
      });

    // --------------------------------------------------
    // Send response
    // --------------------------------------------------

    res.status(200).json({
      count: comments.length,
      comments,
    });
  } catch (error) {
    console.error(
      "Get comments error:",
      error.message
    );

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

    // --------------------------------------------------
    // Validate text
    // --------------------------------------------------

    if (!text || !text.trim()) {
      return res.status(400).json({
        message: "Comment text is required",
      });
    }

    // --------------------------------------------------
    // Validate comment ID
    // --------------------------------------------------

    if (
      !mongoose.Types.ObjectId.isValid(
        req.params.id
      )
    ) {
      return res.status(400).json({
        message: "Invalid comment ID",
      });
    }

    // --------------------------------------------------
    // Find comment
    // --------------------------------------------------

    const comment = await Comment.findById(
      req.params.id
    );

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    // --------------------------------------------------
    // Check comment ownership
    // --------------------------------------------------

    if (
      comment.user.toString() !==
      req.user.userId.toString()
    ) {
      return res.status(403).json({
        message:
          "You can only update your own comments",
      });
    }

    // --------------------------------------------------
    // Update comment
    // --------------------------------------------------

    comment.text = text.trim();

    await comment.save();

    // --------------------------------------------------
    // Populate user information
    // --------------------------------------------------

    const populatedComment = await Comment.findById(
      comment._id
    ).populate(
      "user",
      "username avatar"
    );

    // --------------------------------------------------
    // Send response
    // --------------------------------------------------

    res.status(200).json({
      message: "Comment updated successfully",
      comment: populatedComment,
    });
  } catch (error) {
    console.error(
      "Update comment error:",
      error.message
    );

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
    // --------------------------------------------------
    // Validate comment ID
    // --------------------------------------------------

    if (
      !mongoose.Types.ObjectId.isValid(
        req.params.id
      )
    ) {
      return res.status(400).json({
        message: "Invalid comment ID",
      });
    }

    // --------------------------------------------------
    // Find comment
    // --------------------------------------------------

    const comment = await Comment.findById(
      req.params.id
    );

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    // --------------------------------------------------
    // Check comment ownership
    // --------------------------------------------------

    if (
      comment.user.toString() !==
      req.user.userId.toString()
    ) {
      return res.status(403).json({
        message:
          "You can only delete your own comments",
      });
    }

    // --------------------------------------------------
    // Delete comment
    // --------------------------------------------------

    await Comment.findByIdAndDelete(
      req.params.id
    );

    // --------------------------------------------------
    // Send response
    // --------------------------------------------------

    res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete comment error:",
      error.message
    );

    res.status(500).json({
      message: "Server error while deleting comment",
    });
  }
};