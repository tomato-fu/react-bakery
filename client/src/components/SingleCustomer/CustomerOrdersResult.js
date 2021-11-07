import { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Button,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Container,
} from "@material-ui/core";
import customersOrder from "src/__mocks__/customersOrder";
import CustomerOrdersHeader from "./CustomerOrdersHeader";
import { useSingleCustomerOrdersFetch } from "src/hooks/customer/useSingleCustomerOrdersFetch";
const CustomerOrdersResult = ({ customerID }) => {
  const {
    state: orders,
    loading,
    error,
  } = useSingleCustomerOrdersFetch(customerID);
  console.log(orders);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("Date");

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Container maxWidth={false}>
      <Card>
        <PerfectScrollbar>
          <Box>
            <Table>
              <CustomerOrdersHeader
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {stableSort(Array.from(orders), getComparator(order, orderBy))
                  .slice(page * limit, page * limit + limit)
                  .map((row, index) => {
                    return (
                      <TableRow key={row.ID}>
                        <TableCell
                          component="th"
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          <a
                            href={`/app/orders/${row.ID}`}
                            style={{ color: "#1e88e5" }}
                          >
                            {row.ID}
                          </a>
                        </TableCell>
                        <TableCell align="center">
                          {moment(row.DatePlaced).format("YYYY-MM-DD")}
                        </TableCell>
                        <TableCell align="center">{row.Total}</TableCell>
                        <TableCell align="center">
                          {row.Comment === "" ? "Null" : row.Comment}
                        </TableCell>
                        <TableCell align="center">
                          {row.Fulfilled ? "Yes" : "No"}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            color="primary"
                            variant="contained"
                            href={`/app/orders/${row.ID}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={Array.from(orders).length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </Container>
  );
};

export default CustomerOrdersResult;
