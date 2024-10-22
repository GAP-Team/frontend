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
  
  const handleBuildingSelect = async (selectedItem: any): Promise<void> => {
    const selectedBuildingId = selectedItem.target.value;
    formik?.setFieldValue("buildingId", selectedBuildingId);
    const allFacilities = await buildingAPIs.getBuildingFacilities(selectedBuildingId);
    
    setBuildingFacilities(allFacilities?.data);
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
            {formik?.touched?.buildingId && <p style={styles.errorTexts}>{formik?.errors?.buildingId}</p>}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <LabelWithAsterisk>ANLAGE AUSWÄHLEN</LabelWithAsterisk>
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
            {formik?.touched?.facilityId && <p style={styles.errorTexts}>{formik?.errors?.facilityId}</p>}
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TenderBuilding;

const styles = {
  errorTexts: {
    color: "#d32f2f",
    fontWeight: 400,
    fontSize: "0.75rem"
  }
}
