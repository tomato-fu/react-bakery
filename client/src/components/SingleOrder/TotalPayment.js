import { Avatar, Card, CardContent, Grid, Typography } from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";

import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
const TotalPayment = ({ amount }) => (
  <Card>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textPrimary" gutterBottom variant="h6">
            Total Payment Amount
          </Typography>
          <Typography color="textSecondary" variant="h3">
            ${amount}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: indigo[600],
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

export default TotalPayment;
