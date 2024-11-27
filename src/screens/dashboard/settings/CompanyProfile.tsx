"use client";

import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { Button, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import GTextInput from "@/components/input/GTextInput";
import GTextSelector from "@/components/input/GTextSelector";
import Divider from "@mui/material/Divider";

const CompanyProfile = (): JSX.Element => {
  const formik = useFormik({
    initialValues: {
      companyName: "GAP | Gesetzliche Anlagen Prüfung",
      logo: null,
      country: "Germany",
      state: "Baden-Württemberg",
      street: "",
      houseNumber: "",
      zip: "",
      city: "",
      registration: null,
      legalForm: "GmbH",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        {/* Firmenname */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Firmenname
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
            Dies wird in Ihrem Profil angezeigt.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <GTextInput
            id="companyName"
            name="companyName"
            value={formik.values.companyName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {/* Unternehmenslogo */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Unternehmenslogo
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
            Wählen Sie Ihr Firmenlogo und laden Sie es hoch.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  border: "1px dashed gray",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {formik.values.logo ? (
                  <img
                    src={formik.values.logo}
                    alt="Logo"
                    style={{ width: "100%" }}
                  />
                ) : (
                  <Typography variant="caption" color="textSecondary">
                    Logo
                  </Typography>
                )}
              </div>
            </Grid>
            <Grid item>
              <Button variant="outlined" component="label">
                Click to upload
                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    formik.setFieldValue(
                      "logo",
                      e.target.files?.[0]
                        ? URL.createObjectURL(e.target.files[0])
                        : null
                    )
                  }
                />
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        {/* Adresse */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Adresse
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
            Geben Sie Ihre echte Adresse an, damit wir wichtige Informationen
            senden können.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <GTextSelector
                name="country"
                label="Land"
                value={formik.values.country}
                onChange={formik.handleChange}
                options={[
                  { label: "Germany", value: "Germany" },
                  { label: "France", value: "France" },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <GTextSelector
                name="state"
                label="Bundesland"
                value={formik.values.state}
                onChange={formik.handleChange}
                options={[
                  { label: "Baden-Württemberg", value: "Baden-Württemberg" },
                  { label: "Bayern", value: "Bayern" },
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <GTextInput
                id="street"
                name="street"
                label="Straße"
                value={formik.values.street}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <GTextInput
                id="houseNumber"
                name="houseNumber"
                label="Hausnr"
                value={formik.values.houseNumber}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <GTextInput
                id="zip"
                name="zip"
                label="PLZ"
                value={formik.values.zip}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <GTextInput
                id="city"
                name="city"
                label="Stadt/Ort"
                value={formik.values.city}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        {/* Gewerbeanmeldung */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Gewerbeanmeldung
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
            Fotoscan Ihrer Gewerbeanmeldung.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="outlined" component="label">
            Hochladen
            <input type="file" hidden />
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        {/* Rechtliche Unternehmensform */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Rechtliche Unternehmensform
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <RadioGroup
            row
            id="legalForm"
            name="legalForm"
            value={formik.values.legalForm}
            onChange={formik.handleChange}
          >
            <FormControlLabel
              value="Einzelunternehmen"
              control={<Radio />}
              label="Einzelunternehmen"
            />
            <FormControlLabel value="GmbH" control={<Radio />} label="GmbH" />
            <FormControlLabel value="UG" control={<Radio />} label="UG" />
            <FormControlLabel value="oHG" control={<Radio />} label="oHG" />
            <FormControlLabel value="AG" control={<Radio />} label="AG" />
            <FormControlLabel value="KG" control={<Radio />} label="KG" />
          </RadioGroup>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        {/* Buttons */}
        <Grid item xs={12}>
          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Button variant="outlined" onClick={() => formik.resetForm()}>
                Abbrechen
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" type="submit">
                Änderungen speichern
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default CompanyProfile;
