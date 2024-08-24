import React, { ReactNode } from "react";
import Sidebar, { SubItem } from "@/components/navigation/GSidebar/SideBar";
import GAppbar from "@/components/navigation/GAppbar/GAppbar";
import Box from "@mui/material/Box";
import { SidebarItem } from "@/components/navigation/GSidebar/SideBar";

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
