import { useEffect, useState } from "react";

import api from "../services/api";
import CommentItem from "./CommentItem";


function Comments({ videoId }) {

  // All comments for this video
  const [comments, setComments] = useState([]);

  // New comment text
  const [text, setText] = useState("");

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error state
  const [error, setError] = useState("");


  // Get the logged-in user from localStorage
  const storedUser = localStorage.getItem("user");

  const currentUser = storedUser
    ? JSON.parse(storedUser)
    : null;


  // ======================================================
  // FETCH COMMENTS
  // ======================================================

  useEffect(() => {

    const fetchComments = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/comments/video/${videoId}`
        );

        setComments(response.data.comments);

      } catch (error) {
        console.error("Fetch comments error:", error);

        setError(
          "Unable to load comments."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchComments();

  }, [videoId]);


  // ======================================================
  // ADD COMMENT
  // ======================================================

  const handleAddComment = async (event) => {
    event.preventDefault();

    // Prevent empty comments
    if (!text.trim()) {
      return;
    }

    // User must be logged in
    if (!currentUser) {
      setError("Please sign in to comment.");
      return;
    }

    try {
      setError("");

      const response = await api.post(
        "/comments",
        {
          text,
          videoId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Add the newly created comment to the top
      setComments((previousComments) => [
        response.data.comment,
        ...previousComments,
      ]);

      // Clear input
      setText("");

    } catch (error) {
      console.error("Add comment error:", error);

      setError(
        error.response?.data?.message ||
        "Unable to add comment"
      );
    }
  };


  // ======================================================
  // UPDATE COMMENT IN LOCAL STATE
  // ======================================================

  const handleCommentUpdated = (updatedComment) => {
    setComments((previousComments) =>
      previousComments.map((comment) =>
        comment._id === updatedComment._id
          ? updatedComment
          : comment
      )
    );
  };


  // ======================================================
  // REMOVE COMMENT FROM LOCAL STATE
  // ======================================================

  const handleCommentDeleted = (commentId) => {
    setComments((previousComments) =>
      previousComments.filter(
        (comment) => comment._id !== commentId
      )
    );
  };


  return (
    <section className="comments-section">

      <h2>
        {comments.length} Comments
      </h2>


      {/* ==================================================
          ADD COMMENT
          ================================================== */}

      {currentUser ? (
        <form
          className="comment-form"
          onSubmit={handleAddComment}
        >

          <div className="comment-avatar">
            {currentUser.username
              ?.charAt(0)
              .toUpperCase() || "U"}
          </div>

          <div className="comment-form-content">

            <textarea
              value={text}
              onChange={(event) => {
                setText(event.target.value);
              }}
              placeholder="Add a comment..."
              rows="3"
            />

            <button
              type="submit"
              disabled={!text.trim()}
            >
              Comment
            </button>

          </div>

        </form>
      ) : (
        <p className="comment-login-message">
          Sign in to leave a comment.
        </p>
      )}


      {error && (
        <p className="comment-error">
          {error}
        </p>
      )}


      {/* ==================================================
          COMMENTS LIST
          ================================================== */}

      {loading ? (
        <p>Loading comments...</p>
      ) : comments.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        <div className="comments-list">

          {comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              currentUser={currentUser}
              onCommentUpdated={handleCommentUpdated}
              onCommentDeleted={handleCommentDeleted}
            />
          ))}

        </div>
      )}

    </section>
  );
}

export default Comments;