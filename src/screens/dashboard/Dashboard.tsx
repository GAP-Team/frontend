'use client';
import { CgNotes } from "react-icons/cg";
import { FaRegFlag } from "react-icons/fa";
import { TbPigMoney } from "react-icons/tb";
import { LuLayoutDashboard } from "react-icons/lu";
import React, { useState, memo, useEffect } from "react";
import { MdOutlineDoorSliding, MdOutlineAddHomeWork, MdOutlineNoteAlt } from "react-icons/md";
import Layout from './Layout';
import Buildings from "./buildings/building_card/Buildings";
import RealEstateUser from "./real_estate_user/RealEstateUser";
import NewBuilding from "./buildings/add_building_form/NewBuilding";
import Tenders from "./tenders/Tenders";
import NewTender from "./tenders/add_tender_form/NewTender";
import { SidebarItem, SubItem } from "@/components/navigation/GSidebar/SideBar";


interface DashboardProps {
  overrideComponent?:React.ReactElement;
}

const Dashboard: React.FC<DashboardProps> = ({ overrideComponent  }) => {
  const sidebarItems: SidebarItem[] = [
    { id:0, icon: LuLayoutDashboard, text: "Dashboard", component:<RealEstateUser/> },
    { id:1, icon: CgNotes, text: "Ausschreibungen", subItems: [{ id: 10, text: "Alle Ausschreibungen", component:<Tenders /> }, { id: 11, text: "Neue Ausschreibung", component: <NewTender/>}]},
    { id:2, icon: MdOutlineDoorSliding, text: "Anlagen" },
    { id: 3, icon: MdOutlineAddHomeWork, text: "Gebäude", subItems: [{ id: 30, text: "Alle Gebäude", component:<Buildings /> }, { id: 31, text: "Gebäude hinzufügen", component: <NewBuilding/>}] },
    // { id:4, icon: MdOutlineNoteAlt, text: "Aufträge"},
    { id:4, icon: TbPigMoney, text: "Kosteneinsparung" },
    { id:5, icon: FaRegFlag, text: "Favoriten" },
  ];

  const [selected, setSelected] = useState<SidebarItem | SubItem>(sidebarItems[0]);

  useEffect(() => {
    if (overrideComponent) {
      setSelected({...selected, component: overrideComponent}); // Only updating the component part
    }
  }, [overrideComponent]);

  return (
    <Layout sidebarItems={sidebarItems} selected={selected} setSelected={setSelected}>
      {selected?.component}
    </Layout>
  );
};

export default memo(Dashboard);
