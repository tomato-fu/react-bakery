import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import CustomerListResults from "src/components/customer/CustomerListResults";

import React, { useState } from "react";
import { useCustomersKeyWordFetch } from "src/hooks/customer/useCustomersKeyWordFetch";
const CustomerList = () => {
  const {
    state,
    loading,
    error,
    setState,
    update,
    setUpdate,
    keyWord,
    setKeyWord,
  } = useCustomersKeyWordFetch();

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
              keyWord={keyWord}
              setKeyWord={setKeyWord}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CustomerList;
