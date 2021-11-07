import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
} from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import MoneyIcon from "@material-ui/icons/Money";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { red } from "@material-ui/core/colors";
import { green } from "@material-ui/core/colors";
import { orange } from "@material-ui/core/colors";
import { blue } from "@material-ui/core/colors";
import { grey } from "@mui/material/colors";
import { Database, LifeBuoy } from "react-feather";
import { useOrderInfoFetch } from "src/hooks/profit/useOrderInfoFetch";
import { useSaleInfoFetch } from "src/hooks/profit/useSaleInfoFetch";
import { useSaleLastMonthFetch } from "src/hooks/profit/useSaleLastMonthFetch";
import { useOrderLastMonthFetch } from "src/hooks/profit/useOrderLastMonthFetch";
import ProfitItem from "./ProfitItem";
const ProfitOverview = () => {
  const {
    state: order,
    loading: orderLoading,
    error: orderError,
  } = useOrderInfoFetch();
  const {
    state: sale,
    loading: saleLoading,
    error: saleError,
  } = useSaleInfoFetch();
  const {
    state: orderLast,
    loading: orderLastLoading,
    error: orderLastError,
  } = useOrderLastMonthFetch();
  const {
    state: saleLast,
    loading: saleLastLoading,
    error: saleLastError,
  } = useSaleLastMonthFetch();

  const orderRevenuePercent =
    Math.floor(
      ((order.revenue - orderLast.revenue) / orderLast.revenue - 1) * 100
    ) || 0;
  const saleRevenuePercent =
    Math.floor(
      ((sale.revenue - saleLast.revenue) / saleLast.revenue - 1) * 100
    ) || 0;
  const orderProfitPercent =
    Math.floor(
      ((order.profit - orderLast.profit) / orderLast.profit - 1) * 100
    ) || 0;
  const saleProfitPercent =
    Math.floor(((sale.profit - saleLast.profit) / saleLast.profit - 1) * 100) ||
    0;

  const totalRevenuePercent =
    Math.floor(
      ((order.revenue + sale.revenue - orderLast.revenue - saleLast.revenue) /
        (orderLast.revenue + saleLast.revenue) -
        1) *
        100
    ) || 0;

  const totalProfitPercent =
    Math.floor(
      ((order.profit + sale.profit - orderLast.profit - saleLast.profit) /
        (orderLast.profit + saleLast.profit) -
        1) *
        100
    ) || 0;

  const data = [
    {
      name: "Total Order Revenue",
      amount: order.revenue,
      percent: orderRevenuePercent === Infinity ? 0 : orderRevenuePercent,
      color: blue[600],
      icon: <AttachMoneyIcon />,
    },
    {
      name: "Total Order Profit",
      amount: order.profit,
      percent: orderProfitPercent === Infinity ? 0 : orderProfitPercent,
      color: blue[600],
      icon: <AttachMoneyIcon />,
    },
    {
      name: "Total In-store Revenue",
      amount: sale.revenue,
      percent: saleRevenuePercent === Infinity ? 0 : saleRevenuePercent,
      color: green[600],
      icon: <LifeBuoy />,
    },
    {
      name: "Total In-store Profit",
      amount: sale.profit,
      percent: saleProfitPercent === Infinity ? 0 : saleProfitPercent,
      color: green[600],
      icon: <LifeBuoy />,
    },
    {
      name: "Total Revenue",
      amount: order.revenue + sale.revenue,
      percent: totalRevenuePercent === Infinity ? 0 : totalRevenuePercent,
      color: orange[600],
      icon: <Database />,
    },
    {
      name: "Total Profit",
      amount: order.profit + sale.profit,
      percent: totalProfitPercent === Infinity ? 0 : totalProfitPercent,
      color: orange[600],
      icon: <Database />,
    },
  ];

  return (
    <Box sx={{ mt: 3 }}>
      <Typography color="textPrimary" gutterBottom variant="h3">
        Profit Summary
      </Typography>

      <Grid container spacing={3}>
        {data.map((item, index) => (
          <ProfitItem key={index} item={item} />
        ))}

        {/* <Grid item lg={4} xl={4} md={6} xs={12}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Grid
                container
                spacing={3}
                sx={{ justifyContent: "space-between" }}
              >
                <Grid item>
                  <Typography color="textSecondary" gutterBottom variant="h6">
                    Total Order Revenue
                  </Typography>
                  <Typography color="textPrimary" variant="h3">
                    ${order.revenue}
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar
                    sx={{
                      backgroundColor: blue[600],
                      height: 56,
                      width: 56,
                    }}
                  >
                    <AttachMoneyIcon />
                  </Avatar>
                </Grid>
              </Grid>
              <Box
                sx={{
                  pt: 2,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ArrowDownwardIcon sx={{ color: red[900] }} />
                <Typography
                  sx={{
                    color: red[900],
                    mr: 1,
                  }}
                  variant="body2"
                >
                  12%
                </Typography>
                <Typography color="textSecondary" variant="caption">
                  Since last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={4} xl={4} md={6} xs={12}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Grid
                container
                spacing={3}
                sx={{ justifyContent: "space-between" }}
              >
                <Grid item>
                  <Typography color="textSecondary" gutterBottom variant="h6">
                    Total Order Profit
                  </Typography>
                  <Typography color="textPrimary" variant="h3">
                    ${order.profit}
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar
                    sx={{
                      backgroundColor: blue[700],
                      height: 56,
                      width: 56,
                    }}
                  >
                    <AttachMoneyIcon />
                  </Avatar>
                </Grid>
              </Grid>

              {Math.sign(orderProfitPercent) < 0 && (
                <Box
                  sx={{
                    pt: 2,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ArrowDownwardIcon sx={{ color: red[900] }} />

                  <Typography
                    sx={{
                      color: red[900],
                      mr: 1,
                    }}
                    variant="body2"
                  >
                    {orderProfitPercent}%
                  </Typography>
                  <Typography color="textSecondary" variant="caption">
                    Since last month
                  </Typography>
                </Box>
              )}

              {Math.sign(orderRevenuePercent) === 0 && (
                <Box
                  sx={{
                    pt: 2,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <HorizontalRuleIcon sx={{ color: grey[700] }} />

                  <Typography
                    sx={{
                      color: grey[700],
                      mr: 1,
                    }}
                    variant="body2"
                  >
                    {orderProfitPercent}%
                  </Typography>
                  <Typography color="textSecondary" variant="caption">
                    Since last month
                  </Typography>
                </Box>
              )}

              {Math.sign(orderRevenuePercent) < 0 && (
                <Box
                  sx={{
                    pt: 2,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ArrowDownwardIcon sx={{ color: green[700] }} />

                  <Typography
                    sx={{
                      color: green[700],
                      mr: 1,
                    }}
                    variant="body2"
                  >
                    {orderProfitPercent}%
                  </Typography>
                  <Typography color="textSecondary" variant="caption">
                    Since last month
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={4} xl={4} md={6} xs={12}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Grid
                container
                spacing={3}
                sx={{ justifyContent: "space-between" }}
              >
                <Grid item>
                  <Typography color="textSecondary" gutterBottom variant="h6">
                    Total In-store Revenue
                  </Typography>
                  <Typography color="textPrimary" variant="h3">
                    ${sale.revenue}
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar
                    sx={{
                      backgroundColor: green[600],
                      height: 56,
                      width: 56,
                    }}
                  >
                    <LifeBuoy />
                  </Avatar>
                </Grid>
              </Grid>
              <Box
                sx={{
                  pt: 2,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ArrowUpwardIcon sx={{ color: green[700] }} />
                <Typography
                  sx={{
                    color: green[700],
                    mr: 1,
                  }}
                  variant="body2"
                >
                  8%
                </Typography>
                <Typography color="textSecondary" variant="caption">
                  Since last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={4} xl={4} md={6} xs={12}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Grid
                container
                spacing={3}
                sx={{ justifyContent: "space-between" }}
              >
                <Grid item>
                  <Typography color="textSecondary" gutterBottom variant="h6">
                    Total In-store Profit
                  </Typography>
                  <Typography color="textPrimary" variant="h3">
                    ${sale.profit}
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar
                    sx={{
                      backgroundColor: green[600],
                      height: 56,
                      width: 56,
                    }}
                  >
                    <LifeBuoy />
                  </Avatar>
                </Grid>
              </Grid>
              <Box
                sx={{
                  pt: 2,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ArrowUpwardIcon sx={{ color: green[700] }} />
                <Typography
                  sx={{
                    color: green[700],
                    mr: 1,
                  }}
                  variant="body2"
                >
                  8%
                </Typography>
                <Typography color="textSecondary" variant="caption">
                  Since last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={4} xl={4} md={6} xs={12}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Grid
                container
                spacing={3}
                sx={{ justifyContent: "space-between" }}
              >
                <Grid item>
                  <Typography color="textSecondary" gutterBottom variant="h6">
                    Total Revenue
                  </Typography>
                  <Typography color="textPrimary" variant="h3">
                    ${order.revenue + sale.revenue}
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar
                    sx={{
                      backgroundColor: orange[600],
                      height: 56,
                      width: 56,
                    }}
                  >
                    <Database />
                  </Avatar>
                </Grid>
              </Grid>
              <Box
                sx={{
                  pt: 2,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ArrowDownwardIcon sx={{ color: red[900] }} />
                <Typography
                  sx={{
                    color: red[900],
                    mr: 1,
                  }}
                  variant="body2"
                >
                  4%
                </Typography>
                <Typography color="textSecondary" variant="caption">
                  Since last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={4} xl={4} md={6} xs={12}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Grid
                container
                spacing={3}
                sx={{ justifyContent: "space-between" }}
              >
                <Grid item>
                  <Typography color="textSecondary" gutterBottom variant="h6">
                    Total Profit
                  </Typography>
                  <Typography color="textPrimary" variant="h3">
                    ${order.profit + sale.profit}
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar
                    sx={{
                      backgroundColor: orange[600],
                      height: 56,
                      width: 56,
                    }}
                  >
                    <Database />
                  </Avatar>
                </Grid>
              </Grid>
              <Box
                sx={{
                  pt: 2,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ArrowDownwardIcon sx={{ color: red[900] }} />
                <Typography
                  sx={{
                    color: red[900],
                    mr: 1,
                  }}
                  variant="body2"
                >
                  4%
                </Typography>
                <Typography color="textSecondary" variant="caption">
                  Since last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default ProfitOverview;
