import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";

import { Search as SearchIcon } from "react-feather";

const SearchBar = ({ setKeyWord }) => {
  const [state, setState] = useState("");
  const initial = useRef(true);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    const timer = setTimeout(() => {
      setKeyWord(state);
    }, 500);
    return () => clearTimeout(timer);
  }, [setKeyWord, state]);
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
            placeholder="Search product"
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
