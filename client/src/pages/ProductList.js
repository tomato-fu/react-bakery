import { Helmet } from "react-helmet";
import { Box, Container, Grid, Pagination } from "@material-ui/core";
import ProductListToolbar from "src/components/product/ProductListToolbar";
import ProductCard from "src/components/product//ProductCard";
import products from "src/__mocks__/products";
import React, { useState } from "react";

const ProductList = () => {
  const [Data, setData] = useState(products);

  const removeProduct = (id) => {
    setData(Data.filter((item) => item.id !== id));
  };

  const pinProduct = (id) => {
    const array = Data;
    const pos = array.map((item) => item.id).indexOf(id);
    const tem = array[pos];
    array.splice(pos, 1);
    array.splice(0, 0, tem);
    setData([...array]);
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
          <ProductListToolbar />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {Data.map((product) => (
                <Grid item key={product.id} lg={4} md={6} xs={12}>
                  <ProductCard
                    product={product}
                    removeProduct={removeProduct}
                    pinProduct={pinProduct}
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
