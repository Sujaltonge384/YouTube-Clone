import { useEffect, useState } from "react";

import api from "../services/api";
import CommentItem from "./CommentItem";

function Comments({ videoId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ======================================================
  // CURRENT USER
  // ======================================================

  const getCurrentUser = () => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error("Invalid stored user:", error);
      return null;
    }
  };

  const currentUser = getCurrentUser();

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

        console.log(
          "Comments received from backend:",
          response.data.comments
        );

        setComments(response.data.comments || []);
      } catch (error) {
        console.error(
          "Fetch comments error:",
          error
        );

        setError(
          error.response?.data?.message ||
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

    if (!text.trim()) {
      return;
    }

    if (!currentUser) {
      setError("Please sign in to comment.");
      return;
    }

    try {
      setError("");

      const response = await api.post(
        "/comments",
        {
          text: text.trim(),
          videoId,
        }
      );

      console.log(
        "New comment received from backend:",
        response.data.comment
      );

      let newComment = response.data.comment;

      // --------------------------------------------------
      // Fallback:
      // If backend does not return populated user data,
      // attach the logged-in user from localStorage.
      // --------------------------------------------------

      if (
        !newComment.user ||
        typeof newComment.user === "string"
      ) {
        newComment = {
          ...newComment,

          user: {
            _id:
              currentUser.id ||
              currentUser._id,

            username:
              currentUser.username,

            avatar:
              currentUser.avatar || "",
          },
        };
      }

      setComments((previousComments) => [
        newComment,
        ...previousComments,
      ]);

      setText("");
    } catch (error) {
      console.error(
        "Add comment error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to add comment."
      );
    }
  };

  // ======================================================
  // UPDATE COMMENT IN STATE
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
  // DELETE COMMENT FROM STATE
  // ======================================================

  const handleCommentDeleted = (commentId) => {
    setComments((previousComments) =>
      previousComments.filter(
        (comment) =>
          comment._id !== commentId
      )
    );
  };

  // ======================================================
  // RENDER
  // ======================================================

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
              onChange={(event) =>
                setText(event.target.value)
              }
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

      {/* ==================================================
          ERROR
          ================================================== */}

      {error && (
        <p className="comment-error">
          {error}
        </p>
      )}

      {/* ==================================================
          COMMENTS
          ================================================== */}

      {loading ? (
        <p>Loading comments...</p>
      ) : comments.length === 0 ? (
        <p>
          No comments yet. Be the first to comment!
        </p>
      ) : (
        <div className="comments-list">

          {comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              currentUser={currentUser}
              onCommentUpdated={
                handleCommentUpdated
              }
              onCommentDeleted={
                handleCommentDeleted
              }
            />
          ))}

        </div>
      )}
    </section>
  );
}

export default Comments;