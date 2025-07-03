import GButton from "../inputs/button/GButton";
import { ROUTES } from "@/utils/routes";
import { useFormikContext } from "formik";
import { useRouter } from "next/navigation";
import { CircularProgress, Grid } from "@mui/material";
import {
  ApplyContractProps,
  ContractApplicationFormValues,
} from "@/typings/types";

const ContractApplicationForm: React.FC<ApplyContractProps> = ({
  steps,
  loading,
  handleBack,
  handleNext,
  activeStep,
  setActiveStep,
}): JSX.Element => {
  const router = useRouter();
  const formik = useFormikContext<ContractApplicationFormValues>();

  const StepComponent = steps[activeStep.id]?.component;
  const isBeyondLastStep = activeStep.id >= steps.length;
  const typeOfBtn = activeStep.id + 1 >= steps.length ? "submit" : "button";

  const handleRoute = (): void => {
    router.push(ROUTES.SERVICE_PROVIDER.CONTRACTS);
  };

  const forwardAndBackBtns = (
    <>
      {!isBeyondLastStep && (
        <GButton onClick={handleBack} color="ggrey">
          Abbrechen
        </GButton>
      )}
      {loading ? (
        <CircularProgress color="gprimary" size={24} />
      ) : (
        <GButton
          type={typeOfBtn}
          onClick={!isBeyondLastStep ? handleNext : handleRoute}
        >
          Weiter
        </GButton>
      )}
    </>
  );

  return (
    <>
      {StepComponent && (
        <StepComponent
          steps={steps}
          formik={formik}
          setActiveStep={setActiveStep}
        />
      )}
      <Grid container justifyContent="flex-end" spacing={2}>
        <Grid item>{forwardAndBackBtns}</Grid>
      </Grid>
    </>
  );
};

export default ContractApplicationForm;
