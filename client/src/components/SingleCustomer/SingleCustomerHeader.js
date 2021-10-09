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
import moment from "moment";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { blue } from "@material-ui/core/colors";
import PhoneIcon from "@material-ui/icons/Phone";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { useSingleCustomerFetch } from "src/hooks/useSingleCustomerFetch";
const SingleCustomerHeader = (customerID) => {
  const {
    state: customer,
    loading,
    error,
  } = useSingleCustomerFetch(customerID);

  const {
    CustomerName,
    WeChatID,
    addressOne,
    addressTwo,
    city,
    joinDate,
    phoneNumber,
    zip,
    comment,
  } = customer;
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Customer Info" />
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
              {CustomerName}
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
              Wechat:
            </Typography>
            <Typography color="textSecondary" variant="h5">
              {WeChatID}
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
              <ChatBubbleIcon />
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
              {`${addressOne}, ${addressTwo}, ${city}, ${zip}`}
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
              Phone:
            </Typography>
            <Typography color="textSecondary" variant="h5">
              {phoneNumber}
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
              <PhoneIcon />
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
              Join Date:
            </Typography>
            <Typography color="textSecondary" variant="h5">
              {moment(joinDate).format("MM/DD/YYYY")}
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
              <CalendarTodayIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SingleCustomerHeader;
