import Box from "@material-ui/core/Box";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { visuallyHidden } from "@material-ui/utils";
import * as React from "react";

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
    id: "saleRevenue",
    numeric: true,
    disablePadding: true,
    label: "In-store Revenue",
  },
  {
    id: "saleProfit",
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
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={
                headCell.id === "viewSales" || headCell.id === "viewOrders"
                  ? false
                  : orderBy === headCell.id
              }
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={
                headCell.id === "viewSales" || headCell.id === "viewOrders"
                  ? null
                  : createSortHandler(headCell.id)
              }
              hideSortIcon={
                headCell.id === "viewSales" || headCell.id === "viewOrders"
              }
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
