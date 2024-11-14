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
import Typography from "@mui/material/Typography";
import { listOfTrades } from "@/utils/Constants";
import { useSelector } from "react-redux";
import { currentUserBuildings } from "@/lib/features/userSlice";
import { FormControl, MenuItem, Select } from "@mui/material";

const FacilityInformation = (): JSX.Element => {
  const allBuildings = useSelector(currentUserBuildings);
  const formik = useFormikContext<AddFacilityFormValues>();

  const [selectedFacilityType, setSelectedFacilityType] = useState<Item | null>(
    formik?.values?.facilityType
      ? { label: formik.values.facilityType, value: formik.values.facilityType }
      : null
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<Item | null>(
    formik?.values?.subcategory
      ? { label: formik.values.subcategory, value: formik.values.subcategory }
      : null
  );
  const [subCategoryOptions, setSubCategoryOptions] = useState<Item[]>([]);

  const facilityTypeOptions = listOfTrades.map((trade) => ({
    label: trade.category,
    value: trade.category,
  }));

  const handleFacilityTypeSelect = (selectedItem: Item | null): void => {
    setSelectedFacilityType(selectedItem);
    formik?.setFieldValue(
      "facilityType",
      selectedItem ? selectedItem.value : ""
    );

    if (selectedItem) {
      const selectedTrade = listOfTrades.find(
        (trade) => trade.category === selectedItem.value
      );
      if (selectedTrade) {
        setSubCategoryOptions(
          selectedTrade.items.map((item) => ({ label: item, value: item }))
        );
      }
    } else {
      setSubCategoryOptions([]);
    }

    setSelectedSubCategory(null);
    formik?.setFieldValue("subcategory", "");
  };

  const handleSubCategorySelect = (selectedItem: Item | null): void => {
    setSelectedSubCategory(selectedItem);
    formik?.setFieldValue(
      "subcategory",
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
          <LabelWithAsterisk>ANLAGENART</LabelWithAsterisk>
          <GTextSelector
            name="facilityType"
            options={facilityTypeOptions}
            error={
              formik?.touched?.facilityType &&
              Boolean(formik?.errors?.facilityType)
            }
            helperText={
              formik?.touched?.facilityType && formik?.errors?.facilityType
            }
            onSelect={handleFacilityTypeSelect}
            selectedState={selectedFacilityType}
          />
        </Grid>

        <Grid item xs={6}>
          <Typography variant="gsub" color="gray.500">
            ANLAGENTYP
          </Typography>
          <GTextSelector
            name="subcategory"
            options={subCategoryOptions}
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
          <FormControl fullWidth>
            <Select
              name="selectedBuilding"
              value={formik?.values?.selectedBuilding}
              label="Objekt Zuordnen"
              onChange={formik.handleChange}
            >
              {allBuildings?.map((building: any, buildingIndex: number) => {
                return (
                  <MenuItem key={buildingIndex} value={building?._id}>
                    {building?.buildingName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FacilityInformation;
