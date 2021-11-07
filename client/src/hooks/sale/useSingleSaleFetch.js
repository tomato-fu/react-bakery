import { useState, useEffect } from "react";
import axios from "axios";
export const useSingleSaleFetch = (saleID) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  let sale = {};
  let result = {};
  let profit = {};
  useEffect(() => {
    const fetchSale = () => {
      try {
        setLoading(true);
        setError(false);
        axios
          .get("http://localhost:3004/sales/getSaleNoProfit", {
            params: {
              saleID: saleID,
            },
          })
          .then((res) => {
            sale = { ...res.data[0], profit: 0, revenue: 0, lost: 0 };
            axios
              .get("http://localhost:3004/sales/getSale", {
                params: {
                  saleID: saleID,
                },
              })
              .then((res) => {
                profit = res.data[0][0];

                if (profit === undefined) {
                  setState(sale);
                } else {
                  result[sale.ID] = {
                    ...sale,
                    profit: profit.profit,
                    revenue: profit.revenue,
                    lost: profit.lost,
                  };
                  setState(result[sale.ID]);
                }
                setLoading(false);
              })
              .catch((err) => console.log(err));
          });
      } catch (error) {
        setError(true);
      }
    };
    fetchSale();
  }, []);

  return { state, loading, error, setState };
};
