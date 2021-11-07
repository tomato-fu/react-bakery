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
import Chip from "@mui/material/Chip";
import ProfitHeader from "./ProfitHeader";
import ProfitToolbar from "./ProfitToolbar";
import ProfitOverview from "./ProfitOverview";
const ProfitResult = ({ profits, setStartDate, setEndDate }) => {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("date");

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
      <Box>
        <ProfitToolbar setStartDate={setStartDate} setEndDate={setEndDate} />
      </Box>
      <Card>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <ProfitHeader
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={profits.length}
              />
              <TableBody>
                {stableSort(profits, getComparator(order, orderBy))
                  .slice(page * limit, page * limit + limit)
                  .map((row, index) => {
                    return (
                      <TableRow key={row.date}>
                        <TableCell
                          component="th"
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          {moment(row.date).format("MM/DD/YYYY")}
                        </TableCell>
                        <TableCell align="center">{row.orderRevenue}</TableCell>
                        <TableCell align="center">{row.orderProfit}</TableCell>
                        <TableCell align="center">{row.saleRevenue}</TableCell>
                        <TableCell align="center">{row.saleProfit}</TableCell>

                        <TableCell align="center">{row.totalProfit}</TableCell>
                        <TableCell align="center">{row.totalRevenue}</TableCell>
                        <TableCell align="center">
                          <Button
                            color="primary"
                            variant="contained"
                            href={`/app/sales/${row.ID}`}
                            disabled={row.ID === -1 ? true : false}
                            onClick={(e) => e.stopPropagation()}
                          >
                            View
                          </Button>
                        </TableCell>
                        {/* 
                        Need to pass date range to orders page
                        */}
                        <TableCell align="center">
                          <Button
                            color="primary"
                            variant="contained"
                            href={`/app/ordersRanged/${row.date}/${row.date}`}
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
          count={profits.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>

      <ProfitOverview />
    </Container>
  );
};

export default ProfitResult;
