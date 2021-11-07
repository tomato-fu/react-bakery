import { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Button,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Container,
} from "@material-ui/core";
import StoreHeader from "./StoreHeader";
import StoreToolbar from "./StoreToolbar";

const StoreResult = ({
  sales,
  setSales,
  update,
  setUpdate,
  setStartDate,
  setEndDate,
}) => {
  const [selectSaleIDs, setSelectSaleIDs] = useState([]);
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
      newSelectOrderIDs = sales.map((sale) => sale.ID);
    } else {
      newSelectOrderIDs = [];
    }

    setSelectSaleIDs(newSelectOrderIDs);
  };

  const isSelected = (id) => selectSaleIDs.indexOf(id) !== -1;

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectSaleIDs.indexOf(id);
    let newSelectOrderIDs = [];

    if (selectedIndex === -1) {
      newSelectOrderIDs = newSelectOrderIDs.concat(selectSaleIDs, id);
    } else if (selectedIndex === 0) {
      newSelectOrderIDs = newSelectOrderIDs.concat(selectSaleIDs.slice(1));
    } else if (selectedIndex === selectSaleIDs.length - 1) {
      newSelectOrderIDs = newSelectOrderIDs.concat(selectSaleIDs.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectOrderIDs = newSelectOrderIDs.concat(
        selectSaleIDs.slice(0, selectedIndex),
        selectSaleIDs.slice(selectedIndex + 1)
      );
    }

    setSelectSaleIDs(newSelectOrderIDs);
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
        <StoreToolbar
          numSelected={selectSaleIDs.length}
          selectedIds={selectSaleIDs}
          setSelectedIds={setSelectSaleIDs}
          sales={sales}
          setSales={setSales}
          update={update}
          setUpdate={setUpdate}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
        />
      </Box>
      <Card>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <StoreHeader
                numSelected={selectSaleIDs.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAll}
                onRequestSort={handleRequestSort}
                rowCount={sales.length}
              />
              <TableBody>
                {stableSort(sales, getComparator(order, orderBy))
                  .slice(page * limit, page * limit + limit)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.ID);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleSelectOne(event, row.ID)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.ID}
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
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          <a
                            href={`/app/sales/${row.ID}`}
                            style={{ color: "#1e88e5" }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {moment(row.Date).format("MM/DD/YYYY")}
                          </a>
                        </TableCell>
                        <TableCell align="center">
                          {row.Comment || "Null"}
                        </TableCell>
                        <TableCell align="center">{row.Hours}</TableCell>
                        <TableCell align="center">{row.revenue}</TableCell>
                        <TableCell align="center">{row.profit}</TableCell>

                        <TableCell align="center">
                          <Button
                            color="primary"
                            variant="contained"
                            href={`/app/sales/${row.ID}`}
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
          count={sales.length}
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

export default StoreResult;
