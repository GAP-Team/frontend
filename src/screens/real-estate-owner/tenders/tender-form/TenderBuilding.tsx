"use client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import { useFormikContext } from "formik";
import { FormControlLabel, RadioGroup } from "@mui/material";
import { TenderFormValues } from "./types";
import { ObjectFacilityMode } from "@/utils/enums";
import TenderExistingObjectFacility from "./TenderExistingObjectFacility";
import TenderNewObjectFacility from "./TenderNewObjectFacility";

const TenderBuilding = (): JSX.Element => {
  const formik = useFormikContext<TenderFormValues>();

  return (
    <Box
      component="form"
      noValidate
      sx={{ p: 1, width: "auto", marginLeft: "1.5rem" }}
    >
      <Grid container spacing={2} sx={{ marginBottom: "0.5rem" }}>
        <Grid item xs={12}>
          <RadioGroup
            name="objectFacilityMode"
            value={formik.values.objectFacilityMode}
            onChange={formik.handleChange}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  value={ObjectFacilityMode.EXISTING}
                  control={<Radio />}
                  label="Bestehendes Objekt & Anlage auswählen"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  value={ObjectFacilityMode.NEW}
                  control={<Radio />}
                  label="Neues Objekt & Anlage anlegen"
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </Grid>
      </Grid>
      {formik.values.objectFacilityMode === ObjectFacilityMode.EXISTING ? (
        <TenderExistingObjectFacility />
      ) : (
        <TenderNewObjectFacility />
      )}
    </Box>
  );
};

export default TenderBuilding;
