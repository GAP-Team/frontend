import { Box, Grid, Divider, Checkbox, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { ActiveStepItem } from "../dashboard/types";
import SummarySection from "@/components/summary/SummarySection";
import HeaderSection from "../dashboard/real_estate_user/HeaderSection";
import {
  SummarySectionDetail,
  ContractApplicationFormValues,
} from "@/typings/types";

interface ContractApplicationSummaryProps {
  steps: ActiveStepItem[];
  setActiveStep: React.Dispatch<React.SetStateAction<ActiveStepItem>>;
}

const ContractApplicationSummary = ({
  steps,
  setActiveStep,
}: ContractApplicationSummaryProps): JSX.Element => {
  const formik = useFormikContext<ContractApplicationFormValues>();
  const { values } = useFormikContext<ContractApplicationFormValues>();

  /*const companyInfromationSummary: SummarySectionDetail[] = [
        values.companyName && { label: "Firmen Name", value: values.companyName },
        values.companyEmail && { label: "Firmen Email", value: values.companyEmail },
        values.companyContactNumber && { label: "Firmen Telefonnummer", value: values.companyContactNumber },
    ].filter(Boolean);*/

  const contractOfferSummary: SummarySectionDetail[] = [
    ...(values.totalPrice
      ? [
          {
            label: "Kosten der Dienstleistung",
            value: `€ ${values.totalPrice}`,
          },
        ]
      : []),
    ...(values.message
      ? [{ label: "Nützliche Informationen", value: values.message }]
      : []),
    ...(Array.isArray(values?.desiredDates) && values.desiredDates.length > 0
      ? values.desiredDates.map((date: any, index: number) => ({
          label: `Mögliche Daten ${index + 1}`,
          value: date ? new Date(date).toLocaleDateString() : "Nicht angegeben",
        }))
      : []),
  ];

  const contractServiceSummary: SummarySectionDetail[] = [
    ...(Array.isArray(values.advantages) && values.advantages.length > 0
      ? values.advantages.map((advantage: any, index: number) => ({
          label: `Vorteile – Sonderleistung ${index + 1}`,
          value: advantage,
        }))
      : []),
    ...[
      {
        label: "",
        value: "---------------------------------------------------------",
      },
    ],
    ...(values.offerDoc
      ? [{ label: "Angebotsdokument", value: values.offerDoc }]
      : []),
    ...(values.termsConditionDoc
      ? [{ label: "AGB Dokument", value: values.termsConditionDoc }]
      : []),
  ];

  return (
    <Grid item xs={12} md={9}>
      <HeaderSection titletext="ANGEBOTSZUSAMMENFASSUNG" />

      <Grid container spacing={2}>
        {/* {values.companyName && values.companyEmail && values.companyContactNumber && 
                    <Grid item xs={12}>
                        <SummarySection
                            title="Grundinformation"
                            details={companyInfromationSummary}
                            setActiveStep={() => setActiveStep(steps[0])}
                        />
                    </Grid>
                } */}
        <Grid item xs={12}>
          <SummarySection
            title="Ihre Angebot"
            details={contractOfferSummary}
            setActiveStep={() => setActiveStep(steps[0])}
          />
        </Grid>
        <Grid item xs={12}>
          <SummarySection
            title="Vertrag Sleistungen"
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
