"use client";
import { useEffect } from "react";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "next/navigation";
import { userIsAdmin, checkIsLoggedIn } from "@/utils/auth";
import UsersOverview from "@/screens/admin/users/UsersOverview";
import NoAccessImage from "@images/no_access.png";
import NoContentPage from "@/components/common/pages/NoContentPage";

export default function UsersPage(): JSX.Element {
  const router = useRouter();
  const isAdmin = userIsAdmin();
  const isLoggedIn = checkIsLoggedIn();

  useEffect(() => {
    if (!isLoggedIn || !isAdmin) router.push(ROUTES.LOGIN);
  }, [isLoggedIn, isAdmin]);

  if (!isLoggedIn || !isAdmin) {
    return (
    <NoContentPage description="Sie müssen ein Administrator sein, um auf diese Site zugreifen zu können." title="Zugriff verweigert" buttonLink={ROUTES?.LOGIN} alt="No Access" image={NoAccessImage} />
  );
  }

  return <UsersOverview />;
}
