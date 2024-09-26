"use client";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import { useFormikContext } from "formik";
import { AddTenderFormValues } from "./types";
import UploadMultiButton from "@/components/button/UploadMultiButton";
import GTextInput from "@/components/input/GTextInput";

const TenderDocumentation = (): JSX.Element => {
  const formik = useFormikContext<AddTenderFormValues>();
  return (
    <Box
      component="form"
      noValidate
      sx={{ p: 1, width: "auto", marginLeft: "1.5rem" }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="gsub" color="gray.500">
            DOKUMENTE
          </Typography>
          <FormControl sx={{ display: "block" }}>
            <RadioGroup
              id="documentChoice"
              name="documentChoice"
              value={formik.values.documentChoice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <Grid container spacing={0.5}>
                <Grid item xs={4}>
                  <FormControlLabel
                    value="Jetzt hochladen Empfohlen"
                    control={<Radio />}
                    label={
                      <Typography>
                        Jetzt hochladen{" "}
                        <span style={{ fontWeight: "600", color: "#22A7F1" }}>
                          Empfohlen
                        </span>
                      </Typography>
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    value="Keine Dokumente vorhanden"
                    control={<Radio />}
                    label="Keine Dokumente vorhanden"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    value="Per email versenden"
                    control={<Radio />}
                    label="Per email versenden"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    value="Server verküpfung"
                    control={<Radio />}
                    label="Server verküpfung"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    value="Dokumente vor Ort zur Verfügung stellen"
                    control={<Radio />}
                    label="Dokumente vor Ort zur Verfügung stellen"
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
        </Grid>
        {formik.values.documentChoice === "Jetzt hochladen Empfohlen" && (
          <>
            <Grid item xs={12}>
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
                SONSTIGE DOKUMENTE
              </Typography>
              <UploadMultiButton
                id="equipmentDocs"
                name="equipmentDocs"
                value={formik.values.equipmentDocs}
                onChange={formik.handleChange}
                error={
                  formik.touched.equipmentDocs &&
                  Boolean(formik.errors.equipmentDocs)
                }
                helperText={
                  formik.touched.equipmentDocs &&
                  formik.errors.equipmentDocs?.toString()
                }
              />
            </Grid>
          </>
        )}
        {formik.values.documentChoice === "Server verküpfung" && (
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
      </Grid>
    </Box>
  );
};

export default TenderDocumentation;
