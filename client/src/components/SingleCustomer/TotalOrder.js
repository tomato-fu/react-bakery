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
import { useNumOrderFetch } from "src/hooks/customer/useNumOrderFetch";
const TotalOrder = ({ customerID }) => {
  const theme = useTheme();
  const { state: num, loading, error } = useNumOrderFetch(customerID);
  const { numOrder } = num;
  const data = {
    datasets: [
      {
        data: [numOrder],
        backgroundColor: [colors.green[600]],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white,
      },
    ],
    labels: ["Online"],
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
      color: colors.red[500],
    },
  ];

  return (
    <Card>
      <CardHeader title="Orders Summary" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 165,
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
