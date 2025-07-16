import {
  Box,
  Chip,
  Grid,
  Button,
  Popover,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import UploadButton from "@/components/inputs/button/UploadButton";
import { previousAdvantages } from "@/utils/Constants";
import LabelWithAsterisk from "@/components/data-display/label/LabelWithAsterisk";

const ContractServicesForm = ({ formik }: { formik?: any }): JSX.Element => {
  const [newAdvantage, setNewAdvantage] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedAdvantages, setSelectedAdvantages] = useState<string[]>([]);
  const [advantages, setAdvantages] = useState<string[]>(previousAdvantages);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleAdvantageClick = (label: string): void => {
    const newSelected = selectedAdvantages?.includes(label)
      ? selectedAdvantages.filter((item) => item !== label)
      : [...(selectedAdvantages || []), label];
    setSelectedAdvantages(newSelected);
    formik.setFieldValue("advantages", newSelected);
  };

  const handleCloseAddAdvantagePopup = (): void => {
    setAnchorEl(null);
  };

  const handleAddNewAdvantage = (): void => {
    if (newAdvantage.trim() !== "") {
      setAdvantages([...advantages, newAdvantage]);
      setSelectedAdvantages([...(selectedAdvantages || []), newAdvantage]);
      formik.setFieldValue("advantages", [
        ...(selectedAdvantages || []),
        newAdvantage,
      ]);
      setNewAdvantage("");
    }
    setAnchorEl(null);
  };

  const handleOpenAddNewAdventagePopup = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    setAnchorEl(event.currentTarget);
  };

  const setUploadLandDoc = (ev: any, fileType: string): void => {
    formik.setFieldValue(`${fileType}File`, ev?.target.files[0]);
    formik.setFieldValue(`${fileType}`, ev?.target.files[0].name);
  };

  return (
    <Grid item xs={12} md={9}>
      {/* Vorteile - Sonderleistung */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography sx={styles.descriptionLable}>
            Vorteile – Sonderleistung
          </Typography>
          <Typography sx={styles.descriptionText}>
            Bieten Sie hier Ihre Sonderleistung an
            <br />
            um sich vom Mitbewerber
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {advantages.map((label, index) => (
              <Chip
                clickable
                key={index}
                label={label}
                sx={
                  selectedAdvantages?.includes(label)
                    ? styles.clickableButtonSelected
                    : styles.clickableButton
                }
                onClick={() => handleAdvantageClick(label)}
              />
            ))}
          </Box>
          <Box mt={2}>
            <Button
              variant="text"
              color="primary"
              size="small"
              sx={styles.dashedButton}
              onClick={handleOpenAddNewAdventagePopup}
            >
              + Vorteil individuell erstellen
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={styles.divider} />

      {/* AGB Upload Section */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography sx={styles.descriptionLable}>Ihre AGB</Typography>
          <Typography sx={styles.descriptionText}>
            Laden Sie Ihre eigenen Allgemeinen
            <br />
            Geschäftsbedingungen hoch.
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <LabelWithAsterisk>AGB Dokumente</LabelWithAsterisk>
          <Box sx={styles.docUploaderBox}>
            <UploadButton
              id="termsConditionDoc"
              name="termsConditionDoc"
              onChange={(ev: any) => setUploadLandDoc(ev, "termsConditionDoc")}
              value={formik.values.termsConditionDoc}
              error={
                formik.touched.termsConditionDoc &&
                Boolean(formik.errors.termsConditionDoc)
              }
              helperText={
                formik.touched.termsConditionDoc &&
                formik.errors.termsConditionDoc?.toString()
              }
            />
          </Box>
        </Grid>
      </Grid>
      <Divider sx={styles.divider} />

      {/* Angebot Upload Sections */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography sx={styles.descriptionLable}>
            Angebot als PDF hochladen
          </Typography>
          <Typography sx={styles.descriptionText}>
            Laden Sie Ihre eigenen Allgemeinen
            <br />
            Geschäftsbedingungen hoch.
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <LabelWithAsterisk>Angebot Dokumente</LabelWithAsterisk>
          <Box sx={styles.docUploaderBox}>
            <UploadButton
              id="offerDoc"
              name="offerDoc"
              onChange={(ev: any) => setUploadLandDoc(ev, "offerDoc")}
              value={formik.values.offerDoc}
              error={formik.touched.offerDoc && Boolean(formik.errors.offerDoc)}
              helperText={
                formik.touched.offerDoc && formik.errors.offerDoc?.toString()
              }
            />
          </Box>
        </Grid>
      </Grid>
      <Divider sx={styles.divider} />

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseAddAdvantagePopup}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Grid container sx={styles.innerBox}>
          <TextField
            name="newAdvantage"
            value={newAdvantage}
            sx={{ backgroundColor: "#f1f1f1" }}
            onChange={(e) => setNewAdvantage(e.target.value)}
          />
          <Button
            variant="text"
            sx={styles.confirmButton}
            onClick={handleAddNewAdvantage}
          >
            Speichern
          </Button>
        </Grid>
      </Popover>
    </Grid>
  );
};

export default ContractServicesForm;

const styles = {
  descriptionLable: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  descriptionText: {
    color: "#A0ADB1",
    fontSize: "0.85rem",
  },
  docUploaderBox: {
    p: 1,
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    borderRadius: "12px",
    justifyContent: "center",
    border: "2px dashed #ccc",
  },
  divider: {
    mt: 4,
    mb: 4,
    width: "auto",
    height: "1px",
    bgcolor: "#fbfbfb",
    textAlign: "center",
  },
  clickableButton: {
    p: 1,
    fontWeight: 700,
    color: "#72c7f6",
    fontSize: "0.72rem",
    borderRadius: "1rem",
    backgroundColor: "#ffffff",
    border: `1px solid #72c7f6`,
    "&:hover": {
      color: "#72c7f6",
      backgroundColor: "#E4F5FA",
    },
  },
  clickableButtonSelected: {
    p: 1,
    fontWeight: 700,
    color: "#72c7f6",
    fontSize: "0.7rem",
    borderRadius: "1rem",
    backgroundColor: "#E4F5FA",
    border: `1px solid #72c7f6`,
  },
  dashedButton: {
    p: 1,
    color: "#A0A0A0",
    fontSize: "0.7rem",
    borderRadius: "1rem",
    backgroundColor: "#f4f4f4",
    border: `1px dashed rgb(14 14 14 / 59%)`,
  },
  innerBox: {
    p: 2,
    width: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    background: "#FFFFFF",
    justifyContent: "space-between",
  },
  confirmButton: {
    color: "#e3f2fd",
    cursor: "pointer",
    marginLeft: "0.8rem",
    fontSize: "0.875rem",
    textTransform: "none",
    backgroundColor: "#1976d2",
    "&:hover": {
      color: "#1976d2",
      backgroundColor: "#e3f2fd",
    },
  },
};
