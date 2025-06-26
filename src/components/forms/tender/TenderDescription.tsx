"use client";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import GTextInput from "@/components/ui/input/GTextInput";
import { useFormikContext } from "formik";
import { AddTenderFormValues } from "./types";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const TenderDescription = (): JSX.Element => {
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
            DETAILBESCHREIBUNG
          </Typography>
          <GTextInput
            id="detailDescription"
            placeholder="Bitte schreiben Sie hier Ihre Beschreibung"
            multiline
            rows={8}
            variant="outlined"
            fullWidth
            name="detailDescription"
            value={formik?.values?.detailDescription}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            error={
              formik?.touched?.detailDescription &&
              Boolean(formik?.errors?.detailDescription)
            }
            helperText={
              formik?.touched?.detailDescription &&
              formik?.errors?.detailDescription
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="gsub" color="gray.500">
            ARBEITSSICHERHEITS-UNTERWEISUNG ERFORDERLICH
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                id="safetyWorkRequired"
                name="safetyWorkRequired"
                checked={formik?.values?.safetyWorkRequired}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
              />
            }
            label="Erforderlich"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="gsub" color="gray.500">
            KOSTENLOSE PARLPLÄTZE VERFÜGBAR
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                id="freeParkingAvailable"
                name="freeParkingAvailable"
                checked={formik?.values?.freeParkingAvailable}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
              />
            }
            label="Verfügbar"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TenderDescription;
