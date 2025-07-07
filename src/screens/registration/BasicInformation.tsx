"use client";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LabelWithAsterisk from "@/components/data_display/label/LabelWithAsterisk";
import PhoneInput from "@/components/inputs/GPhoneInput";
import GTextInput from "@/components/inputs/GTextInput";

const BasicInformation = ({ formik }: any): JSX.Element => {
  useEffect(() => {
    formik.validateForm();
  }, []);

  return (
    <Box sx={{ p: 1, width: "auto", marginLeft: "1.5rem" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <LabelWithAsterisk>Ihre Vorname</LabelWithAsterisk>
          <GTextInput
            placeholder="Geben Sie Ihre Vorname"
            id="firstName"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LabelWithAsterisk>Ihre Nachname</LabelWithAsterisk>
          <GTextInput
            placeholder="Geben Sie Ihre Nachname"
            id="lastName"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <LabelWithAsterisk>Berufliche E-Mail-Adresse</LabelWithAsterisk>
          <GTextInput
            placeholder="Geben Sie Ihre berufliche E-Mail-Adresse"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <LabelWithAsterisk>Passwort</LabelWithAsterisk>
          <GTextInput
            type="password"
            placeholder="Geben Sie Ihre Passwort"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <LabelWithAsterisk>Passwort bestätigen</LabelWithAsterisk>
          <GTextInput
            type="password"
            placeholder="Geben Sie Ihre Passwort bestätigen"
            id="confirmPassword"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} mt={1}>
          <LabelWithAsterisk>Telefonnummer</LabelWithAsterisk>
          <PhoneInput
            id="telephone"
            name="telephone"
            value={formik.values.telephone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.telephone && Boolean(formik.errors.telephone)}
            helperText={formik.touched.telephone && formik.errors.telephone}
          />
        </Grid>
        <Grid item xs={12} sm={6} mt={1}>
          <LabelWithAsterisk>Firma name</LabelWithAsterisk>
          <GTextInput
            placeholder="Geben Sie Ihre Firma Name"
            id="company"
            name="company"
            value={formik.values.company}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.company && Boolean(formik.errors.company)}
            helperText={formik.touched.company && formik.errors.company}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BasicInformation;
