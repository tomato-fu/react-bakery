import * as React from "react";

import Box from "@material-ui/core/Box";

import TableCell from "@material-ui/core/TableCell";

import TableHead from "@material-ui/core/TableHead";

import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

import { visuallyHidden } from "@material-ui/utils";

const headCells = [
  {
    id: "ID",
    numeric: true,
    disablePadding: true,
    label: "OrderID",
  },
  {
    id: "PickupTime",
    numeric: false,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "Amount",
    numeric: true,
    disablePadding: false,
    label: "Amount",
  },
  {
    id: "Comment",
    numeric: false,
    disablePadding: false,
    label: "Comment",
  },
  {
    id: "Fulfilled",
    numeric: false,
    disablePadding: false,
    label: "Fulfilled",
  },
  {
    id: "view",
    numeric: false,
    disablePadding: false,
    label: "View",
  },
];

function CustomerOrdersHeader(props) {
  const {
    order,
    orderBy,

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
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={
                headCell.id === "Comment" || headCell.id === "view"
                  ? false
                  : orderBy === headCell.id
              }
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={
                headCell.id === "Comment" || headCell.id === "view"
                  ? null
                  : createSortHandler(headCell.id)
              }
              hideSortIcon={headCell.id === "Comment" || headCell.id === "view"}
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

export default CustomerOrdersHeader;
