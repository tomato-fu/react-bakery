import { useState, useEffect } from "react";
import axios from "axios";
export const useTotalOrdersQuantityFetch = () => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchOrders = () => {
      try {
        setLoading(true);
        setError(false);
        axios
          .get("http://localhost:3004/orders/getTotalOrdersQuantity")
          .then((res) => {
            setState(res.data[0]);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        setError(true);
      }
    };
    fetchOrders();
  }, []);

  return { state, loading, error, setState };
};
