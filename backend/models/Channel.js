import mongoose from "mongoose";
// Mongoose lets us define the structure of our Channel
// documents and work with MongoDB.

const channelSchema = new mongoose.Schema(
  {
    channelName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    // Name displayed on the channel page.
    // Example: "Code With John"

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Stores the ID of the user who owns this channel.
    //
    // This is important because later we need to make sure
    // only the owner can manage their videos.

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },
    // Optional description for the channel.

    channelBanner: {
      type: String,
      trim: true,
      default: "",
    },
    // Stores the URL of the channel banner image.

    subscribers: {
      type: Number,
      default: 0,
      min: 0,
    },
    // Number of subscribers.
    //
    // We start with zero and can improve subscriber
    // functionality later if needed.

    videos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    // Stores references to videos belonging to this channel.
  },
  {
    timestamps: true,
  }
);
// Automatically adds createdAt and updatedAt.

const Channel = mongoose.model("Channel", channelSchema);
// Creates the Channel model.
// MongoDB will use the "channels" collection.

export default Channel;
// Makes the model available to controllers.