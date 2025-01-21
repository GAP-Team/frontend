"use client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { useFormikContext } from "formik";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { FormControl, MenuItem, Select } from "@mui/material";

import { Item } from "../../types";
import { AddFacilityFormValues } from "./types";
import { listOfFacilityType } from "@/utils/Constants";
import GTextInput from "@/components/input/GTextInput";
import CustomSelect from "@/components/drop_down/CustomSelect";
import { getUserBuildings } from "@/lib/features/buildingSlice";
import LabelWithAsterisk from "@/components/label/LabelWithAsterisk";

const FacilityInformation = (): JSX.Element => {
  const allBuildings = useSelector(getUserBuildings);
  const formik = useFormikContext<AddFacilityFormValues>();

  const [subCategoryOptions, setSubCategoryOptions] = useState<Item[]>([]);

  useEffect(() => {
    if (formik?.values?.facilityType !== "") {
      handleSetSubCategorylist();
    }
  }, [formik?.values?.facilityType]);

  const facilityTypeOptions = listOfFacilityType.map((type) => ({
    label: type.category,
    value: type.category,
  }));

  const handleFacilityTypeSelect = (selectedItem: any): void => {
    const selectedFacility = selectedItem.target.value;

    formik?.setFieldValue("facilityType", selectedFacility);

    if (selectedFacility) {
      const subCategory = listOfFacilityType.find(
        (type) => type.category === selectedFacility
      );
      if (subCategory) {
        setSubCategoryOptions(
          subCategory.items.map((item) => ({ label: item, value: item }))
        );
      }
    } else {
      setSubCategoryOptions([]);
    }
    formik?.setFieldValue("subcategory", "");
  };

  const handleSetSubCategorylist = (): void => {
    const subCategory = listOfFacilityType.find(
      (type) => type.category === formik?.values?.facilityType
    );
    if (subCategory) {
      setSubCategoryOptions(
        subCategory.items.map((item) => ({ label: item, value: item }))
      );
    }
  };

  const handleSubCategorySelect = (selectedItem: any): void => {
    const selectedSubCategory = selectedItem.target.value;

    formik?.setFieldValue("subcategory", selectedSubCategory);
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
          <FormControl fullWidth>
            <Select
              name="facilityType"
              value={formik?.values?.facilityType}
              label="Anlagenart"
              onChange={handleFacilityTypeSelect}
              displayEmpty
            >
              {facilityTypeOptions?.map((type: any, typeIndex: number) => {
                return (
                  <MenuItem key={typeIndex} value={type?.value}>
                    {type?.label}
                  </MenuItem>
                );
              })}
            </Select>
            {formik?.touched?.facilityType && (
              <p style={styles.errorTexts}>{formik?.errors?.facilityType}</p>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="gsub" color="gray.500">
            ANLAGENTYP
          </Typography>
          <FormControl fullWidth>
            <CustomSelect
              name={"subcategory"}
              onChange={handleSubCategorySelect}
              options={subCategoryOptions}
              value={formik?.values?.subcategory}
            />
          </FormControl>
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
