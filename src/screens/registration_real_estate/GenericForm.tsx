'use client';
import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LabelWithAsterisk from "@/components/common/LabelWithAsterisk";
import { FaPlus } from "react-icons/fa";
import Button from '@mui/material/Button';
import UploadButtons from "@/components/button/UploadButtons";
import PhoneInput from "@/components/inputs/PhoneInput";

interface GenericFormProps {
  value?: number;
  type?: string;
}

const GenericForm = ({ value, type }: GenericFormProps): JSX.Element => {
  return (
    <Box component="form" noValidate sx={{ p: 1, width: 'auto', marginLeft: '1.5rem' }}>
      <Grid container spacing={2}>
        {value == 2 && (
          <>
          <Grid item xs={12} sm={12}>
             <Typography variant="gsub" color="gray.500">
                GEWERBEANMELDUNG
            </Typography>
            <UploadButtons/>
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
          </>
        )}
          {value == 3 && (
          <>
          <Grid item xs={12} sm={12}>
             <Typography variant="gsub" color="gray.500">
              GRUNDBUCHEINTRAG
            </Typography>
            <UploadButtons/>
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
            <UploadButtons/>
          </Grid>
          </>
        )}
        {(value==0 || value==1 || type=='contact') && (
          <>
            <Grid item xs={12} sm={6}>
              <LabelWithAsterisk>Ihre Vorname</LabelWithAsterisk>
              <TextField
                InputProps={{ sx: { borderRadius: "0.5rem" } }}
                required
                id="firstName"
                name="firstName"
                placeholder="Geben Sie Ihre Vorname"
                fullWidth
                autoComplete="given-name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LabelWithAsterisk>Ihre Nachname</LabelWithAsterisk>
              <TextField
                InputProps={{ sx: { borderRadius: "0.5rem" } }}
                required
                id="lastName"
                name="lastName"
                placeholder="Geben Sie Ihre Nachname"
                fullWidth
                autoComplete="family-name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="gsub" color="gray.500">
                berufliche E-Mail-Adresse
              </Typography>
              <TextField
                InputProps={{ sx: { borderRadius: "0.5rem" } }}
                id="email"
                name="email"
                placeholder="Geben Sie Ihre E-Mail-Adresse"
                fullWidth
                variant="outlined"
                autoComplete="email"
              />
            </Grid>
            <PhoneInput/>
          </>
        )}

        {value == 0 && (
          <Grid item xs={12}>
            <Typography variant="gsub" color="gray.500">
              Firma NAME
            </Typography>
            <TextField
              InputProps={{ sx: { borderRadius: "0.5rem" } }}
              id="company"
              name="company"
              placeholder="Enter your company name"
              fullWidth
              autoComplete="organization"
              variant="outlined"
            />
          </Grid>
        )}
        {value == 1 && (
          <>
            <Grid item xs={12}>
              <LabelWithAsterisk>
                Firma NAME
              </LabelWithAsterisk>
              <TextField
                InputProps={{ sx: { borderRadius: "0.5rem" } }}
                required
                id="company"
                name="company"
                placeholder="Enter your company name"
                fullWidth
                autoComplete="organization"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <LabelWithAsterisk>FIRMENTELEFONNUMMER</LabelWithAsterisk>
              <TextField
                InputProps={{ sx: { borderRadius: "0.5rem" } }}
                required
                id="telephone"
                name="telephone"
                placeholder="Enter your telephone number"
                fullWidth
                autoComplete="telephone"
                variant="outlined"
              />
            </Grid>
          </>
        )}

      {type == 'contact' && (
        <>
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
          <Grid item xs={12} marginBottom={'-1rem'}>
            <Typography variant="gsub" color="gray.500">MEHRER ANSPRECHPARTNER</Typography>
          </Grid>
          <Grid item xs={11} >
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
            <Button
              variant="contained"
              size="small"
              color="gprimary"
            >
              <FaPlus />
            </Button>
          </Grid>
        </>

      )}
    </Grid>
    </Box >
  );
};

export default GenericForm;
