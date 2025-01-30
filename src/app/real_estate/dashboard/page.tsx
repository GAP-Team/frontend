"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import Dashboard from "@/screens/dashboard/Dashboard";
import { fetchTenders } from "@/lib/features/tenderSlice";
import { useUserLoginVerification } from "@/hooks/useUserLoginVerification";
import NewsPanel from "@/screens/dashboard/real_estate_user/communication_panel/NewsPanel";
import TendersPanel from "@/screens/dashboard/real_estate_user/tenders_panel/TendersPanel";
import OverviewPanel from "@/screens/dashboard/real_estate_user/overview_panel/OverviewPanel";
import ApplicationsPanel from "@/screens/dashboard/real_estate_user/applications_panel/ApplicationsPanel";

export default function RealEstateDashboardPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const { isLoggedIn, isUserVerified } = useUserLoginVerification();

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchTenders(user.id));
    }
  }, [user?.id, dispatch]);

  return (
    <>
      {isLoggedIn && isUserVerified && (
        <>
          <Dashboard
            NewsPanel={<NewsPanel />}
            OverviewPanel={<OverviewPanel />}
            TendersPanel={<TendersPanel />}
            ApplicationsPanel={<ApplicationsPanel />}
          />
        </>
      )}
    </>
  );
}
