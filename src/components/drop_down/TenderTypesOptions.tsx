import {
  Box,
  Chip,
  Menu,
  List,
  Collapse,
  MenuItem,
  Checkbox,
  TextField,
  ListItemText,
  InputAdornment,
  ListItemButton,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { listOfTenderTypes } from "@/utils/Constants";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import { TenderTypesOptionProps } from "@/typings/types";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const TenderTypesOptions: React.FC<TenderTypesOptionProps> = ({
  formik,
  useType,
}): JSX.Element => {
  const [tenderTypeAnchorEl, setTenderTypeAnchorEl] =
    useState<HTMLDivElement | null>(null);
  const [tenderTypeExpanded, setTenderTypeExpanded] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedTenderTypes, setSelectedTenderTypes] = useState<string[]>([]);

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
    if (useType === "single") {
      setTenderTypeAnchorEl(null);
      formik.setFieldValue("tenderType", item);
    } else {
      const tenderTypes = handleOptionsSelectFilter(item);

      setSelectedTenderTypes(tenderTypes);
      formik.setFieldValue("tenderTypes", tenderTypes);
    }
  };

  const handleOptionsSelectFilter = (item: string): string[] => {
    return selectedTenderTypes.includes(item)
      ? selectedTenderTypes.filter((selected) => selected !== item)
      : [...selectedTenderTypes, item];
  };

  const handleTenderTypesOptionDeselect = (item: string): void => {
    const facilitiesAfterDeselect = handleOptionsDeselectFilter(item);

    setSelectedTenderTypes(facilitiesAfterDeselect);
    formik.setFieldValue("tenderTypes", facilitiesAfterDeselect);
  };

  const handleOptionsDeselectFilter = (item: string): string[] => {
    return selectedTenderTypes.filter((selected) => selected !== item);
  };

  return (
    <>
      <TextField
        label={useType === "single" ? "" : "Auftragstypen"}
        onClick={handleClickTenderTypeSelect}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="start">
              <ArrowDropDownIcon />
            </InputAdornment>
          ),
        }}
        onBlur={formik?.handleBlur}
        onChange={formik?.handleChange}
        error={
          formik?.touched?.tenderTypes && Boolean(formik?.errors?.tenderTypes)
        }
        helperText={formik?.touched?.tenderTypes && formik?.errors?.tenderTypes}
        value={useType === "single" ? formik?.values?.tenderType : ""}
      />
      <Menu
        anchorEl={tenderTypeAnchorEl}
        open={Boolean(tenderTypeAnchorEl)}
        onClose={handleTenderTypeOptionsClose}
      >
        {listOfTenderTypes.map((tenderTypes) => (
          <div key={tenderTypes.category}>
            <ListItemButton
              onClick={() =>
                handleTenderTypeOptionsExpand(tenderTypes.category)
              }
            >
              <ListItemText primary={tenderTypes.category} />
              {tenderTypeExpanded[tenderTypes.category] ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </ListItemButton>
            <Collapse
              in={tenderTypeExpanded[tenderTypes.category]}
              timeout="auto"
              unmountOnExit
            >
              <List disablePadding>
                {tenderTypes.items.map((item) => (
                  <MenuItem
                    key={item}
                    onClick={() => handleTenderTypeOptionSelect(item)}
                  >
                    {useType === "multiple" && (
                      <Checkbox checked={selectedTenderTypes.includes(item)} />
                    )}
                    <ListItemText primary={item} />
                  </MenuItem>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </Menu>
      {useType === "multiple" && selectedTenderTypes.length > 0 && (
        <Box
          sx={{
            mt: 2,
            gap: 1,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {selectedTenderTypes.map((item) => (
            <Chip
              key={item}
              label={item}
              deleteIcon={<CloseIcon />}
              onDelete={() => handleTenderTypesOptionDeselect(item)}
            />
          ))}
        </Box>
      )}
    </>
  );
};

export default TenderTypesOptions;
