import React from "react";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import GTextInput from "@/components/ui/input/GTextInput";
import LabelWithAsterisk from "@/components/ui/label/LabelWithAsterisk";
import { numOfEmployeesOptions } from "@/utils/Constants";
import UploadMultiButton from "@/components/ui/button/UploadMultiButton";

const ExpertiseServiceProvider = ({ formik }: any): JSX.Element => {
  return (
    <Grid
      container
      spacing={2}
      sx={{ p: 1, width: "auto", marginLeft: "1.5rem" }}
    >
      <Grid item xs={12} sm={12}>
        <LabelWithAsterisk>ANZAHL VON MITARBEITERN</LabelWithAsterisk>

        <FormControl sx={{ display: "block" }}>
          <RadioGroup
            id="numOfEmployees"
            name="numOfEmployees"
            value={formik?.values?.numOfEmployees}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <Grid container>
              {numOfEmployeesOptions?.map((option, index) => (
                <Grid key={index} item xs={2}>
                  <FormControlLabel
                    value={option?.value}
                    control={<Radio />}
                    label={option?.label}
                  />
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant="gsub" color="gray.500">
          HERSTELLERFAHRUNG
        </Typography>
        <GTextInput
          id="manufacturerExperience"
          placeholder="Bitte schreiben Sie hier Ihre Beschreibung"
          multiline
          rows={5}
          variant="outlined"
          fullWidth
          name="manufacturerExperience"
          value={formik?.values?.manufacturerExperience}
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          error={
            formik?.touched?.manufacturerExperience &&
            Boolean(formik?.errors?.manufacturerExperience)
          }
          helperText={
            formik?.touched?.manufacturerExperience &&
            formik?.errors?.manufacturerExperience
          }
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <LabelWithAsterisk>
          FACH QUALIFIKATION (z.b. URKUNDE, LENBENSLAUF, ARBEITSZEUGNIS)
        </LabelWithAsterisk>
        <UploadMultiButton
          id="qualificationDocs"
          name="qualificationDocs"
          value={formik.values.qualificationDocs}
          onChange={formik.handleChange}
          error={
            formik.touched.qualificationDocs &&
            Boolean(formik.errors.qualificationDocs)
          }
          helperText={
            formik.touched.qualificationDocs &&
            formik.errors.qualificationDocs?.toString()
          }
        />
      </Grid>
    </Grid>
  );
};

export default ExpertiseServiceProvider;
