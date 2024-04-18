'use client';
import React from 'react';
import { SidebarItem } from "@/sections/GSidebar/SideBar";
import { MdOutlineDoorSliding } from "react-icons/md";
import { MdOutlineAddHomeWork } from "react-icons/md";
import { MdOutlineNoteAlt } from "react-icons/md";
import { TbPigMoney } from "react-icons/tb";
import { FaRegFlag } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { CgNotes } from "react-icons/cg";
import Sidebar from "@/sections/GSidebar/SideBar";
import Box from "@mui/material/Box";
import PropertyFilterPanel from '@/components/filter/PropertyFilterPanel';

const Dashboard = () => {
    const sidebarItems: SidebarItem[] = [
      { icon: LuLayoutDashboard, text: "Dashboard" },
      { icon: CgNotes, text: "Ausschreibungen" },
      { icon: MdOutlineDoorSliding, text: "Anlagen" },
      { icon: MdOutlineAddHomeWork, text: "Gebäude" },
      { icon: MdOutlineNoteAlt, text: "Aufträge" },
      { icon: TbPigMoney, text: "Kosteneinsparung" },
      { icon: FaRegFlag, text: "Favoriten" },
      // ... add other items here
    ];
  
    return (
      <Box sx={{ display: "flex" }}>
        <Sidebar items={sidebarItems} />
        <PropertyFilterPanel />
      </Box>
    );
  };
  
  export default Dashboard;