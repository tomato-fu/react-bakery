import { Doughnut } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  useTheme,
} from "@material-ui/core";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import StoreIcon from "@material-ui/icons/Store";
import { useOrderQuantityFetch } from "src/hooks/product/useOrderQuantityFetch";
import { useSaleQuantityFetch } from "src/hooks/product/useSaleQuantityFetch";

const TotalOrder = ({ productID }) => {
  const theme = useTheme();
  const {
    state: orderTotal,
    loading: orderLoading,
    error: orderError,
  } = useOrderQuantityFetch(productID);

  const {
    state: saleTotal,
    loading: saleLoading,
    error: saleError,
  } = useSaleQuantityFetch(productID);
  let numOrder = 0;
  let numSale = 0;
  if (orderTotal !== undefined)
    numOrder = orderTotal.total === undefined ? 0 : orderTotal.total;
  if (saleTotal !== undefined)
    numSale = saleTotal.total === undefined ? 0 : saleTotal.total;
  const data = {
    datasets: [
      {
        data: [numOrder, numSale],
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
          colors.orange[600],
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white,
      },
    ],
    labels: ["Online", "In-store"],
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
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

  const devices = [
    {
      title: "Online",
      value: numOrder,
      icon: LaptopMacIcon,
      color: colors.indigo[500],
    },
    {
      title: "In-store",
      value: numSale,
      icon: StoreIcon,
      color: colors.red[600],
    },
  ];

  return (
    <Card>
      <CardHeader title="Product Summary" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 140,
            position: "relative",
          }}
        >
          <Doughnut data={data} options={options} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
        >
          {devices.map(({ color, icon: Icon, title, value }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: "center",
              }}
            >
              <Icon color="action" />
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h2">
                {value}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TotalOrder;
