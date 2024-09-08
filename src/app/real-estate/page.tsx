"use client";
import React, { ReactNode, useState } from "react";
import Box from "@mui/material/Box";
import { CgNotes } from "react-icons/cg";
import { TbPigMoney } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineDoorSliding, MdOutlineAddHomeWork } from "react-icons/md";

import GAppbar from "@/components/navigation/GAppbar/GAppbar";
import { SidebarItem } from "@/components/navigation/GSidebar/SideBar";
import Sidebar, { SubItem } from "@/components/navigation/GSidebar/SideBar";

const sidebarItems: SidebarItem[] = [
  {
    id: 0,
    icon: LuLayoutDashboard,
    text: "Dashboard",
    url: "dashboard",
    // component: <RealEstateUser />,
  },
  {
    id: 1,
    icon: CgNotes,
    text: "Ausschreibungen",
    subItems: [
      {
        id: 10,
        text: "Alle Ausschreibungen",
        url: "tenders" /*, component: <Tenders /> */,
      },
      {
        id: 11,
        text: "Ausschreibung hinzufügen",
        url: "tenders/add" /*, component: <NewTender />*/,
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
        url: "facilities" /*, component: <Facilities />*/,
      },
      {
        id: 21,
        text: "Anlage hinzufügen",
        url: "facilities/add" /*, component: <NewFacility />*/,
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
        url: "buildings" /*, component: <Buildings />*/,
      },
      {
        id: 31,
        text: "Gebäude hinzufügen",
        url: "buildings/add_building" /*, component: <NewBuilding id="" />*/,
      },
    ],
  },
  // { id:4, icon: MdOutlineNoteAlt, text: "Aufträge"},
  {
    id: 4,
    icon: TbPigMoney,
    url: "kosteneinsparung",
    text: "Kosteneinsparung",
  },
  // { id:5, icon: FaRegFlag, text: "Favoriten" }, // NOT INCLUDED IN GP-V1
];

const RealStateUserLayout: React.FC<any> = ({ children }) => {
  const router = useRouter();

  const handleRedirect = (item: any) => {
    setSelected(item);
    router.push(`/real-estate/${item?.url}`);
  };

  const [selected, setSelected] = useState<SidebarItem | SubItem>(
    sidebarItems[0]
  );

  return (
    <Box sx={{ display: "flex", backgroundColor: "#F1F3F4" }}>
      <Sidebar
        selected={selected}
        items={sidebarItems}
        setSelected={handleRedirect}
      />
      <Box sx={{ width: "100%", height: "100%", backgroundColor: "#F1F3F4" }}>
        <GAppbar />
        {/* {selected?.component} */}
        {children}
      </Box>
    </Box>
  );
};

export default RealStateUserLayout;
