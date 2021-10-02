import { Helmet } from "react-helmet";
import { Box, Container, Grid, Typography } from "@material-ui/core";

import Comment from "src/components/SingleCustomer/Comment";
import TotalCredit from "src/components/SingleCustomer/TotalCredit";
import TotalOrder from "src/components/SingleCustomer/TotalOrder";
import SingleCustomerHeader from "src/components/SingleCustomer/SingleCustomerHeader";
import FavoriateProduct from "src/components/SingleCustomer/FavoriateProduct";
import CustomerOrdersResult from "src/components/SingleCustomer/CustomerOrdersResult";
const Customer = () => (
  <>
    <Helmet>
      <title>Customer | Bakery</title>
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
            <SingleCustomerHeader />
          </Grid>

          <Grid container item lg={6} xl={6} md={6} xs={12} spacing={3}>
            <Grid item md={12} xs={12}>
              <TotalOrder />
            </Grid>

            <Grid item md={12} xs={12}>
              <TotalCredit />
            </Grid>
          </Grid>

          <Grid item xs={12} md={8} lg={8} xl={8}>
            <FavoriateProduct />
          </Grid>

          <Grid item xs={12} md={4} lg={4} xl={4} style={{ height: "518px" }}>
            <Comment />
          </Grid>
        </Grid>

        <Grid item xs={12} md={12} lg={12} xl={12} sx={{ mt: 3 }}>
          <Typography color="textPrimary" gutterBottom variant="h3">
            Related Orders
          </Typography>
          <CustomerOrdersResult />
        </Grid>
      </Container>
    </Box>
  </>
);

export default Customer;
