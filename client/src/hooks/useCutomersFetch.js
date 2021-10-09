import { useState, useEffect } from "react";
import axios from "axios";
export const useCustomersFetch = () => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    const fetchCustomers = () => {
      try {
        setLoading(true);
        setError(false);
        axios
          .get("http://localhost:3004/customers/getCustomers")
          .then((res) => setState(res.data))
          .catch((err) => console.log(err));
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchCustomers();
  }, [update]);

  return { state, loading, error, setState, update, setUpdate };
};
