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

import IngredientsListToolbar from "./IngredientsListToolbar";
import IngredientsListHeader from "./IngredientsListHeader";

const IngredientsListResults = ({ ingredients, ...rest }) => {
  const [selectIngredientID, setSelectIngredientID] = useState([]);
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
    let newSelectedIngredientID;

    if (event.target.checked) {
      newSelectedIngredientID = ingredients.map((ingredient) => ingredient.id);
    } else {
      newSelectedIngredientID = [];
    }

    setSelectIngredientID(newSelectedIngredientID);
  };

  const isSelected = (id) => selectIngredientID.indexOf(id) !== -1;

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectIngredientID.indexOf(id);
    let newSelectedIngredientID = [];

    if (selectedIndex === -1) {
      newSelectedIngredientID = newSelectedIngredientID.concat(
        selectIngredientID,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedIngredientID = newSelectedIngredientID.concat(
        selectIngredientID.slice(1)
      );
    } else if (selectedIndex === selectIngredientID.length - 1) {
      newSelectedIngredientID = newSelectedIngredientID.concat(
        selectIngredientID.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedIngredientID = newSelectedIngredientID.concat(
        selectIngredientID.slice(0, selectedIndex),
        selectIngredientID.slice(selectedIndex + 1)
      );
    }

    setSelectIngredientID(newSelectedIngredientID);
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
        <IngredientsListToolbar numSelected={selectIngredientID.length} />
      </Box>
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <IngredientsListHeader
                numSelected={selectIngredientID.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAll}
                onRequestSort={handleRequestSort}
                rowCount={ingredients.length}
              />
              <TableBody>
                {stableSort(ingredients, getComparator(order, orderBy))
                  .slice(page * limit, page * limit + limit)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleSelectOne(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
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
                          {row.name}
                        </TableCell>
                        <TableCell align="center">{row.price}</TableCell>
                        <TableCell align="center">{row.comment}</TableCell>
                        <TableCell align="center">
                          <Button
                            color="primary"
                            variant="contained"
                            href={`/app/ingredients/${row.id}`}
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
          count={ingredients.length}
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

IngredientsListResults.propTypes = {
  ingredients: PropTypes.array.isRequired,
};

export default IngredientsListResults;
