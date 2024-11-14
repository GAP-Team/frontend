"use client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import { useFormikContext } from "formik";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";

import { AddTenderFormValues } from "./types";
import GTextInput from "@/components/input/GTextInput";
import CustomSelect from "@/components/drop_down/CustomSelect";
import LabelWithAsterisk from "@/components/label/LabelWithAsterisk";
import { tenderTypesListHW, tenderTypesListSV } from "@/utils/Constants";

const TenderInformation = (): JSX.Element => {
  const formik = useFormikContext<AddTenderFormValues>();

  const handleTenderTypeSelect = (selectedItem: any): void => {
    const selectedTenderType = selectedItem?.target?.value;
    formik?.setFieldValue("tenderType", selectedTenderType);
  };

  return (
    <Box
      component="form"
      noValidate
      sx={{ p: 1, width: "auto", marginLeft: "1.5rem" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LabelWithAsterisk>NAME DES AUFTRAGGEBERS</LabelWithAsterisk>
          <GTextInput
            id="clientName"
            name="clientName"
            value={formik?.values?.clientName}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            error={
              formik?.touched?.clientName && Boolean(formik?.errors?.clientName)
            }
            helperText={
              formik?.touched?.clientName && formik?.errors?.clientName
            }
          />
        </Grid>
        <Grid item xs={12}>
          <LabelWithAsterisk>AUSSCHREIBUNGSART</LabelWithAsterisk>
          <FormControl sx={{ display: "block", mt: 1 }}>
            <RadioGroup
              row
              id="tenderForm"
              name="tenderForm"
              value={formik?.values?.tenderForm}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
            >
              <FormControlLabel
                value="Handwerker"
                control={<Radio />}
                label="Handwerker"
                sx={{ marginBottom: 0 }}
              />
              <FormControlLabel
                value="Sachverständigen"
                control={<Radio />}
                label="Sachverständigen"
                sx={{ marginBottom: 0 }}
              />
            </RadioGroup>
            {formik?.touched?.tenderForm && formik?.errors?.tenderForm && (
              <Box
                component="span"
                sx={{
                  color: "error.main",
                  fontSize: "0.75rem",
                  position: "absolute",
                }}
              >
                {formik.errors.tenderForm}
              </Box>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <LabelWithAsterisk>AUSSCHREIBUNGSTYP</LabelWithAsterisk>
          <FormControl fullWidth>
            <CustomSelect
              name="tenderType"
              options={
                formik?.values?.tenderForm === "Handwerker"
                  ? tenderTypesListHW
                  : tenderTypesListSV
              }
              onChange={handleTenderTypeSelect}
              value={formik?.values?.tenderType}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TenderInformation;
