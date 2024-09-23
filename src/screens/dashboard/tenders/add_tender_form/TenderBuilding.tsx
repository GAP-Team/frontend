"use client";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LabelWithAsterisk from "@/components/label/LabelWithAsterisk";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useFormikContext } from "formik";
import { AddTenderFormValues } from "./types";
import { dummyBuildings } from "@/utils/Constants";

const TenderBuilding = (): JSX.Element => {
  const formik = useFormikContext<AddTenderFormValues>();
  const handleBuildingNameChange = (event: any, value: string | null): void => {
    formik?.setFieldValue("buildingName", value);
  };

  const handleEquipmentNameChange = (
    event: any,
    value: string | null
  ): void => {
    formik?.setFieldValue("equipmentName", value);
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
          <Autocomplete
            freeSolo
            id="free-solo-1-demo"
            value={formik.values.buildingName}
            disableClearable
            options={dummyBuildings.map((option) => option.buildingName)}
            onChange={handleBuildingNameChange}
            onInputChange={handleBuildingNameChange}
            renderInput={(params) => (
              <TextField
                {...params}
                name="buildingName"
                error={
                  formik?.touched?.buildingName &&
                  Boolean(formik?.errors?.buildingName)
                }
                helperText={
                  formik?.touched?.buildingName && formik?.errors?.buildingName
                }
                label="Objekt suchen"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <LabelWithAsterisk>ANLAGE AUSWÄHLEN</LabelWithAsterisk>
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            value={formik.values.equipmentName}
            disableClearable
            options={dummyBuildings.map((option) => option.buildingName)}
            onChange={handleEquipmentNameChange}
            onInputChange={handleEquipmentNameChange}
            renderInput={(params) => (
              <TextField
                {...params}
                name="equipmentName"
                error={
                  formik?.touched?.equipmentName &&
                  Boolean(formik?.errors?.equipmentName)
                }
                helperText={
                  formik?.touched?.equipmentName &&
                  formik?.errors?.equipmentName
                }
                label="Anlagen suchen"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TenderBuilding;
