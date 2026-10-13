import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import {
  MdOutlineApartment,
  MdOutlineBuild,
  MdOutlineCalendarToday,
  MdOutlinePersonOutline,
  MdOutlineSettings,
  MdOutlineTimer,
} from "react-icons/md";
import { ROUTES } from "@/utils/routes";
import { TENDER_FORM, Urgency } from "@/utils/enums";
import ActionMenu from "@/components/navigation/ActionMenu";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { showSnackbar } from "@/components/feedback/snackbar";
import { deleteTender } from "@/lib/features/tenderSlice";
import { BuildingAddress } from "@/screens/real-estate-owner/buildings/building-overview/types";
import { Tender } from "@/screens/real-estate-owner/tenders/tender-overview/types";
import { Facility } from "@/screens/real-estate-owner/facilities/facility-overview/types";
import {
  formatDateRange,
  getTenderStatusStyle,
  translateTenderForm,
} from "@/utils/utils";

const NEUTRAL_COLOR = "#5B6B70";

interface TenderCardProps {
  tender: Tender;
  buildingName: string;
  buildingAddress: BuildingAddress;
}

interface PathStepProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  detail?: string;
  isLast?: boolean;
}

const formatApplications = (count: number): string => {
  if (count === 0) return "Keine Bewerbungen";
  return `${count} ${count === 1 ? "Bewerbung" : "Bewerbungen"}`;
};

const formatAddress = (address?: BuildingAddress): string =>
  address
    ? `${address.street} ${address.houseNumber}, ${address.zip} ${address.city}`
    : "";

const PathStep: React.FC<PathStepProps> = ({
  icon,
  label,
  value,
  detail,
  isLast,
}) => (
  <Box sx={{ ...styles.step, ...(isLast ? {} : styles.stepConnected) }}>
    <Box sx={styles.stepIcon}>{icon}</Box>
    <Box sx={styles.stepText}>
      <Typography sx={styles.stepLabel}>{label}</Typography>
      <Typography sx={styles.stepValue}>{value}</Typography>
      {detail && <Typography sx={styles.stepDetail}>{detail}</Typography>}
    </Box>
  </Box>
);

const KindLabel: React.FC<{ tenderForm: string }> = ({ tenderForm }) => (
  <Box sx={styles.kind}>
    {tenderForm === TENDER_FORM.CRAFTSMAN ? (
      <MdOutlineBuild size="0.9rem" />
    ) : (
      <MdOutlinePersonOutline size="0.9rem" />
    )}
    {translateTenderForm(tenderForm)}
  </Box>
);

const UrgentChip: React.FC<{ urgency: string }> = ({ urgency }) =>
  urgency === Urgency.URGENT ? (
    <Chip
      icon={<MdOutlineTimer color="inherit" />}
      label="Dringend"
      size="small"
      sx={styles.urgentChip}
    />
  ) : null;

