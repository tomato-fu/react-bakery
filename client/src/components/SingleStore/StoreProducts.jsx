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
import ProductsHeader from "./ProductsHeader";
import ProductsInStore from "src/__mocks__/ProductsInStore";
const StoreProducts = () => {
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
              <ProductsHeader
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {stableSort(ProductsInStore, getComparator(order, orderBy))
                  .slice(page * limit, page * limit + limit)
                  .map((row, index) => {
                    return (
                      <TableRow>
                        <TableCell
                          component="th"
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          <a
                            href={`/app/products/${row.id}`}
                            style={{ color: "#1e88e5" }}
                          >
                            {row.product}
                          </a>
                        </TableCell>

                        <TableCell align="center">
                          {row.startQuantity}
                        </TableCell>
                        <TableCell align="center">{row.soldQuantity}</TableCell>
                        <TableCell align="center">{row.price}</TableCell>
                        <TableCell align="center">
                          {row.price * row.soldQuantity}
                        </TableCell>
                        <TableCell align="center">{row.foodCost}</TableCell>
                        <TableCell align="center">
                          {row.foodCost * row.startQuantity}
                        </TableCell>
                        <TableCell align="center">
                          {row.trashQuantity}
                        </TableCell>
                        <TableCell align="center">
                          {row.trashQuantity * row.foodCost}
                        </TableCell>
                        <TableCell align="center">
                          {(row.price - row.foodCost) * row.soldQuantity}
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
          count={ProductsInStore.length}
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

export default StoreProducts;
