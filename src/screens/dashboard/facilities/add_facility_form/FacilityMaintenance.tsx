"use client";
import Image from "next/image";
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import questionMarkYellow from "@/../public/icons/questionMark.svg";
// import questionMarkGray from "@/../public/icons/questionMarkGray.svg";
import { NextMaintenanceOptions, maintenanceReminderOptions } from "@/utils/Constants";
import { Checkbox, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

const FacilityMaintenance = (): JSX.Element => {
  const formik = useFormikContext<AddFacilityFormValues>();

  const [selectedNextMaintenance, setSelectedNextMaintenance] = useState<Item | null>(
    formik?.values?.nextMaintenance
      ? { label: formik.values.nextMaintenance, value: formik.values.nextMaintenance }
      : null
  );
  const [selectedMaintenanceReminder, setSelectedMaintenanceReminder] = useState<Item | null>(
    formik?.values?.maintenanceReminder
      ? { label: formik.values.maintenanceReminder, value: formik.values.maintenanceReminder }
      : null
  );

  const handleNextMaintenanceSelect = (selectedItem: Item | null): void => {
    setSelectedNextMaintenance(selectedItem);
    formik?.setFieldValue("nextMaintenance", selectedItem ? selectedItem.value : "");
  };
  const handleReminderSelect = (selectedItem: Item | null): void => {
    setSelectedMaintenanceReminder(selectedItem);
    formik?.setFieldValue("reminder", selectedItem ? selectedItem.value : "");
  };

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
        <Grid item xs={12}>
          <Typography variant="gsub" color="gray.500">
            LETZTE WARTUNG
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box mt={1} sx={{ width: "auto" }}>
              <DatePicker
                name="maintenanceFinalDate"
                label="Enddatum"
                format="DD.MMM.YYYY"
                value={formik?.values?.maintenanceFinalDate}
                slotProps={{ textField: { fullWidth: true } }}
                // renderInput={(params) => <TextField {...params} fullWidth />}
                onChange={(value) => formik?.setFieldValue("maintenanceFinalDate", value)}
              />
            </Box>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="gsub" color="gray.500" sx={style.helpIconLable}>
            NÄCHSTE WARTUNG
            {/* <span>
              <Image
                width={16}
                height={16}
                alt={"Help"}
                style={style.helpIcon}
                src={questionMarkYellow}
              />
            </span> */}
          </Typography>
          <GTextSelector
            name="nextMaintenance"
            options={NextMaintenanceOptions}
            placeholder="Nächste Wartung auswählen"
            error={
              formik?.touched?.nextMaintenance && Boolean(formik?.errors?.nextMaintenance)
            }
            helperText={formik?.touched?.nextMaintenance && formik?.errors?.nextMaintenance}
            onSelect={handleNextMaintenanceSelect}
            selectedState={selectedNextMaintenance}
          />
        </Grid>
        <Grid item xs={12}>
            <Typography variant="gsub" color="gray.500" sx={style.helpIconLable}>
            AUTOMATISCH VERÖFFENTLICHEN
            {/* <span>
                <Image
                width={16}
                height={16}
                alt={"Help"}
                style={style.helpIcon}
                src={questionMarkGray}
                />
            </span> */}
            </Typography>
            <Grid sx={style.helpIconLable}>
                <FormControlLabel
                    control={
                        <Checkbox
                        id="maintenanceAutoPublish"
                        name="maintenanceAutoPublish"
                        onBlur={formik?.handleBlur}
                        onChange={formik?.handleChange}
                        checked={formik?.values?.maintenanceAutoPublish}
                        />
                    }
                    label="aktivieren"
                />
                {formik?.values?.maintenanceAutoPublish && 
                    <FormControl sx={style.conditionalBorder}>
                        <RadioGroup
                            id="maintenanceAutoPublishDuration"
                            name="maintenanceAutoPublishDuration"
                            value={formik.values.maintenanceAutoPublishDuration}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <Grid container spacing={1} >
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
                }
            </Grid>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="gsub" color="gray.500">
            REMINDER EINSTELLEN
          </Typography>
          <GTextSelector
            name="maintenanceReminder"
            options={maintenanceReminderOptions}
            placeholder="maintenanceReminder auswählen"
            error={
              formik?.touched?.maintenanceReminder && Boolean(formik?.errors?.maintenanceReminder)
            }
            helperText={formik?.touched?.maintenanceReminder && formik?.errors?.maintenanceReminder}
            onSelect={handleReminderSelect}
            selectedState={selectedMaintenanceReminder}
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
                checked={formik?.values?.maintenanceAutoEmail}
              />
            }
            label="aktivieren"
          />
        </Grid>
        <Grid item xs={6}>
          <GTextInput
            id="maintenanceEmailOne"
            name="maintenanceEmailOne"
            placeholder="E-Mail"
            onBlur={formik?.handleBlur}
            onChange={formik?.handleChange}
            value={formik?.values?.maintenanceEmailOne}
            error={
              formik?.touched?.maintenanceEmailOne && Boolean(formik?.errors?.maintenanceEmailOne)
            }
            helperText={formik?.touched?.maintenanceEmailOne && formik?.errors?.maintenanceEmailOne}
          />
        </Grid>
        <Grid item xs={6}>
          <GTextInput
            id="maintenanceEmailTwo"
            name="maintenanceEmailTwo"
            placeholder="E-Mail"
            onBlur={formik?.handleBlur}
            onChange={formik?.handleChange}
            value={formik?.values?.maintenanceEmailTwo}
            error={
              formik?.touched?.maintenanceEmailTwo && Boolean(formik?.errors?.maintenanceEmailTwo)
            }
            helperText={formik?.touched?.maintenanceEmailTwo && formik?.errors?.maintenanceEmailTwo}
          />
        </Grid>
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
  conditionalBorder: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: "0.7rem",
    justiContent: "space-between",
    borderLeft: "#d3d3d3 2px solid",
  }
};