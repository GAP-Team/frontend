import { NextPage } from "next";
import React from "react";
import GButton from "@/components/button/GButton";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import GStepper from "@/components/stepper/GStepper";
import GProgressStepper from "@/components/stepper/GProgressStepper";
import GTab from "@/components/stepper/GTab";
import Divider from "@mui/material/Divider";
import CompanyAddress from "./CompanyAddress";
import BasicInformation from "./BasicInformation";
import SummaryRegistration from "./SummaryRegistration";
import ComercialPerson from "./CommercialPerson";
import PrivatePerson from "./PrivatePerson";

interface RegistrationFormProps {
  activeStep: number;
  steps: string[];
  handleBack: () => void;
  handleNext: () => void;
}

const basictabs = [
  //TODO: have to render seperate component for each tab and not based on value
  { label: "Immobilienbetreiber", content: <BasicInformation value={0} /> },
  { label: "Dienstleister", content: <BasicInformation value={1} /> },
];
const registertabs = [
  { label: "Gewerbeperson", content: <ComercialPerson/> },
  { label: "Privatperson", content: <PrivatePerson /> },
];

const RegistrationForm: NextPage<RegistrationFormProps> = ({
  activeStep,
  steps,
  handleBack,
  handleNext,
}) => {
  return (
    <>
      <Grid item xs={3}>
        <Link
          underline="hover"
          sx={{
            display: "flex",
            fontSize: "0.75rem",
            fontWeight: "600",
            alignItems: "center",
            color: "#A0ADB1",
          }}
          color="inherit"
          href="/"
        >
          Schritt 1/ 5
        </Link>

        <GStepper activeStep={activeStep} steps={steps} />
      </Grid>

      <Divider orientation="vertical" variant="middle" flexItem />

      <Grid
        item
        xs={9}
        sx={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <div style={{ flexGrow: 1 }}>
          <div className="flex flex-col">
            <Typography
              variant="subtitle2"
              sx={{
                display: "flex",
                fontSize: "0.75rem",
                marginLeft: "1.5rem",
                fontWeight: "600",
              }}
            >
              {steps[activeStep]}
            </Typography>
            <GProgressStepper
              sx={{
                maxWidth: "none",
                width: "auto",
                flexGrow: 1,
                marginLeft: "1rem",
                color: "gprimary",
              }}
              activeStep={activeStep}
            />
          </div>
          {activeStep == 0 && <GTab tabs={basictabs} />}
          {activeStep == 1 && <CompanyAddress />}
          {activeStep == 2 && <BasicInformation type="contact" />}
          {activeStep == 3 && <GTab tabs={registertabs} />}
          {activeStep == 4 && <SummaryRegistration />}
        </div>
        <Grid container justifyContent="flex-end" spacing={2}>
          {activeStep == 4 && (
            <Grid item>
              <GButton color="ggrey" onClick={handleBack}>
                Zurück
              </GButton>
            </Grid>
          )}
          <Grid item>
            <GButton onClick={handleNext}>Weiter</GButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default RegistrationForm;
