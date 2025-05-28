"use client";
import { useEffect } from "react";
import { useFormik } from "formik";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";
import GButton from "@/components/button/GButton";
import { FilterPanelLabels } from "@/utils/enums";
import SideFilterPanelOptions from "./SideFilterPanelOptions";
import { ContractSearchProps, SideFilterPanelProps } from "@/typings/types";
import {
  listOfTenderTypes,
  listOfGermanStates,
  listOfFacilitySubcategories,
} from "@/utils/Constants";

const SideFilterPanel: React.FC<SideFilterPanelProps> = ({
  states,
  tenderTypes,
  facilitySubcategories,
  handleSearchContracts,
}): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    formik.setFieldValue("states", states);
    formik.setFieldValue("tenderTypes", tenderTypes);
    formik.setFieldValue("facilitySubcategories", facilitySubcategories);
  }, [states, tenderTypes, facilitySubcategories]);

  const initialValues: ContractSearchProps = {
    states: [],
    tenderTypes: [],
    facilitySubcategories: [],
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      handleSearchContracts(
        values.states,
        values.tenderTypes,
        values.facilitySubcategories
      );
    },
  });

  const handleOnSelect = (selected: string[], field: string): void => {
    let formikField = "";

    switch (field) {
      case FilterPanelLabels.STATE:
        formikField = "states";
        break;
      case FilterPanelLabels.FACILITY_SUBCATEGORY:
        formikField = "facilitySubcategories";
        break;
      default:
        formikField = "tenderTypes";
        break;
    }

    formik.setFieldValue(formikField, selected);
  };

  const handleOnReset = (): void => {
    formik.setFieldValue("states", []);
    formik.setFieldValue("tenderTypes", []);
    formik.setFieldValue("facilitySubcategories", []);
    handleSearchContracts([], [], []);
    const url = `${ROUTES.SERVICE_PROVIDER.CONTRACTS}?facilitySubcategories=${[].join(",")}&tenderTypes=${[].join(",")}&states=${[].join(",")}`;
    router.push(url);
  };

  return (
    <Box sx={styles.mainContainer}>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-row justify-between">
          <Typography variant="h6" fontWeight="bold">
            Filters
          </Typography>
          <GButton type="submit">Filter</GButton>
        </div>
        <SideFilterPanelOptions
          options={listOfGermanStates}
          onSelect={handleOnSelect}
          title={FilterPanelLabels.STATE}
          preSelectedOptions={formik.values.states}
        />
        <SideFilterPanelOptions
          onSelect={handleOnSelect}
          options={listOfFacilitySubcategories}
          title={FilterPanelLabels.FACILITY_SUBCATEGORY}
          preSelectedOptions={formik.values.facilitySubcategories}
        />
        <SideFilterPanelOptions
          onSelect={handleOnSelect}
          options={listOfTenderTypes}
          title={FilterPanelLabels.TENDER_TYPE}
          preSelectedOptions={formik.values.tenderTypes}
        />
        <GButton onClick={handleOnReset}>Filter löschen</GButton>
      </form>
    </Box>
  );
};

export default SideFilterPanel;

const styles = {
  mainContainer: {
    p: 2,
    boxShadow: 1,
    width: "100%",
    borderRadius: 2,
    bgcolor: "background.paper",
  },
};
