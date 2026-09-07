import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../services/api";
import VideoCard from "../components/VideoCard";
import { useAuth } from "../context/AuthContext";

function Channel() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();

  // ======================================================
  // CHANNEL STATE
  // ======================================================

  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showVideoForm, setShowVideoForm] = useState(false);

  const [editingVideoId, setEditingVideoId] = useState(null);

  // ======================================================
  // CHANNEL FORM STATE
  // ======================================================

  const [channelName, setChannelName] = useState("");
  const [channelDescription, setChannelDescription] = useState("");
  const [channelBanner, setChannelBanner] = useState("");

  // ======================================================
  // VIDEO FORM STATE
  // ======================================================

  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [videoCategory, setVideoCategory] = useState("Technology");

  // ======================================================
  // FETCH CHANNEL
  // ======================================================

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        setLoading(true);
        setError("");

        let response;

        // My Channel
        if (!id) {
          response = await api.get("/channels/my-channel");
        }

        // Public Channel
        else {
          response = await api.get(`/channels/${id}`);
        }

        setChannel(response.data.channel);
      } catch (error) {
        console.error("Fetch channel error:", error);

        // User doesn't have a channel yet
        if (!id && error.response?.status === 404) {
          setChannel(null);
          setShowCreateForm(true);
        } else {
          setError(
            error.response?.data?.message ||
              "Unable to load channel."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    // My Channel requires login
    if (!id && !user) {
      setLoading(false);
      setError("Please sign in to access your channel.");
      return;
    }

    fetchChannel();
  }, [id, user]);

  // ======================================================
  // CREATE CHANNEL
  // ======================================================

  const handleCreateChannel = async (event) => {
    event.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setError("");

      const response = await api.post("/channels", {
        channelName,
        description: channelDescription,
        channelBanner,
      });

      const newChannel = response.data.channel;

      setChannel(newChannel);
      setShowCreateForm(false);

      // Clear form
      setChannelName("");
      setChannelDescription("");
      setChannelBanner("");

      // Open newly created channel
      navigate(`/channel/${newChannel._id}`);
    } catch (error) {
      console.error("Create channel error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to create channel."
      );
    }
  };

  // ======================================================
  // RESET VIDEO FORM
  // ======================================================

  const resetVideoForm = () => {
    setVideoTitle("");
    setVideoDescription("");
    setVideoUrl("");
    setThumbnailUrl("");
    setVideoCategory("Technology");
    setEditingVideoId(null);
  };

  // ======================================================
  // ADD VIDEO
  // ======================================================

  const handleAddVideo = async (event) => {
    event.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setError("");

      const response = await api.post("/videos", {
        title: videoTitle,
        description: videoDescription,
        videoUrl,
        thumbnailUrl,
        category: videoCategory,
        channelId: channel._id,
      });

      // Add new video to the channel
      setChannel((previousChannel) => ({
        ...previousChannel,
        videos: [
          response.data.video,
          ...(previousChannel.videos || []),
        ],
      }));

      setShowVideoForm(false);
      resetVideoForm();
    } catch (error) {
      console.error("Add video error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to add video."
      );
    }
  };

  // ======================================================
  // START EDITING VIDEO
  // ======================================================

  const handleEditVideo = (video) => {
    setEditingVideoId(video._id);

    setVideoTitle(video.title);
    setVideoDescription(video.description);
    setVideoUrl(video.videoUrl);
    setThumbnailUrl(video.thumbnailUrl);
    setVideoCategory(video.category);

    setShowVideoForm(true);
    setError("");
  };

  // ======================================================
  // UPDATE VIDEO
  // ======================================================

  const handleUpdateVideo = async (event) => {
    event.preventDefault();

    if (!editingVideoId) {
      return;
    }

    try {
      setError("");

      const response = await api.put(
        `/videos/${editingVideoId}`,
        {
          title: videoTitle,
          description: videoDescription,
          videoUrl,
          thumbnailUrl,
          category: videoCategory,
        }
      );

      setChannel((previousChannel) => ({
        ...previousChannel,

        videos: (previousChannel.videos || []).map(
          (video) =>
            video._id === editingVideoId
              ? response.data.video
              : video
        ),
      }));

      setShowVideoForm(false);
      resetVideoForm();
    } catch (error) {
      console.error("Update video error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to update video."
      );
    }
  };

  // ======================================================
  // DELETE VIDEO
  // ======================================================

  const handleDeleteVideo = async (videoId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this video?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await api.delete(`/videos/${videoId}`);

      setChannel((previousChannel) => ({
        ...previousChannel,

        videos: (previousChannel.videos || []).filter(
          (video) => video._id !== videoId
        ),
      }));
    } catch (error) {
      console.error("Delete video error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to delete video."
      );
    }
  };

  // ======================================================
  // CANCEL VIDEO FORM
  // ======================================================

  const handleCancelVideoForm = () => {
    setShowVideoForm(false);
    resetVideoForm();
    setError("");
  };

  // ======================================================
  // OWNER CHECK
  // ======================================================

  /*
    MongoDB returns the channel owner ID as an ObjectId,
    while the logged-in user's ID can be stored as a string.

    Convert both values to strings before comparing them.
  */

// ======================================================
// OWNER CHECK
// ======================================================

// /my-channel always belongs to the logged-in user.
// For public /channel/:id pages, compare the owner IDs.
const currentUserId = user?.id || user?._id;

const channelOwnerId =
  channel?.owner?._id || channel?.owner;

