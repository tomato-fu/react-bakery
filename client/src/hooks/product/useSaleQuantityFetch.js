import { useState, useEffect } from "react";
import axios from "axios";
export const useSaleQuantityFetch = (productID) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchQuantity = () => {
      try {
        setLoading(true);
        setError(false);
        axios
          .get("http://localhost:3004/products/getSaleQuantity", {
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
    fetchQuantity();
  }, []);

  return { state, loading, error, setState };
};
