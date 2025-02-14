"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { CgNotes } from "react-icons/cg";
import { TbPigMoney } from "react-icons/tb";
import { useRouter, usePathname } from "next/navigation";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineDoorSliding, MdOutlineAddHomeWork } from "react-icons/md";
import GAppbar from "@/components/navigation/GAppbar/GAppbar";
import Sidebar, {
  SubItem,
  SidebarItem,
} from "@/components/navigation/GSidebar/SideBar";
import { ROUTES } from "@/utils/routes";

const sidebarItems: SidebarItem[] = [
  {
    id: 0,
    icon: LuLayoutDashboard,
    text: "Dashboard",
    url: ROUTES.REAL_ESTATE.DASHBOARD,
  },
  {
    id: 1,
    icon: CgNotes,
    text: "Ausschreibungen",
    subItems: [
      {
        id: 10,
        text: "Alle Ausschreibungen",
        url: ROUTES.REAL_ESTATE.TENDER.TENDERS,
      },
      {
        id: 11,
        text: "Ausschreibung hinzufügen",
        url: ROUTES.REAL_ESTATE.TENDER.ADD_TENDER,
      },
    ],
  },
  {
    id: 2,
    icon: MdOutlineDoorSliding,
    text: "Anlagen",
    subItems: [
      {
        id: 20,
        text: "Alle Anlagen",
        url: ROUTES.REAL_ESTATE.FACILITY.FACILITIES,
      },
      {
        id: 21,
        text: "Anlage hinzufügen",
        url: ROUTES.REAL_ESTATE.FACILITY.ADD_FACILITY,
      },
    ],
  },
  {
    id: 3,
    icon: MdOutlineAddHomeWork,
    text: "Gebäude",
    subItems: [
      {
        id: 30,
        text: "Alle Gebäude",
        url: ROUTES.REAL_ESTATE.BUILDING.BUILDINGS,
      },
      {
        id: 31,
        text: "Gebäude hinzufügen",
        url: ROUTES.REAL_ESTATE.BUILDING.ADD_BUILDING,
      },
    ],
  },
  {
    id: 4,
    icon: TbPigMoney,
    url: ROUTES.REAL_ESTATE.COST_SAVING,
    text: "Kosteneinsparung",
  },
];

const RealStateUserLayout: React.FC<any> = ({ children }) => {
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

export default RealStateUserLayout;

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
