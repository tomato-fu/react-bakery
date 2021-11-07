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
import PhoneIcon from "@material-ui/icons/Phone";
import TabletIcon from "@material-ui/icons/Tablet";
import StoreIcon from "@mui/icons-material/Store";
import { useTotalSalesQuantityFetch } from "src/hooks/sale/useTotalSalesQuantityFetch";
import { useTotalOrdersQuantityFetch } from "src/hooks/order/useTotalOrdersQuantityFetch";
const SalesDistribution = (props) => {
  const theme = useTheme();
  const {
    state: order,
    loading: orderLoading,
    error: orderError,
  } = useTotalOrdersQuantityFetch();
  const {
    state: sale,
    loading: saleLoading,
    error: saleError,
  } = useTotalSalesQuantityFetch();
  const numOrder = order.ordersQuantity || 0;
  const numSale = sale.salesQuantity || 0;
  const orderPercent = Math.floor((numOrder / (numOrder + numSale)) * 100);
  const salePercent = 100 - orderPercent;
  const data = {
    datasets: [
      {
        data: [numOrder, numSale],
        backgroundColor: [colors.indigo[500], colors.red[600]],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white,
      },
    ],
    labels: ["Online", "In-Store"],
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
      value: orderPercent || 0,
      icon: LaptopMacIcon,
      color: colors.indigo[500],
    },
    {
      title: "In-Store",
      value: salePercent || 0,
      icon: StoreIcon,
      color: colors.red[600],
    },
  ];

  return (
    <Card {...props}>
      <CardHeader title="Sales Distribution" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
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
                {value}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SalesDistribution;
