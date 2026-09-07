import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import api from "../services/api";
import VideoCard from "../components/VideoCard";


function Home() {

  // Get the search text from Layout
  const { searchTerm } = useOutletContext();


  // ======================================================
  // STATE
  // ======================================================

  // Stores all videos received from the backend
  const [videos, setVideos] = useState([]);

  // Controls loading state
  const [loading, setLoading] = useState(true);

  // Stores error messages
  const [error, setError] = useState("");

  // Stores the currently selected category
  const [selectedCategory, setSelectedCategory] =
    useState("All");


  // ======================================================
  // CATEGORIES
  // ======================================================

  // Categories required for the YouTube clone.
  // We provide more than the minimum six categories.
  const categories = [
    "All",
    "Music",
    "Gaming",
    "Education",
    "Technology",
    "Sports",
    "Entertainment",
  ];


  // ======================================================
// FETCH VIDEOS
// ======================================================

useEffect(() => {

  const fetchVideos = async () => {

    try {

      setLoading(true);
      setError("");

      // Get videos from backend
      const response = await api.get("/videos");

      const fetchedVideos =
        response.data.videos || [];

      // Randomize video order
      const shuffledVideos = [
        ...fetchedVideos,
      ].sort(() => Math.random() - 0.5);

      // Store randomized videos
      setVideos(shuffledVideos);

    } catch (error) {

      console.error(
        "Fetch videos error:",
        error
      );

      setError(
        "Unable to load videos."
      );

    } finally {

      setLoading(false);

    }
  };

  fetchVideos();

}, []);


  // ======================================================
  // FILTER VIDEOS
  // ======================================================

  const filteredVideos = videos.filter((video) => {

    // ----------------------------------------------------
    // TITLE SEARCH
    // ----------------------------------------------------

    // Convert video title to lowercase
    // so search becomes case-insensitive.
    const title =
      video.title?.toLowerCase() || "";


    // Convert search text to lowercase
    // and remove extra spaces.
    const search =
      searchTerm.trim().toLowerCase();


    // Check whether title matches search text.
    const matchesSearch =
      !search || title.includes(search);


    // ----------------------------------------------------
    // CATEGORY FILTER
    // ----------------------------------------------------

    // "All" displays videos from every category.
    //
    // Otherwise, compare the video's category
    // with the selected category.
    const matchesCategory =
      selectedCategory === "All" ||
      video.category?.toLowerCase() ===
        selectedCategory.toLowerCase();


    // ----------------------------------------------------
    // FINAL FILTER RESULT
    // ----------------------------------------------------

    // Video must match BOTH search and category.
    return matchesSearch && matchesCategory;

  });


  // ======================================================
  // LOADING STATE
  // ======================================================

  if (loading) {

    return (
      <div className="page-message">

        <p>
          Loading videos...
        </p>

      </div>
    );

  }


  // ======================================================
  // ERROR STATE
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
  // RENDER
  // ======================================================

  return (
    <div className="home-page">


      {/* ==================================================
          PAGE TITLE
          ================================================== */}

      <h1 className="page-title">
        Recommended
      </h1>


      {/* ==================================================
          CATEGORY FILTERS
          ================================================== */}

      <div className="category-filters">

        {categories.map((category) => (

          <button
            key={category}
            className={`category-button ${
              selectedCategory === category
                ? "active"
                : ""
            }`}
            onClick={() => {
              setSelectedCategory(category);
            }}
          >
            {category}
          </button>

        ))}

      </div>


      {/* ==================================================
          SEARCH RESULT MESSAGE
          ================================================== */}

      {searchTerm.trim() && (

        <p className="search-result-message">

          Search results for "{searchTerm}"

        </p>

      )}


      {/* ==================================================
          SELECTED CATEGORY MESSAGE
          ================================================== */}

      {selectedCategory !== "All" && (

        <p className="category-result-message">

          Category: {selectedCategory}

        </p>

      )}


      {/* ==================================================
          VIDEO GRID
          ================================================== */}

      {filteredVideos.length === 0 ? (

        <div className="page-message">

          <p>
            No videos found.
          </p>

        </div>

      ) : (

        <div className="video-grid">

          {filteredVideos.map((video) => (

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