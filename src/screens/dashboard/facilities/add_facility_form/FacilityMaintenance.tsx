"use client";
import "dayjs/locale/de";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { AddFacilityFormValues } from "./types";
import Typography from "@mui/material/Typography";
import GTextInput from "@/components/input/GTextInput";
import { ErrorMessage, useFormikContext } from "formik";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import {
  NextMaintenanceOptions,
  reminderOptions,
  autoPublishMonthsOptions,
} from "@/utils/Constants";

const FacilityMaintenance = (): JSX.Element => {
  const formik = useFormikContext<AddFacilityFormValues>();

  return (
    <Box
      noValidate
      component="form"
      sx={{
        p: 1,
        width: "auto",
        marginLeft: "1.5rem",
        paddingBottom: "1.5rem",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="gsub" color="gray.500">
            LETZTE WARTUNG
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
            <Box mt={1} sx={{ width: "auto" }}>
              <DatePicker
                disableFuture
                label="Enddatum"
                format="DD.MM.YYYY"
                name="lastMaintenanceDate"
                value={formik?.values?.lastMaintenanceDate}
                slotProps={{ textField: { fullWidth: true } }}
                onChange={(value) =>
                  formik?.setFieldValue("lastMaintenanceDate", value)
                }
              />
            </Box>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="gsub" color="gray.500" sx={style.helpIconLable}>
            NÄCHSTE WARTUNG
            <HelpOutlineIcon style={style.helpIconYellow} fontSize="small" />
          </Typography>
          <FormControl fullWidth>
            <Select
              name="nextMaintenanceInMonth"
              value={formik?.values?.nextMaintenanceInMonth}
              label="Nächste Prüfung auswählen"
              onChange={formik.handleChange}
            >
              {NextMaintenanceOptions?.map((maintenance, maintenanceIndex) => {
                return (
                  <MenuItem key={maintenanceIndex} value={maintenance?.value}>
                    {maintenance?.label}
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
                  id="isPublishMaintenanceAutomatically"
                  name="isPublishMaintenanceAutomatically"
                  onBlur={formik?.handleBlur}
                  onChange={formik?.handleChange}
                  checked={formik?.values?.isPublishMaintenanceAutomatically}
                />
              }
              label="aktivieren"
            />
            {formik?.values?.isPublishMaintenanceAutomatically && (
              <FormControl sx={style.conditionalBorder}>
                <RadioGroup
                  id="publishMaintenanceAutomaticallyInMonth"
                  name="publishMaintenanceAutomaticallyInMonth"
                  value={formik.values.publishMaintenanceAutomaticallyInMonth}
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
              name="maintenanceReminderInMonth"
              value={formik?.values?.maintenanceReminderInMonth}
              label="Nächste Prüfung auswählen"
              onChange={formik.handleChange}
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
                id="isMaintenanceEmailNotificationEnable"
                name="isMaintenanceEmailNotificationEnable"
                onBlur={formik?.handleBlur}
                onChange={formik?.handleChange}
                checked={formik?.values?.isMaintenanceEmailNotificationEnable}
              />
            }
            label="aktivieren"
          />
        </Grid>
        {formik?.values?.maintenanceEmailNotificationList.map(
          (email, index) => (
            <Grid key={index} item xs={6}>
              <GTextInput
                placeholder="E-Mail"
                onBlur={formik?.handleBlur}
                onChange={formik?.handleChange}
                id={`maintenanceEmailNotificationList[${index}]`}
                name={`maintenanceEmailNotificationList[${index}]`}
                value={formik?.values?.maintenanceEmailNotificationList[index]}
              />
              <ErrorMessage
                component="div"
                className="text-red-500 text-sm"
                name={`maintenanceEmailNotificationList[${index}]`}
              />
            </Grid>
          )
        )}
        <Divider />
      </Grid>
    </Box>
  );
};

export default FacilityMaintenance;

const style = {
  lable: {
    display: "flex",
    flexDirection: "column",
  },
  helpIconLable: {
    display: "flex",
    flexDirection: "row",
  },
  helpIcon: {
    marginLeft: "0.5rem",
    marginBottom: "0.3rem",
    cursor: "pointer",
  },
  dividerStats: {
    mx: 2,
    height: "auto",
    bgcolor: "#d2d7d9",
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
