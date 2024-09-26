"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { CgNotes } from "react-icons/cg";
import { TbPigMoney } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineDoorSliding, MdOutlineAddHomeWork } from "react-icons/md";
import GAppbar from "@/components/navigation/GAppbar/GAppbar";
import Sidebar, {
  SubItem,
  SidebarItem,
} from "@/components/navigation/GSidebar/SideBar";

const sidebarItems: SidebarItem[] = [
  {
    id: 0,
    icon: LuLayoutDashboard,
    text: "Dashboard",
    url: "dashboard",
  },
  {
    id: 1,
    icon: CgNotes,
    text: "Ausschreibungen",
    subItems: [
      {
        id: 10,
        text: "Alle Ausschreibungen",
        url: "tenders",
      },
      {
        id: 11,
        text: "Ausschreibung hinzufügen",
        url: "tenders/add",
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
        url: "facilities",
      },
      {
        id: 21,
        text: "Anlage hinzufügen",
        url: "facilities/add",
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
        url: "buildings",
      },
      {
        id: 31,
        text: "Gebäude hinzufügen",
        url: "buildings/add",
      },
    ],
  },
  {
    id: 4,
    icon: TbPigMoney,
    url: "cost_savings",
    text: "Kosteneinsparung",
  },
];

const RealStateUserLayout: React.FC<any> = ({ children }) => {
  const router = useRouter();

  const handleRedirect = (item: any): void => {
    setSelected(item);
    router.push(`/real_estate/${item?.url}`);
  };

  const [selected, setSelected] = useState<SidebarItem | SubItem>(
    sidebarItems[0]
  );

  const redirectD = (): void => {
    router.push(`/real_estate/dashboard`);
  };

  return (
    <Box sx={styles.main}>
      <Sidebar
        selected={selected}
        items={sidebarItems}
        setSelected={handleRedirect}
      />
      <Box sx={styles.insideContainer}>
        <GAppbar />
        {children === undefined ? redirectD() : children}
      </Box>
    </Box>
  );
};

export default RealStateUserLayout;

const styles = {
  main: { display: "flex", backgroundColor: "#F1F3F4" },
  insideContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F1F3F4",
  },
};
