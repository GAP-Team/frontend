"use client";
import { ROUTES } from "@/utils/routes";
import { useEffect, useState } from "react";
import Layout from "@/screens/dashboard/Layout";
import { useRouter, usePathname } from "next/navigation";
import { LuUsers, LuLayoutDashboard } from "react-icons/lu";
import { SubItem, SidebarItem } from "@/components/navigation/GSidebar/SideBar";

const sidebarItems: SidebarItem[] = [
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
      selected={selected}
      sidebarItems={sidebarItems}
      setSelected={handleRedirect}
    >
      {children}
    </Layout>
  );
};

export default AdminLayout;
