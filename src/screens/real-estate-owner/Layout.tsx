"use client";
import React, { ReactNode, useEffect, useState } from "react";
import {
  SubItem,
  SidebarItemTypes,
} from "@/components/navigation/sidebar/types";
import GAppbar from "@/screens/real-estate-owner/navigation/GAppbar";
import Box from "@mui/material/Box";
import { useAppSelector } from "@/lib/hooks";
import CustomDialog from "@/components/feedback/dialog/CustomDialog";
import { checkIsLoggedIn } from "@/utils/auth";
import SideBar from "@/components/navigation/sidebar/SideBar";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "next/navigation";

interface LayoutProps {
  sidebarItems: SidebarItemTypes[];
  selected: SidebarItemTypes | SubItem;
  setSelected: (item: SidebarItemTypes | SubItem) => void;
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
  const router = useRouter();

  useEffect(() => {
    if (!checkIsLoggedIn()) {
      router.replace(ROUTES.LOGIN);
      return;
    }
    setOpen(!isActive && checkIsLoggedIn());
  }, [isActive, checkIsLoggedIn]);

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#F1F3F4" }}>
      <SideBar
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
