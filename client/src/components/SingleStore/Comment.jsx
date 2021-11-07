import * as React from "react";

import {
  CardContent,
  Card,
  Divider,
  CardHeader,
  Typography,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
const Comment = ({ text }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <PerfectScrollbar>
        <CardHeader title="In-Store Comment" />
        <Divider />
        <CardContent>
          <Typography color="textSecondary" variant="h3">
            {text || "Null"}
          </Typography>
        </CardContent>
      </PerfectScrollbar>
    </Card>
  );
};

export default Comment;
