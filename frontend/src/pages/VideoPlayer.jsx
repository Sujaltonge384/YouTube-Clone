import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import api from "../services/api";
import Comments from "../components/Comments";
import RecommendedVideoCard from "../components/RecommendedVideoCard";


function VideoPlayer() {

  const { id } = useParams();

  const navigate = useNavigate();


  // ======================================================
  // STATE
  // ======================================================

  // Stores the currently playing video
  const [video, setVideo] = useState(null);

  // Stores recommended videos
  const [recommendedVideos, setRecommendedVideos] =
    useState([]);

  // Controls current video loading state
  const [loading, setLoading] = useState(true);

  // Controls recommended videos loading state
  const [recommendationsLoading, setRecommendationsLoading] =
    useState(true);

  // Stores error messages
  const [error, setError] = useState("");


  // ======================================================
  // FETCH CURRENT VIDEO
  // ======================================================

  useEffect(() => {

    const fetchVideo = async () => {

      try {

        setLoading(true);
        setError("");


        // Get the selected video
        const response = await api.get(
          `/videos/${id}`
        );


        // Store video in state
        setVideo(response.data.video);

      } catch (error) {

        console.error(
          "Failed to fetch video:",
          error
        );


        setError(
          error.response?.data?.message ||
            "Unable to load this video."
        );

      } finally {

        setLoading(false);

      }
    };


    fetchVideo();

  }, [id]);


  // ======================================================
  // FETCH RECOMMENDED VIDEOS
  // ======================================================

  useEffect(() => {

    const fetchRecommendedVideos = async () => {

      try {

        setRecommendationsLoading(true);


        // Get all videos
        const response =
          await api.get("/videos");


        const allVideos =
          response.data.videos || [];


        // Remove currently playing video
        const otherVideos =
          allVideos.filter(
            (item) => item._id !== id
          );


        // Randomize recommended videos
        const shuffledVideos = [
          ...otherVideos,
        ].sort(
          () => Math.random() - 0.5
        );


        // Show maximum 8 recommendations
        setRecommendedVideos(
          shuffledVideos.slice(0, 8)
        );

      } catch (error) {

        console.error(
          "Failed to fetch recommended videos:",
          error
        );

      } finally {

        setRecommendationsLoading(false);

      }
    };


    fetchRecommendedVideos();

  }, [id]);


  // ======================================================
  // LIKE VIDEO
  // ======================================================

  const handleLike = async () => {

    const token =
      localStorage.getItem("token");


    // User must be signed in
    if (!token) {

      alert(
        "Please sign in to like this video."
      );

      return;
    }


    try {

      const response =
        await api.post(
          `/videos/${video._id}/like`
        );


      // Update like/dislike counts
      setVideo((previousVideo) => ({
        ...previousVideo,
        likes: response.data.likes,
        dislikes: response.data.dislikes,
      }));

    } catch (error) {

      console.error(
        "Like video error:",
        error
      );


      alert(
        error.response?.data?.message ||
          "Unable to like video."
      );

    }
  };


  // ======================================================
  // DISLIKE VIDEO
  // ======================================================

  const handleDislike = async () => {

    const token =
      localStorage.getItem("token");


    // User must be signed in
    if (!token) {

      alert(
        "Please sign in to dislike this video."
      );

      return;
    }


    try {

      const response =
        await api.post(
          `/videos/${video._id}/dislike`
        );


      // Update like/dislike counts
      setVideo((previousVideo) => ({
        ...previousVideo,
        likes: response.data.likes,
        dislikes: response.data.dislikes,
      }));

    } catch (error) {

      console.error(
        "Dislike video error:",
        error
      );


      alert(
        error.response?.data?.message ||
          "Unable to dislike video."
      );

    }
  };


  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {

    return (
      <div className="page-message">

        <p>
          Loading video...
        </p>

      </div>
    );

  }


  // ======================================================
  // ERROR
  // ======================================================

  if (error) {

    return (
      <div className="page-message">

        <p>
          {error}
        </p>

      </div>
    );

  }


  // ======================================================
  // VIDEO NOT FOUND
  // ======================================================

  if (!video) {

    return (
      <div className="page-message">

        <p>
          Video not found.
        </p>

      </div>
    );

  }


  // ======================================================
  // CHANNEL INFORMATION
  // ======================================================

  const channelName =
    video.channel?.channelName ||
    "Unknown channel";


  // First letter used only as fallback
  // when channel logo is unavailable.
  const channelInitial =
    channelName.charAt(0).toUpperCase();


  // ======================================================
  // OPEN CHANNEL PAGE
  // ======================================================

  const handleChannelClick = () => {

    if (video.channel?._id) {

      navigate(
        `/channel/${video.channel._id}`
      );

    }

  };


  // ======================================================
  // RENDER
  // ======================================================

  return (
    <div className="watch-page">


      {/* ==================================================
          MAIN VIDEO AREA
          ================================================== */}

      <main className="watch-main">


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
            VIDEO DETAILS
            ================================================== */}

        <div className="video-details">


          {/* ==================================================
              VIDEO TITLE
              ================================================== */}

          <h1 className="video-player-title">
            {video.title}
          </h1>


          {/* ==================================================
              CHANNEL + LIKE / DISLIKE
              ================================================== */}

          <div className="video-player-meta">


            {/* ==================================================
                CHANNEL INFORMATION
                ================================================== */}

            <button
              type="button"
              className="video-channel-profile"
              onClick={handleChannelClick}
              title={`View ${channelName} channel`}
            >


              {/* ==================================================
                  REAL CHANNEL LOGO
                  ================================================== */}

              {video.channel?.channelAvatar ? (

                <img
                  src={video.channel.channelAvatar}
                  alt={channelName}
                  className="video-channel-avatar"
                />

              ) : (

                // Fallback if channel logo is unavailable
                <div className="video-channel-avatar">
                  {channelInitial}
                </div>

              )}


              {/* ==================================================
                  CHANNEL DETAILS
                  ================================================== */}

              <div>

                <p className="channel-name">
                  {channelName}
                </p>

                <p className="video-views">
                  {video.views || 0} views
                </p>

              </div>

            </button>


            {/* ==================================================
                LIKE / DISLIKE
                ================================================== */}

            <div className="video-actions">

              <button
                type="button"
                className="video-action-button"
                onClick={handleLike}
              >
                👍 {video.likes || 0}
              </button>


              <button
                type="button"
                className="video-action-button"
                onClick={handleDislike}
              >
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

          <Comments
            videoId={video._id}
          />

        </div>

      </main>


      {/* ==================================================
          RECOMMENDED VIDEOS
          ================================================== */}

      <aside className="recommended-panel">


        <h2 className="recommended-title">
          Recommended
        </h2>


        {recommendationsLoading ? (

          <p className="recommended-message">
            Loading recommendations...
          </p>

        ) : recommendedVideos.length === 0 ? (

          <p className="recommended-message">
            No recommended videos.
          </p>

        ) : (

          <div className="recommended-video-list">

            {recommendedVideos.map(
              (recommendedVideo) => (

                <RecommendedVideoCard
                  key={recommendedVideo._id}
                  video={recommendedVideo}
                />

              )
            )}

          </div>

        )}

      </aside>

    </div>
  );
}


export default VideoPlayer;