const isOwner =
  Boolean(user) &&
  (
    !id ||
    (
      Boolean(channelOwnerId) &&
      String(currentUserId) === String(channelOwnerId)
    )
  );

  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <div className="page-message">
        <p>Loading channel...</p>
      </div>
    );
  }

  // ======================================================
  // LOGIN REQUIRED
  // ======================================================

  if (!user && !id) {
    return (
      <div className="page-message">
        <p>
          Please sign in to access your channel.
        </p>

        <button onClick={() => navigate("/login")}>
          Sign In
        </button>
      </div>
    );
  }

  // ======================================================
  // CREATE CHANNEL
  // ======================================================

  if (!channel && showCreateForm) {
    return (
      <div className="channel-page">
        <div className="channel-create-card">
          <h1>Create Your Channel</h1>

          <p>
            Create a channel to start uploading
            and managing your videos.
          </p>

          {error && (
            <p className="channel-error">
              {error}
            </p>
          )}

          <form
            className="channel-form"
            onSubmit={handleCreateChannel}
          >
            <input
              type="text"
              placeholder="Channel name"
              value={channelName}
              onChange={(event) =>
                setChannelName(event.target.value)
              }
              minLength="3"
              maxLength="100"
              required
            />

            <textarea
              placeholder="Channel description"
              value={channelDescription}
              onChange={(event) =>
                setChannelDescription(event.target.value)
              }
              maxLength="1000"
              rows="5"
            />

            <input
              type="url"
              placeholder="Channel banner URL (optional)"
              value={channelBanner}
              onChange={(event) =>
                setChannelBanner(event.target.value)
              }
            />

            <button type="submit">
              Create Channel
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ======================================================
  // CHANNEL ERROR
  // ======================================================

  if (error && !channel) {
    return (
      <div className="page-message">
        <p>{error}</p>
      </div>
    );
  }

  // ======================================================
  // CHANNEL PAGE
  // ======================================================

  return (
    <div className="channel-page">

      {/* ==================================================
          CHANNEL BANNER
          ================================================== */}

      <div className="channel-banner">
        {channel?.channelBanner ? (
          <img
            src={channel.channelBanner}
            alt={`${channel.channelName} banner`}
          />
        ) : (
          <div className="channel-banner-placeholder">
            {channel?.channelName}
          </div>
        )}
      </div>

      {/* ==================================================
          CHANNEL HEADER
          ================================================== */}

      <div className="channel-header">
        <div className="channel-avatar">
          {channel?.channelName
            ?.charAt(0)
            .toUpperCase() || "C"}
        </div>

        <div className="channel-info">
          <h1>{channel?.channelName}</h1>

          <p>
            {channel?.subscribers || 0} subscribers
          </p>

          {channel?.description && (
            <p className="channel-description">
              {channel.description}
            </p>
          )}
        </div>
      </div>

      {/* ==================================================
          OWNER ACTIONS
          ================================================== */}

      {isOwner && (
        <div className="channel-owner-actions">
          <button
            type="button"
            onClick={() => {
              if (showVideoForm) {
                handleCancelVideoForm();
              } else {
                setShowVideoForm(true);
              }
            }}
          >
            {showVideoForm
              ? "Cancel"
              : "Upload Video"}
          </button>
        </div>
      )}

      {/* ==================================================
          ERROR
          ================================================== */}

      {error && (
        <p className="channel-error">
          {error}
        </p>
      )}

      {/* ==================================================
          ADD / EDIT VIDEO FORM
          ================================================== */}

      {showVideoForm && isOwner && (
        <form
          className="video-form"
          onSubmit={
            editingVideoId
              ? handleUpdateVideo
              : handleAddVideo
          }
        >
          <h2>
            {editingVideoId
              ? "Edit Video"
              : "Add Video"}
          </h2>

          <input
            type="text"
            placeholder="Video title"
            value={videoTitle}
            onChange={(event) =>
              setVideoTitle(event.target.value)
            }
            minLength="3"
            maxLength="150"
            required
          />

          <textarea
            placeholder="Video description"
            value={videoDescription}
            onChange={(event) =>
              setVideoDescription(event.target.value)
            }
            maxLength="5000"
            rows="5"
            required
          />

          <input
            type="url"
            placeholder="Video embed URL"
            value={videoUrl}
            onChange={(event) =>
              setVideoUrl(event.target.value)
            }
            required
          />

          <input
            type="url"
            placeholder="Thumbnail URL"
            value={thumbnailUrl}
            onChange={(event) =>
              setThumbnailUrl(event.target.value)
            }
            required
          />

          <select
            value={videoCategory}
            onChange={(event) =>
              setVideoCategory(event.target.value)
            }
          >
            <option value="Music">
              Music
            </option>

            <option value="Gaming">
              Gaming
            </option>

            <option value="Education">
              Education
            </option>

            <option value="Technology">
              Technology
            </option>

            <option value="Sports">
              Sports
            </option>

            <option value="Entertainment">
              Entertainment
            </option>
          </select>

          <button type="submit">
            {editingVideoId
              ? "Update Video"
              : "Add Video"}
          </button>

          {editingVideoId && (
            <button
              type="button"
              onClick={handleCancelVideoForm}
            >
              Cancel
            </button>
          )}
        </form>
      )}

      {/* ==================================================
          CHANNEL VIDEOS
          ================================================== */}

      <section className="channel-videos">
        <h2>Videos</h2>

        {!channel?.videos ||
        channel.videos.length === 0 ? (
          <p>
            This channel has no videos yet.
          </p>
        ) : (
          <div className="video-grid">
            {channel.videos.map((video) => (
              <div
                key={video._id}
                className="channel-video-item"
              >
                <VideoCard video={video} />

                {/* Owner controls */}
                {isOwner && (
                  <div className="video-owner-actions">
                    <button
                      type="button"
                      onClick={() =>
                        handleEditVideo(video)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteVideo(video._id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Channel;