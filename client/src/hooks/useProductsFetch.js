import { useState, useEffect } from "react";
import axios from "axios";
export const useProductsFetch = () => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    const fetchProducts = () => {
      try {
        setLoading(true);
        setError(false);
        axios
          .get("http://localhost:3004/products/getProducts")
          .then((res) => setState(res.data))
          .catch((err) => console.log(err));
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchProducts();
  }, [update]);

  return { state, loading, error, setState, update, setUpdate };
};
