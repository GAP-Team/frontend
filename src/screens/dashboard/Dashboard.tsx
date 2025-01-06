"use client";
import { CgNotes } from "react-icons/cg";
import { TbPigMoney } from "react-icons/tb";
import { LuLayoutDashboard } from "react-icons/lu";
import React, { useState, memo, useEffect } from "react";
import { MdOutlineDoorSliding, MdOutlineAddHomeWork } from "react-icons/md";

import Layout from "./Layout";
import Tenders from "./tenders/TendersOverview";
import Buildings from "./buildings/building_card/Buildings";
import NewTender from "./tenders/add_tender_form/NewTender";
import RealEstateUser from "./real_estate_user/RealEstateUser";
import NewBuilding from "./buildings/add_building_form/NewBuilding";
import { SidebarItem, SubItem } from "@/components/navigation/GSidebar/SideBar";
import Facilities from "./facilities/facility_card/Facilities";
import NewFacility from "./facilities/add_facility_form/NewFacility";

interface DashboardProps {
  overrideComponent?: React.ReactElement;
}

const Dashboard: React.FC<DashboardProps> = ({ overrideComponent }) => {
  const sidebarItems: SidebarItem[] = [
    {
      id: 0,
      icon: LuLayoutDashboard,
      text: "Dashboard",
      url: "dashboard",
      component: <RealEstateUser />,
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
          component: <Tenders />,
        },
        {
          id: 11,
          text: "Ausschreibung hinzufügen",
          url: "tenders/add",
          component: <NewTender id="" />,
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
          component: <Facilities />,
        },
        {
          id: 21,
          text: "Anlage hinzufügen",
          url: "facilities/add",
          component: <NewFacility facilityId="" />,
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
          component: <Buildings />,
        },
        {
          id: 31,
          text: "Gebäude hinzufügen",
          url: "buildings/add",
          component: <NewBuilding id="" />,
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

  const [selected, setSelected] = useState<SidebarItem | SubItem>(
    sidebarItems[0]
  );

  useEffect(() => {
    if (overrideComponent) {
      setSelected({ ...selected, component: overrideComponent }); // Only updating the component part
    }
  }, [overrideComponent]);

  return (
    <Layout
      sidebarItems={sidebarItems}
      selected={selected}
      setSelected={setSelected}
    >
      {selected?.component}
    </Layout>
  );
};

export default memo(Dashboard);
