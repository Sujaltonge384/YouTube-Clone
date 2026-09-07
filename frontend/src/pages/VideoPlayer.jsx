import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";
import Comments from "../components/Comments";


function VideoPlayer() {
  // Get the video ID from the URL:
  // /watch/:id
  const { id } = useParams();

  // Store the video received from the backend
  const [video, setVideo] = useState(null);

  // Controls the loading message
  const [loading, setLoading] = useState(true);

  // Stores any API error
  const [error, setError] = useState("");


  // ======================================================
  // FETCH VIDEO
  // ======================================================

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        setError("");

        // Get one video from our backend
        // GET /api/videos/:id
        const response = await api.get(`/videos/${id}`);

        setVideo(response.data.video);
      } catch (error) {
        console.error("Failed to fetch video:", error);

        setError("Unable to load this video.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);


  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <div className="page-message">
        <p>Loading video...</p>
      </div>
    );
  }


  // ======================================================
  // ERROR
  // ======================================================

  if (error) {
    return (
      <div className="page-message">
        <p>{error}</p>
      </div>
    );
  }


  // ======================================================
  // VIDEO NOT FOUND
  // ======================================================

  if (!video) {
    return (
      <div className="page-message">
        <p>Video not found.</p>
      </div>
    );
  }


  return (
    <div className="video-player-page">

      {/* ==================================================
          VIDEO PLAYER
          ================================================== */}

      <div className="video-player-container">

        <iframe
          src={video.videoUrl}
          title={video.title}
          className="video-player"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />

      </div>


      {/* ==================================================
          VIDEO INFORMATION
          ================================================== */}

      <div className="video-details">

        <h1 className="video-player-title">
          {video.title}
        </h1>


        <div className="video-player-meta">

          <div>

            <p className="channel-name">
              {video.channel?.channelName || "Unknown channel"}
            </p>

            <p className="video-views">
              {video.views || 0} views
            </p>

          </div>


          {/* ==================================================
              LIKE / DISLIKE
              ================================================== */}

          <div className="video-actions">

            <button className="video-action-button">
              👍 {video.likes || 0}
            </button>

            <button className="video-action-button">
              👎 {video.dislikes || 0}
            </button>

          </div>

        </div>


        {/* ==================================================
            DESCRIPTION
            ================================================== */}

        <div className="video-description">

          <p>
            {video.description}
          </p>

        </div>


        {/* ==================================================
            COMMENTS
            ================================================== */}

        <Comments videoId={video._id} />

      </div>

    </div>
  );
}

export default VideoPlayer;