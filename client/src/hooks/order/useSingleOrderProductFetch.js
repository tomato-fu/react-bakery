import { useState, useEffect } from "react";
import axios from "axios";
export const useSingleOrderProductFetch = (orderID) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = () => {
      try {
        setLoading(true);
        setError(false);
        axios
          .get("http://localhost:3004/orders/getOrderProduct", {
            params: {
              orderID: orderID,
            },
          })
          .then((res) => setState(res.data[0]))
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
