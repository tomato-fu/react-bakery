import { useState, useEffect } from "react";
import axios from "axios";
export const useCustomersKeyWordFetch = () => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [update, setUpdate] = useState(false);
  const [keyWord, setKeyWord] = useState("");
  useEffect(() => {
    const fetchCustomers = () => {
      try {
        setLoading(true);
        setError(false);
        axios
          .get("http://localhost:3004/customers/getCustomersKeyWord", {
            params: {
              keyWord: keyWord,
            },
          })
          .then((res) => setState(res.data[0]))
          .catch((err) => console.log(err));
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchCustomers();
  }, [update, keyWord]);

  return {
    state,
    loading,
    error,
    setState,
    update,
    setUpdate,
    keyWord,
    setKeyWord,
  };
};
