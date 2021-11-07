import { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Button,
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Container,
} from "@material-ui/core";
import Chip from "@mui/material/Chip";
import LatestOrdersHeader from "./LatestOrdersHeader";
import { useLastedOrdersFetch } from "src/hooks/order/useLastedOrdersFetch";
const LatestOrders = () => {
  const { state: orders, loading, error } = useLastedOrdersFetch();
  console.log(orders);
  const [selectOrderIDs, setSelectOrderIDs] = useState([]);
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

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
        <CardHeader title="Latest Orders" />
        <Divider />
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <LatestOrdersHeader
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={orders.length}
              />
              <TableBody>
                {stableSort(Array.from(orders), getComparator(order, orderBy))
                  .slice(page * limit, page * limit + limit)
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" key={row.ID}>
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
                          <a
                            href={`/app/customers/${row.CustomerID}`}
                            style={{ color: "#1e88e5" }}
                          >
                            {row.CustomerName}
                          </a>
                        </TableCell>
                        <TableCell align="center">
                          {moment(row.PickupTime).format("MM/DD/YYYY HH:mm:ss")}
                        </TableCell>
                        <TableCell align="center">
                          {moment(row.DatePlaced).format("MM/DD/YYYY")}
                        </TableCell>
                        <TableCell align="center">
                          {row.Fulfilled ? (
                            <Chip label="Yes" color="success" size="small" />
                          ) : (
                            <Chip label="No" color="error" size="small" />
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {row.Comment || "Null"}
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
          count={orders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[6, 12]}
        />
      </Card>
    </Container>
  );
};

export default LatestOrders;
