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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  NextCheckOptions,
  reminderOptions,
  autoPublishMonthsOptions,
} from "@/utils/Constants";

const FacilityCheck = (): JSX.Element => {
  const formik = useFormikContext<AddFacilityFormValues>();

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
            LETZTE PRÜFUNG (Einschätzung)
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
            <DatePicker
              disableFuture
              label="Enddatum"
              format="DD.MM.YYYY"
              name="lastCheckDate"
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
              value={formik?.values?.nextCheckInYearNumber}
              label="Nächste Prüfung auswählen"
              onChange={formik.handleChange}
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
                  id="isPublishCheckAutomatically"
                  name="isPublishCheckAutomatically"
                  onBlur={formik?.handleBlur}
                  onChange={(e) =>
                    formik?.setFieldValue(
                      "isPublishCheckAutomatically",
                      e?.target?.checked
                    )
                  }
                  checked={formik?.values?.isPublishCheckAutomatically}
                />
              }
              label="aktivieren"
            />
            {formik?.values?.isPublishCheckAutomatically && (
              <FormControl sx={style.conditionalBorder}>
                <RadioGroup
                  id="publishCheckAutomaticallyInMonth"
                  name="publishCheckAutomaticallyInMonth"
                  value={formik?.values?.publishCheckAutomaticallyInMonth}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <Grid container spacing={1}>
                    {autoPublishMonthsOptions?.map((option, index) => (
                      <Grid key={index} item xs={3}>
                        <FormControlLabel
                          value={option?.value}
                          control={<Radio />}
                          label={option?.label}
                        />
                      </Grid>
                    ))}
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
              name="reminderInMonth"
              label="Reminder auswählen"
              onChange={formik.handleChange}
              value={formik?.values?.reminderInMonth}
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
        {formik?.values?.isEmailNotificationEnable &&
          formik?.values?.emailNotificationList.map((email, index) => (
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
                component="div"
                className="text-red-500 text-sm"
                name={`emailNotificationList[${index}]`}
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
