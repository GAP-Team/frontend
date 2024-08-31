"use client";

import HeaderSection from "../../real_estate_user/HeaderSection";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import stepperHorizontal from "../../../../../public/icons/stepper-horizontal.svg";
import Grid from "@mui/material/Grid";
import { MdOutlineEdit } from "react-icons/md";
import Divider from "@mui/material/Divider";
import GButton from "@/components/button/GButton";
import { dummySummaryData } from "../../../../utils/Constants";
import LabelText from "@/components/label/LabelText";

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
        {dummySummaryData.map((item, index) => (
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
