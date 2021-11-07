import { Box, Card, CardContent, CardHeader, Divider } from "@material-ui/core";
import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { useFavoFetch } from "src/hooks/customer/useFavoFetch";
const FavoriateProduct = ({ customerID }) => {
  const { state: products, loading, error } = useFavoFetch(customerID);

  const names = Array.from(products).map((item) => item.name);
  const totals = Array.from(products).map((item) => item.total);

  const data = {
    labels: names,
    datasets: [
      {
        axis: "y",
        label: "Favoriate Product",
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
      <CardHeader title="Top Products" />
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

export default FavoriateProduct;
