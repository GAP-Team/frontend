"use client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Dialog from '@mui/material/Dialog';
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from '@mui/icons-material/Add';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

import userAPIs from "@/api/user";
import { ContactPersonItem } from "./types";
import { Item } from "@/components/input/GSelector";
import GTextInput from "@/components/input/GTextInput";
import GTextSelector from "@/components/input/GTextSelector";
import LabelWithAsterisk from "@/components/label/LabelWithAsterisk";
import { contactPersonList, buildingTypesList } from "@/utils/Constants";

const checkedIcon = <CheckBoxIcon fontSize="small" />;
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;

const BuildingInformation = ({ formik }: { formik?: any }) => {
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [options, setOptions] = useState<Item[]>(buildingTypesList);
  const [contactPersons, setContactPersons] = useState<any[]>(contactPersonList);
  const [newContact, setNewContact] = useState<ContactPersonItem>({firstName:'', lastName:'', email:'', phoneNumber: ''});
  const [selectedBldngType, setSelectedBldngType] = useState<Item | null>(formik?.values?.buildingType ? { label: formik.values.buildingType, value: formik.values.buildingType } : null);


  useEffect(() => {
    // getAllUsers();
  }, []);

  const getAllUsers = async () => {
    let allUsers = await userAPIs.getAllUser();
    setContactPersons(allUsers.data);
  }

  const handleStateSelect = (selectedItem: Item | null):void => {
    setSelectedBldngType(selectedItem);
    formik?.setFieldValue('buildingType', selectedItem ? selectedItem.value : '' );
  };
  
  const handleContactPersonChange = (event: any, value: ContactPersonItem[]) => {
    formik?.setFieldValue('contactPerson', value);
  };

  const handleAddContactPerson = () => {
    if (newContact.firstName && newContact.lastName) {
      formik?.setFieldValue('contactPerson', [...formik.values.contactPerson, newContact]);
      //API call here
      //for POST for adding the new contact Person
      setNewContact({ firstName: '', lastName: '', email: '', phoneNumber: ''});
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
            id="name"
            name="name"
            value={formik?.values?.name}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            error={
              formik?.touched?.name &&
              Boolean(formik?.errors?.name)
            }
            helperText={
              formik?.touched?.name && formik?.errors?.name
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
             id="buildingAbbreviation"
             name="buildingAbbreviation"
             value={formik?.values.buildingAbbreviation}
             onChange={formik?.handleChange}
             onBlur={formik?.handleBlur}
             error={
               formik?.touched?.buildingAbbreviation && Boolean(formik?.errors.buildingAbbreviation)
             }
            helperText={formik?.touched?.buildingAbbreviation && formik?.errors.buildingAbbreviation}
          />
        </Grid>
        <Grid item xs={12} sm={11}>
          <Typography variant="gsub" color="gray.500"> ANSPRECHPARTNER HINZUFÜGEN</Typography>
          <Autocomplete
            multiple
            id="contactPerson"
            freeSolo
            // options={contactPersons}
            options={[]}
            isOptionEqualToValue={(options, value) => options.firstName == value.lastName}
            getOptionLabel={(option) => option.firstName + " " + option.lastName}
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
                {`${option?.firstName} ${option?.lastName}`}
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
            id="firstName"
            name="firstName"
            margin="dense"
            autoFocus
            label="Vorname"
            fullWidth
            value={newContact.firstName}
            onChange={(e) => setNewContact({ ...newContact, firstName: e.target.value })}
            error={!newContact.firstName && Boolean(formik?.errors.firstName)}
            helperText={!newContact.firstName && formik?.errors.firstName}
            sx={{marginBottom:'1rem'}}
          />
          {/* <TextField
            id="role"
            margin="dense"
            label="Rolle"
            fullWidth
            value={newContact.role}
            onChange={(e) => setNewContact({ ...newContact, role: e.target.value })}
            error={!newContact.role && Boolean(formik?.errors.contactPerson)}
            helperText={!newContact.role && formik?.errors.contactPerson}
          /> */}
          <TextField
            id="lastName"
            name="lastName"
            margin="dense"
            label="Nachname"
            fullWidth
            value={newContact.lastName}
            onChange={(e) => setNewContact({ ...newContact, lastName: e.target.value })}
            error={!newContact.lastName && Boolean(formik?.errors.lastName)}
            helperText={!newContact.lastName && formik?.errors.lastName}
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            margin="dense"
            fullWidth
            value={newContact.email}
            onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
            error={!newContact.email && Boolean(formik?.errors.email)}
            helperText={!newContact.email && formik?.errors.email}
          />
          <TextField
            id="phoneNumber"
            label="Telefonnummer"
            margin="dense"
            fullWidth
            value={newContact.phoneNumber}
            onChange={(e) => setNewContact({ ...newContact, phoneNumber: e.target.value })}
            error={!newContact.phoneNumber && Boolean(formik?.errors.phoneNumber)}
            helperText={!newContact.phoneNumber && formik?.errors.phoneNumber}
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
