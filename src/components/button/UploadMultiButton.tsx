import * as React from "react";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FiFileText } from "react-icons/fi";
import FormHelperText from "@mui/material/FormHelperText";
import Chip from "@mui/material/Chip";

interface UploadMultiButtonProps {
  value?: File[] | null | undefined;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  name?: string;
  error?: boolean;
  helperText?: string | boolean;
}

const Input = styled("input")({
  display: "none",
});

export default function UploadMultiButton({
  value,
  onChange,
  id,
  name,
  error,
  helperText,
}: UploadMultiButtonProps) {
  const theme = useTheme();

  const styles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `1px dashed ${theme.palette.divider}`,
    borderRadius: "0.5rem",
    padding: "1rem",
    backgroundColor: "#F9FAFA",
    flexWrap: "wrap",
    gap: "0.5rem",
    "&:hover": {
      borderColor: theme.palette.text.primary,
      backgroundColor: theme.palette.action.hover,
    },
  };

  return (
    <>
      <Box sx={styles}>
        {!value || value.length === 0 ? (
          <>
            <FiFileText size="1.5rem" color="#A0ADB1" />
            <Typography sx={{ mx: "0.8rem" }} color="gray.700">
              Dokumente hinzuziehen oder
            </Typography>
          </>
        ) : null}
        {value &&
          value.map((file, index) => (
            <Chip
              key={index}
              label={file.name}
              onDelete={() => {
                const newValue = value.filter((_, i) => i !== index);
                const syntheticEvent = {
                  target: {
                    name: name || "",
                    value: newValue,
                  },
                } as any;
                onChange && onChange(syntheticEvent);
              }}
            />
          ))}
        <Button
          role={undefined}
          tabIndex={-1}
          color="gprimary"
          sx={{ fontWeight: "600" }}
          component="label"
        >
          Dokumente suchen
          <Input
            type="file"
            id={id}
            name={name}
            accept="application/pdf"
            onChange={(event) => {
              if (onChange) {
                const files = Array.from(event.target.files || []);
                const newFiles = value ? [...value, ...files] : files;
                const syntheticEvent = {
                  target: {
                    name: name || "",
                    value: newFiles,
                  },
                } as any;
                onChange(syntheticEvent);
              }
            }}
            multiple
          />
        </Button>
      </Box>
      {error && <FormHelperText error>{helperText}</FormHelperText>}
    </>
  );
}
