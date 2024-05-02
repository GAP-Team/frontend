"use client";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LabelWithAsterisk from "@/components/label/LabelWithAsterisk";
import GTextInput from "@/components/input/GTextInput";
import Typography from "@mui/material/Typography";
import UploadButton from "@/components/button/UploadButton";

const BuildingDocumentation = ({ formik }: { formik: any }) => {
  return (
    <Box
      component="form"
      noValidate
      sx={{ p: 1, width: "auto", marginLeft: "1.5rem" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LabelWithAsterisk>BAUUNTERLAGEN</LabelWithAsterisk>
          <UploadButton />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="gsub" color="gray.500">
            GRUNDRISSE
          </Typography>
          <UploadButton />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="gsub" color="gray.500">
            SONSTIGE DOKUMENTE
          </Typography>
          <UploadButton />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="gsub" color="gray.500">
            SERVER-LINK HINZUFPGEN
          </Typography>
          <GTextInput
            placeholder="Geben Sie Ihre Link, https://www.icloud.com/notes/xxxx"
            id="objektTag"
            name="objektTag"
            value={formik?.values.objektTag}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            error={
              formik?.touched.objektTag && Boolean(formik?.errors.objektTag)
            }
            helperText={formik?.touched.objektTag && formik?.errors.objektTag}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BuildingDocumentation;
