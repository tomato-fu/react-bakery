import * as React from "react";

import Box from "@material-ui/core/Box";

import TableCell from "@material-ui/core/TableCell";

import TableHead from "@material-ui/core/TableHead";

import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

import { visuallyHidden } from "@material-ui/utils";

const headCells = [
  {
    id: "product",
    numeric: false,
    disablePadding: true,
    label: "Product",
  },
  {
    id: "weight",
    numeric: true,
    disablePadding: false,
    label: "Grams in Recipe",
  },
  {
    id: "costItem",
    numeric: true,
    disablePadding: false,
    label: "Ingredient Cost per Item",
  },
  {
    id: "costRecipe",
    numeric: true,
    disablePadding: false,
    label: "Ingredient Cost per Recipe",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Product Price",
  },
  {
    id: "view",
    numeric: false,
    disablePadding: false,
    label: "View",
  },
];

function IngredientProductsHeader(props) {
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

export default IngredientProductsHeader;
