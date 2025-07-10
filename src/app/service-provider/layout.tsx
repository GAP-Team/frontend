"use client";
import { BiTask } from "react-icons/bi";
import { ROUTES } from "@/utils/routes";
import { CgNotes } from "react-icons/cg";
import { useEffect, useState } from "react";
import { BsEnvelope } from "react-icons/bs";
import Layout from "@/screens/real_estate_owner/Layout";
import { LuLayoutDashboard } from "react-icons/lu";
import { useRouter, usePathname } from "next/navigation";
import {
  SubItem,
  SidebarItemTypes,
} from "@/components/navigation/sidebar/types";

const sidebarItems: SidebarItemTypes[] = [
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
    url: ROUTES.SERVICE_PROVIDER.CONTRACTS,
  },
  {
    id: 2,
    icon: BiTask,
    text: "Aufträge",
    url: ROUTES.SERVICE_PROVIDER.APPLICATIONS,
  },
  {
    id: 3,
    icon: BsEnvelope,
    text: "Nachrichten",
    url: ROUTES.SERVICE_PROVIDER.MESSAGES,
  },
];

const ServiceProviderLayout: React.FC<any> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedSidebarItem, setSelectedSidebarItem] = useState<
    SidebarItemTypes | SubItem
  >(sidebarItems[0]);

  useEffect(() => {
    // FIXME: we already use this logic in the RealEstateLayout, consider refactoring to a common utility function
    // to avoid code duplication.
    const matchSidebarItem = (): SidebarItemTypes | SubItem => {
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
    setSelectedSidebarItem(matchSidebarItem());
  }, [pathname]);

  const handleRedirect = (item: SidebarItemTypes | SubItem): void => {
    if (item.url) {
      setSelectedSidebarItem(item);
      router.push(item.url);
    }
  };

  return (
    <Layout
      sidebarItems={sidebarItems}
      selected={selectedSidebarItem}
      setSelected={handleRedirect}
    >
      {children}
    </Layout>
  );
};

export default ServiceProviderLayout;
