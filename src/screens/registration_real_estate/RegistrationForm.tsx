'use client';
import GButton from "@/components/button/GButton";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import GStepper from "@/components/stepper/GStepper";
import GProgressStepper from "@/components/stepper/GProgressStepper";
import GTab from "@/components/filter/GTab";
import Divider from "@mui/material/Divider";
import CompanyAddress from "./CompanyAddress";
import BasicInformation from "./BasicInformation";
import SummaryRegistration from "./SummaryRegistration";
import ComercialPerson from "./CommercialPerson";
import PrivatePerson from "./PrivatePerson";
import BusinessRegistration from "./BusinessRegistration";
import { useFormikContext } from 'formik';
import SectionTitle from "@/components/label/SectionTitle";

interface RegistrationFormProps {
  activeStep: number;
  steps: string[];
  handleBack: () => void;
  handleNext: () => void;
}


const RegistrationForm = ({
  activeStep,
  steps,
  handleBack,
  handleNext,
}: RegistrationFormProps): JSX.Element => {
  const formik = useFormikContext();

  const basictabs = [
    //TODO: have to render seperate component for each tab and not based on value
    { label: "Immobilienbetreiber", content: <BasicInformation value={0} formik={formik} /> },
    { label: "Dienstleister", content: <BasicInformation value={1} formik={formik}/> },
  ];
  const registertabs = [
    { label: "Gewerbeperson", content: <ComercialPerson formik={formik} /> },
    { label: "Privatperson", content: <PrivatePerson formik={formik}/> },
  ];

  return (
    <>
      <Grid item xs={3}>
        <Link
          underline="hover"
          sx={styles.stepIndicator}
          color="inherit"
          href="/"
        >
          Schritt {activeStep+1}/ 4
        </Link>

        <GStepper activeStep={activeStep} steps={steps} />
      </Grid>

      <Divider orientation="vertical" variant="middle" flexItem />

      <Grid
        item
        xs={9}
        sx={styles.mainContent}
      >
        <div style={{ flexGrow: 1 }}>
          <div className="flex flex-col">
            <SectionTitle text={steps[activeStep]} sx={styles.subTitle} />
            <GProgressStepper
              sx={styles.progressStepper}
              activeStep={activeStep}
            />
          </div>
          {activeStep == 0 && <BasicInformation formik={formik}/>}
          {activeStep == 1 && <CompanyAddress formik={formik} />}
          {activeStep == 2 && <GTab tabs={registertabs}/>}
          {activeStep == 3 && <SummaryRegistration/>}
        </div>
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <GButton onClick={handleBack} color="ggrey">
              Zurück
            </GButton>
            <GButton
              onClick={handleNext}
            >{activeStep <= 2 ? "Weiter" :"Einreichen"}
            </GButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default RegistrationForm;

//Styles
const styles = {
  stepIndicator: {
    display: "flex",
    fontSize: "0.75rem",
    fontWeight: "600",
    alignItems: "center",
    color: "#A0ADB1",
  },
  mainContent: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  subTitle: {
    display: "flex",
    fontSize: "0.75rem",
    marginLeft: "1.5rem",
    fontWeight: "600",
  },
  progressStepper: {
    maxWidth: "none",
    width: "auto",
    flexGrow: 1,
    marginLeft: "1rem",
    color: "gprimary",
  }
};