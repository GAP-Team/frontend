"use client";
import { useEffect } from "react";
import { ROUTES } from "@/utils/routes";
import Users from "@/screens/admin/Users";
import { useRouter } from "next/navigation";
import NoAccessPage from "@/components/common/NoAccessPage";
import { userIsAdmin, checkIsLoggedIn } from "@/utils/auth";

export default function UsersPage(): JSX.Element {
  const router = useRouter();
  const isAdmin = userIsAdmin();
  const isLoggedIn = checkIsLoggedIn();

  useEffect(() => {
    if (!isLoggedIn || !isAdmin) {
      router.push(ROUTES.LOGIN);
    }
  }, [isLoggedIn, isAdmin]);

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
          <Users />
        </>
      ) : (
        <>{renderRestrictionUI()}</>
      )}
    </>
  );
}
