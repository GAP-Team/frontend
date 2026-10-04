import {
  Box,
  TextField,
  IconButton,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { SuggestedDate, SuggestedDateType } from "./types";

interface SuggestedDateRowProps {
  index: number;
  entry: SuggestedDate;
  formik: any;
  canRemove: boolean;
  onRemove: () => void;
}

const today = (): string => new Date().toISOString().split("T")[0];

const SuggestedDateRow = ({
  index,
  entry,
  formik,
  canRemove,
  onRemove,
}: SuggestedDateRowProps): JSX.Element => {
  const fieldName = `desiredDates[${index}]`;
  const isRange = entry.type === "range";

  const handleTypeChange = (
    _event: React.MouseEvent<HTMLElement>,
    type: SuggestedDateType | null
  ): void => {
    if (!type) return;
    formik.setFieldValue(`${fieldName}.type`, type);
    if (type === "single") formik.setFieldValue(`${fieldName}.endDate`, "");
  };

  const startError = formik?.errors?.desiredDates?.[index]?.date;
  const endError = formik?.errors?.desiredDates?.[index]?.endDate;

  return (
    <Box sx={styles.row}>
      <Box sx={styles.header}>
        <Typography variant="gsub" color="gray.500">
          Termin {index + 1}
        </Typography>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={entry.type}
          onChange={handleTypeChange}
        >
          <ToggleButton value="single">Bestimmtes Datum</ToggleButton>
          <ToggleButton value="range">Zeitraum</ToggleButton>
        </ToggleButtonGroup>
        {canRemove && (
          <IconButton
            aria-label="Termin entfernen"
            onClick={onRemove}
            sx={styles.remove}
          >
            <DeleteOutlineIcon />
          </IconButton>
        )}
      </Box>
      <Box sx={styles.fields}>
        <TextField
          type="date"
          label={isRange ? "Von" : "Datum"}
          name={`${fieldName}.date`}
          value={entry.date}
          onBlur={formik?.handleBlur}
          onChange={formik?.handleChange}
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: today() }}
          error={Boolean(startError)}
          helperText={startError}
        />
        {isRange && (
          <TextField
            type="date"
            label="Bis"
            name={`${fieldName}.endDate`}
            value={entry.endDate}
            onBlur={formik?.handleBlur}
            onChange={formik?.handleChange}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: entry.date || today() }}
            error={Boolean(endError)}
            helperText={endError}
          />
        )}
      </Box>
    </Box>
  );
};

export default SuggestedDateRow;

const styles = {
  row: {
    p: 2,
    borderRadius: "0.5rem",
    border: "1px solid #E5E7EB",
  },
  header: {
    mb: 1.5,
    gap: 1,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
  remove: {
    ml: "auto",
  },
  fields: {
    gap: 2,
    display: "flex",
    flexWrap: "wrap",
  },
};
