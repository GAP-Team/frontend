"use client";
import { ROUTES } from "@/utils/routes";
import { useEffect, useState } from "react";
import Layout from "@/screens/real-estate-owner/Layout";
import { useRouter, usePathname } from "next/navigation";
import { LuUsers, LuLayoutDashboard } from "react-icons/lu";
import {
  SubItem,
  SidebarItemTypes,
} from "@/components/navigation/sidebar/types";

const sidebarItems: SidebarItemTypes[] = [
  {
    id: 0,
    icon: LuLayoutDashboard,
    text: "Dashboard",
    url: ROUTES.ADMIN.DASHBOARD,
  },
  {
    id: 1,
    icon: LuUsers,
    text: "Users",
    url: ROUTES.ADMIN.USERS,
  },
];

const AdminLayout: React.FC<any> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSelected] = useState<SidebarItemTypes | SubItem>(
    sidebarItems[0]
  );

  useEffect(() => {
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
    setSelected(matchSidebarItem());
  }, [pathname]);

  const handleRedirect = (item: SidebarItemTypes | SubItem): void => {
    if (item.url) {
      setSelected(item);
      router.push(item.url);
    }
  };

  return (
    <Layout
      selected={selected}
      sidebarItems={sidebarItems}
      setSelected={handleRedirect}
    >
      {children}
    </Layout>
  );
};

export default AdminLayout;
