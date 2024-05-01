"use client";
import React from "react";
import { SidebarItem } from "@/components/navigation/GSidebar/SideBar";
import { MdOutlineDoorSliding } from "react-icons/md";
import { MdOutlineAddHomeWork } from "react-icons/md";
import { MdOutlineNoteAlt } from "react-icons/md";
import { TbPigMoney } from "react-icons/tb";
import { FaRegFlag } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { CgNotes } from "react-icons/cg";
import Sidebar from "@/components/navigation/GSidebar/SideBar";
import Box from "@mui/material/Box";
import GAppbar from "@/components/navigation/GAppbar/GAppbar";
import NewBuilding from "@/screens/dashboard/buildings/NewBuilding";
import RealEstateUser from "./real_estate_user/RealEstateUser";
import Tenders from "./tenders/Tenders";

const Dashboard = () => {
  const sidebarItems: SidebarItem[] = [
    {id:0, icon: LuLayoutDashboard, text: "Dashboard",component:<RealEstateUser /> },
    {id:1, icon: CgNotes, text: "Ausschreibungen", },
    {id:2, icon: MdOutlineDoorSliding, text: "Anlagen" },
    {id:3, icon: MdOutlineAddHomeWork, text: "Gebäude",component:<Tenders/> },
    {id:4, icon: MdOutlineNoteAlt, text: "Aufträge"},
    {id:5, icon: TbPigMoney, text: "Kosteneinsparung" },
    {id:6, icon: FaRegFlag, text: "Favoriten" },
  ];

  //Select 'Dashboard' by default with index 0
  const [selected, setSelected] = React.useState<SidebarItem>(sidebarItems[0]);
  
  return (
    <Box sx={{ display: "flex", backgroundColor: '#F1F3F4' }}>
      <Sidebar
        items={sidebarItems}
        setSelected={setSelected}
        selected={selected}
      />
      <Box sx={{ width: '100%', height: '100%', backgroundColor: '#F1F3F4'}}>
      <GAppbar />
        {selected?.component}
      </Box>
    </Box>
  );
};

export default Dashboard;
