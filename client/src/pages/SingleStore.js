import { Helmet } from "react-helmet";
import { Box, Container, Grid } from "@material-ui/core";

import StoreProducts from "src/components/SingleStore/StoreProducts";
import Comment from "src/components/SingleStore/Comment";
import SingleStoreHeader from "src/components/SingleStore/SingleStoreHeader";
const SingleStore = () => (
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
      <Container
        maxWidth={false}
        style={{ height: "100%" }}
        alignItems="stretch"
      >
        <Grid container spacing={3}>
          <Grid item lg={7} xl={7} md={7} xs={12}>
            <SingleStoreHeader />
          </Grid>

          <Grid item lg={5} xl={5} md={5} xs={12} style={{ height: "530px" }}>
            <Comment />
          </Grid>

          <Grid item xs={12} md={12} lg={12} xl={12}>
            <StoreProducts />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default SingleStore;
