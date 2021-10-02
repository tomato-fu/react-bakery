import { Helmet } from "react-helmet";
import { Box, Container, Grid } from "@material-ui/core";
import ProductNumber from "src/components/dashboard/ProductNumber";
import LatestOrders from "src/components/dashboard//LatestOrders";
import LatestProducts from "src/components/dashboard//LatestProducts";
import Sales from "src/components/dashboard//Sales";
import TasksProgress from "src/components/dashboard//TasksProgress";
import TotalCustomers from "src/components/dashboard//TotalCustomers";
import TotalProfit from "src/components/dashboard//TotalProfit";
import TrafficByDevice from "src/components/dashboard//TrafficByDevice";
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
            <TotalCustomers />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TasksProgress />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalProfit sx={{ height: "100%" }} />
          </Grid>
          <Grid item lg={8} md={8} xl={9} xs={12}>
            <Sales />
          </Grid>
          <Grid item lg={4} md={4} xl={3} xs={12}>
            <TrafficByDevice sx={{ height: "100%" }} />
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
