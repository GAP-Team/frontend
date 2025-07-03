"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Sidebar, {
  SubItem,
  SidebarItem,
} from "@/components/navigation/GSidebar/SideBar";
import GAppbar from "@/screens/real_estate_owner/navigation/GAppbar";
import Box from "@mui/material/Box";
import { useAppSelector } from "@/lib/hooks";
import CustomDialog from "@/components/feedback/dialog/CustomDialog";
import { checkIsLoggedIn } from "@/utils/helperJWT";

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

  useEffect(() => {
    setOpen(!isActive && checkIsLoggedIn());
  }, [isActive, checkIsLoggedIn()]);

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

      <CustomDialog
        title={"Wir prüfen aktuell Ihre Unternehmensdaten."}
        content=" Die Verifizierung Ihres Unternehmens kann etwas Zeit in Anspruch
          nehmen. Sie erhalten eine Benachrichtigung, sobald die Prüfung
          abgeschlossen ist."
        buttonText="Schließen"
        open={open}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default Layout;
