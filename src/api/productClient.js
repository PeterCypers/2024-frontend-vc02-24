import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useCallback } from "react";

const useProducts = () => {
  const getAllProducts = useCallback(async () => {
    try {
      const { data } = await axios.get("/");
      return data; // Hier gaan we ervan uit dat de server response een array van producten bevat
    } catch (error) {
      console.error("Er was een fout bij het ophalen van de producten:", error);
      throw error;
    }
  }, []);

  const getProductById = useCallback(async (id) => {
    try {
      const { data } = await axios.get(`/${id}`);
      return data; // Dit zou het product moeten retourneren met het specifieke ID
    } catch (error) {
      console.error(
        `Er was een fout bij het ophalen van het product met id: ${id}`,
        error
      );
      throw error;
    }
  }, []);
  return { getAllProducts, getProductById };
};

export default useProducts;
