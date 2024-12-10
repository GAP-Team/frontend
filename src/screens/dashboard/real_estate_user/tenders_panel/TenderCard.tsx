import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Icon from "@mui/material/Icon";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/navigation";
import Divider from "@mui/material/Divider";
import { BsClockFill } from "react-icons/bs";
import Typography from "@mui/material/Typography";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { getTenderStatusStyle } from "@/utils/utils";
import SectionTitle from "@/components/label/SectionTitle";
import { buildingAdress, Tender } from "./types";
import { Urgency } from "@/utils/enums";
import ActionMenu from "@/components/common/ActionMenu";
import tenderAPIs from "@/api/tender";
import { useAppDispatch } from "@/lib/hooks";
import { showSnackbar } from "@/components/root-snackbar";
import { removeTender } from "@/lib/features/tenderSlice";

interface TenderCardProps {
  tender: Tender;
  buildingName: string;
  buildingAdress: buildingAdress;
}

const TenderCard: React.FC<TenderCardProps> = ({
  tender,
  buildingName,
  buildingAdress,
}) => {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const handleClick = (): void => {
    router.push(`/real_estate/tenders/${tender.id}`);
  };

  const chipStyles = getTenderStatusStyle[tender?.status];

  const checkUrgency = (urgency: string): React.JSX.Element | null => {
    if (urgency === Urgency.URGENT) {
      return (
        <Icon sx={styles.urgentIcon}>
          <BsClockFill />
        </Icon>
      );
    }
    return null;
  };

  const handleDeleteTender = async (tenderId: string): Promise<void> => {
    try {
      await tenderAPIs.delete(tenderId);
      appDispatch(removeTender(tenderId));
      appDispatch(
        showSnackbar({
          type: "success",
          message: "Ausschreibung erfolgreich gelöscht!",
        })
      );
      router.push(`/real_estate/tenders`);
    } catch {
      appDispatch(
        showSnackbar({
          type: "error",
          message:
            "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut",
        })
      );
    }
  };

  const handleEdit = (id: string): void => {
    router.push(`/real_estate/tenders/edit/${id}`);
  };

  return (
    <Paper sx={styles.card} elevation={4} style={{ cursor: "pointer" }}>
      <Box sx={styles.header}>
        <Chip label={chipStyles?.title} sx={{ ...chipStyles }} />
        {checkUrgency(tender?.urgency)}
        <ActionMenu
          itemId={tender?.id}
          onEdit={(id) => handleEdit(id)}
          onDelete={handleDeleteTender}
        />
      </Box>
      <Box sx={styles.location}>
        <SectionTitle
          text={`Angebote: 0`}
          sx={{ fontWeight: 400, py: "0.75rem" }}
        />
      </Box>
      <Box onClick={handleClick}>
        <Typography variant="h6" sx={styles.title}>
          {tender?.tenderType}
        </Typography>
        <Box sx={styles.tags}>
          <Chip
            icon={<VscDebugBreakpointLog color="white" />}
            color="gprimary"
            label={tender?.tenderForm}
            size="small"
            sx={styles.tagChip}
          />
        </Box>
        <Divider sx={styles.divider} orientation="horizontal" />
        <Typography variant="body2" sx={styles.subText}>
          {buildingName} - {buildingAdress?.street}{" "}
          {buildingAdress?.houseNumber}, {buildingAdress?.zip}{" "}
          {buildingAdress?.city}
        </Typography>
        <Typography variant="body2" sx={{ pl: 2 }}>
          {`--> ${tender?.facility?.name}`}
        </Typography>
        <Typography variant="body2" sx={{ pl: 4 }}>
          {`--> ${tender?.tenderForm}`}
        </Typography>
      </Box>
    </Paper>
  );
};

export default TenderCard;

// Styles
const styles = {
  card: {
    p: "1.25rem",
    borderRadius: "0.5rem",
    maxWidth: "20rem", // Adjust the width as needed
    minWidth: "13rem",
    height: "21rem",
    flexShrink: 0,
    overflow: "auto",
    mb: "0.35rem",
    cursor: "pointer",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  location: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  urgentIcon: {
    marginLeft: "5rem",
    color: "orange",
  },
  chip: {
    bgcolor: "purple",
    color: "white",
  },
  title: {
    fontWeight: "600",
    fontSize: "1rem",
    lineHeight: "1.5rem",
    pb: "0.5rem",
  },
  tags: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  tagChip: {
    mr: 0.5,
    mb: 0.5,
  },
  divider: {
    my: "0.75rem",
  },
  subText: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.75rem",
    fontWeight: "600",
    lineHeight: "1rem",
    mt: 0.5,
    "& > svg": {
      mr: 0.5,
    },
  },
};
