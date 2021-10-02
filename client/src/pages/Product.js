import { Helmet } from "react-helmet";
import { Box, Container, Grid, Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TotalOrder from "src/components/singleProduct/TotalOrder";
import TotalSales from "src/components/singleProduct/TotalSales";
import SingleProductHeader from "src/components/singleProduct/SingleProductHeader";
import TopCustomers from "src/components/singleProduct/TopCustomers";
import Comment from "src/components/singleProduct/Comment";
import ProductOrders from "src/components/singleProduct/ProductOrders";
import ProductIngredients from "src/components/singleProduct/ProductIngredients";

const Product = () => (
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
      <Container
        maxWidth={false}
        style={{ height: "100%" }}
        alignItems="stretch"
      >
        <Grid container spacing={3}>
          <Grid item lg={6} xl={6} md={6} xs={12}>
            <SingleProductHeader />
          </Grid>

          <Grid container item lg={6} xl={6} md={6} xs={12} spacing={3}>
            <Grid item md={12} xs={12}>
              <TotalOrder />
            </Grid>

            <Grid item md={12} xs={12}>
              <TotalSales />
            </Grid>
          </Grid>

          <Grid item xs={12} md={8} lg={8} xl={8}>
            <TopCustomers />
          </Grid>

          <Grid item xs={12} md={4} lg={4} xl={4} style={{ height: "518px" }}>
            <Comment />
          </Grid>
        </Grid>

        <Divider style={{ marginTop: "2rem" }} />

        <Grid container spacing={3} style={{ marginTop: "1rem" }}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Typography color="textPrimary" gutterBottom variant="h3">
              Related Orders
            </Typography>
            <ProductOrders />
          </Grid>

          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Typography color="textPrimary" gutterBottom variant="h3">
              Product Recipe
            </Typography>
            <ProductIngredients />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Product;
