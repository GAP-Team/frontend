"use client";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormikContext } from "formik";
import { AddTenderFormValues } from "./types";
import HelpIconButton from "@/components/button/HelpIconButton";
import { HELP_ICON_BUTTON_COLOR } from "@/utils/Constants";

const TenderClassification = (): JSX.Element => {
  const formik = useFormikContext<AddTenderFormValues>();

  return (
    <Box
      component="form"
      noValidate
      sx={{ p: 1, width: "auto", marginLeft: "1.5rem" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="gsub" color="gray.500">
            DRINGLICHKEIT
            <HelpIconButton
              iconColor={HELP_ICON_BUTTON_COLOR.GREY}
              helpText="The helper text will be displayed here."
            />
          </Typography>
          <FormControl sx={{ display: "block", mt: 1 }}>
            <RadioGroup
              row
              id="urgency"
              name="urgency"
              value={formik?.values?.urgency}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
            >
              <FormControlLabel
                value="Nicht Dringend"
                control={<Radio />}
                label="Nicht Dringend"
                sx={{ marginBottom: 0 }}
              />
              <FormControlLabel
                value="Dringend"
                control={<Radio />}
                label="Dringend"
                sx={{ marginBottom: 0 }}
              />
              <FormControlLabel
                value="Frist Bauamt"
                control={<Radio />}
                label="Frist Bauamt"
                sx={{ marginBottom: 0 }}
              />
              <FormControlLabel
                value="Eröffnungstermin"
                control={<Radio />}
                label="Eröffnungstermin"
                sx={{ marginBottom: 0 }}
              />
              <FormControlLabel
                value="Übergabe an Bauherren/Kunden"
                control={<Radio />}
                label="Übergabe an Bauherren/Kunden"
                sx={{ marginBottom: 0 }}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="gsub" color="gray.500">
            GEWÜNSCHTES ZEITFENSTER VON
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box mt={1}>
              <DatePicker
                disablePast
                name="fromDate"
                label="Zeitfenster von"
                format="DD.MM.YYYY"
                value={formik?.values?.fromDate}
                onChange={(value) => formik?.setFieldValue("fromDate", value)}
              />
            </Box>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="gsub" color="gray.500">
            GEWÜNSCHTES ZEITFENSTER BIS
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box mt={1}>
              <DatePicker
                disablePast
                name="toDate"
                label="Zeitfenster bis"
                format="DD.MM.YYYY"
                value={formik?.values?.toDate}
                disabled={!formik?.values?.fromDate}
                onChange={(value) => formik?.setFieldValue("toDate", value)}
              />
            </Box>
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TenderClassification;
