// ContractApplication.tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Grid, Paper, Typography } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import dayjs from "dayjs";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { currentUser } from "@/lib/features/userSlice";
import { getContract } from "@/lib/features/contractSlice";
import { showSnackbar } from "@/lib/features/snackbarSlice";

import { ROUTES } from "@/utils/routes";
import { DOCUMENT_TYPE } from "@/utils/enums";
import { applyContractFormSchema } from "@/utils/ValidationSchema";
import { handleUploadDoc } from "@/utils/uploadToS3";
import { translateTenderForm } from "@/utils/utils";
import contractAPI from "@/api/contract";
import s3API from "@/api/s3";

import HeaderSection from "@/screens/real-estate-owner/dashboard/HeaderSection";
import ContractRateForm from "./ContractRateForm";
import ContractServicesForm from "./ContractServicesForm";
import ContractApplicationSummary from "./ContractApplicationSummary";
import ContractApplicationForm from "./ContractApplicationForm";
import ContractApplicationSuccess from "./ContractApplicationSuccess";
import { ActiveStepItem } from "@/screens/real-estate-owner/types";

import {
  Document,
  Application,
  ContractApplicationFormValues,
  SubmitFormFunction,
} from "@/typings/types";

const steps: ActiveStepItem[] = [
  { id: 0, stepName: "ContractRate", component: ContractRateForm },
  { id: 1, stepName: "ContractServices", component: ContractServicesForm },
  {
    id: 2,
    stepName: "ContractApplicationSummary",
    component: ContractApplicationSummary,
  },
];

const stepFieldsMap: Record<number, string[]> = {
  0: ["totalPrice", "hourlyRate", "message", "zip", "city", "desiredDateOne"],
  1: ["advantages", "termsConditionDoc", "offerDoc"],
  2: [],
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
  offerDocFile: new File([], ""),
  termsConditionDocFile: new File([], ""),
  acceptedTerms: false,
};

const ContractApplication = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(currentUser);
  const contract = useAppSelector(getContract);

  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState<ActiveStepItem>(steps[0]);
  const [submittedId, setSubmittedId] = useState("");

  useEffect(() => setActiveStep(steps[0]), []);

  const handleBack = (): void => {
    if (activeStep.id > 0) setActiveStep(steps[activeStep.id - 1]);
    else router.push(ROUTES.SERVICE_PROVIDER.CONTRACT_FILTER_URL([], [], []));
  };

  const handleNext = async (
    validateForm: FormikHelpers<ContractApplicationFormValues>["validateForm"],
    setTouched: FormikHelpers<ContractApplicationFormValues>["setTouched"],
    submitForm: SubmitFormFunction,
    values: ContractApplicationFormValues
  ): Promise<void> => {
    const fields = stepFieldsMap[activeStep.id];
    setTouched(fields.reduce((acc, f) => ({ ...acc, [f]: true }), {}));
    const errors = await validateForm();
    const hasErrors = fields.some((f) => (errors as any)[f]);
    if (!hasErrors) {
      activeStep.id + 1 < steps.length
        ? setActiveStep(steps[activeStep.id + 1])
        : await submitApplication(values);
    }
  };

  const submitApplication = async (
    values: ContractApplicationFormValues
  ): Promise<void> => {
    setLoading(true);
    const docs: Document[] = [];
    try {
      const docFields = ["offerDocFile", "termsConditionDocFile"] as const;

      for (const field of docFields) {
        const file = values[field];
        switch (field) {
          case "offerDocFile":
            docs.push(
              await uploadDocument(file, DOCUMENT_TYPE.OFFER_DOCUMENTS)
            );
            break;

          case "termsConditionDocFile":
            docs.push(
              await uploadDocument(file, DOCUMENT_TYPE.TERMS_AND_CONDITIONS)
            );
            break;
        }
      }

      const payload: Application = {
        tenderId: contract.tenderId,
        userId: user.id,
        serviceTotalPrice: values.totalPrice,
        servicePerHourPrice: values.hourlyRate,
        message: values.message,
        suggestionWorkDates: values.desiredDates
          .filter(Boolean)
          .map((d) => dayjs(d).toISOString()),
        zip: Number(values.zip),
        city: values.city,
        dataPrivacy: values.acceptedTerms,
        benefitsSpecialServices: values.advantages,
        documents: docs,
        status: null,
      };

      const res = await contractAPI.applyForContract(
        contract.tenderId,
        payload
      );
      setSubmittedId(res.id);
      dispatch(
        showSnackbar({
          type: "success",
          message: "Angebot erfolgreich eingereicht.",
        })
      );
    } catch {
      await cleanupDocuments(docs);
      dispatch(
        showSnackbar({
          type: "error",
          message: "Fehler beim Einreichen des Angebots.",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const uploadDocument = async (
    file: File,
    type: string
  ): Promise<Document> => {
    const uploaded = await handleUploadDoc(file);
    return { ...uploaded, documentType: type };
  };

  const cleanupDocuments = async (docs: Document[]): Promise<void> => {
    for (const doc of docs) await s3API.delete(doc.key);
  };

  return (
    <Grid sx={{ p: 4, mt: 2 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Bewerbung{" "}
        <span style={{ color: "#909090" }}>{contract?.tenderType}</span>
      </Typography>
      <Paper elevation={1} sx={{ p: 4, my: 4 }}>
        <Grid container spacing={2}>
          {submittedId && !loading ? (
            <ContractApplicationSuccess submittedApplicationId={submittedId} />
          ) : (
            <>
              <Grid
                item
                xs={12}
                md={3}
                sx={{ pr: 2, borderRight: "1px solid #e0e0e0" }}
              >
                <HeaderSection titletext="BEWERBUNGSDATEN" />
                {renderContractInfo(contract)}
              </Grid>
              <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={applyContractFormSchema}
                onSubmit={() => {}}
              >
                {({ validateForm, setTouched, submitForm, values }) => (
                  <ContractApplicationForm
                    steps={steps}
                    loading={loading}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    handleBack={handleBack}
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

const renderContractInfo = (contract: any): JSX.Element => (
  <>
    <InfoBlock
      label="Ausschreibungsart"
      value={translateTenderForm(contract?.tenderForm || "")}
    />
    <InfoBlock label="Auftragstyp" value={contract?.tenderType} />
    <InfoBlock label="Anlagentyp" value={contract?.subcategory} />
    <InfoBlock
      label="Angebotsfrist"
      value={formatDateRange(contract?.fromDate, contract?.toDate)}
    />
    <InfoBlock
      label="Adresse"
      value={`${contract?.city}, ${contract?.state}`}
    />
    <InfoBlock label="Dringlichkeit" value={contract?.urgency} />
    <InfoBlock label="Wer benötigt den Service?" value={contract?.clientName} />
  </>
);

const InfoBlock = ({
  label,
  value,
}: {
  label: string;
  value: string;
}): JSX.Element => (
  <>
    <Typography sx={{ fontSize: "1rem" }} fontWeight="bold" mt={2}>
      {label}:
    </Typography>
    <Typography sx={{ color: "#8D999C", fontSize: "0.9rem", pl: 1 }}>
      {value || "Nicht Vorhanden"}
    </Typography>
  </>
);

const formatDateRange = (from?: string, to?: string): string => {
  if (!from || !to) return "Nicht Vorhanden";
  return `${new Date(from).toLocaleDateString("de-DE")} - ${new Date(to).toLocaleDateString("de-DE")}`;
};

export default ContractApplication;
