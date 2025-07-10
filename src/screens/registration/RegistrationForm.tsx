"use client";
import React, { useEffect } from "react";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { useFormikContext } from "formik";
import Divider from "@mui/material/Divider";
import PrivatePerson from "./real_estate/PrivatePerson";
import GTab from "@/components/navigation/tab_panel/GTab";
import CompanyAddress from "./CompanyAddress";
import ComercialPerson from "./real_estate/CommercialPerson";
import GButton from "@/components/inputs/button/GButton";
import BasicInformation from "./BasicInformation";
import GStepper from "@/components/navigation/stepper/GStepper";
import RegistrationSummary from "./RegistrationSummary";
import SectionTitle from "@/components/data_display/label/SectionTitle";
import { USER_ROLE, BUSINESS_TYPE } from "@/utils/enums";
import GProgressStepper from "@/components/navigation/stepper/GProgressStepper";
import CircularProgress from "@mui/material/CircularProgress";
import { RegistrationFormValues } from "./types";
import ExpertiseServiceProvider from "./service_provider/ExpertiseServiceProvider";
import { getRegistrationSteps } from "@/utils/Constants";

interface RegistrationFormProps {
  activeStep: number;
  steps: string[];
  handleBack: () => void;
  handleNext: () => void;
  setActiveStep: (num: number) => void;
}

const RegistrationForm = ({
  activeStep,
  steps,
  handleBack,
  handleNext,
  setActiveStep,
}: RegistrationFormProps): JSX.Element => {
  const formik = useFormikContext<RegistrationFormValues>();
  const [personTypeTab, setPersonTyp] = React.useState(0);
  const [stakeholderTyp, setStakeholderTyp] = React.useState(0);
  const [registrationSteps, setRegistrationSteps] = React.useState<string[]>(
    []
  );

  useEffect(() => {
    if (personTypeTab === 0) {
      formik.setFieldValue("businessType", BUSINESS_TYPE.BUSINESS);
    }

    if (stakeholderTyp === 0) {
      formik.setFieldValue("role", USER_ROLE.REAL_ESTATE_OWNER);
    } else {
      formik.setFieldValue("role", USER_ROLE.SERVICE_PROVIDER);
    }
  }, []);

  useEffect(() => {
    setRegistrationSteps(steps);
  }, [steps]);

  const handlePersonTabChange = (
    event: React.SyntheticEvent,
    userTypeFlag: number
  ): void => {
    setPersonTyp(userTypeFlag);

    if (userTypeFlag === 0) {
      formik.setFieldValue("businessType", BUSINESS_TYPE.BUSINESS);
    } else {
      formik.setFieldValue("businessType", BUSINESS_TYPE.PRIVATE);
    }

    //Make user to only be private or commercial person, also their formik values null on selection change
    //Commercial person, make land and approv doc undefined
    if (!userTypeFlag) {
      formik.setFieldValue("approvalDocument", "");
      formik.setFieldValue("landRegisterEntryDocument", "");
    }
    //Private person, make registrationNumber and  bsndoc null
    else {
      formik.setFieldValue("registrationNumber", "");
      formik.setFieldValue("businessRegistrationDocument", "");
    }
  };

  const handleStakeholderTabChange = (
    event: React.SyntheticEvent,
    stakeholderTypeFlag: number
  ): void => {
    setStakeholderTyp(stakeholderTypeFlag);

    if (stakeholderTypeFlag === 0) {
      const updatedSteps = getRegistrationSteps(USER_ROLE.REAL_ESTATE_OWNER);
      setRegistrationSteps(updatedSteps);
      formik.setFieldValue("role", USER_ROLE.REAL_ESTATE_OWNER);
    } else {
      const updatedSteps = getRegistrationSteps(USER_ROLE.SERVICE_PROVIDER);
      setRegistrationSteps(updatedSteps);
      formik.setFieldValue("role", USER_ROLE.SERVICE_PROVIDER);
    }
  };

  const basictabs = [
    //TODO: have to render seperate component for each tab and not based on value
    {
      label: "Immobilienbetreiber",
      content: <BasicInformation formik={formik} />,
    },
    {
      label: "Dienstleister",
      content: <BasicInformation formik={formik} />,
    },
  ];
  const registertabs = [
    { label: "Gewerbeperson", content: <ComercialPerson formik={formik} /> },
    { label: "Privatperson", content: <PrivatePerson formik={formik} /> },
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
          Schritt {activeStep + 1}/ {registrationSteps.length}
        </Link>

        <GStepper activeStep={activeStep} steps={registrationSteps} />
      </Grid>

      <Divider orientation="vertical" variant="middle" flexItem />

      <Grid item xs={9} sx={styles.mainContent}>
        <div style={{ flexGrow: 1 }}>
          <div className="flex flex-col">
            <SectionTitle
              text={registrationSteps[activeStep]}
              sx={styles.subTitle}
            />
            <GProgressStepper
              sx={styles.progressStepper}
              activeStep={activeStep}
            />
          </div>
          {activeStep === 0 && (
            <GTab
              tabs={basictabs}
              tabvalue={stakeholderTyp}
              handleChange={handleStakeholderTabChange}
            />
          )}
          {activeStep === 1 && <CompanyAddress formik={formik} />}
          {activeStep === 2 &&
            formik?.values?.role === USER_ROLE.REAL_ESTATE_OWNER && (
              <GTab
                tabs={registertabs}
                tabvalue={personTypeTab}
                handleChange={handlePersonTabChange}
              />
            )}
          {activeStep === 2 &&
            formik?.values?.role === USER_ROLE.SERVICE_PROVIDER && (
              <ComercialPerson formik={formik} />
            )}
          {activeStep === 3 &&
            formik?.values?.role === USER_ROLE.SERVICE_PROVIDER && (
              <ExpertiseServiceProvider formik={formik} />
            )}
          {registrationSteps[activeStep] === "Zusammenfassung" && (
            <RegistrationSummary setActiveStep={setActiveStep} />
          )}
        </div>
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <GButton onClick={handleBack} color="ggrey">
              Zurück
            </GButton>
            <GButton
              onClick={handleNext}
              disabled={formik.isSubmitting}
              endIcon={
                formik.isSubmitting && (
                  <CircularProgress color="gprimary" size={24} />
                )
              }
            >
              {activeStep <= 2 ? "Weiter" : "Einreichen"}
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
  userInfo: {
    width: "auto",
    padding: "0.50rem",
    marginLeft: "1.5rem",
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
  },
};
