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
import { red } from "@material-ui/core/colors";
import { green } from "@material-ui/core/colors";
import { orange } from "@material-ui/core/colors";
import { blue } from "@material-ui/core/colors";
import { Database, LifeBuoy } from "react-feather";

const ProfitOverview = () => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography color="textPrimary" gutterBottom variant="h3">
        Profit Summary
      </Typography>
      <Grid container spacing={3}>
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
                    Total Order Revenue
                  </Typography>
                  <Typography color="textPrimary" variant="h3">
                    $24,000
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
                    $14,000
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
                    Total In-store Revenue
                  </Typography>
                  <Typography color="textPrimary" variant="h3">
                    $8,000
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
                    $5,000
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
                    $32,000
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
                    $19,000
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
      </Grid>
    </Box>
  );
};

export default ProfitOverview;
