import { useState, useEffect } from "react";
import axios from "axios";
export const useOrdersFetch = () => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    const fetchOrders = () => {
      try {
        setLoading(true);
        setError(false);
        axios
          .get("http://localhost:3004/orders/getOrders")
          .then((res) => setState(res.data[0]))
          .catch((err) => console.log(err));
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchOrders();
  }, [update]);

  return { state, loading, error, setState, update, setUpdate };
};
