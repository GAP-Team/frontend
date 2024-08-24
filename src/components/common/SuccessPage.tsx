import React from "react";
import Image from "next/image";
import { NextPage } from "next";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";
import GButton from "@/components/button/GButton";
import sucess_svg from "../../../public/icons/success.svg";

interface SuccessPageProps {
  title: string;
  description?: string;
  description2?: string;
  buttonLabel?: string;
  imageUrl?: string;
  redirectUrl?: string;
}

const SuccessPage: NextPage<SuccessPageProps> = ({
  title,
  description,
  description2,
  buttonLabel,
  imageUrl = sucess_svg,
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
      {description2 && (
        <Typography variant="bodymr" color="#475A60">
          {description2}
        </Typography>
      )}
      <Typography variant="h4sb" padding={"0.5rem"}>
        {title}
      </Typography>
      {description && (
        <Typography
          variant="bodymr"
          style={{ maxWidth: "22rem", textAlign: "center", color: "#8D999C" }}
        >
          {description}
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
