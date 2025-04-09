"use client";
import Image from "next/image";
import Badge from "../../badge/GBadge";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  Box,
  Chip,
  Menu,
  List,
  Button,
  Checkbox,
  MenuItem,
  Collapse,
  TextField,
  FormControl,
  ListItemText,
  InputAdornment,
  ListItemButton,
  Grid,
} from "@mui/material";
import {
  germanStates,
  listOfTrades,
  listOfOrderTypes,
} from "@/utils/Constants";
import { useFormik } from "formik";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import { ContractSearchProps } from "@/typings/types";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CustomSelect from "@/components/drop_down/CustomSelect";
import { ContractSearchSchema } from "@/utils/ValidationSchema";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import heroBackgroundPicture from "../../../../public/images/hero6.jpg";

const HeroSection = (): JSX.Element => {
  const router = useRouter();

  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [facilityAnchorEl, setFacilityAnchorEl] =
    useState<HTMLDivElement | null>(null);
  const [facilityExpanded, setFacilityExpanded] = useState<{
    [key: string]: boolean;
  }>({});

  const [selectedTenderType, setSelectedTenderType] = useState<string>("");
  const [tenderTypeAnchorEl, setTenderTypeAnchorEl] =
    useState<HTMLDivElement | null>(null);
  const [tenderTypeExpanded, setTenderTypeExpanded] = useState<{
    [key: string]: boolean;
  }>({});

  const initialValues: ContractSearchProps = {
    state: "",
    tender: "",
    facilities: [],
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ContractSearchSchema,
    onSubmit: async (values) => {
      try {
        console.info("Form values:", values);
        router.push(
          `${window.location.origin}/${ROUTES.SERVICE_PROVIDER.CONTRACTS}`
        );
      } catch (error) {
        console.error(error);
      }
    },
  });

  // Facility handles
  const handleClickFacilitySelect = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {
    setFacilityAnchorEl(event.currentTarget);
  };

  const handleFacilityOptionsClose = (): void => {
    setFacilityAnchorEl(null);
  };

  const handleFacilityOptionsExpand = (category: string): void => {
    setFacilityExpanded((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const handleFacilityOptionsSelectFilter = (item: string): string[] => {
    return selectedFacilities.includes(item)
      ? selectedFacilities.filter((selected) => selected !== item)
      : [...selectedFacilities, item];
  };

  const handleFacilityOptionSelect = (item: string): void => {
    const facilities = handleFacilityOptionsSelectFilter(item);

    setSelectedFacilities(facilities);
    formik.setFieldValue("facilities", facilities);
  };

  const handleFacilityOptionsDeselectFilter = (item: string): string[] => {
    return selectedFacilities.filter((selected) => selected !== item);
  };

  const handleFacilityOptionDeselect = (item: string): void => {
    const facilitiesAfterDeselect = handleFacilityOptionsDeselectFilter(item);

    setSelectedFacilities(facilitiesAfterDeselect);
    formik.setFieldValue("facilities", facilitiesAfterDeselect);
  };

  // Tender Type handles
  const handleClickTenderTypeSelect = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {
    setTenderTypeAnchorEl(event.currentTarget);
  };

  const handleTenderTypeOptionsClose = (): void => {
    setTenderTypeAnchorEl(null);
  };

  const handleTenderTypeOptionsExpand = (category: string): void => {
    setTenderTypeExpanded((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const handleTenderTypeOptionSelect = (item: string): void => {
    setSelectedTenderType(item);
    setTenderTypeAnchorEl(null);
    formik.setFieldValue("tender", item);
  };

  return (
    <>
      <section className="bg-white w-full dark:bg-gray-900">
        <div className="relative">
          <Image
            src={heroBackgroundPicture}
            className="absolute inset-0 object-cover w-full h-full"
            alt=""
          />
          <div className="absolute inset-x-0 bottom-0">
            <svg
              viewBox="0 0 224 12"
              fill="currentColor"
              className="w-full -mb-0 text-white"
              preserveAspectRatio="none"
            >
              <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
            </svg>
          </div>

          <div className="relative bg-gray-900 bg-opacity-0 h-[800px]">
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
              <div className="flex flex-col items-center justify-center">
                {/* Query Section Start */}
                <div className="w-full xl:mb-0 xl:px-16">
                  <div className="bg-white bg-opacity-90 rounded-xl shadow-2xl p-4 sm:p-7 md:p-10">
                    <div className="flex justify-center flex-col items-center text-center pb-5 px-4 md:px-5">
                      <Badge
                        title="In 3 Schritten zum Erfolg"
                        color="#d0ede8"
                      />
                      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold my-5">
                        Sie sind Experte – wir haben die passenden Aufträge!
                      </h1>
                      <p className="text-base sm:text-lg md:text-xl font-normal max-w-xl sm:max-w-2xl md:max-w-4xl mx-auto py-2">
                        Ob Sachverständiger, Technikerin, Handwerksbetrieb oder
                        Prüfstelle: GAP bringt Sie direkt mit
                        Immobilienbetreibern zusammen, die qualifizierte
                        Fachbetriebe für gesetzlich vorgeschriebene Prüfungen
                        und Wartungen suchen.
                      </p>
                    </div>

                    <form onSubmit={formik.handleSubmit}>
                      <Grid className="flex flex-col justify-center text-center pt-10 pb-4 md:flex-row">
                        {/* Facility Type Section */}
                        <div className="flex flex-col w-full px-2 sm:px-4 md:w-1/3">
                          <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <label
                              htmlFor="craft"
                              className="text-sm font-medium text-gray-700 mb-4"
                            >
                              Wählen Sie ein Anlagentyp aus:
                            </label>
                            <TextField
                              label="Anlagentyp"
                              onClick={handleClickFacilitySelect}
                              InputProps={{
                                readOnly: true,
                                endAdornment: (
                                  <InputAdornment position="start">
                                    <ArrowDropDownIcon />
                                  </InputAdornment>
                                ),
                              }}
                              onBlur={formik?.handleBlur}
                              // onChange={formik?.handleChange}
                              error={
                                formik?.touched?.facilities &&
                                Boolean(formik?.errors?.facilities)
                              }
                              helperText={
                                formik?.touched?.facilities &&
                                formik?.errors?.facilities
                              }
                            />
                            <Menu
                              anchorEl={facilityAnchorEl}
                              open={Boolean(facilityAnchorEl)}
                              onClose={handleFacilityOptionsClose}
                            >
                              {listOfTrades.map((trade) => (
                                <div key={trade.category}>
                                  <ListItemButton
                                    onClick={() =>
                                      handleFacilityOptionsExpand(
                                        trade.category
                                      )
                                    }
                                  >
                                    <ListItemText primary={trade.category} />
                                    {facilityExpanded[trade.category] ? (
                                      <ExpandLess />
                                    ) : (
                                      <ExpandMore />
                                    )}
                                  </ListItemButton>
                                  <Collapse
                                    in={facilityExpanded[trade.category]}
                                    timeout="auto"
                                    unmountOnExit
                                  >
                                    <List disablePadding>
                                      {trade.items.map((item) => (
                                        <MenuItem
                                          key={item}
                                          onClick={() =>
                                            handleFacilityOptionSelect(item)
                                          }
                                        >
                                          <Checkbox
                                            checked={selectedFacilities.includes(
                                              item
                                            )}
                                          />
                                          <ListItemText primary={item} />
                                        </MenuItem>
                                      ))}
                                    </List>
                                  </Collapse>
                                </div>
                              ))}
                            </Menu>
                            {selectedFacilities.length > 0 && (
                              <Box
                                sx={{
                                  display: "flex",
                                  gap: 1,
                                  flexWrap: "wrap",
                                  mt: 2,
                                }}
                              >
                                {selectedFacilities.map((item) => (
                                  <Chip
                                    key={item}
                                    label={item}
                                    onDelete={() =>
                                      handleFacilityOptionDeselect(item)
                                    }
                                    deleteIcon={<CloseIcon />}
                                  />
                                ))}
                              </Box>
                            )}
                          </FormControl>
                        </div>

                        {/* Tender Type Section */}
                        <div className="flex flex-col w-full px-2 sm:px-4 md:w-1/3">
                          <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <label
                              htmlFor="craft"
                              className="text-sm font-medium text-gray-700 mb-4"
                            >
                              Wählen Sie ein Auftragstyp aus:
                            </label>

                            <TextField
                              label="Auftragstypen"
                              onClick={(event) => {
                                handleClickTenderTypeSelect(event);
                              }}
                              InputProps={{
                                readOnly: true,
                                endAdornment: (
                                  <InputAdornment position="start">
                                    <ArrowDropDownIcon />
                                  </InputAdornment>
                                ),
                              }}
                              value={selectedTenderType}
                              onBlur={formik?.handleBlur}
                              onChange={formik?.handleChange}
                              error={
                                formik?.touched?.tender &&
                                Boolean(formik?.errors?.tender)
                              }
                              helperText={
                                formik?.touched?.tender &&
                                formik?.errors?.tender
                              }
                            />
                            <Menu
                              anchorEl={tenderTypeAnchorEl}
                              open={Boolean(tenderTypeAnchorEl)}
                              onClose={handleTenderTypeOptionsClose}
                            >
                              {listOfOrderTypes.map((trade) => (
                                <div key={trade.category}>
                                  <ListItemButton
                                    onClick={() =>
                                      handleTenderTypeOptionsExpand(
                                        trade.category
                                      )
                                    }
                                  >
                                    <ListItemText primary={trade.category} />
                                    {tenderTypeExpanded[trade.category] ? (
                                      <ExpandLess />
                                    ) : (
                                      <ExpandMore />
                                    )}
                                  </ListItemButton>
                                  <Collapse
                                    in={tenderTypeExpanded[trade.category]}
                                    timeout="auto"
                                    unmountOnExit
                                  >
                                    <List disablePadding>
                                      {trade.items.map((item) => (
                                        <MenuItem
                                          key={item}
                                          onClick={() =>
                                            handleTenderTypeOptionSelect(item)
                                          }
                                        >
                                          <ListItemText primary={item} />
                                        </MenuItem>
                                      ))}
                                    </List>
                                  </Collapse>
                                </div>
                              ))}
                            </Menu>
                          </FormControl>
                        </div>

                        {/* State Section */}
                        <div className="flex flex-col w-full px-2 sm:px-4 md:w-1/3">
                          <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <label
                              htmlFor="type"
                              className="text-sm font-medium text-gray-700 mb-4"
                            >
                              Wählen Sie ein Bundesland aus:
                            </label>
                            <CustomSelect
                              name="state"
                              label={"Bundesländer"}
                              options={germanStates}
                              value={formik?.values?.state}
                              onChange={formik?.handleChange}
                            />
                            {formik?.touched?.state && (
                              <p style={styles.errorTexts}>
                                {formik?.errors?.state}
                              </p>
                            )}
                          </FormControl>
                        </div>
                      </Grid>

                      {/* Button Section */}
                      <div className="flex justify-center items-center">
                        <Button
                          size="large"
                          component="button"
                          type="submit"
                          style={styles.querySubmitButton}
                          className="mt-10 rounded-lg"
                          sx={{
                            textTransform: "none",
                            whiteSpace: "pre",
                          }}
                          // onClick={}
                        >
                          Jetzt Auftrag Finden
                          <FaArrowRightLong className="ml-2 h-5 w-5" />
                        </Button>
                      </div>
                    </form>

                    <div className="flex justify-center items-center pt-6 gap-4 px-4">
                      <div className="flex items-center">
                        <FaCheck />
                        <label
                          htmlFor="free-signup"
                          className="ml-2 block text-sm md:text-md text-gray-900"
                        >
                          Kostenlos registrieren
                        </label>
                      </div>
                      <div className="flex items-center">
                        <FaCheck />
                        <label
                          htmlFor="test-without-commitment"
                          className="ml-2 block text-sm md:text-md text-gray-900"
                        >
                          Unverbindlich testen
                        </label>
                      </div>
                      <div className="flex items-center">
                        <FaCheck />
                        <label
                          htmlFor="test-without-commitment"
                          className="ml-2 block text-sm md:text-md text-gray-900"
                        >
                          Direkt loslegen
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Query Section End */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;

const styles = {
  querySubmitButton: {
    background: "#005e99",
    color: "#FFFFFF",
    padding: "0.8rem",
    paddingRight: "1.7rem",
    paddingLeft: "1.7rem",
    borderRadius: 7,
    fontSize: "small",
    "&:hover": {
      background: "#0071b8",
    },
  },
  errorTexts: {
    color: "#d32f2f",
    fontWeight: 400,
    fontSize: "0.75rem",
  },
};
