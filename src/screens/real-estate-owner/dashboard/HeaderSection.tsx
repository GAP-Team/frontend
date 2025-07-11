import React from "react";
import Box from "@mui/material/Box";
import { ROUTES } from "@/utils/routes";
import SectionTitle from "@/components/data-display/label/SectionTitle"; 
import DividerDecorator from "@/components/data-display/divider/DividerDecorator"; 

interface HeaderSectionProps {
  count?: number;
  titletext: string;
  overviewText?: string;
}

// FIXME: we do not have headerSection? and why it belongs just to real estate owner?
const HeaderSection: React.FC<HeaderSectionProps> = ({
  count,
  titletext,
  overviewText,
}) => {
  return (
    <>
      <Box sx={styles.headerSection}>
        <Box>
          <SectionTitle
            text={count !== undefined ? `${titletext} (${count})` : titletext}
          />
          <DividerDecorator sx={{ bgcolor: "#2356FF" }} />
        </Box>
        {overviewText && (
          <SectionTitle
            text={overviewText}
            sx={styles.overviewSection}
            href={ROUTES.REAL_ESTATE.TENDER.TENDERS}
          />
        )}
      </Box>
    </>
  );
};

export default HeaderSection;

// Ensure to define or import these styles as needed
const styles = {
  headerSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    // Additional styling as needed
  },
  overviewSection: {
    color: "#22A7F1",
    lineHeight: "1.25rem",
    fontSize: "0.875rem",
  },
};
