import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
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

const StoreProducts = ({ products }) => {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("Date");
  console.log(products);
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
                {stableSort(Array.from(products), getComparator(order, orderBy))
                  .slice(page * limit, page * limit + limit)
                  .map((row, index) => {
                    return (
                      <TableRow key={row.product_id}>
                        <TableCell
                          component="th"
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          <a
                            href={`/app/products/${row.product_id}`}
                            style={{ color: "#1e88e5" }}
                          >
                            {row.Name}
                          </a>
                        </TableCell>

                        <TableCell align="center">
                          {row.StartQuantity}
                        </TableCell>
                        <TableCell align="center">{row.QuantitySold}</TableCell>
                        <TableCell align="center">{row.PriceAtSale}</TableCell>
                        <TableCell align="center">{row.revenue}</TableCell>

                        <TableCell align="center">
                          {row.FoodCostAtSale}
                        </TableCell>
                        <TableCell align="center">
                          {row.QuantityTrashed}
                        </TableCell>
                        <TableCell align="center">{row.lost}</TableCell>
                        <TableCell align="center">{row.profit}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={Array.from(products).length}
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
