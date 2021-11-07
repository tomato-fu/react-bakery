import * as React from "react";

import Typography from "@material-ui/core/Typography";
import {
  CardContent,
  Card,
  Grid,
  Avatar,
  Divider,
  CardHeader,
} from "@material-ui/core";

import { blue } from "@material-ui/core/colors";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";
import CallToActionIcon from "@mui/icons-material/CallToAction";
import AlarmOnIcon from "@material-ui/icons/AlarmOn";
import AddAlarmIcon from "@material-ui/icons/AddAlarm";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DoneIcon from "@material-ui/icons/Done";

import moment from "moment";
const SingleOrderHeader = ({ order }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Order Info" />
      <Divider />
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: "space-between", p: 1, mb: 1 }}
        >
          <Grid item>
            <Typography color="textPrimary" gutterBottom variant="h3">
              Customer:
            </Typography>
            <Typography color="textSecondary" variant="h5">
              {order.CustomerName}
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
              <AccountCircleIcon />
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
              Placed Date:
            </Typography>
            <Typography color="textSecondary" variant="h5">
              {moment(order.DatePlaced).format("YYYY-MM-DD")}
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
              <AddAlarmIcon />
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
              Pickup Time:
            </Typography>
            <Typography color="textSecondary" variant="h5">
              {moment(order.PickupTime).format("YYYY-MM-DD HH:mm")}
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
              <AlarmOnIcon />
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
              Location:
            </Typography>
            <Typography color="textSecondary" variant="h5">
              {order.location}
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
              <LocationOnIcon />
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
              Fulfilled:
            </Typography>
            <Typography color="#f05a46" variant="h4">
              {order.Fulfilled === 0 ? "No" : "Yes"}
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
              <DoneIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SingleOrderHeader;
