"use client";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import GTextInput from "@/components/input/GTextInput";
import { useFormikContext } from "formik";
import { AddTenderFormValues } from "./types";
import  Typography  from "@mui/material/Typography";

const TenderDescription = () => {
  const formik = useFormikContext<AddTenderFormValues>();
  
  return (
    <Box
      component="form"
      noValidate
      sx={{ p: 1, width: "auto", marginLeft: "1.5rem" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="gsub" color="gray.500">DETAILBESCHREIBUNG</Typography>
          <GTextInput
            id="detailDescription"
            placeholder="Bitte schreiben Sie hier Ihre Beschreibung"
            multiline
            rows={10}
            variant="outlined"
            fullWidth
            name="detailDescription"
            value={formik?.values?.detailDescription}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            error={
              formik?.touched?.detailDescription && Boolean(formik?.errors?.detailDescription)
            }
            helperText={
              formik?.touched?.detailDescription && formik?.errors?.detailDescription
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TenderDescription;
