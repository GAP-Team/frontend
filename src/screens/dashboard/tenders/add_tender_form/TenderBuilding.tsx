"use client";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LabelWithAsterisk from "@/components/label/LabelWithAsterisk";
import GTextInput from "@/components/input/GTextInput";
import { useFormikContext } from "formik";
import { AddTenderFormValues } from "./types";


const TenderBuilding = () => {
  const formik = useFormikContext<AddTenderFormValues>();

  return (
    <Box
      component="form"
      noValidate
      sx={{ p: 1, width: "auto", marginLeft: "1.5rem" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LabelWithAsterisk>NAME DES AUFTRAGGEBERS</LabelWithAsterisk>
          <GTextInput
            placeholder="Anschrift"
            id="clientName"
            name="clientName"
            value={formik?.values?.clientName}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            error={formik?.touched?.clientName && Boolean(formik?.errors?.clientName)}
            helperText={formik?.touched?.clientName && formik?.errors?.clientName}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TenderBuilding;

