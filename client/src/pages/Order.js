import { Helmet } from "react-helmet";
import { Box, Container, Grid } from "@material-ui/core";

import SingleOrderHeader from "src/components/SingleOrder/SingleOrderHeader";
import Payment from "src/components/SingleOrder/Payment";
import TotalPayment from "src/components/SingleOrder/TotalPayment";
import OrderProducts from "src/components/SingleOrder/OrderProducts";
import Comment from "src/components/SingleOrder/Comment";
const Order = () => (
  <>
    <Helmet>
      <title>Order | Bakery</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 3,
      }}
    >
      <Container
        maxWidth={false}
        style={{ height: "100%" }}
        alignItems="stretch"
      >
        <Grid container spacing={3}>
          <Grid item lg={6} xl={6} md={6} xs={12}>
            <SingleOrderHeader />
          </Grid>

          <Grid container item lg={6} xl={6} md={6} xs={12} spacing={3}>
            <Grid item md={12} xs={12}>
              <Payment />
            </Grid>

            <Grid item md={12} xs={12}>
              <TotalPayment />
            </Grid>
          </Grid>

          <Grid container item lg={12} xl={12} md={12} xs={12} spacing={3}>
            <Grid item xs={12} md={8} lg={8} xl={8}>
              <OrderProducts />
            </Grid>

            <Grid item xs={12} md={4} lg={4} xl={4} style={{ height: "490px" }}>
              <Comment />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Order;
