"use client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import buildingAPI from "@/api/building";
import { useSelector } from "react-redux";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { AddTenderFormValues } from "./types";
import HelpIcon from "@/components/icons/HelpIcon";
import { FormControl, MenuItem, Select } from "@mui/material";
import CustomSelect from "@/components/inputs/drop_down/CustomSelect";
import { getUserBuildings } from "@/lib/features/buildingSlice";
import { HELP_ICON_BUTTON_COLOR, Item } from "@/utils/Constants";
import LabelWithAsterisk from "@/components/data-display/label/LabelWithAsterisk";
import { Facility } from "@/screens/real-estate-owner/facilities/facility-card/types";
import { AddFacilityFormValues } from "@/screens/real-estate-owner/facilities/add-facility-form/types";

const TenderBuilding = (): JSX.Element => {
  const allBuildings = useSelector(getUserBuildings);
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
        value: building?.id,
      };
      buildingOptions.push(temp);
    });

    setBuildingDropDownOptions(buildingOptions);
    if (formik?.values?.buildingId !== "") {
      setSelectedBuildingFacilities();
    }
  }, []);

  const setSelectedBuildingFacilities = async (): Promise<void> => {
    const allFacilities = await buildingAPI.getFacilitiesOfBuilding(
      formik?.values?.buildingId
    );

    const facilityOptions: Item[] = [];
    allFacilities?.data?.forEach((facility: Facility) => {
      const temp = {
        label: constructFacilityLabel(facility),
        value: facility?.id,
      };
      facilityOptions.push(temp);
    });

    setFacilityDropDownOptions(facilityOptions);
  };

  const handleBuildingSelect = async (selectedItem: any): Promise<void> => {
    const selectedBuildingId = selectedItem.target.value;
    if (selectedBuildingId !== "0") {
      formik?.setFieldValue("buildingId", selectedBuildingId);
      const building = allBuildings.filter(
        (building: any) => building.id === selectedBuildingId
      );
      formik?.setFieldValue("buildingName", building[0]?.buildingName);

      const allFacilities =
        await buildingAPI.getFacilitiesOfBuilding(selectedBuildingId);

      const facilityOptions: Item[] = [];
      allFacilities?.data?.forEach((facility: Facility) => {
        const temp = {
          label: constructFacilityLabel(facility),
          value: facility?.id,
        };
        facilityOptions.push(temp);
      });

      setFacilityDropDownOptions(facilityOptions);
      setBuildingFacilities(allFacilities?.data);
    } else {
      formik?.setFieldValue("buildingId", selectedBuildingId);
      formik?.setFieldValue("buildingName", "");
    }
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

  const constructFacilityLabel = (facility: Facility): string => {
    return `${facility?.facilityType} - ${facility?.subcategory} - ${facility?.name}`;
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
          <HelpIcon
            iconColor={HELP_ICON_BUTTON_COLOR.GREY}
            helpText="The helper text will be displayed here."
          />
          <FormControl fullWidth>
            {buildingDropDownOptions?.length > 0 ? (
              <CustomSelect
                name={"buildingId"}
                onChange={handleBuildingSelect}
                options={buildingDropDownOptions}
                value={formik?.values?.buildingId}
              />
            ) : (
              <Select
                name="buildingId"
                value={formik?.values?.buildingId}
                label="Objekt Zuordnen"
                onChange={formik.handleChange}
                displayEmpty
              >
                <MenuItem disabled key={0} value={"0"}>
                  {`Kein Objekt vorhanden`}
                </MenuItem>
              </Select>
            )}
            {formik?.touched?.buildingId && (
              <p style={styles.errorTexts}>{formik?.errors?.buildingId}</p>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <LabelWithAsterisk>ANLAGE AUSWÄHLEN</LabelWithAsterisk>
          <HelpIcon
            iconColor={HELP_ICON_BUTTON_COLOR.GREY}
            helpText="The helper text will be displayed here."
          />
          <FormControl fullWidth>
            {facilityDropDownOptions?.length > 0 ? (
              <CustomSelect
                name={"facilityId"}
                onChange={handleFacilitySelect}
                options={facilityDropDownOptions}
                value={formik?.values?.facilityId}
              />
            ) : (
              <Select
                name="facilityId"
                value={formik?.values?.facilityId}
                label="Anlagen zuordnen"
                onChange={formik.handleChange}
                displayEmpty
              >
                <MenuItem disabled key={0} value={"0"}>
                  {`Keine Anlage vorhanden`}
                </MenuItem>
              </Select>
            )}
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
