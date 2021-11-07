import DateFnsUtils from "@date-io/date-fns";
import { Box, Button, Card, CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import "date-fns";
import { useFormik } from "formik";
import moment from "moment";
import React from "react";
import * as yup from "yup";

const validationSchema = yup.object({
  FromDate: yup.date("Select a date").required(),
  ToDate: yup.date("Select another date").required(),
});
const ProfitToolbar = ({ setStartDate, setEndDate }) => {
  const formik = useFormik({
    initialValues: {
      FromDate: null,
      ToDate: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setStartDate(moment(values.FromDate).format("YYYY-MM-DD"));
      setEndDate(moment(values.ToDate).format("YYYY-MM-DD"));
    },
  });
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
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
                      value={formik.values.FromDate}
                      onChange={(value) =>
                        formik.setFieldValue("FromDate", value)
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
                      value={formik.values.ToDate}
                      onChange={(value) =>
                        formik.setFieldValue("ToDate", value)
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
    </Box>
  );
};

export default ProfitToolbar;
