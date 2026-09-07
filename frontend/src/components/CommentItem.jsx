import { useState } from "react";

import api from "../services/api";

function CommentItem({
  comment,
  currentUser,
  onCommentUpdated,
  onCommentDeleted,
}) {
  // ======================================================
  // STATE
  // ======================================================

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(
    comment.text
  );

  const [error, setError] = useState("");

  // ======================================================
  // USER INFORMATION
  // ======================================================

  const commentUser =
    comment.user &&
    typeof comment.user === "object"
      ? comment.user
      : null;

  const username =
    commentUser?.username ||
    "Unknown user";

  const avatar =
    commentUser?.avatar || "";

  // ======================================================
  // OWNER CHECK
  // ======================================================

  const currentUserId =
    currentUser?.id ||
    currentUser?._id;

  const commentUserId =
    commentUser?._id ||
    comment.user;

  const isOwner =
    Boolean(currentUserId) &&
    Boolean(commentUserId) &&
    String(currentUserId) ===
      String(commentUserId);

  // ======================================================
  // UPDATE COMMENT
  // ======================================================

  const handleUpdate = async () => {
    if (!editText.trim()) {
      setError(
        "Comment cannot be empty."
      );
      return;
    }

    try {
      setError("");

      const response = await api.put(
        `/comments/${comment._id}`,
        {
          text: editText.trim(),
        }
      );

      onCommentUpdated(
        response.data.comment
      );

      setIsEditing(false);
    } catch (error) {
      console.error(
        "Update comment error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to update comment."
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
        `/comments/${comment._id}`
      );

      onCommentDeleted(comment._id);
    } catch (error) {
      console.error(
        "Delete comment error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to delete comment."
      );
    }
  };

  // ======================================================
  // AVATAR LETTER
  // ======================================================

  const avatarLetter =
    username
      ?.charAt(0)
      .toUpperCase() || "U";

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <article className="comment-item">

      {/* ==================================================
          AVATAR
          ================================================== */}

      <div className="comment-avatar">

        {avatar ? (
          <img
            src={avatar}
            alt={username}
          />
        ) : (
          avatarLetter
        )}

      </div>

      {/* ==================================================
          COMMENT CONTENT
          ================================================== */}

      <div className="comment-content">

        <div className="comment-header">

          <strong>
            {username}
          </strong>

        </div>

        {/* ==================================================
            EDIT MODE
            ================================================== */}

        {isEditing ? (

          <div className="comment-edit-form">

            <textarea
              value={editText}
              onChange={(event) =>
                setEditText(
                  event.target.value
                )
              }
              rows="3"
            />

            <div className="comment-edit-actions">

              <button
                type="button"
                onClick={handleUpdate}
              >
                Save
              </button>

              <button
                type="button"
                onClick={() => {
                  setEditText(
                    comment.text
                  );

                  setIsEditing(false);
                  setError("");
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

        {/* ==================================================
            OWNER ACTIONS
            ================================================== */}

        {isOwner && !isEditing && (

          <div className="comment-actions">

            <button
              type="button"
              onClick={() => {
                setEditText(
                  comment.text
                );

                setIsEditing(true);
                setError("");
              }}
            >
              Edit
            </button>

            <button
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>

          </div>

        )}

        {/* ==================================================
            ERROR
            ================================================== */}

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