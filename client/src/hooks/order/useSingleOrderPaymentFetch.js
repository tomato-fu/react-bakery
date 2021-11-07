import { useState, useEffect } from "react";
import axios from "axios";
export const useSingleOrderPaymentFetch = (orderID) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPayment = () => {
      try {
        setLoading(true);
        setError(false);
        axios
          .get("http://localhost:3004/orders/getOrderPayment", {
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
    fetchPayment();
  }, []);

  return { state, loading, error, setState };
};
