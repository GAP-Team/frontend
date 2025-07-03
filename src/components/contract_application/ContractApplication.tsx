import { useState } from "react";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { Formik, FormikHelpers } from "formik";
import ContractRateForm from "./ContractRateForm";
import { translateTenderForm } from "@/utils/utils";
import { Grid, Paper, Typography } from "@mui/material";
import ContractServicesForm from "./ContractServicesForm";
import { getContract } from "@/lib/features/contractSlice";
import { ActiveStepItem } from "@/screens/dashboard/types";
import ContractApplicationForm from "./ContractApplicationForm";
import { applyContractFormSchema } from "@/utils/ValidationSchema";
import {
  SubmitFormFunction,
  ContractApplicationFormValues,
} from "@/typings/types";

const ContractApplication = (): JSX.Element => {
  const router = useRouter();
  const contract = useAppSelector(getContract);

  const steps: ActiveStepItem[] = [
    { id: 0, stepName: "ContractRate", component: ContractRateForm },
    { id: 1, stepName: "ContractServices", component: ContractServicesForm },
  ];

  const [loading, setLoading] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<ActiveStepItem>(steps[0]);

  const stepFieldsMap: { [key: number]: string[] } = {
    0: ["totalPrice", "hourlyRate", "message", "zip", "city", "desiredDateOne"],
    1: ["advantages", "termsConditionDocs", "offerDocs"],
    2: [],
  };

  const handleNext = async (
    validateForm: FormikHelpers<ContractApplicationFormValues>["validateForm"],
    setTouched: FormikHelpers<ContractApplicationFormValues>["setTouched"],
    submitForm: SubmitFormFunction,
    values: ContractApplicationFormValues
  ): Promise<void> => {
    const currentStepFields = stepFieldsMap[activeStep.id];
    setTouched(
      currentStepFields?.reduce((acc, field) => ({ ...acc, [field]: true }), {})
    );
    const errors = await validateForm();
    const hasErrors = currentStepFields?.some(
      (field) => (errors as any)[field]
    );

    if (!hasErrors) {
      const nextStepId = activeStep.id + 1;
      if (nextStepId < steps.length) {
        setActiveStep(steps[nextStepId]);
      } else {
        setLoading(true);
        // FIXME: Replace with actual submission logic
        console.log("Final values submitted:", values);
      }
    }
  };

  const handleBack = (): void => {
    if (activeStep.id > 0) {
      setActiveStep(steps[activeStep.id - 1]);
    } else {
      router.push(ROUTES.SERVICE_PROVIDER.CONTRACT_FILTER_URL([], [], []));
    }
  };

  const initialValues: ContractApplicationFormValues = {
    totalPrice: "",
    hourlyRate: "",
    message: "",
    zip: "",
    city: "",
    desiredDates: [new Date(), new Date(), new Date()],
    advantages: [],
    offerDocs: [],
    termsConditionDocs: [],
  };

  return (
    <Grid sx={{ padding: 4, marginTop: 2 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Bewerbung{" "}
        <span style={{ color: "#909090" }}>{contract?.tenderType}</span>
      </Typography>
      <Paper elevation={1} sx={{ p: 4, mx: "auto", my: 4 }}>
        <Grid container spacing={2}>
          {/* Contract Basic Information Section */}
          <Grid item xs={12} md={3} sx={styles.basicInformationHolder}>
            <Typography sx={styles.basicInformationLable} fontWeight="bold">
              Ausschreibungsart:
            </Typography>
            <Typography sx={styles.textGrey}>
              {translateTenderForm(contract?.tenderForm ?? "")}
            </Typography>

            <Typography
              sx={styles.basicInformationLable}
              fontWeight="bold"
              mt={2}
            >
              Auftragstyp:
            </Typography>
            <Typography sx={styles.textGrey}>{contract?.tenderType}</Typography>

            <Typography
              sx={styles.basicInformationLable}
              fontWeight="bold"
              mt={2}
            >
              Anlagentyp:
            </Typography>
            <Typography sx={styles.textGrey}>
              {contract?.subcategory}
            </Typography>

            <Typography
              sx={styles.basicInformationLable}
              fontWeight="bold"
              mt={2}
            >
              Angebotsfrist:
            </Typography>
            <Typography sx={styles.textGrey}>
              {contract?.fromDate &&
                contract?.toDate &&
                ` ${new Date(contract?.fromDate ?? "").toLocaleDateString("de-DE")} - ${new Date(contract?.toDate ?? "").toLocaleDateString("de-DE")}`}
            </Typography>

            <Typography
              sx={styles.basicInformationLable}
              fontWeight="bold"
              mt={2}
            >
              Adresse:
            </Typography>
            <Typography
              sx={styles.textGrey}
            >{`${contract?.city}, ${contract?.state}`}</Typography>

            <Typography
              sx={styles.basicInformationLable}
              fontWeight="bold"
              mt={2}
            >
              Dringlichkeit:
            </Typography>
            <Typography sx={styles.textGrey}>{contract?.urgency}</Typography>

            <Typography
              sx={styles.basicInformationLable}
              fontWeight="bold"
              mt={2}
            >
              Wer benötigt den Service?
            </Typography>
            <Typography sx={styles.textGrey}>{contract?.clientName}</Typography>
          </Grid>

          {/* Contract Application Form Section */}
          <Formik
            enableReinitialize
            onSubmit={() => {}}
            initialValues={initialValues}
            validationSchema={applyContractFormSchema}
          >
            {({ validateForm, setTouched, submitForm, values }) => (
              <ContractApplicationForm
                steps={steps}
                loading={loading}
                activeStep={activeStep}
                handleBack={handleBack}
                setActiveStep={setActiveStep}
                handleNext={() =>
                  handleNext(validateForm, setTouched, submitForm, values)
                }
              />
            )}
          </Formik>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default ContractApplication;

const styles = {
  basicInformationHolder: {
    pr: 2,
    borderRight: "1px solid #e0e0e0",
  },
  basicInformationLable: {
    fontSize: "1rem",
  },
  textGrey: {
    color: "#8D999C",
    fontSize: "0.9rem",
    paddingLeft: "0.5rem",
  },
  lableText: {
    display: "flex",
    flexDirection: "row",
  },
  helpIcon: {
    color: "#A0ADB1",
    cursor: "pointer",
    marginLeft: "0.5rem",
  },
  divider: {
    mt: 4,
    mb: 4,
    width: "auto",
    height: "1px",
    bgcolor: "#fbfbfb",
    textAlign: "center",
  },
  desiredDateHolder: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  descriptionLable: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  descriptionText: {
    color: "#A0ADB1",
    fontSize: "0.85rem",
  },
  totalPriceOptions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
};
