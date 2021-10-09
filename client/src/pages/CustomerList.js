import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import CustomerListResults from "src/components/customer/CustomerListResults";

import React, { useState } from "react";
import { useCustomersFetch } from "src/hooks/useCutomersFetch";
const CustomerList = () => {
  const { state, loading, error, setState, update, setUpdate } =
    useCustomersFetch();

  return (
    <>
      <Helmet>
        <title>Customers | Bakery</title>
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
            <CustomerListResults
              customers={state}
              setCustomers={setState}
              update={update}
              setUpdate={setUpdate}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CustomerList;
