"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import Dashboard from "@/screens/real_estate_owner/Dashboard";
import { fetchTenders } from "@/lib/features/tenderSlice";
import { useLogin } from "@/hooks/useUserLoginVerification";
import { fetchBuildings } from "@/lib/features/buildingSlice";
import { getFacilitiesByUser } from "@/lib/features/facilitySlice";
import NewsPanel from "@/screens/real_estate_owner/dashboard/communication_panel/NewsPanel";
import TendersPanel from "@/screens/real_estate_owner/dashboard/tenders_panel/TendersPanel";
import OverviewPanel from "@/screens/real_estate_owner/dashboard/overview_panel/OverviewPanel";
import ApplicationsPanel from "@/screens/real_estate_owner/dashboard/applications_panel/ApplicationsPanel";

export default function RealEstateDashboardPage(): JSX.Element {
  const appDispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { isLoggedIn, isUserVerified } = useLogin();

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
    <>
      {isLoggedIn && isUserVerified && (
        <>
          <Dashboard>
            <OverviewPanel slot="overview" />
            <TendersPanel slot="tenders" />
            <ApplicationsPanel slot="applications" />
            <ChatPanel slot="news" />
          </Dashboard>
        </>
      )}
    </>
  );
}
