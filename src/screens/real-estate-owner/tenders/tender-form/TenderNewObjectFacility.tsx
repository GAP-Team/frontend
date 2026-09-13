"use client";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useFormikContext } from "formik";
import { TenderFormValues } from "./types";
import GTextInput from "@/components/inputs/GTextInput";
import GTextSelector from "@/components/inputs/GTextSelector";
import GSelector from "@/components/inputs/GSelector";
import LabelWithAsterisk from "@/components/data-display/label/LabelWithAsterisk";
import {
  Item,
  buildingTypesList,
  germanStates,
  listOfFacilitySubcategories,
} from "@/utils/Constants";

const toItem = (value: string): Item | null =>
  value ? { label: value, value } : null;

const TenderNewObjectFacility = (): JSX.Element => {
  const formik = useFormikContext<TenderFormValues>();
  const { newBuilding, newFacility } = formik.values;

  const [selectedBuildingType, setSelectedBuildingType] = useState<Item | null>(
    toItem(newBuilding.buildingType)
  );
  const [selectedState, setSelectedState] = useState<Item | null>(
    toItem(newBuilding.state)
  );
  const [selectedFacilityType, setSelectedFacilityType] = useState<Item | null>(
    toItem(newFacility.facilityType)
  );
  const [subCategoryOptions, setSubCategoryOptions] = useState<Item[]>([]);

  const facilityTypeOptions = listOfFacilitySubcategories.map((trade) => ({
    label: trade.category,
    value: trade.category,
  }));

  const handleBuildingTypeSelect = (selectedItem: Item | null): void => {
    setSelectedBuildingType(selectedItem);
    formik.setFieldValue("newBuilding.buildingType", selectedItem?.value || "");
  };

  const handleStateSelect = (selectedItem: Item | null): void => {
    setSelectedState(selectedItem);
    formik.setFieldValue("newBuilding.state", selectedItem?.value || "");
  };

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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="gsub" color="gray.500" sx={styles.sectionTitle}>
          NEUES OBJEKT
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <LabelWithAsterisk>NAME DES GEBÄUDES</LabelWithAsterisk>
        <GTextInput
          id="newBuilding.name"
          name="newBuilding.name"
          value={newBuilding.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.newBuilding?.name &&
            Boolean(formik.errors.newBuilding?.name)
          }
          helperText={
            formik.touched.newBuilding?.name && formik.errors.newBuilding?.name
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <LabelWithAsterisk>GEBÄUDETYP</LabelWithAsterisk>
        <GTextSelector
          name="newBuilding.buildingType"
          options={buildingTypesList}
          value={selectedBuildingType}
          onChange={handleBuildingTypeSelect}
          error={
            formik.touched.newBuilding?.buildingType &&
            Boolean(formik.errors.newBuilding?.buildingType)
          }
          helperText={
            formik.touched.newBuilding?.buildingType &&
            formik.errors.newBuilding?.buildingType
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <LabelWithAsterisk>STRAßE</LabelWithAsterisk>
        <GTextInput
          id="newBuilding.street"
          name="newBuilding.street"
          value={newBuilding.street}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.newBuilding?.street &&
            Boolean(formik.errors.newBuilding?.street)
          }
          helperText={
            formik.touched.newBuilding?.street &&
            formik.errors.newBuilding?.street
          }
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <LabelWithAsterisk>HAUSNUMMER</LabelWithAsterisk>
        <GTextInput
          id="newBuilding.houseNumber"
          name="newBuilding.houseNumber"
          value={newBuilding.houseNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.newBuilding?.houseNumber &&
            Boolean(formik.errors.newBuilding?.houseNumber)
          }
          helperText={
            formik.touched.newBuilding?.houseNumber &&
            formik.errors.newBuilding?.houseNumber
          }
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <LabelWithAsterisk>POSTLEITZAHL</LabelWithAsterisk>
        <GTextInput
          id="newBuilding.zip"
          name="newBuilding.zip"
          value={newBuilding.zip}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.newBuilding?.zip &&
            Boolean(formik.errors.newBuilding?.zip)
          }
          helperText={
            formik.touched.newBuilding?.zip && formik.errors.newBuilding?.zip
          }
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <LabelWithAsterisk>STADT</LabelWithAsterisk>
        <GTextInput
          id="newBuilding.city"
          name="newBuilding.city"
          value={newBuilding.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.newBuilding?.city &&
            Boolean(formik.errors.newBuilding?.city)
          }
          helperText={
            formik.touched.newBuilding?.city && formik.errors.newBuilding?.city
          }
        />
      </Grid>
      <Grid item xs={12}>
        <LabelWithAsterisk>BUNDESLAND</LabelWithAsterisk>
        <GSelector
          name="newBuilding.state"
          options={germanStates}
          selectedState={selectedState}
          onSelect={handleStateSelect}
          error={
            formik.touched.newBuilding?.state &&
            Boolean(formik.errors.newBuilding?.state)
          }
          helperText={
            (formik.touched.newBuilding?.state &&
              formik.errors.newBuilding?.state) ||
            undefined
          }
        />
      </Grid>
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
    </Grid>
  );
};

export default TenderNewObjectFacility;

const styles = {
  sectionTitle: {
    fontWeight: 600,
  },
};
