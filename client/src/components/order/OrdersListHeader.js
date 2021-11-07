import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { visuallyHidden } from "@material-ui/utils";
import * as React from "react";

const headCells = [
  {
    id: "order_id",
    numeric: false,
    disablePadding: true,
    label: "Order ID",
  },
  {
    id: "CustomerName",
    numeric: false,
    disablePadding: true,
    label: "Customer",
  },
  {
    id: "PickupTime",
    numeric: false,
    disablePadding: true,
    label: "Pickup Time",
  },
  {
    id: "DatePlaced",
    numeric: false,
    disablePadding: true,
    label: "Date Placed",
  },
  {
    id: "Fulfilled",
    numeric: false,
    disablePadding: true,
    label: "Fulfilled",
  },
  {
    id: "Comment",
    numeric: false,
    disablePadding: true,
    label: "Comment",
  },

  {
    id: "view",
    numeric: false,
    disablePadding: false,
    label: "View",
  },
];

function OrdersListHeader(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"center"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={headCell.id === "view" ? false : orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={
                headCell.id === "view" ? null : createSortHandler(headCell.id)
              }
              hideSortIcon={headCell.id === "view"}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default OrdersListHeader;
