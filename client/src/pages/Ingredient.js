import { Helmet } from "react-helmet";
import { Box, Container, Grid, Typography } from "@material-ui/core";

import Comment from "src/components/SingleIngredient/Comment";
import SingleIngredientHeader from "src/components/SingleIngredient/SingleIngredientHeader";
import IngredientProducts from "src/components/SingleIngredient/IngredientProducts";
const Ingredient = () => (
  <>
    <Helmet>
      <title>Ingredient | Bakery</title>
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
            <SingleIngredientHeader />
          </Grid>
          <Grid item lg={6} xl={6} md={6} xs={12}>
            <Comment />
          </Grid>
          <Grid item lg={12} xl={12} md={12} xs={12}>
            <Typography color="textPrimary" gutterBottom variant="h3">
              Related Products
            </Typography>
            <IngredientProducts />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Ingredient;
