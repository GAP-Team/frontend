import '@mui/material/styles';
  
  // Update the Typography's variant prop options
  declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
      gsub: true;
    }
}
  
  declare module "@mui/material" {
    interface ButtonPropsColorOverrides {
        gprimary: true;
        gsecondary: true;
        gyellow: true;
        ggreen: true;
        gpurple: true;
        gorange: true;
    }
}
  
  declare module '@mui/material/styles' {
    interface Palette {
      grey: Palette['primary'];
    }
  
    interface PaletteOptions {
      grey?: PaletteOptions['primary'];
    }
  }