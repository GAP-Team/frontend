"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Sidebar, {
  SubItem,
  SidebarItem,
} from "@/components/navigation/GSidebar/SideBar";
import GAppbar from "@/components/navigation/GAppbar/GAppbar";
import Box from "@mui/material/Box";
import { useAppSelector } from "@/lib/hooks";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface LayoutProps {
  sidebarItems: SidebarItem[];
  selected: SidebarItem | SubItem;
  setSelected: (item: SidebarItem | SubItem) => void;
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  sidebarItems,
  selected,
  setSelected,
  children,
}) => {
  const { isActive } = useAppSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setOpen(!isActive);
  }, [isActive]);

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#F1F3F4" }}>
      <Sidebar
        items={sidebarItems}
        setSelected={setSelected}
        selected={selected}
      />
      <Box sx={{ width: "100%", height: "100%", backgroundColor: "#F1F3F4" }}>
        <GAppbar />
        {children}
      </Box>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="inactive-account-dialog"
      >
        <DialogTitle id="inactive-account-dialog">
          Wir prüfen aktuell Ihre Unternehmensdaten.
        </DialogTitle>
        <DialogContent>
          <Typography>
            Die Verifizierung Ihres Unternehmens kann etwas Zeit in Anspruch
            nehmen. Sie erhalten eine Benachrichtigung, sobald die Prüfung
            abgeschlossen ist.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Schließen
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Layout;
