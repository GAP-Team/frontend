import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { DOCUMENT_TYPE } from "@/utils/enums";
import { Facility } from "@/screens/real-estate-owner/facilities/facility-overview/types";
import { Building } from "./types";
import DocumentList from "./DocumentList";

interface DocumentTabPanelProps {
  building: Building;
  facilities: Facility[];
  onOpenFacility: (facility: Facility) => void;
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
  onOpenFacility,
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
            {"Dokumente: "}
            <Link
              component="button"
              type="button"
              underline="hover"
              sx={styles.facilityLink}
              onClick={() => onOpenFacility(facility)}
            >
              {facility.name}
            </Link>
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
  facilityLink: {
    font: "inherit",
    color: "#22A7F1",
    verticalAlign: "baseline",
  },
  sectionTitle: {
    display: "block",
    mb: "0.5rem",
  },
  empty: {
    color: "#8D999C",
  },
};
