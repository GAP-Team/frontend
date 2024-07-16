'use client';
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import GTextInput from "@/components/input/GTextInput";
import { useFormikContext } from "formik";
import { AddTenderFormValues } from "./types";

const TenderClassification = () => {
  const formik = useFormikContext<AddTenderFormValues>();

  return (
    <Box
      component="form"
      noValidate
      sx={{ p: 1, width: "auto", marginLeft: "1.5rem" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="gsub" color="gray.500">DRINGLICHKEIT</Typography>
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
                value="Frist Feuerwehr"
                control={<Radio />}
                label="Frist Feuerwehr"
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
          <Typography variant="gsub" color="gray.500">ZEITFENSTER VON</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box mt={1}>
            <DatePicker
              name="fromDate"
              label="Zeitfenster von"
              value={formik?.values?.fromDate}
              onChange={(value) => formik?.setFieldValue('fromDate', value)}
            />
          </Box>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="gsub" color="gray.500">ZEITFENSTER BIS</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box mt={1}>
            <DatePicker
              name="toDate"
              label="Zeitfenster bis"
              value={formik?.values?.toDate}
              onChange={(value) => formik?.setFieldValue('toDate', value)}
            />
          </Box>
          </LocalizationProvider>
        </Grid>
      
      </Grid>
    </Box>
  );
};

export default TenderClassification;
