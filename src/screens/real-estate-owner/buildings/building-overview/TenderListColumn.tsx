import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

import { Tender } from "@/screens/real-estate-owner/tenders/tender-overview/types";
import { useAppDispatch } from "@/lib/hooks";
import { deleteTender } from "@/lib/features/tenderSlice";
import ActionMenu from "@/components/navigation/ActionMenu";
import GButton from "@/components/inputs/button/GButton";
import { ROUTES } from "@/utils/routes";
import { showSnackbar } from "@/components/feedback/snackbar";
import { getTenderStatusStyle, translateTenderForm } from "@/utils/utils";
import { styles as scrollbarStyles } from "@/components/utils/scrollbar/styles";

interface TenderListColumnProps {
  buildingName: string | null;
  facilityName: string | null;
  facilitySelected: boolean;
  tenders: Tender[];
}

const TenderListColumn: React.FC<TenderListColumnProps> = ({
  buildingName,
  facilityName,
  facilitySelected,
  tenders,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

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

  const renderBody = (): React.ReactNode => {
    if (!facilitySelected) {
      return (
        <EmptyState message="Wählen Sie eine Anlage aus, um deren Ausschreibungen zu sehen." />
      );
    }
    if (tenders.length === 0) {
      return (
        <EmptyState message="Für diese Anlage gibt es noch keine Ausschreibungen." />
      );
    }
    return tenders.map((tender) => (
      <TenderRow
        key={tender.id}
        tender={tender}
        onOpen={(id) =>
          router.push(ROUTES.REAL_ESTATE.TENDER.TENDER_DETAILS(id))
        }
        onEdit={(id) => router.push(ROUTES.REAL_ESTATE.TENDER.EDIT_TENDER(id))}
        onDelete={handleDeleteTender}
      />
    ));
  };

  return (
    <Paper sx={styles.column} elevation={2}>
      <Box sx={styles.header}>
        <Box>
          <Typography variant="bodylsb">Ausschreibungen</Typography>
          {facilityName && buildingName && (
            <Typography variant="bodysr" color="#8D999C">
              {buildingName} &gt; {facilityName}
            </Typography>
          )}
        </Box>
        <GButton
          size="small"
          href={ROUTES.REAL_ESTATE.TENDER.ADD_TENDER}
          sx={styles.addButton}
        >
          + Hinzufügen
        </GButton>
      </Box>
      <Box sx={styles.list}>{renderBody()}</Box>
    </Paper>
  );
};

export default TenderListColumn;

interface TenderRowProps {
  tender: Tender;
  onOpen: (tenderId: string) => void;
  onEdit: (tenderId: string) => void;
  onDelete: (tenderId: string) => Promise<void>;
}

const TenderRow: React.FC<TenderRowProps> = ({
  tender,
  onOpen,
  onEdit,
  onDelete,
}) => {
  const statusStyle = getTenderStatusStyle[tender.status];

  return (
    <Box sx={styles.row} onClick={() => onOpen(tender.id)}>
      <Box sx={styles.rowHeader}>
        <Stack direction="row" gap={1}>
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
        </Stack>
        <ActionMenu
          itemId={tender.id}
          onEdit={onEdit}
          onDelete={onDelete}
          messege="Sind Sie sicher, dass Sie diese Ausschreibung löschen möchten?"
        />
      </Box>
      <Typography variant="bodylsb" sx={{ mt: "0.5rem" }}>
        {tender.tenderType}
      </Typography>
      <Typography variant="bodysr" color="#8D999C" sx={{ mt: "0.25rem" }}>
        {dayjs(tender.fromDate).format("DD.MM.YYYY")} –{" "}
        {dayjs(tender.toDate).format("DD.MM.YYYY")}
      </Typography>
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
    flexGrow: 1,
    minWidth: "20rem",
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
