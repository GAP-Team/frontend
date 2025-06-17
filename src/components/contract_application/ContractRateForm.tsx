import {
  Box,
  Grid,
  Button,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const ContractRateForm = ({ formik }: { formik?: any }): JSX.Element => {
  const [zip, setZip] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [city, setCity] = useState<string>("");

  return (
    <Grid item xs={12} md={9}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography sx={styles.descriptionLable}>
            Kosten der Dienstleistung
          </Typography>
          <Typography sx={styles.descriptionText}>
            Geben Sie den Preis für den Service ein.
            <br />
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
                name="totalPrice"
                sx={{ mt: 0.5 }}
                onBlur={formik?.handleBlur}
                onChange={formik?.handleChange}
                value={formik?.values?.totalPrice}
                InputProps={{ startAdornment: <span>€&nbsp;</span> }}
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
              <Typography variant="gsub" color="gray.500" sx={styles.lableText}>
                Nettostundensatz Einzelstunden
                <HelpOutlineIcon style={styles.helpIcon} fontSize="small" />
              </Typography>
              <TextField
                fullWidth
                name="hourlyRate"
                onBlur={formik?.handleBlur}
                onChange={formik?.handleChange}
                value={formik?.values?.hourlyRate}
                InputProps={{ startAdornment: <span>€&nbsp;</span> }}
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
            value={info}
            name="message"
            sx={{ mt: 2 }}
            helperText={`${info.length}/250`}
            onChange={(e) => setInfo(e.target.value.slice(0, 250))}
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
            <Grid item xs={12} md={4}>
              <Typography variant="gsub" color="gray.500" sx={styles.lableText}>
                Gewünschtes Datum
              </Typography>
              <div>
                <TextField
                  type="date"
                  value={date}
                  name="checkDate"
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
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="gsub" color="gray.500" sx={styles.lableText}>
                Stadt-PLZ
              </Typography>
              <TextField
                fullWidth
                value={zip}
                name="zip"
                onChange={(e) => setZip(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="gsub" color="gray.500" sx={styles.lableText}>
                Stadt/Ort
              </Typography>
              <TextField
                fullWidth
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
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
