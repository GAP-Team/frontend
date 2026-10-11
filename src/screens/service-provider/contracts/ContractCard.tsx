import React from "react";
import { Contract } from "./types";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import {
  MdOutlineBuild,
  MdOutlineCalendarToday,
  MdOutlineLocalParking,
  MdOutlinePersonOutline,
  MdOutlinePlace,
  MdOutlineShield,
  MdOutlineTimer,
} from "react-icons/md";
import { ROUTES } from "@/utils/routes";
import { TENDER_FORM, USER_ROLE, Urgency } from "@/utils/enums";
import { formatDateRange } from "@/utils/utils";
import { checkIsLoggedIn, getIsUserActivated } from "@/utils/auth";
import { currentUser } from "@/lib/features/userSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { showSnackbar } from "@/components/feedback/snackbar";
import { MAX_APPLICATIONS_PER_CONTRACT } from "./constants";

interface ContractCardProps {
  contracts: Contract[];
}

interface SpotsInfo {
  title: string;
  detail: string;
  taken: number;
  variant: "open" | "last" | "full";
}

const getSpots = (contract: Contract): SpotsInfo => {
  const count = contract?.applicationCount ?? 0;
  const free = Math.max(MAX_APPLICATIONS_PER_CONTRACT - count, 0);
  const detail =
    count === 0
      ? "Noch keine Bewerbung"
      : `${count} von ${MAX_APPLICATIONS_PER_CONTRACT} Bewerbungen`;
  if (contract?.isBookedOut || free === 0) {
    return {
      title: "Ausgebucht",
      detail: `${MAX_APPLICATIONS_PER_CONTRACT} von ${MAX_APPLICATIONS_PER_CONTRACT} Bewerbungen`,
      taken: MAX_APPLICATIONS_PER_CONTRACT,
      variant: "full",
    };
  }
  if (free === 1) {
    return {
      title: "Noch 1 Platz frei",
      detail,
      taken: count,
      variant: "last",
    };
  }
  return {
    title: `${free} Plätze frei`,
    detail,
    taken: count,
    variant: "open",
  };
};

const FactRow: React.FC<{
  icon: React.ReactNode;
  value: string;
  extra?: string;
}> = ({ icon, value, extra }) => (
  <Box sx={styles.fact}>
    <Box sx={styles.factIcon}>{icon}</Box>
    <Typography component="span" sx={styles.factValue}>
      {value}
    </Typography>
    {extra && (
      <Typography component="span" sx={styles.factExtra}>
        {extra}
      </Typography>
    )}
  </Box>
);

const Spots: React.FC<{ contract: Contract }> = ({ contract }) => {
  const spots = getSpots(contract);
  return (
    <Box sx={{ ...styles.spots, ...spotsVariants[spots.variant].box }}>
      <Box sx={styles.dots}>
        {Array.from({ length: MAX_APPLICATIONS_PER_CONTRACT }, (_, index) => (
          <Box
            key={index}
            sx={{
              ...styles.dot,
              ...(index < spots.taken ? spotsVariants[spots.variant].dot : {}),
            }}
          />
        ))}
      </Box>
      <Box>
        <Typography sx={styles.spotsTitle}>{spots.title}</Typography>
        <Typography sx={styles.spotsDetail}>{spots.detail}</Typography>
      </Box>
    </Box>
  );
};

const Requirements: React.FC<{ contract: Contract }> = ({ contract }) => (
  <Box sx={styles.requirements}>
    {contract?.safetyWorkRequired && (
      <Chip
        icon={<MdOutlineShield />}
        label="Sicherheitsunterweisung"
        size="small"
        variant="outlined"
        sx={styles.requirement}
      />
    )}
    {contract?.freeParkingAvailable && (
      <Chip
        icon={<MdOutlineLocalParking />}
        label="Parkplatz"
        size="small"
        variant="outlined"
        sx={styles.requirement}
      />
    )}
  </Box>
);

const getButton = (
  contract: Contract
): { label: string; sx: object; disabled: boolean } => {
  if (contract?.hasApplied) {
    return {
      label: "✓ Bereits beworben",
      sx: styles.buttonDone,
      disabled: true,
    };
  }
  if (contract?.isBookedOut) {
    return {
      label: "Keine Bewerbung mehr möglich",
      sx: styles.buttonOff,
      disabled: true,
    };
  }
  return { label: "Details ansehen", sx: styles.button, disabled: false };
};

