"use client";
import Dashboard from "@/components/features/dashboard/Dashboard";
import { useLogin } from "@/hooks/useUserLoginVerification";

export default function ServiceProviderDashboardPage(): JSX.Element {
  const { isLoggedIn, isUserVerified } = useLogin();

  return (
    <>
      {isLoggedIn && isUserVerified && (
        <>
          <Dashboard></Dashboard>
        </>
      )}
    </>
  );
}
