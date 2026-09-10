"use client";
import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

interface DataDisplayBarProps {
  title?: string;
  subTitle?: string;
  companyName?: string;
  officeAddress?: string;
}

const DataDisplayBar: React.FC<DataDisplayBarProps> = ({
  title,
  subTitle,
  companyName,
  officeAddress,
}) => {
  return (
    <Container maxWidth={false} sx={styles.container}>
      {title && (
        <Typography sx={styles.titleTypography}>{title} • &nbsp;</Typography>
      )}
      {subTitle && (
        <Typography sx={styles.desTypography}>{subTitle}</Typography>
      )}
      {companyName && (
        <Typography sx={{ ...styles.desTypography }}>
          {companyName} • &nbsp;
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

export default DataDisplayBar;

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
