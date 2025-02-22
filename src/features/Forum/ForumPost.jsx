// src/features/Forum/ForumPost.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useQueryClient } from '@tanstack/react-query';
import { updateQuestion } from '../../services/apiForum';
import ReplySection from './ReplySection';
import AnswersList from './AnswersList';

const ForumPost = ({ post }) => {
  const queryClient = useQueryClient();

  if (!post || !post.id) return null;

  const handlePostLike = async () => {
    try {
      const newLikes = (post.likes || 0) + 1;
      await updateQuestion(post.id, { likes: newLikes });
      queryClient.invalidateQueries(['forumPosts']);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Format the created_at time as desired
  const formattedTime = new Date(post.created_at).toLocaleString();

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {/* Header with title on left and time on right */}
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold">{post.title || "Untitled Post"}</h3>
        <span className="text-sm text-gray-500">{formattedTime}</span>
      </div>
      <p className="text-gray-700 mt-2">{post.description || "No description available."}</p>
      <small className="text-gray-500 block mt-1">Category: {post.category}</small>
      <p className="text-gray-500 text-sm">By: {post.is_anonymous ? 'Anonymous' : post.name}</p>
      <div className="flex items-center mt-2">
        <button onClick={handlePostLike} className="text-2xl">
          😊
        </button>
        <span className="ml-2 text-lg">{post.likes || 0}</span>
      </div>
      {/* Reply section for replying to the question */}
      <ReplySection questionId={post.id} />
      {/* List of replies */}
      <AnswersList questionId={post.id} />
    </div>
  );
};

ForumPost.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    name: PropTypes.string,
    is_anonymous: PropTypes.bool,
    likes: PropTypes.number,
    created_at: PropTypes.string,
  }).isRequired,
};

export default ForumPost;
