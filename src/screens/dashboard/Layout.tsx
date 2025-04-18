import React, { ReactNode, useEffect } from "react";
import Sidebar, {
  SubItem,
  SidebarItem,
} from "@/components/navigation/GSidebar/SideBar";
import GAppbar from "@/components/navigation/GAppbar/GAppbar";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { showSnackbar } from "@/components/root-snackbar";

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
  const dispatch = useAppDispatch();
  const { isActive } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!isActive) {
      dispatch(
        showSnackbar({
          type: "warning",
          title: "Wir prüfen aktuell Ihre Unternehmensdaten.",
          message:
            "Die Verifizierung Ihres Unternehmens kann etwas Zeit in Anspruch nehmen. Sie erhalten eine Benachrichtigung, sobald die Prüfung abgeschlossen ist.",
          persistent: true,
          vertical: "top",
        })
      );
    }
  }, [isActive, dispatch]);

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
    </Box>
  );
};

export default Layout;
