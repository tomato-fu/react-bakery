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
    disablePadding: false,
    label: "Date",
  },
  {
    id: "orderRevenue",
    numeric: true,
    disablePadding: true,
    label: "Order Revenue",
  },
  {
    id: "orderProfit",
    numeric: true,
    disablePadding: true,
    label: "Order Profit",
  },
  {
    id: "storeRevenue",
    numeric: true,
    disablePadding: true,
    label: "In-store Revenue",
  },
  {
    id: "storeProfit",
    numeric: true,
    disablePadding: true,
    label: "In-store Profit",
  },
  {
    id: "totalRevenue",
    numeric: true,
    disablePadding: true,
    label: "Total Revenue",
  },

  {
    id: "totalProfit",
    numeric: true,
    disablePadding: true,
    label: "Total Profit",
  },
  {
    id: "viewSales",
    numeric: false,
    disablePadding: true,
    label: "View Sales Report",
  },
  {
    id: "viewOrders",
    numeric: false,
    disablePadding: true,
    label: "View Orders",
  },
];

function ProfitHeader(props) {
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
            padding={headCell.disablePadding ? "none" : "normal"}
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

export default ProfitHeader;
