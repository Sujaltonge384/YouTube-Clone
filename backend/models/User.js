import mongoose from "mongoose";
// Imports Mongoose so we can create a MongoDB schema and model.

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    // username is required.
    // trim removes unnecessary spaces.
    // We also enforce a reasonable username length.

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    // Email is required and must be unique.
    // lowercase ensures emails are stored consistently.

    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    // We store the HASHED password here, not the actual password.

    avatar: {
      type: String,
      default: "",
    },
    // Avatar is optional for now.

    channels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
      },
    ],
    // Stores references to channels created by this user.
    // ObjectId connects this User document to Channel documents.
  },
  {
    timestamps: true,
  }
);
// timestamps automatically adds createdAt and updatedAt.

const User = mongoose.model("User", userSchema);
// Creates the User model that allows us to interact with
// the users collection in MongoDB.

export default User;
// Exports the model so controllers can use it.