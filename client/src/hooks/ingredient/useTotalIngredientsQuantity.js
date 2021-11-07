import { useState, useEffect } from "react";
import axios from "axios";
export const useTotalIngredientsQuantity = () => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchIngredients = () => {
      try {
        setLoading(true);
        setError(false);
        axios
          .get("http://localhost:3004/ingredients/getIngredientQuantity")
          .then((res) => {
            setState(res.data[0]);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        setError(true);
      }
    };
    fetchIngredients();
  }, []);

  return { state, loading, error, setState };
};
