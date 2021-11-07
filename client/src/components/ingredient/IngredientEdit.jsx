import { Alert, Button, Grid, TextField } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import "date-fns";
import { Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
});

const validationSchema = yup.object({
  ingredientName: yup.string("Enter ingredient name").required(),
  price: yup.number("Enter ingredient price per kg").required(),
  comment: yup.string("Enter comment"),
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

const IngredientEdit = ({ open, setOpen, ingredient, ingredientID }) => {
  console.log(ingredient);
  const [disable, setDisable] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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
        Edit ingredient
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4">Ingredient Infomation</Typography>
        <Formik
          initialValues={{
            ingredientName: ingredient.Name,
            price: ingredient.PricePerKG,
            comment: ingredient.Note,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setDisable(true);
            axios
              .put("http://localhost:3004/ingredients/updateIngredient", {
                ingredientID: ingredientID,
                name: values.ingredientName,
                price: values.price,
                note: values.comment,
              })
              .then(() => {
                setDisable(false);
                setShowSuccess(true);
                window.location.reload();
              })
              .catch(() => console.log("error"));
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
                      htmlFor="name"
                      style={{
                        display: "block",
                        marginTop: "1.5rem",
                        marginBottom: "0.8rem",
                      }}
                    >
                      Ingredient Name
                    </label>
                    <TextField
                      id="ingredientName"
                      fullWidth
                      label="Name"
                      variant="standard"
                      value={formik.values.ingredientName}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.ingredientName &&
                        Boolean(formik.errors.ingredientName)
                      }
                      helperText={
                        formik.touched.ingredientName &&
                        formik.errors.ingredientName
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
                      Price / Kg
                    </label>
                    <TextField
                      id="price"
                      fullWidth
                      label="Price"
                      variant="standard"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.price && Boolean(formik.errors.price)
                      }
                      helperText={formik.touched.price && formik.errors.price}
                    />
                  </Grid>
                </Grid>
              </div>

              <Typography variant="h4">Ingredient Note</Typography>
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
                  label="Note"
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
                disabled={disable ? true : false}
                style={{ margin: "2rem auto", display: "block", width: "50vw" }}
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
                    Update ingredient successfully!
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

export default IngredientEdit;
