import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },

    type: {
      type: String,
      enum: ["like", "dislike"],
      required: true,
    },
  },
  { timestamps: true }
);

// One user can have only one reaction per video.
reactionSchema.index(
  { user: 1, video: 1 },
  { unique: true }
);

const Reaction = mongoose.model("Reaction", reactionSchema);

export default Reaction;