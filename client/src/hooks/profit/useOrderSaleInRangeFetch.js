import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const defaults = {
  ID: -1,
  orderProfit: 0,
  orderRevenue: 0,
  saleProfit: 0,
  saleRevenue: 0,
};
export const useOrderSaleInRangeFetch = () => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [startDate, setStartDate] = useState("1980-01-01");
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));

  let orders = [];
  let sales = [];
  let result = {};

  useEffect(() => {
    const fetchOrder = () => {
      try {
        setLoading(true);
        setError(false);
        axios
          .get("http://localhost:3004/profits/getOrderInRange", {
            params: {
              startDate: startDate,
              endDate: endDate,
            },
          })
          .then((res) => {
            orders = res.data[0];

            axios
              .get("http://localhost:3004/profits/getSaleInRange", {
                params: {
                  startDate: startDate,
                  endDate: endDate,
                },
              })
              .then((res) => {
                sales = res.data[0];
                Array.from(orders).map((item) => {
                  result[moment(item.DatePlaced).format("YYYY-MM-DD")] = {
                    ...result[moment(item.DatePlaced).format("YYYY-MM-DD")],
                    orderProfit: Math.round(item.profit * 100) / 100,
                    orderRevenue: Math.round(item.revenue * 100) / 100,
                  };
                });
                Array.from(sales).map((item) => {
                  result[moment(item.Date).format("YYYY-MM-DD")] = {
                    ...result[moment(item.Date).format("YYYY-MM-DD")],
                    ID: item.report_id,
                    saleProfit: Math.round(item.profit * 100) / 100,
                    saleRevenue: Math.round(item.revenue * 100) / 100,
                  };
                });

                let finalResult = Object.keys(result).map((key) => {
                  return { date: key, ...result[key] };
                });
                finalResult.forEach((item) => {
                  for (let key in defaults) {
                    item[key] = item[key] || defaults[key];
                  }
                  item["totalRevenue"] =
                    Math.round((item.orderRevenue + item.saleRevenue) * 100) /
                    100;
                  item["totalProfit"] =
                    Math.round((item.orderProfit + item.saleProfit) * 100) /
                    100;
                });

                console.log(finalResult);
                setState(finalResult);
                setLoading(false);
              });
          })
          .catch((err) => console.log(err));
      } catch (error) {
        setError(true);
      }
    };
    fetchOrder();
  }, [startDate, endDate]);

  return { state, loading, error, setState, setStartDate, setEndDate };
};
