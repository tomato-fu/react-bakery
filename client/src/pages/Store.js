import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import StoreResult from "../components/store/StoreResult";
import { useSalesFetch } from "src/hooks/sale/useSalesFetch";
const Store = () => {
  const {
    state: sales,
    loading,
    error,
    setState: setSales,
    update,
    setUpdate,
    setStartDate,
    setEndDate,
  } = useSalesFetch();

  return (
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
            <StoreResult
              sales={sales}
              setSales={setSales}
              update={update}
              setUpdate={setUpdate}
              setEndDate={setEndDate}
              setStartDate={setStartDate}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Store;
