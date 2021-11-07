import { Avatar, Card, CardContent, Grid, Typography } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

import LocalPizzaIcon from "@material-ui/icons/LocalPizza";
const UsedCredit = ({ total }) => (
  <Card>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textPrimary" gutterBottom variant="h6">
            Used Points
          </Typography>
          <Typography color="textSecondary" variant="h3">
            {total}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: red[600],
              height: 56,
              width: 56,
            }}
          >
            <LocalPizzaIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default UsedCredit;
