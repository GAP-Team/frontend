
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeModeScript } from "flowbite-react";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
const inter = Inter({ subsets: ["latin"] });
import  CssBaseline  from "@mui/material/CssBaseline";

export const metadata: Metadata = {
  title: "GAP",
  description: "The GAP company website",
};

const googleMapsApiUrl = `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_BASE_URL}?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
        <script
          async
          defer
          src={googleMapsApiUrl}
        ></script>
      </head>
      <body className={inter.className}>
        {" "}
        <AppRouterCacheProvider >
          <ThemeProvider theme={theme}>
          <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
