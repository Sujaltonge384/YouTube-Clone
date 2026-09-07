import { useNavigate } from "react-router-dom";

function VideoCard({ video }) {
  const navigate = useNavigate();

  // Open the video player when the card is clicked
  const handleVideoClick = () => {
    navigate(`/watch/${video._id}`);
  };

  return (
    <article
      className="video-card"
      onClick={handleVideoClick}
    >
      {/* Video thumbnail */}
      <img
        className="video-thumbnail"
        src={video.thumbnailUrl}
        alt={video.title}
      />

      <div className="video-card-info">

        {/* Video title */}
        <h3 className="video-title">
          {video.title}
        </h3>

        {/* Channel name */}
        <p className="video-channel">
          {video.channel?.channelName || "Unknown channel"}
        </p>

        {/* Views */}
        <p className="video-meta">
          {video.views || 0} views
        </p>

      </div>
    </article>
  );
}

export default VideoCard;