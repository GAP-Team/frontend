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
          props: { variant: 'h1b' },
          style: {
            // define your custom styles here
            fontSize: '4rem',
            lineHeight:'4.875rem',
            fontWeight: '700',
            // ...other styles
          },
        },
        {
          props: { variant: 'h2b' },
          style: {
            // define your custom styles here
            fontSize: '2.75rem',
            lineHeight:'3.25rem',
            fontWeight: '700',
            // ...other styles
          },
        },
        {
          props: { variant: 'h3b' },
          style: {
            // define your custom styles here
            fontSize: '2.1875rem',
            lineHeight:'3rem',
            fontWeight: '700',
            // ...other styles
          },
        },
        {
          props: { variant: 'h4b' },
          style: {
            // define your custom styles here
            fontSize: '1.5rem',
            lineHeight:'2rem',
            fontWeight: '700',
            // ...other styles
          },
        },
        {
          props: { variant: 'h4sb' },
          style: {
            // define your custom styles here
            fontSize: '1.5rem',
            lineHeight:'2.25rem',
            fontWeight: '600',
            // ...other styles
          },
        },
        {
          props: { variant: 'h4r' },
          style: {
            // define your custom styles here
            fontSize: '1.5rem',
            fontWeight: '400',
            lineHeight:'2.25rem',
            // ...other styles
          },
        },
        {
          props: { variant: 'bodylb' },
          style: {
            // define your custom styles here
            fontSize: '1rem',
            fontWeight: '700',
            lineHeight:'1.5rem',
            // ...other styles
          },
        },
        {
          props: { variant: 'bodylsb' }, //Body Text L Semibold
          style: {
            // define your custom styles here
            fontSize: '1rem',
            fontWeight: '600',
            lineHeight:'1.5rem',
            // ...other styles
          },
        },
        {
          props: { variant: 'bodylr' }, //Body Text L Regular
          style: {
            // define your custom styles here
            fontSize: '1rem',
            fontWeight: '400',
            lineHeight:'1.5rem',
            // ...other styles
          },
        },
        {
          props: { variant: 'bodymsb' }, //Body Text M Semibold
          style: {
            // define your custom styles here
            fontSize: '0.875rem',
            fontWeight: '600',
            lineHeight:'1.25rem',
            // ...other styles
          },
        },
        {
          props: { variant: 'bodymu' }, //Body Text M Underlined
          style: {
            // define your custom styles here
            fontSize: '0.875rem',
            fontWeight: '600',
            lineHeight: '1.25rem',
            textDecorationLine:'underline'
            // ...other styles
          },
        },
        {
          props: { variant: 'bodymr' }, //Body Text M Regular
          style: {
            // define your custom styles here
            fontSize: '0.875rem',
            fontWeight: '400',
            lineHeight: '1.25rem',
            // ...other styles
          },
        },
        {
          props: { variant: 'bodysb' }, //Body Text S Bold
          style: {
            // define your custom styles here
            fontSize: '0.75rem',
            fontWeight: '600',
            lineHeight: '1rem',
            // ...other styles
          },
        },
        {
          props: { variant: 'bodyssb' }, //Body Text S Semibold
          style: {
            // define your custom styles here
            fontSize: '0.75rem',
            fontWeight: '600',
            lineHeight: '1rem',
            // ...other styles
          },
        },
        {
          props: { variant: 'bodysr' }, //Body Text S Regular
          style: {
            // define your custom styles here
            fontSize: '0.75rem',
            fontWeight: '400',
            lineHeight: '1rem',
            // ...other styles
          },
        },
        {
          props: { variant: 'labelb' },
          style: {
            // define your custom styles here
            fontSize: '0.625rem',
            fontWeight: '500',
            lineHeight: '0.75rem',
            letterSpacing:'0.00625rem',
            // ...other styles
          },
        },
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
        },{
          props: { variant: 'gsub1' },
          style: {
            // define your custom styles here
            fontSize: '0.75rem',
            lineHeight:'1rem',
            fontWeight: '400',
            // ...other styles
          },
        },
      ],
    },
    //preventing the textfeild to overflow when helperText appears incase of error (validation failed)
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          // Use existing space / prevents shifting content below field
          marginTop: 0,
          height: 0,
        },
      },
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
    ggrey: theme.palette.augmentColor({
      color: {
        main: "#E5E9EA",
        contrastText: "#475A60",
      },
      name: 'ggrey',
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
