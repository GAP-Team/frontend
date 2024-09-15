import { Grid, Typography } from "@mui/material";

import UploadButton from "@/components/button/UploadButton";

const PrivatePerson = ({ formik }: any): JSX.Element => {
  const setUploadApprvDoc =  (ev: any): void => {
    formik.setFieldValue("approval_document_file", ev);
    formik.setFieldValue("approval_document", ev?.target.value);
  };

  const setUploadLandDoc =  (ev: any): void => {
    formik.setFieldValue("land_register_entry_document_file", ev);
    formik.setFieldValue("land_register_entry_document", ev?.target.value);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{ p: 1, width: "auto", marginLeft: "1.5rem" }}
    >
      <Grid item xs={12} sm={12}>
        <Typography variant="gsub" color="gray.500">
          GRUNDBUCHEINTRAG
        </Typography>
        <UploadButton
          id="land_register_entry_document"
          name="land_register_entry_document"
          onChange={(ev: any) => {
            setUploadLandDoc(ev);
          }}
          value={formik.values.land_register_entry_document}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant="gsub" color="gray.500">
          OR
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant="gsub" color="gray.500">
          GENEHMIGUNGSUNTERLAGEN
        </Typography>
        <UploadButton
          id="approval_document"
          name="approval_document"
          value={formik.values.approval_document}
          onChange={(ev: any) => {
            setUploadApprvDoc(ev);
          }}
          //make error message appear on private form too based on registration form
          error={
            formik.touched.registrationNumber &&
            Boolean(formik.errors.registrationNumber)
          }
          helperText={
            formik.touched.registrationNumber &&
            formik.errors.registrationNumber
          }
        />
      </Grid>
    </Grid>
  );
};

export default PrivatePerson;
