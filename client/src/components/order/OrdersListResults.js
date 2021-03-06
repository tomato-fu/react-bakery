import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import Chip from "@mui/material/Chip";
import moment from "moment";
import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import OrdersListHeader from "./OrdersListHeader";
import OrdersListToolbar from "./OrdersListToolbar";

const OrdersListResults = ({
  orders,
  setOrders,
  update,
  setUpdate,
  setSearchTerm,
}) => {
  const [selectOrderIDs, setSelectOrderIDs] = useState([]);
  const [limit, setLimit] = useState(5);
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

  const handleSelectAll = (event) => {
    let newSelectOrderIDs;

    if (event.target.checked) {
      newSelectOrderIDs = orders.map((order) => order.order_id);
    } else {
      newSelectOrderIDs = [];
    }

    setSelectOrderIDs(newSelectOrderIDs);
  };

  const isSelected = (id) => selectOrderIDs.indexOf(id) !== -1;

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectOrderIDs.indexOf(id);
    let newSelectOrderIDs = [];

    if (selectedIndex === -1) {
      newSelectOrderIDs = newSelectOrderIDs.concat(selectOrderIDs, id);
    } else if (selectedIndex === 0) {
      newSelectOrderIDs = newSelectOrderIDs.concat(selectOrderIDs.slice(1));
    } else if (selectedIndex === selectOrderIDs.length - 1) {
      newSelectOrderIDs = newSelectOrderIDs.concat(selectOrderIDs.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectOrderIDs = newSelectOrderIDs.concat(
        selectOrderIDs.slice(0, selectedIndex),
        selectOrderIDs.slice(selectedIndex + 1)
      );
    }

    setSelectOrderIDs(newSelectOrderIDs);
  };

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
      <Box>
        <OrdersListToolbar
          numSelected={selectOrderIDs.length}
          selectedIds={selectOrderIDs}
          setSelectedIds={setSelectOrderIDs}
          orders={orders}
          setOrders={setOrders}
          update={update}
          setUpdate={setUpdate}
          setSearchTerm={setSearchTerm}
        />
      </Box>
      <Card>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <OrdersListHeader
                numSelected={selectOrderIDs.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAll}
                onRequestSort={handleRequestSort}
                rowCount={orders.length}
              />
              <TableBody>
                {stableSort(Array.from(orders), getComparator(order, orderBy))
                  .slice(page * limit, page * limit + limit)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.order_id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) =>
                          handleSelectOne(event, row.order_id)
                        }
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.order_id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          <a
                            href={`/app/orders/${row.order_id}`}
                            style={{ color: "#1e88e5" }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {row.order_id}
                          </a>
                        </TableCell>
                        <TableCell align="center">{row.CustomerName}</TableCell>
                        <TableCell align="center">
                          {moment(row.PickupTime).format("MM/DD/YYYY HH:mm:ss")}
                        </TableCell>
                        <TableCell align="center">
                          {moment(row.DatePlaced).format("MM/DD/YYYY")}
                        </TableCell>
                        <TableCell align="center">
                          {row.Fulfilled === 1 ? (
                            <Chip label="Yes" color="success" size="small" />
                          ) : (
                            <Chip label="No" color="error" size="small" />
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {row.Comment || "Null"}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            color="primary"
                            variant="contained"
                            href={`/app/orders/${row.order_id}`}
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

export default OrdersListResults;
