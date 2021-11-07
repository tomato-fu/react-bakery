import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import IngredientsListResults from "src/components/ingredient/IngredientsListResults";
import ingredients from "src/__mocks__/ingredients";
import { useIngredientsKeyWordFetch } from "src/hooks/ingredient/useIngredientsKeyWordFetch";
const IngredientsList = () => {
  const { state, loading, error, setState, update, setUpdate, setKeyWord } =
    useIngredientsKeyWordFetch();
  return (
    <>
      <Helmet>
        <title>Ingredients | Bakery</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ pt: 3 }}>
            <IngredientsListResults
              ingredients={state}
              setIngredients={setState}
              update={update}
              setUpdate={setUpdate}
              setKeyWord={setKeyWord}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default IngredientsList;
