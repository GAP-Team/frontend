import React from "react";
import Image from "next/image";
import { NextPage } from "next";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import GButton from "@/components/inputs/button/GButton";
import sucessSvg from "../../../public/icons/success.svg";

interface SuccessPageProps {
  title: string;
  secondaryDescription?: string;
  primaryDescription?: string;
  buttonLabel?: string;
  imageUrl?: string;
  redirectUrl?: string;
}

const SuccessPage: NextPage<SuccessPageProps> = ({
  title,
  secondaryDescription,
  primaryDescription,
  buttonLabel,
  imageUrl = sucessSvg,
  redirectUrl = "/",
}) => {
  return (
    <Grid item xs={12} md={12} lg={12} sx={styles}>
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
      {buttonLabel && (
        <GButton style={{ marginTop: "2rem" }} href={redirectUrl}>
          {buttonLabel}
        </GButton>
      )}
    </Grid>
  );
};

export default SuccessPage;

// Styles
const styles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};
