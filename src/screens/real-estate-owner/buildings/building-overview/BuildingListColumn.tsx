import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { CgNotes } from "react-icons/cg";
import { IoExtensionPuzzleOutline } from "react-icons/io5";

import { Building } from "./types";
import buildingAPI from "@/api/building";
import { useAppDispatch } from "@/lib/hooks";
import ActionMenu from "@/components/navigation/ActionMenu";
import GButton from "@/components/inputs/button/GButton";
import { ROUTES } from "@/utils/routes";
import { setUserBuilding } from "@/lib/features/buildingSlice";
import { styles as scrollbarStyles } from "@/components/utils/scrollbar/styles";

interface BuildingListColumnProps {
  buildings: Building[];
  selectedBuildingId: string | null;
  onSelectBuilding: (buildingId: string) => void;
}

const BuildingListColumn: React.FC<BuildingListColumnProps> = ({
  buildings,
  selectedBuildingId,
  onSelectBuilding,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleDeleteBuilding = async (buildingId: string): Promise<void> => {
    const deleteStatus = await buildingAPI.delete(buildingId);
    if (deleteStatus?.data?.statusCode === 204) {
      dispatch(
        setUserBuilding(
          buildings.filter((building) => building.id !== buildingId)
        )
      );
    }
  };

  return (
    <Paper sx={styles.column} elevation={2}>
      <Box sx={styles.header}>
        <Typography variant="bodylsb">Gebäude</Typography>
        <GButton
          size="small"
          href={ROUTES.REAL_ESTATE.BUILDING.ADD_BUILDING}
          sx={styles.addButton}
        >
          + Hinzufügen
        </GButton>
      </Box>
      <Box sx={styles.list}>
        {buildings.map((building) => (
          <BuildingRow
            key={building.id}
            building={building}
            selected={building.id === selectedBuildingId}
            onSelect={onSelectBuilding}
            onEdit={(id) =>
              router.push(ROUTES.REAL_ESTATE.BUILDING.EDIT_BUILDING(id))
            }
            onDelete={handleDeleteBuilding}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default BuildingListColumn;

interface BuildingRowProps {
  building: Building;
  selected: boolean;
  onSelect: (buildingId: string) => void;
  onEdit: (buildingId: string) => void;
  onDelete: (buildingId: string) => Promise<void>;
}

const BuildingRow: React.FC<BuildingRowProps> = ({
  building,
  selected,
  onSelect,
  onEdit,
  onDelete,
}) => {
  const facilityCount = building?.facilityIds?.length ?? 0;

  return (
    <Box
      sx={{ ...styles.row, ...(selected ? styles.rowSelected : {}) }}
      onClick={() => onSelect(building.id)}
    >
      <Box sx={styles.rowHeader}>
        <Box>
          <Typography variant="bodylsb">{building.buildingName}</Typography>
          <Typography variant="bodysr" color="gprimary.main">
            {building.buildingType}
          </Typography>
        </Box>
        <ActionMenu
          itemId={building.id}
          onEdit={onEdit}
          onDelete={onDelete}
          messege="Sind Sie sicher, dass Sie dieses Gebäude löschen möchten?"
        />
      </Box>
      <Stack direction="row" gap={2} sx={{ mt: "0.5rem" }}>
        <Stack direction="row" alignItems="center" gap={0.5}>
          <IoExtensionPuzzleOutline size="1rem" color="#A0ADB1" />
          <Typography variant="bodysr" color="#8D999C">
            {facilityCount}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={0.5}>
          <CgNotes size="1rem" color="#A0ADB1" />
          <Typography variant="bodysr" color="#8D999C">
            {building.tendersCount ?? 0}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

const styles = {
  column: {
    width: "22rem",
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
    alignItems: "center",
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
};
