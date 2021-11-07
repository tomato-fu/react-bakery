import { useState, useEffect } from "react";
import axios from "axios";

export const useSalesFetch = () => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [update, setUpdate] = useState(false);
  const [startDate, setStartDate] = useState("1980-01-01");
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  let sales = [];
  let result = {};
  let profits = [];
  useEffect(() => {
    const fetchSales = () => {
      try {
        setLoading(true);
        setError(false);
        axios
          .get("http://localhost:3004/sales/getSales", {
            params: {
              startDate: startDate,
              endDate: endDate,
            },
          })
          .then((res) => {
            sales = res.data[0];

            axios
              .get("http://localhost:3004/profits/getSaleInRange", {
                params: {
                  startDate: startDate,
                  endDate: endDate,
                },
              })
              .then((res) => {
                profits = res.data[0];
                Array.from(sales).map((sale) => {
                  result[sale.ID] = { ...sale, revenue: 0, profit: 0 };
                });

                Array.from(profits).map((profit) => {
                  result[profit.report_id] = {
                    ...result[profit.report_id],
                    revenue: profit.revenue,
                    profit: profit.profit,
                  };
                });
                result = Object.values(result);
                setState(result);
                setLoading(false);
              })
              .catch((err) => console.log(err));
          });
      } catch (error) {
        setError(true);
      }
    };
    fetchSales();
  }, [update, startDate, endDate]);

  return {
    state,
    loading,
    error,
    setState,
    update,
    setUpdate,
    setStartDate,
    setEndDate,
  };
};
