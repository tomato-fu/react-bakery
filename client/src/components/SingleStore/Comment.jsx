import * as React from "react";

import {
  CardContent,
  Card,
  Divider,
  CardHeader,
  Typography,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
const Comment = () => {
  return (
    <Card sx={{ height: "100%" }}>
      <PerfectScrollbar>
        <CardHeader title="Customer Comment" />
        <Divider />
        <CardContent>
          <Typography color="textSecondary" variant="h3">
            Today is a good day!Today is a good day!Today is a good day!Today is
            a good day!Today is a good day!Today is a good day!Today is a good
            day!Today is a good day!Today is a good day!Today is a good
            day!Today is a good day!Today is a good day!Today is a good
            day!Today is a good day!Today is a good day!Today is a good
            day!Today is a good day!Today is a good day!Today is a good
            day!Today is a good day!Today is a good day!Today is a good
            day!Today is a good day!
          </Typography>
        </CardContent>
      </PerfectScrollbar>
    </Card>
  );
};

export default Comment;
