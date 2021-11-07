import { Helmet } from "react-helmet";
import { Box, Container, Grid, Button, Typography } from "@material-ui/core";
import { useParams } from "react-router";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import StoreEdit from "src/components/store/StoreEdit";
import StoreProducts from "src/components/SingleStore/StoreProducts";
import Comment from "src/components/SingleStore/Comment";
import SingleStoreHeader from "src/components/SingleStore/SingleStoreHeader";
import { useSingleSaleFetch } from "src/hooks/sale/useSingleSaleFetch";
import { useSingleSaleProductFetch } from "src/hooks/sale/useSingleSaleProductFetch";
import moment from "moment";
const SingleStore = () => {
  const { saleID } = useParams();
  const [open, setOpen] = useState(false);
  const { state: sale, loading, error } = useSingleSaleFetch(saleID);
  const {
    state: products,
    loading: productLoading,
    error: productError,
  } = useSingleSaleProductFetch(saleID);

  return (
    <>
      <Helmet>
        <title>In-store sale | Bakery</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <StoreEdit
          sale={sale}
          open={open}
          TotalProducts={products}
          setOpen={setOpen}
          saleID={saleID}
        />
        <Container
          maxWidth={false}
          style={{ height: "100%" }}
          alignitem="stretch"
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
              <Link to="/app/sales" style={{ color: "#424242" }}>
                {" << "}Sales Reports
              </Link>{" "}
              | {moment(sale.Date).format("YYYY-MM-DD")}
            </Typography>
            <Button
              color="primary"
              variant="contained"
              sx={{ backgroundColor: "#ff9800" }}
              onClick={() => setOpen(true)}
            >
              Edit Sale Report
            </Button>
          </Box>
          <Grid container spacing={3}>
            <Grid item lg={7} xl={7} md={7} xs={12}>
              <SingleStoreHeader sale={sale} />
            </Grid>

            <Grid item lg={5} xl={5} md={5} xs={12} style={{ height: "530px" }}>
              <Comment text={sale.Comment} />
            </Grid>

            <Grid item xs={12} md={12} lg={12} xl={12}>
              <StoreProducts products={products} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default SingleStore;
