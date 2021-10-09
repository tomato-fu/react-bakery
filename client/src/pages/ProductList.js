import { Helmet } from "react-helmet";
import { Box, Container, Grid, Pagination } from "@material-ui/core";
import ProductListToolbar from "src/components/product/ProductListToolbar";
import ProductCard from "src/components/product//ProductCard";
import { useProductsFetch } from "src/hooks/useProductsFetch";
import React, { useState, useEffect } from "react";
import { Alert } from "@material-ui/core";

const ProductList = () => {
  const {
    state: products,
    loading,
    error,
    setState: setProducts,
    update,
    setUpdate,
  } = useProductsFetch();

  const [showDelete, setShowDelete] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowDelete(false);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [products]);
  return (
    <>
      <Helmet>
        <title>Products | Bakery</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          {showDelete && <Alert severity="success">Delete successfully!</Alert>}
          <ProductListToolbar
            products={products}
            setProducts={setProducts}
            update={update}
            setUpdate={setUpdate}
          />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item key={product.ID} lg={4} md={6} xs={12}>
                  <ProductCard
                    product={product}
                    update={update}
                    setUpdate={setUpdate}
                    setShowDelete={setShowDelete}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 3,
            }}
          >
            <Pagination color="primary" count={3} size="small" />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProductList;
