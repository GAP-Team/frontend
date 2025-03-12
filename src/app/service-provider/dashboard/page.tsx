"use client";
import Dashboard from "@/screens/dashboard/Dashboard";
import { useLogin } from "@/hooks/useUserLoginVerification";
import DetailedTenderCard from "@/components/tender_card/DetailedTenderCard";

export default function ServiceProviderDashboardPage(): JSX.Element {
  const { isLoggedIn, isUserVerified } = useLogin();

  return (
    <>
      {isLoggedIn && isUserVerified && (
        <>
          <Dashboard>
            <DetailedTenderCard slot="tenders" />
          </Dashboard>
        </>
      )}
    </>
  );
}
