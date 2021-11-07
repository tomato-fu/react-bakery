import { useState, useEffect } from "react";
import axios from "axios";
export const useSingleCustomerFetch = (customerID) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCustomer = () => {
      try {
        setLoading(true);
        setError(false);
        axios
          .get("http://localhost:3004/customers/getCustomer", {
            params: {
              customerID: customerID,
            },
          })
          .then((res) => setState(res.data[0][0]))
          .catch((err) => console.log(err));
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchCustomer();
  }, []);

  return { state, loading, error, setState };
};
