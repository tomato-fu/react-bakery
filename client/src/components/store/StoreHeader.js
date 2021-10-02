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
    id: "date",
    numeric: false,
    disablePadding: true,
    label: "Date",
  },
  {
    id: "comment",
    numeric: false,
    disablePadding: true,
    label: "Comment",
  },
  {
    id: "hours",
    numeric: true,
    disablePadding: true,
    label: "Hours",
  },

  {
    id: "revenue",
    numeric: true,
    disablePadding: true,
    label: "Revenue",
  },
  {
    id: "profit",
    numeric: true,
    disablePadding: true,
    label: "Profit",
  },
  {
    id: "view",
    numeric: false,
    disablePadding: false,
    label: "View",
  },
];

function StoreHeader(props) {
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
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={
                headCell.id === "view" || headCell.id === "comment"
                  ? false
                  : orderBy === headCell.id
              }
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={
                headCell.id === "view" || headCell.id === "comment"
                  ? null
                  : createSortHandler(headCell.id)
              }
              hideSortIcon={headCell.id === "view" || headCell.id === "comment"}
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

export default StoreHeader;
