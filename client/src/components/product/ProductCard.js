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
  Button,
  Typography,
  withStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import AccessTimeIcon from "@material-ui/icons/AccessTime";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import yellow from "@material-ui/core/colors/yellow";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import PushPinIcon from "@mui/icons-material/PushPin";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";

import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h4" sx={{ fontSize: "1.5em" }}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          sx={{
            position: "absolute",
            right: "1rem",
            top: "0.1rem",
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const ProductCard = ({ product, update, setUpdate, setShowDelete }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [showPin, setShowPin] = useState(product.isPin);
  const open = Boolean(anchorEl);
  const [openDelete, setOpenDelete] = useState(false);
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

      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Warning, this operation cannot be reversed!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete those data? Once you press "yes", it
            cannot be restored.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button
            onClick={() => {
              handleRemove(product.ID);
              setOpenDelete(false);
              setAnchorEl(null);
            }}
            style={{ color: "#f44336" }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

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
            onClick={() => setOpenDelete(true)}
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
            {product.isHot ? (
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
            ) : null}
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
              {product.total} orders
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
