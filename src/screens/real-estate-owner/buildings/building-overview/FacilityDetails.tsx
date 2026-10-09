import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DetailItem from "@/components/data-display/DetailItem";
import { DOCUMENT_TYPE } from "@/utils/enums";
import { Facility } from "@/screens/real-estate-owner/facilities/facility-overview/types";
import { getFacilityDetailSections } from "@/screens/real-estate-owner/facilities/facilityDetails";
import DocumentList from "./DocumentList";

interface FacilityDetailsProps {
  facility: Facility;
}

const documentGroups = [
  {
    title: "Berichte (Prüf- und Wartungsberichte)",
    documentType: DOCUMENT_TYPE.CHECK_REPORTS,
  },
  { title: "Grundrisse & Schema", documentType: DOCUMENT_TYPE.FLOOR_PLANS },
  { title: "Sonstige Dokumente", documentType: DOCUMENT_TYPE.OTHER },
];

const FacilityDetails: React.FC<FacilityDetailsProps> = ({ facility }) => {
  const documents = facility.documents ?? [];

  return (
    <Box sx={styles.container}>
      {getFacilityDetailSections(facility).map((section) => (
        <Box key={section.title} sx={styles.section}>
          <Typography variant="bodylsb" sx={styles.sectionTitle}>
            {section.title}
          </Typography>
          <Grid container spacing={1.5}>
            {section.entries.map((entry) => (
              <Grid item xs={12} sm={6} md={4} key={entry.label}>
                <DetailItem label={entry.label} value={entry.value} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
      <Box sx={styles.section}>
        <Typography variant="bodylsb" sx={styles.sectionTitle}>
          Dokumente
        </Typography>
        {documents.length > 0 ? (
          documentGroups.map((group) => (
            <DocumentList
              key={group.documentType}
              title={group.title}
              documentType={group.documentType}
              documents={documents}
            />
          ))
        ) : (
          <Typography variant="bodymr" sx={styles.empty}>
            Für diese Anlage wurden noch keine Dokumente hochgeladen.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default FacilityDetails;

// Styles
const styles = {
  container: {
    pt: "1rem",
  },
  section: {
    mb: "1.25rem",
  },
  sectionTitle: {
    display: "block",
    mb: "0.75rem",
  },
  empty: {
    color: "#8D999C",
  },
};
