import { useState, useEffect } from "react";
import axios from "axios";
export const useNumOrderFetch = (customerID) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchNumOrders = () => {
      try {
        setLoading(true);
        setError(false);
        axios
          .get("http://localhost:3004/customers/getNumOrder", {
            params: {
              customerID: customerID,
            },
          })
          .then((res) => setState(res.data[0]))
          .catch((err) => console.log(err));
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchNumOrders();
  }, []);

  return { state, loading, error, setState };
};
