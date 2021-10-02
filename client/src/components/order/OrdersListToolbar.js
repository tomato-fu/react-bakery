import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Grid,
  MenuItem,
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

import red from "@material-ui/core/colors/red";
import CloseIcon from "@material-ui/icons/Close";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import React, { useState } from "react";
import { useFormik, Formik, getIn, FieldArray } from "formik";
import * as yup from "yup";
import customers from "src/__mocks__/customers";
import products from "src/__mocks__/products";
import { Search as SearchIcon } from "react-feather";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
});

const payments = ["Wechat", "Cash", "Card", "Points"];
const validationSchemaDate = yup.object({
  FromDate: yup.date("Select a date").required(),
  ToDate: yup.date("Select another date").required(),
});
const validationSchema = yup.object({
  customer: yup.string("Select a customer").required(),
  plcedDate: yup.date("Select a palced date").required(),
  pickTime: yup.date("Select a pick time").required(),
  amount: yup.number("Enter payment amount"),
  comment: yup.string("Enter order comment"),
  payment: yup.array().of(
    yup.object({
      method: yup
        .string("Select a payment method")
        .required("Select a payment method"),
      amount: yup.number("Enter payment amount"),
    })
  ),
  products: yup.array().of(
    yup.object({
      product: yup
        .string("Select a product")
        .required("Please select a product"),
      quantity: yup
        .number("Enter product quantity")
        .required("Please enter a quantity"),
      comment: yup.string("Enter comment"),
    })
  ),
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

const OrdersListToolbar = (props) => {
  const { numSelected } = props;
  const [open, setOpen] = React.useState(false);
  const formikDate = useFormik({
    initialValues: {
      FromDate: null,
      ToDate: null,
    },
    validationSchema: validationSchemaDate,
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
                Add order
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
                placeholder="Search order"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <form onSubmit={formikDate.handleSubmit}>
              <Box
                sx={{ maxWidth: 500, display: "flex", alignItems: "center" }}
              >
                <Box style={{ marginRight: "1rem" }}>
                  <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
                    From
                  </Typography>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      name="FromDate"
                      variant="inline"
                      id="FromDate"
                      label="From Date"
                      format="MM/dd/yyyy"
                      value={formikDate.values.FromDate}
                      onChange={(value) =>
                        formikDate.setFieldValue("FromDate", value)
                      }
                    />
                  </MuiPickersUtilsProvider>
                </Box>

                <Box>
                  <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
                    To
                  </Typography>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      name="ToDate"
                      variant="inline"
                      id="ToDate"
                      label="To Date"
                      format="MM/dd/yyyy"
                      value={formikDate.values.ToDate}
                      onChange={(value) =>
                        formikDate.setFieldValue("ToDate", value)
                      }
                    />
                  </MuiPickersUtilsProvider>
                </Box>

                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  style={{
                    height: "80%",
                    transform: "translateY(0.8rem)",
                    marginLeft: "2rem",
                  }}
                >
                  Search
                </Button>
              </Box>
            </form>
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
            New order
          </DialogTitle>
          <DialogContent
            dividers
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h4">Order Infomation</Typography>
            <Formik
              initialValues={{
                customer: "",
                plcedDate: null,
                pickTime: null,
                amount: 0,
                comment: "",
                payment: [],
                products: [],
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                alert(JSON.stringify(values, null, 2));
              }}
            >
              {(formik) => (
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
                          htmlFor="customer"
                          style={{
                            display: "block",
                            marginTop: "1.5rem",
                            marginBottom: "0.8rem",
                          }}
                        >
                          Customer
                        </label>
                        <TextField
                          select
                          fullWidth
                          label="Select"
                          onChange={formik.handleChange}
                          value={formik.values.customer}
                          id="customer"
                          name="customer"
                          variant="standard"
                          error={
                            formik.touched.customer &&
                            Boolean(formik.errors.customer)
                          }
                          helperText={
                            formik.touched.customer && formik.errors.customer
                          }
                        >
                          {customers.map((option) => (
                            <MenuItem key={option.name} value={option.name}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>

                      <Grid item lg={3} sm={6} xl={6} xs={12}>
                        <label
                          htmlFor="amount"
                          style={{
                            display: "block",
                            marginTop: "1.5rem",
                            marginBottom: "0.8rem",
                          }}
                        >
                          Payment Amount
                        </label>
                        <TextField
                          id="amount"
                          fullWidth
                          label="Payment Amount"
                          variant="standard"
                          value={formik.values.amount}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.amount &&
                            Boolean(formik.errors.amount)
                          }
                          helperText={
                            formik.touched.amount && formik.errors.amount
                          }
                        />
                      </Grid>

                      <Grid item lg={3} sm={6} xl={6} xs={12}>
                        <label
                          htmlFor="plcedDate"
                          style={{
                            display: "block",
                            marginTop: "1.5rem",
                            marginBottom: "0.8rem",
                          }}
                        >
                          Date Placed
                        </label>

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            fullWidth
                            name="plcedDate"
                            variant="inline"
                            id="plcedDate"
                            label="Date Placed"
                            format="MM/dd/yyyy"
                            value={formik.values.plcedDate}
                            onChange={(value) =>
                              formik.setFieldValue("plcedDate", value)
                            }
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>

                      <Grid item lg={3} sm={6} xl={6} xs={12}>
                        <label
                          htmlFor="pickTime"
                          style={{
                            display: "block",
                            marginTop: "1.5rem",
                            marginBottom: "0.8rem",
                          }}
                        >
                          Pickup Time
                        </label>

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDateTimePicker
                            fullWidth
                            name="pickTime"
                            variant="inline"
                            id="pickTime"
                            label="Pick up time"
                            format="MM/dd/yyyy HH:mm"
                            value={formik.values.pickTime}
                            onChange={(value) =>
                              formik.setFieldValue("pickTime", value)
                            }
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                    </Grid>
                  </div>

                  <Typography variant="h4">Order Comment</Typography>
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
                      helperText={
                        formik.touched.comment && formik.errors.comment
                      }
                    />
                  </div>

                  <Typography variant="h4">Order Payment</Typography>
                  <div
                    style={{
                      width: "90vw",
                      margin: "0 auto",
                      display: "flex",
                      flexDirection: "column",

                      padding: "2rem",
                      borderRadius: "5px",
                      background: "#fff",
                      shadows: " 0 2px 10px rgb(0 0 0 / 30%)",
                    }}
                  >
                    <FieldArray name="payment">
                      {(arrayHelpers) => (
                        <div>
                          <Button
                            color="success"
                            variant="contained"
                            style={{ maxWidth: "10rem" }}
                            onClick={() =>
                              arrayHelpers.push({
                                method: "",
                                amount: 0,
                                id: Math.random(),
                              })
                            }
                            style={{ marginBottom: "0.5rem" }}
                          >
                            Add Payment
                          </Button>

                          {formik.values.payment.map((item, index) => {
                            const method = `payment[${index}].method`;
                            const touchedMethod = getIn(formik.touched, method);
                            const errorMethod = getIn(formik.errors, method);
                            const amount = `payment[${index}].amount`;
                            const touchedAmount = getIn(formik.touch, amount);
                            const errorAmount = getIn(formik.errors, amount);
                            return (
                              <Grid
                                container
                                spacing={3}
                                key={index}
                                style={{ marginBottom: "1.5rem" }}
                              >
                                <Grid item lg={6} sm={6} xl={6} xs={6}>
                                  <TextField
                                    select
                                    fullWidth
                                    label="Select"
                                    onChange={formik.handleChange}
                                    value={item.method}
                                    name={method}
                                    helperText={
                                      touchedMethod && errorMethod
                                        ? errorMethod
                                        : ""
                                    }
                                    error={Boolean(
                                      touchedMethod && errorMethod
                                    )}
                                    variant="standard"
                                  >
                                    {payments.map((option) => (
                                      <MenuItem key={option} value={option}>
                                        {option}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </Grid>

                                <Grid item lg={6} sm={6} xl={6} xs={6}>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <TextField
                                      type="number"
                                      value={item.amount}
                                      fullWidth
                                      name={amount}
                                      label="Amount"
                                      variant="standard"
                                      onChange={formik.handleChange}
                                      helperText={
                                        touchedAmount && errorAmount
                                          ? errorAmount
                                          : ""
                                      }
                                      error={Boolean(
                                        touchedAmount && errorAmount
                                      )}
                                    />
                                    <IconButton
                                      component="span"
                                      style={{ marginLeft: "0.5rem" }}
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <DeleteIcon style={{ color: red[700] }} />
                                    </IconButton>
                                  </div>
                                </Grid>
                              </Grid>
                            );
                          })}
                        </div>
                      )}
                    </FieldArray>
                  </div>

                  <Typography variant="h4">Order Products</Typography>
                  <div
                    style={{
                      width: "90vw",
                      margin: "0 auto",
                      display: "flex",
                      flexDirection: "column",

                      padding: "2rem",
                      borderRadius: "5px",
                      background: "#fff",
                      shadows: " 0 2px 10px rgb(0 0 0 / 30%)",
                    }}
                  >
                    <FieldArray name="products">
                      {(arrayHelpers) => (
                        <div>
                          <Button
                            color="success"
                            variant="contained"
                            style={{ maxWidth: "10rem" }}
                            onClick={() =>
                              arrayHelpers.push({
                                product: "",
                                quantity: 0,
                                id: Math.random(),
                                comment: "",
                              })
                            }
                            style={{ marginBottom: "0.5rem" }}
                          >
                            Add Product
                          </Button>

                          {formik.values.products.map((item, index) => {
                            const product = `products[${index}].product`;
                            const touchedProduct = getIn(
                              formik.touched,
                              product
                            );
                            const errorProduct = getIn(formik.errors, product);
                            const quantity = `products[${index}].quantity`;
                            const touchedQuantity = getIn(
                              formik.touch,
                              quantity
                            );
                            const errorQuantity = getIn(
                              formik.errors,
                              quantity
                            );

                            const comment = `products[${index}].comment`;
                            const touchedComment = getIn(formik.touch, comment);
                            const errorComment = getIn(formik.errors, comment);
                            return (
                              <Grid
                                container
                                spacing={3}
                                key={index}
                                style={{ marginBottom: "1.5rem" }}
                              >
                                <Grid item lg={4} sm={4} xl={4} xs={6}>
                                  <TextField
                                    select
                                    fullWidth
                                    label="Select"
                                    onChange={formik.handleChange}
                                    value={item.product}
                                    name={product}
                                    helperText={
                                      touchedProduct && errorProduct
                                        ? errorProduct
                                        : ""
                                    }
                                    error={Boolean(
                                      touchedProduct && errorProduct
                                    )}
                                    variant="standard"
                                    style={{ marginBottom: "1rem" }}
                                  >
                                    {products.map((option) => (
                                      <MenuItem
                                        key={option.title}
                                        value={option.title}
                                      >
                                        {option.title}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </Grid>

                                <Grid item lg={4} sm={4} xl={4} xs={6}>
                                  <TextField
                                    type="number"
                                    value={item.quantity}
                                    fullWidth
                                    name={quantity}
                                    label="Quantity"
                                    variant="standard"
                                    onChange={formik.handleChange}
                                    helperText={
                                      touchedQuantity && errorQuantity
                                        ? errorQuantity
                                        : ""
                                    }
                                    error={Boolean(
                                      touchedQuantity && errorQuantity
                                    )}
                                  />
                                </Grid>

                                <Grid item lg={4} sm={4} xl={4} xs={12}>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <TextField
                                      value={item.comment}
                                      fullWidth
                                      name={comment}
                                      label="Comment"
                                      variant="standard"
                                      onChange={formik.handleChange}
                                      helperText={
                                        touchedComment && errorComment
                                          ? errorComment
                                          : ""
                                      }
                                      error={Boolean(
                                        touchedComment && errorComment
                                      )}
                                    />
                                    <IconButton
                                      component="span"
                                      style={{ marginLeft: "0.5rem" }}
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <DeleteIcon style={{ color: red[700] }} />
                                    </IconButton>
                                  </div>
                                </Grid>
                              </Grid>
                            );
                          })}
                        </div>
                      )}
                    </FieldArray>
                  </div>

                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    style={{
                      margin: "2rem auto",
                      display: "block",
                      width: "50vw",
                    }}
                  >
                    Submit
                  </Button>
                </form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      </div>
    </Box>
  );
};

export default OrdersListToolbar;
