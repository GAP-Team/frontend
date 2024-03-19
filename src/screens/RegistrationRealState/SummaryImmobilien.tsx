import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SummarySection from "@/components/common/SummarySection";

interface Detail {
  label: string;
  value: string;
}

const SummaryImmobilien = () => {
  const grundinformation: Detail[] = [
    { label: 'Vorname', value: 'Maximillian' },
    { label: 'Nachname', value: 'Müller-Maier' },
    { label: 'Email', value: 'müller-maire@gmail.com' },
    { label: 'Company', value: 'Fire Protection GmbH' },
  ];

  const ansprechpartner: Detail[] = [
    { label: 'Vorname', value: 'Maximillian' },
    { label: 'Nachname', value: 'Müller-Maier' },
    { label: 'Email', value: 'müller-maire@gmail.com' },
    { label: 'Tel. Nummer', value: '+4916090010020' },
  ];
 
  const adresse: Detail[] = [
    { label: 'Land', value: 'Germany' },
    { label: 'Straße', value: 'Heinrich-Baumann Str. 49' },
    { label: 'Stadt', value: 'Schwerin' },
    { label: 'Bundesland', value: 'Mecklenburg-Vorpom...' },
    { label: 'Postleitzahl', value: '19061' },
  ];
  const gewerbeanmeldung: Detail[] = [
    { label: 'Handerlregister Nummer', value: 'HRB 7890' },
  ];

  return (
    <Box
      sx={{ flexGrow: 1, width: "auto", marginLeft: "1.5rem", mt: "0.5rem" }}
    >
      <Grid container spacing={2}>
      <Grid item xs={6}>
          <SummarySection title="GRUNDINFORMATION" details={grundinformation} />
        </Grid>
        <Grid item xs={6}>
          <SummarySection title="ANSPRECHPARTNER" details={ansprechpartner} />
        </Grid>
        <Grid item xs={12}>
          <SummarySection title="ADRESSE DER FIRMA" details={adresse} />
        </Grid>
        <Grid item xs={12}>
          <SummarySection title="GEWERBEANMELDUNG" details={gewerbeanmeldung} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SummaryImmobilien;
