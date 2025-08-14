import { useState } from "react";
import { NumericFormat } from "react-number-format";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Grid, Divider, TextField, Typography } from "@mui/material";
import HeaderSection from "@/screens/real-estate-owner/dashboard/HeaderSection";
import LabelWithAsterisk from "@/components/data-display/label/LabelWithAsterisk";

const ContractRateForm = ({ formik }: { formik?: any }): JSX.Element => {
  const [info, setInfo] = useState<string>("");

  const handleSetInfo = (value: string): void => {
    setInfo(value);
    formik.setFieldValue("message", value);
  };

  const [priceValues, setPriceValues] = useState({
    totalPrice: "",
    hourlyRate: "",
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
            </Grid>
            <Grid item xs={12} md={6}>
              <LabelWithAsterisk>
                Nettostundensatz Einzelstunden
              </LabelWithAsterisk>
              <HelpOutlineIcon style={styles.helpIcon} fontSize="small" />
              <NumericFormat
                prefix="€"
                fullWidth
                sx={{ mt: 0.5 }}
                name="hourlyRate"
                decimalScale={2}
                fixedDecimalScale
                decimalSeparator=","
                thousandSeparator="."
                customInput={TextField}
                value={priceValues.hourlyRate}
                onChange={(event) => handlePriceChange(event, "hourlyRate")}
                helperText={
                  formik?.touched?.hourlyRate && formik?.errors?.hourlyRate
                }
                error={
                  formik?.touched?.hourlyRate &&
                  Boolean(formik?.errors?.hourlyRate)
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={styles.divider} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography sx={styles.descriptionLable}>
            Nachricht für Auftraggeber
          </Typography>
          <Typography sx={styles.descriptionText}>
            Hier können Sie alles schreiben, was Sie für
            <br />
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
            name="message"
            sx={{ mt: 2 }}
            onBlur={formik?.handleBlur}
            value={formik?.values?.message}
            helperText={
              <Typography sx={{ color: info.length === 250 ? "red" : "" }}>
                {info.length}/250
              </Typography>
            }
            onChange={(e) => handleSetInfo(e.target.value.slice(0, 250))}
          />
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
  helpIcon: {
    color: "#A0ADB1",
    cursor: "pointer",
    marginLeft: "0.5rem",
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
