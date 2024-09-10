"use client";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import RealStateUserLayout from "../page";
import { checkIsLoggedIn, checkIsUserVerified } from "@/utils/helperJWT";
import RealEstateUser from "@/screens/dashboard/real_estate_user/RealEstateUser";

export default function DashboardPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [isUserVerified, setIsUserVerified] = useState<Boolean>(false);

  useEffect(() => {
    checkRendering();
  }, []);

  const checkRendering = () => {
    if (!checkIsLoggedIn()) {
      router.push("/login");
    }
    if (checkIsLoggedIn() && checkIsUserVerified() === "true") {
      setIsLoggedIn(true);
      setIsUserVerified(true);
    }
    if (checkIsLoggedIn() && checkIsUserVerified() !== "true") {
      router.push("/real_estate/user_verify");
    }
  };

  return (
    <>
      {isLoggedIn && isUserVerified && (
        <RealStateUserLayout>
          <RealEstateUser />
        </RealStateUserLayout>
      )}
    </>
  );
}
