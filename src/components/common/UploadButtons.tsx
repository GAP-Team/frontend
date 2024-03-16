import * as React from 'react';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Input = styled('input')({
  display: 'none',
});

export default function UploadButtons() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center',
        border: `1px dashed ${theme.palette.divider}`,
        borderRadius: '0.5rem',
        padding: '1rem',
        backgroundColor:'#F9FAFA',
        '&:hover': {
          borderColor: theme.palette.text.primary,
          backgroundColor: theme.palette.action.hover,
        },
      }}
    >
      <Typography  sx={{ mx: 2 }} color="gray.700">
        Dokument hinzuziehen oder
      </Typography>
        <Button  color="gprimary" sx={{fontWeight:'600'}} component="span">
          Dokument suchen
        </Button>
      <Input accept="*" multiple type="file" id="contained-button-file" />
    </Box>
  );
}
