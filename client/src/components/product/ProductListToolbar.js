import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Divider,
  Grid,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import lime from "@material-ui/core/colors/lime";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import "date-fns";
import Toolbar from "@material-ui/core/Toolbar";
import { Search as SearchIcon } from "react-feather";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { FieldArray, Formik, getIn } from "formik";
import * as yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";
import red from "@material-ui/core/colors/red";
import MenuItem from "@mui/material/MenuItem";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
});

const ingredients = [
  {
    value: "Milk",
    label: "Milk",
  },
  {
    value: "Sugar",
    label: "Sugar",
  },
  {
    value: "Flour",
    label: "Flour",
  },
  {
    value: "Coco",
    label: "Coco",
  },
];

const validationSchema = yup.object({
  productName: yup.string("Enter product name").required(),
  price: yup.number().required(),
  foodCost: yup.number(),
  timeCost: yup.number(),
  comment: yup.string("Enter comment for customer"),
  ingredients: yup.array().of(
    yup.object({
      name: yup.string().required("Please select an ingredient"),
      mass: yup.number().required(),
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

const ProductListToolbar = (props) => {
  const [open, setOpen] = React.useState(false);
  // const [ingredient, setIngredient] = React.useState("");
  // const [number, setNumber] = useState(0);

  // const handleChange = (event) => {
  //   setIngredient(event.target.value);
  // };
  // const formik = useFormik({
  //   initialValues: {
  //     productName: "",
  //     price: 0,
  //     foodCost: 0,
  //     timeCost: 0,
  //     comment: "",
  //     ingredients: [],
  //   },
  //   validationSchema: validationSchema,
  //   onSubmit: (values) => {
  //     alert(JSON.stringify(values, null, 2));
  //   },
  // });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ mb: 3 }}>
      <Box>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
        >
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
              Add product
            </Button>
          </Box>
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
                placeholder="Search product"
                variant="outlined"
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
            New Product
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
                productName: "",
                price: 0,
                foodCost: 0,
                timeCost: 0,
                comment: "",
                ingredients: [],
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
                            formik.touched.productName &&
                            formik.errors.productName
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
                          value={formik.values.price}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.price && Boolean(formik.errors.price)
                          }
                          helperText={
                            formik.touched.price && formik.errors.price
                          }
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
                          label="Food Cost"
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
                                name: "",
                                mass: 0,
                                id: Math.random(),
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
                            const touchedMass = getIn(formik.touch, mass);
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
                                      <MenuItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
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
                                      fullWidth
                                      name={mass}
                                      label="Mass"
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
                </form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      </div>
    </Box>
  );
};

export default ProductListToolbar;
