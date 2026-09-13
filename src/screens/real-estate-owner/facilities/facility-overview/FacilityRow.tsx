// FacilityRow.tsx
import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import { SxProps } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { MdExpandMore } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import { useRouter } from "next/navigation";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { ROUTES } from "@/utils/routes";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ActionMenu from "@/components/navigation/ActionMenu";
import GButton from "@/components/inputs/button/GButton";
import { showSnackbar } from "@/components/feedback/snackbar";
import { deleteFacility } from "@/lib/features/facilitySlice";
import { checkActiveTenderForFacility } from "@/lib/features/tenderSlice";
import { Facility } from "./types";
import { Tender } from "@/screens/real-estate-owner/tenders/tender-overview/types";
import TenderRow from "@/screens/real-estate-owner/buildings/building-overview/TenderRow";

interface FacilityRowProps {
  facility: Facility;
}

const activeStatusStyle = { bgcolor: "#96E9CB", color: "#056643" };

const FacilityRow: React.FC<FacilityRowProps> = ({ facility }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isActive = useAppSelector(checkActiveTenderForFacility(facility.id));
  const tenderList: Tender[] = useAppSelector(
    (state) => state.tender.tenderList
  );

  const facilityTenders = useMemo(
    (): Tender[] =>
      tenderList.filter(
        (tender: Tender) => tender.facility?.id === facility.id
      ),
    [tenderList, facility.id]
  );

  const handleDeleteFacility = async (facilityId: string): Promise<void> => {
    try {
      await dispatch(deleteFacility(facilityId)).unwrap();
      dispatch(
        showSnackbar({
          type: "success",
          message: "Die Anlage wurden erfolgreich gelöscht!",
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
    <Accordion sx={styles.accordion} disableGutters elevation={0}>
      <AccordionSummary expandIcon={<MdExpandMore />} sx={styles.summary}>
        <Stack sx={styles.header}>
          <Stack direction="row" alignItems="center" gap={1.5}>
            <Box>
              <Typography variant="bodylsb">{facility.name}</Typography>
              <Typography variant="bodymr" color="#8D999C">
                {facility.subcategory || facility.facilityType}
              </Typography>
            </Box>
            {isActive && (
              <Chip
                size="small"
                label="Aktiv"
                sx={{
                  bgcolor: activeStatusStyle.bgcolor,
                  color: activeStatusStyle.color,
                }}
              />
            )}
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            gap={2}
            onClick={(event) => event.stopPropagation()}
          >
            <Stack direction="row" alignItems="center" gap={0.75}>
              <CgNotes size="1.1rem" color="#A0ADB1" />
              <Typography variant="bodymsb">{`${facilityTenders.length} Ausschreibungen`}</Typography>
            </Stack>
            <ActionMenu
              itemId={facility.id}
              onEdit={(id) =>
                router.push(ROUTES.REAL_ESTATE.FACILITY.EDIT_FACILITY(id))
              }
              onDelete={handleDeleteFacility}
              messege={`Sind Sie sicher, dass Sie dieses Element${
                facilityTenders.length
                  ? ` und die zugehörigen ${facilityTenders.length} Ausschreibungen`
                  : ""
              } löschen möchten?`}
            />
          </Stack>
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={styles.details}>
        {facilityTenders.length > 0 ? (
          facilityTenders.map((tender) => (
            <TenderRow key={tender.id} tender={tender} />
          ))
        ) : (
          <Stack sx={styles.emptyState}>
            <Typography variant="bodymr" color="#8D999C">
              Für diese Anlage gibt es noch keine Ausschreibungen.
            </Typography>
            <GButton size="small" href={ROUTES.REAL_ESTATE.TENDER.ADD_TENDER}>
              Ausschreibung hinzufügen
            </GButton>
          </Stack>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default FacilityRow;

// Styles
const styles: {
  accordion: SxProps;
  summary: SxProps;
  header: SxProps;
  details: SxProps;
  emptyState: SxProps;
} = {
  accordion: {
    "&:before": { display: "none" },
    bgcolor: "#F1F3F4",
    borderRadius: "0.5rem !important",
  },
  summary: {
    borderRadius: "0.5rem",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    pr: "0.5rem",
  },
  details: {
    bgcolor: "white",
    borderRadius: "0 0 0.5rem 0.5rem",
    pl: "2rem",
  },
  emptyState: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    py: "0.5rem",
  },
};
