"use client";

import HeaderSection from "../../real_estate_user/HeaderSection";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import GButton from "@/components/button/GButton";
import { useRouter } from "next/navigation";
import LabelText from "@/components/label/LabelText";
import { Tender } from "./types";

interface TenderSummarySectionProps {
  tender?: Tender | null;
}

const TenderSummarySection: React.FC<TenderSummarySectionProps> = ({
  tender,
}) => {
  const router = useRouter();

  // Prepare summary data
  const summaryData = [
    { label: "Name des Auftraggebers", value: tender?.clientName },
    { label: "Ausschreibungsart", value: tender?.tenderForm },
    { label: "Ausschreibungstyp", value: tender?.tenderType },
    { label: "Objekt", value: tender?.building.name },
    { label: "Anlage", value: tender?.facility.name },
    { label: "Anlagetyp", value: tender?.tenderType },
    { label: "Dringlichkeit", value: tender?.urgency },
    {
      label: "Verfügbares Zeitfenster",
      value:
        tender?.fromDate &&
        tender?.toDate &&
        `${new Date(tender?.fromDate).toLocaleDateString()} - ${new Date(
          tender?.toDate
        ).toLocaleDateString()}`,
    },
    {
      label: "Detailbeschreibung",
      value: tender?.detailDescription
        ? `${tender?.detailDescription.substring(0, 60)}...`
        : "",
    },
    {
      label: "Sicherheit Arbeit erforderlich",
      value: tender?.safetyWorkRequired ? "Ja" : "Nein",
    },
    {
      label: "Kostenlose Parkplätze",
      value: tender?.freeParkingAvailable ? "Ja" : "Nein",
    },
  ].filter((item) => item.value);

  const editHandler = (): void => {
    router.push("/real_estate/tenders/add_tender_form");
  };

  const backHandler = (): void => {
    router.push("/real_estate/tenders");
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
          <GButton color="ggreen" onClick={editHandler}>
            Bearbeiten
          </GButton>
        </Grid>
      </Grid>
    </>
  );
};

export default TenderSummarySection;
