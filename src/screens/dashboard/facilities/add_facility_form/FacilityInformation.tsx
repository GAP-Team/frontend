"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { useFormikContext } from "formik";
import Typography from "@mui/material/Typography";
import { FormControl, MenuItem, Select } from "@mui/material";

import { Item } from "../../types";
import { AddFacilityFormValues } from "./types";
import GTextInput from "@/components/input/GTextInput";
import { listOfTrades } from "@/utils/Constants";
import GTextSelector from "@/components/input/GTextSelector";
import { getUserBuildings } from "@/lib/features/buildingSlice";
import LabelWithAsterisk from "@/components/label/LabelWithAsterisk";

const FacilityInformation = (): JSX.Element => {
  const allBuildings = useSelector(getUserBuildings);
  const formik = useFormikContext<AddFacilityFormValues>();

  const [selectedFacilityType, setSelectedFacilityType] = useState<Item | null>(
    formik?.values?.facilityType
      ? {
          label: formik?.values?.facilityType,
          value: formik?.values?.facilityType,
        }
      : null
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<Item | null>(
    formik?.values?.subcategory
      ? {
          label: formik?.values?.subcategory,
          value: formik?.values?.subcategory,
        }
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
          <LabelWithAsterisk>ANLAGENNAME-/BEZEICHNUNG</LabelWithAsterisk>
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
            onChange={handleFacilityTypeSelect}
            value={selectedFacilityType}
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
            onChange={handleSubCategorySelect}
            value={selectedSubCategory}
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
              displayEmpty
            >
              {allBuildings?.length > 0 ? (
                allBuildings?.map((building: any, buildingIndex: number) => {
                  return (
                    <MenuItem key={buildingIndex} value={building?.id}>
                      {building?.buildingName}
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem disabled key={0} value={"0"}>
                  {`Kein Objekt vorhanden`}
                </MenuItem>
              )}
            </Select>
            {formik?.touched?.selectedBuilding && (
              <p style={styles.errorTexts}>
                {formik?.errors?.selectedBuilding}
              </p>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FacilityInformation;

const styles = {
  errorTexts: {
    color: "#d32f2f",
    fontWeight: 400,
    fontSize: "0.75rem",
  },
};
