'use client';
import React, {useEffect} from "react";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { useFormikContext } from 'formik';
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import PrivatePerson from "./PrivatePerson";
import GTab from "@/components/filter/GTab";
import CompanyAddress from "./CompanyAddress";
import ComercialPerson from "./CommercialPerson";
import GButton from "@/components/button/GButton";
import BasicInformation from "./BasicInformation";
import GStepper from "@/components/stepper/GStepper";
import SummaryRegistration from "./SummaryRegistration";
import BusinessRegistration from "./BusinessRegistration";
import SectionTitle from "@/components/label/SectionTitle";
import GProgressStepper from "@/components/stepper/GProgressStepper";

interface RegistrationFormProps {
  activeStep: number;
  steps: string[];
  handleBack: () => void;
  handleNext: () => void;
  setActiveStep: (num:number) => void;
}

const RegistrationForm = ({
  activeStep,
  steps,
  handleBack,
  handleNext,
  setActiveStep
}: RegistrationFormProps): JSX.Element => {

  const formik = useFormikContext();
  const [tabValue, setTabValue] = React.useState(0);

  useEffect(() => {
    if (tabValue == 0) {
      formik.setFieldValue("businessType", "business");      
    }
  }, []);

  const handleTabChange = (event:React.SyntheticEvent, newValue:number) => {
    
    setTabValue(newValue);

    if (newValue == 0) {
      formik.setFieldValue("businessType", "business");
    } else {
      formik.setFieldValue("businessType", "private");
    }

    //Make user to only be private or commercial person, also their formik values null on selection change
    //Commercial person, make land and approv doc undefined
    if (!newValue) {
      formik.setFieldValue("approval_document", "")
      formik.setFieldValue("land_register_entry_document", "")
    }
    //Private person, make registrationnum and  bsndoc null
    else {
      formik.setFieldValue("registrationnum", "");
      formik.setFieldValue("business_registration_doc", "");
    }
  };

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
          {activeStep == 2 && <GTab tabs={registertabs} tabvalue={tabValue} handleChange={handleTabChange} />}
          {activeStep == 3 && <SummaryRegistration setActiveStep={setActiveStep} />}
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