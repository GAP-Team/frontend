import { memo, useEffect } from "react";
import NoAccessPage from "@/components/common/pages/NoAccessPage";
import { checkIsLoggedIn } from "@/utils/auth";
import { USER_ROLE, DOCUMENT_TYPE } from "@/utils/enums";
import { showSnackbar } from "@/components/feedback/root-snackbar";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import ContractSummarySection from "./ContractSummarySection";
import TenderTitleBar from "@/screens/real_estate_owner/tenders/tender_card/TenderTitleBar";
import { fetchContractById, getContract } from "@/lib/features/contractSlice";
import DocumentList from "@/screens/real_estate_owner/buildings/building_card/DocumentList ";

interface ContractDetailsProps {
  id: string;
}

const ContractDetails: React.FC<ContractDetailsProps> = ({
  id,
}): JSX.Element => {
  const appDispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const contractDetails = useAppSelector(getContract);

  useEffect(() => {
    if (checkIsLoggedIn()) fetchContractDetails();
  }, [id]);

  const fetchContractDetails = async (): Promise<void> => {
    try {
      await appDispatch(fetchContractById({ id: id })).unwrap();
    } catch {
      appDispatch(
        showSnackbar({
          type: "error",
          message:
            "Etwas ist schiefgelaufen. Versuchen Sie es später noch einmal!",
        })
      );
    }
  };

  const renderRestrictionUI = (): JSX.Element => {
    if (!checkIsLoggedIn() && !user?.id) {
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

    return <></>;
  };

  return (
    <>
      {!checkIsLoggedIn() ? (
        renderRestrictionUI()
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
              <Paper sx={styles.summaryContainer}>
                <ContractSummarySection contract={contractDetails} />
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Paper sx={styles.documentContainer}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={styles.documentTitle}
                    >
                      DOKUMENTE Objekte (
                      {contractDetails?.buildingDocuments?.length})
                    </Typography>
                    <Box sx={styles.documentsContainer}>
                      <Grid container spacing={2}>
                        {contractDetails?.buildingDocuments &&
                          contractDetails?.buildingDocuments?.length > 0 && (
                            <>
                              <Grid item xs={12}>
                                <DocumentList
                                  title={"Bauunterlagen"}
                                  documentType={
                                    DOCUMENT_TYPE.CONSTRUCTION_DOCUMENTS
                                  }
                                  documents={contractDetails?.buildingDocuments}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <DocumentList
                                  title={"Grundrisse"}
                                  documentType={DOCUMENT_TYPE.FLOOR_PLANS}
                                  documents={contractDetails?.buildingDocuments}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <DocumentList
                                  title={"Sonstige Dokumente"}
                                  documentType={DOCUMENT_TYPE.OTHER}
                                  documents={contractDetails?.buildingDocuments}
                                />
                              </Grid>
                            </>
                          )}
                      </Grid>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper sx={styles.documentContainer}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={styles.documentTitle}
                    >
                      DOKUMENTE Anlage (
                      {contractDetails?.facilityDocuments?.length})
                    </Typography>
                    <Box sx={styles.documentsContainer}>
                      <Grid container spacing={2}>
                        {contractDetails?.facilityDocuments &&
                          contractDetails?.facilityDocuments?.length > 0 && (
                            <>
                              <Grid item xs={12}>
                                <DocumentList
                                  title={"Berichte"}
                                  documentType={DOCUMENT_TYPE.CHECK_REPORTS}
                                  documents={contractDetails?.facilityDocuments}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <DocumentList
                                  title={"Grundrisse"}
                                  documentType={DOCUMENT_TYPE.FLOOR_PLANS}
                                  documents={contractDetails?.facilityDocuments}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <DocumentList
                                  title={"Sonstige Dokumente"}
                                  documentType={DOCUMENT_TYPE.OTHER}
                                  documents={contractDetails?.facilityDocuments}
                                />
                              </Grid>
                            </>
                          )}
                      </Grid>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}></Grid>
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
  summaryContainer: {
    maxWidth: "false",
    width: "100%",
    p: "1.25rem",
  },
  documentContainer: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "false",
    width: "100%",
    borderRadius: "0.8rem",
    p: "1.25rem",
  },
  documentsContainer: {
    display: "flex",
    flexWrap: "wrap",
    mb: 1,
  },
  documentTitle: {
    marginBottom: "0.5rem",
    borderWidth: "medium",
    borderBottom: "3px solid #22A7F2",
    maxWidth: "15rem",
    paddingBottom: "0.50rem",
  },
};
