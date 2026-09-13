import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GButton from "@/components/inputs/button/GButton";
import { ROUTES } from "@/utils/routes";
import { Tender } from "@/screens/real-estate-owner/tenders/tender-overview/types";
import TenderRow from "./TenderRow";

interface TenderTabPanelProps {
  tenders: Tender[];
}

const TenderTabPanel: React.FC<TenderTabPanelProps> = ({ tenders }) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Typography variant="bodylsb">
          Ausschreibungen dieses Gebäudes
        </Typography>
        <GButton href={ROUTES.REAL_ESTATE.TENDER.ADD_TENDER}>
          Ausschreibung hinzufügen
        </GButton>
      </Box>
      {tenders.length > 0 ? (
        tenders.map((tender) => <TenderRow key={tender.id} tender={tender} />)
      ) : (
        <Typography variant="bodymr" sx={styles.empty}>
          Für dieses Gebäude wurden noch keine Ausschreibungen erstellt.
        </Typography>
      )}
    </Box>
  );
};

export default TenderTabPanel;

// Styles
const styles = {
  container: {
    pt: "1rem",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: "1rem",
  },
  empty: {
    color: "#8D999C",
  },
};
