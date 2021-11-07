import { useState, useEffect } from "react";
import axios from "axios";
export const useTotalCustomerQuantityFetch = () => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCustomers = () => {
      try {
        setLoading(true);
        setError(false);
        axios
          .get("http://localhost:3004/customers/getCustomersQuantity")
          .then((res) => {
            setState(res.data[0]);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        setError(true);
      }
    };
    fetchCustomers();
  }, []);

  return { state, loading, error, setState };
};
