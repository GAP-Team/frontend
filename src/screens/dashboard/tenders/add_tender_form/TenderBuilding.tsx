"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useFormikContext } from "formik";
import { AddTenderFormValues } from "./types";
import { Item } from "@/components/input/GSelector";
import { dummyBuildingsExp } from "@/utils/Constants";
import GTextSelector from "@/components/input/GTextSelector";
import LabelWithAsterisk from "@/components/label/LabelWithAsterisk";

const TenderBuilding = (): JSX.Element => {
  const formik = useFormikContext<AddTenderFormValues>();
  const [selectedBuilding, setSelectedBuilding] = useState<Item | null>(
    formik?.values?.buildingName
      ? {
          label: formik?.values?.buildingName,
          value: formik?.values?.buildingId,
        }
      : null
  );
  const [selecteFacility, setSelecteFacility] = useState<Item | null>(
    formik?.values?.facilityName
      ? {
          label: formik?.values?.facilityName,
          value: formik?.values?.facilityId,
        }
      : null
  );

  const handleBuildingSelect = (selectedItem: Item | null): void => {
    setSelectedBuilding(selectedItem);
    formik?.setFieldValue("buildingName", selectedItem?.label);
    formik?.setFieldValue("buildingId", selectedItem?.value);
  };

  const handleFacilitySelect = (selectedItem: Item | null): void => {
    setSelecteFacility(selectedItem);
    formik?.setFieldValue("facilityName", selectedItem?.label);
    formik?.setFieldValue("facilityId", selectedItem?.value);
  };

  return (
    <Box
      component="form"
      noValidate
      sx={{ p: 1, width: "auto", marginLeft: "1.5rem" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LabelWithAsterisk>OBJEKT AUSWÄHLEN</LabelWithAsterisk>
          <GTextSelector
            name="building"
            options={dummyBuildingsExp}
            error={
              formik?.touched?.buildingName &&
              Boolean(formik?.errors?.buildingName)
            }
            helperText={
              formik?.touched?.buildingName && formik?.errors?.buildingName
            }
            onSelect={handleBuildingSelect}
            selectedState={selectedBuilding}
          />
        </Grid>
        <Grid item xs={12}>
          <LabelWithAsterisk>ANLAGE AUSWÄHLEN</LabelWithAsterisk>
          <GTextSelector
            name="facility"
            options={dummyBuildingsExp}
            error={
              formik?.touched?.facilityName &&
              Boolean(formik?.errors?.facilityName)
            }
            helperText={
              formik?.touched?.facilityName && formik?.errors?.facilityName
            }
            onSelect={handleFacilitySelect}
            selectedState={selecteFacility}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TenderBuilding;