const TenderCard: React.FC<TenderCardProps> = ({
  tender,
  buildingName,
  buildingAddress,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const facilities = useAppSelector((state) => state.facility.facilities);
  const statusStyle = getTenderStatusStyle[tender?.status];
  const accent = statusStyle?.color ?? NEUTRAL_COLOR;
  const applicationCount = tender?.applicationIds?.length ?? 0;
  const facilityType = facilities?.find(
    (facility: Facility) => facility.id === tender?.facility?.id
  )?.subcategory;

  const handleClick = (): void => {
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
    <Paper
      sx={{
        ...styles.card,
        "&::before": { ...styles.accent, bgcolor: accent },
      }}
      elevation={2}
      onClick={handleClick}
    >
      <Box sx={styles.body}>
        <Box sx={styles.header}>
          {statusStyle && (
            <Chip
              label={statusStyle.title}
              size="small"
              sx={{
                bgcolor: statusStyle.bgcolor,
                color: statusStyle.color,
                fontWeight: 600,
              }}
            />
          )}
          <UrgentChip urgency={tender?.urgency} />
          <Box sx={styles.menu} onClick={(event) => event.stopPropagation()}>
            <ActionMenu
              itemId={tender?.id}
              onEdit={(id) =>
                router.push(ROUTES.REAL_ESTATE.TENDER.EDIT_TENDER(id))
              }
              onDelete={handleDeleteTender}
              messege={
                "Sind Sie sicher, dass Sie dieses Element löschen möchten?"
              }
            />
          </Box>
        </Box>

        <Typography sx={styles.title}>{tender?.tenderType}</Typography>
        <KindLabel tenderForm={tender?.tenderForm} />

        <Box sx={styles.path}>
          <PathStep
            icon={<MdOutlineApartment size="0.9rem" />}
            label="Objekt"
            value={buildingName}
            detail={formatAddress(buildingAddress)}
          />
          <PathStep
            icon={<MdOutlineSettings size="0.9rem" />}
            label="Anlage"
            value={tender?.facility?.name}
            detail={facilityType}
            isLast
          />
        </Box>
      </Box>

      <Box sx={styles.footer}>
        <Box sx={styles.when}>
          <MdOutlineCalendarToday size="0.9rem" color="#8D999C" />
          <b>{formatDateRange(tender?.fromDate, tender?.toDate)}</b>
        </Box>
        <Chip
          label={formatApplications(applicationCount)}
          size="small"
          color={applicationCount > 0 ? "gprimary" : "default"}
          sx={styles.applications}
        />
      </Box>
    </Paper>
  );
};

export default TenderCard;

// Styles
const styles = {
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: "20rem",
    minHeight: "19rem",
    flexShrink: 0,
    mb: "0.35rem",
    borderRadius: "0.75rem",
    overflow: "hidden",
    cursor: "pointer",
    transition: "box-shadow 0.15s, transform 0.15s",
    "&:hover": {
      boxShadow: "0 6px 18px rgba(30, 49, 55, 0.18)",
      transform: "translateY(-2px)",
    },
  },
  accent: {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "4px",
  },
  body: {
    p: "1rem 1rem 0.75rem 1.25rem",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  urgentChip: {
    bgcolor: "#FFE9D6",
    color: "#B4540A",
    fontWeight: 600,
    "& .MuiChip-icon": { color: "inherit" },
  },
  menu: {
    ml: "auto",
  },
  title: {
    mt: "0.75rem",
    fontSize: "1.0625rem",
    fontWeight: 700,
    lineHeight: 1.3,
  },
  kind: {
    display: "flex",
    alignItems: "center",
    gap: "0.375rem",
    mt: "0.125rem",
    fontSize: "0.75rem",
    color: NEUTRAL_COLOR,
  },
  path: {
    mt: "0.875rem",
    p: "0.625rem 0.75rem",
    borderRadius: "0.5rem",
    bgcolor: "#F6F8F9",
  },
  step: {
    position: "relative",
    display: "flex",
    alignItems: "flex-start",
    gap: "0.625rem",
  },
  // Dotted line from this step's icon down to the next one.
  stepConnected: {
    pb: "0.625rem",
    "&::after": {
      content: '""',
      position: "absolute",
      left: "0.6875rem",
      top: "1.5rem",
      bottom: "0.125rem",
      borderLeft: "2px dotted #B8C2C6",
    },
  },
  stepIcon: {
    flex: "none",
    display: "grid",
    placeItems: "center",
    width: "1.5rem",
    height: "1.5rem",
    borderRadius: "0.375rem",
    bgcolor: "#fff",
    border: "1px solid #E2E7E9",
    color: "#1478B4",
  },
  stepText: {
    minWidth: 0,
  },
  stepLabel: {
    mb: "0.1875rem",
    fontSize: "0.625rem",
    lineHeight: 1,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "#8D999C",
  },
  stepValue: {
    fontSize: "0.8125rem",
    fontWeight: 600,
    lineHeight: 1.25,
  },
  stepDetail: {
    mt: "1px",
    fontSize: "0.75rem",
    lineHeight: 1.25,
    color: NEUTRAL_COLOR,
  },
  footer: {
    mt: "auto",
    p: "0.625rem 1rem 0.625rem 1.25rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.5rem",
    borderTop: "1px solid #EEF1F2",
  },
  when: {
    display: "flex",
    alignItems: "center",
    gap: "0.375rem",
    whiteSpace: "nowrap",
    fontSize: "0.75rem",
    color: NEUTRAL_COLOR,
    "& b": { color: "#1E3137", fontWeight: 600 },
  },
  applications: {
    whiteSpace: "nowrap",
    fontWeight: 700,
  },
};
