"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import Dashboard from "@/screens/real-estate-owner/Dashboard";
import { fetchTenders } from "@/lib/features/tenderSlice";
import { fetchBuildings } from "@/lib/features/buildingSlice";
import { getFacilitiesByUser } from "@/lib/features/facilitySlice";
import TendersPanel from "@/screens/real-estate-owner/dashboard/tenders-panel/TendersPanel";
import OverviewPanel from "@/screens/real-estate-owner/dashboard/overview-panel/OverviewPanel";
import ApplicationsPanel from "@/screens/real-estate-owner/dashboard/applications-panel/ApplicationsPanel";
import ChatPanel from "@/screens/real-estate-owner/dashboard/communication-panel/ChatPanel";

export default function RealEstateDashboardPage(): JSX.Element {
  const appDispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user?.id) {
      // FIXME: avoid mixing get and fetch and retrieve
      appDispatch(fetchTenders(user.id));
      fetchAllNecessaryData(user.id);
    }
  }, [user?.id, appDispatch]);

  const fetchAllNecessaryData = (userId: string): void => {
    const getBuildingQuery = {
      userId: userId,
      city: "",
      facilityType: "",
      state: "",
    };

    appDispatch(fetchTenders(userId));
    appDispatch(getFacilitiesByUser(userId));
    appDispatch(fetchBuildings(getBuildingQuery));
  };

  return (
    <Dashboard>
      <OverviewPanel slot="overview" />
      <TendersPanel slot="tenders" />
      <ApplicationsPanel slot="applications" />
      <ChatPanel slot="news" />
    </Dashboard>
  );
}
