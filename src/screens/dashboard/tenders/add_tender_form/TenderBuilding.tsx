"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { useFormikContext } from "formik";
import buildingAPIs from "@/api/building";
import { AddTenderFormValues } from "./types";
import { Item } from "@/components/input/GSelector";
import GTextSelector from "@/components/input/GTextSelector";
import { allBuildingDetails } from "@/lib/features/userSlice";
import { FormControl, MenuItem, Select } from "@mui/material";
import LabelWithAsterisk from "@/components/label/LabelWithAsterisk";

const TenderBuilding = (): JSX.Element => {
  const allBuildings = useSelector(allBuildingDetails);
  const formik = useFormikContext<AddTenderFormValues>();
  const[buildingFacilities, setBuildingFacilities] = useState([]);
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
  
  const handleBuildingSelect = async (selectedItem: any): Promise<void> => {
    const selectedBuildingId = selectedItem.target.value;
    formik?.setFieldValue("buildingId", selectedBuildingId);
    const allFacilities = await buildingAPIs.getBuildingFacilities(selectedBuildingId);
    
    setBuildingFacilities(allFacilities?.data);
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
          <FormControl fullWidth>
            <Select
              name="buildingId"
              value={formik?.values?.buildingId}
              onChange={handleBuildingSelect}
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
        <Grid item xs={12}>
          <LabelWithAsterisk>ANLAGE AUSWÄHLEN</LabelWithAsterisk>
          {/* <GTextSelector
            name="facility"
            options={[]}
            error={
              formik?.touched?.facilityName &&
              Boolean(formik?.errors?.facilityName)
            }
            helperText={
              formik?.touched?.facilityName && formik?.errors?.facilityName
            }
            onSelect={handleFacilitySelect}
            selectedState={selecteFacility}
          /> */}
          <FormControl fullWidth>
            <Select
              name="facilityId"
              value={formik?.values?.facilityId}
              onChange={formik.handleChange}
            >
              {buildingFacilities?.length > 0 &&
                buildingFacilities?.map((facility: any, facilityIndex: number) => {
                  return (
                    <MenuItem key={facilityIndex} value={facility?._id}>
                      {facility?.name}
                    </MenuItem>
                  );
                })
              }
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TenderBuilding;
