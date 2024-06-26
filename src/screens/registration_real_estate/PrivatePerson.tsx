import { Grid, Typography } from "@mui/material";

import { handleUploadDoc } from "@/utils/uploadToS3";
import UploadButton from "@/components/button/UploadButton";

const PrivatePerson = ({formik}:any): JSX.Element => {

  const handleS3ApprvDoc = async (ev: any) => {

    let uploadStat = await handleUploadDoc(ev);

    if (uploadStat) {
      const { name, key } = uploadStat;
      
      formik.setFieldValue("approval_document", name);
      formik.setFieldValue("approval_document_key", key);

    } else {
      alert("Document not uploaded, try again later");
    }
  }
  const handleS3LandDoc = async (ev: any) => {

    let uploadStat = await handleUploadDoc(ev);

    if (uploadStat) {
      const { name, key } = uploadStat;
      
      formik.setFieldValue("land_register_entry_document", name);
      formik.setFieldValue("land_register_entry_document_key", key);

    } else {
      alert("Document not uploaded, try again later");
    }
  }

  return (
    <Grid container spacing={2} sx={{ p: 1, width: 'auto', marginLeft: '1.5rem' }}>
      <Grid item xs={12} sm={12}>
        <Typography variant="gsub" color="gray.500">
          GRUNDBUCHEINTRAG
        </Typography>
        <UploadButton
          id="land_register_entry_document"
          name="land_register_entry_document"
          value={formik.values.land_register_entry_document}
          onChange={(ev:any) => { handleS3LandDoc(ev) }}
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
          onChange={(ev: any) => { handleS3ApprvDoc(ev) }}
          //make error message appear on private form too based on registration form
          error={formik.touched.registrationnum && Boolean(formik.errors.registrationnum)}
          helperText={formik.touched.registrationnum && formik.errors.registrationnum}
        />
      </Grid>
    </Grid>
  );
};

export default PrivatePerson;
