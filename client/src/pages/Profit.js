import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import ProfitResult from "src/components/Profit/ProfitResult";
import profit from "src/__mocks__/profit";

import { useOrderSaleInRangeFetch } from "src/hooks/profit/useOrderSaleInRangeFetch";
const Profit = () => {
  const { state, setStartDate, setEndDate } = useOrderSaleInRangeFetch();

  return (
    <>
      <Helmet>
        <title>Profits | Bakery</title>
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
            <ProfitResult
              profits={state}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Profit;
