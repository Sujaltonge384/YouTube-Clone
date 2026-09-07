import { useNavigate } from "react-router-dom";

function RecommendedVideoCard({ video }) {
  const navigate = useNavigate();

  const handleVideoClick = () => {
    navigate(`/watch/${video._id}`);
  };

  const handleChannelClick = (event) => {
    event.stopPropagation();

    if (video.channel?._id) {
      navigate(`/channel/${video.channel._id}`);
    }
  };

  const channelName =
    video.channel?.channelName || "Unknown channel";

  const channelInitial =
    channelName.charAt(0).toUpperCase();

  return (
    <article
      className="recommended-video-card"
      onClick={handleVideoClick}
    >
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="recommended-video-thumbnail"
      />

      <div className="recommended-video-info">

        <h3 className="recommended-video-title">
          {video.title}
        </h3>

        <button
          type="button"
          className="recommended-channel"
          onClick={handleChannelClick}
        >
          <span className="recommended-channel-avatar">
            {channelInitial}
          </span>

          <span>
            {channelName}
          </span>
        </button>

        <p className="recommended-video-meta">
          {video.views || 0} views
        </p>

      </div>
    </article>
  );
}

export default RecommendedVideoCard;