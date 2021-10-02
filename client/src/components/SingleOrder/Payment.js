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
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import LocalPizzaIcon from "@material-ui/icons/LocalPizza";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
const Payment = (props) => {
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [50, 40, 10],
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
    labels: ["Cash", "Wechat", "Points"],
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
      title: "Cash",
      value: 50,
      icon: AttachMoneyIcon,
      color: colors.indigo[500],
    },
    {
      title: "Wechat",
      value: 40,
      icon: AccountBalanceWalletIcon,
      color: colors.orange[600],
    },
    {
      title: "Points",
      value: 10,
      icon: LocalPizzaIcon,
      color: colors.red[500],
    },
  ];

  return (
    <Card {...props}>
      <CardHeader title="Orders Summary" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 170,
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

export default Payment;
