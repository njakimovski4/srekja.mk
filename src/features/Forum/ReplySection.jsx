// src/features/Forum/ReplySection.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { addAnswer } from "../../services/apiForum";
import { useQueryClient } from "@tanstack/react-query";

const ReplySection = ({ questionId }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();

  const toggleReplyForm = () => setShowReplyForm((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const answerData = {
      question_id: questionId,
      content,
      name: isAnonymous ? null : name,
      is_anonymous: isAnonymous,
      created_at: new Date().toISOString(),
    };

    try {
      await addAnswer(answerData);
      setMessage("Reply submitted successfully!");
      setName("");
      setContent("");
      setIsAnonymous(false);
      setShowReplyForm(false);
      queryClient.invalidateQueries(["answers", questionId]);
    } catch (error) {
      setMessage("Error submitting reply");
    }
  };

  return (
    <div style={{ marginTop: "15px" }}>
      <button onClick={toggleReplyForm} style={replyStyles.button}>
        Reply
      </button>
      <AnimatePresence>
        {showReplyForm && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.8 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            style={replyStyles.container}
          >
            <form onSubmit={handleSubmit}>
              <textarea
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                style={replyStyles.textarea}
              />
              <div style={replyStyles.row}>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isAnonymous}
                  style={replyStyles.input}
                />
                <label style={replyStyles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={() => setIsAnonymous(!isAnonymous)}
                  />
                  Post Anonymously
                </label>
              </div>
              <button type="submit" style={replyStyles.submitButton}>
                Post Reply
              </button>
            </form>
            {message && (
              <p style={replyStyles.message}>
                {message}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

ReplySection.propTypes = {
  questionId: PropTypes.string.isRequired,
};

const replyStyles = {
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  container: {
    marginTop: "10px",
    padding: "15px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    backgroundColor: "#fafafa",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    resize: "vertical",
    minHeight: "80px",
    fontSize: "14px",
    marginBottom: "10px",
  },
  row: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    marginRight: "10px",
    fontSize: "14px",
  },
  checkboxLabel: {
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
  message: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#555",
  },
};

export default ReplySection;
