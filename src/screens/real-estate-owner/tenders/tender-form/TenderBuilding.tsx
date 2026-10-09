"use client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import { useFormikContext } from "formik";
import {
  FormControlLabel,
  RadioGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { TenderFormValues } from "./types";
import { ObjectFacilityMode } from "@/utils/enums";
import TenderExistingObjectFacility from "./TenderExistingObjectFacility";
import TenderNewFacilityFields from "./TenderNewFacilityFields";
import TenderNewObjectFacility from "./TenderNewObjectFacility";

const MODE_DESCRIPTIONS = [
  {
    title: "Bestehendes Objekt & Anlage auswählen",
    text: "Objekt und Anlage sind bereits in GAP angelegt. Sie wählen beide aus Ihren vorhandenen Einträgen aus.",
  },
  {
    title: "Bestehendes Objekt, neue Anlage anlegen",
    text: "Das Objekt ist bereits angelegt, die Anlage jedoch noch nicht. Sie wählen das Objekt aus und legen die Anlage neu an.",
  },
  {
    title: "Neues Objekt & Anlage anlegen",
    text: "Weder Objekt noch Anlage sind in GAP vorhanden. Sie legen beides neu an.",
  },
];

const ObjectFacilityModeInfo = (): JSX.Element => (
  <Tooltip
    arrow
    placement="right"
    title={
      <Box sx={{ p: 0.5 }}>
        {MODE_DESCRIPTIONS.map(({ title, text }) => (
          <Box key={title} sx={{ mb: 1, "&:last-child": { mb: 0 } }}>
            <Typography variant="body2" fontWeight="bold">
              {title}
            </Typography>
            <Typography variant="body2">{text}</Typography>
          </Box>
        ))}
      </Box>
    }
  >
    <InfoOutlinedIcon
      fontSize="small"
      aria-label="Erklärung der Auswahlmöglichkeiten"
      sx={{ color: "gray.500", cursor: "help", ml: 1 }}
    />
  </Tooltip>
);

const renderObjectFacilityFields = (mode: ObjectFacilityMode): JSX.Element => {
  switch (mode) {
    case ObjectFacilityMode.NEW:
      return <TenderNewObjectFacility />;
    case ObjectFacilityMode.NEW_FACILITY:
      return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TenderExistingObjectFacility showFacilitySelect={false} />
          </Grid>
          <Grid item xs={12}>
            <TenderNewFacilityFields />
          </Grid>
        </Grid>
      );
    default:
      return <TenderExistingObjectFacility />;
  }
};

const TenderBuilding = (): JSX.Element => {
  const formik = useFormikContext<TenderFormValues>();

  return (
    <Box
      component="form"
      noValidate
      sx={{ p: 1, width: "auto", marginLeft: "1.5rem" }}
    >
      <Grid container spacing={2} sx={{ marginBottom: "0.5rem" }}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="gsub" color="gray.500">
              OBJEKT & ANLAGE
            </Typography>
            <ObjectFacilityModeInfo />
          </Box>
          <RadioGroup
            name="objectFacilityMode"
            value={formik.values.objectFacilityMode}
            onChange={formik.handleChange}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  value={ObjectFacilityMode.EXISTING}
                  control={<Radio />}
                  label="Bestehendes Objekt & Anlage auswählen"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  value={ObjectFacilityMode.NEW_FACILITY}
                  control={<Radio />}
                  label="Bestehendes Objekt, neue Anlage anlegen"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  value={ObjectFacilityMode.NEW}
                  control={<Radio />}
                  label="Neues Objekt & Anlage anlegen"
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </Grid>
      </Grid>
      {renderObjectFacilityFields(formik.values.objectFacilityMode)}
    </Box>
  );
};

export default TenderBuilding;
