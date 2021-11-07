import { Helmet } from "react-helmet";
import { Box, Container, Grid, Typography, Button } from "@material-ui/core";
import { useParams } from "react-router";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Comment from "src/components/SingleIngredient/Comment";
import SingleIngredientHeader from "src/components/SingleIngredient/SingleIngredientHeader";
import { useSingleIngredientFetch } from "src/hooks/ingredient/useSingleIngredientFetch";
import IngredientProducts from "src/components/SingleIngredient/IngredientProducts";
import IngredientEdit from "src/components/ingredient/IngredientEdit";
const Ingredient = () => {
  const { ingredientID } = useParams();
  const {
    state: ingredient,
    loading,
    error,
  } = useSingleIngredientFetch(ingredientID);
  const [open, setOpen] = useState(false);

  return (
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
        <IngredientEdit
          ingredient={ingredient}
          open={open}
          setOpen={setOpen}
          ingredientID={ingredientID}
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
              <Link to="/app/ingredients" style={{ color: "#424242" }}>
                {" << "}Ingredients
              </Link>{" "}
              | {ingredient.Name}
            </Typography>

            <Button
              color="primary"
              variant="contained"
              sx={{ backgroundColor: "#ff9800" }}
              onClick={() => setOpen(true)}
            >
              Edit Ingredient
            </Button>
          </Box>
          <Grid container spacing={3}>
            <Grid item lg={6} xl={6} md={6} xs={12}>
              <SingleIngredientHeader ingredient={ingredient} />
            </Grid>
            <Grid item lg={6} xl={6} md={6} xs={12}>
              <Comment text={ingredient.Note} />
            </Grid>
            <Grid item lg={12} xl={12} md={12} xs={12}>
              <Typography color="textPrimary" gutterBottom variant="h3">
                Related Products
              </Typography>
              <IngredientProducts ingredientID={ingredientID} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Ingredient;
