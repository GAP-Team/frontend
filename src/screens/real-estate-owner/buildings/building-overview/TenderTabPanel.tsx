import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import GButton from "@/components/inputs/button/GButton";
import { ROUTES } from "@/utils/routes";
import { Tender } from "@/screens/real-estate-owner/tenders/tender-overview/types";
import TenderRow from "./TenderRow";
import { withReturnTo } from "@/utils/returnTo";

interface TenderTabPanelProps {
  tenders: Tender[];
  returnTo: string;
  // When set, the list is filtered to this facility and can be cleared.
  facilityName?: string;
  onClearFilter: () => void;
}

const TenderTabPanel: React.FC<TenderTabPanelProps> = ({
  tenders,
  returnTo,
  facilityName,
  onClearFilter,
}) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Box sx={styles.title}>
          <Typography variant="bodylsb">
            Ausschreibungen dieses Gebäudes
          </Typography>
          {facilityName && (
            <Chip
              label={`Anlage: ${facilityName}`}
              onDelete={onClearFilter}
              color="gprimary"
              size="small"
            />
          )}
        </Box>
        <GButton
          href={withReturnTo(ROUTES.REAL_ESTATE.TENDER.ADD_TENDER, returnTo)}
        >
          Ausschreibung hinzufügen
        </GButton>
      </Box>
      {tenders.length > 0 ? (
        tenders.map((tender) => (
          <TenderRow key={tender.id} tender={tender} returnTo={returnTo} />
        ))
      ) : (
        <Typography variant="bodymr" sx={styles.empty}>
          {facilityName
            ? "Für diese Anlage wurden noch keine Ausschreibungen erstellt."
            : "Für dieses Gebäude wurden noch keine Ausschreibungen erstellt."}
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
  title: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
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
