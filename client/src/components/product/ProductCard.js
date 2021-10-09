import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Grid,
  Typography,
} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import yellow from "@material-ui/core/colors/yellow";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import PushPinIcon from "@mui/icons-material/PushPin";
import axios from "axios";
const ProductCard = ({ product, update, setUpdate, setShowDelete }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [showPin, setShowPin] = useState(product.isPin);
  const open = Boolean(anchorEl);
  console.log(product);
  const handleRemove = (id) => {
    axios
      .delete("http://localhost:3004/products/deleteProduct", {
        params: {
          productID: id,
        },
      })
      .then(() => {
        setUpdate(!update);
      })
      .catch((err) => console.log(err));
    setAnchorEl(null);
    setShowDelete(true);
  };
  // const handlePin = (id) => {
  //   pinProduct(id);
  //   setAnchorEl(null);
  //   setShowPin(!showPin);
  // };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
      }}
    >
      {/* {showPin && (
        <PushPinIcon
          style={{ position: "absolute", left: "1rem", top: "0.8rem" }}
        />
      )} */}

      <Box sx={{ position: "absolute", right: "1rem", top: "0.8rem" }}>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setAnchorEl(e.currentTarget);
          }}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={() => setAnchorEl(null)}
          PaperProps={{
            style: {
              width: "20ch",
            },
          }}
        >
          {/* <MenuItem key="pin" onClick={() => handlePin(product.id)}>
            {showPin ? "Unpin" : "Pin"}
          </MenuItem>
        */}
          <MenuItem
            key="remove"
            onClick={() => handleRemove(product.ID)}
            sx={{ color: "#f44336" }}
          >
            Remove
          </MenuItem>
        </Menu>
      </Box>
      <CardContent component={Link} to={`/app/products/${product.ID}`}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <Avatar
            alt="Product"
            src="/static/images/croissant.png"
            variant="square"
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {product.Name}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          {product.Comment}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            {/* {product.isFire ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <WhatshotIcon style={{ color: yellow[900] }} />
                <Typography
                  color="textSecondary"
                  display="inline"
                  sx={{ pl: 1 }}
                  variant="body2"
                >
                  Popular Product
                </Typography>
              </Box>
            ) : (
              <Box>
                <AccessTimeIcon color="action" />
                <Typography
                  color="textSecondary"
                  display="inline"
                  sx={{ pl: 1 }}
                  variant="body2"
                >
                  Updated 2hr ago
                </Typography>
              </Box>
            )} */}
          </Grid>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <ShoppingBasketIcon color="action" />
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              123 Orders
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};
ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;
