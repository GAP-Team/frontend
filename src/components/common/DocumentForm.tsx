"use client";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import { useFormikContext } from "formik";
import GTextInput from "@/components/inputs/GTextInput";
import { Documents, HELP_ICON_BUTTON_COLOR } from "@/utils/Constants";
import UploadMultiButton from "@/components/inputs/button/UploadMultiButton";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Typography,
} from "@mui/material";
import { DocumentChoice } from "@/utils/enums";
import HelpIcon from "@/components/icons/HelpIcon";

interface CustomDocumentationProps {
  formikValue: any;
  documentFor: string;
}

const DocumentForm = ({
  formikValue,
  documentFor,
}: CustomDocumentationProps): JSX.Element => {
  const formik = useFormikContext<Documents>();

  useEffect(() => {
    if (formikValue.documentChoice !== DocumentChoice.UPLOAD_NOW) {
      formik.setFieldValue("constructionDocs", []);
      formik.setFieldValue("floorplanDocs", []);
      formik.setFieldValue("otherDocs", []);
      formik.setFieldValue("checkReports", []);
    }

    if (formikValue.documentChoice !== DocumentChoice.SERVER_LINK) {
      formik.setFieldValue("serverLink", "");
    }
  }, [formikValue.documentChoice]);

  return (
    <Box noValidate component="form" style={styles.boxContainer}>
      <Grid container spacing={1} ml={0.1}>
        <FormControl sx={{ display: "block" }}>
          <RadioGroup
            id="documentChoice"
            name="documentChoice"
            value={formik?.values.documentChoice}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <FormControlLabel
                  value={DocumentChoice.UPLOAD_NOW}
                  control={<Radio />}
                  label={
                    <Typography>
                      Jetzt hochladen{" "}
                      <span style={styles.highlightText}>Empfohlen</span>
                    </Typography>
                  }
                />
                <HelpIcon
                  iconColor={HELP_ICON_BUTTON_COLOR.GREY}
                  helpText="The helper text will be displayed here."
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  value={DocumentChoice.NO_DOCUMENTS}
                  control={<Radio />}
                  label="Keine Dokumente vorhanden"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  value={DocumentChoice.PER_EMAIL}
                  control={<Radio />}
                  label="Per email versenden"
                />
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <FormControlLabel
                  value={DocumentChoice.SERVER_LINK}
                  control={<Radio />}
                  label={<Typography>Server verküpfung{""}</Typography>}
                />
                <HelpIcon
                  iconColor={HELP_ICON_BUTTON_COLOR.GREY}
                  helpText="The helper text will be displayed here."
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  value={DocumentChoice.ON_SITE}
                  control={<Radio />}
                  label="Dokumente vor Ort zur Verfügung stellen"
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      </Grid>
      {formik.values.documentChoice === DocumentChoice.UPLOAD_NOW && (
        <>
          <Grid item xs={12}>
            {documentFor === "facility" ? (
              <>
                <Typography variant="gsub" color="gray.500">
                  Berichte (Prüf- und Wartungsberichte)
                </Typography>
                <UploadMultiButton
                  id="checkReports"
                  name="checkReports"
                  value={formik.values.checkReports}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.checkReports &&
                    Boolean(formik.errors.checkReports)
                  }
                  helperText={
                    formik.touched.checkReports &&
                    formik.errors.checkReports?.toString()
                  }
                />
              </>
            ) : (
              <>
                <Typography variant="gsub" color="gray.500">
                  BAUUNTERLAGEN
                </Typography>
                <UploadMultiButton
                  id="constructionDocs"
                  name="constructionDocs"
                  value={formik.values.constructionDocs}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.constructionDocs &&
                    Boolean(formik.errors.constructionDocs)
                  }
                  helperText={
                    formik.touched.constructionDocs &&
                    formik.errors.constructionDocs?.toString()
                  }
                />
              </>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="gsub" color="gray.500">
              Grundrisse & Schema
            </Typography>
            <UploadMultiButton
              id="floorplanDocs"
              name="floorplanDocs"
              value={formik.values.floorplanDocs}
              onChange={formik.handleChange}
              error={
                formik.touched.floorplanDocs &&
                Boolean(formik.errors.floorplanDocs)
              }
              helperText={
                formik.touched.floorplanDocs &&
                formik.errors.floorplanDocs?.toString()
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="gsub" color="gray.500">
              Sonstiges (Berechnungen, Bescheinigungen)
            </Typography>
            <UploadMultiButton
              id="otherDocs"
              name="otherDocs"
              value={formik.values.otherDocs}
              onChange={formik.handleChange}
              error={
                formik.touched.otherDocs && Boolean(formik.errors.otherDocs)
              }
              helperText={
                formik.touched.otherDocs && formik.errors.otherDocs?.toString()
              }
            />
          </Grid>
        </>
      )}
      {formik.values.documentChoice === DocumentChoice.SERVER_LINK && (
        <Grid item xs={12}>
          <Typography variant="gsub" color="gray.500">
            SERVER-LINK HINZUFPGEN
          </Typography>
          <GTextInput
            placeholder="Geben Sie Ihre Link, e.g https://www.icloud.com/notes/xxxx"
            id="serverLink"
            name="serverLink"
            value={formik.values.serverLink}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.serverLink && Boolean(formik.errors.serverLink)
            }
            helperText={formik.touched.serverLink && formik.errors.serverLink}
          />
        </Grid>
      )}
    </Box>
  );
};

export default DocumentForm;

const styles = {
  boxContainer: { p: 1, width: "auto", marginLeft: "1.5rem" },
  highlightText: { fontWeight: "600", color: "#22A7F1" },
};
