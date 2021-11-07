import { useState, useEffect } from "react";
import axios from "axios";
export const useTotalSalesQuantityFetch = () => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSales = () => {
      try {
        setLoading(true);
        setError(false);
        axios
          .get("http://localhost:3004/sales/getTotalSalesQuantity")
          .then((res) => setState(res.data[0]))
          .catch((err) => console.log(err));
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchSales();
  }, []);

  return { state, loading, error, setState };
};
