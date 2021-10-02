import { HorizontalBar } from "react-chartjs-2";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  colors,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useState } from "react";

const FavoriateProduct = () => {
  const data = {
    labels: ["A", "B", "C", "D", "E", "F", "G"],
    datasets: [
      {
        axis: "y",
        label: "Favoriate Product",
        data: [5, 6, 5, 4, 7, 11, 4],
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
