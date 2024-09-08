"use client";
import Cookies from "js-cookie";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Dashboard from "@/screens/dashboard/Dashboard";
import { currentUser } from "@/lib/features/userSlice";
import GNavbar from "@/components/navigation/GNavbar/GNavbar";
import GAppbar from "@/components/navigation/GAppbar/GAppbar";
import EmailVerification from "@/components/email/EmailVerification";
import HeroSection from "@/components/common/GHeroSection/GHeroSection";
import { checkIsLoggedIn, checkIsUserVerified } from "@/utils/helperJWT";
import RealEstateUser from "@/screens/dashboard/real_estate_user/RealEstateUser";
import ReactStateUserLayout from "../page";

export default function DashboardPage() {
  const router = useRouter();
  const user = useSelector(currentUser);

  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [isUserVerified, setIsUserVerified] = useState<Boolean>(false);

  useEffect(() => {
    if (!checkIsLoggedIn()) {
      router.push("/login");
    } else {
      setIsLoggedIn(true);
      if (checkIsUserVerified() !== "true") {
        router.push("/real-estate/user-verify");
      } else {
        setIsUserVerified(true);
      }
    }
  }, []);

  const postVerificationAction = () => {
    setIsUserVerified(true);
    router.push("/real-estate/dashboard");
    Cookies.set("isVerified", "true");
  };
  return (
    <>
      {isLoggedIn && isUserVerified && (
        <ReactStateUserLayout>
          <RealEstateUser />
        </ReactStateUserLayout>
      )}
    </>
  );
}
