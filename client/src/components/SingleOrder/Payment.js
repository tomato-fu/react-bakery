import {
  Box,
  Card,
  CardContent,
  CardHeader,
  colors,
  Divider,
  Typography,
  useTheme,
} from "@material-ui/core";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import LocalPizzaIcon from "@material-ui/icons/LocalPizza";
import { Doughnut } from "react-chartjs-2";

const Payment = ({ payment }) => {
  const amounts = Array.from(payment).map((item) => item.Amount);
  const types = Array.from(payment).map((item) => item.Type);

  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: amounts,
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
    labels: types,
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

  const showcases = Array.from(payment).map((item) => {
    if (item.Type === "Cash")
      return { ...item, icon: AttachMoneyIcon, color: colors.indigo[500] };
    if (item.Type === "WeChat")
      return {
        ...item,
        icon: AccountBalanceWalletIcon,
        color: colors.orange[500],
      };
    if (item.Type === "Reward Points")
      return { ...item, icon: LocalPizzaIcon, color: colors.red[500] };
  });

  return (
    <Card>
      <CardHeader title="Orders Summary" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 250,
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
          {showcases.map(({ color, icon: Icon, Type, Amount }) => (
            <Box
              key={Type}
              sx={{
                p: 1,
                textAlign: "center",
              }}
            >
              <Icon color="action" />
              <Typography color="textPrimary" variant="body1">
                {Type}
              </Typography>
              <Typography style={{ color }} variant="h2">
                {Amount}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Payment;
