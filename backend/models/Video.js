import mongoose from "mongoose";
// Mongoose allows us to define the structure of our video
// documents and communicate with MongoDB.

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 150,
    },
    // The video's title.
    // It is required because the PDF requires videos to have a title.
    // trim removes unnecessary spaces.

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    // Stores the video's description.

    videoUrl: {
      type: String,
      required: true,
      trim: true,
    },
    // Stores the URL of the actual video.
    //
    // We are NOT storing large video files inside MongoDB.
    // The PDF specifically allows storing the video URL as a string.

    thumbnailUrl: {
      type: String,
      required: true,
      trim: true,
    },
    // URL of the video's thumbnail image.

    category: {
      type: String,
      required: true,
      trim: true,
    },
    // Used by our category filter.
    //
    // Example:
    // Programming
    // Music
    // Gaming
    // Education

    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
    },
    // Reference to the channel that owns this video.
    //
    // We don't store the complete channel object here.
    // We store its MongoDB ObjectId.

    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Reference to the user who uploaded the video.

    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    // Number of views.
    // New videos start with 0 views.

    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    // Number of likes.

    dislikes: {
      type: Number,
      default: 0,
      min: 0,
    },
    // Number of dislikes.

    uploadDate: {
      type: Date,
      default: Date.now,
    },
    // Automatically records when the video was created.
  },
  {
    timestamps: true,
  }
);
// timestamps adds:
// createdAt
// updatedAt
//
// These are useful for displaying and managing videos.

const Video = mongoose.model("Video", videoSchema);
// Creates the Video model.
// MongoDB will use this model for the "videos" collection.

export default Video;
// Allows controllers and other files to import the Video model.