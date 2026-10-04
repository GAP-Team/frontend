import { FieldArray } from "formik";
import AddIcon from "@mui/icons-material/Add";
import UploadButton from "@/components/inputs/button/UploadButton";
import SuggestedDateRow from "./SuggestedDateRow";
import { SuggestedDate } from "./types";
import { NumericFormat } from "react-number-format";
import {
  Box,
  Grid,
  Button,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { GAP_COMMISSION_RATE } from "@/utils/Constants";
import HeaderSection from "@/screens/real-estate-owner/dashboard/HeaderSection";
import LabelWithAsterisk from "@/components/data-display/label/LabelWithAsterisk";

const formatEuro = (amount: number): string =>
  amount.toLocaleString("de-DE", { style: "currency", currency: "EUR" });

const parsePrice = (price: string): number =>
  Number(price.replace(/\./g, "").replace(",", ".")) || 0;

const ContractRateForm = ({ formik }: { formik?: any }): JSX.Element => {
  const handleOfferDocChange = (ev: any): void => {
    const file = ev?.target.files[0];
    formik.setFieldValue("offerDocFile", file);
    formik.setFieldValue("offerDoc", file?.name ?? "");
  };

  const handlePriceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ): void => {
    const cleanPrice = event.target.value.replace("€", "");
    formik.setFieldValue(name, cleanPrice);
  };

  // formik is the single source of truth, so the price survives step changes
  const priceInput = formik?.values?.totalPrice
    ? `€${formik.values.totalPrice}`
    : "";
  const totalPrice = parsePrice(formik?.values?.totalPrice ?? "");
  const commission = totalPrice * GAP_COMMISSION_RATE;
  const commissionPercent = GAP_COMMISSION_RATE * 100;

  return (
    <Grid item xs={12} md={9}>
      <HeaderSection titletext="VERTRAGSRATE" />
      {/* Angebot Upload Section */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography sx={styles.descriptionLable}>
            Angebot als PDF hochladen
          </Typography>
          <Typography sx={styles.descriptionText}>
            Laden Sie Ihr Angebot für diese
            <br />
            Ausschreibung als PDF hoch.
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <LabelWithAsterisk>Angebot Dokumente</LabelWithAsterisk>
          <Box sx={styles.docUploaderBox}>
            <UploadButton
              id="offerDoc"
              name="offerDoc"
              onChange={handleOfferDocChange}
              value={formik?.values?.offerDoc}
              error={
                formik?.touched?.offerDoc && Boolean(formik?.errors?.offerDoc)
              }
              helperText={
                formik?.touched?.offerDoc &&
                formik?.errors?.offerDoc?.toString()
              }
            />
          </Box>
        </Grid>
      </Grid>
      <Divider sx={styles.divider} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography sx={styles.descriptionLable}>
            Kosten der Dienstleistung
          </Typography>
          <Typography sx={styles.descriptionText}>
            Geben Sie den Preis für den Service ein.
            <br />
            Mehraufwand nach Stundenbasis
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <LabelWithAsterisk>Gesamtpreis</LabelWithAsterisk>
              <NumericFormat
                prefix="€"
                fullWidth
                sx={{ mt: 0.5 }}
                name="totalPrice"
                decimalScale={2}
                fixedDecimalScale
                decimalSeparator=","
                thousandSeparator="."
                customInput={TextField}
                value={priceInput}
                onChange={(event) => handlePriceChange(event, "totalPrice")}
                helperText={
                  formik?.touched?.totalPrice && formik?.errors?.totalPrice
                }
                error={
                  formik?.touched?.totalPrice &&
                  Boolean(formik?.errors?.totalPrice)
                }
              />
              {totalPrice > 0 && (
                <Box sx={styles.commissionBox}>
                  <Box sx={styles.commissionRow}>
                    <span>GAP-Provision ({commissionPercent} %)</span>
                    <span>- {formatEuro(commission)}</span>
                  </Box>
                  <Box sx={styles.commissionRowBold}>
                    <span>Ihre Auszahlung</span>
                    <span>{formatEuro(totalPrice - commission)}</span>
                  </Box>
                </Box>
              )}
              <Typography sx={styles.commissionHint}>
                Von Ihrem Gesamtpreis behält GAP eine Provision von{" "}
                {commissionPercent} % ein.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={styles.divider} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography sx={styles.descriptionLable}>Prüfungsdatum</Typography>
          <Typography sx={styles.descriptionText}>
            Geben Sie ein oder mehrere mögliche
            <br />
            Termine an: als bestimmtes Datum oder
            <br />
            als Zeitraum (von – bis).
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <FieldArray name="desiredDates">
            {({ push, remove }) => (
              <Box sx={styles.dateList}>
                {formik?.values?.desiredDates?.map(
                  (entry: SuggestedDate, index: number) => (
                    <SuggestedDateRow
                      key={index}
                      index={index}
                      entry={entry}
                      formik={formik}
                      canRemove={formik.values.desiredDates.length > 1}
                      onRemove={() => remove(index)}
                    />
                  )
                )}
                <Button
                  variant="text"
                  startIcon={<AddIcon />}
                  sx={styles.addDateButton}
                  onClick={() =>
                    push({ type: "single", date: "", endDate: "" })
                  }
                >
                  Weiteren Termin hinzufügen
                </Button>
              </Box>
            )}
          </FieldArray>
        </Grid>
      </Grid>
      <Divider sx={styles.divider} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography sx={styles.descriptionLable}>
            Stadt-PLZ des Dienstleisters
          </Typography>
          <Typography sx={styles.descriptionText}>
            Wenn Ihre Geschäftsadresse nicht Ihr
            <br />
            Startadresse für die Abfahrt ist.
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
                name="zip"
                value={formik?.values?.zip}
                onBlur={formik?.handleBlur}
                onChange={formik?.handleChange}
                error={formik?.touched?.zip && Boolean(formik?.errors?.zip)}
                helperText={formik?.touched?.zip && formik?.errors?.zip}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="gsub" color="gray.500" sx={styles.lableText}>
                Stadt/Ort
              </Typography>
              <TextField
                fullWidth
                name="city"
                onBlur={formik?.handleBlur}
                value={formik?.values?.city}
                onChange={formik?.handleChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={styles.divider} />
    </Grid>
  );
};

export default ContractRateForm;

const styles = {
  docUploaderBox: {
    p: 1,
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    borderRadius: "12px",
    justifyContent: "center",
    border: "2px dashed #ccc",
  },
  commissionHint: {
    mt: 1,
    color: "#A0ADB1",
    fontSize: "0.8rem",
  },
  commissionBox: {
    mt: 1.5,
    p: 1.5,
    borderRadius: "0.5rem",
    bgcolor: "#F6F8FB",
    fontSize: "0.9rem",
  },
  commissionRow: {
    display: "flex",
    justifyContent: "space-between",
    color: "#6b7280",
  },
  commissionRowBold: {
    mt: 0.5,
    display: "flex",
    justifyContent: "space-between",
    fontWeight: 700,
  },
  dateList: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  addDateButton: {
    alignSelf: "flex-start",
    fontWeight: 600,
    textTransform: "none",
  },
  divider: {
    mt: 4,
    mb: 4,
    width: "auto",
    height: "1px",
    bgcolor: "#fbfbfb",
    textAlign: "center",
  },
  lableText: {
    display: "flex",
    flexDirection: "row",
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
