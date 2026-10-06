"use client";
import Grid from "@mui/material/Grid";
import buildingAPI from "@/api/building";
import { useSelector } from "react-redux";
import { useFormikContext } from "formik";
import logger from "@/utils/Logger";
import { useAppDispatch } from "@/lib/hooks";
import { showSnackbar } from "@/components/feedback/snackbar";
import { useEffect, useState } from "react";
import { TenderFormValues } from "./types";
import HelpIcon from "@/components/icons/HelpIcon";
import { FormControl, MenuItem, Select } from "@mui/material";
import CustomSelect from "@/components/inputs/drop_down/CustomSelect";
import { getUserBuildings } from "@/lib/features/buildingSlice";
import { HELP_ICON_BUTTON_COLOR, Item } from "@/utils/Constants";
import LabelWithAsterisk from "@/components/data-display/label/LabelWithAsterisk";
import { Facility } from "@/screens/real-estate-owner/facilities/facility-overview/types";
import { AddFacilityFormValues } from "@/screens/real-estate-owner/facilities/facility-form/types";

interface TenderExistingObjectFacilityProps {
  showFacilitySelect?: boolean;
}

const TenderExistingObjectFacility = ({
  showFacilitySelect = true,
}: TenderExistingObjectFacilityProps): JSX.Element => {
  const allBuildings = useSelector(getUserBuildings);
  const dispatch = useAppDispatch();
  const formik = useFormikContext<TenderFormValues>();
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

  const loadFacilities = async (buildingId: string): Promise<void> => {
    try {
      const response = await buildingAPI.getFacilitiesOfBuilding(buildingId);
      const facilities: Facility[] = response?.data ?? [];
      setBuildingFacilities(facilities as any);
      setFacilityDropDownOptions(
        facilities.map((facility) => ({
          label: constructFacilityLabel(facility),
          value: facility?.id,
        }))
      );
    } catch (error) {
      logger.error("Error loading facilities of building: ", error);
      setBuildingFacilities([]);
      setFacilityDropDownOptions([]);
      dispatch(
        showSnackbar({
          type: "error",
          message:
            "Anlagen konnten nicht geladen werden. Bitte versuchen Sie es später erneut.",
        })
      );
    }
  };

  const setSelectedBuildingFacilities = (): Promise<void> =>
    loadFacilities(formik?.values?.buildingId);

  const handleBuildingSelect = async (selectedItem: any): Promise<void> => {
    const selectedBuildingId = selectedItem.target.value;
    formik?.setFieldValue("buildingId", selectedBuildingId);
    formik?.setFieldValue("facilityId", "");
    formik?.setFieldValue("facilityName", "");
    if (selectedBuildingId === "0") {
      formik?.setFieldValue("buildingName", "");
      return;
    }
    const building = allBuildings.find(
      (item: any) => item.id === selectedBuildingId
    );
    formik?.setFieldValue("buildingName", building?.buildingName);
    await loadFacilities(selectedBuildingId);
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
      {showFacilitySelect && (
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
      )}
    </Grid>
  );
};

export default TenderExistingObjectFacility;

const styles = {
  errorTexts: {
    color: "#d32f2f",
    fontWeight: 400,
    fontSize: "0.75rem",
  },
};
