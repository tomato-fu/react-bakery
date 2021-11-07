import { Avatar, Card, CardContent, Grid, Typography } from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";

import SellIcon from "@mui/icons-material/Sell";
import { useOrderQuantityFetch } from "src/hooks/product/useOrderQuantityFetch";
import { useSaleQuantityFetch } from "src/hooks/product/useSaleQuantityFetch";

const TotalSales = ({ productID }) => {
  const {
    state: orderTotal,
    loading: orderLoading,
    error: orderError,
  } = useOrderQuantityFetch(productID);

  const {
    state: saleTotal,
    loading: saleLoading,
    error: saleError,
  } = useSaleQuantityFetch(productID);
  let numOrder = 0;
  let numSale = 0;
  if (orderTotal !== undefined)
    numOrder = orderTotal.total === undefined ? 0 : orderTotal.total;
  if (saleTotal !== undefined)
    numSale = saleTotal.total === undefined ? 0 : saleTotal.total;
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textPrimary" gutterBottom variant="h6">
              Total Sales
            </Typography>
            <Typography color="textSecondary" variant="h3">
              {numOrder + numSale}
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
              <SellIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TotalSales;
