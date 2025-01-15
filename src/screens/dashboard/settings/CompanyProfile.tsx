"use client";

import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { Button, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import GTextInput from "@/components/input/GTextInput";
import GTextSelector from "@/components/input/GTextSelector";
import Divider from "@mui/material/Divider";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { germanStates } from "@/utils/Constants";

const CompanyProfile = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      companyName: user?.company?.name,
      logo: null,
      country: user?.company?.address?.country,
      state: user?.company?.address?.state,
      street: user?.company?.address?.street,
      houseNumber: user?.company?.address?.houseNo,
      zip: user?.company?.address?.zip,
      city: user?.company?.address?.city,
      registration: user?.company?.business?.registrationNumber,
      phonenumber: user?.company?.phonenumber,
      registrationNumber: user?.company?.business?.registrationNumber,
      // legalForm: "GmbH",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2.5}>
        {/* Firmenname */}
        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle1" sx={styles.sectionTitle}>
            Firmenname
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={styles.sectionDescription}
          >
            Dies wird in Ihrem Profil angezeigt.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <GTextInput
            id="companyName"
            name="companyName"
            value={formik.values.companyName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
        {/* Unternehmenslogo */}
        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle1" sx={styles.sectionTitle}>
            Unternehmenslogo
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={styles.sectionDescription}
          >
            Wählen Sie Ihr Firmenlogo und laden Sie es hoch.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3} justifyItems={'right'}>
           
              <Button variant="text" component="label" style={styles.logoContainer}>
              {formik.values.logo ? (
                <img
                src={formik.values.logo}
                alt="Logo"
                style={styles.logoImage}
                />
              ) : (
                <Typography variant="caption" color="textSecondary">
                Logo
                </Typography>
              )}
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

        <Grid item xs={12}>
          <Divider />
        </Grid>

        {/* Adresse */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" sx={styles.sectionTitle}>
            Adresse
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={styles.sectionDescription}
          >
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
                options={[{ label: "Deutschland", value: "Deutschland" }]}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <GTextSelector
                name="state"
                label="Bundesland"
                value={formik.values.state}
                onChange={formik.handleChange}
                options={germanStates}
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
          <Typography variant="subtitle1" sx={styles.sectionTitle}>
            Gewerbeanmeldung
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={styles.sectionDescription}
          >
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
                
        {/* Telefonnummer */}
        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle1" sx={styles.sectionTitle}>
            Telefonnummer
          </Typography>
            <Typography
            variant="body2"
            color="textSecondary"
            sx={styles.sectionDescription}
            >
            Dies wird Ihre Telefonnummer sein.
            </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <GTextInput
            id="phonenumber"
            name="phonenumber"
            value={formik.values.phonenumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>

        
        <Grid item xs={12} sm={3}>
            <Typography variant="subtitle1" sx={styles.sectionTitle}>
            Handelsregisternummer
            </Typography>
            <Typography
            variant="body2"
            color="textSecondary"
            sx={styles.sectionDescription}
            >
            Dies wird Ihre Handelsregisternummer sein.
            </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <GTextInput
            id="registrationNumber"
            name="registrationNumber"
            value={formik.values.registrationNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        {/* Uncomment in V2 */}
        {/* Rechtliche Unternehmensform */}
        {/* <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" sx={styles.sectionTitle}>
            Rechtliche Unternehmensform
          </Typography>
        </Grid> */}
        {/* <Grid item xs={12} sm={6}>
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
        </Grid> */}


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

// Styles
const styles = {
  sectionTitle: {
    fontWeight: 600,
  },
  sectionDescription: {
    mb: 1,
  },
  logoContainer: {
    width: "80px",
    height: "80px",
    border: "1px dashed gray",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  logoImage: {
    width: "100%",
  },
};
