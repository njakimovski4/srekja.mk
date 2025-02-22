// src/features/Forum/NewPostForm.jsx
import React, { useState } from 'react';
import { addQuestion } from '../../services/apiForum';
import { useQueryClient } from '@tanstack/react-query';

const NewPostForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // Default category is "General"
  const [category, setCategory] = useState("General");
  const [name, setName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const queryClient = useQueryClient();

  // Predefined topics for the category dropdown
  const topics = ["General", "Legal", "Funding", "Marketing", "Business", "Design", "Development"];
  topics.sort;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      description,
      category,
      name: isAnonymous ? null : name,
      is_anonymous: isAnonymous,
      created_at: new Date().toISOString(),
      likes: 0,
    };
    try {
      await addQuestion(newPost);
      queryClient.invalidateQueries(['forumPosts']);
      setTitle("");
      setDescription("");
      setCategory("General");
      setName("");
      setIsAnonymous(false);
    } catch (error) {
      console.error("Error adding post", error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="What's on your mind?"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {/* Category dropdown menu */}
        <div className="relative mt-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="appearance-none w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            {topics.map((topic, index) => (
              <option key={index} value={topic}>
                {topic}
              </option>
            ))}
          </select>
          {/* Dropdown arrow icon */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
              <path d="M5.516 7.548l4.484 4.484 4.484-4.484L16 8.548l-6 6-6-6z" />
            </svg>
          </div>
        </div>
        <div className="flex items-center mt-2">
          <input
            type="text"
            placeholder="Your Name"
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isAnonymous}
          />
          <label className="ml-2 flex items-center">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={() => setIsAnonymous(!isAnonymous)}
              className="mr-1"
            />
            Post Anonymously
          </label>
        </div>
        <button
          type="submit"
          className="mt-3 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default NewPostForm;
