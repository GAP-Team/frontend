import { Grid, Typography } from "@mui/material";

import UploadButton from "@/components/inputs/button/UploadButton";

const PrivatePerson = ({ formik }: any): JSX.Element => {
  const setUploadApprvDoc = (ev: any): void => {
    formik.setFieldValue("approvalDocumentFile", ev?.target.files[0]);
    formik.setFieldValue("approvalDocument", ev?.target.files[0].name);
  };

  const setUploadLandDoc = (ev: any): void => {
    formik.setFieldValue("landRegisterEntryDocumentFile", ev?.target.files[0]);
    formik.setFieldValue("landRegisterEntryDocument", ev?.target.files[0].name);
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
          id="landRegisterEntryDocument"
          name="landRegisterEntryDocument"
          onChange={(ev: any) => {
            setUploadLandDoc(ev);
          }}
          value={formik.values.landRegisterEntryDocument}
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
          id="approvalDocument"
          name="approvalDocument"
          value={formik.values.approvalDocument}
          onChange={(ev: any) => {
            setUploadApprvDoc(ev);
          }}
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
