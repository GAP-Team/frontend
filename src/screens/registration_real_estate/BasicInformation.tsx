"use client";
import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LabelWithAsterisk from "@/components/label/LabelWithAsterisk";
import PhoneInput from "@/components/input/GPhoneInput";
import GTextInput from "@/components/input/GTextInput";

interface GenericFormProps {
  value?: number;
  type?: string;
}

const BasicInformation = ({ value, type }: GenericFormProps): JSX.Element => {
  return (
    <Box
      component="form"
      noValidate
      sx={{ p: 1, width: "auto", marginLeft: "1.5rem" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <LabelWithAsterisk>Ihre Vorname</LabelWithAsterisk>
          <GTextInput
            placeholder="Geben Sie Ihre Vorname"
            id="firsName"
            name="firstName"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LabelWithAsterisk>Ihre Nachname</LabelWithAsterisk>
          <GTextInput
            placeholder="Geben Sie Ihre Nachname"
            id="lastName"
            name="lastName"
          />
        </Grid>
        <Grid item xs={12}>
          <LabelWithAsterisk>berufliche E-Mail-Adresse</LabelWithAsterisk>
          <GTextInput
            placeholder="Geben Sie Ihre berufliche E-Mail-Adresse"
            id="email"
            name="email"
          />
        </Grid>

        <Grid item xs={12}>
          <LabelWithAsterisk>TELEFONNUMMER</LabelWithAsterisk>
          <PhoneInput />
        </Grid>

        <Grid item xs={12}>
          <LabelWithAsterisk>Firma NAME</LabelWithAsterisk>
          <GTextInput
            placeholder="Geben Sie Ihre Firma Name"
            id="company"
            name="company"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BasicInformation;
