import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  colors,
  Divider,
  FormControl,
  MenuItem,
  Select,
  useTheme,
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import moment from "moment";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSalesLast14Fetch } from "src/hooks/sale/useSalesLast14Fetch";

const Sales = (props) => {
  const { state, loading, error } = useSalesLast14Fetch();
  const sold = state.map((item) => item.quantity);
  const trash = state.map((item) => item.trash);
  const date = state.map((item) =>
    moment(item.Date).format("YYYY-MM-DD").slice(5)
  );

  const theme = useTheme();
  const [days, setDays] = useState(7);
  const handleChange = (event) => {
    setDays(event.target.value);
  };
  const data = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        data: sold,
        label: "Quantity Sold",
      },
      {
        backgroundColor: colors.grey[200],
        data: trash,
        label: "Quantity Trashed",
      },
    ],
    labels: date,
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0,
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider,
          },
        },
      ],
    },
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  return (
    <Card {...props}>
      <CardHeader
        action={
          // <Button endIcon={<ArrowDropDownIcon />} size="small" variant="text">
          //   Last 7 days
          // </Button>
          <FormControl>
            <Select
              sx={{ color: "#5664d2" }}
              value={days}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={7}>Last 7 Days</MenuItem>
              <MenuItem value={14}>Last 14 Days</MenuItem>
            </Select>
          </FormControl>
        }
        title="Latest Sales"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: "relative",
          }}
        >
          <Bar
            data={{
              ...data,
              datasets: data.datasets.map((item) => ({
                ...item,
                data: item.data.slice(-days),
              })),
              labels: data.labels.slice(-days),
            }}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          href={`/app/sales`}
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};

export default Sales;
