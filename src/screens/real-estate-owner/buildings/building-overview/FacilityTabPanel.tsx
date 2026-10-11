import React, { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GButton from "@/components/inputs/button/GButton";
import { ROUTES } from "@/utils/routes";
import { Facility } from "@/screens/real-estate-owner/facilities/facility-overview/types";
import FacilityRow from "./FacilityRow";
import FacilityListToolbar from "./FacilityListToolbar";
import {
  DEFAULT_FACILITY_FILTERS,
  FacilityFilters,
  applyFacilityFilters,
  getFacilityTypes,
} from "./facilityFilters";
import { useAppSelector } from "@/lib/hooks";
import { Tender } from "@/screens/real-estate-owner/tenders/tender-overview/types";
import { TenderStatusEnum } from "@/utils/enums";
import { withReturnTo } from "@/utils/returnTo";

interface FacilityTabPanelProps {
  facilities: Facility[];
  returnTo: string;
  onShowTenders: (facility: Facility) => void;
  focusedFacilityId?: string | null;
}

const FacilityTabPanel: React.FC<FacilityTabPanelProps> = ({
  facilities,
  returnTo,
  onShowTenders,
  focusedFacilityId,
}) => {
  const [filters, setFilters] = useState<FacilityFilters>(
    DEFAULT_FACILITY_FILTERS
  );
  const tenderList: Tender[] = useAppSelector(
    (state) => state.tender.tenderList
  );
  const facilityTypes = useMemo(
    () => getFacilityTypes(facilities),
    [facilities]
  );
  const visibleFacilities = useMemo(() => {
    const activeTenderFacilityIds = new Set(
      tenderList
        .filter((tender) => tender.status === TenderStatusEnum.ACTIVE)
        .map((tender) => tender.facility?.id)
    );
    return applyFacilityFilters(facilities, filters, activeTenderFacilityIds);
  }, [facilities, filters, tenderList]);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Typography variant="bodylsb">Anlagen dieses Gebäudes</Typography>
        <GButton
          href={withReturnTo(
            ROUTES.REAL_ESTATE.FACILITY.ADD_FACILITY,
            returnTo
          )}
        >
          Anlage hinzufügen
        </GButton>
      </Box>
      {facilities.length > 0 && (
        <FacilityListToolbar
          filters={filters}
          facilityTypes={facilityTypes}
          onChange={setFilters}
        />
      )}
      {visibleFacilities.map((facility) => (
        <FacilityRow
          key={facility.id}
          facility={facility}
          returnTo={returnTo}
          onShowTenders={onShowTenders}
          isFocused={facility.id === focusedFacilityId}
        />
      ))}
      {visibleFacilities.length === 0 && (
        <Typography variant="bodymr" sx={styles.empty}>
          {facilities.length > 0
            ? "Keine Anlagen für diese Filter"
            : "Für dieses Gebäude wurden noch keine Anlagen angelegt."}
        </Typography>
      )}
    </Box>
  );
};

export default FacilityTabPanel;

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
