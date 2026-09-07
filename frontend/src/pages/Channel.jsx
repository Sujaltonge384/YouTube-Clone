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

  // Stores channel information
  const [channel, setChannel] = useState(null);

  // Controls loading state
  const [loading, setLoading] = useState(true);

  // Stores error messages
  const [error, setError] = useState("");

  // Controls the create channel form
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Controls the video form
  const [showVideoForm, setShowVideoForm] = useState(false);

  // Stores the ID of the video currently being edited
  // null means we are adding a new video.
  const [editingVideoId, setEditingVideoId] = useState(null);


  // ======================================================
  // CHANNEL FORM STATE
  // ======================================================

  const [channelName, setChannelName] = useState("");

  const [channelDescription, setChannelDescription] =
    useState("");

  const [channelBanner, setChannelBanner] =
    useState("");


  // ======================================================
  // VIDEO FORM STATE
  // ======================================================

  const [videoTitle, setVideoTitle] = useState("");

  const [videoDescription, setVideoDescription] =
    useState("");

  const [videoUrl, setVideoUrl] = useState("");

  const [thumbnailUrl, setThumbnailUrl] =
    useState("");

  const [videoCategory, setVideoCategory] =
    useState("Technology");


  // ======================================================
  // FETCH CHANNEL
  // ======================================================

  useEffect(() => {

    const fetchChannel = async () => {

      try {

        setLoading(true);
        setError("");

        let response;


        // --------------------------------------------------
        // MY CHANNEL
        // --------------------------------------------------

        if (!id) {

          // JWT is automatically attached by
          // the Axios interceptor.
          response = await api.get(
            "/channels/my-channel"
          );

        }


        // --------------------------------------------------
        // PUBLIC CHANNEL
        // --------------------------------------------------

        else {

          response = await api.get(
            `/channels/${id}`
          );

        }


        setChannel(response.data.channel);

      } catch (error) {

        console.error(
          "Fetch channel error:",
          error
        );


        // A 404 means the logged-in user
        // does not have a channel yet.
        if (
          !id &&
          error.response?.status === 404
        ) {

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


    // /my-channel is protected,
    // so the user must be logged in.
    if (!id && !user) {

      setLoading(false);

      setError(
        "Please sign in to access your channel."
      );

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


      const response = await api.post(
        "/channels",
        {
          channelName,
          description: channelDescription,
          channelBanner,
        }
      );


      const newChannel =
        response.data.channel;


      setChannel(newChannel);

      setShowCreateForm(false);


      // Clear channel form
      setChannelName("");
      setChannelDescription("");
      setChannelBanner("");


      // Navigate to the newly created channel
      navigate(
        `/channel/${newChannel._id}`
      );

    } catch (error) {

      console.error(
        "Create channel error:",
        error
      );


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


      const response = await api.post(
        "/videos",
        {
          title: videoTitle,
          description: videoDescription,
          videoUrl,
          thumbnailUrl,
          category: videoCategory,
          channelId: channel._id,
        }
      );


      // Add the new video to local state.
      setChannel((previousChannel) => ({
        ...previousChannel,

        videos: [
          response.data.video,
          ...previousChannel.videos,
        ],

      }));


      // Close the form
      setShowVideoForm(false);


      // Clear the form
      resetVideoForm();

    } catch (error) {

      console.error(
        "Add video error:",
        error
      );


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

    // Store the video ID so we know which
    // video needs to be updated.
    setEditingVideoId(video._id);


    // Fill the form with the video's
    // current information.
    setVideoTitle(video.title);

    setVideoDescription(
      video.description
    );

    setVideoUrl(video.videoUrl);

    setThumbnailUrl(
      video.thumbnailUrl
    );

    setVideoCategory(
      video.category
    );


    // Open the video form
    setShowVideoForm(true);


    // Clear previous error
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


      // Replace the old video with
      // the updated video.
      setChannel((previousChannel) => ({
        ...previousChannel,

        videos: previousChannel.videos.map(
          (video) =>
            video._id === editingVideoId
              ? response.data.video
              : video
        ),

      }));


      // Close the form
      setShowVideoForm(false);


      // Clear the form
      resetVideoForm();

    } catch (error) {

      console.error(
        "Update video error:",
        error
      );


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


      await api.delete(
        `/videos/${videoId}`
      );


      // Remove the deleted video
      // from the channel state.
      setChannel((previousChannel) => ({
        ...previousChannel,

        videos: previousChannel.videos.filter(
          (video) => video._id !== videoId
        ),

      }));

    } catch (error) {

      console.error(
        "Delete video error:",
        error
      );


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

        <button
          onClick={() => navigate("/login")}
        >
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

          <h1>
            Create Your Channel
          </h1>

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

            {/* Channel name */}
            <input
              type="text"
              placeholder="Channel name"
              value={channelName}
              onChange={(event) => {
                setChannelName(
                  event.target.value
                );
              }}
              minLength="3"
              maxLength="100"
              required
            />


            {/* Channel description */}
            <textarea
              placeholder="Channel description"
              value={channelDescription}
              onChange={(event) => {
                setChannelDescription(
                  event.target.value
                );
              }}
              maxLength="1000"
              rows="5"
            />


            {/* Optional channel banner */}
            <input
              type="url"
              placeholder="Channel banner URL (optional)"
              value={channelBanner}
              onChange={(event) => {
                setChannelBanner(
                  event.target.value
                );
              }}
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
  // OWNER CHECK
  // ======================================================

  const isOwner =
    user &&
    channel?.owner?._id === user.id;


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

          <h1>
            {channel?.channelName}
          </h1>


          <p>
            {channel?.subscribers || 0}
            {" "}
            subscribers
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
              : "Add Video"}
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


          {/* Video title */}
          <input
            type="text"
            placeholder="Video title"
            value={videoTitle}
            onChange={(event) => {
              setVideoTitle(
                event.target.value
              );
            }}
            minLength="3"
            maxLength="150"
            required
          />


          {/* Video description */}
          <textarea
            placeholder="Video description"
            value={videoDescription}
            onChange={(event) => {
              setVideoDescription(
                event.target.value
              );
            }}
            maxLength="5000"
            rows="5"
            required
          />


          {/* Video URL */}
          <input
            type="url"
            placeholder="Video embed URL"
            value={videoUrl}
            onChange={(event) => {
              setVideoUrl(
                event.target.value
              );
            }}
            required
          />


          {/* Thumbnail URL */}
          <input
            type="url"
            placeholder="Thumbnail URL"
            value={thumbnailUrl}
            onChange={(event) => {
              setThumbnailUrl(
                event.target.value
              );
            }}
            required
          />


          {/* Video category */}
          <select
            value={videoCategory}
            onChange={(event) => {
              setVideoCategory(
                event.target.value
              );
            }}
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


          {/* Submit button */}
          <button type="submit">
            {editingVideoId
              ? "Update Video"
              : "Add Video"}
          </button>


          {/* Cancel edit button */}
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

        <h2>
          Videos
        </h2>


        {channel?.videos?.length === 0 ? (

          <p>
            This channel has no videos yet.
          </p>

        ) : (

          <div className="video-grid">

            {channel?.videos?.map((video) => (

              <div
                key={video._id}
                className="channel-video-item"
              >

                <VideoCard
                  video={video}
                />


                {/* Owner controls */}
                {isOwner && (

                  <div className="video-owner-actions">

                    <button
                      onClick={() => {
                        handleEditVideo(video);
                      }}
                    >
                      Edit
                    </button>


                    <button
                      onClick={() => {
                        handleDeleteVideo(
                          video._id
                        );
                      }}
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