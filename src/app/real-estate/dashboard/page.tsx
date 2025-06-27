"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import Dashboard from "@/components/features/dashboard/Dashboard";
import { fetchTenders } from "@/lib/features/tenderSlice";
import { useLogin } from "@/hooks/useUserLoginVerification";
import { fetchBuildings } from "@/lib/features/buildingSlice";
import { getFacilitiesByUser } from "@/lib/features/facilitySlice";
import NewsPanel from "@/components/features/dashboard/real_estate/communication_panel/NewsPanel";
import TendersPanel from "@/components/features/dashboard/real_estate/tenders_panel/TendersPanel";
import OverviewPanel from "@/components/features/dashboard/real_estate/overview_panel/OverviewPanel";
import ApplicationsPanel from "@/components/features/dashboard/real_estate/applications_panel/ApplicationsPanel";

export default function RealEstateDashboardPage(): JSX.Element {
  const appDispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { isLoggedIn, isUserVerified } = useLogin();

  useEffect(() => {
    if (user?.id) {
      fetchAllNecessaryData(user.id);
    }
  }, [user?.id, appDispatch]);

  const fetchAllNecessaryData = (userId: string): void => {
    const getBuildingQuery = {
      userId: userId,
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
            <NewsPanel slot="news" />
          </Dashboard>
        </>
      )}
    </>
  );
}
