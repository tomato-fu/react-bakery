import { useState, useEffect } from "react";
import axios from "axios";
export const useSingleProductFetch = (productID) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = () => {
      try {
        setLoading(true);
        setError(false);
        axios
          .get("http://localhost:3004/products/getProduct", {
            params: {
              productID: productID,
            },
          })
          .then((res) => setState(res.data[0][0]))
          .catch((err) => console.log(err));
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchProduct();
  }, []);

  return { state, loading, error, setState };
};
