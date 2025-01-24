"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { BiTask } from "react-icons/bi";
import { CgNotes } from "react-icons/cg";
import { BsEnvelope } from "react-icons/bs";
import Sidebar, {
  SubItem,
  SidebarItem,
} from "@/components/navigation/GSidebar/SideBar";
import { LuLayoutDashboard } from "react-icons/lu";
import { useRouter, usePathname } from "next/navigation";
import GAppbar from "@/components/navigation/GAppbar/GAppbar";

const sidebarItems: SidebarItem[] = [
  {
    id: 0,
    icon: LuLayoutDashboard,
    text: "Dashboard",
    url: "/service_provider/dashboard",
  },
  {
    id: 1,
    icon: CgNotes,
    text: "Ausschreibungen",
    url: "/service_provider/tenders",
  },
  {
    id: 2,
    icon: BiTask,
    text: "Aufträge",
    url: "/service_provider/orders",
  },
  {
    id: 3,
    icon: BsEnvelope,
    text: "Nachrichten",
    url: "/service_provider/news",
  },
];

const ServiceProviderLayout: React.FC<any> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSelected] = useState<SidebarItem | SubItem>(
    sidebarItems[0]
  );

  useEffect(() => {
    const matchSidebarItem = (): SidebarItem | SubItem => {
      for (const item of sidebarItems) {
        if (item.url === pathname) {
          return item;
        }
        if (item.subItems) {
          for (const subItem of item.subItems) {
            if (subItem.url === pathname) {
              return subItem;
            }
          }
        }
      }
      return sidebarItems[0];
    };
    setSelected(matchSidebarItem());
  }, [pathname]);

  const handleRedirect = (item: SidebarItem | SubItem): void => {
    if (item.url) {
      setSelected(item);
      router.push(item.url);
    }
  };

  return (
    <Box sx={styles.main}>
      <Sidebar
        selected={selected}
        items={sidebarItems}
        setSelected={handleRedirect}
      />
      <Box sx={styles.contentContainer}>
        <GAppbar />
        {children}
      </Box>
    </Box>
  );
};

export default ServiceProviderLayout;

const styles = {
  main: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#F1F3F4",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minHeight: "100vh",
  },
};
