"use client";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useFormikContext } from "formik";
import { TenderFormValues } from "./types";
import TenderNewFacilityFields from "./TenderNewFacilityFields";
import GTextInput from "@/components/inputs/GTextInput";
import GTextSelector from "@/components/inputs/GTextSelector";
import GSelector from "@/components/inputs/GSelector";
import LabelWithAsterisk from "@/components/data-display/label/LabelWithAsterisk";
import { Item, buildingTypesList, germanStates } from "@/utils/Constants";

const toItem = (value: string): Item | null =>
  value ? { label: value, value } : null;

const TenderNewObjectFacility = (): JSX.Element => {
  const formik = useFormikContext<TenderFormValues>();
  const { newBuilding } = formik.values;

  const [selectedBuildingType, setSelectedBuildingType] = useState<Item | null>(
    toItem(newBuilding.buildingType)
  );
  const [selectedState, setSelectedState] = useState<Item | null>(
    toItem(newBuilding.state)
  );
  const handleBuildingTypeSelect = (selectedItem: Item | null): void => {
    setSelectedBuildingType(selectedItem);
    formik.setFieldValue("newBuilding.buildingType", selectedItem?.value || "");
  };

  const handleStateSelect = (selectedItem: Item | null): void => {
    setSelectedState(selectedItem);
    formik.setFieldValue("newBuilding.state", selectedItem?.value || "");
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
      <TenderNewFacilityFields />
    </Grid>
  );
};

export default TenderNewObjectFacility;

const styles = {
  sectionTitle: {
    fontWeight: 600,
  },
};
