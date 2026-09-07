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
  // STATE
  // ======================================================

  // Stores channel information
  const [channel, setChannel] = useState(null);

  // Controls loading state
  const [loading, setLoading] = useState(true);

  // Stores error messages
  const [error, setError] = useState("");

  // Controls the create channel form
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Controls the add video form
  const [showVideoForm, setShowVideoForm] = useState(false);


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

          // The interceptor automatically adds
          // the JWT token to this protected request.
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


        // A 404 on /my-channel means the user
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


    // Only try to fetch "my channel"
    // when the user is logged in.
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


      // Clear the form
      setChannelName("");
      setChannelDescription("");
      setChannelBanner("");


      // Open the newly created channel
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


      // Add the newly created video
      // to the beginning of the channel videos.
      setChannel((previousChannel) => ({
        ...previousChannel,

        videos: [
          response.data.video,
          ...previousChannel.videos,
        ],

      }));


      // Hide the form
      setShowVideoForm(false);


      // Clear the form
      setVideoTitle("");
      setVideoDescription("");
      setVideoUrl("");
      setThumbnailUrl("");
      setVideoCategory("Technology");

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
                setChannelName(event.target.value);
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


            {/* Optional banner */}
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
              setShowVideoForm(
                (previousState) =>
                  !previousState
              );
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
          ADD VIDEO FORM
          ================================================== */}

      {showVideoForm && isOwner && (

        <form
          className="video-form"
          onSubmit={handleAddVideo}
        >

          <h2>
            Add Video
          </h2>


          {/* Video title */}
          <input
            type="text"
            placeholder="Video title"
            value={videoTitle}
            onChange={(event) => {
              setVideoTitle(event.target.value);
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
              setVideoUrl(event.target.value);
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


          {/* Category */}
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


          <button type="submit">
            Add Video
          </button>

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

              <VideoCard
                key={video._id}
                video={video}
              />

            ))}

          </div>

        )}

      </section>

    </div>
  );
}


export default Channel;