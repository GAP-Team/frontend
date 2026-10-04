import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { DOCUMENT_TYPE } from "@/utils/enums";
import { Facility } from "@/screens/real-estate-owner/facilities/facility-overview/types";
import { Building } from "./types";
import DocumentList from "./DocumentList";

interface DocumentTabPanelProps {
  building: Building;
  facilities: Facility[];
}

const buildingDocumentGroups = [
  {
    title: "Bauunterlagen",
    documentType: DOCUMENT_TYPE.CONSTRUCTION_DOCUMENTS,
  },
  { title: "Grundrisse", documentType: DOCUMENT_TYPE.FLOOR_PLANS },
  { title: "Sonstige Dokumente", documentType: DOCUMENT_TYPE.OTHER },
];

const DocumentTabPanel: React.FC<DocumentTabPanelProps> = ({
  building,
  facilities,
}) => {
  const buildingDocuments = building.documents ?? [];
  const facilitiesWithDocuments = facilities.filter(
    (facility) => facility.documents?.length > 0
  );

  if (buildingDocuments.length === 0 && facilitiesWithDocuments.length === 0) {
    return (
      <Box sx={styles.container}>
        <Typography variant="bodymr" sx={styles.empty}>
          Für dieses Gebäude und seine Anlagen wurden noch keine Dokumente
          hochgeladen.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      {buildingDocuments.length > 0 && (
        <Paper sx={styles.section} elevation={2}>
          <Typography variant="bodylsb" sx={styles.sectionTitle}>
            Dokumente des Gebäudes
          </Typography>
          {buildingDocumentGroups.map((group) => (
            <DocumentList
              key={group.documentType}
              title={group.title}
              documentType={group.documentType}
              documents={buildingDocuments}
            />
          ))}
        </Paper>
      )}
      {facilitiesWithDocuments.map((facility) => (
        <Paper key={facility.id} sx={styles.section} elevation={2}>
          <Typography variant="bodylsb" sx={styles.sectionTitle}>
            {`Dokumente: ${facility.name}`}
          </Typography>
          <DocumentList documents={facility.documents} />
        </Paper>
      ))}
    </Box>
  );
};

export default DocumentTabPanel;

// Styles
const styles = {
  container: {
    pt: "1rem",
  },
  section: {
    p: "1.25rem",
    borderRadius: "0.5rem",
    mb: "0.75rem",
  },
  sectionTitle: {
    display: "block",
    mb: "0.5rem",
  },
  empty: {
    color: "#8D999C",
  },
};
