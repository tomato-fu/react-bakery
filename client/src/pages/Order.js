import { Helmet } from "react-helmet";
import { Box, Container, Grid, Button, Typography } from "@material-ui/core";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import SingleOrderHeader from "src/components/SingleOrder/SingleOrderHeader";
import Payment from "src/components/SingleOrder/Payment";
import TotalPayment from "src/components/SingleOrder/TotalPayment";
import OrderProducts from "src/components/SingleOrder/OrderProducts";
import Comment from "src/components/SingleOrder/Comment";
import { useSingleOrderFetch } from "src/hooks/order/useSingleOrderFetch";
import { useSingleOrderPaymentFetch } from "src/hooks/order/useSingleOrderPaymentFetch";
import { useSingleOrderProductFetch } from "src/hooks/order/useSingleOrderProductFetch";

import OrderEdit from "src/components/order/OrderEdit";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Order = () => {
  const { orderID } = useParams();

  const [open, setOpen] = useState(false);

  const {
    state: order,
    loading: orderLoading,
    error: orderError,
  } = useSingleOrderFetch(orderID);

  const {
    state: payment,
    loading: paymentLoading,
    error: paymentError,
  } = useSingleOrderPaymentFetch(orderID);

  const {
    state: products,
    loading: productsLoading,
    error: productsError,
  } = useSingleOrderProductFetch(orderID);

  const fulfillOrder = (isFulfill) => {
    axios
      .put("http://localhost:3004/orders/fulfillOrder", {
        orderID: orderID,
        fullFilled: isFulfill,
      })
      .then(() => window.location.reload());
  };

  return (
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
        <OrderEdit
          open={open}
          setOpen={setOpen}
          order={order}
          product={products}
          payment={payment}
          orderID={orderID}
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
              <Link to="/app/orders" style={{ color: "#424242" }}>
                {" << "}Orders
              </Link>{" "}
              | {order.order_id}
            </Typography>
            <Box>
              {order.Fulfilled === 0 ? (
                <Button
                  color="primary"
                  variant="contained"
                  sx={{ marginRight: 3, backgroundColor: "#4caf50" }}
                  onClick={() => fulfillOrder(1)}
                >
                  Fulfill order
                </Button>
              ) : (
                <Button
                  color="primary"
                  variant="contained"
                  sx={{ marginRight: 3, backgroundColor: "#ff5722" }}
                  onClick={() => fulfillOrder(0)}
                >
                  Unfulfill order
                </Button>
              )}

              <Button
                color="primary"
                variant="contained"
                sx={{ backgroundColor: "#ff9800" }}
                onClick={() => setOpen(true)}
              >
                Edit order
              </Button>
            </Box>
          </Box>
          <Grid container spacing={3}>
            <Grid item lg={6} xl={6} md={6} xs={12}>
              <SingleOrderHeader order={order} />
            </Grid>

            <Grid container item lg={6} xl={6} md={6} xs={12} spacing={3}>
              <Grid item md={12} xs={12}>
                <Payment payment={payment} />
              </Grid>

              <Grid item md={12} xs={12}>
                <TotalPayment amount={order.Amount} />
              </Grid>
            </Grid>

            <Grid container item lg={12} xl={12} md={12} xs={12} spacing={3}>
              <Grid item xs={12} md={8} lg={8} xl={8}>
                <OrderProducts products={products} />
              </Grid>

              <Grid item xs={12} md={4} lg={4} xl={4}>
                <Comment text={order.Comment} />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
export default Order;
