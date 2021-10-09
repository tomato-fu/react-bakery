import * as React from "react";

import Box from "@material-ui/core/Box";

import TableCell from "@material-ui/core/TableCell";

import TableHead from "@material-ui/core/TableHead";

import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

import Checkbox from "@material-ui/core/Checkbox";

import { visuallyHidden } from "@material-ui/utils";

const headCells = [
  {
    id: "orderID",
    numeric: false,
    disablePadding: false,
    label: "Order ID",
  },
  {
    id: "customer",
    numeric: false,
    disablePadding: false,
    label: "Customer",
  },
  {
    id: "pickTime",
    numeric: false,
    disablePadding: false,
    label: "Pickup Time",
  },
  {
    id: "placedDate",
    numeric: false,
    disablePadding: false,
    label: "Date Placed",
  },
  {
    id: "fulfilled",
    numeric: false,
    disablePadding: false,
    label: "Fulfilled",
  },
  {
    id: "comment",
    numeric: false,
    disablePadding: false,
    label: "Comment",
  },
];

function LatestOrdersHeader(props) {
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

export default LatestOrdersHeader;
