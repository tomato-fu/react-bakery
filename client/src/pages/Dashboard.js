import { Box, Container, Grid } from "@material-ui/core";
import { Helmet } from "react-helmet";
import CurrentOrders from "src/components/dashboard//CurrentOrders";
import LatestOrders from "src/components/dashboard//LatestOrders";
import Sales from "src/components/dashboard//Sales";
import TotalCustomers from "src/components/dashboard//TotalCustomers";
import ProductNumber from "src/components/dashboard/ProductNumber";
import SalesDistribution from "src/components/dashboard/SalesDistribution";
import TotalIngredients from "src/components/dashboard/TotalIngredients";
import orders from "src/__mocks__/orders";

const Dashboard = () => (
  <>
    <Helmet>
      <title>Overview | Bakery</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 3,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <ProductNumber />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalIngredients sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalCustomers />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <CurrentOrders />
          </Grid>
          <Grid item lg={8} md={8} xl={9} xs={12}>
            <Sales />
          </Grid>
          <Grid item lg={4} md={4} xl={3} xs={12}>
            <SalesDistribution sx={{ height: "100%" }} />
          </Grid>

          <Grid item lg={12} md={12} xl={12} xs={12}>
            <LatestOrders orders={orders} sx={{ height: "100%" }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Dashboard;
