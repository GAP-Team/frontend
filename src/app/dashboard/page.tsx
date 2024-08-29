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
      if (checkIsUserVerified() == "false") {
        setIsUserVerified(false);
      } else {
        setIsUserVerified(true);
      }
    }
  }, []);

  const postVerificationAction = () => {
    setIsUserVerified(true);
    router.push("/dashboard");
    Cookies.set("isVerified", "true");
  };

  return (
    <>
      {isLoggedIn && isUserVerified ? (
        <Dashboard />
      ) : (
        <>
          <section style={{ display: "flex", backgroundColor: "#F1F3F4" }}>
            <GNavbar />
          </section>
          <EmailVerification
            sendMail={true}
            newUserId={user?._id}
            newUserEmail={user?.email}
            newUserName={user?.firstName}
            postVerificationAction={postVerificationAction}
          />
        </>
      )}
    </>
  );
}
