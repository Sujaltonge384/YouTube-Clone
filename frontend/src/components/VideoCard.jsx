import { useNavigate } from "react-router-dom";


function VideoCard({ video }) {

  const navigate = useNavigate();


  // ======================================================
  // VIDEO CLICK
  // ======================================================

  const handleVideoClick = () => {
    navigate(`/watch/${video._id}`);
  };


  // ======================================================
  // CHANNEL CLICK
  // ======================================================

  const handleChannelClick = (event) => {

    // Prevent the video card click from firing
    event.stopPropagation();

    if (video.channel?._id) {
      navigate(`/channel/${video.channel._id}`);
    }
  };


  // ======================================================
  // CHANNEL INFORMATION
  // ======================================================

  const channelName =
    video.channel?.channelName ||
    "Unknown channel";


  const channelInitial =
    channelName.charAt(0).toUpperCase();


  return (
    <article
      className="video-card"
      onClick={handleVideoClick}
    >


      {/* ==================================================
          VIDEO THUMBNAIL
          ================================================== */}

      <img
        className="video-thumbnail"
        src={video.thumbnailUrl}
        alt={video.title}
      />


      <div className="video-card-info">


        {/* ==================================================
            VIDEO TITLE
            ================================================== */}

        <h3 className="video-title">
          {video.title}
        </h3>


        {/* ==================================================
            CHANNEL
            ================================================== */}

        <button
          type="button"
          className="video-card-channel"
          onClick={handleChannelClick}
        >

          {video.channel?.channelAvatar ? (

            <img
              src={video.channel.channelAvatar}
              alt={channelName}
              className="video-card-channel-avatar"
            />

          ) : (

            // Fallback if channel logo is unavailable
            <span className="video-card-channel-avatar">
              {channelInitial}
            </span>

          )}


          <span className="video-card-channel-name">
            {channelName}
          </span>

        </button>


        {/* ==================================================
            VIDEO VIEWS
            ================================================== */}

        <p className="video-meta">
          {video.views || 0} views
        </p>


      </div>

    </article>
  );
}


export default VideoCard;