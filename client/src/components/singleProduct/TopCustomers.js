import { Box, Card, CardContent, CardHeader, Divider } from "@material-ui/core";
import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { useTopCustomerFetch } from "src/hooks/product/useTopCustomerFetch";
const TopCustomers = ({ productID }) => {
  const { state: customers, loading, error } = useTopCustomerFetch(productID);

  const names = Array.from(customers).map((item) => item.CustomerName);
  const totals = Array.from(customers).map((item) => item.total);

  const data = {
    labels: names,
    datasets: [
      {
        axis: "y",
        label: "Number Of Order",
        data: totals,
        fill: false,
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
            min: 0,
          },
        },
      ],
    },
  };

  return (
    <Card>
      <CardHeader title="Top Customers" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: "relative",
          }}
        >
          <HorizontalBar data={data} options={options} type="bar" />
        </Box>
      </CardContent>
    </Card>
  );
};

export default TopCustomers;
