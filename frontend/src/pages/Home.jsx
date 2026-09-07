import { useEffect, useState } from "react";

import api from "../services/api";
import VideoCard from "../components/VideoCard";


function Home() {

  // Stores videos returned by the backend
  const [videos, setVideos] = useState([]);

  // Used to display loading state
  const [loading, setLoading] = useState(true);

  // Used to display API errors
  const [error, setError] = useState("");


  // Fetch videos when the Home page loads
  useEffect(() => {

    const fetchVideos = async () => {
      try {

        setLoading(true);
        setError("");

        // Request videos from Express API
        const response = await api.get("/videos");

        // Store returned videos in React state
        setVideos(response.data.videos);

      } catch (error) {

        console.error("Failed to fetch videos:", error);

        setError(
          "Unable to load videos. Please try again."
        );

      } finally {

        setLoading(false);
      }
    };

    fetchVideos();

  }, []);


  // Loading state
  if (loading) {
    return (
      <div className="page-message">
        <p>Loading videos...</p>
      </div>
    );
  }


  // Error state
  if (error) {
    return (
      <div className="page-message">
        <p>{error}</p>
      </div>
    );
  }


  return (
    <div className="home-page">

      <h1 className="page-title">
        Recommended
      </h1>

      {videos.length === 0 ? (
        <div className="page-message">
          <p>No videos available.</p>
        </div>
      ) : (
        <div className="video-grid">

          {videos.map((video) => (
            <VideoCard
              key={video._id}
              video={video}
            />
          ))}

        </div>
      )}

    </div>
  );
}

export default Home;