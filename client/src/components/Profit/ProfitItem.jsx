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
import React, { useState } from "react";

const ProfitItem = ({ item }) => {
  const { name, amount, percent, color, icon } = item;
  return (
    <Grid item lg={4} xl={4} md={6} xs={12}>
      <Card sx={{ height: "100%" }}>
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="h6">
                {name}
              </Typography>
              <Typography color="textPrimary" variant="h3">
                ${amount}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: color,
                  height: 56,
                  width: 56,
                }}
              >
                {icon}
              </Avatar>
            </Grid>
          </Grid>

          {Math.sign(percent) < 0 && (
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
                {percent}%
              </Typography>
              <Typography color="textSecondary" variant="caption">
                Since last month
              </Typography>
            </Box>
          )}

          {Math.sign(percent) === 0 && (
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
                {percent}%
              </Typography>
              <Typography color="textSecondary" variant="caption">
                Since last month
              </Typography>
            </Box>
          )}

          {Math.sign(percent) > 0 && (
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
                {percent}%
              </Typography>
              <Typography color="textSecondary" variant="caption">
                Since last month
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProfitItem;
