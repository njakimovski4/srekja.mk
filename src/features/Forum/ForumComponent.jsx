// src/features/Forum/ForumComponent.jsx
import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchForumPosts } from '../../services/apiForum';
import NewPostForm from './NewPostForm';
import ForumPost from './ForumPost';

const ForumComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch posts from Supabase
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ['forumPosts'],
    queryFn: fetchForumPosts,
    staleTime: 60000, // Cache posts for 60 seconds
  });

  // Compute distinct categories from posts
  const categories = useMemo(() => {
    if (!posts || posts.length === 0) return [];
    return Array.from(new Set(posts.map(post => post.category)));
  }, [posts]);

  // Filter posts based on the selected category
  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    return selectedCategory === "All"
      ? posts
      : posts.filter(post => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  // Sort posts by creation time (newest first)
  const sortedPosts = useMemo(() => {
    if (!filteredPosts) return [];
    return [...filteredPosts].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  }, [filteredPosts]);

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4">
      {/* New Post Form */}
      <NewPostForm />

      {/* Category Filter Dropdown */}
      <div className="flex justify-end mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="All">All Categories</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Loading & Error States */}
      {isLoading && (
        <p className="text-gray-500 text-center">Loading posts...</p>
      )}
      {isError && (
        <p className="text-red-500 text-center">Error loading posts.</p>
      )}

      {/* Render Sorted Posts */}
      <div className="space-y-6">
        {sortedPosts && sortedPosts.length > 0 ? (
          sortedPosts.map(
            (post) =>
              post && post.id && <ForumPost key={post.id} post={post} />
          )
        ) : (
          <p className="text-gray-500 text-center">
            No posts available for this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default ForumComponent;
