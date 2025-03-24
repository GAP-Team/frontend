"use client";
import { BiTask } from "react-icons/bi";
import { ROUTES } from "@/utils/routes";
import { CgNotes } from "react-icons/cg";
import { useEffect, useState } from "react";
import { BsEnvelope } from "react-icons/bs";
import Layout from "@/screens/dashboard/Layout";
import { LuLayoutDashboard } from "react-icons/lu";
import { useRouter, usePathname } from "next/navigation";
import { SubItem, SidebarItem } from "@/components/navigation/GSidebar/SideBar";

const sidebarItems: SidebarItem[] = [
  {
    id: 0,
    icon: LuLayoutDashboard,
    text: "Dashboard",
    url: ROUTES.SERVICE_PROVIDER.DASHBOARD,
  },
  {
    id: 1,
    icon: CgNotes,
    text: "Ausschreibungen",
    url: ROUTES.SERVICE_PROVIDER.TENDERS,
  },
  {
    id: 2,
    icon: BiTask,
    text: "Aufträge",
    url: ROUTES.SERVICE_PROVIDER.ORDERS,
  },
  {
    id: 3,
    icon: BsEnvelope,
    text: "Nachrichten",
    url: ROUTES.SERVICE_PROVIDER.NEWS,
  },
];

const ServiceProviderLayout: React.FC<any> = ({ children }) => {
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

export default ServiceProviderLayout;
