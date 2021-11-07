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
import { useIngredientsFetch } from "src/hooks/ingredient/useIngredientsFetch";
import axios from "axios";
import moment from "moment";
import { Alert } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import { useSingleProductRecipeFetch } from "src/hooks/product/useSingleProductRecipeFetch";
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
});
const validationSchema = yup.object({
  productName: yup.string("Enter product name").required(),
  price: yup
    .number()
    .required("Please enter price")
    .moreThan(0, "Please enter a valid price"),
  foodCost: yup.number(),
  timeCost: yup.number(),
  comment: yup.string("Enter comment for customer"),
  ingredients: yup.array().of(
    yup.object({
      name: yup.string().required("Please select an ingredient"),
      mass: yup
        .number("Please enter a valid number")
        .required()
        .moreThan(0, "Grams must be more than 0"),
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

const ProductEdit = ({ open, setOpen, product, productID }) => {
  const {
    state: Recipe,
    loading,
    error,
  } = useSingleProductRecipeFetch(productID);

  const [disable, setDisable] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const { state: ingredients } = useIngredientsFetch();
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
        Edit Product
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4">Product Infomation</Typography>
        <Formik
          initialValues={{
            productName: product.Name,
            price: product.Price,
            foodCost: product.FoodCost,
            timeCost: product.TimeCost,
            comment: product.Comment,
            ingredients: Array.from(Recipe).map((item) => {
              return {
                name: item.ID,
                mass: item.grams,
              };
            }),
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            //calculate the foodCost

            if (values.foodCost === product.FoodCost) {
              values.foodCost = 0;
              values.ingredients.map((item) => {
                ingredients.map((ingredient) => {
                  if (item.name == ingredient.ID) {
                    values.foodCost +=
                      (item.mass * ingredient.PricePerKG) / 1000;
                  }
                });
              });
            }

            const uniqueIngredients = new Set(
              values.ingredients.map((item) => item.name)
            );
            if (uniqueIngredients.size < values.ingredients.length) {
              values.foodCost = product.FoodCost;
              setShowError(true);
              setTimeout(() => {
                setShowError(false);
              }, 3000);
            } else {
              setDisable(true);

              axios
                .put("http://localhost:3004/products/updateProduct", {
                  productID: productID,
                  productName: values.productName,
                  price: values.price,
                  foodCost: values.foodCost,
                  timeCost: values.timeCost,
                  comment: values.comment,
                })
                .then(() => {
                  axios
                    .delete(
                      "http://localhost:3004/recipes/deleteRecipeDetail",
                      {
                        params: {
                          recipeID: productID,
                        },
                      }
                    )
                    .then(() => {
                      const allpromises = values.ingredients.map(
                        (ingredient) => {
                          const promise_axios = axios.post(
                            "http://localhost:3004/recipes/createRecipeIngredient",
                            {
                              recipeID: productID,
                              ingredientID: ingredient.name,
                              grams: ingredient.mass,
                            }
                          );
                          return promise_axios;
                        }
                      );
                      Promise.all(allpromises)
                        .then(() => {
                          setDisable(false);
                          setShowSuccess(true);
                          window.location.reload();
                        })
                        .catch(() => console.log("error"));
                    });
                });
            }
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
                      htmlFor="productName"
                      style={{
                        display: "block",
                        marginTop: "1.5rem",
                        marginBottom: "0.8rem",
                      }}
                    >
                      Product Name
                    </label>
                    <TextField
                      id="productName"
                      fullWidth
                      label="Product Name"
                      variant="standard"
                      value={formik.values.productName}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.productName &&
                        Boolean(formik.errors.productName)
                      }
                      helperText={
                        formik.touched.productName && formik.errors.productName
                      }
                    />
                  </Grid>

                  <Grid item lg={3} sm={6} xl={6} xs={12}>
                    <label
                      htmlFor="price"
                      style={{
                        display: "block",
                        marginTop: "1.5rem",
                        marginBottom: "0.8rem",
                      }}
                    >
                      Product Price
                    </label>
                    <TextField
                      id="price"
                      fullWidth
                      type="number"
                      label="Product Price"
                      variant="standard"
                      placeholder="Product Price"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.price && Boolean(formik.errors.price)
                      }
                      helperText={formik.touched.price && formik.errors.price}
                    />
                  </Grid>

                  <Grid item lg={3} sm={6} xl={6} xs={12}>
                    <label
                      htmlFor="foodCost"
                      style={{
                        display: "block",
                        marginTop: "1.5rem",
                        marginBottom: "0.8rem",
                      }}
                    >
                      Food Cost
                    </label>
                    <TextField
                      value={formik.values.foodCost}
                      id="foodCost"
                      fullWidth
                      type="number"
                      label="Keep original value to calculate automatically"
                      variant="standard"
                      onChange={formik.handleChange}
                      error={
                        formik.touched.foodCost &&
                        Boolean(formik.errors.foodCost)
                      }
                      helperText={
                        formik.touched.foodCost && formik.errors.foodCost
                      }
                    />
                  </Grid>

                  <Grid item lg={3} sm={6} xl={6} xs={12}>
                    <label
                      htmlFor="timeCost"
                      style={{
                        display: "block",
                        marginTop: "1.5rem",
                        marginBottom: "0.8rem",
                      }}
                    >
                      Time Cost
                    </label>
                    <TextField
                      value={formik.values.timeCost}
                      id="timeCost"
                      type="number"
                      fullWidth
                      label="Time Cost"
                      variant="standard"
                      onChange={formik.handleChange}
                      error={
                        formik.touched.timeCost &&
                        Boolean(formik.errors.timeCost)
                      }
                      helperText={
                        formik.touched.timeCost && formik.errors.timeCost
                      }
                    />
                  </Grid>
                </Grid>
              </div>

              <Typography variant="h4">Product Comment</Typography>
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

              <Typography variant="h4">Product Ingredients</Typography>
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
                <FieldArray name="ingredients">
                  {(arrayHelpers) => (
                    <div>
                      <Button
                        color="success"
                        variant="contained"
                        style={{ maxWidth: "10rem" }}
                        onClick={() =>
                          arrayHelpers.push({
                            name: "", //This is the ID of ingredient
                            mass: 0,
                          })
                        }
                        style={{ marginBottom: "0.5rem" }}
                      >
                        Add Ingredient
                      </Button>

                      {formik.values.ingredients.map((item, index) => {
                        const name = `ingredients[${index}].name`;
                        const touchedName = getIn(formik.touched, name);
                        const errorName = getIn(formik.errors, name);
                        const mass = `ingredients[${index}].mass`;
                        const touchedMass = getIn(formik.touched, mass);
                        const errorMass = getIn(formik.errors, mass);
                        return (
                          <Grid container spacing={3} key={index}>
                            <Grid item lg={6} sm={6} xl={6} xs={6}>
                              <TextField
                                select
                                fullWidth
                                label="Select"
                                onChange={formik.handleChange}
                                value={item.name}
                                name={name}
                                helperText={
                                  touchedName && errorName ? errorName : ""
                                }
                                error={Boolean(touchedName && errorName)}
                                variant="standard"
                                style={{ marginBottom: "1rem" }}
                              >
                                {ingredients.map((option) => (
                                  <MenuItem key={option.ID} value={option.ID}>
                                    {option.Name}
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
                                  value={item.mass}
                                  helperText={
                                    touchedMass && errorMass ? errorMass : ""
                                  }
                                  error={Boolean(touchedMass && errorMass)}
                                  fullWidth
                                  name={mass}
                                  label="Grams"
                                  variant="standard"
                                  onChange={formik.handleChange}
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
                    Update product successfully!
                  </Alert>
                )}
                {showError && (
                  <Alert severity="error" sx={{ position: "fixed", top: 0 }}>
                    Don't select duplicated ingredient!
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

export default ProductEdit;
