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

const TenderSummarySection = () => {
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
        <Grid container spacing={2}>
          {/* Name des Auftraggebers */}
          <Grid item xs={6} paddingBottom={2}>
            <LabeledTextWithIcon
              text="Name des Auftraggebers"
              Icon={MdOutlineEdit}
              iconColor="#22A7F1"
              iconSize="1.4rem"
              fontSize="1.2rem"
              textColor="blue.main"
              iconMarginLeft="0.8rem"
            />
            <Typography variant="body1" mt="0.2rem">
              Fire Service GmbH
            </Typography>
          </Grid>

          {/* Name der Ausschreibung */}
          <Grid item xs={6} paddingBottom={2}>
            <LabeledTextWithIcon
              text="Name der Ausschreibung"
              Icon={MdOutlineEdit}
              iconColor="#22A7F1"
              iconSize="1.4rem"
              fontSize="1.2rem"
              textColor="blue.main"
              iconMarginLeft="0.8rem"
            />
            <Typography variant="body1" mt="0.2rem">
              Fire Service
            </Typography>
          </Grid>

          {/* Ausschreibungsart */}
          <Grid item xs={6} paddingBottom={2}>
            <LabeledTextWithIcon
              text="Ausschreibungsart"
              Icon={MdOutlineEdit}
              iconColor="#22A7F1"
              iconSize="1.4rem"
              fontSize="1.2rem"
              textColor="blue.main"
              iconMarginLeft="0.8rem"
            />
            <Typography variant="body1" mt="0.2rem">
              Handwerker
            </Typography>
          </Grid>

          {/* Ausschreibungstyp */}
          <Grid item xs={6} paddingBottom={2}>
            <LabeledTextWithIcon
              text="Ausschreibungstyp"
              Icon={MdOutlineEdit}
              iconColor="#22A7F1"
              iconSize="1.4rem"
              fontSize="1.2rem"
              textColor="blue.main"
              iconMarginLeft="0.8rem"
            />
            <Typography variant="body1" mt="0.2rem">
              SV-Begleitung
            </Typography>
          </Grid>

          {/* Objekt */}
          <Grid item xs={6} paddingBottom={2}>
            <LabeledTextWithIcon
              text="Objekt"
              Icon={MdOutlineEdit}
              iconColor="#22A7F1"
              iconSize="1.4rem"
              fontSize="1.2rem"
              textColor="blue.main"
              iconMarginLeft="0.8rem"
            />
            <Typography variant="body1" mt="0.2rem">
              Gebäude 1
            </Typography>
          </Grid>

          {/* Anlage */}
          <Grid item xs={6} paddingBottom={2}>
            <LabeledTextWithIcon
              text="Anlage"
              Icon={MdOutlineEdit}
              iconColor="#22A7F1"
              iconSize="1.4rem"
              fontSize="1.2rem"
              textColor="blue.main"
              iconMarginLeft="0.8rem"
            />
            <Typography variant="body1" mt="0.2rem">
              Anlage A-B
            </Typography>
          </Grid>

          {/* Anlagetyp */}
          <Grid item xs={6} paddingBottom={2}>
            <LabeledTextWithIcon
              text="Anlagetyp"
              Icon={MdOutlineEdit}
              iconColor="#22A7F1"
              iconSize="1.4rem"
              fontSize="1.2rem"
              textColor="blue.main"
              iconMarginLeft="0.8rem"
            />
            <Typography variant="body1" mt="0.2rem">
              CO-Warnanlagen
            </Typography>
          </Grid>

          {/* Dringlichkeit */}
          <Grid item xs={6} paddingBottom={2}>
            <LabeledTextWithIcon
              text="Dringlichkeit"
              Icon={MdOutlineEdit}
              iconColor="#22A7F1"
              iconSize="1.4rem"
              fontSize="1.2rem"
              textColor="blue.main"
              iconMarginLeft="0.8rem"
            />
            <Typography variant="body1" mt="0.2rem">
              Eröffnungstermin
            </Typography>
          </Grid>

          {/* Zeitfenster available */}
          <Grid item xs={6} paddingBottom={2}>
            <LabeledTextWithIcon
              text="Verfügbares Zeitfenster"
              Icon={MdOutlineEdit}
              iconColor="#22A7F1"
              iconSize="1.4rem"
              fontSize="1.2rem"
              textColor="blue.main"
              iconMarginLeft="0.8rem"
            />
            <Typography variant="body1" mt="0.2rem">
              14. Jan 2024 - 28 Mar. 2025
            </Typography>
          </Grid>

          {/* Detailbeschreibung */}
          <Grid item xs={6} paddingBottom={2}>
            <LabeledTextWithIcon
              text="Detailbeschreibung"
              Icon={MdOutlineEdit}
              iconColor="#22A7F1"
              iconSize="1.4rem"
              fontSize="1.2rem"
              textColor="blue.main"
              iconMarginLeft="0.8rem"
            />
            <Typography variant="body1" mt="0.2rem">
              Klicken Sie hier, um zu sehen
            </Typography>
          </Grid>

          {/* Dokumente */}
          <Grid item xs={6} paddingBottom={2}>
            <LabeledTextWithIcon
              text="Dokumente"
              Icon={MdOutlineEdit}
              iconColor="#22A7F1"
              iconSize="1.4rem"
              fontSize="1.2rem"
              textColor="blue.main"
              iconMarginLeft="0.8rem"
            />
            <Typography variant="body1" mt="0.2rem">
              Vor Ort zur Verfügung stellen
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Divider variant="middle" orientation="horizontal" flexItem />
      <Grid
        container
        justifyContent="flex-end"
        spacing={2}
        marginTop={"0.4rem"}
      >
        <Grid item>
          <GButton color="gprimary" variant="outlined">
            Bearbeiten
          </GButton>
          <GButton color="ggreen">Speichern</GButton>
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
