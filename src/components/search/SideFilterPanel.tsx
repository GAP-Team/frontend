"use client";
import { useFormik } from "formik";
import { Box, Typography } from "@mui/material";
import GButton from "@/components/button/GButton";
import { FilterPanelLabels } from "@/utils/enums";
import { ContractSearchProps } from "@/typings/types";
import SideFilterPanelOptions from "./SideFilterPanelOptions";
import { contactFiltersOption, germanStates } from "@/utils/Constants";

const SideFilterPanel = (): JSX.Element => {

  const initialValues: ContractSearchProps = {
    states: [],
    tenderTypes: [],
    facilitySubcategories: [],
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: () => {},
  });
  
  return (
    <Box sx={styles.mainContainer}>
      <div className="flex flex-row justify-between">
        <Typography variant="h6" fontWeight="bold">
          Filters
        </Typography>
        <GButton href="#">Filter</GButton>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <SideFilterPanelOptions
          formik={formik}
          options={germanStates}
          title={FilterPanelLabels.STATE}
        />
        {/* <SideFilterPanelOptions
          title={FilterPanelLabels.FACILITY_SUBCATEGORY}
          options={contactFiltersOption.facilityType.options}
        />
        <SideFilterPanelOptions
          title={FilterPanelLabels.TENDER_TYPE}
          options={contactFiltersOption.tenderType.options}
        /> */}
        <GButton type="submit">Filter löschen</GButton>
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
