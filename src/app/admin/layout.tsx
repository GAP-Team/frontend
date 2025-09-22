"use client";
import { ROUTES } from "@/utils/routes";
import { LuUsers, LuLayoutDashboard } from "react-icons/lu";
import Layout from "@/screens/real-estate-owner/Layout";

const sidebarItems = [
  {
    id: 0,
    icon: LuLayoutDashboard,
    text: "Dashboard",
    url: ROUTES.ADMIN.DASHBOARD,
  },
  { id: 1, icon: LuUsers, text: "Users", url: ROUTES.ADMIN.USERS },
];

const AdminLayout: React.FC<any> = ({
  children,
}: {
  children: React.ReactNode;
}) => <Layout sidebarItems={sidebarItems}>{children}</Layout>;

export default AdminLayout;
