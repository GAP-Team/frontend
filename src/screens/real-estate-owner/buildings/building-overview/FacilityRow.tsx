import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Facility } from "@/screens/real-estate-owner/facilities/facility-overview/types";
import { checkActiveTenderForFacility } from "@/lib/features/tenderSlice";
import { deleteFacility } from "@/lib/features/facilitySlice";
import { showSnackbar } from "@/components/feedback/snackbar";
import ActionMenu from "@/components/navigation/ActionMenu";

interface FacilityRowProps {
  facility: Facility;
}

const activeChipStyle = { bgcolor: "#96E9CB", color: "#056643" };

const FacilityRow: React.FC<FacilityRowProps> = ({ facility }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isActive = useAppSelector(checkActiveTenderForFacility(facility.id));

  const handleDelete = async (facilityId: string): Promise<void> => {
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

  return (
    <Paper sx={styles.row} elevation={2}>
      <Box sx={styles.info}>
        <Typography variant="bodylsb">{facility.name}</Typography>
        <Typography variant="bodymr" sx={styles.subcategory}>
          {facility.subcategory}
        </Typography>
      </Box>
      <Box sx={styles.meta}>
        {isActive && <Chip label="Aktiv" sx={activeChipStyle} size="small" />}
        <Typography variant="bodymr" sx={styles.tenderCount}>
          {`${facility.tenderIds?.length ?? 0} Ausschreibungen`}
        </Typography>
        <Box onClick={(event) => event.stopPropagation()}>
          <ActionMenu
            itemId={facility.id}
            onEdit={(id) =>
              router.push(ROUTES.REAL_ESTATE.FACILITY.EDIT_FACILITY(id))
            }
            onDelete={handleDelete}
            messege="Sind Sie sicher, dass Sie dieses Element löschen möchten?"
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default FacilityRow;

// Styles
const styles = {
  row: {
    p: "1rem",
    borderRadius: "0.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: "0.75rem",
  },
  info: {
    display: "flex",
    flexDirection: "column",
  },
  subcategory: {
    color: "#8D999C",
  },
  meta: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  tenderCount: {
    color: "#22A7F1",
    fontWeight: 500,
  },
};
