import { memo, useEffect } from "react";
import { USER_ROLE } from "@/utils/enums";
import NoAccessPage from "../NoAccessPage";
import { Grid, Paper } from "@mui/material";
import { showSnackbar } from "@/components/root-snackbar";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import ContarctSummarySection from "./ContarctSummarySection";
import TenderTitleBar from "@/screens/dashboard/tenders/tender_card/TenderTitleBar";
import {
  fetchContractById,
  getContractDetails,
} from "@/lib/features/contractSlice";

interface ContractDetailsProps {
  id: string;
}

const ContractDetails: React.FC<ContractDetailsProps> = ({
  id,
}): JSX.Element => {
  const appdispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const contractDetails = useAppSelector(getContractDetails);

  useEffect(() => {
    fetchContractDetails();
  }, [id]);

  const fetchContractDetails = async (): Promise<void> => {
    try {
      await appdispatch(fetchContractById({ id: id })).unwrap();
    } catch {
      appdispatch(
        showSnackbar({
          type: "error",
          message:
            "Etwas ist schiefgelaufen. Versuchen Sie es später noch einmal!",
        })
      );
    }
  };

  const renderContent = (): JSX.Element => {
    if (user?.id) {
      if (user?.role !== USER_ROLE.SERVICE_PROVIDER) {
        return (
          <NoAccessPage description="Sie müssen ein Dienstanbieter sein, um auf diese Seite zugreifen zu können." />
        );
      }
    } else {
      return (
        <NoAccessPage description="Bitte melden Sie sich an, um auf die Vertragsdetails zuzugreifen." />
      );
    }
    // Default fallback (should not be reached)
    return <></>;
  };

  return (
    <>
      {user?.id && user?.role !== USER_ROLE.SERVICE_PROVIDER ? (
        renderContent()
      ) : (
        <Grid container component="main">
          <TenderTitleBar
            title={contractDetails?.tenderType}
            subTitle={
              contractDetails?.subcategory || contractDetails?.facilityType
            }
          />
          <Grid
            container
            spacing={2}
            mx={1}
            columns={18}
            style={styles.innerContainer}
          >
            <Grid item xs={8}>
              <Paper sx={styles.paper}>
                <ContarctSummarySection contract={contractDetails} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default memo(ContractDetails);

const styles = {
  innerContainer: {
    marginBottom: "1.25rem",
  },
  paper: {
    maxWidth: "false",
    width: "100%",
    p: "1.25rem",
  },
};
