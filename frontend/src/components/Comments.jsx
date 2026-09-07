import { useEffect, useState } from "react";

import api from "../services/api";
import CommentItem from "./CommentItem";


function Comments({ videoId }) {

  // ======================================================
  // STATE
  // ======================================================

  // Stores all comments for this video
  const [comments, setComments] = useState([]);

  // Stores the text of a new comment
  const [text, setText] = useState("");

  // Controls the loading state while comments are being fetched
  const [loading, setLoading] = useState(true);

  // Stores any error message
  const [error, setError] = useState("");


  // ======================================================
  // CURRENT USER
  // ======================================================

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

        // Get all comments belonging to this video
        const response = await api.get(
          `/comments/video/${videoId}`
        );

        setComments(response.data.comments);

      } catch (error) {
        console.error("Fetch comments error:", error);

        setError("Unable to load comments.");

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

    // Do not allow empty comments
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

      // The Axios interceptor automatically
      // adds the JWT Authorization header.
      const response = await api.post("/comments", {
        text,
        videoId,
      });

      // Add the newly created comment
      // to the beginning of the comments list.
      setComments((previousComments) => [
        response.data.comment,
        ...previousComments,
      ]);

      // Clear the comment input
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
  // UPDATE COMMENT
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
  // DELETE COMMENT
  // ======================================================

  const handleCommentDeleted = (commentId) => {

    setComments((previousComments) =>
      previousComments.filter(
        (comment) => comment._id !== commentId
      )
    );
  };


  // ======================================================
  // RENDER
  // ======================================================

  return (
    <section className="comments-section">

      {/* Number of comments */}
      <h2>
        {comments.length} Comments
      </h2>


      {/* ==================================================
          ADD COMMENT FORM
          ================================================== */}

      {currentUser ? (

        <form
          className="comment-form"
          onSubmit={handleAddComment}
        >

          {/* User avatar */}
          <div className="comment-avatar">
            {currentUser.username
              ?.charAt(0)
              .toUpperCase() || "U"}
          </div>


          <div className="comment-form-content">

            {/* Comment input */}
            <textarea
              value={text}
              onChange={(event) => {
                setText(event.target.value);
              }}
              placeholder="Add a comment..."
              rows="3"
            />


            {/* Submit button */}
            <button
              type="submit"
              disabled={!text.trim()}
            >
              Comment
            </button>

          </div>

        </form>

      ) : (

        // Message shown to logged-out users
        <p className="comment-login-message">
          Sign in to leave a comment.
        </p>

      )}


      {/* ==================================================
          ERROR MESSAGE
          ================================================== */}

      {error && (
        <p className="comment-error">
          {error}
        </p>
      )}


      {/* ==================================================
          COMMENTS LIST
          ================================================== */}

      {loading ? (

        // Loading state
        <p>Loading comments...</p>

      ) : comments.length === 0 ? (

        // Empty state
        <p>
          No comments yet. Be the first to comment!
        </p>

      ) : (

        // Display all comments
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