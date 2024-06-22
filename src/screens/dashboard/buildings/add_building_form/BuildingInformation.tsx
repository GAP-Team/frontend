"use client";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LabelWithAsterisk from "@/components/label/LabelWithAsterisk";
import GTextInput from "@/components/input/GTextInput";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Item } from "@/components/input/GSelector";
import { contactPersonList, buildingTypesList } from "@/utils/Constants";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { ContactPersonItem } from "./types";
import GTextSelector from "@/components/input/GTextSelector";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const BuildingInformation = ({ formik }: { formik?: any }) => {
  const [selectedBldngType, setSelectedBldngType] = useState<Item | null>(formik?.values?.buildingType ? { label: formik.values.buildingType, value: formik.values.buildingType } : null);
  const [options, setOptions] = useState<Item[]>(buildingTypesList);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newContact, setNewContact] = useState<ContactPersonItem>({name:'', role:'', email:''});

  const handleStateSelect = (selectedItem: Item | null):void => {
    setSelectedBldngType(selectedItem);
    formik?.setFieldValue('buildingType', selectedItem ? selectedItem.value : '' );
  };
  
  const handleContactPersonChange = (event: any, value: ContactPersonItem[]) => {
    formik?.setFieldValue('contactPerson', value);
  };

  const handleAddContactPerson = () => {
    if (newContact.name && newContact.role) {
      formik?.setFieldValue('contactPerson', [...formik.values.contactPerson, newContact]);
      //API call here
      //for POST for adding the new contact Person
      setNewContact({ name: '', role: '', email: ''});
      setDialogOpen(false);
    } 
  };

  return (
    <Box
      component="form"
      noValidate
      sx={{ p: 1, width: "auto", marginLeft: "1.5rem" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LabelWithAsterisk> NAME DES GEBÄUDES</LabelWithAsterisk>
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
          <LabelWithAsterisk>GESAMMTFLÄCHE</LabelWithAsterisk>
          <GTextInput
            id="totalArea"
            name="totalArea"
            value={formik?.values.totalArea}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            error={
              formik?.touched?.totalArea && Boolean(formik?.errors.totalArea)
            }
            helperText={formik?.touched?.totalArea && formik?.errors.totalArea}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LabelWithAsterisk>GEBÄUDETYP</LabelWithAsterisk>
          <GTextSelector
            name="buildingType"
            options={options}
            error={
              formik?.touched?.buildingType &&
              Boolean(formik?.errors?.buildingType)
            }
            helperText={
              formik?.touched?.buildingType && formik?.errors?.buildingType
            }
            onSelect={handleStateSelect}
            selectedState={selectedBldngType}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="gsub" color="gray.500"> OBJEKTKÜRZEL / TAG ANLEGEN</Typography>
          <GTextInput
             id="objektTag"
             name="objektTag"
             value={formik?.values.objektTag}
             onChange={formik?.handleChange}
             onBlur={formik?.handleBlur}
             error={
               formik?.touched?.objektTag && Boolean(formik?.errors.objektTag)
             }
            helperText={formik?.touched?.objektTag && formik?.errors.objektTag}
          />
        </Grid>
        <Grid item xs={12} sm={11}>
          <LabelWithAsterisk>ANSPRECHPARTNER HINZUFÜGEN</LabelWithAsterisk>
          <Autocomplete
            multiple
            id="contactPerson"
            freeSolo
            options={contactPersonList}
            isOptionEqualToValue={(options, value) => options.name == value.name}
            getOptionLabel={(option) => option.name + " - " + option.role}
            value={formik?.values?.contactPerson || []}
            onChange={handleContactPersonChange}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {`${option?.name} - ${option?.role}`}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                name="contactPerson"
                onBlur={formik?.handleBlur}
                error={formik?.touched?.contactPerson && Boolean(formik?.errors.contactPerson)}
                helperText={formik?.touched?.contactPerson && formik?.errors.contactPerson}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={1}>
          <Box display="flex" height="100%" alignItems="flex-end" justifyContent="center">
            <Button color="gprimary" variant="contained" sx={{height:'3.5rem',width:'100%',borderRadius:'0.5rem'}}  onClick={() => setDialogOpen(true)}>
              <AddIcon sx={{fontSize:'1.5rem'}} />
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Neuen Ansprechpartner hinzufügen</DialogTitle>
        <DialogContent>
          <TextField
            id="name"
            margin="dense"
            autoFocus
            label="Name"
            fullWidth
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            error={!newContact.name && Boolean(formik?.errors.contactPerson)}
            helperText={!newContact.name && formik?.errors.contactPerson}
            sx={{marginBottom:'1rem'}}
          />
          <TextField
            id="role"
            margin="dense"
            label="Rolle"
            fullWidth
            value={newContact.role}
            onChange={(e) => setNewContact({ ...newContact, role: e.target.value })}
            error={!newContact.role && Boolean(formik?.errors.contactPerson)}
            helperText={!newContact.role && formik?.errors.contactPerson}
          />
           <TextField
            id="email"
            label="Email"
            margin="dense"
            fullWidth
            value={newContact.email}
            onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
            error={!newContact.email && Boolean(formik?.errors.email)}
            helperText={!newContact.email && formik?.errors.email}
          />
        </DialogContent>
        <DialogActions sx={{padding:'1rem'}}>
          <Button onClick={() => setDialogOpen(false)} color="gprimary" variant="contained" sx={{marginRight:'1rem'}}  >
            Abbrechen
          </Button>
          <Button onClick={handleAddContactPerson} color="gprimary" variant="contained">
            Hinzufügen
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BuildingInformation;
