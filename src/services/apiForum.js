import supabase from "./supabase";

// ========================== FORUM OPERATIONS ========================== //

// Function to fetch all forum posts
export async function fetchForumPosts() {
  const { data, error } = await supabase.from("Forum").select("*");

  if (error) {
    throw new Error(`Error fetching forum posts: ${error.message}`);
  }
  return data;
}

// Function to add a new forum post (with name and message)
export async function addForumPost({ name, title, content, topic }) {
  const { data, error } = await supabase.from("Forum").insert([
    {
      name, // User's name (no auth)
      title, // Post title
      content, // Post content
      topic, // Optional: topic/category
      created_at: new Date(), // Timestamp
    },
  ]);

  if (error) {
    throw new Error(`Error adding forum post: ${error.message}`);
  }
  return data;
}

// Function to delete a forum post by ID
export async function deleteForumPost(id) {
  const { data, error } = await supabase.from("Forum").delete().eq("id", id);

  if (error) {
    throw new Error(`Error deleting forum post: ${error.message}`);
  }
  return data;
}

// Function to update a forum post by ID
export async function updateForumPost(id, updatedData) {
  const { data, error } = await supabase
    .from("Forum")
    .update(updatedData)
    .eq("id", id);

  if (error) {
    throw new Error(`Error updating forum post: ${error.message}`);
  }
  return data;
}

// Function to fetch a single forum post by ID
export async function fetchForumPostById(id) {
  const { data, error } = await supabase
    .from("Forum")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Error fetching forum post: ${error.message}`);
  }
  return data;
}

// Function to fetch forum posts by topic/category
export async function fetchForumPostsByTopic(topic) {
  const { data, error } = await supabase
    .from("Forum")
    .select("*")
    .eq("topic", topic);

  if (error) {
    throw new Error(`Error fetching posts by topic: ${error.message}`);
  }
  return data;
}

// Function to fetch popular forum posts (based on likes or views)
export async function fetchPopularForumPosts() {
  const { data, error } = await supabase
    .from("Forum")
    .select("*")
    .order("likes", { ascending: false })
    .limit(10);

  if (error) {
    throw new Error(`Error fetching popular posts: ${error.message}`);
  }
  return data;
}

// ========================== ANSWER OPERATIONS ========================== //

// Function to add an answer to a forum post (with name and message)
export async function addForumAnswer({ post_id, name, content }) {
  const { data, error } = await supabase.from("ForumAnswers").insert([
    {
      post_id, // Link to forum post
      name, // User's name (no auth)
      content, // Answer content
      created_at: new Date(), // Timestamp
    },
  ]);

  if (error) {
    throw new Error(`Error adding answer: ${error.message}`);
  }
  return data;
}

// Function to fetch answers for a specific forum post
export async function fetchForumAnswersByPostId(postId) {
  const { data, error } = await supabase
    .from("ForumAnswers")
    .select("*")
    .eq("post_id", postId);

  if (error) {
    throw new Error(`Error fetching answers: ${error.message}`);
  }
  return data;
}

// ========================== HELPER FUNCTIONS ========================== //

// Function to upvote a forum post
export async function upvoteForumPost(id) {
  const { data, error } = await supabase
    .from("Forum")
    .update({ likes: supabase.raw("likes + 1") })
    .eq("id", id);

  if (error) {
    throw new Error(`Error upvoting post: ${error.message}`);
  }
  return data;
}

// Function to mark an answer as accepted
export async function markAnswerAsAccepted(answerId) {
  const { data, error } = await supabase
    .from("ForumAnswers")
    .update({ is_accepted: true })
    .eq("id", answerId);

  if (error) {
    throw new Error(`Error marking answer as accepted: ${error.message}`);
  }
  return data;
}
