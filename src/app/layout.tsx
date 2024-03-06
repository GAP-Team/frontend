import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeModeScript } from "flowbite-react";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GAP",
  description: "The GAP company website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body className={inter.className}> <AppRouterCacheProvider>{children} </AppRouterCacheProvider></body>
    </html>
  );
}
