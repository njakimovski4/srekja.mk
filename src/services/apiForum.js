import supabase  from "./supabase"
/**
 * 1. Fetch all forum posts (questions)
 *
 * This function retrieves all posts from the "questions" table,
 * ordering them by "created_at" in descending order (newest first).
 *
 * To change the sort order or add filters, modify the .order() or .select() below.
 */
export const fetchForumPosts = async () => {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .order("created_at", { ascending: true }); // Change "created_at" or order here if needed
  if (error) throw error;
  return data;
};

/**
 * 2. Add a new question (forum post)
 *
 * Pass an object with keys matching your database columns:
 * - title, description, category, name, is_anonymous, and optionally created_at.
 *
 * Change what is inserted by modifying the object you pass into this function.
 */
export const addQuestion = async (questionData) => {
  const { data, error } = await supabase
    .from("questions")
    .insert([questionData]); // You can adjust the array structure if you want to insert multiple posts at once.
  if (error) throw error;
  return data;
};

/**
 * 3. Fetch answers for a specific question
 *
 * Retrieves all answers for the given question ID.
 * You can change the order or add filters by modifying the query.
 */
export async function fetchAnswers(questionId) {
  try {
    console.log(`Fetching answers for question ID: ${questionId}`);
    const { data, error } = await supabase
      .from('answers')
      .select('*')
      .eq('question_id', questionId);

    if (error) {
      console.error('Error fetching answers:', error);
      throw new Error(error.message);
    }

    console.log('Fetched answers:', data);
    return data || [];
  } catch (err) {
    console.error('Fetch failed:', err);
    throw err;
  }
}

/**
 * 4. Add an answer to a question
 *
 * Pass an object with keys:
 * - question_id, content, name, is_anonymous, and optionally created_at.
 *
 * Modify the object structure if your schema changes.
 */
export const addAnswer = async (answerData) => {
  const { data, error } = await supabase
    .from("answers")
    .insert([answerData]);
  if (error) throw error;
  return data;
};

/* ===================================================================== */
/*            Optional: Update and Delete Functions                    */
/* ===================================================================== */

/**
 * 5. Update a question
 *
 * Provide the question ID and an object with the fields to update.
 * Change this function if you want to include additional validation or logging.
 */
export const updateQuestion = async (id, updatedFields) => {
  const { data, error } = await supabase
    .from("questions")
    .update(updatedFields)
    .eq("id", id);
  if (error) throw error;
  return data;
};

/**
 * 6. Delete a question
 *
 * Delete the question by its ID.
 */
export const deleteQuestion = async (id) => {
  const { data, error } = await supabase
    .from("questions")
    .delete()
    .eq("id", id);
  if (error) throw error;
  return data;
};

/**
 * 7. Update an answer
 *
 * Provide the answer ID and an object with the fields to update.
 */
export const updateAnswer = async (id, updatedFields) => {
  const { data, error } = await supabase
    .from("answers")
    .update(updatedFields)
    .eq("id", id);
  if (error) throw error;
  return data;
};

/**
 * 8. Delete an answer
 *
 * Delete an answer by its ID.
 */
export const deleteAnswer = async (id) => {
  const { data, error } = await supabase
    .from("answers")
    .delete()
    .eq("id", id);
  if (error) throw error;
  return data;
};

