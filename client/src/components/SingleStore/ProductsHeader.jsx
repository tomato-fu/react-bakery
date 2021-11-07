import * as React from "react";

import Box from "@material-ui/core/Box";

import TableCell from "@material-ui/core/TableCell";

import TableHead from "@material-ui/core/TableHead";

import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

import { visuallyHidden } from "@material-ui/utils";

const headCells = [
  {
    id: "Name",
    numeric: false,
    disablePadding: false,
    label: "Product",
  },

  {
    id: "StartQuantity",
    numeric: true,
    disablePadding: false,
    label: "Start Quantity",
  },
  {
    id: "QuantitySold",
    numeric: true,
    disablePadding: false,
    label: "Sold",
  },
  {
    id: "PriceAtSale",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "revenue",
    numeric: true,
    disablePadding: false,
    label: "Revenue",
  },

  {
    id: "FoodCostAtSale",
    numeric: true,
    disablePadding: false,
    label: "Food Cost",
  },
  {
    id: "QuantityTrashed",
    numeric: true,
    disablePadding: false,
    label: "Trashed",
  },
  {
    id: "lost",
    numeric: true,
    disablePadding: false,
    label: "Lost Revenue",
  },
  {
    id: "profit",
    numeric: true,
    disablePadding: false,
    label: "Profit",
  },
];

function ProductsHeader(props) {
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

export default ProductsHeader;
