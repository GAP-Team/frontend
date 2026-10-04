import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { Box, Grid, Divider, TextField, Typography } from "@mui/material";
import { GAP_COMMISSION_RATE } from "@/utils/Constants";
import HeaderSection from "@/screens/real-estate-owner/dashboard/HeaderSection";
import LabelWithAsterisk from "@/components/data-display/label/LabelWithAsterisk";

const formatEuro = (amount: number): string =>
  amount.toLocaleString("de-DE", { style: "currency", currency: "EUR" });

const parsePrice = (price: string): number =>
  Number(price.replace(/\./g, "").replace(",", ".")) || 0;

const ContractRateForm = ({ formik }: { formik?: any }): JSX.Element => {
  const [priceValues, setPriceValues] = useState({
    totalPrice: "",
  });

  const handlePriceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ): void => {
    setPriceValues({
      ...priceValues,
      [name]: event.target.value,
    });
    const cleanPrice = event.target.value.replace("€", "");
    formik.setFieldValue(name, cleanPrice);
  };

  const totalPrice = parsePrice(priceValues.totalPrice.replace("€", ""));
  const commission = totalPrice * GAP_COMMISSION_RATE;
  const commissionPercent = GAP_COMMISSION_RATE * 100;

  return (
    <Grid item xs={12} md={9}>
      <HeaderSection titletext="VERTRAGSRATE" />
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
                value={priceValues.totalPrice}
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
            Hier ist das gewünschte und mögliche
            <br />
            Prüfungsdatum angezeigt.
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2} sx={styles.desiredDateHolder}>
            {formik?.values?.desiredDates?.map(
              (date: string, index: number) => (
                <Grid item xs={12} md={4} key={index}>
                  <Typography
                    variant="gsub"
                    color="gray.500"
                    sx={styles.lableText}
                  >
                    Gewünschtes Datum {index + 1}
                  </Typography>
                  <div>
                    <TextField
                      type="date"
                      onBlur={formik?.handleBlur}
                      id={`desiredDates[${index}]`}
                      name={`desiredDates[${index}]`}
                      onChange={formik?.handleChange}
                      InputLabelProps={{ shrink: true }}
                      value={formik?.values?.desiredDates[index] || ""}
                      InputProps={{
                        inputProps: {
                          min: new Date().toISOString().split("T")[0],
                        },
                      }}
                    />
                  </div>
                </Grid>
              )
            )}
          </Grid>
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
  desiredDateHolder: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
