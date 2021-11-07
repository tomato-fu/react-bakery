import { useState, useEffect } from "react";
import axios from "axios";
export const useTotalProductQuantityFetch = () => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = () => {
      try {
        setLoading(true);
        setError(false);
        axios
          .get("http://localhost:3004/products/getProductQuantity")
          .then((res) => {
            setState(res.data[0]);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        setError(true);
      }
    };
    fetchProducts();
  }, []);

  return { state, loading, error, setState };
};
