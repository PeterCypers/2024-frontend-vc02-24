import axios from "axios";
import { useCallback } from "react";
const baseUrl = `${import.meta.env.VITE_API_URL}/products`;

const useProducts = () => {
  const getAllProducts = useCallback(async () => {
    try {
      const response = await axios.get(`${baseUrl}`); // Aangepast om de response object direct te gebruiken
      return response.data.data; // Moet overeenkomen met het data veld van de response
    } catch (error) {
      console.error("Er was een fout bij het ophalen van de producten:", error);
      return []; // Retourneer een lege lijst in geval van een fout
    }
  }, []);

  const getProductById = useCallback(async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/${id}`);
      return response.data; // Dit zou het directe product object moeten teruggeven
    } catch (error) {
      console.error(
        `Er was een fout bij het ophalen van het product met id: ${id}`,
        error
      );
      return null; // Retourneer null in geval van een fout
    }
  }, []);

  return { getAllProducts, getProductById };
};

export default useProducts;
