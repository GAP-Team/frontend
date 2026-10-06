import { memo, useEffect } from "react";
import { checkIsLoggedIn } from "@/utils/auth";
import { USER_ROLE, DOCUMENT_TYPE } from "@/utils/enums";
import { Grid, Paper } from "@mui/material";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { showSnackbar } from "@/components/feedback/snackbar";
import ContractSummarySection from "./ContractSummarySection";
import { fetchContractById, getContract } from "@/lib/features/contractSlice";
import ContractDocumentsSection from "./ContractDocumentsSection";
import DataDisplayBar from "@/components/data-display/DataDisplayBar";
import FallbackPage from "@/components/common/pages/FallbackPage";
import { ROUTES } from "@/utils/routes";
import NoAccessImage from "@images/no_access.png";

const BUILDING_DOCUMENT_GROUPS = [
  {
    title: "Bauunterlagen",
    documentType: DOCUMENT_TYPE.CONSTRUCTION_DOCUMENTS,
  },
  { title: "Grundrisse", documentType: DOCUMENT_TYPE.FLOOR_PLANS },
  { title: "Sonstige Dokumente", documentType: DOCUMENT_TYPE.OTHER },
];

const FACILITY_DOCUMENT_GROUPS = [
  { title: "Berichte", documentType: DOCUMENT_TYPE.CHECK_REPORTS },
  { title: "Grundrisse", documentType: DOCUMENT_TYPE.FLOOR_PLANS },
  { title: "Sonstige Dokumente", documentType: DOCUMENT_TYPE.OTHER },
];

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
          <FallbackPage
            description="Sie müssen ein Dienstanbieter sein, um auf diese Seite zugreifen zu können."
            title="Zugriff verweigert"
            buttonLink={ROUTES?.LOGIN}
            alt="No Access"
            image={NoAccessImage}
          />
        );
      }
    } else {
      return (
        <FallbackPage
          description="Bitte melden Sie sich an, um auf die Vertragsdetails zuzugreifen."
          title="Zugriff verweigert"
          buttonLink={ROUTES?.LOGIN}
          alt="No Access"
          image={NoAccessImage}
        />
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
          <DataDisplayBar
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
            <Grid item xs={18} md={9} lg={8}>
              <Paper sx={styles.summaryContainer}>
                <ContractSummarySection contract={contractDetails} />
              </Paper>
            </Grid>
            <Grid item xs={18} md={9} lg={8}>
              <Grid container spacing={2}>
                <ContractDocumentsSection
                  title="DOKUMENTE Objekte"
                  groups={BUILDING_DOCUMENT_GROUPS}
                  documents={contractDetails?.buildingDocuments}
                  uploadType={contractDetails?.buildingDocumentUploadType}
                  serverLink={contractDetails?.buildingServerLink}
                />
                <ContractDocumentsSection
                  title="DOKUMENTE Anlage"
                  groups={FACILITY_DOCUMENT_GROUPS}
                  documents={contractDetails?.facilityDocuments}
                  uploadType={contractDetails?.facilityDocumentUploadType}
                  serverLink={contractDetails?.facilityServerLink}
                />
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
    overflow: "hidden",
  },
};
