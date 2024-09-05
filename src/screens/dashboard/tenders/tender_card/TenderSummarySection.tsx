"use client";

import HeaderSection from "../../real_estate_user/HeaderSection";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import stepperHorizontal from "../../../../../public/icons/stepper-horizontal.svg";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import GButton from "@/components/button/GButton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LabelText from "@/components/label/LabelText";


//TODO: in the future this data will be fetched from the backend and dynamically updated the values
const summaryData = [
  { label: "Name des Auftraggebers", value: "Fire Service GmbH" },
  { label: "Name der Ausschreibung", value: "Fire Service GmbH" },
  { label: "Ausschreibungsart", value: "Handwerker" },
  { label: "Ausschreibungstyp", value: "SV-Begleitung" },
  { label: "Objekt", value: "Handwerker" },
  { label: "Anlage", value: "Handwerker" },
  { label: "Anlagetyp", value: "Handwerker" },
  { label: "Dringlichkeit", value: "Eröffnungstermin" },
  { label: "Verfügbares Zeitfenster", value: "14. Jan 2024 - 28 Mar. 2025" },
  { label: "Detailbeschreibung", value: "Klicken Sie hier, um zu sehen" },
  { label: "Dokumente", value: "Vor Ort zur Verfügung stellen" },
  { label: "Sicherheit Arbeit erforderlich", value: "Ja" },
  { label: "Kostenlose Parkplätze", value: "Ja" },
];

const TenderSummarySection = () => {
  const router = useRouter();

  const backHandler = () => {
    router.push("/dashboard/tenders");
  };

  const editHandler = () => {
    router.push("/dashboard/tenders/add_tender_form");
  };
  return (
    <>
      <HeaderSection titletext="DATEN ÜBERPRÜFEN" />
      <Typography variant="bodymsb">Zusammenfassung</Typography>
      <Box sx={styles.imageContainer}>
        <Image
          priority
          alt="stepper"
          src={stepperHorizontal}
          width={700}
          style={{ marginTop: "1rem", marginBottom: "3rem" }}
        />
      </Box>
      <Grid container spacing={2} marginLeft={1}>
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

const styles = {
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    textAlign: "center",
  },
};
