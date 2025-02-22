import supabase from "./supabase";

// ========================== STORE OPERATIONS ========================== //

// Function to fetch all store items
export async function fetchStoreItems() {
  const { data, error } = await supabase.from("Store").select("*");

  if (error) {
    throw new Error(`Error fetching store items: ${error.message}`);
  }
  return data;
}

// Function to add a new store item
export async function addStoreItem(itemData) {
  const { data, error } = await supabase.from("Store").insert([itemData]);

  if (error) {
    throw new Error(`Error adding store item: ${error.message}`);
  }
  return data;
}

// Function to delete a store item by ID
export async function deleteStoreItem(id) {
  const { data, error } = await supabase.from("Store").delete().eq("id", id);

  if (error) {
    throw new Error(`Error deleting store item: ${error.message}`);
  }
  return data;
}

// Function to update a store item by ID
export async function updateStoreItem(id, updatedData) {
  const { data, error } = await supabase
    .from("Store")
    .update(updatedData)
    .eq("id", id);

  if (error) {
    throw new Error(`Error updating store item: ${error.message}`);
  }
  return data;
}

// Function to fetch a single store item by ID
export async function fetchStoreItemById(id) {
  const { data, error } = await supabase
    .from("Store")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Error fetching store item: ${error.message}`);
  }
  return data;
}

// Function to fetch store items by category
export async function fetchStoreItemsByCategory(category) {
  const { data, error } = await supabase
    .from("Store")
    .select("*")
    .eq("category", category);

  if (error) {
    throw new Error(`Error fetching items by category: ${error.message}`);
  }
  return data;
}

// Function to fetch store items under a specific price
export async function fetchStoreItemsUnderPrice(price) {
  const { data, error } = await supabase
    .from("Store")
    .select("*")
    .lte("price", price);

  if (error) {
    throw new Error(`Error fetching items under price: ${error.message}`);
  }
  return data;
}

// Function to fetch featured store items
export async function fetchFeaturedStoreItems() {
  const { data, error } = await supabase
    .from("Store")
    .select("*")
    .eq("is_featured", true);

  if (error) {
    throw new Error(`Error fetching featured items: ${error.message}`);
  }
  return data;
}

// ========================== HELPER FUNCTIONS ========================== //

// Function to restock items below a certain stock level
export async function restockLowInventory(threshold, restockAmount) {
  const { data, error } = await supabase
    .from("Store")
    .update({ stock: restockAmount })
    .lte("stock", threshold);

  if (error) {
    throw new Error(`Error restocking items: ${error.message}`);
  }
  return data;
}

// Function to apply a discount to a category
export async function applyDiscountToCategory(category, discountPercentage) {
  const { data, error } = await supabase
    .from("Store")
    .update({
      price: supabase.raw(`price * ${(100 - discountPercentage) / 100}`),
    })
    .eq("category", category);

  if (error) {
    throw new Error(`Error applying discount: ${error.message}`);
  }
  return data;
}
