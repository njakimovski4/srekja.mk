// src/features/Forum/AnswerItem.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { updateAnswer } from '../../services/apiForum';
import { useQueryClient } from '@tanstack/react-query';

const AnswerItem = ({ answer, questionId }) => {
  const queryClient = useQueryClient();

  if (!answer) return null;

  const handleLike = async () => {
    try {
      const newLikes = (answer.likes || 0) + 1;
      await updateAnswer(answer.id, { likes: newLikes });
      queryClient.invalidateQueries(['answers', questionId]);
    } catch (error) {
      console.error("Error liking answer:", error);
    }
  };

  return (
    <div className="bg-gray-50 p-3 rounded-md shadow-sm">
      <p className="text-gray-800">{answer.content}</p>
      <div className="flex items-center mt-1">
        <button onClick={handleLike} className="text-2xl">
          ❤️
        </button>
        <span className="ml-2 text-lg">{answer.likes || 0}</span>
        <span className="ml-4 text-sm text-gray-500">
          By: {answer.is_anonymous ? "Anonymous" : answer.name}
        </span>
      </div>
    </div>
  );
};

AnswerItem.propTypes = {
  answer: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    content: PropTypes.string.isRequired,
    likes: PropTypes.number,
    is_anonymous: PropTypes.bool,
    name: PropTypes.string,
  }).isRequired,
  questionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default AnswerItem;
