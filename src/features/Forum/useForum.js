import { useQuery } from "@tanstack/react-query";
import { fetchForumPosts } from "../../services/apiForum";

export function useForum() {
  const {
    isLoading,
    data: forumPosts,
    isError,
  } = useQuery({
    queryKey: ["forum"], // Unique key to cache forum posts
    queryFn: fetchForumPosts, // Function to fetch forum posts
  });

  if (isError) {
    console.log("Error fetching forum posts");
  }

  return { isLoading, forumPosts, isError };
}
