import { Grid, Link, Typography } from "@mui/material";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "next/navigation";
import BackButton from "@/components/button/BackButton";
import InfoBanner from "@/components/common/InfoBanner";
import SuccessPage from "@/components/common/SuccessPage";

interface ContractApplicationSuccessProps {
  submittedApplicationId: string;
}

const ContractApplicationSuccess: React.FC<ContractApplicationSuccessProps> = ({
  submittedApplicationId,
}): JSX.Element => {
  const router = useRouter();

  const handleBackToStart = (): void => {
    router.push(ROUTES.SERVICE_PROVIDER.CONTRACT_FILTER_URL([], [], []));
  };

  return (
    <Grid item xs={12} md={12}>
      <Grid container component="main" sx={styles.mainContainer}>
        <Grid item xs={12} md={5}>
          <Grid item xs={false} md={12} lg={12} sx={styles.infoBannerGrid}>
            <InfoBanner
              title="Die besten Angebote"
              subtitle="Gesetzliche Anlagenprüfung"
              copyright={`©${new Date().getFullYear()} GAP GmbH`}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={7}>
          <Grid item xs={12} md={8} lg={8}>
            <BackButton onBack={handleBackToStart} />
          </Grid>
          <Grid sx={styles.successPageHolder}>
            <SuccessPage
              title="Bewerbung versendet"
              primaryDescription={`
                                Wenn Ihre Bewerbung bestätigt wird, erhalten Sie eine
                                Benachrichtigung per E-Mail und auf der Website.
                            `}
              secondaryDescription="Sie können den Status Ihrer Bewerbung hier finden:"
              buttonLabel="Zum Dashboard"
              secondaryButtonLabel="Ihre Bewerbung"
              redirectUrl={ROUTES.SERVICE_PROVIDER.DASHBOARD}
              secondaryButtonRedirectUrl={ROUTES.SERVICE_PROVIDER.APPLICATION_DETAILS(
                submittedApplicationId
              )}
            />
          </Grid>
          <Grid sx={{ marginTop: "10rem" }}>
            <Typography sx={styles.helpText}>
              Brauchen Hilfe?{" "}
              <Link href={ROUTES.CONTACT_US} color="#1E3137" fontWeight="bold">
                Kontakt Support
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ContractApplicationSuccess;

const styles = {
  mainContainer: { height: "100vh" },
  infoBannerGrid: {
    backgroundImage: `url(/images/registration-bg.png)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: {
      xs: "none",
      sm: "none",
      md: "block",
      lg: "block",
      xl: "block",
    },
    height: "100%",
  },
  successPageHolder: {
    padding: 4,
    marginTop: "4rem",
  },
  helpText: {
    color: "#475A60",
    fontSize: "1rem",
    marginTop: "3rem",
    marginLeft: "3.75rem",
  },
};
