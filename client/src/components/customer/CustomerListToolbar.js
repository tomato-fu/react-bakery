import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Grid,
} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import { alpha } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import "date-fns";

import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";

import CloseIcon from "@material-ui/icons/Close";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { Search as SearchIcon } from "react-feather";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
});

const validationSchema = yup.object({
  customerName: yup.string("Enter customer name"),
  weChatID: yup.string("Enter Wechat ID"),
  phoneNumber: yup.string("Enter phone number"),
  joinDate: yup.date("Enter join date"),
  addressOne: yup.string("Enter address line one"),
  addressTwo: yup.string("Enter address line two"),
  city: yup.string("Enter city"),
  zipCode: yup.number("Enter Zip Code"),
  comment: yup.string("Enter comment for customer"),
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

const CustomerListToolbar = (props) => {
  const { numSelected, customers, setCustomers } = props;
  const [open, setOpen] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      customerName: "",
      weChatID: "",
      phoneNumber: "",
      joinDate: null,
      addressOne: "",
      addressTwo: "",
      city: "",
      zipCode: "",
      comment: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{}}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
              bgcolor: (theme) =>
                alpha(
                  theme.palette.primary.main,
                  theme.palette.action.activatedOpacity
                ),
            }),
          }}
        >
          {numSelected > 0 ? (
            <Typography
              sx={{ flex: "1 1 100%" }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {numSelected} selected
            </Typography>
          ) : null}

          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: 1,
              }}
            >
              <Button
                color="primary"
                variant="contained"
                onClick={handleClickOpen}
              >
                Add customer
              </Button>
            </Box>
          )}
        </Toolbar>
      </Box>

      <Box sx={{ mt: 3 }}>
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
                placeholder="Search customer"
                variant="outlined"
                onKeyUp={(e) => {
                  if (e.keyCode === 13) {
                    e.preventDefault();
                    setCustomers(
                      customers.filter(
                        (customer) => customer.address.country !== "USA"
                      )
                    );
                    console.log("what the fu");
                  }
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      <div>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          fullScreen={true}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            New customer
          </DialogTitle>
          <DialogContent
            dividers
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h4">Customer Infomation</Typography>

            <form onSubmit={formik.handleSubmit}>
              <div
                style={{
                  width: "90vw",
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",

                  padding: "2rem",
                  borderRadius: "5px",
                  background: "#fff",
                  shadows: " 0 2px 10px rgb(0 0 0 / 30%)",
                }}
              >
                <Grid container spacing={3}>
                  <Grid item lg={3} sm={6} xl={6} xs={12}>
                    <label
                      htmlFor="name"
                      style={{
                        display: "block",
                        marginTop: "1.5rem",
                        marginBottom: "0.8rem",
                      }}
                    >
                      Customer Name
                    </label>
                    <TextField
                      id="customerName"
                      fullWidth
                      label="Name"
                      variant="standard"
                      value={formik.values.customerName}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.customerName &&
                        Boolean(formik.errors.customerName)
                      }
                      helperText={
                        formik.touched.customerName &&
                        formik.errors.customerName
                      }
                    />
                  </Grid>

                  <Grid item lg={3} sm={6} xl={6} xs={12}>
                    <label
                      htmlFor="wechatID"
                      style={{
                        display: "block",
                        marginTop: "1.5rem",
                        marginBottom: "0.8rem",
                      }}
                    >
                      Customer WechatID
                    </label>
                    <TextField
                      id="weChatID"
                      fullWidth
                      label="WechatID"
                      variant="standard"
                      value={formik.values.weChatID}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.weChatID &&
                        Boolean(formik.errors.weChatID)
                      }
                      helperText={
                        formik.touched.weChatID && formik.errors.weChatID
                      }
                    />
                  </Grid>

                  <Grid item lg={3} sm={6} xl={6} xs={12}>
                    <label
                      htmlFor="phoneNumber"
                      style={{
                        display: "block",
                        marginTop: "1.5rem",
                        marginBottom: "0.8rem",
                      }}
                    >
                      Phone Number
                    </label>
                    <TextField
                      value={formik.values.phoneNumber}
                      id="phoneNumber"
                      fullWidth
                      label="Phone Number"
                      variant="standard"
                      onChange={formik.handleChange}
                      error={
                        formik.touched.phoneNumber &&
                        Boolean(formik.errors.phoneNumber)
                      }
                      helperText={
                        formik.touched.phoneNumber && formik.errors.phoneNumber
                      }
                    />
                  </Grid>

                  <Grid item lg={3} sm={6} xl={6} xs={12}>
                    <label
                      htmlFor="joinDate"
                      style={{
                        display: "block",
                        marginTop: "1.5rem",
                        marginBottom: "0.8rem",
                      }}
                    >
                      Customer Join Date
                    </label>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        fullWidth
                        name="joinDate"
                        variant="inline"
                        id="joinDate"
                        label="Join Date"
                        format="MM/dd/yyyy"
                        value={formik.values.joinDate}
                        onChange={(value) =>
                          formik.setFieldValue("joinDate", value)
                        }
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Grid>
              </div>

              <Typography variant="h4">Customer Address</Typography>

              <div
                style={{
                  width: "90vw",
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",

                  padding: "2rem",
                  borderRadius: "5px",
                  background: "#fff",
                  shadows: " 0 2px 10px rgb(0 0 0 / 30%)",
                }}
              >
                <Grid container spacing={3}>
                  <Grid item lg={3} sm={6} xl={6} xs={12}>
                    <label
                      htmlFor="addressOne"
                      style={{
                        display: "block",
                        marginTop: "1.5rem",
                        marginBottom: "0.8rem",
                      }}
                    >
                      Address One
                    </label>
                    <TextField
                      id="addressOne"
                      fullWidth
                      label="Address One"
                      variant="standard"
                      value={formik.values.addressOne}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.addressOne &&
                        Boolean(formik.errors.addressOne)
                      }
                      helperText={
                        formik.touched.addressOne && formik.errors.addressOne
                      }
                    />
                  </Grid>

                  <Grid item lg={3} sm={6} xl={6} xs={12}>
                    <label
                      htmlFor="addressTwo"
                      style={{
                        display: "block",
                        marginTop: "1.5rem",
                        marginBottom: "0.8rem",
                      }}
                    >
                      Address Two
                    </label>
                    <TextField
                      id="addressTwo"
                      fullWidth
                      label="Address Two"
                      variant="standard"
                      value={formik.values.addressTwo}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.addressTwo &&
                        Boolean(formik.errors.addressTwo)
                      }
                      helperText={
                        formik.touched.addressTwo && formik.errors.addressTwo
                      }
                    />
                  </Grid>

                  <Grid item lg={3} sm={6} xl={6} xs={12}>
                    <label
                      htmlFor="city"
                      style={{
                        display: "block",
                        marginTop: "1.5rem",
                        marginBottom: "0.8rem",
                      }}
                    >
                      City
                    </label>
                    <TextField
                      value={formik.values.city}
                      id="city"
                      fullWidth
                      label="City"
                      variant="standard"
                      onChange={formik.handleChange}
                      error={formik.touched.city && Boolean(formik.errors.city)}
                      helperText={formik.touched.city && formik.errors.city}
                    />
                  </Grid>

                  <Grid item lg={3} sm={6} xl={6} xs={12}>
                    <label
                      htmlFor="zipCode"
                      style={{
                        display: "block",
                        marginTop: "1.5rem",
                        marginBottom: "0.8rem",
                      }}
                    >
                      Zip
                    </label>
                    <TextField
                      value={formik.values.zipCode}
                      id="zipCode"
                      fullWidth
                      label="Zip"
                      variant="standard"
                      onChange={formik.handleChange}
                      error={
                        formik.touched.zipCode && Boolean(formik.errors.zipCode)
                      }
                      helperText={
                        formik.touched.zipCode && formik.errors.zipCode
                      }
                    />
                  </Grid>
                </Grid>
              </div>
              <Typography variant="h4">Customer Comment</Typography>
              <div
                style={{
                  width: "90vw",
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",

                  padding: "2rem",
                  borderRadius: "5px",
                  background: "#fff",
                  shadows: " 0 2px 10px rgb(0 0 0 / 30%)",
                }}
              >
                <TextField
                  value={formik.values.comment}
                  id="comment"
                  fullWidth
                  rows={5}
                  maxRows={10}
                  label="Comment"
                  multiline
                  variant="outlined"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.comment && Boolean(formik.errors.comment)
                  }
                  helperText={formik.touched.comment && formik.errors.comment}
                />
              </div>

              <Button
                color="primary"
                variant="contained"
                type="submit"
                style={{ margin: "2rem auto", display: "block", width: "50vw" }}
              >
                Submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </Box>
  );
};

export default CustomerListToolbar;
