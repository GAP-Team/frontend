import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";

import { handleUploadDoc } from "@/utils/uploadToS3";
import GTextInput from "@/components/input/GTextInput";
import UploadButton from "@/components/button/UploadButton";

const ComercialPerson = ({formik}:any): JSX.Element => {

  const [ isRegNumNeed, setIsRegNumNeed ] = useState<Boolean>(true);

  const handleS3 = async (ev: any) => {
    
    console.log("Files: ===---> ", ev); //return;
    
    let uploadStat = await handleUploadDoc(ev);

    if (uploadStat) {
      const { name, key } = uploadStat;
      
      formik.setFieldValue("business_registration_doc", name);
      formik.setFieldValue("business_registration_doc_key", key);

      setIsRegNumNeed(false);

    } else {
      alert("Document not uploaded, try again later");
    }
  }

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
           id="business_registration_doc"
           name="business_registration_doc"
          value={formik.values.business_registration_doc}
          onChange={(ev:any) => { handleS3(ev) }}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant="gsub" color="gray.500">
          OR
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant="gsub" color="gray.500">
          HANDELREGISTERNUMMER
        </Typography>
        <GTextInput
          placeholder="HANDELREGISTERNUMMER"
          id="registrationNumber"
          name="registrationNumber"
          value={formik.values.registrationNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          // error={formik.touched.registrationNumber && Boolean(isRegNumNeed)}
          helperText={formik.touched.registrationNumber && formik.errors.registrationNumber}
          error={formik.touched.registrationNumber && Boolean(formik.errors.registrationNumber)}
        />
      </Grid>
    </Grid>
  );
};

export default ComercialPerson;
