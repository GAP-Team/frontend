import * as React from 'react';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FiFileText } from "react-icons/fi";

interface UploadButtonProps {
  value?: string | null | undefined;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  name?: string;
}

const Input = styled('input')({
  display: 'none',
});

export default function UploadButton({ value="Dokument hinzuziehen oder", onChange, id, name }: UploadButtonProps) {
  const theme = useTheme();

  const styles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `1px dashed ${theme.palette.divider}`,
    borderRadius: "0.5rem",
    padding: "1rem",
    backgroundColor: "#F9FAFA",
    "&:hover": {
      borderColor: theme.palette.text.primary,
      backgroundColor: theme.palette.action.hover,
    },
  };

  return (
    <Box sx={styles}>
      <FiFileText size="1.5rem" color="#A0ADB1" />
      <Typography sx={{ mx: '0.8rem' }} color="gray.700">
        {value}
      </Typography>
      <Button
        role={undefined}
        tabIndex={-1}
        color="gprimary"
        sx={{ fontWeight: "600" }}
        component="label"
      >
        Dokument suchen
        <Input
          type="file"
          id={id}
          name={name}
          accept="application/pdf"
          onChange={onChange}
          multiple={false}
        />
      </Button>
    </Box>
  );
}
