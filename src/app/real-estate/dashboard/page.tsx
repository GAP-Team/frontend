"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkIsLoggedIn, getIsUserVerified } from "@/utils/helperJWT";
import RealEstateUser from "@/screens/dashboard/real_estate_user/RealEstateUser";

export default function DashboardPage(): JSX.Element {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [isUserVerified, setIsUserVerified] = useState<Boolean>(false);

  useEffect(() => {
    checkRendering();
  }, []);

  const checkRendering = (): void => {
    if (!checkIsLoggedIn()) {
      router.push("/login");
    }
    if (checkIsLoggedIn() && getIsUserVerified() === "true") {
      setIsLoggedIn(true);
      setIsUserVerified(true);
    }
    if (checkIsLoggedIn() && getIsUserVerified() !== "true") {
      router.push("/user_verify");
    }
  };

  return <>{isLoggedIn && isUserVerified && <RealEstateUser />}</>;
}
