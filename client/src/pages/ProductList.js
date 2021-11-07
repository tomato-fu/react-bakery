import { Helmet } from "react-helmet";
import { Box, Container, Grid, Pagination } from "@material-ui/core";
import ProductListToolbar from "src/components/product/ProductListToolbar";
import ProductCard from "src/components/product//ProductCard";
import { useProductsKeyWordFetch } from "src/hooks/product/useProductsKeyWordFetch";
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
    setKeyWord,
  } = useProductsKeyWordFetch();

  const [showDelete, setShowDelete] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowDelete(false);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [products]);

  const item_per_page = 6;
  const [page, setPage] = useState(1);
  const count = Math.ceil(products.length / item_per_page);
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
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
            setKeyWord={setKeyWord}
          />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {Array.from(products)
                .slice(
                  (page - 1) * item_per_page,
                  (page - 1) * item_per_page + item_per_page
                )
                .map((product) => (
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
            <Pagination
              color="primary"
              count={count}
              page={page}
              onChange={handlePageChange}
              size="small"
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProductList;
