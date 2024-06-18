"use client";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import LabelWithAsterisk from "@/components/label/LabelWithAsterisk";
import GTextInput from "@/components/input/GTextInput";
import { useFormikContext } from "formik";
import { AddTenderFormValues } from "./types";
import { Item } from "../../types";
import GTextSelector from "@/components/input/GTextSelector";
import { tenderTypesList } from "@/utils/Constants";

const TenderInformation = () => {
  const formik = useFormikContext<AddTenderFormValues>();
  const [selectedTenderType, setSelectedTenderType] = useState<Item | null>(
    formik?.values?.tenderType
      ? { label: formik.values.tenderType, value: formik.values.tenderType }
      : null
  );
  const [options, setOptions] = useState<Item[]>(tenderTypesList);
  const handleTenderTypeSelect = (selectedItem: Item | null): void => {
    setSelectedTenderType(selectedItem);
    formik?.setFieldValue("tenderType", selectedItem ? selectedItem.value : "");
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
          <LabelWithAsterisk>NAME DER AUSSCHREIBUNG</LabelWithAsterisk>
          <GTextInput
            id="tenderName"
            name="tenderName"
            value={formik?.values?.tenderName}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            error={
              formik?.touched?.tenderName && Boolean(formik?.errors?.tenderName)
            }
            helperText={
              formik?.touched?.tenderName && formik?.errors?.tenderName
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
          <GTextSelector
            name="tenderType"
            options={options}
            error={
              formik?.touched?.tenderType && Boolean(formik?.errors?.tenderType)
            }
            helperText={
              formik?.touched?.tenderType && formik?.errors?.tenderType
            }
            onSelect={handleTenderTypeSelect}
            selectedState={selectedTenderType}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TenderInformation;
