"use client";
import {
  Radio,
  MenuItem,
  Checkbox,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import "dayjs/locale/de";
import { useState } from "react";
import { Item } from "../../types";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import { ErrorMessage, useFormikContext } from "formik";
import Divider from "@mui/material/Divider";
import { AddFacilityFormValues } from "./types";
import Typography from "@mui/material/Typography";
import GTextInput from "@/components/input/GTextInput";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { NextCheckOptions, reminderOptions } from "@/utils/Constants";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

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

  const handleNextCheckSelect = (selectedItem: any): void => {
    setSelectedNextCheck(selectedItem?.target?.value);
    formik?.setFieldValue(
      "nextCheckInYearNumber",
      selectedItem?.target?.value ? selectedItem?.target?.value : ""
    );
  };
  const handleReminderSelect = (selectedItem: any): void => {
    setSelectedReminder(selectedItem?.target?.value);
    formik?.setFieldValue(
      "reminderInMonth",
      selectedItem?.target?.value ? selectedItem?.target?.value : ""
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
          <FormControl fullWidth>
            <Select
              name="nextCheckInYearNumber"
              value={selectedNextCheck}
              label="Nächste Prüfung auswählen"
              onChange={handleNextCheckSelect}
            >
              {NextCheckOptions?.map((check, checkIndex) => {
                return (
                  <MenuItem key={checkIndex} value={check?.value}>
                    {check?.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
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
                  id="publishAutomaticallyInMonths"
                  name="publishAutomaticallyInMonths"
                  value={formik.values.publishAutomaticallyInMonths}
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
          <FormControl fullWidth>
            <Select
              name="nextCheckInYearNumber"
              value={selectedReminder}
              label="Nächste Prüfung auswählen"
              onChange={handleReminderSelect}
            >
              {reminderOptions?.map((remind, remindIndex) => {
                return (
                  <MenuItem key={remindIndex} value={remind?.value}>
                    {remind?.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
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
        {formik?.values?.emailNotificationList.map((email, index) => (
          <Grid key={index} item xs={6}>
            <GTextInput
              placeholder="E-Mail"
              onBlur={formik?.handleBlur}
              onChange={formik?.handleChange}
              id={`emailNotificationList[${index}]`}
              name={`emailNotificationList[${index}]`}
              value={formik?.values?.emailNotificationList[index]}
            />
            <ErrorMessage
              name={`emailNotificationList[${index}]`}
              component="div"
              className="text-red-500 text-sm"
            />
          </Grid>
        ))}
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
