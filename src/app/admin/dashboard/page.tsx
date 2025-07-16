"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";
import Dashboard from "@/screens/real-estate-owner/Dashboard";
import NoAccessPage from "@/components/common/pages/NoAccessPage";
import { userIsAdmin, checkIsLoggedIn } from "@/utils/auth";

export default function AdminDashboardPage(): JSX.Element {
  const router = useRouter();
  const isAdmin = userIsAdmin();
  const isLoggedIn = checkIsLoggedIn();
  const hasAccess = isLoggedIn && isAdmin;

  useEffect(() => {
    if (!hasAccess) router.push(ROUTES.LOGIN);
  }, [hasAccess]);

  if (!hasAccess) {
    return (
      <NoAccessPage description="Sie müssen ein Administrator sein, um auf diese Site zugreifen zu können." />
    );
  }

  return <Dashboard />;
}
