
"use client";

import HeaderSection from '../../real_estate_user/HeaderSection';
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
import { Item } from "@/components/input/GSelector";
import GTextInput from "@/components/input/GTextInput";
import GTextSelector from "@/components/input/GTextSelector";
import LabelWithAsterisk from "@/components/label/LabelWithAsterisk";
import { contactPersonList, buildingTypesList } from "@/utils/Constants";

const TenderSummarySection = () => {
  return (
    <>
     <HeaderSection titletext='DATEN ÜBERPRÜFEN' />
     <Typography variant="bodymsb">Summary</Typography>
    </>
  );
}

export default TenderSummarySection;
