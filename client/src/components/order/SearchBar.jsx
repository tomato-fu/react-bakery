import {
  Box,
  Card,
  CardContent,
  InputAdornment,
  SvgIcon,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { Search as SearchIcon } from "react-feather";

const SearchBar = ({ setSearchTerm }) => {
  const [state, setState] = useState("");
  const initial = useRef(true);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    const timer = setTimeout(() => {
      setSearchTerm(state);
    }, 500);
    return () => clearTimeout(timer);
  }, [setSearchTerm, state]);
  return (
    <Card>
      <CardContent>
        <Box sx={{ maxWidth: 500 }}>
          <TextField
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon fontSize="small" color="action">
                    <SearchIcon />
                  </SvgIcon>
                </InputAdornment>
              ),
            }}
            placeholder="Search order"
            variant="outlined"
            onChange={(event) => setState(event.currentTarget.value)}
            value={state}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SearchBar;
