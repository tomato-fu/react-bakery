import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import sales from "src/__mocks__/sales";
import StoreResult from "../components/store/StoreResult";
const Store = () => (
  <>
    <Helmet>
      <title>In-Store | Bakery</title>
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
          <StoreResult sales={sales} />
        </Box>
      </Container>
    </Box>
  </>
);

export default Store;
