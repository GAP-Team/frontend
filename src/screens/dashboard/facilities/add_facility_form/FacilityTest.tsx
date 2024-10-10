"use client";
import { useState } from "react";
import { Item } from "../../types";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useFormikContext } from "formik";
import Divider from "@mui/material/Divider";
import { AddFacilityFormValues } from "./types";
import Typography from "@mui/material/Typography";
import GTextInput from "@/components/input/GTextInput";
import { Checkbox, FormControlLabel } from "@mui/material";
import GTextSelector from "@/components/input/GTextSelector";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { NextTestOptions, reminderOptions } from "@/utils/Constants";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

const FacilityTest = (): JSX.Element => {
  const formik = useFormikContext<AddFacilityFormValues>();

  const [selectedNextTest, setSelectedNextTest] = useState<Item | null>(
    formik?.values?.nextTest
      ? { label: formik.values.nextTest, value: formik.values.nextTest }
      : null
  );
  const [selectedReminder, setSelectedReminder] = useState<Item | null>(
    formik?.values?.reminder
      ? { label: formik.values.reminder, value: formik.values.reminder }
      : null
  );

  const handleNextTestSelect = (selectedItem: Item | null): void => {
    setSelectedNextTest(selectedItem);
    formik?.setFieldValue("nextTest", selectedItem ? selectedItem.value : "");
  };
  const handleReminderSelect = (selectedItem: Item | null): void => {
    setSelectedReminder(selectedItem);
    formik?.setFieldValue("reminder", selectedItem ? selectedItem.value : "");
  };

  return (
    <Box
      noValidate
      component="form"
      sx={{
        p: 1,
        paddingBottom: "1.5rem",
        width: "auto",
        marginLeft: "1.5rem",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="gsub" color="gray.500">
            LETZTE PRÜFUNG
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box mt={1} sx={{ width: "auto" }}>
              <DatePicker
                name="finalDate"
                label="Enddatum"
                format="DD.MMM.YYYY"
                value={formik?.values?.finalDate}
                slotProps={{ textField: { fullWidth: true } }}
                // renderInput={(params) => <TextField {...params} fullWidth />}
                onChange={(value) => formik?.setFieldValue("finalDate", value)}
              />
            </Box>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="gsub" color="gray.500" sx={style.helpIconLable}>
            NÄCHSTE PRÜFUNG
            <HelpOutlineIcon style={style.helpIconYellow} fontSize="small" />
          </Typography>
          <GTextSelector
            name="nextTest"
            options={NextTestOptions}
            placeholder="Nächste Prüfung auswählen"
            error={
              formik?.touched?.nextTest && Boolean(formik?.errors?.nextTest)
            }
            helperText={formik?.touched?.nextTest && formik?.errors?.nextTest}
            onSelect={handleNextTestSelect}
            selectedState={selectedNextTest}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="gsub" color="gray.500" sx={style.helpIconLable}>
            AUTOMATISCH VERÖFFENTLICHEN
            <HelpOutlineIcon style={style.helpIconGray} fontSize="small" />
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                id="autoPublish"
                name="autoPublish"
                onBlur={formik?.handleBlur}
                onChange={formik?.handleChange}
                checked={formik?.values?.autoPublish}
              />
            }
            label="aktivieren"
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="gsub" color="gray.500">
            REMINDER EINSTELLEN
          </Typography>
          <GTextSelector
            name="reminder"
            options={reminderOptions}
            placeholder="Reminder auswählen"
            error={
              formik?.touched?.reminder && Boolean(formik?.errors?.reminder)
            }
            helperText={formik?.touched?.reminder && formik?.errors?.reminder}
            onSelect={handleReminderSelect}
            selectedState={selectedReminder}
          />
        </Grid>
        <Grid item xs={12} sx={style.lable}>
          <Typography variant="gsub" color="gray.500">
            AUTOMATISCHE E-MAIL ERHALTEN
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                id="autoEmail"
                name="autoEmail"
                onBlur={formik?.handleBlur}
                onChange={formik?.handleChange}
                checked={formik?.values?.autoEmail}
              />
            }
            label="aktivieren"
          />
        </Grid>
        <Grid item xs={6}>
          <GTextInput
            id="emailOne"
            name="emailOne"
            placeholder="E-Mail"
            onBlur={formik?.handleBlur}
            onChange={formik?.handleChange}
            value={formik?.values?.emailOne}
            error={
              formik?.touched?.emailOne && Boolean(formik?.errors?.emailOne)
            }
            helperText={formik?.touched?.emailOne && formik?.errors?.emailOne}
          />
        </Grid>
        <Grid item xs={6}>
          <GTextInput
            id="emailTwo"
            name="emailTwo"
            placeholder="E-Mail"
            onBlur={formik?.handleBlur}
            onChange={formik?.handleChange}
            value={formik?.values?.emailTwo}
            error={
              formik?.touched?.emailTwo && Boolean(formik?.errors?.emailTwo)
            }
            helperText={formik?.touched?.emailTwo && formik?.errors?.emailTwo}
          />
        </Grid>
        <Divider />
      </Grid>
    </Box>
  );
};

export default FacilityTest;

const style = {
  lable: {
    display: "flex",
    flexDirection: "column",
  },
  helpIconLable: {
    display: "flex",
    flexDirection: "row",
  },
  helpIconYellow: {
    color: "#FF9209",
    marginLeft: "0.5rem",
    marginBottom: "0.5rem",
    cursor: "pointer",
    paddingBotton: "2px",
  },
  helpIconGray: {
    color: "#A0ADB1",
    marginLeft: "0.5rem",
    marginBottom: "0.5rem",
    cursor: "pointer",
    paddingBotton: "2px",
  },
};
