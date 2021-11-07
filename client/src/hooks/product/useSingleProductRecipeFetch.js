import { useState, useEffect } from "react";
import axios from "axios";

export const useSingleProductRecipeFetch = (productID) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProductRecipe = () => {
      try {
        setLoading(true);
        setError(false);
        axios
          .get("http://localhost:3004/products/getRecipe", {
            params: {
              productID: productID,
            },
          })
          .then((res) => setState(res.data[0]))
          .catch((err) => console.log(err));
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchProductRecipe();
  }, []);

  return { state, loading, error, setState };
};
