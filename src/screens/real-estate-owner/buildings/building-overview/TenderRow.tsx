import React from "react";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";
import { useAppDispatch } from "@/lib/hooks";
import { Tender } from "@/screens/real-estate-owner/tenders/tender-overview/types";
import { deleteTender } from "@/lib/features/tenderSlice";
import { showSnackbar } from "@/components/feedback/snackbar";
import { getTenderStatusStyle, translateTenderForm } from "@/utils/utils";
import ActionMenu from "@/components/navigation/ActionMenu";

interface TenderRowProps {
  tender: Tender;
}

const TenderRow: React.FC<TenderRowProps> = ({ tender }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const statusStyle = getTenderStatusStyle[tender.status];

  const handleClick = (): void => {
    router.push(ROUTES.REAL_ESTATE.TENDER.TENDER_DETAILS(tender.id));
  };

  const handleDelete = async (tenderId: string): Promise<void> => {
    try {
      await dispatch(deleteTender(tenderId)).unwrap();
      dispatch(
        showSnackbar({
          type: "success",
          message: "Ausschreibung erfolgreich gelöscht!",
        })
      );
    } catch {
      dispatch(
        showSnackbar({
          type: "error",
          message:
            "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut",
        })
      );
    }
  };

  return (
    <Paper sx={styles.row} elevation={2} onClick={handleClick}>
      <Box sx={styles.info}>
        <Box sx={styles.chips}>
          {statusStyle && (
            <Chip
              label={statusStyle.title}
              size="small"
              sx={{ bgcolor: statusStyle.bgcolor, color: statusStyle.color }}
            />
          )}
          <Chip
            label={translateTenderForm(tender.tenderForm)}
            size="small"
            color="gprimary"
          />
        </Box>
        <Typography variant="bodylsb">{tender.facility?.name}</Typography>
        <Typography variant="bodymr" sx={styles.dateRange}>
          {`${dayjs(tender.fromDate).format("DD.MM.YYYY")} - ${dayjs(tender.toDate).format("DD.MM.YYYY")}`}
        </Typography>
      </Box>
      <Box onClick={(event) => event.stopPropagation()}>
        <ActionMenu
          itemId={tender.id}
          onEdit={(id) =>
            router.push(ROUTES.REAL_ESTATE.TENDER.EDIT_TENDER(id))
          }
          onDelete={handleDelete}
          messege="Sind Sie sicher, dass Sie dieses Element löschen möchten?"
        />
      </Box>
    </Paper>
  );
};

export default TenderRow;

// Styles
const styles = {
  row: {
    p: "1rem",
    borderRadius: "0.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: "0.75rem",
    cursor: "pointer",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  },
  chips: {
    display: "flex",
    gap: "0.5rem",
    mb: "0.25rem",
  },
  dateRange: {
    color: "#8D999C",
  },
};
