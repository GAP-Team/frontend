"use client";
import { CgNotes } from "react-icons/cg";
import { TbPigMoney } from "react-icons/tb";
import { LuLayoutDashboard } from "react-icons/lu";
import { usePathname } from "next/navigation";
import { MdOutlineDoorSliding, MdOutlineAddHomeWork } from "react-icons/md";
import { REAL_ESTATE_BASE, ROUTES } from "@/utils/routes";
import Layout from "@/screens/real-estate-owner/Layout";
import { Box } from "@mui/material";

const sidebarItems = [
  { id: 0, icon: LuLayoutDashboard, text: "Dashboard", url: ROUTES.REAL_ESTATE.DASHBOARD },
  { id: 1, icon: CgNotes, text: "Ausschreibungen", subItems: [
    { id: 10, text: "Alle Ausschreibungen", url: ROUTES.REAL_ESTATE.TENDER.TENDERS },
    { id: 11, text: "Ausschreibung hinzufügen", url: ROUTES.REAL_ESTATE.TENDER.ADD_TENDER },
  ]},
  { id: 2, icon: MdOutlineDoorSliding, text: "Anlagen", subItems: [
    { id: 20, text: "Alle Anlagen", url: ROUTES.REAL_ESTATE.FACILITY.FACILITIES },
    { id: 21, text: "Anlage hinzufügen", url: ROUTES.REAL_ESTATE.FACILITY.ADD_FACILITY },
  ]},
  { id: 3, icon: MdOutlineAddHomeWork, text: "Gebäude", subItems: [
    { id: 30, text: "Alle Gebäude", url: ROUTES.REAL_ESTATE.BUILDING.BUILDINGS },
    { id: 31, text: "Gebäude hinzufügen", url: ROUTES.REAL_ESTATE.BUILDING.ADD_BUILDING },
  ]},
  { id: 4, icon: TbPigMoney, url: ROUTES.REAL_ESTATE.COST_SAVING, text: "Kosteneinsparung" },
];

const RealStateUserLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  
  if (!pathname.startsWith(REAL_ESTATE_BASE)) return <>{children}</>;
  
  return (
    <Layout sidebarItems={sidebarItems}>
      <Box sx={{ width: "100%" }}>{children}</Box>
    </Layout>
  );
};

export default RealStateUserLayout;
