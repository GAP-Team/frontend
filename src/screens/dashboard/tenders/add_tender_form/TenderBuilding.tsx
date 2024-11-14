"use client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Item } from "@/utils/Constants";
import { useSelector } from "react-redux";
import { useFormikContext } from "formik";
import buildingAPIs from "@/api/building";
import { useEffect, useState } from "react";
import { FormControl } from "@mui/material";
import { AddTenderFormValues } from "./types";
import { currentUserBuildings } from "@/lib/features/userSlice";
import CustomSelect from "@/components/drop_down/CustomSelect";
import LabelWithAsterisk from "@/components/label/LabelWithAsterisk";
import { AddFacilityFormValues } from "../../facilities/add_facility_form/types";

const TenderBuilding = (): JSX.Element => {
  const allBuildings = useSelector(currentUserBuildings);
  const formik = useFormikContext<AddTenderFormValues>();
  const [buildingFacilities, setBuildingFacilities] = useState([]);
  const [buildingDropDownOptions, setBuildingDropDownOptions] = useState<
    Item[]
  >([]);
  const [facilityDropDownOptions, setFacilityDropDownOptions] = useState<
    Item[]
  >([]);

  useEffect(() => {
    const buildingOptions: Item[] = [];
    allBuildings?.map((building: any) => {
      const temp = {
        label: building?.buildingName,
        value: building?._id,
      };
      buildingOptions.push(temp);
    });

    setBuildingDropDownOptions(buildingOptions);
  }, []);

  const handleBuildingSelect = async (selectedItem: any): Promise<void> => {
    const selectedBuildingId = selectedItem.target.value;
    formik?.setFieldValue("buildingId", selectedBuildingId);

    const building = allBuildings.filter(
      (building: any) => building._id === selectedBuildingId
    );
    formik?.setFieldValue("buildingName", building[0]?.buildingName);

    const allFacilities =
      await buildingAPIs.getBuildingFacilities(selectedBuildingId);

    const facilityOptions: Item[] = [];
    allFacilities?.data?.map((facility: any) => {
      const temp = {
        label: facility?.name,
        value: facility?.id,
      };
      facilityOptions.push(temp);
    });

    setFacilityDropDownOptions(facilityOptions);
    setBuildingFacilities(allFacilities?.data);
  };

  const handleFacilitySelect = async (selectedItem: any): Promise<void> => {
    const selectedFacilityId = selectedItem.target.value;
    formik?.setFieldValue("facilityId", selectedFacilityId);

    const selectedFacility = await getSelectedFacility(selectedFacilityId);
    formik?.setFieldValue("facilityName", selectedFacility?.name);
  };

  const getSelectedFacility = (
    facilityId: string
  ): Promise<AddFacilityFormValues> => {
    const facility = buildingFacilities.filter(
      (facility: any) => facility.id === facilityId
    );
    return facility[0];
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
            <CustomSelect
              name={"buildingId"}
              onChange={handleBuildingSelect}
              options={buildingDropDownOptions}
              value={formik?.values?.buildingId}
            />
            {formik?.touched?.buildingId && (
              <p style={styles.errorTexts}>{formik?.errors?.buildingId}</p>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <LabelWithAsterisk>ANLAGE AUSWÄHLEN</LabelWithAsterisk>
          <FormControl fullWidth>
            <CustomSelect
              name={"facilityId"}
              onChange={handleFacilitySelect}
              options={facilityDropDownOptions}
              value={formik?.values?.facilityId}
            />
            {formik?.touched?.facilityId && (
              <p style={styles.errorTexts}>{formik?.errors?.facilityId}</p>
            )}
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
    fontSize: "0.75rem",
  },
};
