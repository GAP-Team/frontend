"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LabelWithAsterisk from "@/components/label/LabelWithAsterisk";
import { FaPlus } from "react-icons/fa";
import Button from "@mui/material/Button";
import UploadButtons from "@/components/button/UploadButton";
import PhoneInput from "@/components/input/GPhoneInput";
import GTextInput from "@/components/input/GTextInput";

interface BusinessRegistrationProps {
  value?: number;
  type?: string;
}

const BusinessRegistration = ({
  value,
  type,
}: BusinessRegistrationProps): JSX.Element => {
  return (
    <Box
      component="form"
      noValidate
      sx={{ p: 1, width: "auto", marginLeft: "1.5rem" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography variant="gsub" color="gray.500">
            GEWERBEANMELDUNG
          </Typography>
          <UploadButtons />
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
          <TextField
            InputProps={{ sx: { borderRadius: "0.5rem" } }}
            required
            id="registernumber"
            name="registernumber"
            placeholder="HANDELREGISTERNUMMER"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <Typography variant="gsub" color="gray.500">
            GRUNDBUCHEINTRAG
          </Typography>
          <UploadButtons />
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
          <UploadButtons />
        </Grid>
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
          <Typography variant="gsub" color="gray.500">
            berufliche E-Mail-Adresse
          </Typography>
          <GTextInput
            placeholder="Geben Sie Ihre berufliche E-Mail-Adresse"
            id="email"
            name="email"
          />
        </Grid>
        <PhoneInput />

        <Grid item xs={12}>
          <Typography variant="gsub" color="gray.500">
            Firma NAME
          </Typography>
          <GTextInput
            placeholder="Geben Sie Ihre Firma Name"
            id="company"
            name="company"
          />
        </Grid>
        <Grid item xs={12}>
          <LabelWithAsterisk>TELEFONNUMMER</LabelWithAsterisk>
          <TextField
            InputProps={{ sx: { borderRadius: "0.5rem" } }}
            required
            id="telcontact"
            name="telcontact"
            placeholder="Enter your telcontact number"
            fullWidth
            autoComplete="telcontact"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} marginBottom={"-1rem"}>
          <Typography variant="gsub" color="gray.500">
            MEHRER ANSPRECHPARTNER
          </Typography>
        </Grid>
        <Grid item xs={11}>
          <TextField
            InputProps={{ sx: { borderRadius: "0.5rem" } }}
            id="secondtel"
            name="secondtel"
            placeholder="Enter your secondtel number"
            fullWidth
            autoComplete="secondtel"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={1} container justifyContent="center">
          <Button variant="contained" size="small" color="gprimary">
            <FaPlus />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BusinessRegistration;
