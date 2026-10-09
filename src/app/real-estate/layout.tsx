"use client";
import { TbPigMoney } from "react-icons/tb";
import { LuLayoutDashboard } from "react-icons/lu";
import { usePathname } from "next/navigation";
import { MdOutlineAddHomeWork } from "react-icons/md";
import { REAL_ESTATE_BASE, ROUTES } from "@/utils/routes";
import Layout from "@/screens/real-estate-owner/Layout";
import { Box } from "@mui/material";
import React from "react";

const sidebarItems = [
  {
    id: 0,
    icon: LuLayoutDashboard,
    text: "Dashboard",
    url: ROUTES.REAL_ESTATE.DASHBOARD,
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

const RealStateUserLayout: React.FC<any> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  if (!pathname.startsWith(REAL_ESTATE_BASE)) return <>{children}</>;

  return (
    <Layout sidebarItems={sidebarItems}>
      <Box sx={{ width: "100%" }}>{children}</Box>
    </Layout>
  );
};

export default RealStateUserLayout;
