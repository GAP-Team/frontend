"use client";
import Dashboard from "@/screens/dashboard/Dashboard";
import { useLogin } from "@/hooks/useUserLoginVerification";

export default function ServiceProviderDashboardPage(): JSX.Element {
  const { isLoggedIn, isUserVerified } = useLogin();

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
