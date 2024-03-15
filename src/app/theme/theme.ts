// src/theme.ts
'use client';
import { Inter } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const inter = Inter({
  subsets: ['latin'],
  weight: ["200","300", "400", "600", "700"],
  display: 'swap',
});

// Font style throughout the GAP app
let theme = createTheme({
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  components: {
    MuiTypography: {
    
      variants: [
        {
          props: { variant: 'gsub' },
          style: {
            // define your custom styles here
            fontSize: '0.75rem',
            lineHeight:'1rem',
            fontWeight: '600',
            letterSpacing:'0.0075rem'
            // ...other styles
          },
        },
      ],
    },
  },

});

// custom colors of GAP
theme = createTheme(theme, {
  palette: {
    gprimary: theme.palette.augmentColor({
      color: {
        main: '#22A7F1',
        // dark:'#2356FF',
        contrastText: "#fff",
      },
      name: 'gprimary',
    }),
    gsecondary: theme.palette.augmentColor({
      color: {
        main: '#FF4D4D',
        dark:'#EB4444',
        contrastText: "#fff",
      },
      name: 'gsecondary',
    }),
    gyellow: theme.palette.augmentColor({
      color: {
        main: "#FECB00",
        dark: "#EB9700",
        contrastText: "#fff",
      },
      name: 'gyellow',
    }),
    ggreen: theme.palette.augmentColor({
      color: {
        main: "#22BC7E",
        light:'#3DCAB9',
        contrastText: "#fff",
      },
      name: 'ggreen',
    }),
    gpurple: theme.palette.augmentColor({
      color: {
        main: "#582EFF",
        contrastText: "#fff",
      },
      name: 'gpurple',
    }),
    gorange: theme.palette.augmentColor({
      color: {
        main: "#FF9209",
        contrastText: "#fff",
      },
      name: 'gorange',
    }),
    gray: {
      
      // main: "#1E3137", // This is for the DEFAULT
      100: "#F1F3F4",
      200: "#E5E9EA",
      300: "#D2D7D9",
      400: "#A0ADB1",
      500: "#8D999C",
      600: "#475A60",
      700: "#1E3137",
      contrastText: "#fff",
     
    },
    text: {
      primary: "#1E3137",
    },
  },
});



export default theme;
