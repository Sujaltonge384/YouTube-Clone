import Video from "../models/Video.js";
// Imports the Video model so we can read video documents
// from the MongoDB videos collection.


// ======================================================
// GET ALL VIDEOS
// ======================================================

export const getVideos = async (req, res) => {
  // Handles:
  // GET /api/videos
  //
  // This will eventually power our homepage video grid.

  try {
    const videos = await Video.find()
      .populate("channel", "channelName channelBanner")
      .populate("uploader", "username avatar")
      .sort({ createdAt: -1 });
    // Video.find() gets all videos.
    //
    // populate("channel") gets useful channel information
    // instead of returning only the channel ObjectId.
    //
    // populate("uploader") gets the uploader's username/avatar.
    //
    // sort({ createdAt: -1 }) puts newest videos first.

    res.status(200).json({
      count: videos.length,
      videos,
    });
    // Sends the videos back to the frontend.
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
  // Handles:
  // GET /api/videos/:id
  //
  // This will eventually power our video player page.

  try {
    const video = await Video.findById(req.params.id)
      .populate("channel", "channelName channelBanner description")
      .populate("uploader", "username avatar");
    // req.params.id contains the video ID from the URL.
    //
    // Example:
    // /api/videos/68abc123
    //
    // req.params.id = "68abc123"

    if (!video) {
      // If MongoDB couldn't find the requested video:

      return res.status(404).json({
        message: "Video not found",
      });
    }

    res.status(200).json({
      video,
    });
    // Sends the selected video back to the client.
  } catch (error) {
    console.error("Get video error:", error.message);

    res.status(500).json({
      message: "Server error while fetching video",
    });
  }
};