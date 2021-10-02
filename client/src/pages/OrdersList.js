import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import OrdersListResults from "src/components/order/OrdersListResults";
import orders from "src/__mocks__/orders";
const OrdersList = () => (
  <>
    <Helmet>
      <title>Orders | Bakery</title>
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
          <OrdersListResults orders={orders} />
        </Box>
      </Container>
    </Box>
  </>
);

export default OrdersList;
