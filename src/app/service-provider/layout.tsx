"use client";
import { BiTask } from "react-icons/bi";
import { ROUTES } from "@/utils/routes";
import { CgNotes } from "react-icons/cg";
import { BsEnvelope } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import Layout from "@/screens/real-estate-owner/Layout";

const sidebarItems = [
  { id: 0, icon: LuLayoutDashboard, text: "Dashboard", url: ROUTES.SERVICE_PROVIDER.DASHBOARD },
  { id: 1, icon: CgNotes, text: "Ausschreibungen", url: ROUTES.SERVICE_PROVIDER.CONTRACTS },
  { id: 2, icon: BiTask, text: "Aufträge", url: ROUTES.SERVICE_PROVIDER.APPLICATIONS },
  { id: 3, icon: BsEnvelope, text: "Nachrichten", url: ROUTES.SERVICE_PROVIDER.MESSAGES },
];

const ServiceProviderLayout = ({ children }: { children: React.ReactNode }) => (
  <Layout sidebarItems={sidebarItems}>
    {children}
  </Layout>
);

export default ServiceProviderLayout;
