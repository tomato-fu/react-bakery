import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";
import { useTotalCustomerQuantityFetch } from "src/hooks/customer/useTotalCustomerQuantityFetch";
const TotalCustomers = (props) => {
  const { state, loading, error } = useTotalCustomerQuantityFetch();

  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              TOTAL CUSTOMERS
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {state.quantity}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: green[600],
                height: 56,
                width: 56,
              }}
            >
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
        {/* <Box
        sx={{
          alignItems: "center",
          display: "flex",
          pt: 2,
        }}
      >
        <ArrowUpwardIcon sx={{ color: green[700] }} />
        <Typography
          variant="body2"
          sx={{
            color: green[700],
            mr: 1,
          }}
        >
          16%
        </Typography>
        <Typography color="textSecondary" variant="caption">
          Since last month
        </Typography>
      </Box> */}
      </CardContent>
    </Card>
  );
};
export default TotalCustomers;
