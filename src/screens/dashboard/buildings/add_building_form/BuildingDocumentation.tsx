"use client";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LabelWithAsterisk from "@/components/label/LabelWithAsterisk";
import GTextInput from "@/components/input/GTextInput";
import Typography from "@mui/material/Typography";
import UploadButton from "@/components/button/UploadButton";
import UploadMultiButton from "@/components/button/UploadMultiButton";

const BuildingDocumentation = ({ formik }: { formik?: any }) => {
  return (
    <Box
      component="form"
      noValidate
      sx={{ p: 1, width: "auto", marginLeft: "1.5rem" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="gsub" color="gray.500">
            BAUUNTERLAGEN
          </Typography>
          <UploadMultiButton
            id="constructionDocs"
            name="constructionDocs"
            value={formik.values.constructionDocs}
            onChange={formik.handleChange}
            error={formik.touched.constructionDocs && Boolean(formik.errors.constructionDocs)}
            helperText={formik.touched.constructionDocs && formik.errors.constructionDocs}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="gsub" color="gray.500">
            GRUNDRISSE
          </Typography>
          <UploadMultiButton
            id="floorplanDocs"
            name="floorplanDocs"
            value={formik.values.floorplanDocs}
            onChange={formik.handleChange}
            error={formik.touched.floorplanDocs && Boolean(formik.errors.floorplanDocs)}
            helperText={formik.touched.floorplanDocs && formik.errors.floorplanDocs}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="gsub" color="gray.500">
            SONSTIGE DOKUMENTE
          </Typography>
          <UploadMultiButton
            id="otherDocs"
            name="otherDocs"
            value={formik.values.otherDocs}
            onChange={formik.handleChange}
            error={formik.touched.otherDocs && Boolean(formik.errors.otherDocs)}
            helperText={formik.touched.otherDocs && formik.errors.otherDocs}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="gsub" color="gray.500">
            SERVER-LINK HINZUFPGEN
          </Typography>
          <GTextInput
            placeholder="Geben Sie Ihre Link, e.g https://www.icloud.com/notes/xxxx"
            id="serverLink"
            name="serverLink"
            value={formik?.values.serverLink}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            error={
              formik?.touched?.serverLink && Boolean(formik?.errors?.serverLink)
            }
            helperText={formik?.touched?.serverLink && formik?.errors?.serverLink}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BuildingDocumentation;
