import React, { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";

import { Building } from "./types";
import BuildingListColumn from "./BuildingListColumn";
import FacilityListColumn from "./FacilityListColumn";
import TenderListColumn from "./TenderListColumn";
import { useAppSelector } from "@/lib/hooks";
import { getFacilitiesByBuilding } from "@/lib/features/facilitySlice";
import { Tender } from "@/screens/real-estate-owner/tenders/tender-overview/types";

interface BuildingWorkspaceProps {
  buildings: Building[];
}

const BuildingWorkspace: React.FC<BuildingWorkspaceProps> = ({ buildings }) => {
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(
    null
  );
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(
    null
  );
  const tenderList = useAppSelector(
    (state): Tender[] => state.tender.tenderList
  );
  const facilitiesOfSelectedBuilding = useAppSelector((state) =>
    selectedBuildingId ? getFacilitiesByBuilding(selectedBuildingId)(state) : []
  );

  useEffect(() => {
    if (!selectedBuildingId && buildings.length > 0) {
      setSelectedBuildingId(buildings[0].id);
    }
  }, [buildings, selectedBuildingId]);

  useEffect(() => {
    setSelectedFacilityId(null);
  }, [selectedBuildingId]);

  const selectedBuilding = useMemo(
    () =>
      buildings.find((building) => building.id === selectedBuildingId) ?? null,
    [buildings, selectedBuildingId]
  );

  const selectedFacility = useMemo(
    () =>
      facilitiesOfSelectedBuilding.find(
        (facility) => facility.id === selectedFacilityId
      ) ?? null,
    [facilitiesOfSelectedBuilding, selectedFacilityId]
  );

  const tendersOfSelectedFacility = useMemo<Tender[]>(
    () =>
      selectedFacilityId
        ? tenderList.filter(
            (tender) => tender.facility?.id === selectedFacilityId
          )
        : [],
    [tenderList, selectedFacilityId]
  );

  return (
    <Box sx={styles.workspace}>
      <BuildingListColumn
        buildings={buildings}
        selectedBuildingId={selectedBuildingId}
        onSelectBuilding={setSelectedBuildingId}
      />
      <FacilityListColumn
        buildingName={selectedBuilding?.buildingName ?? null}
        buildingSelected={selectedBuilding !== null}
        facilities={facilitiesOfSelectedBuilding}
        selectedFacilityId={selectedFacilityId}
        onSelectFacility={setSelectedFacilityId}
      />
      <TenderListColumn
        buildingName={selectedBuilding?.buildingName ?? null}
        facilityName={selectedFacility?.name ?? null}
        facilitySelected={selectedFacility !== null}
        tenders={tendersOfSelectedFacility}
      />
    </Box>
  );
};

export default BuildingWorkspace;

const styles = {
  workspace: {
    display: "flex",
    gap: "1rem",
    px: "1.5rem",
    pt: "1rem",
    pb: "1rem",
    height: "calc(100vh - 9.125rem)",
    overflow: "hidden",
  },
};
