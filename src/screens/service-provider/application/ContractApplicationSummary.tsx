import { useFormikContext } from "formik";
import { useAppSelector } from "@/lib/hooks";
import SummarySection, {
  Detail,
} from "@/components/common/summary/SummarySection";
import { currentUser } from "@/lib/features/userSlice";
import { ContractApplicationFormValues } from "@/typings/types";
import { ActiveStepItem } from "@/screens/real-estate-owner/types";
import { Box, Grid, Divider, Checkbox, Typography } from "@mui/material";
import HeaderSection from "@/screens/real-estate-owner/dashboard/HeaderSection";

interface ContractApplicationSummaryProps {
  steps: ActiveStepItem[];
  setActiveStep: React.Dispatch<React.SetStateAction<ActiveStepItem>>;
}

const ContractApplicationSummary = ({
  steps,
  setActiveStep,
}: ContractApplicationSummaryProps): JSX.Element => {
  const user = useAppSelector(currentUser);
  const formik = useFormikContext<ContractApplicationFormValues>();
  const { values } = useFormikContext<ContractApplicationFormValues>();

  const companyInfromationSummary: Detail[] = [
    user.company.name && { label: "Ihre Firmenname", value: user.company.name },
    user.email && { label: "Ihre Firmenemail", value: user.email },
    user.company.phonenumber && {
      label: "Ihr Firmentelefonnummer",
      value: user.company.phonenumber,
    },
  ].filter(Boolean) as Detail[];

  const contractOfferSummary: Detail[] = [
    {
      label: "Kosten der Dienstleistung Insgesamt",
      value: `€ ${values.totalPrice}`,
    },
    {
      label: "Kosten pro Stunde des Dienstes",
      value: `€ ${values.hourlyRate}`,
    },
    values.message && {
      label: "Nützliche Informationen",
      value: values.message,
    },
    ...(values.desiredDates && values.desiredDates.length
      ? values.desiredDates.map((date: any, index: number) => ({
          label: `Mögliche Daten ${index + 1}`,
          value: date ? new Date(date).toLocaleDateString() : "Nicht angegeben",
        }))
      : []),
  ].filter(Boolean) as Detail[];

  const contractServiceSummary: Detail[] = [
    ...(values.advantages && values.advantages.length
      ? values.advantages.map((advantage: string, index: number) => ({
          label: `Vorteile – Sonderleistung ${index + 1}`,
          value: advantage,
        }))
      : []),
    { label: "Angebotsdokument", value: values.offerDoc },
    { label: "AGB Dokument", value: values.termsConditionDoc },
  ].filter(Boolean) as Detail[];

  return (
    <Grid item xs={12} md={9}>
      <HeaderSection titletext="ANGEBOTSZUSAMMENFASSUNG" />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SummarySection
            disableEdit={true}
            title="Grundinformation"
            details={companyInfromationSummary}
            setActiveStep={() => setActiveStep(steps[0])}
          />
        </Grid>
        <Grid item xs={12}>
          <SummarySection
            title="Ihre Angebot"
            details={contractOfferSummary}
            setActiveStep={() => setActiveStep(steps[0])}
          />
        </Grid>
        <Grid item xs={12}>
          <SummarySection
            title="Vertragsleistungen"
            details={contractServiceSummary}
            setActiveStep={() => setActiveStep(steps[1])}
          />
        </Grid>
      </Grid>

      {/* Terms and submit */}
      <Box sx={{ display: "flex", alignItems: "center", mt: 4 }}>
        <Checkbox
          name="acceptedTerms"
          checked={values?.acceptedTerms}
          onChange={formik.handleChange}
        />
        <Typography variant="body2">
          Ich akzeptiere <strong>die GAP AGB</strong> und{" "}
          <strong>die Datenschutzbestimmungen</strong>.
        </Typography>
      </Box>
      <Divider sx={styles.divider} />
    </Grid>
  );
};

export default ContractApplicationSummary;

const styles = {
  descriptionLable: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  descriptionText: {
    color: "#A0ADB1",
    fontSize: "0.85rem",
  },
  divider: {
    mt: 4,
    mb: 4,
    width: "auto",
    height: "1px",
    bgcolor: "#fbfbfb",
    textAlign: "center",
  },
  lableText: {
    display: "flex",
    flexDirection: "row",
  },
  editIcon: {
    fontSize: "1rem",
    color: "#A0ADB1",
    cursor: "pointer",
  },
};
