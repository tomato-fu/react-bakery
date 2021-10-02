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

import { useParams } from "react-router";

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
const SingleOrderHeader = () => {
  const { orderID } = useParams();
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
              Josh Wang
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
              09/12/2021
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
              09/13/2021 15:31
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
              Uptown Rd 12A
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
              No
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
