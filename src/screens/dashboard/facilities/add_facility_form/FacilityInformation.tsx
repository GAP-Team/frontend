"use client";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LabelWithAsterisk from "@/components/label/LabelWithAsterisk";
import GTextInput from "@/components/input/GTextInput";
import { useFormikContext } from "formik";
import { AddFacilityFormValues } from "./types";
import { Item } from "../../types";
import GTextSelector from "@/components/input/GTextSelector";
import {
  buildingTypesList,
  GenericTerms,
  subcategories,
} from "@/utils/Constants";
import Typography from "@mui/material/Typography";

const FacilityInformation = () => {
  const formik = useFormikContext<AddFacilityFormValues>();
  const [selectedGnericTerm, setSelectedGenericTerm] = useState<Item | null>(
    formik?.values?.genericTerm
      ? { label: formik.values.genericTerm, value: formik.values.genericTerm }
      : null
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<Item | null>(
    formik?.values?.subcategory
      ? { label: formik.values.subcategory, value: formik.values.subcategory }
      : null
  );
  const [selectedBuildingType, setSelectedBuildingType] = useState<Item | null>(
    formik?.values?.buildingName
      ? { label: formik.values.buildingName, value: formik.values.buildingName }
      : null
  );

  const handleGenericTermSelect = (selectedItem: Item | null): void => {
    setSelectedGenericTerm(selectedItem);
    formik?.setFieldValue(
      "genericTerm",
      selectedItem ? selectedItem.value : ""
    );
  };

  const handleSubCategorySelect = (selectedItem: Item | null): void => {
    setSelectedSubCategory(selectedItem);
    formik?.setFieldValue(
      "subCategory",
      selectedItem ? selectedItem.value : ""
    );
  };

  const handleBuildingTypeSelect = (selectedItem: Item | null): void => {
    setSelectedBuildingType(selectedItem);
    formik?.setFieldValue(
      "buildingName",
      selectedItem ? selectedItem.value : ""
    );
  };

  return (
    <Box
      component="form"
      noValidate
      sx={{ p: 1, width: "auto", marginLeft: "1.5rem" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="gsub" color="gray.500">
            ANLAGENNAME-/BEZEICHNUNG
          </Typography>
          <GTextInput
            id="name"
            name="name"
            value={formik?.values?.name}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            error={formik?.touched?.name && Boolean(formik?.errors?.name)}
            helperText={formik?.touched?.name && formik?.errors?.name}
          />
        </Grid>

        <Grid item xs={6}>
          <LabelWithAsterisk>ANLAGE OBERBEGRIFF</LabelWithAsterisk>
          <GTextSelector
            name="genericTerm"
            options={GenericTerms}
            error={
              formik?.touched?.genericTerm &&
              Boolean(formik?.errors?.genericTerm)
            }
            helperText={
              formik?.touched?.genericTerm && formik?.errors?.genericTerm
            }
            onSelect={handleGenericTermSelect}
            selectedState={selectedGnericTerm}
          />
        </Grid>

        <Grid item xs={6}>
          <Typography variant="gsub" color="gray.500">
            ANLAGE UNTERKATEGORIE
          </Typography>
          <GTextSelector
            name="subCategory"
            options={subcategories}
            error={
              formik?.touched?.subcategory &&
              Boolean(formik?.errors?.subcategory)
            }
            helperText={
              formik?.touched?.subcategory && formik?.errors?.subcategory
            }
            onSelect={handleSubCategorySelect}
            selectedState={selectedSubCategory}
          />
        </Grid>

        <Grid item xs={12}>
          <LabelWithAsterisk>OBJEKT ZUORDNEN</LabelWithAsterisk>
          <GTextSelector
            name="buildingName"
            options={buildingTypesList}
            error={
              formik?.touched?.buildingName &&
              Boolean(formik?.errors?.buildingName)
            }
            helperText={
              formik?.touched?.buildingName && formik?.errors?.buildingName
            }
            onSelect={handleBuildingTypeSelect}
            selectedState={selectedBuildingType}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FacilityInformation;
