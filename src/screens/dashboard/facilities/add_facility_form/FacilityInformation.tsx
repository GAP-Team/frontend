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
import { buildingTypesList, listOfTrades } from "@/utils/Constants";
import { useSelector } from "react-redux";
import { allBuildingDetails } from "@/lib/features/userSlice";
import { FormControl, MenuItem, Select } from "@mui/material";

const FacilityInformation = (): JSX.Element => {
  const allBuildings = useSelector(allBuildingDetails);
  const formik = useFormikContext<AddFacilityFormValues>();

  const [selectedGenericTerm, setSelectedGenericTerm] = useState<Item | null>(
    formik?.values?.genericTerm
      ? { label: formik.values.genericTerm, value: formik.values.genericTerm }
      : null
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<Item | null>(
    formik?.values?.subcategory
      ? { label: formik.values.subcategory, value: formik.values.subcategory }
      : null
  );
  /*const [selectedBuilding, setSelectedBuilding] = useState<Item | null>(
    formik?.values?.buildingName
      ? { label: formik.values.buildingName, value: formik.values.buildingName }
      : null
  );*/

  const [subCategoryOptions, setSubCategoryOptions] = useState<Item[]>([]);

  const genericTermOptions = listOfTrades.map((trade) => ({
    label: trade.category,
    value: trade.category,
  }));

  const handleGenericTermSelect = (selectedItem: Item | null): void => {
    setSelectedGenericTerm(selectedItem);
    formik?.setFieldValue(
      "genericTerm",
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

  /*const handleBuildingTypeSelect = (selectedItem: Item | null): void => {
    setSelectedBuilding(selectedItem);
    formik?.setFieldValue(
      "buildingName",
      selectedItem ? selectedItem.value : ""
    );
  };*/

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
            name="genericTerm"
            options={genericTermOptions}
            error={
              formik?.touched?.genericTerm &&
              Boolean(formik?.errors?.genericTerm)
            }
            helperText={
              formik?.touched?.genericTerm && formik?.errors?.genericTerm
            }
            onSelect={handleGenericTermSelect}
            selectedState={selectedGenericTerm}
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
          {/* <GTextSelector
            name="buildingName"
            options={arrangedBuildingOptions}
            error={
              formik?.touched?.buildingName &&
              Boolean(formik?.errors?.buildingName)
            }
            helperText={
              formik?.touched?.buildingName && formik?.errors?.buildingName
            }
            onSelect={handleBuildingTypeSelect}
            selectedState={selectedBuilding}
          /> */}
          <FormControl fullWidth>
            <Select
              name="buildingName"
              value={formik?.values?.buildingName}
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
