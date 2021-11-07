import { useState, useEffect } from "react";
import axios from "axios";

export const useSingleIngredientProductsFetch = (ingredientID) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = () => {
      try {
        setLoading(true);
        setError(false);
        axios
          .get("http://localhost:3004/ingredients/getRelatedProducts", {
            params: {
              ingredientID: ingredientID,
            },
          })
          .then((res) => setState(res.data[0]))
          .catch((err) => console.log(err));
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchProducts();
  }, []);

  return { state, loading, error, setState };
};
