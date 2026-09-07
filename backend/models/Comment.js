import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    // The actual comment text
    text: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 1000,
    },

    // The user who wrote the comment
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // The video this comment belongs to
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
  },
  {
    // Automatically creates createdAt and updatedAt
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;