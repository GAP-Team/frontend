"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import RealStateUserLayout from "../page";
import PageTitle from "@/components/label/PageTitle";

const menuItems = [
  { label: "Mein Profil", href: "/real_estate/settings/user_profile" },
  {
    label: "Unternehmens Informationen",
    href: "/real_estate/settings/company_profile",
  },
  { label: "Zahlungsdaten", href: "/real_estate/settings/billing_data" },
  { label: "Benachrichtigungen", href: "/real_estate/settings" },
  { label: "E-Mail ändern", href: "/real_estate/settings/email_change" },
  { label: "Passwort ändern", href: "/real_estate/settings/password_change" },
  {
    label: "Account löschen",
    href: "/real_estate/settings/delete_account",
    style: { color: "red" },
  },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const pathname = usePathname();

  // Find the matching menu item based on the current pathname
  const currentMenuItem = menuItems.find((item) => pathname === item.href);

  return (
    <RealStateUserLayout>
      {/* Page Title */}
      <PageTitle title={currentMenuItem?.label || "Einstellungen"} />

      {/* Main Layout Container */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          p: { xs: 2, sm: 2 },
          gap: 2,
          maxWidth: { xs: "95%", lg: "98%" },
          minHeight: "75vh",
          mx: "auto", // Centers the layout horizontally
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "background.paper",
        }}
      >
        {/* Sidebar */}
        <Box
          component="aside"
          sx={{
            minWidth: "300px",
            borderRight: "1px solid #ddd",
            p: 1,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            Einstellungen
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.href} disablePadding>
                <Link
                  href={item.href}
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <ListItemButton
                    selected={pathname === item.href}
                    sx={{
                      borderRadius: 1,
                      ...(item.style || {}),
                      "&.Mui-selected": {
                        bgcolor: "#E5F5FA",
                        color: "gprimary.main",
                        fontWeight: "bold",
                      },
                    }}
                  >
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: pathname === item.href ? "bold" : "normal",
                      }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            m: 2,
            minWidth: "0",
            overflowY: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </RealStateUserLayout>
  );
}
