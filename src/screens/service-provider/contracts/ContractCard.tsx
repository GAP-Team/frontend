import React from "react";
import { Contract } from "./types";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { ROUTES } from "@/utils/routes";
import { USER_ROLE } from "@/utils/enums";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { checkIsLoggedIn, getIsUserActivated } from "@/utils/auth";
import { currentUser } from "@/lib/features/userSlice";
import GButton from "@/components/inputs/button/GButton";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { showSnackbar } from "@/components/feedback/snackbar";
import SectionTitle from "@/components/data-display/label/SectionTitle";

interface ContractCardProps {
  contracts: Contract[];
}

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
      {contracts?.map((contract, index) => {
        return (
          <Paper
            sx={styles.card}
            elevation={4}
            style={styles.innerContainer}
            key={index}
          >
            <Box sx={styles.header}>
              <Chip label={contract?.tenderType} sx={styles.cardTypeTitle} />
            </Box>
            <Box sx={styles.location}>
              <SectionTitle
                sx={styles.timeSection}
                text={`Angebote: 0 ${contract?.toDate ? `(bis ${new Date(contract?.toDate).toLocaleDateString("de-DE")})` : ""}`}
              />
            </Box>
            <Box>
              <Typography variant="h6" sx={styles.address}>
                {`${contract?.city}, ${contract?.state}`}
              </Typography>
              <Typography variant="body2" sx={styles.title}>
                {contract?.facilityType}
              </Typography>
              <Typography
                variant="body2"
                sx={{ pl: 2, marginBottom: "1.5rem" }}
              >
                {`--> ${contract?.subcategory}`}
              </Typography>
              <Typography variant="body2" sx={styles.bottomTitle}>
                {contract?.urgency}
              </Typography>

              <GButton
                style={styles.button}
                onClick={() => handleShowContractDetails(contract?.tenderId)}
              >
                Mehr Anzeigen
              </GButton>
            </Box>
          </Paper>
        );
      })}
    </>
  );
};

export default ContractCard;

const styles = {
  innerContainer: {
    cursor: "pointer",
    marginRight: "0.5rem",
  },
  card: {
    p: "1.25rem",
    borderRadius: "0.5rem",
    maxWidth: "20rem",
    minWidth: "10rem",
    height: "25rem",
    flexShrink: 0,
    overflow: "auto",
    mb: "0.35rem",
    cursor: "pointer",
  },
  cardTypeTitle: {
    background: "#96E9CB",
    marginBottom: "0.8rem",
  },
  timeSection: {
    py: "0.75rem",
    fontWeight: 400,
    marginBottom: "0.6rem",
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
  address: {
    pb: "0.5rem",
    color: "#22A7F1",
    fontWeight: "600",
    fontSize: "1.2rem",
    lineHeight: "1.5rem",
    marginBottom: "1.7rem",
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
  title: {
    display: "flex",
    alignItems: "center",
    fontSize: "1.2rem",
    fontWeight: "600",
    lineHeight: "1rem",
    marginBottom: "0.8rem",
    mt: 0.5,
    "& > svg": {
      mr: 0.5,
    },
  },
  bottomTitle: {
    pb: "0.5rem",
    color: "#7a7575",
    fontSize: "1.1rem",
    lineHeight: "1.5rem",
    marginBottom: "1rem",
  },
  button: {
    marginLeft: 0,
    width: "100%",
    marginTop: "0.5rem",
  },
};
