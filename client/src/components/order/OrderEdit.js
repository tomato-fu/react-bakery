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
import DialogContentText from "@mui/material/DialogContentText";

import red from "@material-ui/core/colors/red";
import CloseIcon from "@material-ui/icons/Close";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import React, { useState, useEffect } from "react";
import { useFormik, Formik, getIn, FieldArray } from "formik";
import * as yup from "yup";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { Search as SearchIcon } from "react-feather";
import { useCustomersFetch } from "src/hooks/customer/useCutomersFetch";
import { usePaymentTypeFetch } from "src/hooks/payment/usePaymentTypeFetch";
import { useProductsFetch } from "src/hooks/product/useProductsFetch";
import axios from "axios";
import moment from "moment";
import { Alert } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import SearchBar from "./SearchBar";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
});
const validationSchema = yup.object({
  customer: yup.string("Select a customer").required(),
  plcedDate: yup.date("Select a palced date").required(),
  pickTime: yup.date("Select a pick time").required(),
  amount: yup.number("Enter payment amount"),
  comment: yup.string("Enter order comment"),
  payment: yup.array().of(
    yup.object({
      ID: yup
        .string("Select a payment method")
        .required("Select a payment method"),
      Amount: yup
        .number("Enter payment amount")
        .moreThan(0, "Please enter a valid value"),
    })
  ),
  products: yup.array().of(
    yup.object({
      product_id: yup
        .string("Select a product")
        .required("Please select a product"),
      Quantity: yup
        .number("Enter product quantity")
        .moreThan(0, "Please enter a valid value")
        .required("Please enter a quantity"),
      Comment: yup.string("Enter comment"),
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

const OrderEdit = ({ open, setOpen, order, product, payment, orderID }) => {
  const { state: customers } = useCustomersFetch();
  const { state: paymentTypes } = usePaymentTypeFetch();
  const { state: products } = useProductsFetch();

  const [disable, setDisable] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showDuplicate, setShowDuplicate] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullScreen={true}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Edit order
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
            customer: order.Customer_ID,
            plcedDate: new Date(moment(order.DatePlaced).format("MM/DD/YYYY")),
            pickTime: new Date(
              moment(order.PickupTime).format("MM/DD/YYYY HH:mm")
            ),
            amount: order.Amount,
            comment: order.Comment,
            payment: Array.from(payment),
            products: Array.from(product).map((item) => {
              return {
                Comment: item.Comment,
                Quantity: item.Quantity,
                product_id: item.product_id,
              };
            }),
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            let totalPoints = 0;
            let points = {};

            //calculate the foodCost
            if (values.amount === order.Amount) {
              values.amount = 0;
              values.products.map((item) => {
                products.map((product) => {
                  if (item.product_id == product.ID) {
                    values.amount += item.Quantity * product.Price;
                  }
                });
              });
            }
            axios
              .get("http://localhost:3004/customers/getPoints", {
                params: {
                  customerID: values.customer,
                },
              })
              .then((res) => (points = res.data[0]))
              .then(() => {
                if (Array.from(points).length === 2 && points !== undefined) {
                  totalPoints =
                    Array.from(points)[0].total - Array.from(points)[1].total;
                } else if (
                  Array.from(points).length === 1 &&
                  points !== undefined
                ) {
                  totalPoints = Array.from(points)[0].total;
                }

                const result = values.payment.find((item) => item.ID === 3) || {
                  Amount: 0,
                };
                const oldPoints = payment.find((item) => item.ID === 3) || {
                  Amount: 0,
                };
                const pointsNeeded = result.Amount - oldPoints.Amount;

                const uniqueProducts = new Set(
                  values.products.map((item) => item.product_id)
                );

                if (pointsNeeded > totalPoints) {
                  values.amount = order.Amount;
                  setShowError(true);
                  setTimeout(() => {
                    setShowError(false);
                  }, 3000);
                } else if (uniqueProducts.size < values.products.length) {
                  values.amount = order.Amount;
                  setShowDuplicate(true);
                  setTimeout(() => {
                    setShowDuplicate(false);
                  }, 3000);
                } else {
                  setDisable(true);

                  axios
                    .put("http://localhost:3004/orders/updateOrder", {
                      orderID: orderID,
                      customer: values.customer,
                      placedDate: moment(values.plcedDate).format("YYYY-MM-DD"),
                      pickTime: moment(values.pickTime).format(
                        "YYYY-MM-DD HH:mm:ss"
                      ),
                      fullFilled: order.Fulfilled,
                      comment: values.comment,
                      amount: values.amount,
                    })
                    .then(() => {
                      axios
                        .delete(
                          "http://localhost:3004/payments/deletePayment",
                          {
                            params: {
                              orderID: orderID,
                            },
                          }
                        )
                        .then(() => {
                          const allPromises = values.payment.map((type) => {
                            const promise_axios = axios.post(
                              "http://localhost:3004/payments/createPayement",
                              {
                                orderID: orderID,
                                PaymentTypeID: type.ID,
                                Amount: type.Amount,
                              }
                            );
                            return promise_axios;
                          });
                          Promise.all(allPromises).then(() => {
                            axios
                              .delete(
                                "http://localhost:3004/orders/deleteOrderDetail",
                                {
                                  params: {
                                    orderID: orderID,
                                  },
                                }
                              )
                              .then(() => {
                                const allPromises = values.products.map(
                                  (product) => {
                                    const promise_axios = axios.post(
                                      "http://localhost:3004/orders/createOrderDetail",
                                      {
                                        orderID: orderID,
                                        productID: product.product_id,
                                        quantity: product.Quantity,
                                        comment: product.Comment,
                                        priceAtSale: products.find(
                                          ({ ID }) => ID == product.product_id
                                        ).Price,
                                        foodCostAtSale: products.find(
                                          ({ ID }) => ID == product.product_id
                                        ).FoodCost,
                                      }
                                    );
                                    return promise_axios;
                                  }
                                );
                                Promise.all(allPromises)
                                  .then(() => {
                                    setDisable(false);
                                    setShowSuccess(true);
                                    window.location.reload();
                                  })
                                  .catch(() => console.log("error"));
                              });
                          });
                        });
                    });
                }
              });
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
                        <MenuItem key={option.ID} value={option.ID}>
                          {option.CustomerName}
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
                      label="Keep original value to calculate automatically"
                      variant="standard"
                      value={formik.values.amount}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.amount && Boolean(formik.errors.amount)
                      }
                      helperText={formik.touched.amount && formik.errors.amount}
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
                            ID: "",
                            Amount: 0,
                          })
                        }
                        style={{ marginBottom: "0.5rem" }}
                      >
                        Add Payment
                      </Button>

                      {formik.values.payment.map((item, index) => {
                        const method = `payment[${index}].ID`;
                        const touchedMethod = getIn(formik.touched, method);
                        const errorMethod = getIn(formik.errors, method);
                        const amount = `payment[${index}].Amount`;
                        const touchedAmount = getIn(formik.touched, amount);
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
                                value={item.ID}
                                name={method}
                                helperText={
                                  touchedMethod && errorMethod
                                    ? errorMethod
                                    : ""
                                }
                                error={Boolean(touchedMethod && errorMethod)}
                                variant="standard"
                              >
                                {paymentTypes.map((option) => (
                                  <MenuItem key={option.ID} value={option.ID}>
                                    {option.Type}
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
                                  value={item.Amount}
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
                                  error={Boolean(touchedAmount && errorAmount)}
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
                            product_id: "",
                            Quantity: 0,

                            Comment: "",
                          })
                        }
                        style={{ marginBottom: "0.5rem" }}
                      >
                        Add Product
                      </Button>

                      {formik.values.products.map((item, index) => {
                        const product = `products[${index}].product_id`;
                        const touchedProduct = getIn(formik.touched, product);
                        const errorProduct = getIn(formik.errors, product);
                        const quantity = `products[${index}].Quantity`;
                        const touchedQuantity = getIn(formik.touched, quantity);
                        const errorQuantity = getIn(formik.errors, quantity);

                        const comment = `products[${index}].Comment`;
                        const touchedComment = getIn(formik.touched, comment);
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
                                value={item.product_id}
                                name={product}
                                helperText={
                                  touchedProduct && errorProduct
                                    ? errorProduct
                                    : ""
                                }
                                error={Boolean(touchedProduct && errorProduct)}
                                variant="standard"
                                style={{ marginBottom: "1rem" }}
                              >
                                {products.map((option) => (
                                  <MenuItem key={option.ID} value={option.ID}>
                                    {option.Name}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Grid>

                            <Grid item lg={4} sm={4} xl={4} xs={6}>
                              <TextField
                                type="number"
                                value={item.Quantity}
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
                                  value={item.Comment}
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
                {disable && (
                  <CircularProgress sx={{ position: "fixed", top: 0 }} />
                )}
                {showSuccess && (
                  <Alert severity="success" sx={{ position: "fixed", top: 0 }}>
                    Update order successfully!
                  </Alert>
                )}

                {showError && (
                  <Alert severity="error" sx={{ position: "fixed", top: 0 }}>
                    Customer's points are not enough for this payment!
                  </Alert>
                )}

                {showDuplicate && (
                  <Alert severity="error" sx={{ position: "fixed", top: 0 }}>
                    Don't select duplicated product!
                  </Alert>
                )}
              </div>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default OrderEdit;
