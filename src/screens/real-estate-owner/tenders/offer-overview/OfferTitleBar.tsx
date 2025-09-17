"use client";
import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

interface OfferTitleBarProps {
  offerTitle?: string;
  offerSubTitle?: string;
  zipCode?: string;
  officeAddress?: string;
}

const OfferTitleBar: React.FC<OfferTitleBarProps> = ({
  offerTitle,
  offerSubTitle,
  zipCode,
  officeAddress,
}) => {
  return (
    <Container maxWidth={false} sx={{ ...styles.container }}>
      {offerTitle && (
        <Typography sx={{ ...styles.titleTypography }}>
          {"Angebote "} • &nbsp;
        </Typography>
      )}
      {offerSubTitle && (
        <Typography sx={{ ...styles.desTypography }}>
          {offerSubTitle} • &nbsp;
        </Typography>
      )}
      {zipCode && (
        <Typography sx={{ ...styles.desTypography }}>
          {zipCode} • &nbsp;
        </Typography>
      )}
      {officeAddress && (
        <Typography sx={{ ...styles.desTypography }}>
          {officeAddress}
        </Typography>
      )}
    </Container>
  );
};

export default OfferTitleBar;

const styles = {
  container: {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    borderRadius: "0.5rem",
    mx: 3,
    py: "0.8rem",
    my: 3,
    width: "100%",
  },
  titleTypography: {
    flexGrow: 0,
    display: { xs: "none", sm: "block" },
    fontSize: "1.2rem",
    fontWeight: "600",
    lineHeight: "2rem",
  },
  desTypography: {
    fontSize: "1.2rem",
    fontWeight: "400",
    lineHeight: "2rem",
    display: "inline",
  },
};
