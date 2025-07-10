import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import ReduxProvider from "../lib/ReduxProvider";
import "./globals.css";
import theme from "./theme/theme";
import RootSnackbar from "@/components/feedback/snackbar";

const inter = Inter({ subsets: ["latin"] });

// FIXME: update the metadata to reflect the actual company name and description
export const metadata: Metadata = {
  title: "GAP",
  description: "The GAP company website",
};

const googleMapsApiUrl = `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_BASE_URL}?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    // FIXME: update the lang attribute to reflect the actual language of the website
    <html lang="en">
      <head>
        <script async defer src={googleMapsApiUrl}></script>
      </head>
      <body className={inter.className}>
        {" "}
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ReduxProvider>
              {children}
              <RootSnackbar />
            </ReduxProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
