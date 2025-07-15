import {
  SubmitFormFunction,
  ContractApplicationFormValues,
} from "@/typings/types";
import { ROUTES } from "@/utils/routes";
import contractAPI from "@/api/contract";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Formik, FormikHelpers } from "formik";
import ContractRateForm from "./ContractRateForm";
import { translateTenderForm } from "@/utils/utils";
import { handleUploadDoc } from "@/utils/uploadToS3";
import { currentUser } from "@/lib/features/userSlice";
import { Grid, Paper, Typography } from "@mui/material";
import ContractServicesForm from "./ContractServicesForm";
import { showSnackbar } from "@/components/root-snackbar";
import { getContract } from "@/lib/features/contractSlice";
import { ActiveStepItem } from "@/screens/dashboard/types";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import ContractApplicationForm from "./ContractApplicationForm";
import { applyContractFormSchema } from "@/utils/ValidationSchema";
import ContractApplicationSummary from "./ContractApplicationSummary";
import ContractApplicationSuccess from "./ContractApplicationSuccess";
import HeaderSection from "../dashboard/real_estate_user/HeaderSection";
import { DOCUMENT_TYPE } from "@/utils/enums";

const ContractApplication = (): JSX.Element => {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const user = useAppSelector(currentUser);
  const contract = useAppSelector(getContract);

  const steps: ActiveStepItem[] = [
    { id: 0, stepName: "ContractRate", component: ContractRateForm },
    { id: 1, stepName: "ContractServices", component: ContractServicesForm },
    {
      id: 2,
      stepName: "ContractApplicationSummary",
      component: ContractApplicationSummary,
    },
  ];

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<ActiveStepItem>(steps[0]);
  const [submittedApplicationId, setSubmittedApplicationId] =
    useState<string>("");

  const stepFieldsMap: { [key: number]: string[] } = {
    0: ["totalPrice", "hourlyRate", "message", "zip", "city", "desiredDateOne"],
    1: ["advantages", "termsConditionDoc", "offerDoc"],
    2: [],
  };

  useEffect(() => {
    setActiveStep(steps[0]);
    setIsSubmitted(false);
  }, []);

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
        uploadDocs(values);
      }
    }
  };

  const uploadDocs = async (
    values: ContractApplicationFormValues
  ): Promise<void> => {
    const docObjList: any[] = [];
    const uploadDocuments = async (
      file: File | null,
      docType: string
    ): Promise<void> => {
      const uploadedDoc = await handleUploadDoc(file);
      uploadedDoc.documentType = docType;
      docObjList.push(uploadedDoc);
    };

    await uploadDocuments(values.offerDocFile, DOCUMENT_TYPE.OFFER_DOCUMENTS);
    await uploadDocuments(
      values.termsConditionDocFile,
      DOCUMENT_TYPE.TERMS_AND_CONDITIONS
    );

    await handleSubmit(values, docObjList);
  };

  const handleSubmit = async (
    values: ContractApplicationFormValues,
    docObjList: any[] = []
  ): Promise<void> => {
    try {
      setLoading(true);
      const applicationRequestBody = {
        tenderId: contract.tenderId,
        userId: user.id,
        serviceTotalPrice: values.totalPrice,
        servicePerHourPrice: values.hourlyRate,
        message: values.message,
        suggestionWorkDates: values.desiredDates.map((date) =>
          date ? { date: date } : { date: null }
        ),
        zip: Number(values.zip),
        city: values.city,
        dataPrivacy: values.acceptedTerms,
        benefitsSpecialServices: values.advantages,
        documents: docObjList,
      };
      const response = await contractAPI.applyContract(
        contract.tenderId,
        applicationRequestBody
      );
      setSubmittedApplicationId(response.data.id);
      setLoading(false);
      appDispatch(
        showSnackbar({
          type: "success",
          message: "Angebot erfolgreich eingereicht.",
        })
      );
    } catch {
      setLoading(false);
      setSubmittedApplicationId("");
      appDispatch(
        showSnackbar({
          type: "error",
          message: "Fehler beim Einreichen des Angebots.",
        })
      );
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
    desiredDates: [null, null, null],
    advantages: [],
    offerDoc: null,
    termsConditionDoc: null,
    offerDocFile: null,
    termsConditionDocFile: null,
    acceptedTerms: false,
  };

  return (
    <Grid sx={{ padding: 4, marginTop: 2 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Bewerbung{" "}
        <span style={{ color: "#909090" }}>{contract?.tenderType}</span>
      </Typography>
      <Paper elevation={1} sx={{ p: 4, mx: "auto", my: 4 }}>
        <Grid container spacing={2}>
          {submittedApplicationId !== "" && !loading ? (
            <ContractApplicationSuccess
              submittedApplicationId={submittedApplicationId}
            />
          ) : (
            <>
              {/* Contract Basic Information Section */}
              <Grid item xs={12} md={3} sx={styles.basicInformationHolder}>
                <HeaderSection titletext="BEWERBUNGSDATEN" />
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
                <Typography sx={styles.textGrey}>
                  {contract?.tenderType}
                </Typography>

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
                <Typography sx={styles.textGrey}>
                  {contract?.urgency}
                </Typography>

                <Typography
                  sx={styles.basicInformationLable}
                  fontWeight="bold"
                  mt={2}
                >
                  Wer benötigt den Service?
                </Typography>
                <Typography sx={styles.textGrey}>
                  {contract?.clientName}
                </Typography>
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
                    isBeyondLastStep={isSubmitted}
                    handleNext={() =>
                      handleNext(validateForm, setTouched, submitForm, values)
                    }
                  />
                )}
              </Formik>
            </>
          )}
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
