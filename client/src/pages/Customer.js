import { Helmet } from "react-helmet";
import { Box, Container, Grid, Typography, Button } from "@material-ui/core";
import { useParams } from "react-router";
import Comment from "src/components/SingleCustomer/Comment";
import TotalCredit from "src/components/SingleCustomer/TotalCredit";
import TotalOrder from "src/components/SingleCustomer/TotalOrder";
import SingleCustomerHeader from "src/components/SingleCustomer/SingleCustomerHeader";
import FavoriateProduct from "src/components/SingleCustomer/FavoriateProduct";
import CustomerOrdersResult from "src/components/SingleCustomer/CustomerOrdersResult";
import UsedCredit from "src/components/SingleCustomer/UsedCredit";
import { usePointsFetch } from "src/hooks/customer/usePointsFetch";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomerEdit from "src/components/customer/CustomerEdit";
import { useSingleCustomerFetch } from "src/hooks/customer/useSingleCustomerFetch";
const Customer = (props) => {
  const { customerID } = useParams();
  const { state: points, loading, error } = usePointsFetch(customerID);
  const {
    state: customer,
    loading: customerLoading,
    error: customerError,
  } = useSingleCustomerFetch(customerID);
  const [open, setOpen] = useState(false);

  let totalPoints = 0;
  let usedPoints = 0;
  if (Array.from(points).length === 2 && points !== undefined) {
    totalPoints = Array.from(points)[0].total - Array.from(points)[1].total;
    usedPoints = Array.from(points)[1].total;
  } else if (Array.from(points).length === 1 && points !== undefined) {
    totalPoints = Array.from(points)[0].total;
  }

  return (
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
        <CustomerEdit
          customer={customer}
          open={open}
          setOpen={setOpen}
          customerID={customerID}
        />
        <Container
          maxWidth={false}
          style={{ height: "100%" }}
          alignitems="stretch"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: 1,
              marginBottom: 3,
            }}
          >
            <Typography color="textSecondary" gutterBottom variant="h4">
              <Link to="/app/customers" style={{ color: "#424242" }}>
                {" << "}Customers
              </Link>{" "}
              | {customer.CustomerName}
            </Typography>

            <Button
              color="primary"
              variant="contained"
              sx={{ backgroundColor: "#ff9800" }}
              onClick={() => setOpen(true)}
            >
              Edit Customer
            </Button>
          </Box>
          <Grid container spacing={3}>
            <Grid item lg={6} xl={6} md={6} xs={12}>
              <SingleCustomerHeader customer={customer} />
            </Grid>

            <Grid container item lg={6} xl={6} md={6} xs={12} spacing={3}>
              <Grid item md={12} xs={12}>
                <TotalOrder customerID={customerID} />
              </Grid>

              <Grid item md={6} xs={12}>
                <TotalCredit total={totalPoints} />
              </Grid>
              <Grid item md={6} xs={12}>
                <UsedCredit total={usedPoints} />
              </Grid>
            </Grid>

            <Grid item xs={12} md={8} lg={8} xl={8}>
              <FavoriateProduct customerID={customerID} />
            </Grid>

            <Grid item xs={12} md={4} lg={4} xl={4} style={{ height: "518px" }}>
              <Comment text={customer.Comment} />
            </Grid>
          </Grid>

          <Grid item xs={12} md={12} lg={12} xl={12} sx={{ mt: 3 }}>
            <Typography color="textPrimary" gutterBottom variant="h3">
              Related Orders
            </Typography>
            <CustomerOrdersResult customerID={customerID} />
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Customer;
