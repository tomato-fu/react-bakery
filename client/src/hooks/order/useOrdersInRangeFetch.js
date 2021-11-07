import { useState, useEffect } from "react";
import axios from "axios";

export const useOrdersInRangeFetch = ({ startDate, endDate }) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [update, setUpdate] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let isMounted = true;
    const fetchOrders = () => {
      try {
        setLoading(true);
        setError(false);
        axios
          .get("http://localhost:3004/orders/getOrdersByRange", {
            params: {
              startDate: startDate,
              endDate: endDate,
              keyWord: searchTerm,
            },
          })
          .then((res) => setState(res.data[0]))
          .catch((err) => console.log(err));
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    if (isMounted) fetchOrders();
    return () => {
      isMounted = false;
    };
  }, [update, searchTerm]);

  return {
    state,
    loading,
    error,
    setState,
    searchTerm,
    setSearchTerm,
    update,
    setUpdate,
  };
};
