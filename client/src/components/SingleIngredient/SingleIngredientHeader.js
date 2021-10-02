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
import EcoIcon from "@material-ui/icons/Eco";
import { blue } from "@material-ui/core/colors";

import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import AlarmOnIcon from "@material-ui/icons/AlarmOn";
import AddAlarmIcon from "@material-ui/icons/AddAlarm";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DoneIcon from "@material-ui/icons/Done";
const SingleIngredientHeader = () => {
  const { ingredientID } = useParams();
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Ingredient Info" />
      <Divider />
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: "space-between", p: 1, mb: 1 }}
        >
          <Grid item>
            <Typography color="textPrimary" gutterBottom variant="h3">
              Ingredient:
            </Typography>
            <Typography color="textSecondary" variant="h5">
              <a href="/app/products/1" style={{ color: "#6b778c" }}>
                Milk
              </a>
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
              <EcoIcon />
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
              Price/KG
            </Typography>
            <Typography color="textSecondary" variant="h5">
              $2.45
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
      </CardContent>
    </Card>
  );
};

export default SingleIngredientHeader;
