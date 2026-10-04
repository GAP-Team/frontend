import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Item } from "@/components/inputs/GSelector";
import GTextInput from "@/components/inputs/GTextInput";
import GTextSelector from "@/components/inputs/GTextSelector";
import LabelWithAsterisk from "@/components/data-display/label/LabelWithAsterisk";
import { buildingTypesList } from "@/utils/Constants";

const BuildingInformation = ({ formik }: { formik?: any }): JSX.Element => {
  const [selectedBuildingType, setSelectedBuildingType] = useState<Item | null>(
    formik?.values?.buildingType
      ? {
          label: formik?.values?.buildingType,
          value: formik?.values?.buildingType,
        }
      : null
  );

  useEffect(() => {
    if (formik?.values?.buildingType !== "") {
      setSelectedBuildingType({
        label: formik?.values?.buildingType,
        value: formik?.values?.buildingType,
      });
    } else {
      setSelectedBuildingType({ label: "", value: "" });
    }
  }, [formik?.values?.buildingType]);

  const handleStateSelect = (selectedItem: Item | null): void => {
    setSelectedBuildingType(selectedItem);
    formik?.setFieldValue("buildingType", selectedItem?.value || "");
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
            error={formik?.touched?.name && Boolean(formik?.errors?.name)}
            helperText={formik?.touched?.name && formik?.errors?.name}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="gsub" color="gray.500">
            GESAMMTFLÄCHE (in qm)
          </Typography>
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
            options={buildingTypesList}
            value={selectedBuildingType}
            onChange={handleStateSelect}
            error={
              formik?.touched?.buildingType &&
              Boolean(formik?.errors?.buildingType)
            }
            helperText={
              formik?.touched?.buildingType && formik?.errors?.buildingType
            }
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="gsub" color="gray.500">
            {" "}
            OBJEKTKÜRZEL / TAG ANLEGEN
          </Typography>
          <GTextInput
            id="buildingAbbreviation"
            name="buildingAbbreviation"
            value={formik?.values.buildingAbbreviation}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            error={
              formik?.touched?.buildingAbbreviation &&
              Boolean(formik?.errors.buildingAbbreviation)
            }
            helperText={
              formik?.touched?.buildingAbbreviation &&
              formik?.errors.buildingAbbreviation
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BuildingInformation;
