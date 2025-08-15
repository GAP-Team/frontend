import React from "react";
import Image from "next/image";
import { NextPage } from "next";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import sucessSvg from "@/../public/icons/success.svg";
import GButton from "@/components/inputs/button/GButton";

interface SuccessPageProps {
  title: string;
  secondaryDescription?: string;
  primaryDescription?: string;
  buttonLabel?: string;
  imageUrl?: string;
  redirectUrl?: string;
  secondaryButtonLabel?: string;
  secondaryButtonRedirectUrl?: string;
}

const SuccessPage: NextPage<SuccessPageProps> = ({
  title,
  secondaryDescription,
  primaryDescription,
  buttonLabel,
  imageUrl = sucessSvg,
  redirectUrl = "/",
  secondaryButtonLabel,
  secondaryButtonRedirectUrl,
}) => {
  return (
    <Grid item xs={12} md={12} lg={12} sx={styles.mainContainer}>
      <div
        style={{
          marginBottom: "2rem",
          position: "relative",
          height: "8rem",
          width: "8rem",
        }}
      >
        <Image priority alt="Success" src={imageUrl} fill />
      </div>
      {primaryDescription && (
        <Typography variant="bodymr" color="#475A60">
          {primaryDescription}
        </Typography>
      )}
      <Typography variant="h4sb" padding={"0.5rem"}>
        {title}
      </Typography>
      {secondaryDescription && (
        <Typography
          variant="bodymr"
          style={{ maxWidth: "22rem", textAlign: "center", color: "#8D999C" }}
        >
          {secondaryDescription}
        </Typography>
      )}
      <Grid
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        {secondaryButtonLabel && (
          <Button sx={styles.secondaryButton} href={secondaryButtonRedirectUrl}>
            {secondaryButtonLabel}
          </Button>
        )}
        {buttonLabel && (
          <GButton style={{ marginTop: "2rem" }} href={redirectUrl}>
            {buttonLabel}
          </GButton>
        )}
      </Grid>
    </Grid>
  );
};

export default SuccessPage;

// Styles
const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButton: {
    py: "0.5rem",
    color: "#000",
    fontWeight: 600,
    margin: "0.5rem",
    marginTop: "2rem",
    borderRadius: "0.5rem",
    backgroundColor: "#e4e9e9",
    textTransform: "capitalize",
  },
};
