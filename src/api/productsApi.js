import axiosInstance from "./axiosInstance";

export const fetchProducts = async (searchQuery = "") => {
  try {
    const url = searchQuery ? `/products/search?q=${searchQuery}` : "/products";
    const response = await axiosInstance.get(url);
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
