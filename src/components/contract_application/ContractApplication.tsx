import { Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { Formik, FormikHelpers } from "formik";
import ContractRateForm from "./ContractRateForm";
import { ActiveStepItem } from "@/screens/dashboard/types";
import ContractApplicationForm from "./ContractApplicationForm";
import { getContractDetails } from "@/lib/features/contractSlice";
import { applyContractFormSchema } from "@/utils/ValidationSchema";
import {
  ContractApplicationFormValues,
  SubmitFormFunction,
} from "@/typings/types";

const ContractApplication = (): JSX.Element => {
  const router = useRouter();
  const contractDetails = useAppSelector(getContractDetails);

  const steps: ActiveStepItem[] = [
    { id: 0, stepName: "ContractRate", component: ContractRateForm },
  ];

  const [loading, setLoading] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<ActiveStepItem>(steps[0]);

  const stepFieldsMap: { [key: number]: string[] } = {
    0: ["totalPrice", "hourlyRate", "message", "zip", "city", "checkDate"],
    1: [],
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
        console.log("Final values submitted:", values);
      }
    }
  };

  const handleBack = (): void => {
    if (activeStep.id > 0) {
      setActiveStep(steps[activeStep.id - 1]);
    } else {
      router.push(ROUTES.SERVICE_PROVIDER_HOME);
    }
  };

  const initialValues: ContractApplicationFormValues = {
    totalPrice: "",
    hourlyRate: "",
    message: "",
    zip: "",
    city: "",
    checkDate: "",
  };

  return (
    <Grid sx={{ padding: 4, marginTop: 2 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Bewerbung{" "}
        <span style={{ color: "#909090" }}>
          {contractDetails?.facilityName}
        </span>
      </Typography>
      <Paper elevation={1} sx={{ p: 4, mx: "auto", my: 4 }}>
        <Grid container spacing={2}>
          {/* Contract Basic Information Section */}
          <Grid item xs={12} md={3} sx={styles.basicInformationHolder}>
            <Typography sx={styles.basicInformationLable} fontWeight="bold">
              Ausschreibungsart:
            </Typography>
            <Typography sx={styles.textGrey}>
              {contractDetails?.facilityType}
            </Typography>

            <Typography
              sx={styles.basicInformationLable}
              fontWeight="bold"
              mt={2}
            >
              Auftragstyp:
            </Typography>
            <Typography sx={styles.textGrey}>
              {contractDetails?.subcategory}
            </Typography>

            <Typography
              sx={styles.basicInformationLable}
              fontWeight="bold"
              mt={2}
            >
              Anlagentyp:
            </Typography>
            <Typography sx={styles.textGrey}>
              {contractDetails?.tenderType}
            </Typography>

            <Typography
              sx={styles.basicInformationLable}
              fontWeight="bold"
              mt={2}
            >
              Angebotsfrist:
            </Typography>
            <Typography sx={styles.textGrey}>
              {`${new Date(contractDetails?.fromDate ?? "").toLocaleDateString("de-DE")} - ${new Date(contractDetails?.toDate ?? "").toLocaleDateString("de-DE")}`}
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
            >{`${contractDetails?.state}, ${contractDetails?.city}`}</Typography>

            <Typography
              sx={styles.basicInformationLable}
              fontWeight="bold"
              mt={2}
            >
              Dringlichkeit:
            </Typography>
            <Typography sx={styles.textGrey}>
              {contractDetails?.urgency}
            </Typography>

            <Typography
              sx={styles.basicInformationLable}
              fontWeight="bold"
              mt={2}
            >
              Wer benötigt den Service?
            </Typography>
            <Typography sx={styles.textGrey}>
              {contractDetails?.clientName}
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
                handleNext={() =>
                  handleNext(validateForm, setTouched, submitForm, values)
                }
              />
            )}
          </Formik>

          {/* <Grid item xs={12} md={9} >
                        <Grid container spacing={2} >
                            <Grid item xs={12} md={4}>
                                <Typography sx={styles.descriptionLable}>Kosten der Dienstleistung</Typography>
                                <Typography sx={styles.descriptionText}>
                                    Geben Sie den Preis für den Service ein.<br />
                                    Mehraufwand nach Stundenbasis*
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="gsub" color="gray.500" sx={styles.lableText}>
                                            Gesamtpreis
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            name='totalPrice'
                                            sx={{ mt: 0.5 }}
                                            value={totalPrice}
                                            onChange={(e) => setTotalPrice(e.target.value)}
                                            InputProps={{ startAdornment: <span>€&nbsp;</span> }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="gsub" color="gray.500" sx={styles.lableText}>
                                            Nettostundensatz Einzelstunden
                                            <HelpOutlineIcon style={styles.helpIcon} fontSize="small" />
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            name="hourlyRate"
                                            value={hourlyRate}
                                            onChange={(e) => setHourlyRate(e.target.value)}
                                            InputProps={{ startAdornment: <span>€&nbsp;</span> }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider sx={styles.divider} />

                        <Grid container spacing={2} >
                            <Grid item xs={12} md={4}>
                                <Typography sx={styles.descriptionLable}>Nachricht für Auftraggeber</Typography>
                                <Typography sx={styles.descriptionText}>
                                    Hier können Sie alles schreiben, was Sie für<br />
                                    nützlich für die Arbeit erachten, die Sie erledigen <br />
                                    können. Möglicherweise einige Einschränkungen oder Details.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Typography variant="gsub" color="gray.500" sx={styles.lableText}>
                                    Nützliche Informationen
                                </Typography>
                                <TextField
                                    rows={4}
                                    multiline
                                    fullWidth
                                    value={info}
                                    name="message"
                                    sx={{ mt: 2 }}
                                    helperText={`${info.length}/250`}
                                    onChange={(e) => setInfo(e.target.value.slice(0, 250))}
                                />
                            </Grid>
                        </Grid>
                        <Divider sx={styles.divider} />

                        <Grid container spacing={2} >
                            <Grid item xs={12} md={4}>
                                <Typography sx={styles.descriptionLable}>Prüfungsdatum</Typography>
                                <Typography sx={styles.descriptionText}>
                                    Hier ist das gewünschte und mögliche<br />
                                    Prüfungsdatum angezeigt.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Grid container spacing={2} sx={styles.desiredDateHolder}>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="gsub" color="gray.500" sx={styles.lableText}>
                                            Gewünschtes Datum
                                        </Typography>
                                        <div>
                                            <TextField
                                                type="date"
                                                value={date}
                                                name='checkDate'
                                                InputLabelProps={{ shrink: true }}
                                                onChange={(e) => setDate(e.target.value)}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <Typography variant="gsub" color="gray.500" sx={styles.lableText}>
                                            Gesamtpreis
                                        </Typography>
                                        <Box sx={styles.totalPriceOptions}>
                                            <Button variant="outlined">Zeitfenster 1</Button>
                                            <Button variant="outlined">Zeitfenster 2</Button>
                                            <Button variant="outlined">Zeitfenster 3</Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider sx={styles.divider} />

                        <Grid container spacing={2} >
                            <Grid item xs={12} md={4}>
                                <Typography sx={styles.descriptionLable}>Prüfungsdatum</Typography>
                                <Typography sx={styles.descriptionText}>
                                    Hier ist das gewünschte und mögliche<br />
                                    Prüfungsdatum angezeigt.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="gsub" color="gray.500" sx={styles.lableText}>
                                            Stadt-PLZ
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            value={zip}
                                            name='zip'
                                            onChange={(e) => setZip(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="gsub" color="gray.500" sx={styles.lableText}>
                                            Stadt/Ort
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            name='city'
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider sx={styles.divider} />

                        

                        <FormControlLabel
                            control={<Checkbox checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />}
                            label={<span>Ich akzeptiere die <strong>Allgemeinen Geschäftsbedingungen</strong> und die <strong>Datenschutzbestimmungen</strong>.</span>}
                            sx={{ mt: 2 }}
                        />
                        <Divider sx={styles.divider} />

                        <Box display="flex" mt={3}>
                            <Button sx={{ mr: 1 }} variant="outlined">Abbrechen</Button>
                            <Button variant="contained" disabled={!accepted}>Weiter</Button>
                        </Box>
                    </Grid> */}
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
