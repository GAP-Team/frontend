"use client";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useFormikContext } from "formik";
import { TenderFormValues } from "./types";
import GTextInput from "@/components/inputs/GTextInput";
import GTextSelector from "@/components/inputs/GTextSelector";
import LabelWithAsterisk from "@/components/data-display/label/LabelWithAsterisk";
import { Item, listOfFacilitySubcategories } from "@/utils/Constants";

const toItem = (value: string): Item | null =>
  value ? { label: value, value } : null;

const TenderNewFacilityFields = (): JSX.Element => {
  const formik = useFormikContext<TenderFormValues>();
  const { newFacility } = formik.values;

  const [selectedFacilityType, setSelectedFacilityType] = useState<Item | null>(
    toItem(newFacility.facilityType)
  );
  const [subCategoryOptions, setSubCategoryOptions] = useState<Item[]>([]);

  const facilityTypeOptions = listOfFacilitySubcategories.map((trade) => ({
    label: trade.category,
    value: trade.category,
  }));

  const handleFacilityTypeSelect = (selectedItem: Item | null): void => {
    setSelectedFacilityType(selectedItem);
    formik.setFieldValue("newFacility.facilityType", selectedItem?.value || "");
    formik.setFieldValue("newFacility.subcategory", "");

    const selectedTrade = listOfFacilitySubcategories.find(
      (trade) => trade.category === selectedItem?.value
    );
    setSubCategoryOptions(
      selectedTrade
        ? selectedTrade.items.map((item) => ({ label: item, value: item }))
        : []
    );
  };

  const handleSubcategorySelect = (selectedItem: Item | null): void => {
    formik.setFieldValue("newFacility.subcategory", selectedItem?.value || "");
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="gsub" color="gray.500" sx={styles.sectionTitle}>
          NEUE ANLAGE
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <LabelWithAsterisk>ANLAGENNAME-/BEZEICHNUNG</LabelWithAsterisk>
        <GTextInput
          id="newFacility.name"
          name="newFacility.name"
          value={newFacility.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.newFacility?.name &&
            Boolean(formik.errors.newFacility?.name)
          }
          helperText={
            formik.touched.newFacility?.name && formik.errors.newFacility?.name
          }
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <LabelWithAsterisk>ANLAGENART</LabelWithAsterisk>
        <GTextSelector
          name="newFacility.facilityType"
          options={facilityTypeOptions}
          value={selectedFacilityType}
          onChange={handleFacilityTypeSelect}
          error={
            formik.touched.newFacility?.facilityType &&
            Boolean(formik.errors.newFacility?.facilityType)
          }
          helperText={
            formik.touched.newFacility?.facilityType &&
            formik.errors.newFacility?.facilityType
          }
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Typography variant="gsub" color="gray.500">
          ANLAGENTYP
        </Typography>
        <GTextSelector
          name="newFacility.subcategory"
          options={subCategoryOptions}
          value={newFacility.subcategory}
          onChange={handleSubcategorySelect}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <LabelWithAsterisk>Anlage Anzahl</LabelWithAsterisk>
        <GTextInput
          id="newFacility.numberOfUnits"
          name="newFacility.numberOfUnits"
          value={newFacility.numberOfUnits}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.newFacility?.numberOfUnits &&
            Boolean(formik.errors.newFacility?.numberOfUnits)
          }
          helperText={
            formik.touched.newFacility?.numberOfUnits &&
            formik.errors.newFacility?.numberOfUnits
          }
        />
      </Grid>
    </>
  );
};

export default TenderNewFacilityFields;

const styles = {
  sectionTitle: {
    fontWeight: 600,
  },
};
