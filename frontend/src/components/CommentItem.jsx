import { useState } from "react";

import api from "../services/api";


function CommentItem({ comment, currentUser, onCommentUpdated, onCommentDeleted }) {

  // Controls whether this comment is currently being edited
  const [isEditing, setIsEditing] = useState(false);

  // Stores the edited comment text
  const [editText, setEditText] = useState(comment.text);

  // Used to display errors
  const [error, setError] = useState("");


  // ======================================================
  // UPDATE COMMENT
  // ======================================================

  const handleUpdate = async () => {
    try {
      setError("");

      const response = await api.put(
        `/comments/${comment._id}`,
        {
          text: editText,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Send updated comment back to parent component
      onCommentUpdated(response.data.comment);

      setIsEditing(false);

    } catch (error) {
      console.error("Update comment error:", error);

      setError(
        error.response?.data?.message ||
        "Unable to update comment"
      );
    }
  };


  // ======================================================
  // DELETE COMMENT
  // ======================================================

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await api.delete(
        `/comments/${comment._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Tell parent that this comment was deleted
      onCommentDeleted(comment._id);

    } catch (error) {
      console.error("Delete comment error:", error);

      setError(
        error.response?.data?.message ||
        "Unable to delete comment"
      );
    }
  };


  // ======================================================
  // CHECK COMMENT OWNER
  // ======================================================

  const isOwner =
    currentUser &&
    comment.user?._id === currentUser.id;


  return (
    <article className="comment-item">

      <div className="comment-avatar">
        {comment.user?.username?.charAt(0).toUpperCase() || "U"}
      </div>

      <div className="comment-content">

        <p className="comment-username">
          {comment.user?.username || "Unknown user"}
        </p>


        {isEditing ? (
          <div className="comment-edit-container">

            <textarea
              value={editText}
              onChange={(event) => {
                setEditText(event.target.value);
              }}
            />

            <div className="comment-edit-actions">

              <button onClick={handleUpdate}>
                Save
              </button>

              <button
                onClick={() => {
                  setEditText(comment.text);
                  setIsEditing(false);
                }}
              >
                Cancel
              </button>

            </div>

          </div>
        ) : (
          <p className="comment-text">
            {comment.text}
          </p>
        )}


        {isOwner && !isEditing && (
          <div className="comment-actions">

            <button
              onClick={() => {
                setIsEditing(true);
              }}
            >
              Edit
            </button>

            <button onClick={handleDelete}>
              Delete
            </button>

          </div>
        )}


        {error && (
          <p className="comment-error">
            {error}
          </p>
        )}

      </div>

    </article>
  );
}

export default CommentItem;