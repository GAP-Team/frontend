"use client";
import Grid from "@mui/material/Grid";
import { ROUTES } from "@/utils/routes";
import { Contract } from "@/typings/types";
import { TENDER_FORM } from "@/utils/enums";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import GButton from "@/components/inputs/button/GButton";
import LabelText from "@/components/data_display/label/LabelText";
import HeaderSection from "@/screens/dashboard/real_estate_user/HeaderSection";

interface ContractSummarySectionProps {
  contract?: Contract | null;
}

const ContractSummarySection: React.FC<ContractSummarySectionProps> = ({
  contract,
}) => {
  const router = useRouter();

  const summaryData = [
    { label: "Name des Auftraggebers", value: contract?.clientName },
    {
      label: "Ausschreibungsart",
      value:
        contract?.tenderForm === TENDER_FORM.CRAFTSMAN
          ? "Handwerker"
          : "Sachverständigen",
    },
    { label: "Ausschreibungstyp", value: contract?.tenderType },
    { label: "Objekt", value: contract?.buildingName },
    {
      label: "Stadt und Bundesland",
      value: `${contract?.city}, ${contract?.state}`,
    },
    { label: "Anlage", value: contract?.facilityName },
    { label: "Anlagetyp", value: contract?.subcategory },
    { label: "Dringlichkeit", value: contract?.urgency },
    {
      label: "Auftragsinformation",
      value: contract?.detailDescription
        ? `${contract?.detailDescription.substring(0, 60)}...`
        : "Nicht Vorhanden",
    },
    {
      label: "Angebotsfrist",
      value:
        contract?.fromDate && contract?.toDate
          ? `${new Date(contract?.fromDate).toLocaleDateString("de-DE")} - ${new Date(
              contract?.toDate
            ).toLocaleDateString("de-DE")}`
          : "Nicht Vorhanden",
    },
    {
      label: "Sicherheit Arbeit erforderlich",
      value: contract?.safetyWorkRequired ? "Ja" : "Nein",
    },
    {
      label: "Kostenlose Parkplätze",
      value: contract?.freeParkingAvailable ? "Ja" : "Nein",
    },
  ].filter((item) => item.value);

  const backHandler = (): void => {
    router.push(ROUTES.SERVICE_PROVIDER.CONTRACT_FILTER_URL([], [], []));
  };

  return (
    <>
      <HeaderSection titletext="DATEN ÜBERPRÜFEN" />
      <Typography variant="bodymsb">Zusammenfassung</Typography>
      <Grid container spacing={2} marginLeft={1} pt={2}>
        {summaryData.map((item, index) => (
          <Grid item xs={6} key={index} paddingBottom={2}>
            <LabelText
              text={item.label}
              fontSize="1.2rem"
              textColor="blue.main"
            />
            <Typography variant="bodylr" mt="0.2rem">
              {item.value}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Divider variant="middle" orientation="horizontal" flexItem />
      <Grid
        container
        justifyContent="flex-end"
        spacing={2}
        marginTop={"0.4rem"}
      >
        <Grid item>
          <GButton color="gprimary" variant="outlined" onClick={backHandler}>
            Abbrechen
          </GButton>
          <GButton
            color="ggreen"
            href={ROUTES.SERVICE_PROVIDER.CONTRACT_APPLICATION(
              contract?.tenderId
            )}
          >
            Jetzt Bewerben
          </GButton>
        </Grid>
      </Grid>
    </>
  );
};

export default ContractSummarySection;
