import React from "react";
import { Grid, Typography } from "@mui/material";

import GTextInput from "@/components/input/GTextInput";
import UploadButton from "@/components/button/UploadButton";

const ComercialPerson = ({ formik }: any): JSX.Element => {
  const setUploadDoc = (ev: any): void => {
    const file = ev.target.files[0];
    formik.setFieldValue("businessRegistrationDocumentFile", file);
    formik.setFieldValue("businessRegistrationDocument", file.name);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{ p: 1, width: "auto", marginLeft: "1.5rem" }}
    >
      <Grid item xs={12} sm={12}>
        <Typography variant="gsub" color="gray.500">
          GEWERBEANMELDUNG
        </Typography>
        <UploadButton
          id="businessRegistrationDocument"
          name="businessRegistrationDocument"
          onChange={(ev: any) => {
            setUploadDoc(ev);
          }}
          value={formik.values.businessRegistrationDocument}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant="gsub" color="gray.500">
          OR
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant="gsub" color="gray.500">
          HANDELSREGISTERNUMMER
        </Typography>
        <GTextInput
          placeholder="HANDELSREGISTERNUMMER"
          id="registrationNumber"
          name="registrationNumber"
          value={formik.values.registrationNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          // error={formik.touched.registrationNumber && Boolean(isRegNumNeed)}
          helperText={
            formik.touched.registrationNumber &&
            formik.errors.registrationNumber
          }
          error={
            formik.touched.registrationNumber &&
            Boolean(formik.errors.registrationNumber)
          }
        />
      </Grid>
    </Grid>
  );
};

export default ComercialPerson;
