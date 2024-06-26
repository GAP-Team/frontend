"use client";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LabelWithAsterisk from "@/components/label/LabelWithAsterisk";
import GTextInput from "@/components/input/GTextInput";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useFormikContext } from "formik";
import { AddTenderFormValues } from "./types";
import { dummyBuildings, equipmentTypesList } from "@/utils/Constants";
import GTextSelector from "@/components/input/GTextSelector";
import { Item } from "../../types";

const TenderBuilding = () => {
  const formik = useFormikContext<AddTenderFormValues>();
  const [selectedEquipmntType, setSelectedEquipmntType] = useState<Item | null>(
    formik?.values?.tenderType
      ? { label: formik.values.tenderType, value: formik.values.tenderType }
      : null
  );
  const handleEquipmntTypeSelect = (selectedItem: Item | null): void => {
    setSelectedEquipmntType(selectedItem);
    formik?.setFieldValue("equipmentType", selectedItem ? selectedItem.value : "");
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
            options={dummyBuildings.map((option) => option.title)}
            onChange={formik.handleChange}
            onInputChange={formik.handleChange}
            renderInput={(params) => (
              <TextField
                {...params}
                name="buildingName"
                error={formik?.touched?.buildingName && Boolean(formik?.errors?.buildingName)}
                helperText={formik?.touched?.buildingName && formik?.errors?.buildingName}
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
            options={dummyBuildings.map((option) => option.title)}
            onChange={formik.handleChange}
            onInputChange={formik.handleChange}
            renderInput={(params) => (
              <TextField
                {...params}
                name="equipmentName"
                error={formik?.touched?.equipmentName && Boolean(formik?.errors?.equipmentName)}
                helperText={formik?.touched?.equipmentName && formik?.errors?.equipmentName}
                label="Anlagen suchen"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <LabelWithAsterisk>ANLAGENTYP</LabelWithAsterisk>
          <GTextSelector
            name="equipmentType"
            options={equipmentTypesList}
            error={
              formik?.touched?.equipmentType && Boolean(formik?.errors?.equipmentType)
            }
            helperText={
              formik?.touched?.equipmentType && formik?.errors?.equipmentType
            }
            onSelect={handleEquipmntTypeSelect}
            selectedState={selectedEquipmntType}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TenderBuilding;
