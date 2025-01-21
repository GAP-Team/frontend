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
import PageTitle from "@/components/label/PageTitle";

const menuItems = [
  { label: "Mein Profil", href: "/real_estate/settings/user_profile" },
  {
    label: "Unternehmens Informationen",
    href: "/real_estate/settings/company_profile",
  },
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
    <>
      {/* Page Title */}
      <PageTitle title={currentMenuItem?.label || "Einstellungen"} />

      {/* Main Layout Container */}
      <Box sx={styles.mainContainer}>
        {/* Sidebar */}
        <Box component="aside" sx={styles.sidebar}>
          <Typography variant="h6" sx={styles.sidebarTitle}>
            Einstellungen
          </Typography>
          <Divider sx={styles.divider} />
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.href} disablePadding>
                <Link href={item.href} style={styles.link}>
                  <ListItemButton
                    selected={pathname === item.href}
                    sx={{
                      ...styles.listItemButton,
                      ...(item.style || {}),
                      "&.Mui-selected": styles.selectedListItemButton,
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
        <Box component="main" sx={styles.mainContent}>
          {children}
        </Box>
      </Box>
    </>
  );
}

// Styles
const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" }, // Stacks items vertically on small screens
    justifyContent: "center",
    alignItems: "flex-start",
    p: { xs: 2, sm: 3 },
    gap: { xs: 2, md: 3 },
    maxWidth: "95%",
    minHeight: "75vh",
    mx: "auto", // Centers the layout horizontally
    borderRadius: 2,
    boxShadow: 3,
    bgcolor: "background.paper",
  },
  sidebar: {
    width: { xs: "100%", md: "300px" }, // Full-width on small screens
    borderRight: { xs: "none", md: "1px solid #ddd" }, // Hide border on small screens
    p: 1,
  },
  sidebarTitle: {
    mb: 2,
    fontWeight: 700,
    textAlign: { xs: "center", md: "left" }, // Center-align title on small screens
  },
  divider: {
    mb: 2,
  },
  link: {
    textDecoration: "none",
    width: "100%",
  },
  listItemButton: {
    borderRadius: 1,
  },
  selectedListItemButton: {
    bgcolor: "#E5F5FA",
    color: "gprimary.main",
    fontWeight: "bold",
  },
  mainContent: {
    flexGrow: 1,
    width: "100%",
    m: { xs: 0, md: 2 },
    mt: { xs: 2, md: 0 },
    minHeight: "77vh",
    overflowY: "auto",
  },
};
