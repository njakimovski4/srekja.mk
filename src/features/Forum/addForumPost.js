import { supabase } from "./supabase";

/**
 * Inserts a new forum post into the Supabase database.
 * @param {string} title - The title of the forum post.
 * @param {string} description - The post content or question.
 * @param {string} category - The category (e.g., "Funding", "Development").
 * @param {string | null} name - The name of the user (null if anonymous).
 * @param {boolean} is_anonymous - Whether the post is anonymous.
 * @returns {Promise<object>} - The response from Supabase.
 */
export const addForumPost = async (title, description, category, name, is_anonymous) => {
    const { data, error } = await supabase.from("questions").insert([
        {
            title,
            description,
            category,
            name: is_anonymous ? null : name, // If anonymous, store null
            is_anonymous,
            created_at: new Date().toISOString() // Timestamp for sorting
        }
    ]);

    if (error) {
        console.error("Error inserting forum post:", error.message);
        return { success: false, error: error.message };
    }

    console.log("Forum post added:", data);
    return { success: true, data };
};
