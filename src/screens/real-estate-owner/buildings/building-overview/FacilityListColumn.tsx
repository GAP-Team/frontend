import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { CgNotes } from "react-icons/cg";

import { Facility } from "@/screens/real-estate-owner/facilities/facility-overview/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { checkActiveTenderForFacility } from "@/lib/features/tenderSlice";
import { deleteFacility } from "@/lib/features/facilitySlice";
import ActionMenu from "@/components/navigation/ActionMenu";
import GButton from "@/components/inputs/button/GButton";
import { ROUTES } from "@/utils/routes";
import { showSnackbar } from "@/components/feedback/snackbar";
import { styles as scrollbarStyles } from "@/components/utils/scrollbar/styles";

interface FacilityListColumnProps {
  buildingName: string | null;
  buildingSelected: boolean;
  facilities: Facility[];
  selectedFacilityId: string | null;
  onSelectFacility: (facilityId: string) => void;
}

const FacilityListColumn: React.FC<FacilityListColumnProps> = ({
  buildingName,
  buildingSelected,
  facilities,
  selectedFacilityId,
  onSelectFacility,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleDeleteFacility = async (facilityId: string): Promise<void> => {
    try {
      await dispatch(deleteFacility(facilityId)).unwrap();
      dispatch(
        showSnackbar({
          type: "success",
          message: "Die Anlage wurde erfolgreich gelöscht!",
        })
      );
    } catch {
      dispatch(
        showSnackbar({
          type: "error",
          message: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
        })
      );
    }
  };

  const renderBody = (): React.ReactNode => {
    if (!buildingSelected) {
      return (
        <EmptyState message="Wählen Sie links ein Gebäude aus, um seine Anlagen zu sehen." />
      );
    }
    if (facilities.length === 0) {
      return (
        <EmptyState message="Für dieses Gebäude sind noch keine Anlagen angelegt." />
      );
    }
    return facilities.map((facility) => (
      <FacilityRow
        key={facility.id}
        facility={facility}
        selected={facility.id === selectedFacilityId}
        onSelect={onSelectFacility}
        onEdit={(id) =>
          router.push(ROUTES.REAL_ESTATE.FACILITY.EDIT_FACILITY(id))
        }
        onDelete={handleDeleteFacility}
      />
    ));
  };

  return (
    <Paper sx={styles.column} elevation={2}>
      <Box sx={styles.header}>
        <Box>
          <Typography variant="bodylsb">Anlagen</Typography>
          {buildingName && (
            <Typography variant="bodysr" color="#8D999C">
              {buildingName}
            </Typography>
          )}
        </Box>
        <GButton
          size="small"
          href={ROUTES.REAL_ESTATE.FACILITY.ADD_FACILITY}
          sx={styles.addButton}
        >
          + Hinzufügen
        </GButton>
      </Box>
      <Box sx={styles.list}>{renderBody()}</Box>
    </Paper>
  );
};

export default FacilityListColumn;

interface FacilityRowProps {
  facility: Facility;
  selected: boolean;
  onSelect: (facilityId: string) => void;
  onEdit: (facilityId: string) => void;
  onDelete: (facilityId: string) => Promise<void>;
}

const FacilityRow: React.FC<FacilityRowProps> = ({
  facility,
  selected,
  onSelect,
  onEdit,
  onDelete,
}) => {
  const isActive = useAppSelector((state) =>
    checkActiveTenderForFacility(facility.id)(state)
  );

  return (
    <Box
      sx={{ ...styles.row, ...(selected ? styles.rowSelected : {}) }}
      onClick={() => onSelect(facility.id)}
    >
      <Box sx={styles.rowHeader}>
        <Box>
          <Typography variant="bodylsb">{facility.name}</Typography>
          <Typography variant="bodysr" color="#8D999C">
            {facility.subcategory}
          </Typography>
        </Box>
        <ActionMenu
          itemId={facility.id}
          onEdit={onEdit}
          onDelete={onDelete}
          messege="Sind Sie sicher, dass Sie diese Anlage löschen möchten?"
        />
      </Box>
      <Stack direction="row" alignItems="center" gap={1} sx={{ mt: "0.5rem" }}>
        {isActive && (
          <Chip
            label="Aktiv"
            size="small"
            sx={{ bgcolor: "#96E9CB", color: "#056643" }}
          />
        )}
        <Stack direction="row" alignItems="center" gap={0.5}>
          <CgNotes size="1rem" color="#A0ADB1" />
          <Typography variant="bodysr" color="#8D999C">
            {facility.tenderIds?.length ?? 0}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <Typography variant="bodymr" sx={styles.emptyState}>
    {message}
  </Typography>
);

const styles = {
  column: {
    width: "26rem",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    borderRadius: "0.5rem",
    p: "1rem",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    mb: "0.75rem",
  },
  addButton: {
    m: 0,
    px: "0.75rem",
    py: "0.35rem",
  },
  list: {
    flexGrow: 1,
    overflow: "auto",
    pr: "0.5rem",
    ...scrollbarStyles,
  },
  row: {
    borderRadius: "0.5rem",
    border: "1px solid #E5E9EA",
    p: "0.75rem",
    mb: "0.5rem",
    cursor: "pointer",
  },
  rowSelected: {
    backgroundColor: "rgba(34, 167, 241, 0.08)",
    borderColor: "#22A7F1",
    borderLeftWidth: "3px",
  },
  rowHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  emptyState: {
    color: "#8D999C",
    textAlign: "center",
    mt: "2rem",
    px: "1rem",
  },
};
