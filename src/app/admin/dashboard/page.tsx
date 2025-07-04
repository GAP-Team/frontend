"use client";
import { useEffect } from "react";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "next/navigation";
import Dashboard from "@/screens/dashboard/Dashboard";
import NoAccessPage from "@/components/common/NoAccessPage";
import { userIsAdmin, checkIsLoggedIn } from "@/utils/auth";

export default function AdminDashboardPage(): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    if (!checkIsLoggedIn() || !userIsAdmin()) {
      router.push(ROUTES.LOGIN);
    }
  }, [checkIsLoggedIn(), userIsAdmin()]);

  const renderRestrictionUI = (): JSX.Element => {
    if (!checkIsLoggedIn() && !userIsAdmin()) {
      return (
        <NoAccessPage description="Sie müssen ein Administrator sein, um auf diese Site zugreifen zu können." />
      );
    }

    return <></>;
  };

  return (
    <>
      {checkIsLoggedIn() && userIsAdmin() ? (
        <>
          <Dashboard />
        </>
      ) : (
        <>{renderRestrictionUI()}</>
      )}
    </>
  );
}
