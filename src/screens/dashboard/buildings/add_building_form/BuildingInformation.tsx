"use client";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LabelWithAsterisk from "@/components/label/LabelWithAsterisk";
import GTextInput from "@/components/input/GTextInput";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Item } from "@/components/input/GSelector";
import AddSelector from "@/components/input/GAddSelector";
import { contactPersonList, buildingTypesList } from "@/utils/Constants";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AddIcon from '@mui/icons-material/Add';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const BuildingInformation = ({ formik }: { formik: any }) => {
  const [selectedBldngType, setSelectedBldngType] = useState<Item>({ label: formik?.values?.buildingType || '', value: formik?.values?.buildingType || '' });
  const [options, setOptions] = useState<Item[]>(buildingTypesList);
  const handleStateSelect = (selectedItem: Item):void => {
    const state = selectedItem || '';
    setSelectedBldngType(selectedItem);
    formik?.setFieldValue('buildingType', state?.value );
  };
  const handleAdd = (newItem: Item) => {
    setOptions((prevOptions) => [...prevOptions, newItem]);
  };
  const handleDelete = (itemToDelete: Item) => {
    setOptions((prevOptions) => prevOptions.filter(item => item.value !== itemToDelete.value));
  };
  
  return (
    <Box
      component="form"
      noValidate
      sx={{ p: 1, width: "auto", marginLeft: "1.5rem" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="gsub" color="gray.500">
            NAME DES GEBÄUDES
          </Typography>
          <GTextInput
            id="buildingName"
            name="buildingName"
            value={formik?.values?.buildingName}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            error={
              formik?.touched?.buildingName &&
              Boolean(formik?.errors?.buildingName)
            }
            helperText={
              formik?.touched?.buildingName && formik?.errors?.buildingName
            }
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="gsub" color="gray.500">
            GESAMMTFLÄCHE
          </Typography>
          <GTextInput
            id="totalArea"
            name="totalArea"
            value={formik?.values.totalArea}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            error={
              formik?.touched.totalArea && Boolean(formik?.errors.totalArea)
            }
            helperText={formik?.touched.totalArea && formik?.errors.totalArea}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LabelWithAsterisk>GEBÄUDETYP</LabelWithAsterisk>
          <AddSelector name="buildingType" options={options} error={formik?.touched?.buildingType && Boolean(formik?.errors?.buildingType)}
            helperText={formik?.touched?.buildingType && formik?.errors?.buildingType} onSelect={handleStateSelect} selectedState={selectedBldngType} onAdd={handleAdd} onDelete={handleDelete} /> 
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="gsub" color="gray.500">
            OBJEKTKÜRZEL / TAG ANLEGEN
          </Typography>
          <GTextInput
            id="objektTag"
            name="objektTag"
            value={formik?.values.objektTag}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            error={
              formik?.touched.objektTag && Boolean(formik?.errors.objektTag)
            }
            helperText={formik?.touched.objektTag && formik?.errors.objektTag}
          />
        </Grid>
        <Grid item xs={12} sm={11}>
          <LabelWithAsterisk>ANSPRECHPARTNER HINZUFÜGEN</LabelWithAsterisk>
          <Autocomplete
            multiple
            id="contactPerson"
            options={contactPersonList}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name+" - "+option.role}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.name+" - "+option.role}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                // placeholder="ANSPRECHPARTNER HINZUFÜGEN"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={1}>
          <Box display="flex" height="100%" alignItems="flex-end" justifyContent="center">
            <Button color="gprimary" variant="contained" sx={{height:'3.5rem',width:'100%',borderRadius:'0.5rem'}} >
              <AddIcon sx={{fontSize:'1.5rem'}} />
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BuildingInformation;
