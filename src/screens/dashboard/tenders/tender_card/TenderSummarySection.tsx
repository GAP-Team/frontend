"use client";

import HeaderSection from "../../real_estate_user/HeaderSection";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import stepperHorizontal from "../../../../../public/icons/stepper-horizontal.svg";
import Grid from "@mui/material/Grid";
import { MdOutlineEdit } from "react-icons/md";
import LabeledTextWithIcon from "@/components/label/LabelTextWithIcon";
import Divider from "@mui/material/Divider";
import GButton from "@/components/button/GButton";

const summaryData = [
  { label: "Name des Auftraggebers", value: "Fire Service GmbH" },
  { label: "Name der Ausschreibung", value: "Fire Service GmbH" },
  { label: "Ausschreibungsart", value: "Handwerker" },
  { label: "Ausschreibungstyp", value: "SV-Begleitung" },
  { label: "Objekt", value: "Handwerker" },
  { label: "Anlage", value: "Handwerker" },
  { label: "Anlagetyp", value: "Handwerker" },
  { label: "Dringlichkeit", value: "Eröffnungstermin" },
  { label: "Zeitfenster available", value: "14. Jan 2024 - 28 Mar. 2025" },
  { label: "Detailbeschreibung", value: "Klicken Sie hier, um zu sehen" },
  { label: "Dokumente", value: "Vor Ort zur Verfügung stellen" },
];

const TenderSummarySection = () => {
  return (
    <>
     <HeaderSection titletext='DATEN ÜBERPRÜFEN' />
      <Typography variant="bodymsb">Summary</Typography>
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
            <LabeledTextWithIcon
              text={item.label}
              Icon={MdOutlineEdit}
              iconColor="#22A7F1"
              iconSize="1.4rem"
              fontSize="1.2rem"
              textColor="blue.main"
              iconMarginLeft="0.8rem"
            />
            <Typography variant="bodylr" mt="0.2rem">{item.value}</Typography>
          </Grid>
        ))}
      </Grid>
      <Divider variant="middle" orientation="horizontal" flexItem />
      <Grid container justifyContent="flex-end" spacing={2} marginTop={'0.4rem'} >
        <Grid item>
          <GButton color="gprimary" variant="outlined" >Bearbeiten</GButton>
          <GButton color="ggreen">Speichern</GButton>
        </Grid>
      </Grid>
    </>
  );
}

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
