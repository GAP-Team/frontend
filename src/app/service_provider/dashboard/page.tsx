"use client";
import Dashboard from "@/screens/dashboard/Dashboard";
import { useUserLoginVerification } from "@/hooks/useUserLoginVerification";

export default function ServiceProviderDashboardPage(): JSX.Element {
  const { isLoggedIn, isUserVerified } = useUserLoginVerification();

  return (
    <>
      {isLoggedIn && isUserVerified && (
        <>
          <Dashboard />
        </>
      )}
    </>
  );
}
