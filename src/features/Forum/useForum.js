import { useQuery } from "@tanstack/react-query";
import { fetchForumPosts } from "../../services/apiForum";


export function useForum() {
    const { isLoading, data: forumPosts, isError } = useQuery({
        queryKey: ["forum"],
        queryFn: fetchForumPosts,
    });

    if (isError) console.log("Error fetching forum posts");

    return { isLoading, forumPosts, isError };
}
