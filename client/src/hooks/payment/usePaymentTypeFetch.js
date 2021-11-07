import { useState, useEffect } from "react";
import axios from "axios";
export const usePaymentTypeFetch = () => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPaymentTypes = () => {
      try {
        setLoading(true);
        setError(false);
        axios
          .get("http://localhost:3004/payments/getPaymentTypes")
          .then((res) => setState(res.data))
          .catch((err) => console.log(err));
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchPaymentTypes();
  }, []);

  return { state, loading, error, setState };
};
