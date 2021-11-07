import { useState, useEffect } from "react";
import axios from "axios";
export const useSingleIngredientFetch = (ingredientID) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchIngredient = () => {
      try {
        setLoading(true);
        setError(false);
        axios
          .get("http://localhost:3004/ingredients/getIngredient", {
            params: {
              ingredientID: ingredientID,
            },
          })
          .then((res) => setState(res.data[0][0]))
          .catch((err) => console.log(err));
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchIngredient();
  }, []);

  return { state, loading, error, setState };
};
