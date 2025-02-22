import { useQuery } from "@tanstack/react-query";
import { fetchStoreItems } from "../../services/apiStore";

export function useStore() {
  const {
    isLoading,
    data: storeItems,
    isError,
  } = useQuery({
    queryKey: ["store"], // Unique key to cache store data
    queryFn: fetchStoreItems, // Function to fetch store items
  });

  if (isError) {
    console.log("Error fetching store items");
  }

  return { isLoading, storeItems, isError };
}
