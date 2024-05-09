import axios from "axios";
import { useCallback } from "react";
const baseUrl = `${import.meta.env.VITE_API_URL}/products`;

const useProducts = () => {
  const getAllProducts = useCallback(async () => {
    try {
      const response = await axios.get(`${baseUrl}`);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Er was een fout bij het ophalen van de producten:", error);
      return [];
    }
  }, []);

  const getProductById = useCallback(async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(
        `Er was een fout bij het ophalen van het product met id: ${id}`,
        error
      );
      return null;
    }
  }, []);

  return { getAllProducts, getProductById };
};

export default useProducts;
