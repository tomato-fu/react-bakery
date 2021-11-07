import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import CakeIcon from "@mui/icons-material/Cake";
import { blue } from "@material-ui/core/colors";
import { green } from "@material-ui/core/colors";
import { useTotalProductQuantityFetch } from "src/hooks/product/useTotalProductQuantityFetch";
const ProductNumber = (props) => {
  const { state, loading, error } = useTotalProductQuantityFetch();
  console.log(state);
  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              PRODUCTS NUMBER
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {state.quantity}
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
              <CakeIcon />
            </Avatar>
          </Grid>
        </Grid>
        {/* <Box
        sx={{
          pt: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <ArrowUpward sx={{ color: green[700] }} />
        <Typography
          sx={{
            color: green[700],
            mr: 1,
          }}
          variant="body2"
        >
          3
        </Typography>
        <Typography color="textSecondary" variant="caption">
          Since last month
        </Typography>
      </Box> */}
      </CardContent>
    </Card>
  );
};

export default ProductNumber;
