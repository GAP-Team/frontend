"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";
import Dashboard from "@/screens/real-estate-owner/Dashboard";
import { userIsAdmin, checkIsLoggedIn } from "@/utils/auth";
import FallbackPage from "@/components/common/pages/FallbackPage";
import NoAccessImage from "@images/no_access.png";

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
      <FallbackPage
        description="Sie müssen ein Administrator sein, um auf diese Site zugreifen zu können."
        title="Zugriff verweigert"
        buttonLink={ROUTES?.LOGIN}
        alt="No Access"
        image={NoAccessImage}
      />
    );
  }

  return <Dashboard />;
}
