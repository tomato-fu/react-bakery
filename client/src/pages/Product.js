import { Helmet } from "react-helmet";
import { Box, Container, Grid, Divider, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TotalOrder from "src/components/singleProduct/TotalOrder";
import TotalSales from "src/components/singleProduct/TotalSales";
import SingleProductHeader from "src/components/singleProduct/SingleProductHeader";
import TopCustomers from "src/components/singleProduct/TopCustomers";
import Comment from "src/components/singleProduct/Comment";
import ProductOrders from "src/components/singleProduct/ProductOrders";
import ProductIngredients from "src/components/singleProduct/ProductIngredients";
import { useParams } from "react-router";
import { useSingleProductFetch } from "src/hooks/product/useSingleProductFetch";
import ProductEdit from "src/components/product/ProductEdit";
import React, { useState } from "react";
import { Link } from "react-router-dom";
const Product = () => {
  const { productID } = useParams();
  const {
    state: product,
    loading: productLoading,
    error: productError,
  } = useSingleProductFetch(productID);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Helmet>
        <title>Product | Bakery</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <ProductEdit
          product={product}
          open={open}
          setOpen={setOpen}
          productID={productID}
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
              <Link to="/app/products" style={{ color: "#424242" }}>
                {" << "}Products
              </Link>{" "}
              | {product.Name}
            </Typography>

            <Button
              color="primary"
              variant="contained"
              sx={{ backgroundColor: "#ff9800" }}
              onClick={() => setOpen(true)}
            >
              Edit Product
            </Button>
          </Box>
          <Grid container spacing={3}>
            <Grid item lg={6} xl={6} md={6} xs={12}>
              <SingleProductHeader product={product} />
            </Grid>

            <Grid container item lg={6} xl={6} md={6} xs={12} spacing={3}>
              <Grid item md={12} xs={12}>
                <TotalOrder productID={productID} />
              </Grid>

              <Grid item md={12} xs={12}>
                <TotalSales productID={productID} />
              </Grid>
            </Grid>

            <Grid item xs={12} md={8} lg={8} xl={8}>
              <TopCustomers productID={productID} />
            </Grid>

            <Grid item xs={12} md={4} lg={4} xl={4} style={{ height: "518px" }}>
              <Comment text={product.Comment} />
            </Grid>
          </Grid>

          <Divider style={{ marginTop: "2rem" }} />

          <Grid container spacing={3} style={{ marginTop: "1rem" }}>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <Typography color="textPrimary" gutterBottom variant="h3">
                Related Orders
              </Typography>
              <ProductOrders productID={productID} />
            </Grid>

            <Grid item xs={12} md={12} lg={12} xl={12}>
              <Typography color="textPrimary" gutterBottom variant="h3">
                Product Recipe
              </Typography>
              <ProductIngredients productID={productID} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Product;
