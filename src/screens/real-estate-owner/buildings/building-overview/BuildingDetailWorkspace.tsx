import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { FaRegEdit } from "react-icons/fa";
import { ROUTES } from "@/utils/routes";
import { useAppSelector } from "@/lib/hooks";
import { Building } from "./types";
import BuildingStatTiles from "./BuildingStatTiles";
import FacilityTabPanel from "./FacilityTabPanel";
import TenderTabPanel from "./TenderTabPanel";
import { getFacilitiesByBuilding } from "@/lib/features/facilitySlice";
import { getTendersByBuilding } from "@/lib/features/tenderSlice";

interface BuildingDetailWorkspaceProps {
  building: Building;
  initialTab?: number;
  onBack: () => void;
}

const BuildingDetailWorkspace: React.FC<BuildingDetailWorkspaceProps> = ({
  building,
  initialTab = 0,
  onBack,
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<number>(initialTab);
  const facilities = useAppSelector(getFacilitiesByBuilding(building.id));
  const tenders = useAppSelector(getTendersByBuilding(building.id));

  const handleTabChange = (
    _event: React.SyntheticEvent,
    value: number
  ): void => {
    setActiveTab(value);
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="bodymsb" sx={styles.breadcrumb} onClick={onBack}>
        {"← Alle Objekte / "}
        <Typography component="span" variant="bodylsb">
          {building.buildingName}
        </Typography>
      </Typography>

      <Box sx={styles.header}>
        <Box>
          <Typography variant="h4sb">{building.buildingName}</Typography>
          <Typography variant="bodymr" sx={styles.address}>
            {`${building.address.street} ${building.address.houseNumber}, ${building.address.zip} ${building.address.city}`}
          </Typography>
        </Box>
        <Box
          sx={styles.editLink}
          onClick={() =>
            router.push(ROUTES.REAL_ESTATE.BUILDING.EDIT_BUILDING(building.id))
          }
        >
          <FaRegEdit size="1.1rem" />
          <Typography variant="bodymsb">Bearbeiten</Typography>
        </Box>
      </Box>

      <BuildingStatTiles facilities={facilities} tenders={tenders} />

      <Tabs value={activeTab} onChange={handleTabChange} sx={styles.tabs}>
        <Tab label="Anlagen" />
        <Tab label="Ausschreibungen" />
      </Tabs>

      {activeTab === 0 ? (
        <FacilityTabPanel facilities={facilities} />
      ) : (
        <TenderTabPanel tenders={tenders} />
      )}
    </Box>
  );
};

export default BuildingDetailWorkspace;

// Styles
const styles = {
  container: {
    px: "1.5rem",
    pt: "1.5rem",
    height: "calc(100vh - 9.125rem)",
    overflow: "auto",
  },
  breadcrumb: {
    color: "#22A7F1",
    cursor: "pointer",
    mb: "1rem",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    mb: "1.25rem",
  },
  address: {
    color: "#8D999C",
    mt: "0.25rem",
  },
  editLink: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#22A7F1",
    cursor: "pointer",
  },
  tabs: {
    mt: "1.5rem",
    borderBottom: 1,
    borderColor: "divider",
  },
};
