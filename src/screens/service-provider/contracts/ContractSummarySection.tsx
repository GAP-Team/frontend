"use client";
import { Contract } from "./types";
import Grid from "@mui/material/Grid";
import { ROUTES } from "@/utils/routes";
import { TENDER_FORM } from "@/utils/enums";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import GButton from "@/components/inputs/button/GButton";
import LabelText from "@/components/data-display/label/LabelText";
import HeaderSection from "@/screens/real-estate-owner/dashboard/HeaderSection";

interface ContractSummarySectionProps {
  contract?: Contract | null;
}

// A provider who already applied sees that first; otherwise a booked-out
// contract (maximum number of applications reached) cannot be applied to.
const renderApplyButton = (contract?: Contract | null): JSX.Element => {
  if (contract?.hasApplied) {
    return (
      <GButton color="ggreen" disabled>
        Bereits beworben
      </GButton>
    );
  }
  if (contract?.isBookedOut) {
    return (
      <GButton color="ggreen" disabled>
        Ausgebucht – keine Bewerbung mehr möglich
      </GButton>
    );
  }
  return (
    <GButton
      color="ggreen"
      href={ROUTES.SERVICE_PROVIDER.CONTRACT_APPLICATION(contract?.tenderId)}
    >
      Jetzt Bewerben
    </GButton>
  );
};

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
      value: contract?.detailDescription || "Nicht Vorhanden",
      fullWidth: true,
    },
    {
      label: "Gewünschte Angebotsfrist",
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
      <Grid container spacing={2} pt={2}>
        {summaryData.map((item, index) => (
          <Grid
            item
            xs={12}
            sm={"fullWidth" in item && item.fullWidth ? 12 : 6}
            sx={styles.item}
            key={index}
            paddingBottom={2}
          >
            <LabelText
              text={item.label}
              fontSize="1.2rem"
              textColor="blue.main"
            />
            <Typography variant="bodylr" mt="0.2rem" sx={styles.value}>
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
            Zurück
          </GButton>
          {renderApplyButton(contract)}
        </Grid>
      </Grid>
    </>
  );
};

export default ContractSummarySection;

const styles = {
  item: {
    minWidth: 0,
  },
  value: {
    whiteSpace: "pre-line",
    overflowWrap: "anywhere",
    wordBreak: "break-word",
  },
};
