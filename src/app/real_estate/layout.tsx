"use client";
import { CgNotes } from "react-icons/cg";
import { TbPigMoney } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { useRouter, usePathname } from "next/navigation";
import { MdOutlineDoorSliding, MdOutlineAddHomeWork } from "react-icons/md";
import { SubItem, SidebarItem } from "@/components/navigation/GSidebar/SideBar";
import Layout from "@/screens/dashboard/Layout";

const sidebarItems: SidebarItem[] = [
  {
    id: 0,
    icon: LuLayoutDashboard,
    text: "Dashboard",
    url: "/real_estate/dashboard",
  },
  {
    id: 1,
    icon: CgNotes,
    text: "Ausschreibungen",
    subItems: [
      {
        id: 10,
        text: "Alle Ausschreibungen",
        url: "/real_estate/tenders",
      },
      {
        id: 11,
        text: "Ausschreibung hinzufügen",
        url: "/real_estate/tenders/add",
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
        url: "/real_estate/facilities",
      },
      {
        id: 21,
        text: "Anlage hinzufügen",
        url: "/real_estate/facilities/add",
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
        url: "/real_estate/buildings",
      },
      {
        id: 31,
        text: "Gebäude hinzufügen",
        url: "/real_estate/buildings/add",
      },
    ],
  },
  {
    id: 4,
    icon: TbPigMoney,
    url: "/real_estate/cost_savings",
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
    <Layout
      sidebarItems={sidebarItems}
      selected={selected}
      setSelected={handleRedirect}
    >
      {children}
    </Layout>
  );
};

export default RealStateUserLayout;