const ContractCard = ({ contracts }: ContractCardProps): JSX.Element => {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const user = useAppSelector(currentUser);

  const ensureActivated = (): boolean => {
    const isActive = getIsUserActivated();
    if (!isActive) {
      appDispatch(
        showSnackbar({
          type: "error",
          message:
            "Ihr Konto ist noch nicht aktiviert. Bitte warten Sie, bis die Administration Ihr Konto freischaltet. Sie erhalten eine E-Mail, sobald dies geschehen ist.",
        })
      );
    }
    return isActive;
  };

  const handleShowContractDetails = (contractId: string): void => {
    if (!ensureActivated()) return;
    if (checkIsLoggedIn() && user?.role === USER_ROLE.SERVICE_PROVIDER) {
      router.push(ROUTES.SERVICE_PROVIDER.CONTRACT_DETAILS(contractId));
    } else {
      appDispatch(
        showSnackbar({
          type: "error",
          message:
            "Um auf diese Funktion zugreifen zu können, müssen Sie sich als Dienstanbieter anmelden!",
        })
      );
    }
  };

  return (
    <>
      {contracts?.map((contract) => {
        const button = getButton(contract);
        const isCraftsman = contract?.tenderForm === TENDER_FORM.CRAFTSMAN;
        return (
          <Paper
            key={contract?.tenderId}
            elevation={2}
            sx={{
              ...styles.card,
              ...(button.disabled ? styles.cardStatic : styles.cardClickable),
              ...(contract?.isBookedOut ? styles.cardMuted : {}),
            }}
            onClick={() =>
              !button.disabled && handleShowContractDetails(contract?.tenderId)
            }
          >
            <Box sx={styles.body}>
              <Box sx={styles.header}>
                <Chip
                  label={contract?.tenderType}
                  size="small"
                  sx={styles.kind}
                />
                {contract?.urgency === Urgency.URGENT && (
                  <Chip
                    icon={<MdOutlineTimer color="inherit" />}
                    label="Dringend"
                    size="small"
                    sx={styles.urgent}
                  />
                )}
              </Box>

              <Typography sx={styles.title}>
                {contract?.facilityType}
              </Typography>
              <Typography sx={styles.subtitle}>
                {contract?.subcategory}
              </Typography>

              <Box sx={styles.facts}>
                <FactRow
                  icon={<MdOutlinePlace size="1rem" />}
                  value={contract?.city}
                  extra={contract?.state}
                />
                <FactRow
                  icon={<MdOutlineCalendarToday size="1rem" />}
                  value={formatDateRange(contract?.fromDate, contract?.toDate)}
                />
                <FactRow
                  icon={
                    isCraftsman ? (
                      <MdOutlineBuild size="1rem" />
                    ) : (
                      <MdOutlinePersonOutline size="1rem" />
                    )
                  }
                  value={isCraftsman ? "Handwerker" : "Sachverständige"}
                />
              </Box>

              <Spots contract={contract} />
              <Requirements contract={contract} />
            </Box>

            <Box sx={styles.footer}>
              <Box sx={{ ...styles.buttonBase, ...button.sx }}>
                {button.label}
              </Box>
            </Box>
          </Paper>
        );
      })}
    </>
  );
};

export default ContractCard;

const spotsVariants = {
  open: { box: {}, dot: { bgcolor: "#1478B4", borderColor: "#1478B4" } },
  last: {
    box: { bgcolor: "#FFF1C2" },
    dot: { bgcolor: "#B98300", borderColor: "#B98300" },
  },
  full: {
    box: { bgcolor: "#ECEFF0" },
    dot: { bgcolor: "#8D999C", borderColor: "#8D999C" },
  },
};

const styles = {
  card: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    borderRadius: "0.75rem",
    overflow: "hidden",
    transition: "box-shadow 0.15s, transform 0.15s",
  },
  cardClickable: {
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0 6px 18px rgba(30, 49, 55, 0.18)",
      transform: "translateY(-2px)",
    },
  },
  // Nothing to open: already applied or booked out.
  cardStatic: {
    cursor: "default",
  },
  cardMuted: {
    opacity: 0.72,
  },
  body: {
    p: "1rem 1rem 0.75rem",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    minHeight: "1.5rem",
  },
  kind: {
    bgcolor: "#E8F1F3",
    color: "#1E3137",
    fontWeight: 600,
  },
  urgent: {
    ml: "auto",
    bgcolor: "#FFE9D6",
    color: "#B4540A",
    fontWeight: 600,
    "& .MuiChip-icon": { color: "inherit" },
  },
  title: {
    mt: "0.75rem",
    fontSize: "1.0625rem",
    fontWeight: 700,
    lineHeight: 1.25,
  },
  subtitle: {
    fontSize: "0.78rem",
    lineHeight: 1.3,
    color: "#5B6B70",
  },
  facts: {
    mt: "0.875rem",
    display: "grid",
    gap: "0.5625rem",
  },
  fact: {
    display: "flex",
    alignItems: "center",
    gap: "0.625rem",
  },
  factIcon: {
    display: "flex",
    color: "#1478B4",
  },
  factValue: {
    fontSize: "0.875rem",
    fontWeight: 600,
  },
  factExtra: {
    fontSize: "0.78rem",
    color: "#5B6B70",
  },
  spots: {
    mt: "0.875rem",
    display: "flex",
    alignItems: "center",
    gap: "0.625rem",
    p: "0.625rem 0.75rem",
    borderRadius: "0.5rem",
    bgcolor: "#F6F8F9",
  },
  dots: {
    display: "flex",
    gap: "0.3125rem",
  },
  dot: {
    width: "0.75rem",
    height: "0.75rem",
    borderRadius: "50%",
    border: "2px solid #B8C2C6",
  },
  spotsTitle: {
    fontSize: "0.8125rem",
    fontWeight: 700,
    lineHeight: 1.3,
  },
  spotsDetail: {
    fontSize: "0.78rem",
    lineHeight: 1.3,
    color: "#5B6B70",
  },
  requirements: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.375rem",
    mt: "0.75rem",
    minHeight: "1.5rem",
  },
  requirement: {
    color: "#5B6B70",
    borderColor: "#E2E7E9",
    "& .MuiChip-icon": { color: "#8D999C" },
  },
  footer: {
    mt: "auto",
    p: "0 1rem 1rem",
  },
  buttonBase: {
    textAlign: "center",
    p: "0.625rem",
    borderRadius: "0.5rem",
    fontWeight: 600,
    fontSize: "0.875rem",
  },
  button: { bgcolor: "#22A7F1", color: "#fff" },
  buttonDone: { bgcolor: "#E4F6EE", color: "#056643" },
  buttonOff: { bgcolor: "#ECEFF0", color: "#8D999C" },
};
