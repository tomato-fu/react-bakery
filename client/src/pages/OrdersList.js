import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import OrdersListResults from "src/components/order/OrdersListResults";
import { useParams } from "react-router";
import { useOrdersInRangeFetch } from "src/hooks/order/useOrdersInRangeFetch";
const OrdersList = () => {
  let { startDate, endDate } = useParams();
  startDate = startDate || "2020-01-01";
  endDate = endDate || new Date().toISOString().slice(0, 10);

  const {
    state: orders,
    loading,
    error,
    setState: setOrders,

    setSearchTerm,
    update,
    setUpdate,
  } = useOrdersInRangeFetch({ startDate: startDate, endDate: endDate });

  return (
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
            <OrdersListResults
              orders={orders}
              setOrders={setOrders}
              update={update}
              setUpdate={setUpdate}
              setSearchTerm={setSearchTerm}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default OrdersList;
