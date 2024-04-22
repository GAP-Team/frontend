import { Grid, Typography } from "@mui/material";
import UploadButton from "@/components/button/UploadButton";
import GTextInput from "@/components/input/GTextInput";

const ComercialPerson = ({formik}:any): JSX.Element => {
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
        <UploadButton />
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
          id="registrationnum"
          name="registrationnum"
          value={formik.values.registrationnum}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.registrationnum && Boolean(formik.errors.registrationnum)}
          helperText={formik.touched.registrationnum && formik.errors.registrationnum}
        />
      </Grid>
    </Grid>
  );
};

export default ComercialPerson;
