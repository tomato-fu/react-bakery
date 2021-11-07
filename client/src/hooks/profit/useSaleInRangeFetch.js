import { useState, useEffect } from "react";
import axios from "axios";
export const useSaleInRangeFetch = ({ startDate, endDate }) => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSale = () => {
      try {
        setLoading(true);
        setError(false);
        axios
          .get("http://localhost:3004/profits/getSaleInRange", {
            params: {
              startDate: startDate,
              endDate: endDate,
            },
          })
          .then((res) => setState(res.data[0]))
          .catch((err) => console.log(err));
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchSale();
  }, []);

  return { state, loading, error, setState };
};
