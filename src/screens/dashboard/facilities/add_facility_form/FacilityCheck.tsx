"use client";
import "dayjs/locale/de";
import { useState } from "react";
import { Item } from "../../types";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useFormikContext } from "formik";
import Divider from "@mui/material/Divider";
import { AddFacilityFormValues } from "./types";
import Typography from "@mui/material/Typography";
import GTextInput from "@/components/input/GTextInput";
import GTextSelector from "@/components/input/GTextSelector";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { NextCheckOptions, reminderOptions } from "@/utils/Constants";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const FacilityCheck = (): JSX.Element => {
  const formik = useFormikContext<AddFacilityFormValues>();

  const [selectedNextCheck, setSelectedNextCheck] = useState<Item | null>(
    formik?.values?.nextCheckInYearNumber
      ? {
          label: formik.values.nextCheckInYearNumber,
          value: formik.values.nextCheckInYearNumber,
        }
      : null
  );
  const [selectedReminder, setSelectedReminder] = useState<Item | null>(
    formik?.values?.reminderInMonth
      ? {
          label: formik.values.reminderInMonth,
          value: formik.values.reminderInMonth,
        }
      : null
  );

  const handleNextCheckSelect = (selectedItem: Item | null): void => {
    setSelectedNextCheck(selectedItem);
    formik?.setFieldValue(
      "nextCheckInYearNumber",
      selectedItem ? selectedItem.value : ""
    );
  };
  const handleReminderSelect = (selectedItem: Item | null): void => {
    setSelectedReminder(selectedItem);
    formik?.setFieldValue(
      "reminderInMonth",
      selectedItem ? selectedItem.value : ""
    );
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
        <Grid item xs={6}>
          <Typography variant="gsub" color="gray.500">
            LETZTE PRÜFUNG
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
            <DatePicker
              name="lastCheckDate"
              label="Enddatum"
              format="DD.MMM.YYYY"
              value={formik?.values?.lastCheckDate}
              slotProps={{ textField: { fullWidth: true } }}
              onChange={(value) =>
                formik?.setFieldValue("lastCheckDate", value)
              }
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="gsub" color="gray.500" sx={style.helpIconLable}>
            NÄCHSTE PRÜFUNG
            <HelpOutlineIcon style={style.helpIconYellow} fontSize="small" />
          </Typography>
          <GTextSelector
            name="nextCheckInYearNumber"
            options={NextCheckOptions}
            placeholder="Nächste Prüfung auswählen"
            error={
              formik?.touched?.nextCheckInYearNumber &&
              Boolean(formik?.errors?.nextCheckInYearNumber)
            }
            helperText={
              formik?.touched?.nextCheckInYearNumber &&
              formik?.errors?.nextCheckInYearNumber
            }
            onSelect={handleNextCheckSelect}
            selectedState={selectedNextCheck}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="gsub" color="gray.500" sx={style.helpIconLable}>
            AUTOMATISCH VERÖFFENTLICHEN
            <HelpOutlineIcon style={style.helpIconGray} fontSize="small" />
          </Typography>
          <Grid sx={style.helpIconLable}>
            <FormControlLabel
              control={
                <Checkbox
                  id="isPublishAutomatically"
                  name="isPublishAutomatically"
                  onBlur={formik?.handleBlur}
                  onChange={formik?.handleChange}
                  checked={formik?.values?.isPublishAutomatically}
                />
              }
              label="aktivieren"
            />
            {formik?.values?.isPublishAutomatically && (
              <FormControl sx={style.conditionalBorder}>
                <RadioGroup
                  id="autoPublishDuration"
                  name="autoPublishDuration"
                  value={formik.values.autoPublishDuration}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={3}>
                      <FormControlLabel
                        value="alle 12 Monate"
                        control={<Radio />}
                        label="alle 12 Monate"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <FormControlLabel
                        value="alle 9 Monate"
                        control={<Radio />}
                        label="alle 9 Monate"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <FormControlLabel
                        value="alle 6 Monate"
                        control={<Radio />}
                        label="alle 6 Monate"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <FormControlLabel
                        value="alle 3 Monate"
                        control={<Radio />}
                        label="alle 3 Monate"
                      />
                    </Grid>
                  </Grid>
                </RadioGroup>
              </FormControl>
            )}
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="gsub" color="gray.500">
            REMINDER EINSTELLEN
          </Typography>
          <GTextSelector
            name="reminderInMonth"
            options={reminderOptions}
            placeholder="Reminder auswählen"
            error={
              formik?.touched?.reminderInMonth &&
              Boolean(formik?.errors?.reminderInMonth)
            }
            helperText={
              formik?.touched?.reminderInMonth &&
              formik?.errors?.reminderInMonth
            }
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
                id="isEmailNotificationEnable"
                name="isEmailNotificationEnable"
                onBlur={formik?.handleBlur}
                onChange={formik?.handleChange}
                checked={formik?.values?.isEmailNotificationEnable}
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

export default FacilityCheck;

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
  conditionalBorder: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: "0.7rem",
    justiContent: "space-evenly",
    borderLeft: "#d3d3d3 2px solid",
  },
};
