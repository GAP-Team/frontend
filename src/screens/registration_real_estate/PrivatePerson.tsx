import { Grid, Typography } from "@mui/material";
import UploadButton from "@/components/button/UploadButton";

const PrivatePerson = ({formik}:any): JSX.Element => {
  return (
    <Grid container spacing={2} sx={{ p: 1, width: 'auto', marginLeft: '1.5rem' }}>
      <Grid item xs={12} sm={12}>
        <Typography variant="gsub" color="gray.500">
          GRUNDBUCHEINTRAG
        </Typography>
        <UploadButton
          id="landdoc"
          name="landdoc"
          value={formik.values.landdoc}
          onChange={(ev:any) => { formik.setFieldValue("landdoc", ev?.target?.files[0]?.name) }}
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
          id="approvdoc"
          name="approvdoc"
          value={formik.values.approvdoc}
          onChange={(ev:any) => { formik.setFieldValue("approvdoc", ev?.target?.files[0]?.name) }}
        />
      </Grid>
    </Grid>
  );
};

export default PrivatePerson;
