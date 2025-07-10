import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Icon from "@mui/material/Icon";
import Paper from "@mui/material/Paper";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "next/navigation";
import Divider from "@mui/material/Divider";
import { BsClockFill } from "react-icons/bs";
import Typography from "@mui/material/Typography";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import SectionTitle from "@/components/data_display/label/SectionTitle";
import { Urgency } from "@/utils/enums";
import ActionMenu from "@/components/navigation/ActionMenu";
import { useAppDispatch } from "@/lib/hooks";
import { showSnackbar } from "@/components/feedback/root-snackbar";
import { deleteTender } from "@/lib/features/tenderSlice";
import { BuildingAddress } from "@/screens/real_estate_owner/buildings/building_card/types";
import { Tender } from "@/screens/real_estate_owner/tenders/tender_card/types";
import { getTenderStatusStyle, translateTenderForm } from "@/utils/utils";

interface TenderCardProps {
  tender: Tender;
  buildingName: string;
  buildingAddress: BuildingAddress;
}

const TenderCard: React.FC<TenderCardProps> = ({
  tender,
  buildingName,
  buildingAddress,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleClick = (): void => {
    router.push(ROUTES.REAL_ESTATE.TENDER.TENDER_DETAILS(tender.id));
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
    <Paper sx={styles.card} elevation={4} style={{ cursor: "pointer" }}>
      <Box sx={styles.header}>
        <Chip
          label={chipStyles?.title}
          sx={{ ...chipStyles }}
          onClick={handleClick}
        />
        {checkUrgency(tender?.urgency)}
        <ActionMenu
          itemId={tender?.id}
          onEdit={(id) =>
            router.push(ROUTES.REAL_ESTATE.TENDER.EDIT_TENDER(id))
          }
          onDelete={handleDeleteTender}
          messege={"Sind Sie sicher, dass Sie dieses Element löschen möchten?"}
        />
      </Box>
      <Box sx={styles.location} onClick={handleClick}>
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
            label={translateTenderForm(tender?.tenderForm)}
            size="small"
            sx={styles.tagChip}
          />
        </Box>
        <Divider sx={styles.divider} orientation="horizontal" />
        <Typography variant="body2" sx={styles.subText}>
          {buildingName} - {buildingAddress?.street}{" "}
          {buildingAddress?.houseNumber}, {buildingAddress?.zip}{" "}
          {buildingAddress?.city}
        </Typography>
        <Typography variant="body2" sx={{ pl: 2 }}>
          {`--> ${tender?.facility?.name}`}
        </Typography>
        <Typography variant="body2" sx={{ pl: 4 }}>
          {`--> ${translateTenderForm(tender?.tenderForm)}`}
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
    maxWidth: "20rem",
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
