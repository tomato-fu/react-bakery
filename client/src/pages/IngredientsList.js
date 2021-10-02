import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import IngredientsListResults from "src/components/ingredient/IngredientsListResults";
import ingredients from "src/__mocks__/ingredients";
const IngredientsList = () => (
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
          <IngredientsListResults ingredients={ingredients} />
        </Box>
      </Container>
    </Box>
  </>
);

export default IngredientsList;
