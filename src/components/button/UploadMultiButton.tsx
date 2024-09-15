import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { FiFileText } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";

import s3APIs from "@/api/s3";

interface UploadMultiButtonProps {
  value?: File[] | null | undefined;
  onChange?: (event: any) => void;
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
}: UploadMultiButtonProps): JSX.Element {
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

  const handleFileChange = (files: File[]) : void => {
    if (onChange) {
      const newFiles = value ? [...value, ...files] : files;
      const syntheticEvent = {
        target: {
          name: name || "",
          value: newFiles,
        },
      } as any;
      onChange(syntheticEvent);
    }
  };

  const handleDelete = (index: number) : void => {
    const newValue = value?.filter((_, i) => i !== index) || [];
    const syntheticEvent = {
      target: {
        name: name || "",
        value: newValue,
      },
    } as any;
    onChange && onChange(syntheticEvent);

    const deletedFile = value?.filter((_, i) => i === index) || [];
    deleteFileFromS3(deletedFile[0]);
  };

  const deleteFileFromS3 = async (file: any) : Promise<void> => {
    if (file.hasOwnProperty("documentType")) {
      const deleteFileStatus = await s3APIs.delete(file?.key);
      if (deleteFileStatus) {
        console.log("File deleted successfully");
      }
    }
  };

  const onDrop = (acceptedFiles: File[]) : void => {
    handleFileChange(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  return (
    <>
      <Box sx={styles} {...getRootProps()}>
        <Input {...getInputProps()} />
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
              onDelete={() => handleDelete(index)}
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
            onChange={(event) =>
              handleFileChange(Array.from(event.target.files || []))
            }
            multiple
          />
        </Button>
      </Box>
      {error && <FormHelperText error>{helperText}</FormHelperText>}
    </>
  );
}
