import React, { useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMore from "@mui/icons-material/ExpandMore";
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
import { withReturnTo } from "@/utils/returnTo";
import FacilityDetails from "./FacilityDetails";
import FacilityDocumentUploadDialog from "./FacilityDocumentUploadDialog";

interface FacilityRowProps {
  facility: Facility;
  returnTo: string;
}

const activeChipStyle = { bgcolor: "#96E9CB", color: "#056643" };

const FacilityRow: React.FC<FacilityRowProps> = ({ facility, returnTo }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
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
    <>
      <Paper sx={styles.card} elevation={2}>
        <Box
          sx={styles.row}
          onClick={() => setIsExpanded((expanded) => !expanded)}
        >
          <Box sx={styles.title}>
            <IconButton
              size="small"
              aria-label={
                isExpanded ? "Details ausblenden" : "Details anzeigen"
              }
              aria-expanded={isExpanded}
              sx={{ ...styles.chevron, ...(isExpanded && styles.chevronOpen) }}
            >
              <ExpandMore />
            </IconButton>
            <Box sx={styles.info}>
              <Typography variant="bodylsb">{facility.name}</Typography>
              <Typography variant="bodymr" sx={styles.subcategory}>
                {facility.subcategory}
              </Typography>
            </Box>
          </Box>
          <Box sx={styles.meta}>
            {isActive && (
              <Chip label="Aktiv" sx={activeChipStyle} size="small" />
            )}
            <Typography variant="bodymr" sx={styles.tenderCount}>
              {`${facility.tenderIds?.length ?? 0} Ausschreibungen`}
            </Typography>
            <Box onClick={(event) => event.stopPropagation()}>
              <ActionMenu
                itemId={facility.id}
                onEdit={(id) =>
                  router.push(
                    withReturnTo(
                      ROUTES.REAL_ESTATE.FACILITY.EDIT_FACILITY(id),
                      returnTo
                    )
                  )
                }
                onDelete={handleDelete}
                onUploadDocuments={() => setIsUploadOpen(true)}
                messege="Sind Sie sicher, dass Sie dieses Element löschen möchten?"
              />
            </Box>
          </Box>
        </Box>
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <FacilityDetails facility={facility} />
        </Collapse>
      </Paper>
      <FacilityDocumentUploadDialog
        facility={facility}
        open={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
      />
    </>
  );
};

export default FacilityRow;

// Styles
const styles = {
  card: {
    p: "1rem",
    borderRadius: "0.5rem",
    mb: "0.75rem",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  },
  title: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  chevron: {
    transform: "rotate(-90deg)",
    transition: "transform 0.2s ease-in-out",
  },
  chevronOpen: {
    transform: "rotate(0deg)",
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
