import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";
import CallToActionIcon from "@mui/icons-material/CallToAction";
import * as React from "react";

const SingleProductHeader = ({ product }) => {
  const { Name, Price, FoodCost, TimeCost } = product;
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Product Info" />
      <Divider />
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: "space-between", p: 1, mb: 1 }}
        >
          <Grid item>
            <Typography color="textPrimary" gutterBottom variant="h3">
              Name:
            </Typography>
            <Typography color="textSecondary" variant="h5">
              {Name}
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
              <BreakfastDiningIcon />
            </Avatar>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={3}
          sx={{ justifyContent: "space-between", p: 1, mb: 1 }}
        >
          <Grid item>
            <Typography color="textPrimary" gutterBottom variant="h3">
              Price:
            </Typography>
            <Typography color="textSecondary" variant="h5">
              ${Price}
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

        <Grid
          container
          spacing={3}
          sx={{ justifyContent: "space-between", p: 1, mb: 1 }}
        >
          <Grid item>
            <Typography color="textPrimary" gutterBottom variant="h3">
              Food Cost:
            </Typography>
            <Typography color="textSecondary" variant="h5">
              ${FoodCost}
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
              <CallToActionIcon />
            </Avatar>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={3}
          sx={{ justifyContent: "space-between", p: 1, mb: 1 }}
        >
          <Grid item>
            <Typography color="textPrimary" gutterBottom variant="h3">
              Time Cost:
            </Typography>
            <Typography color="textSecondary" variant="h5">
              {TimeCost} mintues
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
              <AccessAlarmIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SingleProductHeader;
