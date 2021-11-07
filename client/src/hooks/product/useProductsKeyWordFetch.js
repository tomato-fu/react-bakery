import { useState, useEffect } from "react";
import axios from "axios";
export const useProductsKeyWordFetch = () => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [update, setUpdate] = useState(false);
  const [keyWord, setKeyWord] = useState("");
  let products = [];
  let orders = [];
  let result = {};
  useEffect(() => {
    const fetchProducts = () => {
      try {
        setLoading(true);
        setError(false);
        axios
          .get("http://localhost:3004/products/getProductsKeyWord", {
            params: {
              keyWord: keyWord,
            },
          })
          .then((res) => {
            products = res.data[0];
            axios
              .get("http://localhost:3004/products/getOrderQuantityKeyWord", {
                params: {
                  keyWord: keyWord,
                },
              })
              .then((res) => {
                orders = res.data[0];

                Array.from(products).map((product) => {
                  result[product.ID] = { ...product, total: 0, isHot: false };
                });

                Array.from(orders).map((order) => {
                  result[order.ID] = {
                    ...result[order.ID],
                    total: order.total,
                  };
                });
                result = Object.values(result);
                result.sort((a, b) => {
                  return b.total - a.total;
                });

                for (
                  let index = 0;
                  index < (result.length >= 3 ? 3 : result.length);
                  index++
                ) {
                  result[index] = {
                    ...result[index],
                    isHot: result[index].total === 0 ? false : true,
                  };
                }
                setState(result);

                setLoading(false);
              })
              .catch((err) => console.log(err));
          });
      } catch (error) {
        setError(true);
      }
    };
    fetchProducts();
  }, [update, keyWord]);

  return {
    state,
    loading,
    error,
    setState,
    update,
    setUpdate,

    setKeyWord,
  };
};
