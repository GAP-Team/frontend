"use client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import { useFormikContext } from "formik";
import { FormControlLabel, RadioGroup, Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { TenderFormValues } from "./types";
import { ObjectFacilityMode } from "@/utils/enums";
import TenderExistingObjectFacility from "./TenderExistingObjectFacility";
import TenderNewFacilityFields from "./TenderNewFacilityFields";
import TenderNewObjectFacility from "./TenderNewObjectFacility";

const MODE_OPTIONS = [
  {
    value: ObjectFacilityMode.EXISTING,
    label: "Bestehendes Objekt & bestehende Anlage auswählen",
    info: "Objekt und Anlage sind bereits angelegt. Sie wählen beide aus Ihren vorhandenen Einträgen aus.",
  },
  {
    value: ObjectFacilityMode.NEW_FACILITY,
    label: "Bestehendes Objekt, neue Anlage anlegen",
    info: "Das Objekt ist bereits angelegt, die Anlage jedoch noch nicht. Sie wählen das Objekt aus und legen die Anlage neu an.",
  },
  {
    value: ObjectFacilityMode.NEW,
    label: "Neues Objekt & neue Anlage anlegen",
    info: "Weder Objekt noch Anlage sind vorhanden. Sie legen beides neu an.",
  },
];

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
          <RadioGroup
            name="objectFacilityMode"
            value={formik.values.objectFacilityMode}
            onChange={formik.handleChange}
          >
            <Grid container spacing={1}>
              {MODE_OPTIONS.map(({ value, label, info }) => (
                <Grid item xs={12} sm={6} key={value}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <FormControlLabel
                      value={value}
                      control={<Radio />}
                      label={label}
                      sx={{ mr: 0 }}
                    />
                    <Tooltip arrow placement="right" title={info}>
                      <InfoOutlinedIcon
                        fontSize="small"
                        aria-label={`Erklärung: ${label}`}
                        sx={{ color: "gray.500", cursor: "help", ml: 1 }}
                      />
                    </Tooltip>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
        </Grid>
      </Grid>
      {renderObjectFacilityFields(formik.values.objectFacilityMode)}
    </Box>
  );
};

export default TenderBuilding;
