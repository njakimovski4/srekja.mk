// src/features/Forum/AnswersList.jsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { fetchAnswers } from '../../services/apiForum';
import AnswerItem from './AnswerItem';

const AnswersList = ({ questionId }) => {
  const { isLoading, data: answers, isError } = useQuery({
    queryKey: ['answers', questionId],
    queryFn: () => fetchAnswers(questionId),
  });

  const [showAll, setShowAll] = useState(false);

  if (isLoading) return <p className="text-gray-500">Loading replies...</p>;
  if (isError) return <p className="text-red-500">Error loading replies.</p>;
  if (!answers || answers.length === 0) return null; // No replies; render nothing

  // Sort answers by likes (descending)
  const sortedAnswers = [...answers].sort((a, b) => (b.likes || 0) - (a.likes || 0));

  // Top (most liked) reply
  const topAnswer = sortedAnswers[0];
  const otherAnswers = sortedAnswers.slice(1);

  return (
    <div className="mt-5">
      <div className="bg-white shadow rounded-lg p-4">
        <AnswerItem answer={topAnswer} questionId={questionId} />
      </div>
      {otherAnswers.length > 0 && (
        <div className="mt-2">
          {!showAll ? (
            <button
              onClick={() => setShowAll(true)}
              className="text-blue-500 hover:text-blue-700 transition duration-300"
            >
              View More Replies ({otherAnswers.length})
            </button>
          ) : (
            <div className="space-y-3">
              {otherAnswers.map((answer) => (
                <AnswerItem key={answer.id} answer={answer} questionId={questionId} />
              ))}
              <button
                onClick={() => setShowAll(false)}
                className="text-blue-500 hover:text-blue-700 transition duration-300"
              >
                Show Less
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

AnswersList.propTypes = {
  questionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default AnswersList;
