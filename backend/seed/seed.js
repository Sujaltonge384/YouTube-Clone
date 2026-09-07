import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import connectDB from "../config/db.js";
import User from "../models/User.js";
import Channel from "../models/Channel.js";
import Video from "../models/Video.js";
import Comment from "../models/Comment.js";

import { users, channels, videos } from "./data.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log("Clearing existing data...");

    await Comment.deleteMany({});
    await Video.deleteMany({});
    await Channel.deleteMany({});
    await User.deleteMany({});

    console.log("Creating users...");

    const createdUsers = [];

    for (const userData of users) {
      const hashedPassword = await bcrypt.hash(
        userData.password,
        10
      );

      const user = await User.create({
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
      });

      createdUsers.push(user);
    }

    console.log(`${createdUsers.length} users created.`);

    console.log("Creating channels...");

    const createdChannels = [];

    for (let i = 0; i < channels.length; i++) {
      const channel = await Channel.create({
        channelName: channels[i].channelName,
        description: channels[i].description,
        owner: createdUsers[i]._id,
        subscribers: Math.floor(Math.random() * 50000) + 1000,
      });

      createdChannels.push(channel);

      createdUsers[i].channels.push(channel._id);
      await createdUsers[i].save();
    }

    console.log(`${createdChannels.length} channels created.`);

    console.log("Creating videos...");

    const createdVideos = [];

    for (const videoData of videos) {
      const video = await Video.create({
        title: videoData.title,
        description: videoData.description,
        category: videoData.category,
        videoUrl: videoData.videoUrl,
        thumbnailUrl: videoData.thumbnailUrl,
        channel: createdChannels[videoData.channelIndex]._id,
        uploader: createdUsers[videoData.userIndex]._id,
        views: Math.floor(Math.random() * 100000),
        likes: Math.floor(Math.random() * 10000),
        dislikes: Math.floor(Math.random() * 500),
      });

      createdVideos.push(video);

      createdChannels[videoData.channelIndex].videos.push(
        video._id
      );
    }

    for (const channel of createdChannels) {
      await channel.save();
    }

    console.log(`${createdVideos.length} videos created.`);

    console.log("Creating comments...");

    const comments = [
      "Great video! Very helpful.",
      "This was exactly what I was looking for.",
      "Really useful explanation.",
      "Thanks for sharing this!",
      "Amazing content.",
      "Very easy to understand.",
      "I learned a lot from this video.",
      "Looking forward to more videos.",
      "Excellent tutorial!",
      "Keep up the great work!",
    ];

    for (let i = 0; i < createdVideos.length; i++) {
      for (let j = 0; j < 3; j++) {
        await Comment.create({
          text: comments[(i + j) % comments.length],
          user: createdUsers[(i + j) % createdUsers.length]._id,
          video: createdVideos[i]._id,
        });
      }
    }

    console.log("Comments created.");

    console.log("Database seeded successfully!");

    process.exit(0);
  } catch (error) {
    console.error("Database seed failed:", error.message);

    process.exit(1);
  }
};

seedDatabase();