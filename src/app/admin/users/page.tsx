"use client";
import { useEffect } from "react";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "next/navigation";
import NoAccessPage from "@/components/common/NoAccessPage";
import { userIsAdmin, checkIsLoggedIn } from "@/utils/auth";
import UsersOverview from "@/screens/admin/users/UsersOverview";

export default function UsersPage(): JSX.Element {
  const router = useRouter();
  const isAdmin = userIsAdmin();
  const isLoggedIn = checkIsLoggedIn();

  useEffect(() => {
    if (!isLoggedIn || !isAdmin) router.push(ROUTES.LOGIN);
  }, [isLoggedIn, isAdmin]);

  if (!isLoggedIn || !isAdmin) {
    return (
      <NoAccessPage description="Sie müssen ein Administrator sein, um auf diese Site zugreifen zu können." />
    );
  }

  return <UsersOverview />;
}
