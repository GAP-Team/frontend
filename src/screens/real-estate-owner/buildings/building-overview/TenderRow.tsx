// TenderRow.tsx
import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { SxProps } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";
import ActionMenu from "@/components/navigation/ActionMenu";
import { useAppDispatch } from "@/lib/hooks";
import { showSnackbar } from "@/components/feedback/snackbar";
import { deleteTender } from "@/lib/features/tenderSlice";
import { Tender } from "@/screens/real-estate-owner/tenders/tender-overview/types";
import { getTenderStatusStyle, translateTenderForm } from "@/utils/utils";

interface TenderRowProps {
  tender: Tender;
}

const TenderRow: React.FC<TenderRowProps> = ({ tender }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const statusStyle = getTenderStatusStyle[tender.status];

  const handleOpen = (): void => {
    router.push(ROUTES.REAL_ESTATE.TENDER.TENDER_DETAILS(tender.id));
  };

  const handleDeleteTender = async (tenderId: string): Promise<void> => {
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
    <Box sx={styles.row}>
      <Stack
        direction="row"
        alignItems="center"
        gap={1.5}
        sx={styles.clickable}
        onClick={handleOpen}
      >
        {statusStyle && (
          <Chip
            size="small"
            label={statusStyle.title}
            sx={{ bgcolor: statusStyle.bgcolor, color: statusStyle.color }}
          />
        )}
        <Chip
          size="small"
          variant="outlined"
          color="gprimary"
          label={translateTenderForm(tender.tenderForm)}
        />
        <Typography variant="bodymr" color="#8D999C">
          {`${dayjs(tender.fromDate).format("DD.MM.YYYY")} – ${dayjs(tender.toDate).format("DD.MM.YYYY")}`}
        </Typography>
      </Stack>
      <ActionMenu
        itemId={tender.id}
        onEdit={(id) => router.push(ROUTES.REAL_ESTATE.TENDER.EDIT_TENDER(id))}
        onDelete={handleDeleteTender}
        messege="Sind Sie sicher, dass Sie diese Ausschreibung löschen möchten?"
      />
    </Box>
  );
};

export default TenderRow;

// Styles
const styles: { row: SxProps; clickable: SxProps } = {
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    py: "0.5rem",
    borderBottom: "1px solid #F1F3F4",
  },
  clickable: {
    cursor: "pointer",
    flexWrap: "wrap",
  },
};
