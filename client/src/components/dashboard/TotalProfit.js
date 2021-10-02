import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
} from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import { red } from "@mui/material/colors";
const TotalProfit = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h6">
            TOTAL PROFIT
          </Typography>
          <Typography color="textPrimary" variant="h3">
            $23,200
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

      <Box
        sx={{
          pt: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <ArrowDownward sx={{ color: red[900] }} />
        <Typography
          sx={{
            color: red[900],
            mr: 1,
          }}
          variant="body2"
        >
          10%
        </Typography>
        <Typography color="textSecondary" variant="caption">
          Since last month
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default TotalProfit;
