import '@mui/material/styles';
  
  // Update the Typography's variant prop options
  declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
      gsub: true;
      gsub1: true;
      // custom variants as per figma
      h1b: true;
      h2b: true;
      h3b: true;
      h4b: true;
      h4sb: true;
      h4r: true; 
      bodylb: true;
      bodylsb: true;
      bodylr: true;
      bodymsb: true;
      bodymu: true; 
      bodymr: true;
      bodysb: true;
      bodyssb: true;
      labelb: true;
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
        gray:true;
      ggrey: true;
    }
    interface ChipPropsColorOverrides {
      gprimary: true;
      gsecondary: true;
      gyellow: true;
      ggreen: true;
      gpurple: true;
      gorange: true;
      gray:true;
      ggrey: true;
  }
}
  
  declare module '@mui/material/styles' {
    // interface Palette {
    //   grey: Palette['primary'];
    //     gprimary: Palette['primary'];
    //     gsecondary: Palette['primary'];
    //     gyellow: Palette['primary'];
    //     ggreen: Palette['primary'];
    //     gpurple: Palette['primary'];
    //     gorange: Palette['primary'];
    // }
    interface CustomPalette {
          gray: PaletteColorOptions;
          gprimary: PaletteColorOptions;
          gsecondary: PaletteColorOptions;
          gyellow: PaletteColorOptions;
          ggreen: PaletteColorOptions;
          gpurple: PaletteColorOptions;
          gorange: PaletteColorOptions;
          ggrey:PaletteColorOptions
    }
    interface Palette extends CustomPalette {}
    interface PaletteOptions extends CustomPalette { }
    
    // interface PaletteOptions {
    //   grey?: PaletteOptions['primary'];
    // }
  }