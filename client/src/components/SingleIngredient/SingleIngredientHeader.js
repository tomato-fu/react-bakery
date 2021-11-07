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

import EcoIcon from "@material-ui/icons/Eco";
import { blue } from "@material-ui/core/colors";

import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
const SingleIngredientHeader = ({ ingredient }) => {
  const { Name, PricePerKG } = ingredient;
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
                {Name}
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
              {`$${PricePerKG}`}
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
