"use client";
import { TopFilterProps } from "@/typings/types";
import { Container, Typography } from "@mui/material";

const TopFilter: React.FC<TopFilterProps> = ({ title }): JSX.Element => {
  return (
    <Container maxWidth={false} sx={styles.container}>
      <Typography variant="h6" sx={styles.typography}>
        {title ? title : "Alle Aufträge"}
      </Typography>
    </Container>
  );
};

export default TopFilter;

const styles = {
  container: {
    mx: 2,
    py: "0.5rem",
    width: "auto",
    display: "flex",
    alignItems: "center",
    borderRadius: "0.5rem",
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  typography: {
    flexGrow: 1,
  },
  boxHolder: {
    width: "100%",
    borderRadius: 2,
    marginLeft: "4rem",
    bgcolor: "background.paper",
  },
  box: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
};
