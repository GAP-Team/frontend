import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useFormikContext } from "formik";

import SummarySection, { Detail } from "@/components/summary/SummarySection";
interface SummaryRegistrationProps {
  setActiveStep: (num: number) => void;
}

const SummaryRegistration = ({
  setActiveStep,
}: SummaryRegistrationProps): JSX.Element => {
  const { values } = useFormikContext<any>();
  const updatedBasicInformation: Detail[] = [
    values.firstName && {
      label: "Vorname",
      value: values.firstName,
    },
    values.lastName && {
      label: "Nachname",
      value: values.lastName,
    },
    values.email && {
      label: "E-mail-Adresse",
      value: values.email,
    },
    values.company && {
      label: "Unternehmen",
      value: values.company,
    },
  ].filter(Boolean);

  const updatedAddress: Detail[] = [
    values.country && { label: "Land", value: values.country },
    values.state && { label: "Bundesland", value: values.state },
    values.street && { label: "Straße", value: values.street },
    values.houseNo && { label: "Hausnummer", value: values.houseNo },
    values.zip && { label: "Postleitzahl", value: values.zip },
    values.city && { label: "Stadt", value: values.city },
  ].filter(Boolean);

  const updatedBusinessRegistration: Detail[] = [
    values.businessRegistrationDocument && {
      label: "Gewerbeanmeldung",
      value: values.businessRegistrationDocument,
    },
    values.landRegisterEntryDocument && {
      label: "Grundbucheintrag",
      value: values.landRegisterEntryDocument,
    },
    values.approvalDocument && {
      label: "Genehmigungsunterlagen",
      value: values.approvalDocument,
    },
    values.registrationNumber && {
      label: "Handelregister Nummer",
      value: values.registrationNumber,
    },
  ].filter(Boolean);

  return (
    <Box
      sx={{ flexGrow: 1, width: "auto", marginLeft: "1.5rem", mt: "0.5rem" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <SummarySection
            title="GRUNDINFORMATION"
            details={updatedBasicInformation}
            setActiveStep={() => setActiveStep(0)}
          />
        </Grid>
        <Grid item xs={12}>
          <SummarySection
            title="ADRESSE DER FIRMA"
            details={updatedAddress}
            setActiveStep={() => setActiveStep(1)}
          />
        </Grid>
        {updatedBusinessRegistration?.length > 0 && (
          <Grid item xs={12}>
            <SummarySection
              title="GEWERBEANMELDUNG"
              details={updatedBusinessRegistration}
              setActiveStep={() => setActiveStep(2)}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default SummaryRegistration;
